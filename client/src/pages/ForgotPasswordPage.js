/* eslint-disable eqeqeq */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from "axios";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import Firebase from '../components/helpers/Firebase';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Helmet } from 'react-helmet';

const auth=Firebase.auth();
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.dark" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={`${process.env.REACT_APP_FRONTEND_URL}`}>
        GTrack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();
const ForgotPasswordPage = () => {
    const [loading,setLoading] = useState(false);
    const forgotPasswordValidationSchema = yup.object().shape({
        email: yup
          .string()
          .email("Please enter valid email")
          .required('Email is required'),
      })
    const [alert,setAlert]=useState({
      visibility:false,
      message:null,
      severity:null,
    });
    const navigate = useNavigate();
    React.useEffect(() => {
      if(Cookies.get('user_id')){
        navigate("/dashboard");
      }
    }, [navigate]);
    const handleCreateFirebase=async(email)=>{
      await auth.createUserWithEmailAndPassword(email,"p@ssw0rd");
      await auth.sendPasswordResetEmail(email);
      setAlert({visibility:true, message:"An email to reset your password has been sent!",severity:"success"});
    }
    const handleFormSubmit = () => {
        setLoading(true);
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/forgot_password`,{
            email: values.email
        }).then((res)=>{
        if(res.data.success){
            auth.sendPasswordResetEmail(values.email)
            .then(() => {
                setLoading(false);
                setAlert({visibility:true, message:"An email to reset your password has been sent!",severity:"success"});
            }, error => {
                setLoading(false);
                if(error.code=="auth/user-not-found"){
                  handleCreateFirebase(values.email);
                }else{
                  setAlert({visibility:true, message:error.message,severity:"error"});
                }
            });
        }else{
            setLoading(false);
            setAlert({visibility:true, message:res.data.message,severity:"error"});
        }
        })
        
    };
    const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
        initialValues:{ email:''},
        enableReinitialize:true,
        validationSchema:forgotPasswordValidationSchema,
        onSubmit: handleFormSubmit
    });
    
      return (
        <ThemeProvider theme={theme}>
          <Helmet>
            <title>GTrack | Forgot Password</title>
          </Helmet>
          <Container component="main" maxWidth="xs">
            <div>
              {alert.visibility  ? <Alert  sx={{mt:1}} severity={alert.severity} >{alert.message}</Alert> : <></> }
            </div>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
           
              <Link color="inherit" href="/">
                <img alt="GTrack Logo" width={150} className='mb-4' src='/images/gtrack-logo-1.png'></img>
              </Link>
              <Typography component="h1" variant="h5">
                Find your account
              </Typography>
              <p className='mt-2'>Please enter your email to receive an password reset link for your account.</p>
              <Box mt={1}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            value={values.email}
                            onChange={handleChange('email')}
                            onBlur={handleBlur('email')}
                            margin="dense"
                            label="Email"
                            autoFocus
                            type="text"
                            fullWidth
                        />
                        {(errors.email && touched.email) &&
                            <p className="text-danger small ">{errors.email}</p>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <button type="submit" className='text-white btn btn-success' disabled={!isValid} onClick={handleSubmit}>
                            Send
                        </button>
                    </Grid>
                </Grid>
                {loading ? <CircularProgress mt={2} color="success"/> : <></> }
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      );
}

export default ForgotPasswordPage
