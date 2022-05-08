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

const DeleteDumpsterModal = (props) => {
  const {enqueueSnackbar} = useSnackbar();
  const {refetch}=useDumpstersPageContext();
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = async() => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/dumpster/delete-dumpster/${props.data[0]}`,
        {accessToken: Cookies.get("user_id") }
      )
      .then((res) => {
        setLoading(false);
        if(res.data.success){
          refetch();
          props.setDeleteModal(false);
          enqueueSnackbar(res.data.message, { variant:'success' });
        }else{
          enqueueSnackbar(res.data.message, { variant:'error' });
        }
      });
  };

  const handleCancelDelete = async() => {
    props.setDeleteModal(false);
    enqueueSnackbar("Dumpster record was not deleted",   { variant:'error'});
  }

  const { handleChange, handleSubmit, handleBlur, values, errors, touched, isValid } =
    useFormik({
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
        Delete this Dumpster Location?
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={20} marginTop={2}>
              Do you wish to delete this Dumpster
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <button className='btn btn-success'  type="submit" onClick={handleFormSubmit}>{loading?<><CircularProgress size={20}/> Deleting...</>:"Yes"}</button>
        <button className='btn btn-danger'  type="submit" onClick={handleCancelDelete}>{loading?<><CircularProgress size={20}/> Deleting...</>:"No"}</button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DeleteDumpsterModal;
