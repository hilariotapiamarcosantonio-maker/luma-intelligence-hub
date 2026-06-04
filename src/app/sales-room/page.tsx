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
  ChevronRight,
  ShieldAlert,
  Wrench,
  Link2Off,
  Eye
} from 'lucide-react';

// Tipado de las demos
type DemoStatus = 'official_demo' | 'in_preparation' | 'internal_only' | 'review_before_send' | 'not_for_sale_now';
type BadgeType = 'Demo oficial' | 'En preparación' | 'Interno' | 'Revisar' | 'No a la venta';
type WilliamActionType = 'Mostrar al cliente' | 'Usar solo en reunión' | 'No enviar todavía' | 'Solo consulta interna' | 'En preparación';

interface Demo {
  name: string;
  url: string;
  status: DemoStatus;
  badge: BadgeType;
  action: WilliamActionType;
  canCopy: boolean;
  canOpen: boolean;
  category?: string;
  productLine?: string;
  notes?: string;
  secondaryUrl?: string;
  secondaryUrlLabel?: string;
  idealClient?: string;
  commercialPain?: string;
  whatItShows?: string;
  whatToSay?: string;
  recommendedPackage?: string;
  priceGuide?: string;
  nextStep?: string;
}

interface CopyableMessage {
  label: string;
  text: string;
}

interface ClienteConfig {
  id: string;
  niche: string;
  icon: React.ComponentType<{ className?: string }>;
  problem: string;
  recommendedProduct: string;
  demos: Demo[];
  message: string;
  messageTemplates?: CopyableMessage[];
  priceFrom: string;
  whatToSay: string[];
  whatNotToPromise: string[];
  nextStep: string;
}

