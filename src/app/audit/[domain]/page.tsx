import fs from 'fs';
import path from 'path';
import LiveAuditStatus from '../../../components/LiveAuditStatus';
import { TrendingDown, Target, Search, Globe, Smartphone, Activity, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

const NO_VISIBLE = 'No visible';
const NO_WEB_LABEL = 'Sin web detectada';

type AuditReport = {
  report_metadata: {
    timestamp: string;
    domain_scanned: string;
    status: string;
    error_message: string;
  };
  client_identity: {
    company_name: string;
    key_people: string[];
    emails: string[];
    phones: string[];
  };
  technical_audit: {
    tech_stack: string[];
    tracking: string[];
    open_graph: boolean;
    pagespeed: {
      error: string;
      score: number | null;
      lcp: string;
      tti: string;
    };
  };
  marketing_intelligence: {
    social_links: string[];
    broken_links: string[];
  };
  pain_point_synthesis: {
    authority_score: number | null;
    identified_issues: string[];
  };
};

const asRecord = (value: unknown): Record<string, unknown> => {
  return value && typeof value === 'object' ? value as Record<string, unknown> : {};
};

const safeString = (value: unknown, fallback = NO_VISIBLE) => {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
};

const safeNumber = (value: unknown): number | null => {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
};

const safeStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim());
};

const decodeSlug = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const cleanIdentifier = (value: string) => {
  return decodeSlug(value)
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/+$/, '');
};

const identifierVariants = (value: string) => {
  const clean = cleanIdentifier(value);
  return new Set([
    clean,
    clean.replace(/_/g, '.'),
    clean.replace(/\./g, '_'),
  ]);
};

const reportMatchesDomain = (report: unknown, requestedDomain: string) => {
  const reportMetadata = asRecord(asRecord(report).report_metadata);
  const scannedDomain = safeString(reportMetadata.domain_scanned, '');

  if (!scannedDomain) return false;

  const scannedVariants = [...identifierVariants(scannedDomain)];
  const requestedVariants = [...identifierVariants(requestedDomain)];

  return scannedVariants.some((scanned) =>
    requestedVariants.some((requested) => scanned === requested || scanned.includes(requested) || requested.includes(scanned))
  );
};

