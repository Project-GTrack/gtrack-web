import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CampaignIcon from '@mui/icons-material/Campaign';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';

const MainListItems =()=>{
  const navigate=useNavigate();
  return (<div>
    <ListItem onClick={()=>navigate('/dashboard')} sx={{cursor:"pointer"}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem onClick={()=>navigate('/track')} sx={{cursor:"pointer"}}>
      <ListItemIcon>
        <FmdGoodIcon />
      </ListItemIcon>
      <ListItemText primary="Track Collection" />
    </ListItem>
    <ListItem onClick={()=>navigate('/announcements')} sx={{cursor:"pointer"}}>
      <ListItemIcon>
        <CampaignIcon />
      </ListItemIcon>
      <ListItemText primary="Announcements" />
    </ListItem>
    <ListItem onClick={()=>navigate('/events')} sx={{cursor:"pointer"}}>
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItem>
    <ListItem onClick={()=>navigate('/schedules')} sx={{cursor:"pointer"}}>
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="Schedules" />
    </ListItem>
    <ListItem onClick={()=>navigate('/employees')} sx={{cursor:"pointer"}}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItem>
    <ListItem onClick={()=>navigate('/trucks')} sx={{cursor:"pointer"}}>
      <ListItemIcon>
        <LocalShippingIcon />
      </ListItemIcon>
      <ListItemText primary="Garbage Trucks" />
    </ListItem>
    <ListItem onClick={()=>navigate('/dumpsters')} sx={{cursor:"pointer"}}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Dumpsters" />
    </ListItem>
    <ListItem onClick={()=>navigate('/reports')} sx={{cursor:"pointer"}}>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </div>
  );
}
export default MainListItems;
