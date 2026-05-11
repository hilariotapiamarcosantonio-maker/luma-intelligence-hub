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
  const report = data.find((r: any) => r.report_metadata.domain_scanned.includes(domain));

  if (!report) {
    notFound();
  }

  const { client_identity, technical_audit, marketing_intelligence, pain_point_synthesis } = report;
  const isCritical = pain_point_synthesis.authority_score < 40;
  
  const baseTraffic = 15000;
  const conversionRateDrop = 0.02;
  const averageTicket = 5000;
  const lostRevenue = Math.round(baseTraffic * conversionRateDrop * averageTicket);

  return (
    <LiveAuditStatus>
      <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-red-500/30 overflow-x-hidden">
        {/* HEADER HERO */}
        <div className="relative pt-20 pb-16 px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-[#050505] to-[#050505] -z-10"></div>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold tracking-widest uppercase mb-4">
              <Activity className="w-4 h-4 animate-pulse" />
              Reporte de Inteligencia Confidencial
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 uppercase">
              Tu Inmobiliaria Está <br className="hidden md:block"/> <span className="text-red-500">Perdiendo Dinero</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Hemos analizado la infraestructura digital de <strong className="text-white">{client_identity.company_name || domain}</strong>.
              Mientras lees esto, prospectos calificados en tu mercado están abandonando tu web para irse con la competencia.
            </p>
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
                      Radiografía de {domain}
                    </h2>
                    <p className="text-sm text-gray-500">Los datos no mienten. Este es el estado real de tu ecosistema de ventas.</p>
                  </div>

                  <div className="p-8 rounded-xl bg-black/60 border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                      <div className="flex items-center justify-between mb-4 relative z-10">
                          <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">Health Score de Conversión</span>
                          <Target className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex items-end gap-3 relative z-10">
                          <span className={`text-7xl font-black tracking-tighter ${isCritical ? 'text-red-500' : 'text-yellow-500'}`}>
                              {pain_point_synthesis.authority_score}
                          </span>
                          <span className="text-2xl text-gray-600 mb-2 font-light">/100</span>
                      </div>
                      {isCritical && <p className="text-xs text-red-400 mt-4 font-medium uppercase tracking-wider relative z-10">ESTADO CRÍTICO: Conversión por el suelo.</p>}
                  </div>

                  <div className="p-8 rounded-xl bg-red-950/20 border border-red-900/50 relative overflow-hidden shadow-[inset_0_0_20px_rgba(220,38,38,0.1)]">
                      <div className="absolute -right-4 -bottom-4 opacity-10"><TrendingDown className="w-48 h-48 text-red-500" /></div>
                      <div className="relative z-10">
                          <h3 className="text-red-500 text-sm font-black tracking-widest uppercase mb-3 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              Fuga de Capital Mensual Estimada
                          </h3>
                          <p className="text-5xl font-black text-white mb-2 tracking-tighter">
                              ${lostRevenue.toLocaleString()} <span className="text-lg text-red-500/50 font-sans font-light">USD</span>
                          </p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                              Cálculo basado en una pérdida del 2% de conversión sobre {baseTraffic.toLocaleString()} visitas con un ticket promedio de ${averageTicket.toLocaleString()}. <strong>Literalmente estás quemando dinero en publicidad que no convierte.</strong>
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
                  <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-6 rounded-xl border border-red-900/30 md:col-span-2 shadow-[0_4px_30px_rgba(220,38,38,0.05)]">
                      <h3 className="text-xs font-bold text-red-500 flex items-center gap-2 mb-4 uppercase tracking-widest">
                          <ShieldAlert className="w-4 h-4" /> Veredicto Ejecutivo
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pain_point_synthesis.identified_issues?.map((issue: string, i: number) => (
                          <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/5">
                              <div className="mt-0.5 bg-red-500/20 p-1 rounded">
                                  <AlertTriangle className="w-3 h-3 text-red-500" />
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

        {/* THE MAFIA OFFER / CTA SECTION */}
        <div className="border-t border-white/10 bg-[#0a0a0a] relative overflow-hidden py-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto px-8 relative z-10 text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    ¿Listo para dejar de perder ventas?
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    Tener una "web bonita" ya no sirve en 2026. Necesitas una <strong>Máquina de Captación de Leads</strong>. 
                    Reconstruimos tu infraestructura para que sea ultrarrápida, optimizada para móviles y con un embudo de retargeting imparable.
                </p>
                
                <div className="bg-[#111] border border-white/10 p-6 rounded-xl max-w-lg mx-auto mb-8 shadow-2xl">
                    <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-2 flex justify-center items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Nuestra Garantía Irresistible
                    </h3>
                    <p className="text-gray-300 text-sm">
                        Si no duplicamos tu velocidad de carga y reparamos tu sistema de captación en 30 días, <strong>trabajamos gratis</strong>. Cero riesgo para ti.
                    </p>
                </div>

                {/* WHATSAPP CTA BUTTON */}
                <a 
                    href={`https://wa.me/18091234567?text=Hola,%20vi%20el%20análisis%20de%20rendimiento%20para%20mi%20web%20(${domain})%20y%20me%20preocupa%20la%20fuga%20de%20capital.%20Quiero%20agendar%20la%20consultoría%20gratuita.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white px-10 py-5 rounded-full text-lg font-black uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] active:scale-95"
                >
                    Agendar Consultoría Gratuita
                    <Activity className="w-5 h-5 animate-pulse" />
                </a>
                <p className="text-xs text-gray-500 mt-4 uppercase tracking-widest">
                    ⚠️ Solo tomamos 3 clientes nuevos por mes para garantizar resultados.
                </p>
            </div>
        </div>
      </main>
    </LiveAuditStatus>
  );
}