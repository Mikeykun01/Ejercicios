const http = require("http");

// Importar la conexión con SQLite
const db = require("./database");

const usuarios = [
    {
        nombre: "Miguel",
        edad: 26
    }
];



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
        // Consultar todos los usuarios de SQLite
            db.all("SELECT * FROM usuarios", [], (error, filas) => {

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

                // Respuesta exitosa
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");

                // Enviar las filas obtenidas desde SQLite
                res.end(JSON.stringify(filas));
            });

    }else if (req.method === "POST" && req.url === "/usuarios"  ){
        let cuerpo = "";

        req.on("data", (chunk) => {
            cuerpo += chunk;
        });

        req.on("end", () => {
            const usuario = JSON.parse(cuerpo);
         // Insertar el usuario en SQLite
            db.run(
                "INSERT INTO usuarios (nombre, edad) VALUES (?, ?)",
                [usuario.nombre, usuario.edad],
                function(error) {

                    // Comprobar si ocurrió un error
                    if (error) {
                        console.error("Error al insertar usuario:", error);
                        return;
                    }

                    // Mostrar el ID generado por SQLite
                    console.log("Usuario guardado con ID:", this.lastID);

                    // Indicar que se creó correctamente
                    res.statusCode = 201;
                    res.setHeader("Content-Type", "application/json");

                    // Enviar el usuario creado al cliente
                    res.end(JSON.stringify({
                        id: this.lastID,
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

            // Convertir el JSON recibido en un objeto
            const usuario = JSON.parse(cuerpo);

            // Actualizar el usuario en SQLite
            db.run(
                "UPDATE usuarios SET nombre = ?, edad = ? WHERE id = ?",
                [usuario.nombre, usuario.edad, id],
                function(error) {

                    // Comprobar si ocurrió un error
                    if (error) {
                        console.error("Error al actualizar usuario:", error);

                        res.statusCode = 500;
                        res.end("Error al actualizar usuario");
                        return;
                    }

                    // Comprobar si realmente se encontró el usuario
                    if (this.changes === 0) {
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
                }
    );
});
    } else if (req.method === "DELETE" && req.url.startsWith("/usuarios/")) {

    // Separar la URL en partes
    const partes = req.url.split("/");

    // Obtener el ID del usuario
    const id = Number(partes[2]);

    // Mostrar el ID recibido
    console.log("ID del usuario a eliminar:", id);
    } else {
        res.statusCode = 404;
        res.end("Ruta no encontrada");
    }
    
});

servidor.listen(3000, ()=> {
    console.log("Servidor activo en http://localhost:3000");
});
