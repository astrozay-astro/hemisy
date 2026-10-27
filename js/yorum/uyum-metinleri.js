// Uyum bölümünün yorum metinleri. Her metin belirli bir göstergeye bağlıdır; uygulama yalnızca haritada
// gerçekten bulunan göstergelerin metinlerini seçer ve akıcı bir anlatım hâlinde birleştirir.
// Okuyucuya teknik bilgi verilmez: metinlerde gezegen, açı, derece ya da ev adı geçmez.
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
      k: 'Hayata bakışınız ve kendinizi ifade etme biçiminiz şaşırtıcı ölçüde benziyor. Birbirinizi açıklamaya gerek kalmadan anlarsınız; yalnızca ikiniz de aynı anda öne çıkmak istediğinizde küçük bir rekabet doğabilir.',
      u: 'Kimlikleriniz ve hayattan beklentileriniz birbirini destekliyor. Birbirinizin başarısını bir tehdit olarak değil, ilham kaynağı olarak görürsünüz.',
      g: 'Hayattan beklentileriniz ve kendinizi ifade etme biçimleriniz sizi farklı yönlere çekiyor. Bu fark ikinizi de büyütebilir, ama ilişkinin hangi yöne gideceği sık sık masaya gelir.',
    },
    'gunes-ay': {
      k: "{X}, {Y:in} duygusal olarak aradığı şeyin ta kendisi gibi. {Y}, {X:in} yanında kendini evinde hisseder; bu, kalıcı birliktelikleri en çok besleyen uyumlardan biridir.",
      u: "{X:in} kendini ifade etme biçimi {Y:in} iç dünyasına iyi geliyor. Aranızda zorlamadan kurulan, sessiz bir anlaşma ve doğal bir rahatlık var.",
      g: "{X:in} istekleri ile {Y:in} duygusal ihtiyaçları zaman zaman birbirine ters düşüyor. {Y} kendini yeterince görülmemiş, {X} ise fazla yönlendirilmiş hissedebilir; ihtiyaçlarınızı açıkça dile getirmek bu yüzden çok önemli.",
    },
    'gunes-merkur': {
      k: "{Y}, {X:i} zihinsel olarak çok iyi anlıyor; onu dinlemekten de onunla konuşmaktan da keyif alıyor. Fikirleriniz kolayca aynı noktada buluşuyor.",
      u: "{Y:in} söyledikleri {X:in} kendini anlaşılmış hissetmesini sağlıyor. Birlikte plan yapmak ve yeni fikirler üretmek size doğal geliyor.",
      g: "{Y:in} yorumları {X:e} zaman zaman eleştiri gibi gelebilir. Aynı konuya farklı pencerelerden bakıyorsunuz; bu bazen tartışma çıkarıyor, ama ilişkiye zihinsel bir canlılık da katıyor.",
    },
    'gunes-venus': {
      k: "{Y}, {X:i} olduğu gibi seviyor ve bunu göstermekten çekinmiyor; {X} de {Y:in} yanında kendini değerli hissediyor. Karşılıklı hayranlık bu ilişkinin en güçlü yanlarından biri.",
      u: "Aranızda doğal bir sevgi ve hayranlık akışı var. {Y}, {X:in} karakterini çekici buluyor; birlikte geçen zaman ikinize de keyif veriyor.",
      g: "Birbirinizden hoşlanıyorsunuz, ama zevkleriniz ve sevgiyi gösterme biçimleriniz farklı. {Y:in} beklediği ilgi ile {X:in} gösterdiği ilgi her zaman örtüşmeyebilir.",
    },
    'gunes-mars': {
      k: "Aranızda güçlü bir enerji ve fiziksel çekim var. {Y}, {X:i} harekete geçiriyor ve cesaretlendiriyor; ama bu yoğunluk kolayca rekabete ya da tartışmaya da dönüşebilir.",
      u: "Birlikteyken enerjiniz yükseliyor. {Y:in} girişkenliği {X:in} hedeflerine güç katıyor; birlikte bir şeyler başarmak ikinizi de besliyor.",
      g: "Aranızda yüksek bir enerji var, ama gurur çatışmaları da kolay çıkıyor. {Y:in} çıkışları {X:e} meydan okuma gibi gelebilir; tartışmanın ardından gelen yakınlaşma sizin için tanıdık bir döngü olabilir.",
    },
    'gunes-jupiter': {
      k: "{Y}, {X:in} hayatına bolluk, iyimserlik ve büyüme getiriyor. Birbirinize karşı cömertsiniz; bu ilişki ikinizin de ufkunu genişletiyor.",
      u: "{Y}, {X:e} güven veriyor ve onu içtenlikle destekliyor. Birlikteyken şansınızın ve fırsatlarınızın arttığını hissedersiniz.",
      g: "İyi niyetiniz bol, ama beklentileriniz de büyük. {Y:in} cömertliği zaman zaman {X:e} fazla gelebilir; vaatleri gerçekçi tutmak ilişkiyi korur.",
    },
    'gunes-saturn': {
      k: "{Y}, {X:in} hayatına düzen, sorumluluk ve güven getiriyor; aranızdaki bağ ciddi ve uzun soluklu. Yine de {X} zaman zaman kendini sınırlanmış ya da yargılanmış hissedebilir.",
      u: "{Y}, {X:in} hedefleri için sağlam bir dayanak oluyor; {X} de {Y:in} yanında daha olgun ve kararlı bir hâline kavuşuyor. Aranızda uzun ilişkilere özgü bir dayanıklılık var.",
      g: "Aranızdaki bağ güçlü, ama yükü de ağır. {Y:in} eleştirileri ya da mesafeli tavrı {X:in} özgüvenini zorlayabilir; ilişki zamanla olgunlaşır, yeter ki sabırlı olun.",
    },
    'gunes-uranus': {
      k: "Aranızda ani, heyecanlı ve elektrik yüklü bir çekim var. {Y}, {X:in} hayatına yenilik ve özgürlük getiriyor; ancak ilişki düzen ve istikrar konusunda sınanacak.",
      u: 'Birbirinizi şaşırtmaya da özgür bırakmaya da hazırsınız. İlişkiniz rutine sıkışmadan canlı kalıyor.',
      g: "Çekim ani ama dengesiz. {Y:in} bağımsızlık ihtiyacı {X:e} güvensizlik gibi gelebilir; ayrılıp barışma döngülerine karşı dikkatli olun.",
    },
    'gunes-pluton': {
      k: "Aranızda derin, dönüştürücü ve neredeyse bağımlılık yaratan bir bağ var. {Y}, {X:i} köklü biçimde değiştiriyor; kontrol ve güç konuları ilişkinin ana teması olabilir.",
      u: 'Birbirinizi derinden etkiliyor ve güçlendiriyorsunuz. Zor zamanlar bu ilişkide ikinizi de yeniden doğuruyor.',
      g: 'Yoğun bir çekim ile bir güç mücadelesi iç içe geçiyor. Kıskançlık ve kontrol ihtiyacı belirginleşebilir; güven kurulduğunda ise bu yoğunluk ikinizi birbirinize sıkıca bağlar.',
    },
    'gunes-kuzeyDugum': {
      k: "{X}, {Y:in} bu hayatta yürümesi gereken yolu temsil ediyor. {Y} için bu karşılaşma bir kader buluşması gibi hissediliyor.",
      u: "{X}, {Y:in} gelişim yolunu kolaylaştırıyor ve ona doğru yönü gösteriyor.",
      g: 'Bu ilişki ikinizi de alıştığınız güvenli alanın dışına çıkarıyor; büyüme var, ama kolay olmayacak.',
    },
    'gunes-yukselen': {
      k: "{Y}, {X:i} daha ilk anda fark ediyor ve ona çekiliyor. {X:in} varlığı, {Y:in} kendini ifade etme biçimini güçlendiriyor.",
      u: 'Birbirinizin yanında rahat ve doğal davranıyorsunuz; ilk izleniminiz olumlu.',
      g: 'İlk anda bir çekim var, ama tarzlarınız farklı; birbirinize uyum sağlamanız zaman alacak.',
      alcalan: "{Y}, {X:i} aradığı partner olarak görüyor. Bu, uzun bir ilişki ve evlilik için güçlü bir işaret.",
    },
    'ay-ay': {
      k: 'Duygusal ritimleriniz neredeyse aynı. Birbirinizin ruh hâlini söylemeden anlıyorsunuz; aranızda derin bir duygusal tanıdıklık var.',
      u: 'Duygusal ihtiyaçlarınız birbirini tamamlıyor. Birlikte yaşamak, aynı evi paylaşmak ve gündelik ritmi uyumlu hâle getirmek size kolay geliyor.',
      g: 'Duygusal ihtiyaçlarınız ve tepki verme biçimleriniz farklı. Biriniz konuşmak isterken diğeriniz içine kapanabilir; bu sevgisizlik değil, iki ayrı duygusal dilin karşılaşması.',
    },
    'ay-merkur': {
      k: "{Y}, {X:in} duygularını kelimelere dökmesine yardım ediyor. Aranızdaki konuşmalar duygusal olarak besleyici.",
      u: "Duygular ve düşünceler aranızda kolayca akıyor; {X} kendini {Y:e} anlatırken anlaşıldığını hissediyor.",
      g: "{Y:in} mantıklı yaklaşımı, {X:in} duygusal ihtiyaçlarını gözden kaçırabiliyor. {X} anlaşılmadığını, {Y} ise fazla alıngan bulunduğunu düşünebilir.",
    },
    'ay-venus': {
      k: "Şefkat ile sevgi aranızda çok güçlü bir biçimde buluşuyor. {Y}, {X:in} duygusal ihtiyaçlarını sezgiyle karşılıyor; aranızda yumuşak ve sıcak bir bağ var.",
      u: 'Sevgiyi gösterme biçimleriniz birbirinize iyi geliyor. Aranızdaki şefkat, ilişkinin en sağlam yanlarından biri.',
      g: "Sevgi var, ama onu ifade etme biçimleriniz farklı. {X:in} ihtiyaç duyduğu duygusal güvence ile {Y:in} sunduğu ilgi her zaman örtüşmeyebilir.",
    },
    'ay-mars': {
      k: "Aranızda güçlü bir duygusal ve fiziksel çekim var. {Y}, {X:in} duygularını harekete geçiriyor; ama {Y:in} dolaysızlığı {X:i} zaman zaman kırabiliyor.",
      u: "{Y}, {X:in} duygusal ihtiyaçlarına somut adımlarla karşılık veriyor; onu koruyor ve gerektiğinde harekete geçiyor.",
      g: "{Y:in} sabırsızlığı ya da öfkesi {X:in} hassas noktalarına dokunabilir. Tartışmalar çabuk alevleniyor; ama tutku da tam olarak bu gerilimden besleniyor.",
    },
    'ay-jupiter': {
      k: "{Y}, {X:e} karşı duygusal olarak cömert ve koruyucu. Birlikteyken iyimserliğiniz ve huzurunuz artıyor.",
      u: "{Y:in} desteği, {X:in} kendini güvende hissetmesini sağlıyor; ilişkinizde duygusal bir bolluk var.",
      g: "Duygusal beklentiler kolayca büyüyebilir; {Y:in} vaatleri ile {X:in} ihtiyaçları arasında bir denge kurmanız gerekecek.",
    },
    'ay-saturn': {
      k: "Aranızda sadık ve kalıcı, ama biraz ağırbaşlı bir bağ var. {Y}, {X:e} güven veriyor; ancak {X} duygularını rahatça gösteremediğini hissedebilir.",
      u: "Duygusal sadakatiniz ve istikrarınız güçlü. {Y}, {X} için güvenilir bir liman; bu ilişki zamanla derinleşiyor.",
      g: "{Y:in} mesafeli ya da eleştirel tavrı {X:i} duygusal olarak üşütebilir. Bağınız güçlü, ama sıcaklığı bilinçli olarak beslemeniz gerekiyor.",
    },
    'ay-uranus': {
      k: "Heyecanlı ama duygusal olarak dalgalı bir bağ. {Y}, {X:in} iç dünyasına sürprizler getiriyor; güvenin yerleşmesi içinse tutarlılık gerekiyor.",
      u: 'Birbirinize duygusal özgürlük tanıyorsunuz; ilişkiniz boğucu olmadan yakın kalabiliyor.',
      g: "{Y:in} öngörülemezliği, {X:in} güvende olma ihtiyacını sarsabilir. Yakınlık ile özgürlük arasında sık sık gidip gelebilirsiniz.",
    },
    'ay-pluton': {
      k: "Duygusal olarak çok yoğun, zaman zaman takıntıya varabilen bir bağ. {X}, {Y:in} yanında en derin duygularıyla yüzleşiyor.",
      u: 'Birbirinizin duygusal yaralarını iyileştirebilecek güçtesiniz; bağınız derin ve dönüştürücü.',
      g: 'Kıskançlık, sahiplenme ve duygusal kontrol öne çıkabilir. Yoğunluk yüksek; bu yüzden güveni sağlam kurmak şart.',
    },
    'ay-kuzeyDugum': {
      k: "{X}, {Y:in} duygusal olarak yönünü bulmasına yardım ediyor. Birbirinizi çok önceden tanıyormuş gibi hissedebilirsiniz.",
      u: "{X:in} duygusal desteği, {Y:in} kendi yolunda ilerlemesini kolaylaştırıyor.",
      g: 'Duygusal alışkanlıklarınız ile büyüme ihtiyacınız çekişiyor; bu ilişki ikinizi de değişmeye zorluyor.',
    },
    'ay-yukselen': {
      k: "{Y}, {X:in} duygusal dünyasına kendiliğinden uyum sağlıyor; birbirinizin yanında güvende hissediyorsunuz.",
      u: 'Birlikteyken rahat ve sıcak bir atmosfer oluşuyor.',
      g: "{Y:in} tarzı, {X:in} duygusal ihtiyaçlarına her zaman uymayabilir; ilk dönemde uyum sağlamak zaman alacak.",
      alcalan: "{Y}, {X:i} duygusal olarak aradığı partner gibi görüyor. Bu uyum, birlikte yaşama ve evlilik isteğini güçlendiriyor.",
    },
    'merkur-merkur': {
      k: 'Aynı dili konuşuyorsunuz. Düşünme hızınız, mizah anlayışınız ve merak ettiğiniz konular birbirine çok yakın.',
      u: 'Konuşmak sizin için kolay ve keyifli. Birbirinizin fikirlerini tamamlıyor, birlikte rahatça plan yapıyorsunuz.',
      g: 'Düşünme ve konuşma tarzlarınız farklı. Aynı konuşmadan bambaşka sonuçlar çıkarabilirsiniz; yanlış anlaşılmalar aranızdaki en tipik sürtüşme kaynağı.',
    },
    'merkur-venus': {
      k: "Aranızdaki konuşmalar tatlı ve flörtöz. {X:in} sözleri {Y:e} iyi geliyor; iltifatlar ve nazik bir dil ilişkinizi besliyor.",
      u: 'Birbirinize nazik ve takdir dolu bir dille yaklaşıyorsunuz; zevkleriniz üzerine sohbet etmek ikinize de keyif veriyor.',
      g: "{X:in} dolaysız sözleri {Y:e} kırıcı gelebilir; sevgiyi ifade ederken üslubunuza özen göstermeniz önemli.",
    },
    'merkur-mars': {
      k: "Konuşmalarınız hızlı, canlı ve tartışmaya açık. {Y}, {X:in} fikirlerine meydan okuyor; bu bazen ilham, bazen de kavga getiriyor.",
      u: 'Fikirleri eyleme dökmekte zorlanmıyorsunuz; birlikte karar almak ve harekete geçmek hızlı oluyor.',
      g: "Sözlü çatışmalar kolay çıkıyor. {Y:in} sabırsızlığı ile {X:in} keskin sözleri bir araya geldiğinde tartışmalar sertleşebilir.",
    },
    'merkur-jupiter': {
      k: 'Konuşmalarınız ufuk açıcı; birlikte öğrenmek, yolculuğa çıkmak ve büyük planlar kurmak ilişkinizi besliyor.',
      u: "{Y}, {X:in} fikirlerini cesaretlendiriyor; sohbetleriniz iyimser ve geniş ufuklu.",
      g: 'Fikirleriniz büyük, ama ayrıntılar gözden kaçabiliyor; verilen sözlerin takibini bırakmamak önemli.',
    },
    'merkur-saturn': {
      k: "Konuşmalarınız ciddi ve sonuç odaklı. {Y}, {X:in} sözlerini dikkate alıyor, ama zaman zaman eleştirel bir tonla karşılık verebiliyor.",
      u: 'Birlikte aldığınız kararlar kalıcı oluyor; konuşmalarınız güven verici ve sağlam.',
      g: "{X} kendini yargılanıyor, {Y} ise dinlenmiyor gibi hissedebilir. Aranızdaki iletişim sabır ve açıklık istiyor.",
    },
    'merkur-uranus': {
      k: 'Zihinsel olarak birbirinizi uyarıyorsunuz; sohbetleriniz sürprizli ve ilham verici.',
      u: 'Farklı fikirlere açıksınız; birlikte yeni şeyler keşfetmek size heyecan veriyor.',
      g: 'Konuşmalarınız ani dönüşler yapabilir; düşünmeden söylenen sözler sonradan pişmanlık yaratabilir.',
    },
    'venus-venus': {
      k: 'Sevgiyi aynı biçimde yaşıyorsunuz. Zevkleriniz, güzellik anlayışınız ve birlikte keyif aldığınız şeyler birbirine çok benziyor.',
      u: 'Sevgi dilleriniz birbirine uyuyor. Birlikte vakit geçirmek ve hayatın güzelliklerinden keyif almak size kolay geliyor.',
      g: 'Sevgiyi gösterme biçimleriniz ve zevkleriniz farklı. Birinizin romantik bulduğu şey diğerinize yetersiz gelebilir.',
    },
    'venus-mars': {
      k: "Aranızda çok güçlü bir fiziksel ve romantik çekim var. {Y}, {X:i} arzuluyor; {X} de {Y:in} girişkenliğini karşı konulmaz buluyor. Bu çekim yıllar içinde kolay kolay sönmez.",
      u: 'Arzu ile sevgi aranızda dengeli bir biçimde akıyor. Çekiminiz güçlü ama yorucu değil; yakınlık kendiliğinden gelişiyor.',
      g: "Aranızda yoğun bir çekim ve kıvılcım var. {X} hem etkileniyor hem geri çekiliyor; bu gel-git tutkuyu canlı tutuyor, ama zaman zaman tartışmalara da dönüşüyor.",
    },
    'venus-jupiter': {
      k: 'Birbirinizi şımartıyor, birlikte güzel zaman geçiriyorsunuz; bu ilişki ikinize de keyif ve şans getiriyor.',
      u: "İlişkinizde neşe ve bolluk duygusu var; {Y}, {X:in} sevgisini büyüten kişi.",
      g: 'Keyfiniz bol, ama aşırılığa kaçma eğiliminiz de var. Harcamalar, abartılı beklentiler ya da rehavet konusunda dengeli olmanız gerekecek.',
    },
    'venus-saturn': {
      k: "Aranızda sadık ve uzun soluklu bir bağ var; ama sevginin ifadesi zaman zaman ağırlaşabiliyor. {X} kendini yeterince sevilmiyor hissedebilir; {Y} ise sevgisini sorumluluk alarak gösteriyor.",
      u: 'Duygularınız zamanla sınanıyor ve olgunlaşıyor; aşkınız sönmüyor, derinleşiyor. Sadakat bu ilişkinin en güçlü yanı.',
      g: "Sevgi ile sorumluluklar ya da kurallar arasında çatışma çıkabilir. {X} soğukluk, {Y} ise beklenti baskısı hissedebilir.",
    },
    'venus-uranus': {
      k: 'Aranızda ani ve büyüleyici bir çekim var. İlişkiniz heyecanlı ve sıra dışı; istikrarı ise zamanla kazanacaksınız.',
      u: 'Birbirinizi şaşırtmayı seviyorsunuz; ilişkiniz taze ve özgür kalıyor.',
      g: 'Çekiminiz yüksek, ama dalgalı; yakınlaşma ve uzaklaşma dönemleri yaşayabilirsiniz.',
    },
    'venus-neptun': {
      k: "Aranızda masalsı, ruh eşi hissi veren bir romantizm var. {Y}, {X:i} idealize ediyor; ayaklarınızı yere bastığınız sürece bu çok ilham verici bir aşk.",
      u: 'Romantizm, şefkat ve fedakârlık aranızda kendiliğinden doğuyor; müzik, sanat ve ortak hayaller ilişkinizi besliyor.',
      g: 'Romantizminiz güçlü, ama yanılsama riski de var. Birbirinizi olduğunuzdan farklı görebilirsiniz; açık konuşmak hayal kırıklığını önler.',
    },
    'venus-pluton': {
      k: 'Aranızda takıntı derecesine varabilen yoğun bir çekim var. Aşkınız derin ve dönüştürücü; kıskançlık ve sahiplenme de aynı yoğunlukta olabilir.',
      u: 'Aranızda derin ve kalıcı bir tutku var; birbirinize olan bağlılığınız zamanla güçleniyor.',
      g: 'Yoğun bir çekim, güç mücadelesi ve kıskançlık bir arada. Bu ilişki sizi kayıtsız bırakmaz; güven en önemli meseleniz.',
    },
    'venus-kuzeyDugum': {
      k: "Bu aşk bir kader buluşması gibi hissettiriyor. {X:in} sevgisi, {Y:in} hayattaki yönünü bulmasına yardım ediyor.",
      u: 'Sevginiz ikinizin de gelişimini destekleyen bir güce dönüşüyor.',
      g: 'Zaman zaman aşk ile kişisel gelişim arasında bir seçim yapıyormuş gibi hissedebilirsiniz.',
    },
    'venus-yukselen': {
      k: "{X}, {Y:i} fiziksel olarak çok çekici buluyor; aranızda ilk görüşte bir beğeni doğuyor.",
      u: 'Birbirinizin tarzını ve görünüşünü beğeniyorsunuz; aranızda kolay kurulan bir sıcaklık var.',
      g: 'Birbirinizden hoşlanıyorsunuz, ama tarzlarınız farklı; birbirinizi değiştirmeye çalışmamak önemli.',
      alcalan: "{Y}, {X:i} ideal partner olarak görüyor. Bu, evlilik ve uzun bir ilişki için en güçlü işaretlerden biri.",
    },
    'mars-mars': {
      k: 'Enerjileriniz ve istekleriniz aynı yöne akıyor. Birlikte harekete geçmek kolay; ama ikiniz de aynı anda liderliği üstlenmek isteyebilirsiniz.',
      u: 'Enerjiniz ve fiziksel ritminiz uyumlu. Spor, macera ya da ortak projeler ilişkinizi canlı tutuyor.',
      g: 'İsteklerinizi ve öfkenizi dile getirme biçimleriniz çatışıyor. Kavgalar çabuk alevleniyor; ama bu gerilim fiziksel çekimi de artırıyor.',
    },
    'mars-saturn': {
      k: "{X:in} hevesi, {Y:in} temkinli tavrıyla sık sık frenleniyor. Bu, birlikte disiplinli işler başarmanızı sağlıyor; ama {X} kendini engellenmiş hissedebilir.",
      u: 'Enerji ile disiplin aranızda iyi bir uyum yakalıyor; uzun vadeli hedefler için güçlü bir ekipsiniz.',
      g: "{X:in} acelesi ile {Y:in} kontrol ihtiyacı çatışıyor; kırgınlıklar birikmeden konuşmanız gerekiyor.",
    },
    'mars-uranus': {
      k: 'Aranızda elektrik yüklü, ani ve heyecanlı bir enerji var; ama bu enerji ani patlamalara da açık.',
      u: 'Birlikte cesur ve sıra dışı şeyler yapmaktan keyif alıyorsunuz.',
      g: 'Ani öfke patlamaları ve sabırsızlık görülebilir; tartışmalar en beklenmedik anlarda çıkabilir.',
    },
    'mars-pluton': {
      k: 'Aranızda çok güçlü bir fiziksel çekim ve yoğunluk var. Tutkunuz yüksek; güç mücadeleniz de.',
      u: 'Tutkunuz derin ve dönüştürücü; birlikte zorlukların üstesinden gelme gücünüz yüksek.',
      g: 'Yoğun bir tutkunun yanında kontrol ve kıskançlık konuları da öne çıkıyor. Çekiminiz çok güçlü; sınırlarınızı net çizmeniz gerekecek.',
    },
    'mars-kuzeyDugum': {
      k: "{X}, {Y:i} hayatında harekete geçmeye ve cesur adımlar atmaya yöneltiyor.",
      u: "{X:in} enerjisi, {Y:in} kendi yolunda ilerlemesine destek oluyor.",
      g: "{X:in} aceleciliği, {Y:in} yönünü bulmasını zorlaştırabilir.",
    },
    'mars-yukselen': {
      k: "{X}, {Y:e} karşı güçlü bir fiziksel çekim duyuyor; ama {Y} zaman zaman {X:i} fazla baskın bulabilir.",
      u: "{X:in} enerjisi {Y:i} canlandırıyor; birlikteyken cesaretiniz artıyor.",
      g: "Çekim ile sürtüşme bir arada; {X:in} tavırları {Y:e} zaman zaman sert gelebilir.",
      alcalan: "{Y}, {X:i} çekici ve tutkulu bir partner olarak görüyor; ilişkiniz enerjik ama tartışmalı olabilir.",
    },
    'saturn-yukselen': {
      k: "{X}, {Y:in} hayatına ciddiyet ve sorumluluk getiriyor; {Y} zaman zaman kendini kısıtlanmış hissedebilir.",
      u: "{X}, {Y:e} güven ve istikrar veriyor.",
      g: "{X:in} eleştirileri, {Y:in} özgüvenini zorlayabilir.",
      alcalan: 'Bu bağlayıcı, ciddi ve kalıcı bir ilişki işareti; sorumluluklar erken gelebilir.',
    },
    'kuzeyDugum-yukselen': {
      k: "{Y}, {X:in} hayattaki yönünü bulmasında belirleyici bir kişi olacak.",
      u: "Tanışmanız, {X:in} gelişimini kolaylaştıran bir etki taşıyor.",
      g: "Bu ilişki {X:i} alışkanlıklarının dışına çıkmaya zorluyor.",
      alcalan: "Aranızda güçlü bir kader bağı var; {Y}, {X:in} hayatına bir amaçla girmiş gibi.",
    },
  },

  // Bir kişinin gezegeni diğerinin evinde: {X} gezegen sahibi, {Y} ev sahibi
  evler: {
    'mars-1': "{X}, {Y:in} varlığına doğrudan karşılık veriyor; {Y} ise {X:in} yanında kendini enerjik ve cesur hissediyor. Aranızdaki çekim fiziksel ve ani.",
    'mars-5': "{X}, {Y:in} romantik ve eğlenceli tarafını uyandırıyor; flört ve oyun aranızda kendiliğinden gelişiyor.",
    'mars-8': "{X:in} yanında {Y}, kontrolü bırakmanın ne demek olduğunu öğreniyor. Mahrem alanınızda çok güçlü ve bağlayıcı bir çekim var.",
    'mars-3': "Konuşmalarınız canlı ama tartışmaya açık; {X:in} sözleri {Y:i} harekete geçiriyor.",
    'mars-9': 'İnançlarınız ve dünya görüşünüz üzerine hararetli tartışmalar yaşayabilirsiniz; ama birlikte yeni yerler keşfetme isteğiniz de güçlü.',
    'venus-1': "{X}, {Y:i} çekici buluyor ve bunu saklamıyor; {Y} de {X:in} gözünde kendini güzel hissediyor.",
    'venus-4': "{X:in} sevgisi {Y:e} ev sıcaklığı veriyor; birlikte yaşamak ve bir yuva kurmak doğal bir hedef hâline geliyor.",
    'venus-5': 'Romantizm, flört ve keyif aranızda kolayca gelişiyor. Birlikte eğlenmek bu ilişkinin özü.',
    'venus-7': "{Y}, {X:i} ideal partner olarak görüyor; bu, evlilik ve ciddi bir ilişki için güçlü bir işaret.",
    'venus-8': 'Sevginiz derin ve tensel bir boyut kazanıyor; bu ilişki yüzeyde kalmıyor.',
    'venus-12': 'Aranızda sessiz, fedakâr ve biraz da gizli bir sevgi var; ilişkiniz dış dünyadan uzak bir sığınak gibi yaşanabilir.',
    'pluton-1': "{X}, {Y} üzerinde güçlü ve dönüştürücü bir etki bırakıyor; {Y} bu ilişkide kendini yeniden tanımlıyor.",
    'pluton-5': 'Romantizminiz yoğun, hatta takıntılı bir hâl alabilir; bu aşk hafif bir oyun olarak kalmıyor.',
    'pluton-8': 'Cinsel ve duygusal yoğunluğunuz çok yüksek; aranızda derin bir bağ ve bir dönüşüm yaşanıyor.',
    'ay-4': "{X}, {Y:in} yanında kendini evinde hissediyor; birlikte yuva kurma isteğiniz güçlü.",
    'ay-7': "{Y}, {X} için duygusal olarak doğal bir partner; ilişkiye bağlanmak kolay oluyor.",
    'ay-8': "Duygusal bağınız derin ve kolay kopmayan cinsten; {Y}, {X:in} en mahrem duygularına dokunuyor.",
    'ay-12': "{Y}, {X:in} duygularını sezgileriyle anlıyor; aranızda görünmeyen, ruhsal bir bağ var. Ama dile getirilmeyen duygular da birikebilir.",
    'merkur-3': 'Gündelik konuşmalar, mesajlaşmalar ve fikir alışverişi aranızda çok kolay; sohbetiniz bitmek bilmiyor.',
    'merkur-9': "{X:in} fikirleri {Y:in} ufkunu genişletiyor; birlikte öğrenmek ve derin sohbetler ilişkinizi besliyor.",
    'gunes-3': "{X}, {Y:in} gündelik hayatına canlılık katıyor; birlikte kısa kaçamaklar ve küçük paylaşımlar size keyif veriyor.",
    'gunes-4': "{X}, {Y:in} hayatında aile ve yuva duygusunu güçlendiriyor.",
    'gunes-5': "{X}, {Y:in} hayatına neşe, romantizm ve yaratıcılık getiriyor; birlikte eğlenmek size kolay geliyor.",
    'gunes-7': "{Y}, {X:i} doğal bir partner olarak görüyor; ilişkiye ciddiyetle yaklaşma isteği güçlü.",
    'gunes-8': "{X}, {Y:in} hayatında derin bir dönüşüm başlatıyor; bu ilişki ikinizi de değiştiriyor.",
    'gunes-9': "{X}, {Y} için bir öğretmen, bir ilham kaynağı ya da yeni bir dünya görüşü gibi.",
    'gunes-10': "{X}, {Y:in} hedeflerini ve toplumdaki yerini destekliyor; ilişkiniz görünür ve saygın bir yere sahip.",
    'gunes-12': "{Y}, {X:i} sanki çok önceden tanıyormuş gibi hissediyor; aranızda gizemli ve ruhsal bir bağ var.",
    'neptun-5': "Aranızda masalsı bir romantizm var; {Y}, {X:in} yanında aşkı bir film gibi yaşıyor. Beklentileri gerçekçi tutmak önemli.",
    'neptun-7': "{Y}, {X:i} ideal ve ruhsal bir partner olarak görebilir; idealleştirme ile gerçek arasındaki dengeye dikkat etmek gerekiyor.",
    'saturn-4': "{X}, {Y:in} ev ve aile hayatına düzen ve sorumluluk getiriyor; sağlam bir yuva kurmanız mümkün, ama evdeki hava zaman zaman ağırlaşabilir.",
    'saturn-7': 'Bağlılık ve evlilik konusunda ciddi bir ilişki bu; zamanla sınanıyor ve sağlamlaşıyor.',
    'saturn-10': "{X}, {Y:in} kariyerine ve hedeflerine sağlam bir yapı kazandırıyor; birlikte uzun vadeli planlar yapmak size kolay geliyor.",
  },

  // Kişinin karakterine dair kısa ifade (gezegenin burcundan).
  // {N} kişinin adı; {ise} ikinci kişide " ise" olur: "Can aşkta …; Elif ise arzusunu …"
  burcIfadeleri: {
    gunes: {
      kalip: '{N}{ise} {ifade} biri',
      ifadeler: ['cesur, dolaysız ve öncü', 'sakin, sabırlı ve güven arayan', 'meraklı, konuşkan ve hareketli', 'koruyucu, duygusal ve aidiyete önem veren', 'cömert, gururlu ve ilgiyle parlayan', 'titiz, yardımsever ve ayrıntıya özen gösteren', 'uyum arayan, zarif ve ilişkiye emek veren', 'yoğun, derin ve sadık', 'özgür ruhlu, iyimser ve maceracı', 'ciddi, hırslı ve sorumluluk sahibi', 'bağımsız, özgün ve dostluğa değer veren', 'duyarlı, hayalperest ve şefkatli'],
    },
    ay: {
      kalip: '{N}{ise} {ifade}',
      ifadeler: ['duygularını hızlı ve dolaysız yaşıyor', 'duygusal güvene, sürekliliğe ve dokunmaya ihtiyaç duyuyor', 'duygularını konuşarak anlamlandırıyor', 'derin bir bağ ve yuva sıcaklığı arıyor', 'görülmeye, takdir edilmeye ve sevginin gösterilmesine ihtiyaç duyuyor', 'sevgisini küçük ve özenli dokunuşlarla gösteriyor', 'huzur ve uyum arıyor, kırıcı tartışmalardan kaçınıyor', 'tam bir duygusal bağlılık ve derinlik istiyor', 'duygusal özgürlüğe ve neşeye ihtiyaç duyuyor', 'duygularını kontrollü yaşıyor, güvenilirliğe önem veriyor', 'duygusal bir alana ve dostça bir yakınlığa ihtiyaç duyuyor', 'sezgileriyle hissediyor; şefkati ve fedakârlığı derin'],
    },
    merkur: {
      kalip: '{N}{ise} {ifade}',
      ifadeler: ['düşündüğünü hızlı ve açıkça söylüyor', 'yavaş ama kararlı düşünüyor', 'çok yönlü, esprili ve meraklı', 'duygularıyla düşünüyor, söylenenleri uzun süre hatırlıyor', 'etkileyici ve kendinden emin konuşuyor', 'analitik ve ayrıntıcı bir zihne sahip', 'diplomatik ve dengeli konuşuyor', 'derinlemesine sorguluyor ve sır tutmayı biliyor', 'açık sözlü; olaylara büyük resimden bakıyor', 'ciddi ve sonuç odaklı düşünüyor', 'özgün ve yenilikçi fikirlere sahip', 'sezgileriyle düşünüyor; hayal gücü geniş'],
    },
    venus: {
      kalip: '{N}{ise} aşkta {ifade}',
      ifadeler: ['heyecanı ve ilk adımı seviyor', 'sadakat, dokunma ve huzur istiyor', 'sohbet, flört ve çeşitlilik istiyor', 'şefkat ve korunmuşluk hissi arıyor', 'hayranlık ve gösterişli bir romantizm istiyor', 'sevgisini küçük ve somut ilgilerle gösteriyor', 'zarafet, denge ve romantik jestler bekliyor', 'derinlik ve koşulsuz bir bağlılık arıyor', 'özgürlük ve birlikte keşfetmek istiyor', 'ciddiyet ve güvenilirlik arıyor', 'dostluk ve kendine ait bir alan istiyor', 'koşulsuz, romantik ve fedakâr seviyor'],
    },
    mars: {
      kalip: '{N}{ise} arzusunu ve öfkesini {ifade} bir biçimde gösteriyor',
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
    0: 'neredeyse aynı; tepkileriniz ve ihtiyaçlarınız o kadar benzer ki birbirinizi ayna gibi görüyorsunuz.',
    4: 'aynı kaynaktan besleniyor; bu alanda aranızda doğal ve zahmetsiz bir akış var.',
    2: 'birbirini besliyor; bu alanda uyum kolayca kuruluyor.',
    6: 'zıt ama tamamlayıcı; birbirinizi çekiyorsunuz, ama zaman zaman da çekişiyorsunuz.',
    3: 'sizi farklı yönlere çekiyor; ikiniz de kendi bildiğiniz yolda ısrar edebilirsiniz.',
    1: 'pek ortak nokta paylaşmıyor; bu alanda birbirinizi anlamak bilinçli bir çaba istiyor.',
    5: 'pek ortak nokta paylaşmıyor; bu alanda birbirinizi anlamak bilinçli bir çaba istiyor.',
  },

  // Paragraflar arası bağlaçlar: önceki ve sonraki göstergenin olumlu ya da zorlayıcı olmasına göre
  baglaclar: {
    olumluOlumlu: ['Buna ek olarak', 'Bunun yanında', 'Ayrıca'],
    olumluZor: ['Öte yandan', 'Ancak'],
    zorOlumlu: ['Neyse ki', 'Buna karşın'],
    zorZor: ['Bunun yanında', 'Ayrıca'],
  },

  // Çok güçlü temaslarda (neredeyse tam açılar) ilk paragrafa eklenir
  gucluTemas: 'Bu bağ, ilişkinizin her döneminde kendini güçlü biçimde hissettirecek.',

  // Yüzde düzeyine göre giriş cümlesi: [yüksek (≥75), orta (55–74), düşük (<55)]
  bantlar: {
    tutku: ['Tutku bu ilişkinin en canlı yanlarından biri; aranızda kıvılcım eksik olmayacak.', 'Tutku her an parlamasa da doğru anlarda alevleniyor.', 'Fiziksel çekim bu ilişkinin ön plandaki yanı değil; bağınız daha çok başka alanlardan besleniyor.'],
    baglanma: ['Duygusal bağınız derin; birbirinize kolayca tutunuyorsunuz.', 'Aranızda duygusal bir bağ var, ama onu güçlendirmek ikinizin de emeğini istiyor.', 'Duygusal olarak birbirinizi anlamanız zaman alabilir; bu bağın anahtarı sabır.'],
    iletisim: ['Zihinsel olarak çok iyi anlaşıyorsunuz; konuşmak sizin için bir keyif.', 'İletişiminiz genel olarak iyi, ama yanlış anlaşılmalara açık.', 'İletişim, bu ilişkinin en çok özen isteyen alanı.'],
    romantizm: ['Romantizm, ilişkinizin en parlak yanlarından biri.', 'Aranızda şefkat var; romantizmi canlı tutmak ise biraz özen istiyor.', 'Romantizm kendiliğinden gelişmiyor; birbirinizin sevgi dilini öğrenmek size iyi gelecek.'],
    guven: ['Bu ilişkinin uzun soluklu olma ihtimali yüksek.', 'Kalıcı bir bağ için sağlam temelleriniz var, ama sınanacağınız alanlar da.', 'Güven, bu ilişkide zamanla ve emekle inşa edilecek.'],
    huzur: ['Aranızda huzur ağır basıyor; anlaşmazlıklar kolayca çözülüyor.', 'Huzur ile çatışma arasında bir denge var; tartışmalar olsa da yönetilebilir.', 'Sürtüşme ihtimaliniz yüksek; tartışmaları yönetmeyi öğrenmek bu ilişkinin geleceğini belirleyecek.'],
    karmik: ['Aranızda güçlü bir kader bağı var; bu karşılaşma tesadüf gibi durmuyor.', 'Aranızda belirgin bir kader teması var.', 'Kader teması bu ilişkide ön planda değil; bağınızı adım adım siz kuracaksınız.'],
  },

  bosBaslik: 'Bu alan ne özellikle kolay ne de özellikle zor; ilişkinizin bu yanını ikinizin tercihleri belirleyecek.',
};
