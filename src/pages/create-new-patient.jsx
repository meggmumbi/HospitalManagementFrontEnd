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

export default function CreateNewPatientPage() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        contacts: '',
        insuranceDetails: ''
      });
      const router = useRouter();
      const [loading, setLoading] = useState(false);

      const handleSubmit = (event) => {
        // Prevent the default browser behavior
        event.preventDefault();
        setLoading(true);
      
        // Define the endpoint URL
        const url = 'http://localhost:8080/api/v1/patients';
      
        // Make a POST request with axios
        axios.post(url, formData)
          .then(response => {
            
            setLoading(false);
            
          
            toast.success("Patient added successfully", {
              position: "top-right", 
              autoClose: 1000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true, 
              draggable: true, 
              progress: undefined, 
              onClose: () => router.push('/patients')
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
                  <Label htmlFor="name">Full Name</Label>
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
              <Label htmlFor="age">Age</Label>
            </TableCell>
              <TableCell>
                <TextField
                  id="age"
                  name="age"
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </TableCell>
          </TableRow>
          <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="dob">Date of Birth:</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    
                    type="date"
                    variant="filled"
                    fullWidth
                    name="dob"
                    
                    
                    
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="gender">Gender</Label>
                </TableCell>
                <TableCell>
                  <FormControl
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel id="gender">Gender</InputLabel>
                      <Select
                        id="gender"
                        name="gender"
                        labelId="gender-label"
                        label="Gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="">
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="contacts">Contacts</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="contacts"
                    name="contacts"
                    label="contacts"
                    type="text"
                    value={formData.contacts}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
               </TableCell>
            </TableRow>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="address">Address:</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="address"
                    name="address"
                    label="address"
                    type="text"            
                    fullWidth
                    
                  />
               </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={labelStyle}>
                <Label htmlFor="insuranceDetails">Insurance Details:</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="insuranceDetails"
                    name="insuranceDetails"
                    label="insuranceDetails"
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
              ' Add Patient'
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

