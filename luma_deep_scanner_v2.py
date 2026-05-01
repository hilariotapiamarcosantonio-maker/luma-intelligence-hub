import concurrent.futures
import json
import logging
import re
import time
import os
import random
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
from datetime import datetime

# Configuración de logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [%(levelname)s] - %(message)s')

# Clave de API de Google PageSpeed Insights (Dejar vacío o proporcionar por entorno)
PAGESPEED_API_KEY = "TU_API_KEY_AQUI" # TODO: Rellenar con la clave de API

class LumaDeepScanner:
    def __init__(self, api_key=PAGESPEED_API_KEY):
        self.api_key = api_key
        # Headers para simular un navegador real
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
        }
        self.social_platforms = ['instagram.com', 'facebook.com', 'linkedin.com', 'tiktok.com', 'youtube.com', 'pinterest.com', 'threads.net', 'twitter.com', '//x.com']

    def normalize_url(self, domain):
        if not domain.startswith('http'):
            return f"https://{domain}"
        return domain

    def fetch_html(self, url):
        try:
            response = requests.get(url, headers=self.headers, timeout=15, verify=False)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            logging.error(f"Error accediendo a {url}: {e}")
            return None

    def check_link_status(self, url):
        try:
            response = requests.head(url, headers=self.headers, timeout=10, allow_redirects=True, verify=False)
            return response.status_code < 400
        except requests.RequestException:
            return False

    def get_pagespeed_data(self, url):
        if not self.api_key or self.api_key == "TU_API_KEY_AQUI":
            # Si no hay API key, se devuelve un mock para no fallar
            return {"error": "API Key no configurada", "score": 0, "lcp": None, "tti": None}
        
        api_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy=MOBILE&key={self.api_key}"
        try:
            response = requests.get(api_url, timeout=30)
            response.raise_for_status()
            data = response.json()
            
            lighthouse = data.get('lighthouseResult', {})
            categories = lighthouse.get('categories', {})
            audits = lighthouse.get('audits', {})
            
            score = categories.get('performance', {}).get('score', 0) * 100
            lcp = audits.get('largest-contentful-paint', {}).get('displayValue', 'N/A')
            tti = audits.get('interactive', {}).get('displayValue', 'N/A')
            
            return {
                "score": round(score),
                "lcp": lcp,
                "tti": tti
            }
        except Exception as e:
            logging.error(f"Error obteniendo PageSpeed para {url}: {e}")
            return {"error": str(e), "score": 0, "lcp": None, "tti": None}

    def extract_identity(self, soup, html_text, base_url):
        # Nombres de empresa (Aproximación por Title o meta og:site_name)
        company_name = "No detectado"
        og_site_name = soup.find('meta', property='og:site_name')
        if og_site_name and og_site_name.get('content'):
            company_name = og_site_name['content']
        elif soup.title:
            title_text = soup.title.string
            if title_text:
                company_name = title_text.split('-')[0].split('|')[0].strip()

        # Correos electrónicos
        emails = list(set(re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', html_text)))
        emails = [e for e in emails if not e.endswith(('.png', '.jpg', '.jpeg', '.gif', '.css', '.js', 'sentry.io'))]

        # Teléfonos (Búsqueda por enlaces tel: y whatsapp)
        phones = set()
        for a in soup.find_all('a', href=True):
            href = a['href']
            if href.startswith('tel:'):
                phones.add(href.replace('tel:', '').strip())
            elif 'wa.me/' in href or 'api.whatsapp.com/send' in href:
                match = re.search(r'(wa\.me/|phone=)(\d+)', href)
                if match:
                    phones.add(match.group(2))

        # Directivos / Nosotros (heurística simple buscando palabras clave en texto)
        key_people = []
        about_keywords = ['ceo', 'director', 'fundador', 'founder', 'gerente']
        for text_element in soup.find_all(['h1', 'h2', 'h3', 'h4', 'strong', 'p']):
            text = text_element.get_text(strip=True)
            text_lower = text.lower()
            if any(keyword in text_lower for keyword in about_keywords) and len(text) < 60:
                 key_people.append(text)

        return {
            "company_name": company_name,
            "key_people": list(set(key_people))[:5], # Máximo 5 personas clave detectadas
            "emails": emails,
            "phones": list(phones)
        }

    def audit_tech_and_seo(self, soup, html_text):
        tech_stack = []
        html_lower = html_text.lower()
        
        # Detectar Tech Stack
        if 'wp-content' in html_lower or 'wordpress' in html_lower:
            tech_stack.append('WordPress')
            meta_gen = soup.find('meta', attrs={'name': 'generator'})
            if meta_gen and 'wordpress' in meta_gen.get('content', '').lower():
                tech_stack[-1] = meta_gen['content'] # Guarda la versión exacta si está disponible
        if 'wix.com' in html_lower or 'x-wix-meta-site-id' in html_lower:
            tech_stack.append('Wix')
        if 'alterestate' in html_lower:
            tech_stack.append('AlterEstate')
        if '_next/static' in html_lower or '__next_data__' in html_lower:
            tech_stack.append('Next.js')

        # Detectar Tracking
        tracking = []
        if 'fbevents.js' in html_lower or 'fbq(' in html_lower:
            tracking.append('Meta Pixel')
        if 'googletagmanager.com/gtm.js' in html_lower:
            tracking.append('Google Tag Manager')
        if 'google-analytics.com/analytics.js' in html_lower or 'gtag(' in html_lower:
            tracking.append('Google Analytics')

        # Detectar Open Graph
        has_open_graph = bool(soup.find('meta', property=re.compile(r'^og:')))

        return {
            "tech_stack": list(set(tech_stack)),
            "tracking": list(set(tracking)),
            "open_graph": has_open_graph
        }

    def check_social_footprint(self, soup, base_url):
        social_links = []
        broken_links = []
        
        found_links = set()
        for a in soup.find_all('a', href=True):
            href = a['href']
            for platform in self.social_platforms:
                if platform in href.lower() and href not in found_links:
                    # Excluir links de compartir
                    if 'sharer' in href.lower() or 'share' in href.lower() or 'intent' in href.lower():
                        continue
                        
                    found_links.add(href)
                    
                    # Validar si el link funciona o es un "pueblo fantasma"
                    is_active = self.check_link_status(href)
                    if is_active:
                        social_links.append(href)
                    else:
                        broken_links.append(href)

        return {
            "social_links": social_links,
            "broken_links": broken_links
        }

    def synthesize(self, url, identity, tech_seo, marketing, pagespeed):
        # Sistema de Scoring de Autoridad (1 al 100)
        score = 0
        
        # 1. PageSpeed (Max 30 puntos)
        ps_score = pagespeed.get('score', 0)
        if isinstance(ps_score, (int, float)):
             score += (ps_score * 0.30)
        
        # 2. Tracking (Max 30 puntos - 10 por cada plataforma)
        tracking_points = len(tech_seo['tracking']) * 10
        score += min(tracking_points, 30)
        
        # 3. Redes Sociales (Max 30 puntos - 5 por red social activa)
        social_points = len(marketing['social_links']) * 5
        score += min(social_points, 30)
        
        # 4. Open Graph (10 puntos)
        if tech_seo['open_graph']:
            score += 10
            
        score = round(min(score, 100))
        
        # Sintetización de Fugas de Capital / Pain Points
        issues = []
        if isinstance(ps_score, (int, float)) and ps_score < 50:
            issues.append(f"Velocidad móvil crítica ({ps_score}/100) - Alta tasa de rebote.")
        if 'Meta Pixel' not in tech_seo['tracking']:
            issues.append("Sin Meta Pixel - Imposibilidad de retargeting eficiente en pauta.")
        if not tech_seo['open_graph']:
            issues.append("Falta de Open Graph - Compartir en redes muestra enlaces rotos o sin imagen.")
        if marketing['broken_links']:
            issues.append(f"{len(marketing['broken_links'])} links de redes sociales caídos (Efecto 'Pueblo Fantasma').")
        if not marketing['social_links']:
            issues.append("Presencia omnicanal nula - No se detectaron redes sociales enlazadas.")
            
        return {
            "authority_score": score,
            "identified_issues": issues
        }

    def process_domain(self, domain):
        url = self.normalize_url(domain)
        logging.info(f"Escaneando dominio: {url}")
        
        # Manejo de Rate-Limit: Retraso aleatorio
        time.sleep(random.uniform(0.5, 2.0))
        
        html_text = self.fetch_html(url)
        if not html_text:
             return self._generate_error_report(domain, "Error de conexión o timeout.")
             
        soup = BeautifulSoup(html_text, 'html.parser')
        
        # Paralelizar PageSpeed ya que puede tardar varios segundos
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
            future_pagespeed = executor.submit(self.get_pagespeed_data, url)
            
            # Análisis local paralelo a la espera de la API
            client_identity = self.extract_identity(soup, html_text, url)
            technical_audit = self.audit_tech_and_seo(soup, html_text)
            marketing_intel = self.check_social_footprint(soup, url)
            
            pagespeed_data = future_pagespeed.result()
            
        technical_audit['pagespeed'] = pagespeed_data
        
        pain_points = self.synthesize(url, client_identity, technical_audit, marketing_intel, pagespeed_data)

        report = {
            "report_metadata": {
                "timestamp": datetime.now().isoformat(),
                "domain_scanned": domain,
                "status": "success"
            },
            "client_identity": client_identity,
            "technical_audit": technical_audit,
            "marketing_intelligence": marketing_intel,
            "pain_point_synthesis": pain_points
        }
        
        logging.info(f"Completado {domain} | Score: {pain_points['authority_score']}/100")
        return report

    def _generate_error_report(self, domain, error_msg):
        return {
            "report_metadata": {
                "timestamp": datetime.now().isoformat(),
                "domain_scanned": domain,
                "status": "error",
                "error_message": error_msg
            }
        }

    def run_bulk_scan(self, domains, max_workers=10):
        results = []
        logging.info(f"Iniciando Luma Deep Scanner con {max_workers} hilos para {len(domains)} dominios.")
        
        output_dir = os.path.join(os.path.dirname(__file__), "luma-audit-dashboard", "public", "data")
        os.makedirs(output_dir, exist_ok=True)
        output_file = os.path.join(output_dir, "audits.json")
        
        count = 0
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_domain = {executor.submit(self.process_domain, domain): domain for domain in domains}
            for future in concurrent.futures.as_completed(future_to_domain):
                domain = future_to_domain[future]
                try:
                    data = future.result()
                    results.append(data)
                except Exception as exc:
                    logging.error(f"Fallo catastrófico en {domain}: {exc}")
                    results.append(self._generate_error_report(domain, str(exc)))
                
                count += 1
                if count % 10 == 0:
                    try:
                        with open(output_file, 'w', encoding='utf-8') as f:
                            json.dump(results, f, indent=4, ensure_ascii=False)
                        logging.info(f"[Anti-Apagón] Progreso guardado: {count}/{len(domains)} dominios procesados en audits.json.")
                        
                        import subprocess
                        # Ejecutar comandos git para el guardado en la nube
                        subprocess.run(['git', 'add', output_file], check=True)
                        subprocess.run(['git', 'commit', '-m', f"chore(data): auto-save progress {count} leads [SDE Mode]"], check=True)
                        subprocess.run(['git', 'push', 'origin', 'main'], check=True)
                        logging.info(f"[SDE Mode] Backup en tiempo real subido a GitHub exitosamente.")
                    except Exception as e:
                        logging.error(f"Error en rutina Anti-Apagón o Git: {e}")
                    
        return results

if __name__ == "__main__":
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    
    # Archivo de entrada con leads
    LEADS_FILE = "leads.txt"
    domains = []
    if os.path.exists(LEADS_FILE):
        with open(LEADS_FILE, "r", encoding="utf-8") as f:
            domains = [line.strip() for line in f if line.strip()]
    else:
        logging.warning(f"No se encontró {LEADS_FILE}. Ejecutando con dominios de prueba.")
        domains = ["century21.com", "remax.com"]
        
    # Limitar a 500 dominios máximo si hay más, o asegurar que se cumpla la cuota (opcional)
    domains = domains[:500]
    
    # Inicializar el escáner (Reemplazar la API KEY en producción)
    scanner = LumaDeepScanner()
    
    # Ejecutar escaneo concurrente con max_workers=10
    resultados = scanner.run_bulk_scan(domains, max_workers=10)
    
    # Directorio de destino dentro del proyecto Next.js
    output_dir = os.path.join(os.path.dirname(__file__), "luma-audit-dashboard", "public", "data")
    os.makedirs(output_dir, exist_ok=True)
    
    # Guardar reporte JSON en public/data/audits.json
    output_file = os.path.join(output_dir, "audits.json")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(resultados, f, indent=4, ensure_ascii=False)
        
    logging.info(f"Auditoría 360 finalizada. Reporte generado en '{output_file}'")
