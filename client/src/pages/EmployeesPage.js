import React,{useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import DriversComponent from '../components/employees/DriversComponent'
import AdminsComponent from '../components/employees/AdminsComponent'
import InactiveAccountsComponent from '../components/employees/InactiveAccountsComponent'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import StatusToast from '../components/helpers/StatusToast';
import { Helmet } from 'react-helmet';
const EmployeesPage = () => {
  const [statusToast, setStatusToast] = useState({
    isOpen:false,
    message:"",
    colorScheme:"success"
  });
  const [value, setValue] = useState(0);
  const [accounts, setAccounts] = useState([
    {
      drivers:[],
      admins:[],
      inactives:[]
    }
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    if(Cookies.get('user_id')){
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/get/users`)
      .then(res=>{
        if(res.data.success){
          setAccounts(res.data.data);
        }
      })
    }else{
      navigate("/login");
    }
    return ()=>{
      setAccounts([
        {
          drivers:[],
          admins:[],
          inactives:[]
        }
      ])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
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
      <Helmet>
        <title>GTrack | Employees</title>
      </Helmet>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{ fontWeight: 600 }} label="Drivers" {...a11yProps(0)} />
          <Tab style={{ fontWeight: 600 }} label="Admins" {...a11yProps(1)} />
          <Tab style={{ fontWeight: 600 }} label="Inactive Accounts" {...a11yProps(2)} />
      </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <DriversComponent drivers={accounts.drivers} setAccounts={setAccounts}  statusToast={statusToast} setStatusToast={setStatusToast}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminsComponent admins={accounts.admins} setAccounts={setAccounts} statusToast={statusToast} setStatusToast={setStatusToast}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <InactiveAccountsComponent inactives={accounts.inactives} setAccounts={setAccounts} statusToast={statusToast} setStatusToast={setStatusToast}/>
      </TabPanel>
      <StatusToast statusToast={statusToast} setStatusToast={setStatusToast}/>
    </PageLayout>
  )
}

export default EmployeesPage
