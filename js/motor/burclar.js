// Burçlar, gezegenler ve derece yardımcıları.
// Her burcun elementi, niteliği, geleneksel yöneticisi ve (varsa) modern eş yöneticisi burada tanımlıdır.
(() => {
  'use strict';

  // de: bulunma eki ("Koç'ta", "Boğa'da")
  const BURCLAR = [
    { ad: 'Koç', de: "Koç'ta", glif: '♈', element: 'ateş', nitelik: 'öncü', yonetici: 'mars' },
    { ad: 'Boğa', de: "Boğa'da", glif: '♉', element: 'toprak', nitelik: 'sabit', yonetici: 'venus' },
    { ad: 'İkizler', de: "İkizler'de", glif: '♊', element: 'hava', nitelik: 'değişken', yonetici: 'merkur' },
    { ad: 'Yengeç', de: "Yengeç'te", glif: '♋', element: 'su', nitelik: 'öncü', yonetici: 'ay' },
    { ad: 'Aslan', de: "Aslan'da", glif: '♌', element: 'ateş', nitelik: 'sabit', yonetici: 'gunes' },
    { ad: 'Başak', de: "Başak'ta", glif: '♍', element: 'toprak', nitelik: 'değişken', yonetici: 'merkur' },
    { ad: 'Terazi', de: "Terazi'de", glif: '♎', element: 'hava', nitelik: 'öncü', yonetici: 'venus' },
    { ad: 'Akrep', de: "Akrep'te", glif: '♏', element: 'su', nitelik: 'sabit', yonetici: 'mars', esYonetici: 'pluton' },
    { ad: 'Yay', de: "Yay'da", glif: '♐', element: 'ateş', nitelik: 'değişken', yonetici: 'jupiter' },
    { ad: 'Oğlak', de: "Oğlak'ta", glif: '♑', element: 'toprak', nitelik: 'öncü', yonetici: 'saturn' },
    { ad: 'Kova', de: "Kova'da", glif: '♒', element: 'hava', nitelik: 'sabit', yonetici: 'saturn', esYonetici: 'uranus' },
    { ad: 'Balık', de: "Balık'ta", glif: '♓', element: 'su', nitelik: 'değişken', yonetici: 'jupiter', esYonetici: 'neptun' },
  ];

  // iyelik: "Ayşe'nin Venüs'ü" gibi cümlelerde kullanılan biçim
  const NOKTALAR = {
    gunes: { ad: 'Güneş', iyelik: "Güneş'i", glif: '☉' },
    ay: { ad: 'Ay', iyelik: "Ay'ı", glif: '☽' },
    merkur: { ad: 'Merkür', iyelik: "Merkür'ü", glif: '☿' },
    venus: { ad: 'Venüs', iyelik: "Venüs'ü", glif: '♀' },
    mars: { ad: 'Mars', iyelik: "Mars'ı", glif: '♂' },
    jupiter: { ad: 'Jüpiter', iyelik: "Jüpiter'i", glif: '♃' },
    saturn: { ad: 'Satürn', iyelik: "Satürn'ü", glif: '♄' },
    uranus: { ad: 'Uranüs', iyelik: "Uranüs'ü", glif: '♅' },
    neptun: { ad: 'Neptün', iyelik: "Neptün'ü", glif: '♆' },
    pluton: { ad: 'Plüton', iyelik: "Plüton'u", glif: '♇' },
    kuzeyDugum: { ad: 'Kuzey Ay Düğümü', iyelik: 'Kuzey Ay Düğümü', glif: '☊' },
    yukselen: { ad: 'Yükselen', iyelik: "Yükselen'i", glif: 'AC' },
    mc: { ad: 'MC', iyelik: "MC'si", glif: 'MC' },
  };

  const norm = (x) => ((x % 360) + 360) % 360;

  // İki boylam arasındaki en kısa yay (0–180°)
  const aciFarki = (a, b) => {
    const d = Math.abs(norm(a) - norm(b));
    return d > 180 ? 360 - d : d;
  };

  const burcIndeksi = (boylam) => Math.floor(norm(boylam) / 30);

  // 14.1333 → "14°08'" (dakikalar aşağı yuvarlanır, astro.com ile aynı biçim)
  function dereceYaz(derece) {
    let d = Math.floor(derece);
    let dk = Math.floor((derece - d) * 60 + 1e-9);
    if (dk === 60) { d += 1; dk = 0; }
    return `${d}°${String(dk).padStart(2, '0')}'`;
  }

  function burcBilgisi(boylam) {
    const i = burcIndeksi(boylam);
    const burcIci = norm(boylam) - i * 30;
    return { indeks: i, burc: BURCLAR[i], derece: burcIci, metin: `${dereceYaz(burcIci)} ${BURCLAR[i].ad}` };
  }

  // İki burcun element ve nitelik ilişkisi.
  // Burçlar arası mesafe ilişkiyi belirler: aynı burç, 60° (uyumlu element), 90° (aynı nitelik),
  // 120° (aynı element), 150° (ortak noktası yok), 180° (uyumlu element + aynı nitelik).
  function burcIliskisi(i, j) {
    const a = BURCLAR[i];
    const b = BURCLAR[j];
    const uyumluElement = (x, y) => (x === 'ateş' && y === 'hava') || (x === 'hava' && y === 'ateş')
      || (x === 'toprak' && y === 'su') || (x === 'su' && y === 'toprak');
    let mesafe = Math.abs(i - j);
    if (mesafe > 6) mesafe = 12 - mesafe;
    return {
      mesafe,
      ayniElement: a.element === b.element,
      uyumluElement: uyumluElement(a.element, b.element),
      ayniNitelik: a.nitelik === b.nitelik,
    };
  }

  window.Astroship = window.Astroship || {};
  Object.assign(window.Astroship, { BURCLAR, NOKTALAR, norm, aciFarki, burcIndeksi, burcBilgisi, burcIliskisi, dereceYaz });
})();
