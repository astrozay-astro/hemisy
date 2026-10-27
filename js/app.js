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
    // Geçici: yorumlar gözden geçirilirken ücretli bölümler herkese açık. Ödeme gelince yalnızca #test açsın:
    // kilitAcik: location.hash === '#test',
    kilitAcik: true,
    sorulanSoru: '',
    // 'cift': iki kişilik uyum raporu, 'birey': tek kişilik ilişki analizi
    mod: 'cift',
  };

  // Ücretsiz soru hakkı: kullanılan soru bu cihazda saklanır, ikinci soru Pro üyelik ister
  const SORU_ANAHTARI = 'hemisy-ucretsiz-soru';
  try { durum.sorulanSoru = localStorage.getItem(SORU_ANAHTARI) ?? ''; } catch { /* depolama kapalı */ }

  // Ücretsiz ilişki analizi hakkı: ilk analiz edilen doğum bilgileri bu cihazda saklanır. Aynı bilgilerle rapor
  // yeniden açılabilir, farklı bir kişi için Pro plan gerekir. Adresin sonunda #test varken sınır uygulanmaz.
  const ANALIZ_ANAHTARI = 'hemisy-ucretsiz-analiz';
  const analizKimligi = (k) => [k.tarih, k.saat, k.yer, k.cinsiyet].join('|');
  function ucretsizAnaliz() {
    try { return JSON.parse(localStorage.getItem(ANALIZ_ANAHTARI)) ?? null; } catch { return null; }
  }
  function analizHakkiVarMi(k) {
    if (location.hash === '#test') return true;
    const kayit = ucretsizAnaliz();
    return !kayit || kayit.kimlik === analizKimligi(k);
  }
  function analiziKaydet(k) {
    if (ucretsizAnaliz()) return;
    try { localStorage.setItem(ANALIZ_ANAHTARI, JSON.stringify({ kimlik: analizKimligi(k), ad: k.ad })); } catch { /* depolama kapalı */ }
  }

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
      <div class="logo-grubu">${LOGO()}<span class="imza">by Tuğçenur Özay</span></div>
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

  const INSTAGRAM_SIMGESI = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" stroke-width="1.3"/><circle cx="10" cy="10" r="3.2" stroke="currentColor" stroke-width="1.3"/><circle cx="14.2" cy="5.8" r="0.9" fill="currentColor"/></svg>';
  const X_SIMGESI = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

  const altBilgi = () => `
    <footer class="alt-bilgi">
      <img class="alt-logo" src="marka/hemisy-isim.png" alt="hēmisy" width="608" height="224">
      <div class="iletisim">
        <a href="https://www.hemisy.com" target="_blank" rel="noopener">www.hemisy.com</a>
        <a href="mailto:info@hemisy.com">info@hemisy.com</a>
      </div>
      <div class="sosyal">
        <a href="https://www.instagram.com/astrologtugcenurozay" target="_blank" rel="noopener">${INSTAGRAM_SIMGESI}<span>@astrologtugcenurozay</span></a>
        <a href="https://x.com/astrozay_" target="_blank" rel="noopener">${X_SIMGESI}<span>@astrozay_</span></a>
      </div>
      <p>hēmisy eğlence amaçlıdır. Önemli kararlarınızı yalnızca bu rapora dayandırmayın.</p>
      <p class="telif">© 2026 hēmisy · by Tuğçenur Özay</p>
    </footer>`;

  // ---------- Giriş ----------

  function girisEkrani() {
    return `
      <section class="ekran giris">
        ${ustCubuk()}
        <section class="gece kahraman">
          <canvas class="gece-yildizlar" aria-hidden="true"></canvas>
          ${cark()}
          <div class="analiz-secimi">
            <h1 tabindex="-1">Kişiye özel ilişki analizi</h1>
            <button type="button" class="dugme-ana dugme-acik" data-git="form" data-mod="birey">Hesapla <span class="ok">→</span></button>
          </div>
          <div class="analiz-secimi">
            <h2>Çiftlere özel ilişki analizi</h2>
            <button type="button" class="dugme-ana dugme-acik" data-git="form" data-mod="cift">Hesapla <span class="ok">→</span></button>
          </div>
        </section>

        <ol class="icerik-listesi yuzey">
          <li><span class="amblem" aria-hidden="true">${glif('☉')}</span><div><div class="baslik-satiri"><h3>İlişki analizi</h3><span class="rozet">Tek kişi</span></div><p>Eşinizde ne arıyorsunuz, sizi kim çeker, evlilik alanınız nasıl ve partnerinizle nerede karşılaşabilirsiniz?</p></div></li>
          <li><span class="amblem" aria-hidden="true">${glif('♀')}</span><div><div class="baslik-satiri"><h3>Çift analizi: uyum</h3><span class="rozet">Ücretsiz</span></div><p>Çekim, bağlanma, iletişim, romantizm, güven ve huzur. Her biri yüzdesi ve yorumuyla.</p></div></li>
          <li><span class="amblem" aria-hidden="true">${glif('☽')}</span><div><div class="baslik-satiri"><h3>İlişki yapısı</h3><span class="rozet rozet-pro">Pro plan</span></div><p>İlişkiniz nasıl başlayabilir, nereden beslenebilir, hangi konularda sınanabilir?</p></div></li>
          <li><span class="amblem" aria-hidden="true">${glif('♃')}</span><div><div class="baslik-satiri"><h3>Gelecek öngörüsü</h3><span class="rozet rozet-pro">Pro plan</span></div><p>Önümüzdeki 12 ayın güçlü dönemleri: ilişki ne zaman başlayabilir, ne zaman derinleşebilir?</p></div></li>
        </ol>
        ${altBilgi()}
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

  function kisiAlanlari(i, baslik = `${i + 1}. kişi`) {
    const k = durum.kisiler[i];
    return `
      <fieldset class="kisi yuzey">
        <legend class="etiket">${baslik}</legend>
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
        <div class="alan sehir-alani">
          <label for="yer-${i}">Doğum yeri</label>
          <input id="yer-${i}" type="text" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="oneriler-${i}" autocomplete="off" value="${kac(k.yer)}" placeholder="İl ya da şehir yazın">
          <ul class="oneriler" id="oneriler-${i}" role="listbox" hidden></ul>
        </div>
      </fieldset>`;
  }

  function formEkrani() {
    const birey = durum.mod === 'birey';
    return `
      <section class="ekran form-ekrani">
        ${ustCubuk()}
        <button type="button" class="geri" data-git="giris">← Geri</button>
        <div class="form-giris">
          <p class="etiket">${birey ? 'İlişki analizi' : 'Çift analizi'}</p>
          <h2 tabindex="-1">${birey ? 'Doğum bilgileriniz' : 'Doğum bilgileri'}</h2>
          <p class="aciklama">Doğum saatini olabildiğince doğru yazın. Saatinizi doğum belgenizde ya da e-Devlet'teki nüfus kaydınızda bulabilirsiniz.</p>
        </div>
        <form id="dogum-formu" novalidate>
          ${birey ? kisiAlanlari(0, 'Sizin bilgileriniz') : `${kisiAlanlari(0)}${kisiAlanlari(1)}`}
          <p class="form-hata" role="alert" ${durum.hata ? '' : 'hidden'}>${kac(durum.hata)}</p>
          <button type="submit" class="dugme-ana">${birey ? 'Analizimi göster' : 'Uyumumuzu göster'} <span class="ok">→</span></button>
          <p class="yer-notu">Doğum yeri için il ya da şehir adını yazıp listeden seçin.</p>
          ${birey ? `<p class="yer-notu analiz-hakki">${ucretsizAnaliz()
            ? `Ücretsiz analiz hakkınızı ${kac(ucretsizAnaliz().ad)} için kullandınız. Farklı bir kişi için Pro plan gerekir.`
            : 'Üyeliğinizle bir ilişki analizi ücretsizdir. Daha fazla analiz için Pro plan gerekir.'}</p>` : ''}
        </form>
        ${altBilgi()}
      </section>`;
  }

  function formuOku() {
    const sorunlar = [];
    const isaretle = (girdi, gecerli) => girdi.setAttribute('aria-invalid', gecerli ? 'false' : 'true');
    const birey = durum.mod === 'birey';
    const kisiler = (birey ? [0] : [0, 1]).map((i) => {
      // Tek kişide "isminiz", iki kişide "1. kişinin ismi"
      const no = birey ? '' : `${i + 1}. kişinin `;
      const ek = (iyelik, siz) => (birey ? siz : `${no}${iyelik}`);
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
      if (!k.ad) sorunlar.push(ek('ismi', 'isminiz'));
      if (!k.cinsiyet) sorunlar.push(ek('cinsiyeti', 'cinsiyetiniz'));
      if (!k.tarih) sorunlar.push(`${ek('doğum tarihi', 'doğum tarihiniz')} (örnek: 14.02.1995)`);
      if (!k.saat) sorunlar.push(`${ek('doğum saati', 'doğum saatiniz')} (örnek: 09:30)`);
      if (!k.yer) sorunlar.push(ek('doğum yeri', 'doğum yeriniz'));
      return k;
    });
    return { kisiler, sorunlar };
  }

  function formuGonder(olay) {
    olay.preventDefault();
    const { kisiler, sorunlar } = formuOku();
    // Tek kişilik analizde 2. kişinin bilgileri korunur (çift analizine dönülürse kaybolmasın)
    kisiler.forEach((k, i) => { durum.kisiler[i] = {
      ...k,
      // Geçersiz değerler kaybolmasın diye kutudaki hâli korunur
      tarih: k.tarih ?? document.getElementById(`tarih-${i}`).value.trim(),
      saat: k.saat ?? document.getElementById(`saat-${i}`).value.trim(),
    }; });
    if (sorunlar.length) {
      const kutu = kok.querySelector('.form-hata');
      kutu.textContent = `Lütfen kontrol edin: ${sorunlar.join(', ')}.`;
      kutu.hidden = false;
      kok.querySelector('[aria-invalid="true"], .secenekler.hatali input')?.focus();
      return;
    }
    if (durum.mod === 'birey' && !analizHakkiVarMi(durum.kisiler[0])) {
      perdeAc(olay.submitter || kok.querySelector('#dogum-formu [type="submit"]'), 'proAnaliz');
      return;
    }
    hesapla();
  }

  // ---------- Hesaplama ----------

  async function hesapla() {
    goster('yukleniyor');
    const baslangic = Date.now();
    try {
      const birey = durum.mod === 'birey';
      const natal = [];
      for (let i = 0; i < (birey ? 1 : 2); i++) {
        const k = durum.kisiler[i];
        const yer = await S.yerBul(k.yer);
        if (!yer) throw new Error(`${birey ? 'Doğum yeriniz' : `${i + 1}. kişinin doğum yeri`} bulunamadı: "${k.yer}". Lütfen il ya da şehir adını yazıp listeden seçin.`);
        const zaman = S.yereldenUtc(k.tarih, k.saat, yer.bolge);
        natal.push({ yer, zaman, harita: S.haritaHesapla(zaman.utc, yer.enlem, yer.boylam) });
      }
      if (birey) {
        const analiz = S.bireyselAnaliz(natal[0].harita, durum.kisiler[0].cinsiyet);
        durum.sonuc = { birey: true, natal, analiz, yorum: S.bireyselYorum(analiz) };
        analiziKaydet(durum.kisiler[0]);
        durum.hata = '';
        setTimeout(() => goster('birey'), Math.max(0, 1800 - (Date.now() - baslangic)));
        return;
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
      durum.sonuc.iliski = S.iliskiYorumu(durum.sonuc.kompozit, durum.sonuc.davison);
      durum.sonuc.karmik = S.karmikAnaliz(h1, h2, durum.sonuc.davison);
      durum.sonuc.vedik = S.vedikAnaliz(h1, h2, durum.kisiler.map((k) => k.cinsiyet));
      durum.sonuc.karma = S.karmaYorumu(durum.sonuc.karmik, durum.sonuc.vedik, durum.kisiler);
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

  // Uyum bölümü ücretsizdir: tüm paragraflar açık
  function uyumKarti(b) {
    return `
      <article class="uyum-kart yuzey" id="u-${b.id}">
        <header class="kart-bas">
          <span class="amblem" aria-hidden="true">${glif(b.glif)}</span>
          <h3>${b.ad}</h3>
          <p class="yuzde" aria-label="yüzde ${b.yuzde}"><small>%</small>${b.yuzde}</p>
        </header>
        <div class="cubuk" aria-hidden="true"><span style="width:${b.yuzde}%"></span></div>
        <div class="yorum">${paragraflar([...b.ucretsiz, ...b.ucretli])}</div>
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

  function iliskiKarti(b) {
    const ucretli = b.ucretli.length ? `<div class="yorum">${paragraflar(b.ucretli)}</div>` : '';
    return `
      <article class="uyum-kart yuzey" id="i-${b.id}">
        <header class="kart-bas ${b.pro ? '' : 'kart-bas-yuzdesiz'}">
          <span class="amblem" aria-hidden="true">${glif(b.glif)}</span>
          <h3>${b.soru}</h3>
          ${b.pro ? '<span class="rozet rozet-pro">Pro plan</span>' : ''}
        </header>
        <div class="yorum">${paragraflar(b.ucretsiz)}</div>
        ${kilitli(ucretli)}
      </article>`;
  }

  function iliskiPaneli() {
    return durum.sonuc.iliski.map(iliskiKarti).join('');
  }

  // ---------- Sonuç: Karmik bağ ----------

  function karmaOzeti() {
    const k = durum.sonuc.karma;
    const gunaYuzde = Math.round((k.guna / 36) * 100);
    return `
      <article class="bolum-kart yuzey karma-ozet">
        <p class="etiket">Karmik bağ</p>
        <h3>Ruhunuzun haritası</h3>
        <p class="aciklama">Doğum haritalarınızın ardındaki ruhsal katman: geçmişten gelen izler, kader noktaları ve vedik gelenekte Ay yıldızlarınız.</p>
        <div class="karma-sayilar">
          <div>
            <p class="yuzde" aria-label="yüzde ${k.tanisiklik}"><small>%</small>${k.tanisiklik}</p>
            <p class="karma-sayi-ad">Ruhsal tanışıklık</p>
            <div class="cubuk" aria-hidden="true"><span style="width:${k.tanisiklik}%"></span></div>
          </div>
          <div>
            <p class="yuzde" aria-label="36 üzerinden ${k.guna}">${String(k.guna).replace('.', ',')}<small class="karma-bolu">/36</small></p>
            <p class="karma-sayi-ad">Vedik evlilik uyumu</p>
            <div class="cubuk" aria-hidden="true"><span style="width:${gunaYuzde}%"></span></div>
          </div>
        </div>
      </article>`;
  }

  function karmaPaneli() {
    return karmaOzeti() + durum.sonuc.karma.basliklar.map(iliskiKarti).join('');
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
          <p class="meta"><span>Burç ve derece birlikte geçerli olan açılar. Orb en fazla 10°. En tam açı en üstte.</span></p>
        </header>
        <ul class="aci-listesi">${acilar}</ul>
      </article>`;
  }

  function nedenlerKarti() {
    const basliklar = durum.sonuc.yorum.basliklar.map((b) => `
      <section class="neden-grubu">
        <h4>${b.ad} <span>%${b.yuzde}</span></h4>
        ${b.cekirdekVar ? '' : '<p class="meta"><span>Bu başlığın temel teması aranızda yok ya da çok geniş (8°\'den fazla). Yüzde bu yüzden sınırlı tutuldu.</span></p>'}
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

  // ---------- Harita bilgileri: karmik katman ----------

  function drakonikKartlari() {
    const k = durum.sonuc.karmik;
    const kisi = (i) => `
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">Drakonik</p>
          <h3>${ilgi(i)} drakonik haritası</h3>
          <div class="meta"><span>Kuzey Ay Düğümü 0° Koç'a alınır: tüm noktalar ${S.dereceYaz(k.drakonik[i].kayma)} geri kaydırılır</span><span>Ev sistemi: ${k.drakonik[i].evSistemi}</span></div>
        </header>
        ${noktaTablosu(k.drakonik[i])}
      </article>`;
    const dav = k.drakonikDavison;
    return `
      ${kisi(0)}
      ${kisi(1)}
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">Drakonik Davison</p>
          <h3>İlişkinin ruhsal haritası</h3>
          <div class="meta"><span>Davison haritası, Davison Kuzey Ay Düğümü 0° Koç olacak biçimde ${S.dereceYaz(dav.kayma)} geri kaydırıldı</span></div>
        </header>
        ${noktaTablosu(dav)}
      </article>`;
  }

  const RUH_SIRASI = ['kuzeyDugum', 'guneyDugum', 'vertex', 'karaAy', 'talih', 'ruh', 'evlilik'];

  function ruhNoktaTablosu(i) {
    const h = durum.sonuc.natal[i].harita;
    const ruh = { kuzeyDugum: h.gezegenler.kuzeyDugum, ...durum.sonuc.karmik.ruh[i] };
    const satir = (n) => {
      const kisa = n.glif.length > 1;
      return `
        <tr>
          <td class="t-glif ${kisa ? 'kisa' : ''}" aria-hidden="true">${kisa ? n.glif : glif(n.glif)}</td>
          <td class="t-ad">${n.ad}</td>
          <td class="t-konum">${S.dereceYaz(n.derece)} ${n.burc.ad}<small>${n.burc.element} · ${n.burc.nitelik}</small></td>
          <td class="t-ev">${n.ev}. ev</td>
        </tr>`;
    };
    return `
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">Ruh noktaları</p>
          <h3>${ilgi(i)} karmik noktaları</h3>
          <div class="meta"><span>Vertex: ilk dikey ile ekliptiğin batı kesişimi · Kara Ay: ortalama Lilith</span><span>Kısmetler: ${S.derinAnaliz(h).sekt.gunduz ? 'gündüz' : 'gece'} haritası formülüyle</span></div>
        </header>
        <div class="tablo-sar">
          <table class="nokta-tablosu">
            <thead><tr><th></th><th>Nokta</th><th>Burç ve derece</th><th style="text-align:right">Ev</th></tr></thead>
            <tbody>${RUH_SIRASI.map((a) => satir(ruh[a])).join('')}</tbody>
          </table>
        </div>
      </article>`;
  }

  const KARMIK_GRUPLAR = [
    ['drakonik', 'Drakonik sinastri', 'Bir kişinin drakonik noktası × diğerinin doğum haritası (kavuşum ≤ 3°, karşıt ≤ 2°)'],
    ['drakonikCift', 'Drakonik × drakonik', 'İki drakonik haritanın kavuşumları (≤ 3°)'],
    ['guneyDugum', 'Güney Ay Düğümü', 'Kavuşum ≤ 5°'],
    ['kuzeyDugum', 'Kuzey Ay Düğümü', 'Kavuşum ≤ 5°'],
    ['vertex', 'Vertex', 'Kavuşum ≤ 3°'],
    ['saturn', 'Satürn', 'Kişisel noktalara açılar (≤ 6°)'],
    ['pluton', 'Plüton', 'Kişisel noktalara açılar (≤ 5°)'],
    ['karaAy', 'Kara Ay', 'Kavuşum ≤ 3°'],
    ['kismet', 'Kısmetler', 'Talih, Ruh ve Evlilik Kısmeti ile kavuşum (≤ 3°)'],
  ];

  // nedenSatiri metni kendisi kaçışladığı için adlar burada ham kullanılır
  function karmikNeden(t) {
    const kim = window.Turkce.ek(durum.kisiler[t.kim].ad, 'in');
    const digeri = window.Turkce.ek(durum.kisiler[t.digeri].ad, 'in');
    const ton = ['saturn', 'pluton', 'karaAy'].includes(t.tur) ? 'yogun' : 'arti';
    const orb = S.dereceYaz(t.orb);
    if (t.tur === 'drakonik') return { isaret: t.karsit ? '☍' : '☌', metin: `${kim} drakonik ${t.a.ad} – ${digeri} ${t.b.iyelik}`, alt: t.karsit ? 'Karşıt' : 'Kavuşum', orb, ton };
    if (t.tur === 'drakonikCift') return { isaret: '☌', metin: `${kim} drakonik ${t.a.ad} – ${digeri} drakonik ${t.b.ad}`, alt: 'Kavuşum', orb, ton };
    if (t.tur === 'saturn' || t.tur === 'pluton') return { isaret: t.aci.glif, metin: `${kim} ${t.a.iyelik} – ${digeri} ${t.b.iyelik}`, alt: t.aci.ad, orb, ton };
    const hedef = t.tur === 'kismet' ? S.NOKTALAR[t.kismet].ad : t.tur === 'kuzeyDugum' ? 'Kuzey Ay Düğümü' : S.NOKTALAR[t.tur].iyelik;
    return { isaret: '☌', metin: `${kim} ${t.a.iyelik} – ${digeri} ${hedef}`, alt: 'Kavuşum', orb, ton };
  }

  function karmikNoktaKartlari() {
    const temaslar = durum.sonuc.karmik.temaslar;
    const gruplar = KARMIK_GRUPLAR.map(([tur, ad, aciklama]) => {
      const liste = temaslar.filter((t) => t.tur === tur).sort((x, y) => x.orb - y.orb);
      return `
        <section class="neden-grubu">
          <h4>${ad} <span>${liste.length}</span></h4>
          <p class="meta"><span>${aciklama}</span></p>
          ${liste.length ? `<ul class="nedenler">${liste.map((t) => nedenSatiri(karmikNeden(t))).join('')}</ul>` : '<p class="meta"><span>Temas yok.</span></p>'}
        </section>`;
    }).join('');
    return `
      ${ruhNoktaTablosu(0)}
      ${ruhNoktaTablosu(1)}
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">Karmik temaslar</p>
          <h3>Aranızdaki karmik izler</h3>
          <div class="meta"><span>Ruhsal tanışıklık %${durum.sonuc.karma.tanisiklik}: düğüm, Vertex, drakonik ve kısmet temaslarının ağırlıklı toplamından</span></div>
        </header>
        ${gruplar}
      </article>`;
  }

  const VEDIK_SIRA = ['yukselen', 'gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn', 'rahu', 'ketu'];
  const VEDIK_ADLAR = { yukselen: ['Lagna', 'AC'], rahu: ['Rahu (Kuzey Düğüm)', '☊'], ketu: ['Ketu (Güney Düğüm)', '☋'] };
  const KARAKA = (anahtar) => S.NOKTALAR[anahtar].ad;

  function vedikHaritaKarti(i) {
    const v = durum.sonuc.vedik.haritalar[i];
    const satir = (anahtar) => {
      const n = v.noktalar[anahtar];
      const [ad, isaret] = VEDIK_ADLAR[anahtar] || [S.NOKTALAR[anahtar].ad, S.NOKTALAR[anahtar].glif];
      const kisa = isaret.length > 1;
      const rozet = anahtar === v.atmakaraka ? ' <span class="karaka-isareti" title="Atmakaraka">AK</span>' : anahtar === v.darakaraka ? ' <span class="karaka-isareti" title="Darakaraka">DK</span>' : '';
      return `
        <tr>
          <td class="t-glif ${kisa ? 'kisa' : ''}" aria-hidden="true">${kisa ? isaret : glif(isaret)}</td>
          <td class="t-ad">${ad}${rozet}</td>
          <td class="t-konum">${S.dereceYaz(n.derece)} ${S.BURCLAR[n.burc].ad}<small>${S.NAKSATRALAR[n.nakshatra].ad} · ${n.pada}. pada</small></td>
          <td class="t-ev">${n.ev}. ev</td>
        </tr>`;
    };
    const m = v.mangal;
    return `
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">Vedik</p>
          <h3>${ilgi(i)} yıldızsal haritası</h3>
          <div class="meta">
            <span>Yıldızsal zodyak · Lahiri ayanamsası ${S.dereceYaz(v.ayanamsa)} · Lagna'dan tüm burç evleri</span>
            <span>Atmakaraka (AK): ${KARAKA(v.atmakaraka)} · Darakaraka (DK): ${KARAKA(v.darakaraka)}</span>
            <span>Mars Lagna'dan ${m.marsLagna}., Ay'dan ${m.marsAy}. evde · Mangal Doşa: ${m.lagnadan && m.aydan ? 'var' : 'yok'}</span>
          </div>
        </header>
        <div class="tablo-sar">
          <table class="nokta-tablosu">
            <thead><tr><th></th><th>Nokta</th><th>Burç ve nakşatra</th><th style="text-align:right">Ev</th></tr></thead>
            <tbody>${VEDIK_SIRA.map(satir).join('')}</tbody>
          </table>
        </div>
      </article>`;
  }

  function vedikKartlari() {
    const kuta = durum.sonuc.vedik.kuta;
    const a = kuta.ayrinti;
    const ikili = (x) => `${kac(durum.kisiler[0].ad)}: ${x[0]} · ${kac(durum.kisiler[1].ad)}: ${x[1]}`;
    const AYRINTI = {
      varna: ikili(a.varnalar),
      vasya: ikili(a.vasyalar),
      tara: ikili(a.nakshatralar.map((n) => n.ad)),
      yoni: ikili(a.yoniler),
      maitri: ikili([0, 1].map((i) => KARAKA(S.BURCLAR[durum.sonuc.vedik.haritalar[i].noktalar.ay.burc].yonetici))),
      gana: ikili(a.ganalar),
      bhakut: `Ay burçları arası ${a.bhakutSayi}/${((14 - a.bhakutSayi) % 12) || 12} ilişkisi`,
      nadi: ikili(a.nadiler),
    };
    const satir = (k) => `
      <li class="neden ton-${k.puan >= k.en * 0.75 ? 'arti' : k.puan <= k.en * 0.25 ? 'eksi' : 'yogun'}">
        <span class="neden-isaret" aria-hidden="true"><span class="ev-no">${k.en}</span></span>
        <span class="neden-metin">${k.ad}: ${k.konu}<small>${AYRINTI[k.id]}</small></span>
        <span class="neden-orb">${String(k.puan).replace('.', ',')}/${k.en}</span>
      </li>`;
    return `
      ${vedikHaritaKarti(0)}
      ${vedikHaritaKarti(1)}
      <article class="harita-kart yuzey">
        <header class="harita-bas">
          <p class="etiket">Aştakuta (Guna Milan)</p>
          <h3>Vedik evlilik uyumu: ${String(kuta.toplam).replace('.', ',')}/36</h3>
          <div class="meta"><span>Ay nakşatralarından sekiz başlık. Karşı cins çiftlerde Varna ve Vaşya geleneksel yönle, diğer çiftlerde iki yönün yükseğiyle sayılır.</span></div>
        </header>
        <ul class="nedenler">${kuta.kutalar.map(satir).join('')}</ul>
      </article>`;
  }

  function bilgiPaneli() {
    const alt = [`${ilgi(0)} haritası`, `${ilgi(1)} haritası`, 'Aranızdaki açılar', 'Yüzdelerin nedenleri', 'Kompozit', 'Davison', 'Drakonik', 'Karmik noktalar', 'Vedik'];
    const icerik = [natalKarti(0), natalKarti(1), sinastriKarti(), nedenlerKarti(), iliskiHaritasiKarti('kompozit'), iliskiHaritasiKarti('davison'), drakonikKartlari(), karmikNoktaKartlari(), vedikKartlari()];
    return `
      <div class="alt-sekmeler" role="group" aria-label="Harita bilgileri">
        ${alt.map((s, n) => `<button type="button" data-alt-sekme="${n}" aria-pressed="${durum.altSekme === n}">${s}</button>`).join('')}
      </div>
      ${icerik.map((c, n) => `<div class="alt-panel" data-alt-panel="${n}" ${durum.altSekme === n ? '' : 'hidden'}>${c}</div>`).join('')}`;
  }

  // ---------- Soru sor ----------

  function soruKutusu() {
    const sorulan = durum.sorulanSoru;
    const govde = sorulan
      ? `
        <blockquote class="sorulan-soru">${kac(sorulan)}</blockquote>
        <p class="aciklama">Sorunuz kaydedildi. Cevaplama çok yakında açılıyor; cevabınız ikinizin haritasına göre hazırlanıp burada görünecek.</p>
        <button type="button" class="dugme-ana" data-pro>Daha fazla soru için Pro ${KILIT_SIMGESI}</button>`
      : `
        <p class="aciklama">İlişkinizle ilgili merak ettiğiniz bir şeyi yazın; cevap ikinizin haritasına göre hazırlanır.</p>
        <form id="soru-formu" class="soru-formu" novalidate>
          <label class="gizli" for="soru-metni">Sorunuz</label>
          <textarea id="soru-metni" rows="3" maxlength="300" placeholder="Örneğin: Bu ilişkide en çok neye dikkat etmeliyiz?"></textarea>
          <p class="form-hata" role="alert" hidden></p>
          <button type="submit" class="dugme-ana">Soruyu gönder <span class="ok">→</span></button>
        </form>`;
    return `
      <section class="soru-kutusu yuzey" aria-labelledby="soru-baslik">
        <div class="baslik-satiri">
          <h3 id="soru-baslik">Bir soru sorun</h3>
          <span class="rozet ${sorulan ? 'rozet-pro' : ''}">${sorulan ? 'Pro' : '1 ücretsiz'}</span>
        </div>
        ${govde}
        <p class="soru-notu">İlk soru ücretsizdir. Daha fazla soru için Pro üyelik gerekir.</p>
      </section>`;
  }

  function soruGonder(olay) {
    olay.preventDefault();
    const metin = document.getElementById('soru-metni');
    const soru = metin.value.trim();
    if (soru.length < 5) {
      const kutu = kok.querySelector('.soru-formu .form-hata');
      kutu.textContent = 'Lütfen sorunuzu yazın.';
      kutu.hidden = false;
      metin.setAttribute('aria-invalid', 'true');
      metin.focus();
      return;
    }
    durum.sorulanSoru = soru;
    try { localStorage.setItem(SORU_ANAHTARI, soru); } catch { /* depolama kapalı */ }
    const eski = kok.querySelector('.soru-kutusu');
    eski.outerHTML = soruKutusu();
    kok.querySelector('.soru-kutusu [data-pro]')?.focus();
  }

  // ---------- Bireysel ilişki analizi ----------

  function bireyEkrani() {
    const k = durum.kisiler[0];
    const a = durum.sonuc.analiz;
    const satir = (etiket, n) => `<li><span>${etiket}</span><b>${glif(n.glif)} ${n.burc.ad}</b></li>`;
    const ES_ETIKETI = { kadin: ['Eşte aranan', 'Çekim'], erkek: ['Eşte aranan', 'Çekim'], belirtilmedi: ['Sevme biçimi', 'Arzu'] }[a.cinsiyet];
    return `
      <section class="ekran sonuc birey-sonuc">
        ${location.hash === '#test' ? '<p class="test-bandi">Test modu · tüm kilitler açık</p>' : ''}
        ${ustCubuk()}
        <button type="button" class="geri" data-git="form">← Bilgileri değiştir</button>
        <header class="gece sonuc-bas">
          <canvas class="gece-yildizlar" aria-hidden="true"></canvas>
          ${cark()}
          <p class="etiket">İlişki analizi</p>
          <div>
            <h1 tabindex="-1">${kac(k.ad)}</h1>
            <p class="cift-bilgi">${kac(cinsiyetAdi(k.cinsiyet))} · ${tarihYaz(k.tarih)} ${kac(k.saat)}</p>
          </div>
          <ul class="birey-ozet">
            ${satir(ES_ETIKETI[0], a.es)}
            ${satir(ES_ETIKETI[1], a.cekim)}
            <li><span>7. ev</span><b>${S.BURCLAR[a.yedinci.burc].ad}</b></li>
            <li><span>7. evin yöneticisi</span><b>${glif(a.yonetici.nokta.glif)} ${a.yonetici.nokta.ev}. ev</b></li>
          </ul>
        </header>
        ${k.yaklasik ? '<p class="uyari">Doğum saati yaklaşık girildi: 7. ev ve yöneticisi kayabilir.</p>' : ''}
        ${durum.sonuc.yorum.filter((y) => !y.pro).map(iliskiKarti).join('')}
        <div class="bolum-ayraci">
          <p class="etiket">Derin analiz · Pro plan</p>
          <p class="aciklama">Ev türetme tekniğiyle partnerinizin görünümü, mesleği, ailesi ve maddi durumu.</p>
        </div>
        ${durum.sonuc.yorum.filter((y) => y.pro).map(iliskiKarti).join('')}
        <details class="acilir birey-harita">
          <summary>Harita bilgileri</summary>
          ${natalKarti(0)}
        </details>
        ${altBilgi()}
      </section>`;
  }

  // ---------- Sonuç ekranı ----------

  const SEKMELER = [
    { ad: 'Uyum', panel: uyumPaneli },
    { ad: 'İlişki yapısı', panel: iliskiPaneli },
    { ad: 'Karmik bağ', panel: karmaPaneli },
    { ad: 'Gelecek', panel: gelecekPaneli },
    { ad: 'Harita bilgileri', panel: bilgiPaneli },
  ];

  function sonucEkrani() {
    const [a, b] = durum.kisiler.map((k) => kac(k.ad));
    const y = durum.sonuc.yorum;
    return `
      <section class="ekran sonuc">
        ${location.hash === '#test' ? '<p class="test-bandi">Test modu · tüm kilitler açık</p>' : ''}
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
        ${soruKutusu()}
        ${altBilgi()}
      </section>`;
  }

  // ---------- Alt perde (tam rapor, dil, profil) ----------

  const PERDELER = {
    rapor: {
      baslik: 'Tam rapor çok yakında',
      metin: 'Ödeme sistemi eklendiğinde tam raporu buradan açabileceksiniz. Tam rapor, ilişki yapısının yedi başlığının tamamını ve önümüzdeki 12 ayın gelecek öngörüsünü içerir.',
    },
    pro: {
      baslik: 'Pro üyelik çok yakında',
      metin: 'Ücretsiz soru hakkınızı kullandınız. Pro üyelikle ilişkiniz hakkında dilediğiniz kadar soru sorabileceksiniz. Ödeme sistemi eklendiğinde üyeliği buradan başlatabileceksiniz.',
    },
    proAnaliz: {
      baslik: 'Pro plan ile sınırsız analiz',
      metin: 'Üyeliğinizle bir ilişki analizi ücretsizdir ve bu hakkı kullandınız. Kendi analizinizi aynı doğum bilgileriyle istediğiniz zaman yeniden açabilirsiniz. Farklı kişiler için analiz yapmak Pro plan ile mümkün olacak. Ödeme sistemi eklendiğinde Pro planı buradan başlatabileceksiniz.',
    },
    dil: {
      baslik: 'Dil',
      metin: 'Diğer diller, yorum metinlerinin çevirisi tamamlandığında açılacak.',
      liste: true,
    },
    profil: {
      baslik: 'Hesabınız',
      metin: 'Üyelik çok yakında: üye olarak haritalarınızı saklayabilecek ve raporlarınıza dilediğiniz zaman ulaşabileceksiniz.',
    },
  };

  const DILLER = [
    { kod: 'tr', ad: 'Türkçe', yon: 'ltr' },
    { kod: 'en', ad: 'English', yon: 'ltr' },
    { kod: 'de', ad: 'Deutsch', yon: 'ltr' },
    { kod: 'fr', ad: 'Français', yon: 'ltr' },
    { kod: 'es', ad: 'Español', yon: 'ltr' },
    { kod: 'ru', ad: 'Русский', yon: 'ltr' },
    { kod: 'ar', ad: 'العربية', yon: 'rtl' },
  ];

  const perde = document.createElement('div');
  perde.className = 'perde';
  perde.hidden = true;
  perde.innerHTML = `
    <div class="perde-arka" data-kapat></div>
    <div class="perde-kutu" role="dialog" aria-modal="true" aria-labelledby="perde-baslik">
      <h2 id="perde-baslik" tabindex="-1"></h2>
      <ul class="dil-listesi" hidden>
        ${DILLER.map((d) => `<li lang="${d.kod}" dir="${d.yon}"><span>${d.ad}</span><small lang="tr" dir="ltr">${d.kod === 'tr' ? 'Seçili' : 'Hazırlanıyor'}</small></li>`).join('')}
      </ul>
      <p class="perde-metin"></p>
      <button type="button" class="dugme-ana" data-kapat>Tamam <span class="ok">✓</span></button>
    </div>`;
  document.body.appendChild(perde);
  let perdeyiAcan = null;

  function perdeAc(dugme, tur) {
    perdeyiAcan = dugme;
    perde.querySelector('h2').textContent = PERDELER[tur].baslik;
    perde.querySelector('.perde-metin').textContent = PERDELER[tur].metin;
    perde.querySelector('.dil-listesi').hidden = !PERDELER[tur].liste;
    perde.hidden = false;
    perde.querySelector('h2').focus();
  }
  function perdeKapat() {
    perde.hidden = true;
    perdeyiAcan?.focus();
  }

  // ---------- Ekran geçişleri ----------

  const EKRANLAR = { giris: girisEkrani, form: formEkrani, yukleniyor: yukleniyorEkrani, sonuc: sonucEkrani, birey: bireyEkrani };

  function goster(ekran) {
    if ((ekran === 'sonuc' && (!durum.sonuc || durum.sonuc.birey)) || (ekran === 'birey' && !durum.sonuc?.birey)) ekran = 'form';
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
    const hedef = olay.target.closest('[data-git], [data-sekme], [data-alt-sekme], [data-kilit], [data-pro], [data-dil], [data-profil], [data-kapat], [data-kaydir]');
    if (!hedef) return;
    if (hedef.dataset.git) {
      olay.preventDefault();
      if (hedef.dataset.mod) durum.mod = hedef.dataset.mod;
      if (hedef.dataset.git !== 'form' || !kok.querySelector('#dogum-formu')) durum.hata = '';
      goster(hedef.dataset.git);
    } else if (hedef.dataset.sekme) sekmeSec(Number(hedef.dataset.sekme));
    else if (hedef.dataset.altSekme) altSekmeSec(Number(hedef.dataset.altSekme));
    else if (hedef.hasAttribute('data-kilit')) perdeAc(hedef, 'rapor');
    else if (hedef.hasAttribute('data-pro')) perdeAc(hedef, 'pro');
    else if (hedef.hasAttribute('data-dil')) perdeAc(hedef, 'dil');
    else if (hedef.hasAttribute('data-profil')) perdeAc(hedef, 'profil');
    else if (hedef.hasAttribute('data-kapat')) perdeKapat();
    else if (hedef.dataset.kaydir) {
      olay.preventDefault();
      document.getElementById(hedef.dataset.kaydir)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // ---------- Doğum yeri öneri listesi ----------

  function onerileriGoster(girdi) {
    const liste = document.getElementById(girdi.getAttribute('aria-controls'));
    const sonuclar = S.sehirAra(girdi.value);
    liste.innerHTML = sonuclar.map((s, n) => `
      <li role="option" id="${liste.id}-${n}" data-oneri="${kac(s.etiket)}" aria-selected="false">
        <span>${kac(s.ad)}</span><small>${kac(s.ulke)}</small>
      </li>`).join('');
    liste.hidden = !sonuclar.length;
    girdi.setAttribute('aria-expanded', String(!liste.hidden));
    girdi.removeAttribute('aria-activedescendant');
  }

  function onerileriKapat(girdi) {
    const liste = document.getElementById(girdi.getAttribute('aria-controls'));
    if (liste) liste.hidden = true;
    girdi.setAttribute('aria-expanded', 'false');
    girdi.removeAttribute('aria-activedescendant');
  }

  function oneriSec(li) {
    const liste = li.closest('.oneriler');
    const girdi = document.querySelector(`[aria-controls="${liste.id}"]`);
    girdi.value = li.dataset.oneri;
    girdi.setAttribute('aria-invalid', 'false');
    onerileriKapat(girdi);
  }

  // Dokunma ve tıklama: listeden seçim, kutunun odağını kaybetmeden önce yakalanır
  document.addEventListener('pointerdown', (olay) => {
    const li = olay.target.closest('[data-oneri]');
    if (li) { olay.preventDefault(); oneriSec(li); }
  });

  document.addEventListener('keydown', (olay) => {
    const girdi = olay.target;
    if (girdi.getAttribute?.('role') !== 'combobox') return;
    const liste = document.getElementById(girdi.getAttribute('aria-controls'));
    if (liste.hidden) return;
    const ogeler = [...liste.querySelectorAll('[role="option"]')];
    const simdiki = ogeler.findIndex((o) => o.getAttribute('aria-selected') === 'true');
    if (olay.key === 'ArrowDown' || olay.key === 'ArrowUp') {
      olay.preventDefault();
      const yeni = olay.key === 'ArrowDown' ? Math.min(ogeler.length - 1, simdiki + 1) : Math.max(0, simdiki - 1);
      ogeler.forEach((o, n) => o.setAttribute('aria-selected', String(n === yeni)));
      girdi.setAttribute('aria-activedescendant', ogeler[yeni].id);
      ogeler[yeni].scrollIntoView({ block: 'nearest' });
    } else if (olay.key === 'Enter' && simdiki >= 0) {
      olay.preventDefault();
      oneriSec(ogeler[simdiki]);
    } else if (olay.key === 'Escape') {
      onerileriKapat(girdi);
    }
  });

  document.addEventListener('focusout', (olay) => {
    if (olay.target.getAttribute?.('role') === 'combobox') onerileriKapat(olay.target);
  });

  document.addEventListener('input', (olay) => {
    const id = olay.target.id ?? '';
    if (id.startsWith('tarih-')) olay.target.value = tarihMaskesi(olay.target.value);
    else if (id.startsWith('saat-')) olay.target.value = saatMaskesi(olay.target.value);
    else if (id.startsWith('yer-')) onerileriGoster(olay.target);
    else if (id === 'soru-metni') {
      olay.target.removeAttribute('aria-invalid');
      kok.querySelector('.soru-formu .form-hata').hidden = true;
    }
  });

  document.addEventListener('change', (olay) => {
    const m = olay.target.id?.match(/^yaklasik-(\d)$/);
    if (m) document.getElementById(`uyari-${m[1]}`).hidden = !olay.target.checked;
    const c = olay.target.name?.match(/^cinsiyet-(\d)$/);
    if (c) document.getElementById(`cinsiyet-${c[1]}`).classList.remove('hatali');
  });

  document.addEventListener('submit', (olay) => {
    if (olay.target.id === 'dogum-formu') formuGonder(olay);
    else if (olay.target.id === 'soru-formu') soruGonder(olay);
  });

  document.addEventListener('keydown', (olay) => {
    if (olay.key === 'Escape' && !perde.hidden) perdeKapat();
  });

  goster(location.hash === '#form' ? 'form' : 'giris');
})();
