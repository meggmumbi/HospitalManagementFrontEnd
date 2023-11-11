import React, { useState, useEffect } from "react";
import { Button, Container, Paper, Typography, Grid, Box, TableBody,Table,TableCell,TableRow,TableHead,TableContainer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "normal",
    textAlign: "center",
  },
  data: {
    fontWeight: "normal",
    textAlign: "left",
  },
  export: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
}));

// Define custom styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "center",
  },
  data: {
    fontSize: 12,
    fontWeight: "normal",
    textAlign: "left",
  },
});


const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
       
        <Text style={styles.title}>Lab Report</Text>
       
        <Text style={styles.subtitle}>Date: {data.dateSampleTaken}</Text>
        <Text style={styles.subtitle}>Sample Type: {data.sampleType}</Text>
        <Text style={styles.subtitle}>Test Types: {data.testTypes}</Text>
        <Text style={styles.subtitle}>Additional Tests: {data.additionalTests}</Text>
        <Text style={styles.data}>Clinical Information: {data.clinicalInformation}</Text>
        <Text style={styles.data}>Conclusion: {data.conclusion}</Text>
        <Text style={styles.data}>Observations: {data.observations}</Text>
      </View>
    </Page>
  </Document>
);

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

export default function ReportPage () {
  
  const classes = useStyles();
  const location = useLocation();
  const patientId = new URLSearchParams(location.search).get('patientId');
 
  const [data, setData] = useState(null);

 
  const [loading, setLoading] = useState(false);

  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/patients/${patientId}`);
        setData(response.data);
      } catch (errors) {
        console.error('Error fetching patient details:', errors);
      }
    };

    fetchData();
  }, [patientId]);
 
  return (
    <Container maxWidth="xl">
         <Breadcrumbs sx={{marginBottom:'50px', marginLeft:'100px', width:'100%'}} aria-label="breadcrumb">
        <StyledBreadcrumb
        
          component="a"
          href="/dashboard"
          label="Home"
       
        />
        <StyledBreadcrumb component="a" href="/labs" label="Labs" />
        <StyledBreadcrumb
          label="Report"
         
        />
      </Breadcrumbs>
      <Paper elevation={3}
  sx={{
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    margin: 4,
  }} >
        {loading && <Typography variant="h6">Loading...</Typography>}
        {error && <Typography variant="h6" color="error">{error}</Typography>}
        {data && (
          <>
          <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Label</TableCell>
        <TableCell>Value</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Sample Type</TableCell>
        <TableCell>{data.sampleType}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Test Types</TableCell>
        <TableCell>{data.testTypes}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Additional Tests</TableCell>
        <TableCell>{data.additionalTests}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Clinical Information</TableCell>
        <TableCell>{data.clinicalInformation}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Conclusion</TableCell>
        <TableCell>{data.conclusion}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Observations</TableCell>
        <TableCell>{data.observations}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
            <Box className={classes.export}>
              <PDFDownloadLink document={<MyDocument data={data} />} fileName="lab-report.pdf">
                {({ blob,   err }) =>
                  loading ? "Loading document..." : <Button variant="contained" color="primary">Download PDF</Button>
                }
              </PDFDownloadLink>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

MyDocument.propTypes = {
    data: PropTypes.shape({
      additionalTests: PropTypes.string.isRequired,
      clinicalInformation: PropTypes.string.isRequired,
      conclusion: PropTypes.string.isRequired,
      observations: PropTypes.string.isRequired,
      dateSampleTaken: PropTypes.string,
      testTypes: PropTypes.string,
      sampleType: PropTypes.string,
      
    }).isRequired,
  };

