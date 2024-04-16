const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const createTables = require("./createTables");
const app = express();
const port = 5000;

const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "rootpass",
  database: "library",
});

createTables(pool);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  pool.query("SELECT * FROM books", (err, rows) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(rows);
  });
});

app.post("/addBook", (req, res) => {
  const { title, author, isbn, quantity } = req.body;
  if (!title || !author || !isbn || !quantity) {
    return res
      .status(400)
      .json({ message: "Please provide all necessary book details." });
  }

  pool.query(
    "INSERT INTO books (title, author, isbn, quantity) VALUES (?, ?, ?, ?)",
    [title, author, isbn, quantity],
    (err, result) => {
      if (err) {
        console.error("Error adding book:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Book added successfully" });
    }
  );
});

app.post("/addUser", (req, res) => {
  const { username, password, name, email, address } = req.body;
  if (!username || !password || !name || !email || !address) {
    return res
      .status(400)
      .json({ message: "Please provide all necessary user details." });
  }

  pool.query(
    "INSERT INTO users (username, password, name, email, address) VALUES (?, ?, ?, ?, ?)",
    [username, password, name, email, address],
    (err, result) => {
      if (err) {
        console.error("Error adding user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "User added successfully" });
    }
  );
});

app.get("/issuedlist", (req, res) => {
  pool.query("SELECT * FROM issued_books", (err, rows) => {
    if (err) {
      console.error("Error fetching List:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(rows);
  });
});

app.post("/issueBook", (req, res) => {
  const { book_id, user_id, issue_date, return_date } = req.body;
  if (!book_id || !user_id || !issue_date || !return_date) {
    return res
      .status(400)
      .json({ message: "Please provide all necessary issue details." });
  }

  pool.query(
    "SELECT quantity FROM books WHERE book_id = ?",
    [book_id],
    (err, rows) => {
      if (err) {
        console.error("Error fetching book quantity:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const quantity = rows[0].quantity;
      if (quantity <= 0) {
        return res.status(400).json({ message: "Book is not available" });
      }

      pool.query(
        "UPDATE books SET quantity = ? WHERE book_id = ?",
        [quantity - 1, book_id],
        (err, result) => {
          if (err) {
            console.error("Error updating book quantity:", err);
            return res.status(500).json({ message: "Internal server error" });
          }

          pool.query(
            "INSERT INTO issued_books (book_id, user_id, issue_date, return_date) VALUES (?, ?, ?, ?)",
            [book_id, user_id, issue_date, return_date],
            (err, result) => {
              if (err) {
                console.error("Error issuing book:", err);
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }
              return res
                .status(200)
                .json({ message: "Book issued successfully" });
            }
          );
        }
      );
    }
  );
});

app.post("/returnBook", (req, res) => {
  const { issue_id, book_id } = req.body;
  if (!issue_id) {
    return res.status(400).json({ message: "Please provide issue ID." });
  }

  pool.query(
    "SELECT * FROM issued_books WHERE issue_id = ?",
    [issue_id],
    (err, result) => {
      if (err) {
        console.error("Error checking issue ID:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid issue ID." });
      }

      pool.query(
        "DELETE FROM issued_books WHERE issue_id = ?",
        [issue_id],
        (err, result) => {
          if (err) {
            console.error("Error returning book:", err);
            return res.status(500).json({ message: "Internal server error" });
          }

          pool.query(
            "UPDATE books SET quantity = quantity + 1 WHERE book_id = ?",
            [book_id],
            (err, result) => {
              if (err) {
                console.error("Error updating book quantity:", err);
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }
              return res
                .status(200)
                .json({ message: "Book returned successfully" });
            }
          );
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
