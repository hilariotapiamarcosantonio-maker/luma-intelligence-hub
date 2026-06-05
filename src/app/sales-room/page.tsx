'use client';

import React, { useState } from 'react';
import {
  Building2,
  ShoppingBag,
  Sparkles,
  GraduationCap,
  Briefcase,
  UserCheck,
  MessageSquare,
  AlertTriangle,
  XCircle,
  Copy,
  ShieldAlert,
  Link2Off,
  Eye,
  Globe,
  Lock,
  Clock,
  Package,
  FileText
} from 'lucide-react';

// Tipado de las demos
type DemoStatus = 'official_demo' | 'in_preparation' | 'internal_only' | 'real_case';
type BadgeType = 'Demo oficial' | 'En preparación' | 'Interno' | 'Caso real';
type WilliamActionType = 'Mostrar al cliente' | 'Usar solo en reunión' | 'No enviar todavía' | 'Solo consulta interna' | 'En preparación' | 'Caso de referencia';

interface Demo {
  name: string;
  url: string;
  status: DemoStatus;
  badge: BadgeType;
  action: WilliamActionType;
  canCopy: boolean;
  canOpen: boolean;
  category: string;
  notes: string;
  secondaryUrl?: string;
  secondaryUrlLabel?: string;
  idealClient?: string;
  commercialPain?: string;
  whatItShows?: string;
  whatToSay?: string;
  priceGuide?: string;
  nextStep?: string;
  whatsappShort?: string;
  messageContext?: string;
  noteForWilliam?: string;
}

interface ClienteConfig {
  id: string;
  niche: string;
  icon: React.ComponentType<{ className?: string }>;
  idealClient: string;
  problem: string; // Dolor principal
  recommendedProduct: string;
  demos: Demo[]; // Qué demos mostrar
  messageShort: string;
  messageContext: string;
  priceFrom: string; // Precio guía
  nextStep: string; // Siguiente paso recomendado
  whatNotToPromise: string[]; // Qué NO prometer
  noteForWilliam: string; // Nota para William
}

interface LineaProducto {
  title: string;
  desc: string;
  invest: string;
}

