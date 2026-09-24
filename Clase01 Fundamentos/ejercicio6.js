let dineroInicial = 1000;
let compra1 = 150;
let compra2 = 200;
let compra3 = 75;

let dineroRestante = 0;

if (dineroRestante >= 50){
    console.log("Tienes suficiente dinero para gastar");
    console.log("Te queda..." + dineroRestante);
} else if (dineroRestante === 0) {
    console.log("Ya no tienes dinero papi");
} else {
    console.log("Ya mejor guardamos lo que queda");
    console.log("Te queda..." + dineroRestante);
} 