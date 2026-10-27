// Bireysel ilişki analizi: tek bir doğum haritasından kişinin ilişki potansiyeli.
// Klasik okuma, cinsiyete göre eş göstergeleri:
//  - Kadın haritası: Güneş (eşte aranan erkek) ve Mars (çekim duyulan erkek)
//  - Erkek haritası: Ay (eşte aranan kadın) ve Venüs (çekim duyulan kadın)
//  - Belirtilmemişse: Venüs (sevme biçimi) ve Mars (arzu)
// Her haritada ayrıca 7. ev (girişindeki burç ve içindeki gezegenler) ile 7. evin yöneticisi (dispozitörü):
// yöneticinin bulunduğu ev, burç ve geleneksel gücü (yönetim, yücelim, zarar, düşüş).
// Derin analiz (Pro plan):
//  - Geri hareket: ilişki gezegenlerinden (Merkür, Venüs, Mars, Jüpiter, Satürn, 7. ev yöneticisi) geri olanlar
//  - Eş ve çekim göstergelerinin bulunduğu ve yönettiği evler (geleneksel yöneticilik, Placidus girişleri)
//  - Ev türetme: partnerin evleri 7. evden itibaren sayılır. Görünüm: 7. ev (Alçalan burcu ve içindeki gezegenler),
//    meslek: partnerin 10. evi = 4. ev, aile: partnerin 4. evi = 10. ev, maddi durum: partnerin 2. evi = 8. ev
(() => {
  'use strict';

  const S = window.Astroship;
  const { BURCLAR, burcIndeksi } = S;

  const ESLER = { kadin: ['gunes', 'mars'], erkek: ['ay', 'venus'], belirtilmedi: ['venus', 'mars'] };
  const YEDINCIDE_SAYILAN = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptun', 'pluton', 'kuzeyDugum'];

  const evdekiler = (g, ev) => YEDINCIDE_SAYILAN.filter((a) => g[a].ev === ev).map((a) => g[a]);
  const GERI_BAKILAN = ['merkur', 'venus', 'mars', 'jupiter', 'saturn'];

  // Partnerin evi (ör. 10. ev = meslek) kişinin haritasında hangi eve düşer: 7. evden itibaren sayım
  const turetilmisEv = (partnerEvi) => ((partnerEvi + 6 - 1) % 12) + 1;

  function bireyselAnaliz(harita, cinsiyet) {
    const g = harita.gezegenler;
    const [esGostergesi, cekimGostergesi] = ESLER[cinsiyet] || ESLER.belirtilmedi;
    const yedinciBurc = burcIndeksi(harita.evler[6]);
    const yonetici = BURCLAR[yedinciBurc].yonetici;
    return {
      cinsiyet: ESLER[cinsiyet] ? cinsiyet : 'belirtilmedi',
      es: g[esGostergesi],
      cekim: g[cekimGostergesi],
      yedinci: {
        kusp: harita.evler[6],
        burc: yedinciBurc,
        gezegenler: evdekiler(g, 7),
      },
      yonetici: { nokta: g[yonetici], guc: S.gezegenGucu(yonetici, g[yonetici].boylam) },
      // Derin analiz
      geri: [...new Set([...GERI_BAKILAN, yonetici])].filter((a) => g[a].geri).map((a) => ({
        nokta: g[a],
        roller: [a === esGostergesi && 'es', a === cekimGostergesi && 'cekim', a === yonetici && 'yonetici'].filter(Boolean),
      })),
      yonetimler: {
        es: S.yonettigiEvler(harita, esGostergesi).map((x) => x.ev),
        cekim: S.yonettigiEvler(harita, cekimGostergesi).map((x) => x.ev),
      },
      turetilmis: Object.fromEntries([['gorunum', 1], ['meslek', 10], ['aile', 4], ['maddi', 2]].map(([ad, partnerEvi]) => {
        const ev = turetilmisEv(partnerEvi);
        return [ad, { ev, burc: burcIndeksi(harita.evler[ev - 1]), gezegenler: evdekiler(g, ev) }];
      })),
    };
  }

  Object.assign(S, { bireyselAnaliz, ES_GOSTERGELERI: ESLER });
})();
