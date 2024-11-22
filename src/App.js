import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CarrierManagement from './pages/CarrierManagement';
import RateNegotiation from './pages/RateNegotiation';
import ShipmentTracking from './pages/ShipmentTracking';
import QueryResolution from './pages/QueryResolution';
import DocumentManagement from './pages/DocumentManagement';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Messaging from './pages/Messaging';



const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          {/* Conditional Sidebar */}
          {isAuthenticated && <Sidebar />}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              width: { sm: 'calc(100% - 240px)' }, // Dynamically calculate width
            }}
          >
            {/* Conditional Navbar */}
            {isAuthenticated && <Navbar onLogout={handleLogout} />}

            {/* Toolbar Spacer */}
            {isAuthenticated && <Box sx={{ height: 64 }} />}

            {/* Routes */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                {/* Login */}
                <Route
                  path="/login"
                  element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
                />
                {/* Private Routes */}
                <Route
                  path="/"
                  element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/carriers"
                  element={isAuthenticated ? <CarrierManagement /> : <Navigate to="/login" />}
                />
                <Route
                  path="/rates"
                  element={isAuthenticated ? <RateNegotiation /> : <Navigate to="/login" />}
                />
                <Route
                  path="/tracking"
                  element={isAuthenticated ? <ShipmentTracking /> : <Navigate to="/login" />}
                />
                <Route
                  path="/queries"
                  element={isAuthenticated ? <QueryResolution /> : <Navigate to="/login" />}
                />
                <Route
                  path="/documents"
                  element={isAuthenticated ? <DocumentManagement /> : <Navigate to="/login" />}
                />
                <Route
                  path="/messaging"
                  element={isAuthenticated ? <Messaging /> : <Navigate to="/login" />}
                />
                
                <Route
                  path="/notifications"
                  element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />}
                />
                
                <Route
                  path="/settings"
                  element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
                />
                {/* Catch-All */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
