import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Button
} from '@mui/material';
import { getDashboardData } from '../../services/user'; // adjust path as needed
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await getDashboardData();
        setDashboardData(res.data);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">Failed to load dashboard data.</Typography>
      </Box>
    );
  }

  const { user, continueReading, latestBooks } = dashboardData;

  return (
    <Box sx={{ p: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Hi, Welcome {user.name} 👋</Typography>
        <Typography variant="subtitle1" color="text.secondary">Glad to see you back!</Typography>
      </Box>

      {/* Plan Info Section */}
      <Box sx={{ mb: 4 }}>

        <Typography variant="h6">Your Plan Details</Typography>
        {user.planExpiresIn ? (
        <Chip
          label={`Expires in ${user.planExpiresIn} days`}
          color="primary"
          variant="outlined"
          sx={{ mt: 1 }}
        />
      ) : (
        <Chip
          label="Please subscribe to a plan"
          color="primary"
          variant="outlined"
          sx={{ mt: 1, cursor: 'pointer' }}
          onClick={() => navigate('/plans')}  // ✅ function passed, not executed
        />
      )}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Continue Reading */}
      <Box sx={{ mb: 4 }}>
       {continueReading.length>0 && <Typography variant="h6" gutterBottom>Continue Reading</Typography>} 
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
          {continueReading.map((item) => {
            const book = item.bookId;
            return (
              <Card key={item._id} sx={{ minWidth: 200 }}  onClick={() => navigate(`/books/${book._id}`)} style={{ cursor: "pointer" }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={book.coverImage}
                  alt={book.title}
                  sx={{padding:"10px",boxSizing:"border-box"}}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">{book.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{book.author}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>

      {/* Top Books Section */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Top Books</Typography>
          <Button variant="text" onClick={() => navigate('/home')}>View More</Button>
        </Box>
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, mt: 1 }}>
          {latestBooks.map((book) => (
            <Card key={book._id} sx={{ minWidth: 200 }}
            onClick={() => navigate(`/books/${book._id}`)}
             style={{ cursor: "pointer", boxSizing:"border-box" }}>
              <CardMedia
                component="img"
                height="220"
                image={book.coverImage}
                alt={book.title}
                sx={{padding:"10px",boxSizing:"border-box"}}
              />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">{book.author}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;