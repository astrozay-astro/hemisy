// Doğum yeri arama: Türkiye'nin 81 ili ve dünyanın her yerindeki şehirler (başkentler, il/eyalet merkezleri,
// büyük şehirler). Tüm liste uygulamanın içindedir; internet bağlantısı gerekmez.
(() => {
  'use strict';

  // Aksan ve büyük/küçük harf duyarsız karşılaştırma için sadeleştirme: "Münih" → "munih", "İzmir" → "izmir"
  const sade = (s) => s.toLocaleLowerCase('tr').replace(/ı/g, 'i').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();

  let ulkeAdlari;
  try {
    ulkeAdlari = new Intl.DisplayNames(['tr'], { type: 'region' });
  } catch {
    ulkeAdlari = null;
  }
  const ulkeAdiOnbellek = {};
  const ulkeAdi = (kod) => (ulkeAdiOnbellek[kod] ??= (ulkeAdlari?.of(kod) || kod));

  const D = window.ASTROSHIP_DUNYA;
  const TUM = [
    ...window.ASTROSHIP_SEHIRLER.map((s) => ({ ...s, oncelik: 0, nufus: 0, aramalar: [sade(s.ad)] })),
    ...D.sehirler.map(([ad, turkceAd, ulkeKodu, enlem, boylam, bolgeNo, nufus]) => ({
      ad: turkceAd || ad,
      ulkeKodu,
      get ulke() { return ulkeAdi(ulkeKodu); },
      enlem,
      boylam,
      bolge: D.bolgeler[bolgeNo],
      nufus,
      oncelik: 1,
      aramalar: [sade(ad), turkceAd && sade(turkceAd)].filter(Boolean),
    })),
  ];

  const etiket = (s) => `${s.ad}, ${s.ulke}`;

  // Yazılan metne uyan şehirler: önce adı bu harflerle başlayanlar, Türkiye önce, sonra nüfusa göre
  function sehirAra(metin, adet = 8) {
    const aranan = sade(metin.split(',')[0]);
    if (aranan.length < 2) return [];
    const bulunan = [];
    for (const s of TUM) {
      let sira = -1;
      for (const a of s.aramalar) {
        if (a.startsWith(aranan)) { sira = 0; break; }
        if (a.includes(` ${aranan}`) || a.includes(`-${aranan}`)) sira = 1;
      }
      if (sira >= 0) bulunan.push({ s, sira });
    }
    bulunan.sort((x, y) => x.sira - y.sira || x.s.oncelik - y.s.oncelik || y.s.nufus - x.s.nufus);
    return bulunan.slice(0, adet).map(({ s }) => ({ ...s, ulke: s.ulke, etiket: etiket(s) }));
  }

  // "Londra, Birleşik Krallık" ya da yalnızca "Londra" → şehir; tam eşleşme yoksa null
  async function yerBul(metin) {
    const [adKismi, ulkeKismi] = metin.split(',').map((p) => sade(p || ''));
    const adaUyan = TUM.filter((s) => s.aramalar.includes(adKismi));
    const secilen = (ulkeKismi ? adaUyan.filter((s) => sade(s.ulke) === ulkeKismi) : adaUyan)
      .sort((x, y) => x.oncelik - y.oncelik || y.nufus - x.nufus)[0];
    return secilen ? { ...secilen, ulke: secilen.ulke } : null;
  }

  window.Astroship = window.Astroship || {};
  Object.assign(window.Astroship, { yerBul, sehirAra });
})();
