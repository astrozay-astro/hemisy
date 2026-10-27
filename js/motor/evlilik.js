// Evlilik göstergeleri: evlilik potansiyeli yüzdesi ve en güçlü üç evlilik dönemi. Yapay zekâ kullanılmaz, kurallar
// klasik ve öngörü astrolojisinin göstergeleridir.
//
// Evlilik potansiyeli (55 puandan başlar, %30–%96 arasında sınırlanır):
//  - 7. evin yöneticisi: köşe ev +8, ardıl ev +4, 6. ya da 12. ev −6, yönetim/yücelim +7, zarar/düşüş −5,
//    Venüs ya da Jüpiter ile uyumlu açı ya da kavuşum +5
//  - 7. evdeki gezegenler: Venüs ve Jüpiter +10, Ay +4, Güneş +3, Satürn −3, Mars −3, Neptün −3, Plüton −2, Uranüs −7
//  - Venüs: yönetim/yücelim +5, zarar/düşüş −4, geri −4, Jüpiter ile uyumlu açı ya da kavuşum +5, Satürn ile gergin açı −3
//  - Eş göstergesi (kadında Güneş, erkekte Ay, belirtilmemişse Venüs): Venüs ya da Jüpiter ile uyumlu açı ya da
//    kavuşum +6, Satürn ile gergin açı ya da kavuşum −4, Uranüs ile gergin açı ya da kavuşum −5
//  - Jüpiter Alçalan'a kavuşum, üçgen ya da altmışlık +5, 7. ev yöneticisi ile Satürn gergin açı −3
//  - Venüs'ün evi: 5., 7., 11. ev +3, 12. ev −3. Venüs'ün dispozitörü köşede +2, 6., 8. ya da 12. evde −2
//  - Kuzey Ay Düğümü 7. evde ya da Alçalan'a 6° içinde +6, 1. evde (Güney Düğüm 7. evde) −2
//  - Evlilik noktası (erkek: Yükselen + Venüs − Satürn, kadın: Yükselen + Satürn − Venüs): köşe evde +4, Venüs, Jüpiter ya da Alçalan'a 5° içinde +5,
//    yöneticisi 6., 8. ya da 12. evde −3
//  Açılarda orb en fazla 6°.
//
// Evlilik dönemleri: bugünden (en erken 18 yaşından) itibaren 15 yıl taranır. Her yaş yılı doğum gününden başlar.
//  - Profeksiyon: yılın evi 7. ev +25, 5. ev +10, 1. ev +8, 11. ev +6. Yılın yöneticisi 7. evin yöneticisi ya da Venüs +10
//  - Transit (her ayın ortasında): Jüpiter natal 7. evde +2, Jüpiter Alçalan, Venüs, 7. ev yöneticisi ya da eş
//    göstergesine ya da evlilik noktasına 3° içinde kavuşum +4 (ay penceresinde tamlığa göre +4…+7), Satürn natal 7. evde ya da Alçalan'a 3° içinde +1
//  - Tutulmalar (js/veri/tutulmalar.js tablosu): Yükselen–Alçalan eksenine 5° içinde +8, Venüs ya da 7. ev yöneticisine 3° içinde +6
//  - Solar return (doğum yerinde): Yükselen natal Alçalan burcunda +8, Venüs ya da Jüpiter SR 7. evinde +6
//  En yüksek puanlı üç yıl seçilir. Her yılda ayların puanına göre en güçlü dört aylık pencere gösterilir.
(() => {
  'use strict';

  const S = window.Astroship;
  const A = window.Astronomy;
  const { norm, aciFarki, burcIndeksi, BURCLAR } = S;

  const ES = { kadin: 'gunes', erkek: 'ay', belirtilmedi: 'venus' };
  const KOSE = [1, 4, 7, 10];
  const ARDIL = [2, 5, 8, 11];
  const ORB = 6;
  const YEDIDE_PUAN = { venus: 10, jupiter: 10, ay: 4, gunes: 3, saturn: -3, mars: -3, neptun: -3, pluton: -2, uranus: -7 };

  // Açının türü: 'u' uyumlu (altmışlık, üçgen), 'k' kavuşum, 'g' gergin; orb dışında null
  function aciTuru(b1, b2) {
    const aci = S.aciBul(b1, b2);
    if (!aci || aci.orb > ORB) return null;
    if (aci.id === 'kavusum') return 'k';
    return ['altmislik', 'ucgen'].includes(aci.id) ? 'u' : 'g';
  }

  const yediYoneticisi = (h) => BURCLAR[burcIndeksi(h.evler[6])].yonetici;

  // Evlilik noktası (Arap noktası, Valens): erkek için Yükselen + Venüs − Satürn, kadın için Yükselen + Satürn − Venüs.
  // Cinsiyet belirtilmemişse erkek formülü (klasik genel evlilik kısmeti) kullanılır.
  function evlilikNoktasi(h, cinsiyet) {
    const g = h.gezegenler;
    const boylam = cinsiyet === 'kadin'
      ? norm(g.yukselen.boylam + g.saturn.boylam - g.venus.boylam)
      : norm(g.yukselen.boylam + g.venus.boylam - g.saturn.boylam);
    return { boylam, ...S.burcBilgisi(boylam), ev: S.evBul(boylam, h.evler), formul: cinsiyet === 'kadin' ? 'kadın' : 'erkek' };
  }

  function evlilikPotansiyeli(h, cinsiyet) {
    const g = h.gezegenler;
    const yAd = yediYoneticisi(h);
    const y = g[yAd];
    const dsc = norm(g.yukselen.boylam + 180);
    const etkenler = [];
    const ekle = (id, puan) => etkenler.push({ id, puan });

    if (KOSE.includes(y.ev)) ekle('yoneticiKose', 8);
    else if (ARDIL.includes(y.ev)) ekle('yoneticiArdil', 4);
    else if ([6, 12].includes(y.ev)) ekle('yoneticiGizli', -6);
    const yGuc = S.gezegenGucu(yAd, y.boylam);
    if (yGuc === 'yonetim' || yGuc === 'yucelim') ekle('yoneticiGuclu', 7);
    else if (yGuc === 'zarar' || yGuc === 'dusus') ekle('yoneticiZayif', -5);
    if (['venus', 'jupiter'].some((b) => b !== yAd && ['u', 'k'].includes(aciTuru(y.boylam, g[b].boylam)))) ekle('yoneticiIyicil', 5);
    if (yAd !== 'saturn' && aciTuru(y.boylam, g.saturn.boylam) === 'g') ekle('yoneticiSaturn', -3);

    for (const [ad, puan] of Object.entries(YEDIDE_PUAN)) if (g[ad].ev === 7) ekle(`${ad}7`, puan);

    const vGuc = S.gezegenGucu('venus', g.venus.boylam);
    if (vGuc === 'yonetim' || vGuc === 'yucelim') ekle('venusGuclu', 5);
    else if (vGuc === 'zarar' || vGuc === 'dusus') ekle('venusZayif', -4);
    if (g.venus.geri) ekle('venusGeri', -4);
    if ([5, 7, 11].includes(g.venus.ev)) ekle('venusEv', 3);
    else if (g.venus.ev === 12) ekle('venusOnIki', -3);
    // Venüs'ün dispozitörü (bulunduğu burcun yöneticisi): köşede destekler, 6., 8. ya da 12. evde fedakârlık temasını getirir
    const dAd = BURCLAR[g.venus.indeks].yonetici;
    if (dAd !== 'venus') {
      if (KOSE.includes(g[dAd].ev)) ekle('venusDispoKose', 2);
      else if ([6, 8, 12].includes(g[dAd].ev)) ekle('venusDispoGizli', -2);
    }
    if (['u', 'k'].includes(aciTuru(g.venus.boylam, g.jupiter.boylam))) ekle('venusJupiter', 5);
    if (aciTuru(g.venus.boylam, g.saturn.boylam) === 'g') ekle('venusSaturn', -3);

    const es = g[ES[cinsiyet] || 'venus'];
    if (es.anahtar !== 'venus' && ['venus', 'jupiter'].some((b) => ['u', 'k'].includes(aciTuru(es.boylam, g[b].boylam)))) ekle('esUyumlu', 6);
    if (['g', 'k'].includes(aciTuru(es.boylam, g.saturn.boylam))) ekle('esSaturn', -4);
    if (['g', 'k'].includes(aciTuru(es.boylam, g.uranus.boylam))) ekle('esUranus', -5);

    const jDsc = S.aciBul(g.jupiter.boylam, dsc);
    if (jDsc && jDsc.orb <= ORB && ['kavusum', 'ucgen', 'altmislik'].includes(jDsc.id)) ekle('jupiterDsc', 5);

    // Ay düğümleri: Kuzey Düğüm 7. evde ya da Alçalan'a yakınsa ilişkiler kişinin gelişim yolu, Güney Düğüm 7. evdeyse
    // eski ilişki kalıpları öne çıkar
    if (g.kuzeyDugum.ev === 7 || aciFarki(g.kuzeyDugum.boylam, dsc) <= 6) ekle('dugum7', 6);
    else if (g.kuzeyDugum.ev === 1) ekle('guneyDugum7', -2);

    // Evlilik noktası (cinsiyete göre)
    const kismet = evlilikNoktasi(h, cinsiyet).boylam;
    if (KOSE.includes(S.evBul(kismet, h.evler))) ekle('kismetKose', 4);
    if ([g.venus.boylam, g.jupiter.boylam, dsc].some((b) => aciFarki(kismet, b) <= 5)) ekle('kismetIyicil', 5);
    const kAd = BURCLAR[burcIndeksi(kismet)].yonetici;
    if ([6, 8, 12].includes(g[kAd].ev)) ekle('kismetYoneticiGizli', -3);

    const toplam = etkenler.reduce((t, e) => t + e.puan, 55);
    return { yuzde: Math.max(30, Math.min(96, Math.round(toplam))), etkenler };
  }

  const tarihEkle = (tarih, gun) => new Date(tarih.getTime() + gun * 864e5);
  const yilEkle = (tarih, yil) => { const t = new Date(tarih.getTime()); t.setUTCFullYear(t.getUTCFullYear() + yil); return t; };

  // Başlangıç ve bitiş arasındaki tutulmalar, sabit tablodan (js/veri/tutulmalar.js): { tarih, boylam }
  const tutulmalar = (bas, son) => (window.ASTROSHIP_TUTULMALAR || [])
    .map(([dakika, boylam]) => ({ tarih: new Date(dakika * 6e4), boylam }))
    .filter((t) => t.tarih >= bas && t.tarih < son);

  // Transitlerde ışık sapması düzeltmesi gerekmez (fark birkaç yay saniyesi), hesap çok daha hızlı olur
  const transitBoylami = (govde, an) => A.Ecliptic(A.GeoVector(govde, an, false)).elon;

  // Solar return için yalnızca gereken kısım: evler, Venüs ve Jüpiter
  function donusHaritasi(utc, enlem, boylamDogu) {
    const an = A.MakeTime(utc);
    const ramc = norm(A.SiderealTime(an) * 15 + boylamDogu);
    const { evler } = S.evGirisleri(ramc, S.gercekEgiklik(an), enlem);
    return { asc: evler[0], evler, venus: transitBoylami('Venus', an), jupiter: transitBoylami('Jupiter', an) };
  }

  function evlilikTarihleri(h, cinsiyet, simdi = new Date()) {
    const g = h.gezegenler;
    const dogum = h.utc;
    const yAd = yediYoneticisi(h);
    const dsc = norm(g.yukselen.boylam + 180);
    const ascBurc = burcIndeksi(g.yukselen.boylam);
    const dscBurc = (ascBurc + 6) % 12;
    const hedefler = [dsc, g.venus.boylam, g[yAd].boylam, g[ES[cinsiyet] || 'venus'].boylam, evlilikNoktasi(h, cinsiyet).boylam];

    let ilkYas = simdi.getUTCFullYear() - dogum.getUTCFullYear();
    if (yilEkle(dogum, ilkYas) > simdi) ilkYas--;
    ilkYas = Math.max(18, ilkYas);
    const YIL_SAYISI = 15;
    const tumTutulmalar = tutulmalar(yilEkle(dogum, ilkYas), yilEkle(dogum, ilkYas + YIL_SAYISI));

    const yillar = [];
    for (let yas = ilkYas; yas < ilkYas + YIL_SAYISI; yas++) {
      const bas = yilEkle(dogum, yas);
      const son = yilEkle(dogum, yas + 1);
      const nedenler = {};
      const ekle = (id, puan) => { nedenler[id] = (nedenler[id] || 0) + puan; };
      const aylar = new Array(12).fill(0);
      // Her ayda hangi tetikleyicilerin çalıştığı: dönemin "neden bu aylar" açıklaması için
      const ayNedenleri = Array.from({ length: 12 }, () => new Set());

      // Profeksiyon
      const ev = (yas % 12) + 1;
      const PROF = { 7: 25, 5: 10, 1: 8, 11: 6 };
      if (PROF[ev]) ekle(`profeksiyon${ev}`, PROF[ev]);
      const yilinYoneticisi = BURCLAR[(ascBurc + yas) % 12].yonetici;
      if (yilinYoneticisi === yAd || yilinYoneticisi === 'venus') ekle('yilinYoneticisi', 10);

      // Transitler: her ayın ortası
      for (let a = 0; a < 12; a++) {
        const an = A.MakeTime(tarihEkle(bas, a * 30.44 + 15));
        const jup = transitBoylami('Jupiter', an);
        const sat = transitBoylami('Saturn', an);
        let puan = 0;
        if (S.evBul(jup, h.evler) === 7) { ekle('jupiter7', 2); puan += 2; }
        // Kavuşum tamlaştıkça puan artar (3° içinde 4, tam kavuşumda 7): dönemin ayı en tam temasa oturur
        const jOrb = Math.min(...hedefler.map((b) => aciFarki(jup, b)));
        if (jOrb <= 3) { ekle('jupiterTemas', 4); puan += 4 + (3 - jOrb); ayNedenleri[a].add('jupiterTemas'); }
        if (S.evBul(sat, h.evler) === 7 || aciFarki(sat, dsc) <= 3) { ekle('saturn7', 1); puan += 1; }
        aylar[a] += puan;
      }

      // Tutulmalar
      for (const t of tumTutulmalar.filter((x) => x.tarih >= bas && x.tarih < son)) {
        const a = Math.min(11, Math.floor((t.tarih - bas) / (30.44 * 864e5)));
        if (aciFarki(t.boylam, g.yukselen.boylam) <= 5 || aciFarki(t.boylam, dsc) <= 5) { ekle('tutulma', 8); aylar[a] += 8; ayNedenleri[a].add('tutulma'); }
        if (aciFarki(t.boylam, g.venus.boylam) <= 3 || aciFarki(t.boylam, g[yAd].boylam) <= 3) { ekle('tutulmaVenus', 6); aylar[a] += 6; ayNedenleri[a].add('tutulmaVenus'); }
      }

      // Solar return: Güneş'in natal konumuna döndüğü an, doğum yerinde
      const donus = A.SearchSunLongitude(g.gunes.boylam, A.MakeTime(tarihEkle(bas, -5)), 15);
      if (donus) {
        const sr = donusHaritasi(donus.date, h.enlem, h.boylam);
        if (burcIndeksi(sr.asc) === dscBurc) ekle('srYukselen', 8);
        if (S.evBul(sr.venus, sr.evler) === 7 || S.evBul(sr.jupiter, sr.evler) === 7) ekle('srYedi', 6);
      }

      const puan = Object.values(nedenler).reduce((t, p) => t + p, 0);
      // En güçlü dört aylık pencere. İlk yılda bugünden önceki aylar sayılmaz.
      const ilkAy = Math.max(0, Math.min(11, Math.ceil((simdi - bas) / (30.44 * 864e5))));
      let enIyi = ilkAy;
      let enIyiPuan = -1;
      // Eşit puanda yılın ortasına yakın pencere seçilir (yıl boyu süren etkilerde başa yığılmasın)
      for (let a = ilkAy; a <= Math.max(ilkAy, 8); a++) {
        const p = aylar.slice(a, a + 4).reduce((t, x) => t + x, 0);
        if (p > enIyiPuan || (p === enIyiPuan && Math.abs(a - 4) < Math.abs(enIyi - 4))) { enIyi = a; enIyiPuan = p; }
      }
      yillar.push({
        yas,
        puan,
        baslangic: tarihEkle(bas, enIyi * 30.44),
        bitis: tarihEkle(bas, Math.min(enIyi + 4, 12) * 30.44 - 2),
        nedenler: Object.entries(nedenler).sort((x, y) => y[1] - x[1]).map(([id]) => id),
        // Pencerenin içindeki aylara özgü tetikleyiciler (tamlaşan Jüpiter teması, tutulmalar)
        pencere: [...new Set(ayNedenleri.slice(enIyi, enIyi + 4).flatMap((x) => [...x]))],
      });
    }

    const secilen = yillar.filter((y) => y.puan > 0).sort((x, y) => y.puan - x.puan).slice(0, 3);
    const enGuclu = secilen[0];
    return secilen.sort((x, y) => x.yas - y.yas).map((y) => ({ ...y, enGuclu: y === enGuclu }));
  }

  Object.assign(S, { evlilikPotansiyeli, evlilikTarihleri, evlilikNoktasi });
})();
