import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {toast ,ToastContainer} from 'react-toastify';
import { useRouter } from 'src/routes/hooks';
import{Button,InputLabel,MenuItem,
    FormControl,    
    
    Select,   
    Container, 
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  Box,
  CircularProgress,
  FormControlLabel,
    TextField} from '@mui/material';
import { Label } from '@mui/icons-material';


// ----------------------------------------------------------------------

export default function CreateNewItemPage() {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '',
        unitPrice: '',
        supplierInformation: ''
      });
      const router = useRouter();
      const [loading, setLoading] = useState(false);

      const handleSubmit = (event) => {
        // Prevent the default browser behavior
        event.preventDefault();
        setLoading(true);
      
        // Define the endpoint URL
        const url = 'http://localhost:8080/api/v1/pharmacies';
      
        // Make a POST request with axios
        axios.post(url, formData)
          .then(response => {
            
            setLoading(false);
            
          
            toast.success("Item added successfully", {
              position: "top-right", 
              autoClose: 1000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true, 
              draggable: true, 
              progress: undefined, 
              onClose: () => router.push('/pharmacy')
            });
                       

            console.log(response.data);
           
          })
          .catch(error => {
            toast.error('Something went wrong');
           
            console.error(error);
            
          });
      };

      
const labelStyle = {
  backgroundColor: '#f8d591', 
  padding: '10px', 
  width: '150px', 
  textAlign: 'right' 
};
      
 const handleChange = (event) => {     
     const { name, value } = event.target;      
     setFormData({
       ...formData, 
       [name]: value 
     });
 };
 
  return (
    <>
    <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8
    }}
  >
     <Container maxWidth="xl">
    
    <div>
    <form onSubmit={handleSubmit}>
    <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="name">Item Name</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="name"
                    name="name"  
                    label="name"          
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="category">Category</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="category"
                    name="category"  
                    label="category"          
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>
          <TableRow>
            <TableCell style={labelStyle}>
              <Label htmlFor="quantity">Quantity</Label>
            </TableCell>
              <TableCell>
                <TextField
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </TableCell>
          </TableRow>
      
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="unitPrice">Unit Price</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="unitPrice"
                    name="unitPrice"
                    label="Unit Price"
                    type="number"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
               </TableCell>
            </TableRow>
               <TableRow>
                <TableCell style={labelStyle}>
                <Label htmlFor="supplierInformation">Supplier Information:</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="supplierInformation"
                    name="supplierInformation"
                    label="Supplier Information"
                    type="text"
                    value={formData.insuranceDetails}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </TableCell>
              </TableRow>           
            </TableBody>
          </Table>
        </TableContainer>
              <Button
                type="submit"
                variant="contained"
                color="primary"                
                disabled={loading}
                fullWidth
                sx={{ 
                  height: 48,
                  '@media (min-width: 600px)': {
                    width: '50%',
                    marginLeft: '25%',
                    marginRight: '25%'
                  }
                }}
              >
                {loading ? (
              <CircularProgress size={24} color="inherit" /> 
            ) : (
              ' Add Item'
            )}
           
          </Button>         
      </form>
      <ToastContainer />
    </div>
  </Container>
</Box>
</>
);
};

