import * as React from "react";
import PageLayout from "./PageLayout";
import AccountSettingsComponent from "../components/settings/AccountSettingsComponent";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AccountSettingsPage = () => {
  const [user,setUser]=useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if(Cookies.get('user_id')){
      setUser(Cookies.get('user_id'));
    }else{
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <PageLayout headerTitle={"Account Settings"}>
        <AccountSettingsComponent/>
    </PageLayout>
  );
};

export default AccountSettingsPage;
