/* eslint-disable eqeqeq */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
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
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Map = ReactMapboxGl({
  accessToken:process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN,
});
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

const ViewDumpsterModal = (props) => {
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
     fullWidth={true}
      onClose={props.handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={props.openModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleCloseModal}

      >
        Dumpster Details
      </BootstrapDialogTitle>
      <DialogContent dividers>
      <Box sx={{ width: "100%" }} paddingTop={2} paddingBottom={2}>
      <Typography variant="body2" color="text.secondary">
           <b style={{fontSize: 20}}>{props.data[3]&&props.data[3]} - {props.data[1]&&props.data[1]} </b> 
          </Typography>
          </Box>
      <div style={{ height: '40vh', width: '100%' }}>
      <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "36vh",
              width: "100%",
            }}
            center={
              props.data[4] != 0 && props.data[5] != 0
                ? [props.data[5], props.data[4]]
                : [123.94964154058066, 10.482913243053028]
            }
            zoom={
              props.data[4]  != 0 && props.data[5] != 0
                ? [15]
                : [11]
            }
          >
            {props.data[4] != 0 && props.data[5] != 0 ? (
              <Marker
                coordinates={
                  props.data[4] != 0 && props.data[5] != 0
                    ? [props.data[5], props.data[4]]
                    : [123.94964154058066, 10.482913243053028]
                }
                anchor="bottom"
              >
                <img style={mystyle} src="/images/dumpster_marker_icon.png" />
              </Marker>
            ) : (
              <></>
            )}
          </Map>
          </div>
      </DialogContent>
    </Dialog>
  );
}
const mystyle = {
  height: "25px",
  width: "25px",
};
export default ViewDumpsterModal;