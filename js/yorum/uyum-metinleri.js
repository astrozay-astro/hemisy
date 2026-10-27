// Uyum bölümünün yorum metinleri. Her metin belirli bir göstergeye bağlıdır. Uygulama yalnızca haritada
// gerçekten bulunan göstergelerin metinlerini seçer ve akıcı bir anlatım hâlinde birleştirir.
// Yazım kuralları: okuyucuya teknik terim verilmez, dil her zaman olasılık dilidir ("anlaşabilirsiniz"),
// metinlerde noktalı virgül kullanılmaz.
//
// Yer tutucular: {X} ve {Y} kişilerin adlarıdır, ekler otomatik gelir: {X:in} → Ayşe'nin, {Y:e} → Mehmet'e, {X:i} → Ayşe'yi
//   Çift metinlerinde {X} çiftin ilk gezegeninin, {Y} ikinci gezegeninin sahibidir (ör. 'venus-mars': X'in Venüs'ü, Y'nin Mars'ı).
//   Ev metinlerinde {X} gezegenin sahibi, {Y} evin sahibidir.
//
// Açı türleri: k = kavuşum, u = uyumlu (altmışlık, üçgen), g = gergin (kare, karşıt, quincunx),
//              alcalan = gezegen diğer kişinin Alçalan noktasında (Yükselen'e karşıtlık)
window.ASTROSHIP_UYUM_METINLERI = {
  ciftler: {
    'gunes-gunes': {
      k: 'Hayata bakışınız ve kendinizi ifade etme biçiminiz şaşırtıcı ölçüde benziyor gibi görünüyor. Birbirinizi açıklamaya gerek kalmadan anlayabilirsiniz. Yalnızca ikiniz de aynı anda öne çıkmak istediğinizde küçük bir rekabet doğabilir.',
      u: 'Kimlikleriniz ve hayattan beklentileriniz birbirini destekliyor gibi görünüyor. Birbirinizin başarısını bir tehdit olarak değil, ilham kaynağı olarak görebilirsiniz. Bu, birlikte büyümeyi kolaylaştıran bir uyum olabilir.',
      g: 'Hayattan beklentileriniz ve kendinizi ifade etme biçimleriniz sizi farklı yönlere çekiyor gibi görünüyor. Bu fark ikinizi de büyütebilir, ama ilişkinin hangi yöne gideceği sık sık masaya gelebilir.',
    },
    'gunes-ay': {
      k: '{X}, {Y:in} duygusal olarak aradığı şeyin ta kendisi gibi görünebilir. {Y}, {X:in} yanında kendini evinde hissediyor gibi görünüyor. Bu, kalıcı birliktelikleri en çok besleyen uyumlardan biri olabilir.',
      u: '{X:in} kendini ifade etme biçimi {Y:in} iç dünyasına iyi geliyor gibi görünüyor. Aranızda zorlamadan kurulan, sessiz bir anlaşma ve doğal bir rahatlık olabilir.',
      g: '{X:in} istekleri ile {Y:in} duygusal ihtiyaçları zaman zaman birbirine ters düşüyor gibi görünüyor. {Y} kendini yeterince görülmemiş, {X} ise fazla yönlendirilmiş hissedebilir. Bu yüzden ihtiyaçlarınızı açıkça dile getirmek çok önemli olabilir.',
    },
    'gunes-merkur': {
      k: '{Y}, {X:i} zihinsel olarak çok iyi anlıyor gibi görünüyor. Onu dinlemekten de onunla konuşmaktan da keyif alabilir. Fikirleriniz kolayca aynı noktada buluşabilir.',
      u: '{Y:in} söyledikleri {X:in} kendini anlaşılmış hissetmesini sağlıyor gibi görünüyor. Birlikte plan yapmak ve yeni fikirler üretmek size doğal gelebilir.',
      g: '{Y:in} yorumları {X:e} zaman zaman eleştiri gibi gelebilir. Aynı konuya farklı pencerelerden bakıyor gibisiniz. Bu bazen tartışma çıkarabilir, ama ilişkiye zihinsel bir canlılık da katabilir.',
    },
    'gunes-venus': {
      k: '{Y}, {X:i} olduğu gibi sevebilir ve bunu göstermekten çekinmeyebilir. {X} de {Y:in} yanında kendini değerli hissediyor gibi görünüyor. Karşılıklı hayranlık bu ilişkinin en güçlü yanlarından biri olabilir.',
      u: 'Aranızda doğal bir sevgi ve hayranlık akışı olabilir. {Y}, {X:in} karakterini çekici buluyor gibi görünüyor. Birlikte geçen zaman ikinize de keyif verebilir.',
      g: 'Birbirinizden hoşlanabilirsiniz, ama zevkleriniz ve sevgiyi gösterme biçimleriniz farklı olabilir. {Y:in} beklediği ilgi ile {X:in} gösterdiği ilgi her zaman örtüşmüyor gibi görünüyor.',
    },
    'gunes-mars': {
      k: 'Aranızda güçlü bir enerji ve fiziksel çekim olabilir. {Y}, {X:i} harekete geçiriyor ve cesaretlendiriyor gibi görünüyor. Ama bu yoğunluk kolayca rekabete ya da tartışmaya da dönüşebilir.',
      u: 'Birlikteyken enerjiniz yükseliyor gibi görünüyor. {Y:in} girişkenliği {X:in} hedeflerine güç katabilir. Birlikte bir şeyler başarmak ikinizi de besleyebilir.',
      g: 'Aranızda yüksek bir enerji olabilir, ama gurur çatışmaları da kolay çıkıyor gibi görünüyor. {Y:in} çıkışları {X:e} meydan okuma gibi gelebilir. Tartışmanın ardından gelen yakınlaşma sizin için tanıdık bir döngü olabilir.',
    },
    'gunes-jupiter': {
      k: '{Y}, {X:in} hayatına bolluk, iyimserlik ve büyüme getiriyor gibi görünüyor. Birbirinize karşı cömert olabilirsiniz. Bu ilişki ikinizin de ufkunu genişletebilir.',
      u: '{Y}, {X:e} güven veriyor ve onu içtenlikle destekliyor gibi görünüyor. Birlikteyken şansınızın ve fırsatlarınızın arttığını hissedebilirsiniz.',
      g: 'İyi niyetiniz bol olabilir, ama beklentileriniz de büyüyor gibi görünüyor. {Y:in} cömertliği zaman zaman {X:e} fazla gelebilir. Vaatleri gerçekçi tutmak ilişkinizi koruyabilir.',
    },
    'gunes-saturn': {
      k: '{Y}, {X:in} hayatına düzen, sorumluluk ve güven getiriyor gibi görünüyor. Aranızdaki bağ ciddi ve uzun soluklu olabilir. Yine de {X} zaman zaman kendini sınırlanmış ya da yargılanmış hissedebilir.',
      u: '{Y}, {X:in} hedefleri için sağlam bir dayanak olabilir. {X} de {Y:in} yanında daha olgun ve kararlı bir hâline kavuşuyor gibi görünüyor. Aranızda uzun ilişkilere özgü bir dayanıklılık olabilir.',
      g: 'Aranızdaki bağ güçlü olabilir, ama yükü de ağır geliyor gibi görünüyor. {Y:in} eleştirileri ya da mesafeli tavrı {X:in} özgüvenini zorlayabilir. Sabırlı olduğunuzda ilişki zamanla olgunlaşabilir.',
    },
    'gunes-uranus': {
      k: 'Aranızda ani, heyecanlı ve elektrik yüklü bir çekim olabilir. {Y}, {X:in} hayatına yenilik ve özgürlük getiriyor gibi görünüyor. Ancak ilişki düzen ve istikrar konusunda sınanabilir.',
      u: 'Birbirinizi şaşırtmaya da özgür bırakmaya da hazır olabilirsiniz. İlişkiniz rutine sıkışmadan canlı kalıyor gibi görünüyor.',
      g: 'Çekim ani ama dengesiz olabilir. {Y:in} bağımsızlık ihtiyacı {X:e} güvensizlik gibi gelebilir. Ayrılıp barışma döngülerine karşı dikkatli olmak size iyi gelebilir.',
    },
    'gunes-pluton': {
      k: 'Aranızda derin, dönüştürücü ve neredeyse bağımlılık yaratan bir bağ olabilir. {Y}, {X:i} köklü biçimde değiştiriyor gibi görünüyor. Kontrol ve güç konuları ilişkinin ana teması hâline gelebilir.',
      u: 'Birbirinizi derinden etkiliyor ve güçlendiriyor gibisiniz. Zor zamanlar bu ilişkide ikinizi de yeniden doğurabilir.',
      g: 'Yoğun bir çekim ile bir güç mücadelesi iç içe geçiyor gibi görünüyor. Kıskançlık ve kontrol ihtiyacı belirginleşebilir. Güven kurulduğunda ise bu yoğunluk ikinizi birbirinize sıkıca bağlayabilir.',
    },
    'gunes-kuzeyDugum': {
      k: '{X}, {Y:in} bu hayatta yürümek istediği yolu temsil ediyor olabilir. {Y} için bu karşılaşma bir kader buluşması gibi hissedilebilir.',
      u: '{X}, {Y:in} gelişim yolunu kolaylaştırıyor ve ona doğru yönü gösteriyor gibi görünüyor.',
      g: 'Bu ilişki ikinizi de alıştığınız güvenli alanın dışına çıkarıyor gibi görünüyor. Büyüme olabilir, ama kolay olmayabilir.',
    },
    'gunes-yukselen': {
      k: '{Y}, {X:i} daha ilk anda fark edip ona çekiliyor gibi görünüyor. {X:in} varlığı, {Y:in} kendini ifade etme biçimini güçlendirebilir.',
      u: 'Birbirinizin yanında rahat ve doğal davranıyor gibisiniz. İlk izleniminiz olumlu olabilir.',
      g: 'İlk anda bir çekim olabilir, ama tarzlarınız farklı olduğu için birbirinize uyum sağlamanız zaman alabilir.',
      alcalan: '{Y}, {X:i} aradığı partner olarak görüyor gibi görünüyor. Bu, uzun bir ilişki ve evlilik için güçlü bir işaret olabilir.',
    },
    'ay-ay': {
      k: 'Duygusal ritimleriniz neredeyse aynı olabilir. Birbirinizin ruh hâlini söylemeden anlıyor gibisiniz. Aranızda derin bir duygusal tanıdıklık olabilir.',
      u: 'Duygusal ihtiyaçlarınız birbirini tamamlıyor gibi görünüyor. Birlikte yaşamak, aynı evi paylaşmak ve gündelik ritmi uyumlu hâle getirmek size kolay gelebilir.',
      g: 'Duygusal ihtiyaçlarınız ve tepki verme biçimleriniz farklı olabilir. Biriniz konuşmak isterken diğeriniz içine kapanabilir. Bu sevgisizlik değil, iki ayrı duygusal dilin karşılaşması olabilir.',
    },
    'ay-merkur': {
      k: '{Y}, {X:in} duygularını kelimelere dökmesine yardım ediyor gibi görünüyor. Aranızdaki konuşmalar duygusal olarak besleyici olabilir.',
      u: 'Duygular ve düşünceler aranızda kolayca akıyor gibi görünüyor. {X}, kendini {Y:e} anlatırken anlaşıldığını hissedebilir.',
      g: '{Y:in} mantıklı yaklaşımı, {X:in} duygusal ihtiyaçlarını gözden kaçırıyor gibi görünüyor. {X} anlaşılmadığını, {Y} ise fazla alıngan bulunduğunu düşünebilir.',
    },
    'ay-venus': {
      k: 'Şefkat ile sevgi aranızda çok güçlü bir biçimde buluşuyor gibi görünüyor. {Y}, {X:in} duygusal ihtiyaçlarını sezgiyle karşılayabilir. Aranızda yumuşak ve sıcak bir bağ olabilir.',
      u: 'Sevgiyi gösterme biçimleriniz birbirinize iyi geliyor gibi görünüyor. Aranızdaki şefkat, ilişkinin en sağlam yanlarından biri olabilir.',
      g: 'Sevgi olabilir, ama onu ifade etme biçimleriniz farklı olabilir. {X:in} ihtiyaç duyduğu duygusal güvence ile {Y:in} sunduğu ilgi her zaman örtüşmüyor gibi görünüyor.',
    },
    'ay-mars': {
      k: 'Aranızda güçlü bir duygusal ve fiziksel çekim olabilir. {Y}, {X:in} duygularını harekete geçiriyor gibi görünüyor. Ama {Y:in} dolaysızlığı {X:i} zaman zaman kırabilir.',
      u: '{Y}, {X:in} duygusal ihtiyaçlarına somut adımlarla karşılık veriyor gibi görünüyor. Onu koruyabilir ve gerektiğinde harekete geçebilir.',
      g: '{Y:in} sabırsızlığı ya da öfkesi {X:in} hassas noktalarına dokunuyor gibi görünüyor. Tartışmalar çabuk alevlenebilir. Ama tutku da tam olarak bu gerilimden beslenebilir.',
    },
    'ay-jupiter': {
      k: '{Y}, {X:e} karşı duygusal olarak cömert ve koruyucu olabilir. Birlikteyken iyimserliğiniz ve huzurunuz artıyor gibi görünüyor.',
      u: '{Y:in} desteği, {X:in} kendini güvende hissetmesini sağlıyor gibi görünüyor. İlişkinizde duygusal bir bolluk olabilir.',
      g: 'Duygusal beklentiler kolayca büyüyor gibi görünüyor. {Y:in} vaatleri ile {X:in} ihtiyaçları arasında bir denge kurmanız gerekebilir.',
    },
    'ay-saturn': {
      k: 'Aranızda sadık ve kalıcı, ama biraz ağırbaşlı bir bağ olabilir. {Y}, {X:e} güven veriyor gibi görünüyor. Ancak {X}, duygularını rahatça gösteremediğini hissedebilir.',
      u: 'Duygusal sadakatiniz ve istikrarınız güçlü olabilir. {Y}, {X} için güvenilir bir liman olabilir ve bu ilişki zamanla derinleşiyor gibi görünüyor.',
      g: '{Y:in} mesafeli ya da eleştirel tavrı {X:i} duygusal olarak üşütüyor gibi görünüyor. Bağınız güçlü olabilir, ama sıcaklığı bilinçli olarak beslemeniz gerekebilir.',
    },
    'ay-uranus': {
      k: 'Heyecanlı ama duygusal olarak dalgalı bir bağ olabilir. {Y}, {X:in} iç dünyasına sürprizler getiriyor gibi görünüyor. Güvenin yerleşmesi içinse tutarlılık gerekebilir.',
      u: 'Birbirinize duygusal özgürlük tanıyor gibisiniz. İlişkiniz boğucu olmadan yakın kalabilir.',
      g: '{Y:in} öngörülemezliği, {X:in} güvende olma ihtiyacını sarsıyor gibi görünüyor. Yakınlık ile özgürlük arasında sık sık gidip gelebilirsiniz.',
    },
    'ay-pluton': {
      k: 'Duygusal olarak çok yoğun, zaman zaman takıntıya varabilen bir bağ olabilir. {X}, {Y:in} yanında en derin duygularıyla yüzleşiyor gibi görünüyor.',
      u: 'Birbirinizin duygusal yaralarını iyileştirebilecek güçte olabilirsiniz. Bağınız derin ve dönüştürücü olabilir.',
      g: 'Kıskançlık, sahiplenme ve duygusal kontrol öne çıkıyor gibi görünüyor. Yoğunluk yüksek olabileceği için güveni sağlam kurmak çok önemli olabilir.',
    },
    'ay-kuzeyDugum': {
      k: '{X}, {Y:in} duygusal olarak yönünü bulmasına yardım ediyor gibi görünüyor. Birbirinizi çok önceden tanıyormuş gibi hissedebilirsiniz.',
      u: '{X:in} duygusal desteği, {Y:in} kendi yolunda ilerlemesini kolaylaştırıyor gibi görünüyor.',
      g: 'Duygusal alışkanlıklarınız ile büyüme ihtiyacınız çekişiyor gibi görünüyor. Bu ilişki ikinizi de değişmeye zorlayabilir.',
    },
    'ay-yukselen': {
      k: '{Y}, {X:in} duygusal dünyasına kendiliğinden uyum sağlıyor gibi görünüyor. Birbirinizin yanında güvende hissedebilirsiniz.',
      u: 'Birlikteyken rahat ve sıcak bir atmosfer oluşuyor gibi görünüyor.',
      g: '{Y:in} tarzı, {X:in} duygusal ihtiyaçlarına her zaman uymuyor gibi görünüyor. İlk dönemde uyum sağlamak zaman alabilir.',
      alcalan: '{Y}, {X:i} duygusal olarak aradığı partner gibi görebilir. Bu uyum, birlikte yaşama ve evlilik isteğini güçlendiriyor gibi görünüyor.',
    },
    'merkur-merkur': {
      k: 'Aynı dili konuşuyor gibisiniz. Düşünme hızınız, mizah anlayışınız ve merak ettiğiniz konular birbirine çok yakın olabilir.',
      u: 'Konuşmak sizin için kolay ve keyifli olabilir. Birbirinizin fikirlerini tamamlayabilir, birlikte rahatça plan yapabilirsiniz.',
      g: 'Düşünme ve konuşma tarzlarınız farklı olabilir. Aynı konuşmadan bambaşka sonuçlar çıkarıyor gibisiniz. Yanlış anlaşılmalar aranızdaki en tipik sürtüşme kaynağı olabilir.',
    },
    'merkur-venus': {
      k: 'Aranızdaki konuşmalar tatlı ve flörtöz olabilir. {X:in} sözleri {Y:e} iyi geliyor gibi görünüyor. İltifatlar ve nazik bir dil ilişkinizi besleyebilir.',
      u: 'Birbirinize nazik ve takdir dolu bir dille yaklaşıyor gibisiniz. Zevkleriniz üzerine sohbet etmek ikinize de keyif verebilir.',
      g: '{X:in} dolaysız sözleri {Y:e} kırıcı geliyor gibi görünüyor. Sevgiyi ifade ederken üslubunuza özen göstermeniz önemli olabilir.',
    },
    'merkur-mars': {
      k: 'Konuşmalarınız hızlı, canlı ve tartışmaya açık olabilir. {Y}, {X:in} fikirlerine meydan okuyor gibi görünüyor. Bu bazen ilham, bazen de kavga getirebilir.',
      u: 'Fikirleri eyleme dökmekte zorlanmıyor gibisiniz. Birlikte karar almak ve harekete geçmek hızlı olabilir.',
      g: 'Sözlü çatışmalar kolay çıkıyor gibi görünüyor. {Y:in} sabırsızlığı ile {X:in} keskin sözleri bir araya geldiğinde tartışmalar sertleşebilir.',
    },
    'merkur-jupiter': {
      k: 'Konuşmalarınız ufuk açıcı olabilir. Birlikte öğrenmek, yolculuğa çıkmak ve büyük planlar kurmak ilişkinizi besleyebilir.',
      u: '{Y}, {X:in} fikirlerini cesaretlendiriyor gibi görünüyor. Sohbetleriniz iyimser ve geniş ufuklu olabilir.',
      g: 'Fikirleriniz büyük olabilir, ama ayrıntılar gözden kaçıyor gibi görünüyor. Verilen sözlerin takibini bırakmamak önemli olabilir.',
    },
    'merkur-saturn': {
      k: 'Konuşmalarınız ciddi ve sonuç odaklı olabilir. {Y}, {X:in} sözlerini dikkate alabilir, ama zaman zaman eleştirel bir tonla karşılık veriyor gibi görünüyor.',
      u: 'Birlikte aldığınız kararlar kalıcı olabilir. Konuşmalarınız güven verici ve sağlam olabilir.',
      g: '{X} kendini yargılanıyor, {Y} ise dinlenmiyor gibi hissedebilir. Aranızdaki iletişim sabır ve açıklık istiyor gibi görünüyor.',
    },
    'merkur-uranus': {
      k: 'Zihinsel olarak birbirinizi uyarıyor gibisiniz. Sohbetleriniz sürprizli ve ilham verici olabilir.',
      u: 'Farklı fikirlere açık olabilirsiniz. Birlikte yeni şeyler keşfetmek size heyecan verebilir.',
      g: 'Konuşmalarınız ani dönüşler yapıyor gibi görünüyor. Düşünmeden söylenen sözler sonradan pişmanlık yaratabilir.',
    },
    'venus-venus': {
      k: 'Sevgiyi aynı biçimde yaşıyor gibisiniz. Zevkleriniz, güzellik anlayışınız ve birlikte keyif aldığınız şeyler birbirine çok benzeyebilir.',
      u: 'Sevgi dilleriniz birbirine uyabilir. Birlikte vakit geçirmek ve hayatın güzelliklerinden keyif almak size kolay gelebilir.',
      g: 'Sevgiyi gösterme biçimleriniz ve zevkleriniz farklı olabilir. Birinizin romantik bulduğu şey diğerinize yetersiz geliyor gibi görünüyor.',
    },
    'venus-mars': {
      k: 'Aranızda çok güçlü bir fiziksel ve romantik çekim olabilir. {Y}, {X:i} arzulayabilir, {X} de {Y:in} girişkenliğini karşı konulmaz bulabilir. Bu çekim yıllar içinde kolay kolay sönmüyor gibi görünüyor.',
      u: 'Arzu ile sevgi aranızda dengeli bir biçimde akıyor gibi görünüyor. Çekiminiz güçlü ama yorucu olmayabilir ve yakınlık kendiliğinden gelişebilir.',
      g: 'Aranızda yoğun bir çekim ve kıvılcım olabilir. {X} hem etkilenip hem geri çekiliyor gibi görünüyor. Bu gel-git tutkuyu canlı tutabilir, ama zaman zaman tartışmalara da dönüşebilir.',
    },
    'venus-jupiter': {
      k: 'Birbirinizi şımartabilir, birlikte güzel zaman geçirebilirsiniz. Bu ilişki ikinize de keyif ve şans getiriyor gibi görünüyor.',
      u: 'İlişkinizde neşe ve bolluk duygusu olabilir. {Y}, {X:in} sevgisini büyüten kişi olabilir.',
      g: 'Keyfiniz bol olabilir, ama aşırılığa kaçma eğiliminiz de olabilir. Harcamalar, abartılı beklentiler ya da rehavet konusunda dengeli olmanız gerekebilir.',
    },
    'venus-saturn': {
      k: 'Aranızda sadık ve uzun soluklu bir bağ olabilir, ama sevginin ifadesi zaman zaman ağırlaşıyor gibi görünüyor. {X} kendini yeterince sevilmiyor hissedebilir. {Y} ise sevgisini sorumluluk alarak gösterebilir.',
      u: 'Duygularınız zamanla sınanıp olgunlaşıyor gibi görünüyor. Aşkınız sönmek yerine derinleşebilir ve sadakat bu ilişkinin en güçlü yanı olabilir.',
      g: 'Sevgi ile sorumluluklar ya da kurallar arasında çatışma çıkıyor gibi görünüyor. {X} soğukluk, {Y} ise beklenti baskısı hissedebilir.',
    },
    'venus-uranus': {
      k: 'Aranızda ani ve büyüleyici bir çekim olabilir. İlişkiniz heyecanlı ve sıra dışı olabilir. İstikrarı ise zamanla kazanabilirsiniz.',
      u: 'Birbirinizi şaşırtmayı seviyor gibisiniz. İlişkiniz taze ve özgür kalabilir.',
      g: 'Çekiminiz yüksek ama dalgalı olabilir. Yakınlaşma ve uzaklaşma dönemleri yaşıyor gibisiniz.',
    },
    'venus-neptun': {
      k: 'Aranızda masalsı, ruh eşi hissi veren bir romantizm olabilir. {Y}, {X:i} idealize ediyor gibi görünüyor. Ayaklarınızı yere bastığınız sürece bu çok ilham verici bir aşk olabilir.',
      u: 'Romantizm, şefkat ve fedakârlık aranızda kendiliğinden doğuyor gibi görünüyor. Müzik, sanat ve ortak hayaller ilişkinizi besleyebilir.',
      g: 'Romantizminiz güçlü olabilir, ama yanılsama riski de olabilir. Birbirinizi olduğunuzdan farklı görüyor gibisiniz. Açık konuşmak hayal kırıklığını önleyebilir.',
    },
    'venus-pluton': {
      k: 'Aranızda takıntı derecesine varabilen yoğun bir çekim olabilir. Aşkınız derin ve dönüştürücü olabilir. Kıskançlık ve sahiplenme de aynı yoğunlukta yaşanıyor gibi görünüyor.',
      u: 'Aranızda derin ve kalıcı bir tutku olabilir. Birbirinize olan bağlılığınız zamanla güçleniyor gibi görünüyor.',
      g: 'Yoğun bir çekim, güç mücadelesi ve kıskançlık bir arada yaşanıyor gibi görünüyor. Bu ilişki sizi kayıtsız bırakmayabilir ve güven en önemli meseleniz olabilir.',
    },
    'venus-kuzeyDugum': {
      k: 'Bu aşk bir kader buluşması gibi hissettirebilir. {X:in} sevgisi, {Y:in} hayattaki yönünü bulmasına yardım ediyor gibi görünüyor.',
      u: 'Sevginiz ikinizin de gelişimini destekleyen bir güce dönüşüyor gibi görünüyor.',
      g: 'Zaman zaman aşk ile kişisel gelişim arasında bir seçim yapıyormuş gibi hissedebilirsiniz.',
    },
    'venus-yukselen': {
      k: '{X}, {Y:i} fiziksel olarak çok çekici buluyor gibi görünüyor. Aranızda ilk görüşte bir beğeni doğabilir.',
      u: 'Birbirinizin tarzını ve görünüşünü beğenebilirsiniz. Aranızda kolay kurulan bir sıcaklık olabilir.',
      g: 'Birbirinizden hoşlanabilirsiniz, ama tarzlarınız farklı olabilir. Birbirinizi değiştirmeye çalışmamak önemli olabilir.',
      alcalan: '{Y}, {X:i} ideal partner olarak görüyor gibi görünüyor. Bu, evlilik ve uzun bir ilişki için en güçlü işaretlerden biri olabilir.',
    },
    'mars-mars': {
      k: 'Enerjileriniz ve istekleriniz aynı yöne akıyor gibi görünüyor. Birlikte harekete geçmek kolay olabilir, ama ikiniz de aynı anda liderliği üstlenmek isteyebilirsiniz.',
      u: 'Enerjiniz ve fiziksel ritminiz uyumlu olabilir. Spor, macera ya da ortak projeler ilişkinizi canlı tutuyor gibi görünüyor.',
      g: 'İsteklerinizi ve öfkenizi dile getirme biçimleriniz çatışıyor gibi görünüyor. Kavgalar çabuk alevlenebilir, ama bu gerilim fiziksel çekimi de artırabilir.',
    },
    'mars-saturn': {
      k: '{X:in} hevesi, {Y:in} temkinli tavrıyla sık sık frenleniyor gibi görünüyor. Bu, birlikte disiplinli işler başarmanızı sağlayabilir, ama {X} kendini engellenmiş hissedebilir.',
      u: 'Enerji ile disiplin aranızda iyi bir uyum yakalıyor gibi görünüyor. Uzun vadeli hedefler için güçlü bir ekip olabilirsiniz.',
      g: '{X:in} acelesi ile {Y:in} kontrol ihtiyacı çatışıyor gibi görünüyor. Kırgınlıklar birikmeden konuşmanız gerekebilir.',
    },
    'mars-uranus': {
      k: 'Aranızda elektrik yüklü, ani ve heyecanlı bir enerji olabilir. Ama bu enerji ani patlamalara da açık olabilir.',
      u: 'Birlikte cesur ve sıra dışı şeyler yapmaktan keyif alıyor gibisiniz.',
      g: 'Ani öfke patlamaları ve sabırsızlık görülüyor gibi görünüyor. Tartışmalar en beklenmedik anlarda çıkabilir.',
    },
    'mars-pluton': {
      k: 'Aranızda çok güçlü bir fiziksel çekim ve yoğunluk olabilir. Tutkunuz yüksek olabileceği gibi güç mücadeleniz de yüksek olabilir.',
      u: 'Tutkunuz derin ve dönüştürücü olabilir. Birlikte zorlukların üstesinden gelme gücünüz yüksek olabilir.',
      g: 'Yoğun bir tutkunun yanında kontrol ve kıskançlık konuları da öne çıkıyor gibi görünüyor. Çekiminiz çok güçlü olabileceği için sınırlarınızı net çizmeniz gerekebilir.',
    },
    'mars-kuzeyDugum': {
      k: '{X}, {Y:i} hayatında harekete geçmeye ve cesur adımlar atmaya yöneltiyor gibi görünüyor.',
      u: '{X:in} enerjisi, {Y:in} kendi yolunda ilerlemesine destek olabilir.',
      g: '{X:in} aceleciliği, {Y:in} yönünü bulmasını zorlaştırıyor gibi görünüyor.',
    },
    'mars-yukselen': {
      k: '{X}, {Y:e} karşı güçlü bir fiziksel çekim duyabilir. Ama {Y} zaman zaman {X:i} fazla baskın buluyor gibi görünüyor.',
      u: '{X:in} enerjisi {Y:i} canlandırıyor gibi görünüyor. Birlikteyken cesaretiniz artabilir.',
      g: 'Çekim ile sürtüşme bir arada olabilir. {X:in} tavırları {Y:e} zaman zaman sert geliyor gibi görünüyor.',
      alcalan: '{Y}, {X:i} çekici ve tutkulu bir partner olarak görüyor gibi görünüyor. İlişkiniz enerjik ama tartışmalı olabilir.',
    },
    'saturn-yukselen': {
      k: '{X}, {Y:in} hayatına ciddiyet ve sorumluluk getiriyor gibi görünüyor. {Y} zaman zaman kendini kısıtlanmış hissedebilir.',
      u: '{X}, {Y:e} güven ve istikrar veriyor gibi görünüyor.',
      g: '{X:in} eleştirileri, {Y:in} özgüvenini zorluyor gibi görünüyor.',
      alcalan: 'Bu, bağlayıcı, ciddi ve kalıcı bir ilişki işareti olabilir. Sorumluluklar erken geliyor gibi görünüyor.',
    },
    'kuzeyDugum-yukselen': {
      k: '{Y}, {X:in} hayattaki yönünü bulmasında belirleyici bir kişi olabilir.',
      u: 'Tanışmanız, {X:in} gelişimini kolaylaştıran bir etki taşıyabilir.',
      g: 'Bu ilişki {X:i} alışkanlıklarının dışına çıkmaya zorluyor gibi görünüyor.',
      alcalan: 'Aranızda güçlü bir kader bağı olabilir. {Y}, {X:in} hayatına bir amaçla girmiş gibi görünebilir.',
    },
  },

  // Bir kişinin gezegeni diğerinin evinde: {X} gezegen sahibi, {Y} ev sahibi
  evler: {
    'mars-1': '{X}, {Y:in} varlığına doğrudan karşılık veriyor gibi görünüyor. {Y} ise {X:in} yanında kendini enerjik ve cesur hissedebilir. Aranızdaki çekim fiziksel ve ani olabilir.',
    'mars-5': '{X}, {Y:in} romantik ve eğlenceli tarafını uyandırıyor gibi görünüyor. Flört ve oyun aranızda kendiliğinden gelişebilir.',
    'mars-8': '{X:in} yanında {Y}, kontrolü bırakmanın ne demek olduğunu öğrenebilir. Mahrem alanınızda çok güçlü ve bağlayıcı bir çekim olabilir.',
    'mars-3': 'Konuşmalarınız canlı ama tartışmaya açık olabilir. {X:in} sözleri {Y:i} harekete geçiriyor gibi görünüyor.',
    'mars-9': 'İnançlarınız ve dünya görüşünüz üzerine hararetli tartışmalar yaşıyor gibisiniz. Ama birlikte yeni yerler keşfetme isteğiniz de güçlü olabilir.',
    'venus-1': '{X}, {Y:i} çekici buluyor ve bunu saklamıyor gibi görünüyor. {Y} de {X:in} gözünde kendini güzel hissedebilir.',
    'venus-4': '{X:in} sevgisi {Y:e} ev sıcaklığı veriyor gibi görünüyor. Birlikte yaşamak ve bir yuva kurmak doğal bir hedef hâline gelebilir.',
    'venus-5': 'Romantizm, flört ve keyif aranızda kolayca gelişiyor gibi görünüyor. Birlikte eğlenmek bu ilişkinin özü olabilir.',
    'venus-7': '{Y}, {X:i} ideal partner olarak görüyor gibi görünüyor. Bu, evlilik ve ciddi bir ilişki için güçlü bir işaret olabilir.',
    'venus-8': 'Sevginiz derin ve tensel bir boyut kazanıyor gibi görünüyor. Bu ilişki yüzeyde kalmayabilir.',
    'venus-12': 'Aranızda sessiz, fedakâr ve biraz da gizli bir sevgi olabilir. İlişkiniz dış dünyadan uzak bir sığınak gibi yaşanabilir.',
    'pluton-1': '{X}, {Y} üzerinde güçlü ve dönüştürücü bir etki bırakıyor gibi görünüyor. {Y} bu ilişkide kendini yeniden tanımlayabilir.',
    'pluton-5': 'Romantizminiz yoğun, hatta takıntılı bir hâl alıyor gibi görünüyor. Bu aşk hafif bir oyun olarak kalmayabilir.',
    'pluton-8': 'Cinsel ve duygusal yoğunluğunuz çok yüksek olabilir. Aranızda derin bir bağ ve bir dönüşüm yaşanıyor gibi görünüyor.',
    'ay-4': '{X}, {Y:in} yanında kendini evinde hissediyor gibi görünüyor. Birlikte yuva kurma isteğiniz güçlü olabilir.',
    'ay-7': '{Y}, {X} için duygusal olarak doğal bir partner olabilir. İlişkiye bağlanmak kolay olabilir.',
    'ay-8': 'Duygusal bağınız derin ve kolay kopmayan cinsten olabilir. {Y}, {X:in} en mahrem duygularına dokunuyor gibi görünüyor.',
    'ay-12': '{Y}, {X:in} duygularını sezgileriyle anlıyor gibi görünüyor. Aranızda görünmeyen, ruhsal bir bağ olabilir. Ama dile getirilmeyen duygular da birikebilir.',
    'merkur-3': 'Gündelik konuşmalar, mesajlaşmalar ve fikir alışverişi aranızda çok kolay olabilir. Sohbetiniz bitmek bilmeyebilir.',
    'merkur-9': '{X:in} fikirleri {Y:in} ufkunu genişletiyor gibi görünüyor. Birlikte öğrenmek ve derin sohbetler ilişkinizi besleyebilir.',
    'gunes-3': '{X}, {Y:in} gündelik hayatına canlılık katıyor gibi görünüyor. Birlikte kısa kaçamaklar ve küçük paylaşımlar size keyif verebilir.',
    'gunes-4': '{X}, {Y:in} hayatında aile ve yuva duygusunu güçlendiriyor gibi görünüyor.',
    'gunes-5': '{X}, {Y:in} hayatına neşe, romantizm ve yaratıcılık getiriyor gibi görünüyor. Birlikte eğlenmek size kolay gelebilir.',
    'gunes-7': '{Y}, {X:i} doğal bir partner olarak görüyor gibi görünüyor. İlişkiye ciddiyetle yaklaşma isteğiniz güçlü olabilir.',
    'gunes-8': '{X}, {Y:in} hayatında derin bir dönüşüm başlatıyor gibi görünüyor. Bu ilişki ikinizi de değiştirebilir.',
    'gunes-9': '{X}, {Y} için bir öğretmen, bir ilham kaynağı ya da yeni bir dünya görüşü gibi olabilir.',
    'gunes-10': '{X}, {Y:in} hedeflerini ve toplumdaki yerini destekliyor gibi görünüyor. İlişkiniz görünür ve saygın bir yere sahip olabilir.',
    'gunes-12': '{Y}, {X:i} sanki çok önceden tanıyormuş gibi hissedebilir. Aranızda gizemli ve ruhsal bir bağ olabilir.',
    'neptun-5': 'Aranızda masalsı bir romantizm olabilir. {Y}, {X:in} yanında aşkı bir film gibi yaşayabilir. Beklentileri gerçekçi tutmak önemli olabilir.',
    'neptun-7': '{Y}, {X:i} ideal ve ruhsal bir partner olarak görüyor gibi görünüyor. İdealleştirme ile gerçek arasındaki dengeye dikkat etmek gerekebilir.',
    'saturn-4': '{X}, {Y:in} ev ve aile hayatına düzen ve sorumluluk getiriyor gibi görünüyor. Sağlam bir yuva kurabilirsiniz, ama evdeki hava zaman zaman ağırlaşabilir.',
    'saturn-7': 'Bağlılık ve evlilik konusunda ciddi bir ilişki olabilir. Zamanla sınanıp sağlamlaşıyor gibi görünüyor.',
    'saturn-10': '{X}, {Y:in} kariyerine ve hedeflerine sağlam bir yapı kazandırıyor gibi görünüyor. Birlikte uzun vadeli planlar yapmak size kolay gelebilir.',
  },

  // Bir kişinin Venüs'ü ya da Mars'ı diğerinin Eros Kısmeti'ne değiyorsa: {X} gezegen sahibi, {Y} kısmetin sahibi
  kismetler: {
    'venus-eros': '{X:in} sevgisi, {Y:in} aşk arzusunun en hassas noktasına dokunuyor gibi görünüyor. {Y}, {X:in} yanında arzulanmanın ve sevilmenin ne demek olduğunu derinden hissedebilir.',
    'mars-eros': '{X:in} arzusu, {Y:in} aşk arzusunun tam kalbine dokunuyor gibi görünüyor. Aranızdaki cinsel çekim karşı konulmaz bir hâl alabilir.',
  },

  // Huzur başlığına özel anlatımlar: bu başlık çekimi değil çatışma ve uyumu anlatır.
  // Tutku metinleri burada kullanılırsa tutku yüzdesi düşük bir çiftte "yoğun tutku" denmiş olur.
  huzur: {
    'mars-pluton': {
      k: 'Aranızda güçlü bir irade çatışması olabilir. İkiniz de geri adım atmakta zorlanıyor gibisiniz. Gücü birbirinize karşı değil ortak bir hedef için kullandığınızda bu enerji sakinleşebilir.',
      u: 'Zorluklar karşısında birbirinize güç veriyor gibisiniz. Kriz anlarında bile aynı tarafta durabilirsiniz.',
      g: 'Tartışmalarınız inatlaşmaya ve kontrol mücadelesine dönüşüyor gibi görünüyor. Kıskançlık ya da sahiplenme belirdiğinde sınırlarınızı sakin bir dille konuşmak size iyi gelebilir.',
    },
    'mars-mars': {
      k: 'Enerjiniz aynı yöne aktığında birlikte çok iş başarabilirsiniz. Ama ikiniz de aynı anda öne çıkmak istediğinizde tartışma kolay başlayabilir.',
      u: 'Birbirinizin temposuna kolayca uyum sağlıyor gibisiniz. Anlaşmazlıklar uzamadan çözülebilir.',
      g: 'İsteklerinizi ve öfkenizi dile getirme biçimleriniz çatışıyor gibi görünüyor. Kavgalar çabuk alevlenebilir. Tartışmayı soğumaya bırakmak size iyi gelebilir.',
    },
    'ay-mars': {
      k: '{Y:in} dolaysızlığı {X:in} duygularını kolayca harekete geçiriyor gibi görünüyor. Bu bazen koruyucu bir sıcaklık, bazen de kırgınlık olarak yaşanabilir.',
      u: '{Y}, {X:in} duygusal ihtiyaçlarına somut adımlarla karşılık veriyor gibi görünüyor. Bu, aranızdaki huzuru güçlendirebilir.',
      g: '{Y:in} sabırsızlığı ya da öfkesi {X:in} hassas noktalarına dokunuyor gibi görünüyor. Tartışmalar çabuk alevlenebilir. Sözlerinizi seçmek kırgınlıkların birikmesini önleyebilir.',
    },
    'gunes-mars': {
      k: '{Y}, {X:i} harekete geçirebilir, ama bu enerji kolayca rekabete de dönüşüyor gibi görünüyor. Kimin haklı olduğundan çok neyin işe yaradığına bakmak size iyi gelebilir.',
      u: 'Birlikteyken enerjiniz yükseliyor ve anlaşmazlıklar yapıcı bir yöne akıyor gibi görünüyor.',
      g: 'Gurur çatışmaları kolay çıkıyor gibi görünüyor. {Y:in} çıkışları {X:e} meydan okuma gibi gelebilir. Tartışmayı bir yarışa çevirmemek huzurunuzu koruyabilir.',
    },
  },

  // Ölçülü anlatımlar: yoğunluk başlıklarında (tutku, karmik bağ) yüzde düşükken (<55) kullanılır.
  // Temas haritada vardır ama başlığın genel tablosunu belirlemez, bu yüzden "çok güçlü" gibi ifadeler kullanılmaz.
  // Aynı yer tutucu kuralları geçerlidir. Bir anahtar yoksa normal metin kullanılır.
  olculu: {
    ciftler: {
      'venus-mars': 'Aranızda zaman zaman bir kıpırtı hissedilebilir, ama bu çekim ilişkinizin ana yakıtı olmayabilir. Arzunun canlı kalması için ortak anlar yaratmak size iyi gelebilir.',
      'mars-pluton': 'Bazı anlarda aranızda beklenmedik bir yoğunluk belirebilir. Bu yoğunluk çekimden çok inatlaşma ya da kontrol isteği olarak da kendini gösterebilir. Böyle anlarda sınırlarınızı sakin bir dille konuşmak size iyi gelebilir.',
      'venus-pluton': 'Sevginizde zaman zaman sahiplenme ya da kıskançlık kıpırtıları olabilir. Bu, çekiminizi belirleyen bir şey olmaktan çok güveninizin sınandığı küçük anlar olarak yaşanabilir.',
      'mars-mars': 'Enerjileriniz bazen aynı yöne akabilir, bazen birbirine çarpabilir. Bu etki çekiminizi çok artırmasa da ortak bir hedefte buluştuğunuzda sizi canlandırabilir.',
      'gunes-mars': '{Y}, zaman zaman {X:i} harekete geçirebilir. Ancak bu enerji fiziksel çekimden çok ortak işlerde ve tartışmalarda kendini gösterebilir.',
      'mars-yukselen': '{X:in} enerjisi {Y:e} zaman zaman etkileyici gelebilir. Yine de bu etki tek başına güçlü bir çekim yaratmayabilir.',
      'venus-yukselen': '{X}, {Y:in} tarzını beğenebilir. Bu beğeni zamanla bir sıcaklığa dönüşebilir, ama ilk görüşte bir kıvılcım olmayabilir.',
      'ay-mars': '{Y:in} enerjisi zaman zaman {X:in} duygularını harekete geçirebilir. Bu etki çekimden çok gündelik tepkilerde, bazen de küçük tartışmalarda hissedilebilir.',
      'venus-uranus': 'Aranızda arada bir beklenmedik ve heyecan verici anlar olabilir. Bu anlar kalıcı bir çekimden çok ilişkinize renk katan sürprizler olabilir.',
      'gunes-kuzeyDugum': '{X}, {Y:in} gelişimine bazı konularda ilham verebilir. Bu etki bir kader buluşmasından çok yol üstünde öğrenilen bir ders gibi yaşanabilir.',
      'ay-kuzeyDugum': '{X:in} duygusal tavrı, {Y:e} bazı konularda yeni bir bakış açısı kazandırabilir.',
      'venus-kuzeyDugum': '{X:in} sevgisi, {Y:in} hayatında küçük ama anlamlı bir yön değişikliğine katkı sağlayabilir.',
      'kuzeyDugum-yukselen': '{Y}, {X:in} hayatında bazı yeni kapıların açılmasına vesile olabilir.',
    },
    evler: {
      'mars-1': '{X}, {Y:in} hayatına canlılık katabilir. Bu canlılık çekimden çok birlikte bir şeyler yapma isteği olarak hissedilebilir.',
      'mars-5': '{X}, {Y:in} eğlenceli tarafını zaman zaman uyandırabilir. Flört kendiliğinden gelişmese de birlikte eğlenmeyi öğrenebilirsiniz.',
      'mars-8': 'Mahrem alanınızda zamanla derinleşebilecek bir yakınlık olabilir. Bu yakınlık için önce güvenin oluşması gerekebilir.',
      'venus-1': '{X}, {Y:i} sevimli bulabilir. Bu beğeni çekimden çok sıcak bir yakınlık olarak hissedilebilir.',
      'venus-5': 'Birlikte keyifli zaman geçirebilirsiniz. Bu keyif zamanla romantik bir renk de kazanabilir.',
      'venus-8': 'Sevginiz zamanla derinleşebilir. Bu derinlik ilk anda değil, güven oluştukça gelebilir.',
      'pluton-1': '{X}, {Y} üzerinde zaman zaman etkili olabilir. Bu etki çekimden çok {Y:in} bazı alışkanlıklarını değiştirmesi olarak görülebilir.',
      'pluton-5': 'Romantik anlarınız bazen beklenenden ciddi bir hâl alabilir. Bu ciddiyet hafiflikle dengelendiğinde size iyi gelebilir.',
      'pluton-8': 'Aranızda zamanla açılabilecek derin bir alan olabilir. Bu alan kendiliğinden değil, güven ve sabırla açılabilir.',
      'gunes-12': '{Y}, {X:in} bazı yanlarını sezgisel olarak anlayabilir. Bu bağ çoğu zaman sessiz ve arka planda kalabilir.',
      'ay-12': '{Y}, {X:in} duygularını zaman zaman sezgileriyle anlayabilir. Söylenmeyen duygular birikmesin diye açık konuşmak önemli olabilir.',
    },
    kismetler: {
      'venus-eros': '{X:in} sevgisi, {Y:in} aşk arzusuna zaman zaman dokunabilir. Bu dokunuş ilişkinize ince bir romantizm katabilir.',
      'mars-eros': '{X:in} enerjisi, {Y:in} arzusunu zaman zaman uyandırabilir. Bu kıvılcımın büyümesi ikinizin ilgisine bağlı olabilir.',
    },
  },

  // Kişinin karakterine dair kısa ifade (gezegenin burcundan).
  // {N} kişinin adı. {ise} ikinci kişide " ise" olur: "Can aşkta zarafet bekleyebilir. Elif ise …"
  burcIfadeleri: {
    gunes: {
      kalip: '{N}{ise} {ifade} biri olabilir',
      ifadeler: ['cesur, dolaysız ve öncü', 'sakin, sabırlı ve güven arayan', 'meraklı, konuşkan ve hareketli', 'koruyucu, duygusal ve aidiyete önem veren', 'cömert, gururlu ve ilgiyle parlayan', 'titiz, yardımsever ve ayrıntıya özen gösteren', 'uyum arayan, zarif ve ilişkiye emek veren', 'yoğun, derin ve sadık', 'özgür ruhlu, iyimser ve maceracı', 'ciddi, hırslı ve sorumluluk sahibi', 'bağımsız, özgün ve dostluğa değer veren', 'duyarlı, hayalperest ve şefkatli'],
    },
    ay: {
      kalip: '{N}{ise} {ifade}',
      ifadeler: ['duygularını hızlı ve dolaysız yaşayabilir', 'duygusal güvene, sürekliliğe ve dokunmaya ihtiyaç duyabilir', 'duygularını konuşarak anlamlandırabilir', 'derin bir bağ ve yuva sıcaklığı arayabilir', 'görülmeye, takdir edilmeye ve sevginin gösterilmesine ihtiyaç duyabilir', 'sevgisini küçük ve özenli dokunuşlarla gösterebilir', 'huzur ve uyum arayabilir, kırıcı tartışmalardan kaçınabilir', 'tam bir duygusal bağlılık ve derinlik isteyebilir', 'duygusal özgürlüğe ve neşeye ihtiyaç duyabilir', 'duygularını kontrollü yaşayabilir ve güvenilirliğe önem verebilir', 'duygusal bir alana ve dostça bir yakınlığa ihtiyaç duyabilir', 'sezgileriyle hissedebilir ve derin bir şefkat taşıyabilir'],
    },
    merkur: {
      kalip: '{N}{ise} {ifade}',
      ifadeler: ['düşündüğünü hızlı ve açıkça söyleyebilir', 'yavaş ama kararlı düşünebilir', 'çok yönlü, esprili ve meraklı olabilir', 'duygularıyla düşünebilir ve söylenenleri uzun süre hatırlayabilir', 'etkileyici ve kendinden emin konuşabilir', 'analitik ve ayrıntıcı bir zihne sahip olabilir', 'diplomatik ve dengeli konuşabilir', 'derinlemesine sorgulayabilir ve sır tutmayı bilebilir', 'açık sözlü olabilir ve olaylara büyük resimden bakabilir', 'ciddi ve sonuç odaklı düşünebilir', 'özgün ve yenilikçi fikirlere sahip olabilir', 'sezgileriyle düşünebilir ve geniş bir hayal gücü taşıyabilir'],
    },
    venus: {
      kalip: '{N}{ise} aşkta {ifade}',
      ifadeler: ['heyecanı ve ilk adımı sevebilir', 'sadakat, dokunma ve huzur isteyebilir', 'sohbet, flört ve çeşitlilik isteyebilir', 'şefkat ve korunmuşluk hissi arayabilir', 'hayranlık ve gösterişli bir romantizm isteyebilir', 'sevgisini küçük ve somut ilgilerle gösterebilir', 'zarafet, denge ve romantik jestler bekleyebilir', 'derinlik ve koşulsuz bir bağlılık arayabilir', 'özgürlük ve birlikte keşfetmek isteyebilir', 'ciddiyet ve güvenilirlik arayabilir', 'dostluk ve kendine ait bir alan isteyebilir', 'koşulsuz, romantik ve fedakâr sevebilir'],
    },
    mars: {
      kalip: '{N}{ise} arzusunu ve öfkesini {ifade} bir biçimde gösterebilir',
      ifadeler: ['doğrudan ve ateşli', 'yavaş ama kararlı ve tensel', 'sözlü, hızlı ve oyunbaz', 'duygusal ve dolaylı', 'tutkulu ve gururlu', 'kontrollü ve özenli', 'nazik ve diplomatik', 'yoğun ve derin', 'maceracı ve kendiliğinden', 'disiplinli ve dayanıklı', 'sıra dışı ve bağımsız', 'romantik ve sezgisel'],
    },
  },

  // Element ve nitelik uyumu (aynı çift arasında açı yoksa kullanılır)
  burcCiftleri: {
    'gunes-gunes': 'Karakterleriniz',
    'ay-ay': 'Duygusal dünyalarınız',
    'gunes-ay': '{X:in} karakteri ile {Y:in} duygusal ihtiyaçları',
    'venus-mars': '{X:in} sevme biçimi ile {Y:in} arzusu',
    'venus-venus': 'Sevgi dilleriniz',
    'merkur-merkur': 'Düşünme biçimleriniz',
    'mars-mars': 'Enerjileriniz',
  },
  burcIliskileri: {
    0: 'neredeyse aynı olabilir. Tepkileriniz ve ihtiyaçlarınız o kadar benzer olabilir ki birbirinizi ayna gibi görebilirsiniz.',
    4: 'aynı kaynaktan beslenebilir. Bu alanda aranızda doğal ve zahmetsiz bir akış olabilir.',
    2: 'birbirini besleyebilir. Bu alanda uyum kolayca kurulabilir.',
    6: 'zıt ama tamamlayıcı olabilir. Birbirinizi çekebilirsiniz, ama zaman zaman çekişebilirsiniz de.',
    3: 'sizi farklı yönlere çekebilir. İkiniz de kendi bildiğiniz yolda ısrar edebilirsiniz.',
    1: 'pek ortak nokta paylaşmayabilir. Bu alanda birbirinizi anlamak bilinçli bir çaba isteyebilir.',
    5: 'pek ortak nokta paylaşmayabilir. Bu alanda birbirinizi anlamak bilinçli bir çaba isteyebilir.',
  },

  // Paragraflar arası bağlaçlar: önceki ve sonraki göstergenin olumlu ya da zorlayıcı olmasına göre
  baglaclar: {
    olumluOlumlu: ['Buna ek olarak', 'Bunun yanında', 'Ayrıca'],
    olumluZor: ['Öte yandan', 'Ancak'],
    zorOlumlu: ['Neyse ki', 'Buna karşın'],
    zorZor: ['Bunun yanında', 'Ayrıca'],
  },

  // Çok güçlü temaslarda (neredeyse tam açılar) ilk paragrafa eklenir
  // Açı türünün nüansı (Tuğçenur Özay yöntemi): başlığın ilk açısında, açının doğası olasılık diliyle eklenir
  aciNuansi: {
    kavusum: 'Kavuşumda iki enerji birbirine karıştığı için bu konu aranızda ayrı ayrı değil, hep birlikte yaşanıyor gibi görünüyor.',
    ucgen: 'Bu üçgen açı kendiliğinden akan bir uyum gibi okunuyor: siz fark etmeseniz bile ilişkinizi destekliyor gibi görünüyor.',
    altmislik: 'Bu altmışlık açı bir fırsat kapısı gibi okunuyor: kendiliğinden değil, ikiniz de adım attığınızda çalışıyor gibi görünüyor.',
    kare: 'Bu kare açı aktif bir gerilim gibi okunuyor: bilinçle ele alındığında aranızdaki en güçlü itici güce dönüşebileceği görülüyor.',
    karsit: 'Bu karşıtlık bir ayna gibi okunuyor: birbirinizde kendi eksik yanınızı görüp dengeyi birlikte bulabileceğiniz görülüyor.',
    quincunx: 'Bu quincunx açı süregelen bir ayar ihtiyacı gibi okunuyor: küçük düzenlemelerle aradaki farkı kapatabileceğiniz görülüyor.',
  },
  gucluTemas: 'Bu bağ, ilişkinizin her döneminde kendini güçlü biçimde hissettirebilir.',

  // Yüzde düzeyine göre giriş cümlesi: [yüksek (≥75), orta (55–74), düşük (<55)]
  bantlar: {
    tutku: ['Çekim bu ilişkinin en canlı yanlarından biri olabilir. Aranızda kıvılcım eksik değil gibi görünüyor.', 'Çekim her an parlamasa da doğru anlarda alevlenebilir.', 'Fiziksel çekim bu ilişkinin ön plandaki yanı değil gibi görünüyor. Bağınız daha çok başka alanlardan beslenebilir.'],
    baglanma: ['Duygusal bağınız derin olabilir. Birbirinize kolayca tutunuyor gibisiniz.', 'Aranızda duygusal bir bağ olabilir, ama onu güçlendirmek ikinizin de emeğini isteyebilir.', 'Duygusal olarak birbirinizi anlamanız zaman alabilir. Bu bağın anahtarı sabır olabilir.'],
    iletisim: ['Zihinsel olarak çok iyi anlaşıyor gibisiniz. Konuşmak sizin için bir keyif olabilir.', 'İletişiminiz genel olarak iyi olabilir, ama yanlış anlaşılmalara açık kalıyor gibi görünüyor.', 'İletişim, bu ilişkinin en çok özen isteyen alanı olabilir.'],
    romantizm: ['Romantizm, ilişkinizin en parlak yanlarından biri olabilir.', 'Aranızda şefkat olabilir, ama romantizmi canlı tutmak biraz özen isteyebilir.', 'Romantizm kendiliğinden gelişmiyor gibi görünüyor. Birbirinizin sevgi dilini öğrenmek size iyi gelebilir.'],
    guven: ['Bu ilişkinin uzun soluklu olma ihtimali yüksek olabilir.', 'Kalıcı bir bağ için sağlam temelleriniz olabilir, ama sınanacağınız alanlar da olabilir.', 'Güven, bu ilişkide zamanla ve emekle inşa ediliyor gibi görünüyor.'],
    huzur: ['Aranızda huzur ağır basıyor gibi görünüyor. Anlaşmazlıklar kolayca çözülebilir.', 'Huzur ile çatışma arasında bir denge olabilir. Tartışmalar olsa da yönetilebilir.', 'Sürtüşme ihtimaliniz yüksek olabilir. Tartışmaları yönetmeyi öğrenmek bu ilişkinin geleceğini belirleyebilir.'],
    karmik: ['Aranızda güçlü bir kader bağı olabilir. Bu karşılaşma tesadüf gibi durmayabilir.', 'Aranızda belirgin bir kader teması olabilir.', 'Kader teması bu ilişkide ön planda olmayabilir. Bağınızı adım adım siz kuruyor gibisiniz.'],
  },

  bosBaslik: 'Bu alan ne özellikle kolay ne de özellikle zor olabilir. İlişkinizin bu yanını ikinizin tercihleri belirliyor gibi görünüyor.',
};
