import * as React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { Input } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
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
  accessToken:
    "pk.eyJ1IjoicmpvbGl2ZXJpbyIsImEiOiJja2ZhanZrZnkwajFjMnJwN25mem1tenQ0In0.fpQUiUyn3J0vihGxhYA2PA",
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

const EditDumpsterModal = (props) => {
  React.useEffect(() => {
    console.log(props.openModal);
  }, [props.openModal]);
  const [coordinate, setCoordinate] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const { register, handleSubmit, unregister } = useForm();
  React.useEffect(() => {
    setCoordinate({
      latitude: props.data[3],
      longitude: props.data[4],
    });
    unregister("street");
    unregister("purok");
    unregister("barangay");
    unregister("town");
    unregister("postal_code");
  }, [props.data[0], props.openModal]);
  const onSubmit = (data) => {
    if(data.street === props.data[1].split(", ")[0] && data.purok === props.data[1].split(", ")[1] && data.barangay === props.data[1].split(", ")[2] && data.town === props.data[1].split(", ")[3] && data.postal_code === props.data[2] && coordinate.latitude === props.data[3] && coordinate.longitude === props.data[4]){
      props.setOpenModal(false);
      
    }else{
      if (coordinate.latitude != 0 && coordinate.longitude != 0) {
        axios
          .put(
            `http://localhost:8000/admin/dumpster/edit-dumpster/${props.data[0]}`,
            {
              street: data.street,
              purok: data.purok,
              barangay: data.barangay,
              town: data.town,
              postal_code: data.postal_code,
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              accessToken: Cookies.get("user_id"),
            }
          )
          .then((res) => {
            if (res.data.success) {
              props.setOpenModal(false);
              props.setMesAlert(true);
              props.setMessage(res.data);
            }
          });
      }
    }
   
  };
  const handleClick = (map, event) => {
    setCoordinate({ latitude: event.lngLat.lat, longitude: event.lngLat.lng });
    console.log(event.lngLat);
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
        Edit Dumpster
      </BootstrapDialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <div style={{ height: "38vh", width: "100%" }}>
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={{
                height: "36vh",
                width: "100%",
              }}
              center={
                coordinate.latitude == 0 && coordinate.longitude == 0
                  ? [props.data[4], props.data[3]]
                  : [coordinate.longitude, coordinate.latitude]
              }
              zoom={
                (props.data[3] != 0 && props.data[4] != 0) ||
                (coordinate.latitude != 0 && coordinate.longitude != 0)
                  ? [15]
                  : [11]
              }
              onClick={handleClick}
            >
              {(props.data[3] != 0 && props.data[4] != 0) ||
              (coordinate.latitude != 0 && coordinate.longitude != 0) ? (
                <Marker
                  coordinates={
                    coordinate.latitude == 0 && coordinate.longitude == 0
                      ? [props.data[4], props.data[3]]
                      : [coordinate.longitude, coordinate.latitude]
                  }
                  anchor="bottom"
                >
                  <img style={mystyle} src="/dumpster_marker_icon.png" />
                </Marker>
              ) : (
                <></>
              )}
            </Map>
          </div>
          <Box sx={{ width: "100%" }}>
            <TextField
              autoFocus
              margin="dense"
              id="street"
              label="Street"
              type="text"
              fullWidth
              defaultValue={props.data[1].split(", ")[0]}
              required
              {...register("street")}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="purok"
              label="Purok"
              type="text"
              fullWidth
              defaultValue={props.data[1].split(", ")[1]}
              required
              {...register("purok")}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="barangay"
              label="Barangay"
              type="text"
              fullWidth
              defaultValue={props.data[1].split(", ")[2]}
              required
              {...register("barangay")}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="town"
              label="Town"
              type="text"
              fullWidth
              defaultValue={props.data[1].split(", ")[3]}
              required
              {...register("town")}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="postal"
              label="Postal Code"
              type="text"
              fullWidth
              defaultValue={props.data[2]}
              required
              {...register("postal_code")}
              variant="standard"
            />
            {/* <TextField
        autoFocus
        margin="dense"
        id="title"
        label=  "Latitude"
        value={coordinate.latitude == 0 ? props.data[3]:coordinate.latitude}
        type="text"
        fullWidth
        variant="standard"
        
      />
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label=  "Longitude"
        value={coordinate.longitude == 0 ? props.data[4]:coordinate.longitude}
        type="text"
        fullWidth
        variant="standard"
        
      /> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <button type="submit" className="btn btn-success">
            Edit
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
const mystyle = {
  height: "25px",
  width: "25px",
};

export default EditDumpsterModal;
