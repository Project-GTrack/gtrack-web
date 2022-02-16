import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';


const ReportNotifications = ({open,anchorEl,handleClose,type,reports}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(reports);
  }, [reports,type])
  
  return (
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      {(type==='concern')?(
        data.length!==0?(
          data.map((item,i)=>{
            return (
              <MenuItem key={i}>
                  <Stack direction="row" spacing={1}>
                    <Avatar />
                    <Stack direction="column">
                      <span style={{fontSize: '12px'}}>{item.sender}  | {item.classification}</span>
                      <span style={{fontSize: '14px'}}>{item.subject}</span>
                    </Stack>
                  </Stack>
              </MenuItem>
            );
          })
        ):(
          <MenuItem >
            <div>No alerts for now</div>
          </MenuItem>
        )
      ):(
        data.length!==0?(
          data.map((item,i)=>{
            return (
              <MenuItem key={i}>
                  <Stack direction="row" spacing={1}>
                    <Avatar />
                    <Stack direction="column">
                      <span style={{fontSize: '12px'}}>{item.sender}  | {item.degree}</span>
                      <span style={{fontSize: '14px'}}>{item.subject}</span>
                    </Stack>
                  </Stack>
              </MenuItem>
            );
          })
        ):(
          <MenuItem >
            <div>No alerts for now</div>
          </MenuItem>
        )
      )}
      </Menu>
  )
}

export default ReportNotifications