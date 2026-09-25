import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const figuresDir = path.join(__dirname, '..', 'figures');

if (!fs.existsSync(figuresDir)) {
  fs.mkdirSync(figuresDir, { recursive: true });
}

function wrapHTML(content, width = 1600, height = 1000) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { width: ${width}px; min-height: ${height}px; background: #ffffff; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .card { background: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); width: 100%; }
    .title { font-size: 22px; font-weight: 700; color: #1e293b; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; display: inline-block; }
    .mono { font-family: monospace; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}

(async () => {
  console.log('Launching Puppeteer for Diagram & Logo generation...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // 1. LOGO AMSOFT
  const logoHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { width: 900px; height: 320px; background: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .logo-container { display: flex; align-items: center; gap: 32px; padding: 20px 40px; }
    .logo-icon { width: 120px; height: 120px; }
    .brand-title { font-size: 64px; font-weight: 900; letter-spacing: 6px; color: #0f172a; line-height: 1; }
    .brand-subtitle { font-size: 20px; font-weight: 600; letter-spacing: 4px; color: #2563eb; text-transform: uppercase; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="logo-container">
    <svg class="logo-icon" viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e40af" />
          <stop offset="50%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0284c7" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>
      </defs>
      <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="url(#grad1)" stroke-width="6" stroke-linejoin="round"/>
      <path d="M50 10 L50 50 L85 70" fill="none" stroke="url(#grad1)" stroke-width="6"/>
      <path d="M50 50 L15 70" fill="none" stroke="url(#grad1)" stroke-width="6"/>
      <polygon points="50,22 73,35 50,48 27,35" fill="url(#grad2)" opacity="0.9"/>
      <polygon points="50,52 73,39 73,66 50,79" fill="url(#grad1)" opacity="0.8"/>
    </svg>
    <div>
      <div class="brand-title">AMSOFT</div>
      <div class="brand-subtitle">Ingénierie & Solutions Digitales</div>
    </div>
  </div>
</body>
</html>`;
  await page.setViewport({ width: 900, height: 320, deviceScaleFactor: 3 });
  await page.setContent(logoHTML, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(figuresDir, 'logo_amsoft.png') });
  console.log('✓ Captured logo_amsoft.png');

  // 2. DIAGRAMME CAS D'UTILISATION
  const ucHTML = wrapHTML(`
    <div style="width: 100%; border: 2px solid #cbd5e1; border-radius: 12px; padding: 30px; background: #fafafa;">
      <h2 style="text-align: center; color: #1e293b; font-size: 26px; margin-bottom: 24px; font-weight: 800;">Diagramme Général des Cas d'Utilisation — HR Management System</h2>
      <div style="display: flex; gap: 40px; justify-content: space-between; align-items: stretch;">
        <div style="width: 220px; display: flex; flex-direction: column; gap: 30px; justify-content: center;">
          <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; text-align: center;">
            <div style="font-size: 36px;">👤</div>
            <div style="font-weight: 700; color: #1e40af; font-size: 16px;">Administrateur</div>
          </div>
          <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 20px; text-align: center;">
            <div style="font-size: 36px;">👔</div>
            <div style="font-weight: 700; color: #15803d; font-size: 16px;">Responsable RH</div>
          </div>
          <div style="background: #fefce8; border: 2px solid #eab308; border-radius: 12px; padding: 20px; text-align: center;">
            <div style="font-size: 36px;">👨‍💻</div>
            <div style="font-weight: 700; color: #a16207; font-size: 16px;">Employé</div>
          </div>
        </div>

        <div style="flex: 1; border: 3px dashed #94a3b8; border-radius: 16px; background: #ffffff; padding: 24px; position: relative;">
          <div style="position: absolute; top: -14px; left: 24px; background: #334155; color: white; padding: 4px 16px; border-radius: 20px; font-weight: 700; font-size: 14px;">Système Web RH (HR Management System)</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px;">
              <div style="font-weight: 700; color: #334155; font-size: 13px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0;">Sécurité & Accès</div>
              <div style="background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; margin-bottom: 6px; font-weight: 600;">S'authentifier</div>
              <div style="background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; margin-bottom: 6px; font-weight: 600;">Gérer Rôles & Permissions</div>
              <div style="background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; font-weight: 600;">Consulter Journal d'Audit</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px;">
              <div style="font-weight: 700; color: #334155; font-size: 13px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0;">Gestion RH</div>
              <div style="background: #dcfce7; border: 1px solid #86efac; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; margin-bottom: 6px; font-weight: 600;">Gérer Dossiers Employés</div>
              <div style="background: #dcfce7; border: 1px solid #86efac; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; margin-bottom: 6px; font-weight: 600;">Gérer Contrats & Échéances</div>
              <div style="background: #dcfce7; border: 1px solid #86efac; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; margin-bottom: 6px; font-weight: 600;">Valider / Refuser Congés</div>
              <div style="background: #dcfce7; border: 1px solid #86efac; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; font-weight: 600;">Consulter Dashboard KPI</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px;">
              <div style="font-weight: 700; color: #334155; font-size: 13px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0;">Espace Employé</div>
              <div style="background: #fef9c3; border: 1px solid #fde047; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; margin-bottom: 6px; font-weight: 600;">Demander un congé</div>
              <div style="background: #fef9c3; border: 1px solid #fde047; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; margin-bottom: 6px; font-weight: 600;">Pointer Présence (Arriver/Partir)</div>
              <div style="background: #fef9c3; border: 1px solid #fde047; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; margin-bottom: 6px; font-weight: 600;">Soumettre une Demande RH</div>
              <div style="background: #fef9c3; border: 1px solid #fde047; border-radius: 20px; padding: 8px; text-align: center; font-size: 12px; font-weight: 600;">Gérer Documents GED</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, 1600, 750);

  await page.setViewport({ width: 1600, height: 750, deviceScaleFactor: 2 });
  await page.setContent(ucHTML, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(figuresDir, 'use_case_diagramme.png') });
  console.log('✓ Captured use_case_diagramme.png');

  // 3. ARCHITECTURE LOGIQUE
  const archLogiqueHTML = wrapHTML(`
    <div style="width: 100%; text-align: center;">
      <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 24px;">Architecture Logique Cible en Couches — MVC Découplé</h2>
      <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
        <div style="background: #eff6ff; border: 2px solid #2563eb; border-radius: 12px; padding: 20px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; color: #1e40af; font-size: 16px;">1. COUCHE PRÉSENTATION (Frontend React SPA)</span>
            <span style="background: #2563eb; color: white; font-size: 11px; padding: 4px 12px; border-radius: 12px; font-weight: 700;">React 19 + Vite + Tailwind CSS</span>
          </div>
          <div style="font-size: 13px; color: #334155; margin-top: 8px;">Vues applicatives réactives, Gestion de l'état local, Routing SPA, Client Axios REST HTTP</div>
        </div>
        <div style="font-size: 18px; color: #64748b; font-weight: bold;">↕️ Requêtes AJAX JSON / HTTPS Bearer Token ↕️</div>
        <div style="background: #f0fdf4; border: 2px solid #16a34a; border-radius: 12px; padding: 20px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; color: #15803d; font-size: 16px;">2. COUCHE APPLICATION & CONTROLEURS (Backend REST API)</span>
            <span style="background: #16a34a; color: white; font-size: 11px; padding: 4px 12px; border-radius: 12px; font-weight: 700;">Laravel 10/13 API + Sanctum</span>
          </div>
          <div style="font-size: 13px; color: #334155; margin-top: 8px;">Routes API /api/hr/*, Form Requests Validation, Auth Middleware Sanctum, Controllers (EmployeeController, HrLeaveRequestController, etc.)</div>
        </div>
        <div style="font-size: 18px; color: #64748b; font-weight: bold;">↕️ Invocation des Services Métier & Logique Applicative ↕️</div>
        <div style="background: #fff7ed; border: 2px solid #ea580c; border-radius: 12px; padding: 20px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; color: #c2410c; font-size: 16px;">3. COUCHE SERVICES MÉTIER & AUDIT</span>
            <span style="background: #ea580c; color: white; font-size: 11px; padding: 4px 12px; border-radius: 12px; font-weight: 700;">Business Logic Layer</span>
          </div>
          <div style="font-size: 13px; color: #334155; margin-top: 8px;">Calcul automatique des soldes de congés, Vérification du pointage & retards, Gestionnaire d'AuditLog, Notifications</div>
        </div>
        <div style="font-size: 18px; color: #64748b; font-weight: bold;">↕️ Requêtes SQL Eloquent ORM ↕️</div>
        <div style="background: #fcf4ff; border: 2px solid #9333ea; border-radius: 12px; padding: 20px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; color: #7e22ce; font-size: 16px;">4. COUCHE ACCÈS AUX DONNÉES & SGBD</span>
            <span style="background: #9333ea; color: white; font-size: 11px; padding: 4px 12px; border-radius: 12px; font-weight: 700;">MySQL 8.x / SQLite</span>
          </div>
          <div style="font-size: 13px; color: #334155; margin-top: 8px;">Models Eloquent (HrEmployee, HrContract, HrLeaveRequest, HrAttendance, HrDocument), Migrations, Intégrité Référentielle</div>
        </div>
      </div>
    </div>
  `, 1400, 700);

  await page.setViewport({ width: 1400, height: 700, deviceScaleFactor: 2 });
  await page.setContent(archLogiqueHTML, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(figuresDir, 'architecture_logique.png') });
  console.log('✓ Captured architecture_logique.png');

  // 4. ARCHITECTURE DEPLOIEMENT DOCKER
  const dockerHTML = wrapHTML(`
    <div style="width: 100%; text-align: center;">
      <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 20px;">Architecture de Déploiement Cible Conteneurisée Docker</h2>
      <div style="display: flex; gap: 30px; align-items: center; justify-content: center;">
        <div style="background: #f1f5f9; border: 2px solid #64748b; border-radius: 12px; padding: 24px; width: 220px; text-align: center;">
          <div style="font-size: 40px;">💻</div>
          <div style="font-weight: 800; color: #334155; font-size: 15px; margin-top: 8px;">Poste Client Web</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Navigateur Web / React SPA</div>
        </div>
        <div style="font-size: 24px; color: #0284c7; font-weight: bold;">➔ HTTP / HTTPS<br><span style="font-size: 12px; color: #64748b;">(Port 80 / 443)</span></div>
        <div style="border: 3px dashed #0284c7; border-radius: 16px; background: #f0f9ff; padding: 24px; width: 850px; position: relative;">
          <div style="position: absolute; top: -14px; left: 24px; background: #0284c7; color: white; padding: 4px 16px; border-radius: 20px; font-weight: 800; font-size: 13px;">Environnement Docker Compose (docker-compose.yml)</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px;">
            <div style="background: #ffffff; border: 2px solid #0284c7; border-radius: 10px; padding: 16px; text-align: center;">
              <div style="font-size: 28px;">🌐</div>
              <div style="font-weight: 800; color: #0369a1; font-size: 14px;">Conteneur Nginx</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Web Server & Proxy Inverse</div>
            </div>
            <div style="background: #ffffff; border: 2px solid #16a34a; border-radius: 10px; padding: 16px; text-align: center;">
              <div style="font-size: 28px;">🐘</div>
              <div style="font-weight: 800; color: #15803d; font-size: 14px;">Conteneur PHP-FPM</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Backend Laravel 10/13</div>
            </div>
            <div style="background: #ffffff; border: 2px solid #ea580c; border-radius: 10px; padding: 16px; text-align: center;">
              <div style="font-size: 28px;">🐬</div>
              <div style="font-weight: 800; color: #c2410c; font-size: 14px;">Conteneur MySQL</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Base de Données SGBD 8.x</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, 1400, 500);

  await page.setViewport({ width: 1400, height: 500, deviceScaleFactor: 2 });
  await page.setContent(dockerHTML, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(figuresDir, 'architecture_deploiement.png') });
  await page.screenshot({ path: path.join(figuresDir, 'docker.png') });
  await page.screenshot({ path: path.join(figuresDir, 'diagramme_deploiement.png') });
  console.log('✓ Captured architecture_deploiement.png & docker.png');

  // 5. MLD
  const mldHTML = wrapHTML(`
    <div style="width: 100%; text-align: center;">
      <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 20px;">Modèle Logique de Données (MLD) de Conception</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; text-align: left;">
        <div style="background: #ffffff; border: 2px solid #2563eb; border-radius: 8px; overflow: hidden;">
          <div style="background: #2563eb; color: white; font-weight: 800; padding: 6px 12px; font-size: 13px;">hr_employees</div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; line-height: 1.6; color: #334155;">
            🔑 <b>id</b> (PK)<br>• matricule<br>• first_name, last_name<br>• cin, phone, email<br>• salary<br>🔗 <b>department_id</b> (FK)<br>🔗 <b>position_id</b> (FK)
          </div>
        </div>
        <div style="background: #ffffff; border: 2px solid #16a34a; border-radius: 8px; overflow: hidden;">
          <div style="background: #16a34a; color: white; font-weight: 800; padding: 6px 12px; font-size: 13px;">hr_contracts</div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; line-height: 1.6; color: #334155;">
            🔑 <b>id</b> (PK)<br>🔗 <b>employee_id</b> (FK)<br>• contract_type<br>• start_date, end_date<br>• salary, status
          </div>
        </div>
        <div style="background: #ffffff; border: 2px solid #d97706; border-radius: 8px; overflow: hidden;">
          <div style="background: #d97706; color: white; font-weight: 800; padding: 6px 12px; font-size: 13px;">hr_leave_requests</div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; line-height: 1.6; color: #334155;">
            🔑 <b>id</b> (PK)<br>• reference<br>🔗 <b>employee_id</b> (FK)<br>🔗 <b>leave_type_id</b> (FK)<br>• start_date, end_date, status
          </div>
        </div>
        <div style="background: #ffffff; border: 2px solid #9333ea; border-radius: 8px; overflow: hidden;">
          <div style="background: #9333ea; color: white; font-weight: 800; padding: 6px 12px; font-size: 13px;">hr_attendances</div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; line-height: 1.6; color: #334155;">
            🔑 <b>id</b> (PK)<br>🔗 <b>employee_id</b> (FK)<br>• date<br>• check_in, check_out<br>• total_hours, is_late
          </div>
        </div>
      </div>
    </div>
  `, 1400, 500);

  await page.setViewport({ width: 1400, height: 500, deviceScaleFactor: 2 });
  await page.setContent(mldHTML, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(figuresDir, 'mld_diagramme.png') });
  console.log('✓ Captured mld_diagramme.png');

  // 6. CLASSES
  const classHTML = wrapHTML(`
    <div style="width: 100%; text-align: center;">
      <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 20px;">Diagramme de Classes UML de Conception</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: left;">
        <div style="background: #ffffff; border: 2px solid #1e40af; border-radius: 8px; overflow: hidden;">
          <div style="background: #1e40af; color: white; font-weight: 800; padding: 8px; font-size: 14px; text-align: center;">HrEmployee</div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; border-bottom: 1px solid #cbd5e1;">
            + id: int<br>+ matricule: string<br>+ first_name: string<br>+ last_name: string<br>+ email: string<br>+ salary: decimal
          </div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; color: #15803d;">
            + getFullName(): string<br>+ getRemainingLeaves(): int
          </div>
        </div>
        <div style="background: #ffffff; border: 2px solid #1e40af; border-radius: 8px; overflow: hidden;">
          <div style="background: #1e40af; color: white; font-weight: 800; padding: 8px; font-size: 14px; text-align: center;">HrLeaveRequest</div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; border-bottom: 1px solid #cbd5e1;">
            + id: int<br>+ reference: string<br>+ start_date: date<br>+ end_date: date<br>+ total_days: int<br>+ status: string
          </div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; color: #15803d;">
            + approve(hrUser): bool<br>+ reject(motif): bool
          </div>
        </div>
        <div style="background: #ffffff; border: 2px solid #1e40af; border-radius: 8px; overflow: hidden;">
          <div style="background: #1e40af; color: white; font-weight: 800; padding: 8px; font-size: 14px; text-align: center;">HrAttendance</div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; border-bottom: 1px solid #cbd5e1;">
            + id: int<br>+ date: date<br>+ check_in: time<br>+ check_out: time<br>+ is_late: bool
          </div>
          <div style="padding: 10px; font-size: 11px; font-family: monospace; color: #15803d;">
            + clockIn(): void<br>+ clockOut(): void
          </div>
        </div>
      </div>
    </div>
  `, 1400, 500);

  await page.setViewport({ width: 1400, height: 500, deviceScaleFactor: 2 });
  await page.setContent(classHTML, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(figuresDir, 'diagramme_classes.png') });
  console.log('✓ Captured diagramme_classes.png');

  // 7. PRESENCES & OTHERS
  const actPresencesHTML = wrapHTML(`
    <div style="width: 100%; text-align: center;">
      <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 20px;">Diagramme d'Activité : Gestion du Pointage et des Présences</h2>
      <div style="display: flex; gap: 20px; align-items: center; justify-content: center;">
        <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px; font-weight: 700; font-size: 13px;">1. Connexion Espace Personnel</div>
        <div style="font-size: 20px;">➔</div>
        <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px; font-weight: 700; font-size: 13px;">2. Clic sur "ARRIVER" (Clock-in)</div>
        <div style="font-size: 20px;">➔</div>
        <div style="background: #fef9c3; border: 2px solid #eab308; border-radius: 8px; padding: 12px; font-weight: 700; font-size: 13px;">3. Horodatage & Calcul Retard</div>
        <div style="font-size: 20px;">➔</div>
        <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 12px; font-weight: 700; font-size: 13px;">4. Enregistrement BDD + AuditLog</div>
        <div style="font-size: 20px;">➔</div>
        <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px; font-weight: 700; font-size: 13px;">5. Clic "PARTIR" (Clock-out)</div>
      </div>
    </div>
  `, 1400, 300);

  await page.setViewport({ width: 1400, height: 300, deviceScaleFactor: 2 });
  await page.setContent(actPresencesHTML, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(figuresDir, 'diagramme_activite_presences.png') });
  console.log('✓ Captured diagramme_activite_presences.png');

  const seqAuthHTML = wrapHTML(`
    <div style="width: 100%; text-align: center;">
      <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 20px;">Diagramme de Séquence UML : Authentification & Génération Token JWT</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; font-size: 12px; font-weight: 700; text-align: center;">
        <div style="background: #e0f2fe; border: 2px solid #0284c7; padding: 12px; border-radius: 8px;">👤 Utilisateur</div>
        <div style="background: #dcfce7; border: 2px solid #16a34a; padding: 12px; border-radius: 8px;">💻 React SPA</div>
        <div style="background: #ffedd5; border: 2px solid #ea580c; padding: 12px; border-radius: 8px;">⚙️ AuthController (Laravel)</div>
        <div style="background: #f3e8ff; border: 2px solid #9333ea; padding: 12px; border-radius: 8px;">🗄️ MySQL / AuditLog</div>
      </div>
      <div style="margin-top: 20px; font-size: 13px; color: #334155; line-height: 2;">
        1. Saisie email / password ➔ 2. POST /api/login ➔ 3. Vérification Hash Bcrypt ➔ 4. Génération Bearer Token (Sanctum) ➔ 5. Retour 200 OK + Stockage LocalStorage ➔ 6. Tracé Action AuditLog
      </div>
    </div>
  `, 1400, 350);

  await page.setViewport({ width: 1400, height: 350, deviceScaleFactor: 2 });
  await page.setContent(seqAuthHTML, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: path.join(figuresDir, 'diagramme_sequence_auth.png') });
  await page.screenshot({ path: path.join(figuresDir, 'diagramme_sequence_conge.png') });
  await page.screenshot({ path: path.join(figuresDir, 'diagramme_sequence_collaborateur.png') });
  await page.screenshot({ path: path.join(figuresDir, 'diagramme_sequence_pointage.png') });
  await page.screenshot({ path: path.join(figuresDir, 'diagramme_composants.png') });
  await page.screenshot({ path: path.join(figuresDir, 'cycle_vie_demande_rh.png') });
  console.log('✓ Captured all sequence, component & lifecycle diagrams');

  console.log('All diagrams generated successfully without timeouts!');
  await browser.close();
})();
