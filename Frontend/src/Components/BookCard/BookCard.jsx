import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveBook } from "../../services/book";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import "./BookCard.css";

function BookCard({book,hideSaveButton = false}) {
  console.log(hideSaveButton)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${book._id}`);  // navigate to book details page
  };

  const handleSave = async (e) => {
  e.stopPropagation(); // prevent card click navigation

    try {
      await saveBook(book._id);  // call your service
      toast.success("Book saved to your library!");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* <h2>Books</h2> */}
      <div className="book-grid"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      >
    
          <div className="book-card" key={book._id}>
            <img src={book.coverImage} alt={book.title} className="book-image" />
            {!hideSaveButton && <button className="save-icon" onClick={handleSave} title="Save book">
             <FaHeart color="#d32f2f" />
          </button>}
            <div className="book-details">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              {book.avgRating && (
              <p className="book-rating">⭐ {parseFloat(book.avgRating).toFixed(1)} / 5</p>
              )}
            </div>
          </div>
    
      </div>
    </div>
  );
}

export default BookCard;
