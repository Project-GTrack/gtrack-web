import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import moment from 'moment';
import MUIDataTable from "mui-datatables";
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
  
export default function DumpsterModal(props) {
  const columns = ["Purok", "Street","Barangay","Date Added"];
  const [data,setData] = useState([]);
  const options = {
    selectableRowsHeader: false,
    selectableRows:"none",
    filter: true,
    filterType: 'dropdown'
  };
  useEffect(() => {
    var temp=[];
    // eslint-disable-next-line array-callback-return
    props.data && props.data.map((dumpster)=>{
      temp.push([dumpster&& dumpster.purok, 
                  dumpster&&dumpster.street,
                  dumpster&&dumpster.barangay,
                  moment(dumpster.createdAt).format("LL")]);
    })
    setData(temp);
}, [props.data])
  return (
    <BootstrapDialog
    onClose={props.handleCloseModal}
    aria-labelledby="customized-dialog-title"
    open={props.openModal}
    >
    <MUIDataTable
      title={"Driver List"}
      data={data}
      columns={columns}
      options={options}
    />
  </BootstrapDialog>
  );
}