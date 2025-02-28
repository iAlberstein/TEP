const mysql = require('mysql2');

// Configuración de la conexión a la base de datos remota
const connection = mysql.createConnection({
  host: 'localhost', // Esto podría cambiar según tu hosting (ver más abajo)
  port: 3306,       // Puerto predeterminado de MySQL, ajustalo si tu hosting usa otro
  user: 'c1382483_teatro',
  password: 'mePU03vugo',
  database: 'c1382483_teatro'
});

// Verifica si la conexión fue exitosa
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos con ID ' + connection.threadId);
});

module.exports = connection;