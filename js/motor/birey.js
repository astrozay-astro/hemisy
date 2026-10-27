// Bireysel ilişki analizi: tek bir doğum haritasından kişinin ilişki potansiyeli.
// Klasik okuma, cinsiyete göre eş göstergeleri:
//  - Kadın haritası: Güneş (eşte aranan erkek) ve Mars (çekim duyulan erkek)
//  - Erkek haritası: Ay (eşte aranan kadın) ve Venüs (çekim duyulan kadın)
//  - Belirtilmemişse: Venüs (sevme biçimi) ve Mars (arzu)
// Her haritada ayrıca 7. ev (girişindeki burç ve içindeki gezegenler) ile 7. evin yöneticisi (dispozitörü):
// yöneticinin bulunduğu ev, burç ve geleneksel gücü (yönetim, yücelim, zarar, düşüş).
// Her gösterge bütüncül okunur: burç, bulunduğu ev, yönettiği evler (geleneksel yöneticilik, Placidus girişleri),
// geri hareket ve en tam natal açıları (orb ≤ 8°).
// Derin analiz (Pro plan), ev türetme: partnerin evleri 7. evden itibaren sayılır. Görünüm: 7. ev (Alçalan burcu ve
// içindeki gezegenler), meslek: partnerin 10. evi = 4. ev, aile: partnerin 4. evi = 10. ev, maddi: partnerin 2. evi = 8. ev.
// Türetilmiş her evin yöneticisinin yeri ve geri hareketi de okunur.
(() => {
  'use strict';

  const S = window.Astroship;
  const { BURCLAR, burcIndeksi } = S;

  const ESLER = { kadin: ['gunes', 'mars'], erkek: ['ay', 'venus'], belirtilmedi: ['venus', 'mars'] };
  const YEDINCIDE_SAYILAN = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptun', 'pluton', 'kuzeyDugum'];

  const evdekiler = (g, ev) => YEDINCIDE_SAYILAN.filter((a) => g[a].ev === ev).map((a) => g[a]);

  // Partnerin evi (ör. 10. ev = meslek) kişinin haritasında hangi eve düşer: 7. evden itibaren sayım
  const turetilmisEv = (partnerEvi) => ((partnerEvi + 6 - 1) % 12) + 1;

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
      yonettigi: [...new Set(S.yonettigiEvler(harita, anahtar).map((x) => x.ev))],
      acilar,
      yanik: yanikDurumu(harita, anahtar),
    };
  }

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
      // Her göstergenin bütüncül okuması: bulunduğu ev, yönettiği evler, geri hareket ve en tam açıları
      detay: Object.fromEntries([['es', esGostergesi], ['cekim', cekimGostergesi], ['yonetici', yonetici]].map(([rol, anahtar]) => [rol, detay(harita, anahtar)])),
      // Ev türetme: partnerin evleri 7. evden itibaren sayılır
      turetilmis: Object.fromEntries([['gorunum', 1], ['meslek', 10], ['aile', 4], ['maddi', 2]].map(([ad, partnerEvi]) => {
        const ev = turetilmisEv(partnerEvi);
        const burc = burcIndeksi(harita.evler[ev - 1]);
        return [ad, { ev, burc, gezegenler: evdekiler(g, ev), yonetici: g[BURCLAR[burc].yonetici] }];
      })),
    };
  }

  Object.assign(S, { bireyselAnaliz, ES_GOSTERGELERI: ESLER });
})();
