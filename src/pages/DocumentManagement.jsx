import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setDocuments([
        { id: 1, name: 'Invoice_001.pdf', category: 'Invoice' },
        { id: 2, name: 'Certificate_of_Origin.pdf', category: 'Certificate' },
        { id: 3, name: 'Packing_List.pdf', category: 'Packing List' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulating file upload
      const newDoc = { id: Date.now(), name: file.name, category: 'Uncategorized' };
      setDocuments([...documents, newDoc]);
    }
  };

  const handleDownload = (doc) => {
    // Simulating document download
    console.log(`Downloading ${doc.name}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h2>Document Management</h2>
      <input
        accept="application/pdf"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" startIcon={<CloudUpload />}>
          Upload Document
        </Button>
      </label>
      <List>
        {documents.map((doc) => (
          <ListItem key={doc.id}>
            <ListItemText primary={doc.name} secondary={doc.category} />
            <Button onClick={() => handleDownload(doc)}>Download</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DocumentManagement;

