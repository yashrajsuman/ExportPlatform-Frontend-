import React, { useState } from 'react';
import { TextField, Button, Switch, FormControlLabel, Divider, Typography } from '@mui/material';

function Settings() {
  const [settings, setSettings] = useState({
    username: 'johndoe',
    email: 'john@example.com',
    password: '',
    notifications: {
      email: true,
      push: false,
    },
  });

  const handleInputChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleSave = () => {
    // Simulating API call to save settings
    console.log('Saving settings:', settings);
  };

  return (
    <div>
      <h2>Settings</h2>
      <Typography variant="h6">Profile</Typography>
      <TextField
        name="username"
        label="Username"
        value={settings.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={settings.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="password"
        label="New Password"
        type="password"
        value={settings.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Divider style={{ margin: '20px 0' }} />
      <Typography variant="h6">Notifications</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={settings.notifications.email}
            onChange={handleNotificationChange}
            name="email"
          />
        }
        label="Email Notifications"
      />
      <FormControlLabel
        control={
          <Switch
            checked={settings.notifications.push}
            onChange={handleNotificationChange}
            name="push"
          />
        }
        label="Push Notifications"
      />
      <Divider style={{ margin: '20px 0' }} />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Settings
      </Button>
    </div>
  );
}

export default Settings;

