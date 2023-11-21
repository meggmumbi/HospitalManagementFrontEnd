// Import React and React Hook Form
import React from "react";
import { useForm } from "react-hook-form";
import { useParams,useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {toast ,ToastContainer} from 'react-toastify';
import { useRouter } from 'src/routes/hooks';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';

// Import Material UI components
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  Slider,
  Button,
  Box,
} from "@mui/material";

// Import axios for making HTTP requests
import axios from "axios";

// Define the test types
const testTypes = [
  "stool",
  "blood",
  "urine",
  "swab",
  "tissues",
  "fluids",
  "sputum",
  "cytology",
  "other",
];

// Define the slider marks
const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 75,
    label: "75",
  },
  {
    value: 100,
    label: "100",
  },
];


export default function LabReportPage()  {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();

  const patientId = new URLSearchParams(location.search).get('patientId');
 
  const onSubmit = (data) => {
    
    data.testTypes = data.testTypes.join(",");

    data.observation = `${data.observation}%`;

    console.log(data);

    axios
      .put(
        `http://localhost:8080/api/v1/patients/${patientId}`,
        data
      )
      .then((response) => {
       
        console.log(response);

        toast.success(`Lab details for patient ${patientId} have been sent to the doctor`, {
          position: "top-right", 
          autoClose: 1000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true, 
          draggable: true, 
          progress: undefined, 
          onClose: () => router.push('/labs')
        });
                
      })
      .catch((error) => {
       
        console.error(error);
         toast.error('Something went wrong');
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "60%",
        margin: "auto",
      }}
    >

<Breadcrumbs sx={{marginBottom:'50px', marginLeft:'100px', width:'100%'}} aria-label="breadcrumb">
        <StyledBreadcrumb
        
          component="a"
          href="/dashboard"
          label="Home"
       
        />
        <StyledBreadcrumb component="a" href="/labs" label="labs" />
        <StyledBreadcrumb
          label="Fill Lab Report"
         
        />
      </Breadcrumbs>

      <h1>Lab Data Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ width: "100%" }} required>
          <InputLabel id="sample-details-label">Sample Details</InputLabel>
          <Select
            labelId="sample-details-label"
            id="sample-details"
            {...register("sampleDetails", { required: true })}
          >
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="urgent">Urgent</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="date-sample-taken"
          label="Date Sample Taken"
          type="date"
          sx={{ width: "100%", marginTop:'20px' }}
          InputLabelProps={{
            shrink: true,
          }}
          {...register("dateSampleTaken", { required: true })}
        />
        <FormControl component="fieldset" sx={{ width: "100%", marginTop:'20px' }} required>
          <FormLabel component="legend">sample Type: Fasting or Non Fasting</FormLabel>
          <RadioGroup
            aria-label="sample-type"
            name="sampleType"
            {...register("sampleType", { required: true })}
          >
            <FormControlLabel
              value="fasting"
              control={<Radio />}
              label="Fasting"
            />
            <FormControlLabel
              value="non-fasting"
              control={<Radio />}
              label="Non Fasting"
            />
          </RadioGroup>
        </FormControl>
            <FormControl sx={{ width: "100%",marginTop:'20px' }} required>
            <InputLabel id="test-type-label">Test Type</InputLabel>
            <Select
                labelId="test-type-label"
                id="test-type"
                multiple
                defaultValue={[]}
                {...register("testTypes", { required: true })}
                          >
              {testTypes.map((testType) => (
                <MenuItem key={testType} value={testType}>
                  {testType}
                </MenuItem>
              ))}
            </Select>

        </FormControl>
        <TextField
          id="additional-tests"
          label="Additional Tests"
          multiline
          rows={4}
          sx={{ width: "100%",marginTop:'20px' }}
          {...register("additionalTests")}
        />
        <TextField
          id="clinical-information"
          label="Clinical Information"
          multiline
          rows={4}
          sx={{ width: "100%",marginTop:'20px' }}
          {...register("clinicalInformation")}
        />
        <FormControl sx={{ width: "100%",marginTop:'20px' }}>
          <FormLabel component="legend">Observation</FormLabel>
          <Slider
            aria-label="observations"
            defaultValue={50}
            step={1}
            marks={marks}
            valueLabelDisplay="auto"
            {...register("observations")}
          />
        </FormControl>
        <TextField
          id="conclusion"
          label="Conclusion"
          multiline
          rows={4}
          sx={{ width: "100%" ,marginTop:'20px'}}
          {...register("conclusion")}
        />
        <Button type="submit" variant="contained" sx={{ width: "100%",marginTop:'20px' }}>
          Submit
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
}


