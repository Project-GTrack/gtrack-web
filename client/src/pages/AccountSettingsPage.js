import * as React from "react";
import PageLayout from "./PageLayout";
import AccountSettingsComponent from "../components/settings/AccountSettingsComponent";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { decodeToken } from "react-jwt";
import { Helmet } from "react-helmet";
const AccountSettingsPage = () => {
  const [user,setUser]=useState(null);
  const navigate = useNavigate();



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
      <Helmet>
        <title>GTrack | Account Settings</title>
      </Helmet>
      <AccountSettingsComponent user={user} setUser={setUser}/>
    </PageLayout>
  );
};

export default AccountSettingsPage;
