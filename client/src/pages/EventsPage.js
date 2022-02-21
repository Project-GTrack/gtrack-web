import React,{useState} from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import EventsComponent from '../components/events/EventsComponent';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
const EventsPage = () =>{
    const [user,setUser]=useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      if(Cookies.get('user_id')){
        setUser(Cookies.get('user_id'));
      }else{
        navigate("/login");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
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
           <EventsComponent/>
        </PageLayout>
    )
}
export default EventsPage;