"use client";

import { useState, useEffect } from 'react';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Database, Search } from 'lucide-react';

export default function LiveAuditStatus({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState(0);
  const stages = [
    { text: "Initiating Live Scan...", icon: <Activity className="w-6 h-6 animate-pulse text-blue-500" /> },
    { text: "Bypassing WAF & Fetching HTML...", icon: <ShieldCheck className="w-6 h-6 text-green-500" /> },
    { text: "Analyzing Tech Stack & SEO...", icon: <Database className="w-6 h-6 text-yellow-500" /> },
    { text: "Synthesizing Pain Points...", icon: <Search className="w-6 h-6 text-purple-500" /> }
  ];

  useEffect(() => {
    if (stage < stages.length) {
      const timer = setTimeout(() => setStage(prev => prev + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const isLoading = stage < stages.length;

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isLoading && (
          <m.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white"
          >
            <m.div 
              key={stage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="p-4 bg-white/5 rounded-full border border-white/10">
                {stages[stage]?.icon || stages[stages.length - 1].icon}
              </div>
              <h2 className="text-2xl font-mono tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                {stages[stage]?.text || "Complete"}
              </h2>
            </m.div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
                <m.div 
                    className="h-full bg-red-500" 
                    initial={{ width: 0 }} 
                    animate={{ width: `${((stage + 1) / (stages.length + 1)) * 100}%` }} 
                    transition={{ duration: 0.8 }}
                />
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}