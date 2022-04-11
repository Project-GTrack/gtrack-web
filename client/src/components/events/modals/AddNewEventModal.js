import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import * as yup from 'yup'
import UploadImage from '../../helpers/UploadImage';
import Axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords } from '../../helpers/TextFormat';
import {useEventPageContext} from '../../../pages/EventsPage'; 
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material'; 
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
  
export default function AddNewEventModal(props) {
  const { enqueueSnackbar} = useSnackbar();
  const {refetch}=useEventPageContext();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
  ];
  const eventValidationSchema = yup.object().shape({
    event_name: yup
      .string()
      .required('Event name is required'),
    description: yup
      .string()
      .required('Description is required'),
    startDate: yup
      .date()
      .required('Start Date is required'),
    endDate: yup
      .date()
      .min(
        yup.ref('startDate'),
        "End Date can't be before Start Date"
      )
      .required('End Date is required'),
    street: yup
      .string()
      .required('Street is required'),
    purok: yup
      .string()
      .required('Purok is required'),
    barangay: yup
      .string()
      .required('Barangay is required'),
    town: yup
      .string()
      .required('Town is required'),
    postal_code: yup
      .string()
      .required('Postal code is required'),
    participants: yup
        .string()
        .required('Participants is required'),
    registration_form_url: yup
        .string()
        .required('Link is required'),
    image: yup
        .mixed()
        .nullable()
        .notRequired()
        .test("FILE_SIZE", "Uploaded file is too big.", 
            value => !value || (value && value.size <= FILE_SIZE))
        .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
            value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
  })
  const handleFormSubmit = async(values, {resetForm}) => {
    setLoading(true);
    if(Cookies.get('user_id')){
      Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/event/create`,{
        event_name:values.event_name,
        description:values.description,
        startDate:values.startDate,
        endDate:values.endDate,
        street:capitalizeWords(values.street),
        purok:capitalizeWords(values.purok),
        barangay:capitalizeWords(values.barangay),
        town:capitalizeWords(values.town),
        postal_code:values.postal_code,
        target_participants:capitalizeWords(values.participants),
        registration_form_url:values.registration_form_url,
        status:1,
        urls:urls,
        accessToken: Cookies.get('user_id')
      }).then(res=>{
        setLoading(false);
        if(res.data.success){
          refetch();
          props.setOpenModal(false);
          resetForm();
          enqueueSnackbar(res.data.message, { variant:'success' });
        }else{
          enqueueSnackbar(res.data.message, { variant:'error' });
        }
      })
    }else{
      navigate("/login");
    }
  }
  const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
    initialValues:{ 
      event_name:'',
      description:'',
      startDate:'',
      endDate:'',
      street:'',
      purok:'',
      barangay:'',
      town:'',
      postal_code:'',
      participants:'',
      registration_form_url:''
    },
    enableReinitialize:true,
    validationSchema:eventValidationSchema,
    onSubmit: handleFormSubmit
  });
  return (
    <BootstrapDialog
    onClose={props.handleCloseModal}
    aria-labelledby="customized-dialog-title"
    open={props.openModal}
  >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleCloseModal}>
      Add New Event
    </BootstrapDialogTitle>
    <DialogContent dividers>
    <Box sx={{ width: '100%' }}>
        <TextField
            value={values.event_name}
            onChange={handleChange('event_name')}
            onBlur={handleBlur('event_name')}
            margin="dense"
            id="event_name"
            label="Event Name"
            type="text"
            fullWidth
            variant="standard"
        />
         {(errors.event_name && touched.event_name) &&
                <p className="text-danger small ">{errors.event_name}</p>
         }
        <TextareaAutosize
            value={values.description}
            onChange={handleChange('description')}
            onBlur={handleBlur('description')}
            maxRows={10}
            aria-label="maximum height"
            placeholder="Description"
            style={{ width: '100%', height: 200, padding:5 }}
        />
         {(errors.description && touched.description) &&
                <p className="text-danger small ">{errors.description}</p>
         }
         <Grid container rowSpacing={1} mt={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={6}>
                <TextField
                    value={values.startDate}
                    onChange={handleChange('startDate')}
                    onBlur={handleBlur('startDate')}
                    id="startDate"
                    label="Start Date and Time"
                    type="datetime-local"
                    sx={{ width: 250 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                  {(errors.startDate && touched.startDate) &&
                        <p className="text-danger small ">{errors.startDate}</p>
                }
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={values.endDate}
                onChange={handleChange('endDate')}
                onBlur={handleBlur('endDate')}
                id="endDate"
                label="End Date and Time"
                type="datetime-local"
                sx={{ width: 250 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
              {(errors.endDate && touched.endDate) &&
                    <p className="text-danger small ">{errors.endDate}</p>
            }
          </Grid>
        </Grid>
        <TextField
            value={values.street}
            onChange={handleChange('street')}
            onBlur={handleBlur('street')}
            inputProps={{ style: { textTransform: "capitalize" } }}
            margin="dense"
            id="street"
            label="Event Address - Street"
            type="text"
            fullWidth
            variant="standard"
        />
          {(errors.street && touched.street) &&
                <p className="text-danger small ">{errors.street}</p>
         }
        <TextField
            value={values.purok}
            onChange={handleChange('purok')}
            onBlur={handleBlur('purok')}
            inputProps={{ style: { textTransform: "capitalize" } }}
            margin="dense"
            id="purok"
            label="Event Address - Purok"
            type="text"
            fullWidth
            variant="standard"
        />
          {(errors.purok && touched.purok) &&
                <p className="text-danger small ">{errors.purok}</p>
         }
        <TextField
            value={values.barangay}
            onChange={handleChange('barangay')}
            onBlur={handleBlur('barangay')}
            inputProps={{ style: { textTransform: "capitalize" } }}
            margin="dense"
            id="barangay"
            label="Event Address - Barangay"
            type="text"
            fullWidth
            variant="standard"
        />
          {(errors.barangay && touched.barangay) &&
                <p className="text-danger small ">{errors.barangay}</p>
         }
        <TextField
            value={values.town}
            onChange={handleChange('town')}
            onBlur={handleBlur('town')}
            inputProps={{ style: { textTransform: "capitalize" } }}
            margin="dense"
            id="town"
            label="Event Address - Town"
            type="text"
            fullWidth
            variant="standard"
        />
          {(errors.town && touched.town) &&
                <p className="text-danger small ">{errors.town}</p>
         }
        <TextField
            value={values.postal_code}
            onChange={handleChange('postal_code')}
            onBlur={handleBlur('postal_code')}
            margin="dense"
            id="postal_code"
            label="Event Address - Postal Code"
            type="text"
            fullWidth
            variant="standard"
        />
          {(errors.postal_code && touched.postal_code) &&
                <p className="text-danger small ">{errors.postal_code}</p>
         }
        <TextField
            value={values.participants}
            onChange={handleChange('participants')}
            onBlur={handleBlur('participants')}
            inputProps={{ style: { textTransform: "capitalize" } }}
            margin="dense"
            id="participants"
            label="Participants"
            type="text"
            fullWidth
            variant="standard"
        />
          {(errors.participants && touched.participants) &&
                <p className="text-danger small ">{errors.participants}</p>
         }
          <TextField
            value={values.registration_form_url}
            onChange={handleChange('registration_form_url')}
            onBlur={handleBlur('registration_form_url')}
            margin="dense"
            id="registration_form_url"
            label="Registration Form Link"
            type="text"
            fullWidth
            variant="standard"
        />
          {(errors.registration_form_url && touched.registration_form_url) &&
                <p className="text-danger small ">{errors.registration_form_url}</p>
         }
        <UploadImage images={images} setImages={setImages} urls={urls} setUrls={setUrls} progress={progress} setProgress={setProgress}/>
      
</Box>
    </DialogContent>
    <DialogActions>
    <Button type="submit" className='text-dark' disabled={!isValid||loading} onClick={handleSubmit}>
          {loading?<><CircularProgress size={20}/> Adding...</>:"Add"}
        </Button>
    </DialogActions>
  </BootstrapDialog>
  );
}