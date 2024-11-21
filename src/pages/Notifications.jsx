import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, CircularProgress } from '@mui/material';
import { Delete, CheckCircle } from '@mui/icons-material';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setNotifications([
        { id: 1, message: 'New shipment created', priority: 'low', read: false },
        { id: 2, message: 'Urgent: Shipment delayed', priority: 'high', read: false },
        { id: 3, message: 'Document approval required', priority: 'medium', read: false },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h2>Notifications</h2>
      <List>
        {notifications.map((notif) => (
          <ListItem key={notif.id} 
            style={{ backgroundColor: notif.read ? 'white' : '#f0f0f0' }}
          >
            <ListItemText 
              primary={notif.message} 
              secondary={`Priority: ${notif.priority}`} 
            />
            <IconButton onClick={() => handleMarkAsRead(notif.id)} disabled={notif.read}>
              <CheckCircle />
            </IconButton>
            <IconButton onClick={() => handleDelete(notif.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Notifications;

