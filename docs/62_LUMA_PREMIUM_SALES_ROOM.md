# Luma Premium Sales Room - Playbook Comercial

Este documento detalla el protocolo oficial para que **William** y **Marcos** utilicen la **Sales Room** (`/sales-room`) de manera segura, protegiendo los accesos administrativos internos y asegurando que solo se compartan con clientes demos públicas 100% estables.

---

## 1. Clasificación del Ecosistema de Demos

Para mitigar el riesgo de enviar enlaces caídos, inaccesibles o consolas con datos confidenciales de administración, cada demo se ha clasificado de la siguiente manera:

### A. Demos Oficiales Activas (Enviar al Cliente)
*   **Protocolo**: Estas son las 5 demos SaaS oficiales autorizadas. El botón **"Copiar Enlace"** y **"Abrir Demo"** están habilitados. Los precios guías están en Pesos Dominicanos (`RD$`).
*   **Enlaces Oficiales**:
    *   **Luma Real Estate OS — Demo Privada**: `https://luma-real-estate-os-demo.vercel.app/`
    *   **Luma Beauty Spa OS — Demo Oficial**: `https://luma-beauty-spa-os-demo.vercel.app/` (con subenlace al concierge)
    *   **Luma Real Estate CRM OS — Demo Oficial**: `https://luma-real-estate-crm-os-demo.vercel.app/`
    *   **Luma Real Estate Concierge OS — Demo Oficial**: `https://luma-real-estate-concierge-os-demo.vercel.app/` (con subenlace al dashboard)
    *   **Luma Commerce OS — Demo Oficial / Nexa Store**: `https://luma-commerce-os-demo.vercel.app/` (con subenlace a admin con datos ficticios)

### B. Casos Reales / Referencia Corporativa (Mostrar como Ejemplo de Ingeniería B2B/Corporativa)
*   **Protocolo**: No son demos SaaS vendibles directamente, sino proyectos corporativos implementados para clientes reales. Aparecen en una sección exclusiva y no tienen habilitado el botón de copiado rápido, solo el de visualización.
*   **Enlaces Oficiales**:
    *   **Inox Minier — Caso Real / Referencia Corporativa**: `https://inox-minier.com/` (Catálogo industrial metalúrgico)
    *   **Depot Graphics — Caso Real / Referencia Corporativa**: `https://depotgraphics.com` (Servicios e impresión corporativa)

### C. Demos en Preparación (Próximos Lanzamientos)
*   **Protocolo**: No están activas públicamente (saneando código). William las puede mencionar como productos en desarrollo para cerrar ventas de preventa, pero los botones de abrir y copiar están desactivados.
*   **Demos en preparación (6)**:
    *   **Academy OS — Demo Oficial** (Educación)
    *   **Legal / Lease OS — Demo Oficial** (Contratos y alquileres)
    *   **B2B Corporate OS — Demo Oficial** (Proveedores corporativos)
    *   **Personal Brand OS — Demo Oficial** (Marca personal)
    *   **Perfumes / Retail OS — Demo Oficial** (Perfumes y Retail)
    *   **WhatsApp Lead Recovery OS — Demo Oficial** (Recuperación conversacional)

### D. Archivo Interno / NO ENVIAR AL CLIENTE
*   **Protocolo**: Son paneles de gestión de proyectos reales, consolas administrativas de demostración, versiones antiguas (legacy) o demos pendientes de saneamiento técnico. **Llevan la etiqueta explícita de seguridad "NO ENVIAR AL CLIENTE" y el botón de envío bloqueado.**
*   **Enlaces Oficiales**:
    *   **Luma Commerce OS Admin — Demo Ficticia**: `https://luma-commerce-os-demo.vercel.app/admin` (Admin de Nexa Store con datos de prueba ficticios, nunca mostrar como panel real de cliente)
    *   **Luma Commerce OS — Legacy**: `https://luma-commerce-os.vercel.app/` (Versión legacy interna)
    *   **Luma Boutique OS / Ivette Berroa — Proyecto Real**: `https://luma-boutique-os-ivette.vercel.app/` (No enviar, es una boutique de marca real)
    *   **Luma Boutique OS / Ivette Berroa Admin — Interno**: `https://luma-boutique-os-ivette.vercel.app/admin` (Acceso administrativo interno real)
    *   **Real Estate OS / visión estratégica**: `https://luma-premium.vercel.app/luma-estate-os`
    *   **Santuario Estética**: `https://santuario-estetica-mvp.vercel.app/`
    *   **Santuario Concierge**: `https://santuario-estetica-mvp.vercel.app/concierge`
    *   **Marcos Portfolio**: `https://marcos-portfolio-premium.vercel.app/`
    *   **Vista del Río**: `https://vista-del-rio-next.vercel.app/`
    *   **Luma Capilar**: `https://luma-capilar-saa-s.vercel.app/`
    *   **Luma Estate Pro**: `https://luma-estate-pro.vercel.app/`
    *   **SuVoGa público**: `https://suvoga-os-tjaa.vercel.app/`
    *   **Luma Intelligence Hub**: `https://luma-intelligence-hub.vercel.app/`
    *   **Gelatinas y Postres**: `https://gelatinasypostres.info/`
    *   **SuVoGa admin**: `https://suvoga-os-tjaa.vercel.app/admin`
    *   **Luma Outreach Console**: `https://luma-outreach-console.vercel.app/console/luma-premium?section=command`

---

## 2. Protocolo para William: ¿Cómo elegir la demo ideal?

William debe elegir la demo basándose en el nicho comercial del prospecto y el nivel de cualificación en el embudo de ventas:

```
[Nicho del Prospecto]
         │
         ├──► Real Estate  ──► Enviar Luma Real Estate OS / CRM / Concierge (Oficiales)
         ├──► Commerce     ──► Enviar Luma Commerce OS - Nexa Store (Oficial)
         │                     * Mostrar Admin Demo con datos ficticios en llamada
         ├──► Estética/Spa ──► Enviar Luma Beauty Spa OS (Oficial)
         │                     * Mostrar Concierge de reserva
         └──► B2B / Corp   ──► Enviar Inox Minier / Depot Graphics (Casos de Referencia)
```

### Reglas de Envío Seguro:
1.  **Validación en Sales Room**: William debe ingresar a `/sales-room` y verificar que la demo tenga el badge **"Demo oficial"** en verde antes de copiarla.
2.  **No mezclar Demos**: Nunca enviar consolas de administración o links legacy.
3.  **Uso de Mensajes pre-redactados**: Usar los botones de copiado rápido del panel y reemplazar solo los corchetes `[...]` con los datos reales del cliente antes de enviar.

---

## 3. Mapeo de Flujo: De Diagnóstico a Propuesta

El embudo de captación comercial premium se ejecuta en 3 pasos clave:

*   **Paso 1: Diagnóstico de Cortesía**: Se ofrece un análisis inicial rápido con el Hub (`/`). Esto detecta errores técnicos públicos de su web (fugas de píxeles, rendimiento lento, falta de captadores).
*   **Paso 2: La Llamada Estratégica**: William presenta los resultados del diagnóstico. Para resolver objeciones, abre las demos correspondientes en `/sales-room` en pantalla compartida.
*   **Paso 3: Propuesta Cerrada**: Se entrega una propuesta digital basada en las líneas de producto de Luma Premium, apuntando a solucionar las fugas detectadas en el Paso 1.
propuesta digital basada en las 7 líneas de producto de Luma Premium, apuntando a solucionar las fugas detectadas en el Paso 1.
