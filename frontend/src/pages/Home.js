import React from 'react';
import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  RocketLaunch as RocketIcon, 
  QueryStats as StatsIcon, 
  Security as SecurityIcon 
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1a237e 0%, #000051 100%)', 
        color: 'white', 
        py: { xs: 10, md: 15 },
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
            Maîtrisez votre recherche d'emploi
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, opacity: 0.9 }}>
            Traquez vos offres, gérez vos candidatures et analysez vos progrès en un seul endroit.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={() => navigate('/register')}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem', color: 'white' }}
            >
              Démarrer gratuitement
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large"
              onClick={() => navigate('/login')}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              Se connecter
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {[
            { 
              title: 'Gestion Simple', 
              desc: 'Ajoutez des offres en un clic et gardez une trace de tous les liens importants.',
              icon: <RocketIcon sx={{ fontSize: 40, color: '#1a237e' }} />
            },
            { 
              title: 'Statistiques Avancées', 
              desc: 'Visualisez vos taux de succès et le statut de vos candidatures en temps réel.',
              icon: <StatsIcon sx={{ fontSize: 40, color: '#1a237e' }} />
            },
            { 
              title: 'Sécurisé & Privé', 
              desc: 'Vos données sont protégées et accessibles uniquement par vous.',
              icon: <SecurityIcon sx={{ fontSize: 40, color: '#1a237e' }} />
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4, height: '100%' }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 6, textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="body2" color="text.secondary">
          © 2026 Job Tracker. Développé pour votre succès professionnel.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;