const http = require("http");

// Importar la conexión con SQLite
const db = require("./database");

// Importar las funciones para trabajar con usuarios
const usuariosDB = require("./usuarios");


const servidor = http.createServer((req, res) => {

    console.log(req.url); // Mostrar la ruta solicitada en la terminal

    //res.statusCode = 200; // Definir el código de respuesta HTTP
    res.setHeader("Content-Type","text/plain; charset=utf-8"); // Indicar que responderemos texto
    //res.end("¡Hola Miguel! Mi primer servidor está funcionando."); // Enviar la respuesta al navegador

    // Comprobar qué ruta solicitó el navegador
    if (req.url === "/"){
        res.statusCode = 200;
        res.end("Bienvenido a mi servidor");

    }else if (req.url === "/productos"){
        res.statusCode = 200;
        res.end("Aquí estarán los productos");

    }else if (req.method === "GET" && req.url === "/usuarios"){
        
            // Obtener los usuarios mediante nuestro módulo
        usuariosDB.obtenerUsuarios((error, filas) => {

            // Comprobar si ocurrió un error
            if (error) {
                console.error("Error al consultar usuarios:", error);

                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");

                res.end(JSON.stringify({
                    error: "Error al consultar los usuarios"
                }));

                return;
            }

            // Responder con los usuarios obtenidos
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify(filas));
        });

    } else if (req.method === "GET" && req.url.startsWith("/usuarios/")) {

    // Separar la URL en partes
    const partes = req.url.split("/");

    // Obtener el ID del usuario
    const id = Number(partes[2]);

    // Buscar el usuario en SQLite
    usuariosDB.obtenerUsuarioPorId (id, (error, usuario) => {

        if (error) {
    console.error("Error al consultar usuario:", error);

    res.statusCode = 500;
    res.end("Error al consultar usuario");
    return;
        }

        if (!usuario) {
            res.statusCode = 404;
            res.end("Usuario no encontrado");
            return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(usuario));
        });

    } else if (req.method === "POST" && req.url === "/usuarios"  ){
        let cuerpo = "";

        req.on("data", (chunk) => {
            cuerpo += chunk;
        });

        req.on("end", () => {
            let usuario;

            try {

                // Intentar convertir el JSON recibido
                usuario = JSON.parse(cuerpo);

            } catch (error) {

                // El JSON recibido no es válido
                res.statusCode = 400;
                res.end("El JSON enviado no es válido");
                return;
            }

            if (!usuario.nombre || usuario.nombre.trim()=== "") {

            res.statusCode = 400;
            res.end("El nombre es obligatorio");
            return;
            }

            // Limpiar espacios al inicio y al final
            usuario.nombre = usuario.nombre.trim();

            if (typeof usuario.edad !== "number" || usuario.edad <= 0 || usuario.edad > 120) {

            res.statusCode = 400;
            res.end("La edad debe ser un número entre 1 y 120");
            return;
            }
         // Insertar el usuario en SQLite
            usuariosDB.crearUsuario(usuario,(error, idNuevo) => {

                    // Comprobar si ocurrió un error
                    if (error) {
                        console.error("Error al insertar usuario:", error);
                        return;
                    }

                    // Mostrar el ID generado por SQLite
                    console.log("Usuario guardado con ID:", idNuevo);

                    // Indicar que se creó correctamente
                    res.statusCode = 201;
                    res.setHeader("Content-Type", "application/json");

                    // Enviar el usuario creado al cliente
                    res.end(JSON.stringify({
                        id: idNuevo,
                        nombre: usuario.nombre,
                        edad: usuario.edad
                            }));
                        }
                    );
                });

    } else if (req.method === "PUT" && req.url.startsWith("/usuarios/")) {

    // Separar la URL en partes
    const partes = req.url.split("/");

    // Obtener el ID del usuario
    const id = Number(partes[2]);
    
    // Mostrar el ID recibido
    console.log("ID del usuario:", id);

    let cuerpo = "";

        req.on("data", (chunk) => {
            cuerpo += chunk;
        });

        req.on("end", () => {

            let usuario;

                try {

                    // Intentar convertir el JSON recibido
                    usuario = JSON.parse(cuerpo);

                } catch (error) {

                    // El JSON recibido no es válido
                    res.statusCode = 400;
                    res.end("El JSON enviado no es válido");
                    return;
                }
                // Validar el nombre
                if (!usuario.nombre || usuario.nombre.trim() === "") {

                    res.statusCode = 400;
                    res.end("El nombre es obligatorio");
                    return;
                }
                // Limpiar espacios al inicio y al final
                usuario.nombre = usuario.nombre.trim();
                //Validar la edad
                if (typeof usuario.edad !== "number" || usuario.edad <= 0 || usuario.edad > 120) {

                res.statusCode = 400;
                res.end("La edad debe ser un número entre 1 y 120");
                return;
                }

            // Actualizar el usuario en SQLite
            usuariosDB.actualizarUsuario(id, usuario, (error, cambios) =>  {

                    // Comprobar si ocurrió un error
                    if (error) {
                        console.error("Error al actualizar usuario:", error);

                        res.statusCode = 500;
                        res.end("Error al actualizar usuario");
                        return;
                    }

                    // Comprobar si realmente se encontró el usuario
                    if (cambios === 0) {
                        res.statusCode = 404;
                        res.end("Usuario no encontrado");
                        return;
                    }

                    // Actualización exitosa
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");

                    res.end(JSON.stringify({
                        id: id,
                        nombre: usuario.nombre,
                        edad: usuario.edad
                    }));
                });
            });
    } else if (req.method === "DELETE" && req.url.startsWith("/usuarios/")) {

    // Separar la URL en partes
    const partes = req.url.split("/");

    // Obtener el ID del usuario
    const id = Number(partes[2]);

        usuariosDB.eliminarUsuario(id,(error, cambios) => {

                // Comprobar si ocurrió un error
                if (error) {
                    console.error("Error al eliminar usuario:", error);

                    res.statusCode = 500;
                    res.end("Error al eliminar usuario");
                    return;
                }

                // Comprobar si el usuario existía
                if (cambios === 0) {
                    res.statusCode = 404;
                    res.end("Usuario no encontrado");
                    return;
                }

                // Eliminación exitosa
                res.statusCode = 200;
                res.end("Usuario eliminado correctamente");
            }
        );
    } else {
        res.statusCode = 404;
        res.end("Ruta no encontrada");
    }
    
});

servidor.listen(3000, ()=> {
    console.log("Servidor activo en http://localhost:3000");
});
