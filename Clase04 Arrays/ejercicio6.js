let numeros = [4, 7, 12, 3, 18, 21, 6, 9];
let contador = 0;

for(let i = 0; i < numeros.length; i++){
    if(numeros[i] > 10){
        contador++
    }
}

console.log(contador);