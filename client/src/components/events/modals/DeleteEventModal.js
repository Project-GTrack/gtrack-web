import React, {useState} from 'react';
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
import {useEventPageContext} from '../../../pages/EventsPage'; 
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material'; 
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

export default function DeleteEventModal(props) {
  const { enqueueSnackbar} = useSnackbar();
  const {refetch}=useEventPageContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const eventValidationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
  });

  const handleFormSubmit = async(values) => {
    setLoading(true);
      Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/event/delete/${props.data.event_id}`,
      {accessToken: Cookies.get('user_id')})
      .then(res=>{
        setLoading(false);
        if(res.data.success){
          refetch();
          props.setDeleteModal(false);
          enqueueSnackbar(res.data.message, { variant:'success' });
        }else{
          enqueueSnackbar(res.data.message, { variant:'error' });
        }
      })
  }

  const handleCancelDelete = async() => {
      enqueueSnackbar("Event record was not deleted", { variant:'error' });
      props.setDeleteModal(false);
  }

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, isValid } = useFormik({
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
        Delete this Event?
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <Grid item xs={20} marginTop={2}>
    Do you wish to delete this event?
    </Grid>
  </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
      <button className='btn btn-success' disabled={loading} type="submit" onClick={handleFormSubmit}>{loading?<><CircularProgress size={20}/> Yes</>:"Yes"}</button>
      <button className='btn btn-danger' disabled={loading} type="submit" onClick={handleCancelDelete}>{loading?<><CircularProgress size={20}/> No</>:"No"}</button>
      </DialogActions>
    </BootstrapDialog>
  );
}
