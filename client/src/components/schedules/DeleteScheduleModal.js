import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import * as yup from 'yup'
import { useSchedulesPageContext } from "../../pages/SchedulesPage";

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

export default function DeleteScheduleModal(props) {
  const {refetch}=useSchedulesPageContext();
  const passwordValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required'),
  })
  const [error,setError]=useState(null);
  const handleFormSubmit = async() =>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/schedule/delete/${props.data.schedule_id}`,{password:values.password,accessToken:Cookies.get("user_id")})
    .then(res=>{
      if(res.data.success){
        refetch();
        props.setOpenDeleteModal(false);
        props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"success"})
      }else{
        setError(res.data.message);
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
      onClose={()=>props.setOpenDeleteModal(false)}
      aria-labelledby="customized-dialog-title"
      open={props.openDeleteModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
      >
        Are you sure you want to delete this schedule?
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
      {error && <p className="text-danger small mt-2">{error}</p>}
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
        <button className='btn' onClick={()=>props.setOpenDeleteModal(false)}>Close</button>
        <button className='btn btn-danger' disabled={!isValid} type="submit" onClick={handleSubmit}>Delete</button>
      </DialogActions>
    </BootstrapDialog>
  );
}
