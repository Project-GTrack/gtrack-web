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
import GoogleMapReact from 'google-map-react';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

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

export default function ViewDumpsterModal(props) {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
    };
    const controlButtonDiv = document.createElement('button');
    controlButtonDiv.style.cursor = 'pointer';
    controlButtonDiv.setAttribute('class','btn btn-light rounded mx-2 mt-2')
    controlButtonDiv.innerHTML='<i class="fa fa-location-arrow" aria-hidden="true"></i>'
    const handleOnLoad = map => {
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(controlButtonDiv);
    };
  return (
    <Dialog
     fullWidth="true"
      onClose={props.handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={props.openModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleCloseModal}
        fullWidth
      >
        Dumpster Details
      </BootstrapDialogTitle>
      <DialogContent dividers>
      <div style={{ height: '40vh', width: '100%' }}>
                <GoogleMapReact
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleOnLoad(map, maps)}
                >
                    <AnyReactComponent
                        lat={10.99835602}
                        lng={77.01502627}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        <Box sx={{ width: "100%" }} paddingTop={2}>
          <Typography variant="body2" color="text.secondary">
           <b style={{fontSize: 22}}>Address: </b> {props.data[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary" paddingTop={1}>
          <b style={{fontSize: 22}}>Postal Code: </b>{props.data[1]}
          </Typography>
          <Typography variant="body2" color="text.secondary" paddingTop={1}>
          <b style={{fontSize: 22}}>Longitude: </b> {props.data[2]}
          </Typography>
          <Typography variant="body2" color="text.secondary" paddingTop={1}>
          <b style={{fontSize: 22}}>Latitude: </b> {props.data[3]}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleCloseModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
