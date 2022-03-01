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
import Carousel from 'react-material-ui-carousel'

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
        <Carousel sx={{height: 200,width:'100%',alignContent:'center',alignItems:'center',justifyContent:'center',margin:'auto'}}>
          {props.data[10].length!==0?(props.data[10].map((image,i)=>{
              return (
                <div key = {i} className="text-center mx-auto ml-auto mr-auto">
                  <img 
                    src={image.filename}
                    style={{height: 200, margin:"auto",alignSelf:"center",alignContent:"center",justifyContent:"center"}}
                    alt={image.filename}
                  />
                </div>
              )
            })
          ):(
            <div className="text-white mx-auto bg-secondary" style={{width:"100%",height:200,justifyContent:"center",display:"flex"}}>
              <p className="text-center mt-auto mb-auto">No photos uploaded</p>
            </div>
          )}
          </Carousel>
       
          <Typography variant="body2" color="text.secondary">
            <b>Event Name:</b> {props.data[1]}
          </Typography>
          <Typography align='justify' variant="body2" color="text.secondary">
            <b>Description:</b> {props.data[2]}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <b>Event Details:</b>
            <Typography variant="body2" color="text.secondary">
            <b>Event Date:</b> {props.data[6]}  <br></br>
            <b>Participants:</b>{props.data[3]} <b>Venue:</b> {props.data[7]}
          </Typography>
          </Typography>
          <Typography variant="h6" color="text.secondary">
            <b>Contact Details:</b>
            <Typography variant="body2" color="text.secondary">
            <b>Contact Person:</b> {props.data[4]} <b>Contact Number:</b> {props.data[5]}
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
