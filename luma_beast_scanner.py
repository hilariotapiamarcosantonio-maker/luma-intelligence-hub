import os
import time
import re
import json
from urllib.parse import urljoin
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

class LumaBeastScanner:
    def __init__(self, target_urls):
        self.urls = target_urls
        self.results = []
        
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
        
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    def audit(self):
        for url in self.urls:
            print(f"[*] Analizando Infraestructura y Extraenado Leads: {url}")
            try:
                start_time = time.time()
                self.driver.get(url)
                load_time = time.time() - start_time
                
                html = self.driver.page_source
                soup = BeautifulSoup(html, 'html.parser')
                
                deep_urls = self._find_deep_pages(url, soup)
                deep_htmls = [html]
                deep_soups = [soup]
                
                for d_url in deep_urls:
                    try:
                        self.driver.get(d_url)
                        d_html = self.driver.page_source
                        deep_htmls.append(d_html)
                        deep_soups.append(BeautifulSoup(d_html, 'html.parser'))
                    except Exception as e:
                        print(f"[!] Error en Deep Search ({d_url}): {e}")

                combined_html = " ".join(deep_htmls)
                combined_text = " ".join([s.get_text(separator=' ') for s in deep_soups])
                
                analysis = {
                    "empresa": url.split('//')[-1].split('/')[0],
                    "url": url,
                    "tiempo_carga": round(load_time, 2),
                    "tecnologia": self._get_tech(combined_html),
                    "tracking": self._get_tracking(combined_html),
                    "marketing": self._get_marketing_assets(soup),
                    "lead_data": self._get_lead_data(combined_text, deep_soups),
                    "puntos_dolor": self._diagnose(load_time, html)
                }
                self.results.append(analysis)
            except Exception as e:
                print(f"[!] Error analizando {url}: {e}")
        
        self.driver.quit()
        self._save_results()

    def _find_deep_pages(self, base_url, soup):
        keywords = ['contacto', 'nosotros', 'agentes', 'about', 'contact', 'equipo']
        deep_links = set()
        for a in soup.find_all('a', href=True):
            href = a['href']
            text = a.get_text().lower()
            if any(k in href.lower() or k in text for k in keywords):
                full_url = urljoin(base_url, href)
                if full_url.startswith(base_url):
                    deep_links.add(full_url)
        return list(deep_links)[:3]

    def _get_lead_data(self, text, soups):
        emails = list(set(re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)))
        phones = list(set(re.findall(r"\(?(?:809|829|849)\)?[-.\s]?\d{3}[-.\s]?\d{4}", text)))
        
        ig_handles = set()
        for soup in soups:
            for a in soup.select('a[href*="instagram.com"]'):
                href = a['href']
                match = re.search(r'instagram\.com/([^/?#]+)', href)
                if match:
                    ig_handles.add(match.group(1))
        
        agent_names = []
        keywords = ['asesor', 'agente', 'consultor']
        for soup in soups:
            for tag in soup.find_all(['h2', 'h3', 'span']):
                tag_text = tag.get_text().strip()
                parent = tag.find_parent()
                parent_text = parent.get_text().lower() if parent else ""
                
                if any(kw in tag_text.lower() or kw in parent_text for kw in keywords):
                    if 5 < len(tag_text) < 40 and tag_text not in agent_names:
                        clean_name = re.sub(r'(?i)(asesor|agente|consultor|inmobiliario|asociado|contacto|llamar)', '', tag_text).strip(' -:,|')
                        if clean_name and len(clean_name) > 3:
                            agent_names.append(clean_name)
        
        return {
            "nombre_contacto": agent_names[:10] if agent_names else ["No detectado"],
            "email": emails,
            "telefono": phones,
            "perfil_social": {
                "instagram": list(ig_handles)
            }
        }

    def _get_tech(self, html):
        techs = []
        if "wp-content" in html: techs.append("WordPress")
        if "wixstatic" in html: techs.append("Wix")
        if "_next/static" in html: techs.append("Next.js")
        if "alterestate" in html: techs.append("AlterEstate")
        return techs if techs else ["Desconocida/Legacy"]

    def _get_tracking(self, html):
        return {
            "Meta_Pixel": "fbq" in html or "fbevents.js" in html,
            "GTM": "googletagmanager" in html,
            "GA4": "gtag" in html
        }

    def _get_marketing_assets(self, soup):
        return {
            "links_instagram": len(soup.select('a[href*="instagram.com"]')),
            "botones_whatsapp": len(soup.select('a[href*="wa.me"]')),
            "meta_description": bool(soup.find('meta', attrs={'name': 'description'}))
        }

    def _diagnose(self, load_time, html):
        pains = []
        if load_time > 3: pains.append("Pérdida masiva de leads por velocidad crítica.")
        if "fbq" not in html: pains.append("Ceguera publicitaria (Sin Píxel).")
        if "wp-content" in html: pains.append("Dependencia de plugins y vulnerabilidad técnica.")
        if "description" not in html: pains.append("Invisibilidad SEO (Falta Meta Description).")
        return pains

    def _save_results(self):
        output_dir = r'F:\Analisis Webs Inmobiliario\luma-dashboard\data'
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, 'diagnostico_luma.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=4, ensure_ascii=False)
        print(f"\n[ÉXITO] Reporte de Inteligencia guardado en: {output_path}")

if __name__ == "__main__":
    prospectos = [
        "https://www.apartamentosrd.com.do/",
        "https://propertygrouprd.com/",
        "https://remaxrd.com/",
        "https://plusval.com.do/",
        "https://indominicana.com/",
        "https://mudate.net/",
        "https://inmobiliarialacosta.com/"
    ]
    scanner = LumaBeastScanner(prospectos)
    scanner.audit()