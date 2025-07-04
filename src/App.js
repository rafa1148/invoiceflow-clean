import React, { useState } from 'react';

function App() {
  const [status, setStatus] = useState('Ready to upload invoice');
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

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
      setResult(null); // Clear previous results
    }
  };

  const processInvoice = async () => {
    if (!file) return;
    
    setProcessing(true);
    setStatus('🔄 Processing invoice with Veryfi...');

    try {
      const formData = new FormData();
      formData.append('invoice', file);

      const response = await fetch(process.env.REACT_APP_API_URL + '/invoices/process', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const data = await response.json();
      setResult(data);
      setStatus('✅ Invoice processed successfully!');
    } catch (error) {
      setStatus('❌ Processing failed: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        minWidth: '400px',
        maxWidth: '600px'
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
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
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
            onClick={processInvoice}
            disabled={!file || processing}
            style={{
              background: (!file || processing) ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: (!file || processing) ? 'not-allowed' : 'pointer'
            }}
          >
            {processing ? '🔄 Processing...' : 'Process Invoice'}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div style={{
            textAlign: 'left',
            background: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            <h3 style={{color: '#333', marginBottom: '1rem'}}>📊 Invoice Details:</h3>
            <div style={{fontSize: '14px', lineHeight: '1.6'}}>
              <p><strong>Vendor:</strong> {result.vendor?.name || 'N/A'}</p>
              <p><strong>Total:</strong> ${result.total || 'N/A'}</p>
              <p><strong>Date:</strong> {result.date || 'N/A'}</p>
              <p><strong>Invoice #:</strong> {result.invoice_number || 'N/A'}</p>
              {result.line_items && result.line_items.length > 0 && (
                <div>
                  <strong>Items:</strong>
                  <ul style={{margin: '0.5rem 0', paddingLeft: '1rem'}}>
                    {result.line_items.slice(0, 3).map((item, index) => (
                      <li key={index}>
                        {item.description || 'Item'} - ${item.total || '0.00'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
