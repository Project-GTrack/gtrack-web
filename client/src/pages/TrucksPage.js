import React,{useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout'
import GarbageTrucksPanel from '../components/GarbageTrucksPanel';
import UnderMaintenancePanel from '../components/UnderMaintenancePanel';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import StatusToast from '../components/helpers/StatusToast';

const TrucksPage = () => {
    const [value, setValue] = useState(0);
    const [statusToast,setStatusToast]=useState(false);
    const [trucks,setTrucks]=useState({
      trucks:[],
      inactives:[]
    });
    const navigate = useNavigate();
    useEffect(() => {
      if(Cookies.get('user_id')){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/truck/get`)
        .then(res=>{
          if(res.data.success){
            console.log(res.data.data)
            setTrucks(res.data.data);
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
        <PageLayout headerTitle={"Garbage Trucks"}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab style={{ fontWeight: 600 }} label="Garbage Trucks" {...a11yProps(0)} />
                <Tab style={{ fontWeight: 600 }} label="Under Maintenance Trucks" {...a11yProps(1)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <GarbageTrucksPanel trucks={trucks.trucks} setTrucks={setTrucks} statusToast={statusToast} setStatusToast={setStatusToast}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UnderMaintenancePanel inactives={trucks.inactives} setTrucks={setTrucks} statusToast={statusToast} setStatusToast={setStatusToast}/>
            </TabPanel>
            <StatusToast statusToast={statusToast} setStatusToast={setStatusToast}/>
        </PageLayout>
    )
}

export default TrucksPage
