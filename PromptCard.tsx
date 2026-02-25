
import React, { useState } from 'react';
import { Copy, Check, ExternalLink, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { PromptReference } from '../types';
import confetti from 'canvas-confetti';

interface PromptCardProps {
  reference: PromptReference;
  onClick: (ref: PromptReference) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ reference, onClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(reference.prompt);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#3b82f6', '#8b5cf6', '#ec4899']
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer shadow-xl"
      onClick={() => onClick(reference)}
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={reference.imageUrl}
          alt={reference.category}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleCopy}
            className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors border border-white/10"
          >
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-white" />}
          </button>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-blue-600/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider rounded-md text-white">
            {reference.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-300 line-clamp-2 mb-3 group-hover:text-white transition-colors">
          {reference.prompt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User size={12} className="text-white" />
            </div>
            <span className="text-xs text-gray-500 font-medium">@{reference.author}</span>
          </div>
          <ExternalLink size={14} className="text-gray-500" />
        </div>
      </div>
    </motion.div>
  );
};

export default PromptCard;
