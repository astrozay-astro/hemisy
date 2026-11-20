// Gökyüzü: belirli bir an ya da aralık için gezegenlerin hareketi. Burç yorumları ve Ay takvimi bu hesaplara dayanır.
//  - Ay'ın durumu: burcu, derecesi, evresi, aydınlık yüzdesi, bir sonraki burç geçişi
//  - Ay takvimi: ayın her günü için Ay'ın burcu, gün içindeki burç geçişi ve ay evresi olayları
//  - Olaylar: gezegenlerin burç geçişleri, retro ve düz duruşları, yeniay, dolunay ve dördünler, tutulmalar,
//    gezegenler arası tam açılar (kavuşum, altmışlık, kare, üçgen, karşıtlık)
// Saatler Türkiye saatidir. Türkiye 2016'dan beri kalıcı olarak UTC+3 kullanır, gün sınırları buna göre alınır.
// Bulunan anlar ikiye bölme yöntemiyle bir dakikadan daha hassas hesaplanır.
(() => {
  'use strict';

  const S = window.Astroship;
  const A = window.Astronomy;
  const { norm, burcIndeksi } = S;

  const DAKIKA = 6e4;
  const SAAT = 36e5;
  const GUN = 864e5;
  const TR = 3 * SAAT;
  const GOVDE = { gunes: 'Sun', ay: 'Moon', merkur: 'Mercury', venus: 'Venus', mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn' };
  const YAVAS_GEZEGENLER = ['gunes', 'merkur', 'venus', 'mars', 'jupiter', 'saturn'];
  const RETRO_GEZEGENLER = ['merkur', 'venus', 'mars', 'jupiter', 'saturn'];
  // Açının hedef açıklığı (iki boylamın farkı, 0–360) ve kimliği
  const ACI_HEDEFLERI = [[0, 'kavusum'], [60, 'altmislik'], [300, 'altmislik'], [90, 'kare'], [270, 'kare'], [120, 'ucgen'], [240, 'ucgen'], [180, 'karsit']];
  const EVRE_ADLARI = ['Yeniay', 'Hilal', 'İlk dördün', 'Büyüyen Ay', 'Dolunay', 'Küçülen Ay', 'Son dördün', 'Balsamik Ay'];

  const boylam = (anahtar, tarih) => S.govdeBoylami(GOVDE[anahtar], A.MakeTime(tarih));
  const hiz = (anahtar, tarih) => norm(boylam(anahtar, new Date(+tarih + GUN / 2)) - boylam(anahtar, new Date(+tarih - GUN / 2)) + 180) - 180;

  // Türkiye saatiyle bir günün başlangıcı (UTC Date) ve bir anın Türkiye saatindeki parçaları
  const gunBasi = (yil, ay, gun) => new Date(Date.UTC(yil, ay, gun) - TR);
  function trParcalar(tarih) {
    const t = new Date(+tarih + TR);
    return { yil: t.getUTCFullYear(), ay: t.getUTCMonth(), gun: t.getUTCDate(), saat: t.getUTCHours(), dakika: t.getUTCMinutes(), haftaGunu: (t.getUTCDay() + 6) % 7 };
  }
  const saatYaz = (tarih) => { const p = trParcalar(tarih); return `${String(p.saat).padStart(2, '0')}:${String(p.dakika).padStart(2, '0')}`; };

  // f(lo) ve f(hi) farklıyken değişimin anını bir dakikaya kadar daralt
  function ikiyeBol(lo, hi, ayni) {
    let a = +lo;
    let b = +hi;
    while (b - a > DAKIKA / 2) {
      const orta = (a + b) / 2;
      if (ayni(new Date(orta))) a = orta; else b = orta;
    }
    return new Date(b);
  }

  // Bir gökcisminin aralıktaki burç geçişleri: [{ tarih, burc, onceki }]
  function burcGecisleri(anahtar, bas, son, adim = anahtar === 'ay' ? 3 * SAAT : GUN) {
    const sonuc = [];
    let t = +bas;
    let b = burcIndeksi(boylam(anahtar, bas));
    while (t < +son) {
      const t2 = Math.min(t + adim, +son);
      const b2 = burcIndeksi(boylam(anahtar, new Date(t2)));
      if (b2 !== b) {
        const onceki = b;
        sonuc.push({ anahtar, tarih: ikiyeBol(t, t2, (x) => burcIndeksi(boylam(anahtar, x)) === onceki), burc: b2, onceki });
        b = b2;
      }
      t = t2;
    }
    return sonuc;
  }

  // Retro ve düz duruşlar: [{ anahtar, tarih, tur: 'geri' | 'duz', burc }]
  function duruslar(anahtar, bas, son) {
    const sonuc = [];
    let t = +bas;
    let geri = hiz(anahtar, bas) < 0;
    while (t < +son) {
      const t2 = Math.min(t + GUN, +son);
      const geri2 = hiz(anahtar, new Date(t2)) < 0;
      if (geri2 !== geri) {
        const onceki = geri;
        const tarih = ikiyeBol(t, t2, (x) => (hiz(anahtar, x) < 0) === onceki);
        sonuc.push({ anahtar, tarih, tur: geri2 ? 'geri' : 'duz', burc: burcIndeksi(boylam(anahtar, tarih)) });
        geri = geri2;
      }
      t = t2;
    }
    return sonuc;
  }

  // Yeniay (0), ilk dördün (1), dolunay (2), son dördün (3): [{ tur, tarih, burc }]
  function ayEvreleri(bas, son) {
    const sonuc = [];
    let q = A.SearchMoonQuarter(A.MakeTime(bas));
    while (q.time.date < son) {
      sonuc.push({ tur: q.quarter, tarih: q.time.date, burc: burcIndeksi(boylam('ay', q.time.date)) });
      q = A.NextMoonQuarter(q);
    }
    return sonuc;
  }

  // Tutulmalar sabit tablodan (js/veri/tutulmalar.js): Ay tutulması dolunayda, Güneş tutulması yeniayda olur
  function tutulmalar(bas, son) {
    return (window.ASTROSHIP_TUTULMALAR || [])
      .map(([dakika, b]) => ({ tarih: new Date(dakika * DAKIKA), burc: burcIndeksi(b) }))
      .filter((t) => t.tarih >= bas && t.tarih < son)
      .map((t) => ({ ...t, tur: Math.abs(norm(boylam('ay', t.tarih) - boylam('gunes', t.tarih)) - 180) < 30 ? 'ay' : 'gunes' }));
  }

  // İki gökcismi arasındaki tam açılar: [{ a, b, aci, tarih }]
  function tamAcilar(a, b, bas, son, adim) {
    const sonuc = [];
    const fark = (x) => norm(boylam(a, x) - boylam(b, x));
    let t = +bas;
    let f = fark(bas);
    while (t < +son) {
      const t2 = Math.min(t + adim, +son);
      const f2 = fark(new Date(t2));
      for (const [hedef, aci] of ACI_HEDEFLERI) {
        const h1 = norm(f - hedef + 180) - 180;
        const h2 = norm(f2 - hedef + 180) - 180;
        if (Math.sign(h1) !== Math.sign(h2) && Math.abs(h1) < 30 && Math.abs(h2) < 30) {
          const isaret = Math.sign(h1);
          sonuc.push({ a, b, aci, tarih: ikiyeBol(t, t2, (x) => Math.sign(norm(fark(x) - hedef + 180) - 180) === isaret) });
        }
      }
      t = t2;
      f = f2;
    }
    return sonuc;
  }

  // Bir anda gökcisimlerinin konumu: { anahtar: { boylam, burc, derece, geri } }
  function konumlar(tarih) {
    return Object.fromEntries(Object.keys(GOVDE).map((k) => {
      const b = boylam(k, tarih);
      return [k, { boylam: b, burc: burcIndeksi(b), derece: b % 30, geri: k !== 'gunes' && k !== 'ay' && hiz(k, tarih) < 0 }];
    }));
  }

  // Ay'ın durumu: burç, derece, evre adı ve sırası (0–7), aydınlık yüzdesi, bir sonraki burç geçişi
  function ayDurumu(tarih = new Date()) {
    const b = boylam('ay', tarih);
    const faz = A.MoonPhase(A.MakeTime(tarih));
    const evre = Math.floor(norm(faz + 22.5) / 45) % 8;
    return {
      burc: burcIndeksi(b),
      derece: b % 30,
      faz,
      evre,
      evreAdi: EVRE_ADLARI[evre],
      aydinlik: Math.round(((1 - Math.cos((faz * Math.PI) / 180)) / 2) * 100),
      sonrakiGecis: burcGecisleri('ay', tarih, new Date(+tarih + 3 * GUN))[0] || null,
    };
  }

  // Ay takvimi: ayın her günü için günün başındaki burç, gün içindeki geçiş, evre olayı ve öğlen evresi
  function ayTakvimi(yil, ay) {
    const bas = gunBasi(yil, ay, 1);
    const gunSayisi = new Date(Date.UTC(yil, ay + 1, 0)).getUTCDate();
    const son = gunBasi(yil, ay, gunSayisi + 1);
    const gecisler = burcGecisleri('ay', bas, son, 2 * SAAT);
    const evreler = ayEvreleri(bas, son);
    const gunler = [];
    for (let g = 1; g <= gunSayisi; g++) {
      const gb = gunBasi(yil, ay, g);
      const gs = new Date(+gb + GUN);
      const icinde = (x) => x.tarih >= gb && x.tarih < gs;
      gunler.push({
        gun: g,
        burc: burcIndeksi(boylam('ay', gb)),
        gecis: gecisler.find(icinde) || null,
        olay: evreler.find(icinde) || null,
        faz: A.MoonPhase(A.MakeTime(new Date(+gb + 12 * SAAT))),
      });
    }
    return { yil, ay, ilkHaftaGunu: trParcalar(bas).haftaGunu, gunler };
  }

  // Ay'ın evre ikonu (SVG): faz 0 yeniay, 180 dolunay. Aydınlık kısım büyürken sağda, küçülürken solda.
  // Gölge sınırı bir elips yaydır: ayın yarısından azı aydınsa aydınlık tarafa, fazlası aydınsa karşı tarafa doğru kavislenir.
  function ayIkonu(faz, boyut = 24, sinif = 'ay-ikonu') {
    const r = 10;
    const k = Math.cos((faz * Math.PI) / 180);
    const buyuyen = norm(faz) < 180;
    const kenar = buyuyen ? 1 : 0;
    const sinir = buyuyen ? (k < 0 ? 1 : 0) : (k < 0 ? 0 : 1);
    const rx = Math.abs(k * r).toFixed(2);
    return `<svg class="${sinif}" width="${boyut}" height="${boyut}" viewBox="-12 -12 24 24" aria-hidden="true">`
      + `<circle r="${r}" class="ay-golge"/>`
      + `<path class="ay-isik" d="M0,-${r} A${r},${r} 0 0 ${kenar} 0,${r} A${rx},${r} 0 0 ${sinir} 0,-${r}Z"/></svg>`;
  }

  // Aralıktaki bütün olaylar (burç yorumları için). ayDahil: Ay'ın burç geçişleri ve Ay'ın gezegenlerle açıları
  function olaylar(bas, son, { ayDahil = false } = {}) {
    const gecisler = YAVAS_GEZEGENLER.flatMap((k) => burcGecisleri(k, bas, son));
    const retrolar = RETRO_GEZEGENLER.flatMap((k) => duruslar(k, bas, son));
    const acilar = [];
    for (let i = 0; i < YAVAS_GEZEGENLER.length; i++) {
      for (let j = i + 1; j < YAVAS_GEZEGENLER.length; j++) acilar.push(...tamAcilar(YAVAS_GEZEGENLER[i], YAVAS_GEZEGENLER[j], bas, son, GUN));
    }
    const sonuc = {
      bas, son, gecisler, retrolar, acilar,
      evreler: ayEvreleri(bas, son),
      tutulmalar: tutulmalar(bas, son),
      basKonum: konumlar(bas),
      sonKonum: konumlar(new Date(+son - 1)),
    };
    if (ayDahil) {
      sonuc.ayGecisleri = burcGecisleri('ay', bas, son, 2 * SAAT);
      sonuc.ayAcilari = YAVAS_GEZEGENLER.flatMap((k) => tamAcilar('ay', k, bas, son, 2 * SAAT));
    }
    return sonuc;
  }

  Object.assign(S, {
    gokyuzu: { ayIkonu, gunBasi, trParcalar, saatYaz, burcGecisleri, duruslar, ayEvreleri, tutulmalar, tamAcilar, konumlar, ayDurumu, ayTakvimi, olaylar, EVRE_ADLARI, GUN, TR },
  });
})();
