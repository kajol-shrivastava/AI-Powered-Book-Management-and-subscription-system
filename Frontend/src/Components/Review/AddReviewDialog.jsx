// Components/AddReviewDialog/AddReviewDialog.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
  Box
} from '@mui/material';

const AddReviewDialog = ({ open, handleClose, onSubmit }) => {
  const [reviewData, setReviewData] = useState({
    reviewedBy: '',
    rating: 0,
    review: ''
  });

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, value) => {
    setReviewData({ ...reviewData, rating: value });
  };

  const handleSubmit = () => {
    onSubmit(reviewData);
    handleClose();
    setReviewData({ reviewedBy: '', rating: 0, review: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Reviewed By"
            name="reviewedBy"
            value={reviewData.reviewedBy}
            onChange={handleChange}
            fullWidth
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>Rating:</span>
            <Rating
              name="rating"
              value={reviewData.rating}
              onChange={handleRatingChange}
            />
          </Box>
          <TextField
            label="Review"
            name="review"
            value={reviewData.review}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewDialog;
