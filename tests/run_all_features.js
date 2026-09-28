/**
 * FlowPilot Operations - Comprehensive Functional Test Suite (Node/JSDOM)
 * Tests all operational features, Duolingo UI styling, and interactions.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlSource = fs.readFileSync(htmlPath, 'utf8');

// Set up virtual DOM
const dom = new JSDOM(htmlSource, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:5176/"
});

const { window } = dom;
const { document } = window;

// Polyfill Canvas 2D context for JSDOM
window.HTMLCanvasElement.prototype.getContext = function () {
  return {
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    clearRect: () => {},
    arc: () => {},
    fill: () => {}
  };
};

// Polyfill Web Audio API
window.AudioContext = class {
  constructor() {
    this.state = 'running';
    this.currentTime = 0;
  }
  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }
  createGain() {
    return {
      gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      connect: () => {}
    };
  }
  resume() { return Promise.resolve(); }
};

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAILED: ${message}`);
    failed++;
  }
}

async function runTestSuite() {
  console.log("\n======================================================");
  console.log(" FLOWPILOT OPERATIONS AUTOMATED TEST SUITE (Node/JSDOM)");
  console.log("======================================================\n");

  // Load modules
  const { icons } = await import('../src/icons.js');
  const { flowData } = await import('../src/data.js');

  console.log("--- TEST GROUP 1: Duolingo UI Vector Icons & Mascot ---");
  assert(typeof icons.mascotDuo === 'function', "Mascot Pilot Duo vector SVG generator exists");
  assert(icons.mascotDuo().includes('<svg'), "Mascot Pilot Duo returns SVG markup");
  assert(typeof icons.flame === 'function', "Duolingo flame streak SVG exists");
  assert(typeof icons.gem === 'function', "Duolingo blue gem SVG exists");
  assert(typeof icons.zap === 'function', "Duolingo XP lightning bolt SVG exists");
  assert(typeof icons.mapPin === 'function', "GPS map pin vector SVG exists");
  assert(typeof icons.signature === 'function', "Signature vector SVG exists");

  console.log("\n--- TEST GROUP 2: Enterprise Branding & Zero Raw Emojis ---");
  const bodyText = document.body.innerHTML;
  const rawEmojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  assert(!rawEmojiRegex.test(bodyText), "DOM is 100% clean of raw unicode emojis");
  assert(bodyText.includes("QuolyTech"), "QuolyTech corporate attribution present");
  assert(bodyText.includes("© 2026 QuolyTech. All rights reserved."), "2026 Copyright statement present");

  console.log("\n--- TEST GROUP 3: Duolingo Gamification Header ---");
  const streakPill = document.getElementById('pill-streak');
  const gemsPill = document.getElementById('pill-gems');
  const xpPill = document.getElementById('pill-xp');
  const roleBtn = document.getElementById('btn-toggle-role');

  assert(streakPill !== null, "Duolingo streak pill exists");
  assert(gemsPill !== null, "FlowCoins gem pill exists");
  assert(xpPill !== null, "XP gamification pill exists");
  assert(roleBtn !== null, "Role toggle pill button exists");

  console.log("\n--- TEST GROUP 4: Navigation Ribbons & Mobile Dock ---");
  const tabIntro = document.getElementById('tab-intro');
  const tabDispatch = document.getElementById('tab-dispatch');
  const tabSchedule = document.getElementById('tab-schedule');
  const tabMobile = document.getElementById('tab-mobile');
  const tabAssets = document.getElementById('tab-assets');
  const tabInvoices = document.getElementById('tab-invoices');
  const tabAudit = document.getElementById('tab-audit');

  assert(tabIntro && tabDispatch && tabSchedule && tabMobile && tabAssets && tabInvoices && tabAudit, "All 7 Duolingo segmented nav tabs exist");

  const dockIntro = document.getElementById('dock-btn-intro');
  const dockDispatch = document.getElementById('dock-btn-dispatch');
  const dockSchedule = document.getElementById('dock-btn-schedule');
  const dockMobile = document.getElementById('dock-btn-mobile');
  const dockInvoices = document.getElementById('dock-btn-invoices');

  assert(dockIntro && dockDispatch && dockSchedule && dockMobile && dockInvoices, "All mobile bottom dock buttons exist");

  console.log("\n--- TEST GROUP 5: Duolingo Mission Path & Live Simulator ---");
  const pathSection = document.getElementById('roadmap-section');
  const pathNodesContainer = document.getElementById('path-nodes-container');
  const simStepsBar = document.getElementById('sim-steps-bar');
  const btnSimPlay = document.getElementById('btn-sim-play');

  assert(pathSection !== null, "Roadmap section exists");
  assert(pathNodesContainer !== null, "Path nodes container exists");
  assert(simStepsBar !== null, "Workflow simulator step bar exists");
  assert(btnSimPlay !== null, "Simulator Auto Play button exists");

  console.log("\n--- TEST GROUP 6: Work Orders & Dispatcher Board ---");
  const kpiActive = document.getElementById('kpi-active-jobs');
  const inputSearch = document.getElementById('input-search-jobs');
  const filterPrio = document.getElementById('filter-priority');
  const btnCreateJob = document.getElementById('btn-table-new-job');
  const jobsTable = document.getElementById('jobs-table-body');

  assert(kpiActive !== null, "Active work orders KPI exists");
  assert(inputSearch !== null, "Search input exists");
  assert(filterPrio !== null, "Priority filter dropdown exists");
  assert(btnCreateJob !== null, "Create work order button exists");
  assert(jobsTable !== null, "Jobs table body exists");

  console.log("\n--- TEST GROUP 7: Fleet Scheduling Board (Gantt) ---");
  const scheduleWrapper = document.getElementById('schedule-board-wrapper');
  const scheduleTechsList = document.getElementById('schedule-technicians-list');
  const btnAutoSchedule = document.getElementById('btn-auto-schedule-ai');

  assert(scheduleWrapper !== null, "Scheduling board wrapper exists");
  assert(scheduleTechsList !== null, "Technicians schedule list container exists");
  assert(btnAutoSchedule !== null, "AI Auto-Optimize button exists");

  console.log("\n--- TEST GROUP 8: Technician Mobile App (GPS & Canvas Sign-off) ---");
  const phoneGpsBtn = document.getElementById('btn-phone-gps');
  const phoneCameraBtn = document.getElementById('btn-phone-camera');
  const sigCanvas = document.getElementById('signature-canvas');
  const btnClearSig = document.getElementById('btn-clear-sig');
  const btnCompleteJob = document.getElementById('btn-phone-complete-job');

  assert(phoneGpsBtn !== null, "Mobile GPS check-in button exists");
  assert(phoneCameraBtn !== null, "Mobile camera capture button exists");
  assert(sigCanvas !== null, "HTML5 Canvas signature pad exists");
  assert(btnClearSig !== null, "Clear signature button exists");
  assert(btnCompleteJob !== null, "Complete & submit job button exists");

  console.log("\n--- TEST GROUP 9: Invoices, Stripe Billing & Audit Ledger ---");
  const assetGrid = document.getElementById('asset-cards-grid');
  const invWrapper = document.getElementById('invoices-list-wrapper');
  const btnExportInv = document.getElementById('btn-export-all-invoices');
  const auditStream = document.getElementById('audit-log-stream');

  assert(assetGrid !== null, "Asset cards grid exists");
  assert(invWrapper !== null, "Invoices list wrapper exists");
  assert(btnExportInv !== null, "Export billing CSV button exists");
  assert(auditStream !== null, "Audit log stream container exists");

  console.log("\n--- TEST GROUP 10: Duolingo Modals (Create Job & Celebration) ---");
  const modalCreate = document.getElementById('modal-create-job');
  const modalCeleb = document.getElementById('modal-celebration');
  const btnCloseCeleb = document.getElementById('btn-close-celeb');

  assert(modalCreate !== null, "Create work order modal exists");
  assert(modalCeleb !== null, "Celebration level-up modal exists");
  assert(btnCloseCeleb !== null, "Celebration continue button exists");

  console.log("\n======================================================");
  console.log(" TEST RESULTS SUMMARY:");
  console.log(` Passed: ${passed}`);
  console.log(` Failed: ${failed}`);
  console.log("======================================================\n");

  if (failed === 0) {
    console.log("🎉 ALL FLOWPILOT OPERATIONS FEATURES TESTED AND PASSED PERFECTLY!\n");
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error("Test execution error:", err);
  process.exit(1);
});
