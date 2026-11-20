// Burç yorumu sayfalarını üretir: Google'ın okuyabileceği, her biri kendi adresinde duran statik sayfalar.
// GitHub Actions her gece Türkiye saatiyle 00:05'te çalıştırır (.github/workflows/burc-yorumlari.yml).
// Elle çalıştırmak için depo kökünde:  node araclar/burc-uret.js            (bugünün yorumları)
//                                       TARIH=2026-12-01 node araclar/burc-uret.js   (belirli bir gün)
// Üretilenler:
//   burc/index.html                       12 burcun listesi
//   burc/<burç>/<gunluk|haftalik|aylik>/index.html
//   sitemap.xml, robots.txt
// Yorumlar sitenin kendi motoruyla (js/motor, js/yorum) hesaplanır: index.html'deki betikler Node içinde yüklenir.
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KOK = path.join(__dirname, '..');
const SITE = 'https://www.hemisy.com';
const DONEMLER = ['gunluk', 'haftalik', 'aylik'];

// ---------- Sitenin betiklerini yükle ----------
const ctx = { console, Intl, Date, Math };
ctx.window = ctx;
ctx.globalThis = ctx;
vm.createContext(ctx);
const html = fs.readFileSync(path.join(KOK, 'index.html'), 'utf8');
for (const [, dosya] of html.matchAll(/<script src="([^"]+)"/g)) {
  if (dosya.includes('app.js') || dosya.includes('sehirler') || dosya.includes('konum.js')) continue;
  vm.runInContext(fs.readFileSync(path.join(KOK, dosya), 'utf8'), ctx, { filename: dosya });
}
const S = ctx.Astroship;
const M = ctx.ASTROSHIP_BURC_METINLERI;
const G = S.gokyuzu;
const B = S.BURCLAR;

const tarih = process.env.TARIH ? new Date(`${process.env.TARIH}T09:00:00Z`) : new Date();
const kac = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const glif = (s) => `<span class="g">${s}︎</span>`;

