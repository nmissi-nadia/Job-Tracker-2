import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await api.post('/auth/register', { email, password });
      alert('Utilisateur créé avec succès ');
      console.log(res.data);
    } catch (err) {
      alert('Erreur lors de l’inscription ');
      console.error(err);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: '300px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Inscription</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={handleRegister}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          S’inscrire
        </button>
        <p style={{ marginTop: '20px', color: '#666' }}>
          Déjà un compte ? <Link to="/" style={{ color: '#4CAF50', textDecoration: 'none' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
