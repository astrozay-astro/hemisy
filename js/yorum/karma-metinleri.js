// Karmik bağ bölümünün yorum metinleri.
// Arka planda drakonik harita (ruhun haritası), drakonik sinastri ve drakonik Davison, Ay Düğümleri, Vertex, Kara Ay,
// Talih / Ruh / Evlilik Kısmetleri ve vedik teknikler (nakşatralar, Aştakuta, Mangal Doşa, Jaimini karakaları) kullanılır.
//
// Anlatım: soyut kalıplar yerine somut bir hikâye. Geçmiş yaşamda hangi rolle tanışılmış olabileceği, o ilişkinin nasıl
// yaşandığı, bugüne nasıl yansıdığı ve bu hayatta neden bir araya gelindiği anlatılır.
// Dil olasılık dilidir, ama cümleler "…gibi görünüyor", "…okunuyor", "…olduğu görülüyor" gibi oturaklı sonlarla bağlanır.
// Metinlerde noktalı virgül kullanılmaz.
//
// Yer tutucular: {X} ve {Y} kişilerin adları, {N} tek bir kişinin adı. Ekler otomatik gelir: {X:in}, {Y:e}, {N:in}, {X:i}
// Burç dizileri Koç'tan Balık'a sıralıdır.
window.ASTROSHIP_KARMA_METINLERI = {
  basliklar: {
    gecmis: { soru: 'Geçmişte birbirinizi nereden tanıyor olabilirsiniz?', glif: '☋' },
    tasinan: { soru: 'O hayattan bu hayata taşıdıklarınız', glif: '☽' },
    neden: { soru: 'Bu hayatta neden bir araya geldiniz?', glif: '☊' },
    sozlesme: { soru: 'Karmik sözleşmeniz', glif: '♄' },
    golge: { soru: 'Gölge, arzu ve dönüşüm', glif: '♇' },
    kader: { soru: 'Kader kapıları ve kısmetler', glif: '☌' },
    vedik: { soru: 'Vedik bakış: Ay yıldızlarınız', glif: '⚹' },
  },

  // Her başlığın açılış cümlesi
  girisler: {
    gecmis: 'Karmik astrolojide iki haritanın buluştuğu bazı noktalar, ruhların daha önce hangi rollerle karşılaştığını gösterir. Bu izler en çok Ay\'ın geçmişi taşıyan düğümünde ve ruhun haritası sayılan drakonik haritada okunur.',
    tasinan: 'Hint mitolojisinde başı kesilen iblisin gövdesi Ketu olur. Başsız gövde, aklın unuttuğu ama bedenin hatırladığı her şeyi taşır: geçmişten getirilen ustalıkları, alışkanlıkları ve yarım kalmış bağları. Güney Ay Düğümü Satürnyen bir noktadır: konfor alanını, yerleşik kalıpları, zaafları ve ruhun zaten bilge olduğu alanı gösterir. Orada kalmak kolaydır ama ruhu büyütmez.',
    neden: 'Her karmik bağın bu hayata dair bir amacı da vardır. Bu amaç Ay\'ın geleceği gösteren düğümünde ve ilişkinin kendi ruhsal haritasında okunur. Kuzey Ay Düğümü Jüpiteryen bir noktadır: yeni deneyimleri ve ruhsal gelişimi gösterir. Kendiliğinden gelmez, emek ister ama yürüdükçe hayatı büyütür.',
    sozlesme: 'Kronos, Yunanların zaman tanrısıdır. Astrolojide karmanın efendisi olarak bilinir: verilen sözleri hatırlar, ödenmemiş hesapları sorar ve olgunlaşanı ödüllendirir.',
    golge: 'Persephone yeraltına indiğinde bir daha eskisi gibi dönmez, bir kraliçe olarak döner. Yeraltının efendisi Hades ve ilk kadın Lilith, insanın bastırdığı arzuların ve dönüşümün arketipleridir.',
    kader: 'Antik çağda Tykhe talihin, Daimon ise kişiye eşlik eden koruyucu ruhun adıydı. Doğum anının içinde gizli olan bu noktalar, kaderin kapısının nerede aralandığını gösterir.',
    vedik: 'Vedik gelenekte Ay, gökyüzündeki 27 yıldız konağında her gece başka bir konakta konaklayan bir yolcudur. Doğduğunuz gece Ay\'ın konakladığı yıldız, ruhunuzun hangi tanrının hikâyesini taşıdığını anlatır.',
  },

  // ----- Geçmiş yaşam rolleri -----
  // Rolü taşıyan {X}, onu hatırlayan {Y}. tanisma cümlesi "Geçmiş bir yaşamda" ya da "Başka bir yaşamda ise" ile başlatılır.
  //  tanisma: o hayatta birbiriniz için kimdiniz   dinamik: o ilişki nasıl yaşandı
  //  iz: bugün nasıl hissediliyor                   ders: bu hayatta neden yeniden karşılaştınız
  roller: {
    gunes: {
      tanisma: '{X}, {Y:in} ailesinin reisi, onu yetiştiren bir büyüğü ya da yakından hayranlıkla izlediği bir lider olmuş olabilir.',
      dinamik: 'O hayatta {Y:in}, {X:in} gölgesinde büyüdüğü ve onun onayını almak için çabaladığı görülüyor. {X} ise {Y} üzerinde hem koruyucu hem de yön veren bir otorite taşımış gibi görünüyor.',
      iz: '{Y:in} bugün {X:in} takdirini fazlasıyla önemsemesi ve onun yanında kendini kanıtlama ihtiyacı duyması bu eski hafızadan geliyor gibi okunuyor.',
      ders: 'Bu hayatta birbirinizi yönetmeden, eşit iki yetişkin olarak yan yana durmayı öğrenmek için bir araya gelmiş olabileceğiniz görülüyor.',
    },
    ay: {
      tanisma: '{X}, {Y:i} büyüten ebeveyni, ona bakan biri ya da aynı evde büyüdüğü bir kardeşi olmuş olabilir.',
      dinamik: 'O hayatta {X:in}, {Y:i} beslediği, koruduğu ve onun en savunmasız hâline tanık olduğu okunuyor. Aranızdaki bağ kan bağı kadar yakın bir şefkat üzerine kurulmuş gibi görünüyor.',
      iz: '{Y:in} bugün {X:in} yanında kendini hemen evinde hissetmesi, ama zaman zaman ona bir çocuk gibi bağlanması bu eski bakım ilişkisinden geliyor gibi okunuyor.',
      ders: 'Bu hayatta o şefkati bağımlılığa değil, iki yetişkinin birbirini karşılıklı beslediği bir sevgiye dönüştürmek için bir araya gelmiş olabileceğiniz görülüyor.',
    },
    merkur: {
      tanisma: '{X}, {Y:in} kardeşi, sırdaşı ya da birlikte okuyup yazdığı bir yol arkadaşı olmuş olabilir.',
      dinamik: 'O hayatta aranızda bitmeyen bir sohbet, bir mektuplaşma ya da birlikte öğrenilen bir zanaat varmış gibi görünüyor. Birbirinizin aklına güvendiğiniz ve fikirlerinizi paylaştığınız okunuyor.',
      iz: 'Bugün konuşmaya başladığınızda zamanın nasıl geçtiğini anlamamanız ve birbirinizin cümlesini tamamlamanız bu eski yoldaşlıktan geliyor gibi okunuyor.',
      ders: 'Bu hayatta sözlerin ötesine geçip söylenmeyeni de duymayı öğrenmek için bir araya gelmiş olabileceğiniz görülüyor.',
    },
    venus: {
      tanisma: '{X} ile {Y} sevgili ya da eş olmuş olabilir.',
      dinamik: 'O aşkın tam olarak yaşanamadığı görülüyor: belki aileler ya da koşullar araya girdi, belki biriniz erken ayrıldı. Ya da uzun bir birliktelik yaşandı ve iki ruh birbirine bağlı kaldı.',
      iz: '{Y:in} bugün {X:in} sevgisini ilk anda tanıması ve ona karşı koymakta zorlanması bu eski aşkın hafızasından geliyor gibi okunuyor.',
      ders: 'Bu hayatta geçmişte yarım kalan bu sevgiyi tamamlamak ya da onu bu kez özgür iradeyle yeniden seçmek için bir araya gelmiş olabileceğiniz görülüyor.',
    },
    mars: {
      tanisma: '{X} ile {Y} aynı safta savaşmış iki yoldaş ya da birbirine rakip iki güç olmuş olabilir.',
      dinamik: 'O hayatta aranızda bir mücadele, bir yarış ya da birlikte verilen bir kavga varmış gibi görünüyor. Birbirinizin cesaretini de öfkesini de çok iyi tanıdığınız okunuyor.',
      iz: 'Bugün aranızda hızla alevlenen enerji ve aynı hızla alevlenen tartışmalar bu eski mücadeleden geliyor gibi okunuyor.',
      ders: 'Bu hayatta aynı ateşi birbirinize karşı değil, birlikte bir şey inşa etmek için kullanmayı öğrenmek üzere bir araya gelmiş olabileceğiniz görülüyor.',
    },
    jupiter: {
      tanisma: '{X}, {Y:in} öğretmeni, manevi rehberi ya da onu koruyup kollayan bir hamisi olmuş olabilir.',
      dinamik: 'O hayatta {X:in}, {Y:e} bir inanç, bir bilgi ya da bir yol öğrettiği görülüyor. {Y:in} de bu rehberliğe büyük bir güven duyduğu okunuyor.',
      iz: '{Y:in} bugün {X:in} sözlerine kolayca inanması ve onun yanında ufkunun genişlemesi bu eski öğretmen ile öğrenci bağından geliyor gibi okunuyor.',
      ders: 'Bu hayatta öğrenilenleri birlikte yaşamak ve bu kez rolleri değiştirip birbirinize öğretmek için bir araya gelmiş olabileceğiniz görülüyor.',
    },
    saturn: {
      tanisma: '{X}, {Y} üzerinde söz sahibi olan biri olmuş olabilir: bir büyük, bir işveren, bir vasi ya da {Y:in} sorumluluğunu üstlenmek zorunda kalan biri.',
      dinamik: 'O hayatta aranızdaki ilişkinin sevgiden çok görev ve sorumluluk üzerine kurulduğu görülüyor. Belki verilen bir söz tutulamadı, belki biriniz diğerine karşı bir borç taşıdı.',
      iz: 'Bugün aranızdaki ciddiyet ve {Y:in} {X:in} yanında zaman zaman kendini sınanıyor gibi hissetmesi bu eski yükten geliyor gibi okunuyor.',
      ders: 'Bu hayatta o eski hesabı kapatmak ve sorumluluğu bu kez sevgiyle, eşit biçimde paylaşmak için bir araya gelmiş olabileceğiniz görülüyor.',
    },
    pluton: {
      tanisma: '{X} ile {Y} büyük bir sır, bir kayıp ya da bir güç ilişkisiyle birbirine bağlanmış olabilir.',
      dinamik: 'O hayatta birinizin diğerinin kaderi üzerinde güçlü bir etki taşıdığı görülüyor. Bir ayrılık, bir ihanet ya da birlikte atlatılan büyük bir kriz bu bağı derinleştirmiş gibi görünüyor.',
      iz: 'Bugün aranızdaki yoğunluk, kaybetme korkusu ve birbirinizi bırakamama hissi bu eski hikâyeden geliyor gibi okunuyor.',
      ders: 'Bu hayatta kontrolü bırakıp güvene dayanan bir yakınlık kurmak ve o eski yarayı birlikte iyileştirmek için bir araya gelmiş olabileceğiniz görülüyor.',
    },
    yukselen: {
      tanisma: '{X}, {Y:in} her gün yüzünü gördüğü, aynı köyde, aynı mahallede ya da aynı çevrede yaşadığı biri olmuş olabilir.',
      dinamik: 'O hayatta aranızdaki bağın büyük olaylardan çok gündelik bir yakınlık ve alışkanlık üzerine kurulduğu görülüyor.',
      iz: '{Y:in} bugün {X:i} ilk gördüğünde onun yüzünü, sesini ya da duruşunu tanıdık bulması bu eski yakınlıktan geliyor gibi okunuyor.',
      ders: 'Bu hayatta o tanıdık yakınlığı bu kez bilinçli bir seçimle derinleştirmek için bir araya gelmiş olabileceğiniz görülüyor.',
    },
  },
  // Rolün nereden okunduğu
  kaynak: {
    guney: 'Bu iz, haritalarınızın geçmişi taşıyan noktasında açıkça okunuyor.',
    drakonik: 'Bu tanışıklık kişiliklerinizden çok ruhlarınızın haritasında görülüyor.',
  },
  // Hatırlayan kişinin Güney Ay Düğümü burcuna göre o hayatın geçtiği ortam
  sahne: [
    'bir savaş, bir göç ya da hayatta kalmak için mücadele edilen sert bir dönem',
    'toprakla, hayvanlarla ya da zanaatle geçinilen sakin bir kırsal hayat',
    'bir pazar yeri, bir yol üstü kasabası ya da haberlerin ve mektupların taşındığı hareketli bir çevre',
    'kalabalık bir aile evi, bir ocak başı ya da birbirine sıkı sıkıya bağlı bir kabile',
    'bir saray, bir sahne ya da soyluların ve sanatçıların arasındaki gösterişli bir çevre',
    'bir şifahane, bir atölye ya da hizmet ve emekle geçen düzenli bir hayat',
    'bir saray düğünü, bir antlaşma ya da evliliklerin ve ittifakların belirlendiği bir çevre',
    'sırların, mirasın ya da ölüm ve doğumla iç içe geçen yoğun bir dönem',
    'bir tapınak, bir okul ya da uzun yolculukların ve hac yollarının geçtiği bir dünya',
    'bir devlet kapısı, bir aile işi ya da görev ve statünün her şey olduğu katı bir düzen',
    'bir topluluk, bir dava ya da toplumun kurallarına karşı birlikte durulan bir hareket',
    'bir manastır, bir sahil kasabası ya da inzivanın, duanın ve şifanın içinde geçen sessiz bir hayat',
  ],
  sahneKalip: 'Bu bağın yaşandığı ortamın {sahne} olduğu okunuyor.',
  // Tanışıklık yüzdesine göre: [yüksek (≥65), orta (45–64), düşük (<45)]
  tanisiklikBant: [
    'Haritalarınızda geçmişe ait izler yoğun görünüyor. İlk karşılaşmanızda "seni bir yerden tanıyorum" duygusunun belirmiş olması çok olası.',
    'Haritalarınızda geçmişe ait belirgin izler okunuyor. Bazı anlarda birbirinizi anlatmaya gerek kalmadan anlamanız bundan geliyor gibi görünüyor.',
    'Haritalarınızda geçmişe ait izler zayıf görünüyor. Bu iz daha çok arka planda kalıyor ve bağınızın büyük ölçüde bu hayatta, kendi seçimlerinizle kurulduğunu gösteriyor.',
  ],
  gecmisYok: 'Haritalarınızda belirgin bir geçmiş yaşam ortaklığı okunmuyor. Bu ilişki eski bir hikâyenin devamından çok yeni bir sayfa gibi görünüyor: tanıdık rollere düşmeden birbirinizi olduğunuz gibi keşfetme şansınızın yüksek olduğu görülüyor.',

  // ----- O hayattan bu hayata taşıdıklarınız -----
  // Kişinin Güney Ay Düğümü burcu: geçmişten getirdiği ustalık ve bırakması gereken alışkanlık
  guneyBurc: [
    '{N}, bu hayata cesaret ve tek başına ayakta durma ustalığıyla gelmiş gibi görünüyor. İlişkide ise her şeyi kendi başına halletme alışkanlığını bırakıp "biz" demeyi öğrenmesi gerektiği okunuyor.',
    '{N}, bu hayata sabır, sadakat ve maddi dünyayı kurma ustalığıyla gelmiş gibi görünüyor. İlişkide ise güvenliğe tutunmayı bırakıp derin bir paylaşıma açılması gerektiği okunuyor.',
    '{N}, bu hayata merak, söz ve uyum sağlama ustalığıyla gelmiş gibi görünüyor. İlişkide ise her şeyi açıklamak yerine bir inanca ve bir anlama teslim olması gerektiği okunuyor.',
    '{N}, bu hayata şefkat, koruma ve yuva kurma ustalığıyla gelmiş gibi görünüyor. İlişkide ise başkalarını kollamanın ötesine geçip kendi yolunu ve sorumluluğunu üstlenmesi gerektiği okunuyor.',
    '{N}, bu hayata yaratıcılık, sevgiyi cesurca gösterme ve parlama ustalığıyla gelmiş gibi görünüyor. İlişkide ise sahnenin ortasından bir adım çekilip ortak bir hayale hizmet etmesi gerektiği okunuyor.',
    '{N}, bu hayata hizmet, özen ve kusursuzluk ustalığıyla gelmiş gibi görünüyor. İlişkide ise her şeyi düzeltmeye çalışmayı bırakıp akışa ve şefkate güvenmesi gerektiği okunuyor.',
    '{N}, bu hayata uyum, zarafet ve başkalarını memnun etme ustalığıyla gelmiş gibi görünüyor. İlişkide ise kendi isteğini açıkça söylemeyi ve kendi ayakları üzerinde durmayı öğrenmesi gerektiği okunuyor.',
    '{N}, bu hayata derinlik, krizlerde ayakta kalma ve dönüşüm ustalığıyla gelmiş gibi görünüyor. İlişkide ise yoğunluğu bırakıp basit, sakin ve huzurlu bir sevgiye izin vermesi gerektiği okunuyor.',
    '{N}, bu hayata inanç, özgürlük ve büyük resmi görme ustalığıyla gelmiş gibi görünüyor. İlişkide ise kaçmak yerine kalmayı, dinlemeyi ve gündelik paylaşımın değerini öğrenmesi gerektiği okunuyor.',
    '{N}, bu hayata sorumluluk, otorite ve kendini kontrol etme ustalığıyla gelmiş gibi görünüyor. İlişkide ise güçlü görünmeyi bırakıp duygularını ve kırılganlığını göstermesi gerektiği okunuyor.',
    '{N}, bu hayata bağımsızlık, dostluk ve topluluk için yaşama ustalığıyla gelmiş gibi görünüyor. İlişkide ise mesafeyi bırakıp sevgisini kalbiyle ve cesurca göstermesi gerektiği okunuyor.',
    '{N}, bu hayata sezgi, fedakârlık ve sınırları eritme ustalığıyla gelmiş gibi görünüyor. İlişkide ise kurtarıcı rolünü bırakıp sağlıklı sınırlar ve gündelik bir düzen kurması gerektiği okunuyor.',
  ],
  guneyIkisiAyni: 'İkinizin de bu hayata benzer ustalıklarla ve benzer alışkanlıklarla geldiği görülüyor. Bu, birbirinizi çok kolay anlamanızı sağlıyor, ama aynı eski kalıba birlikte sıkışma ihtimalini de artırıyor.',

  // ----- Bu hayatta neden bir araya geldiniz -----
  // İlişkinin ruhsal haritasında Güneş: ilişkinin ruhunun amacı
  amacGunes: [
    'İlişkinizin ruhsal haritası bu bağın cesaret için kurulduğunu gösteriyor: birlikte yeni bir yol açmak ve birbirinizi korkularınızın ötesine taşımak bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın kök salmak için kurulduğunu gösteriyor: birlikte kalıcı bir hayat, bir ev ya da bir düzen inşa etmek bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın öğrenmek ve anlatmak için kurulduğunu gösteriyor: birlikte merak etmek ve birbirinize yeni dünyalar açmak bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın bir yuva olmak için kurulduğunu gösteriyor: birbirinize güvenli bir liman olmak ve eski aile yaralarını şefkatle sarmak bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın sevgiyi cesurca yaşamak için kurulduğunu gösteriyor: birbirinizin içindeki neşeyi ve yaratıcılığı uyandırmak bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın iyileştirmek için kurulduğunu gösteriyor: birbirinize ve hayata gündelik ama gerçek bir emekle iyi gelmek bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın dengeyi öğrenmek için kurulduğunu gösteriyor: vermek ile almak, ben ile biz arasındaki ince ayarı bulmak bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın dönüşüm için kurulduğunu gösteriyor: birbirinizin korkularına bakmak ve birlikte yeniden doğmak bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın anlam aramak için kurulduğunu gösteriyor: birlikte yolculuk etmek ve hayatın büyük sorularına birlikte cevap aramak bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın olgunlaşmak için kurulduğunu gösteriyor: birlikte bir sorumluluk taşımak ve zamana dayanan bir eser bırakmak bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın özgürleşmek için kurulduğunu gösteriyor: birbirinizi kalıplardan kurtarmak ve geleceğe dair ortak bir hayal taşımak bu birlikteliğin derindeki amacı olarak okunuyor.',
    'İlişkinizin ruhsal haritası bu bağın şefkat için kurulduğunu gösteriyor: koşulsuz sevmeyi öğrenmek ve birlikte görünmeyenle bağ kurmak bu birlikteliğin derindeki amacı olarak okunuyor.',
  ],
  // İlişkinin ruhsal haritasında Ay: bu amaca giderken bağın neyle beslendiği
  amacAy: [
    'Bu yolda bağınızın en çok heyecanla ve birlikte harekete geçmekle beslendiği görülüyor.',
    'Bu yolda bağınızın en çok dokunmayla, huzurla ve süreklilikle beslendiği görülüyor.',
    'Bu yolda bağınızın en çok konuşmakla, gülmekle ve birlikte merak etmekle beslendiği görülüyor.',
    'Bu yolda bağınızın en çok korunmuşluk hissiyle ve baş başa geçen sıcak zamanlarla beslendiği görülüyor.',
    'Bu yolda bağınızın en çok görülmek, takdir edilmek ve birlikte kutlamakla beslendiği görülüyor.',
    'Bu yolda bağınızın en çok küçük özenlerle ve birbirinize gündelik yardımlarla beslendiği görülüyor.',
    'Bu yolda bağınızın en çok incelikle, güzellikle ve kırıcı olmayan bir uyumla beslendiği görülüyor.',
    'Bu yolda bağınızın en çok tam bir güvenle ve derin bir mahremiyetle beslendiği görülüyor.',
    'Bu yolda bağınızın en çok özgürlükle, yolculuklarla ve ortak bir inançla beslendiği görülüyor.',
    'Bu yolda bağınızın en çok sadakatle, tutulan sözlerle ve zamanla kazanılan güvenle beslendiği görülüyor.',
    'Bu yolda bağınızın en çok dostlukla, birbirinize alan tanımakla ve ortak hayallerle beslendiği görülüyor.',
    'Bu yolda bağınızın en çok sessiz anlarla, sezgiyle ve sanatla beslendiği görülüyor.',
  ],
  // İlişkinin ruhsal haritasında Yükselen: bu amacın dünyaya nasıl yansıdığı
  amacYukselen: [
    'Bu birlikteliğin dünyaya cesur bir girişimle, birlikte başlatılan bir işle yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya sabırla kurulan somut bir hayatla, bir evle ya da ortak bir birikimle yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya paylaşılan fikirlerle, yazılan ve anlatılan şeylerle yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya bir aile ya da bir yuva olarak yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya yaratıcı bir eserle ya da çevrenize yayılan bir neşeyle yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya başkalarına iyi gelen bir emekle yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya güzellikle ve çevrenize örnek olan bir ortaklıkla yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya başkalarını da dönüştüren bir derinlikle yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya bir öğreti, bir yolculuk ya da paylaşılan bir inançla yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya kalıcı bir yapıyla ve saygınlıkla yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya bir topluluğa ya da ortak bir davaya katkıyla yansıyacağı okunuyor.',
    'Bu birlikteliğin dünyaya şefkatle, sanatla ya da görünmeyen bir yardımla yansıyacağı okunuyor.',
  ],
  // Kuzey Düğüm teması: {X} gezegenin sahibi, {Y} düğümün sahibi (X, Y'nin bu hayattaki büyümesine aracı)
  kuzeyDugum: {
    gunes: '{X}, {Y:in} bu hayatta olmak istediği kişiyi ona gösteren biri gibi görünüyor. {Y:in} özgüveninin ve hayat amacının {X:in} yanında netleşeceği okunuyor.',
    ay: '{X:in} şefkati, {Y:in} bu hayatta öğrenmesi gereken duygusal açıklığı ona öğretiyor gibi görünüyor.',
    merkur: '{X:in} fikirleri ve sözleri, {Y:in} bu hayattaki yolunu aydınlatıyor gibi görünüyor. Birlikte öğrendiklerinizin ikinizi de ileri taşıyacağı okunuyor.',
    venus: '{X:in} sevgisi, {Y:in} bu hayatta sevmeyi ve sevilmeyi yeniden öğrenmesine yardım ediyor gibi görünüyor. Bu aşkın {Y} için geleceğe açılan bir kapı olduğu okunuyor.',
    mars: '{X:in} cesareti, {Y:i} bu hayatta ertelediği adımları atmaya yöneltiyor gibi görünüyor.',
    jupiter: '{X}, {Y:in} yolunda bir şans kapısı gibi görünüyor. Birlikteyken {Y:in} önünün açılacağı ve ufkunun genişleyeceği okunuyor.',
    saturn: '{X}, {Y:e} bu hayatta öğrenmesi gereken sorumluluğu ve olgunluğu öğretiyor gibi görünüyor. Bu ders zaman zaman ağır gelse de {Y:i} kalıcı biçimde güçlendireceği okunuyor.',
    yukselen: '{X:in} varlığı, {Y:in} kaderine giden yolun tam ortasında duruyor gibi görünüyor. Bu karşılaşmanın {Y} için geleceğe açılan bir kapı olduğu okunuyor.',
  },
  // Vertex: {X} kapıdan giren, {Y} kapının sahibi
  vertexGiris: '{X} ile tanışmanızın {Y:in} hayatında bir dönüm noktasına denk gelmiş olması çok olası görünüyor.',
  vertex: {
    gunes: 'Bu karşılaşmanın {Y:e} kendi hayat amacını hatırlattığı okunuyor.',
    ay: '{X:in}, {Y:in} hayatına tam şefkate ihtiyaç duyduğu bir dönemde girdiği görülüyor.',
    merkur: 'Bu bağın bir sohbetle, bir mesajla ya da bir haberle başlamış olması muhtemel görünüyor.',
    venus: 'Bu, kaderin aşk kapısı gibi okunuyor: {Y}, {X:i} gördüğü an bir şeylerin değişeceğini sezmiş olabilir.',
    mars: 'Bu karşılaşmanın {Y:i} harekete geçmeye ve cesaret etmeye yönelttiği görülüyor.',
    jupiter: 'Bu karşılaşmanın {Y:in} hayatında kapıların açıldığı, ufkun genişlediği bir dönemi başlattığı okunuyor.',
    saturn: 'Bu karşılaşmanın {Y:e} ağır ama kaçınılmaz bir olgunlaşma dersi getirdiği görülüyor.',
    yukselen: 'Aranızdaki bağın iradenin ötesinde işlediği, sanki kaçınılmaz bir buluşma olduğu okunuyor.',
    kuzeyDugum: 'Bu karşılaşmanın ikinizin de geleceğine yön verdiği okunuyor.',
  },

  // ----- Karmik sözleşme -----
  // Satürn teması: {X} Satürn'ün sahibi, {Y} dokunulan kişi. u = uyumlu, g = kavuşum ya da gergin
  saturn: {
    gunes: {
      u: '{X:in}, {Y:in} hayat amacına sağlam bir zemin sunmak üzere bir söz taşıdığı görülüyor. Aranızda zamanla değer kazanan, sessiz ama güçlü bir sadakat okunuyor.',
      g: 'Aranızda geçmişten kalan bir otorite meselesi okunuyor: {X}, {Y:in} parlamasını farkında olmadan kısıtlayan bir büyük gibi davranabilir. Bu sözleşmenin, {Y:in} kendi ışığını {X:in} onayına ihtiyaç duymadan göstermeyi öğrenmesiyle tamamlanacağı görülüyor.',
    },
    ay: {
      u: '{X:in}, {Y:in} duygularına güvenli bir liman olma sözü taşıdığı görülüyor. {Y:in} {X:in} yanında kalıcı bir korunmuşluk hissi bulacağı okunuyor.',
      g: 'Aranızda eski bir duygusal borç okunuyor: {Y}, bir zamanlar {X:in} şefkatini beklemiş ama yeterince alamamış gibi görünüyor. Bu hayatta {X:in} duygusal olarak daha açık davranmasının bu borcu kapatmanın yolu olduğu görülüyor.',
    },
    merkur: {
      u: '{X:in}, {Y:in} fikirlerine ciddiyet ve kalıcılık kazandırma görevi üstlendiği görülüyor. Birlikte uzun vadeli planlar yapmanın size kolay geleceği okunuyor.',
      g: 'Aranızda geçmişte söylenmiş ya da söylenememiş sözlerin izi okunuyor. {Y}, {X:in} yanında konuşurken yargılanıyormuş gibi hissedebilir. Doğru kelimeleri sabırla bulmanın bu sözleşmenin ödevi olduğu görülüyor.',
    },
    venus: {
      u: 'Aranızda zamanla olgunlaşan, yaşlandıkça güzelleşen bir bağlılık sözü okunuyor. {X:in} varlığının {Y:in} sevgisine kalıcılık kazandırdığı görülüyor.',
      g: 'Bu, karmik ilişkilerin en bilinen imzalarından biri gibi görünüyor: geçmişte verilen ama tutulamayan bir bağlılık ya da evlilik sözü. {Y} bu hayatta sevgisinin karşılık görmediğini hissedebilir, {X} ise bağlanmaktan çekinebilir. Sabırla taşındığında bu bağın son derece sadık bir birlikteliğe dönüşeceği okunuyor.',
    },
    mars: {
      u: '{X:in}, {Y:in} enerjisine yön ve disiplin verme görevi üstlendiği görülüyor. Birlikte uzun soluklu bir hedefe yürüdüğünüzde çok güçlü bir ekip olacağınız okunuyor.',
      g: 'Aranızda geçmişten kalan bir engellenmişlik okunuyor: {Y}, bir zamanlar {X:in} kuralları ya da izni yüzünden istediğini yapamamış gibi görünüyor. Bu hayatta öfkeyi biriktirmeden konuşmanın bu düğümü çözmenin yolu olduğu görülüyor.',
    },
    yukselen: {
      u: '{X:in}, {Y:in} hayatına bir dayanak olarak girdiği görülüyor. {Y:in} {X:in} yanında daha olgun ve kararlı bir hâline kavuşacağı okunuyor.',
      g: '{X}, {Y:e} ilk anda mesafeli ya da ağır gelebilir. Yine de bu bağın, zamanla yerine getirilmesi gereken eski bir söz gibi işlediği okunuyor.',
    },
  },
  saturnYok: 'Aranızda ağır bir karmik borç ya da yerine getirilmemiş bir söz okunmuyor. Bu, ilişkinizi geçmişin yükünden çok bugünün seçimleriyle şekillendirebileceğinizi gösteriyor.',

  // ----- Gölge, arzu ve dönüşüm -----
  // Plüton teması: {X} Plüton'un sahibi, {Y} dokunulan kişi
  pluton: {
    gunes: {
      u: '{X:in}, {Y:in} kendi gücünü keşfetmesine aracı olduğu görülüyor. Bu bağdan sonra {Y:in} kendini daha cesur ve daha sahici biri olarak bulacağı okunuyor.',
      g: 'Aranızda geçmişten kalan bir güç meselesi okunuyor: {X}, {Y:in} kimliği üzerinde fazla söz sahibi olmuş gibi görünüyor. Bu hayatta kontrol yerine güveni seçtiğinizde bu yoğunluğun ikinizi de dönüştüreceği görülüyor.',
    },
    ay: {
      u: '{X:in}, {Y:in} en derin duygularına korkusuzca inip orada iyileştirici bir şey bulduğu görülüyor.',
      g: '{X:in}, {Y:in} kalbinin en saklı yerlerine dokunduğu görülüyor. Kıskançlık ya da sahiplenme ortaya çıktığında bunun eski bir kaybetme korkusundan geldiği okunuyor.',
    },
    venus: {
      u: 'Aranızdaki sevginin derin ve dönüştürücü olduğu görülüyor. Bu bağın ikinizi de daha cesur ve daha sahici kıldığı okunuyor.',
      g: 'Bu bağda Hades ile Persephone\'nin hikâyesi okunuyor: derin bir bağlılık ile kaybetme korkusu iç içe geçebilir. Sahiplenme yerine güven seçildiğinde bu sevginin ikinizi de dönüştüreceği görülüyor.',
    },
    mars: {
      u: 'Birlikte hareket ettiğinizde ortaya büyük bir güç çıktığı görülüyor. Bu enerjiyi ortak bir amaca yönelttiğinizde neredeyse durdurulamaz olacağınız okunuyor.',
      g: 'Aranızda geçmişten kalan bir hesaplaşma okunuyor. İnatlaşma ve güç mücadelesi kolay alevlenebilir. Gücü birbirinize karşı değil birlikte kullanmayı seçtiğinizde bu düğümün çözüleceği görülüyor.',
    },
    yukselen: {
      u: '{X:in}, {Y:in} hayatına bir dönüşüm rüzgârı gibi girdiği görülüyor.',
      g: '{X:in}, {Y} üzerinde derin ve kolay unutulmayan bir etki bıraktığı görülüyor. Bu etkinin ardında birbirini yeniden bulmaya çalışan iki ruhun hikâyesi okunuyor.',
    },
  },
  // Kara Ay teması: {X} gezegenin sahibi, {Y} Kara Ay'ın sahibi
  karaAy: {
    gunes: '{X:in} varlığı, {Y:in} uzun zamandır sakladığı ve kimseye göstermediği bir yanını uyandırıyor gibi görünüyor. Bu bağda bastırılmış bir gücün özgür kalmak istediği okunuyor.',
    ay: '{X:in} şefkati, {Y:in} eski bir yalnızlık ya da dışlanma yarasına dokunuyor gibi görünüyor. Bu temasın acıtabileceği ama şifa da getireceği okunuyor.',
    venus: '{X:in} sevgisi, {Y:in} kendine bile itiraf etmediği arzularını uyandırıyor gibi görünüyor. Bunun ardında geçmişte yasaklanmış ya da yaşanamamış bir aşkın izi okunuyor.',
    mars: '{X:in} cesareti, {Y:in} içindeki bastırılmış öfkeyi ya da özgürlük isteğini uyandırıyor gibi görünüyor. Bu enerjinin yönetilmesi zor olsa da {Y:in} kendini bütünüyle kabul etmesine vesile olacağı okunuyor.',
    yukselen: '{X}, {Y:e} gölgesini yansıtan bir ayna gibi görünüyor. Bu bağın hem çekici hem rahatsız edici gelebileceği, ama {Y:in} kendini bütünüyle kabul etmesine vesile olacağı okunuyor.',
  },
  golgeYok: 'Aranızda yoğun bir gölge çalışması ya da güç mücadelesi izi okunmuyor. İlişkinizdeki dönüşümün sarsıntıyla değil yumuşak bir büyümeyle yaşanacağı görülüyor.',

  // ----- Kader kapıları ve kısmetler -----
  kismetVerici: {
    gunes: '{X:in} varlığı', ay: '{X:in} şefkati', venus: '{X:in} sevgisi', mars: '{X:in} cesareti',
    jupiter: '{X:in} iyimserliği ve cömertliği', saturn: '{X:in} bağlılığı ve ciddiyeti', yukselen: '{X:in} varlığı',
  },
  // {verici} yukarıdaki ifade, {Y} kısmetin sahibi
  kismet: {
    ruh: '{verici}, {Y:in} kendi kaderini seçme gücüne dokunuyor gibi görünüyor. {Y:in} bu ilişkide hayatının yönünü daha net göreceği okunuyor. Antik gelenekte bu nokta kişinin koruyucu ruhuyla, Daimon\'uyla ilişkilendirilir.',
    talih: '{verici}, {Y:in} talihinin ve huzurunun tam ortasına dokunuyor gibi görünüyor. Bu ilişkinin {Y} için şanslı bir dönemi başlattığı okunuyor.',
    evlilik: '{verici}, {Y:in} evlilik ve bağlılık noktasına dokunuyor gibi görünüyor. Geleneksel olarak bu, birlikteliği resmî ve kalıcı bir bağa dönüştürme eğiliminin işaretlerinden biri olarak okunur.',
  },
  kismetNoktasi: { ruh: 'kaderini seçme gücüne', talih: 'talih noktasına', evlilik: 'evlilik ve bağlılık noktasına' },
  kismetKarsilikli: 'Aynı işaret karşılıklı da görünüyor: bu kez {verici}, {Y:in} {nokta} dokunuyor. Bu kader işaretinin iki yönlü olması bağı daha da güçlendiriyor.',
  kaderYok: 'Bu ilişkide kaderin kapısını aralayan belirgin bir nokta okunmuyor. Bu, bağınızın yazgıdan çok özgür iradeyle şekillendiğini gösteriyor.',

  // ----- Vedik bakış -----
  // Ay'ın nakşatrası: arketip ve sevme biçimi ({N} kişinin adı)
  nakshatra: [
    '{N:in} Ay\'ı, tanrıların hekimi olan ikiz atlı Aşvinler\'in yıldızı Aşvini\'de bulunuyor. Aşvinler şafakla birlikte gelir ve yaralıları iyileştirir. {N} sevgide hızlı, coşkulu ve iyileştirici olabilir. Karmik dersinin sabırla kalmayı öğrenmek olduğu okunuyor.',
    '{N:in} Ay\'ı, ölümün ve adaletin tanrısı Yama\'nın yıldızı Bharani\'de bulunuyor. Simgesi rahimdir: hem doğurur hem de bitirir. {N} aşkı bütün yoğunluğuyla, sınırlarına kadar yaşayabilir. Karmik dersinin arzuyu sorumlulukla taşımak olduğu okunuyor.',
    '{N:in} Ay\'ı, ateş tanrısı Agni\'nin yıldızı Krittika\'da bulunuyor. Bıçak gibi keskin, alev gibi arındırıcıdır. {N} sevdiklerini korur ama sahte olana tahammül edemeyebilir. Karmik dersinin keskinliğini şefkatle yumuşatmak olduğu okunuyor.',
    '{N:in} Ay\'ı, Ay tanrısının en sevdiği eşi olan Rohini\'de bulunuyor. Yaratıcı Brahma\'nın bereketini taşır. {N} sevgide çekici, duyusal ve sadık olabilir. Karmik dersinin sahiplenmeden sevmeyi öğrenmek olduğu okunuyor.',
    '{N:in} Ay\'ı, ölümsüzlük nektarı Soma\'nın yıldızı Mrigaşira\'da bulunuyor. Simgesi ormanda bir şey arayan ceylandır. {N} sevgide meraklı, nazik ve hep biraz arayış içinde olabilir. Karmik dersinin aradığını bulduğunda durabilmek olduğu okunuyor.',
    '{N:in} Ay\'ı, fırtına tanrısı Rudra\'nın yıldızı Ardra\'da bulunuyor. Simgesi bir gözyaşı damlasıdır: fırtınadan sonra toprağı temizleyen yağmur. {N} duygularını yoğun yaşayabilir ve krizlerden yenilenerek çıkabilir. Karmik dersinin acıyı bilgeliğe dönüştürmek olduğu okunuyor.',
    '{N:in} Ay\'ı, tanrıların annesi Aditi\'nin yıldızı Punarvasu\'da bulunuyor. Adı "ışığın geri dönüşü" anlamına gelir. {N} sevgide affedici, umutlu ve yuvaya bağlı olabilir. Karmik dersinin kaybettiğini yeniden bulabileceğine güvenmek olduğu okunuyor.',
    '{N:in} Ay\'ı, tanrıların öğretmeni Brihaspati\'nin yıldızı Puşya\'da bulunuyor. Gökyüzünün en besleyici yıldızı sayılır. {N} sevdiklerini besleyen, koruyan ve onlara yol gösteren biri olabilir. Karmik dersinin başkalarını beslerken kendini de beslemek olduğu okunuyor.',
    '{N:in} Ay\'ı, yılan bilgeleri Nagalar\'ın yıldızı Aşleşa\'da bulunuyor. Simgesi kıvrılmış bir yılandır: sarılır, büyüler ve korur. {N} sevgide derin, sezgisel ve tutkulu olabilir. Karmik dersinin sarılmak ile sıkmak arasındaki farkı öğrenmek olduğu okunuyor.',
    '{N:in} Ay\'ı, ataların ruhları Pitriler\'in yıldızı Magha\'da bulunuyor. Simgesi tahttır. {N}, soyundan gelen bir onuru ve eski bir hafızayı taşıyabilir. Sevgide sadık ve gururlu olabilir. Karmik dersinin ataların yükünü onurlandırıp kendi yolunu çizmek olduğu okunuyor.',
    '{N:in} Ay\'ı, evlilik saadetinin tanrısı Bhaga\'nın yıldızı Purva Phalguni\'de bulunuyor. Simgesi dinlenme yatağıdır. {N} aşkta keyifli, cömert ve romantik olabilir. Karmik dersinin zevk ile anlam arasında denge kurmak olduğu okunuyor.',
    '{N:in} Ay\'ı, sözleşmelerin ve dostluğun tanrısı Aryaman\'ın yıldızı Uttara Phalguni\'de bulunuyor. Evlilik yeminlerinin koruyucusudur. {N} sevgide güvenilir, yardımsever ve sözüne sadık olabilir. Karmik dersinin vermenin yanında almayı da kabul etmek olduğu okunuyor.',
    '{N:in} Ay\'ı, güneşin yaratıcı gücü Savitri\'nin yıldızı Hasta\'da bulunuyor. Simgesi açık bir eldir. {N} sevgisini dokunuşla, emekle ve becerikli ellerle gösterebilir. Karmik dersinin her şeyi kontrol etmeden de güvende olabileceğini öğrenmek olduğu okunuyor.',
    '{N:in} Ay\'ı, göklerin mimarı Tvaştar\'ın yıldızı Çitra\'da bulunuyor. Simgesi parlak bir mücevherdir. {N} sevgide estetik, çekici ve yaratıcı olabilir. Karmik dersinin dış güzelliğin ardındaki özü görmek olduğu okunuyor.',
    '{N:in} Ay\'ı, rüzgâr tanrısı Vayu\'nun yıldızı Svati\'de bulunuyor. Simgesi rüzgârda eğilen ama kırılmayan bir filizdir. {N} sevgide özgürlüğüne düşkün, nazik ve uyumlu olabilir. Karmik dersinin özgür kalırken de kök salabilmek olduğu okunuyor.',
    '{N:in} Ay\'ı, İndra ile Agni\'nin birlikte yönettiği Vişakha\'da bulunuyor. Simgesi zafer takıdır. {N} sevgide kararlı, tutkulu ve hedefine bağlı olabilir. Karmik dersinin ulaşmak istediği yere giderken yanındakini unutmamak olduğu okunuyor.',
    '{N:in} Ay\'ı, dostluk ve sadakat tanrısı Mitra\'nın yıldızı Anuradha\'da bulunuyor. Simgesi çamurdan açan lotustur. {N} sevgide derin bir bağlılık ve dostluk taşıyabilir. Karmik dersinin zor koşullarda bile sevgiyi canlı tutmak olduğu okunuyor.',
    '{N:in} Ay\'ı, tanrıların kralı İndra\'nın yıldızı Jyeşta\'da bulunuyor. Adı "en büyük olan" demektir. {N} sevdiklerini korumak için güçlü ve sorumlu davranabilir. Karmik dersinin güçlü olmanın yalnız kalmak anlamına gelmediğini öğrenmek olduğu okunuyor.',
    '{N:in} Ay\'ı, çözülüş tanrıçası Nirriti\'nin yıldızı Mula\'da bulunuyor. Adı "kök" demektir. {N} her şeyin özüne inmek isteyebilir ve sevgide sahicilik arayabilir. Karmik dersinin eskiyi kökünden bırakıp yeniden filizlenmek olduğu okunuyor.',
    '{N:in} Ay\'ı, kutsal suların tanrıçası Apas\'ın yıldızı Purva Aşadha\'da bulunuyor. Su gibi arındırır ve yenilmezdir. {N} sevgide coşkulu, ikna edici ve canlandırıcı olabilir. Karmik dersinin akarken yolunu kaybetmemek olduğu okunuyor.',
    '{N:in} Ay\'ı, evrensel tanrılar Vişvadevalar\'ın yıldızı Uttara Aşadha\'da bulunuyor. Adı "sonunda gelen zafer" demektir. {N} sevgide dürüst, sabırlı ve uzun vadeli düşünen biri olabilir. Karmik dersinin zaferin acele etmeden geldiğine güvenmek olduğu okunuyor.',
    '{N:in} Ay\'ı, koruyucu tanrı Vişnu\'nun yıldızı Şravana\'da bulunuyor. Simgesi kulaktır: dinleyen, duyan ve öğrenen. {N} sevgide iyi bir dinleyici ve sadık bir yoldaş olabilir. Karmik dersinin sessizliğin içindeki bilgeliği duymak olduğu okunuyor.',
    '{N:in} Ay\'ı, sekiz bolluk tanrısı Vasular\'ın yıldızı Dhanişta\'da bulunuyor. Simgesi davuldur: ritim, müzik ve kutlama. {N} sevgide cömert, neşeli ve uyum arayan biri olabilir. Karmik dersinin içindeki boşluğu dışarıdaki seslerle doldurmamak olduğu okunuyor.',
    '{N:in} Ay\'ı, kozmik suların efendisi Varuna\'nın yıldızı Şatabhişa\'da bulunuyor. Adı "yüz hekim" demektir. {N} sevgide bağımsız, gizemli ve iyileştirici olabilir. Karmik dersinin kendi yarasını da başkalarına gösterebilmek olduğu okunuyor.',
    '{N:in} Ay\'ı, tek ayaklı ateş ejderi Aja Ekapada\'nın yıldızı Purva Bhadrapada\'da bulunuyor. Arınmanın ve kutsal ateşin yıldızıdır. {N} sevgide idealist, yoğun ve dönüştürücü olabilir. Karmik dersinin uç noktalar arasında dengede kalmak olduğu okunuyor.',
    '{N:in} Ay\'ı, derin suların yılanı Ahir Budhnya\'nın yıldızı Uttara Bhadrapada\'da bulunuyor. Okyanusun dibindeki sessiz bilgeliği taşır. {N} sevgide sakin, derin ve fedakâr olabilir. Karmik dersinin derinliğini paylaşmaktan çekinmemek olduğu okunuyor.',
    '{N:in} Ay\'ı, yolcuların koruyucusu Puşan\'ın yıldızı Revati\'de bulunuyor. Zodyağın son yıldızıdır ve ruhları evlerine kadar uğurlar. {N} sevgide şefkatli, koruyucu ve hayalperest olabilir. Karmik dersinin herkesi korumaya çalışırken kendini kaybetmemek olduğu okunuyor.',
  ],
  ayniNakshatra: 'Ay\'larınızın aynı yıldızda bulunduğu görülüyor. Vedik gelenekte bu, ruhların aynı tanrının hikâyesini taşıdığı ve birbirini içgüdüsel olarak tanıdığı anlamına gelir.',

  // Aştakuta toplamına göre: [≥28, 24–27, 18–23, <18]
  gunaBant: [
    'Vedik gelenekte evlilik uyumu 36 puan üzerinden ölçülür. Sizin puanınız {puan} olarak hesaplanıyor. Bu, geleneğin "çok uyumlu" saydığı bir birlikteliğe işaret ediyor.',
    'Vedik gelenekte evlilik uyumu 36 puan üzerinden ölçülür. Sizin puanınız {puan} olarak hesaplanıyor. Bu, geleneğin "iyi ve bereketli" saydığı bir birlikteliğe işaret ediyor.',
    'Vedik gelenekte evlilik uyumu 36 puan üzerinden ölçülür. Sizin puanınız {puan} olarak hesaplanıyor. Bu, geleneğin "kabul edilebilir" saydığı ve emekle güçlenen bir birlikteliğe işaret ediyor.',
    'Vedik gelenekte evlilik uyumu 36 puan üzerinden ölçülür. Sizin puanınız {puan} olarak hesaplanıyor. Gelenek bu düzeyi zorlayıcı sayar, ama puan haritanın tamamını anlatmaz. Diğer bağlarınızın bu açığı kapatabileceği görülüyor.',
  ],
  kuta: {
    nadiDosa: 'Yaşam enerjilerinizin aynı kanaldan aktığı görülüyor. Gelenek bunu dikkat edilmesi gereken bir nokta sayar: birbirinize çok benzediğiniz için aynı anda yorulup aynı anda tükenebilirsiniz. Birbirinizi dinlendirmeyi bilinçle öğrenmenin bu dengeyi kuracağı okunuyor.',
    nadiIyi: 'Yaşam enerjilerinizin farklı kanallardan aktığı görülüyor. Gelenek bunu beden ve sağlık uyumu için çok değerli sayar: biriniz tükendiğinde diğerinizin onu besleyebileceği okunuyor.',
    bhakutDosa: 'Ay burçlarınız arasındaki mesafe, duygusal ritimlerinizin farklı zamanlarda inip çıktığını gösteriyor. Birinizin coştuğu anda diğeriniz içine kapanabilir. Bunu bilmenin, birbirinizi kişisel algılamadan desteklemenizi kolaylaştıracağı okunuyor.',
    yoniYuksek: 'İçgüdüsel doğalarınızın birbirine çok uygun olduğu görülüyor. Gelenek bunu iki ruhun bedeninin de birbirini tanıması olarak yorumlar.',
    yoniDusuk: 'İçgüdüsel doğalarınızın birbirinden farklı olduğu görülüyor. Fiziksel ritimlerinizi ve ihtiyaçlarınızı konuşmanın bu farkı bir zenginliğe dönüştüreceği okunuyor.',
    ganaUyumlu: 'Mizaçlarınızın aynı kökten geldiği görülüyor. Gündelik hayatta birbirinizin tepkilerini doğal karşılayacağınız okunuyor.',
    ganaUyumsuz: 'Mizaçlarınızın farklı köklerden geldiği görülüyor: biriniz daha yumuşak, diğeriniz daha ateşli ve kendi bildiğini okuyan olabilir. Bu fark saygıyla karşılandığında ilişkiyi dengelediği okunuyor.',
    maitriYuksek: 'Ay\'larınızın yöneticilerinin birbirine dost olduğu görülüyor. Bu, zihinsel olarak birbirinize iyi gelen, sohbeti kolay bir dostluğa işaret ediyor.',
  },
  // Mangal Doşa: Mars'ın evlilik evlerinde olması
  mangal: {
    ikisi: 'Vedik gelenekte ikinizin haritasında da Mars\'ın ateşinin evlilik alanlarında güçlü olduğu görülüyor. Gelenek bunu bir denge sayar: ateşiniz aynı yükseklikte yandığı için birbirinizi yakmadan ısıtabileceğiniz okunuyor.',
    biri: 'Vedik gelenekte {N:in} haritasında Mars\'ın ateşinin evlilik alanlarında güçlü olduğu görülüyor. Bu, {N:in} ilişkiye daha fazla tutku ama aynı zamanda daha fazla sabırsızlık getirebileceğine işaret ediyor. Bunu bilmenin, bu ateşi kavgaya değil ortak bir amaca yöneltmenize yardım edeceği okunuyor.',
  },
  // Jaimini bağları: {X} ruh göstergesinin sahibi, {Y} eş göstergesinin sahibi
  jaimini: {
    akDkAyni: 'Vedik gelenekte ruhu temsil eden gezegen ile eşi temsil eden gezegen buluştuğunda, kişilerin birbirinin kaderinde yazılı olduğu söylenir. {X:in} ruhunu taşıyan gezegenin, {Y:in} haritasında eşini taşıyan gezegenle aynı olduğu görülüyor.',
    akDkBurc: '{X:in} ruhunun en derin arzusunun, {Y:in} haritasında eşini aradığı yerde durduğu görülüyor. Vedik gelenekte bu, ruhsal bir eşleşmenin güçlü işaretlerinden biri sayılır.',
    akYedinci: '{X:in} ruhunun en derin arzusunun, {Y:in} haritasında evlilik ve ortaklık alanına düştüğü görülüyor. {Y:in} {X:i} doğal bir eş olarak gördüğü okunuyor.',
    ayKetu: '{X:in} duygusal dünyasının, {Y:in} geçmişten getirdiği hafızanın içinde durduğu görülüyor. {Y:in} {X:in} duygularını sanki önceden biliyormuş gibi tanıdığı okunuyor.',
  },

  // Paragraflar arası bağlaçlar
  baglaclar: ['Bunun yanında', 'Ayrıca', 'Buna ek olarak'],
};
