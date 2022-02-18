import React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import MUIDataTable from "mui-datatables";
import AnnouncementCustomToolbar from '../components/announcements/AnnouncementCustomToolbar';
import AddNewAnnouncementModal from '../components/announcements/modals/AddNewAnnouncementModal';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const AnnouncementsPage = () =>{
  const navigate = useNavigate();
  const [data, setData] = useState([]);


  useEffect(() => {
    if(Cookies.get('user_id')){
      Axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/announcement/view`,{accessToken: Cookies.get('user_id')})
      .then((res) => {
          if(res){
            // setData(res.data);
            console.log(res.data);
          }
      }) 
    }else{
      navigate("/login");
    }
  },[])
 




  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const columns = ["Title", "Content", "Date Added"];

    // const data = [
    // ["Compostela Municipal Coastal Cleanup 2020", "The coastal cleanup is scheduled quarterly every year in the hopes to increase awareness in the preservation of the major waterways in the city as well as remove as much garbage as possible from these waterways.", "10/12/2020"],
    // ];

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
      const options = {
        selectableRowsHeader: false,
        selectableRows:'single',
        filter: true,
        filterType: 'dropdown',
        customToolbarSelect:(selectedRows,displayData)=>(
            <AnnouncementCustomToolbar selectedRows={selectedRows} displayData={displayData}/>
        )
        };
    return (
        <PageLayout headerTitle={"Announcements"}>
              <div>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={handleOpenModal}><i className="fa fa-plus" aria-hidden="true"></i> Add New Announcement</button>            </div>
                <AddNewAnnouncementModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
          />
            <MUIDataTable
                title={"Announcement List"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
        </PageLayout>
    )
}
export default AnnouncementsPage;