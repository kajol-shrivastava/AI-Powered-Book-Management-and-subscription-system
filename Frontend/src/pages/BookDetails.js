import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; // or any spinner you use
import { getBookById } from "../services/book"; // import your API function
import Review from "../Components/ReviewCard/ReviewCard";
import AddReviewDialog from "../Components/Review/AddReviewDialog";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {addReviews} from '../services/review'
import {saveToContinueReadingBook} from '../services/book'
import Rating from '@mui/material/Rating';
import { Typography } from "@mui/material";

function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews , setReviews] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  const handleReadNow = async () => {
  try {
    const result = await saveToContinueReadingBook(bookId);
    console.log(result)
    if (result?.status) {
      toast.success(result.message || "Marked as read successfully!");
    } else {
      toast.error(result.message || "Something went wrong!");
    }
  } catch (err) {
    console.error("Read Now failed:", err);
    toast.error("Failed to mark as read");
  }
};

  const handleAddReview = async( review) => {
  
      let result ;
      try {
        result = await addReviews(bookId, review);
        console.log("success:", result.status);
  
  
        if (result.status ) {
          toast.success(result.message)
        }
        else{
          toast.error(result.message)
        }
  
      } catch (err) {
      console.log(" failed operation:", err);
      }
  };

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getBookById(bookId);
        setBook(res?.data || null);
        setReviews(res?.data?.reviewsData)
      } catch (err) {
        console.error("Search failed:", err);
        setError(err?.response?.data?.message);
        toast.error(err?.response?.data?.message)
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h4" gutterBottom align="center" fontWeight={600} sx={{padding:'10px' , color:'red'}}>
          {error}
        </Typography>

  if (!book) return <p>No book data available</p>;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" }}>
      <div style={{ display: "flex", gap: "2rem", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", borderRadius: 12, padding: 20, backgroundColor: "#fff" }}>
        
        {/* Left: Book Cover */}
        <div style={{ flexShrink: 0 }}>
          <img 
            src={book.coverImage} 
            alt={book.title} 
            style={{ width: 280, height: 400, objectFit: "cover", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.15)" , padding : '15px , 0px' , marginTop:"24px"}} 
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
            <button style={{
              backgroundColor: "#1976d2", color: "white", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer"
            }}
            onClick={handleReadNow}
            >
              Read Now
            </button>
           <button
            onClick={() => setOpenReviewDialog(true)}
            style={{
              backgroundColor: "#fbc02d",
              color: "#333",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Add Review
          </button>
          </div>
        </div>

        {/* Right: Book Details */}
        <div style={{ flexGrow: 1 }}>
          <h1 style={{ marginBottom: 12, fontWeight: "700", fontSize: "2rem", color: "#222" }}>{book.title}</h1>
          <h3 style={{ marginTop: 0, fontWeight: "500", color: "#555" }}>by {book.author}</h3>

          <div style={{ marginTop: 20, lineHeight: 1.6, fontSize: 16 }}>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Subcategories:</strong> {book.subcategory.join(", ")}</p>
            <p><strong>ISBN:</strong> {book.ISBN}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Released At:</strong> {new Date(book.releasedAt).toLocaleDateString()}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>Languages:</strong> {book.language.join(", ")}</p>
            <p><strong>MRP:</strong> <span style={{ textDecoration: "line-through", color: "#999" }}>₹{book.mrp}</span> <span style={{ fontWeight: "600", color: "#d32f2f", marginLeft: 8 }}>₹{book.discountedPrice}</span></p>
<div style={{ display: "flex", alignItems: "left", justifyContent: "left", gap: "8px" }}>
  <strong>Average Rating:</strong>
  <Rating 
    name="read-only-rating"
    value={book.avgRating}
    precision={0.5}
    readOnly
  />
  <span>({book.avgRating})</span>
</div>
            <p><strong>Reviews Count:</strong> {book.reviews}</p>

            <div style={{ marginTop: 30 }}>
              <h3>Description:</h3>
              <p style={{ whiteSpace: "pre-line", color: "#444" }}>{book.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: "3rem", padding: "1rem" }}>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "8px", marginBottom: "1rem" }}>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((rev, idx) => (
            <Review key={idx} review={rev} />
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      <AddReviewDialog
        open={openReviewDialog}
        handleClose={() => setOpenReviewDialog(false)}
        onSubmit={handleAddReview}
      />

      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}

export default BookDetails;
