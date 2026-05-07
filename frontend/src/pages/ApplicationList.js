import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Grid, Card, 
  CardContent, IconButton, Chip, MenuItem, Select, 
  FormControl, InputLabel, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Event as EventIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const statusColors = {
  'En attente': 'warning',
  'Entretien': 'info',
  'Offre': 'success',
  'Refusé': 'error'
};

const ApplicationList = () => {
  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ jobId: '', status: 'En attente', date: '' });

  const fetchData = async () => {
    try {
      const [appsRes, jobsRes] = await Promise.all([
        api.get('/applications'),
        api.get('/jobs')
      ]);
      setApps(appsRes.data);
      setJobs(jobsRes.data);
    } catch (err) {
      toast.error('Erreur lors du chargement des données');
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpen = () => {
    setFormData({ jobId: '', status: 'En attente', date: new Date().toISOString().split('T')[0] });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      await api.post('/applications', formData);
      toast.success('Candidature ajoutée');
      fetchData();
      handleClose();
    } catch (err) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      toast.success('Candidature supprimée');
      fetchData();
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/applications/${id}`, { status: newStatus });
      toast.success('Statut mis à jour');
      fetchData();
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Mes Candidatures</Typography>
        <Button 
          variant="contained" 
          onClick={handleOpen}
          sx={{ borderRadius: 2 }}
        >
          Nouvelle candidature
        </Button>
      </Box>

      <Grid container spacing={3}>
        {apps.map((app) => (
          <Grid item xs={12} sm={6} md={4} key={app.id}>
            <Card sx={{ borderRadius: 4, position: 'relative' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip 
                    label={app.status} 
                    color={statusColors[app.status] || 'default'} 
                    size="small" 
                  />
                  <IconButton size="small" color="error" onClick={() => handleDelete(app.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {app.Job?.title || 'Poste inconnu'}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                  <BusinessIcon sx={{ fontSize: 18, mr: 1 }} />
                  <Typography variant="body2">{app.Job?.company || 'Entreprise inconnue'}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                  <EventIcon sx={{ fontSize: 18, mr: 1 }} />
                  <Typography variant="body2">
                    {new Date(app.date).toLocaleDateString()}
                  </Typography>
                </Box>

                <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                  <InputLabel>Modifier Statut</InputLabel>
                  <Select
                    value={app.status}
                    label="Modifier Statut"
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  >
                    {Object.keys(statusColors).map(status => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {apps.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 4 }}>
              <Typography color="text.secondary">Aucune candidature pour le moment.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Add Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Traquer une candidature</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth margin="normal">
            <InputLabel>Offre concernée</InputLabel>
            <Select
              value={formData.jobId}
              label="Offre concernée"
              onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
            >
              {jobs.map(job => (
                <MenuItem key={job.id} value={job.id}>{job.title} - {job.company}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Statut Initial</InputLabel>
            <Select
              value={formData.status}
              label="Statut Initial"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              {Object.keys(statusColors).map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth label="Date" type="date" margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!formData.jobId}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicationList;
