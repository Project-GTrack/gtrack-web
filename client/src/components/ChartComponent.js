import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Title from './TitleComponent';
import moment from 'moment';




export default function Chart(chartData) {
  const theme = useTheme();
  // Generate Collection Data
function createData(date, volume) {
  return { date, volume };
}

const data = [];
for(let i = 0; i < chartData.data.length; i++ ){
 
  data.push(createData(moment(chartData.data[i].collection_date).format("LL"), chartData.data[i].collection_weight_volume));
}

 
  return (
    <React.Fragment>
      <Title>Total Garbage Weight(in tons) Per Week In A Monthly Basis</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="volume"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}