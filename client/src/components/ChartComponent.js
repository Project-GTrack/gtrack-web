import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './TitleComponent';
import moment from 'moment';




export default function Chart(chartData) {
  const theme = useTheme();
  // Generate Collection Data
function createData(date, volume) {
  return { date, volume };
}

const data = [
  createData(moment(chartData.data[0].collection_date).format("LL"), chartData.data[0].collection_weight_volume),
  createData(moment(chartData.data[1].collection_date).format("LL"), chartData.data[1].collection_weight_volume),
  createData(moment(chartData.data[2].collection_date).format("LL"), chartData.data[2].collection_weight_volume),
  createData(moment(chartData.data[3].collection_date).format("LL"), chartData.data[3].collection_weight_volume),
];
 
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
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}