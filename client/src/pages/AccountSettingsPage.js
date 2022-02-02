import * as React from "react";
import PageLayout from "./PageLayout";
import AccountSettingsComponent from "../components/settings/AccountSettingsComponent";

const AccountSettingsPage = () => {

  return (
    <PageLayout headerTitle={"Account Settings"}>
        <AccountSettingsComponent/>
    </PageLayout>
  );
};

export default AccountSettingsPage;
