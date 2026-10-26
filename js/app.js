// Astroship arayüzü: ekranları (giriş, form, hesaplanıyor, sonuç) çizer ve aralarında geçiş yapar.
// Şimdilik sonuç ekranı ORNEK_SONUC verisini gösterir; hesaplama motoru eklendiğinde aynı yapıyı üretecek.
(() => {
  'use strict';

  const ORNEK = window.ORNEK_SONUC;
  const kok = document.getElementById('uygulama');

  const durum = {
    // Test anahtarı: adresin sonuna #test eklenince tüm kilitli bölümler açılır
    kilitAcik: location.hash === '#test',
    kisiler: ORNEK.ornekForm.map((k) => ({ ...k })),
    zamanlayicilar: [],
  };

  document.documentElement.lang = 'tr';

  // ---------- Yardımcılar ----------

  const kac = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // Gezegen ve açı sembolleri: iPhone'da emoji gibi görünmesinler diye metin biçimi seçicisi (U+FE0E) eklenir
  const glif = (html) => html.replace(/([☀-⛿□△])︎?/g, '<span class="g">$1︎</span>');

  // {A}, {B:in} gibi yer tutucuları isim + doğru Türkçe ekle değiştirir
  const doldur = (metin) => glif(kac(metin).replace(/\{([AB])(?::(\w+))?\}/g, (_, kim, tur) => {
    const ad = durum.kisiler[kim === 'A' ? 0 : 1].ad;
    return kac(tur ? window.Turkce.ek(ad, tur) : ad);
  }));

  const paragraflar = (liste) => liste.map((p) => `<p>${doldur(p)}</p>`).join('');

  const KILIT_SIMGESI = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.6" stroke="currentColor" stroke-width="1.4"/><path d="M5.3 7V5.2a2.7 2.7 0 0 1 5.4 0V7" stroke="currentColor" stroke-width="1.4"/></svg>';

  // Ücretli içerik: kilit kapalıyken bulanık önizleme + "Devamını oku", açıkken düz metin
  function kilitli(icerik, dugmeMetni = 'Devamını oku') {
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
        <header class="marka">
          <span class="marka-ad">Astroship</span>
          <span class="etiket">Sinastri · Kompozit · Davison</span>
        </header>

        <div class="kahraman">
          <svg class="yorunge" viewBox="0 0 320 190" fill="none" aria-hidden="true">
            <g stroke="currentColor">
              <circle cx="122" cy="95" r="80" stroke-width="1" />
              <circle cx="122" cy="95" r="72" stroke-width="5" stroke-opacity=".45" stroke-dasharray="0.6 5.683" />
              <circle cx="122" cy="95" r="44" stroke-width="1" stroke-opacity=".25" />
              <circle cx="198" cy="95" r="80" stroke-width="1" />
              <circle cx="198" cy="95" r="72" stroke-width="5" stroke-opacity=".45" stroke-dasharray="0.6 5.683" />
              <circle cx="198" cy="95" r="44" stroke-width="1" stroke-opacity=".25" />
              <line x1="172.2" y1="66" x2="143.5" y2="114.8" stroke-width="1" stroke-opacity=".7" stroke-dasharray="2 3" />
            </g>
            <g fill="currentColor">
              <circle cx="172.2" cy="66" r="2.6" /><circle cx="77.6" cy="57.7" r="2.6" /><circle cx="102.2" cy="149.5" r="2.6" />
              <circle cx="217.8" cy="40.5" r="2.6" /><circle cx="143.5" cy="114.8" r="2.6" /><circle cx="235.3" cy="139.4" r="2.6" />
              <path d="M160 82l2.6 10.4L173 95l-10.4 2.6L160 108l-2.6-10.4L147 95l10.4-2.6z" />
            </g>
            <text x="108" y="103" text-anchor="middle">☉︎</text>
            <text x="212" y="103" text-anchor="middle">☽︎</text>
          </svg>

          <h1 tabindex="-1">İki harita,<br><em>tek gökyüzü.</em></h1>
          <p class="giris-metin">Doğum bilgilerinizi girin. İki haritayı karşılaştıralım, aranızdaki çekimi yüzdelerle ölçelim ve ilişkinizin kendi haritasını çıkaralım.</p>
          <button type="button" class="dugme-ana" data-git="form">Uyumumuza bakalım</button>
          <p class="kucuk-not">Yaklaşık 1 dakika · Bilgileriniz kaydedilmez</p>
        </div>

        <ol class="icerik-listesi">
          <li><span class="bolum-no">I</span><div><h3>Sinastri</h3><p>Tutku, bağlanma, iletişim ve dört başlık daha. Her yüzde, onu oluşturan açılar ve ev yerleşimleriyle birlikte.</p></div></li>
          <li><span class="bolum-no">II</span><div><h3>İlişki haritası</h3><p>Kompozit ve Davison haritalarıyla ilişkinin nasıl başlayacağı, nereden beslendiği ve nerede sınanacağı.</p></div></li>
          <li><span class="bolum-no">III</span><div><h3>Zamanlama</h3><p>Önümüzdeki 12 ayın güçlü dönemleri: ilişki ne zaman başlar, ne zaman derinleşir.</p></div></li>
        </ol>
        ${altBilgi()}
      </section>`;
  }

  // ---------- Form ----------

  const ORNEK_SEHIRLER = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Kayseri', 'Eskişehir', 'Samsun', 'Trabzon', 'Diyarbakır', 'Mersin', 'Berlin', 'Köln', 'Amsterdam', 'Londra'];

  function kisiAlanlari(i) {
    const k = durum.kisiler[i];
    return `
      <fieldset class="kisi">
        <legend class="etiket">${i + 1}. kişi</legend>
        <div class="alan">
          <label for="ad-${i}">İsim</label>
          <input id="ad-${i}" type="text" autocomplete="off" autocapitalize="words" value="${kac(k.ad)}" placeholder="Örneğin ${i === 0 ? 'Elif' : 'Can'}">
        </div>
        <div class="alan-cift">
          <div class="alan">
            <label for="tarih-${i}">Doğum tarihi</label>
            <input id="tarih-${i}" type="date" min="1900-01-01" max="${new Date().toISOString().slice(0, 10)}" value="${kac(k.tarih)}">
          </div>
          <div class="alan">
            <label for="saat-${i}">Doğum saati</label>
            <input id="saat-${i}" type="time" value="${kac(k.saat)}">
          </div>
        </div>
        <label class="onay"><input id="yaklasik-${i}" type="checkbox" ${k.yaklasik ? 'checked' : ''}> Saatim yaklaşık, tam bilmiyorum</label>
        <p class="uyari" id="uyari-${i}" ${k.yaklasik ? '' : 'hidden'}>Yaklaşık saatte Yükselen burç ve evler kayabilir. Bunlara dayanan yorumlar daha az kesin olur.</p>
        <div class="alan">
          <label for="yer-${i}">Doğum yeri</label>
          <input id="yer-${i}" type="text" list="sehirler" autocomplete="off" value="${kac(k.yer)}" placeholder="Şehir ya da ilçe yazın">
        </div>
      </fieldset>`;
  }

  function formEkrani() {
    const ornekMi = durum.kisiler.every((k, i) => k.ad === ORNEK.ornekForm[i].ad);
    return `
      <section class="ekran form-ekrani">
        <div class="ust-cubuk"><button type="button" class="geri" data-git="giris">‹ Geri</button></div>
        <div class="form-giris">
          <h2 tabindex="-1">Doğum bilgileri</h2>
          <p class="aciklama">Yükselen burç ve evler için doğum saati gerekli. Saatinizi doğum belgenizde ya da e-Devlet'teki nüfus kaydınızda bulabilirsiniz.</p>
        </div>
        ${ornekMi ? '<div class="ornek-bandi"><span>Örnek bilgiler dolduruldu</span><button type="button" data-temizle>Temizle</button></div>' : ''}
        <form id="dogum-formu" novalidate>
          ${kisiAlanlari(0)}
          ${kisiAlanlari(1)}
          <datalist id="sehirler">${ORNEK_SEHIRLER.map((s) => `<option value="${s}"></option>`).join('')}</datalist>
          <p class="form-hata" role="alert" hidden></p>
          <button type="submit" class="dugme-ana">Haritaları hesapla</button>
        </form>
        ${altBilgi()}
      </section>`;
  }

  const ALAN_ADLARI = { ad: 'ismi', tarih: 'doğum tarihi', saat: 'doğum saati', yer: 'doğum yeri' };

  function formuGonder(olay) {
    olay.preventDefault();
    const hatalar = [];
    const yeni = [0, 1].map((i) => {
      const k = {};
      for (const alan of Object.keys(ALAN_ADLARI)) {
        const girdi = document.getElementById(`${alan}-${i}`);
        k[alan] = girdi.value.trim();
        girdi.setAttribute('aria-invalid', k[alan] ? 'false' : 'true');
        if (!k[alan]) hatalar.push(`${i + 1}. kişinin ${ALAN_ADLARI[alan]}`);
      }
      k.yaklasik = document.getElementById(`yaklasik-${i}`).checked;
      return k;
    });

    const hataKutusu = kok.querySelector('.form-hata');
    if (hatalar.length) {
      hataKutusu.textContent = `Eksik bilgi: ${hatalar.join(', ')}. Lütfen doldurup tekrar deneyin.`;
      hataKutusu.hidden = false;
      kok.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    durum.kisiler = yeni;
    goster('yukleniyor');
  }

  // ---------- Hesaplanıyor ----------

  const BURC_GLIFLERI = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

  function zodyakHalkasi() {
    const glifler = BURC_GLIFLERI.map((g, i) => {
      const aci = (i * 30 - 75) * (Math.PI / 180);
      const x = (100 + 82 * Math.cos(aci)).toFixed(1);
      const y = (100 + 82 * Math.sin(aci) + 5).toFixed(1);
      return `<text x="${x}" y="${y}" text-anchor="middle">${g}︎</text>`;
    }).join('');
    const cizgiler = Array.from({ length: 12 }, (_, i) => {
      const aci = (i * 30 - 90) * (Math.PI / 180);
      const c = Math.cos(aci); const s = Math.sin(aci);
      return `<line x1="${(100 + 68 * c).toFixed(1)}" y1="${(100 + 68 * s).toFixed(1)}" x2="${(100 + 96 * c).toFixed(1)}" y2="${(100 + 96 * s).toFixed(1)}" />`;
    }).join('');
    return `
      <svg viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <g stroke="currentColor" stroke-width="1">
          <circle cx="100" cy="100" r="96" stroke-opacity=".8" />
          <circle cx="100" cy="100" r="68" stroke-opacity=".5" />
          <circle cx="100" cy="100" r="92" stroke-width="4" stroke-opacity=".35" stroke-dasharray="0.5 1.106" />
          <g stroke-opacity=".3">${cizgiler}</g>
        </g>
        ${glifler}
      </svg>`;
  }

  const HESAP_ADIMLARI = [
    'Doğum saatleri dünya saatine (UTC) çevriliyor',
    'İki doğum haritası hesaplanıyor',
    'Sinastri açıları ve ev yerleşimleri bulunuyor',
    'Kompozit orta noktalar alınıyor',
    'Davison anı ve yeri hesaplanıyor',
  ];

  function yukleniyorEkrani() {
    const [a, b] = durum.kisiler.map((k) => kac(k.ad.charAt(0).toLocaleUpperCase('tr')));
    return `
      <section class="ekran yukleniyor" aria-live="polite">
        <div class="zodyak">${zodyakHalkasi()}<div class="zodyak-merkez">${a} &amp; ${b}</div></div>
        <h2 tabindex="-1">Haritalar hesaplanıyor</h2>
        <ol class="adimlar">${HESAP_ADIMLARI.map((m) => `<li>${m}</li>`).join('')}</ol>
      </section>`;
  }

  function yukleniyorBagla() {
    const adimlar = kok.querySelectorAll('.adimlar li');
    adimlar.forEach((li, i) => {
      durum.zamanlayicilar.push(setTimeout(() => li.classList.add('bitti'), 550 * (i + 1)));
    });
    durum.zamanlayicilar.push(setTimeout(() => goster('sonuc'), 550 * adimlar.length + 700));
  }

  // ---------- Sonuç ----------

  function genelHalka(yuzde) {
    const r = 52;
    const cevre = 2 * Math.PI * r;
    const dolu = (cevre * yuzde) / 100;
    return `
      <svg class="halka" viewBox="0 0 120 120" role="img" aria-label="Genel uyum yüzde ${yuzde}">
        <circle class="halka-iz" cx="60" cy="60" r="${r}" fill="none" stroke-width="5" />
        <circle class="halka-dolu" cx="60" cy="60" r="${r}" fill="none" stroke-width="5" stroke-linecap="round"
          stroke-dasharray="${dolu.toFixed(2)} ${cevre.toFixed(2)}" transform="rotate(-90 60 60)" />
        <text x="60" y="71" text-anchor="middle"><tspan class="halka-yuzde" dy="-14">%</tspan><tspan class="halka-sayi" dy="14">${yuzde}</tspan></text>
      </svg>`;
  }

  function ucluKart(i) {
    const k = durum.kisiler[i];
    const u = ORNEK.ucluler[i];
    return `
      <div class="uclu">
        <p class="uclu-ad">${kac(k.ad)}</p>
        <dl>
          <div><dt>${glif('☉')}<span class="gizli">Güneş</span></dt><dd>${u.gunes}</dd></div>
          <div><dt>${glif('☽')}<span class="gizli">Ay</span></dt><dd>${u.ay}</dd></div>
          <div><dt>AC<span class="gizli"> Yükselen</span></dt><dd>${u.yukselen}</dd></div>
        </dl>
      </div>`;
  }

  function nedenSatiri(n) {
    const isaret = n.tur === 'ev'
      ? `<span class="ev-no" aria-label="${n.isaret}. ev">${n.isaret}</span>`
      : glif(n.isaret);
    return `
      <li class="neden ton-${n.ton}">
        <span class="neden-isaret" aria-hidden="true">${isaret}</span>
        <span class="neden-metin">${doldur(n.metin)}</span>
        <span class="neden-orb">${n.orb || ''}</span>
      </li>`;
  }

  function sinastriKarti(b) {
    const acik = b.nedenler.slice(0, 2);
    const kapali = b.nedenler.slice(2);
    const ucretliKisim = `
      ${kapali.length ? `<ul class="nedenler">${kapali.map(nedenSatiri).join('')}</ul>` : ''}
      <div class="yorum">${paragraflar(b.ucretli)}</div>`;
    return `
      <article class="kart sinastri-kart" id="s-${b.id}">
        <header class="kart-bas">
          <span class="kart-glif" aria-hidden="true">${glif(b.glif)}</span>
          <h3>${b.baslik}</h3>
          <p class="yuzde" aria-label="yüzde ${b.yuzde}"><small>%</small>${b.yuzde}</p>
        </header>
        <div class="cubuk" aria-hidden="true"><span style="width:${b.yuzde}%"></span></div>
        <h4 class="etiket">Nedenleri</h4>
        <ul class="nedenler">${acik.map(nedenSatiri).join('')}</ul>
        <div class="yorum">${paragraflar(b.ucretsiz)}</div>
        ${kilitli(ucretliKisim)}
      </article>`;
  }

  function iliskiKarti(b) {
    return `
      <article class="kart iliski-kart" id="i-${b.id}">
        <p class="etiket">${b.kaynak}</p>
        <h3>${b.soru}</h3>
        <dl class="gostergeler">
          ${b.gostergeler.map(([ad, deger]) => `<div><dt>${kac(ad)}</dt><dd>${glif(kac(deger))}</dd></div>`).join('')}
        </dl>
        <div class="yorum">${paragraflar(b.ucretsiz)}</div>
        ${kilitli(`<div class="yorum">${paragraflar(b.ucretli)}</div>`)}
      </article>`;
  }

  function zamanlamaKarti(z) {
    const cizelge = `
      <ol class="zaman-cizelgesi">
        ${z.donemler.map((d) => `
          <li>
            <span class="zaman-tarih">${d.tarih}</span>
            <span class="zaman-baslik">${d.baslik}</span>
            <p>${doldur(d.metin)}</p>
          </li>`).join('')}
      </ol>`;
    return `
      <article class="kart">
        <h3>İlişki ne zaman başlar?</h3>
        <p class="aciklama">${doldur(z.ozet)}</p>
        ${kilitli(cizelge, 'Zamanlamayı aç')}
      </article>`;
  }

  function sonucEkrani() {
    const [a, b] = durum.kisiler.map((k) => kac(k.ad));
    return `
      <section class="ekran sonuc">
        ${durum.kilitAcik ? '<p class="test-bandi">Test modu · tüm kilitler açık</p>' : ''}
        <div class="ust-cubuk">
          <button type="button" class="geri" data-git="form">‹ Bilgileri değiştir</button>
          <span class="cip-ornek">Örnek sonuç</span>
        </div>

        <header class="sonuc-baslik">
          <p class="etiket">Sinastri raporu</p>
          <h1 tabindex="-1">${a} <span class="ve">&amp;</span> ${b}</h1>
          <div class="genel">
            ${genelHalka(ORNEK.genelUyum)}
            <div>
              <p class="genel-etiket">Genel uyum</p>
              <p class="genel-aciklama">Yedi sinastri başlığının ağırlıklı ortalaması. Tutku ve bağlanma daha ağır sayılır.</p>
            </div>
          </div>
          <div class="ucluler">${ucluKart(0)}${ucluKart(1)}</div>
        </header>

        <nav class="bolum-gezinti" aria-label="Rapor bölümleri">
          <button type="button" data-bolum="sinastri">Sinastri</button>
          <button type="button" data-bolum="iliski">İlişki haritası</button>
          <button type="button" data-bolum="zamanlama">Zamanlama</button>
        </nav>

        <section class="bolum" id="sinastri">
          <header class="bolum-bas">
            <p class="etiket">Bölüm I</p>
            <h2>Aranızda bir ilişki başlarsa</h2>
            <p>İki doğum haritası karşılaştırıldı. Her yüzdenin altında, onu en çok etkileyen açılar ve ev yerleşimleri yazıyor.</p>
          </header>
          <ul class="lejant">
            <li class="ton-arti"><i></i>Yüzdeyi artırıyor</li>
            <li class="ton-eksi"><i></i>Zorluyor</li>
            <li class="ton-yogun"><i></i>Hem artırıyor hem zorluyor</li>
          </ul>
          ${ORNEK.sinastri.map(sinastriKarti).join('')}
        </section>

        <section class="bolum" id="iliski">
          <header class="bolum-bas">
            <p class="etiket">Bölüm II</p>
            <h2>İlişkinin kendi haritası</h2>
            <p>Kompozit harita iki haritanın orta noktalarından, Davison haritası ise iki doğum anının ve yerinin tam ortasından hesaplanır.</p>
          </header>
          ${ORNEK.iliskiHaritasi.map(iliskiKarti).join('')}
        </section>

        <section class="bolum" id="zamanlama">
          <header class="bolum-bas">
            <p class="etiket">Bölüm III</p>
            <h2>Zamanlama</h2>
            <p>Önümüzdeki 12 ayda gökyüzündeki gezegenlerin ilişki haritalarınıza yaptığı temaslar.</p>
          </header>
          ${zamanlamaKarti(ORNEK.zamanlama)}
        </section>

        ${durum.kilitAcik ? '' : `
        <section class="tam-rapor">
          <h2>Tam rapor</h2>
          <ul>
            <li>Yedi sinastri başlığının tüm nedenleri ve yorumları</li>
            <li>Kompozit ve Davison haritasının altı başlığı eksiksiz</li>
            <li>Önümüzdeki 12 ayın zamanlama takvimi</li>
          </ul>
          <button type="button" class="dugme-ana" data-kilit>Tam raporu aç</button>
        </section>`}
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
      <p>Ödeme sistemi eklendiğinde tam raporu buradan açabileceksiniz. Rapor; yedi sinastri başlığının tüm yorumlarını, ilişki haritasının altı başlığını ve 12 aylık zamanlama takvimini içerir.</p>
      <button type="button" class="dugme-ana" data-kapat>Tamam</button>
    </div>`;
  document.body.appendChild(perde);
  let perdeyiAcanDugme = null;

  function perdeAc(dugme) {
    perdeyiAcanDugme = dugme;
    perde.hidden = false;
    perde.querySelector('h2').focus();
  }
  function perdeKapat() {
    perde.hidden = true;
    perdeyiAcanDugme?.focus();
  }

  // ---------- Ekran geçişleri ----------

  const EKRANLAR = { giris: girisEkrani, form: formEkrani, yukleniyor: yukleniyorEkrani, sonuc: sonucEkrani };
  const BAGLAYICILAR = { yukleniyor: yukleniyorBagla };

  function goster(ekran) {
    durum.zamanlayicilar.forEach(clearTimeout);
    durum.zamanlayicilar = [];
    kok.innerHTML = EKRANLAR[ekran]();
    kok.firstElementChild.classList.add('giriyor');
    window.scrollTo(0, 0);
    BAGLAYICILAR[ekran]?.();
    kok.querySelector('h1, h2')?.focus({ preventScroll: true });
  }

  document.addEventListener('click', (olay) => {
    const hedef = olay.target.closest('[data-git], [data-kilit], [data-kapat], [data-temizle], [data-bolum]');
    if (!hedef) return;
    if (hedef.dataset.git) goster(hedef.dataset.git);
    else if (hedef.hasAttribute('data-kilit')) perdeAc(hedef);
    else if (hedef.hasAttribute('data-kapat')) perdeKapat();
    else if (hedef.hasAttribute('data-bolum')) document.getElementById(hedef.dataset.bolum)?.scrollIntoView({ behavior: 'smooth' });
    else if (hedef.hasAttribute('data-temizle')) {
      durum.kisiler = [0, 1].map(() => ({ ad: '', tarih: '', saat: '', yer: '', yaklasik: false }));
      goster('form');
    }
  });

  document.addEventListener('change', (olay) => {
    const m = olay.target.id?.match(/^yaklasik-(\d)$/);
    if (m) document.getElementById(`uyari-${m[1]}`).hidden = !olay.target.checked;
  });

  document.addEventListener('submit', (olay) => {
    if (olay.target.id === 'dogum-formu') formuGonder(olay);
  });

  document.addEventListener('keydown', (olay) => {
    if (olay.key === 'Escape' && !perde.hidden) perdeKapat();
  });

  // ---------- Yıldızlı arka plan ----------

  function gokyuzu() {
    const tuval = document.getElementById('gokyuzu');
    if (!tuval) return;
    const c = tuval.getContext('2d');
    const hareketsiz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let yildizlar = [];
    let genislik = 0;
    let yukseklik = 0;

    function boyutla() {
      const yeniGenislik = window.innerWidth;
      const yeniYukseklik = Math.max(window.innerHeight, window.screen?.height || 0);
      // Telefonda adres çubuğu açılıp kapanınca yıldızlar yerinden oynamasın
      if (yeniGenislik === genislik && yeniYukseklik <= yukseklik) return;
      genislik = yeniGenislik;
      yukseklik = yeniYukseklik;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      tuval.width = genislik * dpr;
      tuval.height = yukseklik * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      let tohum = 20260214;
      const rastgele = () => (tohum = (tohum * 16807) % 2147483647) / 2147483647;
      const adet = Math.round((genislik * yukseklik) / 5200);
      yildizlar = Array.from({ length: adet }, () => ({
        x: rastgele() * genislik,
        y: rastgele() * yukseklik,
        r: rastgele() < 0.08 ? 1.3 : 0.35 + rastgele() * 0.6,
        faz: rastgele() * Math.PI * 2,
        hiz: 0.3 + rastgele() * 1.1,
        altin: rastgele() < 0.12,
      }));
      if (hareketsiz) ciz(0);
    }

    function ciz(zaman) {
      c.clearRect(0, 0, genislik, yukseklik);
      for (const y of yildizlar) {
        c.globalAlpha = hareketsiz ? 0.6 : 0.4 + 0.4 * Math.sin((zaman / 1000) * y.hiz + y.faz);
        c.fillStyle = y.altin ? '#e9cf91' : '#d9d3f0';
        c.beginPath();
        c.arc(y.x, y.y, y.r, 0, Math.PI * 2);
        c.fill();
      }
      if (!hareketsiz) requestAnimationFrame(ciz);
    }

    boyutla();
    window.addEventListener('resize', boyutla);
    if (!hareketsiz) requestAnimationFrame(ciz);
  }

  // ---------- Başlat ----------

  gokyuzu();
  const ilkEkran = { '#form': 'form', '#sonuc': 'sonuc', '#test': 'sonuc' }[location.hash] || 'giris';
  goster(ilkEkran);
})();
