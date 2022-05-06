import React, { useState ,useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import AnnouncementCustomToolbar from './AnnouncementCustomToolbar';
import AddNewAnnouncementModal from './modals/AddNewAnnouncementModal';
import moment from 'moment';
import {useAnnouncementPageContext} from '../../pages/AnnouncementsPage';   
import ViewAnnouncementModal from './modals/ViewAnnouncementModal';
import EditAnnouncementModal from './modals/EditAnnouncementModal';
import DeleteAnnouncementModal from './modals/DeleteAnnouncementModal';
const AnnouncementsComponent = () => {
    const {queryResult}=useAnnouncementPageContext();
    const announcements = queryResult.data.posts;
    const[data,  setData] = useState([]);
    const[rowData,  setRowData] = useState([]);
    useEffect(()=>{
       
        var temp = [];
        // eslint-disable-next-line array-callback-return
        announcements && announcements.map((announcement)=>{
            temp.push([
                announcement.announcement_id,
                announcement.title, 
                announcement.content,
                announcement.announcementAdmin.fname+" "+announcement.announcementAdmin.lname,
                moment(announcement.createdAt).format("MMMM DD, YYYY"),
                announcement.announcementLine.lineAttachment
            ]);
        })
        setData(temp);  

    },[announcements]);



    const [openModal, setOpenModal] = React.useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const[openEditModal, setEditModal] = useState(false);
    useEffect(() => {
        return () => {
        setViewModal(false);
        setDeleteModal(false);
        setEditModal(false);
        }
    }, [])
    useEffect(() => {
        return () => {
        setOpenModal(false);
        }
    }, [])
    const handleOpenModal = (rowData) => {
        setViewModal(true);
        setRowData(rowData);
    }

    const handleOpenEditModal = (rowData) => {
        setEditModal(true);
        setRowData(rowData);
    }  
    const handleCloseModal = () => setViewModal(false);
    const handleDeleteModal = (rowData) => {
        setDeleteModal(true);
        setRowData(rowData);
    }
    const handleCloseDeleteModal = () => setDeleteModal(false);
    const handleCloseEditModal = () => setEditModal(false);
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
        name:"Title",
        label:"Title",
        options: {
            filter:true,
            sort:true,
        }
    },
    {
        name:"Content",
        label:"Content",
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
    },{
        name:"Actions",
        label:"Actions",
        options:{
            customBodyRender: (value,tableMeta,updateValue)=>{
                return (
                    <>
                        <button onClick={()=>handleOpenModal(tableMeta.rowData)} className="btn btn-primary"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                        <button onClick={()=>handleOpenEditModal(tableMeta.rowData)} className="btn btn-warning "><i className="fa fa-pencil" aria-hidden="true"></i></button>
                        <button onClick={()=>handleDeleteModal(tableMeta.rowData)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </>
                )
            }
        }
    }

  ];

    const options = {
    selectableRowsHeader: false,
    selectableRows:false,
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <AnnouncementCustomToolbar 
            selectedRows={selectedRows} 
            displayData={displayData}
        />
    )
    };
    
    
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={()=>setOpenModal(true)}><i className="fa fa-plus" aria-hidden="true"></i> Add New Announcement</button>
            </div>
            <AddNewAnnouncementModal
                openModal={openModal}
                setOpenModal={setOpenModal} 
            />
                <ViewAnnouncementModal data={rowData}  openModal={viewModal} setOpenModal={setViewModal} handleCloseModal={handleCloseModal}/>
                <EditAnnouncementModal data={rowData} openModal={openEditModal} setOpenModal={setEditModal} handleCloseModal={handleCloseEditModal}/>
                <DeleteAnnouncementModal data={rowData} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal}/>
            <MUIDataTable
                title={"Announcement List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default AnnouncementsComponent
