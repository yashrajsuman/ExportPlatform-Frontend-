import React, { useState, useEffect } from 'react';
import {
  List, ListItem, ListItemText, Button, CircularProgress, Typography, Paper,
  TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle,
  DialogContent, DialogActions, Snackbar, Alert, Chip
} from '@mui/material';
import { CloudUpload, Download, Edit, CheckCircle, Warning } from '@mui/icons-material';

// Simulated AI function for document verification
const verifyDocument = (document) => {
  // In a real-world scenario, this would be a complex AI model
  return Math.random() > 0.2; // 80% chance of success for demonstration
};

// Simulated AI function for regulatory assistance
const getAIRegulationAssistance = (country) => {
  const regulations = {
    'USA': 'Ensure FDA compliance and proper labeling.',
    'EU': 'Check for pesticide residue limits and organic certification if applicable.',
    'Japan': 'Verify compliance with JAS standards for fresh produce.',
  };
  return regulations[country] || 'No specific regulations found. Please consult with a trade expert.';
};

function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [notification, setNotification] = useState(null);
  const [aiAssistance, setAIAssistance] = useState('');

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setDocuments([
        { id: 1, name: 'Invoice_001.pdf', category: 'Invoice', status: 'Verified', country: 'USA' },
        { id: 2, name: 'Certificate_of_Origin.pdf', category: 'Certificate', status: 'Pending', country: 'EU' },
        { id: 3, name: 'Packing_List.pdf', category: 'Packing List', status: 'Verified', country: 'Japan' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulating file upload and AI verification
      const newDoc = { 
        id: Date.now(), 
        name: file.name, 
        category: 'Uncategorized', 
        status: 'Pending',
        country: 'Unknown'
      };
      setDocuments([...documents, newDoc]);
      setNotification({ message: `New document uploaded: ${file.name}`, severity: 'info' });
    }
  };

  const handleDownload = (doc) => {
    // Simulating document download
    console.log(`Downloading ${doc.name}`);
  };

  const handleEdit = (doc) => {
    setCurrentDocument(doc);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentDocument(null);
  };

  const handleSaveDocument = () => {
    // Simulating document update
    const updatedDocuments = documents.map(doc => 
      doc.id === currentDocument.id ? currentDocument : doc
    );
    setDocuments(updatedDocuments);
    handleCloseDialog();
    setNotification({ message: 'Document updated successfully', severity: 'success' });
  };

  const handleCreateFromTemplate = () => {
    if (selectedTemplate) {
      const newDoc = {
        id: Date.now(),
        name: `${selectedTemplate}_${Date.now()}.pdf`,
        category: selectedTemplate,
        status: 'Draft',
        country: selectedCountry || 'Unknown'
      };
      setDocuments([...documents, newDoc]);
      setSelectedTemplate('');
      setSelectedCountry('');
      setNotification({ message: 'Document created from template', severity: 'success' });
    }
  };

  const handleVerifyDocument = (doc) => {
    const isVerified = verifyDocument(doc);
    const updatedDoc = { ...doc, status: isVerified ? 'Verified' : 'Failed Verification' };
    const updatedDocuments = documents.map(d => d.id === doc.id ? updatedDoc : d);
    setDocuments(updatedDocuments);
    setNotification({ 
      message: isVerified ? 'Document verified successfully' : 'Document verification failed', 
      severity: isVerified ? 'success' : 'error'
    });
  };

  const handleGetAIAssistance = () => {
    if (selectedCountry) {
      const assistance = getAIRegulationAssistance(selectedCountry);
      setAIAssistance(assistance);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Document Management</Typography>
      
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>Upload Document</Typography>
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
      </Paper>

      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>Create from Template</Typography>
        <FormControl fullWidth style={{ marginBottom: '10px' }}>
          <InputLabel>Select Template</InputLabel>
          <Select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <MenuItem value="Invoice">Invoice</MenuItem>
            <MenuItem value="Packing List">Packing List</MenuItem>
            <MenuItem value="Certificate of Origin">Certificate of Origin</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: '10px' }}>
          <InputLabel>Select Country</InputLabel>
          <Select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="EU">European Union</MenuItem>
            <MenuItem value="Japan">Japan</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateFromTemplate}
          disabled={!selectedTemplate || !selectedCountry}
        >
          Create Document
        </Button>
      </Paper>

      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>AI Regulation Assistance</Typography>
        <FormControl fullWidth style={{ marginBottom: '10px' }}>
          <InputLabel>Select Country</InputLabel>
          <Select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="EU">European Union</MenuItem>
            <MenuItem value="Japan">Japan</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGetAIAssistance}
          disabled={!selectedCountry}
        >
          Get AI Assistance
        </Button>
        {aiAssistance && (
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            {aiAssistance}
          </Typography>
        )}
      </Paper>

      <List>
        {documents.map((doc) => (
          <ListItem key={doc.id}>
            <ListItemText 
              primary={doc.name} 
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {doc.category}
                  </Typography>
                  {" — "}
                  {doc.country}
                </>
              }
            />
            <Chip 
              label={doc.status} 
              color={doc.status === 'Verified' ? 'success' : doc.status === 'Pending' ? 'warning' : 'error'}
              icon={doc.status === 'Verified' ? <CheckCircle /> : <Warning />}
              style={{ marginRight: '8px' }}
            />
            <Button startIcon={<Download />} onClick={() => handleDownload(doc)}>Download</Button>
            <Button startIcon={<Edit />} onClick={() => handleEdit(doc)}>Edit</Button>
            <Button onClick={() => handleVerifyDocument(doc)}>Verify</Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Document</DialogTitle>
        <DialogContent>
          {currentDocument && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Document Name"
                type="text"
                fullWidth
                value={currentDocument.name}
                onChange={(e) => setCurrentDocument({...currentDocument, name: e.target.value})}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentDocument.category}
                  onChange={(e) => setCurrentDocument({...currentDocument, category: e.target.value})}
                >
                  <MenuItem value="Invoice">Invoice</MenuItem>
                  <MenuItem value="Certificate">Certificate</MenuItem>
                  <MenuItem value="Packing List">Packing List</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>Country</InputLabel>
                <Select
                  value={currentDocument.country}
                  onChange={(e) => setCurrentDocument({...currentDocument, country: e.target.value})}
                >
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="EU">European Union</MenuItem>
                  <MenuItem value="Japan">Japan</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveDocument} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={!!notification} 
        autoHideDuration={6000} 
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setNotification(null)} severity={notification?.severity} sx={{ width: '100%' }}>
          {notification?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DocumentManagement;

