import React, { useState } from "react";
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
import { useFormik } from 'formik';
import axios from "axios";
import Cookies from "js-cookie";
import * as yup from 'yup'
import { useSchedulesPageContext } from "../../pages/SchedulesPage";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";

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

export default function DeleteScheduleModal(props) {
  const {enqueueSnackbar} = useSnackbar();
  const {refetch}=useSchedulesPageContext();
  const [loading, setLoading] = useState(false);
  const passwordValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required'),
  })
  const handleFormSubmit = async() =>{
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/schedule/delete/${props.data.schedule_id}`,{password:values.password,accessToken:Cookies.get("user_id")})
    .then(res=>{
      setLoading(false);
      if(res.data.success){
        refetch();
        props.setOpenDeleteModal(false);
        enqueueSnackbar(res.data.message, { variant:'success' });
      }else{
        enqueueSnackbar(res.data.message, { variant:'error' });
      }
    })
  }
  const { handleChange, handleSubmit,handleBlur, values, errors,isValid,touched } = useFormik({
    initialValues:{ password:""},
    enableReinitialize:true,
    validationSchema:passwordValidationSchema,
    onSubmit: handleFormSubmit
  });
  return (
    <BootstrapDialog
      onClick={()=>props.setOpenDeleteModal(false)}
      aria-labelledby="customized-dialog-title"
      open={props.openDeleteModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={()=>props.setOpenDeleteModal(false)}
      >
        Delete this Schedule?
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={6} marginTop={2}>
    Confirm using your password
    </Grid>
    <Grid item xs={6} marginTop={-2}>
      {(errors.password && touched.password) &&
        <p className="text-danger small mt-2">{errors.password}</p>
      }
      <TextField
        onChange={handleChange('password')}
        value={values.password}
        onBlur={handleBlur('password')}
        autoFocus
        margin="dense"
        label="Enter password here"
        type="password"
        fullWidth
        variant="standard"
      />
    </Grid>
  </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <button className='btn btn-danger' disabled={!isValid||loading} type="submit" onClick={handleSubmit}>{loading?<><CircularProgress size={20}/> Deleting...</>:"Delete"}</button>
      </DialogActions>
    </BootstrapDialog>
  );
}
