import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const ScheduleDialogBox = ({open,setOpen}) => {
  return (
        <Dialog
            open={open.isOpen}
            onClose={()=>setOpen((prevState) => ({ ...prevState, isOpen: false }))}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Garbage Collection Day"}
            </DialogTitle>
            <DialogContent>
                <Stack direction="row" spacing={2}>
                    <span className='text-success'><i className="fa fa-map-signs" aria-hidden="true"></i></span>
                    <span>{open.data.details.landmark}</span>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <span className='text-success'><i className="fa fa-info-circle" aria-hidden="true"></i></span>
                    <span>{open.data.details.purok+", "+open.data.details.street+", "+open.data.details.barangay}</span>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <span className='text-success'><i className="fa fa-user" aria-hidden="true"></i></span>
                    <span>{open.data.details.scheduleDriver.fname+" "+open.data.details.scheduleDriver.lname}</span>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <span className='text-success'><i className="fa fa-trash" aria-hidden="true"></i></span>
                    <span>{open.data.details.garbage_type}</span>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <span className='text-success'><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                    <span>{open.data.start_time + " - " + open.data.end_time}</span>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpen((prevState) => ({ ...prevState, isOpen: false }))} >
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
  )
}

export default ScheduleDialogBox