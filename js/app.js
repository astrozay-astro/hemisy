// Astroship arayüzü: ekranları (giriş, form, hesaplanıyor, sonuç) çizer ve aralarında geçiş yapar.
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
  // Gezegen ve açı sembolleri iPhone'da emoji gibi görünmesin diye metin biçimi seçicisi (U+FE0E) eklenir
  const glif = (s) => `<span class="g">${s}︎</span>`;
  const ilgi = (i) => kac(window.Turkce.ek(durum.kisiler[i].ad, 'in'));

  const CINSIYETLER = [
    { id: 'kadin', ad: 'Kadın' },
    { id: 'erkek', ad: 'Erkek' },
    { id: 'belirtilmedi', ad: 'Belirtmek istemiyorum' },
  ];
  const cinsiyetAdi = (id) => CINSIYETLER.find((c) => c.id === id)?.ad ?? '';

  const tarihYaz = (iso) => iso.split('-').reverse().join('.');
  const iki = (n) => String(n).padStart(2, '0');
  const utcYaz = (d) => `${iki(d.getUTCDate())}.${iki(d.getUTCMonth() + 1)}.${d.getUTCFullYear()} ${iki(d.getUTCHours())}:${iki(d.getUTCMinutes())} UTC`;
  const koordinat = (enlem, boylam) => `${S.dereceYaz(Math.abs(enlem))} ${enlem >= 0 ? 'K' : 'G'}, ${S.dereceYaz(Math.abs(boylam))} ${boylam >= 0 ? 'D' : 'B'}`;

  const LOGO = `
    <div class="logo">
      <svg viewBox="0 0 34 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9.5" stroke="#c4426f" stroke-width="1.4"/>
        <circle cx="23" cy="11" r="9.5" stroke="#6b4fc4" stroke-width="1.4"/>
      </svg>
      <span class="logo-yazi"><span class="logo-slogan">Love is gonna save us</span><span class="logo-ad">Astroship</span></span>
    </div>`;

  const KILIT_SIMGESI = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.6" stroke="currentColor" stroke-width="1.4"/><path d="M5.3 7V5.2a2.7 2.7 0 0 1 5.4 0V7" stroke="currentColor" stroke-width="1.4"/></svg>';

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
      <p>Astroship eğlence amaçlıdır. Önemli kararlarınızı yalnızca bu rapora dayandırmayın.</p>
      <p>Doğum bilgileriniz cihazınızda işlenir ve hiçbir yere kaydedilmez.</p>
    </footer>`;

  // ---------- Giriş ----------

  function girisEkrani() {
    return `
      <section class="ekran giris">
        <header class="giris-ust">${LOGO}</header>

        <div class="diskler" aria-hidden="true">
          <span class="disk disk-1">sen</span>
          <span class="disk disk-2">o</span>
          <span class="disk-ortak">&amp;</span>
        </div>

        <h1 tabindex="-1">Yıldızlarınız <em>aynı dili</em> konuşuyor mu?</h1>
        <p class="giris-metin">Doğum haritalarınızı karşılaştırıyor; aranızdaki çekimi, bağı ve ilişkinizin geleceğini yorumluyoruz.</p>
        <button type="button" class="dugme-ana" data-git="form">Uyumunuza bakın <span class="ok">→</span></button>
        <p class="kucuk-not">Yaklaşık 1 dakika · Bilgileriniz kaydedilmez</p>

        <ol class="icerik-listesi cam">
          <li><span class="bolum-no">I</span><div><h3>Uyum</h3><p>Çekim, bağlanma, iletişim, romantizm, güven ve daha fazlası; her biri yüzde ve yorumla.</p></div></li>
          <li><span class="bolum-no">II</span><div><h3>İlişki yapısı</h3><p>İlişkiniz nasıl başlar, nereden beslenir, hangi konularda sınanır.</p></div></li>
          <li><span class="bolum-no">III</span><div><h3>Gelecek öngörüsü</h3><p>Önümüzdeki 12 ayın güçlü dönemleri: ilişki ne zaman başlar, ne zaman derinleşir.</p></div></li>
        </ol>
        ${altBilgi()}
      </section>`;
  }

  // ---------- Form ----------

  function kisiAlanlari(i) {
    const k = durum.kisiler[i];
    const bugun = new Date().toISOString().slice(0, 10);
    return `
      <fieldset class="kisi cam">
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
            <input id="tarih-${i}" type="date" min="1900-01-01" max="${bugun}" value="${kac(k.tarih)}">
          </div>
          <div class="alan">
            <label for="saat-${i}">Doğum saati</label>
            <input id="saat-${i}" type="time" value="${kac(k.saat)}">
          </div>
        </div>
        <label class="onay"><input id="yaklasik-${i}" type="checkbox" ${k.yaklasik ? 'checked' : ''}> Saatim yaklaşık, tam bilmiyorum</label>
        <p class="uyari" id="uyari-${i}" ${k.yaklasik ? '' : 'hidden'}>Yaklaşık saatte Yükselen burç ve evler kayabilir; bunlara dayanan yorumlar daha az kesin olur.</p>
        <div class="alan">
          <label for="yer-${i}">Doğum yeri</label>
          <input id="yer-${i}" type="text" list="sehirler" autocomplete="off" value="${kac(k.yer)}" placeholder="İl, ilçe ya da şehir">
        </div>
      </fieldset>`;
  }

  function formEkrani() {
    return `
      <section class="ekran form-ekrani">
        <div class="ust-cubuk"><button type="button" class="geri" data-git="giris">← Geri</button>${LOGO}</div>
        <div class="form-giris">
          <h2 tabindex="-1">Doğum bilgileri</h2>
          <p class="aciklama">Doğum saatini olabildiğince doğru girin. Saatinizi doğum belgenizde ya da e-Devlet'teki nüfus kaydınızda bulabilirsiniz.</p>
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

  const ALAN_ADLARI = { ad: 'ismi', tarih: 'doğum tarihi', saat: 'doğum saati', yer: 'doğum yeri' };

  function formuOku() {
    const eksikler = [];
    const kisiler = [0, 1].map((i) => {
      const k = {};
      for (const alan of Object.keys(ALAN_ADLARI)) {
        const girdi = document.getElementById(`${alan}-${i}`);
        k[alan] = girdi.value.trim();
        girdi.setAttribute('aria-invalid', k[alan] ? 'false' : 'true');
        if (!k[alan]) eksikler.push(`${i + 1}. kişinin ${ALAN_ADLARI[alan]}`);
      }
      k.cinsiyet = document.querySelector(`input[name="cinsiyet-${i}"]:checked`)?.value ?? '';
      document.getElementById(`cinsiyet-${i}`).classList.toggle('hatali', !k.cinsiyet);
      if (!k.cinsiyet) eksikler.push(`${i + 1}. kişinin cinsiyeti`);
      k.yaklasik = document.getElementById(`yaklasik-${i}`).checked;
      return k;
    });
    return { kisiler, eksikler };
  }

  function formuGonder(olay) {
    olay.preventDefault();
    const { kisiler, eksikler } = formuOku();
    durum.kisiler = kisiler;
    if (eksikler.length) {
      const kutu = kok.querySelector('.form-hata');
      kutu.textContent = `Eksik bilgi: ${eksikler.join(', ')}.`;
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
      setTimeout(() => goster('sonuc'), Math.max(0, 1600 - (Date.now() - baslangic)));
    } catch (hata) {
      durum.hata = hata.message;
      goster('form');
    }
  }

  function yukleniyorEkrani() {
    return `
      <section class="ekran yukleniyor" aria-live="polite">
        <div class="halka-yukleme" aria-hidden="true">
          <svg viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="52" stroke="rgba(36,22,58,.08)" stroke-width="3"/>
            <circle cx="60" cy="60" r="52" stroke="#c4426f" stroke-width="3" stroke-linecap="round" stroke-dasharray="80 327" />
            <circle cx="60" cy="60" r="52" stroke="#6b4fc4" stroke-width="3" stroke-linecap="round" stroke-dasharray="60 327" stroke-dashoffset="-163" />
          </svg>
          <span class="disk-ortak">&amp;</span>
        </div>
        <h2 tabindex="-1">Yıldızlarınız karşılaştırılıyor</h2>
        <p class="aciklama">Doğum haritalarınız hesaplanıyor ve uyumunuz yorumlanıyor.</p>
      </section>`;
  }

  // ---------- Sonuç: Uyum ----------

  function genelHalka(yuzde) {
    const r = 52;
    const cevre = 2 * Math.PI * r;
    return `
      <svg class="halka" viewBox="0 0 120 120" role="img" aria-label="Genel uyum yüzde ${yuzde}">
        <defs><linearGradient id="halka-renk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c4426f"/><stop offset="1" stop-color="#6b4fc4"/></linearGradient></defs>
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="rgba(36,22,58,.08)" stroke-width="6" />
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="url(#halka-renk)" stroke-width="6" stroke-linecap="round"
          stroke-dasharray="${((cevre * yuzde) / 100).toFixed(2)} ${cevre.toFixed(2)}" transform="rotate(-90 60 60)" />
        <text x="60" y="72" text-anchor="middle" class="halka-sayi"><tspan class="halka-yuzde" dy="-16">%</tspan><tspan dy="16">${yuzde}</tspan></text>
      </svg>`;
  }

  function nedenSatiri(n) {
    return `
      <li class="neden ton-${n.ton}">
        <span class="neden-isaret" aria-hidden="true">${n.ev ? `<span class="ev-no">${n.isaret}</span>` : glif(n.isaret)}</span>
        <span class="neden-metin">${kac(n.metin)}<small>${kac(n.alt)}</small></span>
        <span class="neden-orb">${n.orb ?? ''}</span>
      </li>`;
  }

  const paragraflar = (liste) => liste.map((p) => `<p>${kac(p)}</p>`).join('');

  function uyumKarti(b) {
    const ucretli = b.ucretli.length ? `<div class="yorum">${paragraflar(b.ucretli)}</div>` : '';
    return `
      <article class="uyum-kart cam" id="u-${b.id}">
        <header class="kart-bas">
          <span class="kart-glif" aria-hidden="true">${glif(b.glif)}</span>
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
      <section class="uyum-ozet cam">
        ${genelHalka(y.genel)}
        <div>
          <p class="etiket">Genel uyum</p>
          <p class="ozet-metin">${kac(y.ozet)}</p>
        </div>
      </section>
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
      <article class="bolum-kart cam">
        <p class="etiket">İlişki yapısı</p>
        <h3>İlişkinizin kendi haritası</h3>
        <p class="aciklama">İki doğum haritanızdan ilişkinizin kendi haritası hesaplandı. Bu bölümün yorumları bir sonraki güncellemede eklenecek.</p>
        <ol class="soru-listesi">${ILISKI_SORULARI.map((s) => `<li>${s}</li>`).join('')}</ol>
      </article>`;
  }

  function gelecekPaneli() {
    return `
      <article class="bolum-kart cam">
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
      <article class="harita-kart cam">
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
      <article class="harita-kart cam">
        <header class="harita-bas">
          <p class="etiket">Sinastri</p>
          <h3>Aranızdaki açılar</h3>
          <p class="meta"><span>Burç ve derece birlikte geçerli olan açılar; orb en fazla 10°. En tam açı en üstte.</span></p>
        </header>
        <ul class="aci-listesi">${acilar}</ul>
      </article>`;
  }

  function iliskiHaritasiKarti(tur) {
    const h = durum.sonuc[tur];
    const meta = tur === 'davison'
      ? `<span>Davison anı: ${utcYaz(h.utc)}</span><span>Davison yeri: ${koordinat(h.enlem, h.boylam)}</span>`
      : `<span>Orta noktalar · Yükselen ve evler kompozit MC'den, orta enlem ${S.dereceYaz(Math.abs(h.enlem))} için</span>`;
    return `
      <article class="harita-kart cam">
        <header class="harita-bas">
          <p class="etiket">${tur === 'davison' ? 'Davison' : 'Kompozit'}</p>
          <h3>${tur === 'davison' ? 'Davison haritası' : 'Kompozit harita'}</h3>
          <div class="meta">${meta}<span>Ev sistemi: ${h.evSistemi}</span></div>
        </header>
        ${noktaTablosu(h)}
        ${evVeAcilar(h)}
      </article>`;
  }

  // Her uyum yüzdesini hangi göstergelerin oluşturduğu (en etkili olan en üstte)
  function nedenlerKarti() {
    const basliklar = durum.sonuc.yorum.basliklar.map((b) => `
      <section class="neden-grubu">
        <h4>${b.ad} <span>%${b.yuzde}</span></h4>
        ${b.cekirdekVar ? '' : '<p class="meta"><span>Bu başlığın temel teması aranızda yok ya da çok geniş (8°\'den fazla); yüzde bu yüzden sınırlı tutuldu.</span></p>'}
        ${b.nedenler.length ? `<ul class="nedenler">${b.nedenler.map(nedenSatiri).join('')}</ul>` : '<p class="meta"><span>Belirgin bir gösterge yok.</span></p>'}
      </section>`).join('');
    return `
      <article class="harita-kart cam">
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
    return `
      <section class="ekran sonuc">
        ${durum.kilitAcik ? '<p class="test-bandi">Test modu · tüm kilitler açık</p>' : ''}
        <div class="ust-cubuk"><button type="button" class="geri" data-git="form">← Bilgileri değiştir</button>${LOGO}</div>
        <header class="sonuc-baslik">
          <h1 tabindex="-1">${a} <em>&amp;</em> ${b}</h1>
          <p class="cift-bilgi">${kac(cinsiyetAdi(durum.kisiler[0].cinsiyet))} · ${kac(cinsiyetAdi(durum.kisiler[1].cinsiyet))}</p>
        </header>
        <div class="sekme-cubugu cam" role="tablist" aria-label="Rapor bölümleri">
          ${SEKMELER.map((s, n) => `<button type="button" role="tab" id="sekme-${n}" aria-controls="panel-${n}" aria-selected="${durum.sekme === n}" data-sekme="${n}">${s.ad}</button>`).join('')}
        </div>
        ${SEKMELER.map((s, n) => `<div class="panel" role="tabpanel" id="panel-${n}" aria-labelledby="sekme-${n}" ${durum.sekme === n ? '' : 'hidden'}>${s.panel()}</div>`).join('')}
        ${altBilgi()}
      </section>`;
  }

  // ---------- Ödeme yakında perdesi ----------

  const perde = document.createElement('div');
  perde.className = 'perde';
  perde.hidden = true;
  perde.innerHTML = `
    <div class="perde-arka" data-kapat></div>
    <div class="perde-kutu" role="dialog" aria-modal="true" aria-labelledby="perde-baslik">
      <h2 id="perde-baslik" tabindex="-1">Tam rapor çok yakında</h2>
      <p>Ödeme sistemi eklendiğinde tam raporu buradan açabileceksiniz. Tam rapor; tüm uyum yorumlarını, ilişki yapısını ve gelecek öngörüsünü içerir.</p>
      <button type="button" class="dugme-ana" data-kapat>Tamam <span class="ok">✓</span></button>
    </div>`;
  document.body.appendChild(perde);
  let perdeyiAcan = null;

  function perdeAc(dugme) {
    perdeyiAcan = dugme;
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
    const hedef = olay.target.closest('[data-git], [data-sekme], [data-alt-sekme], [data-kilit], [data-kapat], [data-kaydir]');
    if (!hedef) return;
    if (hedef.dataset.git) {
      if (hedef.dataset.git !== 'form' || !kok.querySelector('#dogum-formu')) durum.hata = '';
      goster(hedef.dataset.git);
    } else if (hedef.dataset.sekme) sekmeSec(Number(hedef.dataset.sekme));
    else if (hedef.dataset.altSekme) altSekmeSec(Number(hedef.dataset.altSekme));
    else if (hedef.hasAttribute('data-kilit')) perdeAc(hedef);
    else if (hedef.hasAttribute('data-kapat')) perdeKapat();
    else if (hedef.dataset.kaydir) {
      olay.preventDefault();
      document.getElementById(hedef.dataset.kaydir)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  });

  document.addEventListener('keydown', (olay) => {
    if (olay.key === 'Escape' && !perde.hidden) perdeKapat();
  });

  goster(location.hash === '#form' ? 'form' : 'giris');
})();
