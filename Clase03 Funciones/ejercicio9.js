let limite = 100;

function mostrarPares(limite){
    for(let i = 1; i<=limite; i++){
        if(i % 2 === 0){
            console.log(i);
        }
    }
}


mostrarPares(limite);