import React, { useState, useEffect, useRef, useCallback } from 'react'
import PageLayout from "./PageLayout";

import Axios from 'axios';
import Cookies from 'js-cookie';

import ArticleIcon from "@mui/icons-material/Article";
import { Paper,Grid,Button} from '@mui/material';
        
import DashboardCard from '../components/dashboard/DashboardCard'
import Chart from '../components/ChartComponent';
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import DashboardComponent from '../components/dashboard/DashboardComponent';
import { useNavigate } from 'react-router-dom';
import PdfComponent from '../components/helpers/PdfComponent';
import ReactToPrint from 'react-to-print';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const componentRef = useRef();
 
  useEffect(() => {
    console.log(componentRef);
    if(Cookies.get('user_id')){
      Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/dashboard`,{accessToken: Cookies.get('user_id')})
      .then((res) => {
          if(res){
            setData(res.data);
          }
      }) 
    }else{
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const {drivers,trucks,dumpsters,chartData,collections} = data;

  const dashcards = [
    {id:1, title: "Available Drivers", count: drivers && drivers.length, icon:<PersonIcon style={{float:'right'}} fontSize="large"/>},
    {id:2, title: "Available Trucks", count: trucks && trucks.length, icon:<LocalShippingIcon style={{float:'right'}} fontSize="large"/>},
    {id:3, title: "Dumpsters", count: dumpsters && dumpsters.length,icon:<DeleteIcon style={{float:'right'}} fontSize="large"/>},
    {id:4, title: "Collections", count: collections && collections.length,icon:<AutoDeleteIcon style={{float:'right'}} fontSize="large"/>}
]
  
  return (
    <PageLayout headerTitle={"Dashboard"}>
      <div>
        <ReactToPrint 
          trigger={() => <Button variant="contained" style={{float: 'right'}} startIcon={<ArticleIcon/>} color="success" disabled={data.length > 0? true:false}>Generate Report</Button>}
          content={() => componentRef.current}
          documentTitle="GTrack"
        />
        <DashboardComponent dashcards={dashcards} data={data} chartData={chartData}/>
        <div style={{display: "none"}}>
          {chartData ? <PdfComponent dashcards={dashcards} chartData={chartData} ref={componentRef}/>:<></>}
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
