import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Firebase from "../helpers/Firebase";
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Helmet } from 'react-helmet';

const auth=Firebase.auth();
export default function ResetPassword(props) {
    const [email, setEmail] = useState(null);
    const [error, setError] = useState('');
    // const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [validCode, setValidCode] = useState(null);
    const [verifiedCode, setVerifiedCode] = useState(false);
    const resetPasswordValidationSchema = yup.object().shape({
      password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('New Password is required'),
      repeat_password: yup
        .string()
        .oneOf([yup
            .ref('password'),null
        ],'Password must match!'),
    })
//   state = {
//     email: null,
//     error: '',
//     password: '',
//     success: false,
//     validCode: null,
//     verifiedCode: false,
//   }
  useEffect(() => {
    auth
      .verifyPasswordResetCode(props.actionCode)
      .then(email => {
          setEmail(email);
          setValidCode(true);
          setVerifiedCode(true);
        // this.setState({ email, validCode: true, verifiedCode: true });
      }, error => {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
        setError(error.message);
        setValidCode(false);
        setVerifiedCode(true);
        // this.setState({ error: error.message, validCode: false, verifiedCode: true });
      });
  }, [props.actionCode])
const handleFormSubmit = () => {
  const { actionCode } = props;
    const newPassword = values.password;

    // Save the new password.
    auth
      .confirmPasswordReset(actionCode, newPassword)
      .then(() => {
        // Password reset has been confirmed and new password updated.
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/reset_password`,
        {email:email,password:newPassword})
        .then(res=>{
            if(res.data.success){
              setSuccess(true);
            }else{
              setError(res.data.message);
            }
        })
        // this.setState({ success: true });
      }, error => {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
        setError(error.message);
        // this.setState({ error: error.message });
      });
  
};
const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
  initialValues:{ password:'',repeat_password:''},
  enableReinitialize:true,
  validationSchema:resetPasswordValidationSchema,
  onSubmit: handleFormSubmit
});
  // const handleResetPassword = (event) => {
  //   event.preventDefault();
    
  // }

  // const setText = (evt) => {
  //     setPassword(evt.target.value);
  // }

  return(
    // const {
    //   email,
    //   error,
    //   password,
    //   success,
    //   validCode,
    //   verifiedCode,
    // } = this.state;

    // let component;
    <div className='container text-center'>
      <Helmet>
        <title>GTrack | Reset Password</title>
      </Helmet>
        <img alt="GTrack Logo" width={150} className='mb-5 mt-5' src='/images/gtrack-logo-1.png'></img>
        {!verifiedCode?(
            <div>
                <CircularProgress size={80} color="success"/>
            </div>
        ):(success)?(
            <div className="text-center">
                <h1>Password changed</h1>
                <p>You can now sign in with your new password</p>
            </div>
        ):(verifiedCode && validCode)?(
            <div className="text-center">
          <h1>Reset your password</h1>
          <h4>for <span className='text-success'>{email}</span></h4>

          <div className='w-50 m-auto'>

            {error!=='' && (
                <div class="alert alert-danger mb-3 mt-3" role="alert">
                    {error}
                </div>
            )}
            <div class="mb-3">
                <p>New Password:</p>
                <input 
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    type="password"
                    class="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="New Password"
                    required
                />
                {(errors.password && touched.password) &&
                    <p className="text-danger small ">{errors.password}</p>
                }
            </div><div class="mb-3">
                <p>Repeat Password:</p>
                <input 
                    onChange={handleChange("repeat_password")}
                    onBlur={handleBlur("repeat_password")}
                    value={values.repeat_password}
                    type="password"
                    class="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="Repeat Password"
                    required
                />
                {(errors.repeat_password && touched.repeat_password) &&
                    <p className="text-danger small ">{errors.repeat_password}</p>
                }
            </div>
            <div class="mb-3">
                <button 
                  type="submit" 
                  className='text-white btn btn-success' 
                  disabled={!isValid} 
                  onClick={handleSubmit}
                >
                  Save
                </button>
            </div>
                
          </div>
        </div>
        ):(verifiedCode && !validCode)?(
            <div className="text-center">
                <h1>Try resetting your password again</h1>
                <p className="text-danger">{error}</p>
            </div>
        ):(
            <></>
        )}
    </div>
    // if (!verifiedCode) {
    //   component = <CircularProgress color="success"/>;
    // } else if (success) {
    //   component = (
    //     <div className="ResetPassword">
    //       <h1>Password changed</h1>
    //       <p>You can now sign in with your new password</p>
    //     </div>
    //   );
    // } else if (verifiedCode && validCode) {
    //   component = (
    //     <div className="ResetPassword">
    //       <h1>Reset your password</h1>
    //       <div>for <span>{email}</span></div>

    //       <form onSubmit={this.handleResetPassword}>

    //         {error ? <div className="error">{error}</div> : ''}

    //         <input
    //           onChange={this.setText}
    //           value={password}
    //           type="password"
    //           placeholder="New password"
    //           required
    //         />
    //         <input
    //           type="submit"
    //           value="SAVE"
    //         />
    //       </form>
    //     </div>
    //   );
    // } else if (verifiedCode && !validCode) {
    //   component = (
    //     <div className="ResetPassword">
    //       <h1>Try resetting your password again</h1>
    //       <p className="error">{error}</p>
    //     </div>
    //   );
    // }

    // return component;
  );
}