import React,{useEffect, useState, useContext} from 'react';
import PageLayout from './PageLayout';
import DumpstersComponent from '../components/dumpsters/DumpstersComponent';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import StatusToast from '../components/helpers/StatusToast';
import { Helmet } from 'react-helmet';
import useAxios,{ configure } from 'axios-hooks'
import { CircularProgress } from '@mui/material';
configure({ ssr:false })
const defaultContext= {
  queryResult: {data:null,loading:false,error:null},
  refetch: () => {},
};
const DumpstersPageContext = React.createContext(defaultContext);
export const useDumpstersPageContext = () => useContext(DumpstersPageContext);
const DumpstersPage = () => {
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
    const [{ data, loading, error }, refetch] = useAxios({
      url: `${process.env.REACT_APP_BACKEND_URL}/admin/dumpster/get-dumpsters`,
      method:'get' 
    });
    return (
        <PageLayout headerTitle={"Dumpsters"}>
          <Helmet>
            <title>GTrack | Dumpsters</title>
          </Helmet>
          {loading?(
            <div className='my-5'>
                <CircularProgress size={80} color="success"/>
            </div>
            ):(
              <DumpstersPageContext.Provider value={{queryResult:{data,loading,error},refetch}}>
                  <DumpstersComponent statusToast={statusToast} setStatusToast={setStatusToast}/>
              </DumpstersPageContext.Provider>
            )}
       
           <StatusToast statusToast={statusToast} setStatusToast={setStatusToast}/>
        </PageLayout>
    )
}

export default DumpstersPage
