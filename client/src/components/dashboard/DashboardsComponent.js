import React, { useState } from 'react'


import Chart from "../ChartComponent";
import ArticleIcon from "@mui/icons-material/Article";
import { Paper,Grid,Button } from '@mui/material';
import DashboardCard from './DashboardCard';
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

const dashcards = [
    {id:1, title: "Available Drivers", count: 5, icon:<PersonIcon style={{float:'right'}} fontSize="large"/>},
    {id:2, title: "Available Trucks", count: 5, icon:<LocalShippingIcon style={{float:'right'}} fontSize="large"/>},
    {id:3, title: "Dumpsters", count: 14,icon:<DeleteIcon style={{float:'right'}} fontSize="large"/>},
    {id:4, title: "Collections", count: 10,icon:<AutoDeleteIcon style={{float:'right'}} fontSize="large"/>}
];

const DashboardsComponent = () => {




    const dashboardCardComponents = dashcards.map(dashcard => 
    <Grid item key={dashcard.id} xs={12} md={6} lg={3}>
        <DashboardCard id={dashcard.id} title={dashcard.title} count={dashcard.count} icon={dashcard.icon}/>
    </Grid>
   )

    return (
        <div>
        <Button variant="contained" style={{float: 'right'}} startIcon={<ArticleIcon/>} color="success">Generate Report</Button>
        <Grid container spacing={3}>
            {dashboardCardComponents}
            
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
                    <Chart />
                </Paper>
            </Grid>
        </Grid>
        </div>
    );
}


export default DashboardsComponent