import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, Typography, Slider, Chip, CircularProgress,
  Grid, Card, CardContent, Select, MenuItem
} from '@mui/material';
import { CompareArrows, TrendingUp, AutorenewRounded } from '@mui/icons-material';

// Simulated API calls
const fetchRates = async (shipmentDetails) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { carrier: 'Carrier A', rate: 100, availability: 'High', transit: '3-5 days' },
    { carrier: 'Carrier B', rate: 120, availability: 'Medium', transit: '2-4 days' },
    { carrier: 'Carrier C', rate: 110, availability: 'Low', transit: '4-6 days' },
  ];
};

const negotiateRate = async (carrier, offer) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Math.random() > 0.5 ? 'accepted' : 'rejected';
};

const getMarketTrends = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { averageRate: 105, trend: 'increasing' };
};

function RateNegotiation() {
  const [shipmentDetails, setShipmentDetails] = useState({
    weight: '',
    type: '',
    destination: '',
    volume: '',
  });
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openNegotiation, setOpenNegotiation] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [sellerRange, setSellerRange] = useState([80, 150]);
  const [offer, setOffer] = useState('');
  const [negotiationResult, setNegotiationResult] = useState(null);
  const [marketTrends, setMarketTrends] = useState(null);
  const [autoNegotiate, setAutoNegotiate] = useState(false);

  useEffect(() => {
    const fetchMarketTrends = async () => {
      const trends = await getMarketTrends();
      setMarketTrends(trends);
    };
    fetchMarketTrends();
  }, []);

  const handleInputChange = (e) => {
    setShipmentDetails({ ...shipmentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fetchedRates = await fetchRates(shipmentDetails);
    setRates(fetchedRates);
    setLoading(false);
  };

  const handleNegotiate = (carrier) => {
    setSelectedCarrier(carrier);
    setOpenNegotiation(true);
    setOffer('');
    setNegotiationResult(null);
  };

  const handleCloseNegotiation = () => {
    setOpenNegotiation(false);
  };

  const handleOfferSubmit = async () => {
    const result = await negotiateRate(selectedCarrier, offer);
    setNegotiationResult(result);
  };

  const handleAutoNegotiate = async () => {
    setAutoNegotiate(true);
    for (let carrier of rates) {
      const autoOffer = Math.floor((sellerRange[0] + sellerRange[1]) / 2);
      const result = await negotiateRate(carrier.carrier, autoOffer);
      if (result === 'accepted') {
        setSelectedCarrier(carrier.carrier);
        setNegotiationResult('accepted');
        break;
      }
    }
    setAutoNegotiate(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Rate Negotiation</Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Set Your Rate Range (per kg)</Typography>
          <Slider
            value={sellerRange}
            onChange={(e, newValue) => setSellerRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={200}
          />
          <Typography>Range: ${sellerRange[0]} - ${sellerRange[1]}</Typography>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="weight"
              label="Weight (kg)"
              value={shipmentDetails.weight}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="type"
              label="Type"
              value={shipmentDetails.type}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="destination"
              label="Destination"
              value={shipmentDetails.destination}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="volume"
              label="Volume"
              value={shipmentDetails.volume}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Rates
        </Button>
      </form>

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {rates.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Carrier</TableCell>
                <TableCell>Rate (per kg)</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Transit Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates.map((rate) => (
                <TableRow key={rate.carrier}>
                  <TableCell>{rate.carrier}</TableCell>
                  <TableCell>${rate.rate}</TableCell>
                  <TableCell>{rate.availability}</TableCell>
                  <TableCell>{rate.transit}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleNegotiate(rate.carrier)}>Negotiate</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {marketTrends && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Market Trends</Typography>
            <Typography>Average Rate: ${marketTrends.averageRate}</Typography>
            <Typography>Trend: {marketTrends.trend} <TrendingUp color="primary" /></Typography>
          </CardContent>
        </Card>
      )}

      <Button
        variant="contained"
        color="secondary"
        startIcon={<AutorenewRounded />}
        onClick={handleAutoNegotiate}
        disabled={autoNegotiate || rates.length === 0}
        sx={{ mt: 2 }}
      >
        {autoNegotiate ? 'Auto-Negotiating...' : 'Auto-Negotiate'}
      </Button>

      <Dialog open={openNegotiation} onClose={handleCloseNegotiation}>
        <DialogTitle>Negotiate with {selectedCarrier}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Offer"
            type="number"
            fullWidth
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
          {negotiationResult && (
            <Typography color={negotiationResult === 'accepted' ? 'green' : 'red'}>
              Offer {negotiationResult}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNegotiation}>Cancel</Button>
          <Button onClick={handleOfferSubmit} color="primary">
            Submit Offer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RateNegotiation;

