import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import moment from 'moment';
import MUIDataTable from "mui-datatables";
import {FormControl, InputLabel, Select,
        MenuItem,Checkbox, ListItemText,FormLabel,
        FormGroup, TextField} from '@material-ui/core';

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
  
export default function DriversModal(props) {
  //const columns = ["Name", "Email","Contact Number","Address", "Date Added"];
  const columns = [
    {
      name:"Name",
      options:{
        filter:true,
        filterType:'dropdown'
      }
    },
    {
      name:"Email",
      options:{
        filter:true,
        filterType:'dropdown'
      }
    },
    {
      name:"Contact Number",
      options:{
        filter:true,
      },
      filterType:'dropdown'
    },
    {
      name:"Address",
      options:{
        filter:true,
        display: 'true',
        filterType: 'custom',
        customFilterListOptions: {
          update: (filterList, filterPos, index) => {
            console.log('update');
            console.log(filterList, filterPos, index);
            filterList[index].splice(filterPos, 1);
            return filterList;
          }
        },
        filterOptions:{
          logic: (address, filters, row) => {
            console.log(address);
            let filtered = address.split(', ');
           
            if (filters.length) return !filters.includes(filtered[2])
           
          
         
            return false;
          },
          display: (filterList, onChange, index, column) => {
            const optionValues = ['Bagalnga', 'Basak', 'Bulang','Cabadiangan','Cambayog',
                                  'Canamucan','Cogon','Dapdap','Estaca','Lupa','Magay',
                                  'Mulao','Panangban','Poblacion','Taga-ube','Tamiao','Tubigan'];
            return (
              <FormControl>
                <InputLabel htmlFor='select-multiple-chip'>
                  Barangay
                </InputLabel>
                <Select
                  multiple
                  value={filterList[index]}
                  renderValue={selected => selected.join(', ')}
                  onChange={event => {
                    filterList[index] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                >
                  {optionValues.map(item => (
                    <MenuItem key={item} value={item}>
                      <Checkbox
                        color='primary'
                        checked={filterList[index].indexOf(item) > -1}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
        }
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
                  style={{ width: '45%', marginRight: '5%' }}
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
                  style={{ width: '45%', marginRight: '5%' }}
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
    props.data && props.data.map((driver)=>{
      temp.push([`${driver&&driver.fname} ${driver&&driver.lname}`, 
                  driver&&driver.email,
                  driver&&driver.contact_no,
                  // eslint-disable-next-line no-useless-concat
                  `${driver&&driver.street?driver.street:' '}, ${driver.purok?driver.purok:' '}, ${driver.barangay?driver.barangay:' '}`,
                  moment(driver.createdAt).format("LL")]);
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
      title={"Driver List"}
      data={data}
      columns={columns}
      options={options}
    />
  </BootstrapDialog>
  );
}