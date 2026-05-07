import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  IconButton, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, Chip, Tooltip,
  InputAdornment, Card
} from '@mui/material';
import { 
  AddRounded as AddIcon, 
  EditRounded as EditIcon, 
  DeleteRounded as DeleteIcon, 
  LaunchRounded as LaunchIcon,
  SearchRounded as SearchIcon,
  SendRounded as ApplyIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../services/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Job Dialog State
  const [open, setOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({ title: '', company: '', link: '', skills: '' });

  // Application Dialog State
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyData, setApplyData] = useState({ status: 'En attente', date: new Date().toISOString().split('T')[0] });

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

  const handleApplyOpen = (job) => {
    setSelectedJob(job);
    setApplyOpen(true);
  };

  const handleJobSubmit = async () => {
    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob.id}`, formData);
        toast.success('Offre mise à jour');
      } else {
        await api.post('/jobs', formData);
        toast.success('Offre ajoutée');
      }
      fetchJobs();
      setOpen(false);
    } catch (err) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleApplySubmit = async () => {
    try {
      await api.post('/applications', {
        jobId: selectedJob.id,
        ...applyData
      });
      toast.success(`Candidature envoyée pour ${selectedJob.company}`);
      setApplyOpen(false);
    } catch (err) {
      toast.error('Erreur lors de l\'envoi de la candidature');
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
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>Mes Opportunités</Typography>
          <Typography variant="body1" color="text.secondary">
            Gérez vos offres et postulez en un clic.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="secondary"
          startIcon={<AddIcon />} 
          onClick={() => handleOpen()}
          sx={{ borderRadius: 3, px: 3 }}
        >
          Nouvelle offre
        </Button>
      </Box>

      <Card sx={{ p: 1, mb: 3, borderRadius: 4 }}>
        <TextField 
          fullWidth 
          variant="outlined" 
          placeholder="Rechercher par poste, entreprise..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: 5, overflow: 'hidden', boxShadow: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 700, py: 2.5 }}>Poste</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Entreprise</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Compétences</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 600 }}>{job.title}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{job.company}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {job.skills?.split(',').map((skill, idx) => (
                      <Chip 
                        key={idx} 
                        label={skill.trim()} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'rgba(16, 185, 129, 0.1)', 
                          color: 'secondary.dark',
                          fontWeight: 600,
                          fontSize: '0.7rem'
                        }} 
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Tooltip title="Postuler maintenant">
                      <IconButton 
                        size="small" 
                        sx={{ bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' } }}
                        onClick={() => handleApplyOpen(job)}
                      >
                        <ApplyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Modifier">
                      <IconButton size="small" sx={{ color: 'primary.light' }} onClick={() => handleOpen(job)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <IconButton size="small" sx={{ color: 'error.light' }} onClick={() => handleDelete(job.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {job.link && (
                      <Tooltip title="Lien original">
                        <IconButton size="small" component="a" href={job.link} target="_blank" sx={{ color: 'info.main' }}>
                          <LaunchIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filteredJobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  Aucune offre trouvée. Commencez par en ajouter une !
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Job Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle sx={{ fontWeight: 800, pt: 3 }}>
          {editingJob ? 'Modifier l\'offre' : 'Ajouter une opportunité'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Titre du poste" margin="normal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="ex: Senior React Developer"
          />
          <TextField
            fullWidth label="Entreprise" margin="normal"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="ex: Google"
          />
          <TextField
            fullWidth label="Lien de l'offre" margin="normal"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
          <TextField
            fullWidth label="Compétences (virgules)" margin="normal"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="React, Node.js, SQL..."
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>Annuler</Button>
          <Button onClick={handleJobSubmit} variant="contained" color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>

      {/* Application Dialog */}
      <Dialog open={applyOpen} onClose={() => setApplyOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle sx={{ fontWeight: 800, pt: 3 }}>
          Lancer une candidature
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Vous allez créer un suivi de candidature pour le poste de <strong>{selectedJob?.title}</strong> chez <strong>{selectedJob?.company}</strong>.
          </Typography>
          
          <TextField
            select
            fullWidth
            label="Statut initial"
            margin="normal"
            value={applyData.status}
            onChange={(e) => setApplyData({ ...applyData, status: e.target.value })}
            SelectProps={{ native: true }}
          >
            <option value="En attente">En attente</option>
            <option value="Entretien">Entretien</option>
            <option value="Offre">Offre</option>
            <option value="Refusé">Refusé</option>
          </TextField>
          
          <TextField
            fullWidth
            label="Date de candidature"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={applyData.date}
            onChange={(e) => setApplyData({ ...applyData, date: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setApplyOpen(false)} sx={{ color: 'text.secondary' }}>Plus tard</Button>
          <Button onClick={handleApplySubmit} variant="contained" color="secondary">Confirmer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobList;
