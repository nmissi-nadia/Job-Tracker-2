import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Paper, Card, CardContent, 
  IconButton, Chip, Avatar, Tooltip, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import { 
  MoreVert as MoreIcon,
  CalendarToday as DateIcon,
  Business as CompanyIcon,
  EditRounded as EditIcon,
  DeleteRounded as DeleteIcon
} from '@mui/icons-material';
import { motion, Reorder } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const columns = [
  { id: 'En attente', label: 'En attente', color: '#64748b' },
  { id: 'Entretien', label: 'Entretien', color: '#3b82f6' },
  { id: 'Offre', label: 'Offre', color: '#10b981' },
  { id: 'Refusé', label: 'Refusé', color: '#ef4444' },
];

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit State
  const [editOpen, setEditOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [formData, setFormData] = useState({ status: '', date: '' });

  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications');
      setApplications(res.data);
    } catch (err) {
      toast.error('Erreur lors du chargement des candidatures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleEditOpen = (app) => {
    setEditingApp(app);
    setFormData({ 
      status: app.status, 
      date: app.date ? new Date(app.date).toISOString().split('T')[0] : '' 
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/applications/${editingApp.id}`, formData);
      toast.success('Candidature mise à jour');
      fetchApplications();
      setEditOpen(false);
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous supprimer ce suivi ?')) {
      try {
        await api.delete(`/applications/${id}`);
        toast.success('Suivi supprimé');
        fetchApplications();
      } catch (err) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Tableau de Bord des Candidatures</Typography>
        <Typography variant="body1" color="text.secondary">
          Suivez l'avancement de vos démarches en temps réel.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ minHeight: '70vh' }}>
        {columns.map((column) => (
          <Grid item xs={12} sm={6} md={3} key={column.id}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%',
              bgcolor: 'rgba(226, 232, 240, 0.4)',
              borderRadius: 2,
              p: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, px: 1 }}>
                <Box sx={{ 
                  width: 10, height: 10, borderRadius: '50%', 
                  bgcolor: column.color, mr: 1.5 
                }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {column.label}
                </Typography>
                <Chip 
                  label={applications.filter(a => a.status === column.id).length} 
                  size="small" 
                  sx={{ ml: 'auto', fontWeight: 700, bgcolor: 'white' }} 
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {applications
                  .filter((app) => app.status === column.id)
                  .map((app) => (
                    <motion.div
                      key={app.id}
                      layoutId={app.id.toString()}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Card sx={{ 
                        borderRadius: 1.5, 
                        boxShadow: 2,
                        '&:hover': { boxShadow: 5, transform: 'translateY(-2px)' },
                        transition: 'all 0.2s'
                      }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                              {app.Job?.title || 'Poste inconnu'}
                            </Typography>
                            <Box>
                              <IconButton size="small" onClick={() => handleEditOpen(app)}>
                                <EditIcon fontSize="inherit" />
                              </IconButton>
                              <IconButton size="small" color="error" onClick={() => handleDelete(app.id)}>
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <CompanyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                              {app.Job?.company || 'Entreprise'}
                            </Typography>
                          </Box>

                          <Divider sx={{ mb: 1.5, opacity: 0.5 }} />

                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <DateIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {new Date(app.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: 'primary.light' }}>
                              {app.Job?.company?.[0]}
                            </Avatar>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                {applications.filter(a => a.status === column.id).length === 0 && (
                  <Box sx={{ 
                    py: 4, textAlign: 'center', border: '2px dashed rgba(0,0,0,0.05)', 
                    borderRadius: 3, color: 'text.disabled' 
                  }}>
                    <Typography variant="caption">Vide</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 2 } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Mettre à jour le statut</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Nouveau Statut"
            margin="normal"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            SelectProps={{ native: true }}
          >
            {columns.map(col => <option key={col.id} value={col.id}>{col.label}</option>)}
          </TextField>
          <TextField
            fullWidth
            label="Date de mise à jour"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditOpen(false)}>Annuler</Button>
          <Button onClick={handleUpdate} variant="contained" color="secondary">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicationList;
