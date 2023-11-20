import { useState,useEffect } from 'react';
import { useNavigate, Routes, Route,Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {toast ,ToastContainer} from 'react-toastify';
import axios from 'axios';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { fShortenNumber } from 'src/utils/format-number';

import TableNoData from '../user/table-no-data';
import TableRow from './pharmacy-table-row';
import TableHead from '../user/user-table-head'
import TableEmptyRows from '../user/table-empty-rows';
import TableToolbar from '../user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../user/utils';







// ----------------------------------------------------------------------

export default function HospitalPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pharmacy, setPharmacy] = useState([]);

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/pharmacies');
        setPharmacy(response.data); 
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/patients/getByPharmacyStatus');
        setPatients(response.data); 
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = pharmacy.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleDelete = async (event, itemId) => {
    console.log('handleDelete is being called');
    try {      
      const response = await axios.delete(`http://localhost:8080/api/v1/pharmacies/${itemId}`);
     
      console.log(response.data);
      
      toast.success("Item deleted successfully", {
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

  const dataFiltered = applyFilter({
    inputData: pharmacy,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (    
    <Container>
      <Grid container spacing={3} sx={{marginBottom:"30px"}}>
        <Grid xs={12} sm={6} md={6}>
     <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        width: "95%",
        borderRadius: 2,       
      }}
     
    >
       
      <Box sx={{ width: 64, height: 64}}>
       <img src='/assets/icons/glass/phamRecords.png'  alt='Inventory' />
      </Box>

      <Stack spacing={0.5}>
        <Typography variant="h4">{fShortenNumber(patients.length)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          Pharmacy Records
        </Typography>
        <Typography variant="h6" style={{ marginTop: '8px' }}>
        Patient Record Management
              </Typography>
              <Button
                component={Link}
                to="/records"
                variant="contained"
                color="primary"
                style={{ marginTop: '16px' }}
              >
                View Records
              </Button>
      </Stack>
      </Card>
      </Grid>
      
   

      <Grid xs={12} sm={6} md={6}>
      <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        width: "95%",
        borderRadius: 2,       
      }}
     
    >
      <Box sx={{ width: 64, height: 64}}>
       <img src='/assets/icons/glass/pharmacy.png'  alt='Inventory' />
      </Box>

      <Stack spacing={0.5}>
        <Typography variant="h4">{fShortenNumber(pharmacy.length)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          Pharmacy Items
        </Typography>
        <Typography variant="h6" style={{ marginTop: '8px' }}>
                Inventory Management
              </Typography>
              <Button
                component={Link}
                to="/pharmacy"
                variant="contained"
                color="primary"
                style={{ marginTop: '16px' }}
              >
                View Inventory
              </Button>
      </Stack>
      
      </Card>
      </Grid>
      </Grid>
      
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
        <Typography variant="h4">Pharmacy items</Typography>

        <Button variant="contained" color="inherit" onClick={() => navigate('/createItem')} startIcon={<Iconify icon="eva:plus-fill" />}>
          New pharmacy item
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
                rowCount={pharmacy.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'category', label: 'Category' },
                  { id: 'quantity', label: 'Quantity' },
                  { id: 'unitPrice', label: 'UnitPrice' },  
                  { id: 'supplierInformation', label: 'SupplierInformation' },                
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.itemId}
                      name={row.name}
                      category={row.category}
                      quantity={row.quantity}
                      unitPrice={row.unitPrice}
                      supplierInformation={row.supplierInformation}
                     
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleDelete={(event) => handleDelete(event, row.itemId)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, pharmacy.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={pharmacy.length}
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
