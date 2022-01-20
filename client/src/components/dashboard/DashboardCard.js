import React from "react";
import { Card,CardHeader,CardContent,Typography } from "@mui/material";
function DashboardCard(dashcard){
    return(
        <div>
            <Card elevation={1}>
                <CardHeader title={dashcard.title}/>
                <CardContent>
                    <Typography  id={dashcard.id}  variant="h5" color="textSecondary">
                        {dashcard.count}
                        {dashcard.icon}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
export default DashboardCard