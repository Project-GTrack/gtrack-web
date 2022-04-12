/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import DisableTruckModal from "./trucks/DisableTruckModal";
import EditTruckModal from "./trucks/EditTruckModal";
import ReactivateTruckModal from "./trucks/ReactivateTruckModal";
const GarbageTrucksToolbar = (props) => {
    return (
        <div>
            {props.data.active?(
                <>
                    <button onClick={()=>props.setOpenEditModal(true)} className="btn btn-warning "><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button onClick={()=>props.setOpenDeleteModal(true)} className="btn btn-danger mx-2"><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
                    <EditTruckModal data={props.data} openEditModal={props.openEditModal} setOpenEditModal={props.setOpenEditModal}/>
                    <DisableTruckModal data={props.data} openDeleteModal={props.openDeleteModal} setOpenDeleteModal={props.setOpenDeleteModal}/>
                </>
            ):(
                <>
                    <button onClick={()=>props.setOpenReactivateModal(true)} className="btn btn-success mx-2"><i className="fa fa-check" aria-hidden="true"></i></button>
                    <ReactivateTruckModal data={props.data} openReactivateModal={props.openReactivateModal} setOpenReactivateModal={props.setOpenReactivateModal}/>
                </>
            )}
        </div>
    )
}

export default GarbageTrucksToolbar