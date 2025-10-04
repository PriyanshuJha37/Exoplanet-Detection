import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Play, Filter, Search, ArrowLeft } from 'lucide-react';
import DataUpload from './DataUpload';
import VisualizationPanels from './VisualizationPanels';
import ExoplanetCards from './ExoplanetCards';
import ExplainabilitySection from './ExplainabilitySection';

const Dashboard = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [filters, setFilters] = useState({
    minConfidence: 0,
    maxOrbitalPeriod: 1000,
    habitableZone: false,
    starType: 'all'
  });

  const tabs = [
    { id: 'upload', label: 'Data Input', icon: Upload },
    { id: 'visualize', label: 'Visualizations', icon: Play },
    { id: 'planets', label: 'Exoplanets', icon: Search },
    { id: 'explain', label: 'AI Insights', icon: Filter }
  ];

  const handleAnalysis = async (data) => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisData({
        planets: [
          {
            id: 1,
            name: 'Kepler-442b',
            radius: 1.34,
            orbitalPeriod: 112.3,
            confidence: 0.94,
            habitableZone: true,
            starType: 'K-dwarf',
            temperature: 233,
            distance: 1206
          },
          {
            id: 2,
            name: 'TOI-715b',
            radius: 1.55,
            orbitalPeriod: 19.3,
            confidence: 0.87,
            habitableZone: false,
            starType: 'M-dwarf',
            temperature: 347,
            distance: 137
          },
          {
            id: 3,
            name: 'K2-18b',
            radius: 2.23,
            orbitalPeriod: 33.0,
            confidence: 0.91,
            habitableZone: true,
            starType: 'M-dwarf',
            temperature: 279,
            distance: 124
          }
        ],
        charts: {
          scatterData: {
            datasets: [{
              label: 'Detected Exoplanets',
              data: [
                { x: 112.3, y: 1.34 },
                { x: 19.3, y: 1.55 },
                { x: 33.0, y: 2.23 }
              ],
              backgroundColor: 'rgba(100, 255, 218, 0.6)',
              borderColor: 'rgba(100, 255, 218, 1)',
            }]
          },
          confidenceData: {
            labels: ['Kepler-442b', 'TOI-715b', 'K2-18b'],
            datasets: [{
              label: 'Detection Confidence',
              data: [94, 87, 91],
              backgroundColor: [
                'rgba(100, 255, 218, 0.8)',
                'rgba(138, 43, 226, 0.8)',
                'rgba(30, 144, 255, 0.8)'
              ]
            }]
          }
        },
        featureImportance: [
          { feature: 'Transit Depth', importance: 0.35 },
          { feature: 'Orbital Period', importance: 0.28 },
          { feature: 'Transit Duration', importance: 0.22 },
          { feature: 'Stellar Magnitude', importance: 0.15 }
        ]
      });
      setIsAnalyzing(false);
      setActiveTab('visualize');
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              className="glass-card p-3 rounded-full hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-6 h-6 text-space-glow" />
            </motion.button>
            <h1 className="text-4xl font-orbitron font-bold text-white">
              Mission Control Dashboard
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-2 rounded-full mb-8 inline-flex"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-space-glow text-black font-semibold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'upload' && (
            <DataUpload onAnalysis={handleAnalysis} isAnalyzing={isAnalyzing} />
          )}
          {activeTab === 'visualize' && analysisData && (
            <VisualizationPanels data={analysisData} />
          )}
          {activeTab === 'planets' && analysisData && (
            <ExoplanetCards 
              planets={analysisData.planets} 
              filters={filters}
              onFiltersChange={setFilters}
            />
          )}
          {activeTab === 'explain' && analysisData && (
            <ExplainabilitySection data={analysisData.featureImportance} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;