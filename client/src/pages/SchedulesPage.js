import React,{useContext, useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import TruckAssignmentPanel from '../components/TruckAssignmentPanel';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import StatusToast from '../components/helpers/StatusToast';
import { Helmet } from 'react-helmet';
import useAxios,{ configure } from 'axios-hooks'
import { CircularProgress } from '@mui/material';
import SchedulePanel from '../components/SchedulePanel';
configure({ ssr:false })
const defaultContext= {
  queryResult: {data:null,loading:false,error:null},
  refetch: () => {},
};
const SchedulesPageContext = React.createContext(defaultContext);
export const useSchedulesPageContext = () => useContext(SchedulesPageContext);
const SchedulesPage = () => {
    const [statusToast, setStatusToast] = useState({
        isOpen:false,
        message:"",
        colorScheme:"success"
    });
    const [value, setValue] = useState(0);
    // const [schedules,setSchedules]=useState([]);
    const [{ data, loading, error }, refetch] = useAxios({
      url: `${process.env.REACT_APP_BACKEND_URL}/admin/schedule/get_schedules`,
      method:'get' 
    });
    // const [user,setUser]=useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      if(!Cookies.get('user_id')){
        navigate("/login");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // useEffect(() => {
    //   axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/assignment/get-assignments`)
    //   .then((res) => {
    //     if (res.data.success) {
    //       setAssignments(res.data.data);
    //     }
    //   });
    //   axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/schedule/get_schedules`)
    //   .then(res=>{
    //     if(res.data.success){
    //       setSchedules(res.data.data);
    //     }
    //   })
    //   return ()=>{
    //     setAssignments([]);
    //     setSchedules([]);
    //   }
    // },[])
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
          <Helmet>
            <title>GTrack | Schedules</title>
          </Helmet>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab style={{ fontWeight: 600 }} label="Schedules" {...a11yProps(0)} />
                <Tab style={{ fontWeight: 600 }} label="Truck Assignments" {...a11yProps(1)} />
            </Tabs>
            </Box>
            {loading?(
            <div className='my-5'>
                <CircularProgress size={80} color="success"/>
            </div>
            ):(
            <SchedulesPageContext.Provider value={{queryResult:{data,loading,error},refetch}}>
              <TabPanel value={value} index={0}>
                <SchedulePanel statusToast={statusToast} setStatusToast={setStatusToast} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                  <TruckAssignmentPanel />
              </TabPanel>
            </SchedulesPageContext.Provider>
            )}
            <StatusToast statusToast={statusToast} setStatusToast={setStatusToast}/>
        </PageLayout>
    )
}

export default SchedulesPage
