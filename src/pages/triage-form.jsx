import { useState,useEffect } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import {toast ,ToastContainer} from 'react-toastify';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useRouter } from 'src/routes/hooks';
import{Button,InputLabel,MenuItem,
    FormControl,    
    Grid,
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

export default function TriagePage() {
  const [assignedDoctor, setSelectedDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);  
  const location = useLocation();

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    systolic: '',
    diastolic: '',
    date: '',
    assignedDoctor: '',
    status:'Doctor'
  }); 
  
  const patientId = new URLSearchParams(location.search).get('patientId');
 

  useEffect(() => {
    getDoctors().then((doc) => setDoctors(doc));
  }, []);

  
  const getDoctors = async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/doctors");
    return data;
  };
  
  const handleSubmit = (event) => {
    
    event.preventDefault();
    setLoading(true);
   console.log(formData,patientId);
   

    const url = `http://localhost:8080/api/v1/patients/${patientId}`;
  
    
    axios.put(url, formData)
      .then(response => {
        
        setLoading(false);
        
      
        toast.success("Form sent successfully", {
          position: "top-right", 
          autoClose: 1000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true, 
          draggable: true, 
          progress: undefined, 
          onClose: () => router.push('/labs')
        });
                   

        console.log(response.data);
       
      })
      .catch(error => {
        toast.error('Something went wrong');
       
        console.error(error);
        
      });
  };


      const handleDoctorChange = (event) => {
        setSelectedDoctorId(event.target.value);
      };

      const handleChange = (event) => {     
        const { name, value } = event.target;      
        setFormData({
          ...formData, 
          
          [name]: value ,
          assignedDoctor
        });
    };
    
    const labelStyle = {
      backgroundColor: '#f8d591', 
      padding: '10px', 
      width: '150px', 
      textAlign: 'right' 
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
        <StyledBreadcrumb component="a" href="/labs" label="Test Requests" />
        <StyledBreadcrumb
          label="Triage Form"
         
        />
      </Breadcrumbs>
    <div>
    <form onSubmit={handleSubmit}>
    <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="weight">Weight (kg)</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="weight"
                    name="weight"  
                    label="weight (kg)"          
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    
                    />
                </TableCell>
              </TableRow>
          <TableRow>
            <TableCell style={labelStyle}>
              <Label htmlFor="height">Height</Label>
            </TableCell>
              <TableCell>
                <TextField
                  id="height"
                  name="height"
                  label="height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </TableCell>
          </TableRow>
          <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="systolic">Systolic Blood Pressure:</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="systolic"
                    name="systolic"
                    label="Systolic Blood Pressure"
                    type="number"  
                    value={formData.systolic}
                    onChange={handleChange}
                    variant="outlined"
                    required          
                    fullWidth
                    
                  />
               </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="diastolic">Diastolic Blood Pressure</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    id="diastolic"
                    name="diastolic"
                    label="Diastolic Blood Pressure"
                    type="number"
                    value={formData.diastolic}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
               </TableCell>
            </TableRow>
             
              
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="doctor">Doctor</Label>
                </TableCell>
                <TableCell>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="doctorId">Doctor</InputLabel>
                  <Select
                    id="doctorId"
                    name={assignedDoctor}
                    label="Doctor"
                    labelId="doctor-label"
                    value={assignedDoctor}  // Use the local state variable
                    onChange={handleDoctorChange}
                  >
                    {doctors.map((doctor) => (
                      <MenuItem key={doctor.username} value={doctor.username}>
                        {doctor.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={labelStyle}>
                  <Label htmlFor="date">Date:</Label>
                </TableCell>
                <TableCell>
                  <TextField
                    
                    type="date"                    
                    fullWidth
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    variant="outlined"                    
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
              ' Send Form'
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

