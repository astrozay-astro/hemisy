// Karmik bağ yorumlarını kurar (yedi başlık). Anlatım bir hikâye gibi ilerler:
//  1) Geçmişte nereden tanışıyorsunuz: en güçlü geçmiş izinden bir rol seçilir (anne–çocuk, sevgililer, yoldaşlar …)
//     Kaynaklar: Güney Ay Düğümü temasları, drakonik sinastri, drakonik × drakonik, Satürn ve Plüton kavuşumları.
//     Rolü taşıyan kişi gezegenin sahibidir. O hayatın ortamı, hatırlayan kişinin Güney Düğüm burcundan okunur.
//  2) O hayattan taşıdıklarınız: rolün bugünkü izi ve iki kişinin Güney Düğüm burcu (ustalık ve alışkanlık)
//  3) Bu hayatta neden bir araya geldiniz: rolün dersi, drakonik Davison (Güneş, Ay, Yükselen), Kuzey Düğüm ve Vertex
//  4) Karmik sözleşme: Satürn   5) Gölge: Plüton ve Kara Ay   6) Kısmetler   7) Vedik: nakşatra, Aştakuta, Mangal, Jaimini
// Tanıtım: giriş ve ilk özel cümle ücretsiz görünür, gerisi tam rapordadır.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_KARMA_METINLERI;
  const UYUMLU = ['altmislik', 'ucgen'];

  const kucukBasla = (s) => s.charAt(0).toLocaleLowerCase('tr') + s.slice(1);
  const birlestir = (...parcalar) => parcalar.filter(Boolean).join(' ');
  const cumleler = (p) => p.match(/[^.!?]+[.!?]+["”]?/g) || [p];

  // ozel: hazır (adları doldurulmuş) paragraflar. Bir isimle ya da kendi geçişiyle başlayan paragrafa bağlaç eklenmez.
  function kart(id, giris, ozel, adlar) {
    const paragraflar = ozel.filter(Boolean);
    const bagli = paragraflar.map((p, i) => {
      if (!i || p.startsWith('Başka bir yaşamda')) return p;
      const isimle = [adlar[0], adlar[1]].some((a) => p.startsWith(a));
      return `${M.baglaclar[(i - 1) % M.baglaclar.length]} ${isimle ? p : kucukBasla(p)}`;
    });
    const ilk = bagli.length ? cumleler(bagli[0]) : [];
    return {
      id,
      ...M.basliklar[id],
      ucretsiz: [birlestir(giris, ilk[0]?.trim())],
      ucretli: [ilk.slice(1).join('').trim(), ...bagli.slice(1)].filter(Boolean),
    };
  }

  // Aynı türde aynı noktanın iki kez anlatılmaması için
  function tekil(liste, anahtar) {
    const gorulen = new Set();
    return liste.filter((t) => {
      const k = anahtar(t);
      if (gorulen.has(k)) return false;
      gorulen.add(k);
      return true;
    });
  }

  // X ve Y yer tutucularını kişilere göre doldurur (X = sahip, Y = diğeri)
  const doldur = (metin, x, y, adlar) => S.yorumDoldur(metin, { X: adlar[x], Y: adlar[y] });

  // ---------- Geçmiş yaşam rolleri ----------
  // Her aday: { rol, sahip, hatirlayan, kaynak, agirlik }
  function rolAdaylari(temaslar) {
    const adaylar = [];
    for (const t of temaslar) {
      if (t.tur === 'guneyDugum' && M.roller[t.p]) {
        adaylar.push({ rol: t.p, sahip: t.kim, hatirlayan: t.digeri, kaynak: 'guney', agirlik: t.agirlik * 1.3 });
      } else if (t.tur === 'drakonik' || t.tur === 'drakonikCift') {
        // Rolü ruhun (drakonik) noktası belirler: t.kim'in ruhu, t.digeri için o gezegenin rolünü oynamıştır
        adaylar.push({ rol: t.p, sahip: t.kim, hatirlayan: t.digeri, kaynak: 'drakonik', agirlik: t.agirlik });
      } else if (t.tur === 'saturn' && t.aci.id === 'kavusum') {
        adaylar.push({ rol: 'saturn', sahip: t.kim, hatirlayan: t.digeri, kaynak: null, agirlik: t.agirlik * 0.8 });
      } else if (t.tur === 'pluton' && (t.aci.id === 'kavusum' || t.aci.id === 'karsit')) {
        adaylar.push({ rol: 'pluton', sahip: t.kim, hatirlayan: t.digeri, kaynak: null, agirlik: t.agirlik * 0.8 });
      }
    }
    adaylar.sort((a, b) => b.agirlik - a.agirlik);
    return tekil(adaylar.filter((a) => M.roller[a.rol]), (a) => a.rol).slice(0, 2);
  }

  // ---------- 1) Geçmişte nereden tanışıyorsunuz ----------
  function gecmis(k, roller, adlar) {
    const bant = k.tanisiklik >= 65 ? 0 : k.tanisiklik >= 45 ? 1 : 2;
    const [ilk, ikinci] = roller;
    if (!ilk) return kart('gecmis', M.girisler.gecmis, [M.gecmisYok], adlar);
    const R = M.roller[ilk.rol];
    const sahne = M.sahneKalip.replace('{sahne}', M.sahne[k.ruh[ilk.hatirlayan].guneyDugum.indeks]);
    const ozel = [
      birlestir(`Geçmiş bir yaşamda ${doldur(R.tanisma, ilk.sahip, ilk.hatirlayan, adlar)}`, doldur(R.dinamik, ilk.sahip, ilk.hatirlayan, adlar), M.kaynak[ilk.kaynak], sahne),
      ikinci && birlestir(`Başka bir yaşamda ise ${doldur(M.roller[ikinci.rol].tanisma, ikinci.sahip, ikinci.hatirlayan, adlar)}`, doldur(M.roller[ikinci.rol].dinamik, ikinci.sahip, ikinci.hatirlayan, adlar)),
      M.tanisiklikBant[bant],
    ];
    return kart('gecmis', M.girisler.gecmis, ozel, adlar);
  }

  // ---------- 2) O hayattan bu hayata taşıdıklarınız ----------
  function tasinan(k, roller, adlar) {
    const burclar = k.ruh.map((r) => r.guneyDugum.indeks);
    const ozel = [
      ...roller.map((r) => doldur(M.roller[r.rol].iz, r.sahip, r.hatirlayan, adlar)),
      birlestir(
        S.yorumDoldur(M.guneyBurc[burclar[0]], { N: adlar[0] }),
        S.yorumDoldur(M.guneyBurc[burclar[1]], { N: adlar[1] }),
        burclar[0] === burclar[1] && M.guneyIkisiAyni,
      ),
    ];
    return kart('tasinan', M.girisler.tasinan, ozel, adlar);
  }

  // ---------- 3) Bu hayatta neden bir araya geldiniz ----------
  function neden(k, roller, adlar) {
    const g = k.drakonikDavison.gezegenler;
    const kuzey = tekil(k.temaslar.filter((t) => t.tur === 'kuzeyDugum' && M.kuzeyDugum[t.p]), (t) => `${t.kim}-${t.p}`).slice(0, 2);
    const vertex = k.temaslar.find((t) => t.tur === 'vertex' && M.vertex[t.p]);
    const ozel = [
      roller[0] && doldur(M.roller[roller[0].rol].ders, roller[0].sahip, roller[0].hatirlayan, adlar),
      birlestir(M.amacGunes[g.gunes.indeks], M.amacAy[g.ay.indeks], M.amacYukselen[g.yukselen.indeks]),
      ...kuzey.map((t) => doldur(M.kuzeyDugum[t.p], t.kim, t.digeri, adlar)),
      vertex && doldur(birlestir(M.vertexGiris, M.vertex[vertex.p]), vertex.kim, vertex.digeri, adlar),
    ];
    return kart('neden', M.girisler.neden, ozel, adlar);
  }

  // ---------- 4) Karmik sözleşme ----------
  function sozlesme(k, adlar) {
    const secilen = tekil(k.temaslar.filter((t) => t.tur === 'saturn'), (t) => `${t.kim}-${t.q}`).slice(0, 3);
    const ozel = secilen.length
      ? secilen.map((t) => doldur(M.saturn[t.q][UYUMLU.includes(t.aci.id) ? 'u' : 'g'], t.kim, t.digeri, adlar))
      : [M.saturnYok];
    return kart('sozlesme', M.girisler.sozlesme, ozel, adlar);
  }

  // ---------- 5) Gölge, arzu ve dönüşüm ----------
  function golge(k, adlar) {
    const pluton = tekil(k.temaslar.filter((t) => t.tur === 'pluton'), (t) => `${t.kim}-${t.q}`).slice(0, 2);
    const karaAy = tekil(k.temaslar.filter((t) => t.tur === 'karaAy'), (t) => `${t.kim}-${t.p}`).slice(0, 2);
    const ozel = [
      ...pluton.map((t) => doldur(M.pluton[t.q][UYUMLU.includes(t.aci.id) ? 'u' : 'g'], t.kim, t.digeri, adlar)),
      ...karaAy.map((t) => doldur(M.karaAy[t.p], t.kim, t.digeri, adlar)),
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
      return doldur(kalip.replace('{verici}', M.kismetVerici[t.p]), t.kim, t.digeri, adlar);
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

    const jaimini = tekil(v.jaimini, (j) => j.tur).slice(0, 2).map((j) => doldur(M.jaimini[j.tur], j.kim, j.digeri, adlar));

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
    const roller = rolAdaylari(karmik.temaslar);
    return {
      tanisiklik: karmik.tanisiklik,
      guna: vedikSonuc.kuta.toplam,
      roller,
      basliklar: [
        gecmis(karmik, roller, adlar),
        tasinan(karmik, roller, adlar),
        neden(karmik, roller, adlar),
        sozlesme(karmik, adlar),
        golge(karmik, adlar),
        kader(karmik, adlar),
        vedik(vedikSonuc, adlar),
      ],
    };
  }

  S.karmaYorumu = karmaYorumu;
})();
