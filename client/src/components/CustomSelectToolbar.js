/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
const CustomSelectToolbar = ({selectedRows,displayData}) => {
    const handleClick = () => {
      }
    return (
          <div>
              <button onClick={handleClick} className="btn btn-warning "><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
              <button onClick={handleClick} className="btn btn-danger mx-2"><i className="fa fa-trash" aria-hidden="true"></i></button>
          </div>
    )
}

export default CustomSelectToolbar
