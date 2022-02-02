import * as React from "react";
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

export default function ViewEventModal(props) {
  return (
    <BootstrapDialog
      onClose={props.handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={props.openModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleCloseModal}
      >
        View Announcement Details
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
         <img
            alt="GTrack Logo"
            className="mb-4"
            borderWidth=""
            style={{
              borderRadius: "50%",
              width: 200,
              height: 200,
              margin:'auto',
              border: '2px solid black',
              display: "block"
            }}
           
            src={props.avatar}
          ></img>
       
          <Typography variant="body2" color="text.secondary">
            <b>Event Name:</b> {props.data[0]}
          </Typography>
          <Typography align='justify' variant="body2" color="text.secondary">
            <b>Content:</b> {props.data[1]}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <b>Event Details:</b>
            <Typography variant="body2" color="text.secondary">
            <b>Date Started:</b> {props.data[2]} <b>Date Ended:</b> {props.data[2]}
             <br></br>
             <b>Participants:</b>{props.data[1]} <b>Venue:</b> {props.data[3]}
          </Typography>
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <b>Contact Details:</b>
            <Typography variant="body2" color="text.secondary">
            <b>Contact Person:</b> {props.data[10]} <b>Contact Number:</b> {props.data[2]}
          </Typography>
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
