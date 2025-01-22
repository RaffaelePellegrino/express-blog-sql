const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',      
  user: 'root',            
  password: 'Lele07022002',            
  database: 'blog'         
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Errore di connessione al database', err);
  } else {
    console.log('Connesso al database');
    connection.release();  
}});

module.exports = pool.promise();