// Catálogo maestro de demos clasificadas con las URLs reales
const ALL_DEMOS: Demo[] = [
  // 1. Demos oficiales activas (5)
  {
    name: 'Luma Real Estate OS — Demo Privada',
    url: 'https://luma-real-estate-os-demo.vercel.app/',
    status: 'official_demo',
    badge: 'Demo oficial',
    action: 'Mostrar al cliente',
    canCopy: true,
    canOpen: true,
    category: 'Real Estate',
    notes: 'Landing inmobiliaria premium con narrativa, segmentos de comprador, imágenes IA, captación de leads simulada y estructura adaptable para proyectos inmobiliarios (Residencial Aurora).',
    idealClient: 'Constructoras, desarrolladoras inmobiliarias, corredores y brokers que comercializan proyectos en planos o listados premium y buscan impresionar a compradores exigentes.',
    commercialPain: 'Uso de PDFs pesados, páginas lentas o portales genéricos que no transmiten confianza ni exclusividad, lo que reduce la captación de inversores de alto valor.',
    whatItShows: 'Landing page cinemática e interactiva con narrativa de valor para proyectos, segmentación de tipologías, imágenes fotorrealistas y captación de prospectos de alta conversión.',
    whatToSay: 'Esta demo muestra cómo presentar un proyecto inmobiliario bajo una experiencia premium que segmenta automáticamente a los compradores y captura su perfil de interés desde el primer minuto.',
    priceGuide: 'Desde RD$65,000–RD$120,000 para landing de proyecto premium. Desarrollo completo desde RD$150,000–RD$350,000+ según tipologías.',
    nextStep: 'Simular la navegación de un usuario en móvil, mostrar la velocidad de carga de las imágenes y definir la estructura del proyecto actual del cliente.',
    whatsappShort: 'Hola [Nombre], te comparto esta demo de presentación premium para proyectos inmobiliarios. Carga instantáneamente y filtra prospectos calificados en automático: https://luma-real-estate-os-demo.vercel.app/',
    messageContext: 'Hola [Nombre], te comparto la demo oficial de Luma Real Estate OS (Residencial Aurora). Está diseñada específicamente para desarrolladores que necesitan vender proyectos en planos sin depender de PDFs pesados. La demo simula cómo un cliente interactúa con las tipologías y solicita información segmentada de valor: https://luma-real-estate-os-demo.vercel.app/',
    noteForWilliam: 'Presentar la demo haciendo foco en la velocidad de carga móvil y en cómo capta el interés del comprador de alto nivel adquisitivo. No prometer integraciones con CRM antiguos sin validar primero.'
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
    notes: 'Una experiencia premium para presentar servicios estéticos, captar consultas, simular atención tipo concierge y orientar al prospecto hacia una evaluación o cita.',
    secondaryUrl: 'https://luma-beauty-spa-os-demo.vercel.app/concierge',
    secondaryUrlLabel: 'Ver Concierge',
    idealClient: 'Spas, centros estéticos, clínicas de bienestar, peluquerías premium y profesionales independientes del cuidado personal.',
    commercialPain: 'El personal pierde horas respondiendo preguntas básicas sobre servicios, precios y disponibilidad en WhatsApp o Instagram. El agendamiento manual genera ausencias no justificadas.',
    whatItShows: 'Experiencia web premium de presentación de servicios estéticos con simulación de agendamiento conversacional tipo Concierge inteligente para precalificación.',
    whatToSay: 'Esta demo muestra cómo elevar la percepción del centro estético facilitando la consulta de servicios y automatizando el filtro previo de citas de manera elegante.',
    priceGuide: 'Desde RD$35,000–RD$75,000 para presencia premium y catálogo de servicios. Desde RD$65,000–RD$150,000+ si incluye Concierge inteligente y sistema de agendamiento.',
    nextStep: 'Simular el agendamiento en el botón de Concierge, revisar el flujo de preguntas y estructurar las preguntas clave de calificación comercial del cliente.',
    whatsappShort: 'Hola [Nombre], mira cómo puedes automatizar las consultas y citas de tu estética con esta demo de concierge inteligente: https://luma-beauty-spa-os-demo.vercel.app/',
    messageContext: 'Hola [Nombre], te comparto la demo oficial de Luma Beauty Spa OS. Incluye un asistente conversacional (Concierge) que precalifica al cliente sobre sus necesidades estéticas y le permite simular el agendamiento, quitando carga operativa a tu recepción: https://luma-beauty-spa-os-demo.vercel.app/',
    noteForWilliam: 'Enfatizar el ahorro de tiempo en recepción y la reducción de ausencias. Si el cliente recibe muchos mensajes en redes, esta es su solución ideal.'
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
    notes: 'Un CRM inmobiliario funcional con propiedades, leads, asesores, estados comerciales, notas de seguimiento y persistencia real en Google Sheets demo.',
    idealClient: 'Inmobiliarias, brokers, constructoras y equipos comerciales que necesitan registrar propiedades, organizar leads, dar seguimiento y controlar estados comerciales.',
    commercialPain: 'El negocio depende de WhatsApp, Excel o memoria para manejar propiedades, prospectos y seguimiento. Esto provoca leads perdidos, poca trazabilidad y falta de control comercial.',
    whatItShows: 'Un CRM inmobiliario funcional con propiedades, leads, asesores, estados comerciales, notas de seguimiento y persistencia real en Google Sheets demo.',
    whatToSay: 'Esta demo muestra cómo una inmobiliaria puede organizar propiedades, registrar leads, cambiar estados, dejar notas de seguimiento y visualizar su operación comercial desde un sistema privado conectado a una base de datos demo.',
    priceGuide: 'Desde RD$90,000–RD$180,000+ según cantidad de módulos, usuarios, automatizaciones, dashboards e integraciones.',
    nextStep: 'Mostrar demo en reunión, registrar un lead o propiedad en vivo, y luego levantar los campos y procesos reales del cliente para preparar una propuesta.',
    whatsappShort: 'Hola [Nombre], te comparto la demo de nuestro CRM inmobiliario para que veas cómo controlar propiedades y leads en un solo lugar: https://luma-real-estate-crm-os-demo.vercel.app/',
    messageContext: 'Hola [Nombre], te comparto la demo del CRM Inmobiliario de Luma. Está conectado a una base de datos ágil en la nube que permite llevar la trazabilidad completa del prospecto, asignar asesores y actualizar el inventario físico en tiempo real: https://luma-real-estate-crm-os-demo.vercel.app/',
    noteForWilliam: 'Explicar al cliente que no perderá más prospectos por falta de seguimiento. Mostrar en vivo el registro de una propiedad o lead.'
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
    notes: 'Un concierge inmobiliario funcional que conversa con el prospecto, califica su interés, responde preguntas frecuentes y genera un resumen comercial estructurado para el asesor.',
    secondaryUrl: 'https://luma-real-estate-concierge-os-demo.vercel.app/dashboard',
    secondaryUrlLabel: 'Ver Dashboard',
    idealClient: 'Inmobiliarias, brokers, constructoras y equipos comerciales que reciben preguntas repetidas, leads de campañas o consultas por WhatsApp y necesitan filtrar mejor antes de pasar al asesor.',
    commercialPain: 'El negocio recibe leads que preguntan lo mismo, no siempre califican, se pierden conversaciones y el asesor llega a la llamada sin información clara del prospecto.',
    whatItShows: 'Un concierge inmobiliario demo que conversa con el prospecto, filtra interés, identifica presupuesto, entrega recursos del proyecto y prepara un resumen comercial para el asesor.',
    whatToSay: 'Esta demo muestra cómo una inmobiliaria puede responder preguntas frecuentes, filtrar prospectos y dejar al asesor con un resumen claro antes de llamar o agendar cita.',
    priceGuide: 'Desde RD$55,000–RD$90,000 como concierge de captación; desde RD$90,000–RD$150,000+ si se integra con CRM, campañas, WhatsApp Business API o dashboard privado.',
    nextStep: 'Mostrar demo, simular una conversación, revisar el resumen del lead y luego levantar las preguntas frecuentes reales del cliente para preparar una propuesta.',
    whatsappShort: 'Hola [Nombre], mira cómo un concierge con IA puede atender y calificar a tus leads inmobiliarios 24/7 de forma personalizada: https://luma-real-estate-concierge-os-demo.vercel.app/',
    messageContext: 'Hola [Nombre], aquí tienes la demo oficial de nuestro Concierge Inmobiliario. Conversa de manera inteligente con el interesado, extrae su presupuesto, zona de interés, urgencia de compra y genera una ficha de perfil calificado para tu fuerza de ventas: https://luma-real-estate-concierge-os-demo.vercel.app/',
    noteForWilliam: 'Mostrar la pestaña del "Dashboard" durante la videollamada para que el cliente vea el nivel de detalle comercial que la IA entrega al vendedor.'
  },
  {
    name: 'Luma Commerce OS — Demo Oficial / Nexa Store',
    url: 'https://luma-commerce-os-demo.vercel.app/',
    status: 'official_demo',
    badge: 'Demo oficial',
    action: 'Mostrar al cliente',
    canCopy: true,
    canOpen: true,
    category: 'Commerce',
    notes: 'E-commerce interactivo (Nexa Store) acoplado a un CRM de seguimiento local con pasarela de checkout simulada y panel administrativo demo con datos ficticios.',
    secondaryUrl: 'https://luma-commerce-os-demo.vercel.app/admin',
    secondaryUrlLabel: 'Admin demo con datos ficticios',
    idealClient: 'Tiendas físicas, marcas de productos, perfumes, cosmética, boutiques, regalos, accesorios, repuestos ligeros y negocios que venden por WhatsApp o Instagram pero no tienen un sistema claro de catálogo, pedido, seguimiento y control.',
    commercialPain: 'El negocio vende por mensajes sueltos, catálogos desordenados, notas manuales o Excel. Pierde pedidos, no mide oportunidades, no organiza clientes, no controla cuentas por cobrar y depende demasiado de WhatsApp sin estructura.',
    whatItShows: 'Una tienda premium con catálogo, carrito, checkout simulado, pedido organizado, panel administrativo demo, contactos, ventas, cuentas por cobrar y flujo comercial adaptable a una marca real.',
    whatToSay: 'Esta demo muestra cómo una tienda puede dejar de vender solo por mensajes sueltos y pasar a tener una experiencia más profesional: catálogo, pedidos, clientes, seguimiento y control comercial desde un sistema propio.',
    priceGuide: 'Desde RD$45,000–RD$95,000 para tienda premium con admin base. Desde RD$120,000–RD$250,000+ si incluye CRM, Google Sheets, automatización, dashboard, seguimiento, cuentas por cobrar e integraciones. Mantenimiento sugerido: RD$8,000–RD$25,000 mensual según operación.',
    nextStep: 'Mostrar la tienda, simular un pedido, abrir el admin demo y levantar cómo vende actualmente el cliente: productos, formas de pago, entrega, WhatsApp, seguimiento y reportes necesarios.',
    whatsappShort: 'Te comparto una demo de tienda premium donde una marca puede mostrar productos, recibir pedidos y organizar clientes desde un sistema propio, sin depender solo de WhatsApp o catálogos sueltos: https://luma-commerce-os-demo.vercel.app/',
    messageContext: 'Esta demo no es solo una tienda bonita. Es una muestra de infraestructura comercial para negocios de productos: catálogo, carrito, pedido, clientes, seguimiento y panel interno. La idea es que el negocio venda mejor, pierda menos conversaciones y tenga más control sobre su operación.',
    noteForWilliam: 'William: si el cliente vende productos por WhatsApp, Instagram o tienda física y se queja de desorden, pedidos perdidos, falta de seguimiento o falta de control, usa Commerce OS. No vendas “página web”. Vende orden comercial, presentación premium, pedidos claros y seguimiento.'
  },

  // 2. Casos Reales / Referencia Corporativa (2)
  {
    name: 'Inox Minier — Caso Real / Referencia Corporativa',
    url: 'https://inox-minier.com/',
    status: 'real_case',
    badge: 'Caso real',
    action: 'Caso de referencia',
    canCopy: false,
    canOpen: true,
    category: 'B2B corporativo',
    notes: 'Landing page industrial B2B. Caso de referencia real para proyectos de infraestructura, manufactura, catálogo industrial y ventas de ingeniería.'
  },
  {
    name: 'Depot Graphics — Caso Real / Referencia Corporativa',
    url: 'https://depotgraphics.com',
    status: 'real_case',
    badge: 'Caso real',
    action: 'Caso de referencia',
    canCopy: false,
    canOpen: true,
    category: 'Servicios profesionales',
    notes: 'Servicios de diseño gráfico e impresión. Caso de referencia real para proyectos corporativos, portafolios y control de pedidos de artes gráficas.'
  },

  // 3. Próximas demos (6)
  {
    name: 'Academy OS',
    url: '',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'En preparación',
    canCopy: false,
    canOpen: false,
    category: 'Academy / cursos',
    notes: 'Plataforma educativa para academias, cursos y distribución de contenido premium bajo marca privada.'
  },
  {
    name: 'Legal / Lease OS',
    url: '',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'En preparación',
    canCopy: false,
    canOpen: false,
    category: 'Inmobiliarias',
    notes: 'Plataforma de gestión de contratos, control de capital, arrendamiento y precalificación de inquilinos.'
  },
  {
    name: 'B2B Corporate OS',
    url: '',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'En preparación',
    canCopy: false,
    canOpen: false,
    category: 'B2B corporativo',
    notes: 'Ecosistema de catálogo industrial y cotizaciones rápidas para empresas y corporaciones B2B.'
  },
  {
    name: 'Personal Brand OS',
    url: '',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'En preparación',
    canCopy: false,
    canOpen: false,
    category: 'Servicios profesionales',
    notes: 'Portal interactivo de marca personal, autoridad y captación de clientes de consultoría.'
  },
  {
    name: 'Perfumes / Retail OS',
    url: '',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'En preparación',
    canCopy: false,
    canOpen: false,
    category: 'Tiendas / Commerce',
    notes: 'Demo en preparación para boutiques, perfumes, cosmética premium, marcas de bienestar y productos artesanales con datos ficticios.'
  },
  {
    name: 'WhatsApp Lead Recovery OS',
    url: '',
    status: 'in_preparation',
    badge: 'En preparación',
    action: 'En preparación',
    canCopy: false,
    canOpen: false,
    category: 'WhatsApp Lead Recovery',
    notes: 'Agente conversacional inteligente de calificación y recuperación de leads con soporte de carritos abandonados.'
  },

  // 4. Archivo interno / NO ENVIAR AL CLIENTE (16)
  {
    name: 'Luma Commerce OS legacy',
    url: 'https://luma-commerce-os.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Tiendas / Commerce',
    notes: 'Archivo interno / NO ENVIAR AL CLIENTE. Versión legacy de Commerce OS.'
  },
  {
    name: 'Luma Boutique OS / Ivette Berroa',
    url: 'https://luma-boutique-os-ivette.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Tiendas / Commerce',
    notes: 'Proyecto real de cliente / NO ENVIAR AL CLIENTE. No usar como demo genérica.'
  },
  {
    name: 'Luma Boutique OS / Ivette Berroa Admin',
    url: 'https://luma-boutique-os-ivette.vercel.app/admin',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Tiendas / Commerce',
    notes: 'Consola administrativa real de Boutique Ivette / NO ENVIAR AL CLIENTE. Acceso real sensible.'
  },
  {
    name: 'Real Estate OS / visión estratégica',
    url: 'https://luma-premium.vercel.app/luma-estate-os',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Inmobiliarias',
    notes: 'Archivo interno / NO ENVIAR AL CLIENTE. Catálogo y visión estratégica de listados.'
  },
  {
    name: 'Santuario Estética',
    url: 'https://santuario-estetica-mvp.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Beauty / Spa',
    notes: 'Demo antigua de spa / NO ENVIAR AL CLIENTE. Pendiente de saneamiento de datos.'
  },
  {
    name: 'Santuario Concierge',
    url: 'https://santuario-estetica-mvp.vercel.app/concierge',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Beauty / Spa',
    notes: 'Flujo conversacional antiguo / NO ENVIAR AL CLIENTE. Contiene referencias pendientes de sanear.'
  },
  {
    name: 'Marcos Portfolio',
    url: 'https://marcos-portfolio-premium.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Servicios profesionales',
    notes: 'Portafolio de marca personal y autoridad visual legacy / NO ENVIAR AL CLIENTE.'
  },
  {
    name: 'Vista del Río',
    url: 'https://vista-del-rio-next.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Inmobiliarias',
    notes: 'Visualizador inmobiliario legacy / NO ENVIAR AL CLIENTE.'
  },
  {
    name: 'Luma Capilar',
    url: 'https://luma-capilar-saa-s.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Beauty / Spa',
    notes: 'Tienda interactiva y CRM capilar legacy / NO ENVIAR AL CLIENTE.'
  },
  {
    name: 'Luma Estate Pro',
    url: 'https://luma-estate-pro.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Inmobiliarias',
    notes: 'Portal de búsqueda de propiedades legacy / NO ENVIAR AL CLIENTE.'
  },
  {
    name: 'SuVoGa público',
    url: 'https://suvoga-os-tjaa.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Tiendas / Commerce',
    notes: 'Catálogo de pedidos público legacy / NO ENVIAR AL CLIENTE.'
  },
  {
    name: 'Luma Intelligence Hub',
    url: 'https://luma-intelligence-hub.vercel.app/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Servicios profesionales',
    notes: 'Centro de control comercial principal y visualización de auditorías internas / NO ENVIAR AL CLIENTE.'
  },
  {
    name: 'Gelatinas y Postres',
    url: 'https://gelatinasypostres.info/',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Tiendas / Commerce',
    notes: 'E-commerce de alimentos legacy / NO ENVIAR AL CLIENTE.'
  },
  {
    name: 'Luma Commerce OS Admin — Demo Ficticia',
    url: 'https://luma-commerce-os-demo.vercel.app/admin',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Tiendas / Commerce',
    notes: 'Consola administrativa demo (Nexa Store) con datos simulados/ficticios / NO ENVIAR AL CLIENTE.'
  },
  {
    name: 'SuVoGa admin',
    url: 'https://suvoga-os-tjaa.vercel.app/admin',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Tiendas / Commerce',
    notes: 'Gestor interno de catálogo y pedidos legacy / NO ENVIAR AL CLIENTE.'
  },
  {
    name: 'Luma Outreach Console',
    url: 'https://luma-outreach-console.vercel.app/console/luma-premium?section=command',
    status: 'internal_only',
    badge: 'Interno',
    action: 'Solo consulta interna',
    canCopy: false,
    canOpen: true,
    category: 'Servicios profesionales',
    notes: 'Consola de prospección comercial fría interna / NO ENVIAR AL CLIENTE.'
  }
];

