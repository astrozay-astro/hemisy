// Karmik analiz: ruhun haritası ve iki kişinin "geçmişten tanışıklık" göstergeleri.
//  - Drakonik harita: tüm noktalar Kuzey Ay Düğümü 0° Koç olacak biçimde kaydırılır (ruhun / niyetin haritası)
//  - Drakonik sinastri: bir kişinin drakonik noktaları × diğerinin doğum haritası (ve drakonik × drakonik)
//  - Drakonik Davison: ilişkinin Davison haritasının drakonik hâli (ilişkinin ruhsal amacı)
//  - Ruh noktaları: Güney Ay Düğümü, Vertex (kader kapısı), Kara Ay (ortalama Lilith), Talih, Ruh ve Evlilik Kısmetleri
//  - Karmik temaslar: Güney/Kuzey Düğüm, Satürn, Plüton, Vertex, Kara Ay ve kısmet temasları
// Orblar drakonik ve ruh noktalarında dar tutulur (bu noktalar ancak tam temasta konuşur).
(() => {
  'use strict';

  const S = window.Astroship;
  const { norm, aciFarki, burcIndeksi } = S;
  const RAD = Math.PI / 180;

  Object.assign(S.NOKTALAR, {
    guneyDugum: { ad: 'Güney Ay Düğümü', iyelik: 'Güney Ay Düğümü', glif: '☋' },
    vertex: { ad: 'Vertex', iyelik: "Vertex'i", glif: 'Vx' },
    karaAy: { ad: 'Kara Ay (Lilith)', iyelik: "Kara Ay'ı", glif: '⚸' },
    talih: { ad: 'Talih Kısmeti', iyelik: 'Talih Kısmeti', glif: '⊗' },
    ruh: { ad: 'Ruh Kısmeti', iyelik: 'Ruh Kısmeti', glif: '⊙' },
    evlilik: { ad: 'Evlilik Kısmeti', iyelik: 'Evlilik Kısmeti', glif: '⚭' },
  });

  // ---------- Ruh noktaları ----------

  // Vertex: ekliptiğin ilk dikey (prime vertical) ile batıda kesiştiği nokta.
  // Yükselen formülü, RAMC 180° çevrilip enlem yerine ko-enlem kullanılarak hesaplanır (Swiss Ephemeris ile aynı yol).
  function vertexHesapla(ramc, e, enlem) {
    const f = enlem >= 0 ? 90 - enlem : -90 - enlem;
    const r = (ramc + 180) * RAD;
    return norm(Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(e * RAD) + Math.tan(f * RAD) * Math.sin(e * RAD))) / RAD);
  }

  // Kara Ay: Ay yörüngesinin ortalama apojesi (Meeus, ortalama perije + 180°)
  function karaAyHesapla(utc) {
    const T = window.Astronomy.MakeTime(utc).tt / 36525;
    return norm(83.3532465 + 4069.0137287 * T - 0.01032 * T * T - (T ** 3) / 80053 + 180);
  }

  // Bir haritanın ruh noktaları (ev numaraları o haritanın Placidus evleri)
  function ruhNoktalari(harita) {
    const g = harita.gezegenler;
    const k = S.derinAnaliz(harita).kismet;
    const yap = (anahtar, boylam) => S.noktaOlustur(anahtar, boylam, harita.evler);
    return {
      guneyDugum: yap('guneyDugum', norm(g.kuzeyDugum.boylam + 180)),
      vertex: yap('vertex', vertexHesapla(harita.ramc, harita.egiklik, harita.enlem)),
      karaAy: yap('karaAy', karaAyHesapla(harita.utc)),
      talih: yap('talih', k.talih.boylam),
      ruh: yap('ruh', k.ruh.boylam),
      evlilik: yap('evlilik', k.evlilik.boylam),
    };
  }

  // ---------- Drakonik harita ----------

  // Tüm noktalar ve ev girişleri Kuzey Ay Düğümü kadar geri kaydırılır: düğüm 0° Koç olur
  function drakonik(harita) {
    const kayma = harita.gezegenler.kuzeyDugum.boylam;
    const evler = harita.evler.map((k) => norm(k - kayma));
    const gezegenler = {};
    for (const [anahtar, n] of Object.entries(harita.gezegenler)) {
      gezegenler[anahtar] = S.noktaOlustur(anahtar, norm(n.boylam - kayma), evler, n.geri ? { geri: true } : {});
    }
    return { ...harita, evler, gezegenler, kayma, drakonik: true };
  }

  // ---------- Karmik temaslar ----------

  const KISISEL = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'yukselen'];
  const ICSEL = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn', 'yukselen'];

  // Kavuşum (ya da karşıtlık) aynı burç / karşı burç kuralıyla ve dar orbla
  function kavusum(a, b, orb) {
    const o = aciFarki(a, b);
    return burcIndeksi(a) === burcIndeksi(b) && o <= orb ? o : null;
  }
  function karsitlik(a, b, orb) {
    const o = Math.abs(aciFarki(a, b) - 180);
    return Math.abs(burcIndeksi(a) - burcIndeksi(b)) === 6 && o <= orb ? o : null;
  }

  // Tam temas ağırlığı: orb 0° → 1, orb sınırında → 0.25
  const yakinlik = (orb, sinir) => 0.25 + 0.75 * (1 - orb / sinir);

  const ORB = { dugum: 5, saturn: 6, pluton: 5, vertex: 3, karaAy: 3, kismet: 3, drakonik: 3, drakonikKarsit: 2 };

  // haritalar: [h1, h2]; ruh: [ruhNoktalari(h1), ruhNoktalari(h2)]; drak: [drakonik(h1), drakonik(h2)]
  function karmikTemaslar(haritalar, ruh, drak) {
    const g = haritalar.map((h) => h.gezegenler);
    const temaslar = [];
    const ekle = (t) => temaslar.push({ ...t, agirlik: t.agirlik * yakinlik(t.orb, t.sinir) });

    for (const [kim, digeri] of [[0, 1], [1, 0]]) {
      // 1) Düğümler: bir kişinin noktası diğerinin Güney Düğüm'ünde (geçmiş) ya da Kuzey Düğüm'ünde (gelecek)
      for (const p of ICSEL) {
        const a = g[kim][p];
        const guney = kavusum(a.boylam, ruh[digeri].guneyDugum.boylam, ORB.dugum);
        if (guney !== null) ekle({ tur: 'guneyDugum', p, kim, digeri, a, orb: guney, sinir: ORB.dugum, agirlik: p === 'saturn' ? 1.1 : 1.3 });
        const kuzey = kavusum(a.boylam, g[digeri].kuzeyDugum.boylam, ORB.dugum);
        if (kuzey !== null) ekle({ tur: 'kuzeyDugum', p, kim, digeri, a, orb: kuzey, sinir: ORB.dugum, agirlik: 1 });
      }

      // 2) Satürn: karmik sözleşme (bir kişinin Satürn'ü diğerinin kişisel noktasına)
      for (const q of KISISEL) {
        const aci = S.aciBul(g[kim].saturn.boylam, g[digeri][q].boylam);
        if (aci && aci.orb <= ORB.saturn && aci.id !== 'quincunx') {
          ekle({ tur: 'saturn', p: 'saturn', q, kim, digeri, a: g[kim].saturn, b: g[digeri][q], aci, orb: aci.orb, sinir: ORB.saturn, agirlik: ['gunes', 'ay', 'venus'].includes(q) ? 1 : 0.7 });
        }
      }

      // 3) Plüton: ruhsal dönüşüm ve eski güç dinamikleri
      for (const q of ['gunes', 'ay', 'venus', 'mars', 'yukselen']) {
        const aci = S.aciBul(g[kim].pluton.boylam, g[digeri][q].boylam);
        if (aci && aci.orb <= ORB.pluton && aci.id !== 'quincunx') {
          ekle({ tur: 'pluton', p: 'pluton', q, kim, digeri, a: g[kim].pluton, b: g[digeri][q], aci, orb: aci.orb, sinir: ORB.pluton, agirlik: 0.8 });
        }
      }

      // 4) Vertex: kaderin kapısı; bir kişinin noktası diğerinin Vertex'inde
      for (const p of [...ICSEL, 'kuzeyDugum']) {
        const orb = kavusum(g[kim][p].boylam, ruh[digeri].vertex.boylam, ORB.vertex);
        if (orb !== null) ekle({ tur: 'vertex', p, kim, digeri, a: g[kim][p], orb, sinir: ORB.vertex, agirlik: ['gunes', 'ay', 'venus', 'yukselen'].includes(p) ? 1.1 : 0.8 });
      }

      // 5) Kara Ay: bastırılmış arzu, gölge ve eski yara
      for (const p of ['gunes', 'ay', 'venus', 'mars', 'yukselen']) {
        const orb = kavusum(g[kim][p].boylam, ruh[digeri].karaAy.boylam, ORB.karaAy);
        if (orb !== null) ekle({ tur: 'karaAy', p, kim, digeri, a: g[kim][p], orb, sinir: ORB.karaAy, agirlik: 0.7 });
      }

      // 6) Kısmetler (Arap noktaları): bir kişinin noktası diğerinin Talih, Ruh ya da Evlilik Kısmeti'nde
      for (const kismet of ['ruh', 'talih', 'evlilik']) {
        for (const p of ['gunes', 'ay', 'venus', 'mars', 'jupiter', 'saturn', 'yukselen']) {
          const orb = kavusum(g[kim][p].boylam, ruh[digeri][kismet].boylam, ORB.kismet);
          if (orb !== null) ekle({ tur: 'kismet', kismet, p, kim, digeri, a: g[kim][p], orb, sinir: ORB.kismet, agirlik: kismet === 'ruh' ? 0.9 : 0.7 });
        }
      }

      // 7) Drakonik sinastri: bir kişinin ruhsal (drakonik) noktası diğerinin doğum haritasındaki noktaya değiyor
      for (const p of ICSEL) {
        for (const q of [...ICSEL, 'mc']) {
          const dp = drak[kim].gezegenler[p].boylam;
          const nq = g[digeri][q].boylam;
          const kv = kavusum(dp, nq, ORB.drakonik);
          const ks = kv === null ? karsitlik(dp, nq, ORB.drakonikKarsit) : null;
          if (kv === null && ks === null) continue;
          const onemli = ['gunes', 'ay', 'venus', 'yukselen'];
          const agirlik = (onemli.includes(p) ? 0.6 : 0.35) + (onemli.includes(q) ? 0.6 : 0.35);
          ekle({ tur: 'drakonik', p, q, kim, digeri, a: drak[kim].gezegenler[p], b: g[digeri][q], karsit: ks !== null, orb: kv ?? ks, sinir: kv !== null ? ORB.drakonik : ORB.drakonikKarsit, agirlik: ks !== null ? agirlik * 0.8 : agirlik });
        }
      }
    }

    // 8) Drakonik × drakonik: iki ruhun aynı yerde durduğu noktalar (tek yönde sayılır)
    for (const p of ['gunes', 'ay', 'venus', 'mars', 'yukselen']) {
      for (const q of ['gunes', 'ay', 'venus', 'mars', 'yukselen']) {
        const orb = kavusum(drak[0].gezegenler[p].boylam, drak[1].gezegenler[q].boylam, ORB.drakonik);
        if (orb !== null) ekle({ tur: 'drakonikCift', p, q, kim: 0, digeri: 1, a: drak[0].gezegenler[p], b: drak[1].gezegenler[q], orb, sinir: ORB.drakonik, agirlik: 0.9 });
      }
    }

    return temaslar.sort((x, y) => y.agirlik - x.agirlik);
  }

  // Ruhsal tanışıklık yoğunluğu (5–97): temasların toplam ağırlığından.
  // Eğri rastgele çiftlerde ortanca ~%53, en üst onda bir ~%68 üstü olacak biçimde ayarlıdır.
  function tanisiklikYuzdesi(temaslar) {
    const toplam = temaslar
      .filter((t) => ['guneyDugum', 'kuzeyDugum', 'vertex', 'drakonik', 'drakonikCift', 'kismet'].includes(t.tur))
      .reduce((s, t) => s + t.agirlik, 0);
    return Math.round(Math.min(97, Math.max(5, 8 + 89 * (1 - Math.exp(-toplam / 5)))));
  }

  function karmikAnaliz(h1, h2, davison) {
    const haritalar = [h1, h2];
    const ruh = haritalar.map(ruhNoktalari);
    const drak = haritalar.map(drakonik);
    const temaslar = karmikTemaslar(haritalar, ruh, drak);
    return {
      ruh,
      drakonik: drak,
      drakonikDavison: drakonik(davison),
      temaslar,
      tanisiklik: tanisiklikYuzdesi(temaslar),
    };
  }

  Object.assign(S, { vertexHesapla, karaAyHesapla, ruhNoktalari, drakonik, karmikTemaslar, karmikAnaliz });
})();
