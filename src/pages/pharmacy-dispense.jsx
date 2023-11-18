import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography,Modal, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

// ----------------------------------------------------------------------

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'item', headerName: 'Item', width: 150 },
  { field: 'quantity', headerName: 'Quantity', width: 120 },
  { field: 'price', headerName: 'Price', width: 120 },
  { field: 'total', headerName: 'Total', width: 120 }
];

export default function PharmacyDispensePage() {
  const [patient, setPatient] = useState(null);
  const [items, setItems] = useState([]);
  const [records, setRecords] = useState([]); 
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const patientId = new URLSearchParams(location.search).get('patientId');
  const [form, setForm] = useState({
    itemId: '',    
    quantity: '',
    price: '',
    total: ''
  });

  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/patients/${patientId}`)
      .then((response) => {
      setPatient(response.data);
      setForm({ ...form, patientId: response.data.id });
      })
      .catch((error) => {
        
        console.error(error);
      });
  }, [patientId,form]); 

  // fetch pharmacy items
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/pharmacies')
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // fetch pharmacy records by patientId
  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/v1/pharmacyRecords/${patientId}`)
      .then(res => {
        setRecords(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [patientId]);

  // handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // update price and total if item is selected
    if (name === 'itemId') {
      const item = items.find(itemz => itemz.id === value);
      if (item) {
        setForm({ ...form, itemId: value, price: item.price, total: item.price * form.quantity });
      }
    }
    // update total if quantity is changed
    if (name === 'quantity') {
      setForm({ ...form, quantity: value, total: form.price * value });
    }
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/pharmacyRecords', form)
      .then(res => {
        console.log(res.data);
        setRecords([...records, res.data]);
        handleClose();
      })
      .catch(err => {
        console.error(err);
      });
  };

  // handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // handle modal close
  const handleClose = () => {
    setOpen(false);
    setForm({ ...form, itemId: '', quantity: '', price: '', total: '' });
  };

  return (
    <>
      <Helmet>
        <title> Pharmacy Records | HMS </title>
      </Helmet>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" align="center">Pharmacy Dispense</Typography>
        </Box>
        {patient && (
          <Grid container spacing={2}>
           
              <Typography variant="h6">Patient Details</Typography>
              <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Name"
                value={patient.name}
                fullWidth
                disabled
                sx={{ mt: 2, bgcolor: 'grey.300' }}
              />
              </Grid>
              <Grid item xs={6}>
              <TextField
                id="age"
                name="age"
                label="Age"
                value={patient.age}
                fullWidth
                disabled
                sx={{ mt: 2, bgcolor: 'grey.300' }}
              />
              </Grid>
              <Grid item xs={6}>
              <TextField
                id="gender"
                name="gender"
                label="Gender"
                value={patient.gender}
                fullWidth
                disabled
                sx={{ mt: 2, bgcolor: 'grey.300' }}
              />
              </Grid>
              <Grid item xs={6}>
              <TextField
                id="diagnosis"
                name="diagnosis"
                label="Diagnosis"
                value={patient.diagnosis}
                fullWidth
                disabled
                sx={{ mt: 2, bgcolor: 'grey.300' }}
              />
              </Grid>
              <Grid item xs={6}>
              <TextField
                id="prescription"
                name="prescription"
                label="Prescription"
                value={patient.prescription}
                fullWidth
                disabled
                sx={{ mt: 2, bgcolor: 'grey.300' }}
              />
              </Grid>
           
            <Grid item xs={12} md={12}>
              <Typography variant="h6">Pharmacy Records</Typography>
              <Button variant="contained" color="primary" onClick={handleOpen}>Add Record</Button>
              <Box sx={{ height: 400, width: '100%', mt: 2,marginTop: '20px' }}>
                <DataGrid
                  rows={records}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection={false}
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Add Pharmacy Record
          </Typography>
          <Box id="modal-description" component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="item-label">Item</InputLabel>
              <Select
                labelId="item-label"
                id="item"
                name="itemId"
                value={form.itemId}
                onChange={handleChange}
                label="Item"
              >
                {items.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              id="price"
              name="price"
              label="Price"
              type="number"
              value={form.price}
              onChange={handleChange}
              fullWidth
              disabled
              sx={{ mt: 2 }}
            />
            <TextField
              id="total"
              name="total"
              label="Total"
              type="number"
              value={form.total}
              onChange={handleChange}
              fullWidth
              disabled
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};