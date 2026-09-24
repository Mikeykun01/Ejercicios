let tieneInternet = true;
let computadoraEncendida = false;
let programaAbierto = true;

console.log(tieneInternet); //true
console.log(computadoraEncendida); //false
console.log(programaAbierto); //true

console.log(tieneInternet && programaAbierto); //true
console.log(tieneInternet && computadoraEncendida); //false
console.log(tieneInternet || computadoraEncendida); //true
console.log(computadoraEncendida || programaAbierto); //true

console.log(!computadoraEncendida); //true