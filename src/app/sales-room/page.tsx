'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  ShoppingBag, 
  Sparkles, 
  GraduationCap, 
  Scale, 
  Briefcase, 
  UserCheck, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  ExternalLink,
  ChevronRight,
  Info,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

// Tipado de los datos de cliente
interface Demo {
  name: string;
  url: string;
}

interface ClienteConfig {
  id: string;
  niche: string;
  icon: React.ComponentType<any>;
  problem: string;
  recommendedProduct: string;
  demos: Demo[];
  message: string;
  priceFrom: string;
  whatToSay: string[];
  whatNotToPromise: string[];
  nextStep: string;
}

const clientesData: ClienteConfig[] = [
  {
    id: 'real-estate',
    niche: 'Inmobiliarias / Real Estate',
    icon: Building2,
    problem: 'Tienen portales genéricos lentos u obsoletos, no destacan propiedades premium y pierden el control del lead ya que los portales comerciales tradicionales les roban tráfico sugiriendo a sus competidores. Falta de filtros rápidos y visuales para inversores exigentes.',
    recommendedProduct: 'Real Estate OS + Web Premium',
    demos: [
      { name: 'Luma Estate OS', url: 'https://luma-estate.vercel.app' },
      { name: 'Vista del Río', url: 'https://vista-rio.vercel.app' },
      { name: 'Luma Real Estate Concierge OS', url: 'https://luma-realestate-concierge.vercel.app' },
      { name: 'Luma Intelligence Hub', url: 'https://luma-intelligence.vercel.app' }
    ],
    message: 'Hola [Nombre], estuve analizando la presentación digital de [Nombre Inmobiliaria] y noté que al enviar leads desde portales comerciales se pierde hasta el 40% del interés por falta de un catálogo interactivo propio y rápido. Armamos una estructura demo llamada Luma Estate OS que soluciona esto y permite filtrar propiedades en menos de 2 segundos. Te dejo el acceso para que lo veas: https://luma-estate.vercel.app - ¿Te gustaría que hagamos un diagnóstico rápido de tu web actual para ver si tienes estas fugas de leads?',
    priceFrom: '$3,000 USD (según inventario y nivel de personalización)',
    whatToSay: [
      'Enfocarse en la experiencia del inversor de alto perfil: compra por los ojos.',
      'Un portal lento o sobrecargado espanta al comprador premium internacional.',
      'Mostrar la demo Vista del Río en vivo (cargas ultra-rápidas) comparada con portales tradicionales.'
    ],
    whatNotToPromise: [
      'No prometer sincronización bidireccional automática con CRM obsoletos sin cotizar el desarrollo de API a medida.',
      'No asegurar cierres de ventas inmediatos, sino mejoras drásticas en la captación y filtrado de leads.'
    ],
    nextStep: 'Agendar un Diagnóstico Digital de cortesía de su web inmobiliaria actual.'
  },
  {
    id: 'commerce',
    niche: 'Tiendas / Commerce',
    icon: ShoppingBag,
    problem: 'Altas tasas de abandono de carritos, pasarelas de pago engorrosas en dispositivos móviles, y nula automatización de seguimiento de clientes. Dependencia excesiva de atención manual y caótica por Instagram o WhatsApp sin control de inventario.',
    recommendedProduct: 'Commerce OS / Tienda con CRM',
    demos: [
      { name: 'Luma Commerce OS', url: 'https://luma-commerce.vercel.app' },
      { name: 'Luma Boutique Ivette', url: 'https://boutique-ivette.vercel.app' },
      { name: 'Luma Capilar SaaS', url: 'https://luma-capilar.vercel.app' },
      { name: 'Suvoga OS', url: 'https://suvoga-os.vercel.app' }
    ],
    message: 'Hola [Nombre], vi tu catálogo en Instagram y noté que el proceso de compra requiere muchos pasos manuales, lo que suele causar el abandono del 60% de los compradores en móvil. Diseñamos un sistema Commerce OS que automatiza la venta y la conecta directo con un CRM de seguimiento comercial por WhatsApp. Te comparto una demo funcional: https://luma-commerce.vercel.app - ¿Cómo gestionas hoy el seguimiento de tus carritos abandonados?',
    priceFrom: '$2,500 USD (según volumen de catálogo y pasarelas)',
    whatToSay: [
      'Hacer énfasis en la recompra y la recuperación automatizada de carritos.',
      'La gestión manual por chats satura al equipo y frena el crecimiento.',
      'Mostrar cómo el CRM integrado les da control absoluto del historial de cada cliente.'
    ],
    whatNotToPromise: [
      'No prometer automatización completa de logística física o envíos (despacho) sin usar integraciones validadas.',
      'No prometer compatibilidad nativa con sistemas POS de tiendas físicas muy antiguos sin costo extra de integración.'
    ],
    nextStep: 'Hacer una llamada corta para mostrarles el backend comercial de Luma Commerce OS.'
  },
  {
    id: 'spa',
    niche: 'Belleza / Spa',
    icon: Sparkles,
    problem: 'Pérdida de facturación por inasistencia de clientes sin previo aviso (ausentismo) y saturación telefónica por agendamientos rutinarios que impiden dar una buena atención presencial.',
    recommendedProduct: 'Concierge Inteligente + Web Premium',
    demos: [
      { name: 'Santuario Estética', url: 'https://santuario-estetica.vercel.app' },
      { name: 'Santuario Concierge', url: 'https://santuario-concierge.vercel.app' },
      { name: 'Marcos Portfolio', url: 'https://marcos-portfolio.vercel.app' },
      { name: 'Luma Intelligence Hub', url: 'https://luma-intelligence.vercel.app' }
    ],
    message: 'Hola [Nombre], me encanta la identidad visual de tu Spa. Sin embargo, vi que para agendar una cita hay que enviar un mensaje y esperar respuesta manual. Armamos un Concierge Inteligente que responde de inmediato 24/7 y reserva citas directamente en el calendario del profesional libre. Puedes probarlo aquí: https://santuario-concierge.vercel.app - ¿Te gustaría ver cómo reducir las ausencias de clientes en un 30%?',
    priceFrom: '$1,500 USD (configuración del bot, flujos conversacionales e integración de calendario)',
    whatToSay: [
      'El tiempo que pierde el personal administrativo agendando citas básicas de forma manual es costoso.',
      'Un recordatorio automático por WhatsApp 24 horas antes de la cita reduce el ausentismo radicalmente.',
      'El Concierge atiende fuera del horario de oficina, captando clientes nocturnos.'
    ],
    whatNotToPromise: [
      'No prometer que la IA resolverá consultas médicas complejas o prescribirá tratamientos específicos sin validación humana.',
      'No prometer integraciones con software de reservas muy antiguos que no posean APIs modernas.'
    ],
    nextStep: 'Agendar una demostración en vivo enviándoles un enlace para que chateen con el Concierge de prueba.'
  },
  {
    id: 'cursos',
    niche: 'Academias / Cursos',
    icon: GraduationCap,
    problem: 'Dependencia de plataformas de terceros con altas comisiones de venta (hasta el 10% por alumno) y falta de control sobre la marca, la base de datos de estudiantes y las automatizaciones post-venta.',
    recommendedProduct: 'Web Premium + Sistema Comercial Privado',
    demos: [
      { name: 'Luma Outreach Console', url: 'https://luma-outreach.vercel.app' },
      { name: 'Luma Intelligence Hub', url: 'https://luma-intelligence.vercel.app' },
      { name: 'Concierge OS', url: 'https://concierge-os.vercel.app' },
      { name: 'Admin/CRM demos', url: 'https://luma-admin-crm.vercel.app' }
    ],
    message: 'Hola [Nombre], vi tus cursos. Muchas plataformas se quedan con comisiones de hasta el 10% por alumno. Diseñamos sistemas educativos propios bajo marca privada con pasarela directa a tu banco. Puedes ver cómo se ve una infraestructura comercial de administración aquí: https://luma-admin-crm.vercel.app - ¿Hablamos de cómo ahorrar miles de dólares en comisiones este año?',
    priceFrom: '$2,000 USD (según número de módulos e integraciones con pasarelas)',
    whatToSay: [
      'El activo principal de un infoproductor es la base de datos y retención de sus alumnos.',
      'Eliminar comisiones abusivas de pasarelas intermediarias aumenta el margen neto un 5-15%.',
      'Marca privada eleva la percepción de valor y permite vender tickets más altos.'
    ],
    whatNotToPromise: [
      'No prometer la edición, grabación o producción del contenido audiovisual de los cursos por nuestra cuenta.',
      'No prometer tráfico orgánico masivo de estudiantes por el simple hecho de instalar el portal de cursos.'
    ],
    nextStep: 'Llamada por zoom para mostrar la experiencia de administración de alumnos.'
  },
  {
    id: 'abogados',
    niche: 'Abogados / Alquileres',
    icon: Scale,
    problem: 'Pérdida de horas valiosas filtrando clientes no calificados o respondiendo las mismas preguntas básicas sobre requisitos, honorarios y condiciones antes de una cita formal.',
    recommendedProduct: 'Concierge Inteligente + Diagnóstico',
    demos: [
      { name: 'Santuario Concierge', url: 'https://santuario-concierge.vercel.app' },
      { name: 'Luma Intelligence Hub', url: 'https://luma-intelligence.vercel.app' },
      { name: 'Concierge OS', url: 'https://concierge-os.vercel.app' },
      { name: 'Luma Estate OS', url: 'https://luma-estate.vercel.app' }
    ],
    message: 'Hola [Nombre], analizamos los formularios de tu firma y notamos que no hay un filtro automatizado para clasificar los casos urgentes. Creamos un Concierge OS que atiende al prospecto, evalúa si es un cliente calificado para tu bufete y te entrega el expediente listo para la llamada. Puedes ver cómo funciona un asistente inteligente similar aquí: https://concierge-os.vercel.app - ¿Qué porcentaje de tiempo pierden hoy atendiendo leads no calificados?',
    priceFrom: '$1,200 USD (según la complejidad de las reglas de calificación)',
    whatToSay: [
      'Las horas facturables del abogado son sagradas. La IA pre-califica a las personas interesadas.',
      'La IA entrega un resumen del caso e información básica de contacto lista en su agenda comercial.',
      'La profesionalidad de un asistente inmediato eleva el valor percibido del despacho.'
    ],
    whatNotToPromise: [
      'No prometer que la IA emitirá asesoramiento legal directo o resoluciones jurídicas autónomas.',
      'No garantizar el filtrado perfecto del 100% de consultas mal intencionadas sin reglas estrictas.'
    ],
    nextStep: 'Elaborar un bosquejo rápido del embudo de preguntas de calificación para presentárselo.'
  },
  {
    id: 'b2b',
    niche: 'Empresas B2B',
    icon: Briefcase,
    problem: 'Ciclos de venta largos y frustrantes. Se envían presupuestos y propuestas comerciales en archivos PDF estáticos y no se sabe si se abrieron, quién los leyó o si hay interés real de la junta directiva.',
    recommendedProduct: 'Sistema Comercial Privado + Web Premium',
    demos: [
      { name: 'Luma Outreach Console', url: 'https://luma-outreach.vercel.app' },
      { name: 'Luma Intelligence Hub', url: 'https://luma-intelligence.vercel.app' },
      { name: 'Concierge OS', url: 'https://concierge-os.vercel.app' },
      { name: 'Admin/CRM demos', url: 'https://luma-admin-crm.vercel.app' }
    ],
    message: 'Hola [Nombre], vi tus soluciones de servicios B2B. Los prospectos corporativos exigen respuestas rápidas y presentaciones que denoten máxima profesionalidad. Desarrollamos portales interactivos de propuestas privadas que te avisan al celular exactamente en qué página del presupuesto se detuvo tu cliente. Puedes ver una consola de seguimiento comercial demo aquí: https://luma-outreach.vercel.app - ¿Te interesaría medir el interés real de tus propuestas?',
    priceFrom: '$3,500 USD (según pipelines, integraciones de correo y control de propuestas)',
    whatToSay: [
      'En ventas B2B corporativas, el tiempo de seguimiento y saber quién toma la decisión es crucial.',
      'Saber exactamente cuándo abren el presupuesto te permite llamarlos en caliente para resolver objeciones.',
      'Centralizar el pipeline comercial en un sistema propio disminuye la dependencia de hojas de cálculo rotas.'
    ],
    whatNotToPromise: [
      'No prometer base de datos de leads corporativos lista para prospectar de forma masiva sin un plan de adquisición comercial aprobado.',
      'No prometer que el portal interactivo reemplazará el trabajo humano de relación y cierre del ejecutivo.'
    ],
    nextStep: 'Programar una videollamada para demostrar el sistema de rastreo de propuestas Luma Outreach.'
  },
  {
    id: 'servicios',
    niche: 'Marcas personales / servicios',
    icon: UserCheck,
    problem: 'Baja autoridad digital. Sitios web o perfiles sociales genéricos que no reflejan el verdadero valor de sus servicios, limitando su capacidad para cobrar tarifas premium (alto ticket).',
    recommendedProduct: 'Web / Landing Premium + Diagnóstico',
    demos: [
      { name: 'Marcos Portfolio', url: 'https://marcos-portfolio.vercel.app' },
      { name: 'Vista del Río', url: 'https://vista-rio.vercel.app' },
      { name: 'Luma Boutique Ivette', url: 'https://boutique-ivette.vercel.app' },
      { name: 'Luma Intelligence Hub', url: 'https://luma-intelligence.vercel.app' }
    ],
    message: 'Hola [Nombre], estuve revisando tu perfil. Tu contenido es de gran valor, pero tu enlace de presentación web no refleja ese mismo nivel de autoridad profesional. Diseñamos portafolios interactivos premium que cargan al instante y estructuran tus testimonios e historias de éxito para cerrar clientes de alto ticket. Mira este ejemplo de portafolio interactivo: https://marcos-portfolio.vercel.app - ¿Te gustaría rediseñar tu carta de presentación digital?',
    priceFrom: '$1,200 USD (según secciones, contenido interactivo y testimoniales)',
    whatToSay: [
      'La primera impresión digital define el precio de tu hora o consultoría.',
      'Una web genérica obliga a competir por precio. Una web premium justifica tarifas premium.',
      'Demostrar la velocidad y la excelencia tipográfica de su portafolio frente a la competencia.'
    ],
    whatNotToPromise: [
      'No prometer aumento automático de seguidores en redes o viralidad sin estrategias de pauta o generación de contenido.',
      'No prometer que la web solucionará fallas en el modelo de monetización o servicio del profesional.'
    ],
    nextStep: 'Hacer una videollamada corta para sugerirles 3 cambios clave en el diseño de su web actual.'
  },
  {
    id: 'whatsapp-leads',
    niche: 'Fuga de Leads en WhatsApp',
    icon: MessageSquare,
    problem: 'Saturación en canales de chat. Reciben decenas de mensajes diarios, pero tardan horas en contestar o no hacen seguimiento a prospectos calientes, perdiendo ventas frente a competidores más veloces.',
    recommendedProduct: 'Concierge Inteligente + Sistema Comercial Privado',
    demos: [
      { name: 'Santuario Concierge', url: 'https://santuario-concierge.vercel.app' },
      { name: 'Luma Outreach Console', url: 'https://luma-outreach.vercel.app' },
      { name: 'Concierge OS', url: 'https://concierge-os.vercel.app' },
      { name: 'Luma Intelligence Hub', url: 'https://luma-intelligence.vercel.app' }
    ],
    message: 'Hola [Nombre], noté que en horas pico tardan más de 30 minutos en responder las consultas de WhatsApp de nuevos prospectos. El 50% de las ventas por chat se pierden por no responder en los primeros 5 minutos. Desarrollamos un Concierge Inteligente de WhatsApp que califica el lead de inmediato y notifica al vendedor solo cuando está listo para comprar. Mira esta demo interactiva del agente de reservas: https://santuario-concierge.vercel.app - ¿Qué porcentaje de leads calculas que se enfrían por tardanza en responder?',
    priceFrom: '$1,500 USD (según la cantidad de integraciones y complejidad del bot)',
    whatToSay: [
      'En canales de chat, la velocidad de respuesta es el factor número uno de conversión.',
      'Un prospecto caliente no atendido en 5 minutos se va a chatear con la competencia.',
      'El Concierge Inteligente actúa de forma instantánea y extrae los datos de interés listos para tu vendedor.'
    ],
    whatNotToPromise: [
      'No recomendar ni prometer el uso de herramientas no oficiales que puedan provocar el bloqueo de su cuenta de WhatsApp.',
      'No asegurar que la IA cerrará la venta sin la intervención del equipo de ventas en la fase final de negociación.'
    ],
    nextStep: 'Hacerles una simulación real de la IA enviándoles el número del bot de prueba.'
  }
];

