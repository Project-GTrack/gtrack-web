import React,{useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import DriversComponent from '../components/employees/DriversComponent'
import AdminsComponent from '../components/employees/AdminsComponent'
import InactiveAccountsComponent from '../components/employees/InactiveAccountsComponent'
const EmployeesPage = () => {
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
        <PageLayout headerTitle={"Employees"}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab style={{ fontWeight: 600 }} label="Drivers" {...a11yProps(0)} />
                <Tab style={{ fontWeight: 600 }} label="Admins" {...a11yProps(1)} />
                <Tab style={{ fontWeight: 600 }} label="Inactive Accounts" {...a11yProps(2)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DriversComponent />
            </TabPanel>
            <TabPanel value={value} index={1}>
            <AdminsComponent />
            </TabPanel>
            <TabPanel value={value} index={2}>
            <InactiveAccountsComponent />
            </TabPanel>
        </PageLayout>
    )
}

export default EmployeesPage
