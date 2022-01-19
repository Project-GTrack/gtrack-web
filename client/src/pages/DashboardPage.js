import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { mainListItems } from "../components/ListItemComponent";
import Chart from "../components/ChartComponent";
import DashboardCard from "../components/DashboardCardComponents";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu"
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import {ListItemIcon, MenuItem, Avatar, Link, Toolbar, Box, CssBaseline,Paper,
        Grid, Container, Badge, IconButton, Divider, Typography, List, Menu, Tooltip,
        Button, Modal, TableRow, TableHead, 
        TableBody, Table, TableContainer
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import PageLayout from "./PageLayout";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Gtrack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));


const mdTheme = createTheme();

const DashboardPage = () => {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDropDown = Boolean(anchorEl);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    p: 4,
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(plate, model, date, status) {
    return { plate,model,date, status };
  }
  
  const rows = [
    createData('AZM1234','XFCE 4010','10/11/2020', 'Active'),
    createData('MYX4567', 'XFCE 4010','10/11/2020', 'Active'),
    createData('ABC2904', 'XFCE 4010', '10/11/2021', 'Active'),
    createData('BST3203', 'XFCE 4010', '10/11/2021', 'Active'),
    createData('LGP2012', 'XFCE 4010', '10/11/2021', 'Active'),
  ];


  const dashcards = [
        {title: "Available Drivers", count: 5, icon:<PersonIcon style={{float:'right'}} fontSize="large"/>},
        {title: "Available Trucks", count: 5, icon:<LocalShippingIcon style={{float:'right'}} fontSize="large"/>},
        {title: "Dumpsters", count: 14,icon:<DeleteIcon style={{float:'right'}} fontSize="large"/>},
        {title: "Collections", count: 10,icon:<AutoDeleteIcon style={{float:'right'}} fontSize="large"/>}
  ];
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  return (
    <PageLayout headerTitle={"Dashboard"}>
          <div>
            <Button variant="contained" style={{float: 'right'}} startIcon={<ArticleIcon/>} color="success">Generate Report</Button>
            <Grid container spacing={3}>
            {dashcards.map(dashcard => (
                <Grid item key={dashcard.id} xs={12} md={6} lg={3}>
                   <DashboardCard dashcard={dashcard}/>
                 </Grid>
              ))}
              <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                 
                   >
                    <Box sx={style}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell align="justify">Plate Number</StyledTableCell>
                                  <StyledTableCell align="justify">Model</StyledTableCell>
                                  <StyledTableCell align="justify">Date Added</StyledTableCell>
                                  <StyledTableCell align="justify">Status</StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <StyledTableRow key={row.name}>
                                    <StyledTableCell align="justify" component="th" scope="row">
                                      {row.plate}
                                    </StyledTableCell>
                                    <StyledTableCell align="justify">{row.model}</StyledTableCell>
                                    <StyledTableCell align="justify">{row.date}</StyledTableCell>
                                    <StyledTableCell align="justify">{row.status}</StyledTableCell>
                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                        </TableContainer>
                      </Box>
                   </Modal>

              {/* Chart */}
              <Grid item xs={12} sx={{mt:4, mb:4}}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 280,
                    maxWidth: 'lg'
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
           
            </Grid>
          </div>
      </PageLayout>
  );
};

export default DashboardPage;