// Líneas de producto para mostrar en la pestaña de referencias
interface LineaProducto {
  title: string;
  desc: string;
  invest: string;
}

const lineasProducto: LineaProducto[] = [
  { title: 'Diagnóstico Digital / Luma Intelligence', desc: 'Auditoría comercial y técnica preliminar basada en velocidad, UX, SEO, píxeles de tracking y tiempos de respuesta en canales.', invest: 'Cortesía comercial / Según alcance' },
  { title: 'Web / Landing Premium', desc: 'Diseño UX/UI a medida enfocado en conversión con rendimiento óptimo y velocidad sobresaliente.', invest: 'Desde $1,200 USD' },
  { title: 'Concierge Inteligente', desc: 'Asistente con Inteligencia Artificial entrenado con información comercial para calificar y agendar citas 24/7.', invest: 'Desde $800 USD' },
  { title: 'Commerce OS / Tienda con CRM', desc: 'E-commerce interactivo acoplado a un CRM de seguimiento para gestión y fidelización de clientes.', invest: 'Desde $2,500 USD' },
  { title: 'Real Estate OS', desc: 'Sistema inmobiliario completo para catalogar propiedades con filtros de alta velocidad y captación de leads.', invest: 'Desde $3,000 USD' },
  { title: 'Sistema Comercial Privado', desc: 'Infraestructura digital personalizada para administración de ventas, pipelines y automatizaciones comerciales.', invest: 'Según alcance de la infraestructura' },
  { title: 'Contenido y Mantenimiento', desc: 'Soporte mensual prioritario, respaldos, actualizaciones y optimización técnica permanente.', invest: 'Desde $150 USD / mes' }
];

