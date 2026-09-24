let edad = 16;

function puedeEntrar(edad){
    if(edad >=18) {
        return "Puede entrar";
    } else {
        return "No puede entrar";
    }
}

console.log(puedeEntrar(edad));