// İlişki yapısı yorumlarını kurar.
//  Başlangıç: kompozit Yükselen'in burcu, yöneticisinin burcu, evi ve temasları (ve varsa modern eş yönetici)
//  Diğer beş başlık: Davison Güneş, Ay, Venüs, Satürn ve Mars'ın burcu, evi, yönettiği evler ve temasları
// Ücretsiz kısım: burç ve ev yorumu. Ücretli kısım: yönetilen evler ve temaslar.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_ILISKI_METINLERI;
  const TEMAS_SAYISI = 2;

  const buyukBasla = (s) => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1);
  const kucukBasla = (s) => s.charAt(0).toLocaleLowerCase('tr') + s.slice(1);

  // Bağlaç "da/de": son ünlü kalınsa "da", inceyse "de"
  function daDe(metin) {
    const unluler = metin.toLocaleLowerCase('tr').match(/[aeıioöuü]/g) || ['e'];
    return 'aıou'.includes(unluler[unluler.length - 1]) ? 'da' : 'de';
  }

  function aciTuru(aci) {
    if (aci.id === 'kavusum') return 'k';
    return ['altmislik', 'ucgen'].includes(aci.id) ? 'u' : 'g';
  }

  // Bir noktanın aynı haritadaki en tam temasları, okunur cümleler olarak
  function temasCumleleri(harita, anahtar, islev) {
    return S.haritaAcilari(harita)
      .filter(({ a, b }) => a.anahtar === anahtar || b.anahtar === anahtar)
      .slice(0, TEMAS_SAYISI)
      .map(({ a, b, aci }, sira) => {
        const diger = a.anahtar === anahtar ? b : a;
        const kaliplar = M.temasKaliplari[aciTuru(aci)];
        return kaliplar[sira % kaliplar.length].replace('{A}', buyukBasla(islev)).replace('{B}', M.islevler[diger.anahtar]);
      });
  }

  function yonetimCumleleri(harita, gezegen, bulunduguEv, baslikId) {
    const evler = [...new Set(S.yonettigiEvler(harita, gezegen).map((e) => e.ev))].filter((ev) => ev !== bulunduguEv).slice(0, 2);
    if (!evler.length) return [];
    // İki alan varsa tek cümlede birleşir: "Para ve ortak kaynaklar ile bağlılık ve ortaklık da …"
    const konu = evler.map((ev) => M.evKonulari[ev - 1]).join(' ile ');
    return [M.yonetimKaliplari[baslikId].replace('{konu}', konu).replace('{Konu}', buyukBasla(konu)).replace('{da}', daDe(konu))];
  }

  function baslangic(kompozit) {
    const asc = kompozit.gezegenler.yukselen;
    const burc = S.BURCLAR[asc.indeks];
    const yonetici = kompozit.gezegenler[burc.yonetici];
    const ilk = [
      M.baslangicBurc[asc.indeks],
      M.baslangicTarzKalip.replace('{tarz}', M.baslangicTarz[yonetici.indeks]),
      M.baslangicEv[yonetici.ev - 1],
    ].join(' ');
    const devam = temasCumleleri(kompozit, burc.yonetici, M.baslangicIslevi);
    if (burc.esYonetici) {
      const es = kompozit.gezegenler[burc.esYonetici];
      if (es.ev !== yonetici.ev) devam.push(M.esYoneticiKalip.replace('{metin}', kucukBasla(M.baslangicEv[es.ev - 1])));
    }
    return { id: 'baslangic', ...M.basliklar.baslangic, ucretsiz: [ilk], ucretli: devam.length ? [devam.join(' ')] : [] };
  }

  const DAVISON_BASLIKLARI = [['kimlik', 'gunes'], ['beslenme', 'ay'], ['iyiGelen', 'venus'], ['sinav', 'saturn'], ['catisma', 'mars']];

  function davisonBasligi(davison, id, gezegen) {
    const p = davison.gezegenler[gezegen];
    const ilk = `${M[`${id}Burc`][p.indeks]} ${M[`${id}Ev`][p.ev - 1]}`;
    const devam = [...yonetimCumleleri(davison, gezegen, p.ev, id), ...temasCumleleri(davison, gezegen, M.islevler[gezegen])];
    return { id, ...M.basliklar[id], ucretsiz: [ilk], ucretli: devam.length ? [devam.join(' ')] : [] };
  }

  function iliskiYorumu(kompozit, davison) {
    return [baslangic(kompozit), ...DAVISON_BASLIKLARI.map(([id, gezegen]) => davisonBasligi(davison, id, gezegen))];
  }

  S.iliskiYorumu = iliskiYorumu;
})();
