import React from "react";
import { TextField, FormControl, Avatar,Button,Input,Stack,Box} from "@mui/material";
import MUIDataTable from "mui-datatables";
import CustomSelectToolbar from "../../CustomSelectToolbar";
const ChangePassword = () => {
    return(
       <div>
            <Box
            component="form"
            sx={{
            margin:'auto',
            width:'100vh',
            height: '100%',
            justifyContent:'center',
            alignItems:'center'
            }}
        > 
            <Stack sx={{marginTop:2}} spacing={2}>
                <TextField
                    id="outlined-password-input"
                    label="Current Password"
                    type="password"
                    autoComplete="current-password"
                />
                <TextField
                    id="outlined-password-input"
                    label="New Password"
                    type="password"
                    autoComplete="current-password"
                />
                <TextField
                    id="outlined-password-input"
                    label="Repeat New Password"
                    type="password"
                    autoComplete="current-password"
                />
            </Stack>
            <Button variant="text" color="success" sx={{mt:2}}>Save</Button>
        </Box>
       
       </div>
    );
}

export default ChangePassword;