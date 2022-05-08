import React, { forwardRef } from 'react'
import moment from 'moment';


const PdfComponent = forwardRef(({ isFilter,type, dashcards, chartData, monthData, yearData }, ref) => {
    console.log(monthData);
    return (
        <div ref={ref} style={{ margin: "2vh" }}>
            <center>
                <img src="/images/compostela.jpg" alt='Compostela Logo' style={{ paddingBottom: "2vh", width: "11vh", height: "13vh" }} />
                <h5><strong>Solid Waste Management Department of Compostela</strong></h5>
                <h6>Municipality of Compostela</h6>
                <h6>Compostela, Cebu, Philippines 6003</h6>
                <br /><br /><br />
                <h5><strong>Waste Collection Summary Report</strong></h5>
            </center>

            <div className="row" spacing={3} style={{ marginTop: "5vh" }}>
                <p><strong>Assets and Collections</strong></p>
                <p style={{ textIndent: "50px" }}>The figure below shows the total number of assets in use and the total number of collections generated within the month of {moment().format("MMMM")}</p>
                <center>
                    <table style={{ border: "1px solid black" }}>
                        <thead>
                            <tr>
                                <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Assets & Collections</strong></p></th>
                                <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong># of Assets/Collections</strong></p></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashcards.map(data => (
                                <tr key={data.id}>
                                    <td style={{ padding: "1vh", borderRight: "1px solid black" }}><p>{data.title}</p></td>
                                    <td style={{ padding: "1vh", borderLeft: "1px solid black" }}><p>{data.count}</p></td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <p><i>Figure 1. Number of Assets and Collections within the month of {moment().format("MMMM")}</i></p>
                </center>
                {(()=>{
                    if(type === "All"){
                        return (<><div xs={12} style={{ marginTop: "20vh", marginBottom: "4vh" }}>
                        <p><strong>Total Garbage Weight Collected Per Week </strong></p>
                        <p style={{ textIndent: "50px" }}>The total garbage weight collected for the month of {moment().format("MMMM")} is <b>{chartData.reduce((total, currentValue) => total = total + currentValue.weight, 0)} </b> Tons</p>
                        <p style={{ textIndent: "50px" }}>The figure below shows the total garbage weight collected weekly within the month of {moment().format("MMMM")}</p>
                        <center>
                            <table style={{ border: "1px solid black" }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Date</strong></p></th>
                                        <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Garbage Weight Collected (in Tons)</strong></p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chartData.map((data, i) => (
                                        <tr key={i}>
                                            <td style={{ padding: "1vh", borderRight: "1px solid black" }}><p>{moment(data.week.toString().split('&')[0]).format("MMMM DD") + " - " + moment(data.week.toString().split('&')[1]).format("MMMM DD, YYYY")}</p></td>
                                            <td style={{ padding: "1vh", borderLeft: "1px solid black" }}><p>{data.weight}</p></td>
                                        </tr>
    
                                    ))}
                                </tbody>
                            </table>
                            <p><i>Figure 2. Total Garbage Weight (in Tons) per week within the month of {moment().format("MMMM")}</i></p>
                        </center>
                    </div>
                    <div xs={12} style={{ marginTop: "20vh", marginBottom: "4vh" }}>
                        <p><strong>Total Garbage Weight Collected Per Month </strong></p>
                        <p style={{ textIndent: "50px" }}>The total garbage weight collected for the year of {moment().format("YYYY")} is <b>{monthData.reduce((total, currentValue) => total = total + currentValue.weight, 0)} </b> Tons</p>
                        <p style={{ textIndent: "50px" }}>The figure below shows the total garbage weight collected monthly within the year of {moment().format("YYYY")}</p>
                        <center>
                            <table style={{ border: "1px solid black" }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Month</strong></p></th>
                                        <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Garbage Weight Collected (in Tons)</strong></p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthData.map((data, i) => (
                                        <tr key={i}>
                                            <td style={{ padding: "1vh", borderRight: "1px solid black" }}><p>{data.month}</p></td>
                                            <td style={{ padding: "1vh", borderLeft: "1px solid black" }}><p>{data.weight}</p></td>
                                        </tr>
    
                                    ))}
                                </tbody>
                            </table>
                            <p><i>Figure 3. Total Garbage Weight (in Tons) per month within the year of {moment().format("YYYY")}</i></p>
                        </center>
                    </div>
                    <div xs={12} style={{ marginTop: "5vh", marginBottom: "4vh" }}>
                        <p><strong>Total Garbage Weight Collected Per Year </strong></p>
                        <p style={{ textIndent: "50px" }}>The total garbage weight collected per year is <b>{yearData.reduce((total, currentValue) => total = total + currentValue.weight, 0)} </b> Tons</p>
                        <p style={{ textIndent: "50px" }}>The figure below shows the total garbage weight collected yearly</p>
                        <center>
                            <table style={{ border: "1px solid black" }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Year</strong></p></th>
                                        <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Garbage Weight Collected (in Tons)</strong></p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yearData.map((data, i) => (
                                        <tr key={i}>
                                            <td style={{ padding: "1vh", borderRight: "1px solid black" }}><p>{data.year}</p></td>
                                            <td style={{ padding: "1vh", borderLeft: "1px solid black" }}><p>{data.weight}</p></td>
                                        </tr>
    
                                    ))}
                                </tbody>
                            </table>
                            <p><i>Figure 4. Total Garbage Weight (in Tons) per year</i></p>
                        </center>
                    </div></>);
                    }else if(type === "Weekly"){
                        return (<>
                            <div xs={12} style={{ marginTop: "20vh", marginBottom: "4vh" }}>
                                <p><strong>Total Garbage Weight Collected Per Week </strong></p>
                                <p style={{ textIndent: "50px" }}>The total garbage weight collected per week {isFilter && chartData ? "from "+moment(chartData[0].week.split('&')[0]).format("MMMM DD")+" to "+moment(chartData[chartData.length-1].week.split('&')[1]).format("MMMM DD, YYYY"):"within the month of "+moment().format("MMMM")} is <b>{chartData.reduce((total, currentValue) => total = total + currentValue.weight, 0)} </b> Tons</p>
                                <p style={{ textIndent: "50px" }}>The figure below shows the total garbage weight collected per week {isFilter && chartData ? "from "+moment(chartData[0].week.split('&')[0]).format("MMMM DD")+" to "+moment(chartData[chartData.length-1].week.split('&')[1]).format("MMMM DD, YYYY"):"within the month of "+moment().format("MMMM")}</p>
                                <center>
                                    <table style={{ border: "1px solid black" }}>
                                        <thead>
                                            <tr>
                                                <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Date</strong></p></th>
                                                <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Garbage Weight Collected (in Tons)</strong></p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chartData.map((data, i) => (
                                                <tr key={i}>
                                                    <td style={{ padding: "1vh", borderRight: "1px solid black" }}><p>{moment(data.week.toString().split('&')[0]).format("MMMM DD") + " - " + moment(data.week.toString().split('&')[1]).format("MMMM DD, YYYY")}</p></td>
                                                    <td style={{ padding: "1vh", borderLeft: "1px solid black" }}><p>{data.weight}</p></td>
                                                </tr>
            
                                            ))}
                                        </tbody>
                                    </table>
                                    <p><i>Figure 2. Total Garbage Weight (in Tons) per week {isFilter && chartData ? "from "+moment(chartData[0].week.split('&')[0]).format("MMMM DD")+" to "+moment(chartData[chartData.length-1].week.split('&')[1]).format("MMMM DD, YYYY"):"within the month of "+moment().format("MMMM")}</i></p>
                                </center>
                            </div>
                        </>)
                    }else if(type === "Monthly"){
                        return (
                            <>
                            <div xs={12} style={{ marginTop: "20vh", marginBottom: "4vh" }}>
                                <p><strong>Total Garbage Weight Collected Per Month </strong></p>
                                <p style={{ textIndent: "50px" }}>The total garbage weight collected {isFilter && monthData ? "per month from "+monthData[0].month+" "+moment(monthData[0].year).format("YYYY")+" to "+monthData[monthData.length-1].month+" "+moment(monthData[monthData.length-1].year).format("YYYY"):"per month for the year "+moment().format("YYYY")} is <b>{monthData.reduce((total, currentValue) => total = total + currentValue.weight, 0)} </b> Tons</p>
                                <p style={{ textIndent: "50px" }}>The figure below shows the total garbage weight collected {isFilter && monthData ? "per month from "+monthData[0].month+" "+moment(monthData[0].year).format("YYYY")+" to "+monthData[monthData.length-1].month+" "+moment(monthData[monthData.length-1].year).format("YYYY"):"per month for the year "+moment().format("YYYY")}</p>
                                <center>
                                    <table style={{ border: "1px solid black" }}>
                                        <thead>
                                            <tr>
                                                <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Month</strong></p></th>
                                                <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Garbage Weight Collected (in Tons)</strong></p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {monthData.map((data, i) => (
                                                <tr key={i}>
                                                    <td style={{ padding: "1vh", borderRight: "1px solid black" }}><p>{data.month}</p></td>
                                                    <td style={{ padding: "1vh", borderLeft: "1px solid black" }}><p>{data.weight}</p></td>
                                                </tr>
            
                                            ))}
                                        </tbody>
                                    </table>
                                    <p><i>Figure 2. Total Garbage Weight (in Tons) {isFilter && monthData ? "per month from "+monthData[0].month+" "+moment(monthData[0].year).format("YYYY")+" to "+monthData[monthData.length-1].month+" "+moment(monthData[monthData.length-1].year).format("YYYY"):"per month for the year "+moment().format("YYYY")}</i></p>
                                </center>
                            </div>
                            </>
                        )
                    }else{
                        return (
                            <>
                            <div xs={12} style={{ marginTop: "20vh", marginBottom: "4vh" }}>
                        <p><strong>Total Garbage Weight Collected Per Year </strong></p>
                        <p style={{ textIndent: "50px" }}>The total garbage weight collected per year is <b>{yearData.reduce((total, currentValue) => total = total + currentValue.weight, 0)} </b> Tons</p>
                        <p style={{ textIndent: "50px" }}>The figure below shows the total garbage weight collected yearly</p>
                        <center>
                            <table style={{ border: "1px solid black" }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Year</strong></p></th>
                                        <th style={{ padding: "2vh", border: "1px solid black" }}><p><strong>Garbage Weight Collected (in Tons)</strong></p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yearData.map((data, i) => (
                                        <tr key={i}>
                                            <td style={{ padding: "1vh", borderRight: "1px solid black" }}><p>{data.year}</p></td>
                                            <td style={{ padding: "1vh", borderLeft: "1px solid black" }}><p>{data.weight}</p></td>
                                        </tr>
    
                                    ))}
                                </tbody>
                            </table>
                            <p><i>Figure 4. Total Garbage Weight (in Tons) per year</i></p>
                        </center>
                    </div>
                            </>
                        )
                    }
                })()}
                
            </div>


        </div>
    );
});

export default PdfComponent;
