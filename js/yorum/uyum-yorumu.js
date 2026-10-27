// Uyum yorumlarını kurar: her başlık için en etkili göstergeleri, birbirine bağlaçlarla bağlanan akıcı paragraflar
// hâlinde anlatır. Okuyucuya giden metinlerde teknik bilgi yoktur; teknik "nedenler" listesi yalnızca Harita bilgileri
// sekmesinde gösterilir. Ücretsiz kısım: giriş ve ilk paragraf. Ücretli kısım: kalan paragraflar.
(() => {
  'use strict';

  const S = window.Astroship;
  const M = window.ASTROSHIP_UYUM_METINLERI;
  // Kişilik cümlesi yalnızca o başlıkla ilgili gezegenler için eklenir (ör. iletişimde sadece düşünme biçimi)
  const KISILIK = {
    tutku: ['venus', 'mars'],
    baglanma: ['ay', 'gunes', 'venus'],
    iletisim: ['merkur'],
    romantizm: ['venus', 'gunes'],
    guven: ['gunes', 'ay'],
    huzur: ['mars', 'ay'],
    karmik: [],
  };
  const GOSTERGE_SAYISI = 5;

  const kac = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // {X}, {Y:in}, {N:e} gibi yer tutucuları isim + ekle değiştirir
  function doldur(metin, adlar) {
    return metin.replace(/\{([XYN])(?::(\w+))?\}/g, (_, kim, tur) => {
      const ad = adlar[kim];
      return tur ? window.Turkce.ek(ad, tur) : ad;
    });
  }

  const kucukBasla = (s) => s.charAt(0).toLocaleLowerCase('tr') + s.slice(1);

  function aciTuru(etken) {
    if (etken.aci.id === 'kavusum') return 'k';
    if (etken.aci.id === 'karsit' && (etken.p === 'yukselen' || etken.q === 'yukselen')) return 'alcalan';
    return ['altmislik', 'ucgen'].includes(etken.aci.id) ? 'u' : 'g';
  }

  // "Can aşkta zarafet bekleyebilir. Elif ise arzusunu … gösterebilir."
  function kisilikCumlesi(parcalar) {
    return parcalar.map(({ nokta, ad }, i) => {
      const tanim = M.burcIfadeleri[nokta.anahtar];
      return `${doldur(tanim.kalip.replace('{ise}', i ? ' ise' : '').replace('{ifade}', tanim.ifadeler[nokta.indeks]), { N: ad })}.`;
    }).join(' ');
  }

  // Teknik gösterge satırı (yalnızca Harita bilgileri sekmesi için)
  function nedenSatiri(etken, adlar) {
    const ilgi = (i) => window.Turkce.ek(adlar[i], 'in');
    if (etken.tur === 'aci') {
      return { isaret: etken.aci.glif, metin: `${ilgi(etken.kimP)} ${etken.a.iyelik} – ${ilgi(etken.kimQ)} ${etken.b.iyelik}`, alt: etken.aci.ad, orb: S.dereceYaz(etken.aci.orb), ton: etken.ton };
    }
    if (etken.tur === 'ev') {
      return { isaret: String(etken.ev), ev: true, metin: `${ilgi(etken.kim)} ${etken.a.iyelik}, ${ilgi(etken.evSahibi)} ${etken.ev}. evinde`, alt: 'Ev yerleşimi', ton: etken.ton };
    }
    if (etken.tur === 'kismet') {
      return { isaret: etken.a.glif, metin: `${ilgi(etken.kim)} ${etken.a.iyelik} – ${ilgi(etken.kismetSahibi)} Eros Kısmeti`, alt: 'Kavuşum', orb: S.dereceYaz(etken.orb), ton: etken.ton };
    }
    return { isaret: etken.a.burc.glif, metin: `${ilgi(etken.kimP)} ${etken.a.iyelik} ${etken.a.burc.ad}, ${ilgi(etken.kimQ)} ${etken.b.iyelik} ${etken.b.burc.ad}`, alt: 'Element ve nitelik uyumu (açı yok)', ton: etken.ton };
  }

  // Bir göstergenin paragrafı. isimleBasliyor: metin bir isimle başlıyorsa bağlaçtan sonra küçük harfe çevrilmez.
  // olculu: yoğunluk başlığında yüzde düşük; metin temasın varlığını anlatır ama güçlü çekim iddia etmez
  function etkenParagrafi(etken, adlar, anlatilanlar, ilkMi, baslikId, olculu) {
    const O = olculu ? M.olculu : null;
    let sablon;
    let govde;
    if (etken.tur === 'aci') {
      const metinler = M[baslikId]?.[`${etken.p}-${etken.q}`] ?? M.ciftler[`${etken.p}-${etken.q}`];
      sablon = O?.ciftler[`${etken.p}-${etken.q}`] ?? metinler[aciTuru(etken)] ?? metinler.g;
      govde = doldur(sablon, { X: adlar[etken.kimP], Y: adlar[etken.kimQ] });
      const kisilik = [];
      for (const [nokta, kim] of [[etken.a, etken.kimP], [etken.b, etken.kimQ]]) {
        const anahtar = `${kim}-${nokta.anahtar}`;
        if (!(KISILIK[baslikId] || []).includes(nokta.anahtar) || anlatilanlar.has(anahtar)) continue;
        anlatilanlar.add(anahtar);
        kisilik.push({ nokta, ad: adlar[kim] });
      }
      const ekler = [kisilikCumlesi(kisilik)];
      if (ilkMi && etken.aci.orb < 2 && !olculu) ekler.push(M.gucluTemas);
      govde = [govde, ...ekler].filter(Boolean).join(' ');
    } else if (etken.tur === 'ev') {
      sablon = O?.evler[`${etken.p}-${etken.ev}`] ?? M.evler[`${etken.p}-${etken.ev}`];
      govde = doldur(sablon, { X: adlar[etken.kim], Y: adlar[etken.evSahibi] });
    } else if (etken.tur === 'kismet') {
      sablon = O?.kismetler[`${etken.p}-eros`] ?? M.kismetler[`${etken.p}-eros`];
      govde = doldur(sablon, { X: adlar[etken.kim], Y: adlar[etken.kismetSahibi] });
    } else {
      sablon = M.burcCiftleri[`${etken.p}-${etken.q}`];
      govde = `${doldur(sablon, { X: adlar[etken.kimP], Y: adlar[etken.kimQ] })} ${M.burcIliskileri[etken.iliski.mesafe]}`;
    }
    return { metin: govde, isimleBasliyor: sablon.startsWith('{') };
  }

  function baglacEkle(paragraf, onceki, simdiki, sira) {
    const tur = `${onceki.katki >= 0 ? 'olumlu' : 'zor'}${simdiki.katki >= 0 ? 'Olumlu' : 'Zor'}`;
    const liste = M.baglaclar[tur];
    const baglac = liste[sira % liste.length];
    const devam = paragraf.isimleBasliyor ? paragraf.metin : kucukBasla(paragraf.metin);
    return `${baglac} ${devam}`;
  }

  function baslikYorumu(baslik, adlar) {
    const bant = baslik.yuzde >= 75 ? 0 : baslik.yuzde >= 55 ? 1 : 2;
    const giris = M.bantlar[baslik.id][bant];
    const nedenler = baslik.etkenler.map((e) => nedenSatiri(e, adlar));
    // Yoğunluk başlığında metin yüzdeyle çelişmesin: yüzde düşükse tüm temaslar, ortaysa temel tema
    // dışındaki temaslar ölçülü anlatılır (ör. Venüs–Mars yokken Mars–Plüton "çok güçlü çekim" demez)
    const temel = (e) => e.tur === 'aci' && (baslik.cekirdek || []).includes(`${e.p}-${e.q}`);
    const olculu = (e) => baslik.tur === 'yogunluk' && (bant === 2 || (bant === 1 && !temel(e)));
    // Aynı metne düşen göstergeler (ör. aynı çiftin iki yönü, aynı ev yerleşiminin iki yönü) bir kez anlatılır
    const metinAnahtari = (e) => {
      if (e.tur === 'aci') return `a-${e.p}-${e.q}-${olculu(e) ? 'o' : aciTuru(e)}`;
      if (e.tur === 'ev') return `e-${e.p}-${e.ev}-${olculu(e) ? 'o' : ''}`;
      if (e.tur === 'kismet') return `k-${e.p}-${olculu(e) ? 'o' : ''}`;
      return `b-${e.p}-${e.q}-${e.iliski.mesafe}`;
    };
    const gorulen = new Set();
    const secilen = baslik.etkenler.filter((e) => {
      const k = metinAnahtari(e);
      if (gorulen.has(k)) return false;
      gorulen.add(k);
      return true;
    }).slice(0, GOSTERGE_SAYISI);
    if (!secilen.length) return { ...baslik, nedenler, ucretsiz: [`${giris} ${M.bosBaslik}`], ucretli: [] };

    const anlatilanlar = new Set();
    const paragraflar = secilen.map((e, i) => {
      const p = etkenParagrafi(e, adlar, anlatilanlar, i === 0, baslik.id, olculu(e));
      return i === 0 ? p.metin : baglacEkle(p, secilen[i - 1], e, i);
    });
    return { ...baslik, nedenler, ucretsiz: [`${giris} ${paragraflar[0]}`], ucretli: paragraflar.slice(1) };
  }

  // sonuc: S.uyumHesapla çıktısı; kisiler: [{ ad, cinsiyet }]
  function uyumYorumu(sonuc, kisiler) {
    const adlar = { 0: kisiler[0].ad, 1: kisiler[1].ad };
    const basliklar = sonuc.basliklar.map((b) => baslikYorumu(b, adlar));
    const sirali = [...basliklar].sort((a, b) => b.yuzde - a.yuzde);
    const enIyi = sirali[0];
    const enZor = sirali[sirali.length - 1];
    const ozet = `İlişkinizin en güçlü yanı ${enIyi.ad.toLocaleLowerCase('tr')} olabilir. En çok özen isteyebilecek alanınız ise ${enZor.ad.toLocaleLowerCase('tr')} olabilir.`;
    return { genel: sonuc.genel, ozet, basliklar };
  }

  Object.assign(S, { uyumYorumu, yorumDoldur: doldur, kac });
})();
