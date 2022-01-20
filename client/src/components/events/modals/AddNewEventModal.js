import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import { Input } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';

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
  
export default function AddNewEventModal(props) {
  return (
    <BootstrapDialog
    onClose={props.handleCloseModal}
    aria-labelledby="customized-dialog-title"
    open={props.openModal}
  >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleCloseModal}>
      Add New Event
    </BootstrapDialogTitle>
    <DialogContent dividers>
    <Box sx={{ width: '100%' }}>
        <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Event Name"
            type="text"
            fullWidth
            variant="standard"
        />
        <TextareaAutosize
            maxRows={10}
            aria-label="maximum height"
            placeholder="Content"
            style={{ width: '100%', height: 200 }}
        />
        <TextField
            id="datetime-local"
            label="Start Date and Time"
            type="datetime-local"
            sx={{ width: 250 }}
            InputLabelProps={{
            shrink: true,
            }}
        />
           <TextField
            id="datetime-local"
            label="End Date and Time"
            type="datetime-local"
            sx={{ width: 250 }}
            InputLabelProps={{
            shrink: true,
            }}
        />
        <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Event Address - Street"
            type="text"
            fullWidth
            variant="standard"
        />
        <TextField
            autoFocus
            margin="dense"
            id="barangay"
            label="Event Address - Barangay"
            type="text"
            fullWidth
            variant="standard"
        />
        <TextField
            autoFocus
            margin="dense"
            id="town"
            label="Event Address - Town"
            type="text"
            fullWidth
            variant="standard"
        />
        <TextField
            autoFocus
            margin="dense"
            id="postalCode"
            label="Event Address - Postal Code"
            type="text"
            fullWidth
            variant="standard"
        />
        <TextField
            autoFocus
            margin="dense"
            id="participants"
            label="Participants"
            type="text"
            fullWidth
            variant="standard"
        />
        <FormControl sx={{ mt: 2, minWidth: 160 }}>
          <InputLabel htmlFor="contactPerson">Contact Person</InputLabel>
          <Select
            autoFocus
            value={props.gender}
            onChange={props.handleGender}
            label="Contact Person"
            inputProps={{
              name: 'contactPerson',
              id: 'contactPerson',
            }}
          >
            <MenuItem value="Rj Oliverio">Rj Oliverio</MenuItem>
            <MenuItem value="Aljann Ondoy">Aljann Ondoy</MenuItem>
          </Select>
        </FormControl>
        <Button
            variant="contained"
            component="label"
            color = 'success'
            sx = {{float:'right'}}
        >
        Attach Image
        <Input
            type="file"
            hidden
        />
        </Button>
      
</Box>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={props.handleCloseModal}>
        Save
      </Button>
    </DialogActions>
  </BootstrapDialog>
  );
}