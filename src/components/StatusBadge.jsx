import React from 'react';
import { Chip } from '@mui/material';

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'error',
  completed: 'info',
};

function StatusBadge({ status }) {
  return (
    <Chip
      label={status}
      color={statusColors[status.toLowerCase()] || 'default'}
      size="small"
    />
  );
}

export default StatusBadge;