// Catálogo maestro de demos clasificadas con las URLs reales
const ALL_DEMOS: Demo[] = [
  // Demos oficiales activas
  {
    name: 'Luma Real Estate OS — Demo Privada',
    url: 'https://luma-real-estate-os-demo.vercel.app/',
    status: 'official_demo',
    badge: 'Demo oficial',
    action: 'Mostrar al cliente',
    canCopy: true,
    canOpen: true,
    category: 'Real Estate',
    productLine: 'Real Estate OS',
    notes: 'Landing inmobiliaria premium con narrativa, segmentos de comprador, imágenes IA, captación de leads simulada y estructura adaptable para proyectos inmobiliarios (Residencial Aurora).'
  },
  {
    name: 'Luma Beauty Spa OS — Demo Oficial',
    url: 'https://luma-beauty-spa-os-demo.vercel.app/',
    status: 'official_demo',
    badge: 'Demo oficial',
    action: 'Mostrar al cliente',
    canCopy: true,
    canOpen: true,
    category: 'Beauty / Spa',
    productLine: 'Beauty Spa OS',
    notes: 'Una experiencia premium para presentar servicios estéticos, captar consultas, simular atención tipo concierge y orientar al prospecto hacia una evaluación o cita.',
    secondaryUrl: 'https://luma-beauty-spa-os-demo.vercel.app/concierge',
    secondaryUrlLabel: 'Ver Concierge'
  },
  {
    name: 'Luma Real Estate CRM OS — Demo Oficial',
    url: 'https://luma-real-estate-crm-os-demo.vercel.app/',
    status: 'official_demo',
    badge: 'Demo oficial',
    action: 'Mostrar al cliente',
    canCopy: true,
    canOpen: true,
    category: 'Real Estate',
    productLine: 'Real Estate CRM OS',
    notes: 'Un CRM inmobiliario funcional con propiedades, leads, asesores, estados comerciales, notas de seguimiento y persistencia real en Google Sheets demo.',
    idealClient: 'Inmobiliarias, brokers, constructoras y equipos comerciales que necesitan registrar propiedades, organizar leads, dar seguimiento y controlar estados comerciales.',
    commercialPain: 'El negocio depende de WhatsApp, Excel o memoria para manejar propiedades, prospectos y seguimiento. Esto provoca leads perdidos, poca trazabilidad y falta de control comercial.',
    whatItShows: 'Un CRM inmobiliario funcional con propiedades, leads, asesores, estados comerciales, notas de seguimiento y persistencia real en Google Sheets demo.',
    whatToSay: 'Esta demo muestra cómo una inmobiliaria puede organizar propiedades, registrar leads, cambiar estados, dejar notas de seguimiento y visualizar su operación comercial desde un sistema privado conectado a una base de datos demo.',
    recommendedPackage: 'Sistema Comercial Privado',
    priceGuide: 'Desde US$3,000–US$5,000+ según cantidad de módulos, usuarios, automatizaciones, dashboards e integraciones.',
    nextStep: 'Mostrar demo en reunión, registrar un lead o propiedad en vivo, y luego levantar los campos y procesos reales del cliente para preparar una propuesta.'
  },
  {
    name: 'Luma Real Estate Concierge OS — Demo Oficial',
    url: 'https://luma-real-estate-concierge-os-demo.vercel.app/',
    status: 'official_demo',
    badge: 'Demo oficial',
    action: 'Mostrar al cliente',
    canCopy: true,
    canOpen: true,
    category: 'Real Estate',
    productLine: 'Real Estate Concierge OS',
    notes: 'Un concierge inmobiliario funcional que conversa con el prospecto, califica su interés, responde preguntas frecuentes y genera un resumen comercial estructurado para el asesor.',
    secondaryUrl: 'https://luma-real-estate-concierge-os-demo.vercel.app/dashboard',
    secondaryUrlLabel: 'Ver Dashboard',
    idealClient: 'Inmobiliarias, brokers, constructoras y equipos comerciales que reciben preguntas repetidas, leads de campañas o consultas por WhatsApp y necesitan filtrar mejor antes de pasar al asesor.',
    commercialPain: 'El negocio recibe leads que preguntan lo mismo, no siempre califican, se pierden conversaciones y el asesor llega a la llamada sin información clara del prospecto.',
    whatItShows: 'Un concierge inmobiliario demo que conversa con el prospecto, filtra interés, identifica presupuesto, entrega recursos del proyecto y prepara un resumen comercial para el asesor.',
    whatToSay: 'Esta demo muestra cómo una inmobiliaria puede responder preguntas frecuentes, filtrar prospectos y dejar al asesor con un resumen claro antes de llamar o agendar cita.',
    recommendedPackage: 'Captación Inteligente',
    priceGuide: 'Desde US$1,800–US$3,000 como concierge de captación; desde US$3,000–US$5,000+ si se integra con CRM, campañas, WhatsApp Business API o dashboard privado.',
    nextStep: 'Mostrar demo, simular una conversación, revisar el resumen del lead y luego levantar las preguntas frecuentes reales del cliente para preparar una propuesta.'
  },
  {
    name: 'Luma Commerce OS — Demo Oficial',
    url: 'https://luma-commerce-os-demo.vercel.app/',
    status: 'official_demo',
    badge: 'Demo oficial',
    action: 'Mostrar al cliente',
    canCopy: true,
    canOpen: true,
    category: 'Commerce',
    productLine: 'Commerce OS',
    notes: 'E-commerce interactivo (Nexa Store) acoplado a un CRM de seguimiento local basado en CSV semillas con simulación de pasarela de checkout y canal de WhatsApp.',
    secondaryUrl: 'https://luma-commerce-os-demo.vercel.app/admin',
    secondaryUrlLabel: 'Ver CRM / Admin',
    idealClient: 'Tiendas online, boutiques, marcas de productos físicos y retailers locales que quieren vender de forma autónoma y automatizar su control de ventas y cobros por WhatsApp.',
    commercialPain: 'Dependencia exclusiva de Instagram DM o chats manuales para concretar ventas, falta de un carrito integrado, pérdida de trazabilidad de clientes recurrentes y cobros manuales desorganizados.',
    whatItShows: 'Un e-commerce premium responsivo, simulación de carrito de compras y checkout, simulador interactivo de pedidos dirigidos a WhatsApp, y un panel administrativo/CRM local con control de cuentas por cobrar (CxC), ventas e inventario.',
    whatToSay: 'Esta demo muestra la experiencia fluida del comprador desde que selecciona el producto hasta el envío del pedido, y cómo el comercio gestiona cada oportunidad, abonos, pagos quincenales e inventario desde su propio panel administrativo.',
    recommendedPackage: 'E-commerce con CRM',
    priceGuide: 'Desde US$2,500–US$4,500+ según cantidad de productos, pasarelas de pago reales, integraciones de envío y personalizaciones del CRM operativo.',
    nextStep: 'Mostrar la experiencia de tienda en móviles, agregar productos al carrito, simular el checkout y explorar el panel administrativo para ver cómo se registra el pedido instantáneamente.'
  },

  // Demos en preparación
  {
    name: 'Luma Boutique / Cosmética OS — Demo Oficial',
    url: 'https://luma-boutique-os-ivette.vercel.app/',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: false,
    notes: 'Catálogo interactivo y CRM para boutique. En preparación y saneamiento.'
  },
  {
    name: 'Luma Industrial / B2B OS — Demo Oficial',
    url: 'https://inox-minier.com/',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: false,
    notes: 'Catálogo técnico e infraestructura B2B. En preparación y saneamiento.'
  },
  {
    name: 'Luma Content / Media OS — Demo Oficial',
    url: 'https://luma-intelligence-hub.vercel.app/',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: false,
    notes: 'Plataforma de cursos y contenidos premium. En preparación y saneamiento.'
  },
  {
    name: 'Capital en Orden — Demo Oficial',
    url: 'https://suvoga-os-tjaa.vercel.app/',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: false,
    notes: 'Gestión financiera, contratos y control de capital. En preparación y saneamiento.'
  },

  // Archivo interno / Referencias no enviables
  {
    name: 'Real Estate OS / visión estratégica',
    url: 'https://luma-premium.vercel.app/luma-estate-os',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    notes: 'Visión estratégica y catálogo inmobiliario dinámico de alta velocidad.'
  },
  {
    name: 'Santuario Estética',
    url: 'https://santuario-estetica-mvp.vercel.app/',
    status: 'review_before_send',
    badge: 'Revisar',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'Demo antigua para estética, spas o peluquerías. Pendiente de saneamiento.'
  },
  {
    name: 'Santuario Concierge',
    url: 'https://santuario-estetica-mvp.vercel.app/concierge',
    status: 'review_before_send',
    badge: 'Revisar',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'Flujo conversacional de agendamiento con asistente inteligente. Pendiente de saneamiento.'
  },
  {
    name: 'Marcos Portfolio',
    url: 'https://marcos-portfolio-premium.vercel.app/',
    status: 'review_before_send',
    badge: 'Revisar',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'Portafolio de marca personal y autoridad visual. Pendiente de saneamiento.'
  },
  {
    name: 'Vista del Río',
    url: 'https://vista-del-rio-next.vercel.app/',
    status: 'review_before_send',
    badge: 'Revisar',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'Visualizador cinemático inmobiliario legacy. No usar en ventas activas.'
  },
  {
    name: 'Luma Capilar',
    url: 'https://luma-capilar-saa-s.vercel.app/',
    status: 'review_before_send',
    badge: 'Revisar',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'Tienda interactiva y CRM para cuidado personal legacy.'
  },
  {
    name: 'Luma Estate Pro',
    url: 'https://luma-estate-pro.vercel.app/',
    status: 'not_for_sale_now',
    badge: 'No a la venta',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'Portal de búsqueda de propiedades legacy. No para comercialización activa.'
  },
  {
    name: 'SuVoGa público',
    url: 'https://suvoga-os-tjaa.vercel.app/',
    status: 'review_before_send',
    badge: 'Revisar',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'Línea de diseño y catálogo público legacy.'
  },
  {
    name: 'Luma Intelligence Hub',
    url: 'https://luma-intelligence-hub.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    notes: 'Centro de control comercial principal y visualización de auditorías internas.'
  },
  {
    name: 'Gelatinas y Postres',
    url: 'https://gelatinasypostres.info/',
    status: 'not_for_sale_now',
    badge: 'No a la venta',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'E-commerce local de alimentos legacy.'
  },
  {
    name: 'Depot Graphics',
    url: 'https://depotgraphics.com',
    status: 'not_for_sale_now',
    badge: 'No a la venta',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'Servicios de diseño gráfico legacy. Proyecto real de cliente.'
  },
  {
    name: 'Inox Minier',
    url: 'https://inox-minier.com/',
    status: 'review_before_send',
    badge: 'Revisar',
    action: 'No enviar todavía',
    canCopy: false,
    canOpen: true,
    notes: 'Landing page industrial B2B legacy. Proyecto real de cliente.'
  },
  {
    name: 'Luma Commerce OS admin',
    url: 'https://luma-commerce-os-demo.vercel.app/admin',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    notes: 'Consola administrativa de la demo oficial Nexa Store (Commerce OS).'
  },
  {
    name: 'Luma Boutique Ivette admin',
    url: 'https://luma-boutique-os-ivette.vercel.app/admin',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    notes: 'Consola administrativa de Boutique Ivette.'
  },
  {
    name: 'SuVoGa admin',
    url: 'https://suvoga-os-tjaa.vercel.app/admin',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    notes: 'Gestor interno de catálogo y pedidos de SuVoGa.'
  },
  {
    name: 'Luma Outreach Console',
    url: 'https://luma-outreach-console.vercel.app/console/luma-premium?section=command',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    notes: 'Consola comercial de Luma Outreach para prospección en frío.'
  }
];

