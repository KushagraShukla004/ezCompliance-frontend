import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import { mockPieData as data } from '../../data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  return <Pie data={data} />;
};

export default PieChart;
