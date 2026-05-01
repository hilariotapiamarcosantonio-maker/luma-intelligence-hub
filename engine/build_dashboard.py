import json

def build_dashboard():
    json_path = r'F:\Analisis Webs Inmobiliario\diagnostico_luma.json'
    html_path = r'F:\Analisis Webs Inmobiliario\dashboard.html'
    
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error cargando JSON: {e}")
        return

    cards_html = ""
    for prospect in data:
        empresa = prospect.get('empresa', 'N/A')
        tiempo_carga = prospect.get('tiempo_carga', 0)
        tecnologias = ", ".join(prospect.get('tecnologia', []))
        
        # Analisis de riesgo
        riesgo_clase = "text-green-400"
        if tiempo_carga > 3:
            riesgo_clase = "text-red-500"
        elif tiempo_carga > 1.5:
            riesgo_clase = "text-yellow-400"
        
        puntos_dolor = prospect.get('puntos_dolor', [])
        puntos_dolor_html = "".join([f"<li class='text-sm text-gray-400'>• {p}</li>" for p in puntos_dolor])
        
        marketing = prospect.get('marketing', {})
        tracking = prospect.get('tracking', {})
        
        # Lead Data
        lead_data = prospect.get('lead_data', {})
        emails = lead_data.get('email', [])
        telefonos = lead_data.get('telefono', [])
        nombres = lead_data.get('nombre_contacto', [])
        
        cards_html += f"""
        <div class="bg-[#111111] rounded-2xl p-6 border border-[#333] hover:border-yellow-600 transition-all duration-300 shadow-lg">
            <div class="flex justify-between items-start mb-4">
                <h2 class="text-xl font-bold text-white">{empresa}</h2>
                <span class="px-3 py-1 bg-[#1a1a1a] rounded-full text-xs font-semibold text-yellow-500 border border-yellow-600/30">
                    {tecnologias}
                </span>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-[#0a0a0a] p-4 rounded-xl border border-[#222]">
                    <p class="text-xs text-gray-500 mb-1">Tiempo de Carga</p>
                    <p class="text-2xl font-black {riesgo_clase} drop-shadow-md">{tiempo_carga}s</p>
                </div>
                <div class="bg-[#0a0a0a] p-4 rounded-xl border border-[#222]">
                    <p class="text-xs text-gray-500 mb-1">Riesgo de Pérdida</p>
                    <p class="text-lg font-bold text-white">{'Alto' if tiempo_carga > 3 else 'Bajo'}</p>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wider">Mapa de Dolores</h3>
                <ul class="space-y-1">
                    {puntos_dolor_html}
                </ul>
            </div>
            
            <div class="border-t border-[#333] pt-4">
                <h3 class="text-sm font-semibold text-yellow-500 mb-3 uppercase tracking-wider">Contactos Encontrados</h3>
                <div class="text-sm text-gray-300">
                    <p class="mb-1"><strong class="text-white">Emails:</strong> {len(emails)} encontrados</p>
                    <p class="mb-1"><strong class="text-white">Teléfonos:</strong> {len(telefonos)} encontrados</p>
                    <p><strong class="text-white">Nombres:</strong> {", ".join(nombres[:3]) if nombres else 'No detectado'}</p>
                </div>
            </div>
        </div>
        """

    html_template = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luma Deep Scanner - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <style>
        body {{
            background-color: #050505;
            color: #f5f5f5; /* Blanco humo */
            font-family: 'Inter', sans-serif;
        }}
    </style>
</head>
<body class="min-h-screen p-8" x-data>
    <div class="max-w-7xl mx-auto">
        <header class="mb-12 border-b border-[#222] pb-6 flex items-center justify-between">
            <div>
                <h1 class="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
                    Luma Beast Scanner
                </h1>
                <p class="text-gray-500 text-sm">Dashboard Interactivo de Auditoría de Infraestructura Inmobiliaria</p>
            </div>
            <div class="text-right">
                <span class="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></span>
                <span class="text-xs text-gray-400 uppercase tracking-widest font-semibold">Sistema Activo</span>
            </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards_html}
        </div>
    </div>
</body>
</html>
"""

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    print(f"[ÉXITO] Dashboard generado en: {html_path}")

if __name__ == "__main__":
    build_dashboard()