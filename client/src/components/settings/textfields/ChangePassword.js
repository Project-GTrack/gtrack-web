import React from "react";
import { TextField, FormControl, Avatar,Button,Input,Stack,Box} from "@mui/material";
import * as yup from 'yup'
import Axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
const ChangePassword = (props) => {
    const navigate = useNavigate();
    const profilePasswordValidationSchema = yup.object().shape({
        password: yup
            .string()
            .required('Password is required'),
        newPassword: yup
            .string()
            .required('New Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup
                .ref('newPassword'),null
                ],'Password must match!'),
    })

    const handleFormSubmit = async(values, {resetForm}) => {
        if(Cookies.get('user_id')){
          Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/profile/change_password`,{
            password:values.password,
            newPassword: values.newPassword,
            confirmPassword:values.confirmPassword,
            accessToken: Cookies.get('user_id')
          }).then(res=>{
            if(res.data.success){
              console.log(res.data.data)
              resetForm();
              props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"success"})
            }else{
              props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"error"})
            }
          })
        }else{
          navigate("/login");
        }
      }

    const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
        initialValues:{ password:'',newPassword:'',confirmPassword:''},
        enableReinitialize:true,
        validationSchema:profilePasswordValidationSchema,
        onSubmit: handleFormSubmit
      });
    return(
        <Box sx={{ width: '100%' }}>
             <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                <TextField
                    value={values.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    id="password"
                    label="Current Password"
                    type="password"
                    fullWidth
                    
                />
                {(errors.password && touched.password) &&
                <p className="text-danger small ">{errors.password}</p>
                } 
                </Grid>
                <Grid item xs={12}>
                <TextField
                    value={values.newPassword}
                    onChange={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    id="newPassword"
                    label="New Password"
                    type="password"
                    fullWidth
                />
                {(errors.newPassword && touched.newPassword) &&
                <p className="text-danger small ">{errors.newPassword}</p>
                }
                </Grid>
                <Grid item xs={12}>
                <TextField
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    id="confirmPassword"
                    label="Repeat New Password"
                    type="password"
                    fullWidth
                />
                {(errors.confirmPassowrd && touched.confirmPassword) &&
                <p className="text-danger small ">{errors.confirmPassword}</p>
                }
                </Grid>
            </Grid>
            <Button variant="text" color="success" sx={{mt:2}} disabled={!isValid} onClick={handleSubmit}>Save</Button>
        </Box>
    );
}

export default ChangePassword;