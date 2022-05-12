import  React,{useState} from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Title from './TitleComponent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment';





export default function Chart({chartData,monthData,yearData}) {
 console.log(monthData);
  const theme = useTheme();
  const options = ['Weekly', 'Monthly','Yearly'];
  const [value,setValue] = useState(options[0]);
  // Generate Collection Data
function createData(date, volume) {
  return { date, volume };
}
const data = [];

if(value === options[0] || value === null){
  let temp = [];
  for(let i = 0; i < chartData.length; i++ ){
    temp = chartData[i].week.toString().split('&');
    data.push(createData(moment(temp[0]).format("MMM DD")+" - "+moment(temp[1]).format("MMM DD,YYYY"), chartData[i].weight));
  }
}else if(value === options[1]){
  for(let i = 0; i < monthData.length; i++ ){
    data.push(createData(monthData[i].month, monthData[i].weight));
  }
}else{
  for(let i = 0; i < yearData.length; i++ ){
    data.push(createData(yearData[i].year, yearData[i].weight));
  }
}
  return (
    <React.Fragment>
      <div>
      
       <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        size="small"
        id="combo-box-demo"
        clearOnEscape
        options={options}
        sx={{ width: 190,float:'right'}}
        renderInput={(params) => <TextField {...params} label="Filter Chart Options" />}
      />
      
      <Title style={{margin:'auto'}}>Total Garbage Weight(in tons) Collected - {value !== null ? value : 'Weekly'}</Title>
      </div>
  
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
