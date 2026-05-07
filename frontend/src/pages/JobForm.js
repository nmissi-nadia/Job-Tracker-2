import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function JobForm() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async () => {
    await api.post('/jobs', { title, company, link, skills });
    alert('✅ Offre ajoutée avec succès !');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Ajouter une offre
        </Typography>
        <TextField fullWidth label="Titre" margin="normal" value={title} onChange={e => setTitle(e.target.value)} />
        <TextField fullWidth label="Entreprise" margin="normal" value={company} onChange={e => setCompany(e.target.value)} />
        <TextField fullWidth label="Lien" margin="normal" value={link} onChange={e => setLink(e.target.value)} />
        <TextField fullWidth label="Compétences" margin="normal" value={skills} onChange={e => setSkills(e.target.value)} />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
          Ajouter
        </Button>
      </Box>
    </Container>
  );
}

export default JobForm;
