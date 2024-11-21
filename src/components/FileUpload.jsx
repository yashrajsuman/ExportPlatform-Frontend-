import React, { useState } from 'react';
import { Button, Typography, LinearProgress } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

function FileUpload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Simulating upload progress
      let uploadProgress = 0;
      const interval = setInterval(() => {
        uploadProgress += 10;
        setProgress(uploadProgress);
        if (uploadProgress >= 100) {
          clearInterval(interval);
          onUpload(selectedFile);
          setSelectedFile(null);
          setProgress(0);
        }
      }, 500);
    }
  };

  return (
    <div>
      <input
        accept="*/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileSelect}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" startIcon={<CloudUpload />}>
          Select File
        </Button>
      </label>
      {selectedFile && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Selected file: {selectedFile.name}
        </Typography>
      )}
      {selectedFile && (
        <Button onClick={handleUpload} variant="contained" color="primary" sx={{ mt: 2 }}>
          Upload
        </Button>
      )}
      {progress > 0 && <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />}
    </div>
  );
}

export default FileUpload;

