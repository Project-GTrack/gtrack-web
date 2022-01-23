import React from "react";
import { TextField, FormControl, Avatar,Button,Input,Stack,Box} from "@mui/material";

const Info = () => {
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
                <TextField id="outlined-basic" label="First Name" variant="outlined" />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" />
                <TextField id="outlined-basic" label="Gender" variant="outlined" />
                <TextField id="outlined-basic" label="Phone" variant="outlined" />
                <TextField id="outlined-basic" label="Birthday" variant="outlined" />
            </Stack>
            <Button variant="text" color="success" sx={{mt:2}}>Save</Button>
        </Box>
       
       </div>
    );
}

export default Info;