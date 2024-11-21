import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

function CarrierSelectionRules() {
  const [rules, setRules] = useState({
    maxTransitTime: '',
    maxCost: '',
    prioritizeRefrigerated: false,
    prioritizeExpedited: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setRules(prevRules => ({
      ...prevRules,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send these rules to your backend
    console.log('Submitted rules:', rules);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Carrier Selection Rules</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="maxTransitTime"
          label="Maximum Transit Time (hours)"
          type="number"
          value={rules.maxTransitTime}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="maxCost"
          label="Maximum Cost ($)"
          type="number"
          value={rules.maxCost}
          onChange={handleChange}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={rules.prioritizeRefrigerated}
                onChange={handleChange}
                name="prioritizeRefrigerated"
              />
            }
            label="Prioritize Refrigerated Transport"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rules.prioritizeExpedited}
                onChange={handleChange}
                name="prioritizeExpedited"
              />
            }
            label="Prioritize Expedited Shipping"
          />
        </FormGroup>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Rules
        </Button>
      </form>
    </Box>
  );
}

export default CarrierSelectionRules;

