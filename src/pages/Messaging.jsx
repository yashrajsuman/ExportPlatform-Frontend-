import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Switch, FormControlLabel } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      translation: await translateMessage(inputMessage),
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const translateMessage = async (text) => {
    // Simulating API call to translation service
    await new Promise(resolve => setTimeout(resolve, 500));
    return `Translated: ${text}`;
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Messaging</Typography>
      <FormControlLabel
        control={<Switch checked={showTranslation} onChange={() => setShowTranslation(!showTranslation)} />}
        label="Show translations"
      />
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
        />
        <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Messaging;

