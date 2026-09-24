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

for(let i=0; i<personas.length; i++){
    if(personas[i].edad >= 18){
        console.log(personas[i].nombre);
    }
}