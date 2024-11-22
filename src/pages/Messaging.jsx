import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Button, Typography, Switch, FormControlLabel, 
  Select, MenuItem, Paper, IconButton, Tooltip
} from '@mui/material';
import { 
  Send as SendIcon, 
  Mic as MicIcon, 
  MicOff as MicOffIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon
} from '@mui/icons-material';

// Simulated API for translation
const translateMessage = async (text, targetLanguage) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return `Translated to ${targetLanguage}: ${text}`;
};

// Simulated API for speech-to-text
const speechToText = async (audio, language) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Transcribed and translated to ${language}: This is a simulated transcription.`;
};

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showTranslation, setShowTranslation] = useState(true);
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [transcript, setTranscript] = useState('');

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      translation: await translateMessage(inputMessage, preferredLanguage),
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const handleLanguageChange = (event) => {
    setPreferredLanguage(event.target.value);
  };

  const toggleCall = () => {
    setIsCallActive(!isCallActive);
    if (!isCallActive) {
      // Start the call
      setTranscript('');
    } else {
      // End the call
      setIsMicOn(false);
      setIsAudioOn(true);
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  useEffect(() => {
    let interval;
    if (isCallActive && isMicOn) {
      interval = setInterval(async () => {
        const newTranscript = await speechToText('simulated-audio', preferredLanguage);
        setTranscript(prev => prev + newTranscript + ' ');
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isCallActive, isMicOn, preferredLanguage]);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Communication Center</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <FormControlLabel
          control={<Switch checked={showTranslation} onChange={() => setShowTranslation(!showTranslation)} />}
          label="Show translations"
        />
        <Select
          value={preferredLanguage}
          onChange={handleLanguageChange}
          sx={{ ml: 2 }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="fr">French</MenuItem>
          <MenuItem value="de">German</MenuItem>
        </Select>
      </Box>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Audio Call</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            variant="contained"
            color={isCallActive ? "secondary" : "primary"}
            onClick={toggleCall}
            sx={{ mr: 2 }}
          >
            {isCallActive ? "End Call" : "Start Call"}
          </Button>
          <Tooltip title="Toggle Microphone">
            <IconButton onClick={toggleMic} disabled={!isCallActive}>
              {isMicOn ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Audio">
            <IconButton onClick={toggleAudio} disabled={!isCallActive}>
              {isAudioOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        {isCallActive && (
          <Paper variant="outlined" sx={{ p: 2, maxHeight: 100, overflowY: 'auto' }}>
            <Typography variant="body2">{transcript}</Typography>
          </Paper>
        )}
      </Paper>

      <Box sx={{ height: 400, overflowY: 'auto', border: '1px solid #ccc', p: 2, mb: 2 }}>
        {messages.map((message) => (
          <Box key={message.id} sx={{ mb: 2 }}>
            <Typography>{message.text}</Typography>
            {showTranslation && (
              <Typography color="textSecondary">{message.translation}</Typography>
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Messaging;

