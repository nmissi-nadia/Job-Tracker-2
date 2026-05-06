import React, { useState } from 'react';
import api from '../services/api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await api.post('/auth/register', { email, password });
      alert('Utilisateur créé avec succès ✅');
      console.log(res.data);
    } catch (err) {
      alert('Erreur lors de l’inscription ❌');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>S’inscrire</button>
    </div>
  );
}

export default Register;
