
import React, { useState } from 'react';
import { X, Copy, Check, Download, Share2, Sparkles, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PromptReference } from '../types';
import { enhancePrompt } from '../services/geminiService';
import { COMMUNITY_URL } from '../constants';

interface PromptModalProps {
  reference: PromptReference | null;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ reference, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(reference?.prompt || '');

  if (!reference) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnhance = async () => {
    setIsEnhancing(true);
    const enhanced = await enhancePrompt(currentPrompt);
    setCurrentPrompt(enhanced);
    setIsEnhancing(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-[#1a1a1a] w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative">
            <img
              src={reference.imageUrl}
              alt="Reference"
              className="w-full h-full object-contain"
            />
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-600/30">
                  {reference.category}
                </span>
                <h2 className="text-2xl font-bold mt-3 text-white">Prompt Details</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors hidden md:block"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1">
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5 relative group">
                <p className="text-gray-300 leading-relaxed text-lg italic">
                  "{currentPrompt}"
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-all active:scale-95"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy Prompt'}
                  </button>
                  <button 
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Sparkles size={18} className={isEnhancing ? 'animate-spin' : ''} />
                    {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                  </button>
                </div>
              </div>

              {/* Community CTA in Modal */}
              <div className="mt-6 p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Users size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">AI Masters Community</p>
                    <p className="text-[10px] text-gray-400">Get 1,000+ more prompts like this.</p>
                  </div>
                </div>
                <a 
                  href={COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Join Now
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Author</p>
                  <p className="text-white font-medium">@{reference.author}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Created</p>
                  <p className="text-white font-medium">{new Date(reference.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Download size={18} /> Save Image
                </button>
                <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromptModal;
