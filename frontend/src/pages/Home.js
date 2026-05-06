import React from 'react';

function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#4CAF50' }}>Bienvenue sur Job Tracker</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Suivez vos candidatures et gérez vos opportunités professionnelles.
        </p>
      </header>

      <section style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          margin: '10px',
          width: '300px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#2196F3' }}>Candidatures</h2>
          <p>Ajoutez et suivez vos candidatures.</p>
          <button style={{
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Voir Candidatures
          </button>
        </div>

        <div style={{
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          margin: '10px',
          width: '300px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#FF9800' }}>Statistiques</h2>
          <p>Analysez vos progrès.</p>
          <button style={{
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Voir Stats
          </button>
        </div>

        <div style={{
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          margin: '10px',
          width: '300px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#4CAF50' }}>Paramètres</h2>
          <p>Configurez votre profil.</p>
          <button style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Aller aux Paramètres
          </button>
        </div>
      </section>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#999' }}>
        <p>&copy; 2026 Job Tracker. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Home;