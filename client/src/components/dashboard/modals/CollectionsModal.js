import * as React from 'react';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
export default function CollectionsModal(props) {
  console.log(props);
  return (
    <BootstrapDialog
    onClose={props.handleCloseModal}
    aria-labelledby="customized-dialog-title"
    open={props.openModal}
    >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleCloseModal}>
      Collection
    </BootstrapDialogTitle>
    <DialogContent dividers>
    <Box sx={{ width: '100%' }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="justify">Schedule</TableCell>
            <TableCell align="justify">Route</TableCell>
            <TableCell align="justify">Weight</TableCell>
            <TableCell align="justify">Driver</TableCell>
            <TableCell align="justify">Date Added</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.data.map((collection) => (
            <TableRow
              key={collection.weight_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="justify">{moment(collection.collection_date).format("LLL")}</TableCell>
              <TableCell align="justify">{collection.collection_route}</TableCell>
              <TableCell align="justify">{collection.collection_weight_volume}</TableCell>
              <TableCell align="justify">{collection.collectionDriver.fname+" "+collection.collectionDriver.lname}</TableCell>
              <TableCell align="justify">{moment(collection.createdAt).format("LL")}</TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </DialogContent>
  </BootstrapDialog>
  );
}