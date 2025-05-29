import React from "react";
import { Typography } from "@mui/material";
import BookCard from "../BookCard/BookCard"; // Your existing BookCard component
import './SavedBooksComponent.css'

const SavedBooksSection = ({ data }) => {
    console.log(data)
  const savedBooks = data?.savedBooks || [];

  if (savedBooks.length === 0) {
    <Typography variant="body1" textAlign="center" color="text.secondary">
              You haven’t Saved any books yet.
    </Typography>
  }

  return (
    <div className="saved-books-container">
      <Typography variant="h4" gutterBottom textAlign="center">
        My Saved Books
      </Typography>
      <div className="book-list">
        <div className="book-list dashboard-container" >
        <div className='book-grid'>
           {savedBooks.length > 0 ? (
          savedBooks.map((book) => <BookCard key={book._id} book={book} hideSaveButton={true}/>)
        ) : (
          <Typography variant="body1" textAlign="center" color="text.secondary">
                    You haven’t Saved any books yet.
          </Typography>
        )}
        </div>
        </div>
    </div>
    </div>
  );
};

export default SavedBooksSection;
