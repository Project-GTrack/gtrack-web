import React, { useState, useEffect, forwardRef } from 'react'
import Paper from '@mui/material/Paper';
import DashboardCard from '../dashboard/DashboardCard'
import Chart from '../ChartComponent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';


const PdfComponent = forwardRef(({dashcards,chartData},ref) => {
    useEffect(() => {
        console.log("yeahh",dashcards,chartData)
    },[])
  return (
    <div ref={ref} style={{margin: "5vh"}}>
        <center style={{marginTop: "5vh"}}>
            <img src="/images/compostela.jpg" style={{paddingBottom: "2vh", width: "24vh", height: "25vh"}}/>
            <h4><strong>Solid Waste Management Department of Compostela</strong></h4>
            <h5>Municipality of Compostela</h5>
            <h5>Compostela, Cebu, Philippines 6003</h5>
            <br/><br/><br/>
            <h3><strong>Waste Collection Summary Report</strong></h3>
            <p></p>
        </center>
         <div className="row" container spacing={3}>
             <center>
             <table style={{border: "1px solid black" }}>
                 <thead>
                     <tr>
                         <th style={{padding: "2vh", border: "1px solid black"}}><strong>Assets & Collections</strong></th>
                         <th style={{padding: "2vh", border: "1px solid black"}}><strong># of Assets/Collections</strong></th>
                     </tr>
                 </thead>
                 <tbody>
                 {dashcards.map(data => (
                            <tr key={data.id}>
                                <td style={{padding: "2vh", borderRight: "1px solid black"}}>{data.title}</td>
                                <td style={{padding: "2vh", borderLeft: "1px solid black"}}>{data.count}</td>
                            </tr>
                            
                        ))}
                 </tbody>
             </table>
             <p><i>Figure 1. Number of Assets and Collections within the month of {moment().format("MMMM")}</i></p>
             </center>
             
          {/* {dashcards.map(dashcard => (
          <div className="col" item key={dashcard.id} xs={12} md={6} lg={3}>
            <DashboardCard id={dashcard.id} data={data} title={dashcard.title} count={dashcard.count} icon={dashcard.icon}/>
          </div>
          ))}       */}
          <div item xs={12} style={{marginTop: "4vh", marginBottom: "4vh"}}>
          <center>
             <table style={{border: "1px solid black" }}>
                 <thead>
                     <tr>
                         <th style={{padding: "2vh", border: "1px solid black"}}><strong>Date</strong></th>
                         <th style={{padding: "2vh", border: "1px solid black"}}><strong>Garbage Weight Collected</strong></th>
                     </tr>
                 </thead>
                 <tbody>
                 {chartData.map((data,i) => (
                            <tr key={i}>
                                <td style={{padding: "2vh", borderRight: "1px solid black"}}>{moment(data.collection_date).format("MMMM DD, YYYY")}</td>
                                <td style={{padding: "2vh", borderLeft: "1px solid black"}}>{data.collection_weight_volume}</td>
                            </tr>
                            
                        ))}
                 </tbody>
             </table>
             <p><i>Figure 2. Total Garbage Weight (in Tons) per week within the month of {moment().format("MMMM")}</i></p>
             </center>
            </div>
        </div>
        
    </div>  
  );
});

export default PdfComponent;
