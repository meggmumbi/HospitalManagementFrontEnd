import React, { useState,useEffect } from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const PatientProfile = () => {
 
  const [patient, setPatient] = useState({    
    age: '',
    name: '',
    gender:'',
    allergies: '',
    contacts: '',
    weight: '',
    height: '',   
    medicalHistorySummery: '',    
    status: '',
    dateSampleTaken: '',
    address: '',
    diagnosis: '',
    insuranceDetails: '',
   
  });
  const location = useLocation();
  const patientId = new URLSearchParams(location.search).get('patientId');
  // The image file is stored in a state variable
  const [image, setImage] = useState(null);

  // A function to handle the image selection
  const handleImageSelect = (event) => {
    // Get the selected file from the input element
    const file = event.target.files[0];
    // Set the image state to the file
    setImage(file);
  };

    // Fetch the patient details from the endpoint using axios
    useEffect(() => {
      axios
        .get(`http://localhost:8080/api/v1/patients/${patientId}`)
        .then((response) => {
        setPatient(response.data);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }, [patientId]); 

  // A function to handle the form submission
  const handleSubmit = (event) => {
    // Prevent the default browser behavior
    event.preventDefault();
    // TODO: Add your logic to save the changes to the patient profile
    // For example, you can use fetch to send a POST request to the API endpoint
    // fetch("http://localhost:8080/api/v1/patients/" + patient.patientId, {
    //   method: "POST",
    //   body: JSON.stringify(patient),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    // You can also use FormData to send the image file along with the patient details
    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("patient", JSON.stringify(patient));
    // fetch("http://localhost:8080/api/v1/patients/" + patient.patientId, {
    //   method: "POST",
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  };

  // A function to render the patient photo section
  const renderPhotoSection = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
        {/* If the image state is not null, show the image preview */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Patient photo"
            style={{ width: 200, height: 200, objectFit: "cover", borderRadius: "50%" }}
          />
        )}
        {/* A button to select an image file from the local device */}
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Select image
          <input type="file" hidden accept="image/*" onChange={handleImageSelect} />
        </Button>
      </Box>
    );
  };

  // A function to render the patient details section
  const renderDetailsSection = () => {
    return (
      <Box sx={{ p: 2 }}>
        {/* A grid container to layout the text fields */}
        <Grid container spacing={2}>
          {/* A grid item for the patient name */}
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={patient.name}
              onChange={(event) => setPatient({ ...patient, name: event.target.value })}
              fullWidth
            />
          </Grid>
          {/* A grid item for the patient ID */}
          <Grid item xs={6}>
            <TextField
              label="Age"
              value={patient.age}
              onChange={(event) => setPatient({ ...patient, age: event.target.value })}
              fullWidth
            />
          </Grid>
          {/* A grid item for the patient phone */}
          <Grid item xs={6}>
            <TextField
              label="Phone"
              value={patient.contacts}
              onChange={(event) => setPatient({ ...patient, contacts: event.target.value })}
              fullWidth
            />
          </Grid>
         
          <Grid item xs={6}>
            <TextField
              label="Gender"
              value={patient.gender}
              onChange={(event) => setPatient({ ...patient, gender: event.target.value })}
              fullWidth
            />
          </Grid>
        
          <Grid item xs={6}>
            <TextField
              label="Address"
              value={patient.address}
              onChange={(event) => setPatient({ ...patient, address: event.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Insurance Details"
              value={patient.insuranceDetails}
              onChange={(event) => setPatient({ ...patient, insuranceDetails: event.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Allergies"
              value={patient.allergies}
              onChange={(event) => setPatient({ ...patient, allergies: event.target.value })}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  // A function to render the patient status section
  const renderStatusSection = () => {
    return (
      <Box sx={{ p: 2 }}>
        {/* A typography component for the status label */}
        <Typography variant="h6" gutterBottom>
          Status
        </Typography>
        {/* A text field for the patient status */}
        <TextField
          value={patient.status}
          onChange={(event) => setPatient({ ...patient, status: event.target.value })}
          fullWidth
        />
        {/* A typography component for the last visit label */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Last visit
        </Typography>
        {/* A text field for the patient last visit date */}
        <TextField
          value={patient.dateSampleTaken}
          onChange={(event) => setPatient({ ...patient, dateSampleTaken: event.target.value })}
          fullWidth
        />
      </Box>
    );
  };

  // A function to render the save changes button
  const renderSaveButton = () => {
    return (
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save changes
        </Button>
      </Box>
    );
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

    
   
    <Card>   
       <Breadcrumbs sx={{marginBottom:'50px', marginLeft:'100px', width:'100%'}} aria-label="breadcrumb">
        <StyledBreadcrumb
        
          component="a"
          href="/dashboard"
          label="Home"
       
        />
        <StyledBreadcrumb component="a" href="/patients" label="Patients" />
        <StyledBreadcrumb
          label="New Patient"
         
        />
      </Breadcrumbs>
        
      <CardHeader title="Patient profile" sx={{ bgcolor: "primary.main", color: "white" }} />
     
      <CardContent>
      
        <Grid container spacing={2}>
         
          <Grid item xs={12} md={4}>
            {renderPhotoSection()}
          </Grid>
         
          <Grid item xs={12} md={4}>
            {renderDetailsSection()}
          </Grid>
          
          <Grid item xs={12} md={4}>
            {renderStatusSection()}
          </Grid>
        </Grid>
       
        {renderSaveButton()}
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
