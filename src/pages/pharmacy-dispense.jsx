import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography,Modal, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import 'react-toastify/dist/ReactToastify.css';
import {toast ,ToastContainer} from 'react-toastify';
import axios from 'axios';
import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};



export default function PharmacyDispensePage() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [records, setRecords] = useState([]);
  const [patient, setPatient] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const location = useLocation();
  const [availableQuantity, setAvailableQuantity] = useState(0);

  const patientId = new URLSearchParams(location.search).get('patientId');

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Item', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'total', headerName: 'Total', width: 120 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => (
        <div>
          {/* Edit button */}
          <IconButton
            color="primary"
            
          >
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          </IconButton> 
         
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <div>
         
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleDelete = (recordId) => {
    axios.delete(`http://localhost:8080/api/v1/pharmacyRecords/${recordId}`)
      .then(() => {        
      
      toast.success("deleted successfully", {
        position: "top-right", 
        autoClose: 1000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined, 
        
      });   

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      })
      .catch((error) => {
        toast.error('Something went wrong');
        console.error(`Error deleting record with ID ${recordId}:`, error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/patients/${patientId}`)
      .then((response) => {
      setPatient(response.data);
      
      })
      .catch((error) => {
        
        console.error(error);
      });
  }, [patientId]); 

  // fetch pharmacy items
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/pharmacies');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchItems();
    
  }, []);

  // fetch pharmacy records by patientId
  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/v1/pharmacyRecords/patient/${patientId}`)
      .then(res => {
        setRecords(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [patientId]);

  const handleChangeItem = (event) => {
    const itemId = event.target.value;
    const itemz = items.find((item) => item.itemId === itemId);
    setSelectedItem(itemz);
    setPrice(itemz.unitPrice);
    setAvailableQuantity(itemz.quantity);
  };

  const handleChangeQuantity = (event) => {
    const qty = event.target.value;
    if (qty > availableQuantity) {      
      toast.error(`Quantity cannot exceed available quantity: ${availableQuantity}`);
      return;
    }
    setQuantity(qty);
    setTotal(qty * price);
  };

  const handleSubmit = async () => {
    if (quantity > availableQuantity) {
      
      toast.error(`Quantity cannot exceed available quantity: ${availableQuantity}`);
      return;
    }
    try {
      const data = {
        itemId: selectedItem.itemId,
        name:selectedItem.name,
        patientId,
        quantity,
        price,
        total,
      };
      console.log(data);
      const response = await axios.post(
        'http://localhost:8080/api/v1/pharmacyRecords',
        data
      );
      console.log(response.data);

      toast.success(`Medicine ${data.name} dispenced ${patientId}`, {
        position: "top-right", 
        autoClose: 1000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined, 
        
      });
              
      setTimeout(() => {
      handleClose();

      // Reload the page
      window.location.reload();
    }, 2000); // Adjust the delay as needed

      
    } catch (error) {
      console.error(error);
    }
  };

  // handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // handle modal close
  const handleClose = () => {
    setOpen(false);
    
  };

  const recordsWithId = records.map(record => ({
    id: record.recordId, 
    ...record,
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  return (
    <>
      <Helmet>
        <title> Pharmacy Records | HMS </title>
      </Helmet>
      <Container maxWidth="lg">
      <Breadcrumbs sx={{marginBottom:'50px', marginLeft:'100px', width:'100%'}} aria-label="breadcrumb">
        <StyledBreadcrumb
        
          component="a"
          href="/pharmacy"
          label="Main Pharmacy Page"
       
        />
        <StyledBreadcrumb component="a" href="/records" label="Patients Records" />
        <StyledBreadcrumb
          label="Dispense Medicine"
         
        />
      </Breadcrumbs>
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
            <Button variant="contained" color="primary" onClick={handleOpen}>Add Record</Button>
              <Typography variant="h6">Pharmacy Records</Typography>
              
              <Box sx={{ height: 400, width: '100%', mt: 2,marginTop: '20px' }}>
                <DataGrid
                  rows={recordsWithId}
                  columns={columns}
                  pageSize={5}
                  count={records.length}                
                  checkboxSelection={false}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </Grid>
          </Grid>
        )}
         <ToastContainer />
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pharmacy Record
          </Typography>
          <Box id="modal-description">
          <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="item-label">Item</InputLabel>
              <Select
              id="item-select"
              select
              label="Item"
              value={selectedItem ? selectedItem.itemId : ''}
              onChange={handleChangeItem}
              helperText="Please select an item"
            >
              {items.map((item) => (
                <MenuItem key={item.itemId} value={item.itemId}>
                  {item.name}
                </MenuItem>
              ))}
             </Select>
            </FormControl>
            <TextField
              id="patient-id"
              label="Patient ID"
              value={patientId}
              fullWidth
              disabled
              sx={{ mt: 2,bgcolor: 'grey.300' }}
            />
            <TextField
              id="quantity"
              label="Quantity"
              type="number"
              value={quantity}
              fullWidth
              onChange={handleChangeQuantity}
              sx={{ mt: 2 }}
            />
            <TextField id="price" label="Price" value={price} fullWidth disabled  sx={{ mt: 2,bgcolor: 'grey.300' }}/>
            <TextField id="total" label="Total" value={total} fullWidth disabled sx={{ mt: 2,bgcolor: 'grey.300' }}/>
            <Button variant="contained" color='primary' fullWidth sx={{ mt: 2, borderRadius:'22px' }} onClick={handleSubmit}>
              Submit
            </Button>
         </Box>
        </Box>
      </Modal>
    </>
  );
};