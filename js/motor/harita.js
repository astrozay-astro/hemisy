// Doğum haritası hesabı: gezegen boylamları (tropikal, görünür konum), Yükselen, MC ve Placidus evleri.
// Gezegen konumları Astronomy Engine kütüphanesinden gelir (NASA JPL verisiyle doğrulanmış modeller).
(() => {
  'use strict';

  const A = window.Astronomy;
  const { norm, aciFarki, burcBilgisi } = window.Astroship;
  const RAD = Math.PI / 180;

  const GOVDELER = {
    gunes: 'Sun', ay: 'Moon', merkur: 'Mercury', venus: 'Venus', mars: 'Mars',
    jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptun: 'Neptune', pluton: 'Pluto',
  };

  // Gerçek ekliptik boylamı (tarihin ekinoksuna göre, ışık süresi ve sapma düzeltmeli)
  function govdeBoylami(govde, zaman) {
    if (govde === 'Sun') return A.SunPosition(zaman).elon;
    if (govde === 'Moon') return A.EclipticGeoMoon(zaman).lon;
    return A.Ecliptic(A.GeoVector(govde, zaman, true)).elon;
  }

  // Meeus, Astronomical Algorithms: Ay'ın temel argümanları ve nütasyon
  function temelArgumanlar(zaman) {
    const T = zaman.tt / 36525;
    const D = norm(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + (T ** 3) / 545868);
    const M = norm(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T);
    const Mp = norm(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + (T ** 3) / 69699);
    const F = norm(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T);
    const omega = norm(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + (T ** 3) / 467441);
    const L = norm(280.4665 + 36000.7698 * T);
    const Lp = norm(218.3165 + 481267.8813 * T);
    const s = (x) => Math.sin(x * RAD);
    const c = (x) => Math.cos(x * RAD);
    const nutasyonBoylam = (-17.20 * s(omega) - 1.32 * s(2 * L) - 0.23 * s(2 * Lp) + 0.21 * s(2 * omega)) / 3600;
    const nutasyonEgiklik = (9.20 * c(omega) + 0.57 * c(2 * L) + 0.10 * c(2 * Lp) - 0.09 * c(2 * omega)) / 3600;
    return { T, D, M, Mp, F, omega, nutasyonBoylam, nutasyonEgiklik };
  }

  function gercekEgiklik(zaman) {
    const { T, nutasyonEgiklik } = temelArgumanlar(zaman);
    const ortalama = 23.439291111 - (46.8150 * T + 0.00059 * T * T - 0.001813 * T ** 3) / 3600;
    return ortalama + nutasyonEgiklik;
  }

  // Gerçek (true) Kuzey Ay Düğümü
  function gercekDugum(zaman) {
    const { D, M, Mp, F, omega, nutasyonBoylam } = temelArgumanlar(zaman);
    const s = (x) => Math.sin(x * RAD);
    return norm(omega - 1.4979 * s(2 * (D - F)) - 0.1500 * s(M) - 0.1226 * s(2 * D)
      + 0.1176 * s(2 * F) - 0.0801 * s(2 * (F - Mp)) + nutasyonBoylam);
  }

  // Sağ açıklıktan (RA) ekliptik boylama
  const raBoylama = (ra, e) => norm(Math.atan2(Math.sin(ra * RAD), Math.cos(ra * RAD) * Math.cos(e * RAD)) / RAD);

  function eksenler(ramc, e, enlem) {
    const r = ramc * RAD;
    const mc = raBoylama(ramc, e);
    const asc = norm(Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(e * RAD) + Math.tan(enlem * RAD) * Math.sin(e * RAD))) / RAD);
    return { asc, mc };
  }

  // Placidus ev girişi: kesir = 1/3 veya 2/3; gece = 2. ve 3. evler (IC tarafından ölçülür)
  function placidusKuspu(ramc, e, enlem, kesir, gece) {
    const tf = Math.tan(enlem * RAD);
    const se = Math.sin(e * RAD);
    let boylam = raBoylama(gece ? ramc + 180 - kesir * 90 : ramc + kesir * 90, e);
    for (let i = 0; i < 100; i++) {
      const dek = Math.asin(se * Math.sin(boylam * RAD));
      const x = tf * Math.tan(dek);
      if (Math.abs(x) >= 1) return null; // kutup bölgesi: Placidus tanımsız
      const ad = Math.asin(x) / RAD;
      const ra = gece ? ramc + 180 - kesir * (90 - ad) : ramc + kesir * (90 + ad);
      const yeni = raBoylama(ra, e);
      if (aciFarki(yeni, boylam) < 1e-8) return yeni;
      boylam = yeni;
    }
    return boylam;
  }

  function evGirisleri(ramc, e, enlem) {
    const { asc, mc } = eksenler(ramc, e, enlem);
    const k11 = placidusKuspu(ramc, e, enlem, 1 / 3, false);
    const k12 = placidusKuspu(ramc, e, enlem, 2 / 3, false);
    const k2 = placidusKuspu(ramc, e, enlem, 2 / 3, true);
    const k3 = placidusKuspu(ramc, e, enlem, 1 / 3, true);
    let sistem = 'Placidus';
    let ust;
    if ([k11, k12, k2, k3].some((k) => k === null)) {
      // Porphyry: dörtlü yayları üçe böler
      sistem = 'Porphyry';
      const yay1 = norm(asc - mc);
      const yay2 = norm(mc + 180 - asc);
      ust = [norm(mc + yay1 / 3), norm(mc + (2 * yay1) / 3), norm(asc + yay2 / 3), norm(asc + (2 * yay2) / 3)];
    } else {
      ust = [k11, k12, k2, k3];
    }
    const [e11, e12, e2, e3] = ust;
    const yarim = [asc, e2, e3, norm(mc + 180), norm(e11 + 180), norm(e12 + 180)];
    const evler = [...yarim, ...yarim.map((k) => norm(k + 180))];
    // evler[0] = 1. ev (Yükselen) ... evler[9] = 10. ev (MC)
    return { asc, mc, evler, sistem };
  }

  function evBul(boylam, evler) {
    for (let i = 0; i < 12; i++) {
      const bas = evler[i];
      const son = evler[(i + 1) % 12];
      if (norm(boylam - bas) < norm(son - bas)) return i + 1;
    }
    return 12;
  }

  function nokta(anahtar, boylam, evler, ekler = {}) {
    return { anahtar, ...window.Astroship.NOKTALAR[anahtar], boylam, ...burcBilgisi(boylam), ev: evBul(boylam, evler), ...ekler };
  }

  // Bir an (UTC) ve bir yer için tam harita. Davison haritası da bu fonksiyonla hesaplanır.
  function haritaHesapla(utc, enlem, boylamDogu) {
    const zaman = A.MakeTime(utc);
    const e = gercekEgiklik(zaman);
    const ramc = norm(A.SiderealTime(zaman) * 15 + boylamDogu);
    const { asc, mc, evler, sistem } = evGirisleri(ramc, e, enlem);

    const onceki = zaman.AddDays(-0.5);
    const sonraki = zaman.AddDays(0.5);
    const gezegenler = {};
    for (const [anahtar, govde] of Object.entries(GOVDELER)) {
      const boylam = govdeBoylami(govde, zaman);
      const hareket = norm(govdeBoylami(govde, sonraki) - govdeBoylami(govde, onceki) + 180) - 180;
      gezegenler[anahtar] = nokta(anahtar, boylam, evler, { geri: hareket < 0 });
    }
    gezegenler.kuzeyDugum = nokta('kuzeyDugum', gercekDugum(zaman), evler);
    gezegenler.yukselen = nokta('yukselen', asc, evler);
    gezegenler.mc = nokta('mc', mc, evler);

    return { utc, enlem, boylam: boylamDogu, ramc, egiklik: e, evler, evSistemi: sistem, gezegenler };
  }

  Object.assign(window.Astroship, { haritaHesapla, evGirisleri, evBul, gercekEgiklik });
})();