// Configuración de Playbooks para William (7 nichos)
const clientesData = (demosList: Demo[]): ClienteConfig[] => [
  {
    id: 'real-estate',
    niche: 'Inmobiliarias',
    icon: Building2,
    idealClient: 'Constructoras, desarrolladoras inmobiliarias, corredores y brokers que comercializan proyectos en planos o listados premium y buscan impresionar a compradores exigentes.',
    problem: 'Uso de PDFs pesados, páginas lentas o portales genéricos que no transmiten confianza ni exclusividad, lo que reduce la captación de inversores de alto valor.',
    recommendedProduct: 'Real Estate OS',
    demos: demosList.filter(d => d.name.includes('Real Estate')),
    priceFrom: 'Desde RD$65,000–RD$120,000 para landing de proyecto premium. Desarrollo completo desde RD$150,000–RD$350,000+ según tipologías.',
    nextStep: 'Simular la navegación de un usuario en móvil, mostrar la velocidad de carga de las imágenes y definir la estructura del proyecto actual del cliente.',
    messageShort: 'Hola [Nombre], te comparto esta demo de presentación premium para proyectos inmobiliarios. Carga instantáneamente y filtra prospectos calificados en automático: https://luma-real-estate-os-demo.vercel.app/',
    messageContext: 'Esta demo no es una página web genérica. Es una muestra de infraestructura comercial inmobiliaria: presenta el proyecto, educa al comprador, separa perfiles de interés y lleva al prospecto hacia una solicitud de información o reunión.',
    whatNotToPromise: [
      'No prometer integraciones automáticas con CRMs inmobiliarios de baja calidad sin evaluar antes.',
      'No asegurar ventas inmediatas, sino una captación y calificación de leads sumamente profesional.'
    ],
    noteForWilliam: 'Presentar la demo haciendo foco en la velocidad de carga móvil y en cómo capta el interés del comprador de alto nivel adquisitivo. No vendas "diseño"; vende orden, control de leads y presentación corporativa.'
  },
  {
    id: 'spa',
    niche: 'Beauty / Spa',
    icon: Sparkles,
    idealClient: 'Spas, centros estéticos, clínicas de bienestar, peluquerías premium y profesionales independientes del cuidado personal.',
    problem: 'El personal pierde horas respondiendo preguntas básicas sobre servicios, precios y disponibilidad en WhatsApp o Instagram. El agendamiento manual genera ausencias no justificadas.',
    recommendedProduct: 'Beauty Spa OS',
    demos: demosList.filter(d => d.name.includes('Beauty Spa')),
    priceFrom: 'Desde RD$35,000–RD$75,000 para presencia premium y catálogo de servicios. Desde RD$65,000–RD$150,000+ si incluye Concierge inteligente y sistema de agendamiento.',
    nextStep: 'Simular el agendamiento en el botón de Concierge, revisar el flujo de preguntas y estructurar las preguntas clave de calificación comercial del cliente.',
    messageShort: 'Hola [Nombre], mira cómo puedes automatizar las consultas y citas de tu estética con esta demo de concierge inteligente: https://luma-beauty-spa-os-demo.vercel.app/',
    messageContext: 'Esta demo oficial de Luma Beauty Spa OS incluye un asistente conversacional (Concierge) que precalifica al cliente sobre sus necesidades estéticas y le permite simular el agendamiento, quitando carga operativa a tu recepción: https://luma-beauty-spa-os-demo.vercel.app/',
    whatNotToPromise: [
      'No prometer que la IA resolverá consultas médicas complejas o prescribirá tratamientos específicos.',
      'No prometer integraciones con software de reservas muy antiguos que no posean APIs modernas.'
    ],
    noteForWilliam: 'William: cuando hables con spas o centros estéticos, no vendas “una web”. Presenta esto como una experiencia comercial para captar consultas, ordenar preguntas frecuentes y elevar la percepción premium del negocio.'
  },
  {
    id: 'commerce',
    niche: 'Tiendas / Commerce',
    icon: ShoppingBag,
    idealClient: 'Tiendas físicas, marcas de productos, perfumes, cosmética, boutiques, regalos, accesorios, repuestos ligeros y negocios que venden por WhatsApp o Instagram pero no tienen un sistema claro de catálogo, pedido, seguimiento y control.',
    problem: 'El negocio vende por mensajes sueltos, catálogos desordenados, notas manuales o Excel. Pierde pedidos, no mide oportunidades, no organiza clientes, no controla cuentas por cobrar y depende demasiado de WhatsApp sin estructura.',
    recommendedProduct: 'Commerce OS',
    demos: demosList.filter(d => d.name.includes('Commerce OS') && !d.name.includes('legacy')),
    priceFrom: 'Desde RD$45,000–RD$95,000 para tienda premium con admin base. Desde RD$120,000–RD$250,000+ si incluye CRM, Google Sheets, automatización, CxC e integraciones. Mantenimiento: RD$8,000–RD$25,000 mensual.',
    nextStep: 'Mostrar la tienda, simular un pedido, abrir el admin demo y levantar cómo vende actualmente el cliente: productos, formas de pago, entrega, WhatsApp, seguimiento y reportes necesarios.',
    messageShort: 'Te comparto una demo de tienda premium donde una marca puede mostrar productos, recibir pedidos y organizar clientes desde un sistema propio, sin depender solo de WhatsApp o catálogos sueltos: https://luma-commerce-os-demo.vercel.app/',
    messageContext: 'Esta demo no es solo una tienda bonita. Es una muestra de infraestructura comercial para negocios de productos: catálogo, carrito, pedido, clientes, seguimiento y panel interno. La idea es que el negocio venda mejor, pierda menos conversaciones y tenga más control sobre su operación.',
    whatNotToPromise: [
      'No prometer pasarelas de pago, WhatsApp API oficiales, automatizaciones de inventario avanzado o conexión contable sin levantar alcance detallado.',
      'No decir que es un desarrollo estándar en Shopify (es infraestructura personalizada).',
      'No prometer ventas inmediatas.',
      'No conectar datos reales del cliente sin su autorización explícita.'
    ],
    noteForWilliam: 'William: si el cliente vende productos por WhatsApp, Instagram o tienda física y se queja de desorden, pedidos perdidos, falta de seguimiento o falta de control, usa Commerce OS. No vendas “página web”. Vende orden comercial, presentación premium, pedidos claros y seguimiento.'
  },
  {
    id: 'b2b',
    niche: 'B2B corporativo',
    icon: Briefcase,
    idealClient: 'Empresas de servicios, distribuidores, proveedores industriales y negocios B2B con ciclos de venta basados en cotizaciones y propuestas comerciales.',
    problem: 'Ciclos de venta largos y frustrantes. Se envían presupuestos y propuestas comerciales en archivos PDF estáticos y no se sabe si se abrieron o si hay interés real del tomador de decisión.',
    recommendedProduct: 'B2B Corporate OS',
    demos: demosList.filter(d => d.name.includes('Inox Minier') || d.name.includes('B2B Corporate')),
    priceFrom: 'Desde RD$150,000–RD$250,000+ (según pipelines e integraciones de correo y control de propuestas).',
    nextStep: 'Mostrar el caso real de Inox Minier para ilustrar la visualización de un catálogo industrial y agendar reunión técnica una vez liberada la demo oficial.',
    messageShort: 'Hola [Nombre], vi tus soluciones de servicios B2B. Los prospectos corporativos exigen respuestas rápidas. Estamos preparando el sistema B2B Corporate OS con métricas en caliente para cotizaciones: https://inox-minier.com/',
    messageContext: 'Esta es una muestra de infraestructura comercial para negocios B2B. Te comparto el caso de Inox Minier para mostrar la velocidad del catálogo industrial y la estructura corporativa premium que integramos para optimizar pipelines: https://inox-minier.com/',
    whatNotToPromise: [
      'No prometer base de datos de leads corporativos lista para prospectar de forma masiva sin estrategia previa.',
      'No prometer que el portal reemplazará el trabajo humano de relación y cierre del ejecutivo.'
    ],
    noteForWilliam: 'William: usa los casos reales de Depot Graphics e Inox Minier para mostrar la capacidad visual y experiencia B2B corporativa de Luma. No los presentes como demos SaaS, sino como referencias de clientes reales.'
  },
  {
    id: 'servicios',
    niche: 'Servicios profesionales',
    icon: UserCheck,
    idealClient: 'Profesionales de servicios, consultores, agencias, marcas personales, coaches y freelancers de alto nivel que venden intangibles de alto ticket.',
    problem: 'Baja autoridad digital. Sitios web o perfiles sociales genéricos que no reflejan el verdadero valor de sus servicios, limitando su capacidad para cobrar tarifas premium.',
    recommendedProduct: 'Personal Brand OS',
    demos: demosList.filter(d => d.name.includes('Depot Graphics') || d.name.includes('Personal Brand')),
    priceFrom: 'Desde RD$55,000–RD$90,000 (según secciones, contenido interactivo, agendas y testimoniales).',
    nextStep: 'Hacer una videollamada corta para sugerirles 3 cambios clave en el diseño de su web actual y mostrarles cómo Depot Graphics ordena sus propuestas.',
    messageShort: 'Hola [Nombre], estuve revisando tu perfil. Tu contenido es de gran valor, pero tu presentación web no refleja ese mismo nivel de autoridad profesional. Diseñamos portafolios interactivos premium: https://depotgraphics.com',
    messageContext: 'Diseñamos infraestructuras web para profesionales y marcas que quieren elevar su posicionamiento. Te comparto el caso de referencia de Depot Graphics para que aprecies el nivel tipográfico, la velocidad y la experiencia corporativa premium: https://depotgraphics.com',
    whatNotToPromise: [
      'No prometer aumento automático de seguidores en redes o viralidad sin estrategias de pauta.',
      'No prometer que la web solucionará fallas en el modelo de monetización o fijación de precios del profesional.'
    ],
    noteForWilliam: 'William: enfócate en el valor percibido del profesional. Si tiene una web mediocre, está perdiendo clientes de ticket alto. Vende autoridad y posicionamiento premium.'
  },
  {
    id: 'cursos',
    niche: 'Academy / cursos',
    icon: GraduationCap,
    idealClient: 'Infoproductores, academias, centros de formación y creadores de contenido que quieren vender cursos en su propia plataforma.',
    problem: 'Dependencia de plataformas de terceros con altas comisiones de venta (hasta el 10% por alumno) y falta de control sobre la marca, la base de datos de estudiantes y las automatizaciones post-venta.',
    recommendedProduct: 'Academy OS',
    demos: demosList.filter(d => d.name.includes('Academy OS')),
    priceFrom: 'Desde RD$90,000–RD$180,000+ (según número de módulos e integraciones con pasarelas).',
    nextStep: 'Programar llamada de diagnóstico sobre plataformas de cursos actuales y proponer migración para aumentar márgenes netos.',
    messageShort: 'Hola [Nombre], vi tus cursos. Muchas plataformas se quedan con comisiones de hasta el 10% por alumno. Diseñamos sistemas educativos propios bajo marca privada con pasarela directa a tu banco.',
    messageContext: 'Muchos infoproductores pierden miles de dólares en Hotmart o Teachable. Academy OS te permite tener el control absoluto de tus alumnos, tus datos y tus pagos directamente a tu cuenta local sin comisiones intermedias.',
    whatNotToPromise: [
      'No prometer la edición, grabación o producción del contenido audiovisual de los cursos.',
      'No prometer tráfico orgánico masivo de estudiantes por el simple hecho de instalar el portal de cursos.'
    ],
    noteForWilliam: 'William: si el cliente ya vende cursos y se queja de las comisiones abusivas, ofrécele Academy OS. Explica que recuperará su inversión en pocos meses al eliminar comisiones por transacción.'
  },
  {
    id: 'whatsapp-leads',
    niche: 'WhatsApp Lead Recovery',
    icon: MessageSquare,
    idealClient: 'Negocios de productos o servicios que reciben decenas de leads diarios por redes sociales y chats, pero tardan en contestar o no hacen seguimiento estructurado.',
    problem: 'Saturación en canales de chat y falta de automatización inicial. El 50% de las ventas por chat se pierden por no responder en los primeros 5 minutos.',
    recommendedProduct: 'WhatsApp Lead Recovery OS',
    demos: demosList.filter(d => d.name.includes('WhatsApp Lead Recovery') || d.name.includes('Concierge OS')),
    priceFrom: 'Desde RD$35,000–RD$75,000 (según la cantidad de integraciones, APIs y complejidad de reglas del bot).',
    nextStep: 'Hacerles una simulación real de la IA enviándoles el número del bot de prueba para que experimenten el flujo conversacional en vivo.',
    messageShort: 'Hola [Nombre], noté que en horas pico tardan en responder las consultas de WhatsApp de nuevos prospectos. El 50% de las ventas por chat se pierden por no responder en los primeros 5 minutos. Mira cómo un concierge con IA responde al instante.',
    messageContext: 'La velocidad en chats define el cierre. WhatsApp Lead Recovery OS es un concierge con inteligencia artificial que conversa con el prospecto, califica su presupuesto e interés y te entrega el lead listo para cerrar en menos de 1 minuto.',
    whatNotToPromise: [
      'No recomendar ni prometer el uso de herramientas no oficiales que puedan provocar el bloqueo del número de WhatsApp.',
      'No asegurar que la IA cerrará la venta sin la intervención del equipo humano en la fase final de negociación.'
    ],
    noteForWilliam: 'William: la velocidad de respuesta lo es todo. Si tardan en responder, están regalando clientes a la competencia. Vende respuesta instantánea 24/7 y precalificación comercial limpia.'
  }
];

