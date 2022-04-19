import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Firebase from "../helpers/Firebase";

const auth=Firebase.auth();

const RecoverEmail = (props) => {
    const [restoredEmail, setRestoredEmail] = useState('');
    const [error, setError] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [validCode, setValidCode] = useState(null);
    const [verifiedCode, setVerifiedCode] = useState(false);
    const sendReset = () => {
        // You might also want to give the user the option to reset their password
        // in case the account was compromised:
        auth
          .sendPasswordResetEmail(restoredEmail)
          .then(() => {
            // Password reset confirmation sent. Ask user to check their email.
            setResetSent(true);
          });
    }
    useEffect(() => {
        // Confirm the action code is valid.
        auth
        .checkActionCode(props.actionCode)
        .then(info => {
        // Get the restored email address.
        const restoredEmailNew = info['data']['email'];
        const currentEmail = info['data']['previousEmail'];
        // Revert to the old email.
        auth
            .applyActionCode(props.actionCode)
            .then(() => {
            // Account email reverted to restoredEmail
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/reset_email`,
                {currentEmail:currentEmail,revertEmail:restoredEmailNew})
                .then(res=>{
                    if(res.data.success){
                        setRestoredEmail(restoredEmailNew);
                        setValidCode(true);
                        setVerifiedCode(true);
                    }else{
                        setError(res.data.message);
                        setValidCode(false);
                        setVerifiedCode(true);
                    }
                })
            });
        }, error => {
        // Invalid code.
            setError(error.message);
            setValidCode(false);
            setVerifiedCode(true);
        });
    }, [props.actionCode])
    return (
        <div className='container text-center'>
            <Helmet>
                <title>GTrack | Recover Email</title>
            </Helmet>
            <img alt="GTrack Logo" width={150} className='mb-5 mt-5' src='/images/gtrack-logo-1.png'></img>
            {(!verifiedCode)?(
                <div>
                    <CircularProgress size={80} color="success"/>
                </div>
            ):(resetSent)?(
                <div className="RecoverEmail">
                    <h1>Check your email</h1>
                    <p>Follow the instructions sent to <span>{restoredEmail}</span> to recover your password.</p>
                </div>
            ):(verifiedCode && validCode)?(
                <div className="RecoverEmail">
                    <h1>Updated email address</h1>
                    <p>Your sign-in email address has been changed back to <span>{restoredEmail}</span></p>
                    <p>If you did not change your sign-in email,
                    it is possible someone is trying to access your account and you should <br/>
                    <button className='btn btn-warning' onClick={sendReset}>change your password right away</button>
                    </p>
                </div>
            ):(verifiedCode && !validCode)?(
                <div className="RecoverEmail">
                    <h1>Unable to update your email address</h1>
                    <p>There was a problem changing your sign-in email back.</p>
                    <p className="error">{error}</p>
                </div>
            ):(<></>)
            }
        </div>
    )
}

export default RecoverEmail