// ---------- Ortak sayfa parçaları ----------
function sayfa({ onEk, baslik, aciklama, adres, govde }) {
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${kac(baslik)}</title>
  <meta name="description" content="${kac(aciklama)}">
  <link rel="canonical" href="${SITE}${adres}">
  <meta property="og:title" content="${kac(baslik)}">
  <meta property="og:description" content="${kac(aciklama)}">
  <meta property="og:url" content="${SITE}${adres}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="tr_TR">
  <meta name="theme-color" content="#f5f4fc">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols&family=Noto+Sans+Symbols+2&text=☉☽☿♀♂♃♄♅♆♇☊☋☌☍□△⚹⚻⚸⚭⊗⊙℞♈♉♊♋♌♍♎♏♐♑♒♓&display=swap">
  <link rel="stylesheet" href="${onEk}css/style.css">
</head>
<body>
  <main id="uygulama">
    <section class="ekran burc-sayfasi">
      <header class="ust-cubuk">
        <div class="logo-grubu"><a href="${onEk}index.html" class="logo-baglanti" aria-label="hēmisy ana sayfa"><img class="logo" src="${onEk}marka/hemisy-isim.png" alt="hēmisy" width="608" height="224"></a><span class="imza">by Tuğçenur Özay</span></div>
      </header>
${govde}
      <footer class="alt-bilgi">
        <img class="alt-logo" src="${onEk}marka/hemisy-isim.png" alt="hēmisy" width="608" height="224">
        <div class="iletisim">
          <a href="${SITE}">www.hemisy.com</a>
          <a href="mailto:info@hemisy.com">info@hemisy.com</a>
        </div>
        <div class="sosyal">
          <a href="https://www.instagram.com/astrologtugcenurozay" target="_blank" rel="noopener"><span>Instagram @astrologtugcenurozay</span></a>
          <a href="https://x.com/astrozay_" target="_blank" rel="noopener"><span>X @astrozay_</span></a>
        </div>
        <p>hēmisy eğlence amaçlıdır. Önemli kararlarınızı yalnızca bu yorumlara dayandırmayın.</p>
        <p class="telif">© ${G.trParcalar(tarih).yil} hēmisy · by Tuğçenur Özay</p>
      </footer>
    </section>
  </main>
</body>
</html>
`;
}

// Eş potansiyeli ve çift analizine yönlendiren kartlar
const yonlendirme = (onEk) => `
      <section class="burc-yonlendirme">
        <a class="burc-yonlendirme-kart" href="${onEk}index.html#birey">
          <span class="amblem" aria-hidden="true">${glif('☉')}</span>
          <span><b>Eş potansiyelinizi keşfedin</b><small>Hayatınıza nasıl bir eş girebilir, eşinizle nerede tanışabilirsiniz?</small></span>
        </a>
        <a class="burc-yonlendirme-kart" href="${onEk}index.html#cift">
          <span class="amblem" aria-hidden="true">${glif('☌')}</span>
          <span><b>Çift uyumunuza bakın</b><small>İki doğum haritasından çekim, bağlanma, iletişim ve güven.</small></span>
        </a>
      </section>`;

// ---------- Burç yorumu sayfası ----------
function yorumSayfasi(y) {
  const onEk = '../../../';
  const adres = `/burc/${y.slug}/${y.donem}/`;
  const donemSekmeleri = DONEMLER.map((d) => `<a href="../${d}/index.html"${d === y.donem ? ' aria-current="page"' : ''}>${M.donemler[d].ad}</a>`).join('');
  const burcSecimi = B.map((b, i) => `<a href="../../${S.BURC_SLUG[i]}/${y.donem}/index.html"${i === y.burc ? ' aria-current="page"' : ''} aria-label="${b.ad}">${glif(b.glif)}<span>${b.ad}</span></a>`).join('');
  const paragraflar = y.paragraflar.map((p) => `${p.baslik ? `<h2>${kac(p.baslik)}</h2>` : ''}<p>${kac(p.metin)}</p>`).join('\n          ');
  const onemli = y.onemli.length ? `
        <section class="onemli-gunler yuzey">
          <h2>Gökyüzünde ${y.donem === 'gunluk' ? 'bugün' : y.donem === 'haftalik' ? 'bu hafta' : 'bu ay'}</h2>
          <ol>
            ${y.onemli.map((o) => `<li><time>${kac(o.gun)} · ${kac(o.saat)}</time><span>${kac(o.metin)}</span></li>`).join('\n            ')}
          </ol>
        </section>` : '';
  const ilk = y.paragraflar[0]?.metin || '';
  const aciklama = `${y.baslik}, ${y.tarihMetni}: ${ilk}`.slice(0, 158).replace(/\s+\S*$/, '') + '…';
  const govde = `
      <a class="geri" href="${onEk}index.html">← Ana sayfa</a>
      <header class="gece sonuc-bas burc-bas">
        <span class="burc-bas-glif" aria-hidden="true">${glif(B[y.burc].glif)}</span>
        <p class="etiket">${kac(M.donemler[y.donem].etiket)}</p>
        <h1>${kac(y.baslik)}</h1>
        <p class="cift-bilgi">${kac(y.tarihMetni)} · ${kac(M.burcTarihleri[y.burc])}</p>
      </header>
      <nav class="burc-donemleri alt-sekmeler" aria-label="Dönem">${donemSekmeleri}</nav>
      <article class="burc-yorum yuzey">
        <div class="yorum">
          ${paragraflar}
        </div>
      </article>${onemli}
      <p class="uyari">${kac(M.yukselenNotu)}</p>
      <nav class="burc-secimi" aria-label="Diğer burçlar">${burcSecimi}</nav>${yonlendirme(onEk)}`;
  return sayfa({ onEk, baslik: `${y.baslik} · ${y.tarihMetni} | hēmisy`, aciklama, adres, govde });
}

// ---------- Burçlar ana sayfası ----------
function burclarSayfasi(gunluk) {
  const onEk = '../';
  const karolar = B.map((b, i) => `
          <article class="burc-ozet yuzey">
            <a class="burc-ozet-bas" href="${S.BURC_SLUG[i]}/gunluk/index.html">${glif(b.glif)}<span><b>${b.ad}</b><small>${M.burcTarihleri[i]}</small></span></a>
            <p>${kac(gunluk[i].paragraflar[0].metin)}</p>
            <nav class="burc-ozet-donem">${DONEMLER.map((d) => `<a href="${S.BURC_SLUG[i]}/${d}/index.html">${M.donemler[d].ad}</a>`).join('')}</nav>
          </article>`).join('');
  const govde = `
      <a class="geri" href="${onEk}index.html">← Ana sayfa</a>
      <header class="gece sonuc-bas burc-bas">
        <p class="etiket">Burç yorumları</p>
        <h1>Günlük, haftalık ve aylık burç yorumları</h1>
        <p class="cift-bilgi">${kac(gunluk[0].tarihMetni)}</p>
      </header>
      <div class="burc-ozetler">${karolar}
      </div>${yonlendirme(onEk)}`;
  return sayfa({ onEk, baslik: 'Burç Yorumları: Günlük, Haftalık ve Aylık | hēmisy', aciklama: 'Tuğçenur Özay imzasıyla, gerçek gökyüzü hareketlerine dayanan günlük, haftalık ve aylık burç yorumları.', adres: '/burc/', govde });
}

// ---------- Üret ----------
const yaz = (goreli, icerik) => {
  const tam = path.join(KOK, goreli);
  fs.mkdirSync(path.dirname(tam), { recursive: true });
  fs.writeFileSync(tam, icerik);
};

const baslangic = Date.now();
const gunlukler = [];
const adresler = ['/', '/burc/'];
for (const donem of DONEMLER) {
  const olay = S.burcDonemOlaylari(donem, tarih);
  for (let b = 0; b < 12; b++) {
    const y = S.burcYorumu(b, olay);
    if (donem === 'gunluk') gunlukler.push(y);
    yaz(`burc/${y.slug}/${donem}/index.html`, yorumSayfasi(y));
    adresler.push(`/burc/${y.slug}/${donem}/`);
  }
}
yaz('burc/index.html', burclarSayfasi(gunlukler));

const p = G.trParcalar(tarih);
const bugun = `${p.yil}-${String(p.ay + 1).padStart(2, '0')}-${String(p.gun).padStart(2, '0')}`;
yaz('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${adresler.map((a) => `  <url><loc>${SITE}${a}</loc><lastmod>${bugun}</lastmod><changefreq>daily</changefreq></url>`).join('\n')}
</urlset>
`);
yaz('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`${bugun}: ${adresler.length - 2} burç sayfası, burç listesi, sitemap.xml ve robots.txt üretildi (${((Date.now() - baslangic) / 1000).toFixed(1)} sn).`);
