import React, { useEffect, useState } from "react";
import { TextField,Button,Stack,Box} from "@mui/material";
import * as yup from 'yup'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useFormik } from 'formik';
import UploadProfile from "../../helpers/UploadProfile";
import { capitalizeWords } from "../../helpers/TextFormat";
import { useSnackbar } from 'notistack';
const General = (props) => {
    const { enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const [url,setUrl] = useState(null);
    const [user,setUser] = useState({
        fname:"",
        lname:""
    });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setUser({
          fname:props.user&&props.user.fname?props.user.fname:'',
          lname:props.user&&props.user.lname?props.user.lname:'',
        });
        setUrl(props.user&&props.user.image?props.user.image:'');
    }, [props.user])
    

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
              fname:capitalizeWords(values.fname),
              lname:capitalizeWords(values.lname),
              accessToken: Cookies.get('user_id')
            }).then(res=>{
              if(res.data.success){
                props.setUser(res.data.data.acc);
                Cookies.set('user_id',res.data.data.accessToken, {expires: 1});
                enqueueSnackbar(res.data.message, { variant:'success' });
              }else{
                enqueueSnackbar(res.data.message, { variant:'error' });
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
                <UploadProfile values = {values} user={user} progress = {progress} setProgress = {setProgress} url = {url} setUrl={setUrl}/>
            </Stack>
            <Stack sx={{marginTop:2}} spacing={2}>
           
                 <TextField
                    value= {values.fname}
                    onChange={handleChange('fname')}
                    onBlur={handleBlur('fname')}
                    inputProps={{ style: { textTransform: "capitalize"} }}
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
                    inputProps={{ style: { textTransform: "capitalize" } }}
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
                    inputProps={{ readOnly: true, style: { textTransform: "lowercase" } }}
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