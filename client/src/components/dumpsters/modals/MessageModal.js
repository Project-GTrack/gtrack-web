import * as React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
// import IconDump from "../../../../public/dumpster_marker_icon.png"
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

const MessageModal = (props) => {
    const navigate = useNavigate();
    const navigateTo = () => {
        navigate("/dumpsters");
    }
  return (
    <BootstrapDialog
      onClose={props.handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={props.openModal}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleCloseModal}
      >
        { props.message.success ? "Success":"Error"}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <h5>{props.message.message}</h5>
      </DialogContent>
      <DialogActions>
      { props.message.success ? <button type="submit" className="btn btn-success" onClick={props.handleCloseModal}>Close</button>:<button type="submit" className="btn btn-danger" onClick={props.handleCloseModal}>Close</button>}
      </DialogActions>
    </BootstrapDialog>
  );
};
export default MessageModal;
