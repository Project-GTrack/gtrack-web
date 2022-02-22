import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import DumpsterCustomToolbar from './DumpsterCustomToolbar';
import AddNewDumpsterModal from './modals/AddNewDumpsterModal';
import Cookies from 'js-cookie';
import axios from 'axios';
import MessageModal from "../helpers/MessageModal";
const DumpstersComponent = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openDeleteModal, setDeleteModal] = React.useState(false);
  const[openEditModal, setEditModal] = React.useState(false);
  const [prevData,setPrevData]=React.useState(null);
  const [gender, setGender] = React.useState("Male");
  const [message,setMessage]=useState({
      success:false,
      content:"",
  });
  const [mesAlert,setMesAlert]=useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenMesModal = () => setMesAlert(true);
  const handleCloseMesModal = () => setMesAlert(false);
  const [data,setData]=useState([]);

  useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/dumpster/get-dumpsters`)
      .then((res) => {
          if(res.data.success){
            let tempD=[];
            for(var x = 0;x<res.data.data.length;x++){
                  var address = res.data.data[x].street.toString().charAt(0).toUpperCase() + res.data.data[x].street.slice(1) +", "+res.data.data[x].purok.toString().charAt(0).toUpperCase()+ res.data.data[x].purok.slice(1)+", "+res.data.data[x].barangay.toString().charAt(0).toUpperCase()+ res.data.data[x].barangay.slice(1)+", "+res.data.data[x].town.toString().charAt(0).toUpperCase()+ res.data.data[x].town.slice(1);
                  var temp = [
                      res.data.data[x].dumpster_id,
                      address,
                      res.data.data[x].postal_code,
                      res.data.data[x].latitude,
                      res.data.data[x].longitude
                  ]
                  tempD.push(temp);
              }
              setData(tempD);
          }
        
      })
      setPrevData(null);
  },[mesAlert])
    // const columns = ["ID","Address", "Postal Code", "Latitude", "Longitude"];
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
            name:"Address",
            label:"Address",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Postal Code",
            label:"Postal Code",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Latitude",
            label:"Latitude",
            options: {
                filter:true,
                sort:true,
            }
            },
            {
                name:"Longitude",
                label:"Longitude",
                options: {
                    filter:true,
                    sort:true,
                }
                }
]
    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <DumpsterCustomToolbar openEditModal={openEditModal} setEditModal={setEditModal} openDeleteModal={openDeleteModal} setDeleteModal={setDeleteModal} setMessage={setMessage} setMesAlert={setMesAlert} selectedRows={selectedRows} displayData={displayData}/>
    )
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i className="fa fa-plus" aria-hidden="true"></i> Add New Dumpster/Pickup Point</button>            </div>
                <AddNewDumpsterModal
            openModal={openModal}
            setMessage={setMessage}
            setMesAlert={setMesAlert}
            setOpenModal={setOpenModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
          />
          <MessageModal
            openModal={mesAlert}
            message={message}
            setOpenModal={setMesAlert}
            handleCloseModal={handleCloseMesModal}
            handleOpenModal={handleOpenMesModal}
          />
            <MUIDataTable
                title={"Dumpsters List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
        
        
    )
}

export default DumpstersComponent
