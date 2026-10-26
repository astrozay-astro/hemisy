// Uyum yorumlarını kurar: her başlık için en etkili göstergeleri sırayla anlatan paragraflar üretir.
// Okuyucuya giden metinlerde teknik bilgi yoktur. Teknik "nedenler" listesi yalnızca Harita bilgileri sekmesinde gösterilir.
// Ücretsiz kısım: giriş ve ilk paragraf. Ücretli kısım: kalan paragraflar.
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

  function kisilikCumlesi(nokta, ad) {
    const tanim = M.burcIfadeleri[nokta.anahtar];
    return tanim ? doldur(tanim.kalip.replace('{ifade}', tanim.ifadeler[nokta.indeks]), { N: ad }) : '';
  }

  // Teknik gösterge satırı (yalnızca Harita bilgileri sekmesi için)
  function nedenSatiri(etken, adlar) {
    const ilgi = (i) => window.Turkce.ek(adlar[i], 'in');
    if (etken.tur === 'aci') {
      return { isaret: etken.aci.glif, metin: `${ilgi(etken.kimP)} ${etken.a.iyelik} – ${ilgi(etken.kimQ)} ${etken.b.iyelik}`, alt: etken.aci.ad, orb: S.dereceYaz(etken.aci.orb), ton: etken.ton };
    }
    if (etken.tur === 'ev') {
      return { isaret: String(etken.ev), ev: true, metin: `${ilgi(etken.kim)} ${etken.a.iyelik}, ${ilgi(etken.evSahibi)} ${etken.ev}. evinde`, alt: 'Ev yerleşimi', ton: etken.ton };
    }
    return { isaret: etken.a.burc.glif, metin: `${ilgi(etken.kimP)} ${etken.a.iyelik} ${etken.a.burc.ad}, ${ilgi(etken.kimQ)} ${etken.b.iyelik} ${etken.b.burc.ad}`, alt: 'Element ve nitelik uyumu (açı yok)', ton: etken.ton };
  }

  function etkenParagrafi(etken, adlar, anlatilanlar) {
    if (etken.tur === 'aci') {
      const metinler = M.ciftler[`${etken.p}-${etken.q}`];
      const parcalar = [doldur(metinler[aciTuru(etken)] ?? metinler.g, { X: adlar[etken.kimP], Y: adlar[etken.kimQ] })];
      for (const [nokta, kim] of [[etken.a, etken.kimP], [etken.b, etken.kimQ]]) {
        const anahtar = `${kim}-${nokta.anahtar}`;
        if (!KISISEL.includes(nokta.anahtar) || anlatilanlar.has(anahtar)) continue;
        anlatilanlar.add(anahtar);
        parcalar.push(kisilikCumlesi(nokta, adlar[kim]));
      }
      // Güç cümlesi yalnızca çok güçlü temaslarda eklenir; her paragrafta tekrar etmesin
      if (etken.aci.orb < 2) parcalar.push(M.gucCumleleri[0]);
      return parcalar.join(' ');
    }
    if (etken.tur === 'ev') {
      return doldur(M.evler[`${etken.p}-${etken.ev}`], { X: adlar[etken.kim], Y: adlar[etken.evSahibi] });
    }
    const bas = doldur(M.burcCiftleri[`${etken.p}-${etken.q}`], { X: adlar[etken.kimP], Y: adlar[etken.kimQ] });
    return `${bas} ${M.burcIliskileri[etken.iliski.mesafe]}`;
  }

  function baslikYorumu(baslik, adlar) {
    const bant = baslik.yuzde >= 75 ? 0 : baslik.yuzde >= 55 ? 1 : 2;
    const giris = M.bantlar[baslik.id][bant];
    const nedenler = baslik.etkenler.map((e) => nedenSatiri(e, adlar));
    const secilen = baslik.etkenler.slice(0, GOSTERGE_SAYISI);
    if (!secilen.length) return { ...baslik, nedenler, ucretsiz: [`${giris} ${M.bosBaslik}`], ucretli: [] };

    const anlatilanlar = new Set();
    const paragraflar = secilen.map((e) => etkenParagrafi(e, adlar, anlatilanlar));
    return { ...baslik, nedenler, ucretsiz: [`${giris} ${paragraflar[0]}`], ucretli: paragraflar.slice(1) };
  }

  // sonuc: S.uyumHesapla çıktısı; kisiler: [{ ad, cinsiyet }]
  function uyumYorumu(sonuc, kisiler) {
    const adlar = { 0: kisiler[0].ad, 1: kisiler[1].ad };
    const basliklar = sonuc.basliklar.map((b) => baslikYorumu(b, adlar));
    const sirali = [...basliklar].sort((a, b) => b.yuzde - a.yuzde);
    const enIyi = sirali[0];
    const enZor = sirali[sirali.length - 1];
    const ozet = `En güçlü yanınız ${enIyi.ad.toLocaleLowerCase('tr')} (%${enIyi.yuzde}), en çok emek isteyen alanınız ${enZor.ad.toLocaleLowerCase('tr')} (%${enZor.yuzde}).`;
    return { genel: sonuc.genel, ozet, basliklar };
  }

  Object.assign(S, { uyumYorumu, yorumDoldur: doldur, kac });
})();
