// ÖRNEK SONUÇ — tasarım taslağı içindir, gerçek bir hesap değildir.
// Hesaplama motoru (3. ve 4. adım) aynı yapıda bir sonuç üretecek; ekranlar bu yapıyı okur.
//
// Metinlerdeki yer tutucular kişinin adıyla ve doğru Türkçe ekle değiştirilir:
//   {A} / {B}       → Ayşe / Mehmet
//   {A:in} {B:in}   → Ayşe'nin / Mehmet'in
//   {A:i}  {B:i}    → Ayşe'yi / Mehmet'i
//   {A:e}  {B:e}    → Ayşe'ye / Mehmet'e
//
// Her başlıkta: ucretsiz (herkes görür) ve ucretli ("Devamını oku" ile açılır) metinler ayrı tutulur.
// nedenler: ilk ikisi ücretsiz görünür, kalanlar kilitli bölümdedir.
//   tur: 'aci' (gezegen açısı) | 'ev' (ev yerleşimi)
//   ton: 'arti' (yüzdeyi artırıyor) | 'eksi' (zorluyor) | 'yogun' (hem artırıyor hem zorluyor)

window.ORNEK_SONUC = {
  ornekForm: [
    { ad: 'Ayşe', tarih: '1995-03-10', saat: '19:40', yer: 'İstanbul', yaklasik: false },
    { ad: 'Mehmet', tarih: '1993-11-14', saat: '09:20', yer: 'İzmir', yaklasik: false },
  ],

  ucluler: [
    { gunes: 'Balık', ay: 'Aslan', yukselen: 'Terazi' },
    { gunes: 'Akrep', ay: 'Boğa', yukselen: 'Oğlak' },
  ],

  genelUyum: 73,

  sinastri: [
    {
      id: 'tutku',
      baslik: 'Çekim ve Tutku',
      glif: '♂',
      yuzde: 84,
      nedenler: [
        { tur: 'aci', isaret: '□', metin: "{A:in} Mars'ı, {B:in} Venüs'üne kare", orb: "2°10'", ton: 'yogun' },
        { tur: 'ev', isaret: '8', metin: "{A:in} Mars'ı {B:in} 8. evinde", ton: 'yogun' },
        { tur: 'aci', isaret: '□', metin: "{B:in} Güneş'i, {A:in} Mars'ına kare", orb: "5°40'", ton: 'yogun' },
        { tur: 'aci', isaret: '☌', metin: "{B:in} Mars'ı, {A:in} Jüpiter'ine kavuşum", orb: "2°55'", ton: 'arti' },
      ],
      ucretsiz: [
        "{A:in} Mars'ı ile {B:in} Venüs'ü arasındaki 2°10'luk kare, aranızdaki çekimin ana kaynağı. Sinastride Mars–Venüs karesi sakin bir hoşlanma değildir; iki kişi birbirini ilk andan itibaren hem çekici hem de biraz kışkırtıcı bulur. {A:in} Mars'ı Aslan'da: istediğini açıkça gösterir ve fark edilmek ister. {B:in} Venüs'ü Akrep'te: sevgisini kolay ele vermez, yoğunluğa ve sadakate önem verir. {A} hamle yaptıkça {B} hem etkilenir hem geri çekilir ve bu gel-git çekimi sürekli canlı tutar. Orb 2°'nin altında olduğu için bu gerilim ilk aylarla sınırlı kalmaz, yıllar içinde de hissedilir.",
      ],
      ucretli: [
        "Tutkunun ikinci katmanı ev yerleşimlerinden geliyor. {A:in} Mars'ı {B:in} 8. evine düşüyor. 8. ev mahremiyetin, cinselliğin ve iki kişinin birbirine teslim olduğu alanın evidir. {A} yanındayken {B} kontrolü bırakmanın ne demek olduğunu öğrenir. Bu çok bağlayıcı ama {B:e} zaman zaman ürkütücü de gelebilecek bir deneyimdir. Aynı evde {A:in} Ay'ı da bulunduğu için bu yakınlık fiziksel düzeyde kalmaz, duygusal bir derinlikle birleşir.",
        "{B:in} Güneş'i ile {A:in} Mars'ı arasındaki 5°40'lık kare tutkuya bir rekabet duygusu ekliyor. {B} kendini ifade ettiğinde {A:in} enerjisi harekete geçer; bu bazen arzuya, bazen tartışmaya dönüşür. Kavganın hemen ardından gelen yakınlaşma bu açının tipik sonucudur. Dengeleyici gösterge {B:in} Mars'ı ile {A:in} Jüpiter'i arasındaki 2°55'lik kavuşum. Yay burcundaki bu temas birlikte yeni şeyler denemeyi, seyahati ve macerayı tutkunun bir parçası yapar.",
      ],
    },
    {
      id: 'baglanma',
      baslik: 'Bağlanma ve Duygusal Bağ',
      glif: '☽',
      yuzde: 71,
      nedenler: [
        { tur: 'ev', isaret: '8', metin: "{B:in} Ay'ı {A:in} 8. evinde", ton: 'arti' },
        { tur: 'aci', isaret: '△', metin: "{A:in} Ay'ı, {B:in} Mars'ına üçgen", orb: "1°40'", ton: 'arti' },
        { tur: 'aci', isaret: '□', metin: "{A:in} Ay'ı, {B:in} Ay'ına kare", orb: "3°00'", ton: 'eksi' },
        { tur: 'aci', isaret: '⚹', metin: "{A:in} Güneş'i, {B:in} Ay'ına altmışlık", orb: "3°50'", ton: 'arti' },
      ],
      ucretsiz: [
        "Duygusal bağınızın en güçlü göstergesi, {B:in} Ay'ının {A:in} 8. evine düşmesi. {B:in} duygusal ihtiyaçları, {A:in} haritasında derin bağlanmayı ve paylaşılan kaderi anlatan alana yerleşiyor. {A} için {B} kolayca vazgeçilebilecek biri olmaz; {B} ise {A:in} yanında duygularını saklamakta zorlanır. Buna {A:in} Ay'ı ile {B:in} Mars'ı arasındaki 1°40'lık üçgen ekleniyor: {B}, {A:in} duygusal ihtiyaçlarına somut adımlarla karşılık verir, korur ve harekete geçer. Aslan'daki Ay ilgi görmek ister, Yay'daki Mars bu ilgiyi cömertçe gösterir.",
      ],
      ucretli: [
        "Bağlanmayı zorlayan gösterge Ay–Ay karesi (3°00'). {A:in} Ay'ı Aslan'da, {B:in} Ay'ı Boğa'da. İkisi de sabit burç olduğu için ikiniz de duygusal alışkanlıklarınızdan kolay vazgeçmezsiniz. {A} sevgiyi görünür jestlerle, övgüyle ve ilgiyle yaşar; {B} ise süreklilikle, fiziksel yakınlıkla ve güvenli bir rutinle. Kırgınlık anlarında {A} konuşmak ve fark edilmek isterken {B} susup kabuğuna çekilebilir. Bu kare sevgisizlik anlamına gelmez; iki farklı sevgi dilini gösterir.",
        "Ay–Ay karesinin etkisini yumuşatan şey {A:in} Güneş'i ile {B:in} Ay'ı arasındaki 3°50'lık altmışlık. {A:in} Balık Güneş'i, {B:in} Boğa Ay'ının ihtiyaç duyduğu sakinliği ve şefkati doğal olarak sağlar. Uzun vadede {B}, {A:in} yanında kendini evinde hisseder. {A} küçük ama düzenli ilgi göstergelerine, {B} de duygularını söze dökmeye alıştığında bu kare bir sürtüşme kaynağı olmaktan çıkar.",
      ],
    },
    {
      id: 'iletisim',
      baslik: 'İletişim ve Zihinsel Uyum',
      glif: '☿',
      yuzde: 58,
      nedenler: [
        { tur: 'aci', isaret: '□', metin: "{A:in} Merkür'ü, {B:in} Merkür'üne kare", orb: "1°05'", ton: 'eksi' },
        { tur: 'aci', isaret: '☌', metin: "{A:in} Merkür'ü, {B:in} Satürn'üne kavuşum", orb: "3°40'", ton: 'yogun' },
        { tur: 'ev', isaret: '3', metin: "{B:in} Mars'ı {A:in} 3. evinde", ton: 'arti' },
        { tur: 'ev', isaret: '3', metin: "{A:in} Güneş'i {B:in} 3. evinde", ton: 'arti' },
      ],
      ucretsiz: [
        "İletişiminizin merkezinde {A:in} Merkür'ü ile {B:in} Merkür'ü arasındaki 1°05'lik kare var. {A:in} Merkür'ü Kova'da: düşünceleri hızlı, fikir odaklı ve biraz mesafelidir. {B:in} Merkür'ü Akrep'te: konuşmadan önce dinler, söylenmeyeni sezer ve sorgular. {A} bir konuyu fikir olarak tartışırken {B} aynı konuyu kişisel bir mesaj gibi algılayabilir. Bu yüzden aynı konuşmadan ikinizin bambaşka sonuçlar çıkardığı anlar sık yaşanır. Orbun neredeyse tam olması, bu etkiyi ilişkinin kalıcı bir teması yapıyor.",
      ],
      ucretli: [
        "{A:in} Merkür'ü, {B:in} Satürn'üyle 3°40'lık kavuşum yapıyor. Bu, {B:in} {A:in} sözlerini ciddiye aldığını ama zaman zaman eleştirel ya da otoriter bir tonla karşılık verdiğini gösterir. {A} kendini yargılanıyor gibi hissedebilir. Öte yandan aynı açı, birlikte alınan kararların kalıcı olmasını ve verilen sözlerin tutulmasını sağlar.",
        "Ev yerleşimleri tabloyu dengeliyor. {B:in} Mars'ı {A:in} 3. evinde, {A:in} Güneş'i de {B:in} 3. evinde. İkiniz de birbirinizin gündelik konuşma alanını canlandırıyorsunuz: mesajlaşma, kısa yolculuklar ve gün içindeki küçük paylaşımlar ilişkinin en keyifli kısmı olabilir. Zorluk derin tartışmalarda çıkar; gündelik iletişimde aranızda doğal bir akış vardır.",
      ],
    },
    {
      id: 'romantizm',
      baslik: 'Romantizm ve Şefkat',
      glif: '♀',
      yuzde: 88,
      nedenler: [
        { tur: 'aci', isaret: '△', metin: "{B:in} Venüs'ü, {A:in} Güneş'ine üçgen", orb: "0°50'", ton: 'arti' },
        { tur: 'aci', isaret: '⚹', metin: "{B:in} Neptün'ü, {A:in} Güneş'ine altmışlık", orb: "0°20'", ton: 'arti' },
        { tur: 'aci', isaret: '△', metin: "{B:in} Venüs'ü, {A:in} Satürn'üne üçgen", orb: "2°05'", ton: 'arti' },
        { tur: 'ev', isaret: '5', metin: "{B:in} Satürn'ü {A:in} 5. evinde", ton: 'eksi' },
      ],
      ucretsiz: [
        "Romantizm, haritalarınızın en parlak başlığı. {B:in} Venüs'ü ile {A:in} Güneş'i arasındaki üçgen 0°50' orbla neredeyse tam. {B}, {A:i} olduğu gibi beğenir ve bunu göstermekten çekinmez; {A} ise {B:in} yanında kendini değerli ve görülmüş hisseder. Akrep'teki Venüs ile Balık'taki Güneş aynı su elementini paylaştığı için bu beğeni yüzeyde kalmaz, duygusal bir hayranlığa dönüşür.",
      ],
      ucretli: [
        "Buna {B:in} Neptün'ü ile {A:in} Güneş'i arasındaki 0°20'lik altmışlık ekleniyor. Neptün sinastride idealleştirme, büyülenme ve ruh eşi hissi verir. {B}, {A:i} romantik bir ışık altında görür. Altmışlık uyumlu bir açı olduğu için bu idealleştirme hayal kırıklığına değil, ilhama dönüşme eğilimindedir. Müzik, film, sanat ya da deniz kenarı gibi ortamlar ilişkinizi besler.",
        "Romantizmin kalıcılığını {A:in} Satürn'ü ile {B:in} Venüs'ü arasındaki 2°05'lik üçgen sağlıyor. Venüs–Satürn üçgeni duyguların zamanla sınanıp olgunlaştığını gösterir; aşk sönmez, derinleşir. Tek uyarı {B:in} Satürn'ünün {A:in} 5. evine düşmesi. {A} için flört ve oyun alanı zaman zaman ciddiyete, sorumluluğa ya da planlamaya dönüşebilir. Romantizmi canlı tutmak için kendiliğinden sürprizlere bilinçli olarak yer açmanız iyi gelir.",
      ],
    },
    {
      id: 'guven',
      baslik: 'Güven ve Kalıcılık',
      glif: '♄',
      yuzde: 76,
      nedenler: [
        { tur: 'aci', isaret: '△', metin: "{A:in} Satürn'ü, {B:in} Güneş'ine üçgen", orb: "2°20'", ton: 'arti' },
        { tur: 'aci', isaret: '△', metin: "{A:in} Satürn'ü, {B:in} Venüs'üne üçgen", orb: "2°05'", ton: 'arti' },
        { tur: 'aci', isaret: '⚹', metin: "{B:in} Ay'ı, {A:in} Satürn'üne altmışlık", orb: "4°30'", ton: 'arti' },
        { tur: 'aci', isaret: '☌', metin: "{A:in} Merkür'ü, {B:in} Satürn'üne kavuşum", orb: "3°40'", ton: 'yogun' },
      ],
      ucretsiz: [
        "İlişkinin kalıcılığını taşıyan en önemli gösterge {A:in} Satürn'ü ile {B:in} Güneş'i arasındaki 2°20'lik üçgen. Sinastride Satürn–Güneş üçgeni, bir kişinin diğerine yapı ve güven sağladığını gösterir. {A}, {B:in} hedeflerine ciddiyetle destek olur; {B} de {A:in} yanında daha sağlam ve olgun bir hâline kavuşur. {A:in} Satürn'ü Balık'ta, {B:in} Güneş'i Akrep'te. Aynı su elementinde oldukları için bu destek kural koyarak değil, duygusal sadakatle kendini gösterir.",
      ],
      ucretli: [
        "Aynı Satürn, {B:in} Venüs'üne de 2°05'lik üçgen yapıyor. Böylece {A:in} Satürn'ü hem {B:in} kimliğine (Güneş) hem sevgisine (Venüs) olumlu temas ediyor. Bu, sinastride uzun ilişkilerin en tipik göstergelerinden biri. {B:in} Ay'ı da {A:in} Satürn'üne 4°30'luk altmışlık yaptığı için {B}, duygusal olarak {A:e} güvenebileceğini hisseder.",
        "Dikkat edilmesi gereken nokta {A:in} Merkür'ü ile {B:in} Satürn'ü arasındaki kavuşum. Bu ilişkide güven, sözlerin tutulmasıyla inşa edilir; bu açı tutulmayan bir sözün büyük bir hayal kırıklığı yaratacağını gösterir. Sözleri az ama net tutmak, güvenin en hızlı büyüdüğü yoldur.",
      ],
    },
    {
      id: 'huzur',
      baslik: 'Huzur ve Çatışma Dengesi',
      glif: '☍',
      yuzde: 54,
      nedenler: [
        { tur: 'aci', isaret: '□', metin: "{B:in} Güneş'i, {A:in} Mars'ına kare", orb: "5°40'", ton: 'eksi' },
        { tur: 'aci', isaret: '□', metin: "{A:in} Ay'ı, {B:in} Ay'ına kare", orb: "3°00'", ton: 'eksi' },
        { tur: 'aci', isaret: '□', metin: "{A:in} Merkür'ü, {B:in} Merkür'üne kare", orb: "1°05'", ton: 'eksi' },
        { tur: 'aci', isaret: '△', metin: "{A:in} Ay'ı, {B:in} Mars'ına üçgen", orb: "1°40'", ton: 'arti' },
      ],
      ucretsiz: [
        "Huzur ve çatışma dengesinde haritalarınız orta seviyede. Sürtüşmeyi en çok artıran gösterge {B:in} Güneş'i ile {A:in} Mars'ı arasındaki 5°40'lık kare. Akrep'teki Güneş ile Aslan'daki Mars iki sabit burç; ikiniz de geri adım atmayı yenilgi gibi yaşayabilirsiniz. {A:in} öfkesi hızlı ve görünürdür, {B:in} tepkisi ise sessiz ve uzun sürer. Bu yüzden tartışmanın kendisinden çok bitmesi zaman alır.",
      ],
      ucretli: [
        "Ay–Ay karesi (3°00') ve Merkür–Merkür karesi (1°05') bu tabloyu güçlendiriyor. Duygusal ihtiyaçlarınızın ve iletişim tarzlarınızın farklı olması küçük meselelerin büyümesine zemin hazırlar. Çatışmaların çoğu ne söylendiğinden değil, nasıl söylendiğinden çıkar.",
        "Dengeleyici gösterge {A:in} Ay'ı ile {B:in} Mars'ı arasındaki 1°40'lık üçgen. {B}, öfkeli anlarda bile {A:in} duygusal sınırlarına saygı gösterme eğiliminde; bu da kavgaların kalıcı yara bırakmasını önler. Bu yüzdeyi yükseltmenin yolu net: tartışmaya bir zaman sınırı koymak ve barışmayı kimin haklı olduğu sorusundan ayırmak.",
      ],
    },
    {
      id: 'karmik',
      baslik: 'Karmik Bağ',
      glif: '☊',
      yuzde: 69,
      nedenler: [
        { tur: 'aci', isaret: '☌', metin: "{B:in} Kuzey Ay Düğümü, {A:in} Jüpiter'ine kavuşum", orb: "3°10'", ton: 'arti' },
        { tur: 'aci', isaret: '☌', metin: "{A:in} Kuzey Ay Düğümü, {B:in} Jüpiter'ine kavuşum", orb: "3°20'", ton: 'arti' },
        { tur: 'ev', isaret: '8', metin: "{A:in} Ay'ı {B:in} 8. evinde", ton: 'yogun' },
        { tur: 'aci', isaret: '△', metin: "{A:in} Satürn'ü, {B:in} Güneş'ine üçgen", orb: "2°20'", ton: 'arti' },
      ],
      ucretsiz: [
        "Aranızdaki karmik bağın en belirgin göstergesi, {B:in} Kuzey Ay Düğümü ile {A:in} Jüpiter'i arasındaki 3°10'luk kavuşum. Kuzey Düğüm, kişinin bu hayatta yöneldiği yönü gösterir. {A:in} Jüpiter'i bu noktaya temas ettiği için {A}, {B:in} hayatında ufuk açan, cesaretlendiren ve yeni bir yöne iten kişi olur. Yay burcundaki bu kavuşum, ilişkinin yolculuklar, eğitim, inanç ya da yeni bir yaşam felsefesi etrafında büyüyebileceğini gösteriyor.",
      ],
      ucretli: [
        "Tema karşılıklı: {A:in} Kuzey Ay Düğümü de {B:in} Jüpiter'iyle 3°20'lik kavuşum yapıyor. Yani {B} de {A:in} gelişim yolunda benzer bir rol üstleniyor. İki yönlü Düğüm–Jüpiter teması, birbirinizin büyümesine karşılıklı katkı sağladığınız nadir bir eşleşmedir.",
        "{A:in} Ay'ının {B:in} 8. evine düşmesi ve {A:in} Satürn'ünün {B:in} Güneş'ine üçgen yapması bu bağa bir tanıdıklık hissi veriyor. İlk tanıştığınızda birbirinizi çoktan tanıyormuş gibi hissetmeniz bu göstergelerin tipik bir yansımasıdır. Karmik bağ ilişkinin kolay olacağı anlamına gelmez, ama kolay kopmayacağını gösterir.",
      ],
    },
  ],

  iliskiHaritasi: [
    {
      id: 'baslangic',
      kaynak: 'Kompozit Yükselen ve yöneticisi',
      soru: 'İlişki nasıl başlayabilir?',
      gostergeler: [
        ['Kompozit Yükselen', "Akrep 8°14'"],
        ['Yönetici', "♂ Mars · Terazi 13°02' · 12. ev"],
        ["Mars'ın açıları", "□ Merkür 0°30' · ⚹ MC 2°05'"],
        ['Eş yönetici', "♇ Plüton · Akrep 12°41' · 1. ev · ☌ Yükselen 4°27'"],
      ],
      ucretsiz: [
        "Kompozit Yükseleniniz Akrep'te. Kompozit Yükselen, ilişkinin dışarıdan nasıl göründüğünü ve nasıl başladığını anlatır. Akrep yükselen bir ilişki genellikle yavaş, temkinli ve yoğun bir başlangıç yapar: ilk izlenimde güçlü bir çekim vardır ama iki taraf da kartlarını hemen açmaz. Çevreniz ilişkinin ne kadar derin olduğunu çoğu zaman sizden sonra fark eder. Yükselen'in geleneksel yöneticisi Mars'ın 12. evde olması bunu güçlendiriyor: ilişkinin ilk dönemi büyük ihtimalle gözlerden uzak, sessiz ya da gizli ilerler.",
      ],
      ucretli: [
        "Mars Terazi'de. Akrep yükselenin yoğunluğu, Terazi'deki Mars sayesinde nezaketle ve diplomasiyle ifade edilir. Başlangıçta kimse açıkça ilk adımı atmaz; ilişki daha çok karşılıklı yoklamalarla, ince işaretlerle ve ikinizin de bildiği ama söylemediği anlarla ilerler. Mars'ın Merkür'e 0°30'luk karesi, bu dönemin kritik anının bir konuşma ya da mesajlaşma olacağını gösteriyor. Yanlış anlaşılan bir cümle ya da söylenemeyen bir duygu, ilişkinin resmîleşmesini geciktirebilir.",
        "Mars'ın MC'ye 2°05'lik altmışlığı, ilişki görünür hâle geldiğinde ikinizin sosyal hayatında ve hedeflerinde olumlu bir yer tutacağını gösteriyor. Modern yönetici Plüton'un 1. evde Yükselen'e kavuşması ise ilişkinin başladığı andan itibaren ikinizi de dönüştüreceğini söylüyor. Bu ilişkiye hafif bir flört olarak başlamak zordur; ya hiç başlamaz ya da derinden başlar.",
      ],
    },
    {
      id: 'kimlik',
      kaynak: 'Davison Güneş',
      soru: 'İlişkinin kimliği ve amacı',
      gostergeler: [
        ['Burç', "Yengeç 14°08'"],
        ['Ev', '10. ev'],
        ['Yönettiği ev', '12. ev (Aslan)'],
        ['Açılar', "△ Ay 2°05' · △ Satürn 3°52' · ☍ Neptün 6°48'"],
      ],
      ucretsiz: [
        "Davison Güneşiniz Yengeç'te ve 10. evde. Davison Güneş, ilişkinin ne için var olduğunu ve temel kimliğini anlatır. Yengeç'teki Güneş, bu ilişkinin özünde bir yuva kurma, korunma ve aidiyet arayışı olduğunu gösterir. 10. ev ise bu yuvanın dışarıya görünür olacağını söylüyor: ilişkiniz özel bir mesele olarak kalmaz, çevreniz sizi bir çift olarak tanır. Ortak bir itibarınız, belki ortak bir işiniz ya da hedefiniz olur. Bu birleşim, birlikte bir hayat inşa etme fikrinin ilişkinin merkezinde durduğunu gösteriyor.",
      ],
      ucretli: [
        "Güneş'in Ay'a 2°05'lik üçgeni, Davison haritasındaki en uyumlu göstergelerden biri. İlişkinin amacı (Güneş) ile duygusal ihtiyacı (Ay) birbirini destekliyor; ne istediğinizle neye ihtiyaç duyduğunuz çatışmıyor. Satürn'e 3°52'lik üçgen bu amaca dayanıklılık ekliyor. İlişki zor dönemlerde dağılmak yerine sorumluluk alarak güçlenir.",
        "Güneş 12. evi yönetiyor ve Neptün'e 6°48'lik karşıtlık yapıyor. İlişkinin kimliğinin bir kısmı görünmez kalır: ikinizden başka kimsenin tam anlamadığı bir iç dünya, ortak bir hayal ya da fedakârlık teması. Bu karşıtlık, kariyer ve görünürlük (10. ev) ile ilişkinin özel ve ruhsal tarafı arasında zaman zaman denge kurmanızı gerektirir.",
      ],
    },
    {
      id: 'beslenme',
      kaynak: 'Davison Ay',
      soru: 'İlişki nereden beslenir?',
      gostergeler: [
        ['Burç', "Akrep 16°31'"],
        ['Ev', '3. ev'],
        ['Yönettiği ev', '11. ev (Yengeç)'],
        ['Açılar', "△ Güneş 2°05' · △ Satürn 6°10'"],
      ],
      ucretsiz: [
        "Davison Ayınız Akrep'te ve 3. evde. Ay, ilişkinin duygusal olarak nereden beslendiğini gösterir. Akrep'teki Ay, bu ilişkinin yüzeysel ilgiyle değil, derinlikle ve dürüstlükle beslendiğini söylüyor: birbirinize en karanlık düşüncelerinizi bile anlatabildiğinizde bağınız güçlenir. 3. ev bu beslenmenin konuşma yoluyla gerçekleştiğini gösteriyor. Gece yarısı konuşmaları, uzun mesajlar ve birlikte yapılan kısa yolculuklar ilişkinin duygusal yakıtıdır. Sessizlik ise bu ilişkiyi en hızlı tüketen şeydir.",
      ],
      ucretli: [
        "Ay 11. evi yönetiyor. İlişki ortak arkadaşlıklarla, aynı gruba ait olmakla ve birlikte paylaşılan gelecek hayalleriyle de beslenir. Çevrenizin ilişkinizi desteklemesi sizin için düşündüğünüzden daha önemlidir.",
        "Ay'ın Güneş'e üçgeni duygusal tatminin ilişkinin amacıyla uyumlu olduğunu gösteriyor. Satürn'e 6°10'luk üçgen ise duygusal güvenin zamanla ve sınanarak arttığını söylüyor. İlk aylarda duygusal olarak açılmak yavaş olabilir, ama bir kez güven kurulduğunda bu Ay kolay sarsılmaz.",
      ],
    },
    {
      id: 'iyi-gelen',
      kaynak: 'Davison Venüs',
      soru: 'İlişkiye ne iyi gelir?',
      gostergeler: [
        ['Burç', "Başak 4°19'"],
        ['Ev', '12. ev'],
        ['Yönettiği evler', '9. ev (Boğa) · 2. ev (Terazi)'],
        ['Açılar', "⚹ Jüpiter 0°58' · □ Mars 2°17' · ☍ Satürn 5°44'"],
      ],
      ucretsiz: [
        "Davison Venüsünüz Başak'ta ve 12. evde. Venüs, ilişkiye neyin iyi geldiğini anlatır. Başak'taki Venüs sevginin küçük ve somut ilgilerle gösterilmesinden hoşlanır: birinin kahvesini nasıl içtiğini hatırlamak ya da yorgun olduğunda işini kolaylaştırmak gibi. 12. ev ise bu ilişkiye en iyi gelen şeyin baş başa ve dış dünyadan uzak zamanlar olduğunu gösteriyor. Kalabalıktan uzak bir hafta sonu, telefonların kapalı olduğu bir akşam ya da yalnızca ikinizin bildiği bir yer ilişkinizi her şeyden çok besler.",
      ],
      ucretli: [
        "Venüs 9. evi (Boğa) ve 2. evi (Terazi) yönetiyor. 9. ev yöneticiliği ilişkiye seyahatin, yeni kültürlerin ve birlikte öğrenmenin iyi geldiğini gösteriyor. 2. ev yöneticiliği ise ortak bir maddi düzen kurmanın, birlikte birikim yapmanın ve güzel şeylere birlikte harcama yapmanın huzur getirdiğini söylüyor. Venüs'ün Jüpiter'e 0°58'lik altmışlığı bu iki alanı daha da güçlendiriyor; birlikte bir yolculuk planlamak, bu ilişkide en iyi onarım yollarından biri.",
        "Venüs'ün Mars'a 2°17'lik karesi ve Satürn'e 5°44'lük karşıtlığı neyin iyi gelmediğini gösteriyor: sevginin aceleye getirilmesi ya da bir görev gibi yaşanması. Başak'taki Venüs eleştiriye hassastır ve Satürn karşıtlığı yüzünden sevgi gösterilmediğinde sevilmeme hissi kolayca doğabilir. Takdiri sözle ifade etmek bu ilişkide bir lüks değil, bir ihtiyaçtır.",
      ],
    },
    {
      id: 'sinav',
      kaynak: 'Davison Satürn',
      soru: 'İlişki hangi alanlarda sınanır?',
      gostergeler: [
        ['Burç', "Balık 10°26' (geri)"],
        ['Ev', '6. ev'],
        ['Yönettiği evler', '5. ev (Oğlak) · 6. ev (Kova)'],
        ['Açılar', "△ Güneş 3°52' · △ Ay 6°10' · ☍ Venüs 5°44'"],
      ],
      ucretsiz: [
        "Davison Satürnünüz Balık'ta ve 6. evde. Satürn, ilişkinin sınandığı ve emek istediği alanı gösterir. 6. ev gündelik düzenle, iş yüküyle ve sağlıkla ilgilidir. Bu ilişkide sınav büyük krizlerden çok gündelik hayatın içinden gelir: kimin ne kadar yorgun olduğu, ev işlerinin nasıl paylaşıldığı, iş temposunun ilişkiye zaman bırakıp bırakmadığı. Balık'taki Satürn sınırları belirsizleştirme eğilimindedir; ikinizden biri sessizce fazla yük alıp sonunda tükenebilir.",
      ],
      ucretli: [
        "Satürn 5. evi ve 6. evi yönetiyor. 5. ev yöneticiliği eğlencenin, romantizmin ve isteniyorsa çocuk konusunun ciddiyet ve planlama gerektirdiğini gösteriyor. Eğlence kendiliğinden gelmez; birlikte vakit planlamazsanız rutin onu yutar. Satürn'ün geri hareketi, bu sınavların ilişkinin ilk yıllarında değil, belli bir olgunluğa ulaştıktan sonra belirginleşeceğini düşündürüyor.",
        "İyi haber: Satürn hem Güneş'e hem Ay'a üçgen yapıyor. Bu, sınavların ilişkinin temelini sarsmadığını, tersine sağlamlaştırdığını gösterir. Zorlayıcı nokta Venüs karşıtlığı. Gündelik sorumluluklar arttığında sevgi ifadesi geri plana düşer; önce işleri, sonra ilişkiyi koyan bir düzen bu haritada uzun vadede yıpratıcı olur.",
      ],
    },
    {
      id: 'catisma',
      kaynak: 'Davison Mars',
      soru: 'Hangi konular çatışma yaratır?',
      gostergeler: [
        ['Burç', "İkizler 2°02'"],
        ['Ev', '9. ev'],
        ['Yönettiği evler', '8. ev (Koç) · 3. ev (Akrep, eş yönetici Plüton)'],
        ['Açılar', "□ Venüs 2°17' · ⚹ Merkür 3°11'"],
      ],
      ucretsiz: [
        "Davison Marsınız İkizler'de ve 9. evde. Mars, ilişkide öfkenin, rekabetin ve çatışmanın nereden çıktığını gösterir. 9. ev inançlarla, dünya görüşüyle, eğitimle, seyahatle ve aileler arası farklılıklarla ilgilidir. Tartışmalarınız büyük ihtimalle gündelik meselelerden değil, neyin doğru olduğu sorusundan çıkar: değerler, gelecek planları, nerede yaşanacağı, ailelerin beklentileri. İkizler'deki Mars bu tartışmaları sözlü, hızlı ve zekice yapar. Genellikle en iyi argümanı kuran kazanır, ama bu her zaman ilişkinin kazandığı anlamına gelmez.",
      ],
      ucretli: [
        "Mars 8. evi yönetiyor. Ortak para, borçlar, miras, mahremiyet ve kıskançlık ikinci büyük çatışma alanınız. Özellikle ortak harcamalar ve kimin neye karar verdiği konusunda net anlaşmalar yapmak çatışmaları ciddi ölçüde azaltır. Mars ayrıca 3. evi (Akrep) yönetiyor; kardeşler, yakın çevre ve gündelik mesajlaşmanın tonu da küçük kıvılcımlar çıkarabilir.",
        "Mars'ın Venüs'e 2°17'lik karesi, bu ilişkide çatışma ile çekimin iç içe olduğunu gösteriyor; tartışmalar çoğu zaman yakınlaşmayla biter. Merkür'e 3°11'lik altmışlık ise iyi haber: çatışmalar konuşarak çözülebilir. Sorun konuşmamak değil, konuşmayı bir yarışa çevirmektir.",
      ],
    },
  ],

  zamanlama: {
    ozet: 'Önümüzdeki 12 ay için gökyüzündeki gezegenlerin ilişki haritalarınıza ve iki kişinin Venüs\'üne yaptığı temaslar hesaplandı: 3 güçlü dönem ve 1 bekleme dönemi bulundu.',
    donemler: [
      { tarih: '27 Ekim – 13 Kasım 2026', baslik: 'Bekleme dönemi', metin: 'Venüs geri hareketinin son haftaları. Eski konuların yeniden açılmasına uygun, yeni bir başlangıç için erken.' },
      { tarih: '18 Şubat – 9 Mayıs 2027', baslik: 'En güçlü dönem', metin: "Jüpiter, Aslan 15°'deki kompozit MC'nizin üzerinde duruyor. İlişkinin görünür hâle gelmesi ve resmîleşmesi için yılın en destekleyici dönemi." },
      { tarih: '2 – 24 Haziran 2027', baslik: 'Yakınlaşma', metin: "Transit Venüs, Davison Güneş'inizle kavuşuyor ve Davison Ay'ınıza üçgen yapıyor. Duygusal açılma ve ilk itiraflar için uygun." },
      { tarih: 'Ağustos 2027', baslik: 'Derinleşme', metin: "Transit Mars, kompozit Yükselen'inize üçgen yapıyor. Birlikte karar alma ve ilk adımı atma cesareti artıyor." },
    ],
  },
};
