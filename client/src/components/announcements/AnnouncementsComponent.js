import React, { useState ,useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import AnnouncementCustomToolbar from './AnnouncementCustomToolbar';
import AddNewAnnouncementModal from './modals/AddNewAnnouncementModal';
import moment from 'moment';
import {useAnnouncementPageContext} from '../../pages/AnnouncementsPage';   
import ViewAnnouncementModal from './modals/ViewAnnouncementModal';
import EditAnnouncementModal from './modals/EditAnnouncementModal';
import DeleteAnnouncementModal from './modals/DeleteAnnouncementModal';
import { ButtonGroup } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
    components: {
        MUIDataTableBodyRow: {
          styleOverrides:{
            root: {
                "&.MuiTableRow-hover": {
                    "&:hover": {
                      cursor:'pointer'
                    }
                  }
            }
          }
        },
        MUIDataTableBodyCell: {
            styleOverrides:{
              root: {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'       
              }
            }
          }
      }
  });
const AnnouncementsComponent = () => {
    const {queryResult}=useAnnouncementPageContext();
    const announcements = queryResult.data.posts;
    const[data,  setData] = useState([]);
    const [index, setIndex] = useState(0);
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
    const [openViewModal, setOpenViewModal] = React.useState(false);
    const handleOpenViewModal = (dataIndex) => {
        setIndex(dataIndex);

        setOpenViewModal(true);
    }

    const handleCloseViewModal = () => setOpenViewModal(false);


    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = (dataIndex) => {
        setIndex(dataIndex)
        setOpenEditModal(true);
    }

    const handleCloseEditModal = () => setOpenEditModal(false);

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  
    const handleOpenDeleteModal = (dataIndex) => {
        setIndex(dataIndex)
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => setOpenDeleteModal(false);


  
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
             setCellProps:(cellValue, rowIndex, columnIndex) =>{
                    return {
                       style: {
                           whiteSpace: 'nowrap',
                           maxWidth: '250px',   
                       }
                   };
}
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
       {
            name: "Actions",
            options: {
                filter:false,
                sort:false,
              customBodyRenderLite: (dataIndex) => (
                <ButtonGroup>
                    {/* <button  onClick={()=>handleOpenViewModal(dataIndex)} className="btn btn-primary mx-1 "><i className="fa fa-info-circle" aria-hidden="true"></i></button> */}
                    <button onClick={(e) =>{
                            e.stopPropagation();
                            handleOpenEditModal(dataIndex)}} className="btn btn-warning "><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button  onClick={(e) =>{ 
                            e.stopPropagation();
                            handleOpenDeleteModal(dataIndex)}} className="btn btn-danger mx-1"><i className="fa fa-trash" aria-hidden="true"></i></button>
                </ButtonGroup>
               
                
              )
            }
        },

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
    ),
    onRowClick:(rowData, rowMeta) => {
        handleOpenViewModal(rowMeta.dataIndex);
       
    }
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
            <ViewAnnouncementModal
                data={announcements[index]}
                openModal={openViewModal}
                setOpenModal={setOpenViewModal}
                handleCloseModal={handleCloseViewModal}
            />
            <EditAnnouncementModal
                data={announcements[index]}
                openModal={openEditModal}
                setOpenModal={setOpenEditModal}
                handleCloseModal={handleCloseEditModal}
            />
            <DeleteAnnouncementModal
                data={announcements[index]}
                openDeleteModal={openDeleteModal}
                setDeleteModal={setOpenDeleteModal}
                handleCloseDeleteModal={handleCloseDeleteModal}
            />
            <ThemeProvider theme={theme}>
              <MUIDataTable
                title={"Announcement List"}
                data={data}
                columns={columns}
                options={options}
               />
            </ThemeProvider>
           
        </div>
    )
}

export default AnnouncementsComponent
