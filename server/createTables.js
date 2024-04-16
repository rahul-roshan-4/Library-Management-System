const mysql = require('mysql');

function createTables(pool) {
  const createBooksTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      book_id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      author VARCHAR(100) NOT NULL,
      isbn VARCHAR(20) NOT NULL,
      quantity INT NOT NULL
    )
  `;

  const createIssuedBooksTableQuery = `
    CREATE TABLE IF NOT EXISTS issued_books (
      issue_id INT AUTO_INCREMENT PRIMARY KEY,
      book_id INT NOT NULL,
      user_id INT NOT NULL,
      issue_date DATE NOT NULL,
      return_date DATE
    )
  `;

  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(50) NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      address VARCHAR(255) NOT NULL
    )
  `;

  pool.query(createBooksTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating books table: ' + err.stack);
      return;
    }
    console.log('Books table created successfully.');
  });

  pool.query(createIssuedBooksTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating issued_books table: ' + err.stack);
      return;
    }
    console.log('Issued books table created successfully.');
  });

  pool.query(createUsersTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating users table: ' + err.stack);
      return;
    }
    console.log('Users table created successfully.');
  });
}

module.exports = createTables;
