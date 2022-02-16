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
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
// import IconDump from "../../../../public/dumpster_marker_icon.png"
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

const AddNewDumpsterModal = (props) => {
  const [coordinate, setCoordinate] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const {register, handleSubmit, resetField} = useForm({
    mode: "onChange",
    defaultValues: {
      street:"",
      purok:"",
      barangay:"",
      town:"",
      postal_code:""
    }
  });
  React.useEffect(() => {
    resetField("street");
    resetField("purok");
    resetField("barangay");
    resetField("town");
    resetField("postal_code");
    setCoordinate({latitude:0,longitude:0});
    
  },[props.openModal])
  const handleClick = (map, event) => {
    setCoordinate({ latitude: event.lngLat.lat, longitude: event.lngLat.lng });
    console.log(event.lngLat);
  };
  const onSubmit = (data) => {
    if(coordinate.latitude != 0 && coordinate.longitude != 0){
      axios.post('http://localhost:8000/admin/dumpster/add-dumpster', {street:data.street,purok:data.purok,barangay:data.barangay,town:data.town,postal_code:data.postal_code,latitude:coordinate.latitude,longitude:coordinate.longitude,accessToken: Cookies.get('user_id')})
      .then((res) => {
        if(res.data.success){
          props.setOpenModal(false);
          props.setMesAlert(true);
          props.setMessage(res.data);
          setCoordinate({latitude:0,longitude:0});
          resetField("street");
          resetField("purok");
          resetField("barangay");
          resetField("town");
          resetField("postal_code");
        }
      })
    }
    
  }
 
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
        Add New Dumpster
      </BootstrapDialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Street"
            type="text"
            fullWidth
            required {...register("street")}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="purok"
            label="Purok"
            type="text"
            fullWidth
            required {...register("purok")}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="barangay"
            label="Barangay"
            type="text"
            fullWidth
            required {...register("barangay")}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="town"
            label="Town"
            type="text"
            fullWidth
            required {...register("town")}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="postal"
            label="Postal Code"
            type="text"
            fullWidth
            required {...register("postal_code")}
            variant="standard"
          />
          <div style={{marginTop: '20px', marginBottom:'-18px'}}>
            <p><i>Please select within the map the designated location of the dumpster</i></p>
          </div>
          {/* <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                padding={5}
                autoFocus
                margin="dense"
                id="latitude"
                placeholder="Latitude"
                type="text"
                readonly
                disabled
                value={coordinate.latitude != 0 ? coordinate.latitude : ""}
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                padding={5}
                autoFocus
                margin="dense"
                id="longitude"
                placeholder="Longitude"
                type="text"
                readonly
                disabled
                value={coordinate.longitude != 0 ? coordinate.longitude : ""}
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid> */}
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "36vh",
              width: "100%",
            }}
            center={
              coordinate.latitude != 0 && coordinate.longitude != 0
                ? [coordinate.longitude, coordinate.latitude]
                : [123.94964154058066, 10.482913243053028]
            }
            onClick={handleClick}
            zoom={
              coordinate.latitude != 0 && coordinate.longitude != 0
                ? [15]
                : [11]
            }
          >
            {coordinate.latitude != 0 && coordinate.longitude != 0 ? (
              <Marker
                coordinates={
                  coordinate.latitude != 0 && coordinate.longitude != 0
                    ? [coordinate.longitude, coordinate.latitude]
                    : [123.94964154058066, 10.482913243053028]
                }
                anchor="bottom"
              >
                <img style={mystyle} src="/dumpster_marker_icon.png" />
              </Marker>
            ) : (
              <></>
            )}
          </Map>
          
        </Box>
      </DialogContent>
      <DialogActions>
        <button type="submit" className="btn btn-success">Add</button>
      </DialogActions>
      </form>
    </BootstrapDialog>
  );
};
const mystyle = {
  height: "25px",
  width: "25px",
};
export default AddNewDumpsterModal;
