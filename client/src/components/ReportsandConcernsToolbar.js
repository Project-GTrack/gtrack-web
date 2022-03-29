/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import DeleteReportModal from "./Reports/DeleteReportModal";
import ResolveReportModal from "./Reports/ResolveReportModal";
import ViewReportModal from "./Reports/ViewReportModal";

const ReportsandConcernsToolbar = (props) => {
    return (
        <div>
        {props.data.status? (
            <>
             <button onClick={()=>props.setOpenResolveModal(true)} className="btn btn-success mx-2"><i className="fa fa-check" aria-hidden="true"></i></button>
                    <button onClick={()=>props.setOpenViewModal(true)} className="btn btn-primary mx-2"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                    <button onClick={()=>props.setOpenDeleteModal(true)} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    <ResolveReportModal data={props.data} statusToast={props.statusToast} setStatusToast={props.setStatusToast} setTrucks={props.setTbrucks} openResolveModal={props.openResolveModal} setOpenResolveModal={props.setOpenResolveModal}/>
                    <ViewReportModal data={props.data} statusToast={props.statusToast} setStatusToast={props.setStatusToast} setTrucks={props.setTrucks} openViewModal={props.openViewModal} setOpenViewModal={props.setOpenViewModal}/>
                    <DeleteReportModal data={props.data} statusToast={props.statusToast} setStatusToast={props.setStatusToast} setTrucks={props.setTrucks} openDeleteModal={props.openDeleteModal} setOpenDeleteModal={props.setOpenDeleteModal}/>
            </>

        ):(
            <>
                 <button onClick={()=>props.setOpenViewModal(true)} className="btn btn-primary mx-2"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                    <button onClick={()=>props.setOpenDeleteModal(true)} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    <ViewReportModal data={props.data} statusToast={props.statusToast} setStatusToast={props.setStatusToast} setTrucks={props.setTrucks} openViewModal={props.openViewModal} setOpenViewModal={props.setOpenViewModal}/>
                    <DeleteReportModal data={props.data} statusToast={props.statusToast} setStatusToast={props.setStatusToast} setTrucks={props.setTrucks} openDeleteModal={props.openDeleteModal} setOpenDeleteModal={props.setOpenDeleteModal}/>
            </>
        )}
                   
        </div>
    )
}

export default ReportsandConcernsToolbar