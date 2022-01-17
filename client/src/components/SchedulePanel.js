import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import CustomSelectToolbar from './CustomSelectToolbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const SchedulePanel = () => {
    const [calendar,setCalendar]=useState(false);
    const [localizer,setLocalizer] = useState(momentLocalizer(moment));
    const columns = ["Schedule", "Residual", "Biodegradable", "Non-biodegradable","Date Created"];

    const data = [
    ["01/01/22", "No", "No", "Yes","01/01/22"],
    ];

    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <CustomSelectToolbar selectedRows={selectedRows} displayData={displayData}/>
    )
    };
    return (
        <div>
            <div className='mb-3'>
            {(!calendar)?(
                <>
                    <button className='btn btn-success'><i className="fa fa-plus" aria-hidden="true"></i> Add New Schedule</button>
                    <button onClick={()=>setCalendar(true)} className='btn btn-secondary mx-2'><i className="fa fa-calendar" aria-hidden="true"></i> View Calendar</button>
                </>
            ):(
                <button onClick={()=>setCalendar(false)} className='btn btn-secondary'><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
            )}
            </div>
            {(!calendar)?(
                <MUIDataTable
                    title={"Schedule List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            ):(
                <div>
                    <Calendar
                        localizer={localizer}
                        events={[
                            {
                              title: "My event",
                              allDay: false,
                              start: new Date(2022, 10, 25, 10, 0), // 10.00 AM
                              end: new Date(2022, 10, 25, 11, 0), // 2.00 PM
                            }
                            ]}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                </div>
            )}
        </div>
    )
}

export default SchedulePanel
