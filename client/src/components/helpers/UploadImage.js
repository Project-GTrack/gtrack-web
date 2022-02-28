import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import Firebase from './Firebase';
import { uuidGenerator } from './uuidGenerator';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
const storage = Firebase.storage();
const UploadImage = ({urls,setUrls,progress,setProgress}) => {
    function LinearProgressWithLabel(props) {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
    }
    LinearProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate and buffer variants.
         * Value between 0 and 100.
         */
        value: PropTypes.number.isRequired,
      };
    const handleChange = (event) =>{
        if(event.target.files.length>0){
          // for(let i = 0 ; i < event.target.files.length; i++){
          //   const newImage = event.target.files[i];
          //   setImages((prevState) => [...prevState, newImage]);
          // }
          handleUpload(event.target.files);
          // event.target.files=[];
        }
    }
    const handleRemove = (index) => {
      let imageList = [...urls];
      imageList.splice(index,1);
      setUrls([...imageList]);
    }
 
    const handleUpload = (files) => {
      for(let i = 0 ; i < files.length; i++){
      const promises = [];
      let image = files[i];
      // images.forEach(function(image){
        let filename = uuidGenerator();
        const uploadTask = storage.ref(`/gtrack-web/announcement/${filename}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(progress);
          },
          (err) => {
              console.log(err);
          },
          async () => {
            await storage
            .ref("/gtrack-web/announcement/")
            .child(filename)
            .getDownloadURL()
            .then((urls)=>{
            setUrls((prevState)=> [...prevState, urls]);
            })
          }
        )
      
    }
    // Promise.all(promises)
    // .then(() => alert("All images uploaded"))
    // .catch((err) => console.log(err));
  }

    return (
        <div className='w-100'>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={progress} />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                component="label"
                sx={{width:"100%"}}
              >
                Choose Image
                <Input
                  type="file"
                  hidden
                  inputProps={{ multiple: true }}
                  onChange ={handleChange}
                />
              </Button>
              </Grid>
            </Grid>
            <br></br>
            {/* <Button variant="contained" onClick={handleUpload} color = 'success'>Upload</Button> */}
            <ImageList cols={4} >
            {urls.map((url, i) => (
              <ImageListItem key={i}>
                <img
                  src={url}
                  alt={"announcement image "+url}
                  loading="lazy"
                  className='rounded'
                />
                <button 
                  className='btn btn-danger text-center rounded-circle position-absolute btn-sm'
                  onClick={()=>handleRemove(i)} 
                  style={{
                    right:0, 
                    marginRight:5, 
                    top:0, 
                    marginTop:5, 
                    width:25,
                    height:25,
                    fontSize:10,
                  }}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </ImageListItem>
            ))}
          </ImageList>
          </div>
        );


}
export default UploadImage