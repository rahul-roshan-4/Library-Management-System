import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IssuedList = () => {
  let navigate = useNavigate();

  useEffect(() => {
    getdata();
  }, []);

  const [list, setList] = useState([]);

  async function getdata() {
    try {
      let result = await fetch("http://127.0.0.1:5000/issuedlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      setList(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="list">
      {list.length ? (
        <>
          <h2>Issue Book</h2>
          {list.map((issue, id) => {
            return (
              <div className="issue" key={id}>
                <div className="id">Issue ID : {issue.issue_id}</div>
                <div className="userid">User ID : {issue.user_id}</div>
                <div className="bookid">Book ID : {issue.book_id}</div>
                <div className="issuedate">Issue Date : {issue.issue_date}</div>
                <div className="returndate">
                  Return Date : {issue.return_date}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>No Book Has Been Issued</>
      )}
      <div className="link" onClick={() => navigate("/")}>
        HomePage
      </div>
    </div>
  );
};

export default IssuedList;
