import React from "react";
import { TextField, FormControl, Avatar,Button,Input,Stack,Box} from "@mui/material";

const Address = () => {
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
                <TextField id="outlined-basic" label="Purok" variant="outlined" />
                <TextField id="outlined-basic" label="Street" variant="outlined" />
                <TextField id="outlined-basic" label="Barangay" variant="outlined" />
                <TextField id="outlined-basic" label="Town" variant="outlined" />
                <TextField id="outlined-basic" label="Postal Code" variant="outlined" />
            </Stack>
            <Button variant="text" color="success" sx={{mt:2}}>Save</Button>
        </Box>
       
       </div>
    );
}

export default Address;