const db = require("./database");

// Obtener todos los usuarios
function obtenerUsuarios(callback) {
    // Consultar todos los registros
    db.all("SELECT * FROM usuarios", [], (error, filas) => {
        // Entregar el resultado a quien llamó la función
        callback(error, filas);
    });
}
// Otener un usuario mediante su id
function obtenerUsuarioPorId(id, callback){
    //Consultar usuario por id
    db.get("SELECT * FROM usuarios WHERE id = ?",[id],(error, usuario) => {
        // Entregar el resultado a quien llamó la función
        callback(error,usuario);
    });
}
//Actualizar un usuario mediante su id
function actualizarUsuario(id, usuario, callback){
    // Ejecutar la consulta de actualización en SQLite
    db.run(
        "UPDATE usuarios SET nombre = ?, edad = ? WHERE id = ?",
        [usuario.nombre, usuario.edad, id],
        function(error) {

            // Entregar el resultado a quien llamó la función
            callback(error, this.changes);
        }
    );
}

//Crear un nuevo usuario
function crearUsuario(usuario, callback){
    // Insertar el usuario en SQLite
    db.run(
        "INSERT INTO usuarios (nombre, edad) VALUES (?, ?)",
        [usuario.nombre, usuario.edad],
        function(error) {

            // Comprobar si ocurrió un error
            if (error) {
                callback(error, null);
                return;
            }

            // Entregar el ID generado por SQLite
            callback(null, this.lastID);
        }
    );
}

function eliminarUsuario(id, callback){
    // Ejecutar la consulta de eliminación en SQLite
    db.run(
        "DELETE FROM usuarios WHERE id = ?",
        [id],
        function(error) {

            // Entregar el resultado a quien llamó la función
            if (error) {
                callback(error, 0);
                return;
            }

            callback(null, this.changes);
        }
    );
}

// Exportar la función para utilizarla en otros archivos
module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    crearUsuario,
    eliminarUsuario
};