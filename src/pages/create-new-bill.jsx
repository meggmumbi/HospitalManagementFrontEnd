import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import {toast ,ToastContainer} from 'react-toastify';
import { useRouter } from 'src/routes/hooks';
import Breadcrumbs from '@mui/material/Breadcrumbs';
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

export default function CreateNewBillPage() {
    const [formData, setFormData] = useState({
        billId: '',
        patientId: '',
        serviceOffered: '',
        amount: '',
        paymentStatus: '',
        paymentHistory: '',
        
      });
      const router = useRouter();
      const [loading, setLoading] = useState(false);

      const handleSubmit = (event) => {
        // Prevent the default browser behavior
        event.preventDefault();
        setLoading(true);
      
        // Define the endpoint URL
        const url = 'http://localhost:8080/api/v1/billing';
      
        // Make a POST request with axios
        axios.post(url, formData)
          .then(response => {
            
            setLoading(false);
            
          
            toast.success("Bill added successfully", {
              position: "top-right", 
              autoClose: 1000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true, 
              draggable: true, 
              progress: undefined, 
              onClose: () => router.push('/bill')
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
    <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8
    }}
  >
     <Container maxWidth="xl">
     <Breadcrumbs sx={{marginBottom:'50px', marginLeft:'100px', width:'100%'}} aria-label="breadcrumb">
        <StyledBreadcrumb
        
          component="a"
          href="/dashboard"
          label="Home"
       
        />
        <StyledBreadcrumb component="a" href="/bill" label="Billing" />
        <StyledBreadcrumb
          label="New Bill"
         
        />
      </Breadcrumbs>
    <div>
    <form onSubmit={handleSubmit}>
    <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="billId">Bill Id</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="billId"
                    name="billId"  
                    label="billId"          
                    type="text"
                    value={formData.billId}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="patientId">Patient ID</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="patientId"
                    name="patientId"  
                    label="patientId"          
                    type="number"
                    value={formData.patientId}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="serviceOffered">Service Offered</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="serviceOffered"
                    name="serviceOffered"  
                    label="serviceOffered"          
                    type="text"
                    value={formData.serviceOffered}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="amount">Amount</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="amount"
                    name="amount"  
                    label="amount"          
                    type="text"
                    value={formData.amount}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="paymentStatus"
                    name="paymentStatus"  
                    label="paymentStatus"          
                    type="text"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="paymentHistory">Payment History</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="paymentHistory"
                    name="paymentHistory"  
                    label="paymentHistory"          
                    type="text"
                    value={formData.paymentHistory}
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
              ' Add Bill'
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

