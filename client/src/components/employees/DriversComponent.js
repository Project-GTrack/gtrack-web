import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import Grid from "@mui/material/Grid";
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from "@mui/material/Box";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import ViewEmployeeModal from './modals/ViewEmployeeModal';
import DeleteEmployeeModal from './modals/DeleteEmployeeModal'

// Generate Order Data
function createData(id, lastname, firstname, email, connum, address, age, gender, dateadded, status, image) {
  return { id, lastname, firstname, email, connum, address, age, gender, dateadded, status, image };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#36454F',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const rows = [
  createData(
    0,
    'Baggins',
    'Frodo',
    'frodobags@gmail.com',
    '0912345678',
    'America',
    '52',
    'Male',
    'January 17, 2022',
    'Active',
    '/images/gtrack-logo-1.png'
  ),
  createData(
    1,
    'Parker',
    'Peter',
    'spidey@gmail.com',
    '0912345678',
    'America',
    '52',
    'Male',
    'January 17, 2022',
    'Active',
    '/images/gtrack-logo-1.png'
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function DriversComponent() {
    const [openModal, setOpenModal] = React.useState(false);
    const [openDeleteModal, setDeleteModal] = React.useState(false);
    const [data,setData]=React.useState({});
    const handleOpenModal = (id) => {
        console.log("IDDD", id);
        for(var x = 0; x < rows.length; x++){
          if(rows[x].id === id){
            setData(rows[x]);
            console.log(data);
          }
        }
        setOpenModal(true);
      }
    const handleCloseModal = () => setOpenModal(false);
    const handleDeleteModal = (id) => {
        console.log("IDDD", id);
        for(var x = 0; x < rows.length; x++){
          if(rows[x].id === id){
            setData(rows[x]);
            console.log(data);
          }
        }
        setDeleteModal(true);
      }
    const handleCloseDeleteModal = () => setDeleteModal(false);
  return (
    <React.Fragment>
      <h2>Drivers</h2>
      <Table >
        <TableHead>
          <TableRow>
          <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Contact Number</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Age</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Date Added</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.firstname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.connum}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.dateadded}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell><Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}><Button onClick={()=>handleOpenModal(row.id)}><FindInPageIcon/></Button><Button color="error" onClick={()=>handleDeleteModal(row.id)}><VisibilityOffIcon/></Button></Box></TableCell>
              <ViewEmployeeModal data={data} openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal}/>
              <DeleteEmployeeModal data={data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}