import React, { useEffect, useState } from "react";
import SavedBooksSection from "../../Components/SavedBooksComponent/SavedBooksSection";
import { getBookMarkedAndSavedBooks } from "../../services/book"; 

const BookLibrary = () => {
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await getBookMarkedAndSavedBooks();
      setBookData(res.data); // assuming API response as in your example
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <SavedBooksSection data={bookData} />
    </div>
  );
};

export default BookLibrary;
