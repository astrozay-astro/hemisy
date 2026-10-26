// Uyum yorumlarını kurar: her başlık için en etkili göstergeleri sırayla anlatan paragraflar üretir.
// Ücretsiz kısım: giriş paragrafı ve ilk gösterge. Ücretli kısım: kalan göstergeler.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_UYUM_METINLERI;
  const KISISEL = ['gunes', 'ay', 'merkur', 'venus', 'mars'];
  const GOSTERGE_SAYISI = 4;

  const kac = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // {X}, {Y:in}, {N:e} gibi yer tutucuları isim + ekle değiştirir
  function doldur(metin, adlar) {
    return metin.replace(/\{([XYN])(?::(\w+))?\}/g, (_, kim, tur) => {
      const ad = adlar[kim];
      return tur ? window.Turkce.ek(ad, tur) : ad;
    });
  }

  function aciTuru(etken) {
    if (etken.aci.id === 'kavusum') return 'k';
    if (etken.aci.id === 'karsit' && (etken.p === 'yukselen' || etken.q === 'yukselen')) return 'alcalan';
    return ['altmislik', 'ucgen'].includes(etken.aci.id) ? 'u' : 'g';
  }

  function orbCumlesi(orb) {
    const o = S.dereceYaz(orb);
    if (orb < 1) return `Açı ${o} orbla neredeyse tam; bu etki ilişkinin her döneminde hissedilir.`;
    if (orb < 3) return `Açı ${o} orbla çok yakın, etkisi güçlü.`;
    if (orb < 6) return `Açının orbu ${o}; etkisi belirgin.`;
    return `Açının orbu ${o}; geniş bir açı olduğu için etkisi daha hafif hissedilir.`;
  }

  function burcCumlesi(nokta, ad) {
    const tanim = M.burcIfadeleri[nokta.anahtar];
    if (!tanim) return '';
    return doldur(tanim.kalip.replace('{burc}', nokta.burc.de).replace('{ifade}', tanim.ifadeler[nokta.indeks]), { N: ad });
  }

  // Gösterge için kısa "neden" satırı
  function nedenSatiri(etken, adlar) {
    const ad = (i) => adlar[i];
    const ilgi = (i) => window.Turkce.ek(ad(i), 'in');
    if (etken.tur === 'aci') {
      return {
        isaret: etken.aci.glif,
        metin: `${ilgi(etken.kimP)} ${etken.a.iyelik} – ${ilgi(etken.kimQ)} ${etken.b.iyelik}`,
        alt: etken.aci.ad,
        orb: S.dereceYaz(etken.aci.orb),
        ton: etken.ton,
      };
    }
    if (etken.tur === 'ev') {
      return { isaret: String(etken.ev), ev: true, metin: `${ilgi(etken.kim)} ${etken.a.iyelik}, ${ilgi(etken.evSahibi)} ${etken.ev}. evinde`, alt: 'Ev yerleşimi', ton: etken.ton };
    }
    return {
      isaret: etken.a.burc.glif,
      metin: `${ilgi(etken.kimP)} ${etken.a.iyelik} ${etken.a.burc.ad}, ${ilgi(etken.kimQ)} ${etken.b.iyelik} ${etken.b.burc.ad}`,
      alt: 'Element ve nitelik uyumu',
      ton: etken.ton,
    };
  }

  function etkenParagrafi(etken, adlar, anlatilanBurclar) {
    if (etken.tur === 'aci') {
      const tur = aciTuru(etken);
      const metinler = M.ciftler[`${etken.p}-${etken.q}`];
      const govde = metinler[tur] ?? metinler.g;
      const parcalar = [doldur(govde, { X: adlar[etken.kimP], Y: adlar[etken.kimQ] })];
      for (const [nokta, kim] of [[etken.a, etken.kimP], [etken.b, etken.kimQ]]) {
        const anahtar = `${kim}-${nokta.anahtar}`;
        if (!KISISEL.includes(nokta.anahtar) || anlatilanBurclar.has(anahtar)) continue;
        anlatilanBurclar.add(anahtar);
        parcalar.push(burcCumlesi(nokta, adlar[kim]));
      }
      parcalar.push(orbCumlesi(etken.aci.orb));
      return parcalar.join(' ');
    }
    if (etken.tur === 'ev') {
      return doldur(M.evler[`${etken.p}-${etken.ev}`], { X: adlar[etken.kim], Y: adlar[etken.evSahibi] });
    }
    const r = etken.iliski;
    const bas = doldur(M.burcCiftleri[`${etken.p}-${etken.q}`], { X: adlar[etken.kimP], Y: adlar[etken.kimQ] });
    const devam = M.burcIliskileri[r.mesafe]
      .replace('{b1}', etken.a.burc.ad).replace('{b2}', etken.b.burc.ad)
      .replace('{e1}', etken.a.burc.element).replace('{e2}', etken.b.burc.element)
      .replace('{n1}', etken.a.burc.nitelik);
    return `${bas} ${devam}`;
  }

  function baslikYorumu(baslik, adlar, cinsiyetVar) {
    const bant = baslik.yuzde >= 75 ? 0 : baslik.yuzde >= 55 ? 1 : 2;
    const secilen = baslik.etkenler.slice(0, GOSTERGE_SAYISI);
    const nedenler = baslik.etkenler.slice(0, 6).map((e) => nedenSatiri(e, adlar));

    if (!secilen.length) {
      return { ...baslik, nedenler, ucretsiz: [M.bantlar[baslik.id][bant], M.bosBaslik], ucretli: [] };
    }

    let giris = M.bantlar[baslik.id][bant];
    const enGuclu = nedenSatiri(secilen[0], adlar);
    giris += ` Bu yüzdeyi en çok belirleyen gösterge: ${enGuclu.metin} (${enGuclu.alt.toLocaleLowerCase('tr')}).`;
    const vurguluEtken = cinsiyetVar && baslik.etkenler.find((e) => e.vurgu);
    if (vurguluEtken) {
      const n = nedenSatiri(vurguluEtken, adlar);
      giris += ` ${M.cinsiyetNotlari[vurguluEtken.vurgu]} (${n.metin}, ${n.alt.toLocaleLowerCase('tr')}).`.replace(/\. \(/, ' (');
    }

    const anlatilanBurclar = new Set();
    const paragraflar = secilen.map((e) => etkenParagrafi(e, adlar, anlatilanBurclar));
    return { ...baslik, nedenler, ucretsiz: [giris, paragraflar[0]], ucretli: paragraflar.slice(1) };
  }

  // sonuc: S.uyumHesapla çıktısı; kisiler: [{ ad, cinsiyet }]
  function uyumYorumu(sonuc, kisiler) {
    const adlar = { 0: kisiler[0].ad, 1: kisiler[1].ad };
    const cinsiyetVar = kisiler.every((k) => k.cinsiyet !== 'belirtilmedi');
    const basliklar = sonuc.basliklar.map((b) => baslikYorumu(b, adlar, cinsiyetVar));
    const sirali = [...basliklar].sort((a, b) => b.yuzde - a.yuzde);
    const ozet = `En güçlü yanınız ${sirali[0].ad.toLocaleLowerCase('tr')} (%${sirali[0].yuzde}), en çok emek isteyen alanınız ${sirali[sirali.length - 1].ad.toLocaleLowerCase('tr')} (%${sirali[sirali.length - 1].yuzde}).`;
    return { genel: sonuc.genel, ozet, basliklar };
  }

  Object.assign(S, { uyumYorumu, yorumDoldur: doldur, kac });
})();
