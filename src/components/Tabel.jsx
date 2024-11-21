import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';

function CarrierManagement() {
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentCarrier, setCurrentCarrier] = useState({ name: '', region: '', type: '' });

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setCarriers([
        { id: 1, name: 'Carrier A', region: 'Asia', type: 'Sea' },
        { id: 2, name: 'Carrier B', region: 'Europe', type: 'Air' },
        { id: 3, name: 'Carrier C', region: 'North America', type: 'Ground' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCarrier({ name: '', region: '', type: '' });
  };

  const handleChange = (e) => {
    setCurrentCarrier({ ...currentCarrier, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (currentCarrier.id) {
      setCarriers(carriers.map(c => c.id === currentCarrier.id ? currentCarrier : c));
    } else {
      setCarriers([...carriers, { ...currentCarrier, id: Date.now() }]);
    }
    handleClose();
  };

  const handleEdit = (carrier) => {
    setCurrentCarrier(carrier);
    handleOpen();
  };

  const handleDelete = (id) => {
    setCarriers(carriers.filter(c => c.id !== id));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Carrier
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carriers.map((carrier) => (
              <TableRow key={carrier.id}>
                <TableCell>{carrier.name}</TableCell>
                <TableCell>{carrier.region}</TableCell>
                <TableCell>{carrier.type}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(carrier)}>Edit</Button>
                  <Button onClick={() => handleDelete(carrier.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentCarrier.id ? 'Edit Carrier' : 'Add Carrier'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Carrier Name"
            type="text"
            fullWidth
            value={currentCarrier.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="region"
            label="Region"
            type="text"
            fullWidth
            value={currentCarrier.region}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Shipping Type"
            type="text"
            fullWidth
            value={currentCarrier.type}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CarrierManagement;

