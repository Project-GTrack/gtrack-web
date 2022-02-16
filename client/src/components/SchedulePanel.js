import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import CustomSelectToolbar from './CustomSelectToolbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ScheduleDialogBox from './ScheduleDialogBox';
const SchedulePanel = () => {
    const [calendar,setCalendar]=useState(false);
    const [open,setOpen]=useState({
        isOpen:false,
        data:null
    });
    const [event,setEvent]=useState([]);
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
    const CustomToolbar=(props)=>{
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col text-start'>
                        <p className="fs-3">{moment().format("MMMM YYYY")}</p>
                    </div>
                    <div className='col text-end'>
                        <button
                            onClick={()=>props.onView('month')}
                            className='btn btn-outline-secondary m-2'
                        >
                            Month
                        </button>
                        <button
                            onClick={()=>props.onView('week')} 
                            className='btn btn-outline-secondary m-2'
                        >
                            Week
                        </button>
                        <button
                            onClick={()=>props.onView('agenda')}
                            className='btn btn-outline-secondary m-2'
                        >
                            Agenda
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/web/schedule/display`)
        .then(res => {
            if(res.data.success){
                // setSchedule(res.data.data.schedule);
                let events=[];
                // eslint-disable-next-line array-callback-return
                res.data.data.schedule.map((date)=>{
                    events.push({
                        title: date.details.landmark+" | "+date.details.garbage_type,
                        allDay: false,
                        start: new Date(moment(date.date)), // 10.00 AM
                        end: new Date(moment(date.date)),
                        resource: JSON.stringify(date) // 2.00 PM
                    })
                })
                setEvent([...events]);
            }
        })
    }, [])
    const handleSelect=(event)=>{
        setOpen({isOpen:true,data:JSON.parse(event.resource)});
    }
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
                        onSelectEvent={handleSelect}
                        components = {{toolbar : CustomToolbar}}
                        localizer={localizer}
                        events={event}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                    {open.isOpen && <ScheduleDialogBox open={open} setOpen={setOpen}/>}
                </div>
            )}
        </div>
    )
}

export default SchedulePanel
