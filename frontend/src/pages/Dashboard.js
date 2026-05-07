import React, { useEffect, useState } from 'react';
import { 
  Grid, Paper, Typography, Box, Card, CardContent, 
  Divider, List, ListItem, ListItemText, ListItemIcon, 
  CircularProgress, Button
} from '@mui/material';
import { 
  Work as WorkIcon, 
  CheckCircle as SuccessIcon, 
  Pending as PendingIcon, 
  Cancel as CancelIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, jobsRes] = await Promise.all([
          api.get('/stats'),
          api.get('/jobs')
        ]);
        setStats(statsRes.data);
        setRecentJobs(jobsRes.data.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const chartData = {
    labels: Object.keys(stats?.byStatus || {}),
    datasets: [
      {
        data: Object.values(stats?.byStatus || {}),
        backgroundColor: [
          '#2196f3', // Pending
          '#4caf50', // Offered
          '#ff9800', // Interviewing
          '#f44336', // Rejected
        ],
        borderWidth: 0,
      },
    ],
  };

  const kpis = [
    { title: 'Total Offres', value: stats?.totalJobs || 0, icon: <WorkIcon color="primary" />, color: '#e3f2fd' },
    { title: 'Candidatures', value: stats?.totalApplications || 0, icon: <PendingIcon color="warning" />, color: '#fff3e0' },
    { title: 'Entretiens', value: stats?.byStatus?.['Interview'] || 0, icon: <SuccessIcon color="secondary" />, color: '#e8f5e9' },
    { title: 'Refus', value: stats?.byStatus?.['Rejected'] || 0, icon: <CancelIcon color="error" />, color: '#ffebee' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Tableau de bord
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        {kpis.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  bgcolor: kpi.color, 
                  display: 'flex', 
                  mr: 2 
                }}>
                  {kpi.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {kpi.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {kpi.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Chart Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Statut des candidatures
            </Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              {stats?.totalApplications > 0 ? (
                <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  Aucune donnée disponible
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Recent Jobs Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Offres récentes
              </Typography>
              <Button 
                endIcon={<ArrowForwardIcon />} 
                onClick={() => navigate('/jobs')}
              >
                Tout voir
              </Button>
            </Box>
            <Divider />
            <List>
              {recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <ListItem key={job.id} divider>
                    <ListItemIcon>
                      <WorkIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={job.title} 
                      secondary={job.company} 
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="Aucune offre ajoutée" />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
