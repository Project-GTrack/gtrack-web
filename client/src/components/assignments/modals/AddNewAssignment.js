import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import * as yup from "yup";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

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

const AddNewAssignment = (props) => {
  const assignmentErrorHandling = yup.object().shape({
    driver: yup.string().required("Driver is required"),
    truck: yup.string().required("Truck is required"),
  });
  const [data,setData] = React.useState({
    drivers:[],
    trucks:[]
  })
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/assignment/get-drivers-trucks`)
      .then((res) => {
        if(res.data.success){
          setData({drivers:res.data.data.drivers,trucks:res.data.data.trucks});
        }
      })
  },[])
  const handleFormSubmit = async (values, { resetForm }) => {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/admin/assignment/add-assignment`, {
          driver_id:values.driver,
          truck_id:values.truck,
          accessToken: Cookies.get("user_id"),
        })
        .then((res) => {
            resetForm();
            props.setOpenModal(false);
            props.setMesAlert(true);
            props.setMessage(res.data);
        });
  };
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        driver: '',
        truck: '',
      },
      enableReinitialize: true,
      validationSchema: assignmentErrorHandling,
      onSubmit: handleFormSubmit,
    });
  return (
    <BootstrapDialog
      onClose={props.handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={props.openModal}
      sx={{ width: "100%"}}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleCloseModal}
      >
        Add New Truck Assignment
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "50vh" }}>
          <div style={{paddingBottom: "2vh"}}>
        <FormControl sx={{ width:'100%' }}>
                <InputLabel htmlFor="type">Driver</InputLabel>
                <Select
                    value={values.driver}
                    onChange={handleChange("driver")}
                    label="Type"
                    inputProps={{
                        name: 'type',
                        id: 'type',
                    }}
                >
                  {data.drivers && data.drivers.map((data,i) => {
                    return <MenuItem key={i} value={data.user_id}>{data.fname} {data.lname}</MenuItem>
                  })}
                    
                </Select>
            </FormControl>
            {(errors.driver && touched.driver) &&
                        <p className="text-danger small">{errors.driver}</p>
                    }
            </div>
            <div>
            <FormControl sx={{ width:'100%' }}>
                <InputLabel htmlFor="type">Truck</InputLabel>
                <Select
                    value={values.truck}
                    onChange={handleChange("truck")}
                    label="Type"
                    inputProps={{
                        name: 'type',
                        id: 'type',
                    }}
                >
                  {data.trucks && data.trucks.map((data,i) => {
                    return <MenuItem key={i} value={data.truck_id}>{data.plate_no} - {data.model}</MenuItem>
                  })}
                </Select>
            </FormControl>
            {(errors.truck && touched.truck) &&
                        <p className="text-danger small">{errors.truck}</p>
                    }
            </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Add
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};
export default AddNewAssignment;