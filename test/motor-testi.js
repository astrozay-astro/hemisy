// Hesaplama motoru testi. macOS'ta çalıştırma:  osascript -l JavaScript test/motor-testi.js
// Bilinen haritaları (astro.com, Placidus, gerçek düğüm) motorun sonuçlarıyla karşılaştırır.
ObjC.import('Foundation');

const KOK = $.NSFileManager.defaultManager.currentDirectoryPath.js;
const oku = (yol) => $.NSString.stringWithContentsOfFileEncodingError(`${KOK}/${yol}`, $.NSUTF8StringEncoding, null).js;
const genel = globalThis;
genel.window = genel;

['js/kutuphane/astronomy.browser.min.js', 'js/kutuphane/luxon.min.js', 'js/motor/burclar.js',
  'js/motor/zaman.js', 'js/motor/harita.js', 'js/motor/acilar.js'].forEach((d) => (0, eval)(oku(d)));

const S = genel.Astroship;
const satirlar = [];
let hata = 0;

function kontrol(ad, hesaplanan, beklenen, tolerans) {
  const fark = S.aciFarki(hesaplanan, beklenen) * 60;
  const tamam = fark <= tolerans;
  if (!tamam) hata++;
  satirlar.push(`${tamam ? 'TAMAM' : 'HATA '}  ${ad.padEnd(28)} hesap ${S.burcBilgisi(hesaplanan).metin.padEnd(16)} beklenen ${S.burcBilgisi(beklenen).metin.padEnd(16)} fark ${fark.toFixed(1)}'`);
}

// 1) Einstein: 14 Mart 1879, 11:30 LMT, Ulm (48°24'K, 9°59'D) → 10:50:04 UT (astro.com)
const ein = S.haritaHesapla(new Date(Date.UTC(1879, 2, 14, 10, 50, 4)), 48 + 24 / 60, 9 + 59 / 60);
const b = (burc, d, dk) => burc * 30 + d + dk / 60;
kontrol('Einstein Güneş', ein.gezegenler.gunes.boylam, b(11, 23, 30), 2);
kontrol('Einstein Ay', ein.gezegenler.ay.boylam, b(8, 14, 32), 2);
kontrol('Einstein Merkür', ein.gezegenler.merkur.boylam, b(0, 3, 9), 2);
kontrol('Einstein Venüs', ein.gezegenler.venus.boylam, b(0, 16, 59), 2);
kontrol('Einstein Mars', ein.gezegenler.mars.boylam, b(9, 26, 55), 2);
kontrol('Einstein Jüpiter', ein.gezegenler.jupiter.boylam, b(10, 27, 29), 2);
kontrol('Einstein Satürn', ein.gezegenler.saturn.boylam, b(0, 4, 11), 2);
kontrol('Einstein Yükselen', ein.gezegenler.yukselen.boylam, b(3, 11, 38), 3);
kontrol('Einstein MC', ein.gezegenler.mc.boylam, b(11, 12, 50), 3);

// 2) 2026 Mart ekinoksu: 20 Mart 2026 14:46 UTC → Güneş 0° Koç
kontrol('Ekinoks 2026 Güneş', S.haritaHesapla(new Date(Date.UTC(2026, 2, 20, 14, 46)), 41, 29).gezegenler.gunes.boylam, 0, 1.5);

// 3) Türkiye saat dilimi geçmişi
const tz = [
  ['1995-03-10', '19:40', 'UTC+2'], // kış saati
  ['1987-07-15', '12:00', 'UTC+3'], // yaz saati
  ['2015-12-01', '12:00', 'UTC+2'], // kalıcı UTC+3 öncesi kış
  ['2017-01-15', '12:00', 'UTC+3'], // kalıcı UTC+3
];
for (const [t, s, beklenen] of tz) {
  const { saatFarki } = S.yereldenUtc(t, s, 'Europe/Istanbul');
  const tamam = saatFarki === beklenen;
  if (!tamam) hata++;
  satirlar.push(`${tamam ? 'TAMAM' : 'HATA '}  İstanbul ${t} ${s}`.padEnd(36) + ` → ${saatFarki} (beklenen ${beklenen})`);
}

// 4) Yalancı açı kuralı: 29° Koç – 2° Aslan (93°) kare sayılmamalı; 10° orb sınırı
const yalanci = S.aciBul(29, 122);
satirlar.push(`${yalanci ? 'HATA ' : 'TAMAM'}  29° Koç – 2° Aslan: ${yalanci ? yalanci.ad : 'açı yok (doğru)'}`);
if (yalanci) hata++;
const orb10 = S.aciBul(5, 135);
const orb11 = S.aciBul(5, 136);
satirlar.push(`${orb10 && !orb11 ? 'TAMAM' : 'HATA '}  5° Koç – 15° Aslan (orb 10°) üçgen var, 5° Koç – 16° Aslan (orb 11°) yok`);
if (!(orb10 && !orb11)) hata++;

// 5) Ev girişleri (Einstein, Placidus)
satirlar.push(`\nEinstein ev sistemi: ${ein.evSistemi}`);
ein.evler.forEach((k, i) => satirlar.push(`  ${String(i + 1).padStart(2)}. ev: ${S.burcBilgisi(k).metin}`));
satirlar.push(`\n${hata ? `${hata} HATA` : 'Tüm testler geçti'}`);
satirlar.join('\n');
