
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CommunityPage from './pages/CommunityPage';
import { PromptReference } from './types';
import { INITIAL_DATA } from './constants';
import AddReferenceModal from './components/AddReferenceModal';

const App: React.FC = () => {
  const [references, setReferences] = useState<PromptReference[]>(INITIAL_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const location = useLocation();

  const handleAddReference = (newRef: PromptReference) => {
    setReferences(prev => [newRef, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <Navbar onAddClick={() => setIsAddModalOpen(true)} />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={<Home references={references} />} 
          />
          <Route 
            path="/community" 
            element={<CommunityPage />} 
          />
        </Routes>
      </AnimatePresence>

      <AddReferenceModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddReference}
      />

      {/* Global Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-tighter text-xl">PROMPT<span className="text-blue-500">VAULT</span></span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 PromptVault AI. Built for the AI Masters Community.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
