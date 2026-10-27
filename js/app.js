// hēmisy arayüzü: ekranları (giriş, form, hesaplanıyor, sonuç) çizer ve aralarında geçiş yapar.
// Sonuçtaki tüm yüzdeler, yorumlar ve tablolar js/motor ve js/yorum içindeki gerçek hesaptan gelir.
(() => {
  'use strict';

  const S = window.Astroship;
  const kok = document.getElementById('uygulama');

  const BOS_KISI = () => ({ ad: '', cinsiyet: '', tarih: '', saat: '', yer: '', yaklasik: false });
  const durum = {
    kisiler: [BOS_KISI(), BOS_KISI()],
    sonuc: null,
    sekme: 0,
    altSekme: 0,
    hata: '',
    // Test anahtarı: adresin sonuna #test eklenince ücretli bölümler açık görünür
    kilitAcik: location.hash === '#test',
  };

  document.documentElement.lang = 'tr';

  // ---------- Yardımcılar ----------

  const kac = S.kac;
  // Gezegen ve burç sembolleri iPhone'da emoji gibi görünmesin diye metin biçimi seçicisi (U+FE0E) eklenir
  const glif = (s) => `<span class="g">${s}︎</span>`;
  const ilgi = (i) => kac(window.Turkce.ek(durum.kisiler[i].ad, 'in'));

  const CINSIYETLER = [
    { id: 'kadin', ad: 'Kadın' },
    { id: 'erkek', ad: 'Erkek' },
    { id: 'belirtilmedi', ad: 'Belirtmek istemiyorum' },
  ];
  const cinsiyetAdi = (id) => CINSIYETLER.find((c) => c.id === id)?.ad ?? '';

  const iki = (n) => String(n).padStart(2, '0');
  // "1995-02-14" → "14.02.1995"; kullanıcının yazdığı (henüz geçersiz) metin olduğu gibi kalır
  const tarihYaz = (t) => (/^\d{4}-\d{2}-\d{2}$/.test(t) ? t.split('-').reverse().join('.') : t);
  const utcYaz = (d) => `${iki(d.getUTCDate())}.${iki(d.getUTCMonth() + 1)}.${d.getUTCFullYear()} ${iki(d.getUTCHours())}:${iki(d.getUTCMinutes())} UTC`;
  const koordinat = (enlem, boylam) => `${S.dereceYaz(Math.abs(enlem))} ${enlem >= 0 ? 'K' : 'G'}, ${S.dereceYaz(Math.abs(boylam))} ${boylam >= 0 ? 'D' : 'B'}`;

  // Logo: marka/hemisy-isim.png (tasarımcının logosundan birebir, şeffaf arka planlı)
  const LOGO = (sinif = '') => `<a href="#" class="logo-baglanti" data-git="giris" aria-label="hēmisy ana sayfa"><img class="logo ${sinif}" src="marka/hemisy-isim.png" alt="hēmisy" width="608" height="224"></a>`;

  const PROFIL_SIMGESI = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="7" r="3.4" stroke="currentColor" stroke-width="1.3"/><path d="M3.6 17c.9-3.1 3.4-4.8 6.4-4.8s5.5 1.7 6.4 4.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

  // Tüm ekranlarda aynı üst çubuk: solda logo, sağda dil seçimi ve profil
  const ustCubuk = () => `
    <header class="ust-cubuk">
      ${LOGO()}
      <div class="ust-kontroller">
        <button type="button" class="ust-dugme" data-dil aria-label="Dil seçimi">TR</button>
        <button type="button" class="ust-dugme ust-profil" data-profil aria-label="Profil">${PROFIL_SIMGESI}</button>
      </div>
    </header>`;

  // İnce çizgili zodyak çarkı: burç dilimleri, derece işaretleri ve ortada iki kesişen çember
  const BURC_GLIFLERI = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  function cark() {
    const nokta = (r, derece) => {
      const a = (derece - 90) * (Math.PI / 180);
      return [(200 + r * Math.cos(a)).toFixed(1), (200 + r * Math.sin(a)).toFixed(1)];
    };
    const dilimler = Array.from({ length: 12 }, (_, i) => {
      const [x1, y1] = nokta(150, i * 30);
      const [x2, y2] = nokta(196, i * 30);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }).join('');
    const glifler = BURC_GLIFLERI.map((g, i) => {
      const [x, y] = nokta(169, i * 30 + 15);
      return `<text x="${x}" y="${(Number(y) + 5).toFixed(1)}" text-anchor="middle">${g}︎</text>`;
    }).join('');
    const ucgen = [0, 120, 240].map((d) => nokta(112, d + 15).join(',')).join(' ');
    const ucgen2 = [60, 180, 300].map((d) => nokta(112, d + 15).join(',')).join(' ');
    return `
      <svg class="gece-cark" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <g stroke="currentColor">
          <circle cx="200" cy="200" r="196" stroke-width="0.8"/>
          <circle cx="200" cy="200" r="191" stroke-width="6" stroke-opacity=".5" stroke-dasharray="0.5 16.17"/>
          <circle cx="200" cy="200" r="186" stroke-width="0.5"/>
          <circle cx="200" cy="200" r="150" stroke-width="0.6"/>
          <g stroke-width="0.6">${dilimler}</g>
          <circle cx="200" cy="200" r="112" stroke-width="0.5" stroke-opacity=".7"/>
          <polygon points="${ucgen}" stroke-width="0.5" stroke-opacity=".6"/>
          <polygon points="${ucgen2}" stroke-width="0.5" stroke-opacity=".6"/>
          <circle cx="182" cy="200" r="34" stroke-width="0.7"/>
          <circle cx="218" cy="200" r="34" stroke-width="0.7"/>
        </g>
        ${glifler}
      </svg>`;
  }

  // Gece penceresindeki yıldızları çizer (sabit; her boyutta aynı desen)
  function yildizlariCiz() {
    document.querySelectorAll('.gece-yildizlar').forEach((tuval) => {
      const { width, height } = tuval.parentElement.getBoundingClientRect();
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      tuval.width = width * dpr;
      tuval.height = height * dpr;
      const c = tuval.getContext('2d');
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      let tohum = 20261027;
      const rastgele = () => (tohum = (tohum * 16807) % 2147483647) / 2147483647;
      const adet = Math.round((width * height) / 900);
      for (let i = 0; i < adet; i++) {
        const x = rastgele() * width;
        const y = rastgele() * height;
        const r = rastgele() < 0.06 ? 1.2 : 0.3 + rastgele() * 0.6;
        c.globalAlpha = 0.25 + rastgele() * 0.65;
        c.fillStyle = '#f3eadf';
        c.beginPath();
        c.arc(x, y, r, 0, Math.PI * 2);
        c.fill();
      }
    });
  }
  window.addEventListener('resize', yildizlariCiz);

  const KILIT_SIMGESI = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.6" stroke="currentColor" stroke-width="1.3"/><path d="M5.3 7V5.2a2.7 2.7 0 0 1 5.4 0V7" stroke="currentColor" stroke-width="1.3"/></svg>';

  // Ücretli içerik: kilit kapalıyken bulanık önizleme ve "Devamını oku", açıkken düz içerik
  function kilitli(icerik, dugmeMetni = 'Devamını oku') {
    if (!icerik) return '';
    if (durum.kilitAcik) return `<div class="acik-icerik">${icerik}</div>`;
    return `
      <div class="kilit">
        <div class="kilit-icerik" aria-hidden="true">${icerik}</div>
        <button type="button" class="kilit-dugme" data-kilit>${KILIT_SIMGESI}${dugmeMetni}</button>
      </div>`;
  }

  const altBilgi = () => `
    <footer class="alt-bilgi">
      <div class="iletisim"><span>www.hemisy.com</span><span>info@hemisy.com</span></div>
    </footer>`;

  // ---------- Giriş ----------

  function girisEkrani() {
    return `
      <section class="ekran giris">
        ${ustCubuk()}
        <section class="gece kahraman">
          <canvas class="gece-yildizlar" aria-hidden="true"></canvas>
          ${cark()}
          <h1 tabindex="-1">Kişiye özel ilişki analizi</h1>
          <button type="button" class="dugme-ana dugme-acik" data-git="form">Uyumu hesapla <span class="ok">→</span></button>
        </section>
      </section>`;
  }

  // ---------- Form ----------

  // Elle yazılan tarih ve saat: rakamlar yazıldıkça nokta ve iki nokta kendiliğinden eklenir
  function tarihMaskesi(deger) {
    const r = deger.replace(/\D/g, '').slice(0, 8);
    if (r.length > 4) return `${r.slice(0, 2)}.${r.slice(2, 4)}.${r.slice(4)}`;
    if (r.length > 2) return `${r.slice(0, 2)}.${r.slice(2)}`;
    return r;
  }
  function saatMaskesi(deger) {
    const r = deger.replace(/\D/g, '').slice(0, 4);
    return r.length > 2 ? `${r.slice(0, 2)}:${r.slice(2)}` : r;
  }

  // "14.02.1995" → "1995-02-14"; geçersizse null
  function tarihOku(metin) {
    const m = metin.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!m) return null;
    const [gun, ay, yil] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const d = new Date(Date.UTC(yil, ay - 1, gun));
    if (d.getUTCFullYear() !== yil || d.getUTCMonth() !== ay - 1 || d.getUTCDate() !== gun) return null;
    if (yil < 1900 || d > new Date()) return null;
    return `${m[3]}-${m[2]}-${m[1]}`;
  }
  function saatOku(metin) {
    const m = metin.match(/^(\d{2}):(\d{2})$/);
    if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) return null;
    return metin;
  }

  function kisiAlanlari(i) {
    const k = durum.kisiler[i];
    return `
      <fieldset class="kisi yuzey">
        <legend class="etiket">${i + 1}. kişi</legend>
        <div class="alan">
          <label for="ad-${i}">İsim</label>
          <input id="ad-${i}" type="text" autocomplete="off" autocapitalize="words" value="${kac(k.ad)}" placeholder="Örneğin ${i === 0 ? 'Elif' : 'Can'}">
        </div>
        <div class="alan">
          <span class="alan-ad" id="cinsiyet-baslik-${i}">Cinsiyet</span>
          <fieldset class="secenekler" id="cinsiyet-${i}" aria-labelledby="cinsiyet-baslik-${i}">
            ${CINSIYETLER.map((c) => `
              <label><input type="radio" name="cinsiyet-${i}" value="${c.id}" ${k.cinsiyet === c.id ? 'checked' : ''}><span>${c.ad}</span></label>`).join('')}
          </fieldset>
        </div>
        <div class="alan-cift">
          <div class="alan">
            <label for="tarih-${i}">Doğum tarihi</label>
            <input id="tarih-${i}" class="sayisal" type="text" inputmode="numeric" autocomplete="off" maxlength="10" placeholder="GG.AA.YYYY" value="${kac(tarihYaz(k.tarih))}">
          </div>
          <div class="alan">
            <label for="saat-${i}">Doğum saati</label>
            <input id="saat-${i}" class="sayisal" type="text" inputmode="numeric" autocomplete="off" maxlength="5" placeholder="SS:DD" value="${kac(k.saat)}">
          </div>
        </div>
        <label class="onay"><input id="yaklasik-${i}" type="checkbox" ${k.yaklasik ? 'checked' : ''}> Saatim yaklaşık, tam bilmiyorum</label>
        <p class="uyari" id="uyari-${i}" ${k.yaklasik ? '' : 'hidden'}>Saat yaklaşık olduğunda bazı yorumlar daha az kesin olur.</p>
        <div class="alan">
          <label for="yer-${i}">Doğum yeri</label>
          <input id="yer-${i}" type="text" list="sehirler" autocomplete="off" value="${kac(k.yer)}" placeholder="İl, ilçe ya da şehir">
        </div>
      </fieldset>`;
  }

  function formEkrani() {
    return `
      <section class="ekran form-ekrani">
        ${ustCubuk()}
        <button type="button" class="geri" data-git="giris">← Geri</button>
        <div class="form-giris">
          <h2 tabindex="-1">Doğum bilgileri</h2>
          <p class="aciklama">Doğum saatini olabildiğince doğru yazın. Saatinizi doğum belgenizde ya da e-Devlet'teki nüfus kaydınızda bulabilirsiniz.</p>
        </div>
        <form id="dogum-formu" novalidate>
          ${kisiAlanlari(0)}
          ${kisiAlanlari(1)}
          <datalist id="sehirler">${window.ASTROSHIP_SEHIRLER.map((s) => `<option value="${kac(s.ad)}"></option>`).join('')}</datalist>
          <p class="form-hata" role="alert" ${durum.hata ? '' : 'hidden'}>${kac(durum.hata)}</p>
          <button type="submit" class="dugme-ana">Uyumumuzu göster <span class="ok">→</span></button>
          <p class="yer-notu">Listede olmayan ilçe ve şehirler internetten aranır.</p>
        </form>
        ${altBilgi()}
      </section>`;
  }

  function formuOku() {
    const sorunlar = [];
    const isaretle = (girdi, gecerli) => girdi.setAttribute('aria-invalid', gecerli ? 'false' : 'true');
    const kisiler = [0, 1].map((i) => {
      const no = `${i + 1}. kişinin`;
      const ad = document.getElementById(`ad-${i}`);
      const tarih = document.getElementById(`tarih-${i}`);
      const saat = document.getElementById(`saat-${i}`);
      const yer = document.getElementById(`yer-${i}`);
      const k = {
        ad: ad.value.trim(),
        tarih: tarihOku(tarih.value.trim()),
        saat: saatOku(saat.value.trim()),
        yer: yer.value.trim(),
        cinsiyet: document.querySelector(`input[name="cinsiyet-${i}"]:checked`)?.value ?? '',
        yaklasik: document.getElementById(`yaklasik-${i}`).checked,
      };
      isaretle(ad, k.ad);
      isaretle(tarih, k.tarih);
      isaretle(saat, k.saat);
      isaretle(yer, k.yer);
      document.getElementById(`cinsiyet-${i}`).classList.toggle('hatali', !k.cinsiyet);
      if (!k.ad) sorunlar.push(`${no} ismi`);
      if (!k.cinsiyet) sorunlar.push(`${no} cinsiyeti`);
      if (!k.tarih) sorunlar.push(`${no} doğum tarihi (örnek: 14.02.1995)`);
      if (!k.saat) sorunlar.push(`${no} doğum saati (örnek: 09:30)`);
      if (!k.yer) sorunlar.push(`${no} doğum yeri`);
      return k;
    });
    return { kisiler, sorunlar };
  }

  function formuGonder(olay) {
    olay.preventDefault();
    const { kisiler, sorunlar } = formuOku();
    durum.kisiler = kisiler.map((k, i) => ({
      ...k,
      // Geçersiz değerler kaybolmasın diye kutudaki hâli korunur
      tarih: k.tarih ?? document.getElementById(`tarih-${i}`).value.trim(),
      saat: k.saat ?? document.getElementById(`saat-${i}`).value.trim(),
    }));
    if (sorunlar.length) {
      const kutu = kok.querySelector('.form-hata');
      kutu.textContent = `Lütfen kontrol edin: ${sorunlar.join(', ')}.`;
      kutu.hidden = false;
      kok.querySelector('[aria-invalid="true"], .secenekler.hatali input')?.focus();
      return;
    }
    hesapla();
  }

  // ---------- Hesaplama ----------

  async function hesapla() {
    goster('yukleniyor');
    const baslangic = Date.now();
    try {
      const natal = [];
      for (let i = 0; i < 2; i++) {
        const k = durum.kisiler[i];
        const yer = await S.yerBul(k.yer);
        if (!yer) throw new Error(`${i + 1}. kişinin doğum yeri bulunamadı: "${k.yer}". İl adını yazmayı deneyin (örneğin İstanbul).`);
        const zaman = S.yereldenUtc(k.tarih, k.saat, yer.bolge);
        natal.push({ yer, zaman, harita: S.haritaHesapla(zaman.utc, yer.enlem, yer.boylam) });
      }
      const [h1, h2] = natal.map((n) => n.harita);
      const uyum = S.uyumHesapla([h1, h2], durum.kisiler.map((k) => k.cinsiyet));
      durum.sonuc = {
        natal,
        sinastri: S.sinastriAcilari(h1, h2),
        kompozit: S.kompozitHesapla(h1, h2),
        davison: S.davisonHesapla(h1, h2),
        yorum: S.uyumYorumu(uyum, durum.kisiler),
      };
      durum.hata = '';
      durum.sekme = 0;
      durum.altSekme = 0;
      setTimeout(() => goster('sonuc'), Math.max(0, 1800 - (Date.now() - baslangic)));
    } catch (hata) {
      durum.hata = hata.message;
      goster('form');
    }
  }

  function yukleniyorEkrani() {
    return `
      <section class="ekran yukleniyor" aria-live="polite">
        <div class="gece">
          <canvas class="gece-yildizlar" aria-hidden="true"></canvas>
          <div class="yukleniyor-ic">
            ${cark()}
            <h2 tabindex="-1">Yıldızlarınız karşılaştırılıyor</h2>
            <p>Doğum haritalarınız hesaplanıyor ve uyumunuz yorumlanıyor.</p>
          </div>
        </div>
      </section>`;
  }

  // ---------- Sonuç: Uyum ----------

  function genelHalka(yuzde) {
    const r = 52;
    const cevre = 2 * Math.PI * r;
    return `
      <svg class="halka" viewBox="0 0 120 120" role="img" aria-label="Genel uyum yüzde ${yuzde}">
        <defs><linearGradient id="halka-renk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3eadf"/><stop offset="1" stop-color="#b9a3c4"/></linearGradient></defs>
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="rgba(243,234,223,.16)" stroke-width="3" />
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="url(#halka-renk)" stroke-width="3" stroke-linecap="round"
          stroke-dasharray="${((cevre * yuzde) / 100).toFixed(2)} ${cevre.toFixed(2)}" transform="rotate(-90 60 60)" />
        <text x="60" y="72" text-anchor="middle" class="halka-sayi"><tspan class="halka-yuzde" dy="-16">%</tspan><tspan dy="16">${yuzde}</tspan></text>
      </svg>`;
  }

  const paragraflar = (liste) => liste.map((p) => `<p>${kac(p)}</p>`).join('');

  function uyumKarti(b) {
    const ucretli = b.ucretli.length ? `<div class="yorum">${paragraflar(b.ucretli)}</div>` : '';
    return `
      <article class="uyum-kart yuzey" id="u-${b.id}">
        <header class="kart-bas">
          <span class="amblem" aria-hidden="true">${glif(b.glif)}</span>
          <h3>${b.ad}</h3>
          <p class="yuzde" aria-label="yüzde ${b.yuzde}"><small>%</small>${b.yuzde}</p>
        </header>
        <div class="cubuk" aria-hidden="true"><span style="width:${b.yuzde}%"></span></div>
        <div class="yorum">${paragraflar(b.ucretsiz)}</div>
        ${kilitli(ucretli)}
      </article>`;
  }

  function uyumPaneli() {
    const y = durum.sonuc.yorum;
    return `
      <ul class="mini-skorlar">
        ${y.basliklar.map((b) => `<li><a href="#u-${b.id}" data-kaydir="u-${b.id}"><span>${b.ad}</span><b>%${b.yuzde}</b></a></li>`).join('')}
      </ul>
      ${y.basliklar.map(uyumKarti).join('')}`;
  }

  // ---------- Sonuç: İlişki yapısı ve Gelecek ----------

  const ILISKI_SORULARI = [
    'İlişki nasıl başlayabilir?',
    'İlişkinin kimliği ve amacı',
    'İlişki nereden beslenir?',
    'İlişkiye ne iyi gelir?',
    'İlişki hangi alanlarda sınanır?',
    'Hangi konular çatışma yaratır?',
  ];

  function iliskiPaneli() {
    return `
      <article class="bolum-kart yuzey">
        <p class="etiket">İlişki yapısı</p>
        <h3>İlişkinizin kendi haritası</h3>
        <p class="aciklama">İki doğum haritanızdan ilişkinizin kendi haritası hesaplandı. Bu bölümün yorumları bir sonraki güncellemede eklenecek.</p>
        <ol class="soru-listesi">${ILISKI_SORULARI.map((s) => `<li>${s}</li>`).join('')}</ol>
      </article>`;
  }

  function gelecekPaneli() {
    return `
      <article class="bolum-kart yuzey">
        <p class="etiket">Gelecek öngörüsü</p>
        <h3>İlişki ne zaman başlar, ne zaman derinleşir?</h3>
        <p class="aciklama">Önümüzdeki 12 ayda ilişkinizin güçlendiği ve sınandığı dönemler, tarih aralıklarıyla. Bu bölüm tam raporun parçasıdır ve hazırlanıyor.</p>
        <button type="button" class="dugme-ana" data-kilit>${KILIT_SIMGESI} Gelecek öngörüsünü aç <span class="ok">→</span></button>
      </article>`;
  }

  // ---------- Sonuç: Harita bilgileri ----------

  const ACI_TURU = { kavusum: 'kavusum', altmislik: 'uyumlu', ucgen: 'uyumlu', kare: 'gergin', karsit: 'gergin', quincunx: 'gergin' };
  const SIRA = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptun', 'pluton', 'kuzeyDugum', 'yukselen', 'mc'];

  function noktaTablosu(harita) {
    const satir = (n) => {
      const kisa = n.glif.length > 1;
      const ev = n.anahtar === 'yukselen' ? 1 : n.anahtar === 'mc' ? 10 : n.ev;
      return `
        <tr>
          <td class="t-glif ${kisa ? 'kisa' : ''}" aria-hidden="true">${kisa ? n.glif : glif(n.glif)}</td>
          <td class="t-ad">${n.ad}${n.geri ? '<span class="geri-isareti" title="Geri hareket">R</span>' : ''}</td>
          <td class="t-konum">${S.dereceYaz(n.derece)} ${n.burc.ad}<small>${n.burc.element} · ${n.burc.nitelik}</small></td>
          <td class="t-ev">${ev}. ev</td>
        </tr>`;
    };
    return `
      <div class="tablo-sar">
        <table class="nokta-tablosu">
          <thead><tr><th></th><th>Nokta</th><th>Burç ve derece</th><th style="text-align:right">Ev</th></tr></thead>
          <tbody>${SIRA.map((a) => satir(harita.gezegenler[a])).join('')}</tbody>
        </table>
      </div>`;
  }

  function aciSatiri(a, b, aci, metin) {
    return `
      <li class="aci tur-${ACI_TURU[aci.id]}">
        <span class="aci-isaret" aria-hidden="true">${glif(aci.glif)}</span>
        <span class="aci-metin">${metin}<small>${aci.ad} · ${a.burc.ad} – ${b.burc.ad}</small></span>
        <span class="aci-orb">${S.dereceYaz(aci.orb)}</span>
      </li>`;
  }

  function nedenSatiri(n) {
    return `
      <li class="neden ton-${n.ton}">
        <span class="neden-isaret" aria-hidden="true">${n.ev ? `<span class="ev-no">${n.isaret}</span>` : glif(n.isaret)}</span>
        <span class="neden-metin">${kac(n.metin)}<small>${kac(n.alt)}</small></span>
        <span class="neden-orb">${n.orb ?? ''}</span>
      </li>`;
  }

  function evVeAcilar(harita) {
    const icAcilar = S.haritaAcilari(harita);
    return `
      <details class="acilir">
        <summary>Ev girişleri (${harita.evSistemi})</summary>
        <ol class="ev-listesi">${harita.evler.map((e, n) => `<li><b>${n + 1}.</b> ${S.burcBilgisi(e).metin}</li>`).join('')}</ol>
      </details>
      <details class="acilir">
        <summary>Haritadaki açılar (${icAcilar.length})</summary>
        <ul class="aci-listesi">${icAcilar.map(({ a, b, aci }) => aciSatiri(a, b, aci, `${a.ad} – ${b.ad}`)).join('')}</ul>
      </details>`;
  }

  function natalKarti(i) {
    const { yer, zaman, harita } = durum.sonuc.natal[i];
    const k = durum.kisiler[i];
    return `
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">${kac(cinsiyetAdi(k.cinsiyet))}</p>
          <h3>${ilgi(i)} doğum haritası</h3>
          <div class="meta">
            <span>${tarihYaz(k.tarih)} ${kac(k.saat)} yerel saat (${zaman.saatFarki}) = ${utcYaz(zaman.utc)}</span>
            <span>${kac(yer.ad)}${yer.il && yer.il !== yer.ad ? `, ${kac(yer.il)}` : ''}, ${kac(yer.ulke)} · ${koordinat(yer.enlem, yer.boylam)}</span>
            <span>Ev sistemi: ${harita.evSistemi} · Tropikal zodyak · Gerçek düğüm</span>
          </div>
          ${k.yaklasik ? '<p class="uyari">Doğum saati yaklaşık girildi: Yükselen ve ev konumları kayabilir.</p>' : ''}
        </header>
        ${noktaTablosu(harita)}
        ${evVeAcilar(harita)}
      </article>`;
  }

  function sinastriKarti() {
    const acilar = durum.sonuc.sinastri.map(({ a, b, aci }) => aciSatiri(a, b, aci, `${ilgi(0)} ${a.iyelik} – ${ilgi(1)} ${b.iyelik}`)).join('');
    return `
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">Sinastri</p>
          <h3>Aranızdaki açılar</h3>
          <p class="meta"><span>Burç ve derece birlikte geçerli olan açılar; orb en fazla 10°. En tam açı en üstte.</span></p>
        </header>
        <ul class="aci-listesi">${acilar}</ul>
      </article>`;
  }

  function nedenlerKarti() {
    const basliklar = durum.sonuc.yorum.basliklar.map((b) => `
      <section class="neden-grubu">
        <h4>${b.ad} <span>%${b.yuzde}</span></h4>
        ${b.cekirdekVar ? '' : '<p class="meta"><span>Bu başlığın temel teması aranızda yok ya da çok geniş (8°\'den fazla); yüzde bu yüzden sınırlı tutuldu.</span></p>'}
        ${b.nedenler.length ? `<ul class="nedenler">${b.nedenler.map(nedenSatiri).join('')}</ul>` : '<p class="meta"><span>Belirgin bir gösterge yok.</span></p>'}
      </section>`).join('');
    return `
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">Uyum hesabı</p>
          <h3>Yüzdelerin nedenleri</h3>
        </header>
        <ul class="lejant">
          <li class="ton-arti"><i></i>Artırıyor</li>
          <li class="ton-eksi"><i></i>Düşürüyor</li>
          <li class="ton-yogun"><i></i>Yoğunluk katıyor</li>
        </ul>
        ${basliklar}
      </article>`;
  }

  function iliskiHaritasiKarti(tur) {
    const h = durum.sonuc[tur];
    const meta = tur === 'davison'
      ? `<span>Davison anı: ${utcYaz(h.utc)}</span><span>Davison yeri: ${koordinat(h.enlem, h.boylam)}</span>`
      : `<span>Orta noktalar · Yükselen ve evler kompozit MC'den, orta enlem ${S.dereceYaz(Math.abs(h.enlem))} için</span>`;
    return `
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">${tur === 'davison' ? 'Davison' : 'Kompozit'}</p>
          <h3>${tur === 'davison' ? 'Davison haritası' : 'Kompozit harita'}</h3>
          <div class="meta">${meta}<span>Ev sistemi: ${h.evSistemi}</span></div>
        </header>
        ${noktaTablosu(h)}
        ${evVeAcilar(h)}
      </article>`;
  }

  function bilgiPaneli() {
    const alt = [`${ilgi(0)} haritası`, `${ilgi(1)} haritası`, 'Aranızdaki açılar', 'Yüzdelerin nedenleri', 'Kompozit', 'Davison'];
    const icerik = [natalKarti(0), natalKarti(1), sinastriKarti(), nedenlerKarti(), iliskiHaritasiKarti('kompozit'), iliskiHaritasiKarti('davison')];
    return `
      <div class="alt-sekmeler" role="group" aria-label="Harita bilgileri">
        ${alt.map((s, n) => `<button type="button" data-alt-sekme="${n}" aria-pressed="${durum.altSekme === n}">${s}</button>`).join('')}
      </div>
      ${icerik.map((c, n) => `<div class="alt-panel" data-alt-panel="${n}" ${durum.altSekme === n ? '' : 'hidden'}>${c}</div>`).join('')}`;
  }

  // ---------- Sonuç ekranı ----------

  const SEKMELER = [
    { ad: 'Uyum', panel: uyumPaneli },
    { ad: 'İlişki yapısı', panel: iliskiPaneli },
    { ad: 'Gelecek', panel: gelecekPaneli },
    { ad: 'Harita bilgileri', panel: bilgiPaneli },
  ];

  function sonucEkrani() {
    const [a, b] = durum.kisiler.map((k) => kac(k.ad));
    const y = durum.sonuc.yorum;
    return `
      <section class="ekran sonuc">
        ${durum.kilitAcik ? '<p class="test-bandi">Test modu · tüm kilitler açık</p>' : ''}
        ${ustCubuk()}
        <button type="button" class="geri" data-git="form">← Bilgileri değiştir</button>
        <header class="gece sonuc-bas">
          <canvas class="gece-yildizlar" aria-hidden="true"></canvas>
          ${cark()}
          <p class="etiket">Uyum raporu</p>
          <div>
            <h1 tabindex="-1">${a} <em>&amp;</em> ${b}</h1>
            <p class="cift-bilgi">${kac(cinsiyetAdi(durum.kisiler[0].cinsiyet))} · ${kac(cinsiyetAdi(durum.kisiler[1].cinsiyet))}</p>
          </div>
          <div class="genel">
            ${genelHalka(y.genel)}
            <div>
              <p class="etiket">Genel uyum</p>
              <p class="ozet-metin">${kac(y.ozet)}</p>
            </div>
          </div>
        </header>
        <div class="sekme-cubugu yuzey" role="tablist" aria-label="Rapor bölümleri">
          ${SEKMELER.map((s, n) => `<button type="button" role="tab" id="sekme-${n}" aria-controls="panel-${n}" aria-selected="${durum.sekme === n}" data-sekme="${n}">${s.ad}</button>`).join('')}
        </div>
        ${SEKMELER.map((s, n) => `<div class="panel" role="tabpanel" id="panel-${n}" aria-labelledby="sekme-${n}" ${durum.sekme === n ? '' : 'hidden'}>${s.panel()}</div>`).join('')}
        ${altBilgi()}
      </section>`;
  }

  // ---------- Alt perde (tam rapor, dil, profil) ----------

  const PERDELER = {
    rapor: {
      baslik: 'Tam rapor çok yakında',
      metin: 'Ödeme sistemi eklendiğinde tam raporu buradan açabileceksiniz. Tam rapor; tüm uyum yorumlarını, ilişki yapısını ve gelecek öngörüsünü içerir.',
    },
    dil: {
      baslik: 'Dil',
      metin: 'Şu an Türkçe görüntülüyorsunuz. İngilizce çok yakında eklenecek.',
    },
    profil: {
      baslik: 'Hesabınız',
      metin: 'Üyelik çok yakında: üye olarak haritalarınızı saklayabilecek ve raporlarınıza dilediğiniz zaman ulaşabileceksiniz.',
    },
  };

  const perde = document.createElement('div');
  perde.className = 'perde';
  perde.hidden = true;
  perde.innerHTML = `
    <div class="perde-arka" data-kapat></div>
    <div class="perde-kutu" role="dialog" aria-modal="true" aria-labelledby="perde-baslik">
      <h2 id="perde-baslik" tabindex="-1"></h2>
      <p class="perde-metin"></p>
      <button type="button" class="dugme-ana" data-kapat>Tamam <span class="ok">✓</span></button>
    </div>`;
  document.body.appendChild(perde);
  let perdeyiAcan = null;

  function perdeAc(dugme, tur) {
    perdeyiAcan = dugme;
    perde.querySelector('h2').textContent = PERDELER[tur].baslik;
    perde.querySelector('.perde-metin').textContent = PERDELER[tur].metin;
    perde.hidden = false;
    perde.querySelector('h2').focus();
  }
  function perdeKapat() {
    perde.hidden = true;
    perdeyiAcan?.focus();
  }

  // ---------- Ekran geçişleri ----------

  const EKRANLAR = { giris: girisEkrani, form: formEkrani, yukleniyor: yukleniyorEkrani, sonuc: sonucEkrani };

  function goster(ekran) {
    if (ekran === 'sonuc' && !durum.sonuc) ekran = 'form';
    kok.innerHTML = EKRANLAR[ekran]();
    kok.firstElementChild.classList.add('giriyor');
    window.scrollTo(0, 0);
    yildizlariCiz();
    kok.querySelector('h1, h2')?.focus({ preventScroll: true });
  }

  function sekmeSec(n) {
    durum.sekme = n;
    kok.querySelectorAll('[role="tab"]').forEach((t, i) => t.setAttribute('aria-selected', String(i === n)));
    kok.querySelectorAll('[role="tabpanel"]').forEach((p, i) => { p.hidden = i !== n; });
  }

  function altSekmeSec(n) {
    durum.altSekme = n;
    kok.querySelectorAll('[data-alt-sekme]').forEach((t, i) => t.setAttribute('aria-pressed', String(i === n)));
    kok.querySelectorAll('[data-alt-panel]').forEach((p, i) => { p.hidden = i !== n; });
  }

  document.addEventListener('click', (olay) => {
    const hedef = olay.target.closest('[data-git], [data-sekme], [data-alt-sekme], [data-kilit], [data-dil], [data-profil], [data-kapat], [data-kaydir]');
    if (!hedef) return;
    if (hedef.dataset.git) {
      olay.preventDefault();
      if (hedef.dataset.git !== 'form' || !kok.querySelector('#dogum-formu')) durum.hata = '';
      goster(hedef.dataset.git);
    } else if (hedef.dataset.sekme) sekmeSec(Number(hedef.dataset.sekme));
    else if (hedef.dataset.altSekme) altSekmeSec(Number(hedef.dataset.altSekme));
    else if (hedef.hasAttribute('data-kilit')) perdeAc(hedef, 'rapor');
    else if (hedef.hasAttribute('data-dil')) perdeAc(hedef, 'dil');
    else if (hedef.hasAttribute('data-profil')) perdeAc(hedef, 'profil');
    else if (hedef.hasAttribute('data-kapat')) perdeKapat();
    else if (hedef.dataset.kaydir) {
      olay.preventDefault();
      document.getElementById(hedef.dataset.kaydir)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.addEventListener('input', (olay) => {
    const id = olay.target.id ?? '';
    if (id.startsWith('tarih-')) olay.target.value = tarihMaskesi(olay.target.value);
    else if (id.startsWith('saat-')) olay.target.value = saatMaskesi(olay.target.value);
  });

  document.addEventListener('change', (olay) => {
    const m = olay.target.id?.match(/^yaklasik-(\d)$/);
    if (m) document.getElementById(`uyari-${m[1]}`).hidden = !olay.target.checked;
    const c = olay.target.name?.match(/^cinsiyet-(\d)$/);
    if (c) document.getElementById(`cinsiyet-${c[1]}`).classList.remove('hatali');
  });

  document.addEventListener('submit', (olay) => {
    if (olay.target.id === 'dogum-formu') formuGonder(olay);
  });

  document.addEventListener('keydown', (olay) => {
    if (olay.key === 'Escape' && !perde.hidden) perdeKapat();
  });

  goster(location.hash === '#form' ? 'form' : 'giris');
})();
