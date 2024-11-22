import React, { useState, useEffect } from 'react';
import { 
  List, ListItem, ListItemText, TextField, Button, Dialog, DialogTitle, 
  DialogContent, DialogActions, CircularProgress, Typography, Paper, 
  Select, MenuItem, Chip, Grid, IconButton, Tooltip
} from '@mui/material';
import { Flag, Category, Chat } from '@mui/icons-material';

// Simulated AI function for query classification and prioritization
const classifyQuery = (query) => {
  const categories = ['Shipment Status', 'Documentation', 'Rate Inquiry'];
  const priorities = ['Low', 'Medium', 'High'];
  
  // Simulate AI classification
  const category = categories[Math.floor(Math.random() * categories.length)];
  let priority = priorities[Math.floor(Math.random() * priorities.length)];
  
  // Flag high-priority issues
  if (query.toLowerCase().includes('damaged') || query.toLowerCase().includes('delayed')) {
    priority = 'High';
  }
  
  return { category, priority };
};

// Simulated chatbot function
const getChatbotResponse = (query) => {
  if (query.toLowerCase().includes('tracking')) {
    return "You can track your shipment by entering your tracking number on our tracking page.";
  } else if (query.toLowerCase().includes('delivery estimate')) {
    return "Delivery estimates are typically 3-5 business days for domestic shipments and 7-14 days for international shipments.";
  } else {
    return "I'm sorry, I couldn't understand your query. Please contact our support team for further assistance.";
  }
};

function QueryResolution() {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [newQuery, setNewQuery] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setQueries([
        { id: 1, title: 'Shipment Delay', priority: 'High', status: 'Open', category: 'Shipment Status' },
        { id: 2, title: 'Invoice Discrepancy', priority: 'Medium', status: 'Open', category: 'Documentation' },
        { id: 3, title: 'Package Damaged', priority: 'High', status: 'Open', category: 'Shipment Status' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleQueryClick = (query) => {
    setSelectedQuery(query);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setReply('');
  };

  const handleReply = () => {
    // Simulating API call to send reply
    console.log(`Replying to query ${selectedQuery.id}: ${reply}`);
    handleCloseDialog();
  };

  const handleAddQuery = () => {
    if (newQuery.trim() !== '') {
      const { category, priority } = classifyQuery(newQuery);
      const query = {
        id: queries.length + 1,
        title: newQuery,
        priority,
        status: 'Open',
        category,
      };
      setQueries([...queries, query]);
      setNewQuery('');
    }
  };

  const handleChatbotQuery = () => {
    const response = getChatbotResponse(newQuery);
    setChatbotResponse(response);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Query Resolution</Typography>
      
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>Add New Query</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              placeholder="Enter new query..."
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddQuery}
              fullWidth
            >
              Add Query
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleChatbotQuery}
              fullWidth
            >
              Ask Chatbot
            </Button>
          </Grid>
        </Grid>
        {chatbotResponse && (
          <Paper elevation={3} style={{ padding: '10px', marginTop: '10px' }}>
            <Typography variant="body1">{chatbotResponse}</Typography>
          </Paper>
        )}
      </Paper>

      <List>
        {queries.map((query) => (
          <ListItem key={query.id} button onClick={() => handleQueryClick(query)}>
            <ListItemText 
              primary={query.title} 
              secondary={
                <React.Fragment>
                  <Chip 
                    icon={<Flag />} 
                    label={query.priority} 
                    size="small" 
                    color={getPriorityColor(query.priority)}
                    style={{ marginRight: '8px' }}
                  />
                  <Chip 
                    icon={<Category />} 
                    label={query.category} 
                    size="small" 
                    style={{ marginRight: '8px' }}
                  />
                  Status: {query.status}
                </React.Fragment>
              }
            />
            <Tooltip title="Quick chat response">
              <IconButton onClick={(e) => {
                e.stopPropagation();
                setNewQuery(query.title);
                handleChatbotQuery();
              }}>
                <Chat />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedQuery?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Category: {selectedQuery?.category} | Priority: {selectedQuery?.priority}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Your Reply"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleReply} color="primary">
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QueryResolution;

