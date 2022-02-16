import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const CollectionAlertDialog = ({open,setOpen}) => {
    return (
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Collection Notice"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Garbage collection has not yet started or has already ended.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpen(false)} >
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CollectionAlertDialog