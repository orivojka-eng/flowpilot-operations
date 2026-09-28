/**
 * FlowPilot Operations - Field Service Data Model
 * Realistic corporate field service operations dataset with Duolingo-styled gamification metrics.
 */

export const flowData = {
  organization: {
    name: "Apex Field Solutions",
    platform: "FlowPilot Operations by QuolyTech",
    copyright: "© 2026 QuolyTech. All rights reserved.",
    subscription: "Enterprise Fleet Tier (50 Vans)",
    supportHotline: "+1 (800) 555-FLOW",
    portalUrl: "https://ops.flowpilot.quolytech.com"
  },

  // Duolingo-Style Gamified Operations Stats
  gamification: {
    streakDays: 14,
    streakTitle: "14-Day Zero-SLA-Breach Streak!",
    firstTimeFixRate: 98.4,
    xpToday: 4850,
    flowGems: 420,
    activeJobsCount: 34,
    completedJobsToday: 18,
    activeTechsCount: 12,
    fleetPunctuality: 99.2
  },

  // Interactive Duolingo Mission Path Nodes (Winding Operational Roadmap)
  missionPath: [
    {
      id: "path-1",
      number: 1,
      title: "Work Order Genesis",
      subtitle: "Triage & AI Job Creation",
      xp: "+100 XP",
      color: "#58CC02", // Duo Green
      status: "completed",
      description: "Omnichannel customer requests (phone, email, sensor telemetry) auto-generate work orders with priority triage and asset binding.",
      icon: "fileText",
      demoAction: "create_job"
    },
    {
      id: "path-2",
      number: 2,
      title: "Smart Dispatch & Scheduling",
      subtitle: "Drag & Drop Fleet Board",
      xp: "+150 XP",
      color: "#1CB0F6", // Duo Blue
      status: "completed",
      description: "Visual dispatcher calendar with skill-matching algorithms, route proximity, and drag-and-drop technician assignment.",
      icon: "calendar",
      demoAction: "open_scheduler"
    },
    {
      id: "path-3",
      number: 3,
      title: "GPS Geofence Check-in",
      subtitle: "Fleet Telemetry & Arrival",
      xp: "+200 XP",
      color: "#FFC800", // Duo Gold
      status: "active",
      description: "Technician mobile app auto-verifies arrival when vehicle crosses the 100m client geofence, logging exact timestamp.",
      icon: "mapPin",
      demoAction: "open_mobile_gps"
    },
    {
      id: "path-4",
      number: 4,
      title: "Equipment Diagnostic & History",
      subtitle: "QR Asset Inspection",
      xp: "+250 XP",
      color: "#CE82FF", // Duo Purple
      status: "pending",
      description: "Technician pulls live equipment telemetry, past maintenance logs, warranties, and parts schematics on mobile.",
      icon: "shield",
      demoAction: "open_assets"
    },
    {
      id: "path-5",
      number: 5,
      title: "Proof of Work & Signature",
      subtitle: "Photos & Canvas Sign-off",
      xp: "+300 XP",
      color: "#FF4B4B", // Duo Red
      status: "pending",
      description: "Digital before/after photos and client finger sign-off on touchscreen canvas generate tamper-proof proof of completion.",
      icon: "signature",
      demoAction: "open_mobile_sign"
    },
    {
      id: "path-6",
      number: 6,
      title: "Stripe Billing & Feedback",
      subtitle: "Instant Invoice & 5-Star SLA",
      xp: "+500 XP",
      color: "#58CC02", // Duo Green Crown
      status: "pending",
      description: "Automatic quote-to-invoice reconciliation, direct Stripe payment settlement, and client feedback capture.",
      icon: "dollar",
      demoAction: "open_invoices"
    }
  ],

  // Technicians / Field Crew
  technicians: [
    {
      id: "tech-1",
      name: "Marcus Vance",
      role: "Lead HVAC & Chiller Specialist",
      rating: 4.95,
      reviewsCount: 312,
      status: "On Site",
      statusClass: "status-onsite",
      vehicle: "Van #402 (Ford Transit)",
      phone: "+1 (415) 555-0142",
      badgeColor: "#58CC02",
      activeJobId: "WO-8401",
      location: "Metro Tower 4, Floor 12",
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: "tech-2",
      name: "Sarah Chen",
      role: "Master Electrician & High-Voltage",
      rating: 4.98,
      reviewsCount: 440,
      status: "In Route",
      statusClass: "status-route",
      vehicle: "Van #408 (Rivian EDV)",
      phone: "+1 (415) 555-0188",
      badgeColor: "#1CB0F6",
      activeJobId: "WO-8402",
      location: "En route to Pacific BioPharma (ETA 8 min)",
      coordinates: { lat: 37.7680, lng: -122.4050 }
    },
    {
      id: "tech-3",
      name: "Liam Patel",
      role: "Commercial Plumbing & Fire Systems",
      rating: 4.88,
      reviewsCount: 198,
      status: "Completed",
      statusClass: "status-done",
      vehicle: "Van #411 (Mercedes Sprinter)",
      phone: "+1 (510) 555-0211",
      badgeColor: "#FFC800",
      activeJobId: "WO-8403",
      location: "Bayview Medical Facility",
      coordinates: { lat: 37.7990, lng: -122.2710 }
    },
    {
      id: "tech-4",
      name: "Elena Rostova",
      role: "Controls & Automation Engineer",
      rating: 4.92,
      reviewsCount: 275,
      status: "Available",
      statusClass: "status-available",
      vehicle: "Van #405 (Ram ProMaster)",
      phone: "+1 (415) 555-0299",
      badgeColor: "#CE82FF",
      activeJobId: null,
      location: "Central Dispatch HQ Base",
      coordinates: { lat: 37.7833, lng: -122.4167 }
    }
  ],

  // Work Orders (Full Lifecycle)
  workOrders: [
    {
      id: "WO-8401",
      title: "Carrier 50-Ton Rooftop Chiller - High Pressure Cutoff",
      customer: "Apex Commercial Towers",
      contactName: "David Sterling (Facilities Director)",
      address: "450 Mission St, 12th Floor, San Francisco, CA",
      priority: "Emergency",
      priorityClass: "prio-emergency",
      status: "On Site",
      statusClass: "status-onsite",
      techId: "tech-1",
      techName: "Marcus Vance",
      category: "HVAC & Thermal",
      scheduledSlot: "10:00 AM - 1:00 PM",
      assetId: "AST-501",
      assetName: "Carrier 50-Ton Rooftop Chiller",
      quoteAmount: 1450.00,
      description: "Compressor stage 2 tripping high-pressure alarm. Rooftop ambient temperature 88°F. Client reports server room temperature rising.",
      timeline: [
        { time: "09:15 AM", event: "Work order created via BACnet BMS integration alarm" },
        { time: "09:30 AM", event: "Dispatched to Marcus Vance based on proximity & EPA Universal cert" },
        { time: "10:05 AM", event: "GPS verified check-in at 450 Mission St (Van #402)" },
        { time: "10:20 AM", event: "Diagnostic performed: Condenser fan motor #2 capacitor blown" }
      ],
      photos: [
        { title: "Before Repair", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80" },
        { title: "Part Replacement", url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=500&auto=format&fit=crop&q=80" }
      ]
    },
    {
      id: "WO-8402",
      title: "Primary 480V Transformer Panel Thermographic Scan",
      customer: "Pacific BioPharma Labs",
      contactName: "Dr. Evelyn Ward",
      address: "1200 Owens Blvd, South San Francisco, CA",
      priority: "High",
      priorityClass: "prio-high",
      status: "In Route",
      statusClass: "status-route",
      techId: "tech-2",
      techName: "Sarah Chen",
      category: "Electrical Systems",
      scheduledSlot: "11:30 AM - 2:30 PM",
      assetId: "AST-502",
      assetName: "Square D 480V Distribution Board",
      quoteAmount: 890.00,
      description: "Annual NFPA 70B infrared thermal imaging of all switchgear, busway connectors, and 1200A main circuit breaker.",
      timeline: [
        { time: "08:45 AM", event: "Scheduled preventive maintenance order verified" },
        { time: "11:00 AM", event: "En route - Sarah Chen departing North Bay Depot" }
      ],
      photos: []
    },
    {
      id: "WO-8403",
      title: "Cooling Tower Closed-Loop Booster Pump Replacement",
      customer: "Bayview Medical Center",
      contactName: "Arthur King (Chief Engineer)",
      address: "890 Port Way, Oakland, CA",
      priority: "Medium",
      priorityClass: "prio-medium",
      status: "Completed",
      statusClass: "status-done",
      techId: "tech-3",
      techName: "Liam Patel",
      category: "Plumbing & Hydraulics",
      scheduledSlot: "8:00 AM - 11:00 AM",
      assetId: "AST-503",
      assetName: "Grundfos CRN-32 Vertical Multistage Pump",
      quoteAmount: 2180.00,
      description: "Replaced mechanical seal and bearing assembly on primary booster loop. Pressure tested to 145 PSI with zero leaks.",
      timeline: [
        { time: "07:30 AM", event: "Job dispatched to Liam Patel" },
        { time: "08:00 AM", event: "GPS check-in verified at Bayview Medical" },
        { time: "10:15 AM", event: "Mechanical seal installed & hydrostatic test passed" },
        { time: "10:55 AM", event: "Customer sign-off captured. Invoice #INV-3021 generated." }
      ],
      photos: []
    },
    {
      id: "WO-8404",
      title: "Variable Frequency Drive (VFD) Calibration & Harmonic Filter",
      customer: "Apex Logistics Depot",
      contactName: "Ray Kowalski",
      address: "300 Industrial Pkwy, Hayward, CA",
      priority: "Normal",
      priorityClass: "prio-normal",
      status: "Scheduled",
      statusClass: "status-sched",
      techId: "tech-4",
      techName: "Elena Rostova",
      category: "Automation & Controls",
      scheduledSlot: "3:00 PM - 5:30 PM",
      assetId: "AST-504",
      assetName: "ABB ACS880 Industrial Drive",
      quoteAmount: 640.00,
      description: "Routine firmware update and harmonic frequency balancing for conveyor belt 4.",
      timeline: [
        { time: "10:00 AM", event: "Order created and assigned to Elena Rostova" }
      ],
      photos: []
    }
  ],

  // Assets & Industrial Equipment
  assets: [
    {
      id: "AST-501",
      name: "Carrier 50-Ton Rooftop Chiller",
      serial: "CAR-2024-904-RTU",
      manufacturer: "Carrier Global",
      location: "Apex Commercial Towers - Roof Level B",
      installDate: "March 15, 2024",
      warranty: "Valid through March 2029",
      lastService: "Today (WO-8401)",
      healthScore: 92,
      criticality: "High",
      specs: {
        refrigerant: "R-410A (45 lbs)",
        voltage: "460V / 3 Phase / 60 Hz",
        coolingCapacity: "600,000 BTU/hr",
        compressorType: "Dual Hermetic Scroll"
      },
      history: [
        { date: "Sep 28, 2026", tech: "Marcus Vance", notes: "Replaced condenser fan capacitor and cleaned coil." },
        { date: "Apr 12, 2026", tech: "Marcus Vance", notes: "Spring seasonal startup and economizer sensor recalibration." },
        { date: "Oct 19, 2025", tech: "Elena Rostova", notes: "Winterization and glycol loop concentration test." }
      ]
    },
    {
      id: "AST-502",
      name: "Square D 480V Distribution Board",
      serial: "SQD-2022-811-MDB",
      manufacturer: "Schneider Electric",
      location: "Pacific BioPharma Labs - Electrical Room 102",
      installDate: "June 20, 2022",
      warranty: "Valid through June 2027",
      lastService: "Today (WO-8402)",
      healthScore: 98,
      criticality: "Critical",
      specs: {
        amperage: "1200A Main Breaker",
        voltage: "480Y/277V 3P 4W",
        interruptRating: "65 kAIR",
        enclosure: "NEMA 1 Indoor"
      },
      history: [
        { date: "Sep 28, 2026", tech: "Sarah Chen", notes: "Thermal infrared scan in progress." },
        { date: "Sep 15, 2025", tech: "Sarah Chen", notes: "Annual torque check on all busbar connections." }
      ]
    },
    {
      id: "AST-503",
      name: "Grundfos CRN-32 Booster Pump",
      serial: "GRN-2023-441-PMP",
      manufacturer: "Grundfos",
      location: "Bayview Medical Center - Mechanical Basement",
      installDate: "November 10, 2023",
      warranty: "Valid through November 2028",
      lastService: "Today (WO-8403)",
      healthScore: 99,
      criticality: "Life Safety Support",
      specs: {
        flowRate: "160 GPM",
        headPressure: "240 ft",
        motorPower: "15 HP TEFC",
        liquid: "Chilled Water / 30% Propylene Glycol"
      },
      history: [
        { date: "Sep 28, 2026", tech: "Liam Patel", notes: "Replaced mechanical seal and bearing assembly." }
      ]
    },
    {
      id: "AST-504",
      name: "ABB ACS880 Industrial Drive",
      serial: "ABB-2025-102-VFD",
      manufacturer: "ABB",
      location: "Apex Logistics Depot - Conveyor Hub",
      installDate: "January 14, 2025",
      warranty: "Valid through January 2030",
      lastService: "Scheduled Today",
      healthScore: 96,
      criticality: "Medium",
      specs: {
        ratedCurrent: "65A",
        power: "45 kW",
        communication: "Modbus TCP / EtherNet/IP",
        cooling: "Forced Air"
      },
      history: [
        { date: "Jul 10, 2026", tech: "Elena Rostova", notes: "Firmware v3.2 update and parameter backup." }
      ]
    }
  ],

  // Invoices & Stripe Payment Data
  invoices: [
    {
      id: "INV-3021",
      workOrderId: "WO-8403",
      customer: "Bayview Medical Center",
      billingContact: "accounts@bayviewmed.org",
      date: "Sep 28, 2026",
      dueDate: "Net 30 (Oct 28, 2026)",
      status: "Paid",
      statusClass: "inv-paid",
      stripeChargeId: "ch_3N8F91QuolyTechStripeLive",
      items: [
        { desc: "Grundfos Mechanical Cartridge Seal Kit (Silicon Carbide)", qty: 1, rate: 480.00, amount: 480.00 },
        { desc: "High-Temperature Bearing Set & Gaskets", qty: 1, rate: 220.00, amount: 220.00 },
        { desc: "Master Plumber Field Labor (3 Hours @ $420/hr)", qty: 3, rate: 420.00, amount: 1260.00 },
        { desc: "Emergency Hydrostatic Pressure Certification & Clean-up", qty: 1, rate: 220.00, amount: 220.00 }
      ],
      subtotal: 2180.00,
      tax: 0.00, // Non-profit hospital exemption
      total: 2180.00
    },
    {
      id: "INV-3020",
      workOrderId: "WO-8401",
      customer: "Apex Commercial Towers",
      billingContact: "payables@apextowers.com",
      date: "Sep 28, 2026",
      dueDate: "Due Upon Completion",
      status: "Pending",
      statusClass: "inv-pending",
      stripeChargeId: null,
      items: [
        { desc: "Dual Run Capacitor 70/10 MFD 440V", qty: 1, rate: 150.00, amount: 150.00 },
        { desc: "Condenser Fan Motor Ball Bearing Assembly", qty: 1, rate: 350.00, amount: 350.00 },
        { desc: "Senior HVAC Diagnostic & Field Labor (2.5 Hours)", qty: 2.5, rate: 380.00, amount: 950.00 }
      ],
      subtotal: 1450.00,
      tax: 123.25,
      total: 1573.25
    },
    {
      id: "INV-3019",
      workOrderId: "WO-8402",
      customer: "Pacific BioPharma Labs",
      billingContact: "finance@pacificbio.com",
      date: "Sep 28, 2026",
      dueDate: "Net 15",
      status: "Draft",
      statusClass: "inv-draft",
      stripeChargeId: null,
      items: [
        { desc: "NFPA 70B Infrared Thermographic Scan & Report", qty: 1, rate: 890.00, amount: 890.00 }
      ],
      subtotal: 890.00,
      tax: 75.65,
      total: 965.65
    }
  ],

  // Real-time Audit Trail (Enterprise Governance)
  auditLog: [
    {
      id: "log-1",
      time: "10:20:14 AM",
      actor: "Marcus Vance (Tech)",
      action: "GPS Check-In Verified",
      details: "Geofence radius 100m validated at 450 Mission St. Telemetry logged.",
      type: "gps"
    },
    {
      id: "log-2",
      time: "10:05:30 AM",
      actor: "System Dispatcher AI",
      action: "Route Optimized",
      details: "WO-8401 assigned to Van #402. Estimated fuel savings: 14%.",
      type: "dispatch"
    },
    {
      id: "log-3",
      time: "09:45:12 AM",
      actor: "Liam Patel (Tech)",
      action: "Customer Signature Acquired",
      details: "Arthur King signed digital proof of work for WO-8403.",
      type: "signature"
    },
    {
      id: "log-4",
      time: "09:46:00 AM",
      actor: "Stripe Webhook",
      action: "Payment Settled ($2,180.00)",
      details: "Invoice #INV-3021 marked paid via Visa ending in 4242.",
      type: "payment"
    },
    {
      id: "log-5",
      time: "08:30:22 AM",
      actor: "Elena Vance (Operations Manager)",
      action: "Work Order WO-8404 Created",
      details: "Preventive maintenance scheduled for ABB ACS880 VFD Controller.",
      type: "order"
    }
  ],

  // Scheduling Slots for Drag and Drop Board
  scheduleSlots: [
    "08:00 AM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM"
  ]
};
