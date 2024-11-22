import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Grid, Alert, Snackbar } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { LocalShipping, LocationOn, CheckCircle } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Fix for default marker icon in production build
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ShipmentTracking() {
  const [trackingId, setTrackingId] = useState('');
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleTrack = () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setShipmentDetails({
        id: trackingId,
        status: 'In Transit',
        eta: '2023-06-15T14:30:00',
        carrier: 'FreshExpress Logistics',
        currentLocation: 'Mumbai, India',
        origin: 'Delhi, India',
        destination: 'London, UK',
        stages: [
          { status: 'Picked Up', location: 'Delhi, India', timestamp: '2023-06-10T09:00:00' },
          { status: 'In Transit', location: 'Mumbai, India', timestamp: '2023-06-12T14:30:00' },
        ],
        coordinates: [19.0760, 72.8777], // Mumbai coordinates
      });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (shipmentDetails) {
      // Simulating real-time updates
      const interval = setInterval(() => {
        setShipmentDetails(prevDetails => {
          if (!prevDetails) return null;
          const newStage = {
            status: 'Customs Clearance',
            location: 'Dubai, UAE',
            timestamp: new Date().toISOString(),
          };
          const updatedDetails = {
            ...prevDetails,
            stages: [...prevDetails.stages, newStage],
            currentLocation: 'Dubai, UAE',
            coordinates: [25.2048, 55.2708], // Dubai coordinates
          };
          setNotification(`Shipment update: ${newStage.status} at ${newStage.location}`);
          return updatedDetails;
        });
      }, 10000); // Update every 10 seconds for demo purposes

      return () => clearInterval(interval);
    }
  }, [shipmentDetails]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Shipment Tracking</Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={handleTrack} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Track'}
          </Button>
        </Grid>
      </Grid>

      {shipmentDetails && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Shipment Details</Typography>
                <Typography><strong>Tracking ID:</strong> {shipmentDetails.id}</Typography>
                <Typography><strong>Status:</strong> {shipmentDetails.status}</Typography>
                <Typography><strong>ETA:</strong> {formatDate(shipmentDetails.eta)}</Typography>
                <Typography><strong>Carrier:</strong> {shipmentDetails.carrier}</Typography>
                <Typography><strong>Current Location:</strong> {shipmentDetails.currentLocation}</Typography>
                <Typography><strong>Origin:</strong> {shipmentDetails.origin}</Typography>
                <Typography><strong>Destination:</strong> {shipmentDetails.destination}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Shipment Location</Typography>
                <div style={{ height: '300px', width: '100%' }}>
                  <MapContainer center={shipmentDetails.coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={shipmentDetails.coordinates}>
                      <Popup>{shipmentDetails.currentLocation}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Shipment Timeline</Typography>
                <Timeline>
                  {shipmentDetails.stages.map((stage, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color={index === 0 ? "secondary" : index === shipmentDetails.stages.length - 1 ? "primary" : "grey"}>
                          {index === 0 ? <LocalShipping /> : index === shipmentDetails.stages.length - 1 ? <LocationOn /> : <CheckCircle />}
                        </TimelineDot>
                        {index < shipmentDetails.stages.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="h6" component="span">{stage.status}</Typography>
                        <Typography>{stage.location}</Typography>
                        <Typography variant="body2" color="textSecondary">{formatDate(stage.timestamp)}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Shipment Progress</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={shipmentDetails.stages}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(label) => formatDate(label)} />
                    <Legend />
                    <Line type="monotone" dataKey="status" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setNotification(null)} severity="info" sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ShipmentTracking;

