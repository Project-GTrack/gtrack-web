/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import * as yup from "yup";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { capitalizeWords } from "../../helpers/TextFormat";
import { useDumpstersPageContext } from "../../../pages/DumpstersPage";
import { useSnackbar } from "notistack";
import { CircularProgress } from '@mui/material';

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

const AddNewDumpsterModal = (props) => {
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const {refetch}=useDumpstersPageContext();
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
  const handleFormSubmit = async (values, { resetForm }) => {
    setLoading(true);
    if (coordinate.latitude !== 0 && coordinate.longitude !== 0) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/admin/dumpster/add-dumpster`, {
          street: capitalizeWords(values.street),
          purok: capitalizeWords(values.purok),
          barangay: capitalizeWords(values.barangay),
          town: "Compostela",
          postal_code: "6003",
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          accessToken: Cookies.get("user_id"),
        })
        .then((res) => {
          setLoading(false);
          resetForm();
          setCoordinate({ latitude: 0, longitude: 0 });
          setError(null);
          if (res.data.success) {
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
  };
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        street: "",
        purok: "",
        barangay: "",
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
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <TextField
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
          <div style={{ marginTop: "20px", marginBottom: "-18px" }}>
            <p>
              <i>
                Please select within the map the designated location of the
                dumpster
              </i>
            </p>
          </div>
          <Map
            // eslint-disable-next-line react/style-prop-object
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "36vh",
              width: "100%",
            }}
            center={
              coordinate.latitude !== 0 && coordinate.longitude !== 0
                ? [coordinate.longitude, coordinate.latitude]
                : [123.94964154058066, 10.482913243053028]
            }
            onClick={handleClick}
            zoom={
              coordinate.latitude !== 0 && coordinate.longitude !== 0
                ? [15]
                : [11]
            }
          >
            {coordinate.latitude !== 0 && coordinate.longitude !== 0 ? (
              <Marker
                coordinates={
                  coordinate.latitude !== 0 && coordinate.longitude !== 0
                    ? [coordinate.longitude, coordinate.latitude]
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
          {error && <p className="text-danger small text-center">{error}</p>}
        </Box>
      </DialogContent>
      <DialogActions>
        <button className='btn btn-success' disabled={loading} type="submit" onClick={handleSubmit}>{loading?<><CircularProgress size={20}/> Adding...</>:"Add"}</button>
      </DialogActions>
    </BootstrapDialog>
  );
};
const mystyle = {
  height: "25px",
  width: "25px",
};
export default AddNewDumpsterModal;
