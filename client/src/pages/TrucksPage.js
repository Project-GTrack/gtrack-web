import React,{useContext, useState} from 'react';
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
import { Helmet } from 'react-helmet';
import useAxios,{ configure } from 'axios-hooks'
import { CircularProgress } from '@mui/material';
configure({ ssr:false })
const defaultContext= {
  queryResult: {data:null,loading:false,error:null},
  refetch: () => {},
};
const TrucksPageContext = React.createContext(defaultContext);
export const useTrucksPageContext = () => useContext(TrucksPageContext);

const TrucksPage = () => {
    const [value, setValue] = useState(0);

    const [{ data, loading, error }, refetch] = useAxios({
      url: `${process.env.REACT_APP_BACKEND_URL}/admin/truck/get`,
      method:'get' 
    });
    const navigate = useNavigate();
    useEffect(() => {
      if(!Cookies.get('user_id')){
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
          <Helmet>
              <title>GTrack | Trucks</title>
          </Helmet>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab style={{ fontWeight: 600 }} label="Garbage Trucks" {...a11yProps(0)} />
                <Tab style={{ fontWeight: 600 }} label="Under Maintenance Trucks" {...a11yProps(1)} />
            </Tabs>
            </Box>
            {loading?(
          <div className='my-5'>
            <CircularProgress size={80} color="success"/>
          </div>
        ):(
          <TrucksPageContext.Provider value={{queryResult:{data,loading,error},refetch}}>
             <TabPanel value={value} index={0}>
                <GarbageTrucksPanel/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UnderMaintenancePanel/>
            </TabPanel>
          </TrucksPageContext.Provider>
        )}
        </PageLayout>
    )
}

export default TrucksPage
