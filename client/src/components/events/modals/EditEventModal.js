import React,{useState, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
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
import TextareaAutosize from '@mui/base/TextareaAutosize';
import * as yup from 'yup'
import UploadImage from '../../helpers/UploadImage';
import Axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
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
  
export default function EditEventModal(props) {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

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
    target_participants: yup
        .string()
        .required('Participants is required'),
    status: yup
        .string()
        .required('Status cannot be disregarded'),
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

  const handleFormSubmit = async(values) => {
    console.log(values.status);
    if(Cookies.get('user_id')){
      await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/event/edit/${props.data[0]}`,{
        event_name:values.event_name,
        description:values.description,
        startDate:values.startDate,
        endDate:values.endDate,
        street:values.street,
        purok:values.purok,
        barangay:values.barangay,
        town:values.town,
        postal_code:values.postal_code,
        target_participants:values.target_participants,
        registration_form_url:values.registration_form_url,
        status:values.status,
        urls:urls
      }).then(res=>{
       
        if(res.data.success){
          console.log(res.data.data);
          props.setEvents(res.data.data);
          props.setOpenModal(false);
          props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"success"})
        }else{
          props.setStatusToast({isOpen:true,message:res.data.message,colorScheme:"error"})
      
        }
      })
    }else{
      navigate("/login");
    }
  }
  console.log(props.data[8]);
  const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
    initialValues:{ 
      event_name: props.data[1],
      description:props.data[2],
      startDate:moment(props.data[6].split(" - ")[0]).format("YYYY-MM-DDTkk:mm"),
      endDate:moment(props.data[6].split(" - ")[1]).format("YYYY-MM-DDTkk:mm"),
      street:props.data[7].split(" ")[0],
      purok:props.data[7].split(" ")[1],
      barangay:props.data[7].split(" ")[2],
      town:props.data[7].split(" ")[3],
      postal_code: props.data[11],
      target_participants:props.data[3],
      status:props.data[8],
      registration_form_url:props.data[12]
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
      Edit Event
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
            style={{ width: '100%', height: 200 }}
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
            value={values.target_participants}
            onChange={handleChange('target_participants')}
            onBlur={handleBlur('target_participants')}
            margin="dense"
            id="target_participants"
            label="Participants"
            type="text"
            fullWidth
            variant="standard"
        />
          {(errors.target_participants && touched.target_participants) &&
                <p className="text-danger small ">{errors.target_participants}</p>
         }
          <Grid item xs={12}>
          <FormControl sx={{ width:'100%' }}>
            <InputLabel htmlFor="status">Status</InputLabel>
              <Select
                value={values.user_type}
                onChange={handleChange('status')}
                onBlur={handleBlur('status')}
                label="status"
                inputProps={{
                  name: 'status',
                  id: 'status',
                }}
              >
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Canceled">Canceled</MenuItem>
                <MenuItem value="Ended">Ended</MenuItem>
              </Select>
          </FormControl>
          </Grid>
        <UploadImage images={images} setImages={setImages} urls={urls} setUrls={setUrls} progress={progress} setProgress={setProgress}/>
    </Box>
    </DialogContent>
    <DialogActions>
      <Button  type="submit"  className='text-dark' disabled={!isValid} onClick={handleSubmit}>
        Save
      </Button>
    </DialogActions>
  </BootstrapDialog>
  );
}