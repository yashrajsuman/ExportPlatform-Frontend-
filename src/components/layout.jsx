import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar'; // Replace with your Sidebar component
import Topbar from './Topbar'; // Replace with your Topbar component
import { Outlet } from 'react-router-dom'; // If using react-router for nested routes

function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Outlet /> {/* This renders the routed component */}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