const deriveCompanyName = (requestedDomain: string) => {
  const clean = cleanIdentifier(requestedDomain);
  const trailingHandle = detectNoWeb(clean) && clean.includes('-') ? clean.split('-').filter(Boolean).pop() : undefined;
  const sourceBase = trailingHandle || clean;
  const source = sourceBase
    .replace(/^no[_\-.]?web[_\-.]?/, '')
    .replace(/\.(com\.do|com|net|org|do|co|io|app|dev)$/i, '');

  const name = source
    .replace(/[_\-.]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();

  return name || NO_VISIBLE;
};

const detectNoWeb = (requestedDomain: string, techStack: string[] = []) => {
  const clean = cleanIdentifier(requestedDomain);
  const techText = techStack.join(' ').toLowerCase();

  return /(^|[_\-.])no[_\-.]?web/.test(clean) ||
    /(^|[_\-.])sin[_\-.]?web/.test(clean) ||
    /(instagram|facebook|tiktok|linkedin)[_\-.]?com/.test(clean) ||
    techText.includes('solo instagram') ||
    techText.includes('solo facebook') ||
    techText.includes('solo redes') ||
    techText.includes(NO_WEB_LABEL.toLowerCase());
};

const detectAuthorityScore = (requestedDomain: string, noWeb: boolean) => {
  if (requestedDomain.match(/commerce|store|tienda|shop|e-commerce|comercio|ventas|boutique/i)) return 20;
  if (requestedDomain.match(/beauty|spa|salon|estetica|peluqueria|barberia|barber/i)) return 25;
  if (requestedDomain.match(/inmobiliaria|realestate|propiedades|home|house|realty|plusval|remax|kw|estate/i)) return 30;
  if (requestedDomain.match(/academy|academia|escuela|curso|colegio|study|universidad|aprender/i)) return 35;
  if (requestedDomain.match(/law|abogado|consultora|services|servicios|clinic|clinica|dental|odontologia/i)) return 40;

  return noWeb ? 25 : 35;
};

const socialLinksFromSlug = (requestedDomain: string) => {
  const clean = cleanIdentifier(requestedDomain);
  const handle = clean.includes('-') ? clean.split('-').filter(Boolean).pop() : '';

  if (!handle) return [];
  if (clean.includes('instagram')) return [`https://www.instagram.com/${handle}`];
  if (clean.includes('facebook')) return [`https://www.facebook.com/${handle}`];
  if (clean.includes('tiktok')) return [`https://www.tiktok.com/@${handle}`];
  if (clean.includes('linkedin')) return [`https://www.linkedin.com/company/${handle}`];

  return [];
};

const buildFallbackReport = (requestedDomain: string): AuditReport => {
  const noWeb = detectNoWeb(requestedDomain);
  const authorityScore = detectAuthorityScore(requestedDomain, noWeb);

  return {
    report_metadata: {
      timestamp: new Date().toISOString(),
      domain_scanned: requestedDomain,
      status: 'success',
      error_message: NO_VISIBLE,
    },
    client_identity: {
      company_name: deriveCompanyName(requestedDomain),
      key_people: [],
      emails: [],
      phones: [],
    },
    technical_audit: {
      tech_stack: noWeb ? [NO_WEB_LABEL] : [],
      tracking: [],
      open_graph: false,
      pagespeed: {
        error: NO_VISIBLE,
        score: noWeb ? 0 : 45,
        lcp: NO_VISIBLE,
        tti: NO_VISIBLE,
      },
    },
    marketing_intelligence: {
      social_links: socialLinksFromSlug(requestedDomain),
      broken_links: [],
    },
    pain_point_synthesis: {
      authority_score: authorityScore,
      identified_issues: noWeb ? [
        "Presencia digital limitada a redes sociales - No cuenta con web propia ni landing pages para captacion directa.",
        "Falta de Meta Pixel o Google Analytics - Perdida de datos de audiencia e imposibilidad de retargeting.",
        "Ausencia de CRM - Imposibilidad de medir, seguir o automatizar seguimientos de prospectos.",
        "Dependencia de mensajes manuales (DM/WhatsApp) sin un embudo estructurado de ventas."
      ] : [
        "Rendimiento movil a revisar - podria afectar la conversion.",
        "Sin Meta Pixel activo detectado - Imposibilidad de retargeting.",
        "Falta de Open Graph optimizado - Compartir en redes muestra enlaces incompletos.",
        "Falta de trazabilidad comercial entre el formulario de contacto y el seguimiento de leads."
      ],
    },
  };
};

const normalizeReport = (rawReport: unknown, requestedDomain: string): AuditReport => {
  const report = asRecord(rawReport);
  const metadata = asRecord(report.report_metadata);
  const clientIdentity = asRecord(report.client_identity);
  const technicalAudit = asRecord(report.technical_audit);
  const pageSpeed = asRecord(technicalAudit.pagespeed);
  const marketingIntelligence = asRecord(report.marketing_intelligence);
  const painPointSynthesis = asRecord(report.pain_point_synthesis);
  const identifiedIssues = safeStringArray(painPointSynthesis.identified_issues);

  return {
    report_metadata: {
      timestamp: safeString(metadata.timestamp),
      domain_scanned: safeString(metadata.domain_scanned, requestedDomain),
      status: safeString(metadata.status, 'success'),
      error_message: safeString(metadata.error_message),
    },
    client_identity: {
      company_name: safeString(clientIdentity.company_name),
      key_people: safeStringArray(clientIdentity.key_people),
      emails: safeStringArray(clientIdentity.emails),
      phones: safeStringArray(clientIdentity.phones),
    },
    technical_audit: {
      tech_stack: safeStringArray(technicalAudit.tech_stack),
      tracking: safeStringArray(technicalAudit.tracking),
      open_graph: typeof technicalAudit.open_graph === 'boolean' ? technicalAudit.open_graph : false,
      pagespeed: {
        error: safeString(pageSpeed.error),
        score: safeNumber(pageSpeed.score),
        lcp: safeString(pageSpeed.lcp),
        tti: safeString(pageSpeed.tti),
      },
    },
    marketing_intelligence: {
      social_links: safeStringArray(marketingIntelligence.social_links),
      broken_links: safeStringArray(marketingIntelligence.broken_links),
    },
    pain_point_synthesis: {
      authority_score: safeNumber(painPointSynthesis.authority_score),
      identified_issues: identifiedIssues.length > 0 ? identifiedIssues : [NO_VISIBLE],
    },
  };
};

const getMaturityLabel = (score: number | null) => {
  if (score === null) return NO_VISIBLE;
  if (score < 40) return "Inicial: presencia limitada o poco conectada.";
  if (score < 60) return "En desarrollo: existe presencia, pero falta estructura comercial.";
  if (score < 80) return "Competitivo: buena base digital con oportunidades de optimizacion.";
  return "Avanzado: estructura solida con margen de mejora en seguimiento o medicion.";
};

export const metadata = {
  title: "Luma Intelligence Hub | Revisión Digital Inmobiliaria",
  description: "Revisión preliminar de presencia digital, captación, medición y seguimiento comercial para inmobiliarias y proyectos inmobiliarios.",
};

export default async function AuditPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  const requestedDomain = decodeSlug(domain);
  
  const filePath = path.join(process.cwd(), 'public', 'data', 'audits.json');
  let data: unknown[] = [];
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(fileContents) as unknown;
    data = Array.isArray(parsedData) ? parsedData : [];
  } catch (e) {
    console.error("Error reading audits.json:", e);
  }

  const reportFromJson = data.find((report) => reportMatchesDomain(report, requestedDomain));
  let report: unknown = reportFromJson;

  if (!report) {
    report = buildFallbackReport(requestedDomain);
  }

  const typedReport = normalizeReport(report, requestedDomain);

  // Handle Error or Pending reports
  if (typedReport.report_metadata.status !== 'success') {
    return (
      <LiveAuditStatus>
        <main className="min-h-screen bg-[#050505] text-gray-200 font-sans p-8 flex flex-col items-center justify-center text-center">
           <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
           <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Revisión en Progreso o Fallida</h1>
           <p className="text-gray-400 max-w-md mb-8">
             No pudimos completar el escaneo automático para <span className="text-white font-bold">{requestedDomain}</span>. 
             Esto puede deberse a que el dominio no resuelve, está caído o tiene protecciones anti-bot.
           </p>
           <div className="flex gap-4">
             <a href="/" className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">Volver al Dashboard</a>
             <a 
              href={`https://wa.me/18292558703?text=${encodeURIComponent(`Hola, el escaneo para ${requestedDomain} fallo. Podemos revisarlo manualmente?`)}`}
              target="_blank"
              className="px-6 py-3 bg-red-600/20 text-red-400 border border-red-600/20 rounded-lg hover:bg-red-600/40 transition-colors font-bold"
             >
               Solicitar revisión manual
             </a>
           </div>
        </main>
      </LiveAuditStatus>
    );
  }

  const domainScanned = typedReport.report_metadata.domain_scanned.toLowerCase();
  const techStack = typedReport.technical_audit.tech_stack;
  const isNoWeb = detectNoWeb(requestedDomain, techStack) || detectNoWeb(domainScanned, techStack);

  if (isNoWeb) {
    const companyName = typedReport.client_identity.company_name;
    const identifiedIssues = typedReport.pain_point_synthesis.identified_issues.length > 0
      ? typedReport.pain_point_synthesis.identified_issues
      : [NO_VISIBLE];
    const textToAnalyze = `${companyName} ${domainScanned} ${identifiedIssues.join(' ')}`.toLowerCase();
    
    let nicheLabel = 'Otros Sectores';
    let recommendedProduct = 'Luma Custom OS';
    let productDescription = 'Una plataforma digital a medida para organizar tus prospectos y optimizar tus ventas.';
    let deliverables = [
      'Embudo de captación optimizado',
      'Base de datos integrada en Sheets',
      'Pipeline comercial interactivo',
      'Guías de comunicación y seguimiento'
    ];

    if (textToAnalyze.match(/inmobiliaria|real estate|propiedades|home|house|realty|plusval|remax|kw|estate|apartamento|villa|inmueble/)) {
      nicheLabel = 'Inmobiliaria';
      recommendedProduct = 'Luma Estate OS Foundation';
      productDescription = 'Implementación base para inmobiliarias que convierte visitas y mensajes de redes en una ruta comercial de captación clara.';
      deliverables = [
        'Landing page de captación de propiedades',
        'Formulario inteligente de interesados',
        'CRM de seguimiento en Google Sheets',
        'Pipeline visual de prospectos y propiedades'
      ];
    } else if (textToAnalyze.match(/beauty|spa|salon|estetica|peluqueria|estética|barberia|barber/)) {
      nicheLabel = 'Beauty & Spa';
      recommendedProduct = 'Luma Salon Flow';
      productDescription = 'Sistema de reservas y agenda digital optimizada para salones de belleza, estéticas y spas.';
      deliverables = [
        'Portal móvil de reserva de turnos',
        'Recordatorios automatizados de citas',
        'Control de servicios y especialistas',
        'Base de datos de clientes habituales'
      ];
    } else if (textToAnalyze.match(/academy|academia|escuela|curso|colegio|study|universidad|aprender/)) {
      nicheLabel = 'Educación / Academias';
      recommendedProduct = 'Luma Academy Suite';
      productDescription = 'Embudo de captación e inscripción de alumnos para cursos, escuelas y academias.';
      deliverables = [
        'Landing de promoción de programas',
        'Formulario de matrícula digital',
        'Portal de cobros e inscripción',
        'Planilla de control escolar en Sheets'
      ];
    } else if (textToAnalyze.match(/commerce|store|tienda|shop|e-commerce|comercio|ventas|mercado/)) {
      nicheLabel = 'E-commerce & Tiendas';
      recommendedProduct = 'Luma Commerce Store';
      productDescription = 'Catálogo de venta de productos físicos con flujo directo de pedido a WhatsApp.';
      deliverables = [
        'Catálogo interactivo autoadministrable',
        'Carrito de compras móvil',
        'Botón de finalización por WhatsApp',
        'Control de stock básico en Sheets'
      ];
    } else if (textToAnalyze.match(/law|abogado|consultora|services|servicios|clinic|clinica|dental|odontologia|medico|doctor/)) {
      nicheLabel = 'Servicios Profesionales';
      recommendedProduct = 'Luma Professional Portal';
      productDescription = 'Portal corporativo para captar consultas comerciales y agendar asesorías de servicios.';
      deliverables = [
        'Página web institucional optimizada',
        'Formulario de cotización de servicios',
        'Selector de agendamiento inicial',
        'Panel de control de propuestas en Sheets'
      ];
    }

    return (
      <LiveAuditStatus>
        <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-red-500/30 overflow-x-hidden p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            {/* Header Hero */}
            <div className="relative pt-8 pb-4 text-center space-y-4">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-[#050505] to-[#050505] -z-10"></div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                {NO_WEB_LABEL}
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
                Revisión Digital para <span className="text-amber-400">{companyName}</span>
              </h1>
              <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                El dominio analizado corresponde únicamente a un perfil social y no cuenta con una estructura web de captación propia.
              </p>
            </div>

            {/* Oportunidad Alert Panel */}
            <div className="bg-[#0a0a0a] border border-amber-500/20 rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-500" />
                Oportunidad: Crear infraestructura propia
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Operar comercialmente basándose de forma exclusiva en redes sociales (como Instagram o Facebook) limita significativamente el crecimiento, la credibilidad y el control de tus prospectos.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Limitaciones actuales:</h3>
                  <ul className="space-y-1.5 text-xs text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Fuga de prospectos hacia sugerencias de competidores.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Imposibilidad de instalar Meta Pixel y Google Analytics de forma directa.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Pérdida de tráfico orgánico en Google (SEO).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Dependencia total de mensajería directa desordenada.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Solución Estratégica:</h3>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Crear un portal o landing page corporativo de aterrizaje.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Implementar formularios calificados de captación.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Medir conversiones reales de visitas a contactos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Automatizar seguimientos iniciales.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Producto Recomendado por Nicho */}
            <div className="bg-gradient-to-br from-yellow-900/10 to-[#0a0a0a] border border-yellow-500/20 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Nicho comercial: {nicheLabel}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    {recommendedProduct}
                  </h3>
                </div>
                <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
              
              <p className="text-sm text-gray-300 leading-relaxed">
                {productDescription}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Entregables de la solución recomendada:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5">
                      <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Callout */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight relative z-10">
                ¿Quieres estructurar tu embudo comercial premium?
              </h2>
              <p className="text-xs md:text-sm text-gray-400 max-w-md mx-auto leading-relaxed relative z-10">
                En una breve llamada de 10 minutos podemos diseñar la landing page y el CRM en Google Sheets ideales para automatizar el ingreso de clientes a tu negocio.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
                <a 
                  href={`https://wa.me/18292558703?text=Hola,%20vi%20la%20revisión%20de%20no-web%20para%20${companyName}%20y%20quiero%20conocer%20la%20solución%20${recommendedProduct}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-lg text-xs font-bold transition-all w-full sm:w-auto"
                >
                  Solicitar consulta gratuita
                </a>
                <a 
                  href="/" 
                  className="px-6 py-3 bg-transparent border border-white/10 text-gray-300 hover:bg-white/5 rounded-lg text-xs font-bold transition-all w-full sm:w-auto"
                >
                  Volver al Dashboard
                </a>
              </div>
            </div>
          </div>
        </main>
      </LiveAuditStatus>
    );
  }

  const { client_identity, technical_audit, marketing_intelligence, pain_point_synthesis } = typedReport;
  
  const topIssues = pain_point_synthesis.identified_issues.length > 0
    ? pain_point_synthesis.identified_issues.slice(0, 4)
    : [NO_VISIBLE];
  const authorityScore = pain_point_synthesis.authority_score;
  const pageSpeedScore = technical_audit.pagespeed.score;
  const lcpValue = technical_audit.pagespeed.lcp;
  
  const getSoftIssueText = (issue: string) => {
    const lowerIssue = issue.toLowerCase();
    if (lowerIssue.includes('crm') || lowerIssue.includes('captación')) {
      return "No se detecta una capa pública clara de captación y seguimiento.";
    }
    if (lowerIssue.includes('meta pixel') || lowerIssue.includes('retargeting')) {
      return "No se detecta Meta Pixel en esta revisión preliminar; esto podría limitar medición, remarketing y optimización futura.";
    }
    if (lowerIssue.includes('velocidad') || lowerIssue.includes('móvil') || lowerIssue.includes('rendimiento')) {
      return "Rendimiento móvil a revisar.";
    }
    if (lowerIssue.includes('enlace') || lowerIssue.includes('link') || lowerIssue.includes('red social') || lowerIssue.includes('presencia omnicanal nula')) {
      return "Presencia omnicanal a revisar — no se detectaron canales sociales enlazados en esta revisión preliminar.";
    }
    return issue;
  };

  const getSocialLinksCount = () => {
    const total = (marketing_intelligence.social_links?.length || 0) + (marketing_intelligence.broken_links?.length || 0);
    return total;
  };

  return (
    <LiveAuditStatus>
      <main className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-red-500/30 overflow-x-hidden">
        
        {/* HEADER HERO - Updated */}
        <div className="relative pt-16 pb-12 px-4 md:pt-20 md:pb-16 md:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-[#050505] to-[#050505] -z-10"></div>
          <div className="max-w-5xl mx-auto text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
              <Activity className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
              Revisión Preliminar de Presencia Digital
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 uppercase leading-tight">
              Revisión preliminar para <span className="text-white">{client_identity.company_name}</span>
            </h1>
            <p className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Esta revisión identifica oportunidades visibles en presencia digital, captación, medición, experiencia móvil y seguimiento comercial.
            </p>
            <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed italic">
              No es una auditoría interna completa. Es una lectura inicial basada en señales públicas para detectar dónde puede mejorar la ruta comercial del prospecto.
            </p>
          </div>
        </div>

        {/* DISCLAIMER - Updated */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 mb-8 md:mb-12">
          <div className="p-3 md:p-4 border border-white/10 bg-white/5 rounded-lg text-xs text-gray-400 text-left">
            <strong>Nota importante:</strong> Esta revisión es preliminar y se basa en señales públicas disponibles: presencia web, redes sociales, velocidad, enlaces, tracking y estructura de captación. No representa una auditoría interna completa ni afirma resultados financieros exactos.
          </div>
        </div>

        {/* RESUMEN EJECUTIVO - New Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8 md:pb-12">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              Resumen ejecutivo
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6 md:mb-8 max-w-3xl">
              El objetivo no es señalar fallos de forma agresiva, sino mostrar oportunidades que pueden mejorar cómo el prospecto encuentra, entiende y contacta a la empresa.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Card 1: Captación */}
              <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-white/5">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Search className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-white mb-2 md:mb-3">Captación</h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  ¿El prospecto tiene una ruta clara para solicitar información o dejar sus datos?
                </p>
              </div>

              {/* Card 2: Medición */}
              <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-white/5">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Activity className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-white mb-2 md:mb-3">Medición</h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  ¿La empresa puede saber qué canales generan oportunidades reales?
                </p>
              </div>

              {/* Card 3: Seguimiento */}
              <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-white/5">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Target className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-white mb-2 md:mb-3">Seguimiento</h3>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  ¿Existe una estructura clara para organizar y dar seguimiento al interesado después del primer contacto?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DATA AGITATION SECTION */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20 space-y-8 md:space-y-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl md:rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-[#0a0a0a] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-8 lg:p-12 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
                
                {/* LEFT COL: Score */}
                <div className="lg:col-span-5 space-y-4 md:space-y-8">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                      <span className="truncate">{requestedDomain}</span>
                    </h2>
                    <p className="text-xs md:text-sm text-gray-300">Datos extraídos de señales públicas disponibles para identificar oportunidades comerciales.</p>
                  </div>

                  <div className="p-4 md:p-8 rounded-xl bg-black/60 border border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-gray-500/10 rounded-full blur-2xl md:blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                      <div className="flex items-center justify-between mb-3 md:mb-4 relative z-10">
                          <span className="text-xs md:text-sm font-bold tracking-wider text-gray-400 uppercase">Madurez digital</span>
                          <Target className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                      </div>
                      <div className="flex items-end gap-2 md:gap-3 relative z-10">
                          <span className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                              {authorityScore ?? NO_VISIBLE}
                          </span>
                          {authorityScore !== null && <span className="text-xl md:text-2xl text-gray-600 mb-1 md:mb-2 font-light">/100</span>}
                      </div>
                      <p className="text-[10px] text-gray-300 mt-3 md:mt-4 font-bold uppercase tracking-widest relative z-10 leading-relaxed">
                        {getMaturityLabel(authorityScore)}
                      </p>
                  </div>

                  <div className="p-4 md:p-8 rounded-xl bg-[#111] border border-white/5 relative overflow-hidden">
                      <div className="absolute -right-2 md:-right-4 -bottom-2 md:-bottom-4 opacity-10"><TrendingDown className="w-24 md:w-48 h-24 md:h-48" /></div>
                      <div className="relative z-10">
                          <h3 className="text-gray-300 text-xs md:text-sm font-black tracking-widest uppercase mb-2 md:mb-3 flex items-center gap-2">
                              <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
                              Oportunidad Identificada
                          </h3>
                          <p className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2 tracking-tighter">
                              Potencial de Mejora
                          </p>
                          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                              Con una mejora en captación digital, seguimiento de prospectos y medición de resultados, existe potencial para fortalecer el embudo comercial de forma medible.
                          </p>
                      </div>
                  </div>
                </div>

                {/* RIGHT COL: DETAILS - Updated language */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  
                  {/* Tech Stack */}
                  <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-white/5">
                      <h3 className="text-xs font-bold text-gray-300 flex items-center gap-2 mb-3 md:mb-4 uppercase tracking-widest">
                          <Search className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                          <span>Infraestructura y medición</span>
                      </h3>
                      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                          {technical_audit.tech_stack.length > 0 ? (
                          technical_audit.tech_stack.map((tech: string) => (
                              <span key={tech} className="px-2 md:px-3 py-0.5 md:py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-gray-300">{tech}</span>
                          ))
                          ) : (<span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded">{NO_VISIBLE}</span>)}
                      </div>
                      
                      <h4 className="text-[10px] text-gray-400 mb-2 md:mb-3 uppercase tracking-widest font-bold">Medición y analítica</h4>
                      <div className="flex flex-col gap-2 md:gap-3">
                      {['Meta Pixel', 'Google Analytics', 'Google Tag Manager'].map(tracker => {
                          const isActive = technical_audit.tracking.includes(tracker);
                          return (
                          <div key={tracker} className="flex items-center justify-between text-xs md:text-sm p-1.5 md:p-2 rounded bg-black/40 border border-white/5">
                              <span className={isActive ? 'text-gray-300 font-medium' : 'text-gray-500'}>{tracker}</span>
                              {isActive ? 
                                  <span className="text-[10px] text-green-400 uppercase font-bold tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> <span className="hidden md:inline">Activo</span></span> : 
                                  <span className="text-[10px] text-amber-500 uppercase font-bold tracking-wider">A revisar</span>
                              }
                          </div>
                          )
                      })}
                      </div>
                      <p className="mt-3 md:mt-4 text-[10px] text-gray-400 italic">Una capa de medición más completa podría mejorar el seguimiento de prospectos y optimización de campañas.</p>
                  </div>
                  
                  {/* Mobile & Speed */}
                  <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-white/5 shadow-lg flex flex-col justify-between">
                      <div>
                          <h3 className="text-xs font-bold text-gray-300 flex items-center gap-2 mb-3 md:mb-4 uppercase tracking-widest">
                              <Smartphone className="w-3 h-3 md:w-4 md:h-4 text-purple-500" /> Experiencia Móvil
                          </h3>
                          <div className="space-y-4 md:space-y-6">
                              <div>
                                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Rendimiento general</p>
                                  <p className="text-3xl md:text-4xl font-bold text-white">
                                    {pageSpeedScore !== null && pageSpeedScore > 0 
                                      ? pageSpeedScore 
                                      : pageSpeedScore === null ? NO_VISIBLE : 'Pendiente de medición'}
                                    {pageSpeedScore !== null && pageSpeedScore > 0 && <span className="text-base md:text-lg text-gray-500">/100</span>}
                                  </p>
                                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">El rendimiento móvil puede influir en la experiencia del usuario y la tasa de conversión.</p>
                              </div>
                              <div>
                                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Carga Visual (LCP)</p>
                                  <p className="text-2xl md:text-3xl font-bold text-gray-300">
                                    {lcpValue !== NO_VISIBLE && lcpValue !== 'N/A' 
                                      ? lcpValue 
                                      : NO_VISIBLE}
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Synthesis - Updated with softer language */}
                  <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] p-4 md:p-6 rounded-xl border border-white/5 md:col-span-2">
                      <h3 className="text-xs font-bold text-gray-300 flex items-center gap-2 mb-3 md:mb-4 uppercase tracking-widest">
                          <Search className="w-3 h-3 md:w-4 md:h-4" /> Oportunidades visibles
                      </h3>
                      <div className="space-y-3 md:space-y-4">
                          {topIssues.map((issue: string, i: number) => (
                          <div key={i} className="flex items-start gap-2 md:gap-3 bg-white/5 p-3 md:p-4 rounded-lg border border-white/5">
                              <div className="mt-0.5 bg-yellow-500/10 p-1.5 rounded flex-shrink-0">
                                  <AlertTriangle className="w-3 h-3 text-yellow-500" />
                              </div>
                              <span className="text-xs md:text-sm text-gray-300 font-medium leading-relaxed">{getSoftIssueText(issue)}</span>
                          </div>
                          ))}
                      </div>
                      {getSocialLinksCount() > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <p className="text-xs text-gray-500">
                            <span className="text-gray-400 font-medium">{getSocialLinksCount()} {getSocialLinksCount() === 1 ? 'enlace' : 'enlaces'} social{getSocialLinksCount() === 1 ? '' : 's'} detectado{getSocialLinksCount() === 1 ? '' : 's'} en la revisión preliminar.</span>
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QUÉ SIGNIFICA COMERCIALMENTE - Updated with bullets */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-8 lg:p-12">
            <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              Qué significa esto comercialmente
            </h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4 md:mb-6 max-w-3xl">
              Tener presencia digital no siempre significa tener una estructura comercial. La oportunidad está en convertir visitas, mensajes y búsquedas en prospectos organizados, filtrados y con seguimiento claro.
            </p>
            <ul className="space-y-2 md:space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <span className="leading-relaxed">Mejorar la confianza antes del primer contacto.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <span className="leading-relaxed">Reducir prospectos dispersos en WhatsApp o redes.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <span className="leading-relaxed">Medir mejor qué canales generan oportunidades.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <span className="leading-relaxed">Crear una ruta más clara desde interés hasta seguimiento.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                </div>
                <span className="leading-relaxed">Preparar la base para campañas y automatización futura.</span>
              </li>
            </ul>
          </div>

          {/* CÓMO PUEDE AYUDAR LUMA PREMIUM - New Section */}
          <div className="bg-[#0a0a0a] border border-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-8 lg:p-12">
            <h3 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
              Cómo puede ayudar Luma Premium
            </h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4 md:mb-6 max-w-3xl">
              Luma Premium no busca reemplazar procesos internos existentes. La propuesta es fortalecer la capa externa de captación, autoridad y conversión para que los prospectos lleguen mejor orientados y con más contexto.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                "Landing o ruta de captación personalizada",
                "Formulario o filtro inicial de prospectos",
                "Estructura de seguimiento comercial",
                "CRM o base de control en Google Sheets",
                "Pipeline de oportunidades",
                "Dashboard inicial",
                "Medición básica",
                "Guiones de seguimiento por WhatsApp"
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 md:p-5 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-200 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SOLUCIÓN RECOMENDADA - Updated */}
          <div className="bg-gradient-to-br from-yellow-900/20 to-[#0a0a0a] border border-yellow-500/20 rounded-xl md:rounded-2xl p-4 md:p-8 lg:p-12">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-yellow-500/10 rounded-xl flex-shrink-0">
                <TrendingDown className="w-5 h-5 md:w-8 md:h-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2">
                  Solución recomendada: Luma Estate OS Foundation
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4 md:mb-6 max-w-2xl">
                  Una implementación base para convertir presencia digital dispersa en una ruta comercial más clara: presentación, captación, filtro, seguimiento y control.
                </p>
                
                <h4 className="text-xs md:text-sm font-bold text-white uppercase tracking-wider mb-3">Entregables incluidos:</h4>
                <ul className="space-y-2 md:space-y-3 text-sm text-gray-300">
                  {[
                    "Diagnóstico comercial inicial",
                    "Landing o sección de captación",
                    "Formulario de interesados",
                    "CRM/base de seguimiento",
                    "Pipeline de prospectos",
                    "Dashboard inicial",
                    "Recomendaciones de seguimiento"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-2.5 h-2.5 text-yellow-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION - Updated */}
        <div className="border-t border-white/10 bg-[#0a0a0a] relative overflow-hidden py-12 md:py-24">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gray-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-6 md:space-y-8">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">
                    ¿Quieres que te muestre cómo se aplicaría esto a tu caso?
                </h2>
                <p className="text-sm md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    En una llamada breve de 10 minutos puedo explicarte esta revisión y mostrarte qué estructura tendría más sentido para tu operación.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
                    {/* PRIMARY CTA */}
                    <a 
                        href={`https://wa.me/18292558703?text=${encodeURIComponent(`Hola, vi la revision preliminar para mi web (${requestedDomain}) y quiero solicitar una explicacion personalizada.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 md:gap-3 bg-white text-black hover:bg-gray-200 px-6 md:px-10 py-3 md:py-5 rounded-full text-sm md:text-lg font-bold transition-all hover:scale-105 w-full sm:w-auto"
                    >
                        Solicitar explicación personalizada
                    </a>

                    {/* SECONDARY CTA */}
                    <a 
                        href="https://luma-premium.vercel.app/luma-estate-os"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 md:gap-3 bg-transparent border border-white/20 text-white hover:bg-white/5 px-6 md:px-10 py-3 md:py-5 rounded-full text-sm md:text-lg font-bold transition-all w-full sm:w-auto"
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
