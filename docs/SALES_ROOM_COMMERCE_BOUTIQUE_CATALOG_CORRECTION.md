# Reporte de Corrección de Catálogo: Commerce y Boutique en Sales Room

Este documento registra los cambios realizados en el catálogo de demos y playbooks de **Luma Premium Sales Room** (`/sales-room`) para asegurar una correcta clasificación comercial, separando las demos públicas y autorizadas de los proyectos reales de clientes y las referencias internas/legacy.

---

## 1. Demos Oficiales Activas (5 Oficiales)

El Sales Room queda configurado estrictamente con exactamente **5 demos oficiales activas** y autorizadas para envío comercial o presentación directa:

1.  **Luma Real Estate OS — Demo Privada**
    *   *URL*: `https://luma-real-estate-os-demo.vercel.app/`
2.  **Luma Beauty Spa OS — Demo Oficial**
    *   *URL*: `https://luma-beauty-spa-os-demo.vercel.app/`
    *   *Concierge*: `https://luma-beauty-spa-os-demo.vercel.app/concierge`
3.  **Luma Real Estate CRM OS — Demo Oficial**
    *   *URL*: `https://luma-real-estate-crm-os-demo.vercel.app/`
4.  **Luma Real Estate Concierge OS — Demo Oficial**
    *   *URL*: `https://luma-real-estate-concierge-os-demo.vercel.app/`
    *   *Dashboard*: `https://luma-real-estate-concierge-os-demo.vercel.app/dashboard`
5.  **Luma Commerce OS — Demo Oficial (Nexa Store)**
    *   *URL*: `https://luma-commerce-os-demo.vercel.app/`
    *   *Admin*: `https://luma-commerce-os-demo.vercel.app/admin`

---

## 2. Ajustes Clave por Módulo / Demo

### A. Luma Commerce OS — Demo Oficial / Nexa Store
*   **Marca**: Nexa Store.
*   **Estado**: `official_demo`.
*   **Acciones**: Enlace copiable (`canCopy: true`), botón activo (`canOpen: true`), CTA "Mostrar al cliente".
*   **Admin Asociado**: Conectado directamente a `https://luma-commerce-os-demo.vercel.app/admin` como sublink/módulo CRM de consulta interna.

### B. Luma Commerce OS — Legacy (No Enviable)
*   **Enlace anterior**: `https://luma-commerce-os.vercel.app/`
*   **Estado**: `internal_only` ("Archivo interno / Referencias no enviables").
*   **Acciones**: Copiado bloqueado (`canCopy: false`), botón abrir activo (`canOpen: true`).
*   **Comportamiento**: No posee botón copiar ni CTA "Mostrar al cliente". No aparece en recomendaciones de venta principales ni como demo activa.

### C. Luma Boutique OS / Ivette Berroa (Proyecto Real)
*   **Enlaces**:
    *   Cliente: `https://luma-boutique-os-ivette.vercel.app/`
    *   Admin: `https://luma-boutique-os-ivette.vercel.app/admin`
*   **Nueva Clasificación**: **Proyecto real / referencia interna / no enviar sin aprobación**.
*   **Estado**: `internal_only`.
*   **Comportamiento**: Se eliminaron completamente como demos oficiales y de preparación. No aparecen en recomendaciones de venta del nicho *Commerce* para prospectos genéricos. Copiado bloqueado (`canCopy: false`), sin botón de copia ni CTA "Mostrar al cliente".

### D. Aura Boutique OS — Demo Oficial (Demo Futura Ficticia)
*   **Reemplazo**: Reemplaza la antigua referencia a la demo boutique de Ivette.
*   **Estado**: `in_preparation`.
*   **Acciones**: No almacena URL real todavía (`canOpen: false`, `canCopy: false`).
*   **Descripción**: *"Demo futura para boutiques, cosmética premium, marcas de bienestar y productos artesanales, construida con datos ficticios y marca genérica."*

---

## 3. Próximas Demos en Preparación

Las siguientes demos quedan registradas bajo la categoría de **En preparación** (pendientes de despliegue o saneamiento):

1.  **Aura Boutique OS — Demo Oficial** (Marca ficticia para boutique/cosmética).
2.  **Luma Industrial / B2B OS — Demo Oficial** (`https://inox-minier.com/`).
3.  **Luma Content / Media OS — Demo Oficial** (`https://luma-intelligence-hub.vercel.app/`).
4.  **Capital en Orden OS — Demo Oficial** (`https://suvoga-os-tjaa.vercel.app/`).

---

## 4. Estructura de Visualización en el Playbook

*   **Nicho Commerce**: Muestra únicamente como activa y enviable a `Luma Commerce OS — Demo Oficial` y como demo futura en preparación a `Aura Boutique OS — Demo Oficial`. Las referencias legacy de Commerce y consolas administrativas se delegan a la sección inferior de **Archivo interno / Referencias no enviables** del nicho.
*   **Mantenimiento Demos**: Centraliza las referencias legacy e internas de Ivette Berroa y Commerce OS para la consulta técnica exclusiva de Marcos Hilario.
