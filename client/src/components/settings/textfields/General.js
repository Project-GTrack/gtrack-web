import React from "react";
import { TextField, FormControl, Avatar,Button,Input,Stack,Box} from "@mui/material";
import MUIDataTable from "mui-datatables";
import CustomSelectToolbar from "../../CustomSelectToolbar";
const General = () => {
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
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            <Avatar  sx={{ height: '80px', width: '80px' }}>TS</Avatar>
                <Button
                    variant="contained"
                    component="label"
                    color = 'primary'
                    size='small'
                    
                >
                Choose Image
                <Input type="file" hidden/>
                </Button>
            </Stack>
            <Stack sx={{marginTop:2}} spacing={2}>
                <TextField
                    id="outlined-read-only-input"
                    label="Username"
                    defaultValue="Tony Stark"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
                <TextField
                    id="outlined-read-only-input"
                    label="Email"
                    defaultValue="tonystark@gmail.com"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
                <TextField
                    id="outlined-read-only-input"
                    label="Role"
                    defaultValue="Admin"
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
            </Stack>
           <Button variant="text" color="success" sx={{mt:2}}>Save</Button>
        </Box>
       
       </div>
    );
}

export default General;