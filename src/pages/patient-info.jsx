import React, { useState, useEffect } from 'react';
import { useParams,useLocation } from 'react-router-dom'; // If you're using React Router
import { Container, Typography, Grid, Button, Avatar, TextField, Paper, Box } from '@mui/material';
import axios from 'axios';

const PatientProfile = () => {

  const [patient, setPatient] = useState(null);
  const [updatedPatient, setUpdatedPatient] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const patientId = new URLSearchParams(location.search).get('patientId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/patients/${patientId}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchData();
  }, [patientId]);

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/patients/${patientId}`, updatedPatient);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating patient details:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setUpdatedPatient((prevData) => ({ ...prevData, [field]: value }));
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patient Profile - {patient.name}
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar alt={patient.name}  sx={{ width: 150, height: 150 }} />
            <input type="file" accept="image/*" />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              label="Age"
              value={isEditing ? updatedPatient.age : patient.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
                <TextField
                label="Gender"
                value={isEditing ? updatedPatient.gender : patient.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                fullWidth
                disabled={!isEditing}
                />

                <TextField
                label="Allergies"
                value={isEditing ? updatedPatient.allergies : patient.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                fullWidth
                disabled={!isEditing}
                />

                <TextField
                label="Contacts"
                value={isEditing ? updatedPatient.contacts : patient.contacts}
                onChange={(e) => handleInputChange('contacts', e.target.value)}
                fullWidth
                disabled={!isEditing}
                />

                <TextField
                label="Weight"
                value={isEditing ? updatedPatient.weight : patient.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                fullWidth
                disabled={!isEditing}
                />

                <TextField
                label="Height"
                value={isEditing ? updatedPatient.height : patient.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                fullWidth
                disabled={!isEditing}
                />

                <TextField
                label="Systolic"
                value={isEditing ? updatedPatient.systolic : patient.systolic}
                onChange={(e) => handleInputChange('systolic', e.target.value)}
                fullWidth
                disabled={!isEditing}
                />

                <TextField
                label="Diastolic"
                value={isEditing ? updatedPatient.diastolic : patient.diastolic}
                onChange={(e) => handleInputChange('diastolic', e.target.value)}
                fullWidth
                disabled={!isEditing}
                />

                <TextField
                label="Insurance Details"
                value={isEditing ? updatedPatient.insuranceDetails : patient.insuranceDetails}
                onChange={(e) => handleInputChange('insuranceDetails', e.target.value)}
                fullWidth
                disabled={!isEditing}
                />

          </Grid>
        </Grid>
      </Paper>
      {isEditing ? (
        <Box textAlign="right">
          <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
            Save Changes
          </Button>
        </Box>
      ) : (
        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      )}
    </Container>
  );
};

export default PatientProfile;
