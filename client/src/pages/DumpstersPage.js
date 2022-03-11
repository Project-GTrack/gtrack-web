import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import axios from 'axios';
import DumpstersComponent from '../components/dumpsters/DumpstersComponent';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import StatusToast from '../components/helpers/StatusToast';
import { Helmet } from 'react-helmet';

const DumpstersPage = () => {
    // const [user,setUser]=useState(null);
    const [dumpsters,setDumpsters]=useState([]);
    const [statusToast, setStatusToast] = useState({
      isOpen:false,
      message:"",
      colorScheme:"success"
    });
    const navigate = useNavigate();
    useEffect(() => {
      if(!Cookies.get('user_id')){
        navigate("/login");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/dumpster/get-dumpsters`)
      .then((res) => {
        if (res.data.success) {
          setDumpsters(res.data.data);
        }
      });
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
        <PageLayout headerTitle={"Dumpsters"}>
          <Helmet>
            <title>GTrack | Dumpsters</title>
          </Helmet>
           <DumpstersComponent dumpsters={dumpsters} setDumpsters={setDumpsters} statusToast={statusToast} setStatusToast={setStatusToast}/>
           <StatusToast statusToast={statusToast} setStatusToast={setStatusToast}/>
        </PageLayout>
    )
}

export default DumpstersPage
