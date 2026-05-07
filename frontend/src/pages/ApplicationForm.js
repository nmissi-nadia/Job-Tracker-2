import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';

function ApplicationForm() {
  const [jobId, setJobId] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    await api.post('/applications', { jobId, status, date });
    alert('✅ Candidature ajoutée avec succès !');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Ajouter une candidature
        </Typography>
        <TextField fullWidth label="ID de l'offre" margin="normal" value={jobId} onChange={e => setJobId(e.target.value)} />
        <TextField
          select
          fullWidth
          label="Statut"
          margin="normal"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <MenuItem value="En attente">En attente</MenuItem>
          <MenuItem value="Entretien">Entretien</MenuItem>
          <MenuItem value="Acceptée">Acceptée</MenuItem>
          <MenuItem value="Refusée">Refusée</MenuItem>
        </TextField>
        <TextField
          fullWidth
          type="date"
          margin="normal"
          value={date}
          onChange={e => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleSubmit}>
          Ajouter
        </Button>
      </Box>
    </Container>
  );
}

export default ApplicationForm;
