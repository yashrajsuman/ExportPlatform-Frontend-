import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';

function QueryResolution() {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setQueries([
        { id: 1, title: 'Shipment Delay', priority: 'High', status: 'Open' },
        { id: 2, title: 'Invoice Discrepancy', priority: 'Medium', status: 'Open' },
        { id: 3, title: 'Package Damaged', priority: 'High', status: 'Open' },
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h2>Query Resolution</h2>
      <List>
        {queries.map((query) => (
          <ListItem key={query.id} button onClick={() => handleQueryClick(query)}>
            <ListItemText 
              primary={query.title} 
              secondary={`Priority: ${query.priority} | Status: ${query.status}`} 
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedQuery?.title}</DialogTitle>
        <DialogContent>
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

