// Uyum bölümünün yorum metinleri. Her metin belirli bir göstergeye bağlıdır; uygulama yalnızca haritada
// gerçekten bulunan göstergelerin metinlerini seçer ve birleştirir.
//
// Yer tutucular: {X} ve {Y} kişilerin adlarıdır, ekler otomatik gelir: {X:in} → Ayşe'nin, {Y:e} → Mehmet'e, {X:i} → Ayşe'yi
//   Çift metinlerinde {X} çiftin ilk gezegeninin, {Y} ikinci gezegeninin sahibidir (ör. 'venus-mars': X'in Venüs'ü, Y'nin Mars'ı).
//   Ev metinlerinde {X} gezegenin sahibi, {Y} evin sahibidir.
//
// Açı türleri: k = kavuşum, u = uyumlu (altmışlık, üçgen), g = gergin (kare, karşıt, quincunx),
//              alcalan = Yükselen'e karşıtlık (gezegen diğer kişinin Alçalan noktasında, yani 7. ev girişinde)
window.ASTROSHIP_UYUM_METINLERI = {
  ciftler: {
    'gunes-gunes': {
      k: 'İki Güneş aynı noktada: hayattaki temel yöneliminiz ve kendinizi ifade etme biçiminiz çok benzer. Birbirinizi kolay anlarsınız; ama ikiniz de aynı anda sahnede olmak istediğinizde rekabet doğabilir.',
      u: 'Güneşleriniz uyumlu açıda: kimlikleriniz ve yaşam hedefleriniz birbirini destekliyor. Birbirinizin başarısını tehdit olarak değil, ilham olarak görürsünüz.',
      g: 'Güneşleriniz gergin açıda: yaşam hedefleriniz ve kendinizi ifade etme biçimleriniz farklı yönlere çekiyor. Bu fark birbirinizi geliştirebilir ama "kimin yolu" sorusu sık gündeme gelir.',
    },
    'gunes-ay': {
      k: "{X:in} Güneş'i, {Y:in} Ay'ıyla aynı noktada. Sinastride kalıcı birlikteliğin en klasik göstergelerinden biridir: {X:in} olduğu kişi, {Y:in} duygusal olarak ihtiyaç duyduğu şeyle örtüşür. {Y}, {X:in} yanında kendini evinde hisseder.",
      u: "{X:in} Güneş'i ile {Y:in} Ay'ı uyumlu açıda: {X:in} kendini ifade etme biçimi {Y:in} duygusal dünyasını besliyor. Aranızda zorlamadan kurulan bir anlaşma ve doğal bir rahatlık vardır.",
      g: "{X:in} Güneş'i ile {Y:in} Ay'ı gergin açıda: {X:in} istekleri ile {Y:in} duygusal ihtiyaçları zaman zaman çatışır. {Y} kendini yeterince görülmemiş, {X} ise fazla yönlendirilmiş hissedebilir; bu ilişkide ihtiyaçları açıkça söylemek önemlidir.",
    },
    'gunes-merkur': {
      k: "{Y:in} Merkür'ü, {X:in} Güneş'iyle aynı noktada: {Y}, {X:i} zihinsel olarak çok iyi anlar; onu dinlemekten ve onunla konuşmaktan keyif alır. Fikirleriniz kolay buluşur.",
      u: "{X:in} Güneş'i ile {Y:in} Merkür'ü uyumlu açıda: {Y:in} söyledikleri {X:in} kendini anlaşılmış hissetmesini sağlar. Birlikte plan yapmak ve fikir üretmek kolaydır.",
      g: "{X:in} Güneş'i ile {Y:in} Merkür'ü gergin açıda: {Y:in} yorumları {X:e} zaman zaman eleştiri gibi gelebilir. Aynı konuya farklı açılardan bakarsınız; bu tartışmalara ama aynı zamanda zihinsel bir canlılığa yol açar.",
    },
    'gunes-venus': {
      k: "{X:in} Güneş'i, {Y:in} Venüs'üyle aynı noktada: karşılıklı beğeninin en güçlü göstergelerinden biri. {Y}, {X:i} olduğu gibi sever ve bunu göstermekten çekinmez; {X} de {Y:in} yanında kendini değerli hisseder.",
      u: "{X:in} Güneş'i ile {Y:in} Venüs'ü uyumlu açıda: aranızda doğal bir sevgi ve hayranlık akışı var. {Y}, {X:in} karakterini çekici bulur; birlikte zaman geçirmek ikiniz için de keyiflidir.",
      g: "{X:in} Güneş'i ile {Y:in} Venüs'ü gergin açıda: çekim var ama zevkleriniz ve sevgiyi gösterme biçimleriniz farklı. {Y:in} beklediği ilgi ile {X:in} verdiği ilgi her zaman örtüşmeyebilir.",
    },
    'gunes-mars': {
      k: "{X:in} Güneş'i, {Y:in} Mars'ıyla aynı noktada: güçlü bir enerji ve fiziksel çekim. {Y}, {X:i} harekete geçirir ve cesaretlendirir; ama bu yoğunluk kolayca rekabete ve tartışmaya da dönüşebilir.",
      u: "{X:in} Güneş'i ile {Y:in} Mars'ı uyumlu açıda: birlikteyken enerjiniz yükselir. {Y:in} girişkenliği {X:in} hedeflerine destek olur; birlikte bir şeyler başarmak ikinizi de besler.",
      g: "{X:in} Güneş'i ile {Y:in} Mars'ı gergin açıda: aranızda yüksek bir enerji ve çekim var ama ego çatışmaları da kolay çıkar. {Y:in} çıkışları {X:e} meydan okuma gibi gelebilir; tartışmanın ardından gelen yakınlaşma bu açının tipik sonucudur.",
    },
    'gunes-jupiter': {
      k: "{Y:in} Jüpiter'i, {X:in} Güneş'iyle aynı noktada: {Y}, {X:in} hayatına bolluk, iyimserlik ve büyüme getirir. Birbirinize cömert davranırsınız; bu ilişki ikinizin de ufkunu genişletir.",
      u: "{X:in} Güneş'i ile {Y:in} Jüpiter'i uyumlu açıda: {Y}, {X:e} güven verir ve onu destekler. Birlikteyken şans ve fırsatlar artıyormuş gibi hissedersiniz.",
      g: "{X:in} Güneş'i ile {Y:in} Jüpiter'i gergin açıda: iyi niyet var ama abartılı beklentiler de. {Y:in} cömertliği zaman zaman {X:e} fazla gelebilir; vaatlerin gerçekçi tutulması önemlidir.",
    },
    'gunes-saturn': {
      k: "{Y:in} Satürn'ü, {X:in} Güneş'iyle aynı noktada: ciddi, bağlayıcı ve uzun soluklu bir temas. {Y}, {X:e} yapı, sorumluluk ve güven getirir; ama {X} zaman zaman kendini sınırlanmış ya da yargılanmış hissedebilir.",
      u: "{X:in} Güneş'i ile {Y:in} Satürn'ü uyumlu açıda: uzun ilişkilerin en tipik göstergelerinden biri. {Y}, {X:in} hedeflerine sağlam bir destek olur; {X} de {Y:in} yanında daha olgun ve kararlı bir hâline kavuşur.",
      g: "{X:in} Güneş'i ile {Y:in} Satürn'ü gergin açıda: bağ güçlü ama ağır. {Y:in} eleştirileri ya da mesafesi {X:in} özgüvenini zorlayabilir. Bu açı ilişkiyi zamanla olgunlaştırır ama sabır ister.",
    },
    'gunes-uranus': {
      k: "{Y:in} Uranüs'ü, {X:in} Güneş'iyle aynı noktada: ani, heyecanlı ve elektrikli bir çekim. {Y}, {X:in} hayatına yenilik ve özgürlük getirir; ama ilişki düzen ve öngörülebilirlik konusunda sınanır.",
      u: "{X:in} Güneş'i ile {Y:in} Uranüs'ü uyumlu açıda: birbirinizi şaşırtmaya ve özgür bırakmaya hazırsınız. İlişki rutinlere sıkışmadan canlı kalır.",
      g: "{X:in} Güneş'i ile {Y:in} Uranüs'ü gergin açıda: çekim ani ama istikrarsız. {Y:in} bağımsızlık ihtiyacı {X:e} güvensizlik gibi gelebilir; ayrılık ve barışma döngülerine dikkat.",
    },
    'gunes-pluton': {
      k: "{Y:in} Plüton'u, {X:in} Güneş'iyle aynı noktada: derin, dönüştürücü ve bağımlılık yaratabilecek yoğunlukta bir bağ. {Y}, {X:i} köklü biçimde değiştirir; kontrol ve güç konuları ilişkinin ana teması olabilir.",
      u: "{X:in} Güneş'i ile {Y:in} Plüton'u uyumlu açıda: birbirinizi derinden etkiler ve güçlendirirsiniz. Zor zamanlarda bu ilişki ikinizi de yeniden doğurur.",
      g: "{X:in} Güneş'i ile {Y:in} Plüton'u gergin açıda: yoğun bir çekim ve güç mücadelesi. Kıskançlık ve kontrol ihtiyacı belirginleşebilir; güven kurulduğunda bu yoğunluk çok bağlayıcı olur.",
    },
    'gunes-kuzeyDugum': {
      k: "{Y:in} Kuzey Ay Düğümü, {X:in} Güneş'iyle aynı noktada: karmik ilişkilerin en güçlü göstergelerinden biri. {X}, {Y:in} hayatta yönelmesi gereken yolu temsil eder; kader bağlantısı gibi hissedilen bir karşılaşma.",
      u: "{X:in} Güneş'i ile {Y:in} Kuzey Ay Düğümü uyumlu açıda: {X}, {Y:in} gelişim yolunu kolaylaştırır ve ona doğru yönü gösterir.",
      g: "{X:in} Güneş'i ile {Y:in} Ay Düğümü ekseni gergin açıda: ilişki ikinizi de konfor alanınızdan çıkarır; büyüme var ama kolay değil.",
    },
    'gunes-yukselen': {
      k: "{X:in} Güneş'i, {Y:in} Yükselen'iyle aynı noktada: {Y}, {X:i} ilk anda fark eder ve ona çekilir. {X:in} varlığı {Y:in} kendini ifade etme biçimini güçlendirir.",
      u: "{X:in} Güneş'i, {Y:in} Yükselen'iyle uyumlu açıda: birbirinizin yanında rahat ve doğal davranırsınız; ilk izlenim olumludur.",
      g: "{X:in} Güneş'i, {Y:in} Yükselen'iyle gergin açıda: ilk izlenimde çekim var ama tarzlarınız farklı; birbirinize uyum sağlamak zaman alır.",
      alcalan: "{X:in} Güneş'i, {Y:in} Alçalan noktasında: {Y}, {X:i} aradığı partner olarak görür. Uzun ilişki ve evlilik göstergeleri arasında güçlü bir yerleşimdir.",
    },
    'ay-ay': {
      k: 'Aylarınız aynı noktada: duygusal ritimleriniz neredeyse aynı. Birbirinizin ruh hâlini söylemeden anlarsınız; aranızda derin bir duygusal tanıdıklık vardır.',
      u: 'Aylarınız uyumlu açıda: duygusal ihtiyaçlarınız birbirini tamamlıyor. Birlikte yaşamak, aynı evi paylaşmak ve günlük ritmi uydurmak kolaydır.',
      g: 'Aylarınız gergin açıda: duygusal ihtiyaçlarınız ve tepki biçimleriniz farklı. Biri konuşmak isterken diğeri içine kapanabilir; bu sevgisizlik değil, iki farklı duygusal dildir.',
    },
    'ay-merkur': {
      k: "{Y:in} Merkür'ü, {X:in} Ay'ıyla aynı noktada: {Y}, {X:in} duygularını kelimelere dökmesine yardım eder. Aranızdaki konuşmalar duygusal olarak besleyicidir.",
      u: "{X:in} Ay'ı ile {Y:in} Merkür'ü uyumlu açıda: duygular ve düşünceler aranızda kolay akar; {X} kendini {Y:e} anlatırken anlaşıldığını hisseder.",
      g: "{X:in} Ay'ı ile {Y:in} Merkür'ü gergin açıda: {Y:in} mantıklı yaklaşımı {X:in} duygusal ihtiyaçlarını gözden kaçırabilir. {X} anlaşılmadığını, {Y} ise fazla alıngan bulunduğunu düşünebilir.",
    },
    'ay-venus': {
      k: "{X:in} Ay'ı, {Y:in} Venüs'üyle aynı noktada: şefkat ve sevginin çok güçlü bir buluşması. {Y}, {X:in} duygusal ihtiyaçlarını sezgiyle karşılar; aranızda yumuşak ve sıcak bir bağ vardır.",
      u: "{X:in} Ay'ı ile {Y:in} Venüs'ü uyumlu açıda: sevgiyi gösterme biçimleriniz birbirine iyi gelir. Aranızdaki şefkat ilişkinin en sağlam yanlarından biridir.",
      g: "{X:in} Ay'ı ile {Y:in} Venüs'ü gergin açıda: sevgi var ama ifade biçimleri farklı. {X:in} ihtiyaç duyduğu duygusal güvence ile {Y:in} sunduğu ilgi her zaman örtüşmeyebilir.",
    },
    'ay-mars': {
      k: "{Y:in} Mars'ı, {X:in} Ay'ıyla aynı noktada: güçlü bir duygusal ve fiziksel çekim. {Y}, {X:in} duygularını harekete geçirir; ama {Y:in} doğrudanlığı {X:i} zaman zaman kırabilir.",
      u: "{X:in} Ay'ı ile {Y:in} Mars'ı uyumlu açıda: {Y}, {X:in} duygusal ihtiyaçlarına somut adımlarla karşılık verir, korur ve harekete geçer.",
      g: "{X:in} Ay'ı ile {Y:in} Mars'ı gergin açıda: {Y:in} sabırsızlığı ya da öfkesi {X:in} hassas noktalarına dokunabilir. Tartışmalar çabuk alevlenir; ama tutku da bu gerilimden beslenir.",
    },
    'ay-jupiter': {
      k: "{Y:in} Jüpiter'i, {X:in} Ay'ıyla aynı noktada: {Y}, {X:e} duygusal olarak cömert ve koruyucu davranır. Birlikteyken iyimserlik ve huzur artar.",
      u: "{X:in} Ay'ı ile {Y:in} Jüpiter'i uyumlu açıda: {Y:in} desteği {X:in} kendini güvende hissetmesini sağlar; ilişkide duygusal bir bolluk vardır.",
      g: "{X:in} Ay'ı ile {Y:in} Jüpiter'i gergin açıda: duygusal beklentiler büyüyebilir; {Y:in} vaatleri ile {X:in} ihtiyaçları arasında denge kurulmalıdır.",
    },
    'ay-saturn': {
      k: "{Y:in} Satürn'ü, {X:in} Ay'ıyla aynı noktada: kalıcı ve sadık ama ağırbaşlı bir bağ. {Y}, {X:e} güven verir; ancak {X} duygularını rahatça gösteremediğini hissedebilir.",
      u: "{X:in} Ay'ı ile {Y:in} Satürn'ü uyumlu açıda: duygusal sadakat ve istikrar güçlü. {Y}, {X} için güvenilir bir liman olur; bu ilişki zamanla derinleşir.",
      g: "{X:in} Ay'ı ile {Y:in} Satürn'ü gergin açıda: {Y:in} mesafesi ya da eleştirel tavrı {X:i} duygusal olarak üşütebilir. Bağ güçlüdür ama sıcaklığın bilinçli olarak beslenmesi gerekir.",
    },
    'ay-uranus': {
      k: "{Y:in} Uranüs'ü, {X:in} Ay'ıyla aynı noktada: heyecanlı ama duygusal olarak dalgalı bir bağ. {Y}, {X:in} duygusal dünyasına sürprizler getirir; güven için tutarlılık gerekir.",
      u: "{X:in} Ay'ı ile {Y:in} Uranüs'ü uyumlu açıda: birbirinize duygusal özgürlük tanırsınız; ilişki boğucu olmadan yakın kalabilir.",
      g: "{X:in} Ay'ı ile {Y:in} Uranüs'ü gergin açıda: {Y:in} öngörülemezliği {X:in} güvenlik ihtiyacını sarsabilir. Yakınlık ile özgürlük arasında sık gidip gelirsiniz.",
    },
    'ay-pluton': {
      k: "{Y:in} Plüton'u, {X:in} Ay'ıyla aynı noktada: duygusal olarak çok yoğun, takıntı derecesine varabilen bir bağ. {X}, {Y:in} yanında en derin duygularıyla yüzleşir.",
      u: "{X:in} Ay'ı ile {Y:in} Plüton'u uyumlu açıda: birbirinizin duygusal yaralarını iyileştirebilirsiniz; bağ derin ve dönüştürücüdür.",
      g: "{X:in} Ay'ı ile {Y:in} Plüton'u gergin açıda: kıskançlık, sahiplenme ve duygusal kontrol temaları belirginleşebilir. Yoğunluk yüksek; güven kurulması şarttır.",
    },
    'ay-kuzeyDugum': {
      k: "{Y:in} Kuzey Ay Düğümü, {X:in} Ay'ıyla aynı noktada: {X}, {Y:in} duygusal olarak yönünü bulmasına yardım eder. Bu temas, önceden tanışıyormuş gibi hissettiren karmik bir bağ sayılır.",
      u: "{X:in} Ay'ı ile {Y:in} Ay Düğümü uyumlu açıda: {X:in} duygusal desteği {Y:in} gelişim yolunu kolaylaştırır.",
      g: "{X:in} Ay'ı ile {Y:in} Ay Düğümü ekseni gergin açıda: duygusal alışkanlıklar ile gelişim ihtiyacı çekişir; ilişki ikinizi de büyümeye zorlar.",
    },
    'ay-yukselen': {
      k: "{X:in} Ay'ı, {Y:in} Yükselen'iyle aynı noktada: {Y}, {X:in} duygusal dünyasına doğal olarak uyum sağlar; birbirinizin yanında kendinizi güvende hissedersiniz.",
      u: "{X:in} Ay'ı, {Y:in} Yükselen'iyle uyumlu açıda: birlikteyken rahat ve sıcak bir atmosfer oluşur.",
      g: "{X:in} Ay'ı, {Y:in} Yükselen'iyle gergin açıda: {Y:in} tarzı {X:in} duygusal ihtiyaçlarına her zaman uymaz; ilk dönemde uyum zaman alır.",
      alcalan: "{X:in} Ay'ı, {Y:in} Alçalan noktasında: {Y}, {X:i} duygusal olarak aradığı partner gibi görür. Birlikte yaşama ve evlilik eğilimini güçlendiren klasik bir göstergedir.",
    },
    'merkur-merkur': {
      k: 'Merkürleriniz aynı noktada: aynı dili konuşursunuz. Düşünme hızınız, mizah anlayışınız ve merak ettiğiniz konular benzer.',
      u: 'Merkürleriniz uyumlu açıda: konuşmak kolay ve keyifli. Birbirinizin fikirlerini tamamlar, birlikte rahatça plan yaparsınız.',
      g: 'Merkürleriniz gergin açıda: düşünme ve konuşma tarzlarınız farklı. Aynı konuşmadan farklı sonuçlar çıkarabilirsiniz; yanlış anlaşılmalar bu ilişkinin en tipik sürtüşme kaynağıdır.',
    },
    'merkur-venus': {
      k: "{X:in} Merkür'ü, {Y:in} Venüs'üyle aynı noktada: aranızdaki konuşmalar tatlı ve flörtöz. {X:in} sözleri {Y:e} iyi gelir; iltifatlar ve nazik bir dil ilişkiyi besler.",
      u: "{X:in} Merkür'ü ile {Y:in} Venüs'ü uyumlu açıda: birbirinize nazik ve takdirkâr konuşursunuz; zevkleriniz hakkında sohbet etmek keyiflidir.",
      g: "{X:in} Merkür'ü ile {Y:in} Venüs'ü gergin açıda: {X:in} doğrudan sözleri {Y:e} kırıcı gelebilir; sevgiyi ifade ederken üslup önemlidir.",
    },
    'merkur-mars': {
      k: "{Y:in} Mars'ı, {X:in} Merkür'üyle aynı noktada: konuşmalar hızlı, canlı ve tartışmaya açık. {Y}, {X:in} fikirlerine meydan okur; bu bazen ilham, bazen kavga getirir.",
      u: "{X:in} Merkür'ü ile {Y:in} Mars'ı uyumlu açıda: fikirleri eyleme dökmek kolay; birlikte karar almak ve harekete geçmek hızlıdır.",
      g: "{X:in} Merkür'ü ile {Y:in} Mars'ı gergin açıda: sözlü çatışmalar kolay çıkar. {Y:in} sabırsızlığı ile {X:in} sözleri birleşince tartışmalar sertleşebilir.",
    },
    'merkur-jupiter': {
      k: "{Y:in} Jüpiter'i, {X:in} Merkür'üyle aynı noktada: konuşmalarınız ufuk açıcı; birlikte öğrenmek, seyahat etmek ve büyük planlar yapmak ilişkiyi besler.",
      u: "{X:in} Merkür'ü ile {Y:in} Jüpiter'i uyumlu açıda: {Y}, {X:in} fikirlerini cesaretlendirir; sohbetleriniz iyimser ve geniş ufuklu.",
      g: "{X:in} Merkür'ü ile {Y:in} Jüpiter'i gergin açıda: fikirler büyük ama ayrıntılar kaçabilir; verilen sözlerin takibi önemlidir.",
    },
    'merkur-saturn': {
      k: "{Y:in} Satürn'ü, {X:in} Merkür'üyle aynı noktada: konuşmalar ciddi ve sonuç odaklı. {Y}, {X:in} sözlerini dikkate alır ama zaman zaman eleştirel bir tonla karşılık verebilir.",
      u: "{X:in} Merkür'ü ile {Y:in} Satürn'ü uyumlu açıda: birlikte verilen kararlar kalıcı olur; konuşmalarınız güven verici ve sağlamdır.",
      g: "{X:in} Merkür'ü ile {Y:in} Satürn'ü gergin açıda: {X} kendini yargılanıyor, {Y} ise dinlenmiyor hissedebilir. İletişimde sabır ve açıklık gerekir.",
    },
    'merkur-uranus': {
      k: "{Y:in} Uranüs'ü, {X:in} Merkür'üyle aynı noktada: zihinsel olarak birbirinizi uyarırsınız; sohbetler sürprizli ve ilham verici.",
      u: "{X:in} Merkür'ü ile {Y:in} Uranüs'ü uyumlu açıda: farklı fikirlere açıksınız; birlikte yeni şeyler keşfetmek heyecan verir.",
      g: "{X:in} Merkür'ü ile {Y:in} Uranüs'ü gergin açıda: konuşmalar ani dönüşler yapabilir; düşünülmeden söylenen sözler pişmanlık yaratabilir.",
    },
    'venus-venus': {
      k: 'Venüsleriniz aynı noktada: sevgiyi aynı biçimde yaşarsınız. Zevkleriniz, estetik anlayışınız ve birlikte keyif aldığınız şeyler çok benzer.',
      u: 'Venüsleriniz uyumlu açıda: sevgi dilleriniz birbirine uyuyor. Birlikte vakit geçirmek ve güzel şeylerden keyif almak kolaydır.',
      g: 'Venüsleriniz gergin açıda: sevgiyi gösterme biçimleriniz ve zevkleriniz farklı. Birinin romantik bulduğu şey diğerine yetersiz gelebilir.',
    },
    'venus-mars': {
      k: "{X:in} Venüs'ü, {Y:in} Mars'ıyla aynı noktada: sinastride fiziksel ve romantik çekimin en güçlü göstergesi. {Y}, {X:i} arzular; {X} de {Y:in} girişkenliğini çekici bulur. Bu çekim yıllar içinde kolay sönmez.",
      u: "{X:in} Venüs'ü ile {Y:in} Mars'ı uyumlu açıda: arzu ve sevgi aranızda dengeli akar. Çekim güçlü ama zorlayıcı değil; yakınlık doğal biçimde gelişir.",
      g: "{X:in} Venüs'ü ile {Y:in} Mars'ı gergin açıda: yoğun bir çekim ve kıvılcım. {X} hem etkilenir hem geri çekilir; bu gel-git tutkuyu canlı tutar ama zaman zaman tartışmalara da dönüşür.",
    },
    'venus-jupiter': {
      k: "{Y:in} Jüpiter'i, {X:in} Venüs'üyle aynı noktada: cömertlik, keyif ve şans getiren bir temas. Birbirinizi şımartır, birlikte güzel zaman geçirirsiniz.",
      u: "{X:in} Venüs'ü ile {Y:in} Jüpiter'i uyumlu açıda: ilişkide neşe ve bolluk duygusu var; {Y}, {X:in} sevgisini büyüten kişidir.",
      g: "{X:in} Venüs'ü ile {Y:in} Jüpiter'i gergin açıda: keyif var ama aşırılık da. Harcamalar, abartılı beklentiler ya da rehavet dengelenmelidir.",
    },
    'venus-saturn': {
      k: "{Y:in} Satürn'ü, {X:in} Venüs'üyle aynı noktada: sadık ve uzun soluklu bir bağ; ama sevginin ifadesi zaman zaman ağırlaşabilir. {X} kendini yeterince sevilmiyor hissedebilir; {Y} ise sevgisini sorumluluk alarak gösterir.",
      u: "{X:in} Venüs'ü ile {Y:in} Satürn'ü uyumlu açıda: duygular zamanla sınanıp olgunlaşır; aşk sönmez, derinleşir. Sadakat bu ilişkinin güçlü yanıdır.",
      g: "{X:in} Venüs'ü ile {Y:in} Satürn'ü gergin açıda: sevgi ile sorumluluklar ya da kurallar çatışabilir. {X} soğukluk, {Y} ise beklenti baskısı hissedebilir.",
    },
    'venus-uranus': {
      k: "{Y:in} Uranüs'ü, {X:in} Venüs'üyle aynı noktada: ani ve büyüleyici bir çekim. İlişki heyecanlı ve sıra dışıdır; istikrar ise zamanla kazanılır.",
      u: "{X:in} Venüs'ü ile {Y:in} Uranüs'ü uyumlu açıda: birbirinizi şaşırtmayı seversiniz; ilişki taze ve özgür kalır.",
      g: "{X:in} Venüs'ü ile {Y:in} Uranüs'ü gergin açıda: çekim yüksek ama dalgalı; yakınlaşma ve uzaklaşma döngüleri yaşanabilir.",
    },
    'venus-neptun': {
      k: "{Y:in} Neptün'ü, {X:in} Venüs'üyle aynı noktada: masalsı, ruh eşi hissi veren bir romantizm. {Y}, {X:i} idealize eder; gerçekçi kalındığında bu çok ilham verici bir aşktır.",
      u: "{X:in} Venüs'ü ile {Y:in} Neptün'ü uyumlu açıda: romantizm, şefkat ve fedakârlık aranızda doğal; müzik, sanat ve hayal paylaşımı ilişkiyi besler.",
      g: "{X:in} Venüs'ü ile {Y:in} Neptün'ü gergin açıda: romantizm güçlü ama yanılsama riski de var. Birbirinizi olduğunuzdan farklı görebilirsiniz; açık konuşmak hayal kırıklığını önler.",
    },
    'venus-pluton': {
      k: "{Y:in} Plüton'u, {X:in} Venüs'üyle aynı noktada: takıntılı denebilecek yoğunlukta bir çekim. Aşk derin ve dönüştürücü; kıskançlık ve sahiplenme de aynı yoğunlukta olabilir.",
      u: "{X:in} Venüs'ü ile {Y:in} Plüton'u uyumlu açıda: derin ve kalıcı bir tutku; birbirinize olan bağlılığınız zamanla güçlenir.",
      g: "{X:in} Venüs'ü ile {Y:in} Plüton'u gergin açıda: yoğun çekim, güç mücadelesi ve kıskançlık. Bu ilişki kayıtsız bırakmaz; güven en önemli konudur.",
    },
    'venus-kuzeyDugum': {
      k: "{Y:in} Kuzey Ay Düğümü, {X:in} Venüs'üyle aynı noktada: kaderle buluşma hissi veren bir aşk göstergesi. {X:in} sevgisi, {Y:in} hayattaki yönünü bulmasına yardım eder.",
      u: "{X:in} Venüs'ü ile {Y:in} Ay Düğümü uyumlu açıda: sevgi, ikinizin de gelişimini destekleyen bir güce dönüşür.",
      g: "{X:in} Venüs'ü ile {Y:in} Ay Düğümü ekseni gergin açıda: aşk ile kişisel gelişim arasında seçim yapıyormuş gibi hissedebilirsiniz.",
    },
    'venus-yukselen': {
      k: "{X:in} Venüs'ü, {Y:in} Yükselen'iyle aynı noktada: {X}, {Y:i} fiziksel olarak çok çekici bulur. İlk görüşte beğeninin klasik göstergesidir.",
      u: "{X:in} Venüs'ü, {Y:in} Yükselen'iyle uyumlu açıda: birbirinizin tarzını ve görünüşünü beğenirsiniz; aranızda kolay bir sıcaklık vardır.",
      g: "{X:in} Venüs'ü, {Y:in} Yükselen'iyle gergin açıda: beğeni var ama tarzlarınız farklı; birbirinizi değiştirmeye çalışmamak önemli.",
      alcalan: "{X:in} Venüs'ü, {Y:in} Alçalan noktasında: {Y}, {X:i} ideal partner olarak görür. Evlilik ve uzun ilişki göstergelerinin en güçlülerinden biridir.",
    },
    'mars-mars': {
      k: 'Marslarınız aynı noktada: enerjileriniz ve istekleriniz aynı yöne akar. Birlikte harekete geçmek kolay; ama ikiniz de aynı anda liderlik etmek isteyebilirsiniz.',
      u: 'Marslarınız uyumlu açıda: enerjileriniz ve fiziksel ritimleriniz uyumlu. Spor, macera ya da ortak projeler ilişkiyi canlı tutar.',
      g: 'Marslarınız gergin açıda: istek ve öfke biçimleriniz çatışıyor. Kavgalar hızlı alevlenir; ama bu gerilim fiziksel çekimi de artırır.',
    },
    'mars-saturn': {
      k: "{Y:in} Satürn'ü, {X:in} Mars'ıyla aynı noktada: {X:in} hevesi {Y:in} temkinliliğiyle sık sık frenlenir. Bu birlikte disiplinli işler yapmanızı sağlar ama {X} kendini engellenmiş hissedebilir.",
      u: "{X:in} Mars'ı ile {Y:in} Satürn'ü uyumlu açıda: enerji ve disiplin aranızda iyi birleşir; uzun vadeli hedefler için güçlü bir ekipsiniz.",
      g: "{X:in} Mars'ı ile {Y:in} Satürn'ü gergin açıda: önemli bir sürtüşme kaynağı. {X:in} acelesi ile {Y:in} kontrol ihtiyacı çatışır; kırgınlıklar birikmeden konuşulmalıdır.",
    },
    'mars-uranus': {
      k: "{Y:in} Uranüs'ü, {X:in} Mars'ıyla aynı noktada: elektrikli, ani ve heyecanlı bir enerji; ama patlamalara da açık.",
      u: "{X:in} Mars'ı ile {Y:in} Uranüs'ü uyumlu açıda: birlikte cesur ve sıra dışı şeyler yapmaktan keyif alırsınız.",
      g: "{X:in} Mars'ı ile {Y:in} Uranüs'ü gergin açıda: ani öfke patlamaları ve sabırsızlık; tartışmalar beklenmedik anlarda çıkabilir.",
    },
    'mars-pluton': {
      k: "{Y:in} Plüton'u, {X:in} Mars'ıyla aynı noktada: çok güçlü bir fiziksel çekim ve yoğunluk. Tutku yüksek; güç mücadelesi de.",
      u: "{X:in} Mars'ı ile {Y:in} Plüton'u uyumlu açıda: tutku derin ve dönüştürücü; birlikte zorlukların üstesinden gelme gücünüz yüksek.",
      g: "{X:in} Mars'ı ile {Y:in} Plüton'u gergin açıda: yoğun tutkuyla birlikte kontrol ve kıskançlık temaları. Çekim çok güçlü; sınırlar net olmalı.",
    },
    'mars-kuzeyDugum': {
      k: "{Y:in} Kuzey Ay Düğümü, {X:in} Mars'ıyla aynı noktada: {X}, {Y:i} hayatında harekete geçmeye ve cesur adımlar atmaya iter.",
      u: "{X:in} Mars'ı ile {Y:in} Ay Düğümü uyumlu açıda: {X:in} enerjisi {Y:in} gelişim yolunu destekler.",
      g: "{X:in} Mars'ı ile {Y:in} Ay Düğümü ekseni gergin açıda: {X:in} aceleciliği {Y:in} yönünü bulmasını zorlaştırabilir.",
    },
    'mars-yukselen': {
      k: "{X:in} Mars'ı, {Y:in} Yükselen'iyle aynı noktada: {X}, {Y:e} karşı güçlü bir fiziksel çekim duyar; ama {Y} zaman zaman {X:i} baskın bulabilir.",
      u: "{X:in} Mars'ı, {Y:in} Yükselen'iyle uyumlu açıda: {X:in} enerjisi {Y:i} canlandırır; birlikteyken cesaretiniz artar.",
      g: "{X:in} Mars'ı, {Y:in} Yükselen'iyle gergin açıda: çekim ve sürtüşme bir arada; {X:in} tavırları {Y:e} sert gelebilir.",
      alcalan: "{X:in} Mars'ı, {Y:in} Alçalan noktasında: {Y}, {X:i} çekici ve tutkulu bir partner olarak görür; ilişki enerjik ama tartışmalı olabilir.",
    },
    'saturn-yukselen': {
      k: "{X:in} Satürn'ü, {Y:in} Yükselen'iyle aynı noktada: {X}, {Y:e} ciddiyet ve sorumluluk getirir; {Y} zaman zaman kendini kısıtlanmış hissedebilir.",
      u: "{X:in} Satürn'ü, {Y:in} Yükselen'iyle uyumlu açıda: {X}, {Y:e} güven ve istikrar verir.",
      g: "{X:in} Satürn'ü, {Y:in} Yükselen'iyle gergin açıda: {X:in} eleştirileri {Y:in} özgüvenini zorlayabilir.",
      alcalan: "{X:in} Satürn'ü, {Y:in} Alçalan noktasında: bağlayıcı, ciddi ve kalıcı bir ilişki göstergesi; sorumluluklar erken gelir.",
    },
    'kuzeyDugum-yukselen': {
      k: "{X:in} Kuzey Ay Düğümü, {Y:in} Yükselen'iyle aynı noktada: {Y}, {X:in} hayattaki yönünü bulmasında belirleyici bir kişi olur.",
      u: "{X:in} Ay Düğümü, {Y:in} Yükselen'iyle uyumlu açıda: tanışmanız {X:in} gelişimini kolaylaştıran bir etki taşır.",
      g: "{X:in} Ay Düğümü ekseni, {Y:in} Yükselen'iyle gergin açıda: ilişki {X:i} alışkanlıklarından çıkmaya zorlar.",
      alcalan: "{X:in} Kuzey Ay Düğümü, {Y:in} Alçalan noktasında: güçlü bir karmik partner göstergesi.",
    },
  },

  // Bir kişinin gezegeni diğerinin evinde: {X} gezegen sahibi, {Y} ev sahibi
  evler: {
    'mars-1': "{X:in} Mars'ı {Y:in} 1. evinde: {X}, {Y:in} varlığına doğrudan tepki verir; {Y} ise {X:in} yanında enerjik ve cesur hisseder. Çekim fiziksel ve ani.",
    'mars-5': "{X:in} Mars'ı {Y:in} 5. evinde: flört, oyun ve fiziksel çekim için klasik bir yerleşim. {X}, {Y:in} romantik ve eğlenceli tarafını harekete geçirir.",
    'mars-8': "{X:in} Mars'ı {Y:in} 8. evinde: mahremiyet ve cinsellik alanında çok güçlü bir etki. {X} yanındayken {Y} kontrolü bırakmanın ne demek olduğunu öğrenir; çok bağlayıcı bir yerleşimdir.",
    'mars-3': "{X:in} Mars'ı {Y:in} 3. evinde: konuşmalar canlı ama tartışmaya açık; {X:in} sözleri {Y:i} harekete geçirir.",
    'mars-9': "{X:in} Mars'ı {Y:in} 9. evinde: inançlar ve dünya görüşü üzerine hararetli tartışmalar, ama birlikte macera isteği de.",
    'venus-1': "{X:in} Venüs'ü {Y:in} 1. evinde: {X}, {Y:i} çekici bulur ve bunu belli eder; {Y} kendini {X:in} gözünde güzel hisseder.",
    'venus-4': "{X:in} Venüs'ü {Y:in} 4. evinde: {X:in} sevgisi {Y:e} ev sıcaklığı verir; birlikte yaşamak ve aile kurmak doğal bir hedef olur.",
    'venus-5': "{X:in} Venüs'ü {Y:in} 5. evinde: romantizm, flört ve keyif için en uyumlu yerleşimlerden biri. Birlikte eğlenmek ilişkinin özüdür.",
    'venus-7': "{X:in} Venüs'ü {Y:in} 7. evinde: {Y}, {X:i} ideal partner olarak görür; evlilik ve ciddi ilişki için güçlü bir yerleşim.",
    'venus-8': "{X:in} Venüs'ü {Y:in} 8. evinde: sevgi derin ve tensel bir boyut kazanır; ilişki yüzeyde kalmaz.",
    'venus-12': "{X:in} Venüs'ü {Y:in} 12. evinde: sessiz, fedakâr ve biraz gizli bir sevgi; ilişki dış dünyadan uzak bir sığınak gibi yaşanabilir.",
    'pluton-1': "{X:in} Plüton'u {Y:in} 1. evinde: {X}, {Y} üzerinde güçlü ve dönüştürücü bir etki yaratır; {Y} bu ilişkide kendini yeniden tanımlar.",
    'pluton-5': "{X:in} Plüton'u {Y:in} 5. evinde: romantizm yoğun, hatta takıntılı bir hâl alabilir; aşk hafif bir oyun olarak kalmaz.",
    'pluton-8': "{X:in} Plüton'u {Y:in} 8. evinde: cinsel ve duygusal yoğunluk çok yüksek; derin bir bağ ve dönüşüm göstergesi.",
    'ay-4': "{X:in} Ay'ı {Y:in} 4. evinde: {X}, {Y:in} yanında kendini evinde hisseder; birlikte yuva kurma isteği güçlüdür.",
    'ay-7': "{X:in} Ay'ı {Y:in} 7. evinde: {Y}, {X} için duygusal olarak doğal bir partnerdir; ilişkiye bağlılık kolay gelişir.",
    'ay-8': "{X:in} Ay'ı {Y:in} 8. evinde: duygusal bağ derin ve kolay kopmayan cinsten; {Y}, {X:in} en mahrem duygularına dokunur.",
    'ay-12': "{X:in} Ay'ı {Y:in} 12. evinde: {Y}, {X:in} duygularını sezgiyle anlar; aranızda görünmeyen, ruhsal bir bağ vardır. Ama söylenmeyen duygular da birikebilir.",
    'merkur-3': "{X:in} Merkür'ü {Y:in} 3. evinde: gündelik konuşmalar, mesajlaşma ve fikir alışverişi çok kolay; aranızda sohbet bitmez.",
    'merkur-9': "{X:in} Merkür'ü {Y:in} 9. evinde: {X:in} fikirleri {Y:in} ufkunu genişletir; birlikte öğrenmek ve derin sohbetler ilişkiyi besler.",
    'gunes-3': "{X:in} Güneş'i {Y:in} 3. evinde: {X}, {Y:in} gündelik hayatını canlandırır; birlikte kısa yolculuklar ve küçük paylaşımlar keyiflidir.",
    'gunes-4': "{X:in} Güneş'i {Y:in} 4. evinde: {X}, {Y:in} hayatında aile ve yuva duygusunu güçlendirir.",
    'gunes-5': "{X:in} Güneş'i {Y:in} 5. evinde: {X}, {Y:in} hayatına neşe, romantizm ve yaratıcılık getirir; birlikte eğlenmek kolaydır.",
    'gunes-7': "{X:in} Güneş'i {Y:in} 7. evinde: {Y}, {X:i} doğal bir partner olarak görür; ilişkiye ciddiyetle yaklaşma eğilimi güçlüdür.",
    'gunes-8': "{X:in} Güneş'i {Y:in} 8. evinde: {X}, {Y:in} hayatında derin bir dönüşüm başlatır; bu ilişki ikinizi de değiştirir.",
    'gunes-9': "{X:in} Güneş'i {Y:in} 9. evinde: {X}, {Y} için bir öğretmen, bir ilham kaynağı ya da yeni bir dünya görüşü gibidir.",
    'gunes-10': "{X:in} Güneş'i {Y:in} 10. evinde: {X}, {Y:in} hedeflerini ve toplumdaki yerini destekler; ilişki görünür ve saygın olur.",
    'gunes-12': "{X:in} Güneş'i {Y:in} 12. evinde: {Y}, {X:i} sanki önceden tanıyormuş gibi hisseder; aranızda gizemli ve ruhsal bir bağ vardır.",
    'neptun-5': "{X:in} Neptün'ü {Y:in} 5. evinde: masalsı bir romantizm; {Y}, {X:in} yanında aşkı bir film gibi yaşar. Gerçekçi beklentiler önemlidir.",
    'neptun-7': "{X:in} Neptün'ü {Y:in} 7. evinde: {Y}, {X:i} ideal ve ruhsal bir partner olarak görebilir; idealleştirme ile gerçek arasındaki dengeye dikkat.",
    'saturn-4': "{X:in} Satürn'ü {Y:in} 4. evinde: {X}, {Y:in} ev ve aile hayatına düzen ve sorumluluk getirir; sağlam bir yuva kurmak mümkün ama ev ortamı zaman zaman ağırlaşabilir.",
    'saturn-7': "{X:in} Satürn'ü {Y:in} 7. evinde: bağlılık ve evlilik için ciddi bir gösterge; ilişki zamanla sınanır ve sağlamlaşır.",
    'saturn-10': "{X:in} Satürn'ü {Y:in} 10. evinde: {X}, {Y:in} kariyerine ve hedeflerine yapı kazandırır; birlikte uzun vadeli planlar yapmak kolaydır.",
  },

  // Gezegenin burcuna göre kısa ifade; {N} gezegenin sahibi
  burcIfadeleri: {
    gunes: {
      kalip: "{N:in} Güneş'i {burc}: {ifade} bir kişilik.",
      ifadeler: ['cesur, doğrudan ve öncü', 'sakin, sabırlı ve güven arayan', 'meraklı, konuşkan ve değişken', 'koruyucu, duygusal ve aile odaklı', 'cömert, gururlu ve ilgi isteyen', 'titiz, yardımsever ve ayrıntıcı', 'uyum arayan, zarif ve ilişki odaklı', 'yoğun, derin ve sadık', 'özgür, iyimser ve maceracı', 'ciddi, hırslı ve sorumluluk sahibi', 'bağımsız, özgün ve arkadaş canlısı', 'duyarlı, hayalperest ve şefkatli'],
    },
    ay: {
      kalip: "{N:in} Ay'ı {burc}; {N} {ifade}.",
      ifadeler: ['duygularını hızlı ve doğrudan yaşar, sabırsızdır', 'duygusal güven, süreklilik ve fiziksel yakınlık ister', 'duygularını konuşarak işler, çeşitlilik ister', 'derin bir duygusal bağ ve yuva hissi ister', 'görülmek, takdir edilmek ve sevgi gösterisi ister', 'sevgisini küçük hizmetlerle gösterir, düzen ister', 'uyum ve huzur ister, çatışmadan kaçınır', 'yoğun, sadık ve tam bir duygusal bağlılık ister', 'duygusal özgürlük ve neşe ister', 'duygularını kontrollü yaşar, güvenilirlik ister', 'duygusal alan ve arkadaşlık ister', 'şefkatli, sezgisel ve fedakârdır'],
    },
    merkur: {
      kalip: "{N:in} Merkür'ü {burc}; {N} {ifade}.",
      ifadeler: ['hızlı ve doğrudan konuşur', 'yavaş ama kararlı düşünür', 'çok yönlü ve esprilidir', 'duygularıyla düşünür, hafızası güçlüdür', 'etkileyici ve kendinden emin konuşur', 'analitik ve ayrıntıcıdır', 'diplomatik ve dengelidir', 'derinlemesine sorgular, sır tutar', 'açık sözlü ve felsefidir', 'ciddi ve sonuç odaklı düşünür', 'özgün ve yenilikçi fikirlidir', 'sezgiseldir, hayal gücü geniştir'],
    },
    venus: {
      kalip: "{N:in} Venüs'ü {burc}; {N} {ifade}.",
      ifadeler: ['sevgide heyecanı ve ilk adımı sever', 'sadakat, dokunma ve konfor ister', 'sohbet, flört ve çeşitlilik ister', 'şefkat ve korunmak ister', 'gösterişli bir romantizm ve hayranlık ister', 'sevgisini küçük ve somut ilgilerle gösterir', 'zarafet, denge ve romantik jestler ister', 'derinlik ve tam bağlılık ister', 'özgürlük ve birlikte macera ister', 'ciddiyet ve güvenilirlik ister', 'arkadaşlık ve bağımsızlık ister', 'koşulsuz, romantik ve fedakâr sever'],
    },
    mars: {
      kalip: "{N:in} Mars'ı {burc}; {N} arzusunu ve öfkesini {ifade} bir biçimde gösterir.",
      ifadeler: ['doğrudan ve ateşli', 'yavaş ama kararlı ve tensel', 'sözlü, hızlı ve oyunbaz', 'duygusal ve dolaylı', 'tutkulu ve gururlu', 'kontrollü ve özenli', 'nazik ve diplomatik', 'yoğun ve derin', 'maceracı ve kendiliğinden', 'disiplinli ve dayanıklı', 'sıra dışı ve bağımsız', 'romantik ve sezgisel'],
    },
  },

  // Element ve nitelik ilişkisi (aynı çift arasında açı yoksa kullanılır)
  burcCiftleri: {
    'gunes-gunes': 'Güneş burçlarınız',
    'ay-ay': 'Ay burçlarınız',
    'gunes-ay': '{X:in} Güneş burcu ile {Y:in} Ay burcu',
    'venus-mars': '{X:in} Venüs burcu ile {Y:in} Mars burcu',
    'venus-venus': 'Venüs burçlarınız',
    'merkur-merkur': 'Merkür burçlarınız',
    'mars-mars': 'Mars burçlarınız',
  },
  burcIliskileri: {
    0: 'aynı burçta ({b1}). Aynı elementi ve aynı niteliği paylaştığınız için tepkileriniz ve ihtiyaçlarınız çok benzer; birbirinizi ayna gibi görürsünüz.',
    4: 'aynı elementte ({e1}: {b1} ve {b2}). Aynı elementten burçlar birbirini zahmetsizce anlar; bu alanda aranızda doğal bir akış vardır.',
    2: 'uyumlu elementlerde ({e1} ve {e2}: {b1} ve {b2}). Bu iki element birbirini besler; bu alanda uyum kolay kurulur.',
    6: 'karşıt burçlarda ({b1} ve {b2}). Elementleriniz uyumlu, nitelikleriniz aynı ({n1}); birbirinizi tamamlarsınız ama zıt kutuplar olarak çekişebilirsiniz.',
    3: 'kare burçlarda ({b1} ve {b2}). İkisi de {n1} nitelikte ama elementleri uyumsuz ({e1} ve {e2}); ikiniz de kendi yolunuzda ısrar edebilirsiniz.',
    1: 'ortak element ya da nitelik paylaşmayan komşu burçlarda ({b1} ve {b2}). Bu alanda birbirinizi anlamak bilinçli çaba ister.',
    5: 'ortak element ya da nitelik paylaşmayan burçlarda ({b1} ve {b2}). Bu alanda birbirinizi anlamak bilinçli çaba ister.',
  },

  // Yüzde düzeyine göre giriş cümlesi: [yüksek (≥75), orta (55–74), düşük (<55)]
  bantlar: {
    tutku: ['Aranızdaki çekim çok güçlü.', 'Aranızda belirgin bir çekim var.', 'Fiziksel çekim bu ilişkinin ön plandaki yanı değil.'],
    baglanma: ['Duygusal bağınız çok güçlü.', 'Duygusal bağınız var ama emek istiyor.', 'Duygusal olarak birbirinizi anlamak zaman alabilir.'],
    iletisim: ['Zihinsel olarak çok iyi anlaşıyorsunuz.', 'İletişiminiz genel olarak iyi ama yanlış anlaşılmalara açık.', 'İletişim bu ilişkinin en çok emek isteyen alanlarından biri.'],
    romantizm: ['Romantizm haritalarınızın parlak yanlarından biri.', 'Aranızda şefkat var ama romantizm bilinçli beslenmeli.', 'Romantizm kendiliğinden gelişmiyor; birbirinizin sevgi dilini öğrenmeniz gerekiyor.'],
    guven: ['Bu ilişkinin uzun soluklu olma potansiyeli yüksek.', 'Kalıcılık için sağlam temeller var ama sınanacak alanlar da.', 'Güven zamanla ve emekle inşa edilmesi gereken bir konu.'],
    huzur: ['Aranızda huzur ağır basıyor; çatışmalar kolay çözülür.', 'Huzur ve çatışma dengeli; tartışmalar olur ama yönetilebilir.', 'Sürtüşme potansiyeli yüksek; tartışmaları yönetmeyi öğrenmek önemli.'],
    karmik: ['Aranızda güçlü bir karmik bağ var.', 'Aranızda belirgin bir kader teması var.', 'Karmik temalar bu ilişkide ön planda değil.'],
  },

  // Cinsiyete göre öne çıkan temas varsa yoruma eklenen not
  cinsiyetNotlari: {
    'ke-venus-mars': "Kadın ve erkek haritalarında kadının Venüs'ü ile erkeğin Mars'ı arasındaki temas çekimin en belirleyici göstergesi sayılır ve aranızda bu temas var.",
    'ke-gunes-ay': "Kadın ve erkek haritalarında erkeğin Güneş'i ile kadının Ay'ı arasındaki temas kalıcı birlikteliğin klasik göstergesidir ve aranızda bu temas var.",
    'kk-venus': 'İki kadın arasındaki ilişkide Venüs–Venüs teması çekimin ve sevginin temelini oluşturur ve aranızda bu temas var.',
    'kk-ay': 'İki kadın arasındaki ilişkide Ay temasları duygusal bağın temelini oluşturur ve aranızda bu temas var.',
    'ee-mars': 'İki erkek arasındaki ilişkide Mars temasları çekimin en belirleyici göstergesidir ve aranızda bu temas var.',
    'ee-gunes': 'İki erkek arasındaki ilişkide Güneş–Güneş teması karşılıklı saygının ve kalıcılığın temelini oluşturur ve aranızda bu temas var.',
  },

  bosBaslik: 'Bu başlıkta haritalarınız arasında belirgin bir temas yok. Bu alan ne özellikle kolay ne de özellikle zor; ilişkinin bu yanını ikinizin tercihleri belirler.',
};
