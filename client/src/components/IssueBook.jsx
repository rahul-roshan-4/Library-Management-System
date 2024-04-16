import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const IssueBook = () => {
  const [formData, setFormData] = useState({
    book_id: "",
    user_id: "",
    issue_date: "",
    return_date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/issueBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Book issued successfully");
        alert("Book issued successfully");
        navigate("/");
      } else {
        console.error("Failed to issue book");
        alert("Failed to issue book");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="issuebookbackground">
      <h2>Issue Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="book_id">Book ID:</label>
        <input
          type="number"
          id="book_id"
          name="book_id"
          value={formData.book_id}
          onChange={handleChange}
          required
        />
        <label htmlFor="user_id">User ID:</label>
        <input
          type="number"
          id="user_id"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
        <label htmlFor="issue_date">Issue Date:</label>
        <input
          type="date"
          id="issue_date"
          name="issue_date"
          value={formData.issue_date}
          onChange={handleChange}
          required
        />
        <label htmlFor="return_date">Return Date:</label>
        <input
          type="date"
          id="return_date"
          name="return_date"
          value={formData.return_date}
          onChange={handleChange}
          required
        />
        <button type="submit">Issue Book</button>
      </form>
      <div className="link" onClick={() => navigate("/")}>
        HomePage
      </div>
    </div>
  );
};

export default IssueBook;
