import React,{useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from 'formik';
import axios from "axios";
import * as yup from 'yup';
import moment from 'moment';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { decodeToken } from "react-jwt";
import Cookies from 'js-cookie';
import { capitalizeWords } from '../helpers/TextFormat';
import { useSchedulesPageContext } from '../../pages/SchedulesPage';

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
  
const AddScheduleModal = (props) => {
    const {queryResult,refetch}=useSchedulesPageContext();
    const driversAssignments={
        drivers:queryResult.data.data.drivers,
        assignments:queryResult.data.data.assignments
    }
    const [schedule,setSchedule]=useState([{
        schedule:"Monday",
        time_start:new Date(moment()),
        time_end:new Date(moment())
    }]);
    const addScheduleValidationSchema = yup.object().shape({
        type: yup
        .string()
        .required('Schedule Type is required'),
        schedule: yup
        .array()
        .required('Schedule is required'),
        driver_id: yup
        .number()
        .required('Driver is required'),
        assignment_id: yup
        .number()
        .required('Truck Assignment is required'),
        garbage_type: yup
        .string()
        .required('Garbage Type is required'),
        landmark: yup
        .string()
        .required('Landmark is required'),
        purok: yup
        .string()
        .required('Purok is required'),
        street: yup
        .string()
        .required('Street is required'),
        barangay: yup
        .string()
        .required('Barangay is required'),
    })
    const [user,setUser]=useState(null);
    const [error,setError]=useState(null);
    const handleFormSubmit = async(values,{resetForm}) =>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/schedule/add`,{
            admin_id:user.user_id,
            driver_id:values.driver_id,
            assignment_id:values.assignment_id,
            schedule:JSON.stringify({type:values.type,when:values.schedule}),
            garbage_type:values.garbage_type,
            landmark:capitalizeWords(values.landmark), 
            purok:capitalizeWords(values.purok),
            street:capitalizeWords(values.street),
            barangay:capitalizeWords(values.barangay),
            town:"Compostela",
            postal_code:"6003",
        })
        .then(res=>{
            if(res.data.success){
                refetch();
                props.setOpenAddModal(false);
                resetForm();
                props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"success"})
            }else{
                setError(res.data.message);
            }
        })
    }
    const getCookiesJWT=()=>{
        const cookie=Cookies.get("user_id");
        if(cookie){
            const decodedToken = decodeToken(cookie);
            setUser(JSON.parse(decodedToken.user_id));
        }
    }
    useEffect(() => {
        getCookiesJWT();
        return ()=>{
            setSchedule([{
                schedule:"Monday",
                time_start:new Date(moment()),
                time_end:new Date(moment())
            }]);
        }
    }, [])
    const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched, setFieldValue } = useFormik({
        initialValues:{ 
            type: 'weekly',
            schedule:schedule, 
            garbage_type:"",
            landmark:"", 
            purok:"",
            street:"",
            barangay:"",
            driver_id:'',
            assignment_id:''
        },
        enableReinitialize:true,
        validationSchema:addScheduleValidationSchema,
        onSubmit: handleFormSubmit
    });
    const handleChangeWhenWeekly = (e,index) =>{
        let temp=[];
        temp=schedule;
        temp[index].schedule=e.target.value;
        setSchedule(temp);
        setFieldValue('schedule',temp);
    }
    const handleChangeWhenDate = (e,index) =>{
        let temp=[];
        temp=schedule;
        temp[index].schedule=e;
        setSchedule(temp);
        setFieldValue('schedule',temp);
    }
    const handleChangeStartTime = (e,index) =>{
        let temp=[];
        temp=schedule;
        temp[index].time_start=e;
        setSchedule(temp);
        setFieldValue('schedule',temp);
    }
    const handleChangeEndTime = (e,index) =>{
        let temp=[];
        temp=schedule;
        temp[index].time_end=e;
        setSchedule(temp);
        setFieldValue('schedule',temp);
    }
    const handleAddSchedule=(e)=>{
        e.preventDefault();
        let temp=[];
        temp=schedule;
        if(values.type==="weekly"){
            temp.push({
                schedule:"Monday",
                    time_start:new Date(moment()),
                    time_end:new Date(moment())
            });
        }else{
            temp.push({
                schedule:new Date(moment()),
                    time_start:new Date(moment()),
                    time_end:new Date(moment())
            });
        }
        setSchedule(temp);
        setFieldValue('schedule',temp);
    }
    const handleRemoveSchedule=(index)=>{
        let temp=[];
        temp=schedule;
        temp.splice(index,1);
        setSchedule(temp);
        setFieldValue('schedule',temp);
    }
    const handleChangeType=async (e)=>{
        e.preventDefault();
        let temp=[];
        if(e.target.value==="weekly"){
            temp=[{
                schedule:"Monday",
                time_start:new Date(moment()),
                time_end:new Date(moment())
            }]
        }else{
            temp=[{
                schedule:new Date(moment()),
                time_start:new Date(moment()),
                time_end:new Date(moment())
            }]
        }
        await setSchedule([...temp]);
        setFieldValue('schedule',[...temp]);
        setFieldValue('type',e.target.value);
    }
  return (
    <BootstrapDialog
        onClose={()=>props.setOpenAddModal(false)}
        aria-labelledby="customized-dialog-title"
        open={props.openAddModal}
    >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>props.setOpenAddModal(false)}>
      Add New Schedule
    </BootstrapDialogTitle>
    <DialogContent dividers>
    <Box sx={{ width: '100%' }}>
    {error && <p className="text-danger small text-center">{error}</p>}
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={11}>
            <FormControl sx={{ width:'100%' }}>
                <InputLabel htmlFor="type">Type</InputLabel>
                <Select
                    value={values.type}
                    onChange={handleChangeType}
                    onBlur={handleBlur('type')}
                    label="Type"
                    inputProps={{
                        name: 'type',
                        id: 'type',
                    }}
                >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="specific">Specific Dates</MenuItem>
                </Select>
            </FormControl>
            {(errors.type && touched.type) &&
                <p className="text-danger small">{errors.type}</p>
            }
        </Grid>
        <Grid item xs={1}>
            <button className='btn btn-primary mt-2' onClick={(e)=>handleAddSchedule(e)}>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        </Grid>
    </Grid>
    {schedule.map((item,i)=>{
        return (
            <Grid key={i} container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                <Grid item xs={5}>
                    {values.type==='weekly'?(
                        <FormControl sx={{ width:'100%' }}>
                            <InputLabel htmlFor="Schedule">Schedule</InputLabel>
                            <Select
                                value={item.schedule===""? "Monday":item.schedule}
                                onChange={(e)=>handleChangeWhenWeekly(e,i)}
                                label="Schedule"
                                inputProps={{
                                    name: 'schedule',
                                    id: 'schedule',
                                }}
                            >
                                <MenuItem value="Monday">Monday</MenuItem>
                                <MenuItem value="Tuesday">Tuesday</MenuItem>
                                <MenuItem value="Wednesday">Wednesday</MenuItem>
                                <MenuItem value="Thursday">Thursday</MenuItem>
                                <MenuItem value="Friday">Friday</MenuItem>
                                <MenuItem value="Saturday">Saturday</MenuItem>
                            </Select>
                        </FormControl>
                    ):(
                        <DesktopDatePicker
                            label="Date"
                            inputFormat="MM/DD/YYYY"
                            value={item.schedule===""? new Date(moment()):item.schedule}
                            onChange={(e)=>handleChangeWhenDate(e,i)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    )}
                </Grid>
                <Grid item xs={3}>
                    <TimePicker
                        label="Start Time"
                        value={item.time_start}
                        onChange={(e)=>handleChangeStartTime(e,i)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TimePicker
                        label="End Time"
                        value={item.time_end}
                        onChange={(e)=>handleChangeEndTime(e,i)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={1}>
                    <button onClick={()=>handleRemoveSchedule(i)} className='btn btn-danger mt-2'>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </Grid>
            </Grid>
        );
    })}
        <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={6}>
                    <FormControl sx={{ width:'100%' }}>
                        <InputLabel htmlFor="truck assignment">Truck Assignment</InputLabel>
                        <Select
                            value={values.assignment_id}
                            onChange={handleChange("assignment_id")}
                            label="truck assignment"
                        >
                            {driversAssignments && driversAssignments.assignments.map((item,i)=>{
                                return (
                                    <MenuItem key={i} value={item.assignment_id}>{item.truckAssignmentTruck.plate_no + " " +item.truckAssignmentTruck.model + " - " +item.truckAssignmentDriver.fname + " " +item.truckAssignmentDriver.lname}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    {(errors.assignment_id && touched.assignment_id) &&
                        <p className="text-danger small">{errors.assignment_id}</p>
                    }
            </Grid>
            <Grid item xs={6}>
                    <FormControl sx={{ width:'100%' }}>
                        <InputLabel htmlFor="driver">Driver</InputLabel>
                        <Select
                            value={values.driver_id}
                            onChange={handleChange("driver_id")}
                            label="driver"
                        >
                            {driversAssignments && driversAssignments.drivers.map((item,i)=>{
                                return (
                                    <MenuItem key={i} value={item.user_id}>{item.fname+" "+item.lname}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    {(errors.assignment_id && touched.assignment_id) &&
                        <p className="text-danger small">{errors.assignment_id}</p>
                    }
            </Grid>
        </Grid>
        <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={12}>
            <FormControl sx={{ width:'100%' }}>
                <InputLabel htmlFor="Garbage Type">Garbage Type</InputLabel>
                <Select
                    value={values.garbage_type}
                    onChange={handleChange('garbage_type')}
                    onBlur={handleBlur('garbage_type')}
                    label="Garbage Type"
                    inputProps={{
                    name: 'garbage_type',
                    id: 'garbage_type',
                    }}
                >
                    <MenuItem value="Biodegradable">Biodegradable</MenuItem>
                    <MenuItem value="Non-biodegradable">Non-Biodegradable</MenuItem>
                    <MenuItem value="Residual">Residual</MenuItem>
                </Select>
            </FormControl>
            {(errors.garbage_type && touched.garbage_type) &&
                <p className="text-danger small">{errors.garbage_type}</p>
            }
            </Grid>
        </Grid>
        <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={12}>
                <TextField
                    sx={{ width:'100%' }}
                    value={values.landmark}
                    onChange={handleChange('landmark')}
                    onBlur={handleBlur('landmark')}
                    inputProps={{ style: { textTransform: "capitalize" } }}
                    label="Landmark"
                    type="text"
                />
                {(errors.landmark && touched.landmark) &&
                    <p className="text-danger small ">{errors.landmark}</p>
                }
            </Grid>
        </Grid>
        <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={4}>
                <TextField
                value={values.purok}
                onChange={handleChange('purok')}
                onBlur={handleBlur('purok')}
                inputProps={{ style: { textTransform: "capitalize" } }}
                label="Purok"
                type="text"
                />
                {(errors.purok && touched.purok) &&
                <p className="text-danger small ">{errors.purok}</p>
                }
            </Grid>
            <Grid item xs={4}>
                <TextField
                value={values.street}
                onChange={handleChange('street')}
                onBlur={handleBlur('street')}
                inputProps={{ style: { textTransform: "capitalize" } }}
                label="Street"
                type="text"
                />
                {(errors.street && touched.street) &&
                <p className="text-danger small ">{errors.street}</p>
                }
            </Grid>
            <Grid item xs={4}>
                <TextField
                value={values.barangay}
                onChange={handleChange('barangay')}
                onBlur={handleBlur('barangay')}
                inputProps={{ style: { textTransform: "capitalize" } }}
                label="Barangay"
                type="text"
                />
                {(errors.barangay && touched.barangay) &&
                <p className="text-danger small ">{errors.barangay}</p>
                }
            </Grid>
        </Grid>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button type="submit"  className='text-dark' disabled={!isValid} onClick={handleSubmit}>
        Add Schedule
      </Button>
    </DialogActions>
  </BootstrapDialog>
  );
}

export default AddScheduleModal;