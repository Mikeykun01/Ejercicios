// Importar SQLite
const sqlite3 = require("sqlite3").verbose();

// Crear o abrir nuestra base de datos
const db = new sqlite3.Database("./curso_backend.db", (error) => {

    if (error) {
        console.error("Error al conectar con SQLite:", error);
        return;
    }

    console.log("Conexión con SQLite exitosa");
});

db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        edad INTEGER NOT NULL
    )
`, (error) => {

    if (error) {
        console.error("Error al crear la tabla:", error);
        return;
    }

    console.log("Tabla usuarios lista");
});

// Exportar la conexión para poder usarla desde otros archivos
module.exports = db;