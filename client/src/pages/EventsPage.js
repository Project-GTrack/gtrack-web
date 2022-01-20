import React,{useState} from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import EventsComponent from '../components/events/EventsComponent';
const EventsPage = () =>{
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