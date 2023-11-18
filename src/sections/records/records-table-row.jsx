import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Select,Modal,Button } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RecordsTableRow({
  selected,
  patientId,
  name,
  avatarUrl,
  gender,
  age,
  contacts,
  insuranceDetails,
  
  status,
  handleClick,
  handleRedirection,
 

  

}) {
  const [open, setOpen] = useState(null);

  
  

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const colors = {
    Lab: 'error',
    Triage: 'warning',   
  };
  

  return (
    <>
         
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{gender}</TableCell>
        <TableCell>{age}</TableCell>
        <TableCell>{contacts}</TableCell>
        <TableCell>{insuranceDetails}</TableCell>
        

        <TableCell>
        <Label color={colors[status] || 'default'}>{status}</Label>
        </TableCell>

        <TableCell onClick={handleRedirection} align="right">
          <IconButton> 
            <Iconify icon="eva:info-fill" />
          </IconButton>
        </TableCell>
    
      </TableRow>

   
    </>
  );
}

RecordsTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  patientId: PropTypes.any,
  gender: PropTypes.any,
  handleClick: PropTypes.func,
  handleRedirection: PropTypes.func,
 
 
  name: PropTypes.any,
  age: PropTypes.any,
  contacts: PropTypes.any,
  insuranceDetails: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.any,
};
