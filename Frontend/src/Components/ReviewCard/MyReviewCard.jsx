import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { bookId, reviewedBy, rating, review: reviewText, reviewedAt } = review;

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedReview, setEditedReview] = useState(reviewText);
  const [editedRating, setEditedRating] = useState(rating);

  const handleEditOpen = () => setEditDialogOpen(true);
  const handleEditClose = () => setEditDialogOpen(false);

  const handleEditSave = () => {
    onEdit({ ...review, review: editedReview, rating: editedRating });
    handleEditClose();
  };

  return (
    <>
      <Card sx={{ my: 2, display: "flex", position: "relative" }}>
        <Avatar
          variant="square"
          src={bookId?.coverImage}
          alt={bookId?.title}
          sx={{ width: 80, height: 120, mr: 2 }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">{bookId?.title}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            by {bookId?.author}
          </Typography>

          <Box display="flex" alignItems="center" mt={1}>
            <Rating value={rating} readOnly />
            <Typography variant="body2" color="text.secondary" ml={1}>
              Reviewed by {reviewedBy} on{" "}
              {new Date(reviewedAt).toLocaleDateString()}
            </Typography>
          </Box>

          <Typography variant="body1" mt={1}>
            {reviewText}
          </Typography>
        </CardContent>

        {/* Edit and Delete Buttons */}
        <Box position="absolute" top={8} right={8}>
          <IconButton onClick={handleEditOpen}>
            <MdEdit />
          </IconButton>
          <IconButton onClick={() => onDelete(review)}>
            <MdDelete />
          </IconButton>
        </Box>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Review</DialogTitle>
        <DialogContent>
          <Rating
            value={editedRating}
            onChange={(e, newValue) => setEditedRating(newValue)}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="dense"
            label="Review"
            value={editedReview}
            onChange={(e) => setEditedReview(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewCard;
