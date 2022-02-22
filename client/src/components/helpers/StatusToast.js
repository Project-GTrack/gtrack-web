import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const StatusToast = ({statusToast,setStatusToast}) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setStatusToast((prevState)=>({...prevState,isOpen:false}))
      };
    
      return (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={statusToast.isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={statusToast.colorScheme} sx={{ width: '100%' }}>
              {statusToast.message}
            </Alert>
          </Snackbar>
        </Stack>
    );
}

export default StatusToast