import fs from 'fs';
import path from 'path';
import { Activity } from 'lucide-react';
import AuditDashboardClient, { AuditReport } from '../components/AuditDashboardClient';

export const dynamic = 'force-dynamic';

export default function Home() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'audits.json');
  let reports: AuditReport[] = [];
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    reports = JSON.parse(fileContents) as AuditReport[];
    // Sort by timestamp descending
    reports.sort((a: AuditReport, b: AuditReport) => {
      const dateA = new Date(a.report_metadata?.timestamp || 0).getTime();
      const dateB = new Date(b.report_metadata?.timestamp || 0).getTime();
      return dateB - dateA;
    });
  } catch (e) {
    console.error("Error reading audits:", e);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 p-4 md:p-8 font-sans selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        {/* Header Cinemático */}
        <header className="border-b border-white/10 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="w-full">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase">
              Luma Intelligence Hub
            </h1>
            <p className="text-gray-400 mt-2 text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400 animate-pulse" />
              Revisión digital y auditorías comerciales
            </p>
            <p className="text-gray-300 mt-4 max-w-2xl text-xs md:text-sm leading-relaxed">
              Un análisis inicial para detectar oportunidades en captación, presentación digital, seguimiento comercial y medición de prospectos para ventas de soluciones premium.
            </p>
          </div>
          <div className="text-right self-end md:self-auto">
            <p className="text-xs text-gray-600 tracking-widest uppercase">Objetivos revisados</p>
            <p className="text-3xl font-mono text-white">{reports.length}</p>
          </div>
        </header>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 text-sm text-gray-400">
          <strong>Aviso importante:</strong> Esta revisión es preliminar y se basa en señales públicas disponibles: presencia web, redes sociales, velocidad, enlaces, tracking y estructura de captación. No representa una auditoría interna completa ni afirma resultados financieros exactos. Su objetivo es identificar oportunidades de mejora comercial.
        </div>

        {/* Dashboard Cliente con Buscador y Filtros */}
        <AuditDashboardClient initialReports={reports} />
      </div>
    </main>
  );
}
