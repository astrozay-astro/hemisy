// Eş potansiyeli raporunun yorumunu kurar. Teknik okuyucuya anlatılmaz, yalnızca yorum verilir.
//  Ücretsiz: 1) Eş potansiyeli (kadında Güneş, erkekte Ay, belirtilmemişse Venüs): burç × ev profili, açılar,
//               Kuzey Ay Düğümü 7. evdeyse karmik katman
//            2) İlişki potansiyeli (kadında Mars, erkekte Venüs, belirtilmemişse Mars): burç ve ev tek profil, geri
//               hareket, yanıklık, açılar, eş ile çekim göstergesi arasındaki açının sentezi, ilişkiden uzaklaşma
//  Pro plan: 3) Eşle nerede tanışılır: 7. ev yöneticisinin evi, yöneticinin ve Alçalan'ın burcundan iki sahne, tempo
//            4) Evlilik potansiyeli yüzdesi ve evlilik noktasının evi   5) En güçlü üç evlilik dönemi, ayların tetikleyicisi ve rehberlik
// Paragraflar bağlaçsız art arda gelir. Aynı açı yorumu raporda bir kez yazılır, eş ile çekim göstergesi arasındaki
// açı kartlarda değil sentez paragrafında anlatılır.
// Her kart, hangi göstergelerden üretildiğini "kaynak" listesinde taşır (yalnızca #test modunda görünür).
// Tanıtım: ücretsiz kartlarda ilk paragrafın ilk iki cümlesi, Pro kartlarda yalnızca giriş cümlesi açıktır.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_BIREY_METINLERI;
  const T = window.ASTROSHIP_TEMEL;
  const TANITIM_CUMLE = 2;
  const ES_PARCA = { kadin: 'esParca', erkek: 'erkekAyParca', belirtilmedi: 'esParca' };
  const CEKIM_METNI = { kadin: 'kadinMars', erkek: 'erkekVenus', belirtilmedi: 'notrMars' };
  const UYUMLU = ['altmislik', 'ucgen'];
  const SENTEZ_ORB = 8;
  const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  const birlestir = (...parcalar) => parcalar.filter(Boolean).join(' ');
  const buyukBasla = (s) => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1);
  const kucukBasla = (s) => s.charAt(0).toLocaleLowerCase('tr') + s.slice(1);
  // Kişiye göre değişen ama her açılışta aynı kalan seçim: noktanın derecesinden türetilir
  const tohum = (n) => Math.floor(n.boylam * 10);
  const sec = (liste, t) => liste[t % liste.length];
  const listele = (x) => (x.length === 1 ? x[0] : `${x.slice(0, -1).join(', ')} ya da ${x[x.length - 1]}`);
  const cumleler = (p) => p.match(/[^.!?]+[.!?]+["”]?/g) || [p];
  const konumYaz = (n) => `${n.ad} ${n.burc.ad}${n.ev ? ` ${n.ev}. ev` : ''}${n.geri ? ' retro' : ''}`;
  const aciTuru = (aci) => (aci.id === 'kavusum' ? 'k' : UYUMLU.includes(aci.id) ? 'u' : 'g');

  function kart(id, glif, paragraflar, kaynak) {
    const dolu = paragraflar.filter(Boolean);
    const ilk = cumleler(dolu[0] || '');
    return {
      id,
      soru: M.basliklar[id],
      glif,
      ucretsiz: [ilk.slice(0, TANITIM_CUMLE).join('').trim()],
      ucretli: [ilk.slice(TANITIM_CUMLE).join('').trim(), ...dolu.slice(1)].filter(Boolean),
      kaynak,
    };
  }

  // Pro kart: giriş cümlesi açık, yorumun tamamı tam rapordadır
  const proKart = (id, glif, giris, paragraflar, kaynak, ekler = {}) => ({ id, soru: M.basliklar[id], glif, pro: true, ucretsiz: [giris], ucretli: paragraflar.filter(Boolean), kaynak, ...ekler });

  // Açılar: yalnızca yorum. haric: sentezde anlatılan nokta, gorulen: raporda zaten yazılmış yorumlar
  function aciYorumlari(d, rol, haric, gorulen, kaynak) {
    return d.acilar.map(({ diger, aci }) => {
      if (diger.anahtar === haric || !M.aciAnlam[diger.anahtar]) return '';
      const tur = aciTuru(aci);
      const anahtar = `${diger.anahtar}-${tur}`;
      if (gorulen.has(anahtar)) return '';
      gorulen.add(anahtar);
      kaynak.push(`${d.nokta.ad}–${diger.ad} ${aci.ad} (orb ${aci.orb.toFixed(1)}°)`);
      return M.aciAnlam[diger.anahtar][tur].replace('{Rol}', rol);
    });
  }

  // Burç parçaları ile evin çalışma biçimi birleşir: aynı burç farklı evlerde farklı bir eş anlatır
  function esPotansiyeli(a) {
    const n = a.es;
    const p = M[ES_PARCA[a.cinsiyet]][n.indeks];
    const t = tohum(n);
    const meslek = listele([0, 1, 2].map((i) => p.meslek[(t + i) % p.meslek.length]));
    const K = M.esKalip;
    return birlestir(
      sec(K.acilis, t).replace('{nitelik}', p.nitelik),
      sec(K.meslek, t >> 1).replace('{meslek}', meslek).replace('{Meslek}', buyukBasla(meslek)).replace('{tarz}', M.evTarz[n.ev - 1]),
      sec(K.denge, t >> 2).replace('{guclu}', p.guclu).replace('{Guclu}', buyukBasla(p.guclu)).replace('{zayif}', p.zayif),
    );
  }

  // Eş göstergesi ile çekim göstergesi arasındaki açı (uzun vadede aranan kişi ile ilk anda çekilinen kişi)
  function sentezAcisi(a) {
    const aci = S.aciBul(a.es.boylam, a.cekim.boylam);
    if (!aci || aci.orb > SENTEZ_ORB) return null;
    return aci;
  }

  function esKarti(a, glif, gorulen, sentez) {
    const kaynak = [konumYaz(a.es)];
    if (a.dugum7) kaynak.push(`Kuzey Ay Düğümü 7. ev ya da Alçalan'a yakın`);
    return kart('es', glif, [
      esPotansiyeli(a),
      M.evEs[a.es.ev - 1],
      a.dugum7 && M.dugumEs,
      ...aciYorumlari(a.detay.es, M.roller.es, sentez && a.cekim.anahtar, gorulen, kaynak),
    ], kaynak);
  }

  function cekimKarti(a, glif, gorulen, sentez) {
    const d = a.detay.cekim;
    const n = d.nokta;
    const kaynak = [konumYaz(n), `Uzaklaşma: Güneş ${a.gunes.burc.ad}`];
    if (d.yanik) kaynak.push(d.yanik === 'yanik' ? 'Yanık' : 'Güneş ışınları altında');
    const yanik = d.yanik && (d.yanik === 'yanik' ? T.yanik : T.usb)[n.anahtar];
    let sentezMetni = '';
    if (sentez) {
      const tur = sentez.id === 'kavusum' ? 'kavusum' : UYUMLU.includes(sentez.id) ? 'uyumlu' : sentez.id;
      sentezMetni = M.sentez[tur];
      kaynak.push(`Sentez: ${a.es.ad}–${n.ad} ${sentez.ad} (orb ${sentez.orb.toFixed(1)}°)`);
    }
    return kart('cekim', glif, [
      birlestir(M[CEKIM_METNI[a.cinsiyet]][a.cekim.indeks], M.evCekim[n.ev - 1]),
      birlestir(n.geri && M.geri[n.anahtar], yanik),
      sentezMetni,
      ...aciYorumlari(d, M.roller.cekim, sentez && a.es.anahtar, gorulen, kaynak),
      M.uzaklasma[a.gunes.indeks],
    ], kaynak);
  }

  // İki sahne: yöneticinin burcundan ve (farklıysa) Alçalan'ın burcundan, aynı ev bağlamında
  function tanismaKarti(a) {
    const y = a.yonetici;
    const satir = M.tanismaSahne[y.ev - 1];
    const ikinci = a.yedinciBurc !== y.indeks && `${M.tanismaIkinci} ${satir[a.yedinciBurc]}`;
    return proKart('tanisma', M.glifler.tanisma, M.tanismaGiris, [
      M.tanismaEv[y.ev - 1],
      birlestir(`${sec(M.tanismaSahneBaglac, tohum(y))} ${satir[y.indeks]}`, ikinci),
      birlestir(M.tanismaTempo[y.indeks], y.geri && M.tanismaGeri),
    ], [`7. ev yöneticisi ${konumYaz(y)}`, `Alçalan ${S.BURCLAR[a.yedinciBurc].ad}`]);
  }

  function evlilikKarti(a) {
    const { yuzde, etkenler } = a.evlilik;
    const bant = yuzde >= 75 ? 0 : yuzde >= 62 ? 1 : yuzde >= 48 ? 2 : 3;
    const sirali = [...etkenler].sort((x, y) => Math.abs(y.puan) - Math.abs(x.puan));
    const destek = sirali.filter((e) => e.puan > 0).slice(0, 3).map((e) => M.evlilikEtken[e.id]);
    const dikkat = sirali.filter((e) => e.puan < 0).slice(0, 2).map((e) => M.evlilikEtken[e.id]);
    const nokta = a.evlilikNoktasi;
    return proKart('evlilik', M.glifler.evlilik, M.evlilikGiris, [
      birlestir(M.evlilikBant[bant], M.evlilikNoktasiEv[nokta.ev - 1]),
      destek.length && `${M.evlilikDestek}: ${kucukBasla(destek.join(' '))}`,
      dikkat.length && `${M.evlilikDikkat}: ${kucukBasla(dikkat.join(' '))}`,
    ], [
      `Başlangıç 55, etkenler: ${etkenler.map((e) => `${e.id} ${e.puan > 0 ? '+' : ''}${e.puan}`).join(', ') || 'yok'}`,
      `Evlilik noktası (${nokta.formul} formülü): ${nokta.metin}, ${nokta.ev}. ev`,
    ], { yuzde });
  }

  const ayYil = (t) => `${AYLAR[t.getUTCMonth()]} ${t.getUTCFullYear()}`;

  // Dönem metni: yılın iki ana tetikleyicisi, ayların tetikleyicisi ve rehberlik. Önceki dönemlerde yazılan cümleler
  // tekrar edilmez (yerine alternatif cümle gelir), aylara özgü tetikleyici yıl cümlesinde ayrıca anlatılmaz.
  function donemMetni(t, kullanilan) {
    const pencereId = t.pencere.find((id) => M.tarihPencere[id]);
    const yeni = (metin) => metin && !kullanilan.has(metin) && (kullanilan.add(metin), metin);
    const yil = t.nedenler.filter((id) => id !== pencereId)
      .map((id) => yeni(M.tarihNeden[id]) || yeni(M.tarihNedenAlt[id]))
      .filter(Boolean).slice(0, 2);
    const rehber = t.nedenler.map((id) => M.tarihRehber[id]).find((m) => m && !kullanilan.has(m)) || M.tarihRehberAlt;
    kullanilan.add(rehber);
    return birlestir(...yil, M.tarihPencere[pencereId], rehber);
  }

  function tarihlerKarti(a) {
    const kullanilan = new Set();
    const donemler = a.tarihler.map((t) => ({
      baslik: `${ayYil(t.baslangic)} – ${ayYil(t.bitis)}`,
      etiket: t.enGuclu ? M.tarihEtiket.enGuclu : M.tarihEtiket.diger,
      enGuclu: t.enGuclu,
      alt: M.yasKalip.replace('{yas}', t.yas),
      metin: donemMetni(t, kullanilan),
    }));
    return proKart('tarihler', M.glifler.tarihler, M.tarihlerGiris, [donemler.length ? M.tarihlerNot : M.tarihlerBos],
      a.tarihler.map((t) => `${t.yas} yaş (puan ${t.puan}): ${t.nedenler.join(', ')}${t.pencere.length ? ` · ay penceresi: ${t.pencere.join(', ')}` : ''}`),
      { donemler });
  }

  function bireyselYorum(a) {
    const [esGlif, cekimGlif] = M.glifler[a.cinsiyet];
    const gorulen = new Set();
    const sentez = sentezAcisi(a);
    return [
      esKarti(a, esGlif, gorulen, sentez),
      cekimKarti(a, cekimGlif, gorulen, sentez),
      tanismaKarti(a),
      evlilikKarti(a),
      tarihlerKarti(a),
    ];
  }

  S.bireyselYorum = bireyselYorum;
})();
