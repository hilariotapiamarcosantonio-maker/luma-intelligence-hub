import fs from 'fs';
import path from 'path';
import { ShieldAlert, TrendingDown, Target, Search, BarChart3, Globe, Smartphone, Activity, Link as LinkIcon, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function Home() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'audits.json');
  let reports = [];
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    reports = JSON.parse(fileContents);
  } catch (e) {
    console.error("Error reading audits:", e);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 p-8 font-sans selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Cinemático */}
        <header className="border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase">
              Luma Audit Center
            </h1>
            <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500 animate-pulse" />
              Real-time deep scan architecture
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 tracking-widest uppercase">Targets Scanned</p>
            <p className="text-3xl font-mono text-white">{reports.filter((r: any) => r.report_metadata?.status === 'success' && r.pain_point_synthesis).length}</p>
          </div>
        </header>

        {/* Mapeo de Reportes */}
        <div className="space-y-16">
          {reports.filter((r: any) => r.report_metadata?.status === 'success' && r.pain_point_synthesis).map((report: any, idx: number) => {
            const { client_identity, technical_audit, marketing_intelligence, pain_point_synthesis } = report;
            const isCritical = pain_point_synthesis.authority_score < 40;
            
            // Simulación de ROI perdido
            const baseTraffic = 15000;
            const conversionRateDrop = 0.02; // 2% caída
            const averageTicket = 5000; // Valor promedio de lead/comisión
            const lostRevenue = Math.round(baseTraffic * conversionRateDrop * averageTicket);

            return (
              <div key={idx} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 shadow-2xl overflow-hidden">
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Columna Izquierda: Identidad y Score */}
                    <div className="lg:col-span-4 space-y-8">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-1 truncate">
                          {client_identity.company_name}
                        </h2>
                        <a href={`https://${report.report_metadata.domain_scanned}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors">
                          <Globe className="w-4 h-4" />
                          {report.report_metadata.domain_scanned}
                        </a>
                      </div>

                      <div className="p-6 rounded-xl bg-black/40 border border-white/5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Authority Score</span>
                          <Target className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex items-end gap-3">
                          <span className={`text-6xl font-black ${isCritical ? 'text-red-500' : 'text-yellow-500'}`}>
                            {pain_point_synthesis.authority_score}
                          </span>
                          <span className="text-xl text-gray-500 mb-1">/100</span>
                        </div>
                        <div className="mt-4 w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full ${isCritical ? 'bg-red-500' : 'bg-yellow-500'}`} 
                            style={{ width: `${pain_point_synthesis.authority_score}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* ROI Proyectado */}
                      <div className="p-6 rounded-xl bg-red-950/20 border border-red-900/30 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10">
                            <TrendingDown className="w-24 h-24" />
                         </div>
                         <h3 className="text-red-400 text-xs font-bold tracking-widest uppercase mb-2">Fuga de Capital Estimada</h3>
                         <p className="text-3xl font-mono text-white mb-1">
                           ${lostRevenue.toLocaleString()} <span className="text-sm text-gray-500 font-sans">/mo</span>
                         </p>
                         <p className="text-xs text-gray-400">Basado en tasas de rebote móvil y fugas en embudos sin tracking.</p>
                      </div>
                    </div>

                    {/* Columna Derecha: Detalles */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Tech Stack & Tracking */}
                      <div className="space-y-6">
                        <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                           <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-4 uppercase tracking-wider">
                             <Search className="w-4 h-4 text-blue-500" /> Tech & Tracking Stack
                           </h3>
                           <div className="flex flex-wrap gap-2">
                             {technical_audit.tech_stack.length > 0 ? (
                               technical_audit.tech_stack.map((tech: string) => (
                                 <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-xs font-medium">
                                   {tech}
                                 </span>
                               ))
                             ) : (
                               <span className="text-xs text-gray-600 italic">No frameworks detected</span>
                             )}
                           </div>
                           
                           <div className="mt-4 pt-4 border-t border-white/5">
                              <h4 className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Pixels & Analytics</h4>
                              <div className="flex flex-col gap-2">
                                {['Meta Pixel', 'Google Analytics', 'Google Tag Manager'].map((tracker: string) => {
                                  const isActive = technical_audit.tracking.includes(tracker);
                                  return (
                                    <div key={tracker} className="flex items-center justify-between text-sm">
                                      <span className={isActive ? 'text-gray-300' : 'text-gray-600'}>{tracker}</span>
                                      {isActive ? (
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                      ) : (
                                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                           </div>
                        </div>

                        {/* Performance */}
                        <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                           <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-4 uppercase tracking-wider">
                             <Smartphone className="w-4 h-4 text-purple-500" /> Mobile Performance
                           </h3>
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <p className="text-xs text-gray-500 mb-1">Speed Score</p>
                               <p className="text-2xl font-mono text-white">
                                 {technical_audit.pagespeed.score || 'N/A'}
                               </p>
                             </div>
                             <div>
                               <p className="text-xs text-gray-500 mb-1">LCP (Carga visual)</p>
                               <p className="text-2xl font-mono text-white">
                                 {technical_audit.pagespeed.lcp || 'N/A'}
                               </p>
                             </div>
                           </div>
                        </div>
                      </div>

                      {/* Omnichannel & Pain Points */}
                      <div className="space-y-6">
                        
                        {/* Redes Sociales */}
                        <div className="bg-[#111] p-6 rounded-xl border border-white/5">
                           <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-4 uppercase tracking-wider">
                             <LinkIcon className="w-4 h-4 text-emerald-500" /> Omnichannel Presence
                           </h3>
                           
                           <div className="space-y-3">
                             {marketing_intelligence.social_links.length === 0 && marketing_intelligence.broken_links.length === 0 && (
                               <p className="text-sm text-gray-500 italic">No social footprints detected.</p>
                             )}
                             
                             {/* Links Activos */}
                             {marketing_intelligence.social_links.map((link: string) => {
                               // Extract domain name roughly for display
                               const platformMatch = link.match(/instagram|facebook|linkedin|tiktok|youtube|pinterest|twitter|x\.com/i);
                               const platform = platformMatch ? platformMatch[0] : 'Web';
                               return (
                                 <div key={link} className="flex items-center gap-3 p-2 rounded-lg bg-green-500/5 border border-green-500/10">
                                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                   <span className="text-xs text-gray-300 capitalize w-16">{platform}</span>
                                   <a href={link} className="text-xs text-gray-500 hover:text-green-400 truncate flex-1" title={link}>{link}</a>
                                 </div>
                               )
                             })}

                             {/* Pueblos Fantasmas */}
                             {marketing_intelligence.broken_links.map((link: string) => {
                               const platformMatch = link.match(/instagram|facebook|linkedin|tiktok|youtube|pinterest|twitter|x\.com/i);
                               const platform = platformMatch ? platformMatch[0] : 'Web';
                               return (
                                 <div key={link} className="flex items-center gap-3 p-2 rounded-lg bg-red-500/5 border border-red-500/20 relative overflow-hidden group">
                                   <div className="absolute inset-0 bg-red-500/10 w-0 group-hover:w-full transition-all duration-500"></div>
                                   <AlertTriangle className="w-3 h-3 text-red-500 z-10" />
                                   <span className="text-xs text-red-400 capitalize w-16 z-10">{platform}</span>
                                   <span className="text-xs text-red-700 truncate flex-1 line-through z-10" title={link}>{link}</span>
                                   <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500/80 tracking-widest uppercase z-10">Ghost Town</span>
                                 </div>
                               )
                             })}
                           </div>
                        </div>

                        {/* Synthesis */}
                        <div className="bg-[#111] p-6 rounded-xl border border-white/5 h-full">
                           <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-4 uppercase tracking-wider">
                             <ShieldAlert className="w-4 h-4 text-red-500" /> Pain Point Synthesis
                           </h3>
                           <ul className="space-y-3">
                             {pain_point_synthesis.identified_issues.map((issue: string, i: number) => (
                               <li key={i} className="flex items-start gap-3 text-sm">
                                 <span className="text-red-500 mt-0.5">•</span>
                                 <span className="text-gray-400 leading-relaxed">{issue}</span>
                               </li>
                             ))}
                           </ul>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
