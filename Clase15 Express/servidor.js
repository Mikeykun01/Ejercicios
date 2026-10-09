const express = require("express");
const app = express();
const db = require("./database");
app.use(express.json());

// Definir una ruta para la página principal
app.get("/", (req, res) => {

    res.send("¡Hola Miguel! Mi primer servidor con Express funciona.");

});

// Ruta para mostrar los productos
app.get("/productos", (req, res) => {
    res.send("Aquí estarán los productos");
});

 // Recibir datos de un usuario
app.post("/usuarios", (req, res) => {

    const usuario = req.body;
    if (
        typeof usuario.nombre !== "string" ||
        usuario.nombre.trim() === ""
    ) {
        return res.status(400).json({
            error: "El nombre es obligatorio"
        });
    }
    usuario.nombre = usuario.nombre.trim();

    if (
        typeof usuario.edad !== "number" ||
        usuario.edad <= 0 ||
        usuario.edad > 120
    ) {
        return res.status(400).json({
            error: "La edad debe ser un número entre 1 y 120"
        });
    }

    // Insertar el usuario en SQLite
    db.run(
        "INSERT INTO usuarios (nombre, edad) VALUES (?, ?)",
        [usuario.nombre, usuario.edad],
        function(error) {
            if (error) {
                console.error("Error al crear usuario:", error);

                return res.status(500).json({
                    error: "Error al crear usuario"
                });
            }

            res.status(201).json({
                id: this.lastID,
                nombre: usuario.nombre,
                edad: usuario.edad
            });
        }
    );
});


 // Obtener todos los usuarios
app.get("/usuarios", (req, res) => {

    db.all("SELECT * FROM usuarios", [], (error, filas) => {

        if (error) {
            console.error("Error al consultar usuarios:", error);

            return res.status(500).json({
                error: "Error al consultar los usuarios"
            });
        }

        res.status(200).json(filas);
    });
});


 // Obtener un usuario por su ID
app.get("/usuarios/:id", (req, res) => {

    const id = Number(req.params.id);

    db.get(
        "SELECT * FROM usuarios WHERE id = ?",
        [id],
        (error, usuario) => {

            if (error) {
                return res.status(500).json({
                    error: "Error al consultar el usuario"
                });
            }

            if (!usuario) {
                return res.status(404).json({
                    error: "Usuario no encontrado"
                });
            }

            res.status(200).json(usuario);
        }
    );
});


 // Actualizar un usuario por su ID
app.put("/usuarios/:id", (req, res) => {

    const id = Number(req.params.id);

    const { nombre, edad } = req.body;

    if (typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({
            error: "El nombre es obligatorio"
        });
    }

    if (typeof edad !== "number" || edad <= 0 || edad > 120) {
        return res.status(400).json({
            error: "La edad debe ser un número entre 1 y 120"
        });
    }

    // Actualizar los datos en SQLite
    db.run(
        "UPDATE usuarios SET nombre = ?, edad = ? WHERE id = ?",
        [nombre.trim(), edad, id],
        function(error) {

            if (error) {
                return res.status(500).json({
                    error: "Error al actualizar el usuario"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Usuario no encontrado"
                });
            }

            res.status(200).json({
                mensaje: "Usuario actualizado correctamente",
                id: id,
                nombre: nombre.trim(),
                edad: edad
            });
        }
    );
});


 // Actualizar un usuario por su ID
app.put("/usuarios/:id", (req, res) => {

    const id = Number(req.params.id);
    const { nombre, edad } = req.body;

    if (typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({
            error: "El nombre es obligatorio"
        });
    }
    if (typeof edad !== "number" || edad <= 0 || edad > 120) {
        return res.status(400).json({
            error: "La edad debe ser un número entre 1 y 120"
        });
    }
    db.run(
        "UPDATE usuarios SET nombre = ?, edad = ? WHERE id = ?",
        [nombre.trim(), edad, id],
        function(error) {
            if (error) {
                return res.status(500).json({
                    error: "Error al actualizar el usuario"
                });
            }
            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Usuario no encontrado"
                });
            }
            res.status(200).json({
                mensaje: "Usuario actualizado correctamente",
                id: id,
                nombre: nombre.trim(),
                edad: edad
            });
        }
    );
});
 
 // Eliminar un usuario por su ID
app.delete("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    db.run(
        "DELETE FROM usuarios WHERE id = ?",
        [id],
        function(error) {
            if (error) {
                return res.status(500).json({
                    error: "Error al eliminar el usuario"
                });
            }
            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Usuario no encontrado"
                });
            }
            res.status(200).json({
                mensaje: "Usuario eliminado correctamente",
                id: id
            });
        }
    );
});



 // Manejar rutas que no existen
app.use((req, res) => {
    res.status(404).send("Error 404: la ruta solicitada no existe");
});


// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor Express activo en http://localhost:3000");
});
