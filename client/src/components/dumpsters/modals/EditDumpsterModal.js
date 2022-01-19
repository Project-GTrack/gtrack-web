import * as React from 'react';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import GoogleMapReact from 'google-map-react';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { Input } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';


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
  
export default function EditDumpsterModal(props) {
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
    <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleCloseModal}>
      Edit Dumpster
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
    <Box sx={{ width: '100%' }}>
  <TextField
        autoFocus
        margin="dense"
        id="title"
        label=  "Address"
        value={props.data[0]}
        type="text"
        fullWidth
        variant="standard"
        
      />
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label=  "Postal Code"
        value={props.data[1]}
        type="text"
        fullWidth
        variant="standard"
        
      />
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label=  "Longitude"
        value={props.data[2]}
        type="text"
        fullWidth
        variant="standard"
        
      />
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label=  "Latitude"
        value={props.data[3]}
        type="text"
        fullWidth
        variant="standard"
        
      />
</Box>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={props.handleCloseModal}>
        Save
      </Button>
    </DialogActions>
  </Dialog>
  );
}