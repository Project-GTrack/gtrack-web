import React,{useState} from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import EventsComponent from '../components/events/EventsComponent';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import StatusToast from '../components/helpers/StatusToast';
const EventsPage = () =>{
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [statusToast, setStatusToast] = useState({
      isOpen : false,
      message : "",
      colorScheme:"success"
    })
    useEffect(() => {
      if(Cookies.get('user_id')){
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/event/view`)
        .then((res) => {
            if(res){
              setData(res.data.data);
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
        <PageLayout headerTitle={"Events"}>
           <EventsComponent events = {data} setEvents = {setData} statusToast={statusToast} setStatusToast={setStatusToast}/>
           <StatusToast statusToast={statusToast} setStatusToast={setStatusToast}/>
        </PageLayout>
    )
}
export default EventsPage;