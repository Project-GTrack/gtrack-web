import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose && onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : (<></>)}
    </DialogTitle>
  );
};

export default function ViewEmployeeModal(props) {
  return (
    <BootstrapDialog
      fullWidth={true}
      onClose={props.handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={props.openModal}
    >
      <BootstrapDialogTitle
        onClose={props.handleCloseModal}
      >
        View Employee Details
      </BootstrapDialogTitle>
      <DialogContent dividers >
        <div className="container text-center m-auto align-content-center align-middle">
            {props.data[9] !==null || <Avatar sx={{width:100,height:100, fontSize:50, margin:"auto"}}>{props.data[0][0]+""+props.data[1][0]}</Avatar>}
            {props.data[9] && <Avatar src={props.data[9]} sx={{width:100,height:100, margin:"auto"}}/>}
        </div>
      
        <div className="container text-center mt-3">
          <div className="row">
            <div className="col text-end">
              <span className="text-black text-uppercase small">First Name: </span>
            </div>
            <div className="col text-start">
              <span className="text-black fs-6 fw-bold">{props.data[0]}</span>
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              <span className="text-black text-uppercase small">Last Name: </span> 
            </div>
            <div className="col text-start">
              <span className="text-black fs-6 fw-bold">{props.data[1]}</span>
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              <span className="text-black text-uppercase small">Email: </span>
            </div>
            <div className="col text-start">
              <span className="text-black fs-6 fw-bold">{props.data[2]}</span>
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              <span className="text-black text-uppercase small">Phone: </span>
            </div>
            <div className="col text-start">
              <span className="text-black fs-6 fw-bold">{props.data[3]!==""||props.data[3]!==null?props.data[3]:"NONE"}</span>
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              <span className="text-black text-uppercase small">Address: </span>
            </div>
            <div className="col text-start">
              <span className="text-black fs-6 fw-bold">{props.data[4]!==""||props.data[4]!=='null'?props.data[4]:"NONE"}</span>
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              <span className="text-black text-uppercase small">Age: </span>
            </div>
            <div className="col text-start">
              <span className="text-black fs-6 fw-bold">{props.data[5]!==""||props.data[5]!==null?props.data[5]:"NONE"}</span>
            </div>
          </div>
          <div className="row">
            <div className="col text-end">
              <span className="text-black text-uppercase small">Gender: </span>
            </div>
            <div className="col text-start">
              <span className="text-black fs-6 fw-bold">{props.data[6]!==""||props.data[6]!==null?props.data[6]:"NONE"}</span>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </BootstrapDialog>
  );
}
