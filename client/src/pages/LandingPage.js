/* eslint-disable jsx-a11y/heading-has-content */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const theme = createTheme();
const LandingPage = () => {
    const navigate = useNavigate();
    const [user,setUser]=useState(null);
    useEffect(() => {
      if(Cookies.get('user_id')){
        setUser(Cookies.get('user_id'));
        navigate("/dashboard")
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
            <Link color="inherit" href="/">
                <img alt="GTrack Logo" width={100} src='/images/gtrack-logo-1.png'></img>
            </Link>
            <button onClick={()=>navigate('/login')} className='btn btn-success end-0 position-absolute -mr-5' style={{marginRight:"20px"}}><i className="fa fa-sign-in" aria-hidden="true"></i> Login</button>
        </Toolbar>
      </AppBar>
      <div className='container mt-4 text-start mb-4'>
        <h1>Be a responsible resident.</h1>
        <h1>Help build a more sustainable community.</h1>
        <h1 className='text-success font-weight-bold'><strong>Connect with SWM.</strong></h1>
      </div>
      <section className='bg-success h-100'>
          <div className='container'>
            <div className='row pt-5 flex-column-reverse flex-lg-row'>
                <div className='col'>  
                    <img alt="GTrack Logo" width={330} src='/images/gtrack-app.png'></img>
                </div>
                <div className='col my-auto'>
                    <h1 className='text-white'><strong>Download the app here <i className="fa fa-download" aria-hidden="true"></i></strong></h1>
                    <h5 className='text-white'>Available on Android devices for now.</h5>
                    <button className='btn btn-lg  btn-outline-light rounded-pill mt-3'> <i className="fa fa-android" aria-hidden="true"></i>&nbsp;Get Now</button>
                </div>
            </div>
          </div>
      </section>
    </ThemeProvider>
    )
}

export default LandingPage
