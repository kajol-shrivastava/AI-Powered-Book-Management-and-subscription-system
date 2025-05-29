import React, { useEffect, useState } from 'react';
import BookCard from '../../Components/BookCard/BookCard';
import { getBooks } from '../../services/book';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './Home.css'; // Create this for custom styles

const categories = [
  { name: 'Fantasy', color: '#ff6b6b' },
  { name: 'Fiction', color: '#6c5ce7' },
  { name: 'Science', color: '#00b894' },
  { name: 'Biography', color: '#fdcb6e' },
  { name: 'History', color: '#0984e3' },
  { name: 'Technology', color: '#e17055' },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [books, setBooks] = useState([]);

  const fetchBooks = async (category) => {
    try {
      const result = await getBooks(category); // category passed to API
      setBooks(result?.data || []);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="home-container">
      <h2 className="section-title">Explore Categories</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`category-card ${selectedCategory === cat.name ? 'selected' : ''}`}
            style={{ backgroundColor: cat.color }}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      {selectedCategory && (<h2 className="section-title">Books in "{selectedCategory}"</h2>)}
      <div className="book-list dashboard-container" style={{marginBottom:"10px"}}>
        <div className='book-grid'>
           {books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p>No books found for "{selectedCategory}"</p>
        )}
        </div>
       
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default Home;
