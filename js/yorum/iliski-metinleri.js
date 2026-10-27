// İlişki yapısı yorum metinleri (kompozit ve Davison haritaları).
// Arka planda Helenistik (sekt, gezegen gücü, köşe evler, görmeme, kısmetler, yönetici zinciri), karmik (Ay Düğümleri,
// geri hareket, 12. ev) ve neoklasik (arketipler, türetilmiş evler) yöntemler kullanılır; okuyucuya teknik terim verilmez.
// Arka plan bilgisi (giriş cümleleri, mitoloji) kesin dille yazılır. Yorum ise olasılık dilindedir: "olabilir", "-ebilir".
// Burç dizileri Koç'tan Balık'a, ev dizileri 1. evden 12. eve sıralıdır (tüm burç evleri).
window.ASTROSHIP_ILISKI_METINLERI = {
  basliklar: {
    baslangic: { soru: 'İlişki nasıl başlayabilir?', glif: '☌' },
    kimlik: { soru: 'İlişkinin kimliği ve amacı', glif: '☉' },
    beslenme: { soru: 'İlişki nereden beslenir?', glif: '☽' },
    iyiGelen: { soru: 'İlişkiye ne iyi gelir?', glif: '♀' },
    sinav: { soru: 'İlişki hangi alanlarda sınanır?', glif: '♄' },
    catisma: { soru: 'Hangi konular çatışma yaratabilir?', glif: '♂' },
    karmik: { soru: 'İlişkinin karmik dersi', glif: '☊' },
  },

  // Her başlığın açılış cümlesi (arketip)
  girisler: {
    baslangic: 'Bir ilişkinin ilk anı, bütün hikâyesinin tohumunu taşır.',
    kimlik: 'Her ilişkinin, Apollon\'un ışığı gibi yolunu aydınlatan bir özü vardır.',
    beslenme: 'Her ilişkinin atan bir kalbi vardır. Gece boyunca yüzü değişen Ay gibi duygular da bu kalpten beslenir.',
    iyiGelen: 'Afrodit\'in dokunduğu her şey güzelleşir. Bu ilişkide onun dokunuşunun nerede durduğu, size neyin iyi geleceğini anlatır.',
    sinav: 'Kronos, zamanın ve olgunluğun simgesidir. Her ilişkiye kendi sınavlarını getirir.',
    catisma: 'Ares, hem tutkunun hem de öfkenin kaynağıdır. Bir ilişkide nerede durduğu, kıvılcımların nereden çıkacağını gösterir.',
    karmik: 'Bazı ilişkiler bir tanışmadan çok bir hatırlayıştır.',
  },

  // Bölümün konusu; güç, köşe ve görmeme cümlelerinde kullanılır
  alanlar: {
    baslangic: 'ilişkinizin başlangıç enerjisi',
    kimlik: 'ilişkinizin özü',
    beslenme: 'duygusal bağınız',
    iyiGelen: 'sevginiz',
    sinav: 'ilişkinizin sınavları',
    catisma: 'tutkunuz ve öfkeniz',
  },

  // ----- Kompozit Yükselen: başlangıç -----
  baslangicBurc: [
    'İlişkiniz hızlı ve heyecanlı bir başlangıç yapma eğiliminde olabilir. İlk adım beklenmedik bir anda atılıyor gibi görünüyor. Aranızdaki kıvılcım kendini erkenden belli edebilir.',
    'İlişkiniz yavaş ama sağlam bir başlangıç yapıyor gibi görünüyor. Acele etmeden, birbirinizi zamanla tanıyarak yakınlaşabilirsiniz. Güven oluştukça bağınız da kök salabilir.',
    'İlişkiniz bir sohbetle, bir mesajla ya da ortak bir merakla başlıyor gibi görünüyor. Konuşmak, birbirinizi keşfetmenin ilk ve en keyifli yolu olabilir.',
    'İlişkiniz sıcak ve koruyucu bir yakınlıkla başlıyor gibi görünüyor. Birbirinizin yanında kısa sürede kendinizi evinizde hissedebilirsiniz.',
    'İlişkiniz göz alıcı ve coşkulu bir başlangıç yapıyor gibi görünüyor. Birbirinizi fark etmeniz zor olmayabilir. Çevreniz de aranızdaki çekimi hemen görebilir.',
    'İlişkiniz sessiz ve özenli bir başlangıç yapıyor gibi görünüyor. Küçük jestler, yardımlaşma ve gündelik paylaşımlar sizi yavaş yavaş birbirinize yaklaştırabilir.',
    'İlişkiniz zarif ve uyumlu bir başlangıç yapıyor gibi görünüyor. İlk andan itibaren birbirinize nazik davranabilir, bir denge ve güzellik arayabilirsiniz.',
    'İlişkiniz yoğun ve gizemli bir başlangıç yapıyor gibi görünüyor. İlk izlenimde güçlü bir çekim olsa da ikiniz de kartlarınızı hemen açmayabilirsiniz. Bağınız derinleştikçe güçlenebilir.',
    'İlişkiniz özgür ve maceracı bir başlangıç yapıyor gibi görünüyor. Bir yolculuk, yeni bir deneyim ya da ortak bir hayal sizi bir araya getirebilir.',
    'İlişkiniz temkinli ve ciddi bir başlangıç yapıyor gibi görünüyor. Duygularınızı göstermekte acele etmeyebilirsiniz, ama bir kez karar verdiğinizde ilişkiyi sağlam temeller üzerine kurmak isteyebilirsiniz.',
    'İlişkiniz bir arkadaşlık gibi, rahat ve sıra dışı bir başlangıç yapıyor gibi görünüyor. Birbirinize alan tanıdıkça yakınlığınız kendiliğinden artabilir.',
    'İlişkiniz rüya gibi, sezgisel bir başlangıç yapıyor gibi görünüyor. Birbirinizi sanki çok önceden tanıyormuş gibi hissedebilirsiniz. Sınırlar başta biraz belirsiz kalabilir.',
  ],
  baslangicTarz: ['hızlı ve cesur', 'sakin ve kararlı', 'meraklı ve oyunbaz', 'duygusal ve koruyucu', 'coşkulu ve gururlu', 'özenli ve mütevazı', 'nazik ve zarif', 'yoğun ve derin', 'iyimser ve özgür', 'ciddi ve sabırlı', 'sıra dışı ve bağımsız', 'romantik ve sezgisel'],
  baslangicTarzKalip: 'Bu başlangıca {arketip} bir güç yön veriyor olabilir. Bu güç {tarz} bir enerjiyle hareket edebilir.',
  baslangicEv: [
    'İlişki, ikinizin de kişisel olarak öne çıktığı doğrudan bir biçimde başlıyor gibi görünüyor. İlk adımı kimin attığı belli olabilir.',
    'Başlangıçta ortak değerler, güven ve somut adımlar belirleyici olabilir. İlişki zamanla ve emekle kök salıyor gibi görünüyor.',
    'İlk yakınlaşma büyük ihtimalle konuşmalar, mesajlaşmalar ya da yakın çevreniz aracılığıyla olabilir.',
    'İlişki aile, ev ya da tanıdık bir ortam üzerinden başlıyor gibi görünüyor. Kısa sürede bir yuva duygusu oluşabilir.',
    'Başlangıç eğlenceli ve flörtöz olabilir. İlişki bir kutlama, bir oyun ya da ortak bir hobi etrafında filizleniyor gibi görünüyor.',
    'İlk temas iş, gündelik bir rutin ya da birbirinize yardım ettiğiniz bir durum üzerinden kuruluyor gibi görünüyor.',
    'İlişki daha başından ciddi bir ortaklık gibi hissettirebilir. Birbirinizi doğal bir eş olarak görüyor gibisiniz.',
    'Başlangıç yoğun ve dönüştürücü olabilir. İlişki derin bir paylaşımın ya da hayatınızı değiştiren bir dönemin içinde başlıyor gibi görünüyor.',
    'İlişki bir yolculukta, bir eğitim ortamında ya da farklı bir kültürle temas içinde başlıyor gibi görünüyor.',
    'Başlangıç görünür olabilir. İş ortamı ya da sosyal çevreniz bu ilişkinin doğuşunda rol oynuyor gibi görünüyor.',
    'İlişki bir arkadaşlık olarak ya da ortak bir çevre aracılığıyla başlıyor gibi görünüyor.',
    'İlişkinin ilk dönemi gözlerden uzak, sessiz ya da gizli ilerliyor gibi görünüyor. İkiniz de duygularınızı bir süre kendinize saklayabilirsiniz.',
  ],
  esYoneticiKalip: 'Bu başlangıcın ikinci, daha derinden gelen bir rengi de olabilir: {metin}',

  // ----- Davison Güneş: kimlik ve amaç -----
  kimlikBurc: [
    'İlişkinizin özünde cesaret ve birlikte yeni bir şey başlatma isteği olabilir. Bu bağ durağan kalmaya değil, harekete ve ilerlemeye ayarlı olabilir.',
    'İlişkinizin özünde güven, süreklilik ve birlikte somut bir hayat kurma isteği olabilir. Bu bağ zamanla değer kazanan, kalıcı bir yapıya dönüşüyor gibi görünüyor.',
    'İlişkinizin özünde merak, paylaşım ve sürekli öğrenme olabilir. Bu bağ konuşarak, gezerek ve yeni fikirlerle canlı kalıyor gibi görünüyor.',
    'İlişkinizin özünde bir yuva kurma, korunma ve aidiyet arayışı olabilir. Bu bağ ikiniz için güvenli bir sığınak olmak üzere doğmuş gibi görünebilir.',
    'İlişkinizin özünde sevgiyi cesurca yaşamak ve birbirinizi parlatmak olabilir. Bu bağ gururla gösterilen, sıcak ve cömert bir birlikteliğe dönüşüyor gibi görünüyor.',
    'İlişkinizin özünde birbirinize iyi gelmek, destek olmak ve birlikte gelişmek olabilir. Bu bağ küçük ama anlamlı emeklerle büyüyor gibi görünüyor.',
    'İlişkinizin özünde ortaklık, denge ve uyum olabilir. Bu bağ, "biz" olmayı öğrenmek için kurulmuş gibi görünebilir.',
    'İlişkinizin özünde derinlik, sadakat ve dönüşüm olabilir. Bu bağ ikinizi de yüzeyde bırakmıyor gibi görünüyor. Birbirinizi en derin hâlinizle tanıyabilirsiniz.',
    'İlişkinizin özünde özgürlük, keşif ve ortak bir anlam arayışı olabilir. Bu bağ ikinizin de ufkunu genişletmek için var gibi görünebilir.',
    'İlişkinizin özünde sorumluluk, kararlılık ve birlikte bir şey inşa etmek olabilir. Bu bağ zamanla olgunlaşan, ciddi bir yapıya dönüşüyor gibi görünüyor.',
    'İlişkinizin özünde dostluk, özgürlük ve alışılmışın dışında bir bağ olabilir. Bu birliktelik kalıplara sığmayan, kendine özgü bir yapıda olabilir.',
    'İlişkinizin özünde şefkat, fedakârlık ve ruhsal bir bağ olabilir. Bu birliktelik size sezgisel, neredeyse masalsı bir yakınlık sunabilir.',
  ],
  kimlikEv: [
    'Bu ilişki ikinizin de kim olduğunu belirgin biçimde etkiliyor gibi görünüyor. Birlikteyken kendinizi daha güçlü ifade edebilirsiniz.',
    'İlişkinizin önemli bir amacı, ortak bir maddi güven ve paylaşılan değerler dünyası kurmak olabilir.',
    'İlişkinizin kalbinde konuşmak, paylaşmak ve birlikte öğrenmek duruyor olabilir.',
    'İlişkinizin kalbinde ev, aile ve kök salma isteği duruyor olabilir.',
    'İlişkinizin kalbinde sevgi, eğlence ve yaratıcılık duruyor olabilir. Birlikte hayattan keyif almak bu bağın özü olabilir.',
    'İlişkiniz gündelik hayatın içinde, birbirinize destek olarak ve birlikte çalışarak anlam kazanıyor gibi görünüyor.',
    'Bu ilişkinin kalbinde ortaklık ve bağlılık duruyor olabilir. Evlilik ya da uzun soluklu bir birliktelik doğal bir hedef gibi görünebilir.',
    'Bu ilişki ikinizi de derinden dönüştürmek için var olabilir. Mahremiyet ve güven ilişkinin merkezinde duruyor gibi görünüyor.',
    'Bu ilişki birlikte büyümek, yolculuklara çıkmak ve hayata dair ortak bir anlam bulmak için var olabilir.',
    'Bu ilişki görünür ve iddialı olabilir. Çevreniz sizi bir çift olarak tanıyabilir, ortak hedefleriniz ilişkinizin kimliğini belirleyebilir.',
    'Bu ilişki dostluk temelli olabilir. Ortak arkadaşlar, ortak hayaller ve geleceğe dair planlar ilişkinizin merkezinde duruyor gibi görünüyor.',
    'Bu ilişkinin bir kısmı dış dünyadan uzakta, yalnızca ikinizin bildiği bir iç dünyada yaşanıyor gibi görünüyor.',
  ],

  // ----- Davison Ay: beslenme -----
  beslenmeBurc: [
    'İlişkiniz heyecanla, kendiliğinden gelişen anlarla ve birlikte harekete geçmekle besleniyor gibi görünüyor. Rutin, bu bağı en çabuk yoran şey olabilir.',
    'İlişkiniz huzurla, dokunmayla ve güvenli bir düzenle besleniyor gibi görünüyor. Güzel bir yemek, sakin bir akşam ya da birlikte geçirilen yavaş zamanlar size iyi gelebilir.',
    'İlişkiniz konuşmakla, gülmekle ve birlikte yeni şeyler öğrenmekle besleniyor gibi görünüyor. Sessizlik uzadığında bağınız zayıflayabilir.',
    'İlişkiniz şefkatle, ilgiyle ve birbirinize gösterdiğiniz özenle besleniyor gibi görünüyor. Ev ve aile duygusu bu bağın duygusal yakıtı olabilir.',
    'İlişkiniz takdirle, sevginin açıkça gösterilmesiyle ve birlikte eğlenmekle besleniyor gibi görünüyor. Fark edilmek ikinize de iyi gelebilir.',
    'İlişkiniz küçük hizmetlerle, düzenle ve birbirinize faydalı olmakla besleniyor gibi görünüyor. Sevgi çoğu zaman sözlerden çok yapılan işlerde görünebilir.',
    'İlişkiniz uyumla, nezaketle ve birlikte paylaşılan güzelliklerle besleniyor gibi görünüyor. Kırıcı tartışmalar bu bağı en çok yoran şey olabilir.',
    'İlişkiniz derinlikle, dürüstlükle ve tam bir duygusal teslimiyetle besleniyor gibi görünüyor. Yüzeysel bir ilgi bu bağa yetmeyebilir.',
    'İlişkiniz özgürlükle, neşeyle ve ortak maceralarla besleniyor gibi görünüyor. Birlikte yeni yerler keşfetmek bağınızı tazeleyebilir.',
    'İlişkiniz güvenilirlikle, verilen sözlerin tutulmasıyla ve birlikte kurulan düzenle besleniyor gibi görünüyor.',
    'İlişkiniz dostlukla, birbirinize tanıdığınız alanla ve paylaşılan fikirlerle besleniyor gibi görünüyor.',
    'İlişkiniz şefkatle, sezgiyle ve ruhsal bir yakınlıkla besleniyor gibi görünüyor. Müzik, sanat ve hayal kurmak bağınızı derinleştirebilir.',
  ],
  beslenmeEv: [
    'Birbirinizin varlığını hissetmek, yan yana olmak ilişkinizi doğrudan besleyebilir.',
    'Maddi güven ve ortak bir konfor alanı yaratmak size duygusal olarak iyi gelebilir.',
    'Gece yarısı konuşmaları, uzun mesajlar ve kısa kaçamaklar ilişkinizin duygusal yakıtı olabilir.',
    'Ev, aile ve birlikte kurduğunuz yuva, duygusal olarak en çok beslendiğiniz yer olabilir.',
    'Birlikte eğlenmek, flört etmek ve hayattan keyif almak ilişkinizi duygusal olarak besleyebilir.',
    'Gündelik hayatta birbirinize destek olmak ve birlikte bir düzen kurmak size iyi gelebilir.',
    'Birbirinize bağlılığınızı hissetmek ve "biz" olabilmek, ilişkinizin en büyük duygusal kaynağı olabilir.',
    'Mahremiyet, güven ve derin paylaşımlar ilişkinizi besliyor gibi görünüyor. Birbirinize açıldıkça bağınız güçlenebilir.',
    'Birlikte yolculuğa çıkmak, öğrenmek ve hayata dair anlam aramak ilişkinize iyi gelebilir.',
    'Ortak hedefler ve birlikte bir şey başarmak sizi duygusal olarak da besleyebilir.',
    'Arkadaşlarınız, ortak bir çevre ve gelecek hayalleri ilişkinizi besliyor gibi görünüyor.',
    'Baş başa, sessiz ve dış dünyadan uzak zamanlar, ilişkinizin en çok beslendiği anlar olabilir.',
  ],

  // ----- Davison Venüs: ne iyi gelir -----
  iyiGelenBurc: [
    'İlişkinize heyecan, sürpriz ve cesur jestler iyi geliyor gibi görünüyor. Kendiliğinden yapılan planlar aranızdaki sevgiyi canlı tutabilir.',
    'İlişkinize dokunmak, güzel yemekler, konfor ve sakin zamanlar iyi gelebilir. Sevginiz yavaş ama derin bir tatla büyüyor gibi görünüyor.',
    'İlişkinize sohbet, mizah ve birlikte yeni şeyler denemek iyi gelebilir. Birbirinizi şaşırtmak sevginizi tazeleyebilir.',
    'İlişkinize ev sıcaklığı, şefkat ve birbirinizi kollamak iyi gelebilir. Küçük ilgiler büyük anlamlar taşıyor gibi görünüyor.',
    'İlişkinize romantik jestler, kutlamalar ve sevginin cömertçe gösterilmesi iyi gelebilir.',
    'İlişkinize küçük ve somut ilgiler iyi gelebilir: birinin kahvesini nasıl içtiğini hatırlamak ya da yorgun olduğunda işini kolaylaştırmak gibi.',
    'İlişkinize zarafet, güzel ortamlar ve karşılıklı nezaket iyi geliyor gibi görünüyor.',
    'İlişkinize derin konuşmalar, sadakat ve tam bir duygusal yakınlık iyi geliyor gibi görünüyor.',
    'İlişkinize yolculuklar, maceralar ve birlikte öğrenmek iyi gelebilir. Ufkunuz genişledikçe sevginiz de büyüyor gibi görünüyor.',
    'İlişkinize güvenilirlik, verilen sözlerin tutulması ve birlikte uzun vadeli planlar yapmak iyi gelebilir.',
    'İlişkinize arkadaşlık, özgürlük ve alışılmışın dışında deneyimler iyi geliyor gibi görünüyor.',
    'İlişkinize romantizm, müzik, sanat ve birlikte hayal kurmak iyi gelebilir.',
  ],
  iyiGelenEv: [
    'Birbirinize hayranlığınızı göstermek ve birlikte kendinizi iyi hissetmek ilişkinize iyi gelebilir.',
    'Birlikte güzel şeylere harcama yapmak ve ortak bir konfor alanı kurmak ilişkinize iyi gelebilir.',
    'Tatlı mesajlar, küçük kaçamaklar ve keyifli sohbetler ilişkinize iyi geliyor gibi görünüyor.',
    'Evinizi güzelleştirmek ve ev hayatından keyif almak ilişkinize iyi gelebilir.',
    'Flört etmeyi hiç bırakmamak, birlikte eğlenmek ve yaratıcı uğraşlar ilişkinize iyi gelebilir.',
    'Gündelik hayatta birbirinize özen göstermek ve sağlıklı alışkanlıklar edinmek ilişkinize iyi gelebilir.',
    'Bağlılığınızı göstermek ve birbirinizi eşit bir ortak olarak görmek ilişkinize iyi gelebilir.',
    'Mahremiyet, tensel yakınlık ve derin bir güven ilişkinize iyi geliyor gibi görünüyor.',
    'Birlikte yolculuğa çıkmak ve yeni kültürler keşfetmek ilişkinize iyi gelebilir.',
    'Ortak hedefler için birlikte çalışmak ve birbirinizin başarısını kutlamak ilişkinize iyi gelebilir.',
    'Ortak arkadaşlarla vakit geçirmek ve birlikte gelecek hayalleri kurmak ilişkinize iyi gelebilir.',
    'Baş başa kalabileceğiniz, dış dünyadan uzak zamanlar ilişkinize her şeyden çok iyi geliyor gibi görünüyor.',
  ],

  // ----- Davison Satürn: sınavlar -----
  sinavBurc: [
    'İlişkiniz sabır konusunda sınanıyor gibi görünüyor. Acele kararlar ve öfke anları ilişkiyi yorabilir. Birlikte yavaşlamayı öğrenmeniz gerekebilir.',
    'İlişkiniz para, güven ve değişime direnç konularında sınanıyor gibi görünüyor. Alıştığınız düzenin dışına çıkmak zaman zaman zorlayıcı olabilir.',
    'İlişkiniz iletişim konusunda sınanıyor gibi görünüyor. Yanlış anlaşılan sözler ya da hiç söylenmeyenler zamanla bir yüke dönüşebilir.',
    'İlişkiniz duygusal güven ve aile konularında sınanıyor gibi görünüyor. Duygularınızı açıkça göstermek emek isteyebilir.',
    'İlişkiniz gurur ve takdir konularında sınanıyor gibi görünüyor. Birbirinizi yeterince görmediğinizi hissettiğiniz dönemler olabilir.',
    'İlişkiniz eleştiri ve mükemmeliyetçilik konularında sınanıyor gibi görünüyor. Küçük kusurları büyütmemek önemli olabilir.',
    'İlişkiniz denge ve adalet konularında sınanıyor gibi görünüyor. Kimin ne kadar verdiği sorusu zaman zaman gündeme gelebilir.',
    'İlişkiniz güven, kıskançlık ve kontrol konularında sınanıyor gibi görünüyor. Açık olmak bu sınavı geçmenin anahtarı olabilir.',
    'İlişkiniz özgürlük ve inançlar konusunda sınanıyor gibi görünüyor. Birbirinizin dünya görüşüne saygı göstermeniz gerekebilir.',
    'İlişkiniz sorumluluklar ve iş ile ilişki arasındaki denge konusunda sınanıyor gibi görünüyor. Ciddiyet bazen sıcaklığın önüne geçebilir.',
    'İlişkiniz yakınlık ile bağımsızlık arasındaki denge konusunda sınanıyor gibi görünüyor.',
    'İlişkiniz sınırlar ve fedakârlık konusunda sınanıyor gibi görünüyor. Biriniz sessizce fazla yük alıp sonunda tükenebilir.',
  ],
  sinavEv: [
    'Sınavınız, ikinizin de bireyselliğini koruyarak birlikte kalabilmek olabilir.',
    'Sınavınız maddi konularda olabilir: ortak para, harcamalar ve maddi güven emek isteyebilir.',
    'Sınavınız gündelik iletişimde olabilir: konuşmayı ertelemek ya da mesafeli bir dil kullanmak aranıza mesafe koyabilir.',
    'Sınavınız ev ve aile alanında olabilir: birlikte yaşamak, aileler ve ev düzeni sorumluluk isteyebilir.',
    'Sınavınız eğlence ve romantizmde olabilir: rutin, ilişkinin keyfini gölgeliyor gibi görünüyor. Birlikte eğlenmeyi planlamanız gerekebilir.',
    'Sınavınız gündelik hayatın içinde olabilir: iş yükü, ev işleri ve yorgunluk ilişkiye zaman bırakmıyor gibi görünüyor.',
    'Sınavınız bağlılık konusunda olabilir: ilişkiniz zamanla sınanabilir, ama sınandıkça da sağlamlaşıyor gibi görünüyor.',
    'Sınavınız mahremiyet ve güven konusunda olabilir: birbirinize tamamen açılmanız zaman alabilir.',
    'Sınavınız inançlar ve gelecek planlarında olabilir: farklı bakış açılarınız uzlaşma gerektirebilir.',
    'Sınavınız kariyer ve hedefler alanında olabilir: iş hayatının yükü ilişkinize yansıyor gibi görünüyor.',
    'Sınavınız sosyal çevrede olabilir: arkadaşlar ve ortak çevre konusunda beklentileriniz farklı olabilir.',
    'Sınavınız görünmeyen alanda olabilir: söylenmeyen kırgınlıklar birikebilir. İçinizdekini paylaşmanız önemli olabilir.',
  ],

  // ----- Davison Mars: çatışma -----
  catismaBurc: [
    'Tartışmalarınız hızlı alevlenip hızlı sönüyor gibi görünüyor. Sabırsızlık ve kimin haklı olduğu meselesi kıvılcım çıkarabilir.',
    'Tartışmalarınız inattan doğuyor gibi görünüyor. İkiniz de geri adım atmakta zorlanabilirsiniz, ama bir kez uzlaştığınızda bu uzlaşma kalıcı olabilir.',
    'Tartışmalarınız sözlü, hızlı ve zekice olabilir. En iyi argümanı kuran kazanabilir, ama bu her zaman ilişkinin kazandığı anlamına gelmiyor gibi görünüyor.',
    'Tartışmalarınız duygusal ve dolaylı olabilir. Kırgınlıklar açıkça söylenmek yerine küslükle dile gelebilir.',
    'Tartışmalarınız gururdan doğuyor gibi görünüyor. Takdir edilmediğini hissetmek aranızdaki en büyük kıvılcım olabilir.',
    'Tartışmalarınız ayrıntılardan ve eleştiriden doğuyor gibi görünüyor. Küçük konular kolayca büyüyebilir.',
    'Tartışmalarınız adalet ve denge üzerine olabilir. Çatışmadan kaçınmak bazen sorunları yalnızca erteleyebilir.',
    'Tartışmalarınız derin ve yoğun olabilir. Kıskançlık ve güven konuları en hassas noktanız olabilir.',
    'Tartışmalarınız fikirler, inançlar ve özgürlük üzerine olabilir. Açık sözlülük zaman zaman kırıcı olabilir.',
    'Tartışmalarınız sorumluluklar ve kontrol üzerine olabilir. Kimin karar verdiği önemli bir mesele hâline geliyor gibi görünüyor.',
    'Tartışmalarınız bağımsızlık ve farklı fikirler üzerine olabilir. Mesafe koymak bir savunma biçimine dönüşebilir.',
    'Tartışmalarınız örtük ve belirsiz olabilir. Kırgınlıklar dile getirilmeden birikiyor gibi görünüyor.',
  ],
  catismaEv: [
    'Çatışmalar kişisel tavırlardan çıkıyor gibi görünüyor. Birbirinize karşı sabırsız davrandığınız anlarda kıvılcım çakabilir.',
    'Para ve harcamalar en sık tartışma konunuz olabilir.',
    'Gündelik konuşmaların tonu, mesajlaşmalar ve yakın çevre küçük kıvılcımlar çıkarıyor gibi görünüyor.',
    'Ev düzeni, aileler ve birlikte yaşama dair konular tartışma yaratıyor gibi görünüyor.',
    'Eğlence, kıskançlık ya da çocuklarla ilgili konular tartışma yaratıyor gibi görünüyor.',
    'İş yükü, ev işleri ve gündelik sorumlulukların paylaşımı tartışma konusu olabilir.',
    'Çatışmalar doğrudan ilişkinin kendisinden çıkabilir: beklentiler, eşitlik ve kimin ne kadar verdiği.',
    'Ortak paralar, mahremiyet ve kıskançlık en hassas çatışma alanlarınız olabilir.',
    'İnançlar, dünya görüşü, gelecek planları ve ailelerin beklentileri tartışma yaratıyor gibi görünüyor.',
    'Kariyer, hedefler ve kimin önceliği olduğu tartışma konusu olabilir.',
    'Arkadaşlar, sosyal çevre ve geleceğe dair farklı hayaller tartışma yaratıyor gibi görünüyor.',
    'Çatışmalar çoğu zaman açıkça yaşanmıyor gibi görünüyor. Söylenmeyen öfke birikebilir.',
  ],

  // ----- Ay Düğümleri: karmik ders -----
  karmikBurc: [
    'Bu ilişkinin karmik dersi cesaret olabilir: birbirinize yaslanmak yerine kendi ayakları üzerinde durabilen iki insan olmayı öğrenmek. Geçmişten taşınan fazla uyum sağlama alışkanlığını bırakmak sizi özgürleştirebilir.',
    'Bu ilişkinin karmik dersi sadelik olabilir: sakin, huzurlu ve güvenli bir bağ kurmayı öğrenmek. Geçmişten gelen kriz, yoğunluk ve kontrol ihtiyacını bırakmak size iyi gelebilir.',
    'Bu ilişkinin karmik dersi merakla dinlemek olabilir: gündelik konuşmaların, küçük paylaşımların değerini öğrenmek. Tek bir doğruya sıkı sıkıya bağlı kalma alışkanlığını bırakmak sizi yakınlaştırabilir.',
    'Bu ilişkinin karmik dersi duygularınızı göstermek ve bir yuva kurmak olabilir. Başarıya ve kontrole odaklanan bir yaşamı biraz geride bırakmak bu bağı derinleştirebilir.',
    'Bu ilişkinin karmik dersi kalbinizi açmak olabilir: sevgiyi cesurca, neşeyle ve görünür biçimde yaşamak. Mesafeli ve kalabalığın içinde kaybolan bir duruşu bırakmak size iyi gelebilir.',
    'Bu ilişkinin karmik dersi gündelik hayatın içinde birbirinize somut destek olmak olabilir. Belirsizlik ve kaçış eğilimini bırakmak bağınızı sağlamlaştırabilir.',
    'Bu ilişkinin karmik dersi gerçek bir ortaklık kurmak olabilir: "ben" yerine "biz" diyebilmek. Her şeyi tek başına halletme alışkanlığını bırakmak bu ilişkinin kapısını açabilir.',
    'Bu ilişkinin karmik dersi derinleşmek ve birbirinize tamamen güvenmek olabilir. Konfora ve sahiplenmeye tutunma alışkanlığını bırakmak sizi dönüştürebilir.',
    'Bu ilişkinin karmik dersi birlikte büyümek ve ortak bir anlam bulmak olabilir. Küçük ayrıntılara ve başkalarının ne düşündüğüne takılma alışkanlığını bırakmak ufkunuzu açabilir.',
    'Bu ilişkinin karmik dersi sorumluluk almak ve birlikte kalıcı bir yapı kurmak olabilir. Duygusal bağımlılığı ve geçmişe sığınma eğilimini bırakmak sizi olgunlaştırabilir.',
    'Bu ilişkinin karmik dersi birbirinize özgürlük tanımak ve dostluğu merkeze koymak olabilir. Onay ve ilgi bekleme alışkanlığını bırakmak sizi rahatlatabilir.',
    'Bu ilişkinin karmik dersi teslim olmak, şefkat ve ruhsal bir bağ olabilir. Her şeyi kontrol etme ve kusursuzluk arayışını bırakmak bu bağı derinleştirebilir.',
  ],
  karmikEv: [
    'Bu ders, ilişki içinde kendi kimliğinizi korumayı öğrenirken yaşanıyor gibi görünüyor.',
    'Bu ders, ortak değerler ve maddi güven inşa ederken yaşanıyor gibi görünüyor.',
    'Bu ders, gündelik konuşmalarda, mesajlarda ve yakın çevrenizle ilişkinizde yaşanıyor gibi görünüyor.',
    'Bu ders, ev, aile ve kökler üzerinden yaşanıyor gibi görünüyor.',
    'Bu ders, aşkı, eğlenceyi ve yaratıcılığı birlikte keşfederken yaşanıyor gibi görünüyor.',
    'Bu ders, gündelik düzen, sağlık ve birbirinize destek olurken yaşanıyor gibi görünüyor.',
    'Bu ders, doğrudan ortaklığın kendisinde, bağlılığı öğrenirken yaşanıyor gibi görünüyor.',
    'Bu ders, mahremiyet, güven ve ortak kaynaklar üzerinden yaşanıyor gibi görünüyor.',
    'Bu ders, yolculuklar, inançlar ve birlikte öğrenmek üzerinden yaşanabilir.',
    'Bu ders, ortak hedefler ve toplumdaki yeriniz üzerinden yaşanıyor gibi görünüyor.',
    'Bu ders, dostluklar, topluluklar ve gelecek hayalleri üzerinden yaşanıyor gibi görünüyor.',
    'Bu ders, görünmeyen alanda, sessizlik, teslimiyet ve ruhsal bağ üzerinden yaşanabilir.',
  ],
  kuzeyDugumTemasi: '{Islev} bu ilişkinin geleceğe açılan kapısı olabilir. Birlikte büyüdükçe bu alan daha da anlam kazanıyor gibi görünüyor.',
  guneyDugumTemasi: '{Islev} size geçmişten tanıdık geliyor gibi görünüyor. Bu tanıdıklık hem büyük bir rahatlık hem de eski alışkanlıklara dönme eğilimi getirebilir.',
  geriKalabalik: 'Bu ilişkide geçmişte tamamlanmamış bazı konular yeniden gündeme geliyor gibi görünüyor. Bazı şeyleri ikinci kez, bu sefer birlikte yaşıyormuş gibi hissedebilirsiniz.',
  onikinciEv: '{Islev} bu ilişkide görünmeyen, ruhsal bir sözleşme gibi çalışabilir. Dışarıdan anlaşılması zor ama sizin için çok anlamlı olabilir.',

  // ----- Gezegen arketipleri (yönetici gezegenin karakteri) -----
  arketipler: {
    gunes: "Apollon'un ışığı gibi aydınlatan", ay: "Ay'ın değişen yüzü gibi duygusal", merkur: 'Hermes gibi köprü kuran',
    venus: 'Afrodit gibi çekici', mars: 'Ares gibi atılgan', jupiter: 'Zeus gibi cömert', saturn: 'Kronos gibi sabırlı',
  },

  // ----- Gezegen gücü (Helenistik) -----
  gucKaliplari: {
    yonetim: '{Alan} bu ilişkide kendi evindeymiş gibi olabilir. Doğal, rahat ve güçlü biçimde ifade buluyor gibi görünüyor.',
    yucelim: '{Alan} bu ilişkide onurlu bir konuk gibi ağırlanabilir. En parlak hâliyle ortaya çıkma eğiliminde olabilir.',
    zarar: '{Alan} bu ilişkide kendini zaman zaman bir yabancı gibi hissedebilir. Bu enerjiyi ifade etmek için alışılmışın dışında yollar bulmanız gerekebilir.',
    dusus: '{Alan} bu ilişkide zaman zaman gücünü yitirmiş gibi hissedebilir. Bu alanı bilinçli olarak desteklemek ilişkinize çok iyi gelebilir.',
    notr: '',
  },
  // Sınav ve çatışma başlıklarında (Satürn, Mars) güç tersine okunur: güçlüyse yapıcı, zayıfsa daha ağır
  gucKaliplariKotucul: {
    yonetim: '{Alan} bu ilişkide yapıcı bir öğretmen gibi çalışabilir. Zorlukların ardından gerçek bir olgunluk geliyor gibi görünüyor.',
    yucelim: '{Alan} bu ilişkide adil ve ölçülü bir biçimde kendini gösteriyor gibi görünüyor. Zorlandığınız yerler sizi birlikte güçlendirebilir.',
    zarar: '{Alan} bu ilişkide zaman zaman olduğundan daha ağır hissedilebilir. Bu yüzden birbirinize karşı yumuşak olmak çok önemli olabilir.',
    dusus: '{Alan} bu ilişkide kendini dolaylı yollarla gösteriyor gibi görünüyor. Söylenmeyenleri konuşmak bu alanı çok rahatlatabilir.',
    notr: '',
  },

  // ----- Köşe / ardıl / düşen evler ve görmeme -----
  konumKaliplari: {
    kose: '{Alan} ilişkinin merkezinde, en görünür yerinde duruyor olabilir. Etkisini neredeyse her gün hissedebilirsiniz.',
    ardil: '{Alan} zamanla güçlenen, adım adım birikerek kendini gösteren bir etki taşıyor olabilir.',
    dusen: '{Alan} daha arka planda, sessizce çalışan bir etki olabilir, ama göz ardı edildiğinde kendini hatırlatabilir.',
  },
  gormeme: 'Bu alan, ilişkinin ana akışını her zaman göremiyor gibi görünüyor. Bu yüzden ona bilinçli olarak dikkat etmeniz gerekebilir.',

  // ----- Sekt (gündüz / gece) -----
  sekt: {
    kimlik: {
      gunduz: 'İlişkiniz gün ışığında doğmuş gibi olabilir: amaç, görünürlük ve birlikte bir yöne yürümek ön planda olabilir.',
      gece: 'İlişkiniz gece doğmuş gibi olabilir: amaçtan çok duygular, sezgiler ve baş başa geçen zamanlar ön planda olabilir.',
    },
    beslenme: {
      gunduz: 'Duygular önemli olsa da ilişkinin yönünü çoğu zaman ortak hedefler belirleyebilir.',
      gece: 'Duygular bu ilişkinin yol göstericisi olabilir. Ne hissettiğiniz, ne yapacağınızı belirliyor gibi görünüyor.',
    },
    iyiGelen: {
      gunduz: 'Sevgi bu ilişkide var, ama kendini göstermesi için bilinçli bir özen gerekebilir.',
      gece: 'Sevgi bu ilişkide doğal bir koruyucu gibi çalışabilir. Zor zamanlarda bile şefkat kendine bir yol buluyor gibi görünüyor.',
    },
    sinav: {
      gunduz: 'Sınavlar sert olmaktan çok öğretici olabilir. Sabırla karşılandığında ilişkiyi güçlendirebilir.',
      gece: 'Sınavlar zaman zaman ağır hissediliyor gibi görünüyor. Bu yüzden yükü paylaşmak ve birbirinize şefkatle yaklaşmak daha da önemli olabilir.',
    },
    catisma: {
      gunduz: 'Tartışmalar zaman zaman beklenenden keskin olabilir. Öfkeyi soğumaya bırakmadan konuşmamak size iyi gelebilir.',
      gece: 'Öfke bu ilişkide yönetilebilir bir ateş olabilir. Doğru kanala aktarıldığında tutkuya dönüşebilir.',
    },
  },

  // ----- Yönetilen evler ve 7. evden türetilmiş anlamları -----
  evKonulari: [
    'ikinizin bireyselliği', 'para ve ortak kaynaklar', 'gündelik iletişim ve yakın çevre', 'ev ve aile',
    'eğlence, romantizm ve yaratıcılık', 'gündelik düzen ve sorumluluklar', 'bağlılık ve ortaklık', 'mahremiyet ve derin güven',
    'yolculuklar, inançlar ve birlikte öğrenmek', 'kariyer ve ortak hedefler', 'arkadaşlar ve gelecek hayalleri', 'baş başa geçirilen sessiz zamanlar',
  ],
  // {da}: konunun son ünlüsüne göre "da" ya da "de"
  yonetimKaliplari: {
    kimlik: 'İlişkinizin kimliği {konu} alanlarıyla da yakından bağlantılı olabilir.',
    beslenme: '{Konu} {da} sizi duygusal olarak besleyebilir.',
    iyiGelen: '{Konu} {da} ilişkinize iyi gelebilir.',
    sinav: '{Konu} konusunda da sabır ve emek göstermeniz gerekebilir.',
    catisma: '{Konu} {da} aranızda tartışma konusu olabilir.',
  },
  // Yönetilen evin, 7. ev (partner) başlangıç kabul edilerek sayıldığındaki anlamı
  partnerGozuyle: [
    'partnerin kişiliği', 'partnerin kaynakları ve değer verdiği şeyler', 'partnerin düşünceleri ve konuşma biçimi',
    'partnerin ailesi ve kökleri', 'partnerin aşkı ve neşesi', 'partnerin gündelik yükleri ve sağlığı',
    'birbirinizin gözünde kim olduğunuz', 'partnerin derin korkuları ve mahremiyeti', 'partnerin inançları ve ufku',
    'partnerin hedefleri ve itibarı', 'partnerin dostlukları ve hayalleri', 'partnerin gizli tarafı ve iç dünyası',
  ],
  partnerKalip: 'Birbirinize bakarken bu enerjiyi özellikle {konu} üzerinden hissedebilirsiniz.',
  zincirKalip: 'Bu enerjinin nasıl yaşanacağını ise büyük ölçüde {konu} belirleyebilir.',

  // ----- Temaslar -----
  islevler: {
    gunes: 'ilişkinizin amacı', ay: 'duygusal ihtiyaçlarınız', merkur: 'iletişiminiz', venus: 'sevginiz',
    mars: 'tutkunuz', jupiter: 'büyüme isteğiniz', saturn: 'sorumluluklarınız', uranus: 'özgürlük ihtiyacınız',
    neptun: 'hayalleriniz', pluton: 'ilişkinin dönüştürücü gücü', kuzeyDugum: 'ortak kaderiniz',
    yukselen: 'ilişkinizin dışarıya yansıyan yüzü', mc: 'ortak hedefleriniz',
  },
  baslangicIslevi: 'ilişkinizin başlangıç enerjisi',
  // Her türde iki anlatım: aynı paragrafta tekrar olmasın diye sırayla kullanılır
  temasKaliplari: {
    u: ['{A} ile {B} birbirini destekleyebilir. Bu, ilişkinizin kolay akan yanlarından biri olabilir.', '{A} ile {B} arasında doğal bir uyum olabilir. Biri diğerini güçlendirebilir.'],
    g: ['{A} ile {B} zaman zaman birbirini zorlayabilir. Bu iki alan arasında bilinçli bir denge kurmanız gerekebilir.', '{A} ile {B} arasında bir gerilim olabilir. İkisine de alan açtığınızda bu gerilim sizi büyütebilir.'],
    k: ['{A} ile {B} iç içe geçmiş olabilir. Biri harekete geçtiğinde diğeri de hemen etkilenebilir.', '{A} ile {B} birbirinden ayrılmıyor olabilir. Bu ilişkide ikisi hep birlikte hareket edebilir.'],
  },
  iyicilDestek: 'Bu destek ilişkinize koruyucu bir şans katabilir.',
  kotuculZorluk: 'Bu temas ilişkinin en çok emek isteyen noktalarından biri olabilir.',

  // ----- Kısmetler (her bölüm için bir tane; {konu} kısmetin bulunduğu evin konusu) -----
  kismetler: {
    baslangic: ['evlilik', 'Bağlılığa giden yol en çok {konu} alanından geçiyor gibi görünüyor.'],
    kimlik: ['ruh', 'İlişkinizin iradesi ve ruhu en çok {konu} alanında kendini gösteriyor gibi görünüyor.'],
    beslenme: ['talih', 'Ortak talihiniz ve huzurunuz en çok {konu} alanında açılıyor gibi görünüyor.'],
    iyiGelen: ['eros', 'Arzunun ve aşkın en canlı kıvılcımı {konu} alanında çakıyor gibi görünüyor.'],
    sinav: ['zorunluluk', 'Kaçınılmaz derslerinizi en çok {konu} alanında alıyor gibisiniz.'],
    catisma: ['cesaret', 'Cesaretiniz ve mücadele gücünüz en çok {konu} alanında sınanıyor gibi görünüyor.'],
  },
};
