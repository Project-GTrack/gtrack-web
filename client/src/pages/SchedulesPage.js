import React,{useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import SchedulePanel from '../components/SchedulePanel';
import TruckAssignmentPanel from '../components/TruckAssignmentPanel';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import StatusToast from '../components/helpers/StatusToast';
const SchedulesPage = () => {
    const [statusToast, setStatusToast] = useState({
        isOpen:false,
        message:"",
        colorScheme:"success"
    });
    const [value, setValue] = useState(0);
    const [schedules,setSchedules]=useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      if(Cookies.get('user_id')){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/schedule/get_schedules`)
        .then(res=>{
          if(res.data.success){
            setSchedules(res.data.data);
          }
        })
      }else{
        navigate("/login");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
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
        <PageLayout headerTitle={"Schedules"}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab style={{ fontWeight: 600 }} label="Schedules" {...a11yProps(0)} />
                <Tab style={{ fontWeight: 600 }} label="Truck Assignments" {...a11yProps(1)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <SchedulePanel statusToast={statusToast} setStatusToast={setStatusToast} schedules={schedules} setSchedules={setSchedules}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TruckAssignmentPanel/>
            </TabPanel>
            <StatusToast statusToast={statusToast} setStatusToast={setStatusToast}/>
        </PageLayout>
    )
}

export default SchedulesPage
