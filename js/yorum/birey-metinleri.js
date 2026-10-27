// Bireysel ilişki analizinin yorum metinleri. Rapor kişiye "siz" diye hitap eder.
// Arka plan bilgisi (girişler, "… bulunuyor" cümleleri) kesin dille, yorum olasılık diliyle yazılır.
// Burç dizileri Koç'tan Balık'a, ev dizileri 1. evden 12. eve sıralıdır. Metinlerde noktalı virgül kullanılmaz.
window.ASTROSHIP_BIREY_METINLERI = {
  basliklar: {
    kadin: { es: { soru: 'Eşinizde aradığınız erkek', glif: '☉' }, cekim: { soru: 'Sizi nasıl bir erkek çeker?', glif: '♂' } },
    erkek: { es: { soru: 'Eşinizde aradığınız kadın', glif: '☽' }, cekim: { soru: 'Sizi nasıl bir kadın çeker?', glif: '♀' } },
    belirtilmedi: { es: { soru: 'Nasıl seversiniz?', glif: '♀' }, cekim: { soru: 'Sizi kim çeker?', glif: '♂' } },
    yedinci: { soru: 'Evlilik ve ortaklık alanınız', glif: '☍' },
    yonetici: { soru: 'Partnerinizle nerede karşılaşırsınız?', glif: '☌' },
  },

  girisler: {
    kadin: {
      es: 'Klasik astrolojide bir kadının haritasında Güneş, hayatına girecek erkeğin ve eşinde aradığı niteliklerin göstergesidir.',
      cekim: 'Mars, bir kadının haritasında çekim duyduğu erkek tipini ve arzunun nasıl uyandığını gösterir.',
    },
    erkek: {
      es: 'Klasik astrolojide bir erkeğin haritasında Ay, eşinde aradığı kadını, yuvayı ve duygusal güveni gösterir.',
      cekim: 'Venüs, bir erkeğin haritasında çekim duyduğu kadını ve aşkta neyi güzel bulduğunu gösterir.',
    },
    belirtilmedi: {
      es: 'Venüs, bir haritada sevme biçimini, aşkta neyi güzel bulduğunuzu ve nasıl sevilmek istediğinizi gösterir.',
      cekim: 'Mars, bir haritada arzuyu, sizi kimin harekete geçirdiğini ve tutkunuzun nasıl uyandığını gösterir.',
    },
    yedinci: 'Yedinci ev, haritada evliliğin, ortaklığın ve karşınıza çıkan kişinin evidir. Girişindeki burç eşte karşılaştığınız nitelikleri, içindeki gezegenler ise bu alana yerleşmiş temaları anlatır.',
    yonetici: 'Yedinci evin yöneticisi, evlilik konusunun hayatınızın hangi alanında harekete geçtiğini gösterir. Bulunduğu ev, partnerinizle nerede karşılaşabileceğinizi ve ilişkinin nereye aktığını anlatır.',
  },

  // Gezegenin konumu (kesin bilgi), yorumdan önce gelir
  konumKalip: '{Gezegen} haritanızda {burcDe} ve {ev}. evinizde bulunuyor.',

  // ----- Kadın haritası -----
  kadinGunes: [
    'Eşinizde cesur, girişken ve kararlı bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek ilk adımı atan, hızlı karar veren ve sizi koruyan biri olabilir. Sabırsızlığı ise zaman zaman yorucu gelebilir.',
    'Eşinizde sakin, güvenilir ve sözünün eri bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek size maddi ve duygusal bir güven sunan, acele etmeyen biri olabilir. İnatçılığı ise zaman zaman sizi zorlayabilir.',
    'Eşinizde zeki, konuşkan ve meraklı bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek sizi sohbetiyle etkileyen, esprili ve hareketli biri olabilir. Kararsızlığı ise zaman zaman güvensizlik yaratabilir.',
    'Eşinizde şefkatli, ailesine bağlı ve koruyucu bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek yuva kurmayı önemseyen, duygusal biri olabilir. Alınganlığı ise zaman zaman aranıza mesafe koyabilir.',
    'Eşinizde cömert, kendinden emin ve gururlu bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek sizi jestleriyle şımartan, ilgi odağı olmayı seven biri olabilir. Gururu ise zaman zaman tartışmalara yol açabilir.',
    'Eşinizde çalışkan, düzenli ve ayrıntıya özen gösteren bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek sevgisini yaptığı işlerle ve küçük yardımlarla gösteren biri olabilir. Eleştirel tavrı ise zaman zaman kırıcı gelebilir.',
    'Eşinizde nazik, zarif ve adil bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek ilişkiyi önemseyen, uyum arayan ve estetiğe değer veren biri olabilir. Kararsızlığı ise zaman zaman sizi bekletebilir.',
    'Eşinizde derin, tutkulu ve sadık bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek güçlü bir varlığı olan, duygularını kolay göstermeyen ama bağlandığında tam bağlanan biri olabilir. Kıskançlığı ise zaman zaman ilişkiyi zorlayabilir.',
    'Eşinizde özgür ruhlu, iyimser ve ufku geniş bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek yolculuğu, öğrenmeyi ve macerayı seven biri olabilir. Bağlanmaktan kaçınması ise zaman zaman sizi belirsizlikte bırakabilir.',
    'Eşinizde ciddi, sorumluluk sahibi ve hedefleri olan bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek güven veren, yaşından olgun ya da kariyerinde güçlü biri olabilir. Mesafeli tavrı ise zaman zaman soğuk gelebilir.',
    'Eşinizde bağımsız, özgün ve dostça bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek önce arkadaşınız olan, sıra dışı fikirleri olan biri olabilir. Duygusal mesafesi ise zaman zaman sizi yalnız hissettirebilir.',
    'Eşinizde duyarlı, romantik ve şefkatli bir erkek arıyor gibi görünüyorsunuz. Hayatınıza giren erkek sanata, müziğe ya da maneviyata yakın, sezgileri güçlü biri olabilir. Belirsizliği ise zaman zaman sizi yorabilir.',
  ],
  kadinMars: [
    'Sizi atılgan, sportif ve dolaysız erkekler çekiyor gibi görünüyor. Arzunuz hızlı uyanabilir ve açıkça gösterilen bir ilgi sizi kolayca etkileyebilir.',
    'Sizi sakin, güçlü ve tensel erkekler çekiyor gibi görünüyor. Arzunuz yavaş ama derinden uyanabilir. Dokunuş ve güven sizin için çekimin anahtarı olabilir.',
    'Sizi zeki, esprili ve konuşkan erkekler çekiyor gibi görünüyor. Arzunuz sohbetle ve zihinsel bir oyunla uyanabilir.',
    'Sizi koruyucu, duygusal ve sıcak erkekler çekiyor gibi görünüyor. Arzunuz güven duyduğunuzda ve kendinizi evinizde hissettiğinizde uyanabilir.',
    'Sizi kendinden emin, karizmatik ve cömert erkekler çekiyor gibi görünüyor. Arzunuz hayranlık duyduğunuzda ve size gösterilen ilgiyle uyanabilir.',
    'Sizi becerikli, düzenli ve bakımlı erkekler çekiyor gibi görünüyor. Arzunuz özenle ve sizi gerçekten fark eden küçük ilgilerle uyanabilir.',
    'Sizi zarif, kibar ve şık erkekler çekiyor gibi görünüyor. Arzunuz romantik bir ortamda ve incelikli bir flörtle uyanabilir.',
    'Sizi gizemli, yoğun ve güçlü bakışlı erkekler çekiyor gibi görünüyor. Arzunuz derin bir bağ ve tam bir güven hissiyle uyanabilir.',
    'Sizi maceracı, neşeli ve özgür erkekler çekiyor gibi görünüyor. Arzunuz birlikte keşfettiğinizde ve yeni deneyimlerle uyanabilir.',
    'Sizi olgun, başarılı ve kendine hâkim erkekler çekiyor gibi görünüyor. Arzunuz güvende hissettiğinizde ve karşınızdakinin ciddiyetini gördüğünüzde uyanabilir.',
    'Sizi sıra dışı, özgür düşünceli ve beklenmedik erkekler çekiyor gibi görünüyor. Arzunuz sürpriz ve özgünlükle uyanabilir.',
    'Sizi romantik, hayalperest ve hassas erkekler çekiyor gibi görünüyor. Arzunuz duygusal bir yakınlık ve sezgisel bir bağla uyanabilir.',
  ],

  // ----- Erkek haritası -----
  erkekAy: [
    'Eşinizde enerjik, bağımsız ve cesur bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın kendi kararlarını veren, duygularını dolaysız yaşayan biri olabilir.',
    'Eşinizde sakin, şefkatli ve güven veren bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın size huzurlu ve konforlu bir yuva sunan biri olabilir.',
    'Eşinizde neşeli, konuşkan ve meraklı bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın sizinle her şeyi konuşabilen, hareketli biri olabilir.',
    'Eşinizde şefkatli, koruyucu ve ailesine bağlı bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın sıcak bir yuva kuran, duygusal derinliği olan biri olabilir.',
    'Eşinizde sıcak, gururlu ve kendinden emin bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın ilgi görmeyi seven, cömert ve parlak biri olabilir.',
    'Eşinizde özenli, düzenli ve yardımsever bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın sevgisini gündelik ilgilerle gösteren, pratik biri olabilir.',
    'Eşinizde zarif, uyumlu ve nazik bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın ilişkiye emek veren, huzur ve denge arayan biri olabilir.',
    'Eşinizde derin, tutkulu ve sadık bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın duygularını yoğun yaşayan, güvenini kolay vermeyen ama verdiğinde tam bağlanan biri olabilir.',
    'Eşinizde özgür ruhlu, neşeli ve iyimser bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın yolculuğu, öğrenmeyi ve macerayı seven biri olabilir.',
    'Eşinizde ağırbaşlı, sorumluluk sahibi ve güvenilir bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın duygularını kontrollü yaşayan, hayatı ciddiye alan biri olabilir.',
    'Eşinizde bağımsız, özgün ve dostça bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın önce arkadaşınız olan, kendine alan isteyen biri olabilir.',
    'Eşinizde duyarlı, şefkatli ve sezgisel bir kadın arıyor gibi görünüyorsunuz. Hayatınızdaki kadın romantik, sanata ya da maneviyata yakın biri olabilir.',
  ],
  erkekVenus: [
    'Sizi canlı, girişken ve kendinden emin kadınlar çekiyor gibi görünüyor. Aşkta heyecanı ve ilk kıvılcımı seviyor olabilirsiniz.',
    'Sizi zarif, doğal ve tensel güzelliği olan kadınlar çekiyor gibi görünüyor. Aşkta huzuru, dokunuşu ve sadakati önemsiyor olabilirsiniz.',
    'Sizi zeki, esprili ve hareketli kadınlar çekiyor gibi görünüyor. Aşkta sohbeti, flörtü ve çeşitliliği seviyor olabilirsiniz.',
    'Sizi sıcak, şefkatli ve koruyucu kadınlar çekiyor gibi görünüyor. Aşkta güveni ve yuva sıcaklığını arıyor olabilirsiniz.',
    'Sizi parlak, özgüvenli ve göz alıcı kadınlar çekiyor gibi görünüyor. Aşkta hayranlığı ve gösterişli bir romantizmi seviyor olabilirsiniz.',
    'Sizi sade, bakımlı ve özenli kadınlar çekiyor gibi görünüyor. Aşkta küçük ve somut ilgileri önemsiyor olabilirsiniz.',
    'Sizi şık, nazik ve zarif kadınlar çekiyor gibi görünüyor. Aşkta uyumu, estetiği ve romantik jestleri seviyor olabilirsiniz.',
    'Sizi gizemli, derin ve etkileyici kadınlar çekiyor gibi görünüyor. Aşkta yoğunluğu ve tam bir bağlılığı arıyor olabilirsiniz.',
    'Sizi neşeli, özgür ve maceracı kadınlar çekiyor gibi görünüyor. Aşkta birlikte keşfetmeyi ve özgürlüğü seviyor olabilirsiniz.',
    'Sizi olgun, ağırbaşlı ve hedefleri olan kadınlar çekiyor gibi görünüyor. Aşkta ciddiyeti ve güvenilirliği önemsiyor olabilirsiniz.',
    'Sizi özgün, bağımsız ve sıra dışı kadınlar çekiyor gibi görünüyor. Aşkta dostluğu ve kendinize ait bir alanı önemsiyor olabilirsiniz.',
    'Sizi romantik, duyarlı ve hayalperest kadınlar çekiyor gibi görünüyor. Aşkta koşulsuz ve masalsı bir sevgi arıyor olabilirsiniz.',
  ],

  // ----- Cinsiyet belirtilmemiş -----
  notrVenus: [
    'Aşkta hızlı, coşkulu ve dolaysız seviyor gibi görünüyorsunuz. İlk adımı atmak ve heyecanı canlı tutmak size iyi gelebilir.',
    'Aşkta yavaş, sadık ve tensel seviyor gibi görünüyorsunuz. Güven, dokunuş ve huzur sizin için sevginin temeli olabilir.',
    'Aşkta meraklı, oyunbaz ve konuşkan seviyor gibi görünüyorsunuz. Sohbet ve flört sevginizi canlı tutabilir.',
    'Aşkta şefkatli, koruyucu ve bağlı seviyor gibi görünüyorsunuz. Kendinizi güvende hissettiğinizde sevginiz derinleşebilir.',
    'Aşkta cömert, gururlu ve gösterişli seviyor gibi görünüyorsunuz. Hayranlık ve takdir sizin için sevginin dili olabilir.',
    'Aşkta özenli, sade ve yardımsever seviyor gibi görünüyorsunuz. Sevginizi küçük ve somut ilgilerle gösterebilirsiniz.',
    'Aşkta zarif, uyumlu ve romantik seviyor gibi görünüyorsunuz. Denge, nezaket ve güzellik sizin için sevginin temeli olabilir.',
    'Aşkta derin, yoğun ve sadık seviyor gibi görünüyorsunuz. Yarım bir bağ yerine tam bir yakınlık arayabilirsiniz.',
    'Aşkta özgür, iyimser ve maceracı seviyor gibi görünüyorsunuz. Birlikte keşfetmek sevginizi büyütebilir.',
    'Aşkta ciddi, sorumlu ve kalıcı seviyor gibi görünüyorsunuz. Zamanla kazanılan güven sizin için sevginin temeli olabilir.',
    'Aşkta bağımsız, dostça ve özgün seviyor gibi görünüyorsunuz. Kendinize ait bir alan ve dostluk sevginizi besleyebilir.',
    'Aşkta koşulsuz, romantik ve fedakâr seviyor gibi görünüyorsunuz. Sezgisel ve ruhsal bir bağ sizi derinden etkileyebilir.',
  ],
  notrMars: [
    'Sizi atılgan, cesur ve dolaysız insanlar çekiyor gibi görünüyor. Arzunuz hızlı uyanabilir.',
    'Sizi sakin, güçlü ve tensel insanlar çekiyor gibi görünüyor. Arzunuz yavaş ama derinden uyanabilir.',
    'Sizi zeki, esprili ve konuşkan insanlar çekiyor gibi görünüyor. Arzunuz zihinsel bir oyunla uyanabilir.',
    'Sizi koruyucu, duygusal ve sıcak insanlar çekiyor gibi görünüyor. Arzunuz güven duyduğunuzda uyanabilir.',
    'Sizi kendinden emin ve karizmatik insanlar çekiyor gibi görünüyor. Arzunuz hayranlıkla uyanabilir.',
    'Sizi becerikli, düzenli ve özenli insanlar çekiyor gibi görünüyor. Arzunuz sizi gerçekten fark eden ilgilerle uyanabilir.',
    'Sizi zarif, kibar ve şık insanlar çekiyor gibi görünüyor. Arzunuz incelikli bir flörtle uyanabilir.',
    'Sizi gizemli, yoğun ve güçlü insanlar çekiyor gibi görünüyor. Arzunuz derin bir bağla uyanabilir.',
    'Sizi maceracı, neşeli ve özgür insanlar çekiyor gibi görünüyor. Arzunuz yeni deneyimlerle uyanabilir.',
    'Sizi olgun, başarılı ve kendine hâkim insanlar çekiyor gibi görünüyor. Arzunuz güvende hissettiğinizde uyanabilir.',
    'Sizi sıra dışı ve özgür düşünceli insanlar çekiyor gibi görünüyor. Arzunuz sürpriz ve özgünlükle uyanabilir.',
    'Sizi romantik, hayalperest ve hassas insanlar çekiyor gibi görünüyor. Arzunuz sezgisel bir bağla uyanabilir.',
  ],

  // ----- 7. ev -----
  // Girişindeki burç: önce kesin bilgi, sonra yorum
  yedinciBurc: [
    'Yedinci evinizin girişinde Koç burcu bulunuyor. Karşınıza çıkan partnerler cesur, girişken ve bağımsız kişiler olabilir. İlişkileriniz hızlı başlıyor gibi görünüyor, ama iki güçlü iradenin dengesi emek isteyebilir.',
    'Yedinci evinizin girişinde Boğa burcu bulunuyor. Karşınıza çıkan partnerler sakin, sadık ve güven veren kişiler olabilir. İlişkileriniz yavaş ama sağlam ilerliyor gibi görünüyor, ama değişime direnç zaman zaman sizi zorlayabilir.',
    'Yedinci evinizin girişinde İkizler burcu bulunuyor. Karşınıza çıkan partnerler konuşkan, meraklı ve genç ruhlu kişiler olabilir. İlişkileriniz zihinsel bir uyum üzerine kuruluyor gibi görünüyor, ama tutarlılık konusu gündeme gelebilir.',
    'Yedinci evinizin girişinde Yengeç burcu bulunuyor. Karşınıza çıkan partnerler duygusal, koruyucu ve ailesine bağlı kişiler olabilir. İlişkileriniz bir yuva duygusu etrafında şekilleniyor gibi görünüyor, ama alınganlıklar dikkat isteyebilir.',
    'Yedinci evinizin girişinde Aslan burcu bulunuyor. Karşınıza çıkan partnerler cömert, karizmatik ve gururlu kişiler olabilir. İlişkileriniz tutkulu ve görünür yaşanıyor gibi görünüyor, ama gurur çatışmaları çıkabilir.',
    'Yedinci evinizin girişinde Başak burcu bulunuyor. Karşınıza çıkan partnerler çalışkan, düzenli ve titiz kişiler olabilir. İlişkileriniz karşılıklı destek ve gündelik özen üzerine kuruluyor gibi görünüyor, ama eleştirinin dozu dikkat isteyebilir.',
    'Yedinci evinizin girişinde Terazi burcu bulunuyor. Karşınıza çıkan partnerler nazik, zarif ve uyumlu kişiler olabilir. İlişkiler hayatınızda merkezi bir yer tutuyor gibi görünüyor ve ortaklık size doğal gelebilir.',
    'Yedinci evinizin girişinde Akrep burcu bulunuyor. Karşınıza çıkan partnerler yoğun, tutkulu ve güçlü kişiler olabilir. İlişkileriniz derin ve dönüştürücü yaşanıyor gibi görünüyor, ama güven ve kontrol konuları sınanabilir.',
    'Yedinci evinizin girişinde Yay burcu bulunuyor. Karşınıza çıkan partnerler özgür, iyimser ve farklı bir kültürden ya da şehirden gelen kişiler olabilir. İlişkileriniz birlikte büyümek üzerine kuruluyor gibi görünüyor, ama bağlılık konusu esneklik isteyebilir.',
    'Yedinci evinizin girişinde Oğlak burcu bulunuyor. Karşınıza çıkan partnerler ciddi, olgun ve sorumluluk sahibi, bazen sizden yaşça büyük kişiler olabilir. İlişkileriniz zamanla sağlamlaşıyor gibi görünüyor, ama duygusal sıcaklık emek isteyebilir.',
    'Yedinci evinizin girişinde Kova burcu bulunuyor. Karşınıza çıkan partnerler bağımsız, özgün ve sıra dışı kişiler olabilir. İlişkileriniz arkadaşlık temelinde kuruluyor gibi görünüyor, ama yakınlık ile özgürlük dengesi gündeme gelebilir.',
    'Yedinci evinizin girişinde Balık burcu bulunuyor. Karşınıza çıkan partnerler duyarlı, romantik ve sezgisel kişiler olabilir. İlişkileriniz ruhsal bir bağ üzerine kuruluyor gibi görünüyor, ama idealleştirme ve sınırlar konusu dikkat isteyebilir.',
  ],
  yedincideGezegen: {
    gunes: 'Güneş yedinci evinizde bulunuyor. Kendinizi ilişkiler aracılığıyla buluyor gibi görünüyorsunuz. Hayatınızda güçlü ve parlak bir partner önemli bir yer tutabilir.',
    ay: 'Ay yedinci evinizde bulunuyor. Duygusal güveni bir ilişkide arıyor gibi görünüyorsunuz. Partneriniz size yuva duygusu veren, şefkatli biri olabilir.',
    merkur: 'Merkür yedinci evinizde bulunuyor. İlişkilerinizde iletişim belirleyici görünüyor. Partneriniz konuşabildiğiniz, sizi zihinsel olarak besleyen biri olabilir.',
    venus: 'Venüs yedinci evinizde bulunuyor. Bu, geleneksel olarak ilişki ve evlilik için talihli bir yerleşimdir. Partneriniz çekici, uyumlu ve size iyi gelen biri olabilir.',
    mars: 'Mars yedinci evinizde bulunuyor. İlişkileriniz tutkulu ama tartışmalı yaşanıyor gibi görünüyor. Partneriniz güçlü iradeli ve girişken biri olabilir.',
    jupiter: 'Jüpiter yedinci evinizde bulunuyor. Bu, geleneksel olarak evlilik için koruyucu ve bereketli bir yerleşimdir. Partneriniz cömert, iyimser ya da bilge biri olabilir.',
    saturn: 'Satürn yedinci evinizde bulunuyor. İlişkilere ciddiyetle yaklaşıyor gibi görünüyorsunuz. Evlilik geç ya da olgun bir yaşta gelebilir. Kurduğunuz bağ ise zamanla sağlamlaşabilir.',
    uranus: 'Uranüs yedinci evinizde bulunuyor. İlişkileriniz ani başlayıp beklenmedik dönüşler yapıyor gibi görünüyor. Özgürlüğe alan tanıyan bir partnerle daha mutlu olabilirsiniz.',
    neptun: 'Neptün yedinci evinizde bulunuyor. İlişkilerde romantik ve idealist görünüyorsunuz. Partnerinizi olduğundan farklı görme eğilimine dikkat etmek size iyi gelebilir.',
    pluton: 'Plüton yedinci evinizde bulunuyor. İlişkileriniz yoğun ve dönüştürücü yaşanıyor gibi görünüyor. Güç ve kontrol konuları ilişkilerinizde öne çıkabilir.',
    kuzeyDugum: 'Kuzey Ay Düğümü yedinci evinizde bulunuyor. Ruhsal gelişiminiz ilişkiler üzerinden ilerliyor gibi görünüyor. "Biz" olmayı öğrenmek bu hayattaki yolunuzun bir parçası olabilir.',
  },
  yedinciBos: 'Yedinci evinizde gezegen bulunmuyor. Bu, ilişkilerin hayatınızda önemsiz olduğu anlamına gelmez: bu alanın hikâyesini evin yöneticisi anlatır.',

  // ----- 7. evin yöneticisi (dispozitör) -----
  yoneticiKalip: 'Yedinci evinizin yöneticisi {Gezegen}, {burcDe} ve {ev}. evinizde bulunuyor.',
  yoneticiEv: [
    'Bu, ilişkilerin kişiliğinizi doğrudan şekillendirdiğini gösteriyor. Partnerinizle kendi girişiminizle, siz harekete geçtiğinizde karşılaşıyor gibi görünüyorsunuz.',
    'Bu, ilişkilerin maddi güven ve değerlerle bağlantılı olduğunu gösteriyor. Partnerinizle iş, para ya da ortak bir değer etrafında karşılaşabilirsiniz.',
    'Partnerinizle yakın çevrenizde, komşuluk ya da kardeş aracılığıyla, kısa yolculuklarda ya da yazışmalarla karşılaşıyor gibi görünüyorsunuz.',
    'Partnerinizle aile aracılığıyla, evde ya da çocukluktan tanıdık bir çevrede karşılaşıyor gibi görünüyorsunuz. Evlilik ve yuva kurmak ilişkilerinizin doğal yönü olabilir.',
    'Partnerinizle eğlence, sanat, hobi ya da sosyal etkinliklerde karşılaşıyor gibi görünüyorsunuz. İlişkileriniz flörtle ve keyifle başlayabilir.',
    'Partnerinizle iş yerinde, gündelik bir rutin içinde ya da hizmet ve sağlıkla ilgili bir ortamda karşılaşıyor gibi görünüyorsunuz.',
    'Yönetici kendi evinde bulunuyor. Bu, evlilik ve ortaklık konusunun hayatınızda güçlü ve doğrudan işlediğini gösteriyor.',
    'Partnerinizle bir kriz ya da dönüşüm döneminde, derin bir paylaşımın içinde karşılaşıyor gibi görünüyorsunuz. İlişkileriniz yoğun ve dönüştürücü olabilir.',
    'Partnerinizle yolculukta, eğitim ortamında ya da farklı bir kültürle temas içinde karşılaşıyor gibi görünüyorsunuz. Partneriniz başka bir şehirden ya da ülkeden olabilir.',
    'Partnerinizle iş hayatında, kariyer ortamında ya da toplum içinde görünür olduğunuz bir yerde karşılaşıyor gibi görünüyorsunuz.',
    'Partnerinizle arkadaşlar aracılığıyla ya da bir topluluk, bir dernek veya ortak bir hayal etrafında karşılaşıyor gibi görünüyorsunuz.',
    'Partnerinizle gözlerden uzak bir ortamda, sessizce ya da gizli başlayan bir ilişki içinde karşılaşıyor gibi görünüyorsunuz. İlişkilerinizde fedakârlık ve ruhsal bir bağ öne çıkabilir.',
  ],
  yoneticiGuc: {
    yonetim: 'Yönetici kendi burcunda güçlüdür. Bu, ilişki konusunun hayatınızda sağlam ve doğal biçimde işlediğine işaret ediyor.',
    yucelim: 'Yönetici yüceldiği burçta bulunuyor. Bu, ilişkilerde onurlu ve parlak bir potansiyele işaret ediyor.',
    zarar: 'Yönetici zararda olduğu burçta bulunuyor. Bu, ilişkilerde kendinizi rahat ifade etmenin emek istediğine işaret ediyor. Bilinçli bir çaba bu alanı güçlendirebilir.',
    dusus: 'Yönetici düşüşte olduğu burçta bulunuyor. Bu, ilişkilerde beklentilerin karşılanması için zaman ve olgunluk gerektiğine işaret ediyor.',
  },

  // Paragraflar arası bağlaçlar
  baglaclar: ['Bunun yanında', 'Ayrıca', 'Buna ek olarak'],
};
