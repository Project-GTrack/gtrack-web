import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import { useSchedulesPageContext } from "../../../pages/SchedulesPage";


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

const DeleteAssignment = (props) => {
  const {refetch}=useSchedulesPageContext();
  const assignmentErrorHandling = yup.object().shape({
    password: yup.string().required("Password is required"),
  });
  const handleFormSubmit = (values, { resetForm }) => {
    props.setPrevData(props.data);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/assignment/delete-assignment/${props.data[0]}`,
        { password: values.password, accessToken: Cookies.get("user_id") }
      )
      .then((res) => {
        resetForm();
        props.setDeleteModal(false);
        if(res.data.success){
          refetch();
          props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"success"})
        }else{
          props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"error"})
        }
        
      });
  };
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { password: "" },
      enableReinitialize: true,
      validationSchema: assignmentErrorHandling,
      onSubmit: handleFormSubmit,
    });
  return (
    <BootstrapDialog
      onClose={props.handleCloseDeleteModal}
      aria-labelledby="customized-dialog-title"
      open={props.openDeleteModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleCloseDeleteModal}
      >
        Delete this Truck Assignment?
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6} marginTop={2}>
              Confirm using your password
            </Grid>
            <Grid item xs={6} marginTop={-2}>
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Enter password here"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                variant="standard"
              />
              {errors.password && touched.password && (
                <p className="text-danger small ">{errors.password}</p>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <button className="btn" onClick={props.handleCloseDeleteModal}>
          Close
        </button>
        <button type="submit" className="btn btn-danger" onClick={handleSubmit}>
          Delete
        </button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DeleteAssignment;
