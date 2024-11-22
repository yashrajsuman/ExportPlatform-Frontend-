import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  CircularProgress, Typography, Grid, Card, CardContent, Select, MenuItem, 
  FormControl, InputLabel, Chip, Button
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CarrierManagement() {
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterSpecialization, setFilterSpecialization] = useState('All');
  const [shipmentStatuses, setShipmentStatuses] = useState([]);
  const [selectedCarrier, setSelectedCarrier] = useState('');

  useEffect(() => {
    // Simulating API call to fetch carriers
    setTimeout(() => {
      setCarriers([
        { id: 1, name: 'Carrier A', region: 'Asia', type: 'Sea', specialization: 'General', rate: '100/kg', schedule: 'Weekly' },
        { id: 2, name: 'Carrier B', region: 'Europe', type: 'Air', specialization: 'Refrigerated', rate: '200/kg', schedule: 'Daily' },
        { id: 3, name: 'Carrier C', region: 'North America', type: 'Ground', specialization: 'General', rate: '50/kg', schedule: 'Bi-weekly' },
      ]);
      setShipmentStatuses([
        { id: 1, carrier: 'Carrier A', status: 'In Transit', destination: 'Tokyo', eta: '2023-06-15' },
        { id: 2, carrier: 'Carrier B', status: 'Delivered', destination: 'Paris', eta: '2023-06-10' },
        { id: 3, carrier: 'Carrier C', status: 'Delayed', destination: 'New York', eta: '2023-06-20' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCarriers = carriers.filter(carrier => 
    (filterRegion === 'All' || carrier.region === filterRegion) &&
    (filterType === 'All' || carrier.type === filterType) &&
    (filterSpecialization === 'All' || carrier.specialization === filterSpecialization)
  );

  const regions = ['All', ...new Set(carriers.map(c => c.region))];
  const types = ['All', ...new Set(carriers.map(c => c.type))];
  const specializations = ['All', ...new Set(carriers.map(c => c.specialization))];

  const carrierPerformanceData = [
    { name: 'Carrier A', performance: 85 },
    { name: 'Carrier B', performance: 92 },
    { name: 'Carrier C', performance: 78 },
  ];

  const handleCarrierSelect = (event) => {
    setSelectedCarrier(event.target.value);
  };

  const handleCreateShipment = () => {
    if (selectedCarrier) {
      console.log(`Creating shipment with ${selectedCarrier}`);
      // Here you would typically call an API to create the shipment
    } else {
      console.log('Please select a carrier first');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Carrier Management Dashboard</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Carrier Performance</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={carrierPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="performance" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Shipment Statuses</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Carrier</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Destination</TableCell>
                      <TableCell>ETA</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shipmentStatuses.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell>{shipment.carrier}</TableCell>
                        <TableCell>{shipment.status}</TableCell>
                        <TableCell>{shipment.destination}</TableCell>
                        <TableCell>{shipment.eta}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Grid item>
          <FormControl>
            <InputLabel>Region</InputLabel>
            <Select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
              {regions.map(region => (
                <MenuItem key={region} value={region}>{region}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              {types.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Specialization</InputLabel>
            <Select value={filterSpecialization} onChange={(e) => setFilterSpecialization(e.target.value)}>
              {specializations.map(spec => (
                <MenuItem key={spec} value={spec}>{spec}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Select Carrier for Shipment</InputLabel>
            <Select value={selectedCarrier} onChange={handleCarrierSelect}>
              {carriers.map(carrier => (
                <MenuItem key={carrier.id} value={carrier.name}>{carrier.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={handleCreateShipment} fullWidth>
            Create Shipment
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Schedule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCarriers.map((carrier) => (
              <TableRow key={carrier.id}>
                <TableCell>{carrier.name}</TableCell>
                <TableCell>{carrier.region}</TableCell>
                <TableCell>{carrier.type}</TableCell>
                <TableCell>
                  <Chip 
                    label={carrier.specialization} 
                    color={carrier.specialization === 'Refrigerated' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>{carrier.rate}</TableCell>
                <TableCell>{carrier.schedule}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CarrierManagement;

