import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReturnBook = () => {
  const [issueId, setIssueId] = useState("");
  const [bookId, setBookId] = useState("");

  const navigate = useNavigate();

  const handleIssueIdChange = (e) => {
    setIssueId(e.target.value);
  };

  const handleBookIdChange = (e) => {
    setBookId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/returnBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ issue_id: issueId, book_id: bookId }),
      });

      if (response.ok) {
        console.log("Book returned successfully");
        alert("Book returned successfully");
        navigate("/");
      } else {
        console.error("Failed to return book");
        alert("Failed to return book");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="returnbookbackground">
      <h2>Return Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="issue_id">Issue ID:</label>
        <input
          type="number"
          id="issue_id"
          name="issue_id"
          value={issueId}
          onChange={handleIssueIdChange}
          required
        />
        <label htmlFor="book_id">Book ID:</label>
        <input
          type="number"
          id="book_id"
          name="book_id"
          value={bookId}
          onChange={handleBookIdChange}
          required
        />
        <button type="submit">Return Book</button>
      </form>
      <div className="link" onClick={() => navigate("/")}>
        HomePage
      </div>
    </div>
  );
};

export default ReturnBook;
