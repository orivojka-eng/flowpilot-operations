/**
 * FlowPilot Operations - Core Application Logic
 * Duolingo UI Field Service SaaS with Web Audio Synthesizer,
 * Drag-and-Drop Scheduling, GPS Geofencing & Canvas Signature.
 */

import { icons } from './icons.js';
import { flowData } from './data.js';

class FlowPilotApp {
  constructor() {
    this.data = JSON.parse(JSON.stringify(flowData));
    this.currentView = 'view-intro';
    this.currentRole = 'Dispatcher';
    this.rolesList = ['Dispatcher', 'Field Tech (Marcus)', 'Customer (Apex Towers)', 'Finance Manager'];
    this.soundEnabled = true;
    this.simStep = 1;
    this.simPlaying = false;
    this.simTimer = null;
    this.isDrawing = false;
    this.hasSignature = false;

    // Initialize Web Audio Context for synthesized sound FX
    this.initAudio();
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      this.audioCtx = null;
    }
  }

  playSound(type = 'success') {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'success') {
        // Upbeat major triad arpeggio (C5 -> E5 -> G5 -> C6)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'click') {
        // Snappy tactile click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'celebrate') {
        // Triumphant chord
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.12);
        osc.frequency.setValueAtTime(783.99, now + 0.24);
        osc.frequency.setValueAtTime(1046.50, now + 0.36);
        osc.frequency.setValueAtTime(1318.51, now + 0.48);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
      }
    } catch (e) {
      // Audio error suppressed
    }
  }

  init() {
    this.renderIcons();
    this.bindEvents();
    this.renderMissionPath();
    this.renderSimStep(1);
    this.renderWorkOrders();
    this.renderScheduleBoard();
    this.renderMobileApp();
    this.renderAssets();
    this.renderInvoices();
    this.renderAuditLog();
    this.initSignaturePad();
  }

  renderIcons() {
    // Header & Brand Icons
    this.setInner('mascot-header-icon', icons.mascotDuo(36));
    this.setInner('hero-mascot-graphic', icons.mascotDuo(96));
    this.setInner('phone-mascot-mini', icons.mascotDuo(24));
    this.setInner('modal-mascot-cheer', icons.mascotDuo(80));

    this.setInner('icon-flame', icons.flame(22));
    this.setInner('icon-gem', icons.gem(20));
    this.setInner('icon-zap', icons.zap(20));
    this.setInner('icon-role-user', icons.user(18));
    this.setInner('icon-sound', this.soundEnabled ? icons.volume(20) : icons.volumeMute(20));
    this.setInner('icon-header-plus', icons.plus(18));

    // Nav Ribbon Tabs
    this.setInner('icon-tab-intro', icons.wrench(18));
    this.setInner('icon-tab-dispatch', icons.fileText(18));
    this.setInner('icon-tab-schedule', icons.calendar(18));
    this.setInner('icon-tab-mobile', icons.truck(18));
    this.setInner('icon-tab-assets', icons.shield(18));
    this.setInner('icon-tab-invoices', icons.dollar(18));
    this.setInner('icon-tab-audit', icons.clock(18));

    // Mobile Dock
    this.setInner('icon-dock-intro', icons.wrench(20));
    this.setInner('icon-dock-dispatch', icons.fileText(20));
    this.setInner('icon-dock-schedule', icons.calendar(20));
    this.setInner('icon-dock-mobile', icons.truck(20));
    this.setInner('icon-dock-invoices', icons.dollar(20));

    // KPI Icons
    this.setInner('icon-kpi-active', icons.wrench(28));
    this.setInner('icon-kpi-vans', icons.truck(28));
    this.setInner('icon-kpi-sla', icons.star(28));
    this.setInner('icon-kpi-revenue', icons.dollar(28));

    // Form & Controls
    this.setInner('icon-search-input', icons.search(18));
    this.setInner('icon-table-plus', icons.plus(18));
    this.setInner('icon-close-modal', icons.close(22));
    this.setInner('icon-sim-play', icons.play(16));
    this.setInner('icon-sim-reset', icons.refresh(16));
    this.setInner('icon-phone-gps', icons.mapPin(18));
    this.setInner('icon-phone-camera', icons.camera(18));
    this.setInner('icon-phone-check', icons.checkCircle(20));
    this.setInner('icon-asset-plus', icons.plus(18));
    this.setInner('icon-inv-download', icons.download(18));
  }

  setInner(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  bindEvents() {
    // Navigation Ribbon Tabs
    document.querySelectorAll('.duo-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const viewId = tab.dataset.view;
        this.switchView(viewId);
      });
    });

    // Mobile Dock Navigation
    document.querySelectorAll('.dock-item').forEach(item => {
      item.addEventListener('click', () => {
        const viewId = item.dataset.view;
        this.switchView(viewId);
      });
    });

    // Sound Toggle
    const btnSound = document.getElementById('btn-sound-toggle');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        this.setInner('icon-sound', this.soundEnabled ? icons.volume(20) : icons.volumeMute(20));
        this.playSound('click');
      });
    }

    // Role Switcher Toggle
    const btnRole = document.getElementById('btn-toggle-role');
    if (btnRole) {
      btnRole.addEventListener('click', () => {
        const currIdx = this.rolesList.indexOf(this.currentRole);
        const nextIdx = (currIdx + 1) % this.rolesList.length;
        this.currentRole = this.rolesList[nextIdx];
        const lbl = document.getElementById('label-current-role');
        if (lbl) lbl.textContent = `Role: ${this.currentRole}`;
        this.playSound('click');
      });
    }

    // Hero CTA Buttons
    const btnHeroQuest = document.getElementById('btn-hero-start-quest');
    if (btnHeroQuest) {
      btnHeroQuest.addEventListener('click', () => {
        const road = document.getElementById('roadmap-section');
        if (road) road.scrollIntoView({ behavior: 'smooth' });
        this.playSound('click');
      });
    }

    const btnHeroMobile = document.getElementById('btn-hero-launch-mobile');
    if (btnHeroMobile) {
      btnHeroMobile.addEventListener('click', () => {
        this.switchView('view-mobile');
      });
    }

    // Work Order Creation Modal
    const btnNewJob = document.getElementById('btn-header-create-job');
    const btnTableNewJob = document.getElementById('btn-table-new-job');
    const modalJob = document.getElementById('modal-create-job');
    const btnCloseModal = document.getElementById('btn-close-modal');

    [btnNewJob, btnTableNewJob].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          if (modalJob) modalJob.style.display = 'flex';
          this.playSound('click');
        });
      }
    });

    if (btnCloseModal && modalJob) {
      btnCloseModal.addEventListener('click', () => {
        modalJob.style.display = 'none';
        this.playSound('click');
      });
    }

    // Create Work Order Form Submit
    const formCreate = document.getElementById('form-create-job');
    if (formCreate) {
      formCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCreateWorkOrder();
      });
    }

    // Work Orders Search & Filter
    const inputSearch = document.getElementById('input-search-jobs');
    const filterPrio = document.getElementById('filter-priority');
    if (inputSearch) inputSearch.addEventListener('input', () => this.filterWorkOrders());
    if (filterPrio) filterPrio.addEventListener('change', () => this.filterWorkOrders());

    // Live Simulator Controls
    const btnSimPlay = document.getElementById('btn-sim-play');
    const btnSimReset = document.getElementById('btn-sim-reset');

    if (btnSimPlay) {
      btnSimPlay.addEventListener('click', () => this.toggleSimPlay());
    }
    if (btnSimReset) {
      btnSimReset.addEventListener('click', () => {
        this.simStep = 1;
        this.renderSimStep(1);
        this.playSound('click');
      });
    }

    // Simulator step dots
    document.querySelectorAll('.sim-step-point').forEach(pt => {
      pt.addEventListener('click', () => {
        const step = parseInt(pt.dataset.step, 10);
        this.simStep = step;
        this.renderSimStep(step);
        this.playSound('click');
      });
    });

    // Mobile App Interactive Actions
    const btnPhoneGps = document.getElementById('btn-phone-gps');
    if (btnPhoneGps) {
      btnPhoneGps.addEventListener('click', () => this.handlePhoneGpsCheckIn());
    }

    const btnPhoneCamera = document.getElementById('btn-phone-camera');
    if (btnPhoneCamera) {
      btnPhoneCamera.addEventListener('click', () => this.handlePhonePhotoCapture());
    }

    const btnPhoneComplete = document.getElementById('btn-phone-complete-job');
    if (btnPhoneComplete) {
      btnPhoneComplete.addEventListener('click', () => this.handlePhoneCompleteJob());
    }

    // Celebration modal close
    const btnCloseCeleb = document.getElementById('btn-close-celeb');
    const modalCeleb = document.getElementById('modal-celebration');
    if (btnCloseCeleb && modalCeleb) {
      btnCloseCeleb.addEventListener('click', () => {
        modalCeleb.style.display = 'none';
        this.playSound('click');
      });
    }

    // AI Auto-Schedule Button
    const btnAutoSchedule = document.getElementById('btn-auto-schedule-ai');
    if (btnAutoSchedule) {
      btnAutoSchedule.addEventListener('click', () => this.handleAutoSchedule());
    }

    // Export Invoices CSV
    const btnExportInv = document.getElementById('btn-export-all-invoices');
    if (btnExportInv) {
      btnExportInv.addEventListener('click', () => this.exportInvoicesCSV());
    }
  }

  switchView(viewId) {
    this.currentView = viewId;
    this.playSound('click');

    // Update main sections
    const views = ['view-intro', 'view-dispatch', 'view-schedule', 'view-mobile', 'view-assets', 'view-invoices', 'view-audit'];
    views.forEach(v => {
      const el = document.getElementById(v);
      if (el) el.style.display = (v === viewId) ? (v === 'view-intro' ? 'flex' : 'block') : 'none';
    });

    // Update desktop tabs
    document.querySelectorAll('.duo-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewId);
    });

    // Update mobile dock items
    document.querySelectorAll('.dock-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ====================================================================
  // DUOLINGO MISSION PATH (INTRO ROADMAP)
  // ====================================================================
  renderMissionPath() {
    const container = document.getElementById('path-nodes-container');
    if (!container) return;

    container.innerHTML = this.data.missionPath.map((node) => {
      const nodeColorClass = node.color === '#58CC02' ? 'node-green' :
                             node.color === '#1CB0F6' ? 'node-blue' :
                             node.color === '#FFC800' ? 'node-gold' :
                             node.color === '#CE82FF' ? 'node-purple' : 'node-red';

      return `
        <div class="path-node-row" id="row-${node.id}">
          <button class="path-node-btn ${nodeColorClass}" id="btn-${node.id}" title="${node.title}">
            <div class="node-number-badge">${node.number}</div>
            ${icons[node.icon] ? icons[node.icon](32) : icons.wrench(32)}
          </button>
          <div class="node-info-card">
            <div class="node-info-title">${node.title}</div>
            <div style="font-size: 13px; color: var(--duo-text-muted); margin: 2px 0;">${node.subtitle}</div>
            <div class="node-info-xp">${node.xp}</div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to path nodes
    this.data.missionPath.forEach(node => {
      const btn = document.getElementById(`btn-${node.id}`);
      if (btn) {
        btn.addEventListener('click', () => {
          this.handleNodeClick(node);
        });
      }
    });
  }

  handleNodeClick(node) {
    this.playSound('success');

    // Update speech bubble with Duolingo guidance
    const bubbleHeading = document.getElementById('bubble-heading');
    const bubbleText = document.getElementById('bubble-text');
    if (bubbleHeading && bubbleText) {
      bubbleHeading.textContent = `Stage ${node.number}: ${node.title}`;
      bubbleText.textContent = `${node.description} (+${node.xp} awarded to today's operations score!)`;
    }

    // Award +25 XP
    this.addXP(25);

    // Contextual Routing
    if (node.demoAction === 'create_job') {
      const modal = document.getElementById('modal-create-job');
      if (modal) modal.style.display = 'flex';
    } else if (node.demoAction === 'open_scheduler') {
      this.switchView('view-schedule');
    } else if (node.demoAction === 'open_mobile_gps' || node.demoAction === 'open_mobile_sign') {
      this.switchView('view-mobile');
    } else if (node.demoAction === 'open_assets') {
      this.switchView('view-assets');
    } else if (node.demoAction === 'open_invoices') {
      this.switchView('view-invoices');
    }
  }

  addXP(amount) {
    this.data.gamification.xpToday += amount;
    const el = document.getElementById('label-xp');
    if (el) el.textContent = `${this.data.gamification.xpToday.toLocaleString()} XP`;
  }

  // ====================================================================
  // LIVE OPERATIONAL SIMULATOR
  // ====================================================================
  renderSimStep(step) {
    this.simStep = step;

    // Update step dots
    document.querySelectorAll('.sim-step-point').forEach(pt => {
      const s = parseInt(pt.dataset.step, 10);
      pt.classList.toggle('active', s === step);
      pt.classList.toggle('done', s < step);
    });

    const card = document.getElementById('sim-card-content');
    if (!card) return;

    const stepsData = [
      {
        title: "Stage 1: Work Order Genesis & Triage",
        badge: "Created (WO-8401)",
        badgeClass: "prio-emergency",
        desc: "Customer reported rooftop cooling outage. Telemetry linked to Carrier 50-Ton Chiller. Priority elevated to Emergency due to server room thermal alerts.",
        metric: "SLA Deadline: 120 Minutes",
        actionBtn: "Assign Crew"
      },
      {
        title: "Stage 2: Smart Fleet Dispatch & Route Optimization",
        badge: "Dispatched",
        badgeClass: "status-route",
        desc: "AI engine evaluated 4 nearby vans. Marcus Vance selected due to EPA Universal certification and 8-minute route proximity. Van #402 en route.",
        metric: "Proximity: 2.4 Miles",
        actionBtn: "Track Van"
      },
      {
        title: "Stage 3: GPS Geofence Check-in & Telemetry",
        badge: "On Site Verified",
        badgeClass: "status-onsite",
        desc: "Mobile telemetry verified vehicle arrival at 450 Mission St within 100m geofence. Check-in timestamp automatically locked into immutable audit log.",
        metric: "Arrival: 10:05 AM (Punctual)",
        actionBtn: "View Diagnostic"
      },
      {
        title: "Stage 4: Proof of Work, Photos & Customer Sign-off",
        badge: "Sign-Off Acquired",
        badgeClass: "status-sched",
        desc: "Technician replaced condenser run capacitor, took high-res before/after photos, and David Sterling (Facilities Director) signed the mobile touchscreen canvas.",
        metric: "Health Score: 92/100",
        actionBtn: "Generate Invoice"
      },
      {
        title: "Stage 5: Instant Stripe Invoicing & Settled",
        badge: "Paid via Stripe",
        badgeClass: "status-done",
        desc: "Invoice #INV-3020 generated for $1,573.25. Auto-settled via Stripe payment webhook. Customer rated technician 5 stars! Full audit trail closed.",
        metric: "Net Margin: 68%",
        actionBtn: "Next Mission"
      }
    ];

    const cur = stepsData[step - 1];

    card.innerHTML = `
      <div style="flex-grow: 1;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <h3 style="font-size: 18px; font-weight: 900;">${cur.title}</h3>
          <span class="prio-badge ${cur.badgeClass}">${cur.badge}</span>
        </div>
        <p style="font-size: 14px; color: var(--duo-text-muted); font-weight: 700; margin-bottom: 12px;">
          ${cur.desc}
        </p>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span class="game-pill pill-xp" style="padding: 4px 10px; font-size: 12px;">${cur.metric}</span>
          <span style="font-size: 12px; font-weight: 800; color: var(--duo-green);">Zero SLA Breaches</span>
        </div>
      </div>
      <div>
        <button class="btn-duo btn-duo-green" id="btn-sim-action" style="padding: 10px 18px;">
          <span>${cur.actionBtn}</span>
        </button>
      </div>
    `;

    const btnAction = document.getElementById('btn-sim-action');
    if (btnAction) {
      btnAction.addEventListener('click', () => {
        if (this.simStep < 5) {
          this.simStep++;
          this.renderSimStep(this.simStep);
          this.playSound('success');
        } else {
          this.simStep = 1;
          this.renderSimStep(1);
          this.playSound('celebrate');
        }
      });
    }
  }

  toggleSimPlay() {
    this.simPlaying = !this.simPlaying;
    const txt = document.getElementById('sim-play-text');
    if (txt) txt.textContent = this.simPlaying ? 'Pause' : 'Auto Play';
    this.setInner('icon-sim-play', this.simPlaying ? icons.pause(16) : icons.play(16));

    if (this.simPlaying) {
      this.playSound('click');
      this.simTimer = setInterval(() => {
        if (this.simStep < 5) {
          this.simStep++;
        } else {
          this.simStep = 1;
        }
        this.renderSimStep(this.simStep);
        this.playSound('success');
      }, 3500);
    } else {
      clearInterval(this.simTimer);
    }
  }

  // ====================================================================
  // WORK ORDERS & DISPATCHER TABLE
  // ====================================================================
  renderWorkOrders(filteredList = null) {
    const tbody = document.getElementById('jobs-table-body');
    if (!tbody) return;

    const list = filteredList || this.data.workOrders;

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 32px; color: var(--duo-text-muted);">
            No work orders match the selected filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map(wo => `
      <tr>
        <td>
          <span style="font-weight: 900; color: var(--duo-text-main);">${wo.id}</span>
        </td>
        <td>
          <div style="font-weight: 800; color: var(--duo-text-main);">${wo.title}</div>
          <div style="font-size: 12px; color: var(--duo-text-muted);">${wo.customer} • ${wo.address}</div>
        </td>
        <td>
          <span class="prio-badge ${wo.priorityClass}">${wo.priority}</span>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 26px; height: 26px; border-radius: 50%; background: var(--duo-blue); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900;">
              ${wo.techName ? wo.techName[0] : 'U'}
            </div>
            <span>${wo.techName || 'Unassigned'}</span>
          </div>
        </td>
        <td>
          <span class="status-badge ${wo.statusClass}">${wo.status}</span>
        </td>
        <td style="font-weight: 900; color: var(--duo-text-main);">
          $${wo.quoteAmount.toFixed(2)}
        </td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn-duo btn-duo-white" style="padding: 6px 12px; font-size: 12px;" onclick="window.flowApp.inspectJob('${wo.id}')">
              <span>View</span>
            </button>
            <button class="btn-duo btn-duo-blue" style="padding: 6px 10px; font-size: 12px;" onclick="window.flowApp.switchView('view-mobile')">
              <span>Mobile</span>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  filterWorkOrders() {
    const query = (document.getElementById('input-search-jobs')?.value || '').toLowerCase();
    const prio = document.getElementById('filter-priority')?.value || 'all';

    const filtered = this.data.workOrders.filter(wo => {
      const matchesSearch = wo.title.toLowerCase().includes(query) ||
                            wo.customer.toLowerCase().includes(query) ||
                            wo.address.toLowerCase().includes(query) ||
                            (wo.techName && wo.techName.toLowerCase().includes(query));

      const matchesPrio = (prio === 'all') || (wo.priority === prio);

      return matchesSearch && matchesPrio;
    });

    this.renderWorkOrders(filtered);
  }

  inspectJob(jobId) {
    this.playSound('click');
    const job = this.data.workOrders.find(j => j.id === jobId);
    if (!job) return;

    alert(`Work Order: ${job.id}\nTitle: ${job.title}\nCustomer: ${job.customer}\nAssigned Tech: ${job.techName}\nStatus: ${job.status}\nScheduled: ${job.scheduledSlot}`);
  }

  handleCreateWorkOrder() {
    const title = document.getElementById('input-job-title')?.value || 'New Emergency Maintenance';
    const customer = document.getElementById('input-job-customer')?.value || 'Apex Client';
    const address = document.getElementById('input-job-address')?.value || '100 Market St, San Francisco, CA';
    const priority = document.getElementById('select-job-priority')?.value || 'High';
    const techName = document.getElementById('select-job-tech')?.value || 'Marcus Vance';
    const price = parseFloat(document.getElementById('input-job-price')?.value || '950');

    const newId = `WO-840${this.data.workOrders.length + 1}`;
    const newOrder = {
      id: newId,
      title,
      customer,
      contactName: "Facility Operations Desk",
      address,
      priority,
      priorityClass: priority === 'Emergency' ? 'prio-emergency' : (priority === 'High' ? 'prio-high' : 'prio-medium'),
      status: 'Scheduled',
      statusClass: 'status-sched',
      techId: 'tech-1',
      techName,
      category: 'General Field Service',
      scheduledSlot: '2:00 PM - 4:00 PM',
      assetId: 'AST-501',
      quoteAmount: price,
      description: 'Scheduled on demand dispatch work order.',
      timeline: [{ time: "Just now", event: "Work order created via Dispatch Board" }],
      photos: []
    };

    this.data.workOrders.unshift(newOrder);
    this.data.gamification.activeJobsCount++;
    const kpiEl = document.getElementById('kpi-active-jobs');
    if (kpiEl) kpiEl.textContent = this.data.gamification.activeJobsCount;

    // Log to audit trail
    this.addAuditLog('Dispatcher', `Created ${newId}`, `${title} assigned to ${techName}`);

    // Close modal & re-render
    const modal = document.getElementById('modal-create-job');
    if (modal) modal.style.display = 'none';

    this.renderWorkOrders();
    this.renderScheduleBoard();
    this.playSound('celebrate');
    this.addXP(100);
  }

  // ====================================================================
  // DRAG & DROP TECHNICIAN SCHEDULING BOARD
  // ====================================================================
  renderScheduleBoard() {
    const container = document.getElementById('schedule-technicians-list');
    if (!container) return;

    container.innerHTML = this.data.technicians.map(tech => {
      // Find jobs assigned to this tech
      const techJobs = this.data.workOrders.filter(w => w.techName === tech.name);

      return `
        <div class="schedule-tech-row" data-tech-id="${tech.id}">
          <div class="tech-info-cell">
            <div class="tech-avatar-circle" style="background: ${tech.badgeColor};">
              ${tech.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style="font-weight: 900; font-size: 14px;">${tech.name}</div>
              <div style="font-size: 12px; color: var(--duo-text-muted);">${tech.role}</div>
              <div style="font-size: 11px; font-weight: 800; color: var(--duo-yellow-dark); margin-top: 2px;">
                ★ ${tech.rating} (${tech.vehicle.split(' ')[0]})
              </div>
            </div>
          </div>
          
          ${this.data.scheduleSlots.map((slot, sIdx) => {
            const assignedJob = techJobs[sIdx % techJobs.length];
            const hasJob = (sIdx === 1 && tech.id === 'tech-1') ||
                           (sIdx === 2 && tech.id === 'tech-2') ||
                           (sIdx === 0 && tech.id === 'tech-3') ||
                           (sIdx === 3 && tech.id === 'tech-4');

            return `
              <div class="slot-dropzone" data-tech="${tech.name}" data-slot="${slot}" ondragover="event.preventDefault(); this.classList.add('drag-over');" ondragleave="this.classList.remove('drag-over');" ondrop="window.flowApp.handleDrop(event, this);">
                ${hasJob && assignedJob ? `
                  <div class="job-drag-card" draggable="true" ondragstart="window.flowApp.handleDragStart(event, '${assignedJob.id}');" onclick="window.flowApp.switchView('view-mobile')">
                    <div style="font-size: 11px; font-weight: 900; color: var(--duo-blue-dark);">${assignedJob.id}</div>
                    <div style="font-size: 12px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${assignedJob.title.split(' - ')[0]}
                    </div>
                    <span class="prio-badge ${assignedJob.priorityClass}" style="font-size: 9px; padding: 2px 6px; margin-top: 4px;">
                      ${assignedJob.priority}
                    </span>
                  </div>
                ` : `
                  <button class="btn-duo btn-duo-white" style="border: 1px dashed #DDD; box-shadow: none; font-size: 11px; padding: 4px 8px; opacity: 0.6;" onclick="window.flowApp.assignSlot('${tech.name}', '${slot}')">
                    + Slot
                  </button>
                `}
              </div>
            `;
          }).join('')}
        </div>
      `;
    }).join('');
  }

  handleDragStart(e, jobId) {
    e.dataTransfer.setData('text/plain', jobId);
    this.playSound('click');
  }

  handleDrop(e, dropzone) {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    const jobId = e.dataTransfer.getData('text/plain');
    const techName = dropzone.dataset.tech;
    const slot = dropzone.dataset.slot;

    const job = this.data.workOrders.find(j => j.id === jobId);
    if (job) {
      job.techName = techName;
      job.scheduledSlot = slot;
      this.playSound('success');
      this.addAuditLog(techName, `Job Reassigned`, `${job.id} moved to ${slot} on schedule`);
      this.renderScheduleBoard();
      this.renderWorkOrders();
    }
  }

  assignSlot(techName, slot) {
    this.playSound('click');
    const job = this.data.workOrders.find(j => j.status === 'Scheduled');
    if (job) {
      job.techName = techName;
      job.scheduledSlot = slot;
      this.renderScheduleBoard();
      this.playSound('success');
    }
  }

  handleAutoSchedule() {
    this.playSound('celebrate');
    this.addAuditLog('AI Route Engine', 'Fleet Schedule Optimized', 'Shortened overall transit distance by 22 miles.');
    alert('AI Fleet Optimizer: All technician slots dynamically balanced for minimal traffic delays & fuel savings (+150 XP)!');
    this.addXP(150);
  }

  // ====================================================================
  // TECHNICIAN MOBILE APP (GPS, PHOTO & CANVAS SIGNATURE)
  // ====================================================================
  renderMobileApp() {
    const gallery = document.getElementById('phone-photo-gallery');
    if (!gallery) return;

    gallery.innerHTML = `
      <div style="width: 70px; height: 55px; border-radius: 8px; overflow: hidden; border: 2px solid var(--duo-border); position: relative;">
        <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="Diagnostic">
        <span style="position: absolute; bottom: 2px; left: 2px; font-size: 8px; background: rgba(0,0,0,0.7); color: #FFF; padding: 1px 4px; border-radius: 4px; font-weight: 800;">Before</span>
      </div>
      <div style="width: 70px; height: 55px; border-radius: 8px; overflow: hidden; border: 2px solid var(--duo-border); position: relative;">
        <img src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=200&auto=format&fit=crop&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="Capacitor">
        <span style="position: absolute; bottom: 2px; left: 2px; font-size: 8px; background: rgba(0,0,0,0.7); color: #FFF; padding: 1px 4px; border-radius: 4px; font-weight: 800;">After</span>
      </div>
    `;
  }

  initSignaturePad() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1A1A1A';

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDraw = (e) => {
      this.isDrawing = true;
      this.hasSignature = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const stopDraw = () => {
      this.isDrawing = false;
    };

    // Mouse events
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e); }, { passive: false });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, { passive: false });
    canvas.addEventListener('touchend', stopDraw);

    // Clear Button
    const btnClear = document.getElementById('btn-clear-sig');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.hasSignature = false;
        this.playSound('click');
      });
    }
  }

  handlePhoneGpsCheckIn() {
    this.playSound('success');
    const badge = document.getElementById('gps-status-badge');
    const coords = document.getElementById('gps-coords-display');
    const btn = document.getElementById('btn-phone-gps-text');

    if (badge) {
      badge.textContent = "Geofence Verified";
      badge.className = "status-badge status-onsite";
    }
    if (coords) {
      coords.textContent = "Lat: 37.7751° N, Lng: 122.4192° W (Accuracy: ±2m • 450 Mission)";
    }
    if (btn) btn.textContent = "GPS Telemetry Synced!";

    this.addAuditLog('Marcus Vance', 'GPS Geofence Ping Verified', 'Technician on-site at 450 Mission St (Roof B).');
    this.addXP(50);
  }

  handlePhonePhotoCapture() {
    this.playSound('click');
    const gallery = document.getElementById('phone-photo-gallery');
    if (gallery) {
      const newThumb = document.createElement('div');
      newThumb.style.cssText = "width: 70px; height: 55px; border-radius: 8px; overflow: hidden; border: 2px solid var(--duo-green); position: relative;";
      newThumb.innerHTML = `
        <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="New Repair Photo">
        <span style="position: absolute; bottom: 2px; left: 2px; font-size: 8px; background: var(--duo-green); color: #FFF; padding: 1px 4px; border-radius: 4px; font-weight: 800;">New</span>
      `;
      gallery.appendChild(newThumb);
    }
    this.playSound('success');
    this.addAuditLog('Marcus Vance', 'Diagnostic Photo Uploaded', 'High-res thermal scan of compressor motor uploaded.');
    this.addXP(50);
  }

  handlePhoneCompleteJob() {
    this.playSound('celebrate');
    const job = this.data.workOrders.find(j => j.id === 'WO-8401');
    if (job) {
      job.status = 'Completed';
      job.statusClass = 'status-done';
    }

    // Update phone status
    const topStatus = document.getElementById('phone-top-status');
    if (topStatus) {
      topStatus.textContent = 'Completed';
      topStatus.className = 'status-badge status-done';
    }

    // Add audit log
    this.addAuditLog('David Sterling (Customer)', 'Customer Signature Approved', 'Signed proof of work for WO-8401.');
    this.addAuditLog('Stripe Billing', 'Stripe Charge Created', 'Auto-drafted $1,573.25 for invoice #INV-3020.');

    // Show celebration modal
    const modalCeleb = document.getElementById('modal-celebration');
    if (modalCeleb) modalCeleb.style.display = 'flex';

    this.addXP(250);
    this.data.gamification.flowGems += 25;
    const gemsEl = document.getElementById('label-gems');
    if (gemsEl) gemsEl.textContent = this.data.gamification.flowGems;

    this.renderWorkOrders();
    this.renderInvoices();
  }

  // ====================================================================
  // ASSET & EQUIPMENT REGISTRY
  // ====================================================================
  renderAssets() {
    const grid = document.getElementById('asset-cards-grid');
    if (!grid) return;

    grid.innerHTML = this.data.assets.map(asset => `
      <div class="duo-card asset-card" id="asset-${asset.id}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span class="prio-badge prio-normal" style="font-size: 11px;">${asset.serial}</span>
            <h3 style="font-size: 18px; font-weight: 900; margin-top: 4px;">${asset.name}</h3>
          </div>
          <span class="status-badge status-onsite">Score: ${asset.healthScore}%</span>
        </div>

        <div class="asset-health-bar">
          <div class="asset-health-fill" style="width: ${asset.healthScore}%;"></div>
        </div>

        <div style="font-size: 13px; color: var(--duo-text-muted); font-weight: 700;">
          <div><strong>Location:</strong> ${asset.location}</div>
          <div><strong>Manufacturer:</strong> ${asset.manufacturer}</div>
          <div><strong>Warranty:</strong> ${asset.warranty}</div>
        </div>

        <div style="background: var(--duo-bg-soft); padding: 12px; border-radius: var(--duo-radius-md); font-size: 12px;">
          <div style="font-weight: 900; margin-bottom: 4px; color: var(--duo-text-main);">Technical Specifications:</div>
          ${Object.entries(asset.specs).map(([k, v]) => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="color: var(--duo-text-muted);">${k}:</span>
              <strong>${v}</strong>
            </div>
          `).join('')}
        </div>

        <button class="btn-duo btn-duo-white" style="width: 100%; font-size: 13px; padding: 10px;" onclick="alert('Maintenance History:\\n${asset.history.map(h => `${h.date} - ${h.tech}: ${h.notes}`).join('\\n')}')">
          <span>View Service History (${asset.history.length})</span>
        </button>
      </div>
    `).join('');
  }

  // ====================================================================
  // INVOICES & STRIPE PAYMENTS
  // ====================================================================
  renderInvoices() {
    const list = document.getElementById('invoices-list-wrapper');
    if (!list) return;

    list.innerHTML = this.data.invoices.map(inv => `
      <div class="duo-card invoice-card" id="inv-${inv.id}">
        <div class="inv-header">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 style="font-size: 20px; font-weight: 900;">${inv.id}</h3>
              <span class="status-badge ${inv.statusClass}">${inv.status}</span>
            </div>
            <div style="font-size: 14px; color: var(--duo-text-muted); font-weight: 700; margin-top: 4px;">
              Customer: <strong>${inv.customer}</strong> (${inv.billingContact})
            </div>
            <div style="font-size: 12px; color: var(--duo-text-muted); margin-top: 2px;">
              Date: ${inv.date} • ${inv.dueDate}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 26px; font-weight: 900; color: var(--duo-green);">$${inv.total.toFixed(2)}</div>
            ${inv.stripeChargeId ? `
              <span style="font-size: 11px; font-weight: 800; color: var(--duo-blue); background: var(--duo-blue-light); padding: 2px 8px; border-radius: 6px;">
                Stripe: ${inv.stripeChargeId.slice(0, 16)}...
              </span>
            ` : `
              <span style="font-size: 11px; font-weight: 800; color: var(--duo-orange-dark); background: #FFF8E1; padding: 2px 8px; border-radius: 6px;">
                Unpaid / Due
              </span>
            `}
          </div>
        </div>

        <!-- Line Items -->
        <table class="duo-table" style="box-shadow: none; border-radius: var(--duo-radius-md);">
          <thead>
            <tr>
              <th>Item & Labor Description</th>
              <th style="width: 80px; text-align: center;">Qty</th>
              <th style="width: 120px; text-align: right;">Rate</th>
              <th style="width: 120px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${inv.items.map(item => `
              <tr>
                <td style="font-weight: 800;">${item.desc}</td>
                <td style="text-align: center;">${item.qty}</td>
                <td style="text-align: right;">$${item.rate.toFixed(2)}</td>
                <td style="text-align: right; font-weight: 900;">$${item.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Actions -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px;">
          <div style="font-size: 12px; color: var(--duo-text-muted); font-weight: 700;">
            Linked Work Order: <strong>${inv.workOrderId}</strong>
          </div>
          <div style="display: flex; gap: 10px;">
            ${inv.status !== 'Paid' ? `
              <button class="btn-duo btn-duo-green" style="padding: 8px 16px; font-size: 13px;" onclick="window.flowApp.settleStripePayment('${inv.id}')">
                <span>Charge via Stripe Webhook</span>
              </button>
            ` : `
              <button class="btn-duo btn-duo-white" style="padding: 8px 16px; font-size: 13px;" onclick="window.flowApp.printInvoicePDF('${inv.id}')">
                <span>Download PDF Receipt</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `).join('');
  }

  settleStripePayment(invId) {
    this.playSound('celebrate');
    const inv = this.data.invoices.find(i => i.id === invId);
    if (inv) {
      inv.status = 'Paid';
      inv.statusClass = 'inv-paid';
      inv.stripeChargeId = `ch_live_${Math.random().toString(36).substr(2, 9)}QuolyTech`;
      this.addAuditLog('Stripe Webhook', `Settled Payment for ${invId}`, `Auto-charged $${inv.total.toFixed(2)} to credit card on file.`);
      this.renderInvoices();
      this.addXP(200);
    }
  }

  printInvoicePDF(invId) {
    this.playSound('click');
    window.print();
  }

  exportInvoicesCSV() {
    this.playSound('success');
    let csv = "Invoice ID,Customer,Date,Amount,Status,Stripe Charge\n";
    this.data.invoices.forEach(i => {
      csv += `"${i.id}","${i.customer}","${i.date}",${i.total},"${i.status}","${i.stripeChargeId || 'N/A'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FlowPilot-Invoices-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ====================================================================
  // AUDIT LOG & COMPLIANCE
  // ====================================================================
  renderAuditLog() {
    const stream = document.getElementById('audit-log-stream');
    if (!stream) return;

    stream.innerHTML = this.data.auditLog.map(item => `
      <div class="audit-item" id="audit-${item.id}">
        <div style="font-family: monospace; font-size: 12px; font-weight: 800; color: var(--duo-text-muted); width: 110px;">
          ${item.time}
        </div>
        <div style="flex-grow: 1;">
          <div style="font-weight: 900; font-size: 14px; color: var(--duo-text-main);">
            ${item.action}
          </div>
          <div style="font-size: 13px; color: var(--duo-text-muted); font-weight: 600;">
            ${item.details}
          </div>
        </div>
        <span class="game-pill pill-role" style="font-size: 11px; padding: 4px 8px;">
          ${item.actor}
        </span>
      </div>
    `).join('');
  }

  addAuditLog(actor, action, details) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newEntry = {
      id: `log-${this.data.auditLog.length + 1}`,
      time: timeStr,
      actor,
      action,
      details,
      type: 'user'
    };
    this.data.auditLog.unshift(newEntry);
    this.renderAuditLog();
  }
}

// Global bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.flowApp = new FlowPilotApp();
  window.flowApp.init();
});
