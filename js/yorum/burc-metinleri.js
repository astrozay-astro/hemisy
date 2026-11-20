// Burç yorumlarının metinleri. Evler burcun kendisinden sayılır: burç 1. ev, sonraki burç 2. ev …
// Ev dizileri 1. evden 12. eve sıralıdır. Yorumlar olasılık diliyle yazılır, noktalı virgül kullanılmaz.
// Arka plan bilgisi (gezegenin burç değiştirmesi, retro) kesin dille verilir.
window.ASTROSHIP_BURC_METINLERI = {
  donemler: {
    gunluk: { ad: 'Günlük', baslik: 'Günlük Yorum', etiket: 'Günlük burç yorumu' },
    haftalik: { ad: 'Haftalık', baslik: 'Haftalık Yorum', etiket: 'Haftalık burç yorumu' },
    aylik: { ad: 'Aylık', baslik: 'Aylık Yorum', etiket: 'Aylık burç yorumu' },
  },
  basliklar: {
    hava: 'Günün havası',
    tema: 'Dönemin teması',
    ay: 'Duygusal akış',
    evre: 'Yeniay ve dolunay',
    ask: 'Aşk',
    is: 'İş ve iletişim',
    enerji: 'Enerji',
    uzun: 'Uzun vadede',
    acilar: 'Öne çıkan günler',
    not: "Tuğçenur Özay'ın notu",
  },

  // ----- Ay'ın evi (günlük): iki çeşit, günden güne değişir -----
  ayEv: [
    ['Bugün duygularınız kendi ihtiyaçlarınıza dönüyor. Kendinize zaman ayırmak, görünüşünüze ve enerjinize özen göstermek iyi gelebilir.', 'Gün sizi öne çıkarıyor gibi görünüyor. İçinizden gelen ilk adımı atmak ve kendinizi ifade etmek için uygun bir hava var.'],
    ['Bugün güvende hissetmek ve somut şeylerle uğraşmak ön planda olabilir. Bütçenizi gözden geçirmek ya da kendinize küçük bir keyif hediye etmek iyi gelebilir.', 'Para, alışveriş ve değer verdiğiniz şeyler gündeme gelebilir. Acele harcamalar yerine sizi gerçekten mutlu edecek seçimlere yönelmek önemli olabilir.'],
    ['Bugün telefonlar, mesajlar ve kısa görüşmelerle hareketli bir gün olabilir. Merak ettiğiniz bir konuyu araştırmak ya da bir kardeşinizle konuşmak iyi gelebilir.', 'Zihniniz canlı ve konuşkan bir gündesiniz. Kısa bir yolculuk, yakın çevrede bir buluşma ya da yazışmalar günü renklendirebilir.'],
    ['Bugün evinize, ailenize ve iç dünyanıza dönme isteği artabilir. Sakin bir akşam, ev yemeği ya da sevdiklerinizle sohbet size iyi gelebilir.', 'Aile konuları ve evle ilgili işler gündeme gelebilir. Kendinizi güvende hissettiğiniz yerde kalmak bugün daha cazip görünebilir.'],
    ['Bugün kalbiniz eğlenceye, flörte ve yaratıcılığa açık olabilir. Sevdiğiniz bir hobiye zaman ayırmak ya da küçük bir kaçamak planlamak iyi gelebilir.', 'Neşe ve romantizm günün havasına karışabilir. Kendinizi ifade ettiğiniz, ışığın üzerinizde olduğunu hissettiğiniz anlar keyif verebilir.'],
    ['Bugün yapılacaklar listesi, iş ve gündelik düzen öne çıkabilir. Ertelediğiniz küçük işleri bitirmek ve bedeninize özen göstermek iyi gelebilir.', 'Verimli ve düzenli bir gün olabilir. Sağlığınıza, beslenmenize ve iş arkadaşlarınızla ilişkilerinize dikkat etmek önemli olabilir.'],
    ['Bugün ilişkiler ve birebir görüşmeler ön planda olabilir. Partnerinizle ya da bir ortağınızla açık bir konuşma bağınızı güçlendirebilir.', 'Başkalarının ihtiyaçlarına daha duyarlı olduğunuz bir gün olabilir. İş birlikleri, buluşmalar ve ortak kararlar gündeme gelebilir.'],
    ['Bugün duygular derinleşebilir ve yüzeyde olanın altını görmek isteyebilirsiniz. Ortak paralar, güven ve mahremiyet konuları gündeme gelebilir.', 'Yoğun ama dönüştürücü bir gün olabilir. Bırakmanız gereken bir duyguyla yüzleşmek size iyi gelebilir.'],
    ['Bugün ufkunuzu genişletme isteği artabilir. Bir yolculuk planı, yeni bir şey öğrenmek ya da farklı bir bakış açısı size ilham verebilir.', 'Gün sizi rutinin dışına çıkarmak isteyebilir. Uzaklardan gelen bir haber, bir eğitim ya da felsefi bir sohbet gündeme gelebilir.'],
    ['Bugün kariyeriniz ve hedefleriniz ön planda olabilir. Yöneticilerinizle görüşmeler ya da görünür olduğunuz işler önem kazanabilir.', 'Sorumluluklarınızın ağırlık kazandığı bir gün olabilir. Emeğinizin fark edilmesi için uygun bir hava var.'],
    ['Bugün arkadaşlarınız ve sosyal çevreniz ön planda olabilir. Bir grup buluşması ya da ortak bir hayal üzerine konuşmak size iyi gelebilir.', 'Gelecek planları ve dilekleriniz gündeme gelebilir. Arkadaşlarınızın desteğini hissettiğiniz bir gün olabilir.'],
    ['Bugün içe dönmek, dinlenmek ve kendinizle baş başa kalmak isteyebilirsiniz. Erken uyumak, meditasyon ya da sessiz bir akşam size iyi gelebilir.', 'Sezgilerinizin güçlü ama enerjinizin düşük olabileceği bir gün. Büyük kararları ertelemek ve ruhunuzu dinlendirmek önemli olabilir.'],
  ],
  // Ay'ın evinin kısa adı (haftalık akış ve gün içi geçiş)
  ayKisa: ['kendinize odaklanma', 'para ve güven', 'iletişim ve yakın çevre', 'ev ve aile', 'aşk ve eğlence', 'iş ve sağlık', 'ilişkiler ve ortaklıklar', 'derin duygular ve ortak kaynaklar', 'yolculuklar ve yeni fikirler', 'kariyer ve hedefler', 'arkadaşlar ve gelecek planları', 'dinlenme ve iç dünya'],
  ayGecis: 'Saat {saat} itibarıyla ilginiz {konu} konularına kayıyor.',
  ayAkisBasi: 'Hafta {konu} temasıyla başlıyor.',
  ayAkisGecis: '{Gun} gününden itibaren {konu} öne çıkıyor.',

  // ----- Güneş'in evi: dönemin ana teması -----
  gunesEv: [
    'Bu dönem ışık doğrudan sizin üzerinizde. Yeni bir sayfa açmak, görünüşünüzü yenilemek ve kendinizi ortaya koymak için güçlü bir zaman olabilir.',
    'Bu dönem para, kazanç ve öz değer konuları ön plana çıkıyor. Gelirlerinizi düzenlemek ve yeteneklerinizi değere dönüştürmek için uygun bir zaman olabilir.',
    'Bu dönem iletişim, yazışmalar ve yakın çevreniz hareketleniyor. Kısa yolculuklar, eğitimler ve kardeşlerle ilgili konular gündeme gelebilir.',
    'Bu dönem ev, aile ve kökleriniz ön plana çıkıyor. Evle ilgili düzenlemeler, aile buluşmaları ve iç dünyanızı dinlemek önem kazanabilir.',
    'Bu dönem aşk, keyif ve yaratıcılık parlıyor. Flört, hobiler, çocuklarla ilgili konular ve kalbinizi ısıtan uğraşlar ön plana çıkabilir.',
    'Bu dönem iş düzeni, sağlık ve günlük rutinler ön planda. Hayatınızı sadeleştirmek, sağlığınıza yatırım yapmak ve işlerinizi toparlamak için uygun bir zaman olabilir.',
    'Bu dönem ilişkiler ve ortaklıklar ön plana çıkıyor. Partnerinizle bağınız, iş birlikleri ve anlaşmalar gündeminizin merkezinde olabilir.',
    'Bu dönem derin duygular, ortak paralar ve dönüşüm konuları öne çıkıyor. Borçlar, krediler ve mahremiyetle ilgili konular gündeme gelebilir.',
    'Bu dönem ufkunuz genişliyor. Yolculuklar, eğitim, yurt dışıyla bağlantılı işler ve hayata dair büyük sorular ön plana çıkabilir.',
    'Bu dönem kariyeriniz ve toplumdaki yeriniz ön planda. Emeğinizin görünür olduğu, hedeflerinize doğru önemli adımlar atabileceğiniz bir zaman olabilir.',
    'Bu dönem arkadaşlarınız, sosyal çevreniz ve gelecek planlarınız ön plana çıkıyor. Gruplar, topluluklar ve ortak hayaller size ilham verebilir.',
    'Bu dönem içe dönmek, dinlenmek ve geride bırakılması gerekenleri temizlemek için uygun. Yeni bir döngüye girmeden önce enerjinizi toplamanız önemli olabilir.',
  ],
  gunesGecis: '{tarih} itibarıyla tema değişiyor.',

  // ----- Venüs'ün evi: aşk -----
  venusEv: [
    'Çekiciliğiniz artıyor ve insanlar size daha kolay yaklaşıyor gibi görünüyor. Kendinize özen göstermek ve sevgiyi kabul etmek için güzel bir zaman.',
    'Aşkta güven ve somut jestler önem kazanıyor. Sevdiklerinize küçük hediyeler ya da birlikte keyifli bir yemek bağınızı güçlendirebilir.',
    'Aşk tatlı sözlerle, mesajlarla ve sohbetle besleniyor. Yakın çevrenizden biriyle ya da kısa bir yolculukta güzel bir yakınlık doğabilir.',
    'Aşkta huzur ve yuva hissi ön planda. Evde baş başa geçirilen zamanlar ve aileyle ilgili güzel anlar kalbinizi ısıtabilir.',
    'Aşk hayatınız canlanıyor gibi görünüyor. Flört, romantik buluşmalar ve eğlenceli anlar için çok uygun bir dönem.',
    'Aşk gündelik ilgilerde ve küçük jestlerde saklı. İş ortamında ya da günlük rutinlerinizde hoş bir yakınlık doğabilir.',
    'İlişkiler için çok uyumlu bir dönem. Var olan bağınızı derinleştirmek ya da yeni ve ciddi bir ilişkiye adım atmak için kapılar aralanabilir.',
    'Aşk derinleşiyor ve yoğunlaşıyor. Güven ve tutku konuları ön planda, yüzeysel ilişkiler size yetmeyebilir.',
    'Aşkta macera ve yenilik arayışı var. Farklı bir kültürden biri ya da bir yolculuk kalbinizi heyecanlandırabilir.',
    'Aşk ile kariyer iç içe geçebilir. İş çevrenizde dikkat çekebilir, statü sahibi biri ilginizi çekebilir.',
    'Arkadaşlıklar sıcaklaşıyor. Bir arkadaş ortamında tanıştığınız ya da önce dostunuz olan biriyle yakınlık artabilir.',
    'Aşk biraz gizli ve içe dönük yaşanıyor. Geçmişten biri aklınıza gelebilir ya da kalbinizi kimseyle paylaşmadan büyütebilirsiniz.',
  ],

  // ----- Merkür'ün evi: iletişim ve iş -----
  merkurEv: [
    'Fikirlerinizi açıkça ifade etmek ve kendinizi anlatmak kolaylaşıyor. Yeni planlar yapmak için zihniniz hazır görünüyor.',
    'Para konusunda net düşünmek, bütçe yapmak ve kazanç fikirlerini değerlendirmek için uygun bir dönem.',
    'Zihniniz çok hareketli. Yazışmalar, telefonlar, kurslar ve kısa yolculuklar gündeminizi doldurabilir.',
    'Aileyle önemli konuşmalar, evle ilgili kararlar ya da evden yürütülen işler ön plana çıkabilir.',
    'Yaratıcı fikirler ve eğlenceli sohbetler öne çıkıyor. Bir hobiye ya da sanatsal bir projeye zihninizi vermek iyi gelebilir.',
    'İşlerinizi düzene sokmak, detayları toparlamak ve verimli çalışmak için çok uygun bir dönem.',
    'Anlaşmalar, sözleşmeler ve birebir görüşmeler ön planda. Ortaklarınızla açık iletişim önemli olabilir.',
    'Derin araştırmalar, finansal belgeler ve gizli kalan konuları çözmek için zihniniz keskin görünüyor.',
    'Eğitim, yayınlar, yurt dışı bağlantıları ve resmî işlemler gündeme gelebilir. Öğrenmek için çok uygun bir dönem.',
    'Kariyerinizle ilgili görüşmeler, sunumlar ve önemli kararlar ön planda olabilir.',
    'Arkadaşlarınızla fikir alışverişi, grup projeleri ve sosyal medya hareketli olabilir.',
    'Zihniniz içe dönük. Planları gözden geçirmek, yazmak ve sessizce düşünmek için uygun bir dönem.',
  ],

  // ----- Mars'ın evi: enerji -----
  marsEv: [
    'Enerjiniz yüksek ve harekete geçme isteğiniz güçlü. Spor ve yeni başlangıçlar için iyi bir dönem, ama sabırsızlığa dikkat etmek önemli olabilir.',
    'Para kazanmak için daha fazla çaba gösterebilirsiniz. Ani harcamalara karşı dikkatli olmak iyi gelebilir.',
    'Sözleriniz keskinleşebilir. Tartışmalarda sakin kalmak ve trafikte dikkatli olmak önemli olabilir.',
    'Evde tadilat, taşınma ya da aile içi hareketlilik gündeme gelebilir. Evdeki gerginlikleri yumuşatmak önemli olabilir.',
    'Tutku ve yaratıcı enerji yükseliyor. Spor, hobiler ve aşkta cesur adımlar için uygun bir dönem.',
    'İş temponuz artıyor. Çok çalışabilirsiniz, ama dinlenmeyi ve sağlığınızı ihmal etmemek önemli olabilir.',
    'İlişkilerde hararetli tartışmalar ya da güçlü bir çekim yaşanabilir. Rekabet yerine iş birliğini seçmek iyi gelebilir.',
    'Ortak paralar ve güç dengeleri konusunda gerginlikler doğabilir. Tutkulu ve dönüştürücü bir enerji var.',
    'Yolculuklar, eğitim ve inançlarınız için harekete geçebilirsiniz. Fikir tartışmalarında aşırıya kaçmamak önemli olabilir.',
    'Kariyerinizde hırs ve mücadele enerjiniz yüksek. Hedeflerinize doğru cesur adımlar atabilirsiniz.',
    'Arkadaş gruplarında liderlik edebilir ya da ortak projelerde öne çıkabilirsiniz. Gruplardaki çekişmelere dikkat etmek önemli olabilir.',
    'Enerjiniz biraz düşebilir ya da öfkenizi içinize atabilirsiniz. Perde arkasında çalışmak ve dinlenmek iyi gelebilir.',
  ],

  // ----- Jüpiter ve Satürn: uzun vadeli tablo -----
  jupiterEv: [
    'Şans sizin yanınızda. Kendinize güvenmek ve yeni fırsatları kucaklamak için bereketli bir yıl olabilir.',
    'Kazanç ve maddi büyüme öne çıkıyor. Yeteneklerinizi paraya çevirmek için kapılar açılabilir.',
    'Eğitim, yazı, iletişim ve yakın çevreyle ilgili fırsatlar büyüyor.',
    'Ev, aile ve mülk konularında bereket var. Taşınma ya da evinizi büyütme gündeme gelebilir.',
    'Aşk, yaratıcılık ve çocuklarla ilgili konularda şans yanınızda.',
    'İş hayatınızda ve sağlığınızda olumlu gelişmeler, yeni iş fırsatları gündeme gelebilir.',
    'İlişkiler ve ortaklıklar bereketli. Evlilik ya da önemli bir iş birliği gündeme gelebilir.',
    'Ortak kaynaklar, miras ya da yatırımlar üzerinden destek gelebilir.',
    'Yolculuklar, yüksek eğitim ve yurt dışı bağlantıları için şanslı bir dönemdesiniz.',
    'Kariyerinizde yükseliş ve tanınırlık için güçlü fırsatlar var.',
    'Arkadaşlarınız ve sosyal çevreniz üzerinden şans geliyor, dilekleriniz gerçeğe yaklaşabilir.',
    'Ruhsal gelişim, şifa ve içsel huzur için koruyucu bir enerji var.',
  ],
  saturnEv: [
    'Kendinizi yeniden yapılandırdığınız, olgunlaştığınız bir dönemdesiniz. Sabır ve disiplin size kalıcı sonuçlar getirebilir.',
    'Maddi konularda tasarruf ve sağlam bir düzen kurmak önem kazanıyor.',
    'İletişimde sorumluluk, eğitimde ciddiyet ve kardeşlerle ilgili konular sınav niteliği taşıyabilir.',
    'Ev ve aile sorumlulukları ağırlık kazanıyor. Sağlam temeller kurmak için çalışıyorsunuz.',
    'Aşkta ve yaratıcılıkta ciddiyet öne çıkıyor. Kalıcı bağlar ve emek isteyen projeler gündemde.',
    'İş düzeni ve sağlık konusunda disiplin önem kazanıyor.',
    'İlişkilerinizde ciddiyet ve bağlılık sınanıyor. Kalıcı olan bağlar güçlenebilir.',
    'Borçlar, ortak paralar ve derin konularda sorumluluk almanız gerekebilir.',
    'İnançlarınızı, eğitiminizi ve hayat felsefenizi sağlam bir zemine oturtuyorsunuz.',
    'Kariyerinizde emeğinizin karşılığını alacağınız, sorumluluklarınızın arttığı bir dönemdesiniz.',
    'Arkadaşlıklarınız ve hedefleriniz süzgeçten geçiyor, kalıcı olanlar güçleniyor.',
    'Eski yükleri bırakmak ve içsel olarak yeni bir döngüye hazırlanmak önem kazanıyor.',
  ],

  // ----- Yeniay ve dolunay: "{tarih} yeniayı …" diye başlar -----
  yeniayEv: [
    'yeni bir başlangıç için güçlü bir niyet anı. Kendinizle ilgili bir karar almak ya da yeni bir görünüme adım atmak için çok uygun.',
    'maddi bir başlangıç için uygun. Yeni bir gelir kaynağı, birikim planı ya da öz değerinizi güçlendiren bir niyet tutabilirsiniz.',
    'yeni bir eğitim, yazı projesi ya da önemli bir konuşma için uygun bir başlangıç anı.',
    'ev ve aile için yeni bir sayfa. Taşınma, ev düzenlemesi ya da aileyle yeni bir başlangıç gündeme gelebilir.',
    'aşk ve yaratıcılık için yeni bir başlangıç. Yeni bir flört, bir hobi ya da kalbinizi ısıtan bir proje başlayabilir.',
    'sağlıklı bir rutin, yeni bir iş düzeni ya da beslenme alışkanlığı için niyet tutmaya uygun.',
    'ilişkilerde yeni bir sayfa. Yeni bir ilişki, ortaklık ya da var olan bağda yeni bir başlangıç gündeme gelebilir.',
    'derin bir dönüşüm için niyet anı. Ortak finanslar, borçlar ya da bırakmak istediğiniz bir duygu için yeni bir başlangıç.',
    'yolculuk, eğitim ya da yurt dışıyla ilgili yeni bir başlangıç için uygun.',
    'kariyerinizde yeni bir hedef koymak için çok güçlü bir an.',
    'arkadaşlıklar ve gelecek hayalleri için yeni bir sayfa. Bir topluluğa katılmak ya da büyük bir dilek tutmak için uygun.',
    'içsel bir arınma ve ruhsal yenilenme anı. Geride bırakmak istediklerinizle vedalaşmak için uygun.',
  ],
  dolunayEv: [
    'kendinizle ilgili bir konuyu tamamlama ve görünür olma anı. İlişkilerle kendi ihtiyaçlarınız arasında denge kurmak önemli olabilir.',
    'maddi bir konunun sonuçlandığı ya da değerinizi fark ettiğiniz bir an olabilir.',
    'bir haberin, bir konuşmanın ya da bir eğitim sürecinin sonuçlandığı bir an olabilir.',
    'ev, aile ve kariyer arasındaki dengeyi sorgulayabileceğiniz duygusal bir an olabilir.',
    'aşkta ya da yaratıcı bir projede duyguların zirveye çıktığı bir an olabilir.',
    'iş yükünüz ya da sağlığınızla ilgili bir konunun netleştiği bir an olabilir.',
    'bir ilişkide duyguların açığa çıktığı, önemli bir kararın verilebileceği bir an olabilir.',
    'ortak paralar, güven ya da bir bağın derinliğiyle ilgili gerçeklerin ortaya çıktığı yoğun bir an olabilir.',
    'bir yolculuğun, eğitimin ya da bir inancın sonuçlandığı, ufkunuzun aydınlandığı bir an olabilir.',
    'kariyerinizde emeğinizin görünür olduğu ya da bir hedefin tamamlandığı bir an olabilir.',
    'arkadaşlıklarda ya da bir dileğinizde sonuca ulaşılan, sosyal çevrenizin hareketlendiği bir an olabilir.',
    'içsel bir aydınlanma ve bırakma anı. Uzun süredir taşıdığınız bir duyguyu geride bırakabilirsiniz.',
  ],
  yeniayKalip: '{tarih} yeniayı {metin}',
  dolunayKalip: '{tarih} dolunayı {metin}',
  tutulma: {
    gunes: 'Bu yeniay aynı zamanda bir Güneş tutulması. Etkisi aylarca sürebilecek kadersel bir başlangıç anlamı taşıyor.',
    ay: 'Bu dolunay aynı zamanda bir Ay tutulması. Ani sonlanmalar ve önemli dönüm noktaları gündeme gelebilir.',
  },

  // ----- Retro ve düz duruşlar ({alan}: gezegenin bulunduğu evin kısa adı) -----
  retro: {
    merkur: {
      geri: 'Merkür geri hareketi boyunca iletişimde aksaklıklar, gecikmeler ve geçmişten dönen konular olabilir. Özellikle {alan} alanınızda yeni imzalar yerine gözden geçirmeye öncelik vermek iyi gelebilir.',
      duz: 'Merkür düzeliyor ve askıda kalan konular yeniden hareketlenmeye başlıyor.',
    },
    venus: {
      geri: 'Venüs geri hareketi aşkta ve parada geçmişi gözden geçirmeye çağırıyor. Eski bir ilişkinin gündeme gelmesi ya da {alan} alanınızdaki değerlerinizi sorgulamanız olası.',
      duz: 'Venüs düzeliyor ve aşk ile para konularında netlik geri geliyor.',
    },
    mars: {
      geri: 'Mars geri hareketi enerjinizi içe çeviriyor. {Alan} alanınızda yeni mücadelelere girmek yerine yarım kalan işleri tamamlamak iyi gelebilir.',
      duz: 'Mars düzeliyor ve enerjiniz ile motivasyonunuz yeniden yükseliyor.',
    },
    jupiter: {
      geri: 'Jüpiter geri hareketinde büyüme içsel bir hal alıyor. {Alan} alanınızdaki fırsatları sindirmek ve gözden geçirmek için bir zaman.',
      duz: 'Jüpiter düzeliyor ve fırsatlar yeniden dışarıya doğru açılıyor.',
    },
    saturn: {
      geri: 'Satürn geri hareketinde {alan} alanınızdaki sorumlulukları gözden geçirme zamanı.',
      duz: 'Satürn düzeliyor ve kurduğunuz yapılar yeniden ilerlemeye başlıyor.',
    },
  },

  // ----- Gezegenler arası tam açılar ({tema}: iki gezegenin ortak teması, {alan}: hızlı gezegenin evi) -----
  aci: {
    u: '{tema} konusunda işlerin kolaylaştığı, desteğin geldiği bir an olabilir.',
    g: '{tema} konusunda gerginlik ve sabırsızlık öne çıkabilir, acele kararlardan kaçınmak iyi gelebilir.',
    k: '{tema} konusunda enerji yoğunlaşıyor, yeni bir başlangıç için güçlü bir an olabilir.',
  },
  // Ay'ın gün içindeki açıları
  ayAci: {
    u: '{Zaman} {tema} konusunda içinizin rahatladığı, işlerin kendiliğinden yoluna girdiği anlar yaşanabilir.',
    g: '{Zaman} {tema} konusunda küçük gerginlikler hissedilebilir, tepki vermeden önce bir nefes almak iyi gelebilir.',
    k: '{Zaman} {tema} konusunda duygular yoğunlaşıyor ve daha belirgin hale gelebilir.',
  },
  zamanlar: ['Gece saatlerinde', 'Sabah saatlerinde', 'Öğleden sonra', 'Akşam saatlerinde'],

  // Önemli günler listesindeki olay adları
  olay: {
    gecis: '{Gezegen} {Burc} burcuna geçiyor',
    geri: '{Gezegen} geri harekete başlıyor',
    duz: '{Gezegen} düz harekete dönüyor',
    evre: ['Yeniay', 'İlk dördün', 'Dolunay', 'Son dördün'],
    evreKalip: '{Evre}, {Burc} burcunda',
    tutulma: { gunes: 'Güneş tutulması, {Burc} burcunda', ay: 'Ay tutulması, {Burc} burcunda' },
    aci: '{A} ile {B} {aci}',
    aciAdlari: { kavusum: 'kavuşuyor', altmislik: 'altmışlık açıda', kare: 'kare açıda', ucgen: 'üçgen açıda', karsit: 'karşıt' },
  },

  // Ana sayfa: Ay o burçtayken neye uygun
  ayBurcNotu: [
    'enerji yüksek. Yeni işlere başlamak, spor ve cesaret isteyen adımlar için uygun.',
    'alışveriş, güzellik, keyifli yemekler ve maddi kararlar için uygun.',
    'yazışmalar, görüşmeler, kısa yolculuklar ve yeni bilgiler için uygun.',
    'ev, aile, yemek ve duygusal bağlar için uygun.',
    'eğlence, flört, yaratıcılık ve kendinizi göstermek için uygun.',
    'düzen, temizlik, sağlık kontrolleri ve detaylı işler için uygun.',
    'buluşmalar, anlaşmalar, estetik ve ilişkiler için uygun.',
    'derin konuşmalar, araştırma, finansal işler ve arınma için uygun.',
    'yolculuk, eğitim, yeni fikirler ve keşifler için uygun.',
    'kariyer adımları, planlama ve resmî işler için uygun.',
    'arkadaşlar, gruplar, yenilikler ve sürprizler için uygun.',
    'dinlenme, sanat, sezgi ve ruhsal çalışmalar için uygun.',
  ],

  // Güneş burçlarının yaklaşık tarih aralıkları (yıla göre bir gün kayabilir)
  burcTarihleri: ['21 Mart – 19 Nisan', '20 Nisan – 20 Mayıs', '21 Mayıs – 20 Haziran', '21 Haziran – 22 Temmuz', '23 Temmuz – 22 Ağustos', '23 Ağustos – 22 Eylül', '23 Eylül – 22 Ekim', '23 Ekim – 21 Kasım', '22 Kasım – 21 Aralık', '22 Aralık – 19 Ocak', '20 Ocak – 18 Şubat', '19 Şubat – 20 Mart'],

  yukselenNotu: 'Burç yorumunuzu hem Güneş burcunuza hem de Yükselen burcunuza göre okumanızı öneririm. Yükselen burcunuzun yorumu çoğu zaman gündelik olaylarla daha çok örtüşür.',
};
