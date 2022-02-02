import * as React from "react";
import PageLayout from "./PageLayout";
import DashboardsComponent from "../components/dashboard/DashboardsComponent";

const DashboardPage = () => {

  return (
    <PageLayout headerTitle={"Dashboard"}>
      <DashboardsComponent/>      
    </PageLayout>
  );
};

export default DashboardPage;
