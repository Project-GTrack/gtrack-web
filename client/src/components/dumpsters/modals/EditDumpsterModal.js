/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
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
import { useDumpstersPageContext } from "../../../pages/DumpstersPage";
import { capitalizeWords } from "../../helpers/TextFormat";
import { useSnackbar } from "notistack";
import { CircularProgress } from '@mui/material';

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

const EditDumpsterModal = (props) => {
  const {enqueueSnackbar} = useSnackbar();
  const {refetch}=useDumpstersPageContext();
  const [loading, setLoading] = React.useState(false);
  const [coordinate, setCoordinate] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = React.useState(null);
  const dumpsterErrorHandling = yup.object().shape({
    landmark: yup.string().required("Landmark is required"),
    street: yup.string().required("Street is required"),
    purok: yup.string().required("Purok is required"),
    barangay: yup.string().required("Barangay is required"),
    town: yup.string().required("Town is required"),
    postal_code: yup.string().required("Postal Code is required"),
  });
  React.useEffect(() => {
    console.log(props.data);
    setCoordinate({
      latitude: props.data[4],
      longitude: props.data[5],
    });
    values.landmark = props.data[3]&&props.data[3];
    values.street = props.data[1]&&props.data[1].split(", ")[0];
    values.purok = props.data[1]&&props.data[1].split(", ")[1];
    values.barangay = props.data[1]&&props.data[1].split(", ")[2];
    values.town = props.data[1]&&props.data[1].split(", ")[3];
    values.postal_code = props.data[2]&&props.data[2];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openModal]);
  const handleFormSubmit = (values, { resetForm }) => {
    setLoading(true);
    if (values.landmark === props.data[3]&&props.data[3] && values.street === props.data[1]&&props.data[1].split(", ")[0] && values.purok === props.data[1]&&props.data[1].split(", ")[1] && values.barangay === props.data[1]&&props.data[1].split(", ")[2] && values.town === props.data[1]&&props.data[1].split(", ")[3] && values.postal_code === props.data[2]&&props.data[2] && coordinate.latitude === props.data[4]&&props.data[4] && coordinate.longitude === props.data[5]&&props.data[5]) {
      props.setOpenModal(false);
    } else {
      if (coordinate.latitude !== 0 && coordinate.longitude !== 0) {
        axios
          .put(
            `${process.env.REACT_APP_BACKEND_URL}/admin/dumpster/edit-dumpster/${props.data[0]}`,
            {
              landmark: capitalizeWords(values.landmark),
              street: capitalizeWords(values.street),
              purok: capitalizeWords(values.purok),
              barangay: capitalizeWords(values.barangay),
              town: capitalizeWords(values.town),
              postal_code: capitalizeWords(values.postal_code),
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              accessToken: Cookies.get("user_id"),
            }
          )
          .then((res) => {
            
              resetForm();
              if(res.data.success){
                refetch();
                props.setOpenModal(false);
                enqueueSnackbar(res.data.message, { variant:'success' });
              }else{
                enqueueSnackbar(res.data.message, { variant:'error' });
              }
          });
      } else {
        setError("Please select a designated location for the dumpster");
      }
    }
    setLoading(false);
  };
  const { handleChange, handleSubmit, handleBlur, values, errors, touched, isValid } =
    useFormik({
      initialValues: {
        landmark:props.data[3]&&props.data[3],
        street: props.data[1]&&props.data[1].split(", ")[0],
        purok: props.data[1]&&props.data[1].split(", ")[1],
        barangay: props.data[1]&&props.data[1].split(", ")[2],
        town: props.data[1]&&props.data[1].split(", ")[3],
        postal_code: props.data[2]&&props.data[2]
      },
      enableReinitialize: true,
      validationSchema: dumpsterErrorHandling,
      onSubmit: handleFormSubmit,
    });
  const handleClick = (map, event) => {
    setCoordinate({ latitude: event.lngLat.lat, longitude: event.lngLat.lng });
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
            // eslint-disable-next-line react/style-prop-object
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "36vh",
              width: "100%",
            }}
            center={
              coordinate.latitude === 0 && coordinate.longitude === 0
                ? [props.data[5], props.data[4]]
                : [coordinate.longitude, coordinate.latitude]
            }
            zoom={
              (props.data[4] !== 0 && props.data[5] !== 0) ||
              (coordinate.latitude !== 0 && coordinate.longitude !== 0)
                ? [15]
                : [11]
            }
            onClick={handleClick}
          >
            {(props.data[4] !== 0 && props.data[5] !== 0) ||
            (coordinate.latitude !== 0 && coordinate.longitude !== 0) ? (
              <Marker
                coordinates={
                  coordinate.latitude === 0 && coordinate.longitude === 0
                    ? [props.data[5], props.data[4]]
                    : [coordinate.longitude, coordinate.latitude]
                }
                anchor="bottom"
              >
                <img style={mystyle} 
                src="/images/dumpster_marker_icon.png" />
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
            id="landmark"
            label="Landmark"
            type="text"
            fullWidth
            value={values.landmark}
            onChange={handleChange("landmark")}
            onBlur={handleBlur("landmark")}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
          {errors.landmark && touched.landmark && (
            <p className="text-danger small ">{errors.landmark}</p>
          )}
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
          />
          {errors.barangay && touched.barangay && (
            <p className="text-danger small ">{errors.barangay}</p>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="town"
            label="Town"
            type="text"
            fullWidth
            value={values.town}
            onChange={handleChange("town")}
            onBlur={handleBlur("town")}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
          {errors.town && touched.town && (
            <p className="text-danger small ">{errors.town}</p>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="postal_code"
            label="Postal Code"
            type="text"
            fullWidth
            value={values.postal_code}
            onChange={handleChange("postal_code")}
            onBlur={handleBlur("postal_code")}
            inputProps={{ style: { textTransform: "capitalize" } }}
          />
          {errors.postal_code && touched.postal_code && (
            <p className="text-danger small ">{errors.postal_code}</p>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <button className='btn btn-success' disabled={!isValid || loading} type="submit" onClick={handleSubmit}>{loading?<><CircularProgress size={20}/> Updating...</>:"Update"}</button>
      </DialogActions>
    </Dialog>
  );
};
const mystyle = {
  height: "25px",
  width: "25px",
};

export default EditDumpsterModal;
