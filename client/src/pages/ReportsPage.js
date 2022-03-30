import React,{useContext, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout'
import ReportComponent from '../components/ReportComponent';
import ConcernComponent from '../components/ConcernComponent';
import ResolvedReportsComponent from '../components/ResolvedReportComponent'
import ResolvedConcernsComponent from '../components/ResolvedConcernsComponent'
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
const ReportsandConcernsPageContext = React.createContext(defaultContext);
export const useReportsandConcernsPageContext = () => useContext(ReportsandConcernsPageContext);


// Start of trucks page use state
const ReportsPage = () => {
    const [value, setValue] = useState(0);

    const [{ data, loading, error }, refetch] = useAxios({
      url: `${process.env.REACT_APP_BACKEND_URL}/admin/report/get`,
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
        <PageLayout headerTitle={"Reports and Concerns"}>
          <Helmet>
              <title>GTrack | Reports and Concerns</title>
          </Helmet>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab style={{ fontWeight: 600 }} label="Reports" {...a11yProps(0)} />
                <Tab style={{ fontWeight: 600 }} label="Concerns" {...a11yProps(1)} />
            </Tabs>
            </Box>
            {loading?(
          <div className='my-5'>
            <CircularProgress size={80} color="success"/>
          </div>
        ):(
          <ReportsandConcernsPageContext.Provider value={{queryResult:{data,loading,error},refetch}}>
             <TabPanel value={value} index={0}>
                <ReportComponent />
            </TabPanel>
            <TabPanel value={value} index={0}>
                <ResolvedReportsComponent />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ConcernComponent />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ResolvedConcernsComponent />
            </TabPanel>
            
          </ReportsandConcernsPageContext.Provider>
        )}
        </PageLayout>
    )
}

export default ReportsPage
