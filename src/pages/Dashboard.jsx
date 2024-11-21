import React, { useState, useEffect } from 'react';
import { Box, Stack, Paper, Typography, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Card from '../components/Card'; // Import Card component correctly

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simulating demo data
    const data = {
      totalShipments: 150,
      pendingQueries: 5,
      activeCarriers: 10,
      documentsPending: 3,
      shipmentTrends: [12, 19, 3, 5],
    };
    setDashboardData(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Shipments',
        data: dashboardData.shipmentTrends,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Stack direction="column" spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Card title="Total Shipments" value={dashboardData.totalShipments} />
          <Card title="Pending Queries" value={dashboardData.pendingQueries} />
          <Card title="Active Carriers" value={dashboardData.activeCarriers} />
          <Card title="Documents Pending" value={dashboardData.documentsPending} />
        </Stack>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Shipment Trends
          </Typography>
          <Bar data={chartData} />
        </Paper>
      </Stack>
    </Box>
  );
}

export default Dashboard;
