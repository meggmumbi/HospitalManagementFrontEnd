import { useState,useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {toast ,ToastContainer} from 'react-toastify';

import axios from 'axios';


import 'src/modal.css';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Select,Modal,MenuItem,FormControl,InputLabel } from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableRow from './appointment-table-row';
import TableHead from '../user/user-table-head';
import TableNoData from '../user/table-no-data';
import TableEmptyRows from '../user/table-empty-rows';
import TableToolbar from '../user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../user/utils';

// ----------------------------------------------------------------------

export default function AppointmentPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  const [modalOpen, setModalOpen] = useState(false);

  const [selectedAction, setSelectedAction] = useState('');

  const [selectedPatientId, setSelectedPatientId] = useState('');
  
  


  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/appointments');
        setAppointments(response.data); 
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 



  const closeModal = () => {
    setModalOpen(false);
    setSelectedAction('');
    setSelectedPatientId('');
  };

  const handleActionSelect = (event) => {
    setSelectedAction(event.target.value);
  };
  const sendAction = async () => {
    try {
      
      const updatedPatientInfo = {
        
        status: selectedAction,
      };
  
      await axios.put(`http://localhost:8080/api/v1/patients/${selectedPatientId}`, updatedPatientInfo);
    

      toast.success(`Patient ${selectedPatientId} sent to the ${selectedAction}`, {
        position: "top-right", 
        autoClose: 1000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined, 
        
      });
              
      setTimeout(() => {
      closeModal();

      // Reload the page
      window.location.reload();
    }, 2000); // Adjust the delay as needed
     
    } catch (err) {

      toast.error(`Could not send Patient ${selectedPatientId} to the ${selectedAction}`);
      console.error(err)
    }
    closeModal();
  };
  
  


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = appointments.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleModal = (event, patientId) => {
    setSelectedPatientId(patientId);
    setModalOpen(true);
  };

  const handleDelete = async (event, patientId) => {
    console.log('handleDelete is being called'); 
    try {      
      const response = await axios.delete(`http://localhost:8080/api/v1/patients/${patientId}`);
     
      console.log(response.data);
      
      toast.success("Patient deleted successfully", {
        position: "top-right", 
        autoClose: 1000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true, 
        draggable: true, 
        progress: undefined, 
        
      });   

      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (errr) {
      toast.error('Something went wrong');

      console.error(errr);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: appointments,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleProfile = (event,patientId) => {
    navigate(`/patientprofile?patientId=${patientId}`);
    
  };
  

  const notFound = !dataFiltered.length && !!filterName;

  return (    
    <Container>
<Modal open={modalOpen} onClose={closeModal}>
  <div className="modal-content">
    <Typography variant="h6">Patient ID: {selectedPatientId}</Typography>
   
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="action">Action</InputLabel>
      <Select
        id="action"
        name="action"
        labelId="action-label"
        label="Action"
        value={selectedAction}
        onChange={handleActionSelect}
        required
      >
        <MenuItem value="">
          <em>Select</em>
        </MenuItem>
        <MenuItem value="Triage">Send to Triage</MenuItem>
        <MenuItem value="Doctor">Send to Doctor</MenuItem>
        <MenuItem value="Lab">Send to Lab</MenuItem>
        <MenuItem value="Pharmacy">Send to Pharmacy</MenuItem>
        <MenuItem value="Accounts">Send to Accounts</MenuItem>
      </Select>
    </FormControl>

    <Button variant="contained" color="primary" onClick={sendAction}>
      Save Action
    </Button>
    
  </div>
</Modal>


         {loading && (
      <div>
        
        <Typography variant="h4">Loading...</Typography>
      </div>
      )}
    {!loading && error && (
      <div>
       
        <Typography variant="h4">Error: {error.message}</Typography>
      </div>
   )}
   {!loading && !error && (
      <div>
        
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Appointments</Typography>

        <Button variant="contained" color="inherit"  onClick={() => navigate('/createAppointment')}  startIcon={<Iconify icon="eva:plus-fill" />}>
          New Appointment
        </Button>
      </Stack>

      <Card>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead
                order={order}
                orderBy={orderBy}
                rowCount={appointments.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'patientId', label: 'Patient Id' },
                  { id: 'doctorUsername', label: 'Doctor Username' },
                  { id: 'dateTime', label: 'Date and Time' },
                  { id: 'uid', label: 'UID' },
                //   { id: 'insuranceDetails', label: 'InsuranceDetails' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  {id: ''},
                  { id: '' },
                  {id:''},
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.patientId}
                      patientId={row.patientId}
                      doctorUsername={row.doctorUsername}
                      dateTime={row.dateTime}
                      uid={row.uid}
                    //   age={row.age}
                    //   isVerified={row.isVerified}
                      status={row.status}
                      selected={selected.indexOf(row.patientId) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleModal={(event) => handleModal(event, row.patientId)}
                      handleDelete={(event) => handleDelete(event, row.patientId)}
                      handleProfile={(event) => handleProfile(event, row.patientId) }
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, appointments.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
     
      </div>
    )}
     <ToastContainer />
    </Container>
  );
}
