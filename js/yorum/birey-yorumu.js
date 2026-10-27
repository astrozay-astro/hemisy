// Eş potansiyeli raporunun yorumunu kurar. Teknik okuyucuya anlatılmaz, yalnızca yorum verilir.
//  Ücretsiz: 1) Eş potansiyeli (kadında Güneş, erkekte Ay, belirtilmemişse Venüs): burç, ev ve açılar
//            2) İlişki potansiyeli (kadında Mars, erkekte Venüs, belirtilmemişse Mars): burç, ev, geri hareket,
//               yanıklık, açılar ve ilişkiden uzaklaşma (Güneş burcu)
//  Pro plan: 3) Eşle nerede tanışılır (7. ev yöneticisinin evi ve burcunun niteliği)
//            4) Evlilik potansiyeli yüzdesi   5) En güçlü üç evlilik dönemi
// Tanıtım: ücretsiz kartlarda ilk paragrafın ilk iki cümlesi, Pro kartlarda yalnızca giriş cümlesi açıktır.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_BIREY_METINLERI;
  const T = window.ASTROSHIP_TEMEL;
  const TANITIM_CUMLE = 2;
  const ES_METNI = { kadin: 'esBurc', erkek: 'erkekAy', belirtilmedi: 'esBurc' };
  const CEKIM_METNI = { kadin: 'kadinMars', erkek: 'erkekVenus', belirtilmedi: 'notrMars' };
  const UYUMLU = ['altmislik', 'ucgen'];
  const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  const birlestir = (...parcalar) => parcalar.filter(Boolean).join(' ');
  const kucukBasla = (s) => s.charAt(0).toLocaleLowerCase('tr') + s.slice(1);
  const cumleler = (p) => p.match(/[^.!?]+[.!?]+["”]?/g) || [p];
  const baglaclarla = (paragraflar) => paragraflar.filter(Boolean).map((p, i) => (i ? `${M.baglaclar[(i - 1) % M.baglaclar.length]} ${kucukBasla(p)}` : p));

  function kart(id, glif, paragraflar) {
    const dolu = baglaclarla(paragraflar);
    const ilk = cumleler(dolu[0] || '');
    return {
      id,
      soru: M.basliklar[id],
      glif,
      ucretsiz: [ilk.slice(0, TANITIM_CUMLE).join('').trim()],
      ucretli: [ilk.slice(TANITIM_CUMLE).join('').trim(), ...dolu.slice(1)].filter(Boolean),
    };
  }

  // Pro kart: giriş cümlesi açık, yorumun tamamı tam rapordadır
  const proKart = (id, glif, giris, paragraflar, ekler = {}) => ({ id, soru: M.basliklar[id], glif, pro: true, ucretsiz: [giris], ucretli: paragraflar.filter(Boolean), ...ekler });

  // Açılar: yalnızca yorum, açının adı ve gezegenler anlatılmaz. Aynı yoruma düşen açılar bir kez yazılır.
  function aciYorumlari(d, rol) {
    const gorulen = new Set();
    return d.acilar.map(({ diger, aci }) => {
      const tur = aci.id === 'kavusum' ? 'k' : UYUMLU.includes(aci.id) ? 'u' : 'g';
      const anahtar = `${diger.anahtar}-${tur}`;
      if (gorulen.has(anahtar) || !M.aciAnlam[diger.anahtar]) return '';
      gorulen.add(anahtar);
      return M.aciAnlam[diger.anahtar][tur].replace('{Rol}', rol);
    });
  }

  function esKarti(a, glif) {
    const d = a.detay.es;
    return kart('es', glif, [
      M[ES_METNI[a.cinsiyet]][a.es.indeks],
      M.evEs[a.es.ev - 1],
      ...aciYorumlari(d, M.roller.es),
    ]);
  }

  function cekimKarti(a, glif) {
    const d = a.detay.cekim;
    const n = d.nokta;
    const yanik = d.yanik && (d.yanik === 'yanik' ? T.yanik : T.usb)[n.anahtar];
    return kart('cekim', glif, [
      M[CEKIM_METNI[a.cinsiyet]][a.cekim.indeks],
      M.evCekim[n.ev - 1].replace('{kisiler}', M.kisiler[a.cinsiyet]),
      birlestir(n.geri && M.geri[n.anahtar], yanik),
      ...aciYorumlari(d, M.roller.cekim),
      M.uzaklasma[a.gunes.indeks],
    ]);
  }

  function tanismaKarti(a) {
    const y = a.yonetici;
    return proKart('tanisma', M.glifler.tanisma, M.tanismaGiris, [
      M.tanisma[y.ev - 1],
      birlestir(M.tanismaNitelik[y.indeks % 3], y.geri && M.tanismaGeri),
    ]);
  }

  function evlilikKarti(a) {
    const { yuzde, etkenler } = a.evlilik;
    const bant = yuzde >= 75 ? 0 : yuzde >= 55 ? 1 : 2;
    const sirali = [...etkenler].sort((x, y) => Math.abs(y.puan) - Math.abs(x.puan));
    const destek = sirali.filter((e) => e.puan > 0).slice(0, 3).map((e) => M.evlilikEtken[e.id]);
    const dikkat = sirali.filter((e) => e.puan < 0).slice(0, 2).map((e) => M.evlilikEtken[e.id]);
    return proKart('evlilik', M.glifler.evlilik, M.evlilikGiris, [
      M.evlilikBant[bant],
      destek.length && `${M.evlilikDestek}: ${kucukBasla(destek.join(' '))}`,
      dikkat.length && `${M.evlilikDikkat}: ${kucukBasla(dikkat.join(' '))}`,
    ], { yuzde });
  }

  const ayYil = (t) => `${AYLAR[t.getUTCMonth()]} ${t.getUTCFullYear()}`;

  function tarihlerKarti(a) {
    const donemler = a.tarihler.map((t) => ({
      baslik: `${ayYil(t.baslangic)} – ${ayYil(t.bitis)}`,
      etiket: t.enGuclu ? M.tarihEtiket.enGuclu : M.tarihEtiket.diger,
      enGuclu: t.enGuclu,
      alt: M.yasKalip.replace('{yas}', t.yas),
      metin: birlestir(...t.nedenler.slice(0, 2).map((id) => M.tarihNeden[id])),
    }));
    return proKart('tarihler', M.glifler.tarihler, M.tarihlerGiris, [donemler.length ? M.tarihlerNot : M.tarihlerBos], { donemler });
  }

  function bireyselYorum(a) {
    const [esGlif, cekimGlif] = M.glifler[a.cinsiyet];
    return [
      esKarti(a, esGlif),
      cekimKarti(a, cekimGlif),
      tanismaKarti(a),
      evlilikKarti(a),
      tarihlerKarti(a),
    ];
  }

  S.bireyselYorum = bireyselYorum;
})();
