import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  IconButton, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, Chip, Tooltip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Launch as LaunchIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '', company: '', link: '', skills: ''
  });

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      toast.error('Erreur lors du chargement des offres');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleOpen = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({ title: job.title, company: job.company, link: job.link, skills: job.skills });
    } else {
      setEditingJob(null);
      setFormData({ title: '', company: '', link: '', skills: '' });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob.id}`, formData);
        toast.success('Offre mise à jour');
      } else {
        await api.post('/jobs', formData);
        toast.success('Offre ajoutée');
      }
      fetchJobs();
      handleClose();
    } catch (err) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      try {
        await api.delete(`/jobs/${id}`);
        toast.success('Offre supprimée');
        fetchJobs();
      } catch (err) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Mes Offres</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpen()}
          sx={{ borderRadius: 2 }}
        >
          Ajouter une offre
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: 3, display: 'flex', alignItems: 'center' }}>
        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
        <TextField 
          fullWidth 
          variant="standard" 
          placeholder="Rechercher par poste ou entreprise..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Poste</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Entreprise</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Compétences</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id} hover>
                <TableCell sx={{ fontWeight: 'medium' }}>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>
                  {job.skills?.split(',').map((skill, idx) => (
                    <Chip key={idx} label={skill.trim()} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </TableCell>
                <TableCell>
                  <Tooltip title="Voir le lien">
                    <IconButton size="small" component="a" href={job.link} target="_blank">
                      <LaunchIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <IconButton size="small" color="primary" onClick={() => handleOpen(job)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(job.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredJobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  Aucune offre trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {editingJob ? 'Modifier l\'offre' : 'Nouvelle offre'}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth label="Poste" margin="normal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            fullWidth label="Entreprise" margin="normal"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <TextField
            fullWidth label="Lien de l'offre" margin="normal"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
          <TextField
            fullWidth label="Compétences (séparées par des virgules)" margin="normal"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Annuler</Button>
          <Button onClick={handleSubmit} variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobList;
