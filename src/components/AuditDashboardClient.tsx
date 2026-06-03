"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, AlertTriangle, Phone, Mail,
  Building, Sparkles, BookOpen, ShoppingBag, Briefcase, RefreshCw, X
} from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { motion, AnimatePresence } from 'framer-motion';

export interface AuditReport {
  report_metadata?: {
    domain_scanned?: string;
    status?: string;
    error_message?: string;
    timestamp?: string;
  };
  client_identity?: {
    company_name?: string;
    phones?: string[];
    emails?: string[];
  };
  technical_audit?: {
    tech_stack?: string[];
    tracking?: string[];
  };
  marketing_intelligence?: {
    social_links?: string[];
  };
  pain_point_synthesis?: {
    identified_issues?: string[];
    authority_score?: number | null;
  };
}

interface AuditDashboardClientProps {
  initialReports: AuditReport[];
}

// Helper classification methods
const hasWeb = (report: AuditReport) => {
  const domain = (report.report_metadata?.domain_scanned || '').toLowerCase();
  const techStack = report.technical_audit?.tech_stack || [];
  return !(
    domain.includes('instagram.com-') || 
    domain.includes('facebook.com-') || 
    techStack.some((tech: string) => tech.toLowerCase().includes('solo instagram') || tech.toLowerCase().includes('solo facebook'))
  );
};

const getNiche = (report: AuditReport) => {
  const name = (report.client_identity?.company_name || '').toLowerCase();
  const domain = (report.report_metadata?.domain_scanned || '').toLowerCase();
  const issues = (report.pain_point_synthesis?.identified_issues || []).map((i: string) => i.toLowerCase()).join(' ');
  const text = `${name} ${domain} ${issues}`;

  if (text.match(/inmobiliaria|real estate|propiedades|home|house|realty|plusval|remax|kw|estate|apartamento|villa|inmueble/)) {
    return 'inmobiliaria';
  }
  if (text.match(/beauty|spa|salon|estetica|peluqueria|estética|barberia|barber|estilista|uñas/)) {
    return 'beauty';
  }
  if (text.match(/academy|academia|escuela|curso|colegio|study|universidad|aprender|instituto/)) {
    return 'academia';
  }
  if (text.match(/commerce|store|tienda|shop|e-commerce|comercio|ventas|mercado|boutique/)) {
    return 'commerce';
  }
  if (text.match(/law|abogado|consultora|services|servicios|clinic|clinica|dental|odontologia|medico|doctor|salud/)) {
    return 'professional_services';
  }
  return 'other';
};

const isHighOpportunity = (report: AuditReport) => {
  const score = report.pain_point_synthesis?.authority_score ?? 0;
  const hasWebVal = hasWeb(report);
  return report.report_metadata?.status === 'success' && (score !== null && score < 40 || !hasWebVal);
};

// Contacts detection
const contactData = (report: AuditReport) => {
  const phones = report.client_identity?.phones || [];
  const emails = report.client_identity?.emails || [];
  const socialLinks = report.marketing_intelligence?.social_links || [];
  
  const hasPhone = phones.length > 0;
  const hasEmail = emails.length > 0 && !emails.some((e: string) => e.includes('correo@ejemplo') || e.includes('nombre@ejemplo') || e.includes('correo@dominio'));
  const hasInsta = socialLinks.some((link: string) => link.toLowerCase().includes('instagram.com'));
  
  return { hasPhone, hasEmail, hasInsta };
};

