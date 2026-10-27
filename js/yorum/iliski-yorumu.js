// İlişki yapısı yorumlarını kurar (her başlık 4–6 paragraf).
//  Başlangıç: kompozit Yükselen burcu; yöneticisinin arketipi, burcu, evi, gücü ve temasları; eş yönetici; Evlilik Kısmeti
//  Kimlik / beslenme / iyi gelen / sınav / çatışma: Davison Güneş, Ay, Venüs, Satürn, Mars
//    1) arketip + burç + sekt   2) ev + köşe/ardıl/düşen + görmeme   3) güç + yönetici zinciri
//    4) yönettiği evler + 7. evden türetilmiş anlamı   5) temaslar (iyicil destek, kötücül zorluk)
//    6) karmik katman (düğümler, geri hareket, 12. ev) + bölümün kısmeti
//  Karmik ders: Davison Kuzey Ay Düğümü'nün burcu ve evi, düğümlere kavuşan gezegenler, geri hareketler
// Tanıtım: her başlığın ilk iki cümlesi ücretsiz görünür; gerisi tam rapordadır.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_ILISKI_METINLERI;
  const TEMAS_SAYISI = 2;
  const TANITIM_CUMLE = 2;
  const IYICIL = ['venus', 'jupiter'];
  const KOTUCUL = ['mars', 'saturn'];

  const buyukBasla = (s) => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1);
  const kucukBasla = (s) => s.charAt(0).toLocaleLowerCase('tr') + s.slice(1);
  const birlestir = (...parcalar) => parcalar.filter(Boolean).join(' ');

  // Bağlaç "da/de": son ünlü kalınsa "da", inceyse "de"
  function daDe(metin) {
    const unluler = metin.toLocaleLowerCase('tr').match(/[aeıioöuü]/g) || ['e'];
    return 'aıou'.includes(unluler[unluler.length - 1]) ? 'da' : 'de';
  }

  const alanli = (kalip, id) => (kalip ? kalip.replace('{Alan}', buyukBasla(M.alanlar[id])) : '');
  const gucCumlesi = (guc, id) => alanli((id === 'sinav' || id === 'catisma' ? M.gucKaliplariKotucul : M.gucKaliplari)[guc], id);
  const konu = (ev) => M.evKonulari[ev - 1];

  function aciTuru(aci) {
    if (aci.id === 'kavusum') return 'k';
    return ['altmislik', 'ucgen'].includes(aci.id) ? 'u' : 'g';
  }

  // Bir noktanın aynı haritadaki en tam temasları; iyicil ve kötücül gezegenlerle temaslar ayrıca vurgulanır
  function temasCumleleri(harita, anahtar, islev) {
    return S.haritaAcilari(harita)
      .filter(({ a, b }) => a.anahtar === anahtar || b.anahtar === anahtar)
      .slice(0, TEMAS_SAYISI)
      .map(({ a, b, aci }, sira) => {
        const diger = a.anahtar === anahtar ? b : a;
        const tur = aciTuru(aci);
        const kaliplar = M.temasKaliplari[tur];
        let cumle = kaliplar[sira % kaliplar.length].replace('{A}', buyukBasla(islev)).replace('{B}', M.islevler[diger.anahtar]);
        if (IYICIL.includes(diger.anahtar) && tur !== 'g') cumle += ` ${M.iyicilDestek}`;
        if (KOTUCUL.includes(diger.anahtar) && tur === 'g') cumle += ` ${M.kotuculZorluk}`;
        return cumle;
      });
  }

  function yonetimCumlesi(nokta, bulunduguEv, id) {
    const evler = nokta.yonettigiEvler.filter((ev) => ev !== bulunduguEv).slice(0, 2);
    if (!evler.length) return '';
    const k = evler.map(konu).join(' ile ');
    const yonetim = M.yonetimKaliplari[id].replace('{konu}', k).replace('{Konu}', buyukBasla(k)).replace('{da}', daDe(k));
    // Türetilmiş ev: 7. ev (partner) 1. ev sayıldığında yönetilen ev neye karşılık gelir
    const turetilmis = ((evler[0] - 7 + 12) % 12) + 1;
    return birlestir(yonetim, M.partnerKalip.replace('{konu}', M.partnerGozuyle[turetilmis - 1]));
  }

  function karmikKatman(nokta, islev) {
    const Islev = buyukBasla(islev);
    return birlestir(
      nokta.kuzeyDugumde && M.kuzeyDugumTemasi.replace('{Islev}', Islev),
      nokta.guneyDugumde && M.guneyDugumTemasi.replace('{Islev}', Islev),
      nokta.ev === 12 && M.onikinciEv.replace('{Islev}', Islev),
    );
  }

  function kismetCumlesi(analiz, id) {
    const [ad, kalip] = M.kismetler[id];
    return kalip.replace('{konu}', konu(analiz.kismet[ad].ev));
  }

  // İlk iki cümle tanıtım olarak ücretsiz; geri kalanı tam raporda
  const cumleSayisi = (p) => (p.match(/[^.!?]+[.!?]+/g) || [p]).length;

  function bolustur(id, paragraflar) {
    // Tek cümlelik paragraflar bir öncekine eklenir; metin kopuk durmasın
    const dolu = [];
    for (const p of paragraflar.filter(Boolean)) {
      if (dolu.length > 1 && cumleSayisi(p) === 1) dolu[dolu.length - 1] += ` ${p}`;
      else dolu.push(p);
    }
    const cumleler = dolu[0].match(/[^.!?]+[.!?]+/g) || [dolu[0]];
    const tanitim = cumleler.slice(0, TANITIM_CUMLE).join('').trim();
    const ilkKalan = cumleler.slice(TANITIM_CUMLE).join('').trim();
    return {
      id,
      ...M.basliklar[id],
      ucretsiz: [tanitim],
      ucretli: [ilkKalan, ...dolu.slice(1)].filter(Boolean),
    };
  }

  function baslangic(kompozit, davisonAnaliz) {
    const analiz = S.derinAnaliz(kompozit);
    const asc = kompozit.gezegenler.yukselen;
    const burc = S.BURCLAR[asc.indeks];
    const yoneticiAd = burc.yonetici;
    const yonetici = kompozit.gezegenler[yoneticiAd];
    const yn = analiz.noktalar[yoneticiAd];
    const id = 'baslangic';

    const p1 = birlestir(
      M.girisler.baslangic,
      M.baslangicBurc[asc.indeks],
      M.baslangicTarzKalip.replace('{arketip}', M.arketipler[yoneticiAd]).replace('{tarz}', M.baslangicTarz[yonetici.indeks]),
    );
    const p2 = birlestir(M.baslangicEv[yn.ev - 1], alanli(M.konumKaliplari[yn.konum], id));
    let es = '';
    if (burc.esYonetici) {
      const esEv = analiz.noktalar[burc.esYonetici].ev;
      if (esEv !== yn.ev) es = M.esYoneticiKalip.replace('{metin}', kucukBasla(M.baslangicEv[esEv - 1]));
    }
    const p3 = birlestir(gucCumlesi(yn.guc, id), es);
    const p4 = temasCumleleri(kompozit, yoneticiAd, M.baslangicIslevi).join(' ');
    const p5 = kismetCumlesi(davisonAnaliz, id);
    return bolustur(id, [p1, p2, p3, p4, p5]);
  }

  const DAVISON_BASLIKLARI = [['kimlik', 'gunes'], ['beslenme', 'ay'], ['iyiGelen', 'venus'], ['sinav', 'saturn'], ['catisma', 'mars']];

  // anlatilanZincirler: aynı yönetici alanı raporda bir kez anlatılsın diye
  function davisonBasligi(davison, analiz, id, gezegen, anlatilanZincirler) {
    const p = davison.gezegenler[gezegen];
    const n = analiz.noktalar[gezegen];
    const islev = M.islevler[gezegen];

    const p1 = birlestir(M.girisler[id], M[`${id}Burc`][p.indeks], M.sekt[id][analiz.sekt.gunduz ? 'gunduz' : 'gece']);
    const p2 = birlestir(M[`${id}Ev`][n.ev - 1], alanli(M.konumKaliplari[n.konum], id), n.gormeme && M.gormeme);
    let zincir = '';
    if (n.yonetici !== gezegen && !anlatilanZincirler.has(n.yoneticiEvi)) {
      anlatilanZincirler.add(n.yoneticiEvi);
      zincir = M.zincirKalip.replace('{konu}', konu(n.yoneticiEvi));
    }
    const p3 = birlestir(gucCumlesi(n.guc, id), zincir);
    const p4 = yonetimCumlesi(n, n.ev, id);
    const p5 = temasCumleleri(davison, gezegen, islev).join(' ');
    const p6 = birlestir(karmikKatman(n, islev), kismetCumlesi(analiz, id));
    return bolustur(id, [p1, p2, p3, p4, p5, p6]);
  }

  function karmikDers(davison, analiz) {
    const p1 = birlestir(M.girisler.karmik, M.karmikBurc[analiz.dugum.kuzeyBurc]);
    const p2 = M.karmikEv[analiz.dugum.kuzeyEv - 1];
    const temaslar = Object.entries(analiz.noktalar)
      .filter(([anahtar, n]) => M.islevler[anahtar] && anahtar !== 'kuzeyDugum' && (n.kuzeyDugumde || n.guneyDugumde))
      .map(([anahtar, n]) => (n.kuzeyDugumde ? M.kuzeyDugumTemasi : M.guneyDugumTemasi).replace('{Islev}', buyukBasla(M.islevler[anahtar])));
    const p3 = temaslar.join(' ');
    const onikinci = ['gunes', 'ay', 'venus', 'mars']
      .filter((a) => analiz.noktalar[a].ev === 12)
      .map((a) => M.onikinciEv.replace('{Islev}', buyukBasla(M.islevler[a])));
    const p4 = birlestir(analiz.geriSayisi >= 3 && M.geriKalabalik, ...onikinci);
    return bolustur('karmik', [p1, p2, p3, p4]);
  }

  function iliskiYorumu(kompozit, davison) {
    const analiz = S.derinAnaliz(davison);
    const anlatilanZincirler = new Set();
    return [
      baslangic(kompozit, analiz),
      ...DAVISON_BASLIKLARI.map(([id, gezegen]) => davisonBasligi(davison, analiz, id, gezegen, anlatilanZincirler)),
      karmikDers(davison, analiz),
    ];
  }

  S.iliskiYorumu = iliskiYorumu;
})();
