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

export default function CreateNewUserPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        gender: '',
        email: '',
        role: '',
        contacts: '',
        specialization: '',
        schedule: '',
        
      });
      const router = useRouter();
      const [loading, setLoading] = useState(false);

      const handleSubmit = (event) => {
        // Prevent the default browser behavior
        event.preventDefault();
        setLoading(true);
      
        // Define the endpoint URL
        const url = 'http://localhost:8080/api/v1/doctors';
      
        // Make a POST request with axios
        axios.post(url, formData)
          .then(response => {
            
            setLoading(false);
            
          
            toast.success("Doctor added successfully", {
              position: "top-right", 
              autoClose: 1000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true, 
              draggable: true, 
              progress: undefined, 
              onClose: () => router.push('/user')
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
        <StyledBreadcrumb component="a" href="/user" label="Doctors" />
        <StyledBreadcrumb
          label="New Doctors"
         
        />
      </Breadcrumbs>
    <div>
    <form onSubmit={handleSubmit}>
    <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="username">Username</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="username"
                    name="username"  
                    label="username"          
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="password">Password</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="password"
                    name="password"  
                    label="password"          
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="gender">Gender</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="gender"
                    name="gender"  
                    label="gender"          
                    type="text"
                    value={formData.gender}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="email">Email</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="email"
                    name="email"  
                    label="email"          
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="role">Role</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="role"
                    name="role"  
                    label="role"          
                    type="text"
                    value={formData.role}
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
                  <Label htmlFor="schedule">Schedule</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="schedule"
                    name="schedule"  
                    label="schedule"          
                    type="text"
                    value={formData.schedule}
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
              ' Add Doctor'
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

