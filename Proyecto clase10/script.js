// Array que almacena los usuarios registrados.
let usuario = [];
let usuarioEditado = null;

// Obtenemos los elementos del HTML que utilizaremos.
const formulario = document.querySelector("#formReg");
const nombreInput = document.querySelector("#nombreUsuario");
const correoInput = document.querySelector("#correoUsuario");
const edadInput = document.querySelector("#edadUsuario");
const botonSubmit = formulario.querySelector('button[type="submit"]');
const botonCancelar = formulario.querySelector("#botonCancelar");
const listaUsuarios = document.querySelector("#listaUsuarios");

// Recuperamos los datos almacenados en el navegador.
const datosGuardados = localStorage.getItem("usuario");

// Si existen datos guardados, los convertimos nuevamente en un array.
if(datosGuardados !== null){
    usuario = JSON.parse(datosGuardados);
};

// Función encargada de mostrar los usuarios en el HTML.
function mostrarUsuarios(){

    // Limpiamos la lista para evitar duplicar elementos.
    listaUsuarios.textContent = "";

    // Recorremos todos los usuarios registrados.
    for (let i = 0; i < usuario.length; i++){

        // Obtenemos el usuario correspondiente a la posición actual.
        const usuarioActual = usuario[i];

        // Creamos un elemento de lista para mostrar sus datos.
        const elementoUsuario = document.createElement("li");

        elementoUsuario.textContent = usuarioActual.nombre + " - " + usuarioActual.edad + " - " + usuarioActual.correo;

        // Agregamos el elemento al listado del HTML.
        listaUsuarios.appendChild(elementoUsuario);

        // Creamos el botón para eliminar al usuario.
        const botonElim = document.createElement("button");
        botonElim.textContent = "Eliminar";

        elementoUsuario.appendChild(botonElim);

        // Creamos el botón para editar al usuario.
        const botonEdit = document.createElement("button");
        botonEdit.textContent = "Editar";

        elementoUsuario.appendChild(botonEdit);

        // Detectamos cuando se presiona el botón.
        botonElim.addEventListener("click", function(){
            // Eliminamos al usuario del array.
            usuario.splice(i, 1);
            // Guardamos los cambios en LocalStorage.
            localStorage.setItem("usuario", JSON.stringify(usuario));
            // Actualizamos la lista visual.
            mostrarUsuarios();
        });

        botonEdit.addEventListener("click", function(){
            usuarioEditado = i;

            nombreInput.value = usuarioActual.nombre;
            correoInput.value = usuarioActual.correo;
            edadInput.value = usuarioActual.edad;

            botonSubmit.textContent = "Guardar";
            botonCancelar.hidden = false;

        });

        botonCancelar.addEventListener("click", function() {

            console.log("Se presionó cancelar");

            formulario.reset();
            usuarioEditado = null;
            botonSubmit.textContent = "Registrar usuario";
            botonCancelar.hidden = true;

        });
        
    }
};

// Mostramos los usuarios guardados al abrir la página.
mostrarUsuarios();

// Detectamos el envío del formulario de registro.
formulario.addEventListener("submit", function(event){

    // Evitamos que la página se recargue al enviar el formulario.
    event.preventDefault();

    // Obtenemos los valores introducidos por el usuario.
    const nombre = nombreInput.value;
    const edad = edadInput.value;
    const correo = correoInput.value;

    

    const mensajeError = document.createElement("p");
    const mensajeEdad = document.createElement("p");
    const mensajeCorreo = document.createElement("p");
    const mensajeAnteriores = formulario.querySelectorAll("p");

    mensajeError.textContent = "Escriba un nombre válido";
    mensajeEdad.textContent = "Escriba una edad válida";
    mensajeCorreo.textContent = "Ingrese un correo válido";

    

    for(let i=0; i < mensajeAnteriores.length; i++){
        mensajeAnteriores[i].remove();
    }

    if(edad === "" || Number(edad) <= 0) {
                formulario.appendChild(mensajeEdad);
                return;
            }

    if (nombre.trim() === ""){
        formulario.appendChild(mensajeError);
        return;
    }

    if(correo.trim() === ""){
        formulario.appendChild(mensajeCorreo);
        return;
    }

    // Creamos un objeto con los datos del nuevo usuario.
    const nuevoUsuario = {nombre, edad, correo};
    for (let i = 0; i < usuario.length; i++) {
    if (i !== usuarioEditado && usuario[i].correo.toLowerCase().trim() === correo.toLowerCase().trim()) {
        mensajeCorreo.textContent = "Este correo ya está registrado";
        formulario.appendChild(mensajeCorreo);
        return;
        }
    }
    // Agregamos el nuevo objeto al array.
    if(usuarioEditado === null){
        usuario.push(nuevoUsuario);
    } else {
        usuario[usuarioEditado].nombre = nombre;
        usuario[usuarioEditado].correo = correo;
        usuario[usuarioEditado].edad = edad;
    }
    

    // Convertimos el array a texto JSON para poder almacenarlo.
    const texto = JSON.stringify(usuario);

    // Guardamos los usuarios actualizados en LocalStorage.
    localStorage.setItem("usuario", texto);

    // Actualizamos el listado del HTML.
    mostrarUsuarios();
    formulario.reset();
    usuarioEditado = null;
    botonSubmit.textContent = "Registrar usuario";
    botonCancelar.hidden = true;
});



/*usuario.push({
    nombre:"Carlos",
    correo: "carlos@gmail.com",
    edad: 26
});

usuario.push({
    nombre:"Miguel",
    correo: "miguel@gmail.com",
    edad: 27
});

usuario.push({
    nombre:"Luis",
    correo: "luis@gmail.com",
    edad: 24
});*/

console.log(formulario);
console.log(datosGuardados);

/*localStorage.setItem("prueba", "Hola Miguel");
console.log(localStorage.getItem("prueba"));*/

