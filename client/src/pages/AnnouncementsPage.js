import React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import AnnouncementsComponent from '../components/announcements/AnnouncementsComponent';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const AnnouncementsPage = () =>{
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if(Cookies.get('user_id')){
      Axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/announcement/view`)
      .then((res) => {
          if(res){
            setData(res.data.posts);
          }
      }) 
    }else{
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

    return (
        <PageLayout headerTitle={"Announcements"}>
          <Helmet>
            <title>GTrack | Announcements</title>
          </Helmet>
            <AnnouncementsComponent announcements = {data} setAnnouncements = {setData}/>
        </PageLayout>
    )
}
export default AnnouncementsPage;