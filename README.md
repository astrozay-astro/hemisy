# hēmisy

www.hemisy.com · info@hemisy.com

Türkçe astroloji uyum testi: iki kişinin doğum haritasını karşılaştırır (sinastri), ilişkinin kompozit ve Davison haritalarını yorumlar.

## Klasörler

- `index.html`: sitenin giriş dosyası
- `css/style.css`: tasarım (renkler, yazı tipi, tüm görünüm)
- `marka/`: logo (hemisy-isim.png: yalnızca isim; hemisy-logo.png: imzalı; -acik: koyu zemin için)
- `js/app.js`: ekranlar ve aralarındaki geçişler
- `js/turkce.js`: isimlere doğru Türkçe eki getiren yardımcı (Ayşe'nin, Mehmet'in)
- `js/motor/`: hesaplama motoru
  - `harita.js`: gezegenler, Yükselen, MC, Placidus evleri, gerçek Ay düğümü
  - `acilar.js`: açılar (burç + derece kuralı, orb en fazla 10°)
  - `burclar.js`: burçlar, element, nitelik, yöneticiler
  - `zaman.js`: yerel saatten dünya saatine (UTC) çevirme
  - `konum.js`: doğum yerini koordinata ve saat dilimine çevirme
  - `karma.js`: drakonik haritalar, ruh noktaları (Güney Düğüm, Vertex, Kara Ay, kısmetler) ve karmik temaslar
  - `vedik.js`: yıldızsal zodyak (Lahiri), nakşatralar, Aştakuta (36 puan), Mangal Doşa, Atmakaraka / Darakaraka
- `js/yorum/`: yorum metinleri ve onları haritaya göre birleştiren kod (uyum, ilişki yapısı, karmik bağ)
- `js/veri/sehirler.js`: 81 il ve yurt dışındaki şehirler
- `js/kutuphane/`: Astronomy Engine (gezegen hesabı) ve Luxon (saat dilimleri)

## Test

macOS'ta: `osascript -l JavaScript test/motor-testi.js`
