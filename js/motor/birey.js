// Bireysel ilişki analizi: tek bir doğum haritasından kişinin ilişki potansiyeli.
// Klasik okuma, cinsiyete göre eş göstergeleri:
//  - Kadın haritası: Güneş (eşte aranan erkek) ve Mars (çekim duyulan erkek)
//  - Erkek haritası: Ay (eşte aranan kadın) ve Venüs (çekim duyulan kadın)
//  - Belirtilmemişse: Venüs (sevme biçimi) ve Mars (arzu)
// Her haritada ayrıca 7. ev (girişindeki burç ve içindeki gezegenler) ile 7. evin yöneticisi (dispozitörü):
// yöneticinin bulunduğu ev, burç ve geleneksel gücü (yönetim, yücelim, zarar, düşüş).
(() => {
  'use strict';

  const S = window.Astroship;
  const { BURCLAR, burcIndeksi } = S;

  const ESLER = { kadin: ['gunes', 'mars'], erkek: ['ay', 'venus'], belirtilmedi: ['venus', 'mars'] };
  const YEDINCIDE_SAYILAN = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptun', 'pluton', 'kuzeyDugum'];

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
        gezegenler: YEDINCIDE_SAYILAN.filter((a) => g[a].ev === 7).map((a) => g[a]),
      },
      yonetici: { nokta: g[yonetici], guc: S.gezegenGucu(yonetici, g[yonetici].boylam) },
    };
  }

  Object.assign(S, { bireyselAnaliz, ES_GOSTERGELERI: ESLER });
})();
