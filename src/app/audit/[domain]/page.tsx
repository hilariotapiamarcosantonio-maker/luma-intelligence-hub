import fs from 'fs';
import path from 'path';
import LiveAuditStatus from '../../../components/LiveAuditStatus';
import { ShieldAlert, TrendingDown, Target, Search, Globe, Smartphone, Activity, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function AuditPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  
  // Load data
  const filePath = path.join(process.cwd(), 'public', 'data', 'audits.json');
  let data = [];
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContents);
  } catch (e) {
    console.error("Error reading audits.json:", e);
    return <div>Error loading audit data.</div>;
  }

  // Find the specific report
  const report = data.find((r: unknown) => {
    const typedR = r as any;
    return typedR.report_metadata.domain_scanned.includes(domain);
  });

  if (!report) {
    notFound();
  }

  const { client_identity, technical_audit, marketing_intelligence, pain_point_synthesis } = report as any;
  
  const baseTraffic = 15000;
  const averageTicket = 5000;

  return (
    <LiveAuditStatus>
      <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-red-500/30 overflow-x-hidden">
        {/* HEADER HERO */}
        <div className="relative pt-20 pb-16 px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-[#050505] to-[#050505] -z-10"></div>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 text-xs font-bold tracking-widest uppercase mb-4">
              <Activity className="w-4 h-4 animate-pulse" />
              Revisión Preliminar de Presencia Digital
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 uppercase">
              Oportunidades de Captación <br className="hidden md:block"/> <span className="text-gray-400">No Aprovechadas</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Hemos realizado una revisión preliminar de la presencia digital de <strong className="text-white">{client_identity.company_name || domain}</strong>.
              El objetivo es identificar oportunidades de mejora en presentación, seguimiento comercial y medición de prospectos.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-8 mb-12">
          <div className="p-4 border border-white/10 bg-white/5 rounded-lg text-xs text-gray-400 text-left">
            <strong>Nota importante:</strong> Esta revisión es preliminar y se basa en señales públicas disponibles: presencia web, redes sociales, velocidad, enlaces, tracking y estructura de captación. No representa una auditoría interna completa ni afirma resultados financieros exactos. Su objetivo es identificar oportunidades de mejora comercial.
          </div>
        </div>

        {/* DATA AGITATION SECTION */}
        <div className="max-w-7xl mx-auto px-8 pb-20 space-y-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* LEFT COL: BIG NUMBERS */}
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-gray-500" />
                      Análisis Preliminar de {domain}
                    </h2>
                    <p className="text-sm text-gray-500">Datos extraídos de señales públicas disponibles para identificar oportunidades comerciales.</p>
                  </div>

                  <div className="p-8 rounded-xl bg-black/60 border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                      <div className="flex items-center justify-between mb-4 relative z-10">
                          <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">Nivel de madurez digital</span>
                          <Target className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex items-end gap-3 relative z-10">
                          <span className="text-7xl font-black tracking-tighter text-white">
                              {pain_point_synthesis.authority_score}
                          </span>
                          <span className="text-2xl text-gray-600 mb-2 font-light">/100</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-4 font-medium uppercase tracking-wider relative z-10">
                        {pain_point_synthesis.authority_score < 40 ? "Inicial: presencia limitada o poco conectada." : 
                         pain_point_synthesis.authority_score < 60 ? "En desarrollo: existe presencia, pero falta estructura comercial." : 
                         pain_point_synthesis.authority_score < 80 ? "Competitivo: buena base digital con oportunidades de optimización." : 
                         "Avanzado: estructura sólida con margen de mejora en seguimiento o medición."}
                      </p>
                  </div>

                  <div className="p-8 rounded-xl bg-[#111] border border-white/5 relative overflow-hidden">
                      <div className="absolute -right-4 -bottom-4 opacity-10"><TrendingDown className="w-48 h-48 text-gray-500" /></div>
                      <div className="relative z-10">
                          <h3 className="text-gray-300 text-sm font-black tracking-widest uppercase mb-3 flex items-center gap-2">
                              <TrendingDown className="w-4 h-4" />
                              Oportunidad Comercial No Aprovechada
                          </h3>
                          <p className="text-4xl font-black text-white mb-2 tracking-tighter">
                              Estimación Potencial
                          </p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                              Un aumento conservador del 2% en conversión sobre {baseTraffic.toLocaleString()} visitas estimadas podría representar múltiples operaciones de ${averageTicket.toLocaleString()} USD al mes que actualmente se pierden por fricciones comerciales.
                          </p>
                      </div>
                  </div>
                </div>

                {/* RIGHT COL: DETAILS */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tech Stack */}
                  <div className="bg-[#111] p-6 rounded-xl border border-white/5 shadow-lg">
                      <h3 className="text-xs font-bold text-gray-400 flex items-center gap-2 mb-4 uppercase tracking-widest">
                          <Search className="w-4 h-4 text-blue-500" /> Infraestructura & Tracking
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                          {technical_audit.tech_stack?.length > 0 ? (
                          technical_audit.tech_stack.map((tech: string) => (
                              <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-gray-300">{tech}</span>
                          ))
                          ) : (<span className="text-xs text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded">Cero infraestructura moderna detectada.</span>)}
                      </div>
                      
                      <h4 className="text-[10px] text-gray-500 mb-3 uppercase tracking-widest font-bold">Diagnóstico de Píxeles</h4>
                      <div className="flex flex-col gap-3">
                      {['Meta Pixel', 'Google Analytics', 'Google Tag Manager'].map(tracker => {
                          const isActive = technical_audit.tracking?.includes(tracker);
                          return (
                          <div key={tracker} className="flex items-center justify-between text-sm p-2 rounded bg-black/40 border border-white/5">
                              <span className={isActive ? 'text-gray-300 font-medium' : 'text-gray-600 line-through'}>{tracker}</span>
                              {isActive ? 
                                  <span className="text-[10px] text-green-400 uppercase font-bold tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Activo</span> : 
                                  <span className="text-[10px] text-red-500 uppercase font-bold tracking-wider">Ausente</span>
                              }
                          </div>
                          )
                      })}
                      </div>
                      <p className="mt-4 text-xs text-gray-500 italic">Si no mides a quién entra, no puedes hacer remarketing. Estás perdiendo hasta el 80% de tus ventas potenciales.</p>
                  </div>
                  
                  {/* Mobile & Speed */}
                  <div className="bg-[#111] p-6 rounded-xl border border-white/5 shadow-lg flex flex-col justify-between">
                      <div>
                          <h3 className="text-xs font-bold text-gray-400 flex items-center gap-2 mb-4 uppercase tracking-widest">
                              <Smartphone className="w-4 h-4 text-purple-500" /> Experiencia Móvil
                          </h3>
                          <div className="space-y-6">
                              <div>
                                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Performance Global</p>
                                  <p className="text-4xl font-black text-white">{technical_audit.pagespeed?.score || 'N/A'}<span className="text-lg text-gray-600">/100</span></p>
                                  <p className="text-xs text-red-400 mt-1">El 53% de los usuarios abandona una web si tarda más de 3 segundos en cargar.</p>
                              </div>
                              <div>
                                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Bloqueo Visual (LCP)</p>
                                  <p className="text-3xl font-black text-gray-300">{technical_audit.pagespeed?.lcp || 'N/A'}</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Synthesis */}
                  <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-6 rounded-xl border border-white/5 md:col-span-2">
                      <h3 className="text-xs font-bold text-gray-300 flex items-center gap-2 mb-4 uppercase tracking-widest">
                          <Search className="w-4 h-4" /> Oportunidades Encontradas
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pain_point_synthesis.identified_issues?.map((issue: string, i: number) => (
                          <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/5">
                              <div className="mt-0.5 bg-gray-500/20 p-1 rounded">
                                  <Target className="w-3 h-3 text-gray-400" />
                              </div>
                              <span className="text-sm text-gray-300 font-medium leading-relaxed">{issue}</span>
                          </div>
                          ))}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="border-t border-white/10 bg-[#0a0a0a] relative overflow-hidden py-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gray-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto px-8 relative z-10 text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Mejora tu Captación Digital
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    Recibe una lectura breve sobre cómo mejorar captación, seguimiento y control comercial de tus prospectos inmobiliarios.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    {/* PRIMARY CTA */}
                    <a 
                        href={`https://wa.me/18292558703?text=Hola,%20vi%20la%20revisión%20preliminar%20para%20mi%20web%20(${domain})%20y%20quiero%20solicitar%20una%20revisión%20personalizada.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-200 px-10 py-5 rounded-full text-lg font-bold transition-all hover:scale-105 w-full sm:w-auto"
                    >
                        Solicitar revisión personalizada
                    </a>

                    {/* SECONDARY CTA */}
                    <a 
                        href="https://luma-premium.vercel.app/luma-estate-os"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white hover:bg-white/5 px-10 py-5 rounded-full text-lg font-bold transition-all w-full sm:w-auto"
                    >
                        Ver propuesta Luma Estate OS
                    </a>
                </div>
            </div>
        </div>
      </main>
    </LiveAuditStatus>
  );
}