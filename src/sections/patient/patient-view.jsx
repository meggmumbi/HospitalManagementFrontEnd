import { useState,useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

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

import TableNoData from '../user/table-no-data';
import TableRow from './patient-table-row';
import TableHead from '../user/user-table-head'
import TableEmptyRows from '../user/table-empty-rows';
import TableToolbar from '../user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../user/utils';



// ----------------------------------------------------------------------

export default function PatientPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  const [modalOpen, setModalOpen] = useState(false);

  const [selectedAction, setSelectedAction] = useState('');

  const [selectedPatientId, setSelectedPatientId] = useState('');

  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/patients');
        setPatients(response.data); 
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
      // Add any additional handling for success
    } catch (err) {
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
      const newSelecteds = patients.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleModal = (event, patientId) => {
    setSelectedPatientId(patientId);
    setModalOpen(true);
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
    inputData: patients,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  

  const notFound = !dataFiltered.length && !!filterName;

  return (    
    <Container>

        <Modal open={modalOpen} onClose={closeModal} style={{ position: 'fixed',top: 0, left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <div style={{  position: 'relative',margin: 'auto',maxWidth: '80%', maxHeight: '80%',background: 'white',
  padding: '20px',
  borderRadius: '10px',
  display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'space-between'}}>
                  <Typography variant="h6">Patient ID: {selectedPatientId}</Typography>


                  <FormControl
                    variant="outlined"
                    fullWidth
                  >
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
        <Typography variant="h4">Patients</Typography>

        <Button variant="contained" color="inherit"  onClick={() => navigate('/createPatient')}  startIcon={<Iconify icon="eva:plus-fill" />}>
          New Patient
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
                rowCount={patients.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'gender', label: 'Gender' },
                  { id: 'contacts', label: 'Contacts' },
                  { id: 'age', label: 'Age' },
                  { id: 'insuranceDetails', label: 'InsuranceDetails' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  {id: ''},
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.patientId}
                      name={row.name}
                      gender={row.gender}
                      contacts={row.contacts}
                      insuranceDetails={row.insuranceDetails}
                      age={row.age}
                      isVerified={row.isVerified}
                      status={row.status}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleModal={(event) => handleModal(event, row.patientId)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, patients.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      </div>
    )}
    </Container>
  );
}
