// Uyum yorumlarını kurar: her başlık için en etkili göstergeleri, birbirine bağlaçlarla bağlanan akıcı paragraflar
// hâlinde anlatır. Okuyucuya giden metinlerde teknik bilgi yoktur; teknik "nedenler" listesi yalnızca Harita bilgileri
// sekmesinde gösterilir. Ücretsiz kısım: giriş ve ilk paragraf. Ücretli kısım: kalan paragraflar.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_UYUM_METINLERI;
  // Kişilik cümlesi yalnızca o başlıkla ilgili gezegenler için eklenir (ör. iletişimde sadece düşünme biçimi)
  const KISILIK = {
    tutku: ['venus', 'mars'],
    baglanma: ['ay', 'gunes', 'venus'],
    iletisim: ['merkur'],
    romantizm: ['venus', 'gunes'],
    guven: ['gunes', 'ay'],
    huzur: ['mars', 'ay'],
    karmik: [],
  };
  const GOSTERGE_SAYISI = 4;

  const kac = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // {X}, {Y:in}, {N:e} gibi yer tutucuları isim + ekle değiştirir
  function doldur(metin, adlar) {
    return metin.replace(/\{([XYN])(?::(\w+))?\}/g, (_, kim, tur) => {
      const ad = adlar[kim];
      return tur ? window.Turkce.ek(ad, tur) : ad;
    });
  }

  const kucukBasla = (s) => s.charAt(0).toLocaleLowerCase('tr') + s.slice(1);

  function aciTuru(etken) {
    if (etken.aci.id === 'kavusum') return 'k';
    if (etken.aci.id === 'karsit' && (etken.p === 'yukselen' || etken.q === 'yukselen')) return 'alcalan';
    return ['altmislik', 'ucgen'].includes(etken.aci.id) ? 'u' : 'g';
  }

  // "Can aşkta zarafet … bekliyor; Elif ise arzusunu … gösteriyor."
  function kisilikCumlesi(parcalar) {
    if (!parcalar.length) return '';
    const cumleler = parcalar.map(({ nokta, ad }, i) => {
      const tanim = M.burcIfadeleri[nokta.anahtar];
      return doldur(tanim.kalip.replace('{ise}', i ? ' ise' : '').replace('{ifade}', tanim.ifadeler[nokta.indeks]), { N: ad });
    });
    return `${cumleler.join('; ')}.`;
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

  // Bir göstergenin paragrafı. isimleBasliyor: metin bir isimle başlıyorsa bağlaçtan sonra küçük harfe çevrilmez.
  function etkenParagrafi(etken, adlar, anlatilanlar, ilkMi, baslikId) {
    let sablon;
    let govde;
    if (etken.tur === 'aci') {
      const metinler = M.ciftler[`${etken.p}-${etken.q}`];
      sablon = metinler[aciTuru(etken)] ?? metinler.g;
      govde = doldur(sablon, { X: adlar[etken.kimP], Y: adlar[etken.kimQ] });
      const kisilik = [];
      for (const [nokta, kim] of [[etken.a, etken.kimP], [etken.b, etken.kimQ]]) {
        const anahtar = `${kim}-${nokta.anahtar}`;
        if (!KISILIK[baslikId].includes(nokta.anahtar) || anlatilanlar.has(anahtar)) continue;
        anlatilanlar.add(anahtar);
        kisilik.push({ nokta, ad: adlar[kim] });
      }
      const ekler = [kisilikCumlesi(kisilik)];
      if (ilkMi && etken.aci.orb < 2) ekler.push(M.gucluTemas);
      govde = [govde, ...ekler].filter(Boolean).join(' ');
    } else if (etken.tur === 'ev') {
      sablon = M.evler[`${etken.p}-${etken.ev}`];
      govde = doldur(sablon, { X: adlar[etken.kim], Y: adlar[etken.evSahibi] });
    } else {
      sablon = M.burcCiftleri[`${etken.p}-${etken.q}`];
      govde = `${doldur(sablon, { X: adlar[etken.kimP], Y: adlar[etken.kimQ] })} ${M.burcIliskileri[etken.iliski.mesafe]}`;
    }
    return { metin: govde, isimleBasliyor: sablon.startsWith('{') };
  }

  function baglacEkle(paragraf, onceki, simdiki, sira) {
    const tur = `${onceki.katki >= 0 ? 'olumlu' : 'zor'}${simdiki.katki >= 0 ? 'Olumlu' : 'Zor'}`;
    const liste = M.baglaclar[tur];
    const baglac = liste[sira % liste.length];
    const devam = paragraf.isimleBasliyor ? paragraf.metin : kucukBasla(paragraf.metin);
    return `${baglac} ${devam}`;
  }

  function baslikYorumu(baslik, adlar) {
    const bant = baslik.yuzde >= 75 ? 0 : baslik.yuzde >= 55 ? 1 : 2;
    const giris = M.bantlar[baslik.id][bant];
    const nedenler = baslik.etkenler.map((e) => nedenSatiri(e, adlar));
    const secilen = baslik.etkenler.slice(0, GOSTERGE_SAYISI);
    if (!secilen.length) return { ...baslik, nedenler, ucretsiz: [`${giris} ${M.bosBaslik}`], ucretli: [] };

    const anlatilanlar = new Set();
    const paragraflar = secilen.map((e, i) => {
      const p = etkenParagrafi(e, adlar, anlatilanlar, i === 0, baslik.id);
      return i === 0 ? p.metin : baglacEkle(p, secilen[i - 1], e, i);
    });
    return { ...baslik, nedenler, ucretsiz: [`${giris} ${paragraflar[0]}`], ucretli: paragraflar.slice(1) };
  }

  // sonuc: S.uyumHesapla çıktısı; kisiler: [{ ad, cinsiyet }]
  function uyumYorumu(sonuc, kisiler) {
    const adlar = { 0: kisiler[0].ad, 1: kisiler[1].ad };
    const basliklar = sonuc.basliklar.map((b) => baslikYorumu(b, adlar));
    const sirali = [...basliklar].sort((a, b) => b.yuzde - a.yuzde);
    const enIyi = sirali[0];
    const enZor = sirali[sirali.length - 1];
    const ozet = `İlişkinizin en güçlü yanı ${enIyi.ad.toLocaleLowerCase('tr')}; en çok özen isteyen alanı ise ${enZor.ad.toLocaleLowerCase('tr')}.`;
    return { genel: sonuc.genel, ozet, basliklar };
  }

  Object.assign(S, { uyumYorumu, yorumDoldur: doldur, kac });
})();
