import React from "react";
import { TextField, FormControl, Avatar,Button,Input,Stack,Box} from "@mui/material";
import * as yup from 'yup'
import Axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import { useSnackbar } from 'notistack';
import Firebase from '../../helpers/Firebase';

const auth = Firebase.auth();
const ChangePassword = (props) => {
  const { enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const profilePasswordValidationSchema = yup.object().shape({
        password: yup
            .string()
            .required('Password is required'),
        newPassword: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('New Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup
                .ref('newPassword'),null
                ],'Password must match!'),
    })
    const handleFirebase =async (values,resetForm,data) =>{
      if(auth.currentUser){
        await auth.currentUser.updatePassword(values.newPassword);
        resetForm();
        enqueueSnackbar(data.message, { variant:'success' });
      }else{
        console.log("NO CURRENT USER");
      }
    }

    const handleFormSubmit = async(values, {resetForm}) => {
        if(Cookies.get('user_id')){
          Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/profile/change_password`,{
            password:values.password,
            newPassword: values.newPassword,
            confirmPassword:values.confirmPassword,
            accessToken: Cookies.get('user_id')
          }).then(res=>{
            if(res.data.success){
              handleFirebase(values, resetForm, res.data);
            }else{
              enqueueSnackbar(res.data.message, { variant:'error' });
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