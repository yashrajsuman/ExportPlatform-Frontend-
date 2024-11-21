import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Phone as PhoneIcon, PhoneDisabled as PhoneDisabledIcon } from '@mui/icons-material';

function AudioCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startCall = () => {
    setIsCallActive(true);
    // Simulating real-time transcription and translation
    const interval = setInterval(() => {
      setTranscript(prev => prev + "Hello, this is a simulated transcription. ");
    }, 2000);

    // End call after 10 seconds for demo purposes
    setTimeout(() => {
      clearInterval(interval);
      setIsCallActive(false);
    }, 10000);
  };

  const endCall = () => {
    setIsCallActive(false);
    setTranscript('');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Audio Call with AI Translation</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {!isCallActive ? (
          <Button variant="contained" color="primary" startIcon={<PhoneIcon />} onClick={startCall}>
            Start Call
          </Button>
        ) : (
          <Button variant="contained" color="secondary" startIcon={<PhoneDisabledIcon />} onClick={endCall}>
            End Call
          </Button>
        )}
      </Box>
      {isCallActive && (
        <Box sx={{ border: '1px solid #ccc', p: 2, height: 200, overflowY: 'auto' }}>
          <Typography variant="body1">{transcript}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default AudioCall;