const lineasProducto: LineaProducto[] = [
  { title: 'Diagnóstico Digital / Luma Intelligence', desc: 'Auditoría comercial y técnica preliminar basada en velocidad de carga, UX, SEO, píxeles de tracking y tiempos de respuesta en canales.', invest: 'Cortesía comercial / Según alcance' },
  { title: 'Landing Premium', desc: 'Diseño UX/UI a medida enfocado en conversión con rendimiento óptimo y velocidad de carga sobresaliente.', invest: 'Desde $1,200 USD (RD$70,000+)' },
  { title: 'Concierge Inteligente', desc: 'Asistente con Inteligencia Artificial entrenado con información comercial para calificar leads y agendar citas 24/7.', invest: 'Desde $800 USD (RD$48,000+)' },
  { title: 'CRM / Sistema Comercial Privado', desc: 'Infraestructura digital personalizada para administración de ventas, pipelines y automatizaciones comerciales.', invest: 'Desde $1,500 USD (RD$90,000+)' },
  { title: 'Commerce OS', desc: 'E-commerce interactivo acoplado a un CRM de seguimiento para la gestión de productos y CxC.', invest: 'Desde $2,500 USD (RD$150,000+)' },
  { title: 'Real Estate OS', desc: 'Sistema inmobiliario completo para catalogar propiedades con filtros de alta velocidad y captación de leads.', invest: 'Desde $3,000 USD (RD$180,000+)' },
  { title: 'Automatización / Lead Recovery', desc: 'Sistemas de recuperación de leads en WhatsApp y carritos abandonados con agentes conversacionales integrados.', invest: 'Desde $600 USD (RD$35,000+)' },
  { title: 'Mantenimiento mensual', desc: 'Soporte prioritario, respaldos, actualizaciones, hosting y optimización técnica permanente.', invest: 'Desde $150 USD / mes (RD$8,000+ / mes)' }
];

