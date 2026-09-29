let formulario = document.querySelector("#formulario");
let boton = document.querySelector("#send");
let boton2 = document.querySelector("#clean");
let resultado = document.querySelector("#resultado");
let contador = document.querySelector("#contador");
nombreUsuario.maxLength = 20;

nombreUsuario.addEventListener("input", function(){

    let longitud = nombreUsuario.value.trim().length;

    contador.textContent = "Tienes " + longitud + " caracteres";

    if (longitud === 0) {
        nombreUsuario.style.borderColor = "black";

    } else if (longitud < 3) {
        nombreUsuario.style.borderColor = "red";

    } else if (longitud >= 20) {
        nombreUsuario.style.borderColor = "red";
        contador.textContent = "Alcanzaste el número máximo de caracteres";

    } else {
        nombreUsuario.style.borderColor = "green";
    }

    
});

formulario.addEventListener("submit", function(event){
    
    event.preventDefault();
    let nombreUsuario = document.querySelector("#nombreUsuario");

    if(!nombreUsuario.value.trim()){
        resultado.textContent = "Por favor, escribe un nombre";
        resultado.style.color = "red";
    } else if (nombreUsuario.value.trim().length < 3){
        resultado.textContent = "El nombre debe tener al menos 3 caracteres";
        resultado.style.color = "red";
    } else if (nombreUsuario.value.trim().toLowerCase() === "miguel") {
        resultado.textContent = "El nombre ya está registrado";
        resultado.style.color = "red";
    } else {
        resultado.textContent = "Hola " + nombreUsuario.value.trim() + " un gusto!";
        resultado.style.color = "black";
        boton.disabled = true;
    }
    
});

boton2.addEventListener("click", function(){
    resultado.textContent = "";
    contador.textContent = "";
    formulario.reset();
    boton.disabled = false;
});