export default function SalesRoom() {
  const [selectedId, setSelectedId] = useState<string>('real-estate');
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<'sales' | 'catalog'>('sales');

  const selectedCliente = clientesData.find(c => c.id === selectedId) || clientesData[0];

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  const ActiveIcon = selectedCliente.icon;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-amber-500/30">
      
      {/* Header Comercial Interno */}
      <header className="border-b border-white/10 bg-[#0a0a0c] py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-500 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Herramienta de Ventas Interna / Uso Exclusivo
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase mt-1">
              Luma Premium Sales Room
            </h1>
            <p className="text-gray-400 text-xs md:text-sm mt-0.5 font-light">
              Sala comercial privada para presentar sistemas digitales por tipo de negocio.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('sales')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                activeTab === 'sales' 
                  ? 'bg-amber-500 text-black border-amber-500' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              Playbook por Cliente
            </button>
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                activeTab === 'catalog' 
                  ? 'bg-amber-500 text-black border-amber-500' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              Líneas de Producto
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {activeTab === 'sales' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Selector por Tipo de Cliente */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                Selecciona Tipo de Cliente
              </h2>
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
                {clientesData.map((cliente) => {
                  const ClieIcon = cliente.icon;
                  const isSelected = cliente.id === selectedId;
                  return (
                    <button
                      key={cliente.id}
                      onClick={() => setSelectedId(cliente.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-xs md:text-sm font-semibold whitespace-nowrap lg:whitespace-normal transition-all w-full shrink-0 lg:shrink ${
                        isSelected 
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/40 shadow-[0_0_15px_rgba(217,119,6,0.05)]' 
                          : 'bg-[#0a0a0c] text-gray-400 border-white/5 hover:border-white/10 hover:text-gray-200'
                      }`}
                    >
                      <ClieIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-500' : 'text-gray-500'}`} />
                      <span>{cliente.niche}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ficha Comercial del Cliente Seleccionado */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Resumen del cliente */}
              <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-extrabold text-white uppercase tracking-tight">
                      {selectedCliente.niche}
                    </h3>
                    <p className="text-xs text-amber-500 font-mono tracking-widest uppercase">
                      Recomendación: {selectedCliente.recommendedProduct}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Problema Principal (Dolor Comercial)
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 mt-1.5 font-light leading-relaxed">
                      {selectedCliente.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Inversión de referencia
                    </h4>
                    <p className="text-sm font-semibold font-mono text-white mt-1">
                      {selectedCliente.priceFrom}
                    </p>
                  </div>
                </div>
              </div>

              {/* Demos del Nicho */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">
                  Demos y Enlaces para Presentación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCliente.demos.map((demo, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#0a0a0c] border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-widest text-[9px]">Demo</p>
                          <p className="font-bold text-white text-sm md:text-base mt-0.5">{demo.name}</p>
                        </div>
                        <a 
                          href={demo.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                        <button
                          onClick={() => handleCopyText(demo.url, `demo-${idx}`)}
                          className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copyStatus[`demo-${idx}`] ? '¡Copiado!' : 'Copiar URL'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Script de Prospección y Argumentario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Mensaje Sugerido */}
                <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-500" /> Mensaje de Prospección Sugerido
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed bg-black/40 border border-white/5 p-4 rounded-xl font-mono">
                      {selectedCliente.message}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyText(selectedCliente.message, 'script-msg')}
                    className="mt-6 w-full py-3 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copyStatus['script-msg'] ? '¡Mensaje Copiado!' : 'Copiar Mensaje'}</span>
                  </button>
                </div>

                {/* Argumentario de venta */}
                <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Qué decir en llamada
                    </h4>
                    <ul className="space-y-3">
                      {selectedCliente.whatToSay.map((item, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-gray-300 font-light flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                      <XCircle className="w-3.5 h-3.5 text-red-500" /> Qué NO prometer
                    </h4>
                    <ul className="space-y-3">
                      {selectedCliente.whatNotToPromise.map((item, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-gray-300 font-light flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-white/5 pt-4 bg-amber-500/5 -mx-6 -mb-6 p-6 rounded-b-2xl border-x-0 border-b-0">
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                      Siguiente Paso Recomendado
                    </h4>
                    <p className="text-xs md:text-sm text-white font-semibold mt-1 flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-amber-500" /> {selectedCliente.nextStep}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* Pestaña: Líneas de Producto de Referencia */
          <div className="space-y-8">
            <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-2xl font-extrabold text-white uppercase tracking-tight">
                Catálogo General de Referencia
              </h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                Ficha rápida de precios y alcances para Marcos y William durante negociaciones activas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {lineasProducto.map((p, idx) => (
                  <div 
                    key={idx} 
                    className="bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <h3 className="font-bold text-white text-sm md:text-base">{p.title}</h3>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">Inversión Mínima</span>
                      <span className="text-xs font-semibold font-mono text-amber-500">{p.invest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Comercial Interno */}
      <footer className="border-t border-white/5 py-8 mt-12 bg-black text-center text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4">
          <p className="uppercase tracking-widest text-[10px]">Luma Premium Ecosistema Comercial</p>
          <p className="mt-1">Documento Confidencial. Solo para uso operativo de Marcos Hilario y William.</p>
        </div>
      </footer>
    </div>
  );
}
