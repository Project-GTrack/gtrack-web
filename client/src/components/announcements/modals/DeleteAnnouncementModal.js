import React from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import Axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {useAnnouncementPageContext} from '../../../pages/AnnouncementsPage';  

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

export default function DeleteAnnouncementModal(props) {
  const { enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const announcementValidationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
  });
  const {refetch}=useAnnouncementPageContext();
  const handleFormSubmit = async(values) => {
    if(Cookies.get('user_id')){
      Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/announcement/delete/${props.data[0]}`,{
        password: values.password,
        accessToken: Cookies.get('user_id')
      }).then(res=>{
        if(res.data.success){
          props.setDeleteModal(false);
          enqueueSnackbar(res.data.message, { variant:'success' });
          refetch();
        }else{
          enqueueSnackbar(res.data.message, { variant:'error' });
        }
      })
    }else{
      navigate("/login");
    }
  }
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { password: "" },
      enableReinitialize: true,
      validationSchema: announcementValidationSchema,
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
        Are you sure to delete this record?
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
      <button className='btn' onClick={props.handleCloseDeleteModal}>Close</button>
        <button className='btn btn-danger' type="submit" onClick={handleSubmit}>Delete</button>
      </DialogActions>
    </BootstrapDialog>
  );
}
