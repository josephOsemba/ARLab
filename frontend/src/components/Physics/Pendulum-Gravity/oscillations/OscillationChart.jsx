import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const OscillationChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="t_squared"
          label={{
            value: 'T² (s²)',
            position: 'insideBottomRight',
            offset: -10,
          }}
        />
        <YAxis
          label={{ value: 'Length (cm)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="length"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OscillationChart;
