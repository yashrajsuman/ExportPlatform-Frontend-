import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function RateNegotiation() {
  const [shipmentDetails, setShipmentDetails] = useState({
    weight: '',
    type: '',
    destination: '',
  });
  const [rates, setRates] = useState([]);
  const [openNegotiation, setOpenNegotiation] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState(null);

  const handleInputChange = (e) => {
    setShipmentDetails({ ...shipmentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating API call to get rates
    const mockRates = [
      { carrier: 'Carrier A', rate: 100 },
      { carrier: 'Carrier B', rate: 120 },
      { carrier: 'Carrier C', rate: 110 },
    ];
    setRates(mockRates);
  };

  const handleNegotiate = (carrier) => {
    setSelectedCarrier(carrier);
    setOpenNegotiation(true);
  };

  const handleCloseNegotiation = () => {
    setOpenNegotiation(false);
  };

  return (
    <div>
      <h2>Rate Negotiation</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="weight"
          label="Weight"
          value={shipmentDetails.weight}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="type"
          label="Type"
          value={shipmentDetails.type}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="destination"
          label="Destination"
          value={shipmentDetails.destination}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Get Rates
        </Button>
      </form>

      {rates.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Carrier</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates.map((rate) => (
                <TableRow key={rate.carrier}>
                  <TableCell>{rate.carrier}</TableCell>
                  <TableCell>${rate.rate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleNegotiate(rate.carrier)}>Negotiate</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openNegotiation} onClose={handleCloseNegotiation}>
        <DialogTitle>Negotiate with {selectedCarrier}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Offer"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNegotiation}>Cancel</Button>
          <Button onClick={handleCloseNegotiation} color="primary">
            Submit Offer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RateNegotiation;

