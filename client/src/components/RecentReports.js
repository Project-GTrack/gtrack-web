import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const RecentReports = () => {
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
    return (
        <div id='recent-reports' className='mb-3'>
            <div className='border'>
                <div className='bg-danger text-white p-3'>
                    Recent Reports
                </div>
                <div className='mx-auto'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab style={{ fontWeight: 600 }} label="Alerts" {...a11yProps(0)} />
                            <Tab style={{ fontWeight: 600 }} label="Concerns" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className='border p-3 m-2 rounded' >
                            <div className='row'>
                                <div className='col-1 text-center'>
                                    <Badge badgeContent={4} overlap="circular" color="secondary">
                                        <Avatar sx={{ width: 50, height: 50 }}>OP</Avatar>
                                    </Badge>
                                </div>
                                <div className='col-8 text-start'>
                                    <p className='d-inline'><strong>Jon Snow</strong> <span className='small'>DRIVER</span></p><br />
                                    <p className='text-dark d-inline' style={{fontSize:15}}><strong>RE: This is sample</strong></p><br />
                                    <p className='text-dark d-inline' style={{fontSize:13}}>This is sample</p>
                                </div>
                                <div className='col '>
                                    <button className='btn btn-success'><i className="fa fa-check-circle" aria-hidden="true"></i></button>
                                    <button className='btn btn-primary mx-2'><i className="fa fa-search" aria-hidden="true"></i></button>
                                    <button className='btn btn-danger'><i className="fa fa-trash" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='border p-3 m-2 rounded'>
                            No concerns for now
                        </div>
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}

export default RecentReports
