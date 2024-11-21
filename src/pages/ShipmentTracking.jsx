import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';

function ShipmentTracking() {
  const [trackingId, setTrackingId] = useState('');
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setShipmentDetails({
        id: trackingId,
        status: 'In Transit',
        eta: '2023-06-15',
        carrier: 'Carrier A',
        currentLocation: 'Mumbai, India',
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h2>Shipment Tracking</h2>
      <TextField
        label="Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleTrack}>
        Track
      </Button>

      {loading && <CircularProgress />}

      {shipmentDetails && (
        <Card>
          <CardContent>
            <Typography variant="h6">Shipment Details</Typography>
            <Typography>Tracking ID: {shipmentDetails.id}</Typography>
            <Typography>Status: {shipmentDetails.status}</Typography>
            <Typography>ETA: {shipmentDetails.eta}</Typography>
            <Typography>Carrier: {shipmentDetails.carrier}</Typography>
            <Typography>Current Location: {shipmentDetails.currentLocation}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ShipmentTracking;

