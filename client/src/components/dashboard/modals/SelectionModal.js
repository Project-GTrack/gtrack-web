import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import TextField from '@mui/material/TextField';
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";
import { DateRange } from 'react-date-range';
import { useSchedulesPageContext } from "../../../pages/SchedulesPage";
import * as yup from "yup";
import { useFormik } from "formik";
import InputBase from '@mui/material/InputBase';
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import PdfComponent from '../../helpers/PdfComponent';
import ReactToPrint from 'react-to-print';
import { useSnackbar } from "notistack";
import { Alert, CircularProgress } from '@mui/material'; 
import 'react-date-range/dist/styles.css';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MonthYearPicker from 'react-month-year-picker';
import moment from 'moment';
import { useReactToPrint } from "react-to-print";
import 'react-date-range/dist/theme/default.css'; 


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
            position: "absolute",
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
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
      },
    },
  }));
const SelectionModal = (props) => {
    const [type, setType] = React.useState('All');
    const componentRef = React.useRef();
    const [isFilter, setIsFilter]=React.useState();
    const [weekRange, setWeekRange] = React.useState({
        startDate:null,
        endDate:null
    });
    const [monthRange, setMonthRange]=React.useState({
        startMonth: {
            month: moment().format("MMMM"),
            year: moment().format("YYYY"),
        },
        endMonth: {
            month: moment().add(1,'M').format("MMMM"),
            year: moment().format("YYYY"),
        }
       
      });
    const [yearRange, setYearRange] = React.useState({
        startYear:moment().subtract(1,'Y').format("YYYY"),
        endYear:moment().format("YYYY")
    });
    const year = moment().format("YYYY");
    const years = Array.from(new Array(50),( val, index) => year - index);
    React.useEffect(() => {
        setIsFilter(false);
    },[type])
    React.useEffect(() => {
        setType("All");
        setWeekRange({
            startDate:null,
            endDate:null
        });
        setMonthRange({
            startMonth: {
                month: moment().format("MMMM"),
                year: moment().format("YYYY"),
            },
            endMonth: {
                month: moment().add(1,'M').format("MMMM"),
                year: moment().format("YYYY"),
            }
           
          });
          setYearRange({
            startYear:moment().subtract(1,'Y').format("YYYY"),
            endYear:moment().format("YYYY")
        });
    },[props.openModal])
    React.useEffect(() => {
        setWeekRange({
            startDate:null,
            endDate:null
        });
        setMonthRange({
            startMonth: {
                month: moment().format("MMMM"),
                year: moment().format("YYYY"),
            },
            endMonth: {
                month: moment().add(1,'M').format("MMMM"),
                year: moment().format("YYYY"),
            }
           
          });
          setYearRange({
            startYear:moment().subtract(1,'Y').format("YYYY"),
            endYear:moment().format("YYYY")
        });
    },[isFilter])
    const handleChange = (event) => {
        setType(event.target.value);
    };
    const handleChangeFirstWeek = (event) => {
        var temp = {...weekRange};
        temp.startDate = event;
        setWeekRange(temp);
    };
    const handleChangeSecondWeek = (event) => {
        var temp = {...weekRange};
        temp.endDate = event;
        setWeekRange(temp);
    };
    const handleChangeFirstMonth = (event) => {
       var temp = {...monthRange};
       temp.startMonth.month = event.target.value;
        setMonthRange(temp);
    };
    const handleChangeFirstYear = (event) => {
        var temp = {...monthRange};
        temp.startMonth.year = event.target.value;
         setMonthRange(temp);
    };
    const handleChangeSecondMonth = (event) => {
        var temp = {...monthRange};
        temp.endMonth.month = event.target.value;
         setMonthRange(temp);
     };
     const handleChangeSecondYear = (event) => {
         var temp = {...monthRange};
         temp.endMonth.year = event.target.value;
          setMonthRange(temp);
     };
     const handleChangeFirstStartYear = (event) => {
        var temp = {...yearRange};
        temp.startYear = event.target.value;
        setYearRange(temp);
    };
    const handleChangeSecondEndYear = (event) => {
        var temp = {...yearRange};
        temp.endYear = event.target.value;
        setYearRange(temp);
    };
   const handleFilter = (event) => {
    setIsFilter(event.target.value);
   };
  return (
    <BootstrapDialog
      onClose={props.handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={props.openModal}
      sx={{ width: "100%"}}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleCloseModal}
      >
        Select Report Type
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "50vh" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Report Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Report Type"
                onChange={handleChange}
                >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Weekly"}>Weekly</MenuItem>
                    <MenuItem value={"Monthly"}>Monthly</MenuItem>
                    <MenuItem value={"Yearly"}>Yearly</MenuItem>
                </Select>
            </FormControl>
            <div style={{
                marginLeft: 23,
                marginTop: 10
            }}>
            {(()=>{
                if(type === "All"){
                    console.log("ALL");
                    return(<>
                    <div>
                        <p style={{
                                        textAlign: 'center',
                                        color: 'black',
                                        fontStyle: 'italic',
                                        fontSize: 12
                                    }}><b>Note: </b>This report type will include all the other types (Weekly (for the current month), Monthly (for the current year), and Yearly)</p>
                                </div>
                    </>);
                }else if(type === "Weekly"){
                    return(
                        <>
                    <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                            <h6 style={{
                                marginTop: 5
                            }}>Do you want a filter?</h6>
                        </Grid>
                        <Grid item xs={4}>
                        <FormControl  sx={{ m: 1, minWidth: 120, marginTop: -1 }} size="small">
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={isFilter}
                                onChange={handleFilter}
                                input={<BootstrapInput />}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                        </FormControl>
                        </Grid>
                    </Grid>
                    {isFilter ? ( <><Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={1}>
                            <p style={{
                                marginLeft: -20,
                                marginTop: 15
                            }}>From </p>
                        </Grid>
                        <Grid item xs={11}>
                        <DesktopDatePicker
                            label="Start Date"
                            inputFormat="MM/DD/YYYY"
                            value={weekRange.startDate}
                            onChange={(e)=>handleChangeFirstWeek(e)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={1}>
                                <p style={{
                                    marginLeft: -10,
                                    marginTop: 15
                                }}>To </p>
                        </Grid>
                        <Grid item xs={11}>
                        <DesktopDatePicker
                            label="End Date"
                            inputFormat="MM/DD/YYYY"
                            value={weekRange.endDate !== null ? weekRange.endDate:null}
                            onChange={(e)=>handleChangeSecondWeek(e)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </Grid>
                    </Grid></>):(<><div>
                        <p style={{
                                        textAlign: 'center',
                                        color: 'black',
                                        fontStyle: 'italic',
                                        fontSize: 12
                                    }}><b>Note:</b> If not filtered, the default data will be only within for the current month</p>
                                </div></>)}
                    {isFilter && (weekRange.endDate < weekRange.startDate || ((weekRange.startDate !== null && weekRange.endDate !== null) && moment(weekRange.startDate).format("YYYY-MM-DD") === moment(weekRange.endDate).format("YYYY-MM-DD"))) ? (<div>
                                    <p style={{
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: 12
                                    }}>The End Date must be greater than the Start Date</p>
                                </div>):(<></>)}
                                {isFilter && (props.weekly && (weekRange.startDate !== null && weekRange.endDate !== null) && moment(weekRange.startDate).format("YYYY-MM-DD") > moment(props.weekly[props.weekly.length-1].collection_date).format("YYYY-MM-DD")) ? (<div>
                                    <p style={{
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: 12
                                    }}>There are no records found within the given time frame</p>
                                </div>):(<></>)}
                    
                    </>
                    );
                }else if(type === "Monthly"){
                    return (
                    <>
                    <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                            <h6 style={{
                                marginTop: 5
                            }}>Do you want a filter?</h6>
                        </Grid>
                        <Grid item xs={4}>
                        <FormControl  sx={{ m: 1, minWidth: 120, marginTop: -1 }} size="small">
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={isFilter}
                                onChange={handleFilter}
                                input={<BootstrapInput />}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                        </FormControl>
                        </Grid>
                    </Grid>
                    {isFilter ? (<> <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={1}>
                            <p style={{
                                marginLeft: -20,
                                marginTop: 15
                            }}>From </p>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Start Month</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={monthRange.startMonth.month}
                                label="Start Month"
                                onChange={handleChangeFirstMonth}
                                >
                                    <MenuItem value={"January"}>January</MenuItem>
                                    <MenuItem value={"February"}>February</MenuItem>
                                    <MenuItem value={"March"}>March</MenuItem>
                                    <MenuItem value={"April"}>April</MenuItem>
                                    <MenuItem value={"May"}>May</MenuItem>
                                    <MenuItem value={"June"}>June</MenuItem>
                                    <MenuItem value={"July"}>July</MenuItem>
                                    <MenuItem value={"August"}>August</MenuItem>
                                    <MenuItem value={"September"}>September</MenuItem>
                                    <MenuItem value={"October"}>October</MenuItem>
                                    <MenuItem value={"November"}>November</MenuItem>
                                    <MenuItem value={"December"}>December</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={monthRange.startMonth.year}
                                label="Year"
                                onChange={handleChangeFirstYear}
                                >
                                    {years && years.map((data,i) => {
                                        return <MenuItem key={`data${i}`} value={data}>{data}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={1}>
                                <p style={{
                                    marginLeft: -10,
                                    marginTop: 15
                                }}>To </p>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">End Month</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={monthRange.endMonth.month}
                                label="End Month"
                                onChange={handleChangeSecondMonth}
                                >
                                    <MenuItem value={"January"}>January</MenuItem>
                                    <MenuItem value={"February"}>February</MenuItem>
                                    <MenuItem value={"March"}>March</MenuItem>
                                    <MenuItem value={"April"}>April</MenuItem>
                                    <MenuItem value={"May"}>May</MenuItem>
                                    <MenuItem value={"June"}>June</MenuItem>
                                    <MenuItem value={"July"}>July</MenuItem>
                                    <MenuItem value={"August"}>August</MenuItem>
                                    <MenuItem value={"September"}>September</MenuItem>
                                    <MenuItem value={"October"}>October</MenuItem>
                                    <MenuItem value={"November"}>November</MenuItem>
                                    <MenuItem value={"December"}>December</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={monthRange.endMonth.year}
                                label="Year"
                                onChange={handleChangeSecondYear}
                                >
                                    {years && years.map((data,i) => {
                                        return <MenuItem key={`data${i}`} value={data}>{data}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid></>):(<><div>
                        <p style={{
                                        textAlign: 'center',
                                        color: 'black',
                                        fontStyle: 'italic',
                                        fontSize: 12
                                    }}><b>Note:</b> If not filtered, the default data will be only within for the current year</p>
                                </div></>)}
                    {isFilter && (moment(`${monthRange.endMonth.year}-${monthRange.endMonth.month}-01`).format("YYYY-MM-DD") < moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD") || moment(`${monthRange.endMonth.year}-${monthRange.endMonth.month}-01`).format("YYYY-MM-DD") === moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD")) ? (<div>
                                    <p style={{
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: 12
                                    }}>The End Month must be greater than the Start Month</p>
                                </div>):(<></>)}
                    {isFilter && (props.monthly && moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD") > moment(`${props.monthly[props.monthly.length-1].year}-${props.monthly[props.monthly.length-1].month}-01`).format("YYYY-MM-DD")) ? (<div>
                                    <p style={{
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: 12
                                    }}>There are no records found within the given time frame</p>
                                </div>):(<></>)}
                    
                    </>
                    );
                }else{
                    return (
                        <>
                        <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid item xs={6}>
                            <h6 style={{
                                marginTop: 5
                            }}>Do you want a filter?</h6>
                        </Grid>
                        <Grid item xs={4}>
                        <FormControl  sx={{ m: 1, minWidth: 120, marginTop: -1 }} size="small">
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={isFilter}
                                onChange={handleFilter}
                                input={<BootstrapInput />}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                        </FormControl>
                        </Grid>
                    </Grid>
                    {isFilter ? (<> <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={1}>
                                <p style={{
                                    marginLeft: -20,
                                    marginTop: 15
                                }}>From </p>
                            </Grid>
                            <Grid item xs={11}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Start Year</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={yearRange.startYear}
                                    label="Start Year"
                                    onChange={handleChangeFirstStartYear}
                                    >
                                        {years && years.map((data,i) => {
                                            return <MenuItem key={`data${i}`} value={data}>{data}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                </Grid>
                        </Grid>
                        <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid item xs={1}>
                                    <p style={{
                                        marginLeft: -10,
                                        marginTop: 15
                                    }}>To </p>
                            </Grid>
                            <Grid item xs={11}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">End Year</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={yearRange.endYear}
                                    label="End Year"
                                    onChange={handleChangeSecondEndYear}
                                    >
                                        {years && years.map((data,i) => {
                                            return <MenuItem key={`data${i}`} value={data}>{data}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                </Grid>
                        </Grid></>):(<></>)}
                        {isFilter && (yearRange.endYear <= yearRange.startYear) ? (<div>
                                    <p style={{
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: 12
                                    }}>The End Year must be greater than the Start Year</p>
                                </div>):(<></>)}
                        {isFilter && (props.yearly && (yearRange.startYear < props.yearly[0].year && yearRange.endYear < props.yearly[0].year)) ? (<div>
                                    <p style={{
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: 12
                                    }}>There are no records found within the given time frame</p>
                                </div>):(<></>)}
                        </>
                        );
                }
            })()}
            </div>
        </Box>
      </DialogContent>
      <DialogActions>
          {(()=>{
              if(type === "All"){
                  return(
                    <>
                    <ReactToPrint 
                        trigger={() => <button className='btn btn-success' type="submit">Select</button>}
                        content={() => componentRef.current}
                        pageStyle = ' @media all {.pagebreak {display: none;}}@media print {.pagebreak {page-break-after: always;}}'
                        documentTitle="GTrack"
                    /> 
                    <div style={{display: "none"}}>
                        {props.chartData && props.dashcards && props.monthData && props.yearData ? <PdfComponent type={type} dashcards={props.dashcards} chartData={props.chartData} monthData={props.monthData} yearData={props.yearData} ref={componentRef}/>:<></>}
                    </div>
                   </>
                  )
              }else if(type === "Weekly"){
                  var arrTemp = [];
                  if(isFilter){     
                      if(moment(weekRange.startDate).format("YYYY-MM-DD") <= moment(props.weekly[props.weekly.length-1].collection_date).format("YYYY-MM-DD")){
                          if(weekRange.startDate !== null && weekRange.endDate !== null){
                              if(weekRange.startDate < weekRange.endDate){
                                var startWeek = weekRange.startDate;
                                var endWeek = weekRange.endDate;
                                var sum = 0;
                                for(;moment(startWeek).format("YYYY-MM-DD") < moment(endWeek).format("YYYY-MM-DD");startWeek=(moment(startWeek).add(7,'days').format("YYYY-MM-DD") > moment(endWeek).format("YYYY-MM-DD")) ? moment(startWeek).add(moment(endWeek).diff(moment(startWeek), 'days'),'days'):moment(startWeek).add(7,'days'),sum=0){
                                    for(var x = 0;x < props.weekly.length;x++){
                                        if(moment(props.weekly[x].collection_date).format("YYYY-MM-DD") <= moment(startWeek).add(6,'days').format("YYYY-MM-DD") && moment(props.weekly[x].collection_date).format("YYYY-MM-DD") >= moment(startWeek).format("YYYY-MM-DD")){
                                            sum+=props.weekly[x].collection_weight_volume;
                                        }
                                    }
                                    var weekTemp;
                                    if(moment(startWeek).add(6,'days').format("YYYY-MM-DD") > moment(endWeek).format("YYYY-MM-DD")){
                                        weekTemp = moment(startWeek).add(moment(endWeek).diff(moment(startWeek), 'days'),'days').format("YYYY-MM-DD");
                                    }else{
                                        weekTemp = moment(startWeek).add(6,'days').format("YYYY-MM-DD");
                                    }
                                    var temp = {
                                        week:moment(startWeek).format("YYYY-MM-DD")+"&"+weekTemp,
                                        weight:sum,
                                    }
                                    
                                    arrTemp.push(temp);
                                }
                              }
                            
                        }
                      }
                    
                  }else{
                    arrTemp = props.chartData;
                  }
                  return(
                    <>
                        <ReactToPrint 
                        trigger={() => <button className='btn btn-success' type="submit" disabled={(()=>{
                            if(isFilter){
                                return weekRange.startDate === null || weekRange.endDate === null || weekRange.startDate > weekRange.endDate || (moment(weekRange.startDate).format("YYYY-MM-DD") === moment(weekRange.endDate).format("YYYY-MM-DD")) || moment(weekRange.startDate).format("YYYY-MM-DD") > moment(props.weekly[props.weekly.length-1].collection_date).format("YYYY-MM-DD");
                            }else{
                                return false
                            }
                        })()}>Select</button>}
                        content={() => componentRef.current}
                        pageStyle = ' @media all {.pagebreak {display: none;}}@media print {.pagebreak {page-break-after: always;}}'
                        documentTitle="GTrack"
                    />
                    <div style={{display: "none"}}>
                        {isFilter ? (
                            arrTemp && weekRange.startDate !== null && weekRange.endDate !== null && weekRange.startDate < weekRange.endDate && (moment(weekRange.startDate).format("YYYY-MM-DD") !== moment(weekRange.endDate).format("YYYY-MM-DD")) && moment(weekRange.startDate).format("YYYY-MM-DD") < moment(props.weekly[props.weekly.length-1].collection_date).format("YYYY-MM-DD")  ? (<PdfComponent isFilter={isFilter} type={type} dashcards={props.dashcards} chartData={arrTemp} ref={componentRef}/>):(<></>)
                        ):(arrTemp ? <PdfComponent isFilter={isFilter} type={type} dashcards={props.dashcards} chartData={arrTemp} ref={componentRef}/>:<></>)}
                    </div>
                   </>
                  );
              }else if(type === "Monthly"){
                  var arrTemp=[];
                  if(isFilter){
                    if(moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD") <= moment(`${props.monthly[props.monthly.length-1].year}-${props.monthly[props.monthly.length-1].month}-01`).format("YYYY-MM-DD")){
                        if(moment(`${monthRange.endMonth.year}-${monthRange.endMonth.month}-01`).format("YYYY-MM-DD") > moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD")){
                            var startDate = moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD");
                            var endDate = moment(`${monthRange.endMonth.year}-${monthRange.endMonth.month}-01`).format("YYYY-MM-DD");
                            var sum = 0;
                            var sumEnd = 0;
                            var propDate;
                            var temp;
                            var tempEnd;
                            var x;
                            for(;startDate < endDate;startDate=(moment(startDate).add(1,'M').format("YYYY-MM-DD") > endDate) ? moment(endDate).format("YYYY-MM-DD"):moment(startDate).add(1,'M').format("YYYY-MM-DD")){
                                for(x = 0;x < props.monthly.length;x++){
                                    propDate = moment(`${props.monthly[x].year}-${props.monthly[x].month}-01`).format("YYYY-MM-DD");
                                    
                                    if(moment(startDate).format("YYYY-MM-DD") === moment(propDate).format("YYYY-MM-DD")){
                                        sum=props.monthly[x].weight;
                                    }
                                    if(moment(startDate).add(1,'M').format("YYYY-MM-DD") === endDate){
                                        if(endDate === propDate){
                                            sumEnd=props.monthly[x].weight;
                                        }
                                        tempEnd = {
                                            month:moment(endDate).format("MMMM"),
                                            year:moment(endDate).format("YYYY"),
                                            weight:sumEnd
                                        }
                                    }
                                }
                              
                                temp = {
                                    month:moment(startDate).format("MMMM"),
                                    year:moment(startDate).format("YYYY"),
                                    weight:sum
                                }
                                arrTemp.push(temp);
                                if(moment(startDate).add(1,'M').format("YYYY-MM-DD") === endDate){
                                    arrTemp.push(tempEnd);
                                }
                                sum=0;
                              
                            }
                        }
                    }
                  }else{
                      arrTemp = props.monthData;
                  }
                  return(
                    <>
                        <ReactToPrint 
                        trigger={() => <button className='btn btn-success' type="submit" disabled={(()=>{
                            if(isFilter){
                                return moment(`${monthRange.endMonth.year}-${monthRange.endMonth.month}-01`).format("YYYY-MM-DD") < moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD") || moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD") > moment(`${props.monthly[props.monthly.length-1].year}-${props.monthly[props.monthly.length-1].month}-01`).format("YYYY-MM-DD") || moment(`${monthRange.endMonth.year}-${monthRange.endMonth.month}-01`).format("YYYY-MM-DD") === moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD");
                            }else{
                                return false
                            }
                        })()}>Select</button>}
                        content={() => componentRef.current}
                        pageStyle = ' @media all {.pagebreak {display: none;}}@media print {.pagebreak {page-break-after: always;}}'
                        documentTitle="GTrack"
                    />
                    <div style={{display: "none"}}>
                        {isFilter ? (
                            arrTemp && moment(`${monthRange.endMonth.year}-${monthRange.endMonth.month}-01`).format("YYYY-MM-DD") > moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD") && moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD") <= moment(`${props.monthly[props.monthly.length-1].year}-${props.monthly[props.monthly.length-1].month}-01`).format("YYYY-MM-DD") && moment(`${monthRange.endMonth.year}-${monthRange.endMonth.month}-01`).format("YYYY-MM-DD") !== moment(`${monthRange.startMonth.year}-${monthRange.startMonth.month}-01`).format("YYYY-MM-DD") ? <PdfComponent isFilter={isFilter} type={type} dashcards={props.dashcards} monthData={arrTemp} ref={componentRef}/>:<></>
                        ):(arrTemp ? <PdfComponent isFilter={isFilter} type={type} dashcards={props.dashcards} monthData={arrTemp} ref={componentRef}/>:<></>)}
                        
                    </div>
                   </>
                  );
              }else{
                let arrTemp = [];
                if(isFilter){
                    if(yearRange.endYear > yearRange.startYear){
                        var startYear = yearRange.startYear.toString();
                        var endYear = yearRange.endYear.toString();
                        var sum=0;
                        var sumEnd=0;
                        var tempEnd;
                        var x;
                        for(;startYear < endYear;startYear=(moment(startYear).add(1,'Y').format("YYYY").toString() > endYear) ? endYear:moment(startYear).add(1,'Y').format("YYYY").toString()){
                            for(x = 0;x < props.yearly.length;x++){
                                if(moment(startYear).format("YYYY") === moment(props.yearly[x].year).format("YYYY")){
                                    sum=props.yearly[x].weight;
                                }
                                if(moment(startYear).add(1,'Y').format("YYYY") === endYear){
                                    if(moment(endYear).format("YYYY") === props.yearly[x].year.toString()){
                                        sumEnd=props.yearly[x].weight;
                                    }
                                    tempEnd = {
                                        year:endYear,
                                        weight:sumEnd
                                    }
                                }
                            }
                            var temp = {
                                year:startYear,
                                weight:sum
                            }
                            arrTemp.push(temp);
                            if(moment(startYear).add(1,'Y').format("YYYY") === endYear){
                                arrTemp.push(tempEnd);
                            }
                        }
                    }
                }else{
                    arrTemp = props.yearData;
                }
                return(
                    <>
                        <ReactToPrint 
                        trigger={() => <button className='btn btn-success' type="submit" disabled={(()=>{
                            if(isFilter){
                                return yearRange.endYear <= yearRange.startYear || yearRange.startYear < props.yearly[0].year && yearRange.endYear < props.yearly[0].year;
                            }else{
                                return false
                            }
                        })()}>Select</button>}
                        content={() => componentRef.current}
                        pageStyle = ' @media all {.pagebreak {display: none;}}@media print {.pagebreak {page-break-after: always;}}'
                        documentTitle="GTrack"
                    />
                    <div style={{display: "none"}}>
                        {arrTemp ? <PdfComponent type={type} dashcards={props.dashcards} yearData={arrTemp} ref={componentRef}/>:<></>}
                    </div>
                   </>
                  );
                
              }
          })()}
      
      </DialogActions>
    </BootstrapDialog>
  );
};
export default SelectionModal;