import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VisualizationPanels = ({ data }) => {
  const scatterOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: 'white' }
      },
      title: {
        display: true,
        text: 'Planet Radius vs Orbital Period',
        color: 'white',
        font: { size: 16 }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Orbital Period (days)',
          color: 'white'
        },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        title: {
          display: true,
          text: 'Planet Radius (Earth radii)',
          color: 'white'
        },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: 'white' }
      },
      title: {
        display: true,
        text: 'Detection Confidence Scores',
        color: 'white',
        font: { size: 16 }
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' },
        max: 100
      },
    },
  };

  const lightCurveData = {
    labels: Array.from({ length: 50 }, (_, i) => i),
    datasets: [
      {
        label: 'Stellar Brightness',
        data: Array.from({ length: 50 }, (_, i) => {
          const base = 1.0;
          const transit = i >= 20 && i <= 25 ? 0.02 : 0;
          const noise = (Math.random() - 0.5) * 0.005;
          return base - transit + noise;
        }),
        borderColor: 'rgba(100, 255, 218, 1)',
        backgroundColor: 'rgba(100, 255, 218, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const lightCurveOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: 'white' }
      },
      title: {
        display: true,
        text: 'Light Curve - Transit Detection',
        color: 'white',
        font: { size: 16 }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (hours)',
          color: 'white'
        },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        title: {
          display: true,
          text: 'Relative Brightness',
          color: 'white'
        },
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
    },
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="chart-container"
      >
        <Scatter data={data.charts.scatterData} options={scatterOptions} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="chart-container"
      >
        <Bar data={data.charts.confidenceData} options={barOptions} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-2 chart-container"
      >
        <Line data={lightCurveData} options={lightCurveOptions} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-2 glass-card p-6"
      >
        <h3 className="text-xl font-orbitron font-bold mb-4 text-white">
          Analysis Summary
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-space-glow mb-2">
              {data.planets.length}
            </div>
            <div className="text-gray-300">Planets Detected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-space-glow mb-2">
              {data.planets.filter(p => p.habitableZone).length}
            </div>
            <div className="text-gray-300">In Habitable Zone</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-space-glow mb-2">
              {Math.round(data.planets.reduce((acc, p) => acc + p.confidence, 0) / data.planets.length * 100)}%
            </div>
            <div className="text-gray-300">Avg. Confidence</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VisualizationPanels;