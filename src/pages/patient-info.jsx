import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";

const PatientProfile = () => {
  // The patient details are stored in a state variable
  const [patient, setPatient] = useState({
    patientId: 24,
    age: 90,
    name: "Erin Aron",
    gender: "female",
    allergies: null,
    contacts: "0876543211",
    weight: 2,
    height: 2,
    systolic: 2,
    diastolic: 2,
    medicalHistorySummery: null,
    observations: "39",
    status: "Lab",
    date: "2023-11-11T00:00:00.000+00:00",
    address: null,
    diagnosis: null,
    assignedDoctor: "Doctor 3",
    insuranceDetails: "cic",
    medicalHistory: null,
    sampleDetails: "urgent",
    dateSampleTaken: "2023-11-11T00:00:00.000+00:00",
    sampleType: "fasting",
    testTypes: "swab,tissues,fluids",
    additionalTests: "test",
    clinicalInformation: "test",
    conclusion: "test"
  });

  // The image file is stored in a state variable
  const [image, setImage] = useState(null);

  // A function to handle the image selection
  const handleImageSelect = (event) => {
    // Get the selected file from the input element
    const file = event.target.files[0];
    // Set the image state to the file
    setImage(file);
  };

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
          {/* A grid item for the patient gender */}
          <Grid item xs={6}>
            <TextField
              label="Gender"
              value={patient.gender}
              onChange={(event) => setPatient({ ...patient, gender: event.target.value })}
              fullWidth
            />
          </Grid>
          {/* A grid item for the patient address */}
          <Grid item xs={6}>
            <TextField
              label="Address"
              value={patient.address}
              onChange={(event) => setPatient({ ...patient, address: event.target.value })}
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
          value={patient.date}
          onChange={(event) => setPatient({ ...patient, date: event.target.value })}
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

  // The main return statement of the component
  return (
    // A card component to wrap the whole page
    <Card>
      {/* A card header component for the page title */}
      <CardHeader title="Patient profile" sx={{ bgcolor: "primary.main", color: "white" }} />
      {/* A card content component for the page content */}
      <CardContent>
        {/* A grid container to layout the photo, details, and status sections */}
        <Grid container spacing={2}>
          {/* A grid item for the photo section */}
          <Grid item xs={12} md={4}>
            {renderPhotoSection()}
          </Grid>
          {/* A grid item for the details section */}
          <Grid item xs={12} md={4}>
            {renderDetailsSection()}
          </Grid>
          {/* A grid item for the status section */}
          <Grid item xs={12} md={4}>
            {renderStatusSection()}
          </Grid>
        </Grid>
        {/* The save changes button */}
        {renderSaveButton()}
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
