import React, { useState, useEffect } from 'react'
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
  
export default function DriversModal(props) {
  return (
    <BootstrapDialog
    onClose={props.handleCloseModal}
    aria-labelledby="customized-dialog-title"
    open={props.openModal}
    >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleCloseModal}>
      Drivers
    </BootstrapDialogTitle>
    <DialogContent dividers>
    <Box sx={{ width: '100%' }}>
    <TableContainer component={Paper}>
      <Table sx={{ width:'100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="justify">Name</TableCell>
            <TableCell align="justify">Email</TableCell>
            <TableCell align="justify">Contact Number</TableCell>
            <TableCell align="justify">Address</TableCell>
            <TableCell align="justify">Date Added</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {props.data.map((driver) => (
            <TableRow
              key={driver.user_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="justify">{driver.fname+" "+driver.lname}</TableCell>
              <TableCell align="justify">{driver.email}</TableCell>
              <TableCell align="justify">{driver.contact_no}</TableCell>
              <TableCell align="justify">{driver.street && driver.street+" "+driver.purok && driver.purok+" "+driver.barangay && driver.barangay+" "+driver.town && driver.town}</TableCell>
              <TableCell align="justify">{moment(driver.createdAt).format("LL")}</TableCell>
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