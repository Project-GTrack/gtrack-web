import React,{useEffect, useState} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import moment from 'moment';
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
      {onClose ? (
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
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export default function ViewAnnouncementModal(props) {


  console.log(props);
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
        View Announcement Details
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <Carousel>
          {props.data[4] && props.data[4].map((image,i)=>{
            return (
              <img 
              key = {i}
              src={image.filename}
              style={{width:"100%",height: 200}}
              alt={image.filename}
              />
    
            )
          })}
          </Carousel>
       
          <Typography variant="body2" color="text.secondary">
            <b>Title:</b> {props.data[1]}
          </Typography>
          <Typography align='justify' variant="body2" color="text.secondary">
            <b>Content:</b> {props.data[2]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Date Added:</b> {moment(props.data[3]).format("LL")}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleCloseModal}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
