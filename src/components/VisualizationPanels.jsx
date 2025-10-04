import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VisualizationPanels = ({ data }) => {
  const probabilityData = {
    labels: ['Parameter A', 'Parameter B', 'Parameter C', 'Parameter D', 'Parameter E'],
    datasets: [
      {
        label: 'Probability',
        data: data.probabilities,
        backgroundColor: 'rgba(100, 255, 218, 0.8)',
        borderColor: 'rgba(100, 255, 218, 1)',
        borderWidth: 2,
      },
    ],
  };

  const probabilityOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Exoplanet Classification Probabilities',
        color: 'white',
        font: { size: 18, family: 'Orbitron' }
      },
    },
    scales: {
      x: {
        min: 0,
        max: 1,
        title: {
          display: true,
          text: 'Probability (0 → 1)',
          color: 'white',
          font: { family: 'Inter' }
        },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        title: {
          display: true,
          text: 'Parameters',
          color: 'white',
          font: { family: 'Inter' }
        },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 mb-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-orbitron font-bold text-white mb-4">
            {data.verdict}
          </h2>
          <p className="text-xl text-space-glow font-semibold">
            {data.resultSummary}
          </p>
        </div>
        
        <div className="chart-container">
          <Bar data={probabilityData} options={probabilityOptions} />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Overall Probability: <span className="text-space-glow font-bold">
              {(data.overallProbability * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VisualizationPanels;