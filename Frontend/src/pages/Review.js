import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import ReviewCard from "../Components/ReviewCard/MyReviewCard";
import { userReviews, editReview, deleteReview } from "../services/review";

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchMyReviews = async () => {
    setLoading(true);
    try {
      const response = await userReviews();
      if (response?.status) {
        setReviews(response.data);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (updatedReview) => {
    try {
      const { _id: reviewId, bookId } = updatedReview;
      const response = await editReview(bookId?._id, reviewId, {
        reviewedBy: updatedReview.reviewedBy,
        rating: updatedReview.rating,
        review: updatedReview.review,
      });

      if (response?.status) {
        setReviews((prev) =>
          prev.map((r) => (r._id === reviewId ? { ...r, ...updatedReview } : r))
        );
        setSnackbar({ open: true, message: "Review updated successfully!", severity: "success" });
      }
    } catch (error) {
      console.error("Edit failed:", error);
      setSnackbar({ open: true, message: "Failed to update review", severity: "error" });
    }
  };

  const handleDelete = async (reviewToDelete) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const { _id: reviewId, bookId } = reviewToDelete;
      const response = await deleteReview(bookId?._id, reviewId);

      if (response?.status) {
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        setSnackbar({ open: true, message: "Review deleted successfully!", severity: "success" });
      }
    } catch (error) {
      console.error("Delete failed:", error);
      setSnackbar({ open: true, message: "Failed to delete review", severity: "error" });
    }
  };

  useEffect(() => {
  fetchMyReviews();
  }, []);


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        My Book Reviews
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
      ) : reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <Typography variant="body1" textAlign="center" color="text.secondary">
          You haven’t reviewed any books yet.
        </Typography>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyReviewsPage;
