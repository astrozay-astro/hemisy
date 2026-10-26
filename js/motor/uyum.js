// Uyum yüzdeleri. Her başlık üç tür göstergeyle puanlanır:
//  1) Sinastri açıları (burç + derece kuralı, orb ≤ 10°; açı ne kadar tamsa o kadar ağır)
//  2) Ev yerleşimleri (bir kişinin gezegeninin diğerinin hangi evine düştüğü)
//  3) Burç uyumu: element ve nitelik ilişkisi (aynı çift arasında açı yoksa)
// Cinsiyet seçimi, geleneğin her çift türü için öne çıkardığı temasların ağırlığını değiştirir.
(() => {
  'use strict';

  const S = window.Astroship;

  // Çift anahtarları ('venus-mars') yorum metinlerindeki anahtarlarla aynıdır: ilk gezegen {X}, ikincisi {Y}
  const ZORLAYICI = ['mars', 'saturn', 'uranus', 'pluton'];

  // tur: 'uyum'     → uyumlu açılar artırır, gergin açılar düşürür
  //      'yogunluk' → her temas yoğunluğu artırır (tutku, karmik bağ)
  //      'huzur'    → gergin açılar daha sert düşürür
  const BASLIKLAR = [
    {
      id: 'tutku', ad: 'Çekim ve Tutku', glif: '♂', tur: 'yogunluk', agirlik: 1.3,
      cekirdek: ['venus-mars'], cekirdekYoksa: 40,
      ciftler: { 'venus-mars': 1, 'mars-pluton': 0.8, 'venus-pluton': 0.7, 'mars-mars': 0.5, 'gunes-mars': 0.5, 'mars-yukselen': 0.6, 'venus-yukselen': 0.4, 'ay-mars': 0.4, 'venus-uranus': 0.4 },
      evler: { mars: [1, 5, 8], venus: [1, 5, 8], pluton: [1, 5, 8] },
      burclar: [['venus', 'mars'], ['mars', 'mars']],
    },
    {
      id: 'baglanma', ad: 'Bağlanma ve Duygusal Bağ', glif: '☽', tur: 'uyum', agirlik: 1.3,
      cekirdek: ['gunes-ay', 'ay-ay', 'ay-venus'], cekirdekYoksa: 52,
      ciftler: { 'gunes-ay': 1, 'ay-ay': 0.9, 'ay-venus': 0.8, 'ay-saturn': 0.6, 'ay-yukselen': 0.5, 'ay-jupiter': 0.5, 'ay-pluton': 0.4, 'venus-venus': 0.4 },
      evler: { ay: [4, 7, 8, 12], venus: [4, 7, 8, 12] },
      burclar: [['ay', 'ay'], ['gunes', 'ay']],
    },
    {
      id: 'iletisim', ad: 'İletişim ve Zihinsel Uyum', glif: '☿', tur: 'uyum', agirlik: 1,
      cekirdek: ['merkur-merkur', 'ay-merkur', 'gunes-merkur'], cekirdekYoksa: 52,
      ciftler: { 'merkur-merkur': 1, 'ay-merkur': 0.7, 'gunes-merkur': 0.6, 'merkur-mars': 0.5, 'merkur-jupiter': 0.5, 'merkur-saturn': 0.5, 'merkur-venus': 0.4, 'merkur-uranus': 0.4 },
      evler: { merkur: [3, 9], gunes: [3, 9], mars: [3, 9] },
      burclar: [['merkur', 'merkur']],
    },
    {
      id: 'romantizm', ad: 'Romantizm ve Şefkat', glif: '♀', tur: 'uyum', agirlik: 1.1,
      cekirdek: ['gunes-venus', 'venus-venus', 'ay-venus', 'venus-neptun'], cekirdekYoksa: 52,
      ciftler: { 'gunes-venus': 1, 'venus-venus': 0.8, 'venus-neptun': 0.8, 'venus-jupiter': 0.7, 'ay-venus': 0.6, 'venus-yukselen': 0.5 },
      evler: { venus: [5, 7], neptun: [5, 7], gunes: [5, 7] },
      burclar: [['venus', 'venus']],
    },
    {
      id: 'guven', ad: 'Güven ve Kalıcılık', glif: '♄', tur: 'uyum', agirlik: 1.2, saturnKavusumu: 0.6,
      cekirdek: ['gunes-saturn', 'ay-saturn', 'venus-saturn', 'gunes-ay'], cekirdekYoksa: 55,
      ciftler: { 'gunes-saturn': 0.9, 'ay-saturn': 0.9, 'venus-saturn': 0.9, 'gunes-ay': 0.7, 'gunes-jupiter': 0.5, 'saturn-yukselen': 0.5, 'gunes-gunes': 0.4 },
      evler: { saturn: [4, 7, 10], gunes: [4, 7, 10] },
      burclar: [['gunes', 'gunes']],
    },
    {
      id: 'huzur', ad: 'Huzur ve Çatışma Dengesi', glif: '☍', tur: 'huzur', agirlik: 1,
      ciftler: { 'mars-mars': 0.9, 'mars-saturn': 0.8, 'gunes-mars': 0.7, 'ay-mars': 0.7, 'mars-uranus': 0.6, 'mars-pluton': 0.6, 'gunes-uranus': 0.5, 'ay-uranus': 0.5, 'ay-ay': 0.5, 'merkur-merkur': 0.4 },
      evler: {},
      burclar: [['mars', 'mars'], ['ay', 'ay']],
    },
    {
      id: 'karmik', ad: 'Karmik Bağ', glif: '☊', tur: 'yogunluk', agirlik: 0.6,
      cekirdek: ['gunes-kuzeyDugum', 'ay-kuzeyDugum', 'venus-kuzeyDugum'], cekirdekYoksa: 40,
      ciftler: { 'gunes-kuzeyDugum': 0.9, 'ay-kuzeyDugum': 0.9, 'venus-kuzeyDugum': 0.9, 'mars-kuzeyDugum': 0.6, 'kuzeyDugum-yukselen': 0.7, 'gunes-saturn': 0.6, 'ay-saturn': 0.6, 'venus-saturn': 0.5, 'gunes-pluton': 0.6, 'ay-pluton': 0.6 },
      evler: { gunes: [8, 12], ay: [8, 12], venus: [8, 12] },
      burclar: [],
    },
  ];

  const UYUMLU = ['altmislik', 'ucgen'];
  // Temel temanın sayılması için açının en fazla bu kadar geniş olması gerekir
  const CEKIRDEK_ORB = 8;

  function aciDegeri(baslik, aci, p, q) {
    const alcalan = aci.id === 'karsit' && (p === 'yukselen' || q === 'yukselen');
    const zorlu = ZORLAYICI.includes(p) || ZORLAYICI.includes(q);
    if (baslik.tur === 'yogunluk') {
      return { kavusum: 1, kare: 0.8, karsit: alcalan ? 1 : 0.8, ucgen: 0.7, altmislik: 0.5, quincunx: 0.3 }[aci.id];
    }
    if (baslik.tur === 'huzur') {
      if (aci.id === 'kavusum') return zorlu ? -0.6 : 0.4;
      return { altmislik: 0.7, ucgen: 0.9, kare: -1, karsit: -0.8, quincunx: -0.5 }[aci.id];
    }
    if (aci.id === 'kavusum') {
      if (baslik.saturnKavusumu && (p === 'saturn' || q === 'saturn')) return baslik.saturnKavusumu;
      return zorlu ? 0.1 : 0.7;
    }
    if (alcalan) return 0.9;
    return { altmislik: 0.8, ucgen: 1, kare: -0.8, karsit: -0.5, quincunx: -0.4 }[aci.id];
  }

  // Açı ne kadar tamsa etkisi o kadar büyük: orb 0° → 1, orb 10° → 0.1
  const aciGucu = (orb) => 0.1 + 0.9 * ((10 - orb) / 10) ** 1.3;

  function burcDegeri(baslik, mesafe) {
    if (baslik.tur === 'yogunluk') return [0.6, 0, 0.4, 0.4, 0.5, 0, 0.6][mesafe];
    return [0.6, -0.3, 0.7, -0.6, 1, -0.3, -0.2][mesafe];
  }

  // Cinsiyete göre vurgu: { carpan, vurgu } — vurgu, yorumda bu temasın neden öne çıktığını anlatmak için
  function cinsiyetCarpani(baslikId, p, cinsP, q, cinsQ) {
    if (cinsP === 'belirtilmedi' || cinsQ === 'belirtilmedi') return { carpan: 1 };
    const sahip = (planet, cins) => (p === planet && cinsP === cins) || (q === planet && cinsQ === cins);
    const ikisi = (planet) => p === planet && q === planet;
    if (cinsP !== cinsQ) {
      if (baslikId === 'tutku' && sahip('venus', 'kadin') && sahip('mars', 'erkek')) return { carpan: 1.4, vurgu: 'ke-venus-mars' };
      if ((baslikId === 'baglanma' || baslikId === 'guven') && sahip('gunes', 'erkek') && sahip('ay', 'kadin')) return { carpan: 1.4, vurgu: 'ke-gunes-ay' };
      return { carpan: 1 };
    }
    if (cinsP === 'kadin') {
      if ((baslikId === 'tutku' || baslikId === 'romantizm') && ikisi('venus')) return { carpan: 1.4, vurgu: 'kk-venus' };
      if (baslikId === 'baglanma' && ikisi('ay')) return { carpan: 1.3, vurgu: 'kk-ay' };
      if (baslikId === 'baglanma' && ((p === 'ay' && q === 'venus') || (p === 'venus' && q === 'ay'))) return { carpan: 1.2, vurgu: 'kk-ay' };
      return { carpan: 1 };
    }
    if (baslikId === 'tutku' && ikisi('mars')) return { carpan: 1.4, vurgu: 'ee-mars' };
    if (baslikId === 'tutku' && ((p === 'gunes' && q === 'mars') || (p === 'mars' && q === 'gunes'))) return { carpan: 1.2, vurgu: 'ee-mars' };
    if ((baslikId === 'guven' || baslikId === 'baglanma') && ikisi('gunes')) return { carpan: 1.3, vurgu: 'ee-gunes' };
    return { carpan: 1 };
  }

  function tonBelirle(katki, aci) {
    if (katki < 0) return 'eksi';
    if (aci && !UYUMLU.includes(aci.id) && aci.id !== 'kavusum') return 'yogun';
    return 'arti';
  }

  function baslikHesapla(baslik, haritalar, cinsiyetler) {
    const g = haritalar.map((h) => h.gezegenler);
    const etkenler = [];
    const aciliCiftler = new Set();

    // 1) Açılar: her çift iki yönde (A'nın p'si – B'nin q'su ve A'nın q'su – B'nin p'si)
    for (const [cift, agirlik] of Object.entries(baslik.ciftler)) {
      const [p, q] = cift.split('-');
      const yonler = p === q ? [[0, 1]] : [[0, 1], [1, 0]];
      for (const [kimP, kimQ] of yonler) {
        const a = g[kimP][p];
        const b = g[kimQ][q];
        const aci = S.aciBul(a.boylam, b.boylam);
        if (!aci) continue;
        aciliCiftler.add(`${kimP}${p}-${kimQ}${q}`);
        const { carpan, vurgu } = cinsiyetCarpani(baslik.id, p, cinsiyetler[kimP], q, cinsiyetler[kimQ]);
        const katki = aciDegeri(baslik, aci, p, q) * agirlik * aciGucu(aci.orb) * carpan;
        etkenler.push({ tur: 'aci', p, q, kimP, kimQ, a, b, aci, katki, ton: tonBelirle(katki, aci), vurgu });
      }
    }

    // 2) Ev yerleşimleri
    for (const [p, evler] of Object.entries(baslik.evler)) {
      for (const [kim, ev] of [[0, 1], [1, 0]]) {
        const evNo = S.evBul(g[kim][p].boylam, haritalar[ev].evler);
        if (!evler.includes(evNo)) continue;
        const katki = 0.6 * (p === 'saturn' && evNo === 4 ? 0.6 : 1);
        const ton = p === 'pluton' || evNo === 8 ? 'yogun' : 'arti';
        etkenler.push({ tur: 'ev', p, kim, evSahibi: ev, ev: evNo, a: g[kim][p], katki, ton });
      }
    }

    // 3) Burç uyumu (element ve nitelik); aynı çift arasında açı varsa tekrar sayılmaz
    for (const [p, q] of baslik.burclar) {
      const yonler = p === q ? [[0, 1]] : [[0, 1], [1, 0]];
      for (const [kimP, kimQ] of yonler) {
        if (aciliCiftler.has(`${kimP}${p}-${kimQ}${q}`)) continue;
        const a = g[kimP][p];
        const b = g[kimQ][q];
        const iliski = S.burcIliskisi(a.indeks, b.indeks);
        const katki = burcDegeri(baslik, iliski.mesafe) * 0.5;
        if (katki === 0) continue;
        etkenler.push({ tur: 'burc', p, q, kimP, kimQ, a, b, iliski, katki, ton: katki > 0 ? 'arti' : 'eksi' });
      }
    }

    const toplam = etkenler.reduce((t, e) => t + e.katki, 0);
    const ham = baslik.tur === 'yogunluk'
      ? 15 + 82 * (1 - Math.exp(-Math.max(0, toplam) / 2.2))
      : 50 + 46 * Math.tanh(toplam / 1.8);
    // Temel tema yoksa (ya da çok genişse) yüzde belli bir düzeyi geçemez:
    // ör. iki kişi arasında Venüs–Mars bağlantısı yoksa tutku yüksek çıkamaz
    const cekirdekVar = !baslik.cekirdek || etkenler.some((e) => e.tur === 'aci'
      && baslik.cekirdek.includes(`${e.p}-${e.q}`) && e.aci.orb <= CEKIRDEK_ORB);
    const tavan = cekirdekVar ? 98 : baslik.cekirdekYoksa;
    const yuzde = Math.round(Math.min(tavan, Math.max(5, ham)));
    etkenler.sort((x, y) => Math.abs(y.katki) - Math.abs(x.katki));
    return { ...baslik, yuzde, etkenler, cekirdekVar };
  }

  function uyumHesapla(haritalar, cinsiyetler) {
    const basliklar = BASLIKLAR.map((b) => baslikHesapla(b, haritalar, cinsiyetler));
    const toplamAgirlik = basliklar.reduce((t, b) => t + b.agirlik, 0);
    const genel = Math.round(basliklar.reduce((t, b) => t + b.yuzde * b.agirlik, 0) / toplamAgirlik);
    return { genel, basliklar };
  }

  Object.assign(S, { uyumHesapla, UYUM_BASLIKLARI: BASLIKLAR });
})();
