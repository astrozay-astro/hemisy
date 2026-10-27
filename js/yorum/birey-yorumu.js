// Bireysel ilişki analizinin yorumunu kurar.
// Her gösterge bütüncül okunur: burç, bulunduğu ev, yönettiği evler, geri hareket ve en tam açıları birlikte anlatılır.
//  1) Eşte aranan (kadında Güneş, erkekte Ay, belirtilmemişse Venüs)   2) Çekim (kadında Mars, erkekte Venüs, belirtilmemişse Mars)
//  3) 7. ev: girişindeki burç ve içindeki gezegenler   4) 7. evin yöneticisi: burcu, evi, gücü, geri hareketi ve açıları
// Derin analiz (Pro plan), ev türetme: partnerin görünümü, mesleği, ailesi ve maddi durumu; her evin burcu, içindeki
// gezegenler, yöneticisinin yeri ve geri hareketi.
// Tanıtım: giriş, konum cümlesi ve ilk yorum cümlesi ücretsiz görünür. Pro başlıklarda yalnızca teknik giriş açıktır.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_BIREY_METINLERI;
  const TANITIM_CUMLE = 2;
  const ES_METNI = { kadin: ['kadinGunes', 'kadinMars'], erkek: ['erkekAy', 'erkekVenus'], belirtilmedi: ['notrVenus', 'notrMars'] };
  const UYUMLU = ['altmislik', 'ucgen'];

  const birlestir = (...parcalar) => parcalar.filter(Boolean).join(' ');
  // Gezegen adıyla başlayan cümle bağlaçtan sonra da büyük harfle kalır ("Bunun yanında Jüpiter …")
  const OZEL_ADLAR = /^(Güneş|Ay|Merkür|Venüs|Mars|Jüpiter|Satürn|Uranüs|Neptün|Plüton|Kuzey Ay|Yükselen|MC|\d)/;
  const kucukBasla = (s) => (OZEL_ADLAR.test(s) ? s : s.charAt(0).toLocaleLowerCase('tr') + s.slice(1));
  // "11. evinizde" gibi sıra sayıları cümle sonu sayılmaz
  const cumleler = (p) => p.match(/(?:\d\.|[^.!?])+[.!?]+["”]?/g) || [p];
  const baglaclarla = (paragraflar) => paragraflar.filter(Boolean).map((p, i) => (i ? `${M.baglaclar[(i - 1) % M.baglaclar.length]} ${kucukBasla(p)}` : p));

  function kart(id, baslik, giris, paragraflar) {
    const dolu = baglaclarla(paragraflar);
    const ilk = cumleler(dolu[0] || '');
    return {
      id,
      ...baslik,
      ucretsiz: [birlestir(giris, ilk.slice(0, TANITIM_CUMLE).join('').trim())],
      ucretli: [ilk.slice(TANITIM_CUMLE).join('').trim(), ...dolu.slice(1)].filter(Boolean),
    };
  }

  // Pro plan başlığı: yalnızca tekniği anlatan giriş açık, yorumun tamamı tam rapordadır
  const proKart = (id, paragraflar) => ({ id, ...M.derinBasliklar[id], pro: true, ucretsiz: [M.derinGirisler[id]], ucretli: baglaclarla(paragraflar) });

  const konum = (n, kalip = M.konumKalip) => kalip.replace('{Gezegen}', n.ad).replace('{burcDe}', n.burc.de).replace('{ev}', n.ev);
  // [5, 12] → "5. ve 12. evleri", [7] → "7. evi"
  const evListesi = (evler) => (evler.length === 1 ? `${evler[0]}. evi` : `${evler.slice(0, -1).map((e) => `${e}.`).join(', ')} ve ${evler[evler.length - 1]}. evleri`);

  // Göstergenin evi ve yönettiği evler
  function evCumlesi(d) {
    const n = d.nokta;
    return birlestir(
      M.evKalip.replace('{alan}', M.evAlani[n.ev - 1]),
      M.evYorum[n.ev - 1],
      d.yonettigi.length && M.yonetimKalip.replace('{Gezegen}', n.ad).replace('{evler}', evListesi(d.yonettigi)).replace('{konular}', d.yonettigi.map((e) => M.evAlani[e - 1]).join(' ile ')),
    );
  }

  // Göstergenin en tam açıları, ilişki rolüyle anlatılır
  function aciCumleleri(d, rol) {
    return d.acilar.map(({ diger, aci }) => {
      const tur = aci.id === 'kavusum' ? 'k' : UYUMLU.includes(aci.id) ? 'u' : 'g';
      const olgu = (tur === 'k' ? M.kavusumKalip : M.aciKalip.replace('{aci}', M.aciAdlari[aci.id]))
        .replace('{Gezegen}', d.nokta.ad).replace('{Diger}', diger.ad);
      return birlestir(olgu, M.aciAnlam[diger.anahtar][tur].replace('{Rol}', rol));
    });
  }

  // Bir göstergenin bütüncül yorumu: burç → ev ve yönetilen evler → geri hareket → açılar
  function gostergeParagraflari(d, burcMetni, rol) {
    return [
      birlestir(konum(d.nokta), burcMetni),
      evCumlesi(d),
      d.nokta.geri && M.geri[d.nokta.anahtar],
      birlestir(...aciCumleleri(d, rol)),
    ];
  }

  // Ev türetme başlıkları: evin burcu, içindeki gezegenler, yöneticisinin yeri ve geri hareketi
  function turetilmisKart(id, t) {
    const y = t.yonetici;
    return proKart(id, [
      birlestir(M[`${id}Kalip`].replace('{Burc}', S.BURCLAR[t.burc].ad), M[id][t.burc]),
      birlestir(...t.gezegenler.map((n) => M[`${id}GezegenKalip`].replace('{Gezegen}', n.ad).replace('{ifade}', M[`${id}Gezegen`][n.anahtar]))),
      M.turetilmisBaglanti[id] && birlestir(
        M.turetilmisYoneticiKalip.replace('{ev}', t.ev).replace('{Gezegen}', y.ad).replace('{yev}', y.ev),
        M.turetilmisBaglanti[id].replace('{alan}', M.evAlani[y.ev - 1]),
        y.geri && M.turetilmisGeri,
      ),
    ]);
  }

  function bireyselYorum(analiz) {
    const c = analiz.cinsiyet;
    const [esMetni, cekimMetni] = ES_METNI[c];
    const { detay } = analiz;
    const y = analiz.yedinci;
    const yn = analiz.yonetici;
    // 7. ev yöneticisi eş ya da çekim göstergesiyle aynıysa ev ve açıları tekrar anlatılmaz
    const ayniRol = ['es', 'cekim'].find((r) => detay[r].nokta.anahtar === yn.nokta.anahtar);
    const t = analiz.turetilmis;
    return [
      kart('es', M.basliklar[c].es, M.girisler[c].es, gostergeParagraflari(detay.es, M[esMetni][analiz.es.indeks], M.roller[c].es)),
      kart('cekim', M.basliklar[c].cekim, M.girisler[c].cekim, gostergeParagraflari(detay.cekim, M[cekimMetni][analiz.cekim.indeks], M.roller[c].cekim)),
      kart('yedinci', M.basliklar.yedinci, M.girisler.yedinci, [
        M.yedinciBurc[y.burc],
        ...(y.gezegenler.length ? y.gezegenler.map((n) => M.yedincideGezegen[n.anahtar]) : [M.yedinciBos]),
      ]),
      kart('yonetici', M.basliklar.yonetici, M.girisler.yonetici, [
        birlestir(konum(yn.nokta, M.yoneticiKalip), M.yoneticiEv[yn.nokta.ev - 1]),
        M.yoneticiGuc[yn.guc],
        ayniRol ? M.yoneticiAyni.replace('{rol}', M.yoneticiAyniRol[ayniRol]) : yn.nokta.geri && M.geri[yn.nokta.anahtar],
        !ayniRol && birlestir(...aciCumleleri(detay.yonetici, M.roller.yonetici)),
      ]),
      turetilmisKart('gorunum', t.gorunum),
      turetilmisKart('meslek', t.meslek),
      turetilmisKart('aile', t.aile),
      turetilmisKart('maddi', t.maddi),
    ];
  }

  S.bireyselYorum = bireyselYorum;
})();
