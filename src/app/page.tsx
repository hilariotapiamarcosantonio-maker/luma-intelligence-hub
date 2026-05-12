import fs from 'fs';
import path from 'path';
import { ShieldAlert, TrendingDown, Target, Search, Globe, Smartphone, Activity, Link as LinkIcon, AlertTriangle } from 'lucide-react';

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
    <main className="min-h-screen bg-[#050505] text-gray-200 p-4 md:p-8 font-sans selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        {/* Header Cinemático */}
        <header className="border-b border-white/10 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="w-full">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase">
              Luma Intelligence Hub
            </h1>
            <p className="text-gray-400 mt-2 text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400 animate-pulse" />
              Revisión preliminar de presencia digital inmobiliaria
            </p>
            <p className="text-gray-300 mt-4 max-w-2xl text-xs md:text-sm leading-relaxed">
              Un análisis inicial para detectar oportunidades en captación, presentación digital, seguimiento comercial y medición de prospectos en inmobiliarias y proyectos inmobiliarios.
            </p>
          </div>
          <div className="text-right self-end md:self-auto">
            <p className="text-xs text-gray-600 tracking-widest uppercase">Objetivos revisados</p>
            <p className="text-3xl font-mono text-white">{reports.length}</p>
          </div>
        </header>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 text-sm text-gray-400">
          <strong>Aviso importante:</strong> Esta revisión es preliminar y se basa en señales públicas disponibles: presencia web, redes sociales, velocidad, enlaces, tracking y estructura de captación. No representa una auditoría interna completa ni afirma resultados financieros exactos. Su objetivo es identificar oportunidades de mejora comercial.
        </div>

        {/* Mapeo de Reportes */}
        <div className="space-y-16">
          {reports.map((report: unknown, idx: number) => {
            const typedReport = report as any;
            const { client_identity, technical_audit, marketing_intelligence, pain_point_synthesis, report_metadata } = typedReport;
            
            if (report_metadata?.status !== 'success' || !pain_point_synthesis) {
              return (
                <div key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-red-500/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-200 mb-1 truncate">
                        {report_metadata?.domain_scanned || 'Unknown Domain'}
                      </h2>
                      <p className="text-xs text-red-500 uppercase tracking-widest flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {report_metadata?.error_message || 'Dominio pendiente de revisión'}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                      {report_metadata?.domain_scanned && (
                        <>
                          <a 
                            href={`https://${report_metadata.domain_scanned}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs md:text-sm font-medium rounded-lg transition-colors border border-white/5"
                          >
                            <Globe className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="md:hidden">Web</span>
                            <span className="hidden md:inline">Visitar Web</span>
                          </a>
                          <a 
                            href={`/audit/${report_metadata.domain_scanned}`} 
                            target="_blank"
                            className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs md:text-sm font-bold rounded-lg transition-colors border border-red-500/20"
                          >
                            <ShieldAlert className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="md:hidden">Reporte</span>
                            <span className="hidden md:inline">Ver Reporte</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // Variables removidas para copy consultivo (isCritical, lostRevenue, etc.)

return (
              <div key={idx} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl md:rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative bg-[#0a0a0a] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-2xl overflow-hidden">
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-red-500/5 rounded-full blur-2xl md:blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    
                    {/* Columna Izquierda: Identidad y Score */}
                    <div className="lg:col-span-4 space-y-4 md:space-y-8">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 truncate">
                          {client_identity.company_name}
                        </h2>
                        <div className="flex flex-col gap-2 md:gap-3 mt-2">
                          <a href={`https://${typedReport.report_metadata.domain_scanned}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-xs md:text-sm flex items-center gap-1 transition-colors w-fit truncate">
                            <Globe className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                            <span className="truncate">{typedReport.report_metadata.domain_scanned}</span>
                          </a>
                          <a href={`/audit/${typedReport.report_metadata.domain_scanned}`} target="_blank" className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs md:text-sm font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)] border border-red-500/50">
                            <ShieldAlert className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="md:hidden">Reporte</span>
                            <span className="hidden md:inline">Abrir Reporte en Vivo (Para enviar)</span>
                          </a>
                        </div>
                      </div>

                      <div className="p-4 md:p-6 rounded-xl bg-black/40 border border-white/5">
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                          <span className="text-xs md:text-sm font-semibold tracking-wider text-gray-400 uppercase">Madurez digital</span>
                          <Target className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                        </div>
                        <div className="flex items-end gap-2 md:gap-3">
                          <span className="text-4xl md:text-6xl font-black text-white">
                            {pain_point_synthesis.authority_score}
                          </span>
                          <span className="text-lg md:text-xl text-gray-400 mb-1">/100</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-3 md:mt-4 uppercase tracking-wider font-semibold">
                          {pain_point_synthesis.authority_score < 40 ? "Inicial" : 
                           pain_point_synthesis.authority_score < 60 ? "En desarrollo" : 
                           pain_point_synthesis.authority_score < 80 ? "Competitivo" : "Avanzado"}
                        </p>
                      </div>

                      {/* Oportunidad Comercial */}
                      <div className="p-4 md:p-6 rounded-xl bg-gray-900/40 border border-white/5 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10">
                            <TrendingDown className="w-12 h-12 md:w-24 md:h-24" />
                         </div>
                         <h3 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Oportunidad No Aprovechada</h3>
                         <p className="text-xl md:text-2xl font-bold text-white mb-1">
                           Potencial de mejora
                         </p>
                         <p className="text-xs text-gray-400 mt-2">Basado en optimización de conversión y estructuración de embudos comerciales.</p>
                      </div>
                    </div>

                    {/* Columna Derecha: Detalles */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       
                       {/* Tech Stack & Tracking */}
                       <div className="space-y-4 md:space-y-6">
                         <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-white/5">
                            <h3 className="text-xs md:text-sm font-semibold text-gray-300 flex items-center gap-2 mb-3 md:mb-4 uppercase tracking-wider">
                              <Search className="w-3 h-3 md:w-4 md:h-4 text-blue-500" /> Tecnología y medición
                            </h3>
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                              {technical_audit.tech_stack.length > 0 ? (
                                technical_audit.tech_stack.map((tech: string) => (
                                  <span key={tech} className="px-2 md:px-3 py-0.5 md:py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-xs font-medium">
                                    {tech}
                                  </span>
                                ))
                              ) : (
                                <p className="text-xs text-gray-600 italic">Tecnología base no identificada</p>
                              )}
                            </div>
                            
                            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5">
                               <h4 className="text-xs text-gray-400 mb-2 md:mb-3 uppercase tracking-wider">Píxeles y analítica</h4>
                               <div className="flex flex-col gap-1.5 md:gap-2">
                                 {['Meta Pixel', 'Google Analytics', 'Google Tag Manager'].map((tracker: string) => {
                                   const isActive = technical_audit.tracking.includes(tracker);
                                   return (
                                     <div key={tracker} className="flex items-center justify-between text-xs md:text-sm">
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
                         <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-white/5">
                            <h3 className="text-xs md:text-sm font-semibold text-gray-300 flex items-center gap-2 mb-3 md:mb-4 uppercase tracking-wider">
                              <Smartphone className="w-3 h-3 md:w-4 md:h-4 text-purple-500" /> Rendimiento móvil
                            </h3>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                              <div>
                                <p className="text-xs text-gray-400 mb-1">Puntuación de velocidad</p>
                                <p className="text-xl md:text-2xl font-mono text-white">
                                  {technical_audit.pagespeed.score || 'N/A'}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400 mb-1">LCP (Carga visual)</p>
                                <p className="text-xl md:text-2xl font-mono text-white">
                                  {technical_audit.pagespeed.lcp || 'N/A'}
                                </p>
                              </div>
                            </div>
                         </div>
                       </div>

                       {/* Omnichannel & Pain Points */}
                       <div className="space-y-4 md:space-y-6">
                         
                         {/* Redes Sociales */}
                         <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-white/5">
                            <h3 className="text-xs md:text-sm font-semibold text-gray-300 flex items-center gap-2 mb-3 md:mb-4 uppercase tracking-wider">
                              <LinkIcon className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" /> Presencia omnicanal
                            </h3>
                            
                            <div className="space-y-2 md:space-y-3">
                              {marketing_intelligence.social_links.length === 0 && marketing_intelligence.broken_links.length === 0 && (
                                <p className="text-xs md:text-sm text-gray-400 italic">No se detectaron canales sociales enlazados en esta revisión preliminar.</p>
                              )}
                              
                              {/* Links Activos */}
                              {marketing_intelligence.social_links.map((link: string) => {
                                const platformMatch = link.match(/instagram|facebook|linkedin|tiktok|youtube|pinterest|twitter|x\.com/i);
                                const platform = platformMatch ? platformMatch[0] : 'Web';
                                return (
                                  <div key={link} className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-lg bg-green-500/5 border border-green-500/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                                    <span className="text-xs text-gray-300 capitalize w-12 md:w-16 flex-shrink-0">{platform}</span>
                                    <a href={link} className="text-xs text-gray-400 hover:text-green-400 truncate flex-1" title={link}>{link}</a>
                                  </div>
                                )
                              })}

                              {/* Enlaces sin actividad clara */}
                              {marketing_intelligence.broken_links.map((link: string) => {
                                const platformMatch = link.match(/instagram|facebook|linkedin|tiktok|youtube|pinterest|twitter|x\.com/i);
                                const platform = platformMatch ? platformMatch[0] : 'Web';
                                return (
                                  <div key={link} className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-lg bg-gray-500/5 border border-gray-500/20 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gray-500/10 w-0 group-hover:w-full transition-all duration-500"></div>
                                    <AlertTriangle className="w-3 h-3 text-gray-500 z-10 flex-shrink-0" />
                                    <span className="text-xs text-gray-400 capitalize w-12 md:w-16 z-10 flex-shrink-0">{platform}</span>
                                    <span className="text-xs text-gray-600 truncate flex-1 z-10" title={link}>{link}</span>
                                    <span className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 text-[9px] md:text-[10px] font-bold text-gray-500/80 tracking-widest uppercase z-10 text-right leading-tight hidden sm:block">Sin actividad clara</span>
                                  </div>
                                )
                              })}
                            </div>
                         </div>

                         {/* Synthesis */}
                         <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-white/5 h-full">
                            <h3 className="text-xs md:text-sm font-semibold text-gray-300 flex items-center gap-2 mb-3 md:mb-4 uppercase tracking-wider">
                              <Target className="w-3 h-3 md:w-4 md:h-4 text-gray-400" /> Oportunidades encontradas
                            </h3>
                            <ul className="space-y-2 md:space-y-3">
                              {pain_point_synthesis.identified_issues.map((issue: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm">
                                  <span className="text-gray-400 mt-0.5">•</span>
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
