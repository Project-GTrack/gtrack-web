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
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import DeleteDumpsterModal from './modals/DeleteDumpsterModal';


// Generate Order Data
function createData(id, address, postal, longitude, latitude) {
  return { id, address, postal, longitude, latitude};
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
    'Poblacion, Compostela, Cebu',
    '6003',
    '10.4494',
    '124.0070',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function DumpstersComponent() {
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
      <h2>Dumpsters</h2>
      <Table >
        <TableHead>
          <TableRow>
          <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Postal Code</StyledTableCell>
            <StyledTableCell>Longitude</StyledTableCell>
            <StyledTableCell>Latitude</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.postal}</TableCell>
              <TableCell>{row.longitude}</TableCell>
              <TableCell>{row.latitude}</TableCell>
              <TableCell><Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}><Button onClick={()=>handleOpenModal(row.id)}><FindInPageIcon/></Button><Button color="error" onClick={()=>handleDeleteModal(row.id)}><DeleteIcon/></Button></Box></TableCell>
              {/* <ViewEmployeeModal data={data} openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal}/> */}
              <DeleteDumpsterModal data={data} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}