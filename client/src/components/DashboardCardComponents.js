import React from 'react'
import {Card, CardHeader, CardContent, Typography, IconButton} from "@mui/material";
export default function DashboardCardComponents({dashcard}) {
    return (
        <div>
        <Card elevation={1}>
        <CardHeader
          title={dashcard.title}
          
        />
        <CardContent>
          <Typography  variant="h5" color="textSecondary">
            {dashcard.count}
            {dashcard.icon}
          </Typography>
           
        </CardContent>
      </Card>
        </div>
    )
}
