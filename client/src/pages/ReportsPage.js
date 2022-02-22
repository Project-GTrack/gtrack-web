import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecentReports from '../components/RecentReports'
import ResolvedReports from '../components/ResolvedReports'
import PageLayout from './PageLayout'

const ReportsPage = () => {
    const [user,setUser]=useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      if(Cookies.get('user_id')){
        setUser(Cookies.get('user_id'));
      }else{
        navigate("/login");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <PageLayout headerTitle={"Reports"}>
            <RecentReports/>
            <ResolvedReports/>
        </PageLayout>
    )
}

export default ReportsPage
