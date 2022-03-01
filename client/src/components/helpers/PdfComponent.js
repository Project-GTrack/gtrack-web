import React, {  forwardRef } from 'react'
import moment from 'moment';


const PdfComponent = forwardRef(({dashcards,chartData},ref) => {
    // useEffect(() => {
    //     console.log("yeahh",dashcards,chartData)
    // },[])
  return (
    <div ref={ref} style={{margin: "2vh"}}>
        <center>
            <img src="/images/compostela.jpg" alt='Compostela Logo' style={{paddingBottom: "2vh", width: "11vh", height: "13vh"}}/>
            <h5><strong>Solid Waste Management Department of Compostela</strong></h5>
            <h6>Municipality of Compostela</h6>
            <h6>Compostela, Cebu, Philippines 6003</h6>
            <br/><br/><br/>
            <h5><strong>Waste Collection Summary Report</strong></h5>
        </center>
       
         <div className="row" spacing={3} style={{marginTop: "5vh"}}>
         <p><strong>Assets and Collections</strong></p>
        <p style={{textIndent: "50px"}}>The figure below shows the total number of assets in use and the total number of collections generated within the month of {moment().format("MMMM")}</p>
             <center>
             <table style={{border: "1px solid black" }}>
                 <thead>
                     <tr>
                         <th style={{padding: "2vh", border: "1px solid black"}}><p><strong>Assets & Collections</strong></p></th>
                         <th style={{padding: "2vh", border: "1px solid black"}}><p><strong># of Assets/Collections</strong></p></th>
                     </tr>
                 </thead>
                 <tbody>
                 {dashcards.map(data => (
                            <tr key={data.id}>
                                <td style={{padding: "1vh", borderRight: "1px solid black"}}><p>{data.title}</p></td>
                                <td style={{padding: "1vh", borderLeft: "1px solid black"}}><p>{data.count}</p></td>
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
          <div xs={12} style={{marginTop: "25vh", marginBottom: "4vh"}}>
          <p><strong>Total Garbage Weight Collected Per Week</strong></p>
          <p style={{textIndent: "50px"}}>The figure below shows the total garbage weight collected weekly within the month of {moment().format("MMMM")}</p>
          <center>
             <table style={{border: "1px solid black" }}>
                 <thead>
                     <tr>
                         <th style={{padding: "2vh", border: "1px solid black"}}><p><strong>Date</strong></p></th>
                         <th style={{padding: "2vh", border: "1px solid black"}}><p><strong>Garbage Weight Collected (in Tons)</strong></p></th>
                     </tr>
                 </thead>
                 <tbody>
                 {chartData.map((data,i) => (
                            <tr key={i}>
                                <td style={{padding: "1vh", borderRight: "1px solid black"}}><p>{moment(data.collection_date).format("MMMM DD, YYYY")}</p></td>
                                <td style={{padding: "1vh", borderLeft: "1px solid black"}}><p>{data.collection_weight_volume}</p></td>
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
