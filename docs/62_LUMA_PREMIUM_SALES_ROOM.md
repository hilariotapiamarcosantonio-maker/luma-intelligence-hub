# Luma Premium Sales Room - Playbook Comercial

Este documento detalla el protocolo oficial para que **William** y **Marcos** utilicen la **Sales Room** (`/sales-room`) de manera segura, protegiendo los accesos administrativos internos y asegurando que solo se compartan con clientes demos públicas 100% estables.

---

## 1. Clasificación del Ecosistema de Demos

Para mitigar el riesgo de enviar enlaces caídos, inaccesibles o consolas con datos confidenciales de administración, cada demo se ha clasificado en una de las siguientes tres categorías:

### A. Demos Públicas y Autorizadas (Enviar al Cliente)
*   **Protocolo**: Estas demos se pueden enviar directamente en chats fríos o de seguimiento. El botón **"Copiar Enlace"** está habilitado en la Sales Room para estas demos.
*   **Enlaces Oficiales**:
    *   **Luma Commerce OS — Demo Oficial / Nexa Store**: `https://luma-commerce-os-demo.vercel.app/`
    *   **Luma Real Estate OS — Demo Privada**: `https://luma-real-estate-os-demo.vercel.app/`
    *   **Luma Beauty Spa OS — Demo Oficial**: `https://luma-beauty-spa-os-demo.vercel.app/`
    *   **Luma Real Estate CRM OS — Demo Oficial**: `https://luma-real-estate-crm-os-demo.vercel.app/`
    *   **Luma Real Estate Concierge OS — Demo Oficial**: `https://luma-real-estate-concierge-os-demo.vercel.app/`
    *   **Santuario Estética**: `https://santuario-estetica-mvp.vercel.app/`
    *   **Santuario Concierge**: `https://santuario-estetica-mvp.vercel.app/concierge`
    *   **Luma Estate OS**: `https://luma-premium.vercel.app/luma-estate-os`
    *   **Marcos Portfolio**: `https://marcos-portfolio-premium.vercel.app/`
    *   **Vista del Río**: `https://vista-del-rio-next.vercel.app/`
    *   **Luma Capilar**: `https://luma-capilar-saa-s.vercel.app/`
    *   **Luma Estate Pro**: `https://luma-estate-pro.vercel.app/`
    *   **SuVoGa público**: `https://suvoga-os-tjaa.vercel.app/`
    *   **Luma Intelligence Hub**: `https://luma-intelligence-hub.vercel.app/`
    *   **Gelatinas y Postres**: `https://gelatinasypostres.info/`
    *   **Depot Graphics**: `https://depotgraphics.com`
    *   **Inox Minier**: `https://inox-minier.com/`

### B. Demos Privadas (Usar Solo en Reunión)
*   **Protocolo**: Estas demos están activas pero presentan detalles de visualización móvil o configuraciones que no deben enviarse sueltas en chats. **Solo se muestran compartiendo pantalla** durante una llamada de Zoom/Google Meet. El botón "Copiar Enlace" está bloqueado.
*   **Enlaces Oficiales**:
    *   *Nota: Las demos oficiales de Commerce y Spa se han saneado y subido a la categoría A. Actualmente no hay demos asignadas a esta categoría.*

### C. Consolas de Administración y Sistemas Internos (Prohibido Compartir)
*   **Protocolo**: Son paneles de gestión privada, referencias legacy o proyectos de clientes reales. Bajo ninguna circunstancia se debe enviar el enlace al cliente. Su visualización en reuniones debe ser controlada de forma estricta. El botón "Copiar Enlace" está desactivado y se marca con la advertencia **Link Privado**.
*   **Enlaces Oficiales**:
    *   **Luma Commerce OS admin (Demo Oficial)**: `https://luma-commerce-os-demo.vercel.app/admin`
    *   **Luma Commerce OS — Legacy**: `https://luma-commerce-os.vercel.app/`
    *   **Luma Boutique OS / Ivette Berroa — Proyecto Real**: `https://luma-boutique-os-ivette.vercel.app/`
    *   **Luma Boutique OS / Ivette Berroa Admin — Interno**: `https://luma-boutique-os-ivette.vercel.app/admin`
    *   **SuVoGa admin**: `https://suvoga-os-tjaa.vercel.app/admin`
    *   **Luma Outreach Console**: `https://luma-outreach-console.vercel.app/console/luma-premium?section=command`

---

## 2. Protocolo para William: ¿Cómo elegir la demo ideal?

William debe elegir la demo basándose en el nicho comercial del prospecto y el nivel de cualificación en el embudo de ventas:

```
[Nicho del Prospecto] 
         │
         ├──► Real Estate  ──► Enviar Luma Estate OS / Vista del Río (Públicos)
         ├──► Commerce     ──► Enviar Luma Capilar / Gelatinas y Postres (Públicos)
         │                     * Mostrar Luma Commerce OS en llamada en vivo
         ├──► Estética/Spa ──► Enviar Santuario Estética / Concierge (Públicos)
         └──► B2B / Corp   ──► Enviar Inox Minier (Público)
                               * Mostrar Outreach Console en llamada en vivo
```

### Reglas de Envío Seguro:
1.  **Validación en Sales Room**: William debe ingresar a `/sales-room` y verificar que la demo tenga el badge **"Público - Mostrar al cliente"** en verde antes de copiarla.
2.  **No modificar las URLs**: No acortar las URLs oficiales con herramientas externas (como bit.ly) para evitar bloqueos por filtros de spam de WhatsApp.
3.  **Uso de Mensajes pre-redactados**: Usar los botones de copiado rápido del panel y reemplazar solo los corchetes `[...]` con los datos reales del cliente antes de enviar.

---

## 3. Mapeo de Flujo: De Diagnóstico a Propuesta

El embudo de captación comercial premium se ejecuta en 3 pasos clave:

*   **Paso 1: Diagnóstico de Cortesía**: Se ofrece un análisis inicial rápido con el Hub (`/`). Esto detecta errores técnicos públicos de su web (fugas de píxeles, rendimiento lento, falta de captadores).
*   **Paso 2: La Llamada Estratégica**: William presenta los resultados del diagnóstico. Para resolver objeciones, abre las demos correspondientes en `/sales-room` en pantalla compartida (por ejemplo, mostrando la velocidad de *Vista del Río* frente a su portal lento).
*   **Paso 3: Propuesta Cerrada**: Se entrega una propuesta digital basada en las 7 líneas de producto de Luma Premium, apuntando a solucionar las fugas detectadas en el Paso 1.
