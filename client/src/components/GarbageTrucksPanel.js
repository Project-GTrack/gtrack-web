import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import GarbageTrucksToolbar from './GarbageTrucksToolbar';
import moment from 'moment';
import AddTruckModal from './trucks/AddTruckModal';
const GarbageTrucksPanel = ({trucks,setTrucks,statusToast,setStatusToast}) => {
    const columns = ["Plate Number", "Model","Added by","Date Added", "Status"];
    const [data, setData] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal,setOpenEditModal]=useState(false);
    const [openDeleteModal,setOpenDeleteModal]=useState(false);
    // const data = [
    // ["AB123", "Suzuki", "01/01/22", "Active",],
    // ];
    useEffect(() => {
        var temp=[];
        // eslint-disable-next-line array-callback-return
        trucks && trucks.map((item)=>{
          temp.push([item.plate_no && item.plate_no,item.model && item.model,item.truckUser.fname+ " " +item.truckUser.lname,item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY"),item.active && item.active==true?'Active':'Inactive']);
        })
        setData(temp);
    }, [trucks])
    const options = {
    selectableRowsHeader: false,
    selectableRows:'single',
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <GarbageTrucksToolbar
            statusToast={statusToast}
            setStatusToast={setStatusToast} 
            data={trucks[selectedRows.data[0].dataIndex]} 
            setTrucks={setTrucks} 
            openEditModal={openEditModal} 
            setOpenEditModal={setOpenEditModal} 
            openDeleteModal={openDeleteModal} 
            setOpenDeleteModal={setOpenDeleteModal} 
            selectedRows={selectedRows} 
            displayData={displayData}
        />
    )
    };
    return (
        <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={()=>setOpenAddModal(true)}><i className="fa fa-plus" aria-hidden="true"></i> Add New Truck</button>
            </div>
            <MUIDataTable
                    title={"Garbage Trucks List"}
                    data={data}
                    columns={columns}
                    options={options}
            />
            <AddTruckModal setTrucks={setTrucks} statusToast={statusToast} setStatusToast={setStatusToast} openAddModal={openAddModal} setOpenAddModal={setOpenAddModal}/>
        </div>
    )
}

export default GarbageTrucksPanel
