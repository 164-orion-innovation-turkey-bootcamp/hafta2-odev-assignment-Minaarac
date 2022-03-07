// input girebilmek için packet "npm i -s console-read-write"
const input = require("console-read-write"); 

// hamburger içinde olması istenilen malzemeler seçilebilir.
let materialList = [
  "pickle", 
  "onion", 
  "lettuce", 
  "tomato"
]; 

let meat = ""; //meat değişkeni köfte ve tavuk seçiminde kullanılıyor.
let howCooked = ""; //pişme dereceleri
let additional = ""; //Stokta bulunan malzemeler arasından seçim yapılacak.

// malzeme listesi ve her birinden 5 adet bulunuyor.
//listede herhangi biri 0 olduğunda stok hatası verecek.
let stocks = {
  lettuce: 5,
  pickle: 5,
  packetSauce: 5,
  onion: 5,
  meatball: 5,
  chicken: 5,
  tomato: 5,
  hamburgerBread: 5,
  potato: 5,
  coke: 5,
};

function checkStocks(stocks) { //stoktaki ürünlerin olup olmadığı kontrolü yapılıyor
  return Object.values(stocks).every((element) => element > 0); // Yani ürünler 1 ve üzeri sayıda ise hata vermeyecek.
}

async function order(time, work) { // ana sipariş fonksiyonu oluşturuldu, burada geçen zaman ve yapılan iş parametleri kullanıldı.
  return new Promise((resolve, reject) => { // resolve ve reject iş ile ilgili gelişen durum kontrolü için kullanılıyor.
      //hata kontrolü yok bu sebekle rejecte gerek duyulmuyor.
      setTimeout(() => { 
          resolve(work());
      }, time);
  });
}

//Stok ve malzemeler belirlendikten sonra tavuk ya da köfte burger seçimi için şu işlemler uygulanıyor:
let chickenBurger = async function () { //Eğer sipariş tavuk ise yapılacak işlemler.

  order(1000, () => {
    console.log("Sipariş alındı.. Hazırlanıyor..");
  });
  return Promise.all([
    order(3000, () => {
      console.log("Tavuk burger hazır");
    }),
    order(2000, () => {
      console.log(`${additional} eklendi`);
    }),
    order(5000, () => {
      console.log("Patates kızartıldı");
    }),
    order(2000, () => {
      console.log("İçecek hazırlandı");
    }),
  ]);
};

let forMeatball = async function () {
  //Eğer sipariş köfte ise köfte nasıl olsun diye koşul sunulacak.
  //If bloklarında az-orta ve çok pişme durumuna göre koşullar ayarlandı.
  if (howCooked === "az") {
    order(1000, () => {
      //order fonksiyonu (sipariş fonk ile async)
      console.log("Sipariş alındı.. Hazırlanıyor..");
    });
    return Promise.all([
      order(2000, () => {
        console.log("Az pişmiş köfte burger hazır.");
      }),
      order(2000, () => {
        console.log(`${additional} eklendi`);
      }),
      order(5000, () => {
        console.log("Patates kızartıldı");
      }),
      order(2000, () => {
        console.log("İçecek hazırlandı");
      }),
    ]);
  }

  if (howCooked === "orta") {
    return Promise.all([
      order(3000, () => {
        console.log("Orta pişmiş köfte burger hazır.");
      }),
      order(2000, () => {
        console.log(`${additional} eklendi`);
      }),
      order(5000, () => {
        console.log("Patates kızartıldı");
      }),
      order(2000, () => {
        console.log("İçecek hazırlandı");
      }),
    ]);
  }

  if (howCooked === "cok") {
    return Promise.all([
      order(4000, () => {
        console.log("Çok pişmiş köfte burger hazır.");
      }),
      order(2000, () => {
        console.log(`${additional} eklendi`);
      }),
      order(5000, () => {
        console.log("Patates kızartıldı");
      }),
      order(2000, () => {
        console.log("İçecek hazırlandı");
      }),
    ]);
  }
};

order(1000, () => console.log("Hoşgeldiniz"))
    .then(() => {
        return order(1000, () => {
            console.log(`\nEklemek istediğiniz malzemeleri seçiniz\n${materialList}`);
        });
    })
    .then(async () => {
        additional = await input.read();
    })
    .then(() => {
        return order(1000, () => {
            console.log(`\n${additional} için stok kontrolü yapılıyor.`);
            
            if(checkStocks(stocks)){ 
                console.log("\nStok kontrolü olumlu")
            }
            else{
                console.log ("Malesef stokta ürün eksiği var");
            }
        })
    })
    .then(() => {
        return order(1000, () => {
            console.log("Burgeriniz nasıl olsun? tavuk - köfte");    
        });                                             
    })
    .then(async () => {
        meat = await input.read(); //tavuk ya da köfte seçimi 
        if (meat === "köfte") {                                      
            console.log("Köfte burgeriniz nasıl olsun istersiniz? az / orta / cok ") 
            howCooked = await input.read();                              
            await forMeatball(howCooked); //gerekli veriler alındıktan sonra köfte için hazırlanan fonk çağırıldı.
        }
        else if(meat === "tavuk"){
            await chickenBurger();
        }
        else{ //köfte ya da tavuk dışında bir input girilirse hata verecek.
            console.log ("Böyle bir ürün bulunmamaktadır");
        }
    })
    .then(()=> {
        return order(1000, () => {
            console.log("Paket sos ve ürünler servis tepsisine eklendi.");          
        });
    })
    .then(()=> {
        return order(1000, () => {
            console.log("Hazırlanan ürünler servis edildi");
        });
    })