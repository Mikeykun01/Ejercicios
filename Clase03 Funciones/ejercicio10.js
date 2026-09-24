let numero = -101;

function analizarNumero(numero){
    if (numero % 2 === 0){
        console.log("Es numero par");
    } else {
        console.log("Es numero impar");
    }

    if (numero > 0) {
        console.log("Es positivo");
    } else if (numero === 0) {
        console.log("Es cero");
    } else {
        console.log("Es negativo");
    }
}

analizarNumero(numero);