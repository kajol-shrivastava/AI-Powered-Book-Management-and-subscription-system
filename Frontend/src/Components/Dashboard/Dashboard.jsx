import React, { useEffect, useState } from "react";
import "./Dashboard.css";

function DashboardSample() {
  const books = [
    {
      id: 1,
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "/Book1.jpeg",
    },
    {
      id: 2,
      name: "1984",
      author: "George Orwell",
      image: "/Book2.jpeg",
    },
    {
      id: 3,
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "/Book3.jpeg",
    },
    {
      id: 4,
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "/Book1.jpeg",
    },
    {
      id: 5,
      name: "1984",
      author: "George Orwell",
      image: "/Book2.jpeg",
    },
    {
      id: 6,
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "/Book3.jpeg",
    },
    {
      id: 7,
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "/Book1.jpeg",
    },
    {
      id: 8,
      name: "1984",
      author: "George Orwell",
      image: "/Book2.jpeg",
    },
    {
      id: 9,
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "/Book3.jpeg",
    },
  ];

  return (
    <div className="dashboard-container">
      <h2>Books</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.image} alt={book.name} className="book-image" />
            <div className="book-details">
              <h3 className="book-title">{book.name}</h3>
              <p className="book-author">by {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSample;
