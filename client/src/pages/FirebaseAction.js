import React from 'react';
import ResetPassword from '../components/firebase/ResetPassword';
import VerifyEmail from '../components/firebase/VerifyEmail';
import { useSearchParams } from "react-router-dom";
import RecoverEmail from '../components/firebase/RecoverEmail';
// import RecoverEmail from './RecoverEmail';

// http://localhost:3000/action?mode=resetPassword&oobCode=ABC123&apiKey=AIzaSy

// mode - The user management action to be completed
// oobCode - A one-time code, used to identify and verify a request
// apiKey - Your Firebase project's API key, provided for convenience

const FirebaseAction = (props) => {
    const [searchParams, ] = useSearchParams();
  // Get the action to complete.
  const mode = searchParams.get('mode');

  // Get the one-time code from the query parameter.
  const actionCode = searchParams.get('oobCode');

  // (Optional) Get the API key from the query parameter.
  // const apiKey = props.location.query.apiKey;

  // Handle the user management action.
  switch (mode) {
    case 'recoverEmail':
       // Display reset password handler and UI.
      return <RecoverEmail actionCode={actionCode} />;
    case 'resetPassword':
      // Display email recovery handler and UI.
      return <ResetPassword actionCode={actionCode} />;
    case 'verifyEmail':
      // Display email verification handler and UI.
      return <VerifyEmail actionCode={actionCode} />;
    default:
      // Error: invalid mode.
      return (
        <div className="container">
          <h1>Error encountered</h1>
          <p>The selected page mode is invalid.</p>
        </div>
      );
  }
}

export default FirebaseAction;