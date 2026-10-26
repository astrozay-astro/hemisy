// Açı kuralları:
//  1) Açı hem burç hem derece olarak geçerli olmalı. İki nokta açının gerektirdiği burç mesafesinde
//     durmuyorsa (ör. 29° Koç ile 2° Aslan arası 93° olsa da Koç–Aslan üçgen burçlardır) açı sayılmaz.
//     Böylece burç sınırını aşan "yalancı açılar" oluşmaz.
//  2) Orb tüm açılar ve tüm noktalar için en fazla 10°.
(() => {
  'use strict';

  const { aciFarki, burcIndeksi, burcIliskisi } = window.Astroship;

  const ORB = 10;

  const ACILAR = [
    { id: 'kavusum', ad: 'Kavuşum', glif: '☌', derece: 0, burcMesafesi: 0 },
    { id: 'altmislik', ad: 'Altmışlık', glif: '⚹', derece: 60, burcMesafesi: 2 },
    { id: 'kare', ad: 'Kare', glif: '□', derece: 90, burcMesafesi: 3 },
    { id: 'ucgen', ad: 'Üçgen', glif: '△', derece: 120, burcMesafesi: 4 },
    { id: 'quincunx', ad: 'Quincunx', glif: '⚻', derece: 150, burcMesafesi: 5 },
    { id: 'karsit', ad: 'Karşıt', glif: '☍', derece: 180, burcMesafesi: 6 },
  ];

  function aciBul(boylam1, boylam2) {
    const ayrim = aciFarki(boylam1, boylam2);
    const iliski = burcIliskisi(burcIndeksi(boylam1), burcIndeksi(boylam2));
    for (const aci of ACILAR) {
      const orb = Math.abs(ayrim - aci.derece);
      if (aci.burcMesafesi === iliski.mesafe && orb <= ORB) return { ...aci, orb, iliski };
    }
    return null;
  }

  // Tek haritadaki açılar (natal, Davison, kompozit)
  function haritaAcilari(harita) {
    const noktalar = Object.values(harita.gezegenler);
    const sonuc = [];
    for (let i = 0; i < noktalar.length; i++) {
      for (let j = i + 1; j < noktalar.length; j++) {
        const a = noktalar[i];
        const b = noktalar[j];
        if (a.anahtar === 'yukselen' && b.anahtar === 'mc') continue;
        const aci = aciBul(a.boylam, b.boylam);
        if (aci) sonuc.push({ a, b, aci });
      }
    }
    return sonuc.sort((x, y) => x.aci.orb - y.aci.orb);
  }

  // İki harita arasındaki açılar (sinastri): 1. kişinin her noktası × 2. kişinin her noktası
  function sinastriAcilari(harita1, harita2) {
    const sonuc = [];
    for (const a of Object.values(harita1.gezegenler)) {
      for (const b of Object.values(harita2.gezegenler)) {
        const aci = aciBul(a.boylam, b.boylam);
        if (aci) sonuc.push({ a, b, aci });
      }
    }
    return sonuc.sort((x, y) => x.aci.orb - y.aci.orb);
  }

  Object.assign(window.Astroship, { ORB, ACILAR, aciBul, haritaAcilari, sinastriAcilari });
})();
