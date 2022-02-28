import React, {useEffect, useState} from 'react';
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
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
const storage = Firebase.storage();
const UploadImage = ({images,setImages,urls,setUrls,progress,setProgress}) => {
  const [oldImage,setOldImage] = useState([]);
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
        for(let i = 0 ; i < event.target.files.length; i++){
            const newImage = event.target.files[i];
            console.log(newImage);
            newImage["id"] = uuidGenerator();
            setOldImage((prevState) => [...prevState, newImage]);
            setImages((prevState) => [...prevState, newImage]);
        }
    }
    const handleRemove = (index) => {
      let imageList = [...oldImage];
      imageList.splice(index,1);
      setOldImage([...imageList]);
    }
 
    const handleUpload = () => {
        const promises = [];
        images.map((image)=>{
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
                console.log(urls);
                setUrls((prevState)=> [...prevState, urls]);
                })
            }
        
            )
    })
    Promise.all(promises)
    .then(() => alert("All images uploaded"))
    .catch((err) => console.log(err));
    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={progress} />
            </Box>
            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
              <Button
                variant="contained"
                component="label"
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
              <Grid item xs={6} md={8}>
                <Box component="div">
                    {oldImage ? oldImage.map((image, i) => (
                  <Typography  sx={{ display: 'inline' }} key={i} variant="subtitle1" gutterBottom component="div">
                    {image.name}<ClearIcon fontSize='small' onClick={()=>handleRemove(i)}/>
                  </Typography>
                
                )):null}
                </Box>
              </Grid>
            </Grid>
            <br></br>
            <Button variant="contained" onClick={handleUpload} color = 'success'>Upload</Button>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {urls.map((url, i) => (
              <ImageListItem key={i}>
                <img
                  src={url}
                  alt="firebase iamge"
                  loading="lazy"
                />
          </ImageListItem>
            ))}
          </ImageList>
          </div>
        );


}
export default UploadImage