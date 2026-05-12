import json
import os

def cleanup():
    audits_path = 'public/data/audits.json'
    leads_path = 'engine/leads.txt'
    
    if not os.path.exists(audits_path):
        print("No audits.json found.")
        return

    with open(audits_path, 'r', encoding='utf-8') as f:
        audits = json.load(f)
    
    # Filter only successful audits that are NOT placeholders
    # Placeholder check: status must be success and company_name should not be generic if possible
    # But for now, status == 'success' is our best filter for "real" results
    real_audits = [a for a in audits if a.get('report_metadata', {}).get('status') == 'success']
    
    # Also remove any that might be obviously test data (if any)
    # The current success list looks real (Plusval, MrHome, etc.)
    
    with open(audits_path, 'w', encoding='utf-8') as f:
        json.dump(real_audits, f, indent=4, ensure_ascii=False)
    
    # Update leads.txt to match the real ones
    real_domains = [a['report_metadata']['domain_scanned'] for a in real_audits]
    with open(leads_path, 'w', encoding='utf-8') as f:
        for domain in real_domains:
            f.write(f"{domain}\n")
            
    print(f"Cleanup complete. Kept {len(real_audits)} real audits.")

if __name__ == "__main__":
    cleanup()
