"use client";

import React, { useState, useEffect } from 'react';
import { use } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, AlertTriangle, Calculator, DollarSign, 
  TrendingDown, CheckCircle2, ShieldAlert, Zap, ExternalLink, Activity
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import data from '../../../data/diagnostico_luma.json';
import Link from 'next/link';

export default function ProspectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [site, setSite] = useState<any>(null);
  const resolvedParams = use(params);
  
  // Variables Interactivas (Truco de Ventas)
  const [traficoMensual, setTraficoMensual] = useState(5000);
  const [tasaConv, setTasaConv] = useState(0.02); // 2%
  const [valorComision, setValorComision] = useState(5000); // $5,000 por cierre promedio
  
  useEffect(() => {
    // Buscar la empresa por slug
    const decodedSlug = decodeURIComponent(resolvedParams.slug);
    const foundSite = data.find((s: any) => 
      s.empresa.toLowerCase().replace(/[^a-z0-9]/g, '-') === decodedSlug ||
      s.empresa === decodedSlug
    );
    setSite(foundSite);
  }, [resolvedParams.slug]);

  if (!site) {
    return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Cargando Diagnóstico...</div>;
  }

  // Cálculos de Sangrado
  const loadTime = site.tiempo_carga;
  let tasaAbandono = 0.10; // Base 10%
  if (loadTime > 1.5 && loadTime <= 3) tasaAbandono = 0.30;
  if (loadTime > 3 && loadTime <= 5) tasaAbandono = 0.53;
  if (loadTime > 5) tasaAbandono = 0.80;

  const visitantesPerdidos = Math.floor(traficoMensual * tasaAbandono);
  const leadsPerdidos = Math.floor(visitantesPerdidos * tasaConv);
  const dineroEvaporado = leadsPerdidos * valorComision;

  // Datos para la Curva de Abandono
  const chartData = [
    { time: '1s', abandono: 5, actual: loadTime <= 1 ? 5 : null },
    { time: '2s', abandono: 15, actual: loadTime <= 2 && loadTime > 1 ? 15 : null },
    { time: '3s', abandono: 53, actual: loadTime <= 3 && loadTime > 2 ? 53 : null },
    { time: '5s', abandono: 80, actual: loadTime <= 5 && loadTime > 3 ? 80 : null },
    { time: '7s', abandono: 95, actual: loadTime > 5 ? 95 : null },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5] p-8 font-sans selection:bg-[#FFD700] selection:text-black overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header de Navegación */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
          <Link href="/" className="text-neutral-500 hover:text-[#FFD700] transition-colors flex items-center gap-2">
            <ArrowLeft size={20} /> Volver al Centro de Comando
          </Link>
        </motion.div>

        {/* Hero Title */}
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-b border-white/10 pb-8">
          <h1 className="text-sm font-bold tracking-widest text-[#FFD700] uppercase mb-4 flex items-center gap-2">
            <ShieldAlert size={16} /> Diagnóstico Ejecutivo Profundo
          </h1>
          <div className="flex justify-between items-end">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
              {site.empresa}
            </h2>
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full text-sm font-mono border border-white/10">
              Ver Sitio <ExternalLink size={14} />
            </a>
          </div>
        </motion.header>

        {/* Simulador Interactivo de Sangrado (Bleed Calculator) */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-[#0a0a0a] border border-red-500/20 rounded-3xl p-8 relative overflow-hidden group">
            {/* Efecto Alerta */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-[#FFD700]" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-600/5 blur-[100px] rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
              
              {/* Controles de Venta (Izquierda) */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Calculator className="text-[#FFD700]" /> Calculadora de Sangrado
                </h3>
                <p className="text-neutral-400 text-sm">
                  Proyección interactiva basada en métricas estándar. Ajusta los valores para revelar el impacto financiero de tus actuales <strong className="text-red-400">{loadTime}s</strong> de carga.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-2 block">Tráfico Mensual Estimado</label>
                    <input type="number" value={traficoMensual} onChange={(e) => setTraficoMensual(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-[#FFD700]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-2 block">Tasa Conversión</label>
                      <input type="number" step="0.01" value={tasaConv} onChange={(e) => setTasaConv(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-[#FFD700]" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-2 block">Comisión Promedio ($)</label>
                      <input type="number" value={valorComision} onChange={(e) => setValorComision(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-[#FFD700]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* El Golpe Financiero (Derecha) */}
              <div className="flex flex-col justify-center items-center bg-[#111] border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl shadow-red-900/20">
                <h4 className="text-sm font-bold text-red-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                  <TrendingDown size={16} /> Dinero Evaporado Mensualmente
                </h4>
                <p className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-red-600 tracking-tighter mb-4">
                  ${dineroEvaporado.toLocaleString()}
                </p>
                <div className="text-sm text-neutral-400 max-w-xs mx-auto">
                  Por tener un tiempo de carga de <strong className="text-white">{loadTime}s</strong>, pierdes el <strong className="text-red-400">{(tasaAbandono * 100).toFixed(0)}%</strong> de tus visitantes antes de que vean tus propiedades.
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* Gráfico de Abandono & Ad Audit */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Curva de Abandono */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8">
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <Zap size={18} className="text-[#FFD700]" /> Curva de Abandono vs Velocidad
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAbandono" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#666" tick={{fill: '#666', fontSize: 12}} />
                  <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="abandono" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorAbandono)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ad Audit */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <Activity size={18} className="text-[#FFD700]" /> Auditoría de Inversión (Ads)
            </h3>
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-4">
                {site.tracking.Meta_Pixel ? (
                  <CheckCircle2 className="text-green-500 shrink-0 mt-1" />
                ) : (
                  <ShieldAlert className="text-red-500 shrink-0 mt-1" />
                )}
                <div>
                  <h4 className="font-bold text-white mb-1">Estado del Píxel de Meta</h4>
                  <p className="text-sm text-neutral-400">
                    {site.tracking.Meta_Pixel 
                      ? "Píxel detectado. Sin embargo, con un rebote tan alto por velocidad, estás pagando por clics de usuarios que se frustran y no llegan a ver las propiedades." 
                      : "CEGUERA PUBLICITARIA. Estás invirtiendo en Instagram a ciegas. El algoritmo no puede optimizar tus campañas ni hacer retargeting. Dinero quemado."}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-4">
                <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">Invisibilidad SEO</h4>
                  <p className="text-sm text-neutral-400">
                    {site.marketing.meta_description 
                      ? "Meta description presente, pero la carga lenta penaliza drásticamente el posicionamiento en Google." 
                      : "Careces de meta descriptions. Google no sabe de qué trata tu sitio, cediéndole todo el tráfico orgánico a tus competidores."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Propuesta Luma */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-[#111] to-[#050505] border border-[#FFD700]/30 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-black text-white">Detén el Sangrado Hoy.</h2>
            <p className="text-neutral-400">
              La infraestructura es el cuello de botella de tu crecimiento. Como Arquitecto de Soluciones, diseñaré una migración a <strong className="text-white">Next.js + Vercel Edge Networks</strong>, reduciendo tu carga a sub-1 segundo y configurando el ecosistema de tracking nivel enterprise.
            </p>
            <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/18090000000?text=Hola%20Marcos.%20He%20visto%20la%20auditor%C3%ADa%20y%20necesito%20detener%20la%20p%C3%A9rdida%20de%20leads." target="_blank" rel="noopener noreferrer" className="bg-[#FFD700] text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-yellow-400 transition-colors shadow-[0_0_40px_rgba(255,215,0,0.3)]">
                Agendar Refactorización
              </a>
              <span className="text-neutral-500 font-mono text-sm">
                Inversión: Desde $5,000 USD
              </span>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