export default function SalesRoom() {
  const [activeTab, setActiveTab] = useState<'official' | 'real_cases' | 'playbooks' | 'upcoming' | 'internal' | 'catalog'>('official');
  const [selectedId, setSelectedId] = useState<string>('real-estate');
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({});

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  const officialDemos = ALL_DEMOS.filter(d => d.status === 'official_demo');
  const realCases = ALL_DEMOS.filter(d => d.status === 'real_case');
  const upcomingDemos = ALL_DEMOS.filter(d => d.status === 'in_preparation');
  const internalArchive = ALL_DEMOS.filter(d => d.status === 'internal_only');

  const playbooksList = clientesData(ALL_DEMOS);
  const selectedPlaybook = playbooksList.find(p => p.id === selectedId) || playbooksList[0];
  const PlaybookIcon = selectedPlaybook.icon;

  const getStatusBadgeStyles = (status: DemoStatus) => {
    switch (status) {
      case 'official_demo':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'real_case':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'in_preparation':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'internal_only':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getActionStyles = (action: WilliamActionType) => {
    switch (action) {
      case 'Mostrar al cliente':
        return 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5';
      case 'Caso de referencia':
        return 'text-blue-400 border-blue-500/10 bg-blue-500/5';
      case 'En preparación':
        return 'text-amber-400 border-amber-500/10 bg-amber-500/5';
      case 'Solo consulta interna':
        return 'text-rose-400 border-rose-500/10 bg-rose-500/5';
      case 'No enviar todavía':
        return 'text-rose-400 border-rose-500/10 bg-rose-500/5';
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
              Sistema de ventas por valor de Luma Premium. Mitigación y control de enlaces compartidos.
            </p>
          </div>

          {/* Navegación por pestañas (6 Pestañas) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('official')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'official'
                  ? 'bg-emerald-500 text-black border-emerald-500'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Demos Oficiales ({officialDemos.length})
            </button>

            <button
              onClick={() => setActiveTab('real_cases')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'real_cases'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Casos Reales
            </button>

            <button
              onClick={() => setActiveTab('playbooks')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'playbooks'
                  ? 'bg-amber-500 text-black border-amber-500'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Playbooks de Venta
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'upcoming'
                  ? 'bg-amber-600/20 text-amber-400 border-amber-600/40'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Próximas Demos ({upcomingDemos.length})
            </button>

            <button
              onClick={() => setActiveTab('internal')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'internal'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-transparent text-rose-500/40 border-rose-500/10 hover:border-rose-500/20'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Archivo Interno ({internalArchive.length})
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-transparent text-gray-500 border-white/5 hover:border-white/10'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Líneas de Producto
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* PESTAÑA 1: DEMOS OFICIALES */}
        {activeTab === 'official' && (
          <div className="space-y-6">
            <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Globe className="text-emerald-500 w-6 h-6" /> Demos Oficiales Enviables
              </h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1.5">
                Demos SaaS oficiales autorizadas para ser compartidas directamente con los clientes. El copiado rápido de enlace y redirección están habilitados.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {officialDemos.map((demo, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0a0c] border border-emerald-500/10 hover:border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.02)]"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${getStatusBadgeStyles(demo.status)}`}>
                            {demo.badge}
                          </span>
                          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${getActionStyles(demo.action)}`}>
                            {demo.action}
                          </span>
                          <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded border border-white/10 text-gray-400 bg-white/5">
                            {demo.category}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-white text-lg md:text-xl mt-3">{demo.name}</h3>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {demo.notes}
                    </p>

                    <div className="space-y-2.5 border-t border-white/5 pt-4">
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Cliente Ideal</span>
                        <span className="text-xs text-gray-300 font-light">{demo.idealClient}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Dolor Comercial</span>
                        <span className="text-xs text-gray-300 font-light">{demo.commercialPain}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Qué Demuestra</span>
                        <span className="text-xs text-gray-300 font-light">{demo.whatItShows}</span>
                      </div>
                    </div>

                    {/* Sublinks o Enlaces Secundarios */}
                    {(demo.secondaryUrl || demo.url) && (
                      <div className="space-y-2 border-t border-white/5 pt-4">
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block font-mono">
                          Enlaces de Acceso
                        </span>
                        <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400 font-mono break-all">{demo.url}</span>
                          </div>
                          {demo.secondaryUrl && (
                            <div className="border-t border-white/5 pt-1.5 mt-1.5 flex flex-col gap-0.5">
                              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wide">
                                {demo.secondaryUrlLabel || 'Sublink Oficial'}:
                              </span>
                              <a
                                href={demo.secondaryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-400 hover:text-amber-300 hover:underline font-mono text-xs break-all"
                              >
                                {demo.secondaryUrl}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                    <div className="flex gap-2">
                      <a
                        href={demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5 border border-white/5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Abrir Demo</span>
                      </a>

                      <button
                        onClick={() => handleCopyText(demo.url, `official-copy-${idx}`)}
                        className="flex-1 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold rounded-lg text-emerald-400 hover:text-emerald-300 transition-all flex items-center justify-center gap-1.5 border border-emerald-500/20"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copyStatus[`official-copy-${idx}`] ? '¡Copiado!' : 'Copiar Enlace'}</span>
                      </button>
                    </div>

                    {demo.secondaryUrl && (
                      <div className="flex gap-2 pt-1">
                        <a
                          href={demo.secondaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-amber-500/5 hover:bg-amber-500/10 text-xs font-semibold rounded-lg text-amber-400 hover:text-amber-300 transition-all flex items-center justify-center gap-1.5 border border-amber-500/15"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{demo.secondaryUrlLabel || 'Ver Sublink'}</span>
                        </a>
                        <button
                          onClick={() => handleCopyText(demo.secondaryUrl!, `official-sec-copy-${idx}`)}
                          className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5 border border-white/5"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copyStatus[`official-sec-copy-${idx}`] ? '¡Copiado!' : 'Copiar Subenlace'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESTAÑA 2: CASOS REALES / REFERENCIA CORPORATIVA */}
        {activeTab === 'real_cases' && (
          <div className="space-y-6">
            <div className="bg-[#0a0a0c] border border-blue-500/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Briefcase className="text-blue-500 w-6 h-6" /> Casos Reales B2B / Referencia Corporativa
              </h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1.5 leading-relaxed">
                Proyectos a medida e infraestructuras corporativas desarrolladas para marcas reales. Sirven como demostración técnica de capacidad visual y solidez B2B.
              </p>

              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mt-6 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-blue-300 font-medium leading-relaxed">
                  “Usar para mostrar capacidad visual, estructura corporativa y experiencia B2B. No presentar como demo SaaS.”
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {realCases.map((demo, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0a0c] border border-blue-500/10 hover:border-blue-500/20 rounded-2xl p-6 flex flex-col justify-between transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded border bg-blue-500/10 text-blue-400 border-blue-500/20">
                        Caso Real
                      </span>
                      <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded border bg-gray-800 text-gray-400 border-white/5">
                        Referencia Corporativa
                      </span>
                    </div>

                    <h3 className="font-extrabold text-white text-lg">{demo.name}</h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{demo.notes}</p>
                    <p className="text-xs text-gray-500 font-mono break-all">{demo.url}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex gap-3">
                    <a
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5 border border-white/5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Abrir Sitio</span>
                    </a>

                    <div className="flex-1 py-2 bg-[#10141f] text-[10px] font-semibold rounded-lg text-blue-400/60 cursor-not-allowed flex items-center justify-center gap-1 border border-blue-500/5">
                      <Lock className="w-3 h-3 text-blue-500/40" />
                      <span>Referencia Corporativa</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESTAÑA 3: PLAYBOOKS DE VENTA */}
        {activeTab === 'playbooks' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Selector Lateral de Nichos */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                Estrategia por Nicho
              </h2>
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
                {playbooksList.map((playbook) => {
                  const Icon = playbook.icon;
                  const isSelected = playbook.id === selectedId;
                  return (
                    <button
                      key={playbook.id}
                      onClick={() => setSelectedId(playbook.id)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left text-xs md:text-sm font-semibold whitespace-nowrap lg:whitespace-normal transition-all w-full shrink-0 lg:shrink ${
                        isSelected
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/40 shadow-[0_0_15px_rgba(217,119,6,0.03)]'
                          : 'bg-[#0a0a0c] text-gray-400 border-white/5 hover:border-white/10 hover:text-gray-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-500' : 'text-gray-500'}`} />
                      <span>{playbook.niche}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ficha del Nicho */}
            <div className="lg:col-span-3 space-y-6">

              {/* Encabezado del Playbook */}
              <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                    <PlaybookIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">
                      Playbook: {selectedPlaybook.niche}
                    </h3>
                    <p className="text-xs text-amber-500 font-mono tracking-widest uppercase mt-0.5">
                      Línea principal: {selectedPlaybook.recommendedProduct}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Cliente Ideal</span>
                    <p className="text-xs md:text-sm text-gray-300 mt-1 font-light leading-relaxed">
                      {selectedPlaybook.idealClient}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Dolor Comercial Principal
                    </span>
                    <p className="text-xs md:text-sm text-gray-300 mt-1 font-light leading-relaxed">
                      {selectedPlaybook.problem}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Precio Guía Recomendado</span>
                    <p className="text-sm font-semibold font-mono text-white mt-1">
                      {selectedPlaybook.priceFrom}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">Siguiente Paso Comercial</span>
                    <p className="text-xs md:text-sm text-amber-400 font-semibold mt-1">
                      {selectedPlaybook.nextStep}
                    </p>
                  </div>
                </div>
              </div>

              {/* Qué Demo Mostrar */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">
                  Demos Recomendadas para Mostrar
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPlaybook.demos.map((demo, idx) => (
                    <div
                      key={idx}
                      className={`bg-[#0a0a0c] border rounded-xl p-5 flex flex-col justify-between transition-colors ${
                        demo.status === 'official_demo'
                          ? 'border-emerald-500/10 hover:border-emerald-500/30'
                          : demo.status === 'real_case'
                            ? 'border-blue-500/10 hover:border-blue-500/30'
                            : 'border-white/5'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded border ${getStatusBadgeStyles(demo.status)}`}>
                            {demo.badge}
                          </span>
                          <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded border border-white/5 text-gray-400 bg-white/5">
                            {demo.category}
                          </span>
                        </div>
                        <h5 className="font-extrabold text-white text-sm mt-1">{demo.name}</h5>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">{demo.notes}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                        {demo.canOpen ? (
                          <a
                            href={demo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1 border border-white/5"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Abrir Demo</span>
                          </a>
                        ) : (
                          <div className="flex-1 py-1.5 bg-black/40 text-xs font-semibold rounded-lg text-gray-600 cursor-not-allowed flex items-center justify-center gap-1 border border-white/5">
                            <Link2Off className="w-3 h-3" />
                            <span>No disponible</span>
                          </div>
                        )}

                        {demo.canCopy ? (
                          <button
                            onClick={() => handleCopyText(demo.url, `playbook-copy-${selectedPlaybook.id}-${idx}`)}
                            className="flex-1 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold rounded-lg text-emerald-400 hover:text-emerald-300 transition-all flex items-center justify-center gap-1 border border-emerald-500/20"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copyStatus[`playbook-copy-${selectedPlaybook.id}-${idx}`] ? 'Copiado' : 'Copiar Link'}</span>
                          </button>
                        ) : (
                          <div className="flex-1 py-1.5 bg-[#120a0a] text-[10px] font-semibold rounded-lg text-red-500/50 cursor-not-allowed flex items-center justify-center gap-1 border border-red-500/5">
                            <Lock className="w-3.5 h-3.5 text-red-500/40" />
                            <span>No Enviable</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mensajes y Plantillas de Copiado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Textos Copiables para Redes / WhatsApp */}
                <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-2.5">
                    <MessageSquare className="w-4 h-4 text-amber-500" /> Mensajes de Primer Contacto
                  </h4>

                  <div className="space-y-4">
                    <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">
                          Mensaje WhatsApp Corto
                        </span>
                        <button
                          onClick={() => handleCopyText(selectedPlaybook.messageShort, 'play-short')}
                          className="px-2 py-0.5 bg-white/5 hover:bg-white/10 text-[9px] font-semibold rounded text-gray-400 hover:text-white transition-all flex items-center gap-1 border border-white/5"
                        >
                          <Copy className="w-2.5 h-2.5" />
                          <span>{copyStatus['play-short'] ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-300 font-mono leading-relaxed bg-black/10 p-2 rounded border border-white/5">
                        {selectedPlaybook.messageShort}
                      </p>
                    </div>

                    <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">
                          Mensaje Con Contexto / Seguimiento
                        </span>
                        <button
                          onClick={() => handleCopyText(selectedPlaybook.messageContext, 'play-ctx')}
                          className="px-2 py-0.5 bg-white/5 hover:bg-white/10 text-[9px] font-semibold rounded text-gray-400 hover:text-white transition-all flex items-center gap-1 border border-white/5"
                        >
                          <Copy className="w-2.5 h-2.5" />
                          <span>{copyStatus['play-ctx'] ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-300 font-mono leading-relaxed bg-black/10 p-2 rounded border border-white/5">
                        {selectedPlaybook.messageContext}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Argumentario y Prevención */}
                <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 space-y-6">

                  {/* Qué NO prometer / Qué NO enviar */}
                  <div>
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-white/5 pb-2.5">
                      <XCircle className="w-4 h-4 text-red-500" /> Qué NO Prometer / Enviar
                    </h4>
                    <ul className="space-y-2.5 mt-3">
                      {selectedPlaybook.whatNotToPromise.map((item, idx) => (
                        <li key={idx} className="text-xs text-gray-300 font-light flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nota Operativa William */}
                  <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/15">
                    <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block font-mono">
                      Nota Comercial para William
                    </span>
                    <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed italic">
                      “{selectedPlaybook.noteForWilliam}”
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* PESTAÑA 4: PRÓXIMAS DEMOS */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            <div className="bg-[#0a0a0c] border border-amber-600/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Clock className="text-amber-500 w-6 h-6" /> Próximas Demos (En preparación)
              </h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1.5">
                Módulos del ecosistema en fase de saneamiento de código o maquetación inicial. William las puede plantear como soluciones en desarrollo para preventas estructuradas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingDemos.map((demo, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0a0c] border border-amber-500/5 hover:border-amber-500/25 rounded-2xl p-6 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded border bg-amber-500/10 text-amber-500 border-amber-500/20">
                        {demo.badge}
                      </span>
                      <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded border bg-gray-900 text-gray-400 border-white/5">
                        Producto Vendible
                      </span>
                    </div>

                    <h3 className="font-extrabold text-white text-base mt-1">{demo.name}</h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{demo.notes}</p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex gap-2">
                    <div className="flex-1 py-2 bg-black/40 text-xs font-semibold rounded-lg text-gray-600 cursor-not-allowed flex items-center justify-center gap-1.5 border border-white/5">
                      <Link2Off className="w-3.5 h-3.5" />
                      <span>En Preparación</span>
                    </div>
                    <div className="flex-1 py-2 bg-black/40 text-xs font-semibold rounded-lg text-gray-600 cursor-not-allowed flex items-center justify-center gap-1.5 border border-white/5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Sin Enlace</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESTAÑA 5: ARCHIVO INTERNO */}
        {activeTab === 'internal' && (
          <div className="space-y-6">

            {/* Cartel de Advertencia Crítica */}
            <div className="bg-[#1a0c0c] border border-rose-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-5 items-start">
              <div className="p-4 bg-rose-500/15 text-rose-500 rounded-2xl shrink-0">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg md:text-2xl font-black text-rose-500 uppercase tracking-tight flex items-center gap-2">
                  ARCHIVO INTERNO — EXCLUSIVO PARA MARCOS & WILLIAM
                </h2>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                  Esta pestaña contiene consolas administrativas internas reales, versiones legacy antiguas con datos confidenciales, listados no saneados o plataformas asociadas a clientes privados (como Ivette Berroa).
                </p>
                <div className="inline-block bg-rose-500 text-black text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-rose-600 shadow-[0_0_15px_rgba(239,68,68,0.2)] mt-2">
                  NO ENVIAR AL CLIENTE
                </div>
              </div>
            </div>

            {/* Listado de Archivos Internos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internalArchive.map((demo, idx) => (
                <div
                  key={idx}
                  className="bg-[#0f0909] border border-rose-500/10 hover:border-rose-500/30 rounded-2xl p-6 flex flex-col justify-between transition-all opacity-80 hover:opacity-100"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded border bg-rose-500/10 text-rose-400 border-rose-500/20">
                        {demo.badge}
                      </span>
                      <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded border bg-[#1c0808] text-rose-500 border-rose-950">
                        NO ENVIAR
                      </span>
                    </div>

                    <h3 className="font-extrabold text-gray-200 text-base">{demo.name}</h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">{demo.notes}</p>
                    <p className="text-[10px] text-gray-600 font-mono break-all bg-black/45 p-2 rounded border border-white/5">
                      {demo.url}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex gap-2">
                    {demo.canOpen ? (
                      <a
                        href={demo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1 border border-white/5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspeccionar</span>
                      </a>
                    ) : (
                      <div className="flex-1 py-1.5 bg-black/40 text-xs font-semibold rounded-lg text-gray-600 cursor-not-allowed flex items-center justify-center gap-1.5 border border-white/5">
                        <Link2Off className="w-3.5 h-3.5" />
                        <span>No Disponible</span>
                      </div>
                    )}

                    <div className="flex-1 py-1.5 bg-[#261010] text-[10px] font-bold rounded-lg text-rose-400 cursor-not-allowed flex items-center justify-center gap-1 border border-rose-950/40">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                      <span>Envío Bloqueado</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESTAÑA 6: LÍNEAS DE PRODUCTO */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Package className="text-gray-400 w-6 h-6" /> Líneas de Producto & Precios Guía
              </h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1.5">
                Alcances y marcos de inversión sugeridos para las cotizaciones comerciales de Luma Premium.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lineasProducto.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0a0c] border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col justify-between transition-colors"
                >
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-white text-base md:text-lg">{p.title}</h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{p.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Presupuesto Sugerido</span>
                    <span className="text-xs font-semibold font-mono text-amber-500">{p.invest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer Comercial Interno */}
      <footer className="border-t border-white/5 py-8 mt-12 bg-black text-center text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4">
          <p className="uppercase tracking-widest text-[9px] text-gray-500 font-bold">
            Luma Premium Ecosistema Comercial
          </p>
          <p className="mt-1 text-[11px]">
            Documento Confidencial. Solo para uso operativo de Marcos Hilario, William y aliados.
          </p>
        </div>
      </footer>
    </div>
  );
}
