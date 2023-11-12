import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import 'src/modal.css';
import { Button, Container} from "@mui/material";




const LabReport = () => {
  const location = useLocation();
  const patientId = new URLSearchParams(location.search).get('patientId');

  const [age, setAge] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [allergies, setAllergies] = useState("");
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [systolic, setSystolic] = useState();
  const [diastolic, setDiastolic] = useState();
  const [medicalHistorySummery, setMedicalHistorySummery] = useState("");
  const [observations, setObservations] = useState("");
  const [diagnosis, setDiagnosis] = useState();
  const [sampleDetails, setSampleDetails] = useState("");
  const [dateSampleTaken, setDateSampleTaken] = useState(
    ""
  );
  const [sampleType, setSampleType] = useState("");
  const [testTypes, setTestTypes] = useState("");
  const [additionalTests, setAdditionalTests] = useState("");
  const [clinicalInformation, setClinicalInformation] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the patient details from the endpoint using axios
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/patients/${patientId}`)
      .then((response) => {
        // Update the state variables with the response data
       
        setAge(response.data.age);
        setName(response.data.name);
        setGender(response.data.gender);
        setAllergies(response.data.allergies);
        setWeight(response.data.weight);
        setHeight(response.data.height);
        setSystolic(response.data.systolic);
        setDiastolic(response.data.diastolic);
        setMedicalHistorySummery(response.data.medicalHistorySummery);
        setObservations(response.data.observations);
        setDiagnosis(response.data.diagnosis);
        setSampleDetails(response.data.sampleDetails);
        setDateSampleTaken(response.data.dateSampleTaken);
        setSampleType(response.data.sampleType);
        setTestTypes(response.data.testTypes);
        setAdditionalTests(response.data.additionalTests);
        setClinicalInformation(response.data.clinicalInformation);
        setConclusion(response.data.conclusion);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, [patientId]); 

 
  const downloadReport = () => {
    setLoading(true);

    const data = {
      source: document.getElementById("report").innerHTML,
      landscape: false,
      use_print: false,
    };

      // Use async/await for better readability
      const convertToPDF = async () => {
        try {
          console.log("Request Data:", data);
          const response =             
          fetch('https://api.pdfshift.io/v3/convert/pdf', {
            method: 'POST',
              headers: {
                "Content-Type": "application/json",
                Authorization:  `Basic ${btoa('api:sk_84449f240f06519072a7ade1a480af1c22f01a41')}`,
              },            
            body: JSON.stringify({
               data
            }),
              responseType: "arraybuffer",
            }
          );
    
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });

           const link = document.createElement("a");
           link.href = window.URL.createObjectURL(blob);
           link.download = "report.pdf";

            // Append the link to the document and click it
        document.body.appendChild(link);
        link.click();

    // Remove the link from the document
    link.remove();
  } catch (error) {
    // Handle the error
    console.error(error);
  } finally {
    setLoading(false);
  }
};

convertToPDF();
};
  
  return (
    <div id="report" className="lab-report">
      <h1 className="header">Lab Report</h1>
      <div className="separator">-</div>
      <h2>Patient Details</h2>
      <table className="details">
        <tr>
          <td>Patient ID</td>
          <td>{patientId}</td>
        </tr>
        <tr>
          <td>Age</td>
          <td>{age}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{gender}</td>
        </tr>
        <tr>
          <td>Allergies</td>
          <td>{allergies || "None"}</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>{weight} kg</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>{height} m</td>
        </tr>
        <tr>
          <td>Blood Pressure</td>
          <td>
            {systolic}/{diastolic} mmHg
          </td>
        </tr>
        <tr>
          <td>Medical History Summery</td>
          <td>{medicalHistorySummery || "None"}</td>
        </tr>
      </table>
      <h2>Observations</h2>
      <p className="details">{observations}</p>
      <h2>Diagnosis</h2>
      <p className="details">{diagnosis || "None"}</p>
      <h2>Sample Details</h2>
      <table className="details">
        <tr>
          <td>Urgency</td>
          <td>{sampleDetails}</td>
        </tr>
        <tr>
          <td>Date Sample Taken</td>
          <td>{dateSampleTaken}</td>
        </tr>
        <tr>
          <td>Sample Type</td>
          <td>{sampleType}</td>
        </tr>
        <tr>
          <td>Test Types</td>
          <td>{testTypes}</td>
        </tr>
        <tr>
          <td>Additional Tests</td>
          <td>{additionalTests}</td>
        </tr>
        <tr>
          <td>Clinical Information</td>
          <td>{clinicalInformation}</td>
        </tr>
      </table>
      <h2>Conclusion</h2>
      <p className="details">{conclusion}</p>
      <Button className="download-button" onClick={downloadReport}>
        Download Report
      </Button>
    </div>
  );
};

export default LabReport;
