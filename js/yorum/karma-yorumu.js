// Karmik bağ yorumlarını kurar (yedi başlık). Her başlık bir arketip girişiyle açılır, ardından iki kişinin haritasında
// gerçekten bulunan karmik temasların metinleri en güçlüden başlayarak eklenir. Temas yoksa başlığın "iz yok" metni kullanılır.
//  1) Ruhsal tanışıklık: drakonik sinastri, drakonik × drakonik, Vertex
//  2) Geçmişten gelen iz: Güney Ay Düğümü temasları ve iki kişinin Güney Düğüm burcu
//  3) Ruhsal amaç: drakonik Davison Güneş, Ay, Yükselen ve Kuzey Ay Düğümü temasları
//  4) Karmik sözleşme: Satürn temasları
//  5) Gölge ve dönüşüm: Plüton ve Kara Ay temasları
//  6) Kader kapıları: Ruh, Talih ve Evlilik Kısmeti temasları
//  7) Vedik bakış: Ay nakşatraları, Aştakuta, Mangal Doşa, Jaimini bağları
// Tanıtım: giriş ve ilk özel cümle ücretsiz görünür, gerisi tam rapordadır.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_KARMA_METINLERI;
  const UYUMLU = ['altmislik', 'ucgen'];

  const kucukBasla = (s) => s.charAt(0).toLocaleLowerCase('tr') + s.slice(1);
  const birlestir = (...parcalar) => parcalar.filter(Boolean).join(' ');
  const cumleler = (p) => p.match(/[^.!?]+[.!?]+["”]?/g) || [p];

  // {N} yer tutucusunu {X} ya da {Y} yapar (ruh / kişilik ifadeleri için)
  const kime = (metin, harf) => metin.replace(/\{N/g, `{${harf}`);

  function baglaYap(paragraflar) {
    return paragraflar.map((p, i) => {
      if (!i) return p.metin;
      const baglac = M.baglaclar[(i - 1) % 3];
      return `${baglac} ${p.isimleBasliyor ? p.metin : kucukBasla(p.metin)}`;
    });
  }

  // Aynı türde aynı noktanın iki kez anlatılmaması için (ör. iki ayrı drakonik Venüs teması)
  function tekil(temaslar, anahtar) {
    const gorulen = new Set();
    return temaslar.filter((t) => {
      const k = anahtar(t);
      if (gorulen.has(k)) return false;
      gorulen.add(k);
      return true;
    });
  }

  // ozel: hazır (adları doldurulmuş) paragraflar. Bir isimle başlayan paragraf bağlaçtan sonra küçük harfe çevrilmez.
  function kart(id, giris, ozel, adlar) {
    const paragraflar = ozel.filter(Boolean).map((metin) => ({ metin, isimleBasliyor: [adlar[0], adlar[1]].some((a) => metin.startsWith(a)) }));
    const bagli = baglaYap(paragraflar);
    const ilk = bagli.length ? cumleler(bagli[0]) : [];
    return {
      id,
      ...M.basliklar[id],
      ucretsiz: [birlestir(giris, ilk[0]?.trim())],
      ucretli: [ilk.slice(1).join('').trim(), ...bagli.slice(1)].filter(Boolean),
    };
  }

  // Temas metnini, X ve Y yer tutucuları doğru kişilere gidecek biçimde doldurur
  const temasMetni = (metin, t, adlar) => S.yorumDoldur(metin, { X: adlar[t.kim], Y: adlar[t.digeri] });

  // ---------- 1) Ruhsal tanışıklık ----------
  function tanisiklik(k, adlar) {
    const bant = k.tanisiklik >= 65 ? 0 : k.tanisiklik >= 45 ? 1 : 2;
    const secilen = tekil(k.temaslar.filter((t) => ['drakonik', 'drakonikCift', 'vertex'].includes(t.tur)), (t) => `${t.tur}-${t.kim}-${t.p}`).slice(0, 4);
    const ozel = [M.tanisiklikBant[bant], ...secilen.map((t) => {
      if (t.tur === 'vertex') return temasMetni(birlestir(M.vertexGiris, M.vertex[t.p]), t, adlar);
      if (t.tur === 'drakonikCift') {
        return temasMetni(M.drakonikCift.replace('{ruhX}', kime(M.ruhYuzu[t.p], 'X')).replace('{ruhY}', kime(M.ruhYuzu[t.q], 'Y')), t, adlar);
      }
      const kalip = (t.karsit ? M.drakonikKarsit : M.drakonikKavusum)
        .replace('{ruh}', kime(M.ruhYuzu[t.p], 'X')).replace('{kisilik}', kime(M.kisilikYuzu[t.q], 'Y'));
      return temasMetni(birlestir(kalip, M.drakonikAnlam[t.p], t.karsit && M.drakonikKarsitEk), t, adlar);
    })];
    return kart('tanisiklik', M.girisler.tanisiklik, ozel, adlar);
  }

  // ---------- 2) Geçmişten gelen iz ----------
  function gecmis(k, adlar) {
    const secilen = tekil(k.temaslar.filter((t) => t.tur === 'guneyDugum'), (t) => `${t.kim}-${t.p}`).slice(0, 3);
    const burclar = k.ruh.map((r) => r.guneyDugum.indeks);
    const ozel = [
      ...(secilen.length ? secilen.map((t) => temasMetni(M.guneyDugum[t.p], t, adlar)) : [M.guneyDugumYok]),
      birlestir(
        S.yorumDoldur(M.guneyBurc[burclar[0]], { N: adlar[0] }),
        S.yorumDoldur(M.guneyBurc[burclar[1]], { N: adlar[1] }),
        burclar[0] === burclar[1] && M.guneyIkisiAyni,
      ),
    ];
    return kart('gecmis', M.girisler.gecmis, ozel, adlar);
  }

  // ---------- 3) Ruhsal amaç ----------
  function amac(k, adlar) {
    const g = k.drakonikDavison.gezegenler;
    const secilen = tekil(k.temaslar.filter((t) => t.tur === 'kuzeyDugum'), (t) => `${t.kim}-${t.p}`).slice(0, 2);
    const ozel = [
      birlestir(M.amacGunes[g.gunes.indeks], M.amacAy[g.ay.indeks]),
      M.amacYukselen[g.yukselen.indeks],
      ...secilen.map((t) => temasMetni(M.kuzeyDugum[t.p], t, adlar)),
    ];
    return kart('amac', M.girisler.amac, ozel, adlar);
  }

  // ---------- 4) Karmik sözleşme ----------
  function sozlesme(k, adlar) {
    const secilen = tekil(k.temaslar.filter((t) => t.tur === 'saturn'), (t) => `${t.kim}-${t.q}`).slice(0, 3);
    const ozel = secilen.length
      ? secilen.map((t) => temasMetni(M.saturn[t.q][UYUMLU.includes(t.aci.id) ? 'u' : 'g'], t, adlar))
      : [M.saturnYok];
    return kart('sozlesme', M.girisler.sozlesme, ozel, adlar);
  }

  // ---------- 5) Gölge, arzu ve dönüşüm ----------
  function golge(k, adlar) {
    const pluton = tekil(k.temaslar.filter((t) => t.tur === 'pluton'), (t) => `${t.kim}-${t.q}`).slice(0, 2);
    const karaAy = tekil(k.temaslar.filter((t) => t.tur === 'karaAy'), (t) => `${t.kim}-${t.p}`).slice(0, 2);
    const ozel = [
      ...pluton.map((t) => temasMetni(M.pluton[t.q][UYUMLU.includes(t.aci.id) ? 'u' : 'g'], t, adlar)),
      ...karaAy.map((t) => temasMetni(M.karaAy[t.p], t, adlar)),
    ];
    return kart('golge', M.girisler.golge, ozel.length ? ozel : [M.golgeYok], adlar);
  }

  // ---------- 6) Kader kapıları ve kısmetler ----------
  function kader(k, adlar) {
    const secilen = tekil(k.temaslar.filter((t) => t.tur === 'kismet'), (t) => `${t.digeri}-${t.kismet}`).slice(0, 3);
    // Aynı kısmet iki yönlü de dokunuyorsa anlamı tekrarlanmaz, karşılıklılık vurgulanır
    const anlatilan = new Set();
    const ozel = secilen.map((t) => {
      const kalip = anlatilan.has(t.kismet) ? M.kismetKarsilikli.replace('{nokta}', M.kismetNoktasi[t.kismet]) : M.kismet[t.kismet];
      anlatilan.add(t.kismet);
      return temasMetni(kalip.replace('{verici}', M.kismetVerici[t.p]), t, adlar);
    });
    return kart('kader', M.girisler.kader, ozel.length ? ozel : [M.kaderYok], adlar);
  }

  // ---------- 7) Vedik bakış ----------
  function vedik(v, adlar) {
    const [v1, v2] = v.haritalar;
    const n1 = v1.noktalar.ay.nakshatra;
    const n2 = v2.noktalar.ay.nakshatra;
    const kuta = v.kuta;
    const puan = (id) => kuta.kutalar.find((x) => x.id === id).puan;
    const toplam = kuta.toplam;
    const bant = toplam >= 28 ? 0 : toplam >= 24 ? 1 : toplam >= 18 ? 2 : 3;
    const notlar = [
      kuta.nadiDosa ? M.kuta.nadiDosa : M.kuta.nadiIyi,
      kuta.bhakutDosa && M.kuta.bhakutDosa,
      puan('yoni') >= 3 ? M.kuta.yoniYuksek : puan('yoni') <= 1 && M.kuta.yoniDusuk,
      puan('gana') >= 5 ? M.kuta.ganaUyumlu : puan('gana') <= 1 && M.kuta.ganaUyumsuz,
      puan('maitri') >= 4 && M.kuta.maitriYuksek,
    ].filter(Boolean).slice(0, 3);

    let mangal = '';
    if (v.mangal.var[0] && v.mangal.var[1]) mangal = M.mangal.ikisi;
    else if (v.mangal.var[0] || v.mangal.var[1]) mangal = S.yorumDoldur(M.mangal.biri, { N: adlar[v.mangal.var[0] ? 0 : 1] });

    const jaimini = tekil(v.jaimini, (j) => j.tur).slice(0, 2).map((j) => temasMetni(M.jaimini[j.tur], j, adlar));

    const ozel = [
      birlestir(S.yorumDoldur(M.nakshatra[n1], { N: adlar[0] }), n1 === n2 && M.ayniNakshatra),
      n1 === n2 ? '' : S.yorumDoldur(M.nakshatra[n2], { N: adlar[1] }),
      M.gunaBant[bant].replace('{puan}', String(toplam).replace('.', ',')),
      birlestir(...notlar),
      mangal,
      ...jaimini,
    ];
    return kart('vedik', M.girisler.vedik, ozel, adlar);
  }

  // karmik: S.karmikAnaliz çıktısı; vedikSonuc: S.vedikAnaliz çıktısı; kisiler: [{ ad }]
  function karmaYorumu(karmik, vedikSonuc, kisiler) {
    const adlar = { 0: kisiler[0].ad, 1: kisiler[1].ad };
    return {
      tanisiklik: karmik.tanisiklik,
      guna: vedikSonuc.kuta.toplam,
      basliklar: [
        tanisiklik(karmik, adlar),
        gecmis(karmik, adlar),
        amac(karmik, adlar),
        sozlesme(karmik, adlar),
        golge(karmik, adlar),
        kader(karmik, adlar),
        vedik(vedikSonuc, adlar),
      ],
    };
  }

  S.karmaYorumu = karmaYorumu;
})();
