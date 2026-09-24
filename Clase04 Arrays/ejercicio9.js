let nombres = ["Miguel", "Ana", "Carlos", "Luis", "Sofía"];
let nombreBuscado = "Lando";

function buscarNombre(nombres, nombreBuscado){
    for(let i=0; i<nombres.length; i++){
        if (nombres[i] === nombreBuscado){
            return true;
        } 
    }
    return false;
}

console.log(buscarNombre(nombres,nombreBuscado));