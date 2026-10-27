// Bireysel ilişki analizinin yorumunu kurar (dört başlık):
//  1) Eşte aranan (kadında Güneş, erkekte Ay, belirtilmemişse Venüs)   2) Çekim (kadında Mars, erkekte Venüs, belirtilmemişse Mars)
//  3) 7. ev: girişindeki burç ve içindeki gezegenler   4) 7. evin yöneticisi: bulunduğu burç, ev ve gücü
// Derin analiz (Pro plan): geri hareket, ilişki gezegenlerinin evleri, partnerin görünümü, mesleği, ailesi ve maddi durumu
// Tanıtım: giriş, konum cümlesi ve ilk yorum cümlesi ücretsiz görünür, gerisi tam rapordadır.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_BIREY_METINLERI;
  const TANITIM_CUMLE = 2;
  const ES_METNI = { kadin: ['kadinGunes', 'kadinMars'], erkek: ['erkekAy', 'erkekVenus'], belirtilmedi: ['notrVenus', 'notrMars'] };

  const birlestir = (...parcalar) => parcalar.filter(Boolean).join(' ');
  // Gezegen adıyla başlayan cümle bağlaçtan sonra da büyük harfle kalır ("Bunun yanında Jüpiter …")
  const OZEL_ADLAR = /^(Güneş|Ay|Merkür|Venüs|Mars|Jüpiter|Satürn|Uranüs|Neptün|Plüton|Kuzey Ay)(?=[\s'])/;
  const kucukBasla = (s) => (OZEL_ADLAR.test(s) ? s : s.charAt(0).toLocaleLowerCase('tr') + s.slice(1));
  // "11. evinizde" gibi sıra sayıları cümle sonu sayılmaz
  const cumleler = (p) => p.match(/(?:\d\.|[^.!?])+[.!?]+["”]?/g) || [p];

  function kart(id, baslik, giris, paragraflar) {
    const dolu = paragraflar.filter(Boolean).map((p, i) => (i ? `${M.baglaclar[(i - 1) % M.baglaclar.length]} ${kucukBasla(p)}` : p));
    const ilk = cumleler(dolu[0] || '');
    return {
      id,
      ...baslik,
      ucretsiz: [birlestir(giris, ilk.slice(0, TANITIM_CUMLE).join('').trim())],
      ucretli: [ilk.slice(TANITIM_CUMLE).join('').trim(), ...dolu.slice(1)].filter(Boolean),
    };
  }

  // Pro plan başlığı: yalnızca tekniği anlatan giriş açık, yorumun tamamı tam rapordadır
  function proKart(id, paragraflar) {
    const dolu = paragraflar.filter(Boolean).map((p, i) => (i ? `${M.baglaclar[(i - 1) % M.baglaclar.length]} ${kucukBasla(p)}` : p));
    return { id, ...M.derinBasliklar[id], pro: true, ucretsiz: [M.derinGirisler[id]], ucretli: dolu };
  }

  const burcluKalip = (kalip, burc) => kalip.replace('{Burc}', S.BURCLAR[burc].ad);
  const gezegenli = (kalip, n, ifade) => kalip.replace('{Gezegen}', n.ad).replace('{ifade}', ifade);
  // [5, 12] → "5. ve 12. evleri", [7] → "7. evi"
  const evListesi = (evler) => (evler.length === 1 ? `${evler[0]}. evi` : `${evler.slice(0, -1).map((e) => `${e}.`).join(', ')} ve ${evler[evler.length - 1]}. evleri`);

  function evParagrafi(n, yonettigi) {
    const evler = [...new Set(yonettigi)];
    return birlestir(
      M.evKalip.replace('{Gezegen}', n.ad).replace('{ev}', n.ev).replace('{alan}', M.evAlani[n.ev - 1]),
      M.evYorum[n.ev - 1],
      evler.length && M.yonetimKalip.replace('{Gezegen}', n.ad).replace('{evler}', evListesi(evler)).replace('{konular}', evler.map((e) => M.evAlani[e - 1]).join(' ile ')),
    );
  }

  // Ev türetme başlıkları: evin girişindeki burç ve evdeki gezegenler
  function turetilmisKart(id, t) {
    return proKart(id, [
      birlestir(burcluKalip(M[`${id}Kalip`], t.burc), M[id][t.burc]),
      birlestir(...t.gezegenler.map((n) => gezegenli(M[`${id}GezegenKalip`], n, M[`${id}Gezegen`][n.anahtar]))),
    ]);
  }

  function derinAnaliz(analiz) {
    const geri = analiz.geri.length
      ? analiz.geri.map(({ nokta, roller }) => birlestir(M.geri[nokta.anahtar], roller.length && M.geriRolKalip.replace('{roller}', roller.map((r) => M.geriRolu[r]).join(' ve '))))
      : [M.geriYok];
    const t = analiz.turetilmis;
    return [
      proKart('geri', geri),
      proKart('evler', [evParagrafi(analiz.es, analiz.yonetimler.es), evParagrafi(analiz.cekim, analiz.yonetimler.cekim)]),
      turetilmisKart('gorunum', t.gorunum),
      turetilmisKart('meslek', t.meslek),
      turetilmisKart('aile', t.aile),
      turetilmisKart('maddi', t.maddi),
    ];
  }

  const konum = (n, kalip = M.konumKalip) => kalip.replace('{Gezegen}', n.ad).replace('{burcDe}', n.burc.de).replace('{ev}', n.ev);

  function bireyselYorum(analiz) {
    const c = analiz.cinsiyet;
    const [esMetni, cekimMetni] = ES_METNI[c];
    const y = analiz.yedinci;
    const yn = analiz.yonetici;
    return [
      kart('es', M.basliklar[c].es, M.girisler[c].es, [birlestir(konum(analiz.es), M[esMetni][analiz.es.indeks])]),
      kart('cekim', M.basliklar[c].cekim, M.girisler[c].cekim, [birlestir(konum(analiz.cekim), M[cekimMetni][analiz.cekim.indeks])]),
      kart('yedinci', M.basliklar.yedinci, M.girisler.yedinci, [
        M.yedinciBurc[y.burc],
        ...(y.gezegenler.length ? y.gezegenler.map((n) => M.yedincideGezegen[n.anahtar]) : [M.yedinciBos]),
      ]),
      kart('yonetici', M.basliklar.yonetici, M.girisler.yonetici, [
        birlestir(konum(yn.nokta, M.yoneticiKalip), M.yoneticiEv[yn.nokta.ev - 1]),
        M.yoneticiGuc[yn.guc],
      ]),
      ...derinAnaliz(analiz),
    ];
  }

  S.bireyselYorum = bireyselYorum;
})();
