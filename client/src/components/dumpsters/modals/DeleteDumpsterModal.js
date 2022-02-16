import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import Typography from "@mui/material/Typography";

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
  const {register, handleSubmit, resetField} = useForm({
    mode: "onChange",
    defaultValues: {
      password:""
    }
  });
  React.useEffect(() => {
    resetField("password");    
  },[props.openDeleteModal])
  const onSubmit = (data) => {
    props.setPrevData(props.data);
    axios
      .post(
        `http://localhost:8000/admin/dumpster/delete-dumpster/${props.data[0]}`,
        { password:data.password,accessToken: Cookies.get("user_id") }
      )
      .then((res) => {
        resetField("password");   
        props.setDeleteModal(false);
        props.setMesAlert(true);
        props.setMessage(res.data);
      });
  };
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
        Delete this Dumpster Record? 
      </BootstrapDialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  required
                  {...register("password")}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <button className="btn" onClick={props.handleCloseDeleteModal}>
            Close
          </button>
          <button
            className="btn btn-danger"
          >
            Delete
          </button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

export default DeleteDumpsterModal;
