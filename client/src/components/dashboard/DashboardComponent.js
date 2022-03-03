import React, { useState, useEffect, forwardRef } from 'react'
import PageLayout from "../../pages/PageLayout";

import Axios from 'axios';
import Cookies from 'js-cookie';

import ArticleIcon from "@mui/icons-material/Article";
import { Paper,Grid,Button} from '@mui/material';
        
import DashboardCard from './DashboardCard'
import Chart from '../ChartComponent';
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { useNavigate } from 'react-router-dom';

const DashboardComponent = ({dashcards,data,chartData}) => {
  return (
       <div>
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
                    {chartData && <Chart chartData={chartData} />}
                </Paper>
            </Grid>
        </Grid>
        </div>  
  );
};

export default DashboardComponent;
