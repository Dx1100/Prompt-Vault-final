
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { COMMUNITY_URL } from '../constants';

const CommunityPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/20">
            <Users size={14} />
            Join 5,000+ Creators
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
            The AI Masters <br /> <span className="text-blue-500">Community</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Unlock the full potential of generative AI. Get access to exclusive prompt libraries, weekly workshops, and a network of world-class AI artists.
          </p>
          
          <div className="space-y-6 mb-10">
            {[
              { icon: <Zap className="text-yellow-500" />, title: "Weekly Prompt Drops", desc: "Get the latest trending styles before anyone else." },
              { icon: <ShieldCheck className="text-green-500" />, title: "Verified Techniques", desc: "Learn the exact parameters for Midjourney, DALL-E, and Stable Diffusion." },
              { icon: <Globe className="text-blue-500" />, title: "Global Network", desc: "Connect with creators from over 50 countries." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a 
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-lg hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
          >
            Join the Community
            <ArrowRight size={20} />
          </a>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl rounded-full" />
          <div className="relative bg-[#121212] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">AI Masters Playbook</h4>
                <p className="text-gray-500 text-xs">Updated 2 hours ago</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-12 bg-white/5 rounded-xl border border-white/5 animate-pulse" />
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-center">
              <p className="text-blue-400 font-bold text-sm mb-2">Exclusive Content Locked</p>
              <p className="text-gray-500 text-xs">Join the community to unlock the full playbook and resources.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityPage;
