let videojuegos = [
    {
        nombre: "Resident Evil",
        genero: "Survival Horror",
        año: 2026
    },
    {
        nombre: "Mario Kart",
        genero: "Carreras",
        año: 2025
    },
    {
        nombre: "Minecraft",
        genero: "Sandbox",
        año: 2011
    },
    {
        nombre: "Halo",
        genero: "Shooter",
        año: 2001
    },
    {
        nombre: "Need For Speed",
        genero: "Carreras",
        año: 2005
    },
    {
        nombre: "Crash Team Racing",
        genero: "Carreras",
        año: 1998
    }
];

function buscarPorGenero(videojuegos, generoBuscado){
    for(let i=0; i<videojuegos.length; i++){
        if (videojuegos[i].genero === generoBuscado) {
            console.log(videojuegos[i].nombre);
        }
    }
}

buscarPorGenero(videojuegos,"Carreras");