export default function AuditDashboardClient({ initialReports }: AuditDashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [hasWhatsApp, setHasWhatsApp] = useState<boolean | null>(null);
  const [hasInstagramFilter, setHasInstagramFilter] = useState<boolean | null>(null);
  const [hasEmailFilter, setHasEmailFilter] = useState<boolean | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Filter & Search Logic
  const filteredReports = useMemo(() => {
    return initialReports.filter(report => {
      // 1. Category Filter
      if (activeFilter === 'high_opportunity' && !isHighOpportunity(report)) return false;
      if (activeFilter === 'no_web' && hasWeb(report)) return false;
      if (activeFilter === 'success' && report.report_metadata?.status !== 'success') return false;
      if (activeFilter === 'pending' && report.report_metadata?.status === 'success') return false;
      if (activeFilter === 'inmobiliaria' && getNiche(report) !== 'inmobiliaria') return false;
      if (activeFilter === 'beauty' && getNiche(report) !== 'beauty') return false;
      if (activeFilter === 'academia' && getNiche(report) !== 'academia') return false;
      if (activeFilter === 'commerce' && getNiche(report) !== 'commerce') return false;
      if (activeFilter === 'professional_services' && getNiche(report) !== 'professional_services') return false;

      // 2. Contact Quick Filters
      const contacts = contactData(report);
      if (hasWhatsApp === true && !contacts.hasPhone) return false;
      if (hasWhatsApp === false && contacts.hasPhone) return false;
      if (hasInstagramFilter === true && !contacts.hasInsta) return false;
      if (hasInstagramFilter === false && contacts.hasInsta) return false;
      if (hasEmailFilter === true && !contacts.hasEmail) return false;
      if (hasEmailFilter === false && contacts.hasEmail) return false;

      // 3. Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        
        // Match specific score syntax like "<50" or "score 30"
        if (query.startsWith('<')) {
          const num = parseInt(query.substring(1), 10);
          if (!isNaN(num)) {
            const score = report.pain_point_synthesis?.authority_score ?? 0;
            return score < num;
          }
        }
        if (query.startsWith('>')) {
          const num = parseInt(query.substring(1), 10);
          if (!isNaN(num)) {
            const score = report.pain_point_synthesis?.authority_score ?? 0;
            return score > num;
          }
        }

        const name = (report.client_identity?.company_name || '').toLowerCase();
        const domain = (report.report_metadata?.domain_scanned || '').toLowerCase();
        const issues = (report.pain_point_synthesis?.identified_issues || []).map((i: string) => i.toLowerCase()).join(' ');
        const nicheText = getNiche(report);
        const phones = (report.client_identity?.phones || []).join(' ');
        const emails = (report.client_identity?.emails || []).join(' ');
        const scoreStr = String(report.pain_point_synthesis?.authority_score || '');

        // Match common location indicators in names/issues/domains (asturias, campeche, dominicana, punta cana)
        const matchText = `${name} ${domain} ${issues} ${nicheText} ${phones} ${emails} ${scoreStr}`;
        if (!matchText.includes(query)) return false;
      }

      return true;
    });
  }, [initialReports, searchQuery, activeFilter, hasWhatsApp, hasInstagramFilter, hasEmailFilter]);

  const stats = useMemo(() => {
    const total = initialReports.length;
    const highOpp = initialReports.filter(isHighOpportunity).length;
    const noWeb = initialReports.filter(r => !hasWeb(r)).length;
    const success = initialReports.filter(r => r.report_metadata?.status === 'success').length;
    const pending = total - success;
    
    return { total, highOpp, noWeb, success, pending };
  }, [initialReports]);

  const categories = [
    { id: 'all', label: 'Todos', count: stats.total, color: 'border-white/10 text-white hover:bg-white/5' },
    { id: 'high_opportunity', label: 'Alta Oportunidad', count: stats.highOpp, color: 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' },
    { id: 'no_web', label: 'Sin Web', count: stats.noWeb, color: 'border-red-500/30 text-red-400 hover:bg-red-500/10' },
    { id: 'success', label: 'Con Reporte', count: stats.success, color: 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' },
    { id: 'pending', label: 'Pendiente Revisión', count: stats.pending, color: 'border-gray-500/30 text-gray-400 hover:bg-gray-500/10' },
    { id: 'inmobiliaria', label: 'Inmobiliarias', icon: Building, color: 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10' },
    { id: 'beauty', label: 'Beauty & Spa', icon: Sparkles, color: 'border-pink-500/30 text-pink-400 hover:bg-pink-500/10' },
    { id: 'academia', label: 'Academias', icon: BookOpen, color: 'border-violet-500/30 text-violet-400 hover:bg-violet-500/10' },
    { id: 'commerce', label: 'Commerce', icon: ShoppingBag, color: 'border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10' },
    { id: 'professional_services', label: 'Prof. Services', icon: Briefcase, color: 'border-sky-500/30 text-sky-400 hover:bg-sky-500/10' },
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setHasWhatsApp(null);
    setHasInstagramFilter(null);
    setHasEmailFilter(null);
    setVisibleCount(12);
  };

  const getSoftIssueText = (issue: string) => {
    const lowerIssue = issue.toLowerCase();
    if (lowerIssue.includes('crm') || lowerIssue.includes('captación')) {
      return "Falta de embudo digital estructurado para captar prospectos.";
    }
    if (lowerIssue.includes('meta pixel') || lowerIssue.includes('retargeting')) {
      return "Sin Meta Pixel para retargeting.";
    }
    if (lowerIssue.includes('velocidad') || lowerIssue.includes('móvil') || lowerIssue.includes('rendimiento')) {
      return "Rendimiento móvil inestable.";
    }
    if (lowerIssue.includes('enlace') || lowerIssue.includes('link') || lowerIssue.includes('red social') || lowerIssue.includes('presencia omnicanal nula')) {
      return "Redes sociales desvinculadas.";
    }
    return issue;
  };

  const visibleReports = filteredReports.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar por negocio, dominio, nicho, ciudad/zona, score (ej. <40)..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(12);
              }}
              className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Quick Contact Toggles */}
          <div className="flex flex-wrap gap-2 items-center">
            <button 
              onClick={() => {
                setHasWhatsApp(prev => prev === true ? null : true);
                setVisibleCount(12);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                hasWhatsApp === true 
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                  : 'bg-[#111] border-white/5 text-gray-400 hover:border-white/10'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              Con Teléfono
            </button>

            <button 
              onClick={() => {
                setHasInstagramFilter(prev => prev === true ? null : true);
                setVisibleCount(12);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                hasInstagramFilter === true 
                  ? 'bg-pink-500/20 border-pink-500/50 text-pink-400' 
                  : 'bg-[#111] border-white/5 text-gray-400 hover:border-white/10'
              }`}
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              Con Instagram
            </button>

            <button 
              onClick={() => {
                setHasEmailFilter(prev => prev === true ? null : true);
                setVisibleCount(12);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                hasEmailFilter === true 
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                  : 'bg-[#111] border-white/5 text-gray-400 hover:border-white/10'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Con Email
            </button>

            {(searchQuery || activeFilter !== 'all' || hasWhatsApp !== null || hasInstagramFilter !== null || hasEmailFilter !== null) && (
              <button 
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Chips de Categorías */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFilter(cat.id);
                  setVisibleCount(12);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-white text-black border-white' 
                    : cat.color
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {cat.label}
                {cat.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-black/10 text-black' : 'bg-white/10 text-gray-400'}`}>
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resultados Informativos */}
      <div className="flex justify-between items-center px-1">
        <p className="text-xs tracking-wider uppercase text-gray-500 font-bold font-mono">
          Mostrando {Math.min(filteredReports.length, visibleCount)} de {filteredReports.length} auditorías encontradas
        </p>
      </div>

      {/* Grid de Reportes */}
      {filteredReports.length === 0 ? (
        <div className="border border-white/5 rounded-2xl bg-[#0a0a0a] p-12 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-500/80 mx-auto" />
          <h3 className="text-lg font-bold text-white">Ningún reporte coincide</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            No encontramos ninguna auditoría que cumpla con los filtros de búsqueda aplicados. Intenta escribir otro término o restablece los filtros.
          </p>
          <button 
            onClick={handleResetFilters}
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Limpiar todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleReports.map((report, idx) => {
              const { client_identity, pain_point_synthesis, report_metadata } = report;
              const hasWebVal = hasWeb(report);
              const niche = getNiche(report);
              const contacts = contactData(report);
              const isError = report_metadata?.status !== 'success';

              return (
                <motion.div
                  key={report_metadata?.domain_scanned || idx}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="relative group h-full flex flex-col justify-between"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  
                  <div className="relative bg-[#0a0a0a] border border-white/5 hover:border-white/10 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between overflow-hidden transition-all duration-300">
                    
                    {/* Contenido Principal */}
                    <div className="space-y-4">
                      {/* Fila Superior: Badges y Estado */}
                      <div className="flex justify-between items-start gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          niche === 'inmobiliaria' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          niche === 'beauty' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' :
                          niche === 'academia' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                          niche === 'commerce' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                          niche === 'professional_services' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                          'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                        }`}>
                          {niche === 'inmobiliaria' ? 'Inmobiliaria' :
                           niche === 'beauty' ? 'Beauty' :
                           niche === 'academia' ? 'Academia' :
                           niche === 'commerce' ? 'Commerce' :
                           niche === 'professional_services' ? 'Servicios Prof.' :
                           'Otro'}
                        </span>

                        {!hasWebVal && (
                          <span className="px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-[9px] font-bold uppercase tracking-widest">
                            Sin Web
                          </span>
                        )}
                      </div>

                      {/* Título & Dominio */}
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                          {client_identity?.company_name || report_metadata?.domain_scanned || 'Negocio no identificado'}
                        </h3>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {report_metadata?.domain_scanned}
                        </p>
                      </div>

                      {/* Seccion de Error / Pending */}
                      {isError ? (
                        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 text-xs space-y-1.5">
                          <p className="text-red-400 font-bold flex items-center gap-1 uppercase tracking-wide">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Requiere Revisión
                          </p>
                          <p className="text-gray-400 text-[11px] leading-relaxed">
                            {(report_metadata?.error_message || 'Pendiente de escaneo manual.').replace('conexiÃ³n', 'conexión')}
                          </p>
                        </div>
                      ) : (
                        /* Seccion de Score y Oportunidades */
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-2 flex items-center gap-2">
                              <span className="text-2xl font-black text-white font-mono">
                                {pain_point_synthesis?.authority_score ?? 0}
                              </span>
                              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Score</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">
                              Madurez: {
                                (pain_point_synthesis?.authority_score ?? 0) < 40 ? 'Inicial' : 
                                (pain_point_synthesis?.authority_score ?? 0) < 60 ? 'En desarrollo' : 'Avanzado'
                              }
                            </span>
                          </div>

                          {/* Listado de Oportunidades (primeros 2) */}
                          <ul className="space-y-1.5">
                            {(pain_point_synthesis?.identified_issues || []).slice(0, 2).map((issue: string, i: number) => (
                              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-400 leading-relaxed">
                                <span className="text-gray-600 mt-1">•</span>
                                <span className="line-clamp-2">{getSoftIssueText(issue)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Fila Inferior: Canales & Botón de Acción */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                      {/* Canales Disponibles */}
                      <div className="flex gap-2">
                        {contacts.hasPhone && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400" title="WhatsApp Disponible">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {contacts.hasInsta && (
                          <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400" title="Instagram Disponible">
                            <InstagramIcon className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {contacts.hasEmail && (
                          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400" title="Email Disponible">
                            <Mail className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      {/* Abrir Reporte */}
                      {report_metadata?.domain_scanned && (
                        <a
                          href={`/audit/${report_metadata.domain_scanned}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-white hover:text-red-400 border border-white/10 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          Ver Reporte
                        </a>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Cargar Más Botón */}
      {filteredReports.length > visibleCount && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Cargar más auditorías
          </button>
        </div>
      )}
    </div>
  );
}
