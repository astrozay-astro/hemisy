// Vedik (Jyotiş) göstergeler: yıldızsal (sidereal) zodyak, Lahiri ayanamsası.
//  - Nakşatra: Ay'ın bulunduğu 27 ay evinden biri (her biri 13°20'), pada (çeyrek), yönetici gezegen, tanrı, simge
//  - Aştakuta (Guna Milan): sekiz başlıklı geleneksel evlilik uyumu, 36 puan üzerinden
//  - Mangal Doşa: Mars'ın hem Lagna'dan hem Ay'dan 1, 2, 4, 7, 8, 12. evlerde olması (iki kişide de varsa dengelenir).
//    Yalnızca birinden sayıldığında nüfusun yarısından fazlasında çıktığı için iki ölçütün birlikte sağlanması aranır.
//  - Ketu: geçmişten getirilen ustalık ve çözülmüş bağlar; Rahu: bu hayatta büyütülmek istenen yön
//  - Atmakaraka (ruhun göstergesi) ve Darakaraka (eşin göstergesi): Jaimini çara karakaları, yedi gezegen düzeni
// Evler Lagna'dan tüm burç evleriyle (whole sign) sayılır.
(() => {
  'use strict';

  const S = window.Astroship;
  const { norm, burcIndeksi } = S;

  // Lahiri ayanamsası: J2000'deki değer + genel presesyon (IAU 2006). Swiss Ephemeris ile 1900–2030 arası < 0,01° fark.
  function ayanamsa(utc) {
    const T = window.Astronomy.MakeTime(utc).tt / 36525;
    return 23.85709 + (5028.796195 * T + 1.1054348 * T * T) / 3600;
  }

  // Sıra: Aşvini'den Revati'ye. yoni: hayvan sırası YONILER dizisinde; gana: 0 deva, 1 manuşya, 2 rakşasa
  const NAKSATRALAR = [
    { ad: 'Aşvini', yonetici: 'ketu', tanri: 'Aşvinler', simge: 'at başı', yoni: 0, gana: 0 },
    { ad: 'Bharani', yonetici: 'venus', tanri: 'Yama', simge: 'rahim', yoni: 1, gana: 1 },
    { ad: 'Krittika', yonetici: 'gunes', tanri: 'Agni', simge: 'bıçak, alev', yoni: 2, gana: 2 },
    { ad: 'Rohini', yonetici: 'ay', tanri: 'Brahma (Pracapati)', simge: 'öküz arabası', yoni: 3, gana: 1 },
    { ad: 'Mrigaşira', yonetici: 'mars', tanri: 'Soma', simge: 'ceylan başı', yoni: 3, gana: 0 },
    { ad: 'Ardra', yonetici: 'rahu', tanri: 'Rudra', simge: 'gözyaşı damlası', yoni: 4, gana: 1 },
    { ad: 'Punarvasu', yonetici: 'jupiter', tanri: 'Aditi', simge: 'ok kılıfı', yoni: 5, gana: 0 },
    { ad: 'Puşya', yonetici: 'saturn', tanri: 'Brihaspati', simge: 'inek memesi, çiçek', yoni: 2, gana: 0 },
    { ad: 'Aşleşa', yonetici: 'merkur', tanri: 'Nagalar', simge: 'kıvrılmış yılan', yoni: 5, gana: 2 },
    { ad: 'Magha', yonetici: 'ketu', tanri: 'Pitriler (atalar)', simge: 'taht', yoni: 6, gana: 2 },
    { ad: 'Purva Phalguni', yonetici: 'venus', tanri: 'Bhaga', simge: 'yatağın ön ayakları', yoni: 6, gana: 1 },
    { ad: 'Uttara Phalguni', yonetici: 'gunes', tanri: 'Aryaman', simge: 'yatağın arka ayakları', yoni: 7, gana: 1 },
    { ad: 'Hasta', yonetici: 'ay', tanri: 'Savitri', simge: 'açık el', yoni: 8, gana: 0 },
    { ad: 'Çitra', yonetici: 'mars', tanri: 'Tvaştar', simge: 'parlak mücevher', yoni: 9, gana: 2 },
    { ad: 'Svati', yonetici: 'rahu', tanri: 'Vayu', simge: 'rüzgârda sallanan filiz', yoni: 8, gana: 0 },
    { ad: 'Vişakha', yonetici: 'jupiter', tanri: 'İndra ve Agni', simge: 'zafer takı', yoni: 9, gana: 2 },
    { ad: 'Anuradha', yonetici: 'saturn', tanri: 'Mitra', simge: 'lotus', yoni: 10, gana: 0 },
    { ad: 'Jyeşta', yonetici: 'merkur', tanri: 'İndra', simge: 'muska, küpe', yoni: 10, gana: 2 },
    { ad: 'Mula', yonetici: 'ketu', tanri: 'Nirriti', simge: 'bağlı kökler', yoni: 4, gana: 2 },
    { ad: 'Purva Aşadha', yonetici: 'venus', tanri: 'Apas (sular)', simge: 'yelpaze', yoni: 11, gana: 1 },
    { ad: 'Uttara Aşadha', yonetici: 'gunes', tanri: 'Vişvadevalar', simge: 'fil dişi', yoni: 12, gana: 1 },
    { ad: 'Şravana', yonetici: 'ay', tanri: 'Vişnu', simge: 'kulak, üç ayak izi', yoni: 11, gana: 0 },
    { ad: 'Dhanişta', yonetici: 'mars', tanri: 'Sekiz Vasu', simge: 'davul', yoni: 13, gana: 2 },
    { ad: 'Şatabhişa', yonetici: 'rahu', tanri: 'Varuna', simge: 'boş daire', yoni: 0, gana: 2 },
    { ad: 'Purva Bhadrapada', yonetici: 'jupiter', tanri: 'Aja Ekapada', simge: 'cenaze sedyesinin ön ayakları', yoni: 13, gana: 1 },
    { ad: 'Uttara Bhadrapada', yonetici: 'saturn', tanri: 'Ahir Budhnya', simge: 'derinlerin yılanı', yoni: 7, gana: 1 },
    { ad: 'Revati', yonetici: 'merkur', tanri: 'Puşan', simge: 'balık, davul', yoni: 1, gana: 0 },
  ];

  const YONILER = ['At', 'Fil', 'Koyun', 'Yılan', 'Köpek', 'Kedi', 'Fare', 'İnek', 'Manda', 'Kaplan', 'Geyik', 'Maymun', 'Firavunfaresi', 'Aslan'];
  // Yoni uyum tablosu (aynı hayvan 4, düşman çiftler 0)
  const YONI_TABLOSU = [
    [4, 2, 2, 3, 2, 2, 2, 1, 0, 1, 3, 3, 2, 1],
    [2, 4, 3, 3, 2, 2, 2, 2, 3, 1, 2, 3, 2, 0],
    [2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 3, 1],
    [3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 2, 2, 0, 2],
    [2, 2, 1, 2, 4, 2, 1, 2, 2, 1, 0, 2, 1, 1],
    [2, 2, 2, 1, 2, 4, 0, 2, 2, 1, 3, 3, 2, 1],
    [2, 2, 1, 1, 1, 0, 4, 2, 2, 2, 2, 2, 1, 2],
    [1, 2, 3, 1, 2, 2, 2, 4, 3, 0, 3, 2, 2, 1],
    [0, 3, 3, 1, 2, 2, 2, 3, 4, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 1, 2, 0, 1, 4, 1, 1, 2, 1],
    [3, 2, 2, 2, 0, 3, 2, 3, 2, 1, 4, 2, 2, 1],
    [3, 3, 0, 2, 2, 3, 2, 2, 2, 1, 2, 4, 3, 2],
    [2, 2, 3, 0, 1, 2, 1, 2, 2, 2, 2, 3, 4, 2],
    [1, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 4],
  ];

  const GANALAR = ['Deva (ilahi)', 'Manuşya (insani)', 'Rakşasa (yabani)'];
  const NADILER = ['Adi (Vata)', 'Madhya (Pitta)', 'Antya (Kapha)'];
  // Nadi deseni nakşatra sırasıyla 6'lık döngüdür: Adi, Madhya, Antya, Antya, Madhya, Adi
  const nadi = (n) => [0, 1, 2, 2, 1, 0][n % 6];

  // Varna (burca göre, yüksekten alçağa): su burçları 3, ateş 2, toprak 1, hava 0
  const VARNALAR = ['Şudra', 'Vaişya', 'Kşatriya', 'Brahmin'];
  const varna = (b) => ({ su: 3, 'ateş': 2, toprak: 1, hava: 0 })[S.BURCLAR[b].element];

  // Vaşya grubu: 0 dört ayaklı, 1 insan, 2 su, 3 vahşi, 4 böcek. Yay ve Oğlak yarıya göre bölünür.
  const VASYALAR = ['Çatuşpada (dört ayaklı)', 'Manava (insan)', 'Jalaçara (suda yaşayan)', 'Vanaçara (vahşi)', 'Kita (böcek)'];
  function vasya(boylam) {
    const b = burcIndeksi(boylam);
    const ikinciYari = norm(boylam) - b * 30 >= 15;
    return [0, 0, 1, 2, 3, 1, 1, 4, ikinciYari ? 0 : 1, ikinciYari ? 2 : 0, 1, 2][b];
  }
  const VASYA_TABLOSU = [
    [2, 1, 1, 0.5, 1],
    [1, 2, 0.5, 0, 1],
    [1, 0.5, 2, 1, 1],
    [0.5, 0, 1, 2, 0],
    [1, 1, 1, 0, 2],
  ];

  // Doğal gezegen dostlukları (Parashara): 1 dost, 0 nötr, -1 düşman
  const DOSTLUK = {
    gunes: { ay: 1, mars: 1, jupiter: 1, merkur: 0, venus: -1, saturn: -1 },
    ay: { gunes: 1, merkur: 1, mars: 0, jupiter: 0, venus: 0, saturn: 0 },
    mars: { gunes: 1, ay: 1, jupiter: 1, venus: 0, saturn: 0, merkur: -1 },
    merkur: { gunes: 1, venus: 1, mars: 0, jupiter: 0, saturn: 0, ay: -1 },
    jupiter: { gunes: 1, ay: 1, mars: 1, saturn: 0, merkur: -1, venus: -1 },
    venus: { merkur: 1, saturn: 1, mars: 0, jupiter: 0, gunes: -1, ay: -1 },
    saturn: { merkur: 1, venus: 1, jupiter: 0, gunes: -1, ay: -1, mars: -1 },
  };
  function grahaMaitri(y1, y2) {
    if (y1 === y2) return 5;
    const a = DOSTLUK[y1][y2];
    const b = DOSTLUK[y2][y1];
    const anahtar = [a, b].sort().join(',');
    return { '1,1': 5, '0,1': 4, '0,0': 3, '-1,1': 1, '-1,0': 0.5, '-1,-1': 0 }[anahtar];
  }

  function ganaPuani(g1, g2) {
    if (g1 === g2) return 6;
    const cift = [g1, g2].sort().join('');
    return { '01': 5, '02': 1, '12': 0 }[cift];
  }

  // Tara: bir nakşatradan diğerine sayım; 3., 5. ve 7. taralar (9'lu döngüde) zorlayıcı
  function taraUygun(den, e) {
    const sayi = ((e - den + 27) % 27) + 1;
    return ![3, 5, 7].includes(sayi % 9 === 0 ? 9 : sayi % 9);
  }

  // Bhakut: Ay burçları arası sayım; 2/12, 5/9 ve 6/8 ilişkileri 0 puan
  function bhakut(b1, b2) {
    const n = ((b2 - b1 + 12) % 12) + 1;
    return [2, 12, 5, 9, 6, 8].includes(n) ? { puan: 0, n } : { puan: 7, n };
  }

  const GELENEKSEL = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn'];

  // Bir kişinin vedik haritası
  function vedikHarita(harita) {
    const ay = ayanamsa(harita.utc);
    const sid = (boylam) => norm(boylam - ay);
    const g = harita.gezegenler;
    const konum = (boylam) => {
      const b = sid(boylam);
      const n = Math.floor(b / (360 / 27));
      return { boylam: b, burc: burcIndeksi(b), derece: b - burcIndeksi(b) * 30, nakshatra: n, pada: Math.floor((b % (360 / 27)) / (360 / 108)) + 1 };
    };
    const noktalar = {};
    for (const anahtar of [...GELENEKSEL, 'yukselen']) noktalar[anahtar] = konum(g[anahtar].boylam);
    noktalar.rahu = konum(g.kuzeyDugum.boylam);
    noktalar.ketu = konum(norm(g.kuzeyDugum.boylam + 180));

    const lagna = noktalar.yukselen.burc;
    const ev = (burc, kok = lagna) => ((burc - kok + 12) % 12) + 1;
    for (const n of Object.values(noktalar)) n.ev = ev(n.burc);

    // Çara karakalar: burç içindeki dereceye göre en yüksek Atmakaraka, en düşük Darakaraka
    const sirali = [...GELENEKSEL].sort((x, y) => noktalar[y].derece - noktalar[x].derece);
    const marsLagna = ev(noktalar.mars.burc);
    const marsAy = ev(noktalar.mars.burc, noktalar.ay.burc);
    const DOSA_EVLERI = [1, 2, 4, 7, 8, 12];

    return {
      ayanamsa: ay,
      noktalar,
      ayNakshatra: NAKSATRALAR[noktalar.ay.nakshatra],
      atmakaraka: sirali[0],
      darakaraka: sirali[sirali.length - 1],
      mangal: { lagnadan: DOSA_EVLERI.includes(marsLagna), aydan: DOSA_EVLERI.includes(marsAy), marsLagna, marsAy },
    };
  }

  // Aştakuta: kiz/erkek ayrımı yapan başlıklarda (Varna, Vaşya, Tara) karşı cins çiftlerde gelenek uygulanır;
  // diğer çiftlerde iki yön de denenip uygun olan alınır.
  function astakuta(v1, v2, cinsiyetler) {
    const ay1 = v1.noktalar.ay;
    const ay2 = v2.noktalar.ay;
    const n1 = ay1.nakshatra;
    const n2 = ay2.nakshatra;
    const N1 = NAKSATRALAR[n1];
    const N2 = NAKSATRALAR[n2];
    // erkek = "damat" tarafı; belirsizse iki yönden en yükseği
    const erkekIlk = cinsiyetler[0] === 'erkek' && cinsiyetler[1] === 'kadin';
    const kadinIlk = cinsiyetler[0] === 'kadin' && cinsiyetler[1] === 'erkek';
    const yonlu = (f) => (erkekIlk ? f(0, 1) : kadinIlk ? f(1, 0) : Math.max(f(0, 1), f(1, 0)));
    const vs = [v1, v2];

    const varnaPuani = yonlu((e, k) => (varna(vs[e].noktalar.ay.burc) >= varna(vs[k].noktalar.ay.burc) ? 1 : 0));
    const vasyaPuani = yonlu((e, k) => VASYA_TABLOSU[vasya(vs[e].noktalar.ay.boylam)][vasya(vs[k].noktalar.ay.boylam)]);
    const tara = (taraUygun(n1, n2) ? 1.5 : 0) + (taraUygun(n2, n1) ? 1.5 : 0);
    const yoni = YONI_TABLOSU[N1.yoni][N2.yoni];
    const maitri = grahaMaitri(S.BURCLAR[ay1.burc].yonetici, S.BURCLAR[ay2.burc].yonetici);
    const gana = ganaPuani(N1.gana, N2.gana);
    const bh = bhakut(ay1.burc, ay2.burc);
    const nadiAyni = nadi(n1) === nadi(n2);

    const kutalar = [
      { id: 'varna', ad: 'Varna', konu: 'ruhsal olgunluk ve değerler', puan: varnaPuani, en: 1 },
      { id: 'vasya', ad: 'Vaşya', konu: 'karşılıklı çekim ve etki', puan: vasyaPuani, en: 2 },
      { id: 'tara', ad: 'Tara', konu: 'kader ve birbirine iyi gelme', puan: tara, en: 3 },
      { id: 'yoni', ad: 'Yoni', konu: 'içgüdü ve cinsel uyum', puan: yoni, en: 4 },
      { id: 'maitri', ad: 'Graha Maitri', konu: 'zihinsel dostluk', puan: maitri, en: 5 },
      { id: 'gana', ad: 'Gana', konu: 'mizaç', puan: gana, en: 6 },
      { id: 'bhakut', ad: 'Bhakut', konu: 'duygusal akış ve bereket', puan: bh.puan, en: 7 },
      { id: 'nadi', ad: 'Nadi', konu: 'yaşam enerjisi ve beden', puan: nadiAyni ? 0 : 8, en: 8 },
    ];
    const toplam = kutalar.reduce((t, k) => t + k.puan, 0);
    return {
      kutalar,
      toplam,
      ayrinti: {
        nakshatralar: [N1, N2],
        yoniler: [YONILER[N1.yoni], YONILER[N2.yoni]],
        ganalar: [GANALAR[N1.gana], GANALAR[N2.gana]],
        nadiler: [NADILER[nadi(n1)], NADILER[nadi(n2)]],
        varnalar: [VARNALAR[varna(ay1.burc)], VARNALAR[varna(ay2.burc)]],
        vasyalar: [VASYALAR[vasya(ay1.boylam)], VASYALAR[vasya(ay2.boylam)]],
        bhakutSayi: bh.n,
      },
      nadiDosa: nadiAyni,
      bhakutDosa: bh.puan === 0,
    };
  }

  // Jaimini bağları: bir kişinin ruh göstergesi (Atmakaraka), diğerinin eş göstergesiyle (Darakaraka) ya da 7. eviyle buluşuyor mu
  function jaiminiBaglari(v) {
    const sonuc = [];
    for (const [kim, digeri] of [[0, 1], [1, 0]]) {
      const ak = v[kim].noktalar[v[kim].atmakaraka];
      const dk = v[digeri].noktalar[v[digeri].darakaraka];
      if (v[kim].atmakaraka === v[digeri].darakaraka) sonuc.push({ tur: 'akDkAyni', kim, digeri, gezegen: v[kim].atmakaraka });
      if (ak.burc === dk.burc) sonuc.push({ tur: 'akDkBurc', kim, digeri });
      const yedinci = (v[digeri].noktalar.yukselen.burc + 6) % 12;
      if (ak.burc === yedinci) sonuc.push({ tur: 'akYedinci', kim, digeri });
    }
    // Ketu–Ay: bir kişinin Ay'ı diğerinin Ketu'suyla aynı burçta (tanıdık duygusal iz)
    for (const [kim, digeri] of [[0, 1], [1, 0]]) {
      if (v[kim].noktalar.ay.burc === v[digeri].noktalar.ketu.burc) sonuc.push({ tur: 'ayKetu', kim, digeri });
    }
    return sonuc;
  }

  function vedikAnaliz(h1, h2, cinsiyetler) {
    const v = [vedikHarita(h1), vedikHarita(h2)];
    const m = v.map((x) => x.mangal.lagnadan && x.mangal.aydan);
    return {
      haritalar: v,
      kuta: astakuta(v[0], v[1], cinsiyetler),
      mangal: { var: m, dengeli: m[0] === m[1] },
      jaimini: jaiminiBaglari(v),
    };
  }

  Object.assign(S, { ayanamsa, NAKSATRALAR, YONILER, YONI_TABLOSU, vedikHarita, astakuta, vedikAnaliz });
})();
