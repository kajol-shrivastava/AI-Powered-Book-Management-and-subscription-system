import React from "react";
import { Box, Typography, Rating, Paper } from "@mui/material";

const Review = ({ review }) => {
  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {review.reviewedBy || "Guest"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Reviewed on {new Date(review.reviewedAt).toLocaleDateString()}
        </Typography>
      </Box>
      <Box sx={{ marginY: 1 }}>
        <Rating
          value={review.rating}
          readOnly
          precision={0.5}
          size="small"
          sx={{ color: "#ffb400" }}
        />
      </Box>
      <Typography variant="body2">{review.review || "No review text provided."}</Typography>
    </Paper>
  );
};

export default Review;
