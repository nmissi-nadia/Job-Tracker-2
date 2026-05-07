import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, useTheme, Avatar } from '@mui/material';
import { 
  WorkRounded as JobIcon, 
  AssignmentRounded as AppIcon, 
  TrendingUpRounded as StatsIcon,
  CheckCircleRounded as SuccessIcon
} from '@mui/icons-material';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Erreur stats:', err);
      }
    };
    fetchStats();
  }, []);

  const kpis = [
    { label: 'Offres Suivies', value: stats?.totalJobs || 0, icon: <JobIcon />, color: '#6366f1' },
    { label: 'Candidatures', value: stats?.totalApplications || 0, icon: <AppIcon />, color: '#10b981' },
    { label: 'Entretiens', value: stats?.byStatus?.['Entretien'] || 0, icon: <StatsIcon />, color: '#3b82f6' },
    { label: 'Offres Reçues', value: stats?.byStatus?.['Offre'] || 0, icon: <SuccessIcon />, color: '#f59e0b' },
  ];

  const chartData = {
    labels: Object.keys(stats?.byStatus || {}),
    datasets: [
      {
        label: 'Statistiques par étape',
        data: Object.values(stats?.byStatus || {}),
        backgroundColor: [
          '#10b981',
          '#059669',
          '#34d399',
          '#065f46',
        ],
        borderRadius: 4,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(stats?.byStatus || {}),
    datasets: [{
      data: Object.values(stats?.byStatus || {}),
      backgroundColor: ['#10b981', '#059669', '#34d399', '#065f46'],
      borderWidth: 0,
      hoverOffset: 15
    }]
  };


  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Bonjour ! 👋</Typography>
        <Typography variant="body1" color="text.secondary">
          Voici un aperçu de votre progression aujourd'hui.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpis.map((kpi, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ 
              borderRadius: 2, 
              position: 'relative', 
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              '&:hover': { transform: 'scale(1.02)', transition: '0.3s' }
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 3 }}>
                <Avatar sx={{ 
                  bgcolor: `${kpi.color}15`, 
                  color: kpi.color, 
                  width: 56, 
                  height: 56,
                  borderRadius: '8px'
                }}>
                  {kpi.icon}
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>{kpi.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{kpi.label}</Typography>
                </Box>
              </CardContent>
              <Box sx={{ 
                position: 'absolute', bottom: 0, left: 0, width: '100%', 
                height: 4, bgcolor: kpi.color, opacity: 0.3 
              }} />
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Activité Récente</Typography>
            <Box sx={{ height: 300 }}>
              <Bar data={chartData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                  y: { beginAtZero: true, grid: { display: false } },
                  x: { grid: { display: false } }
                }
              }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Répartition</Typography>
            <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={doughnutData} options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } } 
              }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
