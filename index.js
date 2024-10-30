const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

const final2014 = fifaData.filter(mac => mac.Year === 2014 && mac['Stage'] === 'Final')[0];

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

	function Finaller(fifaData) {
    return fifaData.filter(mac => mac['Stage'] === 'Final');
};

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

	function Yillar(fifaData, callback) {
		const finalMaclari = callback(fifaData);
		const yillar = finalMaclari.map(mac => mac.Year);
		return yillar;
	}
	


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

	function Kazananlar(fifaData, callback) {
		const finalMaclari = callback(fifaData);
		const kazanan = [];
		for (let i = 0; i < finalMaclari.length; i++) {
			const mac = finalMaclari[i];
			if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
				kazanan.push(mac["Home Team Name"]);
			} else if (mac["Home Team Goals"] < mac["Away Team Goals"]) {
				kazanan.push(mac["Away Team Name"]);
			} else {
				kazanan.push("Beraberlik");
			}
		}
		return kazanan;	
	}
	
/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData, finallerCallback, yillarCallback, kazananlarCallback) {
    const finalMaclari = finallerCallback(fifaData);
    const yillar = yillarCallback(fifaData);
    const kazananlar = kazananlarCallback(fifaData);
    const sonuc = [];
    for (let i = 0; i < finalMaclari.length; i++) {
        sonuc.push(`${yillar[i]} yılında, ${kazananlar[i]} dünya kupasını kazandı!`);
    }
    return sonuc;
}

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
	let toplamGolSayisi = Finaller.reduce(
	  (toplamGol, mac) =>
		toplamGol + mac["Home Team Goals"] + mac["Away Team Goals"],
	  0
	);
	return (toplamGolSayisi / Finaller.length).toFixed(2);
  }

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data, ulkeKisaltma) {
	const kazananlar = Kazananlar(data, Finaller);
    const kazanmaSayilari = kazananlar.reduce((toplam, ulkeKisaltma) => {
        toplam[ulkeKisaltma] = (toplam[ulkeKisaltma] || 0) + 1;
        return toplam;
    }, {});
    return kazanmaSayilari;
}

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
	const finalMaclari = Finaller(data);
	const golSayilari = {};
    finalMaclari.forEach(mac => {
        const evSahibi = mac['Home Team Initials'];
        const evSahibiGolleri = mac['Home Team Goals'];
        golSayilari[evSahibi] = (golSayilari[evSahibi] || 0) + evSahibiGolleri;
        const deplasman = mac['Away Team Initials'];
        const deplasmanGolleri = mac['Away Team Goals'];
        golSayilari[deplasman] = (golSayilari[deplasman] || 0) + deplasmanGolleri;
    });
    let enCokGolAtanTakim = null;
    let enCokGol = 0;
    for (const [takim, gol] of Object.entries(golSayilari)) {
        if (gol > enCokGol) {
            enCokGol = gol;
            enCokGolAtanTakim = takim;
        }
    }
    return enCokGolAtanTakim;
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
    const finalMaclari = Finaller(data);
    const golYenenTakimlar = {};
    finalMaclari.forEach(mac => {
        const evSahibi = mac['Home Team Initials'];
        const deplasmanGolleri = mac['Away Team Goals'];
        golYenenTakimlar[evSahibi] = (golYenenTakimlar[evSahibi] || 0) + deplasmanGolleri;
        const deplasman = mac['Away Team Initials'];
        const evSahibiGolleri = mac['Home Team Goals'];
        golYenenTakimlar[deplasman] = (golYenenTakimlar[deplasman] || 0) + evSahibiGolleri;
    });
    let enKotuDefansTakim = null;
    let enKotuDefans = 0;
    for (const [takim, gol] of Object.entries(golYenenTakimlar)) {
        if (gol > enKotuDefans) {
            enKotuDefans = gol;
            enKotuDefansTakim = takim;
        }
    }

    return enKotuDefansTakim;
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}