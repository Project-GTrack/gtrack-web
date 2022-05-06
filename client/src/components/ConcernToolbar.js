/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import DeleteConcernModal from "./Concerns/modals/DeleteConcernModal"
import ResolveConcernModal from "./Concerns/modals/ResolveConcernModal"
import ViewConcernModal from "./Concerns/modals/ViewConcernModal"

const ConcernToolbar = (props) => {
    return (
        <div>
        {props.data.status? (
                <>
                    <button onClick={()=>props.setOpenResolveModal(true)} className="btn btn-success mx-2"><i className="fa fa-check" aria-hidden="true"></i></button>
                    <button onClick={()=>props.setOpenViewModal(true)} className="btn btn-primary"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                    <button onClick={()=>props.setOpenDeleteModal(true)} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    <ResolveConcernModal data={props.data} openResolveModal={props.openResolveModal} setOpenResolveModal={props.setOpenResolveModal}/>
                    <ViewConcernModal data={props.data} openViewModal={props.openViewModal} setOpenViewModal={props.setOpenViewModal}/>
                    <DeleteConcernModal data={props.data} openDeleteModal={props.openDeleteModal} setOpenDeleteModal={props.setOpenDeleteModal}/>
                </>
            ):(
                <>
                    <button onClick={()=>props.setOpenViewModal(true)} className="btn btn-primary"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                    <button onClick={()=>props.setOpenDeleteModal(true)} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    <ViewConcernModal data={props.data} openViewModal={props.openViewModal} setOpenViewModal={props.setOpenViewModal}/>
                    <DeleteConcernModal data={props.data} openDeleteModal={props.openDeleteModal} setOpenDeleteModal={props.setOpenDeleteModal}/>
                </>
            )}
        </div>
    )
}

export default ConcernToolbar