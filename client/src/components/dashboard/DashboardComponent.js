import React from 'react'
import { Paper,Grid} from '@mui/material';
        
import DashboardCard from './DashboardCard'
import Chart from '../ChartComponent';

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
