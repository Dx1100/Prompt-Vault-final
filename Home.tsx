
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutGrid, List, Sparkles } from 'lucide-react';
import { PromptReference, Category } from '../types';
import { CATEGORIES } from '../constants';
import PromptCard from '../components/PromptCard';
import PromptModal from '../components/PromptModal';

interface HomeProps {
  references: PromptReference[];
}

const Home: React.FC<HomeProps> = ({ references }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedRef, setSelectedRef] = useState<PromptReference | null>(null);

  const filteredReferences = useMemo(() => {
    return references.filter(ref => {
      const matchesSearch = ref.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ref.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || ref.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [references, searchQuery, selectedCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      {/* Hero Section */}
      <header className="pb-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
        >
          The Ultimate AI <br /> Prompt Playbook
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          Discover, copy, and remix high-quality AI image prompts from the world's best creators.
        </motion.p>

        {/* Search & Filter Bar */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search prompts, styles, or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-2xl"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <LayoutGrid size={20} className="text-blue-500" />
            Featured Prompts
          </h2>
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
            <button className="p-1.5 bg-white/10 rounded text-white"><LayoutGrid size={16} /></button>
            <button className="p-1.5 text-gray-500 hover:text-white transition-colors"><List size={16} /></button>
          </div>
        </div>

        {filteredReferences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredReferences.map(ref => (
                <PromptCard 
                  key={ref.id} 
                  reference={ref} 
                  onClick={setSelectedRef} 
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">No prompts found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      <PromptModal 
        reference={selectedRef} 
        onClose={() => setSelectedRef(null)} 
      />
    </motion.div>
  );
};

export default Home;
