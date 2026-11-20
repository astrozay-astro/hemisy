// Burç yorumlarını kurar: günlük, haftalık ve aylık. Gerçek gökyüzü hesabına dayanır (js/motor/gokyuzu.js).
// Evler burcun kendisinden sayılır (burç yorumcularının yöntemi): gezegen hangi burçtaysa o burcun, yorumlanan
// burçtan sayılan evi.
//  Günlük: Ay'ın evi ve gün içindeki burç geçişi, Ay'ın açıları, sırayla aşk / iş / enerji, yeniay ya da dolunay
//  Haftalık: Güneş'in evi (dönemin teması), Ay'ın haftalık akışı, yeniay ve dolunay, Venüs, Merkür, Mars
//  Aylık: Güneş, yeniay ve dolunay (tutulmalar), Venüs, Merkür, Mars, Jüpiter ve Satürn, Tuğçenur Özay'ın notu
// Her dönemin sonunda önemli günler listesi: burç geçişleri, retro ve düz duruşlar, ay evreleri, tutulmalar, tam açılar.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_BURC_METINLERI;
  const T = window.ASTROSHIP_TEMEL;
  const G = S.gokyuzu;
  const B = S.BURCLAR;

  const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const GUNLER = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  const SLUG = ['koc', 'boga', 'ikizler', 'yengec', 'aslan', 'basak', 'terazi', 'akrep', 'yay', 'oglak', 'kova', 'balik'];
  const UYUMLU = ['altmislik', 'ucgen'];

  const birlestir = (...p) => p.filter(Boolean).join(' ');
  const buyukBasla = (s) => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1);
  const kucukBasla = (s) => s.charAt(0).toLocaleLowerCase('tr') + s.slice(1);
  const sec = (liste, n) => liste[((n % liste.length) + liste.length) % liste.length];
  const ad = (anahtar) => S.NOKTALAR[anahtar].ad;
  const aciTuru = (aci) => (aci === 'kavusum' ? 'k' : UYUMLU.includes(aci) ? 'u' : 'g');
  // Gökteki burç, yorumlanan burçtan sayıldığında kaçıncı ev
  const ev = (burc, gokBurc) => ((gokBurc - burc + 12) % 12) + 1;
  const tarihYaz = (t) => { const p = G.trParcalar(t); return `${p.gun} ${AYLAR[p.ay]}`; };
  const alanli = (metin, alan) => metin.replace('{alan}', alan).replace('{Alan}', buyukBasla(alan));

  // Dönemin başlangıç ve bitişi (Türkiye saati): günlük o gün, haftalık pazartesiden pazartesiye, aylık ayın başından sonuna
  function aralik(donem, tarih = new Date()) {
    const p = G.trParcalar(tarih);
    if (donem === 'gunluk') { const bas = G.gunBasi(p.yil, p.ay, p.gun); return { bas, son: new Date(+bas + G.GUN) }; }
    if (donem === 'haftalik') { const bas = G.gunBasi(p.yil, p.ay, p.gun - p.haftaGunu); return { bas, son: new Date(+bas + 7 * G.GUN) }; }
    return { bas: G.gunBasi(p.yil, p.ay, 1), son: G.gunBasi(p.yil, p.ay + 1, 1) };
  }

  function tarihMetni(donem, { bas, son }) {
    const a = G.trParcalar(bas);
    const b = G.trParcalar(new Date(+son - 1));
    if (donem === 'gunluk') return `${a.gun} ${AYLAR[a.ay]} ${a.yil}, ${GUNLER[a.haftaGunu]}`;
    if (donem === 'aylik') return `${AYLAR[a.ay]} ${a.yil}`;
    return a.ay === b.ay ? `${a.gun}–${b.gun} ${AYLAR[a.ay]} ${a.yil}` : `${a.gun} ${AYLAR[a.ay]} – ${b.gun} ${AYLAR[b.ay]} ${b.yil}`;
  }

  // Bir gezegenin dönem içindeki anlatımı: başlangıçtaki evi, retro durumu, burç geçişleri ve duruşları
  function gezegenAnlatimi(burc, anahtar, metinler, o) {
    const bas = o.basKonum[anahtar];
    const duruslar = o.retrolar.filter((r) => r.anahtar === anahtar);
    const parcalar = [metinler[ev(burc, bas.burc) - 1]];
    if (bas.geri && !duruslar.length) parcalar.push(alanli(M.retro[anahtar].geri, T.evKisa[ev(burc, bas.burc) - 1]));
    const olaylar = [
      ...o.gecisler.filter((g) => g.anahtar === anahtar).map((g) => ({ tarih: g.tarih, metin: `${tarihYaz(g.tarih)} itibarıyla ${kucukBasla(metinler[ev(burc, g.burc) - 1].replace(/^Bu dönem /, ''))}` })),
      ...duruslar.map((d) => ({ tarih: d.tarih, metin: `${tarihYaz(d.tarih)}: ${alanli(M.retro[anahtar][d.tur], T.evKisa[ev(burc, d.burc) - 1])}` })),
    ].sort((x, y) => x.tarih - y.tarih);
    return birlestir(...parcalar, ...olaylar.map((x) => x.metin));
  }

  // Yeniay ve dolunay (ve varsa tutulma) anlatımı
  function evreAnlatimi(burc, o) {
    return birlestir(...o.evreler.filter((e) => e.tur === 0 || e.tur === 2).map((e) => {
      const tutulma = o.tutulmalar.find((t) => Math.abs(t.tarih - e.tarih) < G.GUN);
      const kalip = e.tur === 0 ? M.yeniayKalip : M.dolunayKalip;
      const metin = (e.tur === 0 ? M.yeniayEv : M.dolunayEv)[ev(burc, e.burc) - 1];
      return birlestir(kalip.replace('{tarih}', tarihYaz(e.tarih)).replace('{metin}', metin), tutulma && M.tutulma[tutulma.tur]);
    }));
  }

  // Önemli günler: gökyüzü olayları tarih sırasıyla
  function onemliGunler(o, { ayDahil = false } = {}) {
    const satir = (tarih, metin) => ({ tarih, gun: tarihYaz(tarih), saat: G.saatYaz(tarih), metin });
    const gecisler = [...o.gecisler, ...(ayDahil ? o.ayGecisleri : [])];
    return [
      ...gecisler.map((g) => satir(g.tarih, M.olay.gecis.replace('{Gezegen}', ad(g.anahtar)).replace('{Burc}', B[g.burc].ad))),
      ...o.retrolar.map((r) => satir(r.tarih, M.olay[r.tur].replace('{Gezegen}', ad(r.anahtar)))),
      ...o.evreler.map((e) => {
        const tutulma = o.tutulmalar.find((t) => Math.abs(t.tarih - e.tarih) < G.GUN);
        const kalip = tutulma ? M.olay.tutulma[tutulma.tur] : M.olay.evreKalip.replace('{Evre}', M.olay.evre[e.tur]);
        return satir(e.tarih, kalip.replace('{Burc}', B[e.burc].ad));
      }),
      ...o.acilar.map((a) => satir(a.tarih, `${M.olay.aci.replace('{A}', ad(a.a)).replace('{B}', ad(a.b)).replace('{aci}', M.olay.aciAdlari[a.aci])}: ${M.aci[aciTuru(a.aci)].replace('{tema}', buyukBasla(T.tema(a.a, a.b)))}`)),
    ].sort((x, y) => x.tarih - y.tarih);
  }

  function gunluk(burc, o) {
    const gunNo = Math.floor(+o.bas / G.GUN);
    const ayEv = ev(burc, o.basKonum.ay.burc);
    const gecis = o.ayGecisleri[0];
    const hava = birlestir(
      sec(M.ayEv[ayEv - 1], gunNo),
      gecis && M.ayGecis.replace('{saat}', G.saatYaz(gecis.tarih)).replace('{konu}', M.ayKisa[ev(burc, gecis.burc) - 1]),
    );
    const ayAcilari = [...o.ayAcilari].sort((x, y) => x.tarih - y.tarih).slice(0, 2).map((a) => {
      const saat = G.trParcalar(a.tarih).saat;
      return M.ayAci[aciTuru(a.aci)].replace('{Zaman}', M.zamanlar[Math.min(3, Math.floor(saat / 6))]).replace('{tema}', T.tema('ay', a.b));
    });
    // Gün gün sırayla aşk, iş ve iletişim, enerji
    const alan = [['ask', 'venus', M.venusEv], ['is', 'merkur', M.merkurEv], ['enerji', 'mars', M.marsEv]][gunNo % 3];
    return [
      { baslik: M.basliklar.hava, metin: hava },
      { metin: birlestir(...ayAcilari) },
      { baslik: M.basliklar[alan[0]], metin: gezegenAnlatimi(burc, alan[1], alan[2], o) },
      { baslik: M.basliklar.evre, metin: evreAnlatimi(burc, o) },
    ];
  }

  function ayAkisi(burc, o) {
    const parcalar = [M.ayAkisBasi.replace('{konu}', M.ayKisa[ev(burc, o.basKonum.ay.burc) - 1])];
    for (const g of o.ayGecisleri) {
      const p = G.trParcalar(g.tarih);
      parcalar.push(M.ayAkisGecis.replace('{Gun}', GUNLER[p.haftaGunu]).replace('{konu}', M.ayKisa[ev(burc, g.burc) - 1]));
    }
    return birlestir(...parcalar);
  }

  function haftalik(burc, o) {
    return [
      { baslik: M.basliklar.tema, metin: gezegenAnlatimi(burc, 'gunes', M.gunesEv, o) },
      { baslik: M.basliklar.ay, metin: ayAkisi(burc, o) },
      { baslik: M.basliklar.evre, metin: evreAnlatimi(burc, o) },
      { baslik: M.basliklar.ask, metin: gezegenAnlatimi(burc, 'venus', M.venusEv, o) },
      { baslik: M.basliklar.is, metin: gezegenAnlatimi(burc, 'merkur', M.merkurEv, o) },
      { baslik: M.basliklar.enerji, metin: gezegenAnlatimi(burc, 'mars', M.marsEv, o) },
    ];
  }

  function aylik(burc, o) {
    const p = G.trParcalar(o.bas);
    const not = window.ASTROSHIP_BURC_NOTLARI?.[`${p.yil}-${String(p.ay + 1).padStart(2, '0')}`]?.[SLUG[burc]];
    return [
      { baslik: M.basliklar.tema, metin: gezegenAnlatimi(burc, 'gunes', M.gunesEv, o) },
      { baslik: M.basliklar.evre, metin: evreAnlatimi(burc, o) },
      { baslik: M.basliklar.ask, metin: gezegenAnlatimi(burc, 'venus', M.venusEv, o) },
      { baslik: M.basliklar.is, metin: gezegenAnlatimi(burc, 'merkur', M.merkurEv, o) },
      { baslik: M.basliklar.enerji, metin: gezegenAnlatimi(burc, 'mars', M.marsEv, o) },
      { baslik: M.basliklar.uzun, metin: birlestir(gezegenAnlatimi(burc, 'jupiter', M.jupiterEv, o), gezegenAnlatimi(burc, 'saturn', M.saturnEv, o)) },
      not && { baslik: M.basliklar.not, metin: not },
    ];
  }

  // Bir dönemin gökyüzü olayları bir kez hesaplanır, on iki burç için ayrı ayrı yorumlanır
  function donemOlaylari(donem, tarih = new Date()) {
    const a = aralik(donem, tarih);
    return { donem, tarihMetni: tarihMetni(donem, a), olaylar: G.olaylar(a.bas, a.son, { ayDahil: donem !== 'aylik' }) };
  }

  function burcYorumu(burc, donemOlay) {
    const { donem, olaylar: o } = donemOlay;
    const kur = { gunluk, haftalik, aylik }[donem];
    return {
      burc,
      slug: SLUG[burc],
      donem,
      baslik: `${B[burc].ad} Burcu ${M.donemler[donem].baslik}`,
      tarihMetni: donemOlay.tarihMetni,
      paragraflar: kur(burc, o).filter((x) => x && x.metin),
      onemli: onemliGunler(o, { ayDahil: donem === 'gunluk' }),
    };
  }

  Object.assign(S, { burcYorumu, burcDonemOlaylari: donemOlaylari, BURC_SLUG: SLUG, BURC_AYLAR: AYLAR, BURC_GUNLER: GUNLER });
})();
