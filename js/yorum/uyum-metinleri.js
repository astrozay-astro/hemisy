// Uyum bölümünün yorum metinleri. Her metin belirli bir göstergeye bağlıdır; uygulama yalnızca haritada
// gerçekten bulunan göstergelerin metinlerini seçer ve birleştirir.
// Okuyucuya teknik bilgi verilmez: metinlerde gezegen, açı, derece ya da ev adı geçmez, yalnızca yorum vardır.
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
      k: 'Hayattaki temel yöneliminiz ve kendinizi ifade etme biçiminiz çok benzer. Birbirinizi kolay anlarsınız; ama ikiniz de aynı anda sahnede olmak istediğinizde rekabet doğabilir.',
      u: 'Kimlikleriniz ve yaşam hedefleriniz birbirini destekliyor. Birbirinizin başarısını tehdit olarak değil, ilham olarak görürsünüz.',
      g: 'Yaşam hedefleriniz ve kendinizi ifade etme biçimleriniz farklı yönlere çekiyor. Bu fark birbirinizi geliştirebilir ama kimin yolundan gidileceği sık sık gündeme gelir.',
    },
    'gunes-ay': {
      k: "{X:in} olduğu kişi, {Y:in} duygusal olarak ihtiyaç duyduğu şeyle örtüşüyor. {Y}, {X:in} yanında kendini evinde hisseder; bu, kalıcı birliktelikleri en çok besleyen uyumlardan biri.",
      u: "{X:in} kendini ifade etme biçimi {Y:in} duygusal dünyasını besliyor. Aranızda zorlamadan kurulan bir anlaşma ve doğal bir rahatlık var.",
      g: "{X:in} istekleri ile {Y:in} duygusal ihtiyaçları zaman zaman çatışır. {Y} kendini yeterince görülmemiş, {X} ise fazla yönlendirilmiş hissedebilir; ihtiyaçlarınızı açıkça söylemeniz önemli.",
    },
    'gunes-merkur': {
      k: "{Y}, {X:i} zihinsel olarak çok iyi anlar; onu dinlemekten ve onunla konuşmaktan keyif alır. Fikirleriniz kolay buluşur.",
      u: "{Y:in} söyledikleri {X:in} kendini anlaşılmış hissetmesini sağlar. Birlikte plan yapmak ve fikir üretmek kolay.",
      g: "{Y:in} yorumları {X:e} zaman zaman eleştiri gibi gelebilir. Aynı konuya farklı açılardan bakarsınız; bu tartışmalara ama aynı zamanda zihinsel bir canlılığa yol açar.",
    },
    'gunes-venus': {
      k: "{Y}, {X:i} olduğu gibi sever ve bunu göstermekten çekinmez; {X} de {Y:in} yanında kendini değerli hisseder. Karşılıklı beğeni bu ilişkinin en güçlü yanlarından biri.",
      u: "Aranızda doğal bir sevgi ve hayranlık akışı var. {Y}, {X:in} karakterini çekici bulur; birlikte zaman geçirmek ikiniz için de keyifli.",
      g: "Beğeni var ama zevkleriniz ve sevgiyi gösterme biçimleriniz farklı. {Y:in} beklediği ilgi ile {X:in} verdiği ilgi her zaman örtüşmeyebilir.",
    },
    'gunes-mars': {
      k: "Aranızda güçlü bir enerji ve fiziksel çekim var. {Y}, {X:i} harekete geçirir ve cesaretlendirir; ama bu yoğunluk kolayca rekabete ve tartışmaya da dönüşebilir.",
      u: "Birlikteyken enerjiniz yükselir. {Y:in} girişkenliği {X:in} hedeflerine destek olur; birlikte bir şeyler başarmak ikinizi de besler.",
      g: "Aranızda yüksek bir enerji var ama ego çatışmaları da kolay çıkar. {Y:in} çıkışları {X:e} meydan okuma gibi gelebilir; tartışmanın ardından gelen yakınlaşma sizin için tanıdık bir döngü olabilir.",
    },
    'gunes-jupiter': {
      k: "{Y}, {X:in} hayatına bolluk, iyimserlik ve büyüme getirir. Birbirinize cömert davranırsınız; bu ilişki ikinizin de ufkunu genişletir.",
      u: "{Y}, {X:e} güven verir ve onu destekler. Birlikteyken şans ve fırsatlar artıyormuş gibi hissedersiniz.",
      g: "İyi niyet var ama abartılı beklentiler de. {Y:in} cömertliği zaman zaman {X:e} fazla gelebilir; vaatleri gerçekçi tutmak önemli.",
    },
    'gunes-saturn': {
      k: "{Y}, {X:e} yapı, sorumluluk ve güven getirir; bu ciddi ve uzun soluklu bir bağ. Ama {X} zaman zaman kendini sınırlanmış ya da yargılanmış hissedebilir.",
      u: "{Y}, {X:in} hedeflerine sağlam bir destek olur; {X} de {Y:in} yanında daha olgun ve kararlı bir hâline kavuşur. Aranızda uzun ilişkilere özgü bir dayanıklılık var.",
      g: "Bağ güçlü ama ağır. {Y:in} eleştirileri ya da mesafesi {X:in} özgüvenini zorlayabilir; ilişki zamanla olgunlaşır ama sabır ister.",
    },
    'gunes-uranus': {
      k: "Aranızda ani, heyecanlı ve elektrikli bir çekim var. {Y}, {X:in} hayatına yenilik ve özgürlük getirir; ama ilişki düzen ve istikrar konusunda sınanır.",
      u: 'Birbirinizi şaşırtmaya ve özgür bırakmaya hazırsınız. İlişki rutinlere sıkışmadan canlı kalır.',
      g: "Çekim ani ama istikrarsız. {Y:in} bağımsızlık ihtiyacı {X:e} güvensizlik gibi gelebilir; ayrılıp barışma döngülerine dikkat.",
    },
    'gunes-pluton': {
      k: "Derin, dönüştürücü ve bağımlılık yaratabilecek yoğunlukta bir bağ. {Y}, {X:i} köklü biçimde değiştirir; kontrol ve güç konuları ilişkinin ana teması olabilir.",
      u: 'Birbirinizi derinden etkiler ve güçlendirirsiniz. Zor zamanlarda bu ilişki ikinizi de yeniden doğurur.',
      g: 'Yoğun bir çekim ve güç mücadelesi var. Kıskançlık ve kontrol ihtiyacı belirginleşebilir; güven kurulduğunda bu yoğunluk çok bağlayıcı olur.',
    },
    'gunes-kuzeyDugum': {
      k: "{X}, {Y:in} hayatta yönelmesi gereken yolu temsil ediyor. Bu karşılaşma {Y} için bir kader bağlantısı gibi hissedilir.",
      u: "{X}, {Y:in} gelişim yolunu kolaylaştırır ve ona doğru yönü gösterir.",
      g: 'Bu ilişki ikinizi de konfor alanınızdan çıkarır; büyüme var ama kolay değil.',
    },
    'gunes-yukselen': {
      k: "{Y}, {X:i} ilk anda fark eder ve ona çekilir. {X:in} varlığı {Y:in} kendini ifade etme biçimini güçlendirir.",
      u: 'Birbirinizin yanında rahat ve doğal davranırsınız; ilk izlenim olumlu.',
      g: 'İlk izlenimde çekim var ama tarzlarınız farklı; birbirinize uyum sağlamak zaman alır.',
      alcalan: "{Y}, {X:i} aradığı partner olarak görür. Uzun ilişki ve evlilik için güçlü bir işaret.",
    },
    'ay-ay': {
      k: 'Duygusal ritimleriniz neredeyse aynı. Birbirinizin ruh hâlini söylemeden anlarsınız; aranızda derin bir duygusal tanıdıklık var.',
      u: 'Duygusal ihtiyaçlarınız birbirini tamamlıyor. Birlikte yaşamak, aynı evi paylaşmak ve günlük ritmi uydurmak kolay.',
      g: 'Duygusal ihtiyaçlarınız ve tepki biçimleriniz farklı. Biri konuşmak isterken diğeri içine kapanabilir; bu sevgisizlik değil, iki farklı duygusal dil.',
    },
    'ay-merkur': {
      k: "{Y}, {X:in} duygularını kelimelere dökmesine yardım eder. Aranızdaki konuşmalar duygusal olarak besleyici.",
      u: "Duygular ve düşünceler aranızda kolay akar; {X} kendini {Y:e} anlatırken anlaşıldığını hisseder.",
      g: "{Y:in} mantıklı yaklaşımı {X:in} duygusal ihtiyaçlarını gözden kaçırabilir. {X} anlaşılmadığını, {Y} ise fazla alıngan bulunduğunu düşünebilir.",
    },
    'ay-venus': {
      k: "Şefkat ve sevgi aranızda çok güçlü buluşuyor. {Y}, {X:in} duygusal ihtiyaçlarını sezgiyle karşılar; aranızda yumuşak ve sıcak bir bağ var.",
      u: 'Sevgiyi gösterme biçimleriniz birbirinize iyi gelir. Aranızdaki şefkat ilişkinin en sağlam yanlarından biri.',
      g: "Sevgi var ama ifade biçimleri farklı. {X:in} ihtiyaç duyduğu duygusal güvence ile {Y:in} sunduğu ilgi her zaman örtüşmeyebilir.",
    },
    'ay-mars': {
      k: "Aranızda güçlü bir duygusal ve fiziksel çekim var. {Y}, {X:in} duygularını harekete geçirir; ama {Y:in} doğrudanlığı {X:i} zaman zaman kırabilir.",
      u: "{Y}, {X:in} duygusal ihtiyaçlarına somut adımlarla karşılık verir, korur ve harekete geçer.",
      g: "{Y:in} sabırsızlığı ya da öfkesi {X:in} hassas noktalarına dokunabilir. Tartışmalar çabuk alevlenir; ama tutku da bu gerilimden beslenir.",
    },
    'ay-jupiter': {
      k: "{Y}, {X:e} duygusal olarak cömert ve koruyucu davranır. Birlikteyken iyimserlik ve huzur artar.",
      u: "{Y:in} desteği {X:in} kendini güvende hissetmesini sağlar; ilişkide duygusal bir bolluk var.",
      g: "Duygusal beklentiler büyüyebilir; {Y:in} vaatleri ile {X:in} ihtiyaçları arasında denge kurulmalı.",
    },
    'ay-saturn': {
      k: "Kalıcı ve sadık ama ağırbaşlı bir bağ. {Y}, {X:e} güven verir; ancak {X} duygularını rahatça gösteremediğini hissedebilir.",
      u: "Duygusal sadakat ve istikrar güçlü. {Y}, {X} için güvenilir bir liman olur; bu ilişki zamanla derinleşir.",
      g: "{Y:in} mesafesi ya da eleştirel tavrı {X:i} duygusal olarak üşütebilir. Bağ güçlü ama sıcaklığın bilinçli olarak beslenmesi gerekiyor.",
    },
    'ay-uranus': {
      k: "Heyecanlı ama duygusal olarak dalgalı bir bağ. {Y}, {X:in} duygusal dünyasına sürprizler getirir; güven için tutarlılık gerekir.",
      u: 'Birbirinize duygusal özgürlük tanırsınız; ilişki boğucu olmadan yakın kalabilir.',
      g: "{Y:in} öngörülemezliği {X:in} güvenlik ihtiyacını sarsabilir. Yakınlık ile özgürlük arasında sık gidip gelirsiniz.",
    },
    'ay-pluton': {
      k: "Duygusal olarak çok yoğun, takıntı derecesine varabilen bir bağ. {X}, {Y:in} yanında en derin duygularıyla yüzleşir.",
      u: 'Birbirinizin duygusal yaralarını iyileştirebilirsiniz; bağınız derin ve dönüştürücü.',
      g: 'Kıskançlık, sahiplenme ve duygusal kontrol konuları öne çıkabilir. Yoğunluk yüksek; güven kurulması şart.',
    },
    'ay-kuzeyDugum': {
      k: "{X}, {Y:in} duygusal olarak yönünü bulmasına yardım eder. Birbirinizi önceden tanıyormuş gibi hissedebilirsiniz.",
      u: "{X:in} duygusal desteği {Y:in} kendi yolunda ilerlemesini kolaylaştırır.",
      g: 'Duygusal alışkanlıklarınız ile büyüme ihtiyacınız çekişir; bu ilişki ikinizi de değişmeye zorlar.',
    },
    'ay-yukselen': {
      k: "{Y}, {X:in} duygusal dünyasına doğal olarak uyum sağlar; birbirinizin yanında kendinizi güvende hissedersiniz.",
      u: 'Birlikteyken rahat ve sıcak bir atmosfer oluşur.',
      g: "{Y:in} tarzı {X:in} duygusal ihtiyaçlarına her zaman uymaz; ilk dönemde uyum zaman alır.",
      alcalan: "{Y}, {X:i} duygusal olarak aradığı partner gibi görür. Birlikte yaşama ve evlilik isteğini güçlendiren bir uyum.",
    },
    'merkur-merkur': {
      k: 'Aynı dili konuşursunuz. Düşünme hızınız, mizah anlayışınız ve merak ettiğiniz konular benzer.',
      u: 'Konuşmak kolay ve keyifli. Birbirinizin fikirlerini tamamlar, birlikte rahatça plan yaparsınız.',
      g: 'Düşünme ve konuşma tarzlarınız farklı. Aynı konuşmadan farklı sonuçlar çıkarabilirsiniz; yanlış anlaşılmalar aranızdaki en tipik sürtüşme kaynağı.',
    },
    'merkur-venus': {
      k: "Aranızdaki konuşmalar tatlı ve flörtöz. {X:in} sözleri {Y:e} iyi gelir; iltifatlar ve nazik bir dil ilişkiyi besler.",
      u: 'Birbirinize nazik ve takdirkâr konuşursunuz; zevkleriniz hakkında sohbet etmek keyifli.',
      g: "{X:in} doğrudan sözleri {Y:e} kırıcı gelebilir; sevgiyi ifade ederken üslup önemli.",
    },
    'merkur-mars': {
      k: "Konuşmalarınız hızlı, canlı ve tartışmaya açık. {Y}, {X:in} fikirlerine meydan okur; bu bazen ilham, bazen kavga getirir.",
      u: 'Fikirleri eyleme dökmek kolay; birlikte karar almak ve harekete geçmek hızlı.',
      g: "Sözlü çatışmalar kolay çıkar. {Y:in} sabırsızlığı ile {X:in} sözleri birleşince tartışmalar sertleşebilir.",
    },
    'merkur-jupiter': {
      k: 'Konuşmalarınız ufuk açıcı; birlikte öğrenmek, seyahat etmek ve büyük planlar yapmak ilişkiyi besler.',
      u: "{Y}, {X:in} fikirlerini cesaretlendirir; sohbetleriniz iyimser ve geniş ufuklu.",
      g: 'Fikirler büyük ama ayrıntılar kaçabilir; verilen sözlerin takibi önemli.',
    },
    'merkur-saturn': {
      k: "Konuşmalarınız ciddi ve sonuç odaklı. {Y}, {X:in} sözlerini dikkate alır ama zaman zaman eleştirel bir tonla karşılık verebilir.",
      u: 'Birlikte verdiğiniz kararlar kalıcı olur; konuşmalarınız güven verici ve sağlam.',
      g: "{X} kendini yargılanıyor, {Y} ise dinlenmiyor hissedebilir. İletişimde sabır ve açıklık gerekiyor.",
    },
    'merkur-uranus': {
      k: 'Zihinsel olarak birbirinizi uyarırsınız; sohbetleriniz sürprizli ve ilham verici.',
      u: 'Farklı fikirlere açıksınız; birlikte yeni şeyler keşfetmek heyecan verir.',
      g: 'Konuşmalar ani dönüşler yapabilir; düşünülmeden söylenen sözler pişmanlık yaratabilir.',
    },
    'venus-venus': {
      k: 'Sevgiyi aynı biçimde yaşarsınız. Zevkleriniz, estetik anlayışınız ve birlikte keyif aldığınız şeyler çok benzer.',
      u: 'Sevgi dilleriniz birbirine uyuyor. Birlikte vakit geçirmek ve güzel şeylerden keyif almak kolay.',
      g: 'Sevgiyi gösterme biçimleriniz ve zevkleriniz farklı. Birinin romantik bulduğu şey diğerine yetersiz gelebilir.',
    },
    'venus-mars': {
      k: "Aranızda çok güçlü bir fiziksel ve romantik çekim var. {Y}, {X:i} arzular; {X} de {Y:in} girişkenliğini çekici bulur. Bu çekim yıllar içinde kolay sönmez.",
      u: 'Arzu ve sevgi aranızda dengeli akar. Çekim güçlü ama zorlayıcı değil; yakınlık doğal biçimde gelişir.',
      g: "Yoğun bir çekim ve kıvılcım var. {X} hem etkilenir hem geri çekilir; bu gel-git tutkuyu canlı tutar ama zaman zaman tartışmalara da dönüşür.",
    },
    'venus-jupiter': {
      k: 'Birbirinizi şımartır, birlikte güzel zaman geçirirsiniz; bu ilişki ikinize de keyif ve şans getirir.',
      u: "İlişkide neşe ve bolluk duygusu var; {Y}, {X:in} sevgisini büyüten kişi.",
      g: 'Keyif var ama aşırılık da. Harcamalar, abartılı beklentiler ya da rehavet dengelenmeli.',
    },
    'venus-saturn': {
      k: "Sadık ve uzun soluklu bir bağ; ama sevginin ifadesi zaman zaman ağırlaşabilir. {X} kendini yeterince sevilmiyor hissedebilir; {Y} ise sevgisini sorumluluk alarak gösterir.",
      u: 'Duygularınız zamanla sınanıp olgunlaşır; aşk sönmez, derinleşir. Sadakat bu ilişkinin güçlü yanı.',
      g: "Sevgi ile sorumluluklar ya da kurallar çatışabilir. {X} soğukluk, {Y} ise beklenti baskısı hissedebilir.",
    },
    'venus-uranus': {
      k: 'Ani ve büyüleyici bir çekim. İlişki heyecanlı ve sıra dışı; istikrar ise zamanla kazanılır.',
      u: 'Birbirinizi şaşırtmayı seversiniz; ilişki taze ve özgür kalır.',
      g: 'Çekim yüksek ama dalgalı; yakınlaşma ve uzaklaşma döngüleri yaşanabilir.',
    },
    'venus-neptun': {
      k: "Masalsı, ruh eşi hissi veren bir romantizm. {Y}, {X:i} idealize eder; gerçekçi kalındığında bu çok ilham verici bir aşk.",
      u: 'Romantizm, şefkat ve fedakârlık aranızda doğal; müzik, sanat ve hayal paylaşımı ilişkiyi besler.',
      g: 'Romantizm güçlü ama yanılsama riski de var. Birbirinizi olduğunuzdan farklı görebilirsiniz; açık konuşmak hayal kırıklığını önler.',
    },
    'venus-pluton': {
      k: 'Takıntılı denebilecek yoğunlukta bir çekim. Aşk derin ve dönüştürücü; kıskançlık ve sahiplenme de aynı yoğunlukta olabilir.',
      u: 'Derin ve kalıcı bir tutku; birbirinize olan bağlılığınız zamanla güçlenir.',
      g: 'Yoğun çekim, güç mücadelesi ve kıskançlık. Bu ilişki kayıtsız bırakmaz; güven en önemli konu.',
    },
    'venus-kuzeyDugum': {
      k: "Kaderle buluşma hissi veren bir aşk. {X:in} sevgisi, {Y:in} hayattaki yönünü bulmasına yardım eder.",
      u: 'Sevgi, ikinizin de gelişimini destekleyen bir güce dönüşür.',
      g: 'Aşk ile kişisel gelişim arasında seçim yapıyormuş gibi hissedebilirsiniz.',
    },
    'venus-yukselen': {
      k: "{X}, {Y:i} fiziksel olarak çok çekici bulur; ilk görüşte beğeni yaşanır.",
      u: 'Birbirinizin tarzını ve görünüşünü beğenirsiniz; aranızda kolay bir sıcaklık var.',
      g: 'Beğeni var ama tarzlarınız farklı; birbirinizi değiştirmeye çalışmamak önemli.',
      alcalan: "{Y}, {X:i} ideal partner olarak görür. Evlilik ve uzun ilişki için en güçlü işaretlerden biri.",
    },
    'mars-mars': {
      k: 'Enerjileriniz ve istekleriniz aynı yöne akar. Birlikte harekete geçmek kolay; ama ikiniz de aynı anda liderlik etmek isteyebilirsiniz.',
      u: 'Enerjileriniz ve fiziksel ritimleriniz uyumlu. Spor, macera ya da ortak projeler ilişkiyi canlı tutar.',
      g: 'İstek ve öfke biçimleriniz çatışıyor. Kavgalar hızlı alevlenir; ama bu gerilim fiziksel çekimi de artırır.',
    },
    'mars-saturn': {
      k: "{X:in} hevesi {Y:in} temkinliliğiyle sık sık frenlenir. Bu, birlikte disiplinli işler yapmanızı sağlar ama {X} kendini engellenmiş hissedebilir.",
      u: 'Enerji ve disiplin aranızda iyi birleşir; uzun vadeli hedefler için güçlü bir ekipsiniz.',
      g: "{X:in} acelesi ile {Y:in} kontrol ihtiyacı çatışır; kırgınlıklar birikmeden konuşulmalı.",
    },
    'mars-uranus': {
      k: 'Elektrikli, ani ve heyecanlı bir enerji; ama patlamalara da açık.',
      u: 'Birlikte cesur ve sıra dışı şeyler yapmaktan keyif alırsınız.',
      g: 'Ani öfke patlamaları ve sabırsızlık; tartışmalar beklenmedik anlarda çıkabilir.',
    },
    'mars-pluton': {
      k: 'Çok güçlü bir fiziksel çekim ve yoğunluk. Tutku yüksek; güç mücadelesi de.',
      u: 'Tutkunuz derin ve dönüştürücü; birlikte zorlukların üstesinden gelme gücünüz yüksek.',
      g: 'Yoğun tutkuyla birlikte kontrol ve kıskançlık konuları. Çekim çok güçlü; sınırlar net olmalı.',
    },
    'mars-kuzeyDugum': {
      k: "{X}, {Y:i} hayatında harekete geçmeye ve cesur adımlar atmaya iter.",
      u: "{X:in} enerjisi {Y:in} kendi yolunda ilerlemesini destekler.",
      g: "{X:in} aceleciliği {Y:in} yönünü bulmasını zorlaştırabilir.",
    },
    'mars-yukselen': {
      k: "{X}, {Y:e} karşı güçlü bir fiziksel çekim duyar; ama {Y} zaman zaman {X:i} baskın bulabilir.",
      u: "{X:in} enerjisi {Y:i} canlandırır; birlikteyken cesaretiniz artar.",
      g: "Çekim ve sürtüşme bir arada; {X:in} tavırları {Y:e} sert gelebilir.",
      alcalan: "{Y}, {X:i} çekici ve tutkulu bir partner olarak görür; ilişki enerjik ama tartışmalı olabilir.",
    },
    'saturn-yukselen': {
      k: "{X}, {Y:e} ciddiyet ve sorumluluk getirir; {Y} zaman zaman kendini kısıtlanmış hissedebilir.",
      u: "{X}, {Y:e} güven ve istikrar verir.",
      g: "{X:in} eleştirileri {Y:in} özgüvenini zorlayabilir.",
      alcalan: 'Bağlayıcı, ciddi ve kalıcı bir ilişki işareti; sorumluluklar erken gelir.',
    },
    'kuzeyDugum-yukselen': {
      k: "{Y}, {X:in} hayattaki yönünü bulmasında belirleyici bir kişi olur.",
      u: "Tanışmanız {X:in} gelişimini kolaylaştıran bir etki taşır.",
      g: "Bu ilişki {X:i} alışkanlıklarından çıkmaya zorlar.",
      alcalan: "Aranızda güçlü bir kader bağı var; {Y}, {X} için hayatına bir amaçla girmiş biri gibi.",
    },
  },

  // Bir kişinin gezegeni diğerinin evinde: {X} gezegen sahibi, {Y} ev sahibi
  evler: {
    'mars-1': "{X}, {Y:in} varlığına doğrudan tepki verir; {Y} ise {X:in} yanında enerjik ve cesur hisseder. Çekim fiziksel ve ani.",
    'mars-5': "{X}, {Y:in} romantik ve eğlenceli tarafını harekete geçirir; flört ve oyun aranızda kendiliğinden gelişir.",
    'mars-8': "{X} yanındayken {Y} kontrolü bırakmanın ne demek olduğunu öğrenir. Mahremiyette çok güçlü ve bağlayıcı bir çekim var.",
    'mars-3': "Konuşmalarınız canlı ama tartışmaya açık; {X:in} sözleri {Y:i} harekete geçirir.",
    'mars-9': 'İnançlar ve dünya görüşü üzerine hararetli tartışmalar yaşayabilirsiniz; ama birlikte macera isteği de güçlü.',
    'venus-1': "{X}, {Y:i} çekici bulur ve bunu belli eder; {Y} kendini {X:in} gözünde güzel hisseder.",
    'venus-4': "{X:in} sevgisi {Y:e} ev sıcaklığı verir; birlikte yaşamak ve aile kurmak doğal bir hedef olur.",
    'venus-5': 'Romantizm, flört ve keyif aranızda kolay gelişir. Birlikte eğlenmek ilişkinin özü.',
    'venus-7': "{Y}, {X:i} ideal partner olarak görür; evlilik ve ciddi ilişki için güçlü bir işaret.",
    'venus-8': 'Sevgi derin ve tensel bir boyut kazanır; ilişki yüzeyde kalmaz.',
    'venus-12': 'Sessiz, fedakâr ve biraz gizli bir sevgi; ilişki dış dünyadan uzak bir sığınak gibi yaşanabilir.',
    'pluton-1': "{X}, {Y} üzerinde güçlü ve dönüştürücü bir etki yaratır; {Y} bu ilişkide kendini yeniden tanımlar.",
    'pluton-5': 'Romantizm yoğun, hatta takıntılı bir hâl alabilir; aşk hafif bir oyun olarak kalmaz.',
    'pluton-8': 'Cinsel ve duygusal yoğunluk çok yüksek; derin bir bağ ve dönüşüm yaşanır.',
    'ay-4': "{X}, {Y:in} yanında kendini evinde hisseder; birlikte yuva kurma isteği güçlü.",
    'ay-7': "{Y}, {X} için duygusal olarak doğal bir partner; ilişkiye bağlılık kolay gelişir.",
    'ay-8': "Duygusal bağınız derin ve kolay kopmayan cinsten; {Y}, {X:in} en mahrem duygularına dokunur.",
    'ay-12': "{Y}, {X:in} duygularını sezgiyle anlar; aranızda görünmeyen, ruhsal bir bağ var. Ama söylenmeyen duygular da birikebilir.",
    'merkur-3': 'Gündelik konuşmalar, mesajlaşma ve fikir alışverişi çok kolay; aranızda sohbet bitmez.',
    'merkur-9': "{X:in} fikirleri {Y:in} ufkunu genişletir; birlikte öğrenmek ve derin sohbetler ilişkiyi besler.",
    'gunes-3': "{X}, {Y:in} gündelik hayatını canlandırır; birlikte kısa yolculuklar ve küçük paylaşımlar keyifli.",
    'gunes-4': "{X}, {Y:in} hayatında aile ve yuva duygusunu güçlendirir.",
    'gunes-5': "{X}, {Y:in} hayatına neşe, romantizm ve yaratıcılık getirir; birlikte eğlenmek kolay.",
    'gunes-7': "{Y}, {X:i} doğal bir partner olarak görür; ilişkiye ciddiyetle yaklaşma isteği güçlü.",
    'gunes-8': "{X}, {Y:in} hayatında derin bir dönüşüm başlatır; bu ilişki ikinizi de değiştirir.",
    'gunes-9': "{X}, {Y} için bir öğretmen, bir ilham kaynağı ya da yeni bir dünya görüşü gibi.",
    'gunes-10': "{X}, {Y:in} hedeflerini ve toplumdaki yerini destekler; ilişkiniz görünür ve saygın olur.",
    'gunes-12': "{Y}, {X:i} sanki önceden tanıyormuş gibi hisseder; aranızda gizemli ve ruhsal bir bağ var.",
    'neptun-5': "Masalsı bir romantizm; {Y}, {X:in} yanında aşkı bir film gibi yaşar. Gerçekçi beklentiler önemli.",
    'neptun-7': "{Y}, {X:i} ideal ve ruhsal bir partner olarak görebilir; idealleştirme ile gerçek arasındaki dengeye dikkat.",
    'saturn-4': "{X}, {Y:in} ev ve aile hayatına düzen ve sorumluluk getirir; sağlam bir yuva kurmak mümkün ama ev ortamı zaman zaman ağırlaşabilir.",
    'saturn-7': 'Bağlılık ve evlilik konusunda ciddi bir ilişki; zamanla sınanır ve sağlamlaşır.',
    'saturn-10': "{X}, {Y:in} kariyerine ve hedeflerine yapı kazandırır; birlikte uzun vadeli planlar yapmak kolay.",
  },

  // Kişinin karakterine dair kısa ifade (gezegenin burcundan); {N} kişinin adı
  burcIfadeleri: {
    gunes: {
      kalip: '{N} {ifade} biri.',
      ifadeler: ['cesur, doğrudan ve öncü', 'sakin, sabırlı ve güven arayan', 'meraklı, konuşkan ve değişken', 'koruyucu, duygusal ve aile odaklı', 'cömert, gururlu ve ilgi isteyen', 'titiz, yardımsever ve ayrıntıcı', 'uyum arayan, zarif ve ilişki odaklı', 'yoğun, derin ve sadık', 'özgür, iyimser ve maceracı', 'ciddi, hırslı ve sorumluluk sahibi', 'bağımsız, özgün ve arkadaş canlısı', 'duyarlı, hayalperest ve şefkatli'],
    },
    ay: {
      kalip: '{N} {ifade}.',
      ifadeler: ['duygularını hızlı ve doğrudan yaşar, sabırsızdır', 'duygusal güven, süreklilik ve fiziksel yakınlık ister', 'duygularını konuşarak işler, çeşitlilik ister', 'derin bir duygusal bağ ve yuva hissi ister', 'görülmek, takdir edilmek ve sevgi gösterisi ister', 'sevgisini küçük hizmetlerle gösterir, düzen ister', 'uyum ve huzur ister, çatışmadan kaçınır', 'yoğun, sadık ve tam bir duygusal bağlılık ister', 'duygusal özgürlük ve neşe ister', 'duygularını kontrollü yaşar, güvenilirlik ister', 'duygusal alan ve arkadaşlık ister', 'şefkatli, sezgisel ve fedakârdır'],
    },
    merkur: {
      kalip: '{N} {ifade}.',
      ifadeler: ['hızlı ve doğrudan konuşur', 'yavaş ama kararlı düşünür', 'çok yönlü ve esprilidir', 'duygularıyla düşünür, hafızası güçlüdür', 'etkileyici ve kendinden emin konuşur', 'analitik ve ayrıntıcıdır', 'diplomatik ve dengelidir', 'derinlemesine sorgular, sır tutar', 'açık sözlü ve felsefidir', 'ciddi ve sonuç odaklı düşünür', 'özgün ve yenilikçi fikirlidir', 'sezgiseldir, hayal gücü geniştir'],
    },
    venus: {
      kalip: 'Aşkta {N} {ifade}.',
      ifadeler: ['heyecanı ve ilk adımı sever', 'sadakat, dokunma ve konfor ister', 'sohbet, flört ve çeşitlilik ister', 'şefkat ve korunmak ister', 'gösterişli bir romantizm ve hayranlık ister', 'sevgisini küçük ve somut ilgilerle gösterir', 'zarafet, denge ve romantik jestler ister', 'derinlik ve tam bağlılık ister', 'özgürlük ve birlikte macera ister', 'ciddiyet ve güvenilirlik ister', 'arkadaşlık ve bağımsızlık ister', 'koşulsuz, romantik ve fedakâr sever'],
    },
    mars: {
      kalip: '{N} arzusunu ve öfkesini {ifade} bir biçimde gösterir.',
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
    0: 'neredeyse aynı; tepkileriniz ve ihtiyaçlarınız çok benzer, birbirinizi ayna gibi görürsünüz.',
    4: 'aynı kökten geliyor; bu alanda aranızda doğal ve zahmetsiz bir akış var.',
    2: 'birbirini besliyor; bu alanda uyum kolay kurulur.',
    6: 'zıt ama tamamlayıcı; birbirinizi çekersiniz ama zaman zaman çekişirsiniz.',
    3: 'farklı yönlere çekiyor; ikiniz de kendi yolunuzda ısrar edebilirsiniz.',
    1: 'pek ortak nokta paylaşmıyor; bu alanda birbirinizi anlamak bilinçli çaba ister.',
    5: 'pek ortak nokta paylaşmıyor; bu alanda birbirinizi anlamak bilinçli çaba ister.',
  },

  // Etkinin gücü (açının ne kadar tam olduğuna göre)
  gucCumleleri: [
    'Bu etki ilişkinizin her döneminde güçlü biçimde hissedilir.',
    'Bu, ilişkinizde belirgin biçimde hissedilen bir etki.',
    'Bu etki daha hafif, arka planda hissedilir.',
  ],

  // Yüzde düzeyine göre giriş cümlesi: [yüksek (≥75), orta (55–74), düşük (<55)]
  bantlar: {
    tutku: ['Aranızdaki çekim çok güçlü.', 'Aranızda belirgin bir çekim var.', 'Fiziksel çekim bu ilişkinin ön plandaki yanı değil.'],
    baglanma: ['Duygusal bağınız çok güçlü.', 'Duygusal bağınız var ama emek istiyor.', 'Duygusal olarak birbirinizi anlamak zaman alabilir.'],
    iletisim: ['Zihinsel olarak çok iyi anlaşıyorsunuz.', 'İletişiminiz genel olarak iyi ama yanlış anlaşılmalara açık.', 'İletişim bu ilişkinin en çok emek isteyen alanlarından biri.'],
    romantizm: ['Romantizm ilişkinizin parlak yanlarından biri.', 'Aranızda şefkat var ama romantizm bilinçli beslenmeli.', 'Romantizm kendiliğinden gelişmiyor; birbirinizin sevgi dilini öğrenmeniz gerekiyor.'],
    guven: ['Bu ilişkinin uzun soluklu olma ihtimali yüksek.', 'Kalıcılık için sağlam temeller var ama sınanacak alanlar da.', 'Güven zamanla ve emekle inşa edilmesi gereken bir konu.'],
    huzur: ['Aranızda huzur ağır basıyor; anlaşmazlıklar kolay çözülür.', 'Huzur ve çatışma dengeli; tartışmalar olur ama yönetilebilir.', 'Sürtüşme ihtimali yüksek; tartışmaları yönetmeyi öğrenmek önemli.'],
    karmik: ['Aranızda güçlü bir kader bağı var.', 'Aranızda belirgin bir kader teması var.', 'Kader teması bu ilişkide ön planda değil.'],
  },

  bosBaslik: 'Bu alan ne özellikle kolay ne de özellikle zor; ilişkinin bu yanını ikinizin tercihleri belirler.',
};
