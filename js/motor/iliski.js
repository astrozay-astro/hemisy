// İlişki haritaları.
//  Kompozit: her noktanın iki haritadaki konumunun yakın orta noktası. MC de orta noktadır; Yükselen ve ev girişleri
//            bu kompozit MC'den, iki doğum yerinin orta enlemine göre Placidus ile türetilir.
//  Davison:  iki doğum anının (UTC) tam ortası ve iki doğum yerinin orta noktası için hesaplanan gerçek bir harita.
(() => {
  'use strict';

  const S = window.Astroship;
  const { norm, burcIndeksi, BURCLAR } = S;
  const RAD = Math.PI / 180;

  // Yakın orta nokta: 350° ile 20°'nin ortası 185° değil 5°'dir
  function ortaNokta(a, b) {
    const d = norm(b - a);
    return d <= 180 ? norm(a + d / 2) : norm(b + (360 - d) / 2);
  }

  function kompozitHesapla(h1, h2) {
    const e = (h1.egiklik + h2.egiklik) / 2;
    const enlem = (h1.enlem + h2.enlem) / 2;
    const mc = ortaNokta(h1.gezegenler.mc.boylam, h2.gezegenler.mc.boylam);
    const ramc = norm(Math.atan2(Math.sin(mc * RAD) * Math.cos(e * RAD), Math.cos(mc * RAD)) / RAD);
    const { asc, evler, sistem } = S.evGirisleri(ramc, e, enlem);

    const gezegenler = {};
    for (const anahtar of Object.keys(h1.gezegenler)) {
      if (anahtar === 'yukselen' || anahtar === 'mc') continue;
      gezegenler[anahtar] = S.noktaOlustur(anahtar, ortaNokta(h1.gezegenler[anahtar].boylam, h2.gezegenler[anahtar].boylam), evler);
    }
    gezegenler.yukselen = S.noktaOlustur('yukselen', asc, evler);
    gezegenler.mc = S.noktaOlustur('mc', mc, evler);
    return { enlem, egiklik: e, evler, evSistemi: sistem, gezegenler };
  }

  function davisonHesapla(h1, h2) {
    const an = new Date((h1.utc.getTime() + h2.utc.getTime()) / 2);
    const enlem = (h1.enlem + h2.enlem) / 2;
    let fark = h2.boylam - h1.boylam;
    if (fark > 180) fark -= 360;
    if (fark < -180) fark += 360;
    let boylam = h1.boylam + fark / 2;
    if (boylam > 180) boylam -= 360;
    if (boylam < -180) boylam += 360;
    return S.haritaHesapla(an, enlem, boylam);
  }

  // Bir gezegenin yönettiği evler (geleneksel yöneticilik; modern eş yönetici için esYonetici: true).
  // Girişi (kuspu) gezegenin burcunda olan evler "giriş", ev içinde sıkışmış burçlar "sıkışmış" olarak döner.
  function yonettigiEvler(harita, gezegen, { esYonetici = false } = {}) {
    const yonetirMi = (i) => (esYonetici ? BURCLAR[i].esYonetici : BURCLAR[i].yonetici) === gezegen;
    const kusBurclari = harita.evler.map((k) => burcIndeksi(k));
    const sonuc = [];
    kusBurclari.forEach((b, i) => { if (yonetirMi(b)) sonuc.push({ ev: i + 1, burc: BURCLAR[b], tur: 'giriş' }); });
    for (let b = 0; b < 12; b++) {
      if (!yonetirMi(b) || kusBurclari.includes(b)) continue;
      sonuc.push({ ev: S.evBul(b * 30 + 15, harita.evler), burc: BURCLAR[b], tur: 'sıkışmış' });
    }
    return sonuc;
  }

  Object.assign(S, { ortaNokta, kompozitHesapla, davisonHesapla, yonettigiEvler });
})();
