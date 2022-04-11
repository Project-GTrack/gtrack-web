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
import Cookies from "js-cookie";
import * as yup from 'yup';
import { useTrucksPageContext } from "../../pages/TrucksPage";
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

export default function ReactivateTruckModal(props) {
  const {enqueueSnackbar} = useSnackbar();
  const {refetch}= useTrucksPageContext();
  const [loading, setLoading] = React.useState(false);
  const passwordValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required'),
  })
  const handleFormSubmit = async() =>{
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/truck/reactivate/${props.data.truck_id}`,
    {password:values.password,accessToken:Cookies.get("user_id")})
    .then(res=>{
      setLoading(false);
      if(res.data.success){
        refetch();
        enqueueSnackbar(res.data.message, { variant:'success' });
        props.setOpenReactivateModal(false);
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
      onClose={()=>props.setOpenReactivateModal(false)}
      aria-labelledby="customized-dialog-title"
      open={props.openReactivateModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
      >
        Are you sure you want to reactivate this truck?
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
        <button className='btn' onClick={()=>props.setOpenReactivateModal(false)}>Close</button>
        <button className='btn btn-success' disabled={!isValid||loading} type="submit" onClick={handleSubmit}>{loading?<><CircularProgress size={20}/> Enabling...</>:"Enable"}</button>
      </DialogActions>
    </BootstrapDialog>
  );
}
