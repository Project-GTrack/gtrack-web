import React, { useState ,useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import AnnouncementCustomToolbar from './AnnouncementCustomToolbar';
import AddNewAnnouncementModal from './modals/AddNewAnnouncementModal';
import moment from 'moment';
const AnnouncementsComponent = ({announcements, setAnnouncements}) => {

    const[data,  setData] = useState([]);
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
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
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
    },

  ];

    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <AnnouncementCustomToolbar selectedRows={selectedRows} setAnnouncements={setAnnouncements} displayData={displayData}/>
    )
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i className="fa fa-plus" aria-hidden="true"></i> Add New Announcement</button>
            </div>
            <AddNewAnnouncementModal
                openModal={openModal}
                setAnnouncements={setAnnouncements}
                setOpenModal={setOpenModal} 
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
            />
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
