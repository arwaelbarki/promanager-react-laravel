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

(async () => {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  async function clickNav(text) {
    console.log(`Navigating to section matching: ${text}`);
    await page.evaluate((txt) => {
      const items = Array.from(document.querySelectorAll('button, a, div'));
      const found = items.find(el => el.innerText && el.innerText.trim().toLowerCase().includes(txt.toLowerCase()));
      if (found) found.click();
    }, text);
    await new Promise(r => setTimeout(r, 1500));
  }

  // 1. Dashboard
  console.log('Capturing dashboard.png & stitch-dashboard.png...');
  await page.screenshot({ path: path.join(figuresDir, 'dashboard.png'), fullPage: false });
  await page.screenshot({ path: path.join(figuresDir, 'stitch-dashboard.png'), fullPage: false });

  // 2. Employees
  await clickNav('collaborateurs');
  console.log('Capturing employees.png...');
  await page.screenshot({ path: path.join(figuresDir, 'employees.png'), fullPage: false });

  // Detail view
  console.log('Clicking employee details...');
  await page.evaluate(() => {
    const detailBtn = document.querySelector('button[title*="Fiche"], button[title*="Détails"], table tbody tr button');
    if (detailBtn) detailBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  console.log('Capturing employee-detail.png...');
  await page.screenshot({ path: path.join(figuresDir, 'employee-detail.png'), fullPage: false });

  // 3. Contrats
  await clickNav('contrats');
  console.log('Capturing contracts-documents.png...');
  await page.screenshot({ path: path.join(figuresDir, 'contracts-documents.png'), fullPage: false });

  // 4. Congés
  await clickNav('congés');
  console.log('Capturing leaves.png...');
  await page.screenshot({ path: path.join(figuresDir, 'leaves.png'), fullPage: false });

  // 5. Pointage
  await clickNav('pointage');
  console.log('Capturing attendance.png...');
  await page.screenshot({ path: path.join(figuresDir, 'attendance.png'), fullPage: false });

  // 6. Documents
  await clickNav('documents');
  console.log('Capturing documents.png...');
  await page.screenshot({ path: path.join(figuresDir, 'documents.png'), fullPage: false });

  // 7. Demandes RH
  await clickNav('demandes');
  console.log('Capturing hr-requests.png...');
  await page.screenshot({ path: path.join(figuresDir, 'hr-requests.png'), fullPage: false });

  // 8. Notifications
  await clickNav('notifications');
  console.log('Capturing notifications.png...');
  await page.screenshot({ path: path.join(figuresDir, 'notifications.png'), fullPage: false });

  // 9. Mobile View
  console.log('Capturing mobile.png...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await clickNav('tableau de bord');
  await page.screenshot({ path: path.join(figuresDir, 'mobile.png'), fullPage: false });

  // 10. Login
  console.log('Capturing login.png...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const logoutBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('déconnexion'));
    if (logoutBtn) logoutBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(figuresDir, 'login.png'), fullPage: false });

  console.log('Done capturing all screenshots!');
  await browser.close();
})();
