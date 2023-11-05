import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import {toast ,ToastContainer} from 'react-toastify';
import Breadcrumbs from '@mui/material/Breadcrumbs';
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

export default function CreateNewBranchPage() {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        contacts: '',
        specialization: '',
       
      });
      const router = useRouter();
      const [loading, setLoading] = useState(false);

      const handleSubmit = (event) => {
        // Prevent the default browser behavior
        event.preventDefault();
        setLoading(true);
      
        // Define the endpoint URL
        const url = 'http://localhost:8080/api/v1/hospital';
      
        // Make a POST request with axios
        axios.post(url, formData)
          .then(response => {
            
            setLoading(false);
            
          
            toast.success("Branch added successfully", {
              position: "top-right", 
              autoClose: 1000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true, 
              draggable: true, 
              progress: undefined, 
              onClose: () => router.push('/hospital')
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
        <StyledBreadcrumb component="a" href="/hospital" label="Hospital Info" />
        <StyledBreadcrumb
          label="New Hospital Branch"
         
        />
      </Breadcrumbs>
    <div>
    <form onSubmit={handleSubmit}>
    <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="name">Hospital Name</Label>
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
                  <Label htmlFor="location">Location</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="location"
                    name="location"  
                    label="location"          
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
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
                  <Label htmlFor="specialization">Specialization</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="specialization"
                    name="specialization"
                    label="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
               </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="datecreated">Date:</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="datecreated"
                    type="date"
                    variant="filled"
                    label="Date"                    
                    name="datecreated"
                    fullWidth
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
              ' Add Branch'
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

