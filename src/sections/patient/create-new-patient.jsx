import { useState } from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import {toast ,ToastContainer} from 'react-toastify';
import{Button, 
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    TextField} from '@mui/material';


// ----------------------------------------------------------------------

export default function CreateNewPatient() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        contacts: '',
        insuranceDetails: ''
      });
    const { register, handleSubmit, reset } = useForm();

      const onSubmit = (event) => {
        // Prevent the default browser behavior
        event.preventDefault();
      
        // Define the endpoint URL
        const url = 'http://localhost:8080/api/v1/patients';
      
        // Make a POST request with axios
        axios.post(url, formData)
          .then(response => {
            // Handle the response
            toast.success('New Patient Added', { position: 'top-right' });  
            reset({
                name: '',
                age: '',
                gender: '',
                contacts: '',
                insuranceDetails: ''
              });
            console.log(response.data);
           
          })
          .catch(error => {
            
            toast.error('Could Not add a new patient', { position: 'top-right' });  
            console.error(error);
            
          });
      };

      // Create a function to handle the form input changes
const handleChange = (event) => {
    // Get the name and value of the input
    const { name, value } = event.target;
  
    // Update the state variable with the new value
    setFormData({
      ...formData, // Spread the previous form data
      [name]: value // Update the changed field
    });
  };
  return (

  <div>
   
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="name"
            name="name"
            label="Name"
            type="text"
            {...register('name')}
            
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="age"
            name="age"
            label="Age"
            type="number"
            {...register('age')}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="outlined"
            fullWidth
          >
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              id="gender"
              name="gender"
              labelId="gender-label"
              label="Gender"
              {...register('gender')}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="contacts"
            name="contacts"
            label="Contacts"
            type="text"
            {...register('contacts')}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="insuranceDetails"
            name="insuranceDetails"
            label="Insurance Details"
            type="text"
            {...register('insuranceDetails')}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ // Use the sx prop to apply different styles based on the breakpoints
              height: 48,
              '@media (min-width: 600px)': {
                width: '50%',
                marginLeft: '25%',
                marginRight: '25%'
              }
            }}
          >
            Add Patient
          </Button>
        </Grid>
      </Grid>
    </form>
    <ToastContainer />
  </div>
);


}
