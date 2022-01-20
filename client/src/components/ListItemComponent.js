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

export const mainListItems = (
  <div>
    <ListItem component="a" href="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem component="a" href="/track">
      <ListItemIcon>
        <FmdGoodIcon />
      </ListItemIcon>
      <ListItemText primary="Track Collection" />
    </ListItem>
    <ListItem component="a" href="/announcements">
      <ListItemIcon>
        <CampaignIcon />
      </ListItemIcon>
      <ListItemText primary="Announcements" />
    </ListItem>
    <ListItem component="a" href="/events">
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItem>
    <ListItem component="a" href="/schedules">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="Schedules" />
    </ListItem>
    <ListItem component="a" href="/employees" >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItem>
    <ListItem component="a" href="/trucks">
      <ListItemIcon>
        <LocalShippingIcon />
      </ListItemIcon>
      <ListItemText primary="Garbage Trucks" />
    </ListItem>
    <ListItem component="a" href="/dumpsters">
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Dumpsters" />
    </ListItem>
    <ListItem component="a" href="/reports">
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </div>
)
