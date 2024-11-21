import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

function CarrierDashboard() {
  const [carriers, setCarriers] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch carrier data
    const fetchCarriers = async () => {
      // In a real application, this would be an API call
      const mockCarriers = [
        { id: 1, name: 'Carrier A', type: 'Air', region: 'Asia', responseTime: '2h', performance: 4.5 },
        { id: 2, name: 'Carrier B', type: 'Sea', region: 'Europe', responseTime: '4h', performance: 4.2 },
        { id: 3, name: 'Carrier C', type: 'Ground', region: 'North America', responseTime: '1h', performance: 4.8 },
      ];
      setCarriers(mockCarriers);
    };

    fetchCarriers();
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Carrier Management Dashboard</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Response Time</TableCell>
              <TableCell>Performance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carriers.map((carrier) => (
              <TableRow key={carrier.id}>
                <TableCell>{carrier.name}</TableCell>
                <TableCell>
                  <Chip label={carrier.type} color="primary" variant="outlined" />
                </TableCell>
                <TableCell>{carrier.region}</TableCell>
                <TableCell>{carrier.responseTime}</TableCell>
                <TableCell>{carrier.performance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CarrierDashboard;

