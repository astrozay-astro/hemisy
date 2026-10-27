// Eş potansiyeli analizi: tek bir doğum haritasından kişinin eş ve ilişki potansiyeli.
// Klasik okuma, cinsiyete göre göstergeler:
//  - Kadın haritası: Güneş (eş potansiyeli) ve Mars (ilişki potansiyeli: çekim duyulan erkek)
//  - Erkek haritası: Ay (eş potansiyeli) ve Venüs (ilişki potansiyeli: çekim duyulan kadın)
//  - Belirtilmemişse: Venüs (eş potansiyeli) ve Mars (ilişki potansiyeli)
// Her gösterge burcu, bulunduğu ev, geri hareketi, yanıklığı ve en tam natal açılarıyla (orb ≤ 8°) okunur.
// Pro plan: 7. evin yöneticisinin bulunduğu ev ve burç (eşle nerede tanışılır), evlilik potansiyeli yüzdesi ve
// en güçlü üç evlilik dönemi (js/motor/evlilik.js).
(() => {
  'use strict';

  const S = window.Astroship;
  const { BURCLAR, burcIndeksi } = S;

  const ESLER = { kadin: ['gunes', 'mars'], erkek: ['ay', 'venus'], belirtilmedi: ['venus', 'mars'] };

  // Natal açılar: en tam olanlar önce, orb en fazla ACI_ORB
  const ACI_ORB = 8;
  const ACI_SAYISI = 3;

  // Yanık: Güneş'e 0°–8°30' tam yanık, 8°30'–17° Güneş ışınları altında (USB). Ay ve kolektif gezegenler yanmaz,
  // Merkür ve Venüs ancak 1° içinde ciddi yanık sayılır, 1°–8°30' arası hafif (USB gibi) okunur.
  function yanikDurumu(harita, anahtar) {
    if (!['merkur', 'venus', 'mars', 'jupiter', 'saturn'].includes(anahtar)) return null;
    const uzaklik = S.aciFarki(harita.gezegenler[anahtar].boylam, harita.gezegenler.gunes.boylam);
    if (anahtar === 'merkur' || anahtar === 'venus') return uzaklik <= 1 ? 'yanik' : uzaklik <= 8.5 ? 'usb' : null;
    return uzaklik <= 8.5 ? 'yanik' : uzaklik <= 17 ? 'usb' : null;
  }

  function detay(harita, anahtar) {
    const acilar = S.haritaAcilari(harita)
      .filter(({ a, b, aci }) => (a.anahtar === anahtar || b.anahtar === anahtar) && aci.orb <= ACI_ORB)
      .slice(0, ACI_SAYISI)
      .map(({ a, b, aci }) => ({ diger: a.anahtar === anahtar ? b : a, aci }));
    return {
      nokta: harita.gezegenler[anahtar],
      acilar,
      yanik: yanikDurumu(harita, anahtar),
    };
  }

  function bireyselAnaliz(harita, cinsiyet, simdi = new Date()) {
    const g = harita.gezegenler;
    const c = ESLER[cinsiyet] ? cinsiyet : 'belirtilmedi';
    const [esGostergesi, cekimGostergesi] = ESLER[c];
    const yonetici = BURCLAR[burcIndeksi(harita.evler[6])].yonetici;
    return {
      cinsiyet: c,
      es: g[esGostergesi],
      cekim: g[cekimGostergesi],
      gunes: g.gunes,
      detay: { es: detay(harita, esGostergesi), cekim: detay(harita, cekimGostergesi) },
      // Eşle nerede tanışılır: 7. evin yöneticisinin bulunduğu ev ve burç
      yonetici: g[yonetici],
      // Alçalan'ın (7. ev girişi) burcu: tanışma için ikinci sahne
      yedinciBurc: burcIndeksi(harita.evler[6]),
      // Kuzey Ay Düğümü 7. evde ya da Alçalan'a 6° içinde
      dugum7: g.kuzeyDugum.ev === 7 || S.aciFarki(g.kuzeyDugum.boylam, harita.evler[6]) <= 6,
      evlilik: S.evlilikPotansiyeli(harita, c),
      evlilikNoktasi: S.evlilikNoktasi(harita, c),
      tarihler: S.evlilikTarihleri(harita, c, simdi),
    };
  }

  Object.assign(S, { bireyselAnaliz, ES_GOSTERGELERI: ESLER });
})();
