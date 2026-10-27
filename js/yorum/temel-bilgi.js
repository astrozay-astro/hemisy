// Ortak astroloji bilgisi: Tuğçenur Özay'ın Pratik Harita Okuma Atölyesi notlarından ve "Klasik Astrolojide Evler" çarkından.
// Bütün yorum katmanları (bireysel analiz, ilişki yapısı, uyum) bu tanımları kullanır.
//  - Evlerin konuları, kadranları (benlik, yakın çevre, birebir ilişkiler, kolektif) ve gezegenlerin sevinç evleri
//  - Açı türlerinin doğası: kavuşum (birleşim), altmışlık (yapabilir), kare (olumsuzluk eki), üçgen (kusursuz akış),
//    karşıtlık (koşul / ya da)
//  - Açı analizinde anahtar yöntem: iki gezegenin ortak teması (ortak kelime) bulunur, sonra kesiştikleri evlere bakılır
//  - Yanık: Güneş'e 0°–8°30' tam yanık, 8°30'–17° Güneş ışınları altında. Ay ve kolektif gezegenler yanmaz,
//    Merkür ve Venüs ancak 1° içinde ciddi yanık sayılır.
// Arka plan bilgisi kesin dille yazılır. Metinlerde noktalı virgül kullanılmaz.
window.ASTROSHIP_TEMEL = {
  // Evlerin konuları: "… alanı", "… konuları" kalıplarında kullanılır (iyelik eki yok)
  evKonusu: [
    'beden, görünüş ve benlik',
    'öz değer, yetenekler ve refah',
    'zihin, kardeşler ve yakın çevre',
    'aile, kökler ve iç dünya',
    'aşk, keyif, yaratıcılık ve çocuklar',
    'iş hayatı, günlük rutin ve sorumluluklar',
    'birebir ilişkiler, ortaklık ve eş',
    'mahremiyet, cinsellik, paylaşımlar ve krizler',
    'inanç, eğitim, yabancılar ve uzaklar',
    'kariyer, statü ve toplumdaki yer',
    'arkadaşlar, sosyal çevre ve gelecek',
    'gizli konular, bilinçaltı ve şifa',
  ],
  // Evlerin kısa adları: birden fazla ev birlikte anıldığında
  evKisa: [
    'benlik', 'öz değer ve para', 'iletişim', 'aile ve yuva', 'aşk', 'iş ve günlük rutin',
    'evlilik', 'mahremiyet', 'inanç ve uzaklar', 'kariyer', 'sosyal çevre', 'bilinçaltı',
  ],
  // Çarkın dört çeyreği
  kadran: [
    { evler: [1, 2, 3], ad: 'benlik', anlam: 'kişinin kendisiyle kurduğu ilişki' },
    { evler: [4, 5, 6], ad: 'yakın çevreyle entegrasyon', anlam: 'aile, keyif ve gündelik hayatla kurulan bağ' },
    { evler: [7, 8, 9], ad: 'diğerleriyle birebir ilişkiler', anlam: 'eş, ortak ve yakın bağlarla kurulan ilişki' },
    { evler: [10, 11, 12], ad: 'kolektifle entegrasyon', anlam: 'toplum, çevre ve görünmeyen dünyayla kurulan bağ' },
  ],
  kadranKalip: 'Bu ev, çarkın {kadran} çeyreğinde yer alır. Bu yüzden bu enerji en çok {anlam} üzerinden yaşanır.',

  // Gezegenlerin sevinç evleri (kendini en mutlu hissettiği ev)
  sevinc: { merkur: 1, ay: 3, venus: 5, mars: 6, gunes: 9, jupiter: 11, saturn: 12 },
  sevincKalip: '{Gezegen}, sevinç evi olan {ev}. evde bulunuyor: burada kendini en rahat ifade ettiği yerdedir ve bu yerleşim gezegenin olumlu yanlarını güçlendirir.',

  // Gezegenlerin kısa konuları (ortak tema kurulamayan eşleşmelerde ve düğüm, Yükselen, MC açılarında)
  gezegenKonusu: {
    gunes: 'kimlik', ay: 'duygular', merkur: 'zihin ve söz', venus: 'sevgi', mars: 'arzu ve irade',
    jupiter: 'inanç ve büyüme', saturn: 'sorumluluk ve sınırlar', uranus: 'özgürlük', neptun: 'hayaller',
    pluton: 'güç ve dönüşüm', kuzeyDugum: 'kader yolu', yukselen: 'kişilik ve görünüş', mc: 'hayat hedefleri',
  },

  // Açı analizinde ortak kelime: iki gezegenin birlikte anlattığı tema ("Bu açının ortak teması …")
  ortakTema: {
    'gunes-ay': 'kimlik ile duygusal ihtiyaçların dengesi',
    'gunes-merkur': 'kendini ifade etmek ve söz',
    'gunes-venus': 'sevgi, değer görmek ve yaratıcılık',
    'gunes-mars': 'irade, cesaret ve ateş',
    'gunes-jupiter': 'inanç, liderlik ve yayılmak',
    'gunes-saturn': 'otorite, sorumluluk ve olgunlaşmak',
    'gunes-uranus': 'bağımsızlık ve kendine özgü olmak',
    'gunes-neptun': 'ideal, ilham ve görünmeyeni sezmek',
    'gunes-pluton': 'güç, dönüşüm ve kontrol',
    'ay-merkur': 'duyguları anlamlandırmak ve hafıza',
    'ay-venus': 'şefkat, güzellik, bakım ve huzur',
    'ay-mars': 'duygu ile eylem, korumak ile savunmak',
    'ay-jupiter': 'duygusal bolluk, korunmak ve aile',
    'ay-saturn': 'duygusal güvenlik, kısıtlanma ve sorumluluk',
    'ay-uranus': 'duygusal özgürlük ve ani değişimler',
    'ay-neptun': 'rüyalar, sezgi ve sınırların erimesi',
    'ay-pluton': 'derin bağlanma, kaybetme korkusu ve güç',
    'merkur-venus': 'nazik söz, estetik ve diplomasi',
    'merkur-mars': 'söz ile eylem, tartışma ve hız',
    'merkur-jupiter': 'bilgi, inanç ve geniş düşünce',
    'merkur-saturn': 'ciddi düşünce, disiplin ve yapı',
    'merkur-uranus': 'ani fikirler ve sıra dışı bir zihin',
    'merkur-neptun': 'hayal gücü, sezgi ve yanılsama',
    'merkur-pluton': 'derin araştırma ve sözün gücü',
    'venus-mars': 'arzu, çekim ve tutku',
    'venus-jupiter': 'bolluk, cömertlik ve sosyal çevre',
    'venus-saturn': 'bağlılık, sadakat ve sevgide sınırlar',
    'venus-uranus': 'aşk ile özgürlük, sürpriz ve heyecan',
    'venus-neptun': 'romantizm, ideal aşk ve fedakârlık',
    'venus-pluton': 'tutku, sahiplenme ve dönüştüren aşk',
    'mars-jupiter': 'cesaret ile inanç, harekete geçmek ile sabır',
    'mars-saturn': 'irade ile engel, hız ile sabır',
    'mars-uranus': 'ani eylem, bağımsızlık ve ilkler',
    'mars-neptun': 'ilhamla hareket etmek ve yön bulmak',
    'mars-pluton': 'güç, tutku ve mücadele',
    'jupiter-saturn': 'büyümek ile sınırlar, genişlemek ile yapı',
    'jupiter-uranus': 'özgürlük, fırsat ve beklenmedik şans',
    'jupiter-neptun': 'inanç, ideal ve sınırsızlık',
    'jupiter-pluton': 'büyük güç ve kitlesel etki',
    'saturn-uranus': 'düzen ile değişim, kural ile özgürlük',
    'saturn-neptun': 'gerçek ile hayal, yapı ile çözülme',
    'saturn-pluton': 'kalıcı güç, baskı ve yeniden yapılanma',
    'uranus-neptun': 'kolektif ilham ve dönüşen idealler',
    'uranus-pluton': 'köklü değişim ve devrim',
    'neptun-pluton': 'kuşaksal dönüşüm ve derin değişim',
  },
  // İki noktanın ortak teması; tabloda yoksa (düğüm, Yükselen, MC) konuları birleştirilir
  tema(a, b) {
    const sira = ['gunes', 'ay', 'merkur', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptun', 'pluton'];
    const [x, y] = [a, b].sort((p, q) => sira.indexOf(p) - sira.indexOf(q));
    return this.ortakTema[`${x}-${y}`] || `${this.gezegenKonusu[a]} ile ${this.gezegenKonusu[b]}`;
  },
  ortakTemaKalip: 'Bu açının ortak teması {tema}.',
  // Gezegenlerin kesiştiği evler
  evlerKalip: 'Bu tema {ev1}. evin konusu olan {konu1} ile {ev2}. evin konusu olan {konu2} arasında yaşanır.',
  ayniEvKalip: 'Bu tema {ev}. evin konusu olan {konu} alanında yoğunlaşır.',

  // Açı türlerinin doğası (kesin bilgi)
  aciDogasi: {
    kavusum: 'Kavuşumda iki gezegenin enerjisi sütlü kahve gibi birbirine karışır ve ayrı düşünülemez: biri çalışınca diğeri de çalışır.',
    altmislik: 'Altmışlık açı bir fırsat kapısıdır: kendiliğinden çalışmaz, adım atıldığında büyük verim sağlar.',
    ucgen: 'Üçgen açı kusursuz bir akış ve doğuştan bir yetenektir: fark edilmese bile destekler, fark edildiğinde hayatı büyütür.',
    kare: 'Kare açı aktif bir gerilimdir: bilinçle kullanılmazsa kişiyi o kullanır, iradeyle kullanıldığında ise büyük başarı getirir.',
    karsit: 'Karşıtlık bir "ya o ya bu" gerilimidir: çoğu zaman dış dünyada, karşıdaki insanlarda tetiklenir ve içeride çözülür.',
    quincunx: 'Quincunx açı iki alan arasında süregelen bir ayar ihtiyacıdır: birinden ödün vermeden diğerine yer açmak emek ister.',
  },

  // Yanık ve Güneş ışınları altında
  yanikGenel: 'Güneş\'e 8°30\'dan yakın olduğu için yanık durumdadır: kendi ışığını, iradesini ve özgür ifadesini Güneş\'e teslim etmiş gibidir.',
  usbGenel: 'Güneş\'e 8°30\' ile 17° arası uzaklıkta, Güneş ışınları altındadır: biraz zayıflamıştır ama hâlâ mücadele şansı vardır.',
  // İlişki bağlamında yanığın anlamı
  yanik: {
    merkur: 'İlişkide sözleriniz kimliğinizin bir parçası olmuş gibi görünüyor: düşüncelerinizi savunurken diyalog yerine monolog kurmaya eğilimli olabilirsiniz. Fikirlerinizi onay ihtiyacından ayırmak size zihinsel bir özgürlük kazandırabilir.',
    venus: 'Sevginiz kimliğinizin hizmetine girmiş gibi görünüyor: ilişkide kendi isteklerinizi ve zevklerinizi açıkça ifade etmekte zorlanabilirsiniz. Değerinizi karşınızdakinin bakışından bağımsızlaştırmak sevginizi özgürleştirebilir.',
    mars: 'Arzunuz ve öfkeniz baskılanmış gibi görünüyor: ilişkide ya çatışmadan kaçıp pasifleşebilir ya da haklılığınızı kanıtlama savaşına girebilirsiniz. Bu enerjiyi kişisel gururdan çok ortak hedeflere yöneltmek size iyi gelebilir.',
    jupiter: 'İyimserliğiniz ve inancınız kimliğinizle iç içe geçmiş gibi görünüyor: ilişkide büyük beklentiler kurup onları kendi ölçünüzle tartabilirsiniz.',
    saturn: 'Sorumluluk duygunuz kimliğinizle iç içe geçmiş gibi görünüyor: ilişkide yükü tek başınıza taşımaya ve kontrolü elde tutmaya eğilimli olabilirsiniz.',
  },
  usb: {
    merkur: 'İlişkide düşüncelerinizi ifade ederken zaman zaman kendi bakış açınıza fazla sıkı tutunabilirsiniz, ama esnemeyi öğrenme şansınız güçlü görünüyor.',
    venus: 'Sevginizi göstermekte zaman zaman çekingen kalabilirsiniz, ama bu çekingenliği aşma şansınız güçlü görünüyor.',
    mars: 'Arzunuzu ve öfkenizi zaman zaman içinize atabilirsiniz, ama bu enerjiyi doğru kanala aktarma şansınız güçlü görünüyor.',
    jupiter: 'Beklentilerinizi zaman zaman kendi ölçünüzle tartabilirsiniz, ama ufkunuzu genişletme şansınız güçlü görünüyor.',
    saturn: 'Sorumluluğu zaman zaman tek başınıza taşımak isteyebilirsiniz, ama yükü paylaşmayı öğrenme şansınız güçlü görünüyor.',
  },
};
