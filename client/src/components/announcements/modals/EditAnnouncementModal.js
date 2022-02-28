import React, {useState,useEffect} from 'react';
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
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
import Firebase from '../../helpers/Firebase';
import UploadImage from '../../helpers/UploadImage';
import Axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const storage = Firebase.storage();

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
  
export default function EditAnnouncementModal(props) {
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
  const announcementValidationSchema = yup.object().shape({
    title: yup
      .string()
      .required('Title is required'),
    content: yup
      .string()
      .required('Content is required'),
    image: yup
      .mixed()
      .nullable()
      .notRequired()
      .test("FILE_SIZE", "Uploaded file is too big.", 
          value => !value || (value && value.size <= FILE_SIZE))
      .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
          value => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
  })
  useEffect(() => {
    let temp=[];
    props.data[5].map((image)=>{
      temp.push(image.filename);
    })
    setUrls([...temp]);
  }, [props])
  
  const [error,setError] = useState([]);
  const handleFormSubmit = async(values, {resetForm}) => {
    if(Cookies.get('user_id')){
      await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/admin/announcement/edit/${props.data[0]}`,{
        title:values.title,
        content: values.content,
        urls:urls
      }).then(res=>{
        if(res.data.success){
          props.setAnnouncements(res.data.data);
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
  const { handleChange, handleSubmit, handleBlur, values, errors,isValid,touched } = useFormik({
    initialValues:{ 
      title: props.data[1],
      content:props.data[2]
    },
    enableReinitialize:true,
    validationSchema:announcementValidationSchema,
    onSubmit: handleFormSubmit
  });

  return (
    <BootstrapDialog
    onClose={props.handleCloseModal}
    aria-labelledby="customized-dialog-title"
    open={props.openModal}
  >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleCloseModal}>
      Edit Announcement
    </BootstrapDialogTitle>
    <DialogContent dividers>
    {error && <p className="text-danger small text-center">{error}</p>}
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
            <TextField
              value={values.title}
              onChange={handleChange('title')}
              onBlur={handleBlur('title')}
              id="title"
              label=  "Title"
              type="text"
              fullWidth
            />
            {(errors.title && touched.title) &&
              <p className="text-danger small ">{errors.title}</p>
            } 
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                value={values.content}
                onChange={handleChange('content')}
                onBlur={handleBlur('content')}
                maxRows={10}
                aria-label="maximum height"
                placeholder= "Content"
                style={{ width: '100%', height: 200 }}
              />
              {(errors.content && touched.content) &&
                <p className="text-danger small ">{errors.content}</p>
              } 
            </Grid>
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