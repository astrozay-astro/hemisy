// Karmik bağ bölümünün yorum metinleri.
// Arka planda drakonik harita (ruhun haritası), drakonik sinastri ve drakonik Davison, Ay Düğümleri, Vertex, Kara Ay,
// Talih / Ruh / Evlilik Kısmetleri ve vedik teknikler (nakşatralar, Aştakuta, Mangal Doşa, Jaimini karakaları) kullanılır.
// Okuyucuya teknik terim verilmez (teknik ayrıntı Harita bilgileri sekmesindedir). Mitolojik arketipler ve nakşatra adları
// birer hikâye olarak anlatılır. Dil her zaman olasılık dilidir. Metinlerde noktalı virgül kullanılmaz.
//
// Yer tutucular: {X} ve {Y} kişilerin adları, {N} tek bir kişinin adı. Ekler otomatik gelir: {X:in}, {Y:e}, {N:in}, {X:i}
// Burç dizileri Koç'tan Balık'a sıralıdır.
window.ASTROSHIP_KARMA_METINLERI = {
  basliklar: {
    tanisiklik: { soru: 'Ruhlarınız birbirini tanıyor mu?', glif: '☊' },
    gecmis: { soru: 'Geçmişten gelen iz', glif: '☋' },
    amac: { soru: 'Bu ilişkinin ruhsal amacı', glif: '☉' },
    sozlesme: { soru: 'Karmik sözleşmeniz', glif: '♄' },
    golge: { soru: 'Gölge, arzu ve dönüşüm', glif: '♇' },
    kader: { soru: 'Kader kapıları ve kısmetler', glif: '☌' },
    vedik: { soru: 'Vedik bakış: Ay yıldızlarınız', glif: '☽' },
  },

  // Her başlığın açılış cümlesi (arketip)
  girisler: {
    tanisiklik: 'Eski öğretilere göre ruh, kişilikten önce gelir ve onu aşar. Kişiliğin ardında, Ay\'ın yörüngesinin çizdiği görünmez bir ikinci harita daha olabilir: ruhun niyetini taşıyan harita.',
    gecmis: 'Hint mitolojisinde ölümsüzlük iksirinden bir yudum alan iblisin başı kesildiğinde gövdesi Ketu, başı Rahu olur. Başsız gövde Ketu, aklın unuttuğu ama bedenin hatırladığı her şeyi, yani geçmişten getirilen ustalıkları ve yarım kalmış bağları taşır.',
    amac: 'Bir ilişkinin de bir ruhu olabilir. İki kişinin arasında doğan bu üçüncü varlık, kendi niyetini ve bu dünyaya neden geldiğini taşıyabilir.',
    sozlesme: 'Kronos, Yunanların zaman tanrısıdır. Astrolojide karmanın efendisi olarak bilinir: verilen sözleri hatırlar, ödenmemiş hesapları sorar ve olgunlaşanı ödüllendirir.',
    golge: 'Persephone yeraltına indiğinde bir daha eskisi gibi dönmez, bir kraliçe olarak döner. Yeraltının efendisi Hades ve ilk kadın Lilith, insanın bastırdığı arzuların ve dönüşümün arketipleridir.',
    kader: 'Antik çağda Tykhe talihin, Daimon ise kişiye eşlik eden koruyucu ruhun adıydı. Doğum anının içinde gizli olan bu noktalar, kaderin kapısının nerede aralandığını gösterebilir.',
    vedik: 'Vedik gelenekte Ay, gökyüzündeki 27 yıldız konağında her gece başka bir konakta konaklayan bir yolcudur. Doğduğunuz gece Ay\'ın konakladığı yıldız, ruhunuzun hangi tanrının hikâyesini taşıdığını anlatabilir.',
  },

  // ----- 1) Ruhsal tanışıklık -----
  // Tanışıklık yüzdesine göre: [yüksek (≥70), orta (45–69), düşük (<45)]
  tanisiklikBant: [
    'Aranızda güçlü bir ruhsal tanışıklık izi olabilir. Birbirinizi ilk gördüğünüzde "seni bir yerden tanıyorum" duygusu belirmiş olabilir.',
    'Aranızda belirgin bir ruhsal tanışıklık izi olabilir. Bazı anlarda birbirinizi anlatmaya gerek kalmadan anlayabilirsiniz.',
    'Ruhsal tanışıklık bu ilişkinin ön plandaki teması olmayabilir. Bu, bağınızın geçmişten gelmekten çok bu hayatta, bilinçle kurulduğunu gösterebilir.',
  ],
  // Drakonik noktanın sahibi {N}: ruhun yüzü
  ruhYuzu: {
    gunes: '{N:in} ruhunun özü',
    ay: '{N:in} ruhunun duygusal hafızası',
    merkur: '{N:in} ruhunun düşünce dili',
    venus: '{N:in} ruhunun sevme biçimi',
    mars: '{N:in} ruhunun arzusu ve cesareti',
    jupiter: '{N:in} ruhunun inancı',
    saturn: '{N:in} ruhunun taşıdığı yük',
    yukselen: '{N:in} ruhunun dünyaya açılan kapısı',
  },
  // Doğum haritasındaki noktanın sahibi {N}: kişiliğin yüzü
  kisilikYuzu: {
    gunes: '{N:in} kimliğine',
    ay: '{N:in} kalbine',
    merkur: '{N:in} zihnine',
    venus: '{N:in} sevgisine',
    mars: '{N:in} arzusuna',
    jupiter: '{N:in} inancına',
    saturn: '{N:in} korkularına ve sorumluluklarına',
    yukselen: '{N:in} varlığının tamamına',
    mc: '{N:in} hayat yoluna',
  },
  drakonikKavusum: '{ruh} {kisilik} dokunuyor olabilir.',
  drakonikKarsit: '{ruh} {kisilik} karşıdan, bir ayna gibi bakıyor olabilir.',
  // Drakonik noktanın anlamı: {X} ruhun sahibi, {Y} dokunulan kişi
  drakonikAnlam: {
    gunes: '{Y}, {X:in} kim olduğunu ilk bakışta, kişiliğinin ardından görebilir. Bu, "seni tanıyorum" duygusunun en güçlü kaynaklarından biri olabilir.',
    ay: '{X}, {Y:in} yanında sanki eski bir eve dönmüş gibi hissedebilir. Bu duygusal tanıdıklık açıklanması zor bir güven doğurabilir.',
    merkur: 'Konuşmalarınız çoğu zaman yarım cümlelerle tamamlanabilir. Sanki aynı dili başka bir zamanda öğrenmişsiniz gibi olabilir.',
    venus: '{X:in} sevgisi {Y:e} yabancı gelmeyebilir. Bu sevgi, daha önce de yaşanmış bir aşkın devamı gibi hissedilebilir.',
    mars: 'Aranızdaki arzu ve cesaret eski bir yemin gibi olabilir. Birlikte bir şeye giriştiğinizde, bu mücadeleyi daha önce de vermiş gibi hissedebilirsiniz.',
    jupiter: '{X}, {Y:e} ruhsal bir öğretmen ya da yol gösterici gibi gelebilir. Bu bağda birbirinizin inancını tazeleme gücü olabilir.',
    saturn: 'Bu bağın ruhsal bir sözleşme yanı olabilir. {X}, {Y:e} karşı eski bir sorumluluğu taşıyormuş gibi hissedebilir. Sabırla taşındığında bu yük derin bir bağlılığa dönüşebilir.',
    yukselen: '{X:in} varlığı {Y:in} hayatına tanıdık bir kapıdan giriyor olabilir. İlk karşılaşmanız bir başlangıçtan çok bir kavuşma gibi hissedilmiş olabilir.',
  },
  drakonikKarsitEk: 'Karşıt temaslar, birbirinizde kendinizin unuttuğunuz yanını görmeniz için oluşabilir.',
  // Drakonik × drakonik: iki ruhun aynı yerde durması
  drakonikCift: '{ruhX} ile {ruhY} aynı yerde buluşuyor olabilir. Kişilikleriniz farklı görünse bile ruhlarınız aynı yöne bakıyor olabilir.',

  // Vertex: kaderin kapısı ({X} kapıdan giren, {Y} kapının sahibi)
  vertexGiris: '{X}, {Y:in} hayatına kaderin kapısından girmiş olabilir.',
  vertex: {
    gunes: 'Bu karşılaşma {Y:in} hayatında bir dönüm noktası gibi işlenebilir. {X:in} varlığı, {Y:in} kendi hayat amacını hatırlamasına vesile olabilir.',
    ay: '{X:in} şefkati, {Y:in} hayatına tam ihtiyaç duyduğu anda gelmiş olabilir. Bu bağda "tam zamanında" duygusu güçlü olabilir.',
    merkur: '{X:in} söylediği bir söz, {Y:in} hayatının yönünü değiştirebilir. Bu ilişki bir haberle, bir mesajla ya da bir sohbetle başlamış olabilir.',
    venus: 'Bu, kaderin aşk kapısı olabilir. {Y}, {X:i} gördüğü an bir şeyin değişeceğini sezmiş olabilir.',
    mars: '{X}, {Y:in} hayatına bir uyanış gibi girebilir. Bu karşılaşma {Y:i} harekete geçmeye, cesaret etmeye zorlayabilir.',
    jupiter: '{X}, {Y:in} hayatına bir lütuf gibi girebilir. Bu karşılaşma kapıların açıldığı, ufkun genişlediği bir dönemi başlatabilir.',
    saturn: 'Bu karşılaşma {Y:e} ağır ama kaçınılmaz bir ders gibi gelebilir. Kader, bu bağı olgunlaşmak için önünüze koymuş olabilir.',
    yukselen: '{X}, {Y:in} hayatında kaçınılmaz bir karşılaşma gibi durabilir. Aranızdaki çekim, iradenin ötesinde işliyormuş gibi hissedilebilir.',
    kuzeyDugum: '{X:in} kader yolu ile {Y:in} kader kapısı aynı noktada buluşuyor olabilir. Bu bağ, ikinizin de geleceğine yön veren bir karşılaşma olabilir.',
  },

  // ----- 2) Geçmişten gelen iz -----
  // Güney Düğüm teması: {X} gezegenin sahibi, {Y} düğümün sahibi
  guneyDugum: {
    gunes: '{X}, {Y:in} geçmişinden tanıdık bir figür gibi durabilir: belki bir lider, bir koruyucu ya da hayranlıkla izlenen biri. {Y}, {X:in} yanında eski bir rolü kendiliğinden yeniden oynayabilir. Bu tanıdıklık rahatlatıcı olabilir, ama ikinizi de eski kalıplara bağlayabilir.',
    ay: '{X} ile {Y} arasında çok eski bir aile bağı varmış gibi bir his olabilir. Belki bir anne ile çocuk, belki aynı ocakta büyümüş iki can. {Y}, {X:in} yanında korunmuş hissedebilir, ama bu bağın bu hayatta bağımlılığa değil olgun bir sevgiye dönüşmesi gerekebilir.',
    merkur: 'Aranızda yarım kalmış bir konuşma varmış gibi olabilir. Belki öğretmen ile öğrenci, belki iki kardeş ya da iki yoldaş. Birbirinizin cümlesini tamamlamak size kolay gelebilir. Bu hayatta ise yeni şeyler söylemeyi öğrenmeniz istenebilir.',
    venus: 'Bu ilişkide eski bir aşkın izi olabilir. {Y}, {X:in} sevgisini ilk anda tanıyabilir ve ona karşı koymakta zorlanabilir. Bu tanıdık sevgi tatlı olabilir. Yine de geçmişin aşkını tekrar etmek yerine bu hayatta onu yeniden yazmak size düşebilir.',
    mars: 'Aranızda eski bir mücadelenin ya da bitmemiş bir rekabetin izi olabilir. Belki aynı safta savaşan iki asker, belki karşı saflarda duran iki rakip. Çekim kadar sürtüşme de tanıdık gelebilir. Bu hayatta ise aynı ateşi birlikte bir şey inşa etmek için kullanmanız istenebilir.',
    jupiter: '{X}, geçmişte {Y:e} yol gösteren bir bilge, bir öğretmen ya da bir hami gibi olabilir. Bu bağda kendiliğinden bir güven ve cömertlik olabilir. Bu hayatta ise {Y}, {X:in} öğrettiklerini kendi yolunda yaşamaya çağrılabilir.',
    saturn: 'Bu, eski bir borcun ya da yerine getirilmemiş bir sözün izi olabilir. {X}, {Y:in} gözünde hem tanıdık hem de biraz ağır bir otorite gibi durabilir. Bu bağ zamanla çözülmeyi bekleyen bir düğüm gibi hissedilebilir. Sabır ve dürüstlükle bu düğüm çözüldüğünde ikiniz de hafifleyebilirsiniz.',
    yukselen: '{Y}, {X:i} ilk gördüğünde onu sanki daha önce de görmüş gibi hissetmiş olabilir. Bu karşılaşmada tanıdık bir yüz, tanıdık bir ses ya da tanıdık bir duruş olabilir. Bu bağ, geçmişte birlikte yaşanmış bir hayatın devamı gibi işleyebilir.',
  },
  guneyDugumYok: 'Aranızda geçmişten taşınan güçlü bir düğüm görünmüyor olabilir. Bu, ilişkinizin eski hesaplardan çok yeni bir sayfa üzerine kurulabileceğini gösterebilir.',
  // Kişinin Güney Ay Düğümü burcu: geçmişten getirdiği ustalık ve bırakması gereken alışkanlık
  guneyBurc: [
    '{N} bu hayata cesaret ve tek başına ayakta durma ustalığıyla gelmiş olabilir. İlişkide ise her şeyi kendi başına halletme alışkanlığını bırakıp "biz" demeyi öğrenmesi istenebilir.',
    '{N} bu hayata sabır, sadakat ve maddi dünyayı kurma ustalığıyla gelmiş olabilir. İlişkide ise güvenliğe tutunmayı bırakıp derin bir paylaşıma açılması istenebilir.',
    '{N} bu hayata merak, söz ve uyum sağlama ustalığıyla gelmiş olabilir. İlişkide ise her şeyi açıklamak yerine bir inanca ve bir anlama teslim olması istenebilir.',
    '{N} bu hayata şefkat, koruma ve yuva kurma ustalığıyla gelmiş olabilir. İlişkide ise başkalarını kollamanın ötesine geçip kendi yolunu ve sorumluluğunu üstlenmesi istenebilir.',
    '{N} bu hayata yaratıcılık, sevgiyi cesurca gösterme ve parlama ustalığıyla gelmiş olabilir. İlişkide ise sahnenin ortasından bir adım çekilip ortak bir hayale hizmet etmesi istenebilir.',
    '{N} bu hayata hizmet, özen ve kusursuzluk ustalığıyla gelmiş olabilir. İlişkide ise her şeyi düzeltmeye çalışmayı bırakıp akışa ve şefkate güvenmesi istenebilir.',
    '{N} bu hayata uyum, zarafet ve başkalarını memnun etme ustalığıyla gelmiş olabilir. İlişkide ise kendi isteğini açıkça söylemeyi ve kendi ayakları üzerinde durmayı öğrenmesi istenebilir.',
    '{N} bu hayata derinlik, kriz anlarında ayakta kalma ve dönüşüm ustalığıyla gelmiş olabilir. İlişkide ise yoğunluğu bırakıp basit, sakin ve huzurlu bir sevgiye izin vermesi istenebilir.',
    '{N} bu hayata inanç, özgürlük ve büyük resmi görme ustalığıyla gelmiş olabilir. İlişkide ise kaçmak yerine kalmayı, dinlemeyi ve gündelik paylaşımın değerini öğrenmesi istenebilir.',
    '{N} bu hayata sorumluluk, otorite ve kendini kontrol etme ustalığıyla gelmiş olabilir. İlişkide ise güçlü görünmeyi bırakıp duygularını ve kırılganlığını göstermesi istenebilir.',
    '{N} bu hayata bağımsızlık, dostluk ve topluluk için yaşama ustalığıyla gelmiş olabilir. İlişkide ise mesafeyi bırakıp sevgisini kalbiyle ve cesurca göstermesi istenebilir.',
    '{N} bu hayata sezgi, fedakârlık ve sınırları eritme ustalığıyla gelmiş olabilir. İlişkide ise kurtarıcı rolünü bırakıp sağlıklı sınırlar ve gündelik bir düzen kurması istenebilir.',
  ],
  guneyIkisiAyni: 'İkiniz de bu hayata benzer ustalıklarla ve benzer alışkanlıklarla gelmiş olabilirsiniz. Bu, birbirinizi çok kolay anlamanızı sağlayabilir, ama aynı eski kalıba birlikte sıkışma ihtimalini de artırabilir.',

  // ----- 3) İlişkinin ruhsal amacı -----
  // İlişkinin ruhsal haritasında Güneş: ilişkinin ruhunun özü
  amacGunes: [
    'Bu ilişkinin ruhu cesaret için doğmuş olabilir. Birlikte yeni bir yol açmak, ilk adımı atmak ve birbirinizi korkularınızın ötesine taşımak bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu kök salmak için doğmuş olabilir. Birlikte kalıcı bir şey inşa etmek, bedenin ve doğanın bilgeliğini paylaşmak bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu öğrenmek ve anlatmak için doğmuş olabilir. Birlikte merak etmek, birbirinize yeni dünyalar açmak ve söz aracılığıyla iyileşmek bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu bir yuva olmak için doğmuş olabilir. Birbirinize güvenli bir liman olmak ve eski aile yaralarını şefkatle sarmak bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu sevgiyi cesurca yaşamak için doğmuş olabilir. Birbirinizin içindeki çocuğu, yaratıcılığı ve neşeyi uyandırmak bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu iyileştirmek ve hizmet etmek için doğmuş olabilir. Birbirinize ve hayata gündelik, sessiz ama gerçek bir emekle dokunmak bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu dengeyi öğrenmek için doğmuş olabilir. Vermek ile almak, ben ile biz arasındaki o ince terazi bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu dönüşüm için doğmuş olabilir. Birbirinizin gölgesine bakmak, korkuları birlikte aşmak ve küllerinizden yeniden doğmak bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu anlam aramak için doğmuş olabilir. Birlikte yolculuk etmek, inanmak ve hayatın büyük sorularına birlikte cevap aramak bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu olgunlaşmak için doğmuş olabilir. Birlikte bir sorumluluk taşımak, zamanla sınanmak ve kalıcı bir eser bırakmak bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu özgürleşmek için doğmuş olabilir. Birbirinizi kalıplardan kurtarmak ve birlikte geleceğe dair bir vizyon taşımak bu bağın derindeki niyeti olabilir.',
    'Bu ilişkinin ruhu teslimiyet ve şefkat için doğmuş olabilir. Koşulsuz sevgiyi öğrenmek ve birlikte görünmeyenle bağ kurmak bu bağın derindeki niyeti olabilir.',
  ],
  // İlişkinin ruhsal haritasında Ay: ilişkinin ruhunun duygusal ihtiyacı
  amacAy: [
    'Ruhsal düzeyde bu bağ heyecanla ve birlikte harekete geçmekle beslenebilir.',
    'Ruhsal düzeyde bu bağ dokunmayla, huzurla ve süreklilikle beslenebilir.',
    'Ruhsal düzeyde bu bağ konuşmakla, gülmekle ve birlikte merak etmekle beslenebilir.',
    'Ruhsal düzeyde bu bağ korunmuşluk hissiyle ve baş başa geçen sıcak zamanlarla beslenebilir.',
    'Ruhsal düzeyde bu bağ görülmek, takdir edilmek ve birlikte kutlamakla beslenebilir.',
    'Ruhsal düzeyde bu bağ küçük özenlerle ve birbirinize gündelik yardımlarla beslenebilir.',
    'Ruhsal düzeyde bu bağ incelikle, güzellikle ve kırıcı olmayan bir uyumla beslenebilir.',
    'Ruhsal düzeyde bu bağ tam bir güvenle, sırlarla ve derin bir mahremiyetle beslenebilir.',
    'Ruhsal düzeyde bu bağ özgürlükle, yolculuklarla ve ortak bir inançla beslenebilir.',
    'Ruhsal düzeyde bu bağ sadakatle, verilen sözlerle ve zamanla kazanılan güvenle beslenebilir.',
    'Ruhsal düzeyde bu bağ dostlukla, birbirinize alan tanımakla ve ortak hayallerle beslenebilir.',
    'Ruhsal düzeyde bu bağ sessiz anlarla, sezgiyle ve sanatla beslenebilir.',
  ],
  // İlişkinin ruhsal haritasında Yükselen: ilişkinin ruhunun dünyaya açılan kapısı
  amacYukselen: [
    'Bu ilişki, ruhunu dünyaya cesur bir girişimle gösterebilir.',
    'Bu ilişki, ruhunu dünyaya sabırla kurulan somut bir hayatla gösterebilir.',
    'Bu ilişki, ruhunu dünyaya paylaşılan fikirlerle ve sözlerle gösterebilir.',
    'Bu ilişki, ruhunu dünyaya bir aile ya da bir yuva olarak gösterebilir.',
    'Bu ilişki, ruhunu dünyaya yaratıcı bir eserle ve paylaşılan neşeyle gösterebilir.',
    'Bu ilişki, ruhunu dünyaya başkalarına iyi gelen bir emekle gösterebilir.',
    'Bu ilişki, ruhunu dünyaya güzellikle ve örnek olan bir ortaklıkla gösterebilir.',
    'Bu ilişki, ruhunu dünyaya başkalarını da dönüştüren bir derinlikle gösterebilir.',
    'Bu ilişki, ruhunu dünyaya bir öğreti, bir yolculuk ya da bir inançla gösterebilir.',
    'Bu ilişki, ruhunu dünyaya kalıcı bir yapıyla ve saygınlıkla gösterebilir.',
    'Bu ilişki, ruhunu dünyaya bir topluluğa ya da ortak bir davaya katkıyla gösterebilir.',
    'Bu ilişki, ruhunu dünyaya şefkatle, sanatla ya da görünmeyen bir yardımla gösterebilir.',
  ],
  // Kuzey Düğüm teması: {X} gezegenin sahibi, {Y} düğümün sahibi
  kuzeyDugum: {
    gunes: '{X}, {Y:in} bu hayatta büyümek istediği yönü bizzat yaşıyor gibi görünebilir. {Y}, {X:in} yanında kendi geleceğine doğru çekildiğini hissedebilir.',
    ay: '{X:in} şefkati, {Y:in} bu hayatta öğrenmek istediği duygusal derinliği ona gösterebilir. Bu bağ {Y} için bir büyüme yuvası olabilir.',
    merkur: '{X:in} düşünceleri ve sözleri, {Y:in} bu hayattaki yolunu aydınlatabilir. Birlikte öğrendikleriniz ikinizi de ileri taşıyabilir.',
    venus: '{X:in} sevgisi, {Y:in} bu hayatta sevmeyi ve sevilmeyi yeniden öğrenmesine yardım edebilir. Bu, geleceğe açılan bir aşk olabilir.',
    mars: '{X:in} cesareti, {Y:i} bu hayatta korktuğu adımları atmaya teşvik edebilir. Bu bağ harekete geçiren bir kader buluşması olabilir.',
    jupiter: '{X}, {Y:in} bu hayattaki yolunda bir şans kapısı gibi olabilir. Birlikteyken {Y:in} önü açılabilir ve ufku genişleyebilir.',
    saturn: '{X}, {Y:e} bu hayatta öğrenmesi gereken sorumluluğu ve olgunluğu öğretebilir. Bu ders zaman zaman ağır gelebilir, ama {Y:i} kalıcı biçimde güçlendirebilir.',
    yukselen: '{X:in} varlığı, {Y:in} kaderine giden yolun ortasında duruyor gibi olabilir. Bu karşılaşma {Y} için geleceğe açılan bir kapı olabilir.',
  },

  // ----- 4) Karmik sözleşme -----
  // Satürn teması: {X} Satürn'ün sahibi, {Y} dokunulan kişi. u = uyumlu, g = kavuşum ya da gergin
  saturn: {
    gunes: {
      u: '{X}, {Y:in} hayat amacına sağlam bir zemin sunmak için bu hayata gelmiş gibi olabilir. Aranızda zamanla değer kazanan, sessiz ama güçlü bir sadakat olabilir.',
      g: '{X}, {Y:in} parlamasını ister istemez sınırlayan bir otorite gibi görünebilir. Bu, geçmişte yarım kalmış bir sorumluluğun izi olabilir. Dürüstlükle konuşulduğunda bu bağ ikinizi de olgunlaştırabilir.',
    },
    ay: {
      u: '{X}, {Y:in} duygularına güvenli bir kap olabilir. {Y}, {X:in} yanında kalıcılığın ve korunmanın ne demek olduğunu öğrenebilir.',
      g: '{Y}, {X:in} yanında duygularını göstermekte zorlanabilir ya da kendini soğuk karşılanmış hissedebilir. Bu, eski bir duygusal borcun izi olabilir. Şefkatle çalışıldığında aranızda çok derin bir güven doğabilir.',
    },
    merkur: {
      u: '{X}, {Y:in} fikirlerine ciddiyet ve derinlik kazandırabilir. Birlikte uzun vadeli planlar yapmak size kolay gelebilir.',
      g: '{Y}, {X:in} yanında söylediklerinin yargılandığını hissedebilir. Bu bağda doğru kelimeleri sabırla bulmak bir ruhsal ödev olabilir.',
    },
    venus: {
      u: '{X}, {Y:in} sevgisine kalıcılık ve sadakat kazandırabilir. Bu, zamanla olgunlaşan, yaşlandıkça güzelleşen bir aşk olabilir.',
      g: 'Sevginiz bir sınavla birlikte gelebilir. {Y}, {X:in} yanında sevgisinin karşılık görmediğini hissedebilir, {X} ise bağlanmaktan çekinebilir. Bu, karmik ilişkilerin en bilinen imzalarından biri olabilir. Sabırla taşındığında son derece sadık bir bağa dönüşebilir.',
    },
    mars: {
      u: '{X}, {Y:in} enerjisine yön ve disiplin verebilir. Birlikte uzun soluklu bir hedefe yürüdüğünüzde çok güçlü bir ekip olabilirsiniz.',
      g: '{Y}, {X:in} yanında frenlenmiş ya da engellenmiş hissedebilir. Bu, geçmişten kalma bir güç mücadelesinin izi olabilir. Öfkeyi biriktirmeden konuşmak bu düğümü çözebilir.',
    },
    yukselen: {
      u: '{X}, {Y:in} hayatına bir dayanak gibi girebilir. {Y}, {X:in} yanında daha olgun ve kararlı bir hâline kavuşabilir.',
      g: '{X}, {Y:e} ilk anda mesafeli ya da ağır gelebilir. Ama bu bağ zamanla, verilmiş bir sözün yerine gelmesi gibi işleyebilir.',
    },
  },
  saturnYok: 'Aranızda karmik bir borç ya da ağır bir sözleşme izi belirgin olmayabilir. Bu, ilişkinizi geçmişin yükünden çok bugünün seçimleriyle şekillendirebileceğinizi gösterebilir.',

  // ----- 5) Gölge, arzu ve dönüşüm -----
  // Plüton teması: {X} Plüton'un sahibi, {Y} dokunulan kişi
  pluton: {
    gunes: {
      u: '{X}, {Y:in} gücünü fark etmesini ve kendini yeniden yaratmasını sağlayabilir. Bu bağ sessiz ama köklü bir dönüşüm getirebilir.',
      g: '{X}, {Y:in} kimliğini derinden sarsabilir. Aranızda eski bir güç mücadelesinin izi olabilir. Kontrol yerine güvene yöneldiğinizde bu yoğunluk ikinizi de yeniden doğurabilir.',
    },
    ay: {
      u: '{X}, {Y:in} en derin duygularına korkusuzca inebilir ve orada iyileştirici bir şey bulabilir.',
      g: '{X}, {Y:in} kalbinin en saklı odalarına dokunabilir. Bu yakınlık hem büyüleyici hem de korkutucu olabilir. Kıskançlık ve sahiplenme eski bir yaranın sesi olabilir.',
    },
    venus: {
      u: 'Aranızdaki sevgi derin ve dönüştürücü olabilir. Bu aşk ikinizi de daha cesur ve daha sahici kılabilir.',
      g: 'Bu, Hades ile Persephone\'nin hikâyesi gibi olabilir: karşı konulmaz bir çekim ve kaybetme korkusu iç içe geçebilir. Takıntı yerine teslimiyet seçildiğinde bu aşk ikinizi de dönüştürebilir.',
    },
    mars: {
      u: 'Birlikteyken olağanüstü bir güç ortaya çıkabilir. Bu enerjiyi ortak bir amaca yönelttiğinizde neredeyse durdurulamaz olabilirsiniz.',
      g: 'Aranızdaki arzu ve öfke aynı derin kaynaktan beslenebilir. Bu, geçmişten kalma bir hesaplaşmanın izi olabilir. Gücü birbirinize karşı değil birlikte kullanmayı seçtiğinizde bu ateş iyileştirebilir.',
    },
    yukselen: {
      u: '{X}, {Y:in} hayatına bir dönüşüm rüzgârı gibi girebilir. {Y}, bu ilişkiden sonra kendini bambaşka biri olarak bulabilir.',
      g: '{X:in} varlığı {Y} üzerinde neredeyse büyüleyici bir etki bırakabilir. Bu çekimin ardında, ruhun birbirini yeniden bulma arzusu olabilir.',
    },
  },
  // Kara Ay teması: {X} gezegenin sahibi, {Y} Kara Ay'ın sahibi
  karaAy: {
    gunes: '{X:in} varlığı, {Y:in} sakladığı ve kimseye göstermediği yanını uyandırabilir. Bu bağda bastırılmış bir güç, özgür kalmak isteyebilir.',
    ay: '{X:in} şefkati, {Y:in} eski bir yalnızlık yarasına dokunabilir. Bu temas acıtabilir ama şifa da getirebilir.',
    venus: '{X:in} sevgisi {Y:in} yasak sayılan arzularını uyandırabilir. Aranızda karşı konulmaz, biraz da tehlikeli hissettiren bir çekim olabilir.',
    mars: '{X:in} arzusu {Y:in} içindeki vahşi ve özgür kadını ya da erkeği uyandırabilir. Bu çekim çok güçlü ama kontrol edilmesi zor olabilir.',
    yukselen: '{X}, {Y:in} gölgesini ona yansıtan bir ayna gibi olabilir. Bu bağ hem çekici hem de rahatsız edici gelebilir, ama {Y:in} kendini bütünüyle kabul etmesine vesile olabilir.',
  },
  golgeYok: 'Aranızda yoğun bir gölge çalışması ya da güç mücadelesi izi belirgin olmayabilir. Bu, ilişkinizin dönüşümü sarsıntıyla değil yumuşak bir büyümeyle yaşayabileceğini gösterebilir.',

  // ----- 6) Kader kapıları ve kısmetler -----
  // Gezegenin sunduğu şey ({X} sahibi)
  kismetVerici: {
    gunes: '{X:in} varlığı', ay: '{X:in} şefkati', venus: '{X:in} sevgisi', mars: '{X:in} cesareti ve arzusu',
    jupiter: '{X:in} iyimserliği ve cömertliği', saturn: '{X:in} bağlılığı ve ciddiyeti', yukselen: '{X:in} varlığı',
  },
  // {verici} yukarıdaki ifade, {Y} kısmetin sahibi
  kismet: {
    ruh: '{verici}, {Y:in} ruhunun iradesine ve kendi kaderini seçme gücüne dokunabilir. {Y}, bu ilişkide kendi hayatının yönünü daha net görebilir. Antik gelenekte bu nokta kişinin koruyucu ruhuyla, yani Daimon\'uyla ilişkilendirilir.',
    talih: '{verici}, {Y:in} talihinin ve bedeninin huzurunun tam ortasına dokunabilir. Bu ilişki {Y} için şanslı bir dönemi başlatabilir. Tykhe\'nin çarkı bu bağda {Y:in} lehine dönüyor olabilir.',
    evlilik: '{verici}, {Y:in} evlilik ve bağlılık noktasına dokunabilir. Geleneksel olarak bu, birlikteliği resmî ve kalıcı bir bağa dönüştürme eğiliminin işaretlerinden biri olabilir.',
  },
  kismetNoktasi: { ruh: 'ruhunun iradesine', talih: 'talih noktasına', evlilik: 'evlilik ve bağlılık noktasına' },
  kismetKarsilikli: 'Aynı işaret karşılıklı da olabilir: {verici} de {Y:in} {nokta} dokunabilir. Bu kader işaretinin iki yönlü olması bağı daha da güçlendirebilir.',
  kaderYok: 'Bu ilişkide kaderin kapısını aralayan belirgin bir nokta görünmüyor olabilir. Bu, bağınızın yazgıdan çok özgür iradeyle şekillendiğini gösterebilir. Bu da kendi başına güzel bir şey olabilir.',

  // ----- 7) Vedik bakış -----
  // Ay'ın nakşatrası: arketip ve sevme biçimi ({N} kişinin adı)
  nakshatra: [
    '{N:in} Ay\'ı, tanrıların hekimi olan ikiz atlı Aşvinler\'in yıldızı Aşvini\'de olabilir. Aşvinler şafakla birlikte gelir ve yaralıları iyileştirir. {N} sevgide hızlı, coşkulu ve iyileştirici olabilir. Karmik dersi ise sabırla kalmayı öğrenmek olabilir.',
    '{N:in} Ay\'ı, ölümün ve adaletin tanrısı Yama\'nın yıldızı Bharani\'de olabilir. Simgesi rahimdir: hem doğurur hem de bitirir. {N} aşkı bütün yoğunluğuyla, sınırlarına kadar yaşayabilir. Karmik dersi, arzuyu sorumlulukla taşımak olabilir.',
    '{N:in} Ay\'ı, ateş tanrısı Agni\'nin yıldızı Krittika\'da olabilir. Bıçak gibi keskin, alev gibi arındırıcıdır. {N} sevdiklerini korur ama sahte olana tahammül edemeyebilir. Karmik dersi, keskinliğini şefkatle yumuşatmak olabilir.',
    '{N:in} Ay\'ı, Ay tanrısının en sevdiği eşi olan Rohini\'de olabilir. Yaratıcı Brahma\'nın bereketini taşır. {N} sevgide çekici, duyusal ve sadık olabilir. Karmik dersi, sahiplenmeden sevmeyi öğrenmek olabilir.',
    '{N:in} Ay\'ı, ölümsüzlük nektarı Soma\'nın yıldızı Mrigaşira\'da olabilir. Simgesi ormanda bir şey arayan ceylandır. {N} sevgide meraklı, nazik ve hep biraz arayış içinde olabilir. Karmik dersi, aradığını bulduğunda durabilmek olabilir.',
    '{N:in} Ay\'ı, fırtına tanrısı Rudra\'nın yıldızı Ardra\'da olabilir. Simgesi bir gözyaşı damlasıdır: fırtınadan sonra toprağı temizleyen yağmur. {N} duygularını yoğun yaşayabilir ve krizlerden yenilenerek çıkabilir. Karmik dersi, acıyı bilgeliğe dönüştürmek olabilir.',
    '{N:in} Ay\'ı, tanrıların annesi Aditi\'nin yıldızı Punarvasu\'da olabilir. Adı "ışığın geri dönüşü" anlamına gelir. {N} sevgide affedici, umutlu ve yuvaya bağlı olabilir. Karmik dersi, kaybettiğini yeniden bulabileceğine güvenmek olabilir.',
    '{N:in} Ay\'ı, tanrıların öğretmeni Brihaspati\'nin yıldızı Puşya\'da olabilir. Gökyüzünün en besleyici yıldızı sayılır. {N} sevdiklerini besleyen, koruyan ve onlara yol gösteren biri olabilir. Karmik dersi, başkalarını beslerken kendini de beslemek olabilir.',
    '{N:in} Ay\'ı, yılan bilgeleri Nagalar\'ın yıldızı Aşleşa\'da olabilir. Simgesi kıvrılmış bir yılandır: sarılır, büyüler ve korur. {N} sevgide derin, sezgisel ve tutkulu olabilir. Karmik dersi, sarılmak ile sıkmak arasındaki farkı öğrenmek olabilir.',
    '{N:in} Ay\'ı, ataların ruhları Pitriler\'in yıldızı Magha\'da olabilir. Simgesi tahttır. {N}, soyundan gelen bir onuru ve eski bir hafızayı taşıyabilir. Sevgide sadık ve gururlu olabilir. Karmik dersi, ataların yükünü onurlandırıp kendi yolunu çizmek olabilir.',
    '{N:in} Ay\'ı, evlilik saadetinin tanrısı Bhaga\'nın yıldızı Purva Phalguni\'de olabilir. Simgesi dinlenme yatağıdır. {N} aşkta keyifli, cömert ve romantik olabilir. Karmik dersi, zevk ile anlam arasında denge kurmak olabilir.',
    '{N:in} Ay\'ı, sözleşmelerin ve dostluğun tanrısı Aryaman\'ın yıldızı Uttara Phalguni\'de olabilir. Evlilik yeminlerinin koruyucusudur. {N} sevgide güvenilir, yardımsever ve sözüne sadık olabilir. Karmik dersi, vermenin yanında almayı da kabul etmek olabilir.',
    '{N:in} Ay\'ı, güneşin yaratıcı gücü Savitri\'nin yıldızı Hasta\'da olabilir. Simgesi açık bir eldir. {N} sevgisini dokunuşla, emekle ve becerikli ellerle gösterebilir. Karmik dersi, her şeyi kontrol etmeden de güvende olabileceğini öğrenmek olabilir.',
    '{N:in} Ay\'ı, göklerin mimarı Tvaştar\'ın yıldızı Çitra\'da olabilir. Simgesi parlak bir mücevherdir. {N} sevgide estetik, çekici ve yaratıcı olabilir. Karmik dersi, dış güzelliğin ardındaki özü görmek olabilir.',
    '{N:in} Ay\'ı, rüzgâr tanrısı Vayu\'nun yıldızı Svati\'de olabilir. Simgesi rüzgârda eğilen ama kırılmayan bir filizdir. {N} sevgide özgürlüğüne düşkün, nazik ve uyumlu olabilir. Karmik dersi, özgür kalırken de kök salabilmek olabilir.',
    '{N:in} Ay\'ı, İndra ile Agni\'nin birlikte yönettiği Vişakha\'da olabilir. Simgesi zafer takıdır. {N} sevgide kararlı, tutkulu ve hedefine bağlı olabilir. Karmik dersi, ulaşmak istediği yere giderken yanındakini unutmamak olabilir.',
    '{N:in} Ay\'ı, dostluk ve sadakat tanrısı Mitra\'nın yıldızı Anuradha\'da olabilir. Simgesi çamurdan açan lotustur. {N} sevgide derin bir bağlılık ve dostluk taşıyabilir. Karmik dersi, zor koşullarda bile sevgiyi canlı tutmak olabilir.',
    '{N:in} Ay\'ı, tanrıların kralı İndra\'nın yıldızı Jyeşta\'da olabilir. Adı "en büyük olan" demektir. {N} sevdiklerini korumak için güçlü ve sorumlu davranabilir. Karmik dersi, güçlü olmanın yalnız kalmak anlamına gelmediğini öğrenmek olabilir.',
    '{N:in} Ay\'ı, çözülüş tanrıçası Nirriti\'nin yıldızı Mula\'da olabilir. Adı "kök" demektir. {N} her şeyin özüne inmek isteyebilir ve sevgide sahicilik arayabilir. Karmik dersi, eskiyi kökünden bırakıp yeniden filizlenmek olabilir.',
    '{N:in} Ay\'ı, kutsal suların tanrıçası Apas\'ın yıldızı Purva Aşadha\'da olabilir. Su gibi arındırır ve yenilmezdir. {N} sevgide coşkulu, ikna edici ve canlandırıcı olabilir. Karmik dersi, akarken yolunu kaybetmemek olabilir.',
    '{N:in} Ay\'ı, evrensel tanrılar Vişvadevalar\'ın yıldızı Uttara Aşadha\'da olabilir. Adı "sonunda gelen zafer" demektir. {N} sevgide dürüst, sabırlı ve uzun vadeli düşünen biri olabilir. Karmik dersi, zaferin acele etmeden geldiğine güvenmek olabilir.',
    '{N:in} Ay\'ı, koruyucu tanrı Vişnu\'nun yıldızı Şravana\'da olabilir. Simgesi kulaktır: dinleyen, duyan ve öğrenen. {N} sevgide iyi bir dinleyici ve sadık bir yoldaş olabilir. Karmik dersi, sessizliğin içindeki bilgeliği duymak olabilir.',
    '{N:in} Ay\'ı, sekiz bolluk tanrısı Vasular\'ın yıldızı Dhanişta\'da olabilir. Simgesi davuldur: ritim, müzik ve kutlama. {N} sevgide cömert, neşeli ve uyum arayan biri olabilir. Karmik dersi, içindeki boşluğu dışarıdaki seslerle doldurmamak olabilir.',
    '{N:in} Ay\'ı, kozmik suların efendisi Varuna\'nın yıldızı Şatabhişa\'da olabilir. Adı "yüz hekim" demektir. {N} sevgide bağımsız, gizemli ve iyileştirici olabilir. Karmik dersi, kendi yarasını da başkalarına gösterebilmek olabilir.',
    '{N:in} Ay\'ı, tek ayaklı ateş ejderi Aja Ekapada\'nın yıldızı Purva Bhadrapada\'da olabilir. Arınmanın ve kutsal ateşin yıldızıdır. {N} sevgide idealist, yoğun ve dönüştürücü olabilir. Karmik dersi, uç noktalar arasında dengede kalmak olabilir.',
    '{N:in} Ay\'ı, derin suların yılanı Ahir Budhnya\'nın yıldızı Uttara Bhadrapada\'da olabilir. Okyanusun dibindeki sessiz bilgeliği taşır. {N} sevgide sakin, derin ve fedakâr olabilir. Karmik dersi, derinliğini paylaşmaktan çekinmemek olabilir.',
    '{N:in} Ay\'ı, yolcuların koruyucusu Puşan\'ın yıldızı Revati\'de olabilir. Zodyağın son yıldızıdır ve ruhları evlerine kadar uğurlar. {N} sevgide şefkatli, koruyucu ve hayalperest olabilir. Karmik dersi, herkesi korumaya çalışırken kendini kaybetmemek olabilir.',
  ],
  ayniNakshatra: 'Ay\'larınız aynı yıldızda olabilir. Vedik gelenekte bu, ruhların aynı tanrının hikâyesini taşıdığı ve birbirini içgüdüsel olarak tanıdığı anlamına gelebilir.',

  // Aştakuta toplamına göre: [≥28, 24–27, 18–23, <18]
  gunaBant: [
    'Vedik gelenekte evlilik uyumu 36 puan üzerinden ölçülür. Sizin puanınız {puan} olabilir. Bu, geleneğin "çok uyumlu" saydığı bir birliktelik olabilir.',
    'Vedik gelenekte evlilik uyumu 36 puan üzerinden ölçülür. Sizin puanınız {puan} olabilir. Bu, geleneğin "iyi ve bereketli" saydığı bir birliktelik olabilir.',
    'Vedik gelenekte evlilik uyumu 36 puan üzerinden ölçülür. Sizin puanınız {puan} olabilir. Bu, geleneğin "kabul edilebilir" saydığı ve emekle güçlenen bir birliktelik olabilir.',
    'Vedik gelenekte evlilik uyumu 36 puan üzerinden ölçülür. Sizin puanınız {puan} olabilir. Gelenek bu düzeyi zorlayıcı sayar, ama puan haritanın tamamını anlatmaz. Diğer bağlarınız bu açığı kapatabilir.',
  ],
  kuta: {
    nadiDosa: 'Yaşam enerjileriniz aynı kanaldan akıyor olabilir. Gelenek bunu dikkat edilmesi gereken bir nokta sayar: birbirinize çok benzediğiniz için aynı anda yorulup aynı anda tükenebilirsiniz. Birbirinizi dinlendirmeyi bilinçle öğrenmek bu dengeyi kurabilir.',
    nadiIyi: 'Yaşam enerjileriniz farklı kanallardan akıyor olabilir. Gelenek bunu beden ve sağlık uyumu için çok değerli sayar: biriniz tükendiğinde diğeri onu besleyebilir.',
    bhakutDosa: 'Ay burçlarınız arasındaki mesafe, duygusal ritimlerinizin farklı zamanlarda inip çıkabileceğini gösterebilir. Birinizin coştuğu anda diğeri içine kapanabilir. Bunu bilmek, birbirinizi kişisel algılamadan desteklemenizi kolaylaştırabilir.',
    yoniYuksek: 'İçgüdüsel doğalarınız birbirine çok uygun olabilir. Gelenek bunu iki ruhun bedeninin de birbirini tanıması olarak yorumlar.',
    yoniDusuk: 'İçgüdüsel doğalarınız birbirinden farklı olabilir. Fiziksel ritimlerinizi ve ihtiyaçlarınızı konuşmak bu farkı bir zenginliğe dönüştürebilir.',
    ganaUyumlu: 'Mizaçlarınız aynı kökten geliyor olabilir. Gündelik hayatta birbirinizin tepkilerini doğal karşılayabilirsiniz.',
    ganaUyumsuz: 'Mizaçlarınız farklı köklerden geliyor olabilir: biriniz daha yumuşak, diğeriniz daha ateşli ve kendi bildiğini okuyan olabilir. Bu fark saygıyla karşılandığında ilişkiyi dengeleyebilir.',
    maitriYuksek: 'Ay\'larınızın yöneticileri birbirine dost olabilir. Bu, zihinsel olarak birbirinize iyi gelen, sohbeti kolay bir dostluk anlamına gelebilir.',
  },
  // Mangal Doşa: Mars'ın evlilik evlerinde olması
  mangal: {
    ikisi: 'Vedik gelenekte ikinizin haritasında da Mars\'ın ateşi evlilik alanlarında güçlü olabilir. Gelenek bunu bir denge sayar: ateşiniz aynı yükseklikte yandığı için birbirinizi yakmadan ısıtabilirsiniz.',
    biri: 'Vedik gelenekte {N:in} haritasında Mars\'ın ateşi evlilik alanlarında güçlü olabilir. Bu, {N:in} ilişkiye daha fazla tutku ama aynı zamanda daha fazla sabırsızlık getirebileceği anlamına gelebilir. Bunu bilmek, ateşi kavgaya değil ortak bir amaca yöneltmenize yardım edebilir.',
  },
  // Jaimini bağları: {X} ruh göstergesinin sahibi, {Y} eş göstergesinin sahibi
  jaimini: {
    akDkAyni: 'Vedik gelenekte ruhu en çok temsil eden gezegen ile eşi temsil eden gezegen bir araya geldiğinde, kişilerin birbirinin kaderinde yazılı olduğu söylenir. {X:in} ruhunu taşıyan güç, {Y:in} haritasında eşi taşıyan güçle aynı olabilir.',
    akDkBurc: '{X:in} ruhunun en derin arzusu, {Y:in} haritasında eşini aradığı yerde duruyor olabilir. Vedik gelenekte bu, ruhsal bir eşleşmenin güçlü işaretlerinden biri sayılır.',
    akYedinci: '{X:in} ruhunun en derin arzusu, {Y:in} haritasında evlilik ve ortaklık alanına düşüyor olabilir. {Y}, {X:i} doğal bir eş olarak görebilir.',
    ayKetu: '{X:in} duygusal dünyası, {Y:in} geçmişten getirdiği hafızanın içinde duruyor olabilir. {Y}, {X:in} duygularını sanki önceden biliyormuş gibi tanıyabilir.',
  },

  // Paragraflar arası bağlaçlar
  baglaclar: ['Bunun yanında', 'Ayrıca', 'Buna ek olarak', 'Öte yandan'],
};
