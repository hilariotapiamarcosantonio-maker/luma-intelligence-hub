"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ShieldAlert, Zap, Users, Phone, 
  ExternalLink, CheckCircle2 
} from 'lucide-react';
import data from '../../data/diagnostico_luma.json';
import Link from 'next/link';

// Variantes de animación para la entrada escalonada
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function LumaDashboard() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5] p-8 font-sans selection:bg-[#FFD700] selection:text-black">
      {/* Header Estilo Centro de Comando */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-12 flex justify-between items-end border-b border-white/10 pb-8"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
            LUMA <span className="text-[#FFD700]">DEEP SCANNER</span>
          </h1>
          <p className="text-neutral-500 mt-2 font-mono uppercase tracking-widest text-xs">
            Architect: Marcos Hilario // Infrastructure Audit v1.0
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-[#FFD700] text-sm font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700]"></span>
            </span>
            SISTEMA ACTIVO
          </div>
        </div>
      </motion.header>

      {/* Grid de Prospectos */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {data.map((site: any, idx: number) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -5, borderColor: "rgba(255, 215, 0, 0.4)" }}
            className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Indicador de Riesgo */}
            <div className={`absolute top-0 left-0 w-1 h-full ${
              site.tiempo_carga > 3 ? 'bg-red-600' : 'bg-[#FFD700]'
            }`} />

            <div className="flex justify-between items-start mb-6">
              <Link href={`/${site.empresa.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="hover:text-[#FFD700] transition-colors z-10">
                <h3 className="text-xl font-bold truncate max-w-[200px]">{site.empresa}</h3>
              </Link>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-[#FFD700] transition-colors z-10">
                <ExternalLink size={18} />
              </a>
            </div>

            {/* Métricas Críticas */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500 flex items-center gap-2">
                  <Zap size={14} /> VELOCIDAD DE CARGA
                </span>
                <span className={`font-mono font-bold ${site.tiempo_carga > 3 ? 'text-red-500' : 'text-green-500'}`}>
                  {site.tiempo_carga}s
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500 flex items-center gap-2">
                  <Activity size={14} /> META PIXEL
                </span>
                {site.tracking.Meta_Pixel ? (
                  <CheckCircle2 size={16} className="text-green-500" />
                ) : (
                  <ShieldAlert size={16} className="text-red-500 animate-pulse" />
                )}
              </div>
            </div>

            {/* Lead Intelligence Hub */}
            <div className="border-t border-white/5 pt-4 space-y-3">
              <p className="text-[10px] font-bold text-neutral-600 tracking-widest uppercase">Lead Intelligence</p>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Users size={14} className="text-[#FFD700]" />
                <span className="truncate">{site.lead_data?.nombre_contacto?.[0] || "Analizando Agente..."}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Phone size={14} className="text-[#FFD700]" />
                <span>{site.lead_data?.telefono?.[0] || "No detectado"}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {site.tecnologia.map((tech: string, i: number) => (
                  <span key={i} className="text-[9px] px-2 py-1 bg-white/5 rounded-full border border-white/10 text-neutral-400 uppercase tracking-tighter">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Efecto Glow de Fondo */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#FFD700]/5 blur-[80px] rounded-full group-hover:bg-[#FFD700]/10 transition-all duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}