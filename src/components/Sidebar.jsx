import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { Dashboard, LocalShipping, AttachMoney, TrackChanges, QuestionAnswer, Description, Notifications, Settings } from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Carriers', icon: <LocalShipping />, path: '/carriers' },
  { text: 'Rates', icon: <AttachMoney />, path: '/rates' },
  { text: 'Tracking', icon: <TrackChanges />, path: '/tracking' },
  { text: 'Queries', icon: <QuestionAnswer />, path: '/queries' },
  { text: 'Documents', icon: <Description />, path: '/documents' },
  { text: 'Notifications', icon: <Notifications />, path: '/notifications' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;

