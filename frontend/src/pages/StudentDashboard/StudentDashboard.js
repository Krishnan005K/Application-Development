import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CircularProgress,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  IconButton,
  ListItemIcon,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QuizIcon from '@mui/icons-material/Quiz';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function StudentDashboard() {
  const [studentsData, setStudentsData] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student data from backend
    axios.get('/students/all')
      .then(response => {
        setStudentsData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        setLoading(false);
      });

    // Fetch feedback data from backend
    axios.get('/api/feedbacks')
      .then(response => {
        setFeedbackData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching feedback data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!studentsData || !feedbackData) {
    return <Typography variant="h6">No data available</Typography>;
  }

  const filteredStudents = filter === 'all' ? studentsData : studentsData.filter(student => student.category === filter);

  // Bar chart data
  const barData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Solved Questions',
        data: [
          filteredStudents.solvedQuestions.easy.solved,
          filteredStudents.solvedQuestions.medium.solved,
          filteredStudents.solvedQuestions.hard.solved
        ],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        borderRadius: 5,
      }
    ]
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Performance', 'Solved Questions', 'MCQ'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 && <DashboardIcon />}
                  {index === 1 && <AssessmentIcon />}
                  {index === 2 && <AssessmentIcon />}
                  {index === 3 && <QuizIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f0f0' }}>
        <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Student Dashboard</Typography>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                startAdornment={<FilterListIcon />}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="category1">Category 1</MenuItem>
                <MenuItem value="category2">Category 2</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* User Profile Card */}
          <Grid item xs={12}>
            <Card sx={{ p: 3, display: 'flex', alignItems: 'center', boxShadow: 3, borderRadius: 2 }}>
              <Avatar src={studentsData.avatar} sx={{ width: 72, height: 72, mr: 3 }} />
              <Box>
                <Typography variant="h5">{studentsData.name}</Typography>
                <Typography variant="body1" color="textSecondary">{studentsData.email}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Register Number: {studentsData.register_number} | Degree: BE-CSE | Batch: 2022-26 | College: Sri Krishna College of Technology
                </Typography>
                <Typography variant="body2" color="textSecondary">Last Updated: {studentsData.lastUpdated} | Level: {studentsData.level}</Typography>
              </Box>
            </Card>
          </Grid>

          {/* Overall Performance Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6">Overall Performance</Typography>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                <CircularProgress variant="determinate" value={studentsData.performance} size={80} />
              </Box>
              <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                {`${studentsData.performanceScore} / ${studentsData.maxScore}`}
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary">
                Profiling For: {studentsData.profilingFor}
              </Typography>
            </Card>
          </Grid>

          {/* Solved Questions Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6">Solved Questions</Typography>
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
                <CircularProgress variant="determinate" value={(studentsData.solvedQuestions.solved / studentsData.solvedQuestions.total) * 100} size={80} />
              </Box>
              <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                {`${studentsData.solvedQuestions.solved} / ${studentsData.solvedQuestions.total} Questions`}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Easy: {`${studentsData.solvedQuestions.easy.solved}/${studentsData.solvedQuestions.easy.total}`}<br />
                Medium: {`${studentsData.solvedQuestions.medium.solved}/${studentsData.solvedQuestions.medium.total}`}<br />
                Hard: {`${studentsData.solvedQuestions.hard.solved}/${studentsData.solvedQuestions.hard.total}`}
              </Typography>
            </Card>
          </Grid>

          {/* MCQ Stats Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6">MCQ</Typography>
              <Typography variant="body2" color="textSecondary">
                Questions Attended: {studentsData.mcq.questionsAttended}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Solved Correctly: {studentsData.mcq.solvedCorrectly}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Your Score: {studentsData.mcq.score}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Accuracy: {studentsData.mcq.accuracy}%
              </Typography>
            </Card>
          </Grid>

          {/* Bar Graph for Solved Questions */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6">Solved Questions Breakdown</Typography>
              <Bar data={barData} />
            </Paper>
          </Grid>

          {/* Feedbacks Section */}
          <Grid item xs={12}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6">Feedbacks</Typography>
              {feedbackData.length > 0 ? (
                <List>
                  {feedbackData.map(feedback => (
                    <ListItem key={feedback.id}>
                      <ListItemText primary={feedback.comment} secondary={`Rating: ${feedback.rating}`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No feedback available.
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default StudentDashboard;