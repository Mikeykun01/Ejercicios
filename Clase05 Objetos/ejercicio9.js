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
    }
];

function cumplirAños(persona){
    persona.edad++;
}

let persona = personas[1];
cumplirAños(persona);
console.log(persona);