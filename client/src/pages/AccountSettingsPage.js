import * as React from "react";
import PageLayout from "./PageLayout";
import AccountSettingsComponent from "../components/settings/AccountSettingsComponent";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StatusToast from '../components/helpers/StatusToast';
import { decodeToken } from "react-jwt";
const AccountSettingsPage = () => {
  const [user,setUser]=useState(null);
  const navigate = useNavigate();
  const [statusToast, setStatusToast] = useState({
    isOpen : false,
    message : "",
    colorScheme:"success"
  })



  useEffect(() => {
    if(Cookies.get('user_id')){
      let cookie = Cookies.get('user_id');
      const decodedToken = decodeToken(cookie);
      setUser(JSON.parse(decodedToken.user_id));
    }else{
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <PageLayout headerTitle={"Account Settings"}>
        <AccountSettingsComponent statusToast={statusToast} user={user} setUser={setUser} setStatusToast={setStatusToast} />
        <StatusToast statusToast={statusToast} setStatusToast={setStatusToast}/>
    </PageLayout>
  );
};

export default AccountSettingsPage;
