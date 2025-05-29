import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {searchBooks} from '../services/smartSearch'
import BookCard from "../Components/BookCard/BookCard";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SmartSearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setBooks([]);

    try {
      const res = await searchBooks(query);
      console.log(res);
      setBooks(res?.data || []);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error(error?.response?.data?.message)
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight={600}>
        📚 Smart Book Search
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={9}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search books like 'Top mystery novels'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSearch}
            sx={{ height: "100%" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Grid>
      ) : books.length > 0 ? (
        <div 
        className="dashboard-container"
        style={{ padding: "20px", marginBottom: "60px" }}
        >
          <div className="book-grid"
          style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
          >
            {books.map((book) => (
              <BookCard key={book._id || book.id} book={book} />
            ))}
          </div>
        </div>
      ) : (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            mt={4}
          >
            No books found. Try searching for something else.
          </Typography>
        </Grid>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
      
    </Container>
  );
};



export default SmartSearchPage;
