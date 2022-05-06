import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import GarbageTrucksToolbar from './GarbageTrucksToolbar';
import moment from 'moment';
import AddTruckModal from './trucks/AddTruckModal';
import { useTrucksPageContext } from '../pages/TrucksPage';
import EditTruckModal from './trucks/EditTruckModal';
import DisableTruckModal from './trucks/DisableTruckModal';
const GarbageTrucksPanel = () => {
    const {queryResult}= useTrucksPageContext();
    const trucks = queryResult.data.data.trucks
    const [rowData, setRowData] = useState(0);
    const [data, setData] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal,setOpenEditModal]=useState(false);
    const [openDeleteModal,setOpenDeleteModal]=useState(false); 
    const handleOpenEditModal=(rowData)=>{
        setOpenEditModal(true)
        setRowData(rowData);
      }
      const handleDeleteModal=(rowData)=>{
        setOpenDeleteModal(true)
        setRowData(rowData);
      }
    const columns = ["Plate Number", "Model","Added by","Date Added", "Status",{
        label:"Actions",
        options:{
            customBodyRenderLite: (dataIndex, rowIndex)=>{
                // console.log(tableMeta.tableData);
                return (
                    <>
                        <button onClick={()=>handleOpenEditModal(dataIndex)} className="btn btn-warning "><i className="fa fa-pencil" aria-hidden="true"></i></button>
                        <button onClick={()=>handleDeleteModal(dataIndex)} className="btn btn-danger mx-2"><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
                    </>
                )
            }
        }
    }];
 
    useEffect(() => {
        var temp=[];
        // eslint-disable-next-line array-callback-return
        trucks && trucks.map((item)=>{
          // eslint-disable-next-line eqeqeq
          temp.push([item.plate_no && item.plate_no,item.model && item.model,item.truckUser.fname+ " " +item.truckUser.lname,item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY"),item.active && item.active==true?'Active':'Inactive']);
        })
        setData(temp);
        return()=>{
            setOpenAddModal(false);
            setOpenEditModal(false);
            setOpenDeleteModal(false);
        }
    }, [trucks])

    const options = {
    selectableRowsHeader: false,
    selectableRows:false,
    filter: true,
    filterType: 'dropdown',
    customToolbarSelect:(selectedRows,displayData)=>(
        <GarbageTrucksToolbar
            data={trucks[selectedRows.data[0].dataIndex]} 
            openEditModal={openEditModal} 
            setOpenEditModal={setOpenEditModal} 
            openDeleteModal={openDeleteModal} 
            setOpenDeleteModal={setOpenDeleteModal} 
            selectedRows={selectedRows} 
            displayData={displayData}
        />
    )};
    
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
            <EditTruckModal data={trucks[rowData]} openEditModal={openEditModal} setOpenEditModal={setOpenEditModal}/>
            <DisableTruckModal data={trucks[rowData]} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal}/>
            <AddTruckModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal}/>
        </div>
    )
}

export default GarbageTrucksPanel
