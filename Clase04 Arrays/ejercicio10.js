let numeros = [12, 5, 8, 21, 30, 7, 14, 3];

function analizarNumeros(numeros){
    let suma = 0;
    let cantidadPares = 0;

    for(let i=0; i<numeros.length;i++){
        suma = suma + numeros[i];
        if(numeros[i]%2===0){
            cantidadPares++;
        }
    }

    return {
        cantidadPares: cantidadPares,
        suma: suma
    };
}

let resultado = analizarNumeros(numeros);

console.log(resultado);

