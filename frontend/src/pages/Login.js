import React, { useState } from 'react';
import api from '../services/api';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await api.post('/auth/login', { email, password });
    setToken(res.data.token);
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default Login;
