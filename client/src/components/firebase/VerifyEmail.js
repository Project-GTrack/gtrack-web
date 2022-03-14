import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Firebase from "../helpers/Firebase";

const auth=Firebase.auth();
export default function VerifyEmail(props){
    const [error, setError] = useState('');
    const [validCode, setValidCode] = useState(null);
    const [verifiedCode, setVerifiedCode] = useState(false);
//   state = {
//     error: '',
//     validCode: null,
//     verifiedCode: false,
//   }
    useEffect(() => {
        auth.checkActionCode(props.actionCode).then((res)=>{
            auth
            .applyActionCode(props.actionCode)
            .then(() => {
            // Email address has been verified.
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/verify_email`,
            {email:res.data.email})
            .then(res=>{
                if(res.data.success){
                    setValidCode(true);
                    setVerifiedCode(true);
                }else{
                    setError(res.data.message);
                }
            })
            //   this.setState({ validCode: true, verifiedCode: true });
            }, error => {
            // Code is invalid or expired. Ask the user to verify their email address
            // again.
            setValidCode(false);
            setVerifiedCode(true);
            setError(error.message)
            //   this.setState({ error: error.message, validCode: false, verifiedCode: true });
            });
        },err =>{
            setError(err.message)
        })
        
    }, [props.actionCode])
    
//   componentDidMount() {
//     // Try to apply the email verification code.
//     auth
//       .applyActionCode(this.props.actionCode)
//       .then(() => {
//         // Email address has been verified.
//         this.setState({ validCode: true, verifiedCode: true });
//       }, error => {
//         // Code is invalid or expired. Ask the user to verify their email address
//         // again.
//         this.setState({ error: error.message, validCode: false, verifiedCode: true });
//       });
//   }

//   render() {
//     const {
//       error,
//       validCode,
//       verifiedCode,
//     } = this.state;

    // let component;
    return (
        <div className='container text-center'>
            <Helmet>
                <title>GTrack | Verify Email</title>
            </Helmet>
            <img alt="GTrack Logo" width={150} className='mb-5 mt-5' src='/images/gtrack-logo-1.png'></img>
            {!verifiedCode?(
                <div>
                    <CircularProgress size={80} color="success"/>
                </div>
            ):(verifiedCode && validCode)?(
                <div className="VerifyEmail">
                    <h1>Your email has been verified</h1>
                    <p>You can now sign in with your new account</p>
                </div>
            ):(verifiedCode && !validCode)?(
                <div className="VerifyEmail">
                    <h1>Try verifying your email again</h1>
                    <p className="error text-danger">{error}</p>
                </div>
            ):(
                <></>
            )}
        </div>
    );
    // if (!verifiedCode) {
    //   component = <CircularProgress color="success"/>;
    // } else if (verifiedCode && validCode) {
    //   component = (
    //     <div className="VerifyEmail">
    //       <h1>Your email has been verified</h1>
    //       <p>You can now sign in with your new account</p>
    //     </div>
    //   );
    // } else if (verifiedCode && !validCode) {
    //   component = (
    //     <div className="VerifyEmail">
    //       <h1>Try verifying your email again</h1>
    //       <p className="error">{error}</p>
    //     </div>
    //   );
    // }

    // return component;
//   }
}