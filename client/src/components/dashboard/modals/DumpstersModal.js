import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import moment from 'moment';
import MUIDataTable from "mui-datatables";
import {FormLabel,FormGroup, TextField} from '@material-ui/core';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
export default function DumpsterModal(props) {
  // const columns = ["Purok", "Street","Barangay","Date Added"];
  const columns = [
    {
      name:"Purok",
      options:{
        filter:true,
        filterType:'dropdown'
      }
    },
    {
      name:"Street",
      options:{
        filter:true,
        filterType:'dropdown'
      }
    },
    {
      name:"Barangay",
      options:{
        filter:true,
        filterType:'dropdown'
      }
    },
    {
      name:"Date Added",
      options: {
        filter: true,
        sort: true,
        sortDirection: 'desc',
        filterType: 'custom',
        customFilterListRender: v => {
          if (v[0] && v[1]) {
            return `Start Date: ${moment(v[0]).format("LL")}, End Date: ${moment(v[1]).format("LL")}`;
          } else if (v[0]) {
            return `Start Date: ${moment(v[0]).format("LL")}`; 
          } else if (v[1]) {
            return `End Date: ${moment(v[1]).format("LL")}`;
          }
          return false;
        },
        filterOptions: {
        
          logic(date, filters) {
         
            var check = new Date(date);
            var from = new Date(filters[0]);
            var to = new Date(filters[1]);
      
            from.setDate(from.getDate() -1);
            to.setDate(to.getDate());
            from = new Date(from).setHours(0,0,0,0);
            to = new Date(to).setHours(23,59,59,59);

            if(filters[0] && filters[1] && check >= to && check <= from) {
              return true;
            } else if (filters[0] && check >= to) {
              return true;
            } else if (filters[1] && check <= from) {
              return true;
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Date</FormLabel>
              <FormGroup row>
                <TextField
                  id="startDate"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={filterList[index][0] || ''}
                  onChange={event => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: '45%', marginRight: '10px' }}
                />
                <TextField
                  id="endDate"
                  label="End Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={filterList[index][1] || ''}
                  onChange={event => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: '45%', marginRight: '10px' }}
                />
              </FormGroup>
            </div>
          ),
        },
        print: false,
      },
    }
  ];
  const [data,setData] = useState([]);
  const options = {
    selectableRowsHeader: false,
    selectableRows:"none",
    filter: true,
    filterType: 'dropdown'
  };
  useEffect(() => {
    var temp=[];
    // eslint-disable-next-line array-callback-return
    props.data && props.data.map((dumpster)=>{
      temp.push([dumpster&& dumpster.purok, 
                  dumpster&&dumpster.street,
                  dumpster&&dumpster.barangay,
                  moment(dumpster.createdAt).format("LL")]);
    })
    setData(temp);
}, [props.data])
  return (
    <BootstrapDialog
    onClose={props.handleCloseModal}
    aria-labelledby="customized-dialog-title"
    open={props.openModal}
    >
    <MUIDataTable
      title={"Dumpster List"}
      data={data}
      columns={columns}
      options={options}
    />
  </BootstrapDialog>
  );
}