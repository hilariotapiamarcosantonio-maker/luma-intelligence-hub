'use client';

import React from 'react';
import { 
  Activity, 
  Globe, 
  Bot, 
  ShoppingBag, 
  Building2, 
  Zap, 
  Wrench,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

// Definición de las líneas de producto
interface Solucion {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  features: string[];
  pricing: string;
}

const solucionesData: Solucion[] = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico Digital / Luma Intelligence',
    icon: Activity,
    tagline: 'Auditoría comercial y técnica profunda',
    description: 'Analizamos las señales públicas de tu negocio: rendimiento, experiencia de usuario, tracking de conversión, SEO y flujo comercial para identificar fugas de prospectos.',
    features: [
      'Análisis de velocidad y UX móvil',
      'Auditoría de píxeles y tags de seguimiento',
      'Evaluación de tiempos de respuesta en canales',
      'Informe detallado de puntos críticos'
    ],
    pricing: 'Cortesía comercial / Según alcance'
  },
  {
    id: 'web-premium',
    title: 'Web / Landing Premium',
    icon: Globe,
    tagline: 'Presencia digital cinemática y de alta conversión',
    description: 'Sitios web optimizados, rápidos y diseñados con altos estándares visuales. Pensados para transmitir autoridad, retener visitas y transformarlas en leads calificados.',
    features: [
      'Diseño UX/UI exclusivo a medida',
      'Rendimiento sobresaliente (Core Web Vitals)',
      'Optimización SEO on-page avanzada',
      'Integración nativa con captadores de leads'
    ],
    pricing: 'Desde $1,200 USD / Según alcance'
  },
  {
    id: 'concierge',
    title: 'Concierge Inteligente',
    icon: Bot,
    tagline: 'Asistente IA entrenado para atención 24/7',
    description: 'Automatiza el primer contacto. Un agente inteligente entrenado específicamente con tu información comercial que califica leads y agenda reuniones directamente en tu calendario.',
    features: [
      'Entrenamiento con tu base de conocimientos',
      'Atención multicanal inmediata sin esperas',
      'Calificación activa de prospectos',
      'Agendamiento automatizado'
    ],
    pricing: 'Desde $800 USD / Configuración + mensualidad'
  },
  {
    id: 'commerce-os',
    title: 'Commerce OS / Tienda con CRM',
    icon: ShoppingBag,
    tagline: 'Plataforma unificada para comercio y clientes',
    description: 'Sistema completo para vender productos o servicios físicos y digitales, combinado con un gestor de relaciones (CRM) para automatizar el seguimiento de compras y carritos abandonados.',
    features: [
      'Catálogo interactivo y pasarela de pago segura',
      'CRM integrado para perfiles de cliente',
      'Automatización de embudos post-venta',
      'Panel de analíticas de ventas'
    ],
    pricing: 'Desde $2,500 USD / Según complejidad'
  },
  {
    id: 'real-estate-os',
    title: 'Real Estate OS',
    icon: Building2,
    tagline: 'El sistema comercial definitivo para inmobiliarias',
    description: 'Una infraestructura digital diseñada para promotoras y agencias. Permite gestionar propiedades, captar leads mediante mapas interactivos y sincronizar todo con tu fuerza de ventas.',
    features: [
      'Inventario de propiedades interactivo',
      'Filtros dinámicos por zona, precio y tipología',
      'Fichas de desarrollo de alta conversión',
      'Conexión con CRM de prospección'
    ],
    pricing: 'Desde $3,000 USD / Personalizado'
  },
  {
    id: 'crm-automation',
    title: 'CRM y Sistema Comercial Privado',
    icon: Zap,
    tagline: 'Automatización de embudos y ventas complejas',
    description: 'Diseñamos e implementamos tu flujo comercial privado. Desde la captación en frío hasta el cierre, centralizando todas las conversaciones y automatizando tareas repetitivas.',
    features: [
      'Pipeline visual de ventas personalizado',
      'Automatización de correos y recordatorios',
      'Integraciones con WhatsApp y agendas',
      'Reportes de rendimiento comercial'
    ],
    pricing: 'Según alcance de la infraestructura'
  },
  {
    id: 'mantenimiento',
    title: 'Contenido y Mantenimiento Premium',
    icon: Wrench,
    tagline: 'Tranquilidad operativa y optimización continua',
    description: 'Soporte técnico dedicado, actualizaciones de seguridad, respaldos constantes y optimización periódica de tu ecosistema web para que te concentres solo en vender.',
    features: [
      'Soporte técnico prioritario mensual',
      'Monitoreo de caídas y seguridad activa',
      'Actualizaciones de catálogo e información',
      'Optimización de carga continua'
    ],
    pricing: 'Desde $150 USD / mes'
  }
];

export default function SolucionesPublic() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-amber-500/30">
      
      {/* Navbar Minimalista */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tighter text-white uppercase group-hover:text-amber-500 transition-colors">
              Luma Premium
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider hidden md:inline">
              Sistemas Digitales de Alta Conversión
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,119,6,0.08),transparent_45%)]" />
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" /> Ecosistemas Digitales Premium
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white leading-tight uppercase">
            Soluciones para la <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Captación y Venta
            </span> Digital
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Diseñamos e implementamos infraestructuras comerciales a medida para negocios que necesitan autoridad, velocidad y automatización inteligente en sus procesos de prospección.
          </p>
          <p className="text-xs text-amber-500/80 font-mono tracking-wider uppercase">
            Demos oficiales disponibles para inmobiliarias, belleza/spa, CRM comercial y próximos nichos según nivel de implementación.
          </p>
        </div>
      </section>

      {/* Grid de Soluciones */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
              Nuestras Líneas de Producto
            </h2>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Especialidades preparadas para escalar tu presencia comercial e integrar tus herramientas de ventas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {solucionesData.map((solucion) => {
            const Icon = solucion.icon;
            return (
              <div 
                key={solucion.id}
                className="group relative bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,119,6,0.05)]"
              >
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-white/5 text-gray-300 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {solucion.title}
                    </h3>
                    <p className="text-xs text-amber-500/80 font-mono tracking-wider uppercase">
                      {solucion.tagline}
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                      {solucion.description}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 pt-2 border-t border-white/5">
                    {solucion.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1 h-1 rounded-full bg-amber-500/60" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing / CTA */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="text-gray-500 uppercase tracking-widest text-[9px]">Inversión</p>
                    <p className="text-white font-semibold font-mono mt-0.5">{solucion.pricing}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-white uppercase tracking-tighter">Luma Premium</p>
            <p className="text-xs text-gray-500 mt-1">© {new Date().getFullYear()} Luma Intelligence. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <span className="cursor-default hover:text-white transition-colors">Sistemas Inmobiliarios y de Comercio Premium</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
