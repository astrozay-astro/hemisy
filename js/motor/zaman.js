// Yerel doğum saatini dünya saatine (UTC) çevirir.
// Saat dilimi geçmişi (yaz saati, Türkiye'nin 2016'da kalıcı UTC+3'e geçişi vb.) dünya saat dilimi veritabanından gelir.
(() => {
  'use strict';

  const { DateTime } = window.luxon;

  // tarih: '1995-03-10', saat: '19:40', bolge: 'Europe/Istanbul'
  function yereldenUtc(tarih, saat, bolge) {
    const yerel = DateTime.fromISO(`${tarih}T${saat}`, { zone: bolge });
    if (!yerel.isValid) throw new Error(`Tarih ya da saat okunamadı: ${tarih} ${saat}`);
    const dakika = yerel.offset;
    const isaret = dakika >= 0 ? '+' : '−';
    const mutlak = Math.abs(dakika);
    const saatFarki = `UTC${isaret}${Math.floor(mutlak / 60)}${mutlak % 60 ? `:${String(mutlak % 60).padStart(2, '0')}` : ''}`;
    return { utc: yerel.toUTC().toJSDate(), farkDakika: dakika, saatFarki };
  }

  window.Astroship = window.Astroship || {};
  window.Astroship.yereldenUtc = yereldenUtc;
})();
