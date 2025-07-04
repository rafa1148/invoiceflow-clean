import React, { useState } from 'react';

function App() {
  const [status, setStatus] = useState('Ready to upload invoice');
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const testAPI = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/health');
      const data = await response.json();
      setStatus('✅ Connected: ' + data.message);
    } catch (error) {
      setStatus('❌ Failed: ' + error.message);
    }
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus(`📄 File selected: ${selectedFile.name}`);
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
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        minWidth: '400px'
      }}>
        <h1 style={{color: '#333', marginBottom: '1rem'}}>🚀 InvoiceFlow</h1>
        
        <p style={{
          color: '#666', 
          margin: '1rem 0',
          minHeight: '24px'
        }}>
          {status}
        </p>
        
        {/* File Upload Section */}
        <div style={{ margin: '1.5rem 0' }}>
          <input 
            type="file" 
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            style={{
              margin: '1rem 0',
              padding: '8px',
              border: '2px dashed #667eea',
              borderRadius: '8px',
              width: '100%',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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
            Test Connection
          </button>

          <button 
            onClick={() => setStatus('Ready for Phase 2!')}
            disabled={!file}
            style={{
              background: file ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: file ? 'pointer' : 'not-allowed'
            }}
          >
            Process Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
