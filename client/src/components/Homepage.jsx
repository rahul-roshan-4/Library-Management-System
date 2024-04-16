import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    getdata();
  }, []);

  const [books, setBooks] = useState([]);

  async function getdata() {
    try {
      let result = await fetch("http://127.0.0.1:5000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      setBooks(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <div className="books">
        <div className="routes">
          <div className="registerbtn" onClick={() => navigate("/register")}>
            Register
          </div>
          <div className="addbook" onClick={() => navigate("/addbook")}>
            Add Book
          </div>
          <div className="issuebook" onClick={() => navigate("/issuebook")}>
            Issue Book
          </div>
          <div className="returnbook" onClick={() => navigate("/returnbook")}>
            Return Book
          </div>
          <div className="issuedlist" onClick={() => navigate("/issuedlist")}>
            Issued List
          </div>
        </div>

        {books.length ? (
          <>
            <div className="heading">Available Books</div>
            {books.map((book, id) => {
              return (
                <div className="book" key={id}>
                  <div className="id">Book ID : {book.book_id}</div>
                  <div className="title">Title : {book.title}</div>
                  <div className="author">Author : {book.author}</div>
                  <div className="isbn">ISBN : {book.isbn}</div>
                  <div className="qty">Quantity : {book.quantity}</div>
                </div>
              );
            })}
          </>
        ) : (
          <>No Books</>
        )}
      </div>
    </>
  );
};

export default Homepage;
