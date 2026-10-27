// Derin analiz: Helenistik, karmik ve neoklasik yorum için gereken göstergeler.
// Konular tüm burç evleriyle (whole sign) okunur: Yükselen'in burcu 1. ev, sonraki burç 2. ev, ...
//  - Sekt: gündüz/gece haritası; sektin iyicili ve kötücülü
//  - Gezegen gücü: yönetim, yücelim, zarar, düşüş (geleneksel yedi gezegen)
//  - Köşe / ardıl / düşen evler; Yükselen'i görmeme (aversion)
//  - Kısmetler: Talih, Ruh, Eros, Zorunluluk, Cesaret, Evlilik
//  - Yönetici zinciri: bir gezegenin burcunun yöneticisi nerede
//  - Ay Düğümleri ekseni, düğümlere kavuşan gezegenler, geri hareket eden gezegenler
(() => {
  'use strict';

  const S = window.Astroship;
  const { norm, burcIndeksi, BURCLAR, aciFarki } = S;

  const YUCELIM = { gunes: 0, ay: 1, merkur: 5, venus: 11, mars: 9, jupiter: 3, saturn: 6 };
  const GELENEKSEL = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn'];

  // Tüm burç evleri: Yükselen'in burcundan itibaren sayılır
  const burcEvi = (boylam, ascBoylam) => ((burcIndeksi(boylam) - burcIndeksi(ascBoylam) + 12) % 12) + 1;

  function guc(gezegen, boylam) {
    if (!GELENEKSEL.includes(gezegen)) return 'notr';
    const b = burcIndeksi(boylam);
    const yonettikleri = BURCLAR.map((x, i) => (x.yonetici === gezegen ? i : -1)).filter((i) => i >= 0);
    if (yonettikleri.includes(b)) return 'yonetim';
    if (YUCELIM[gezegen] === b) return 'yucelim';
    if (yonettikleri.some((i) => (i + 6) % 12 === b)) return 'zarar';
    if ((YUCELIM[gezegen] + 6) % 12 === b) return 'dusus';
    return 'notr';
  }

  const konumTuru = (ev) => ([1, 4, 7, 10].includes(ev) ? 'kose' : [2, 5, 8, 11].includes(ev) ? 'ardil' : 'dusen');

  function kismetler(g, gunduz) {
    const asc = g.yukselen.boylam;
    const fark = (a, b) => (gunduz ? norm(asc + a - b) : norm(asc + b - a));
    const talih = fark(g.ay.boylam, g.gunes.boylam);
    const ruh = fark(g.gunes.boylam, g.ay.boylam);
    return {
      talih,
      ruh,
      eros: fark(g.venus.boylam, ruh),
      zorunluluk: fark(talih, g.merkur.boylam),
      cesaret: fark(talih, g.mars.boylam),
      evlilik: norm(asc + g.venus.boylam - g.saturn.boylam),
    };
  }

  function derinAnaliz(harita) {
    const g = harita.gezegenler;
    const asc = g.yukselen.boylam;
    // Güneş ufkun üstündeyse (Yükselen'den itibaren 180°–360° arası) gündüz haritası
    const gunduz = norm(g.gunes.boylam - asc) >= 180;
    const sekt = {
      gunduz,
      iyicil: gunduz ? 'jupiter' : 'venus',
      kotucul: gunduz ? 'saturn' : 'mars',
      sektDisiKotucul: gunduz ? 'mars' : 'saturn',
    };

    const kuzey = g.kuzeyDugum.boylam;
    const guney = norm(kuzey + 180);
    const noktalar = {};
    for (const [anahtar, n] of Object.entries(g)) {
      const ev = burcEvi(n.boylam, asc);
      const yonetici = BURCLAR[n.indeks].yonetici;
      noktalar[anahtar] = {
        ev,
        guc: guc(anahtar, n.boylam),
        konum: konumTuru(ev),
        gormeme: [2, 6, 8, 12].includes(ev),
        geri: !!n.geri,
        yonetici,
        yoneticiEvi: burcEvi(g[yonetici].boylam, asc),
        kuzeyDugumde: burcIndeksi(n.boylam) === burcIndeksi(kuzey) && aciFarki(n.boylam, kuzey) <= 10,
        guneyDugumde: burcIndeksi(n.boylam) === burcIndeksi(guney) && aciFarki(n.boylam, guney) <= 10,
        // Yönettiği evler (tüm burç evleri; geleneksel yöneticilik)
        yonettigiEvler: BURCLAR.map((x, i) => (x.yonetici === anahtar ? ((i - burcIndeksi(asc) + 12) % 12) + 1 : 0)).filter(Boolean),
      };
    }

    const kismetBoylamlari = kismetler(g, gunduz);
    const kismet = Object.fromEntries(Object.entries(kismetBoylamlari).map(([ad, boylam]) => [ad, { boylam, ev: burcEvi(boylam, asc) }]));

    const geriSayisi = GELENEKSEL.filter((a) => g[a].geri).length + ['uranus', 'neptun', 'pluton'].filter((a) => g[a].geri).length;

    return {
      sekt,
      noktalar,
      kismet,
      dugum: { kuzeyBurc: burcIndeksi(kuzey), kuzeyEv: burcEvi(kuzey, asc) },
      geriSayisi,
    };
  }

  Object.assign(S, { derinAnaliz, burcEvi, gezegenGucu: guc });
})();
