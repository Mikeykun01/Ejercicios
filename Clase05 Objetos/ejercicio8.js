let personas = [
    {
        nombre: "Logan",
        edad: 45
    },
    {
        nombre: "Nicole",
        edad: 27
    },
    {
        nombre: "Hilda",
        edad: 17
    },
    {
        nombre: "Carlos",
        edad: 32
    }
];

function buscarPersona(personas, nombreBuscado){
    for(let i=0; i<personas.length;i++){
        if(personas[i].nombre === nombreBuscado){
            return personas[i];
        }
    }
    return null;
}

let persona = buscarPersona(personas, "Nicole");
persona.edad = 28;


console.log(persona);
console.log(personas);
