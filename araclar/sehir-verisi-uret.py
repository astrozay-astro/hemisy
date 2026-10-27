# Dünya şehirleri veri dosyasını üretir: js/veri/dunya-sehirleri.js
# Kaynak: GeoNames cities15000.txt (https://download.geonames.org/export/dump/cities15000.zip, CC BY 4.0)
# Kullanım: python3 araclar/sehir-verisi-uret.py /yol/cities15000.txt
# Türkiye dışarıda bırakılır (Türkiye'nin 81 ili js/veri/sehirler.js içindedir).
# Seçilenler: başkentler, birinci düzey idari merkezler (eyalet/bölge/il merkezi) ve nüfusu 100.000'i aşan şehirler.
import json, sys

TURKCE_ADLAR = {
    'London': 'Londra', 'Munich': 'Münih', 'Vienna': 'Viyana', 'Cologne': 'Köln', 'Brussels': 'Brüksel',
    'The Hague': 'Lahey', 'Moscow': 'Moskova', 'Athens': 'Atina', 'Rome': 'Roma', 'Venice': 'Venedik',
    'Milan': 'Milano', 'Strasbourg': 'Strazburg', 'Copenhagen': 'Kopenhag', 'Prague': 'Prag', 'Warsaw': 'Varşova',
    'Geneva': 'Cenevre', 'Zurich': 'Zürih', 'Lisbon': 'Lizbon', 'Baku': 'Bakü', 'Tbilisi': 'Tiflis',
    'Tehran': 'Tahran', 'Damascus': 'Şam', 'Baghdad': 'Bağdat', 'Cairo': 'Kahire', 'Mecca': 'Mekke',
    'Medina': 'Medine', 'Jerusalem': 'Kudüs', 'Beijing': 'Pekin', 'Sofia': 'Sofya', 'Bucharest': 'Bükreş',
    'Belgrade': 'Belgrad', 'Skopje': 'Üsküp', 'Thessaloniki': 'Selanik', 'Nicosia': 'Lefkoşa', 'Kyrenia': 'Girne',
    'Famagusta': 'Gazimağusa', 'Alexandria': 'İskenderiye', 'Tashkent': 'Taşkent', 'Ashgabat': 'Aşkabat',
    'Bishkek': 'Bişkek', 'Kyiv': 'Kiev', 'Nuremberg': 'Nürnberg', 'Florence': 'Floransa', 'Naples': 'Napoli',
    'Seville': 'Sevilla', 'Mosul': 'Musul', 'Aleppo': 'Halep', 'Beirut': 'Beyrut', 'Amman': 'Amman',
    'Saint Petersburg': 'St. Petersburg', 'Kazan': 'Kazan', 'Tirana': 'Tiran', 'Sarajevo': 'Saraybosna',
    'Thessaloníki': 'Selanik', 'Hanover': 'Hannover', 'Gothenburg': 'Göteborg', 'Tunis': 'Tunus',
    'Algiers': 'Cezayir', 'Tripoli': 'Trablus', 'Kabul': 'Kabil', 'Islamabad': 'İslamabad', 'Doha': 'Doha',
    'Riyadh': 'Riyad', 'Jeddah': 'Cidde', 'Kuwait City': 'Kuveyt', 'Batumi': 'Batum', 'Plovdiv': 'Filibe',
    'Komotini': 'Gümülcine', 'Xanthi': 'İskeçe', 'Edessa': 'Vodina', 'Shkodër': 'İşkodra', 'Prizren': 'Prizren',
    'Pristina': 'Priştine', 'Chisinau': 'Kişinev', 'Budapest': 'Budapeşte', 'Krakow': 'Krakov', 'Tokyo': 'Tokyo',
}

satirlar, bolgeler = [], []
bolge_no = {}
for satir in open(sys.argv[1], encoding='utf-8'):
    a = satir.rstrip('\n').split('\t')
    ad, ulke, kod, nufus, bolge = a[1], a[8], a[7], int(a[14] or 0), a[17]
    if ulke == 'TR' or not bolge:
        continue
    # Şehir semtleri (PPLX) alınmaz; yalnızca şehirler
    if kod == 'PPLX' or not (kod in ('PPLC', 'PPLA') or nufus >= 100000):
        continue
    if bolge not in bolge_no:
        bolge_no[bolge] = len(bolgeler)
        bolgeler.append(bolge)
    satirlar.append([ad, a[2], ulke, round(float(a[4]), 3), round(float(a[5]), 3), bolge_no[bolge], nufus])

# Türkçe ad yalnızca o addaki en kalabalık şehre verilir (Londra = İngiltere'deki London, Kanada'daki değil)
satirlar.sort(key=lambda s: -s[6])
verilen = set()
for s in satirlar:
    ad, ascii_ad = s[0], s[1]
    takma = TURKCE_ADLAR.get(ad) or TURKCE_ADLAR.get(ascii_ad) or ''
    if takma and takma != ad and takma not in verilen:
        s[1] = takma
        verilen.add(takma)
    else:
        s[1] = ''
cikti = (
    '// Dünya şehirleri (Türkiye hariç): [ad, Türkçe adı, ülke kodu, enlem, boylam, saat dilimi no, nüfus]\n'
    '// Kaynak: GeoNames (CC BY 4.0). Üretmek için: python3 araclar/sehir-verisi-uret.py cities15000.txt\n'
    'window.ASTROSHIP_DUNYA = {\n  bolgeler: ' + json.dumps(bolgeler, ensure_ascii=False) + ',\n'
    '  sehirler: ' + json.dumps(satirlar, ensure_ascii=False, separators=(',', ':')) + ',\n};\n'
)
open('js/veri/dunya-sehirleri.js', 'w', encoding='utf-8').write(cikti)
print(len(satirlar), 'şehir,', len(bolgeler), 'saat dilimi,', len(cikti) // 1024, 'KB')
