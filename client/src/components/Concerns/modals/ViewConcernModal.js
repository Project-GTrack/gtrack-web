/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import "mapbox-gl/dist/mapbox-gl.css";
import Carousel from "react-material-ui-carousel";
import moment from 'moment';

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

const ViewConcernModal = (props) => {
  return (
    <Dialog
     fullWidth={true}
      onClose={()=>props.setOpenViewModal(false)}
      aria-labelledby="customized-dialog-title"
      open={props.openViewModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={()=>props.setOpenViewModal(false)}
      >
        Concern Details
      </BootstrapDialogTitle>
      <DialogContent dividers>
      <Box sx={{ width: "100%" }} paddingTop={2} paddingBottom={2}>
        <Carousel sx={{height: 200,width:'100%',alignContent:'center',alignItems:'center',justifyContent:'center',margin:'auto'}}>
            {props.data&&props.data.concernAttachmentLine.lineAttachment.length!==0?(props.data.concernAttachmentLine.lineAttachment.map((image,i)=>{
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
          <Typography variant="body2" mt={2} color="text.dark">
            <b>Subject:</b> {props.data&&props.data.subject}
          </Typography>
          <Typography align='justify' variant="body2" color="text.dark">
            <b>Message:</b> {props.data&&props.data.message}
          </Typography>
          <Typography align='justify' variant="body2" color="text.dark">
            <b>Classification:</b> {props.data&&props.data.classification}
          </Typography>
          <Typography variant="body2" color="text.dark">
            <b>Date Sent:</b> {props.data&&moment(props.data.createdAt).format("MMMM DD, YYYY")}
          </Typography>
          <hr/>
          <Typography variant="body2" color="text.dark">
            Sender Details
          </Typography>
          <Typography variant="body2" mt={2} color="text.dark">
            <b>Name:</b> {`${props.data&&props.data.concernResident.fname} ${props.data&&props.data.concernResident.lname}`}
          </Typography>
          <Typography align='justify' variant="body2" color="text.dark">
            <b>Address:</b> {`${props.data&&props.data.concernResident.purok?props.data.concernResident.purok:''}  ${props.data&&props.data.concernResident.street?props.data.concernResident.street:''} ${props.data&&props.data.concernResident.barangay?props.data.concernResident.barangay:''}`}
          </Typography>
          <Typography align='justify' variant="body2" color="text.dark">
            <b>Contact Number:</b> {props.data&&props.data.concernResident.contact_no?props.data.concernResident.contact_no:''}
          </Typography>
          <Typography variant="body2" color="text.dark">
            <b>Email:</b> {props.data&&props.data.concernResident.email}
          </Typography>
      </Box>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
}
export default ViewConcernModal;