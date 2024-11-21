import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';

function Card({ title, value, icon: Icon }) {
  return (
    <MuiCard sx={{ minWidth: 275, height: '100%' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
        {Icon && <Icon sx={{ fontSize: 40, color: 'primary.main', mt: 2 }} />}
      </CardContent>
    </MuiCard>
  );
}

export default Card;

