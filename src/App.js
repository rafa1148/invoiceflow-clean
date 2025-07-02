import React, { useState } from 'react';

function App() {
  const [status, setStatus] = useState('Ready to test');
  
  const testAPI = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/health');
      const data = await response.json();
      setStatus('✅ Connected: ' + data.message);
    } catch (error) {
      setStatus('❌ Failed: ' + error.message);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{color: '#333'}}>🚀 InvoiceFlow</h1>
        <p style={{color: '#666', margin: '1rem 0'}}>{status}</p>
        <button 
          onClick={testAPI}
          style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Test Backend Connection
        </button>
      </div>
    </div>
  );
}

export default App;
