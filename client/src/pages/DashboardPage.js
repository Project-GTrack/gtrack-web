import React, { useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
 
  useEffect(() => {
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
        <Button variant="contained" style={{float: 'right'}} startIcon={<ArticleIcon/>} color="success">Generate Report</Button>
        <Grid container spacing={3}>
          {dashcards.map(dashcard => (
          <Grid item key={dashcard.id} xs={12} md={6} lg={3}>
            <DashboardCard id={dashcard.id} data={data} title={dashcard.title} count={dashcard.count} icon={dashcard.icon}/>
          </Grid>
          ))}      
            {/* Chart */}
            <Grid item xs={12} sx={{mt:4, mb:4}}>
                <Paper
                    sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 280,
                    maxWidth: 'lg'
                    }}
                >
                    {chartData && <Chart data={chartData} />}
                </Paper>
            </Grid>
        </Grid>
        </div>  
    </PageLayout>
  );
};

export default DashboardPage;
