import React, {useState, useEffect} from 'react'
import MUIDataTable from "mui-datatables";
// import EventCustomToolbar from './EventCustomToolbar';
import AddNewEventModal from './modals/AddNewEventModal';
import moment from 'moment';
import {useEventPageContext} from '../../pages/EventsPage';  
import ViewEventModal from './modals/ViewEventModal';
import EditEventModal from './modals/EditEventModal';
import DeleteEventModal from './modals/DeleteEventModal';
const EventsComponent = () => {
    const {queryResult}=useEventPageContext();
    const events = queryResult.data.data;
    const[data,  setData] = useState([]);
    const[rowData,  setRowData] = useState([]);
    useEffect(()=>{
        var temp = [];
        // eslint-disable-next-line array-callback-return
        events && events.map((event)=>{
            temp.push([
                event.event_id,
                event.event_name, 
                event.description,
                event.target_participants,
                event.eventAdmin.fname+" "+event.eventAdmin.lname,
                event.eventAdmin.contact_no,
                moment(event.startDate).format("lll")+" - "+moment(event.endDate).format("lll"),
                event.street+" "+event.purok+" "+event.barangay+" "+event.town,
                event.status,
                moment(event.createdAt).format("MMMM DD, YYYY"),
                event.eventLine.lineAttachment,
                event.postal_code,
                event.registration_form_url,
            ]);
        })
        setData(temp);  

    },[events]);
    const [viewModal, setViewModal] = React.useState(false);
    const [openDeleteModal, setDeleteModal] = React.useState(false);
    const[openEditModal, setEditModal] = React.useState(false);

    const handleViewModal = (rowData) => {
        setViewModal(true);
        setRowData(rowData);
      }

    const handleOpenEditModal = (rowData) => {
        setEditModal(true);
        setRowData(rowData);
    }  
    const handleCloseViewModal = () => setViewModal(false);
    const handleDeleteModal = (rowData) => {
        setDeleteModal(true);
        setRowData(rowData);
      }
    const handleCloseDeleteModal = () => setDeleteModal(false);
    const handleCloseEditModal = () => setEditModal(false);
    useEffect(() => {
      return () => {
        setOpenModal(false);
        setEditModal(false);
        setDeleteModal(false);
      }
    }, [])
    const columns = [
        {
            name:"ID",
            label:"ID",
            options: {
                filter:false,
                sort:false,
                display:false,
                viewColumns:false,
            }
        },
        {
            name:"Event Name",
            label:"Event Name",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Description",
            label:"Description",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Participants",
            label:"Participants",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Added by",
            label:"Added by",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Contact",
            label:"Contact",
            options: {
                filter:false,
                sort:false,
                display:false,
                viewColumns:false,
            }
        },
        {
            name:"Event Date",
            label:"Event Date",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Address",
            label:"Address",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Status",
            label:"Status",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Date Added",
            label:"Date Added",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Image",
            label:"Image",
            options: {
                filter:false,
                sort:false,
                display:false,
                viewColumns:false,
            }
        },
        {
            name:"Postal Code",
            label:"Postal Code",
            options: {
                filter:false,
                sort:false,
                display:false,
                viewColumns:false,
            }
        },
        {
            name:"Registration Form URL",
            label:"Registration Form URL",
            options: {
                filter:false,
                sort:false,
                display:false,
                viewColumns:false,
            }
        },{
            name:"Actions",
            label:"Actions",
            options:{
                customBodyRender: (value,tableMeta,updateValue)=>{
                    return (
                        <>
                            <button onClick={()=>handleViewModal(tableMeta.rowData)} className="btn btn-primary "><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                            <button onClick={()=>handleOpenEditModal(tableMeta.rowData)} className="btn btn-warning "><i className="fa fa-pencil" aria-hidden="true"></i></button>
                            <button onClick={()=>handleDeleteModal(tableMeta.rowData)} className="btn btn-danger "><i className="fa fa-trash" aria-hidden="true"></i></button>
                        </>
                    )
                }
            }
        }
    
      ];



  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

    const options = {
    selectableRowsHeader: false,
    selectableRows:false,
    filter: true,
    filterType: 'dropdown',
    // customToolbarSelect:(selectedRows,displayData)=>(
    //     <EventCustomToolbar  
    //         selectedRows={selectedRows} 
    //         displayData={displayData}
    //     />
    // )
      
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i className="fa fa-plus" aria-hidden="true"></i> Add New Event</button>     
            </div>
                <AddNewEventModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
          />
          <ViewEventModal data={rowData} openModal={viewModal} setOpenModal={setViewModal} handleCloseModal={handleCloseViewModal}/>
          <EditEventModal data={rowData}  openModal={openEditModal} setOpenModal={setEditModal} handleCloseModal={handleCloseEditModal}/>
          <DeleteEventModal data={rowData} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
            <MUIDataTable
                title={"Event List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default EventsComponent
