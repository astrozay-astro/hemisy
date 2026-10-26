// Doğum yerini koordinata ve saat dilimine çevirir.
// Önce uygulamanın içindeki listeye bakar; bulamazsa ücretsiz Open-Meteo yer arama servisini kullanır.
(() => {
  'use strict';

  const sade = (s) => s.toLocaleLowerCase('tr').trim().replace(/\s+/g, ' ');

  async function yerBul(metin) {
    const aranan = sade(metin.split(',')[0]);
    const yerel = window.ASTROSHIP_SEHIRLER.find((s) => sade(s.ad) === aranan);
    if (yerel) return yerel;

    const adres = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(aranan)}&count=1&language=tr&format=json`;
    let veri;
    try {
      const yanit = await fetch(adres);
      veri = await yanit.json();
    } catch {
      return null;
    }
    const y = veri?.results?.[0];
    if (!y || !y.timezone) return null;
    return { ad: y.name, ulke: y.country, il: y.admin1, enlem: y.latitude, boylam: y.longitude, bolge: y.timezone };
  }

  window.Astroship = window.Astroship || {};
  window.Astroship.yerBul = yerBul;
})();
