
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Plus, Users } from 'lucide-react';
import { COMMUNITY_URL } from '../constants';

interface NavbarProps {
  onAddClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-transform">
            <Sparkles className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter">PROMPT<span className="text-blue-500">VAULT</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Explore</Link>
          <Link to="/community" className={`text-sm font-medium transition-colors ${location.pathname === '/community' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Playbook</Link>
          <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Resources</a>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-full font-bold text-xs hover:bg-blue-600/20 transition-all"
          >
            <Users size={14} />
            Join AI Masters
          </a>
          <button 
            onClick={onAddClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Reference</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
