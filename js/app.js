// Astroship arayüzü: ekranları (giriş, form, hesaplanıyor, sonuç) çizer ve aralarında geçiş yapar.
// Sonuç ekranındaki tüm konumlar ve açılar js/motor içindeki gerçek hesaptan gelir.
(() => {
  'use strict';

  const S = window.Astroship;
  const kok = document.getElementById('uygulama');

  const BOS_KISI = () => ({ ad: '', cinsiyet: '', tarih: '', saat: '', yer: '', yaklasik: false });
  const durum = { kisiler: [BOS_KISI(), BOS_KISI()], sonuc: null, sekme: 0, hata: '' };

  document.documentElement.lang = 'tr';

  // ---------- Yardımcılar ----------

  const kac = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

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
  const utcSaat = (d) => `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
  const utcTarih = (d) => `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${d.getUTCFullYear()}`;
  const koordinat = (enlem, boylam) => `${S.dereceYaz(Math.abs(enlem))} ${enlem >= 0 ? 'K' : 'G'}, ${S.dereceYaz(Math.abs(boylam))} ${boylam >= 0 ? 'D' : 'B'}`;

  const LOGO = `
    <div class="logo">
      <svg viewBox="0 0 34 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9.5" stroke="#c4426f" stroke-width="1.4"/>
        <circle cx="23" cy="11" r="9.5" stroke="#6b4fc4" stroke-width="1.4"/>
      </svg>
      <span class="logo-yazi"><span class="logo-slogan">Love is gonna save us</span><span class="logo-ad">Astroship</span></span>
    </div>`;

  const altBilgi = () => `
    <footer class="alt-bilgi">
      <p>Astroship eğlence amaçlıdır. Önemli kararlarınızı yalnızca bu rapora dayandırmayın.</p>
      <p>Doğum bilgileriniz cihazınızda işlenir ve hiçbir yere kaydedilmez.</p>
    </footer>`;

  // ---------- Giriş ----------

  function girisEkrani() {
    return `
      <section class="ekran giris">
        <header class="giris-ust">${LOGO}<span class="etiket">Sinastri<br>Kompozit · Davison</span></header>

        <div class="diskler" aria-hidden="true">
          <span class="disk disk-1">sen</span>
          <span class="disk disk-2">o</span>
          <span class="disk-ortak">&amp;</span>
        </div>

        <h1 tabindex="-1">Yıldızlarınız <em>aynı dili</em> konuşuyor mu?</h1>
        <p class="giris-metin">İki doğum haritasını derece derece karşılaştırıyor, aranızdaki çekimi ölçüyor ve ilişkinizin kendi haritasını çıkarıyoruz.</p>
        <button type="button" class="dugme-ana" data-git="form">Uyumunuza bakın <span class="ok">→</span></button>
        <p class="kucuk-not">Yaklaşık 1 dakika · Bilgileriniz kaydedilmez</p>

        <ol class="icerik-listesi cam">
          <li><span class="bolum-no">I</span><div><h3>Sinastri</h3><p>İki haritanın burç, element ve derece olarak karşılaştırılması; tutku, bağlanma, iletişim ve daha fazlası.</p></div></li>
          <li><span class="bolum-no">II</span><div><h3>İlişki haritası</h3><p>Kompozit ve Davison haritalarıyla ilişkinin nasıl başlayacağı, nereden beslendiği ve nerede sınanacağı.</p></div></li>
          <li><span class="bolum-no">III</span><div><h3>Zamanlama</h3><p>Önümüzdeki 12 ayın güçlü dönemleri.</p></div></li>
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
          <p class="aciklama">Yükselen burç ve evler için doğum saati gerekli. Saatinizi doğum belgenizde ya da e-Devlet'teki nüfus kaydınızda bulabilirsiniz.</p>
        </div>
        <form id="dogum-formu" novalidate>
          ${kisiAlanlari(0)}
          ${kisiAlanlari(1)}
          <datalist id="sehirler">${window.ASTROSHIP_SEHIRLER.map((s) => `<option value="${kac(s.ad)}"></option>`).join('')}</datalist>
          <p class="form-hata" role="alert" ${durum.hata ? '' : 'hidden'}>${kac(durum.hata)}</p>
          <button type="submit" class="dugme-ana">Haritaları hesapla <span class="ok">→</span></button>
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
      const haritalar = [];
      for (let i = 0; i < 2; i++) {
        const k = durum.kisiler[i];
        const yer = await S.yerBul(k.yer);
        if (!yer) throw new Error(`${i + 1}. kişinin doğum yeri bulunamadı: "${k.yer}". İl adını yazmayı deneyin (örneğin İstanbul).`);
        const zaman = S.yereldenUtc(k.tarih, k.saat, yer.bolge);
        haritalar.push({ yer, zaman, harita: S.haritaHesapla(zaman.utc, yer.enlem, yer.boylam) });
      }
      durum.sonuc = { haritalar, sinastri: S.sinastriAcilari(haritalar[0].harita, haritalar[1].harita) };
      durum.hata = '';
      durum.sekme = 0;
      const bekle = Math.max(0, 1400 - (Date.now() - baslangic));
      setTimeout(() => goster('sonuc'), bekle);
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
        <h2 tabindex="-1">Haritalar hesaplanıyor</h2>
        <p class="aciklama">Doğum saatleri dünya saatine çevriliyor, gezegen konumları ve evler hesaplanıyor.</p>
      </section>`;
  }

  // ---------- Sonuç ----------

  const ACI_TURU = { kavusum: 'kavusum', altmislik: 'uyumlu', ucgen: 'uyumlu', kare: 'gergin', karsit: 'gergin', quincunx: 'gergin' };

  function noktaSatiri(n) {
    const kisaGlif = n.glif.length > 1;
    return `
      <tr>
        <td class="t-glif ${kisaGlif ? 'kisa' : ''}" aria-hidden="true">${kisaGlif ? n.glif : glif(n.glif)}</td>
        <td class="t-ad">${n.ad}${n.geri ? '<span class="geri-isareti" title="Geri hareket">R</span>' : ''}</td>
        <td class="t-konum">${S.dereceYaz(n.derece)} ${n.burc.ad}<small>${n.burc.element} · ${n.burc.nitelik}</small></td>
        <td class="t-ev">${n.anahtar === 'yukselen' ? '1' : n.anahtar === 'mc' ? '10' : n.ev}. ev</td>
      </tr>`;
  }

  const ELEMENTLER = ['ateş', 'toprak', 'hava', 'su'];
  const NITELIKLER = ['öncü', 'sabit', 'değişken'];

  function elementDagilimi(harita) {
    const sayilan = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptun', 'pluton', 'yukselen'];
    const say = (ozellik, deger) => sayilan.filter((a) => harita.gezegenler[a].burc[ozellik] === deger).length;
    return `
      <div>
        <div class="element-dagilimi">${ELEMENTLER.map((e) => `<div><b>${say('element', e)}</b><span>${e}</span></div>`).join('')}</div>
        <p class="nitelik-satiri" style="margin-top:.5rem">${NITELIKLER.map((n) => `${n} ${say('nitelik', n)}`).join(' · ')}</p>
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

  function haritaKarti(i) {
    const { yer, zaman, harita } = durum.sonuc.haritalar[i];
    const k = durum.kisiler[i];
    const g = harita.gezegenler;
    const sira = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptun', 'pluton', 'kuzeyDugum', 'yukselen', 'mc'];
    const icAcilar = S.haritaAcilari(harita);
    return `
      <article class="harita-kart cam">
        <header class="harita-bas">
          <p class="etiket">${kac(cinsiyetAdi(k.cinsiyet))}</p>
          <h3>${ilgi(i)} doğum haritası</h3>
          <div class="meta">
            <span>${tarihYaz(k.tarih)} ${kac(k.saat)} yerel saat (${zaman.saatFarki}) = ${utcTarih(zaman.utc)} ${utcSaat(zaman.utc)} UTC</span>
            <span>${kac(yer.ad)}${yer.il && yer.il !== yer.ad ? `, ${kac(yer.il)}` : ''}, ${kac(yer.ulke)} · ${koordinat(yer.enlem, yer.boylam)}</span>
            <span>Ev sistemi: ${harita.evSistemi} · Tropikal zodyak · Gerçek düğüm</span>
          </div>
          ${k.yaklasik ? '<p class="uyari" style="margin-top:.4rem">Doğum saati yaklaşık girildi: Yükselen ve ev konumları kayabilir.</p>' : ''}
        </header>
        <dl class="uclu">
          <div><dt>Güneş</dt><dd>${g.gunes.burc.ad}</dd></div>
          <div><dt>Ay</dt><dd>${g.ay.burc.ad}</dd></div>
          <div><dt>Yükselen</dt><dd>${g.yukselen.burc.ad}</dd></div>
        </dl>
        <div class="tablo-sar">
          <table class="nokta-tablosu">
            <thead><tr><th></th><th>Nokta</th><th>Burç ve derece</th><th style="text-align:right">Ev</th></tr></thead>
            <tbody>${sira.map((a) => noktaSatiri(g[a])).join('')}</tbody>
          </table>
        </div>
        ${elementDagilimi(harita)}
        <details class="acilir">
          <summary>Ev girişleri (${harita.evSistemi})</summary>
          <ol class="ev-listesi">${harita.evler.map((e, n) => `<li><b>${n + 1}.</b> ${S.burcBilgisi(e).metin}</li>`).join('')}</ol>
        </details>
        <details class="acilir">
          <summary>Haritadaki açılar (${icAcilar.length})</summary>
          <ul class="aci-listesi">${icAcilar.map(({ a, b, aci }) => aciSatiri(a, b, aci, `${a.ad} – ${b.ad}`)).join('')}</ul>
        </details>
      </article>`;
  }

  // Burçların element ve nitelik ilişkisi
  function burcIliskisiMetni(a, b) {
    const r = S.burcIliskisi(a.indeks, b.indeks);
    const ea = a.burc.element;
    const eb = b.burc.element;
    switch (r.mesafe) {
      case 0: return { aciklama: `Aynı burç: aynı element (${ea}) ve aynı nitelik (${a.burc.nitelik})`, hap: 'Aynı burç', tur: 'notr' };
      case 4: return { aciklama: `Aynı element (${ea}), farklı nitelik`, hap: 'Üçgen burçlar', tur: 'uyumlu' };
      case 2: return { aciklama: `Uyumlu elementler (${ea} – ${eb})`, hap: 'Altmışlık burçlar', tur: 'uyumlu' };
      case 6: return { aciklama: `Uyumlu elementler (${ea} – ${eb}), aynı nitelik (${a.burc.nitelik}): tamamlayıcı ama zıt`, hap: 'Karşıt burçlar', tur: 'gergin' };
      case 3: return { aciklama: `Aynı nitelik (${a.burc.nitelik}), uyumsuz elementler (${ea} – ${eb})`, hap: 'Kare burçlar', tur: 'gergin' };
      default: return { aciklama: `Ortak element ya da nitelik yok (${ea} – ${eb})`, hap: r.mesafe === 1 ? 'Komşu burçlar' : 'Quincunx burçlar', tur: 'notr' };
    }
  }

  function sinastriPaneli() {
    const [h1, h2] = durum.sonuc.haritalar.map((h) => h.harita.gezegenler);
    const ciftler = [
      [h1.gunes, h2.gunes], [h1.ay, h2.ay], [h1.gunes, h2.ay], [h1.ay, h2.gunes],
      [h1.venus, h2.mars], [h1.mars, h2.venus], [h1.venus, h2.venus], [h1.yukselen, h2.yukselen],
    ];
    const uyum = ciftler.map(([a, b]) => {
      const r = burcIliskisiMetni(a, b);
      return `
        <li>
          <div>${ilgi(0)} ${a.iyelik} ${a.burc.ad} · ${ilgi(1)} ${b.iyelik} ${b.burc.ad}<small>${r.aciklama}</small></div>
          <span class="hap ${r.tur}">${r.hap}</span>
        </li>`;
    }).join('');
    const acilar = durum.sonuc.sinastri.map(({ a, b, aci }) => aciSatiri(a, b, aci, `${ilgi(0)} ${a.iyelik} – ${ilgi(1)} ${b.iyelik}`)).join('');
    return `
      <article class="harita-kart cam">
        <header class="harita-bas">
          <p class="etiket">Element ve nitelik</p>
          <h3>Burç uyumu</h3>
        </header>
        <ul class="burc-uyumu">${uyum}</ul>
      </article>
      <article class="harita-kart cam">
        <header class="harita-bas">
          <p class="etiket">Sinastri</p>
          <h3>Aranızdaki açılar</h3>
          <p class="aciklama" style="font-size:var(--boy-s)">Açılar hem burç hem derece olarak geçerli olanlardır; orb en fazla 10°. En tam açı en üstte.</p>
        </header>
        <ul class="lejant">
          <li class="tur-uyumlu"><i></i>Uyumlu</li>
          <li class="tur-gergin"><i></i>Gergin</li>
          <li class="tur-kavusum"><i></i>Kavuşum</li>
        </ul>
        <ul class="aci-listesi">${acilar}</ul>
      </article>`;
  }

  function sonucEkrani() {
    const [a, b] = durum.kisiler.map((k) => kac(k.ad));
    const sekmeler = [`${ilgi(0)} haritası`, `${ilgi(1)} haritası`, 'Aranızda'];
    const paneller = [haritaKarti(0), haritaKarti(1), sinastriPaneli()];
    return `
      <section class="ekran sonuc">
        <div class="ust-cubuk"><button type="button" class="geri" data-git="form">← Bilgileri değiştir</button>${LOGO}</div>
        <header class="sonuc-baslik">
          <p class="etiket">Doğum haritaları</p>
          <h1 tabindex="-1">${a} <em>&amp;</em> ${b}</h1>
          <p class="cift-bilgi">${kac(cinsiyetAdi(durum.kisiler[0].cinsiyet))} · ${kac(cinsiyetAdi(durum.kisiler[1].cinsiyet))}</p>
        </header>
        <div class="bilgi-kutusu cam">
          <strong>Konumlar gerçek hesaptır</strong>
          <p>Gezegenler, Yükselen ve evler girdiğiniz bilgilerle hesaplandı. Haritanızı astro.com'daki haritanızla (Placidus, gerçek düğüm) karşılaştırabilirsiniz. Uyum yüzdeleri ve yorumlar bir sonraki adımda eklenecek.</p>
        </div>
        <div class="sekme-cubugu cam" role="tablist" aria-label="Harita seçimi">
          ${sekmeler.map((s, n) => `<button type="button" role="tab" id="sekme-${n}" aria-controls="panel-${n}" aria-selected="${durum.sekme === n}" data-sekme="${n}">${s}</button>`).join('')}
        </div>
        ${paneller.map((p, n) => `<div class="panel" role="tabpanel" id="panel-${n}" aria-labelledby="sekme-${n}" ${durum.sekme === n ? '' : 'hidden'}>${p}</div>`).join('')}
        ${altBilgi()}
      </section>`;
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

  document.addEventListener('click', (olay) => {
    const hedef = olay.target.closest('[data-git], [data-sekme]');
    if (!hedef) return;
    if (hedef.dataset.git) {
      if (hedef.dataset.git === 'form' && kok.querySelector('#dogum-formu') === null) durum.hata = '';
      goster(hedef.dataset.git);
    } else {
      sekmeSec(Number(hedef.dataset.sekme));
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

  goster(location.hash === '#form' ? 'form' : 'giris');
})();
