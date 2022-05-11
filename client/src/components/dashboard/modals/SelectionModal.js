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
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import moment from 'moment';
import { useReactToPrint } from "react-to-print";



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
    const componentRef = React.useRef();
    const [weekRange, setWeekRange] = React.useState({
        startDate:null,
        endDate:null
    });
    React.useEffect(() => {
        setWeekRange({
            startDate:null,
            endDate:null
        });
    },[props.openModal])
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
        Select Date Range
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "50vh" }}>
            <div style={{
                marginLeft: '15%'
            }}>
        <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
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
                    </Grid>
                    {(weekRange.endDate < weekRange.startDate || ((weekRange.startDate !== null && weekRange.endDate !== null) && moment(weekRange.startDate).format("YYYY-MM-DD") === moment(weekRange.endDate).format("YYYY-MM-DD"))) ? (<div>
                                    <p style={{
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: 12
                                    }}>The End Date must be greater than the Start Date</p>
                                </div>):(<></>)}
                                {(props.weekly && (weekRange.startDate !== null && weekRange.endDate !== null) && moment(weekRange.startDate).format("YYYY-MM-DD") > moment(props.weekly[props.weekly.length-1].collection_date).format("YYYY-MM-DD")) ? (<div>
                                    <p style={{
                                        textAlign: 'center',
                                        color: 'red',
                                        fontSize: 12
                                    }}>There are no records found within the given time frame</p>
                                </div>):(<></>)}
            </div>
        </Box>
      </DialogContent>
      <DialogActions>
          {(()=>{
                  var arrTemp = [];  
                  if(weekRange.startDate !== null && weekRange.endDate !== null){
                      if(moment(weekRange.startDate).format("YYYY-MM-DD") <= moment(props.weekly[props.weekly.length-1].collection_date).format("YYYY-MM-DD")){
                          
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
                  return(
                    <>
                        <ReactToPrint 
                        trigger={() => <button className='btn btn-success' type="submit" disabled={(()=>{
                                return weekRange.startDate === null || weekRange.endDate === null || weekRange.startDate > weekRange.endDate || (moment(weekRange.startDate).format("YYYY-MM-DD") === moment(weekRange.endDate).format("YYYY-MM-DD")) || moment(weekRange.startDate).format("YYYY-MM-DD") > moment(props.weekly[props.weekly.length-1].collection_date).format("YYYY-MM-DD");
                        })()}>Select</button>}
                        content={() => componentRef.current}
                        pageStyle = ' @media all {.pagebreak {display: none;}}@media print {.pagebreak {page-break-after: always;}}'
                        documentTitle="GTrack"
                    />
                    <div style={{display: "none"}}>
                            {arrTemp && weekRange.startDate !== null && weekRange.endDate !== null && weekRange.startDate < weekRange.endDate && (moment(weekRange.startDate).format("YYYY-MM-DD") !== moment(weekRange.endDate).format("YYYY-MM-DD")) && moment(weekRange.startDate).format("YYYY-MM-DD") < moment(props.weekly[props.weekly.length-1].collection_date).format("YYYY-MM-DD")  ? (<PdfComponent dashcards={props.dashcards} chartData={arrTemp} ref={componentRef}/>):(<></>)}
                    </div>
                   </>
                  );
          })()}
      
      </DialogActions>
    </BootstrapDialog>
  );
};
export default SelectionModal;