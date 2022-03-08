import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import * as yup from "yup";
import { useFormik } from "formik";
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
  const [coordinate, setCoordinate] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = React.useState(null);
  const dumpsterErrorHandling = yup.object().shape({
    street: yup.string().required("Street is required"),
    purok: yup.string().required("Purok is required"),
    barangay: yup.string().required("Barangay is required"),
  });
  React.useEffect(() => {
    setCoordinate({
      latitude: props.data[3],
      longitude: props.data[4],
    });
    values.street = props.data[1].split(", ")[0];
    values.purok = props.data[1].split(", ")[1];
    values.barangay = props.data[1].split(", ")[2];
    values.town = props.data[1].split(", ")[3];
    values.postal_code = props.data[2];
  }, [props.data[0], props.openModal]);
  const handleFormSubmit = (values, { resetForm }) => {
    if (values.street === props.data[1].split(", ")[0] && values.purok === props.data[1].split(", ")[1] && values.barangay === props.data[1].split(", ")[2] && values.town === props.data[1].split(", ")[3] && values.postal_code === props.data[2] && coordinate.latitude === props.data[3] && coordinate.longitude === props.data[4]) {
      props.setOpenModal(false);
    } else {
      if (coordinate.latitude != 0 && coordinate.longitude != 0) {
        axios
          .put(
            `${process.env.REACT_APP_BACKEND_URL}/admin/dumpster/edit-dumpster/${props.data[0]}`,
            {
              street: values.street,
              purok: values.purok,
              barangay: values.barangay,
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              accessToken: Cookies.get("user_id"),
            }
          )
          .then((res) => {
              resetForm();
              props.setOpenModal(false);
              if(res.data.success){
                props.setDumpsters(res.data.data);
                props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"success"})
              }else{
                props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"info"})
              }
          });
      } else {
        setError("Please select a designated location for the dumpster");
      }
    }
  };
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        street: props.data[1].split(", ")[0],
        purok: props.data[1].split(", ")[1],
        barangay: props.data[1].split(", ")[2],
      },
      enableReinitialize: true,
      validationSchema: dumpsterErrorHandling,
      onSubmit: handleFormSubmit,
    });
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
          {error && <p className="text-danger small text-center">{error}</p>}
        </div>
        <Box sx={{ width: "100%" }}>
          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Street"
            type="text"
            fullWidth
            value={values.street}
            onChange={handleChange("street")}
            onBlur={handleBlur("street")}
            inputProps={{ style: { textTransform: "capitalize" } }}
            variant="standard"
          />
          {errors.street && touched.street && (
            <p className="text-danger small ">{errors.street}</p>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="purok"
            label="Purok"
            type="text"
            fullWidth
            value={values.purok}
            onChange={handleChange("purok")}
            onBlur={handleBlur("purok")}
            inputProps={{ style: { textTransform: "capitalize" } }}
            variant="standard"
          />
          {errors.purok && touched.purok && (
            <p className="text-danger small ">{errors.purok}</p>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="barangay"
            label="Barangay"
            type="text"
            fullWidth
            value={values.barangay}
            onChange={handleChange("barangay")}
            onBlur={handleBlur("barangay")}
            inputProps={{ style: { textTransform: "capitalize" } }}
            variant="standard"
          />
          {errors.barangay && touched.barangay && (
            <p className="text-danger small ">{errors.barangay}</p>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Edit
        </button>
      </DialogActions>
    </Dialog>
  );
};
const mystyle = {
  height: "25px",
  width: "25px",
};

export default EditDumpsterModal;
