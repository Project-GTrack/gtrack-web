import React,{useEffect,useContext} from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import EventsComponent from '../components/events/EventsComponent';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import useAxios,{ configure } from 'axios-hooks'
import { CircularProgress } from '@mui/material';
configure({ ssr:false })
const defaultContext= {
  queryResult: {data:null,loading:false},
  refetch: () => {},
};
const EventPageContext = React.createContext(defaultContext);
export const useEventPageContext = () => useContext(EventPageContext);
const EventsPage = () =>{
    const navigate = useNavigate();
   
    const [{ data, loading, error }, refetch] = useAxios({
      url: `${process.env.REACT_APP_BACKEND_URL}/admin/event/view`,
      method:'get' 
    });
    useEffect(() => {
      if(!Cookies.get('user_id')){
        navigate("/login");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
      refetch();
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
          <Helmet>
            <title>GTrack | Events</title>
          </Helmet>
          {loading?(
          <div className='my-5'>
            <CircularProgress size={80} color="success"/>
          </div>
          ):(
            <EventPageContext.Provider value={{queryResult:{data,loading,error},refetch}}>
              <EventsComponent/>
            </EventPageContext.Provider>
           )}
        </PageLayout>
    )
}
export default EventsPage;