const clientesData: ClienteConfig[] = [
  {
    id: 'real-estate',
    niche: 'Inmobiliarias / Real Estate',
    icon: Building2,
    problem: 'El negocio presenta proyectos de forma dispersa, depende de portales o WhatsApp suelto y no tiene una experiencia premium para captar prospectos interesados.',
    recommendedProduct: 'Real Estate OS',
    demos: [
      ALL_DEMOS.find(d => d.name === 'Luma Real Estate OS — Demo Privada'),
      ALL_DEMOS.find(d => d.name === 'Luma Real Estate Concierge OS — Demo Oficial'),
      ALL_DEMOS.find(d => d.name === 'Luma Real Estate CRM OS — Demo Oficial'),
      ALL_DEMOS.find(d => d.name === 'Real Estate OS / visión estratégica')
    ].filter((d): d is Demo => !!d),
    message: 'Te comparto una demo privada de cómo una inmobiliaria o constructora puede presentar un proyecto de forma más premium, captar interesados y organizar mejor la conversación comercial: https://luma-real-estate-os-demo.vercel.app/',
    messageTemplates: [
      {
        label: '[Proyecto] WhatsApp corto',
        text: 'Te comparto una demo privada de cómo una inmobiliaria o constructora puede presentar un proyecto de forma más premium, captar interesados y organizar mejor la conversación comercial: https://luma-real-estate-os-demo.vercel.app/'
      },
      {
        label: '[Proyecto] Contexto',
        text: 'Esta demo no es una página web genérica. Es una muestra de infraestructura comercial inmobiliaria: presenta el proyecto, educa al comprador, separa perfiles de interés y lleva al prospecto hacia una solicitud de información o reunión.'
      },
      {
        label: '[Proyecto] Para reunión',
        text: 'Lo importante aquí no es el diseño solamente. Es la estructura: presentación, segmentación, captación y seguimiento. Esto se puede adaptar a una inmobiliaria, constructora, broker o proyecto específico.'
      },
      {
        label: '[Proyecto] Para William',
        text: 'William: usa primero las demos oficiales. Si una demo aparece como “En preparación”, no la envíes al cliente todavía. Se puede mencionar como producto disponible, pero la demo oficial se publicará cuando esté saneada.'
      },
      {
        label: '[Concierge] WhatsApp corto',
        text: 'Te comparto una demo de concierge inmobiliario que responde preguntas frecuentes, filtra prospectos y prepara un resumen para el asesor antes de llamar o agendar cita: https://luma-real-estate-concierge-os-demo.vercel.app/'
      },
      {
        label: '[Concierge] Contexto',
        text: 'Esta demo no es solo un chatbot. Es una capa de atención y calificación para que los leads no se pierdan entre preguntas repetidas, WhatsApp suelto o falta de seguimiento. El sistema conversa, entrega recursos demo y deja al asesor con información más clara.'
      },
      {
        label: '[Concierge] Para reunión',
        text: 'Lo importante aquí es el flujo: preguntas frecuentes, calificación, recursos del proyecto, resumen comercial y paso al asesor. Esta capa puede conectarse luego con CRM, Google Sheets, WhatsApp Business API o campañas de captación según el alcance.'
      },
      {
        label: '[Concierge] Para William',
        text: 'William: si una inmobiliaria dice que recibe muchos leads o muchas preguntas repetidas, presenta esta demo como la capa que filtra y prepara al prospecto antes del asesor. No vendas “chatbot”; vende atención ordenada, menos pérdida de leads y mejor preparación comercial.'
      },
      {
        label: '[CRM] WhatsApp corto',
        text: 'Te comparto una demo de CRM inmobiliario donde una inmobiliaria puede registrar propiedades, organizar leads, cambiar estados y dar seguimiento comercial desde un panel privado: https://luma-real-estate-crm-os-demo.vercel.app/'
      },
      {
        label: '[CRM] Contexto',
        text: 'Esta demo no es una página web. Es una muestra de sistema interno comercial para inmobiliarias: propiedades, leads, asesores, estados, notas de seguimiento y base de datos conectada para que las oportunidades no se pierdan en WhatsApp, Excel o memoria.'
      },
      {
        label: '[CRM] Para reunión',
        text: 'Lo importante aquí es el control interno: registrar propiedades, organizar prospectos, ver estados, dejar notas y medir seguimiento. Esta capa puede conectarse con una landing, un concierge o campañas de captación.'
      },
      {
        label: '[CRM] Para William',
        text: 'William: si una inmobiliaria dice que ya tiene página o que recibe leads por WhatsApp, presenta esta demo como el sistema interno para ordenar la operación. No vendas diseño; vende control, seguimiento y menos oportunidades perdidas.'
      }
    ],
    priceFrom: 'Desde US$1,800–US$3,000 (captación y concierge); desde US$3,000–US$5,000+ (CRM y seguimiento avanzado)',
    whatToSay: [
      'Enfocarse en la experiencia del inversor de alto perfil: compra por los ojos.',
      'Un portal lento o sobrecargado espanta al comprador premium internacional.',
      'Mostrar la demo privada de Real Estate OS destacando la velocidad de carga y segmentación.'
    ],
    whatNotToPromise: [
      'No prometer integraciones automáticas con CRMs inmobiliarios de baja calidad sin evaluar antes.',
      'No asegurar ventas inmediatas, sino una captación y calificación de leads sumamente profesional.'
    ],
    nextStep: 'Agendar un Diagnóstico Digital de cortesía de su web inmobiliaria actual.'
  },
  {
    id: 'commerce',
    niche: 'Tiendas / Commerce',
    icon: ShoppingBag,
    problem: 'Altas tasas de abandono de carritos, pasarelas de pago engorrosas en dispositivos móviles, y nula automatización de seguimiento de clientes. Dependencia excesiva de atención manual y caótica por Instagram o WhatsApp.',
    recommendedProduct: 'Commerce OS',
    demos: ALL_DEMOS.filter(d => [
      'Luma Commerce OS — Demo Oficial',
      'Luma Boutique / Cosmética OS — Demo Oficial'
    ].includes(d.name)),
    message: 'Hola [Nombre], vi tu catálogo en Instagram y noté que el proceso de compra requiere muchos pasos manuales, lo que suele causar el abandono del 60% de los compradores en móvil. Te comparto una demo del sistema Commerce OS que automatiza la venta, incluye carrito, checkout interactivo y conecta directo con un panel CRM de seguimiento: https://luma-commerce-os-demo.vercel.app/',
    priceFrom: 'Desde $2,500 USD (según volumen de catálogo y pasarelas)',
    whatToSay: [
      'Hacer énfasis en la recompra y la recuperación automatizada de carritos.',
      'La gestión manual por chats satura al equipo y frena el crecimiento.',
      'Mostrar cómo el CRM integrado les da control absoluto del historial de cada cliente.'
    ],
    whatNotToPromise: [
      'No prometer automatización completa de logística física o envíos sin usar integraciones validadas.',
      'No asegurar compatibilidad nativa con sistemas POS de tiendas físicas muy antiguos sin costo extra.'
    ],
    nextStep: 'Hacer una llamada corta para mostrarles la demo interactiva de la tienda y el panel CRM de Luma Commerce OS (Nexa Store).'
  },
  {
    id: 'spa',
    niche: 'Belleza / Spa',
    icon: Sparkles,
    problem: 'El negocio depende de Instagram y WhatsApp suelto, recibe preguntas repetidas, no presenta sus servicios con suficiente autoridad y no tiene una experiencia clara para convertir visitas en consultas.',
    recommendedProduct: 'Beauty Spa OS',
    demos: ALL_DEMOS.filter(d => [
      'Luma Beauty Spa OS — Demo Oficial',
      'Santuario Estética',
      'Santuario Concierge'
    ].includes(d.name)),
    message: 'Te comparto una demo privada de cómo un spa o centro estético puede presentar sus servicios de forma más premium, captar consultas y ordenar mejor la atención antes de WhatsApp o llamada: https://luma-beauty-spa-os-demo.vercel.app/',
    messageTemplates: [
      {
        label: 'WhatsApp corto',
        text: 'Te comparto una demo privada de cómo un spa o centro estético puede presentar sus servicios de forma más premium, captar consultas y ordenar mejor la atención antes de WhatsApp o llamada: https://luma-beauty-spa-os-demo.vercel.app/'
      },
      {
        label: 'Mensaje con contexto',
        text: 'Esta demo no es una página web genérica. Es una muestra de infraestructura comercial para estética y bienestar: presenta servicios, genera confianza, capta consultas y simula una atención tipo concierge para que el negocio no dependa solo de mensajes sueltos en Instagram o WhatsApp.'
      },
      {
        label: 'Mensaje para reunión',
        text: 'Lo importante aquí no es solo el diseño. Es la estructura: presentación premium, captación, simulación de atención, servicios organizados y preparación del prospecto para una consulta o cita.'
      },
      {
        label: 'Mensaje para William',
        text: 'William: cuando hables con spas o centros estéticos, no vendas “una web”. Presenta esto como una experiencia comercial para captar consultas, ordenar preguntas frecuentes y elevar la percepción premium del negocio. Si el negocio recibe muchas preguntas repetidas, se vende como Captación Inteligente con concierge.'
      }
    ],
    priceFrom: 'Desde US$1,200–US$1,500 para presencia premium; desde US$1,800–US$3,000 si incluye concierge, captación y seguimiento.',
    whatToSay: [
      'Esta demo muestra cómo un spa o centro estético puede verse más premium, presentar sus servicios, captar consultas y simular una atención ordenada antes de pasar a WhatsApp, llamada o cita.',
      'El tiempo que pierde el personal administrativo respondiendo preguntas básicas puede convertirse en una oportunidad para ordenar mejor la captación.',
      'Una capa de recordatorios y seguimiento puede ayudar a reducir ausencias y mantener conversaciones más ordenadas, según la integración que se definina.',
      'El Concierge puede orientar al prospecto fuera del horario de oficina y dejar la consulta mejor preparada para el equipo humano.'
    ],
    whatNotToPromise: [
      'No prometer que la IA resolverá consultas médicas complejas o prescribirá tratamientos específicos.',
      'No prometer integraciones con software de reservas muy antiguos que no posean APIs modernas.'
    ],
    nextStep: 'Enviar demo, pedir observación del negocio y agendar una reunión corta para adaptar la estructura a sus servicios, equipo y proceso de atención.'
  },
  {
    id: 'cursos',
    niche: 'Academias / Cursos',
    icon: GraduationCap,
    problem: 'Dependencia de plataformas de terceros con altas comisiones de venta y falta de control sobre la marca, la base de datos de estudiantes y las automatizaciones post-venta.',
    recommendedProduct: 'Content / Media OS',
    demos: ALL_DEMOS.filter(d => ['Luma Content / Media OS — Demo Oficial'].includes(d.name)),
    message: 'Hola [Nombre], vi tus cursos. Muchas plataformas se quedan con comisiones de hasta el 10% por alumno. Diseñamos sistemas educativos propios bajo marca privada con pasarela directa a tu banco.',
    priceFrom: '$2,000 USD (según número de módulos e integraciones con pasarelas)',
    whatToSay: [
      'El activo principal de un infoproductor es la base de datos y retención de sus alumnos.',
      'Eliminar comisiones abusivas de pasarelas aumenta el margen neto un 5-15%.',
      'Marca privada eleva la percepción de valor y permite vender tickets más altos.'
    ],
    whatNotToPromise: [
      'No prometer la edición, grabación o producción del contenido audiovisual de los cursos.',
      'No prometer tráfico orgánico masivo de estudiantes por el simple hecho de instalar el portal de cursos.'
    ],
    nextStep: 'Programar llamada de diagnóstico sobre plataformas de cursos.'
  },
  {
    id: 'abogados',
    niche: 'Abogados / Alquileres',
    icon: Scale,
    problem: 'Pérdida de horas valiosas filtrando clientes no calificados o respondiendo las mismas preguntas básicas sobre requisitos, honorarios y condiciones antes de una cita formal.',
    recommendedProduct: 'Capital en Orden',
    demos: ALL_DEMOS.filter(d => ['Capital en Orden — Demo Oficial'].includes(d.name)),
    message: 'Hola [Nombre], analizamos los formularios de tu firma y notamos que no hay un filtro automatizado para clasificar los casos urgentes. Estamos preparando el módulo Capital en Orden para bufetes.',
    priceFrom: '$1,200 USD (según la complejidad de las reglas de calificación)',
    whatToSay: [
      'Las horas facturables del abogado son sagradas. La IA pre-califica a las personas interesadas.',
      'La IA entrega un resumen del caso e información de contacto lista para agendar.',
      'La profesionalidad de un asistente inmediato eleva el valor percibido del despacho.'
    ],
    whatNotToPromise: [
      'No prometer que la IA emitirá asesoramiento legal directo o resoluciones jurídicas autónomas.',
      'No garantizar el filtrado perfecto del 100% de consultas mal intencionadas sin reglas estrictas.'
    ],
    nextStep: 'Hacerles una propuesta de preguntas clave de calificación comercial.'
  },
  {
    id: 'b2b',
    niche: 'Empresas B2B',
    icon: Briefcase,
    problem: 'Ciclos de venta largos y frustrantes. Se envían presupuestos y propuestas comerciales en archivos PDF estáticos y no se sabe si se abrieron o si hay interés real.',
    recommendedProduct: 'Industrial / B2B OS',
    demos: ALL_DEMOS.filter(d => ['Luma Industrial / B2B OS — Demo Oficial'].includes(d.name)),
    message: 'Hola [Nombre], vi tus soluciones de servicios B2B. Los prospectos corporativos exigen respuestas rápidas. Estamos preparando el sistema Industrial B2B OS con métricas en caliente.',
    priceFrom: '$3,500 USD (según pipelines e integraciones de correo y control de propuestas)',
    whatToSay: [
      'En ventas B2B corporativas, el tiempo de seguimiento y saber quién toma la decisión es crucial.',
      'Saber exactamente cuándo abren el presupuesto te permite llamarlos en caliente para resolver objeciones.',
      'Centralizar el pipeline comercial en un sistema propio disminuye la dependencia de hojas de cálculo.'
    ],
    whatNotToPromise: [
      'No prometer base de datos de leads corporativos lista para prospectar de forma masiva sin estrategia previa.',
      'No prometer que el portal reemplazará el trabajo humano de relación y cierre del ejecutivo.'
    ],
    nextStep: 'Agendar reunión de presentación técnica una vez liberada la demo oficial.'
  },
  {
    id: 'servicios',
    niche: 'Marcas personales / servicios',
    icon: UserCheck,
    problem: 'Baja autoridad digital. Sitios web o perfiles sociales genéricos que no reflejan el verdadero valor de sus servicios, limitando su capacidad para cobrar tarifas premium.',
    recommendedProduct: 'Content / Media OS',
    demos: ALL_DEMOS.filter(d => ['Luma Content / Media OS — Demo Oficial'].includes(d.name)),
    message: 'Hola [Nombre], estuve revisando tu perfil. Tu contenido es de gran valor, pero tu presentación web no refleja ese mismo nivel de autoridad profesional. Diseñamos portafolios interactivos premium.',
    priceFrom: '$1,200 USD (según secciones, contenido interactivo y testimoniales)',
    whatToSay: [
      'La primera impresión digital define el precio de tu hora o consultoría.',
      'Una web genérica obliga a competir por precio. Una web premium justifica tarifas premium.',
      'Demostrar la velocidad y la excelencia tipográfica frente a la competencia.'
    ],
    whatNotToPromise: [
      'No prometer aumento automático de seguidores en redes o viralidad sin estrategias de pauta.',
      'No prometer que la web solucionará fallas en el modelo de monetización del profesional.'
    ],
    nextStep: 'Hacer una videollamada corta para sugerirles 3 cambios clave en el diseño de su web actual.'
  },
  {
    id: 'whatsapp-leads',
    niche: 'Fuga de Leads en WhatsApp',
    icon: MessageSquare,
    problem: 'Saturación en canales de chat. Reciben decenas de mensajes diarios, pero tardan horas en contestar o no hacen seguimiento a prospectos calientes, perdiendo ventas.',
    recommendedProduct: 'Concierge Inteligente',
    demos: ALL_DEMOS.filter(d => [
      'Luma Real Estate Concierge OS — Demo Oficial',
      'Luma Commerce OS — Demo Oficial'
    ].includes(d.name)),
    message: 'Hola [Nombre], noté que en horas pico tardan en responder las consultas de WhatsApp de nuevos prospectos. El 50% de las ventas por chat se pierden por no responder en los primeros 5 minutos.',
    priceFrom: '$1,500 USD (según la cantidad de integraciones y complejidad del bot)',
    whatToSay: [
      'En canales de chat, la velocidad de respuesta es el factor número uno de conversión.',
      'Un prospecto caliente no atendido en 5 minutos se va a chatear con la competencia.',
      'El Concierge Inteligente actúa de forma instantánea y extrae los datos de interés listos para tu vendedor.'
    ],
    whatNotToPromise: [
      'No recomendar ni prometer el uso de herramientas no oficiales que puedan provocar el bloqueo de WhatsApp.',
      'No asegurar que la IA cerrará la venta sin la intervención del equipo de ventas en la fase final.'
    ],
    nextStep: 'Hacerles una simulación real de la IA enviándoles el número del bot de prueba.'
  }
];

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
  const [activeTab, setActiveTab] = useState<'sales' | 'catalog' | 'maintenance'>('sales');

  const selectedCliente = clientesData.find(c => c.id === selectedId) || clientesData[0];

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  // Filtrar las demos rotas o de mantenimiento para Marcos
  const maintenanceDemos = ALL_DEMOS.filter(d => d.status === 'internal_only' || d.status === 'review_before_send' || d.status === 'not_for_sale_now');

  const ActiveIcon = selectedCliente.icon;

  const getStatusBadgeStyles = (status: DemoStatus) => {
    switch (status) {
      case 'official_demo':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'in_preparation':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'internal_only':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'review_before_send':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'not_for_sale_now':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getActionStyles = (action: WilliamActionType) => {
    switch (action) {
      case 'Mostrar al cliente':
        return 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5';
      case 'Usar solo en reunión':
        return 'text-purple-400 border-purple-500/10 bg-purple-500/5';
      case 'No enviar todavía':
        return 'text-rose-400 border-rose-500/10 bg-rose-500/5';
      case 'Solo consulta interna':
        return 'text-blue-400 border-blue-500/10 bg-blue-500/5';
      case 'En preparación':
        return 'text-amber-400 border-amber-500/10 bg-amber-500/5';
      default:
        return 'text-gray-400 border-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-amber-500/30">
      
      {/* Header Operativo de Ventas */}
      <header className="border-b border-white/10 bg-[#0a0a0c] py-6 px-4 md:px-8 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-500 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Consola Comercial Confidencial / William & Marcos
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase mt-1 flex items-center gap-2">
              Luma Premium Sales Room
            </h1>
            <p className="text-gray-400 text-xs md:text-sm mt-0.5 font-light">
              Control de demos autorizadas, playbooks comerciales y mitigación de enlaces rotos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setActiveTab('sales')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                activeTab === 'sales' 
                  ? 'bg-amber-500 text-black border-amber-500' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              Playbook por Cliente
            </button>
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                activeTab === 'catalog' 
                  ? 'bg-amber-500 text-black border-amber-500' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              Líneas de Producto
            </button>
            <button 
              onClick={() => setActiveTab('maintenance')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'maintenance' 
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                  : 'bg-transparent text-rose-500/40 border-rose-500/10 hover:border-rose-500/20'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              Mantenimiento Demos ({maintenanceDemos.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* PESTAÑA 1: PLAYBOOK POR NICHO */}
        {activeTab === 'sales' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Selector de Clientes */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                Nicho del Cliente
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

            {/* Ficha del Cliente */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Resumen del Nicho */}
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
                      Infraestructura: {selectedCliente.recommendedProduct}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Dolor Principal
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 mt-1.5 font-light leading-relaxed">
                      {selectedCliente.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Inversión Estimada
                    </h4>
                    <p className="text-sm font-semibold font-mono text-white mt-1">
                      {selectedCliente.priceFrom}
                    </p>
                  </div>
                </div>
              </div>

              {/* Demos Relacionadas del Nicho */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">
                  Demos del Ecosistema
                </h3>
                
                {/* Demos Vendibles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCliente.demos.filter(d => d.status === 'official_demo' || d.status === 'in_preparation').map((demo, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-[#0a0a0c] border rounded-xl p-5 flex flex-col justify-between transition-colors ${
                        demo.status === 'official_demo' 
                          ? 'border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                          : 'border-white/5 hover:border-amber-500/20'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${getStatusBadgeStyles(demo.status)}`}>
                                {demo.badge}
                              </span>
                              <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${getActionStyles(demo.action)}`}>
                                {demo.action}
                              </span>
                            </div>
                            <h4 className="font-extrabold text-white text-base mt-2">{demo.name}</h4>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          {demo.notes}
                        </p>
                        {demo.idealClient && (
                          <details className="group border border-white/5 bg-black/20 rounded-lg overflow-hidden mt-2 transition-all duration-200">
                            <summary className="flex items-center justify-between p-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer select-none hover:bg-white/5 hover:text-white">
                              <span>Argumentario de Venta</span>
                              <ChevronRight className="w-3 h-3 transition-transform group-open:rotate-90 text-amber-500" />
                            </summary>
                            <div className="p-3 border-t border-white/5 space-y-2 text-xs bg-black/40">
                              <div>
                                <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider block">Cliente ideal</span>
                                <span className="text-gray-300 font-light">{demo.idealClient}</span>
                              </div>
                              {demo.commercialPain && (
                                <div>
                                  <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider block">Dolor comercial</span>
                                  <span className="text-gray-300 font-light">{demo.commercialPain}</span>
                                </div>
                              )}
                              {demo.whatItShows && (
                                <div>
                                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">Qué demuestra</span>
                                  <span className="text-gray-300 font-light">{demo.whatItShows}</span>
                                </div>
                              )}
                              {demo.whatToSay && (
                                <div>
                                  <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider block">Qué decir</span>
                                  <span className="text-gray-300 font-light italic">&ldquo;{demo.whatToSay}&rdquo;</span>
                                </div>
                              )}
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                                {demo.recommendedPackage && (
                                  <div>
                                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider block">Paquete</span>
                                    <span className="text-white font-semibold text-[11px]">{demo.recommendedPackage}</span>
                                  </div>
                                )}
                                {demo.priceGuide && (
                                  <div>
                                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider block">Precio Guía</span>
                                    <span className="text-amber-500 font-mono font-semibold text-[11px]">{demo.priceGuide}</span>
                                  </div>
                                )}
                              </div>
                              {demo.nextStep && (
                                <div className="bg-amber-500/5 p-2 rounded border border-amber-500/10 mt-1">
                                  <span className="text-[8px] font-bold text-amber-500 uppercase tracking-wider block">Siguiente paso</span>
                                  <span className="text-gray-200 font-medium text-[11px]">{demo.nextStep}</span>
                                </div>
                              )}
                            </div>
                          </details>
                        )}
                        {demo.status === 'official_demo' ? (
                          <div className="space-y-2">
                            <p className="text-[10px] text-gray-500 font-mono break-all bg-black/30 p-2 rounded border border-white/5">
                              {demo.url}
                            </p>
                            {demo.secondaryUrl && (
                              <div className="text-[10px] text-gray-400 bg-black/50 p-2.5 rounded border border-white/5 flex flex-col gap-1">
                                <div className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                  <span className="font-bold text-amber-500 uppercase tracking-wider text-[9px]">Módulo Concierge / Sublink:</span>
                                </div>
                                <a 
                                  href={demo.secondaryUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-amber-400 hover:text-amber-300 hover:underline font-mono break-all"
                                >
                                  {demo.secondaryUrl}
                                </a>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-[10px] text-gray-600 font-mono italic p-2 rounded border border-white/5 bg-black/10">
                            Enlace privado y protegido (saneando demo)
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-5 pt-3 border-t border-white/5 flex flex-col gap-2">
                        <div className="flex gap-2">
                          {demo.canOpen ? (
                            <a 
                              href={demo.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5 border border-white/5"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Abrir Demo</span>
                            </a>
                          ) : (
                            <div className="flex-1 py-2 bg-black/40 text-xs font-semibold rounded-lg text-gray-600 cursor-not-allowed flex items-center justify-center gap-1.5 border border-white/5">
                              <Link2Off className="w-3.5 h-3.5" />
                              <span>No disponible</span>
                            </div>
                          )}

                          {demo.canCopy ? (
                            <button
                              onClick={() => handleCopyText(demo.url, `demo-${selectedCliente.id}-${idx}`)}
                              className="flex-1 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold rounded-lg text-emerald-400 hover:text-emerald-300 transition-all flex items-center justify-center gap-1.5 border border-emerald-500/20"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>{copyStatus[`demo-${selectedCliente.id}-${idx}`] ? '¡Copiado!' : 'Copiar Enlace'}</span>
                            </button>
                          ) : (
                            <div className="flex-1 py-2 bg-[#1a0f0f] text-xs font-semibold rounded-lg text-red-500/40 cursor-not-allowed flex items-center justify-center gap-1.5 border border-red-500/10">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span>Envío Bloqueado</span>
                            </div>
                          )}
                        </div>

                        {demo.secondaryUrl && (
                          <div className="flex gap-2 border-t border-white/5 pt-2">
                            <a 
                              href={demo.secondaryUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex-1 py-1.5 bg-amber-500/5 hover:bg-amber-500/10 text-xs font-semibold rounded-lg text-amber-400 hover:text-amber-300 transition-all flex items-center justify-center gap-1.5 border border-amber-500/15"
                            >
                              <Eye className="w-3 h-3" />
                              <span>{demo.secondaryUrlLabel || 'Ver Concierge'}</span>
                            </a>
                            <button
                              onClick={() => handleCopyText(demo.secondaryUrl!, `demo-sec-${selectedCliente.id}-${idx}`)}
                              className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5 border border-white/5"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>{copyStatus[`demo-sec-${selectedCliente.id}-${idx}`] ? '¡Copiado!' : 'Copiar Concierge'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Archivo Interno / Referencias no enviables */}
                {selectedCliente.demos.filter(d => d.status === 'internal_only' || d.status === 'review_before_send' || d.status === 'not_for_sale_now').length > 0 && (
                  <div className="mt-6 border border-white/5 bg-[#0a0a0c]/60 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Archivo interno / Referencias no enviables (No usar en ventas)
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCliente.demos.filter(d => d.status === 'internal_only' || d.status === 'review_before_send' || d.status === 'not_for_sale_now').map((demo, idx) => (
                        <div 
                          key={idx} 
                          className="bg-black/30 border border-white/5 rounded-lg p-4 flex flex-col justify-between opacity-60 hover:opacity-85 transition-opacity duration-200"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className={`px-1.5 py-0.5 text-[8px] font-bold uppercase rounded border ${getStatusBadgeStyles(demo.status)}`}>
                                {demo.badge}
                              </span>
                              <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase rounded border bg-rose-500/10 text-rose-400 border-rose-500/20">
                                NO USAR EN VENTAS
                              </span>
                            </div>
                            <h5 className="font-bold text-gray-300 text-sm">{demo.name}</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed font-light">{demo.notes}</p>
                          </div>
                          
                          <div className="mt-4 pt-2 border-t border-white/5 flex gap-2">
                            {demo.canOpen ? (
                              <a 
                                href={demo.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-[11px] font-medium rounded text-gray-400 hover:text-white transition-all flex items-center justify-center gap-1 border border-white/5"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Abrir Referencia</span>
                              </a>
                            ) : (
                              <div className="flex-1 py-1.5 bg-black/40 text-[11px] font-medium rounded text-gray-600 cursor-not-allowed flex items-center justify-center gap-1 border border-white/5">
                                <Link2Off className="w-3 h-3" />
                                <span>No disponible</span>
                              </div>
                            )}
                            <div className="flex-1 py-1.5 bg-rose-950/20 text-[10px] font-medium rounded text-rose-500/50 cursor-not-allowed flex items-center justify-center gap-1 border border-rose-950/40">
                              <ShieldAlert className="w-3 h-3" />
                              <span>Uso Interno</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mensaje de Prospección y Argumentario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Mensaje Sugerido o Múltiples Plantillas */}
                <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                      {selectedCliente.messageTemplates ? 'Plantillas de Mensajes Copiables' : 'Mensaje para WhatsApp / DM'}
                    </h4>
                    
                    {selectedCliente.messageTemplates ? (
                      <div className="space-y-4">
                        {selectedCliente.messageTemplates.map((template, tIdx) => (
                          <div key={tIdx} className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                                {template.label}
                              </span>
                              <button
                                onClick={() => handleCopyText(template.text, `tmpl-${tIdx}`)}
                                className="px-2 py-1 bg-white/5 hover:bg-white/10 text-[10px] font-semibold rounded text-gray-400 hover:text-white transition-all flex items-center gap-1 border border-white/5"
                              >
                                <Copy className="w-3 h-3" />
                                <span>{copyStatus[`tmpl-${tIdx}`] ? '¡Copiado!' : 'Copiar'}</span>
                              </button>
                            </div>
                            <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed font-mono whitespace-pre-wrap">
                              {template.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed bg-black/40 border border-white/5 p-4 rounded-xl font-mono">
                        {selectedCliente.message}
                      </p>
                    )}
                  </div>
                  
                  {!selectedCliente.messageTemplates && (
                    <button
                      onClick={() => handleCopyText(selectedCliente.message, 'script-msg')}
                      className="mt-6 w-full py-3 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 font-semibold"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copyStatus['script-msg'] ? '¡Mensaje Copiado!' : 'Copiar Mensaje'}</span>
                    </button>
                  )}
                </div>

                {/* Argumentario de Ventas */}
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
        )}

        {/* PESTAÑA 2: LÍNEAS DE PRODUCTO DE REFERENCIA */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-lg md:text-2xl font-extrabold text-white uppercase tracking-tight">
                Líneas de Producto Oficiales
              </h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                Ficha de precios y alcances para William & Marcos durante negociaciones directas.
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
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">Inversión</span>
                      <span className="text-xs font-semibold font-mono text-amber-500">{p.invest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 3: SECCIÓN DE MANTENIMIENTO TÉCNICO Y DEMOS PENDIENTES */}
        {activeTab === 'maintenance' && (
          <div className="space-y-8">
            
            {/* Panel Principal */}
            <div className="bg-[#0a0a0c] border border-rose-500/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-extrabold text-white uppercase tracking-tight">
                    Demos pendientes de reparación o creación
                  </h2>
                  <p className="text-xs md:text-sm text-gray-400 mt-0.5">
                    Sección exclusiva para Marcos. Lista de demos privadas, administradores internos o enlaces bajo revisión que no deben ser compartidos con prospectos.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {maintenanceDemos.map((demo, idx) => (
                  <div 
                    key={idx}
                    className="p-4 bg-black/40 border border-white/5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-rose-500/20 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-white text-sm md:text-base">{demo.name}</h3>
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${getStatusBadgeStyles(demo.status)}`}>
                          {demo.badge}
                        </span>
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${getActionStyles(demo.action)}`}>
                          {demo.action}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{demo.notes}</p>
                      <p className="text-[10px] text-gray-500 font-mono break-all">{demo.url}</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                      {demo.canOpen && (
                        <a 
                          href={demo.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 md:flex-initial px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1 border border-white/5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspeccionar</span>
                        </a>
                      )}
                      <div className="px-4 py-2 bg-rose-500/5 text-xs font-semibold rounded-lg text-rose-400 border border-rose-500/10 flex items-center gap-1 w-full md:w-auto justify-center">
                        <Link2Off className="w-3.5 h-3.5" />
                        <span>Envío Bloqueado</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caja de Recomendación Técnica */}
            <div className="bg-[#120909] border border-red-500/20 rounded-xl p-6 flex flex-col md:flex-row gap-4 items-start">
              <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase">Advertencia Comercial para William</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Ninguno de los enlaces de este panel de mantenimiento debe ser enviado en chats con prospectos comerciales. Si el cliente requiere visualizar un admin o CRM en funcionamiento, Marcos o William deben coordinar una videollamada para presentarlo mediante pantalla compartida (modo de demostración guiada).
                </p>
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
