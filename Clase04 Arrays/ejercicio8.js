let numeros = [10, 20, 30, 40];

function sumarNumeros(numeros){
    let suma = 0;
    for(let i=0; i<numeros.length; i++){
        suma = suma + numeros[i];
    }
    return suma;
}

console.log(sumarNumeros(numeros));