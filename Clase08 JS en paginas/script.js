console.log("Javascript conectado");

let titulo = document.querySelector("h1");

console.log(titulo);

titulo.textContent = "Hola desde JavaScript";

let titulo2 = document.querySelector("h2");

console.log(titulo2);

titulo2.textContent = "Mis hobbies favoritos"

let caja = document.querySelector(".box2");
console.log(caja);
console.log(caja.style);

let colororiginal = "red";
let colorogtexto = "yellow";

caja.style.backgroundColor = colororiginal;
caja.style.color = colorogtexto;

let boton = document.querySelector("#boton");
console.log(boton);

let oscuro = false;

function cambiarModo(elemento, button){
    console.log("Hiciste clic en el botón");
    if (!oscuro) {
        elemento.style.backgroundColor = "black";
        elemento.style.color = "green";
        oscuro = true;
        button.textContent = "Modo oscuro";
    } else {
        elemento.style.backgroundColor = colororiginal;
        elemento.style.color = colorogtexto;
        oscuro = false;
        button.textContent = "Modo normal";
    }
}


boton.addEventListener("click", function(){
    
    cambiarModo(caja, boton);
    
});

let botonTexto = document.querySelector("#botonTexto");
console.log(botonTexto);

function cambiarTexto(elemento){
    console.log("Cambiaste el texto");
    elemento.style.color = "blue";
    elemento.textContent = "Titulo exitosamente cambiado";
}

botonTexto.addEventListener("click", function(){
    cambiarTexto(titulo);
});


/*let estado = false;

function alterarTexto(elemento){
    console.log("Modificaste el texto con un click, prueba hacerlo otra vez");
    if(!estado){
        estado = true;
        elemento.style.color = "darkgrey";
        elemento.style.fontSize = "75px";
        elemento.textContent = "QUÉ HICISTE? REGRESA REGRESA";
    } else {
        elemento.style.color = "black";
        elemento.style.fontSize = "20px";
        estado = false;
        elemento.textContent = "Oh bueno... No importa, ya está bien";
    }
}

boton3.addEventListener("click", function(){
    alterarTexto(titulo2);
});*/
let boton3 = document.querySelector("#boton3");
console.log(boton3);

boton3.addEventListener("click",function(){
    titulo2.classList.toggle("resaltado");
    if(titulo2.classList.contains("resaltado")){
        console.log("El elemento contiene la clase resaltado");
    } else {
        console.log("El elemento NO CONTIENE la clase resaltado");
    }
});

let nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Este párrafo fue creado con Javascript!";

console.log(nuevoParrafo);

caja.appendChild(nuevoParrafo);
nuevoParrafo.remove();
console.log(nuevoParrafo);

let nombre = document.querySelector("#nombre");
console.log(nombre.value);

let botonSaludar = document.querySelector("#saludar");

let resultadoP = document.querySelector("#resultado");

function mostrarResultado(text, nombre){
    text.textContent = "Hola " + nombre.value + " un placer!";
}

botonSaludar.addEventListener("click",function(){
    mostrarResultado(resultadoP, nombre);
})