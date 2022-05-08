import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ScheduleDialogBox from './ScheduleDialogBox';
import AddScheduleModal from './schedules/AddScheduleModal';
import ScheduleCustomToolbar from './schedules/ScheduleCustomToolbar';
import { useSchedulesPageContext } from '../pages/SchedulesPage';
import EditScheduleModal from './schedules/EditScheduleModal';
import DeleteScheduleModal from './schedules/DeleteScheduleModal';
import { ButtonGroup } from '@mui/material';
const SchedulePanel = (props) => {
    const {queryResult}=useSchedulesPageContext();
    const schedules=queryResult.data.data.schedule;
    const calendarData=queryResult.data.data.calendar;
    const [calendar,setCalendar]=useState(false);
    const [data, setData] = useState([]);
    const [openAddModal,setOpenAddModal]=useState(false);
    const [dataInd,setDataInd]=useState(0);
    const [openEditModal,setOpenEditModal]=useState(false);
    const [openDeleteModal,setOpenDeleteModal]=useState(false);
    const [open,setOpen]=useState({
        isOpen:false,
        data:null
    });
    const handleModalOpen=(ind)=>{
        setOpenEditModal(true);
        setDataInd(ind);
    }
    const handleModalDeleteOpen=(ind)=>{
        setOpenDeleteModal(true);
        setDataInd(ind);
    }
    const [event,setEvent]=useState([]);
    const [localizer] = useState(momentLocalizer(moment));
    const columns = ["Type","Schedule","Garbage Type","Driver","Landmark","Address","Date Created",{
        name:"Actions",
        label:"Actions",
        options:{
            filter:false,
            sort:false,
            customBodyRenderLite: (dataIndex, rowIndex)=>{
                return (
                    <ButtonGroup>
                       <button onClick={()=>handleModalOpen(dataIndex)} className="btn btn-warning mx-1"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                       <button onClick={()=>handleModalDeleteOpen(dataIndex)} className="btn btn-danger "><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </ButtonGroup>
                )
            }
        }
    }];

    const options = {
    selectableRowsHeader: false,
    selectableRows:false,
    filter: true,
    filterType: 'dropdown',
        customToolbarSelect:(selectedRows,displayData)=>(
            <ScheduleCustomToolbar
                data={schedules[selectedRows.data[0].dataIndex]} 
                openEditModal={openEditModal} 
                setOpenEditModal={setOpenEditModal} 
                openDeleteModal={openDeleteModal} 
                setOpenDeleteModal={setOpenDeleteModal} 
                selectedRows={selectedRows} 
                displayData={displayData}
            />
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
        let temp=[];
        // eslint-disable-next-line array-callback-return
        schedules.map((item)=>{
            let sched=JSON.parse(item.schedule);
            let when="";
            // eslint-disable-next-line array-callback-return
            sched.when.map((itemNew)=>{
                if(sched.type==='weekly'){
                    when=when+itemNew.schedule+"/";
                }else{
                    when=when+moment(itemNew.schedule).format("MMMM DD, YYYY")+"/";
                }
            })
            temp.push([
                sched.type==='weekly'?"Weekly":"Specific",
                when.split(/[/,]+/).join(',').replace(/(^,)|(,$)/g, ""),
                item.garbage_type,
                item.scheduleDriver.fname+" "+item.scheduleDriver.lname,
                item.landmark,
                `${item.purok?item.purok:""} ${item.street?item.street:""} ${item.barangay?item.barangay:""}`,
                item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY"),
                item.schedule_id,
                item.assignment_id,
                item.driver_id
            ]);
        })
        setData([...temp]);
            if(calendarData){
                let events=[];
                // eslint-disable-next-line array-callback-return
                calendarData.schedule.map((date)=>{
                    let tempDate=moment(date.date).format('YYYY-MM-DD');
                    let tempStartTime=moment(date.start_time).format('HH:mm:ss');
                    let tempEndTime=moment(date.end_time).format('HH:mm:ss');
                    events.push({
                        title: date.details.landmark+" | "+date.details.garbage_type,
                        allDay: false,
                        start: new Date(moment(tempDate+tempStartTime,'YYYY-MM-DDLT').toISOString()), // 10.00 AM
                        end: new Date(moment(tempDate+tempEndTime,'YYYY-MM-DDLT').toISOString()),
                        resource: JSON.stringify(date) // 2.00 PM
                    })
                })
                setEvent([...events]);
            }
        return ()=>{
            setEvent([]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleSelect=(event)=>{
        setOpen({isOpen:true,data:JSON.parse(event.resource)});
    }
    return (
        <div>
            <div className='mb-3'>
            {(!calendar)?(
                <>
                    <button className='btn btn-success' onClick={()=>setOpenAddModal(true)}><i className="fa fa-plus" aria-hidden="true"></i> Add New Schedule</button>
                    <button onClick={()=>setCalendar(true)} className='btn btn-secondary mx-2'><i className="fa fa-calendar" aria-hidden="true"></i> View Calendar</button>
                </>
            ):(
                <button onClick={()=>setCalendar(false)} className='btn btn-secondary'><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</button>
            )}
            </div>
            <AddScheduleModal 
                openAddModal={openAddModal}
                setOpenAddModal={setOpenAddModal}
            />
            <EditScheduleModal data={schedules[dataInd]} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}/>
            <DeleteScheduleModal data={schedules[dataInd]} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}/>
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
