import React from 'react'
import RecentReports from '../components/RecentReports'
import ResolvedReports from '../components/ResolvedReports'
import PageLayout from './PageLayout'

const ReportsPage = () => {
    
    return (
        <PageLayout headerTitle={"Reports"}>
            <RecentReports/>
            <ResolvedReports/>
        </PageLayout>
    )
}

export default ReportsPage
