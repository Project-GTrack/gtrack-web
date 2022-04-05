import * as React from 'react';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import { useFormik } from 'formik';
import axios from "axios";
import { useState } from "react";
import * as yup from 'yup'
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useTrucksPageContext } from '../../pages/TrucksPage';
import { CircularProgress } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
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
              position: 'absolute',
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
  
export default function AddTruckModal(props) {
    const {enqueueSnackbar} = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const {refetch}= useTrucksPageContext();
    // eslint-disable-next-line no-unused-vars
    const [user,setUser]=useState(null);
    const getCookiesJWT=()=>{
        const cookie=Cookies.get("user_id");
        if(cookie){
            const decodedToken = decodeToken(cookie);
            setUser(JSON.parse(decodedToken.user_id));
        }
    }
    const truckAddValidationSchema = yup.object().shape({
        plate_no: yup
        .string()
        .required('Plate Number is required'),
        model: yup
        .string()
        .required('Model is required'),
    })
    useEffect(() => {
        getCookiesJWT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleFormSubmit = async(values,{resetForm}) =>{
        setLoading(true);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/truck/add`,
        {accessToken:Cookies.get("user_id"),plate_no:values.plate_no,model:values.model,active:true})
        .then(res=>{
          setLoading(false);
            if(res.data.success){
              refetch();
              enqueueSnackbar(res.data.message, { variant:'success' });
              props.setOpenAddModal(false);
            }else{
              enqueueSnackbar(res.data.message, { variant:'error' });
            }
        })
    }
    const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
        initialValues:{plate_no:"",model:""},
        enableReinitialize:true,
        validationSchema:truckAddValidationSchema,
        onSubmit: handleFormSubmit
    });
    return (
        <BootstrapDialog
            onClose={()=>props.setOpenAddModal(false)}
            aria-labelledby="customized-dialog-title"
            open={props.openAddModal}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>props.setOpenAddModal(false)}>
            Add New Truck
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
                <TextField
                    value={values.plate_no}
                    onChange={handleChange('plate_no')}
                    onBlur={handleBlur('plate_no')}
                    label="Plate Number"
                    type="text"
                    fullWidth
                />
                {(errors.plate_no && touched.plate_no) &&
                    <p className="text-danger small ">{errors.plate_no}</p>
                }
                </Grid>
                <Grid item xs={12}>
                <TextField
                    value={values.model}
                    onChange={handleChange('model')}
                    onBlur={handleBlur('model')}
                    label="Model"
                    type="text"
                    fullWidth
                />
                {(errors.model && touched.model) &&
                    <p className="text-danger small ">{errors.model}</p>
                }
                </Grid>
                </Grid>
            </Box>
            </DialogContent>
            <DialogActions>
            <button type="submit"  className='btn btn-success' disabled={!isValid} onClick={handleSubmit}>
              {loading?<><CircularProgress size={20}/> Adding...</>:"Add Truck"}
            </button>
            </DialogActions>
        </BootstrapDialog>
    );
}