// Türkçe ek yardımcısı: özel isimlere ünlü uyumuna göre ek getirir (Ayşe'nin, Mehmet'in, Can'a, Umut'u...).
(() => {
  'use strict';

  const UNLULER = 'aeıioöuü';
  const SERT_UNSUZLER = 'fstkçşhp';

  const kucuk = (s) => s.toLocaleLowerCase('tr');

  function sonUnlu(kelime) {
    const k = kucuk(kelime);
    for (let i = k.length - 1; i >= 0; i--) {
      if (UNLULER.includes(k[i])) return k[i];
    }
    return 'e';
  }

  // Dörtlü uyum (ı/i/u/ü) ve ikili uyum (a/e)
  const dortlu = (u) => ({ a: 'ı', ı: 'ı', e: 'i', i: 'i', o: 'u', u: 'u', ö: 'ü', ü: 'ü' })[u];
  const ikili = (u) => ('aıou'.includes(u) ? 'a' : 'e');

  // tur: 'in' (ilgi: Ayşe'nin), 'i' (belirtme: Ayşe'yi), 'e' (yönelme: Ayşe'ye),
  //      'de' (bulunma: Mehmet'te), 'le' (birliktelik: Ayşe'yle)
  function ek(isim, tur) {
    const ad = String(isim).trim();
    if (!ad) return ad;
    const son = kucuk(ad).slice(-1);
    // Tek harflik ad (ör. "B"), harfin okunuşuyla çekimlenir: "be" → B'nin, B'ye
    const harf = ad.length === 1 && !UNLULER.includes(son);
    const unluyleBiter = harf || UNLULER.includes(son);
    const u = harf ? 'e' : sonUnlu(ad);
    let ekMetni;
    switch (tur) {
      case 'in': ekMetni = (unluyleBiter ? 'n' : '') + dortlu(u) + 'n'; break;
      case 'i': ekMetni = (unluyleBiter ? 'y' : '') + dortlu(u); break;
      case 'e': ekMetni = (unluyleBiter ? 'y' : '') + ikili(u); break;
      case 'de': ekMetni = (!harf && SERT_UNSUZLER.includes(son) ? 't' : 'd') + ikili(u); break;
      case 'le': ekMetni = (unluyleBiter ? 'y' : '') + 'l' + ikili(u); break;
      default: return ad;
    }
    return `${ad}'${ekMetni}`;
  }

  window.Turkce = { ek };
})();
