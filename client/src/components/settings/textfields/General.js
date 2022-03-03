import React, { useEffect, useState } from "react";
import { TextField, FormControl, Avatar,Button,Input,Stack,Box} from "@mui/material";
import * as yup from 'yup'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useFormik } from 'formik';
import UploadProfile from "../../helpers/UploadProfile";
const General = (props) => {
    const navigate = useNavigate();
    const [image,setImage] = useState(null);
    const [url,setUrl] = useState(null);
    const [progress, setProgress] = useState(0);

    const profileGeneralValidationSchema = yup.object().shape({
        fname: yup
            .string()
            .required('First Name is required'),
        lname: yup
            .string()
            .required('Last Name is required')
    })
    
    const handleFormSubmit = () =>{
        if(Cookies.get('user_id')){
            Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/profile/general_info`,{
              fname:values.fname,
              lname: values.lname,
              image:url,
              accessToken: Cookies.get('user_id')
            }).then(res=>{
              if(res.data.success){
                props.setUser(res.data.data.acc);
                Cookies.set('user_id',res.data.data.accessToken, {expires: 1});
                props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"success"})
                setProgress(0);
                window.location.reload();
              }else{
                props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"error"})
              }
            })
          }else{
            navigate("/login");
          }
    }
   
    const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
        initialValues: {
            fname:props.user&&props.user.fname?props.user.fname:'',
            lname:props.user&&props.user.lname?props.user.lname:'',
            email:props.user&&props.user.email?props.user.email:'',
            image:props.user&&props.user.image?props.user.image:'',
            user_type:props.user&&props.user.user_type?props.user.user_type:''
        },
        enableReinitialize:true,
        validationSchema:profileGeneralValidationSchema,
        onSubmit: handleFormSubmit
    });
   
    return(
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
                <UploadProfile values = {values} progress = {progress} setProgress = {setProgress} url = {url} setUrl={setUrl}/>
                {/* <Button
                    variant="contained"
                    component="label"
                    color = 'primary'
                    size='small'
                    
                >
                Choose Image
                <Input type="file" hidden/>
                </Button> */}
            </Stack>
            <Stack sx={{marginTop:2}} spacing={2}>
           
                 <TextField
                    value= {values.fname}
                    onChange={handleChange('fname')}
                    onBlur={handleBlur('fname')}
                    id="fname"
                    label="First Name"
                    type="text"
                    fullWidth
                />
                 {(errors.fname && touched.fname) &&
                <p className="text-danger small ">{errors.fname}</p>
                } 
                  <TextField
                    value={values.lname}
                    onChange={handleChange('lname')}
                    onBlur={handleBlur('lname')}
                    id="lname"
                    label="Last Name"
                    type="text"
                    fullWidth
                />
                 {(errors.lname && touched.lname) &&
                <p className="text-danger small ">{errors.lname}</p>
                } 
                <TextField
                    id="outlined-read-only-input"
                    label="Email"
                    value={values.email}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
                
                <TextField
                    id="outlined-read-only-input"
                    label="Role"
                    value={values.user_type}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
            </Stack>
           <Button variant="text" color="success" sx={{mt:2}} disabled={!isValid} onClick={handleSubmit}>Save</Button>
        </Box>
       
    );
}

export default General;