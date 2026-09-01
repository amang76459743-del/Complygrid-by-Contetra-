/* ==========================================================================
   COMPLYGRID by Contetra - Core Application Logic
   ========================================================================== */

(function () {
  'use strict';

  // --- Initial Data Structures ---
  const INITIAL_MEMBERS = [
    { id: 'usr-1', name: 'System Admin', email: 'admin@compliance.in', role: 'admin', status: 'ACTIVE', added: '20 Aug 2026' },
    { id: 'usr-2', name: 'Priya Menon', email: 'manager@compliance.in', role: 'manager', status: 'ACTIVE', added: '20 Aug 2026' },
    { id: 'usr-3', name: 'Anita Desai', email: 'reviewer@compliance.in', role: 'reviewer', status: 'ACTIVE', added: '20 Aug 2026' },
    { id: 'usr-4', name: 'Rahul Iyer', email: 'preparer@compliance.in', role: 'preparer', status: 'ACTIVE', added: '20 Aug 2026' }
  ];

  const INITIAL_COMPLIANCES = [
    // Statutory Compliances
    { id: 'cmp-1', title: 'GSTR-3B (Monthly Summary Return & Payment)', code: 'GSTR-3B', type: 'STATUTORY', category: 'GST', authority: 'GST Dept', form: 'GSTR-3B', frequency: 'Monthly', dueDay: 20, dueMonths: ['Every month'], prepLead: 10, reviewLead: 5, applicable: true },
    { id: 'cmp-2', title: 'GSTR-1 (Outward Supplies Return)', code: 'GSTR-1', type: 'STATUTORY', category: 'GST', authority: 'GST Dept', form: 'GSTR-1', frequency: 'Monthly', dueDay: 11, dueMonths: ['Every month'], prepLead: 7, reviewLead: 3, applicable: true },
    { id: 'cmp-3', title: 'GST PMT-06 (QRMP Monthly Tax Payment)', code: 'GST-PMT06', type: 'STATUTORY', category: 'GST', authority: 'GST Dept', form: 'PMT-06', frequency: 'Monthly', dueDay: 25, dueMonths: ['Every month'], prepLead: 5, reviewLead: 2, applicable: true },
    { id: 'cmp-4', title: 'GSTR-7 (TDS under GST Return)', code: 'GSTR-7', type: 'STATUTORY', category: 'GST', authority: 'GST Dept', form: 'GSTR-7', frequency: 'Monthly', dueDay: 10, dueMonths: ['Every month'], prepLead: 6, reviewLead: 3, applicable: true },
    { id: 'cmp-5', title: 'GSTR-8 (E-Commerce Operator Return)', code: 'GSTR-8', type: 'STATUTORY', category: 'GST', authority: 'GST Dept', form: 'GSTR-8', frequency: 'Monthly', dueDay: 10, dueMonths: ['Every month'], prepLead: 6, reviewLead: 3, applicable: true },
    { id: 'cmp-6', title: 'TDS/TCS Monthly Payment (Challan 281)', code: 'TDS-PAY', type: 'STATUTORY', category: 'TDS/TCS', authority: 'Income Tax', form: 'ITNS 281', frequency: 'Monthly', dueDay: 7, dueMonths: ['Every month'], prepLead: 4, reviewLead: 2, applicable: true },
    { id: 'cmp-7', title: 'Form 16A Issue (Non-Salary TDS Certificate)', code: 'FORM-16A', type: 'STATUTORY', category: 'TDS/TCS', authority: 'Income Tax', form: 'Form 16A', frequency: 'Quarterly', dueDay: 15, dueMonths: ['May', 'Aug', 'Nov', 'Feb'], prepLead: 12, reviewLead: 5, applicable: true },
    { id: 'cmp-8', title: 'Form 26QB (TDS on Property Purchase)', code: 'FORM-26QB', type: 'STATUTORY', category: 'TDS/TCS', authority: 'Income Tax', form: 'Form 26QB', frequency: 'Monthly', dueDay: 30, dueMonths: ['Every month'], prepLead: 8, reviewLead: 3, applicable: true },
    { id: 'cmp-9', title: 'Form 15CA/15CB (Foreign Remittance Declaration)', code: 'FORM-15CA', type: 'STATUTORY', category: 'TDS/TCS', authority: 'Income Tax', form: 'Form 15CA', frequency: 'Monthly', dueDay: 7, dueMonths: ['Every month'], prepLead: 5, reviewLead: 2, applicable: true },
    { id: 'cmp-10', title: 'EPF Monthly Payment & ECR Filing', code: 'PF-ECR', type: 'STATUTORY', category: 'PF/ESI', authority: 'EPFO', form: 'ECR', frequency: 'Monthly', dueDay: 15, dueMonths: ['Every month'], prepLead: 7, reviewLead: 3, applicable: true },
    { id: 'cmp-11', title: 'ESI Monthly Contribution', code: 'ESI-PAY', type: 'STATUTORY', category: 'PF/ESI', authority: 'ESIC', form: 'ESI Challan', frequency: 'Monthly', dueDay: 15, dueMonths: ['Every month'], prepLead: 7, reviewLead: 3, applicable: true },
    { id: 'cmp-12', title: 'Professional Tax Monthly Payment', code: 'PT-PAY', type: 'STATUTORY', category: 'Labour', authority: 'State Govt', form: 'PT Return', frequency: 'Monthly', dueDay: 20, dueMonths: ['Every month'], prepLead: 5, reviewLead: 2, applicable: true },
    { id: 'cmp-13', title: 'Invoice Furnishing Facility (IFF)', code: 'IFF', type: 'STATUTORY', category: 'GST', authority: 'GST Dept', form: 'IFF', frequency: 'Monthly', dueDay: 13, dueMonths: ['Every month'], prepLead: 6, reviewLead: 2, applicable: true },
    { id: 'cmp-14', title: 'GSTR-5 (Non-Resident Taxable Person)', code: 'GSTR-5', type: 'STATUTORY', category: 'GST', authority: 'GST Dept', form: 'GSTR-5', frequency: 'Monthly', dueDay: 13, dueMonths: ['Every month'], prepLead: 6, reviewLead: 2, applicable: true },

    // Business & Reporting Compliances
    { id: 'cmp-15', title: 'Annual Budget & Forecast Preparation', code: 'BUDGET-ANNUAL', type: 'BUSINESS', category: 'Finance/MIS', authority: 'Management', form: 'Budget', frequency: 'Annual', dueDay: 15, dueMonths: ['Mar'], prepLead: 25, reviewLead: 10, applicable: true },
    { id: 'cmp-16', title: 'Asset Insurance Renewal', code: 'INSURANCE-RENEWAL', type: 'BUSINESS', category: 'Finance/MIS', authority: 'Finance Controller', form: 'Renewal', frequency: 'Annual', dueDay: 31, dueMonths: ['Mar'], prepLead: 20, reviewLead: 7, applicable: true },
    { id: 'cmp-17', title: 'Bank & Vendor Reconciliation', code: 'FIN-BANK-REC', type: 'BUSINESS', category: 'Finance/MIS', authority: 'Finance Controller', form: 'Recon', frequency: 'Monthly', dueDay: 8, dueMonths: ['Every month'], prepLead: 4, reviewLead: 2, applicable: true },
    { id: 'cmp-18', title: 'Internal Audit Report & Action Closure', code: 'IA-REPORT', type: 'BUSINESS', category: 'Finance/MIS', authority: 'Audit Committee', form: 'IA Report', frequency: 'Quarterly', dueDay: 20, dueMonths: ['Jan', 'Apr', 'Jul', 'Oct'], prepLead: 15, reviewLead: 7, applicable: true },
    { id: 'cmp-19', title: 'Management MIS Pack (P&L, Cash Flow, Ratios)', code: 'MIS-MONTHLY', type: 'BUSINESS', category: 'Finance/MIS', authority: 'Management', form: 'MIS', frequency: 'Monthly', dueDay: 10, dueMonths: ['Every month'], prepLead: 5, reviewLead: 2, applicable: true },
    { id: 'cmp-20', title: 'Daily Sales & Collection Report', code: 'SALES-DAILY', type: 'BUSINESS', category: 'Sales', authority: 'Sales Head', form: 'MIS', frequency: 'Monthly', dueDay: 1, dueMonths: ['Every month'], prepLead: 2, reviewLead: 1, applicable: true },
    { id: 'cmp-21', title: 'Monthly Sales MIS & Target vs Achievement', code: 'SALES-MIS', type: 'BUSINESS', category: 'Sales', authority: 'Sales Head', form: 'MIS', frequency: 'Monthly', dueDay: 5, dueMonths: ['Every month'], prepLead: 3, reviewLead: 1, applicable: true },
    { id: 'cmp-22', title: 'Headcount, Attrition & Hiring MIS', code: 'HR-HEADCOUNT', type: 'BUSINESS', category: 'HR', authority: 'HR Head', form: 'HR MIS', frequency: 'Monthly', dueDay: 5, dueMonths: ['Every month'], prepLead: 3, reviewLead: 1, applicable: true },
    { id: 'cmp-23', title: 'Monthly Payroll Processing & Sign-off', code: 'HR-PAYROLL', type: 'BUSINESS', category: 'HR', authority: 'Finance & HR', form: 'Payroll', frequency: 'Monthly', dueDay: 25, dueMonths: ['Every month'], prepLead: 5, reviewLead: 2, applicable: true },
    { id: 'cmp-24', title: 'HR Full & Final (FNF) Settlement Reviews', code: 'HR-FNF', type: 'BUSINESS', category: 'HR', authority: 'HR Head', form: 'FNF', frequency: 'Monthly', dueDay: 10, dueMonths: ['Every month'], prepLead: 4, reviewLead: 2, applicable: true },
    { id: 'cmp-25', title: 'Production / Service Delivery Report', code: 'OPS-PROD', type: 'BUSINESS', category: 'Operations', authority: 'Ops Head', form: 'Ops MIS', frequency: 'Monthly', dueDay: 5, dueMonths: ['Every month'], prepLead: 3, reviewLead: 1, applicable: true },
    { id: 'cmp-26', title: 'Preventive Maintenance Schedule Closure', code: 'OPS-MAINT', type: 'BUSINESS', category: 'Operations', authority: 'Plant Manager', form: 'Maint Log', frequency: 'Monthly', dueDay: 28, dueMonths: ['Every month'], prepLead: 4, reviewLead: 2, applicable: true },
    { id: 'cmp-27', title: 'Data Backup & Restore Test', code: 'IT-BACKUP', type: 'BUSINESS', category: 'IT & Admin', authority: 'IT Head', form: 'Audit Log', frequency: 'Monthly', dueDay: 5, dueMonths: ['Every month'], prepLead: 3, reviewLead: 1, applicable: true },
    { id: 'cmp-28', title: 'AMC / Software Licence Renewal Tracker', code: 'IT-AMC', type: 'BUSINESS', category: 'IT & Admin', authority: 'IT Head', form: 'Tracker', frequency: 'Monthly', dueDay: 20, dueMonths: ['Every month'], prepLead: 5, reviewLead: 2, applicable: true },
    { id: 'cmp-29', title: 'Customer Contract & Renewal Tracker', code: 'SALES-CONTRACT', type: 'BUSINESS', category: 'Sales', authority: 'Legal & Sales', form: 'Tracker', frequency: 'Monthly', dueDay: 25, dueMonths: ['Every month'], prepLead: 5, reviewLead: 2, applicable: true }
  ];

  // Initial Notices Dataset
  const INITIAL_NOTICES = [
    {
      refNo: 'ITN-2026-88412',
      dept: 'Income Tax (Sec 143(1))',
      subject: 'Intimation of Tax Demand for AY 2025-26',
      issueDate: '10 Aug 2026',
      dueDate: '09 Sep 2026',
      status: 'DRAFTING REPLY',
      statusClass: 'status-review',
      counsel: 'Anita Desai',
      link: 'https://drive.google.com/file/d/notice-itn-88412'
    },
    {
      refNo: 'GST-DRC-01-992',
      dept: 'GST Dept (State Tax)',
      subject: 'ITC Mismatch GSTR-2A vs 3B (FY 2024-25)',
      issueDate: '01 Aug 2026',
      dueDate: '31 Aug 2026',
      status: 'HEARING SCHEDULED',
      statusClass: 'status-docs',
      counsel: 'Priya Menon',
      link: 'https://drive.google.com/file/d/notice-drc01-992'
    },
    {
      refNo: 'EPFO-INSP-2026',
      dept: 'EPFO Regional Office',
      subject: 'Inspection Notice — ECR Wage Discrepancy',
      issueDate: '15 Aug 2026',
      dueDate: '15 Sep 2026',
      status: 'PENDING REVIEW',
      statusClass: 'status-pending',
      counsel: 'Vikram Sharma',
      link: 'https://drive.google.com/file/d/notice-epfo-2026'
    }
  ];

  // Global State
  const state = {
    entities: [
      { id: 'ent-1', name: 'ANDRITZ Hydro Pvt Ltd (India HQ)' },
      { id: 'ent-2', name: 'ANDRITZ Technologies & Systems Pvt Ltd' },
      { id: 'ent-3', name: 'ANDRITZ Separation & Metals India Pvt Ltd' }
    ],
    members: [...INITIAL_MEMBERS],
    compliances: [...INITIAL_COMPLIANCES],
    notices: [...INITIAL_NOTICES],
    tasks: [],
    activityLogs: [
      { id: 'act-1', text: '<strong>System Admin</strong> updated task — <em>Daily Sales & Collection Report</em>', time: '28 AUG AT 05:06 PM' },
      { id: 'act-2', text: '<strong>System Admin</strong> generated calendar — <em>2026-08 to 2027-03</em>', time: '28 AUG AT 04:51 PM' },
      { id: 'act-3', text: '<strong>Anita Desai</strong> marked task DOCS READY — <em>GSTR-1</em>', time: '27 AUG AT 02:15 PM' },
      { id: 'act-4', text: '<strong>Priya Menon</strong> approved filing — <em>TDS/TCS Monthly Payment</em>', time: '25 AUG AT 11:30 AM' }
    ],
    currentView: 'compliances', // default active view
    calendarYear: 2026,
    calendarMonth: 7, // 0-indexed: August 2026
    selectedTaskId: null,
    drawerStatusSelected: 'PENDING',
    filters: {
      workType: 'ALL',
      scope: 'ALL',
      category: 'ALL',
      status: 'ALL',
      search: ''
    }
  };

  // Helper Functions
  function formatDate(d) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function formatDateTime(d) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} at ${hours}:${minutes} ${ampm}`;
  }

  function getDaysDiff(d1, d2) {
    const diffTime = d1.getTime() - d2.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function showToast(message, type = 'normal') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function addAuditLog(text) {
    const now = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeStr = `${now.getDate()} ${months[now.getMonth()]} AT ${hours}:${minutes} ${ampm}`;
    
    state.activityLogs.unshift({
      id: 'act-' + Date.now(),
      text: text,
      time: timeStr
    });
    renderDashboard();
  }

  // --- Calendar Generator Logic ---
  function generateCalendarTasks(fromYYYYMM, toYYYYMM) {
    const [fromY, fromM] = fromYYYYMM.split('-').map(Number);
    const [toY, toM] = toYYYYMM.split('-').map(Number);

    const generatedTasks = [];
    const simulatedCurrentDate = new Date(2026, 7, 29); // 29 Aug 2026 as shown in system

    let taskIdCounter = 1;

    for (let y = fromY; y <= toY; y++) {
      const startM = (y === fromY) ? fromM : 1;
      const endM = (y === toY) ? toM : 12;

      for (let m = startM; m <= endM; m++) {
        const monthIndex = m - 1; // 0-11
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const periodStr = `${monthNames[monthIndex]} ${y}`;

        state.compliances.forEach(master => {
          if (!master.applicable) return;

          // Check frequency trigger
          let trigger = false;
          if (master.frequency === 'Monthly') trigger = true;
          else if (master.frequency === 'Annual' && (m === 3 || master.dueMonths.includes(monthNames[monthIndex]))) trigger = true;
          else if (master.frequency === 'Quarterly' && (m === 1 || m === 4 || m === 7 || m === 10 || master.dueMonths.includes(monthNames[monthIndex]))) trigger = true;

          if (trigger) {
            // Calculate Due Date
            const maxDaysInMonth = new Date(y, m, 0).getDate();
            const actualDueDay = Math.min(master.dueDay, maxDaysInMonth);
            const dueDateObj = new Date(y, monthIndex, actualDueDay, 23, 59, 59);

            // Calculate Target Lead Dates
            const docsReadyTargetObj = new Date(dueDateObj.getTime() - (master.prepLead * 24 * 60 * 60 * 1000));
            docsReadyTargetObj.setHours(23, 30, 0);

            const reviewTargetObj = new Date(dueDateObj.getTime() - (master.reviewLead * 24 * 60 * 60 * 1000));
            reviewTargetObj.setHours(23, 30, 0);

            // Health & Initial Status Simulation matching sample screenshots
            let status = 'PENDING';
            let health = 'ON TRACK';
            let docsReadyAt = null;
            let reviewedAt = null;
            let filedAt = null;
            let preparerId = null;
            let reviewerId = null;
            let delayOwner = null;
            let remarks = '';
            let delayReason = '';
            let workingFileLink = '';

            const daysDiff = getDaysDiff(dueDateObj, simulatedCurrentDate);

            // Simulate realistic compliance state matching screenshots
            if (daysDiff < 0) {
              // Past due date
              if (taskIdCounter % 7 === 0) {
                status = 'FILED';
                health = 'FILED LATE';
                preparerId = 'usr-4'; // Anita / Rahul
                reviewerId = 'usr-3';
                docsReadyAt = formatDateTime(new Date(dueDateObj.getTime() - (2 * 24 * 60 * 60 * 1000)));
                reviewedAt = formatDateTime(new Date(dueDateObj.getTime() + (1 * 24 * 60 * 60 * 1000)));
                filedAt = formatDateTime(new Date(dueDateObj.getTime() + (2 * 24 * 60 * 60 * 1000)));
                remarks = 'Filed with late fee payment details attached.';
                workingFileLink = 'https://drive.google.com/file/d/sample-acknowledgement/view';
              } else if (taskIdCounter % 4 === 0) {
                status = 'IN REVIEW';
                health = 'OVERDUE';
                preparerId = 'usr-1';
                reviewerId = null;
                delayOwner = 'System Admin';
                remarks = 'Draft documents ready and uploaded for manager sign-off.';
                workingFileLink = 'https://docs.google.com/spreadsheets/d/working-draft-v2/edit';
              } else {
                status = 'PENDING';
                health = 'OVERDUE';
                preparerId = null;
                reviewerId = null;
                delayOwner = 'Unassigned (Prep)';
              }
            } else if (daysDiff <= 7) {
              status = 'PENDING';
              health = 'DUE SOON';
              preparerId = taskIdCounter % 2 === 0 ? 'usr-4' : null;
              delayOwner = preparerId ? 'Rahul Iyer' : 'Unassigned (Prep)';
            }

            // Special override for "Daily Sales & Collection Report" matching drawer screenshot
            if (master.code === 'SALES-DAILY' && y === 2026 && m === 5) {
              status = 'IN REVIEW';
              health = 'OVERDUE';
              preparerId = 'usr-1';
              reviewerId = null;
              docsReadyAt = '28 Aug at 04:51 PM';
              reviewedAt = '28 Aug at 04:51 PM';
              filedAt = '28 Aug at 04:51 PM';
              delayOwner = 'System Admin';
              remarks = 'Reviewed by finance lead. Awaiting final signoff.';
              workingFileLink = 'https://sharepoint.com/contetra/daily-sales-apr2026.xlsx';
            }

            generatedTasks.push({
              id: 'tsk-' + taskIdCounter++,
              complianceId: master.id,
              title: master.title,
              code: master.code,
              category: master.category,
              type: master.type,
              period: periodStr,
              dueDateObj: dueDateObj,
              dueDateStr: formatDate(dueDateObj),
              docsReadyTargetStr: formatDateTime(docsReadyTargetObj),
              reviewTargetStr: formatDateTime(reviewTargetObj),
              docsReadyAt: docsReadyAt,
              reviewedAt: reviewedAt,
              filedAt: filedAt,
              status: status,
              health: health,
              preparerId: preparerId,
              reviewerId: reviewerId,
              delayOwner: delayOwner,
              remarks: remarks,
              delayReason: delayReason,
              workingFileLink: workingFileLink
            });
          }
        });
      }
    }

    state.tasks = generatedTasks;
    addAuditLog(`<strong>System Admin</strong> generated calendar — <em>${fromYYYYMM} to ${toYYYYMM}</em>`);
    renderAllViews();
  }

  // Enable Seamless 2-Finger Trackpad Swiping & Mouse Drag-to-Scroll
  function enableTableDragScroll() {
    document.querySelectorAll('.table-container').forEach(container => {
      let isDown = false;
      let startX;
      let scrollLeft;

      // Trackpad Wheel / Gesture Handling
      container.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          // Native 2-finger horizontal swipe on Mac trackpad - let browser handle with native inertia
          return;
        } else if (e.shiftKey) {
          // Shift + Scroll wheel translates to horizontal scroll
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }, { passive: true });

      // Mouse Drag-to-Scroll (for non-trackpad users)
      container.addEventListener('mousedown', (e) => {
        if (['BUTTON', 'INPUT', 'SELECT', 'A', 'LABEL'].includes(e.target.tagName)) return;
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'default';
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'default';
      });

      container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        // Only prevent default when actively dragging mouse
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        if (Math.abs(walk) > 5) {
          container.style.cursor = 'grabbing';
          container.scrollLeft = scrollLeft - walk;
        }
      });
    });
  }

  // --- View Switcher ---
  function switchView(viewName) {
    state.currentView = viewName;
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-view') === viewName);
    });
    document.querySelectorAll('.page-view').forEach(page => {
      page.classList.toggle('active', page.id === `view-${viewName}`);
    });

    renderAllViews();
  }

  function renderAllViews() {
    // Always pre-populate Organizations & Notices tables
    renderOrgsView();
    renderNoticesView();

    if (state.currentView === 'compliances') renderCompliancesView();
    else if (state.currentView === 'tasks') renderTasksView();
    else if (state.currentView === 'calendar') renderCalendarView();
    else if (state.currentView === 'tat') renderTATView();
    else if (state.currentView === 'team') renderTeamView();
    else if (state.currentView === 'dashboard') renderDashboard();
    else if (state.currentView === 'orgs') renderOrgsView();
    else if (state.currentView === 'notices') renderNoticesView();

    enableTableDragScroll();
  }

  // --- 1. Compliances & Settings View Renderer ---
  function renderCompliancesView() {
    const tbody = document.getElementById('compliances-table-body');
    if (!tbody) return;

    const masterSearch = state.filters.masterSearch ? state.filters.masterSearch.toLowerCase() : '';

    const filtered = state.compliances.filter(item => {
      if (state.filters.workType === 'STATUTORY' && item.type !== 'STATUTORY') return false;
      if (state.filters.workType === 'BUSINESS' && item.type !== 'BUSINESS') return false;
      if (state.filters.category !== 'ALL' && item.category !== state.filters.category) return false;
      if (masterSearch) {
        const q = masterSearch;
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchCode = item.code.toLowerCase().includes(q);
        const matchForm = item.form.toLowerCase().includes(q);
        const matchAuth = item.authority.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        if (!matchTitle && !matchCode && !matchForm && !matchAuth && !matchCat) return false;
      }
      return true;
    });

    let html = '';
    filtered.forEach(item => {
      html += `
        <tr class="clickable-row master-cmp-row" data-id="${item.id}">
          <td onclick="event.stopPropagation()" style="text-align: center;">
            <input type="checkbox" class="custom-checkbox cmp-toggle" data-id="${item.id}" ${item.applicable ? 'checked' : ''}>
          </td>
          <td>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 13px;">${item.title}</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${item.form} &bull; ${item.authority}</div>
          </td>
          <td><span class="type-pill">${item.type}</span></td>
          <td style="font-weight: 600; color: var(--text-secondary);">${item.category}</td>
          <td style="color: var(--text-secondary);">${item.authority}</td>
          <td><strong style="color: var(--brand-navy);">${item.form}</strong></td>
          <td style="color: var(--text-secondary);">${item.frequency}</td>
          <td><strong style="color: var(--brand-navy);">${item.dueDay}</strong></td>
          <td style="color: var(--text-secondary);">${Array.isArray(item.dueMonths) ? item.dueMonths.join(', ') : item.dueMonths}</td>
          <td><span class="code-chip">${item.prepLead}d</span></td>
          <td><span class="code-chip">${item.reviewLead}d</span></td>
          <td onclick="event.stopPropagation()">
            <button class="btn btn-outline" style="padding: 4px 10px; font-size: 10px; font-weight: 700;" onclick="event.stopPropagation(); openMasterEditModal('${item.id}')">✏️ Edit</button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

    const applicableCount = state.compliances.filter(c => c.applicable).length;
    const badge = document.getElementById('compliances-count-badge');
    if (badge) badge.innerText = `${applicableCount} OF ${state.compliances.length} MARKED APPLICABLE`;

    // Master Toggle All Checkbox
    const toggleAllChk = document.getElementById('master-toggle-all');
    if (toggleAllChk) {
      toggleAllChk.checked = filtered.every(c => c.applicable);
      toggleAllChk.onchange = (e) => {
        const isChecked = e.target.checked;
        filtered.forEach(c => { c.applicable = isChecked; });
        showToast(`${isChecked ? 'Enabled' : 'Disabled'} applicability for ${filtered.length} compliance rules`, 'success');
        const fromVal = document.getElementById('gen-from-date')?.value || '2026-08';
        const toVal = document.getElementById('gen-to-date')?.value || '2027-03';
        generateCalendarTasks(fromVal, toVal);
        renderCompliancesView();
      };
    }

    // Applicability Checkbox Toggle
    document.querySelectorAll('.cmp-toggle').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const comp = state.compliances.find(c => c.id === id);
        if (comp) {
          comp.applicable = e.target.checked;
          showToast(`Updated applicability for "${comp.code}"`, 'success');
          const fromVal = document.getElementById('gen-from-date')?.value || '2026-08';
          const toVal = document.getElementById('gen-to-date')?.value || '2027-03';
          generateCalendarTasks(fromVal, toVal);
        }
      });
    });

    // Row Click Opens Master Compliance Edit Modal
    document.querySelectorAll('.master-cmp-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        openMasterEditModal(id);
      });
    });
  }

  function openMasterEditModal(compMasterId = null) {
    const modal = document.getElementById('modal-edit-master-compliance');
    if (!modal) return;

    const deleteBtn = document.getElementById('btn-delete-master-rule');
    const heading = document.getElementById('master-modal-heading');

    if (compMasterId) {
      const comp = state.compliances.find(c => c.id === compMasterId);
      if (!comp) return;

      heading.innerText = `Edit Master Settings: ${comp.code}`;
      document.getElementById('master-edit-id').value = comp.id;
      document.getElementById('master-edit-title').value = comp.title;
      document.getElementById('master-edit-code').value = comp.code;
      document.getElementById('master-edit-type').value = comp.type;
      document.getElementById('master-edit-category').value = comp.category;
      document.getElementById('master-edit-authority').value = comp.authority;
      document.getElementById('master-edit-frequency').value = comp.frequency;
      document.getElementById('master-edit-dueday').value = comp.dueDay;
      document.getElementById('master-edit-months').value = Array.isArray(comp.dueMonths) ? comp.dueMonths.join(', ') : comp.dueMonths;
      document.getElementById('master-edit-preplead').value = comp.prepLead;
      document.getElementById('master-edit-reviewlead').value = comp.reviewLead;
      document.getElementById('master-edit-applicable').checked = comp.applicable;

      if (deleteBtn) deleteBtn.style.display = 'inline-flex';
    } else {
      heading.innerText = 'Add Custom Compliance Rule';
      document.getElementById('master-edit-id').value = '';
      document.getElementById('master-edit-title').value = '';
      document.getElementById('master-edit-code').value = '';
      document.getElementById('master-edit-type').value = 'STATUTORY';
      document.getElementById('master-edit-category').value = 'GST';
      document.getElementById('master-edit-authority').value = '';
      document.getElementById('master-edit-frequency').value = 'Monthly';
      document.getElementById('master-edit-dueday').value = '15';
      document.getElementById('master-edit-months').value = 'Every month';
      document.getElementById('master-edit-preplead').value = '7';
      document.getElementById('master-edit-reviewlead').value = '3';
      document.getElementById('master-edit-applicable').checked = true;

      if (deleteBtn) deleteBtn.style.display = 'none';
    }

    modal.classList.add('open');
  }

  // --- 2. Tasks & Checklist View Renderer ---
  function renderTasksView() {
    const tbody = document.getElementById('tasks-table-body');
    if (!tbody) return;

    let filtered = state.tasks.filter(t => {
      // Work type filter
      if (state.filters.workType === 'STATUTORY' && t.type !== 'STATUTORY') return false;
      if (state.filters.workType === 'BUSINESS' && t.type !== 'BUSINESS') return false;

      // Scope filter
      if (state.filters.scope === 'UPCOMING 30D') {
        const now = new Date(2026, 7, 29);
        const days = getDaysDiff(t.dueDateObj, now);
        if (days < 0 || days > 30) return false;
      } else if (state.filters.scope === 'OVERDUE') {
        if (t.health !== 'OVERDUE') return false;
      } else if (state.filters.scope === 'MY TASKS') {
        if (t.preparerId !== 'usr-1' && t.reviewerId !== 'usr-1') return false;
      }

      // Category filter
      if (state.filters.category !== 'ALL' && t.category !== state.filters.category) return false;

      // Status filter
      if (state.filters.status !== 'ALL' && t.status !== state.filters.status) return false;

      // Search
      if (state.filters.search) {
        const q = state.filters.search.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.code.toLowerCase().includes(q)) return false;
      }

      return true;
    });

    let html = '';
    filtered.forEach(t => {
      const prepUser = state.members.find(m => m.id === t.preparerId);
      const revUser = state.members.find(m => m.id === t.reviewerId);

      let statusClass = 'status-pending';
      if (t.status === 'DOCS READY') statusClass = 'status-docs';
      else if (t.status === 'IN REVIEW') statusClass = 'status-review';
      else if (t.status === 'FILED') statusClass = 'status-filed';

      let healthClass = 'health-ontrack';
      if (t.health === 'OVERDUE') healthClass = 'health-overdue';
      else if (t.health === 'FILED LATE') healthClass = 'health-late';
      else if (t.health === 'DUE SOON') healthClass = 'health-duesoon';

      html += `
        <tr class="clickable-row task-row" data-id="${t.id}">
          <td><input type="checkbox" class="custom-checkbox" onclick="event.stopPropagation()"></td>
          <td>
            <div style="font-weight: 700; color: var(--text-primary); font-size: 13px;">${t.title}</div>
            <div class="code-chip" style="margin-top: 2px;">${t.code} &bull; ${t.category}</div>
          </td>
          <td style="color: var(--text-secondary); font-weight: 600;">${t.category}</td>
          <td style="color: var(--text-secondary);">${t.period}</td>
          <td style="font-size: 11px; color: var(--text-secondary);">${t.docsReadyTargetStr}</td>
          <td style="font-size: 11px; color: var(--text-secondary);">${t.reviewTargetStr}</td>
          <td><strong style="color: var(--brand-navy);">${t.dueDateStr}</strong></td>
          <td><span class="status-badge ${statusClass}">${t.status}</span></td>
          <td><span class="health-badge ${healthClass}">${t.health}</span></td>
          <td style="color: var(--text-secondary); font-weight: 600;">${prepUser ? prepUser.name : '—'}</td>
          <td style="color: var(--text-secondary); font-weight: 600;">${revUser ? revUser.name : '—'}</td>
          <td><span class="${t.delayOwner ? 'delay-warning-text' : ''}">${t.delayOwner || '—'}</span></td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

    const countBadge = document.getElementById('tasks-count-badge');
    if (countBadge) countBadge.innerText = `${filtered.length} TASKS`;

    // Row click opens drawer
    document.querySelectorAll('.task-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        openTaskDrawer(id);
      });
    });
  }

  // Global Helpers for Interactive Calendar View
  window.showDayEventsModal = function(y, m, d) {
    y = parseInt(y, 10);
    m = parseInt(m, 10);
    d = parseInt(d, 10);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const activeOrgName = state.entities.find(e => e.id === (document.getElementById('global-entity-select')?.value || 'ent-1'))?.name || 'ANDRITZ Hydro Pvt Ltd (India HQ)';

    const dayTasks = state.tasks.filter(t => {
      const dt = t.dueDateObj;
      return dt.getFullYear() === y && dt.getMonth() === m && dt.getDate() === d;
    });

    const modalTitle = document.getElementById('day-modal-title');
    const modalSub = document.getElementById('day-modal-subtitle');
    const modalBody = document.getElementById('day-modal-body');
    const modal = document.getElementById('modal-day-tasks');

    if (modalTitle) modalTitle.innerText = `Filings Due on ${d} ${monthNames[m]} ${y}`;
    if (modalSub) modalSub.innerText = `${dayTasks.length} Scheduled Filings for ${activeOrgName}`;

    if (modalBody) {
      if (dayTasks.length === 0) {
        modalBody.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">No statutory or business filings scheduled for this date.</div>`;
      } else {
        modalBody.innerHTML = dayTasks.map(t => {
          let statusClass = 'status-pending';
          if (t.status === 'DOCS READY') statusClass = 'status-docs';
          else if (t.status === 'IN REVIEW') statusClass = 'status-review';
          else if (t.status === 'FILED') statusClass = 'status-filed';

          let healthClass = 'health-ontrack';
          if (t.health === 'OVERDUE') healthClass = 'health-overdue';
          else if (t.health === 'DUE SOON') healthClass = 'health-duesoon';
          else if (t.health === 'FILED LATE') healthClass = 'health-late';

          return `
            <div style="background: #F8FAFC; border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; margin-bottom: 10px; cursor: pointer; display: flex; align-items: center; justify-content: space-between;" onclick="document.getElementById('modal-day-tasks').classList.remove('open'); window.openTaskDrawer('${t.id}')">
              <div>
                <div style="font-weight: 700; color: var(--text-main); font-size: 13px;">${t.title}</div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${t.category} &bull; Period: ${t.period} &bull; Form ${t.code}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="status-badge ${statusClass}">${t.status}</span>
                <span class="health-badge ${healthClass}">${t.health}</span>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    if (modal) modal.classList.add('open');
  };

  window.openAdhocTaskForDate = function(y, m, d) {
    y = parseInt(y, 10);
    m = parseInt(m, 10);
    d = parseInt(d, 10);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${String(d).padStart(2, '0')} ${monthNames[m]} ${y}`;

    const title = prompt(`Add Ad-hoc Statutory / Business Compliance for ${formattedDate}:`, 'Custom Internal Review');
    if (!title || !title.trim()) return;

    const newId = 'task-adhoc-' + (state.tasks.length + 1);
    const dueDateObj = new Date(y, m, d, 23, 59, 59);

    state.tasks.push({
      id: newId,
      code: 'ADHOC',
      type: 'BUSINESS',
      title: title.trim(),
      category: 'Operations',
      authority: 'Internal SLA',
      frequency: 'Ad-hoc',
      period: `${monthNames[m]} ${y}`,
      dueDay: d,
      dueDateObj: dueDateObj,
      dueDateStr: formattedDate,
      docsReadyTargetStr: formattedDate,
      reviewTargetStr: formattedDate,
      status: 'PENDING',
      health: 'DUE SOON',
      preparerId: 'usr-1',
      reviewerId: 'usr-2',
      delayOwner: null,
      remarks: 'Ad-hoc task created from Calendar view'
    });

    showToast(`Added Ad-hoc Task: "${title.trim()}" for ${formattedDate}`, 'success');
    renderCalendarView();
  };

  // --- 3. Compliance Calendar View Renderer ---
  function renderCalendarView() {
    const title = document.getElementById('calendar-month-title');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const shortMonthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    if (title) title.innerText = `${monthNames[state.calendarMonth]} ${state.calendarYear}`;

    // Update center month button text dynamically
    const todayBtn = document.getElementById('btn-today-month');
    if (todayBtn) {
      if (state.calendarYear === 2026 && state.calendarMonth === 7) {
        todayBtn.innerText = 'TODAY';
        todayBtn.classList.add('active-today-btn');
      } else {
        todayBtn.innerText = `${shortMonthNames[state.calendarMonth]} ${state.calendarYear}`;
        todayBtn.classList.remove('active-today-btn');
      }
    }

    const grid = document.getElementById('calendar-days-grid');
    if (!grid) return;

    // Check if tasks exist for active calendar month; if not, generate entries automatically
    const monthIndex = state.calendarMonth;
    const year = state.calendarYear;
    const hasMonthTasks = state.tasks.some(t => t.dueDateObj && t.dueDateObj.getFullYear() === year && t.dueDateObj.getMonth() === monthIndex);
    
    if (!hasMonthTasks) {
      const monthStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
      generateCalendarEntries(monthStr, monthStr);
    }

    // Calculate days in active month
    const firstDay = new Date(state.calendarYear, state.calendarMonth, 1).getDay(); // 0 is Sun
    const adjustedFirstDay = (firstDay + 6) % 7; // Mon = 0
    const totalDays = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();

    let html = '';

    // Leading empty cells
    for (let i = 0; i < adjustedFirstDay; i++) {
      html += `<div class="calendar-cell other-month"></div>`;
    }

    // Days cells
    for (let d = 1; d <= totalDays; d++) {
      const isToday = (state.calendarYear === 2026 && state.calendarMonth === 7 && d === 31);
      const dayTasks = state.tasks.filter(t => {
        const dt = t.dueDateObj;
        return dt && dt.getFullYear() === state.calendarYear && dt.getMonth() === state.calendarMonth && dt.getDate() === d;
      });

      const hasOverdue = dayTasks.some(t => t.health === 'OVERDUE');
      const hasDueSoon = dayTasks.some(t => t.health === 'DUE SOON');

      let dotHtml = '';
      if (hasOverdue) dotHtml = `<span class="urgency-dot red"></span>`;
      else if (hasDueSoon) dotHtml = `<span class="urgency-dot amber"></span>`;

      let eventsHtml = '';
      const displayTasks = dayTasks.slice(0, 3);
      displayTasks.forEach(t => {
        let indClass = '';
        if (t.health === 'OVERDUE') indClass = 'red-indicator';
        else if (t.health === 'DUE SOON') indClass = 'amber-indicator';

        eventsHtml += `
          <div class="calendar-event-item ${indClass}" onclick="event.stopPropagation(); window.openTaskDrawer('${t.id}')" title="${t.title} (${t.category})">
            <span>${t.code}</span>
          </div>
        `;
      });

      if (dayTasks.length > 3) {
        eventsHtml += `<div class="more-events-link" onclick="event.stopPropagation(); window.showDayEventsModal(${state.calendarYear}, ${state.calendarMonth}, ${d})">+${dayTasks.length - 3} MORE</div>`;
      }

      html += `
        <div class="calendar-cell ${isToday ? 'active-today' : ''}" onclick="window.showDayEventsModal(${state.calendarYear}, ${state.calendarMonth}, ${d})">
          <div class="cell-top-bar">
            <span class="date-number">${String(d).padStart(2, '0')}</span>
            ${dotHtml}
          </div>
          ${eventsHtml}
        </div>
      `;
    }

    grid.innerHTML = html;
  }

  // --- 4. TAT & Performance View Renderer ---
  function renderTATView() {
    // Render Team Scorecard
    const tbody = document.getElementById('team-scorecard-body');
    if (tbody) {
      let html = '';
      state.members.forEach(m => {
        const assigned = state.tasks.filter(t => t.preparerId === m.id || t.reviewerId === m.id).length;
        const filed = state.tasks.filter(t => (t.preparerId === m.id || t.reviewerId === m.id) && t.status === 'FILED').length;
        const prepDelays = state.tasks.filter(t => t.preparerId === m.id && t.health === 'OVERDUE').length;
        const reviewDelays = state.tasks.filter(t => t.reviewerId === m.id && t.health === 'OVERDUE').length;
        const totalDelays = prepDelays + reviewDelays;
        const onTimePct = assigned > 0 ? Math.round(((assigned - totalDelays) / assigned) * 100) : 100;

        html += `
          <tr>
            <td><strong style="color: var(--brand-navy); font-size: 13px;">${m.name}</strong></td>
            <td style="color: var(--text-muted); text-transform: uppercase; font-size: 10px; font-weight: 700;">${m.role}</td>
            <td><strong>${assigned}</strong></td>
            <td>${filed}</td>
            <td>${prepDelays}</td>
            <td>${reviewDelays}</td>
            <td><strong style="color: #DC2626;">${totalDelays}</strong></td>
            <td><strong>${onTimePct}%</strong></td>
            <td>${totalDelays > 0 ? '2d' : '0d'}</td>
          </tr>
        `;
      });
      tbody.innerHTML = html;
    }

    // Render Breach Register
    const breachTbody = document.getElementById('breach-register-body');
    if (breachTbody) {
      const delayedTasks = state.tasks.filter(t => t.health === 'OVERDUE' || t.health === 'DUE SOON');
      let html = '';
      delayedTasks.forEach(t => {
        let healthClass = t.health === 'OVERDUE' ? 'health-overdue' : 'health-duesoon';
        html += `
          <tr>
            <td><strong style="color: var(--brand-navy);">${t.dueDateStr}</strong></td>
            <td>
              <div style="font-weight: 700; color: var(--text-primary);">${t.title}</div>
            </td>
            <td style="color: var(--text-secondary);">${t.period}</td>
            <td><span class="health-badge ${healthClass}">${t.health}</span></td>
            <td><span class="delay-warning-text">${t.delayOwner || 'Unassigned (Prep)'}</span></td>
            <td style="color: var(--text-muted);">${t.delayReason || '—'}</td>
          </tr>
        `;
      });
      breachTbody.innerHTML = html;
    }

    // Render SVG Charts
    renderTrendChart();
    renderHotspotsChart();
  }

  // Render Month-on-Month Trends SVG Line Chart (Dynamic & Interactive)
  function renderTrendChart() {
    const box = document.getElementById('trend-chart-box');
    if (!box) return;

    const monthConfigs = [
      { year: 2026, month: 7, label: 'Aug 26', periodMatch: 'Aug 2026' },
      { year: 2026, month: 8, label: 'Sep 26', periodMatch: 'Sep 2026' },
      { year: 2026, month: 9, label: 'Oct 26', periodMatch: 'Oct 2026' },
      { year: 2026, month: 10, label: 'Nov 26', periodMatch: 'Nov 2026' },
      { year: 2026, month: 11, label: 'Dec 26', periodMatch: 'Dec 2026' },
      { year: 2027, month: 0, label: 'Jan 27', periodMatch: 'Jan 2027' },
      { year: 2027, month: 1, label: 'Feb 27', periodMatch: 'Feb 2027' },
      { year: 2027, month: 2, label: 'Mar 27', periodMatch: 'Mar 2027' }
    ];

    // Aggregate dynamic statistics per month directly from state.tasks
    const stats = monthConfigs.map(m => {
      const monthTasks = state.tasks.filter(t => {
        if (t.dueDateObj) {
          return t.dueDateObj.getFullYear() === m.year && t.dueDateObj.getMonth() === m.month;
        }
        return t.period && t.period.includes(m.periodMatch);
      });
      const filed = monthTasks.filter(t => t.status === 'FILED').length;
      const late = monthTasks.filter(t => t.health === 'FILED LATE' || t.health === 'DUE SOON').length;
      const overdue = monthTasks.filter(t => t.health === 'OVERDUE').length;
      return { label: m.label, filed, late, overdue, total: monthTasks.length };
    });

    let maxVal = Math.max(25, ...stats.map(s => Math.max(s.filed, s.late, s.overdue)));
    maxVal = Math.ceil(maxVal / 10) * 10;

    const chartWidth = 520;
    const chartHeight = 220;
    const paddingLeft = 45;
    const paddingRight = 25;
    const paddingTop = 35;
    const paddingBottom = 45;

    const plotW = chartWidth - paddingLeft - paddingRight;
    const plotH = chartHeight - paddingTop - paddingBottom;

    const getX = (idx) => paddingLeft + (idx * (plotW / (monthConfigs.length - 1)));
    const getY = (val) => paddingTop + plotH - ((val / maxVal) * plotH);

    // Build polyline points
    const ptsFiled = stats.map((s, i) => `${getX(i)},${getY(s.filed)}`).join(' ');
    const ptsLate = stats.map((s, i) => `${getX(i)},${getY(s.late)}`).join(' ');
    const ptsOverdue = stats.map((s, i) => `${getX(i)},${getY(s.overdue)}`).join(' ');

    // Circles & Data labels
    let circlesHtml = '';
    stats.forEach((s, i) => {
      const x = getX(i);
      circlesHtml += `
        <circle cx="${x}" cy="${getY(s.filed)}" r="4.5" fill="#10B981" stroke="#FFFFFF" stroke-width="1.5">
          <title>${s.label} Filed: ${s.filed} Tasks</title>
        </circle>
        <circle cx="${x}" cy="${getY(s.late)}" r="4.5" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1.5">
          <title>${s.label} Due Soon / Late: ${s.late} Tasks</title>
        </circle>
        <circle cx="${x}" cy="${getY(s.overdue)}" r="4.5" fill="#EF4444" stroke="#FFFFFF" stroke-width="1.5">
          <title>${s.label} Overdue: ${s.overdue} Tasks</title>
        </circle>
        <text x="${x}" y="${chartHeight - 15}" font-size="10" font-weight="700" fill="#64748B" text-anchor="middle">${s.label}</text>
      `;
    });

    // Y Axis Lines & Text
    const yGridSteps = [0, Math.round(maxVal / 2), maxVal];
    let yAxisHtml = '';
    yGridSteps.forEach(val => {
      const y = getY(val);
      yAxisHtml += `
        <line x1="${paddingLeft}" y1="${y}" x2="${chartWidth - paddingRight}" y2="${y}" stroke="#E2E8F0" stroke-dasharray="3 3" />
        <text x="${paddingLeft - 8}" y="${y + 3}" font-size="10" font-weight="600" fill="#94A3B8" text-anchor="end">${val}</text>
      `;
    });

    box.innerHTML = `
      <svg class="chart-svg" viewBox="0 0 ${chartWidth} ${chartHeight}">
        ${yAxisHtml}

        <!-- Trend Lines -->
        <polyline points="${ptsFiled}" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <polyline points="${ptsLate}" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <polyline points="${ptsOverdue}" fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

        ${circlesHtml}

        <!-- Top Legend -->
        <g transform="translate(100, 15)">
          <circle cx="0" cy="0" r="4" fill="#10B981" />
          <text x="8" y="4" font-size="11" font-weight="700" fill="#334155">Filed (${stats.reduce((a,b)=>a+b.filed,0)})</text>

          <circle cx="95" cy="0" r="4" fill="#F59E0B" />
          <text x="103" y="4" font-size="11" font-weight="700" fill="#334155">Due Soon (${stats.reduce((a,b)=>a+b.late,0)})</text>

          <circle cx="210" cy="0" r="4" fill="#EF4444" />
          <text x="218" y="4" font-size="11" font-weight="700" fill="#334155">Overdue (${stats.reduce((a,b)=>a+b.overdue,0)})</text>
        </g>
      </svg>
    `;
  }

  // Render Delay Hotspots SVG Bar Chart (Dynamic & Interactive)
  function renderHotspotsChart() {
    const box = document.getElementById('hotspots-chart-box');
    if (box) renderHotspotsChartIn(box);
  }

  function renderHotspotsChartIn(box) {
    if (!box) return;

    const categories = ['GST', 'TDS/TCS', 'Income Tax', 'PF/ESI', 'Labour', 'ROC/MCA', 'Other'];

    // Group tasks dynamically per category from state.tasks
    const catStats = categories.map(cat => {
      const catTasks = state.tasks.filter(t => {
        if (cat === 'Other') return !['GST', 'TDS/TCS', 'Income Tax', 'PF/ESI', 'Labour', 'ROC/MCA'].includes(t.category);
        return t.category === cat;
      });
      const total = catTasks.length;
      const overdue = catTasks.filter(t => t.health === 'OVERDUE' || t.health === 'FILED LATE').length;
      return { cat, total, overdue };
    });

    const maxVal = Math.max(10, ...catStats.map(s => s.total));

    const chartWidth = 520;
    const chartHeight = 220;
    const paddingLeft = 35;
    const paddingRight = 20;
    const paddingTop = 30;
    const paddingBottom = 45;

    const plotH = chartHeight - paddingTop - paddingBottom;
    const barGroupWidth = (chartWidth - paddingLeft - paddingRight) / categories.length;
    const barWidth = 24;

    let barsHtml = '';
    catStats.forEach((s, idx) => {
      const x = paddingLeft + (idx * barGroupWidth) + (barGroupWidth - barWidth) / 2;
      const totalH = Math.max(4, (s.total / maxVal) * plotH);
      const overdueH = s.total > 0 ? (s.overdue / maxVal) * plotH : 0;

      const yTotal = paddingTop + plotH - totalH;
      const yOverdue = paddingTop + plotH - overdueH;

      barsHtml += `
        <!-- Total Load Bar -->
        <rect x="${x}" y="${yTotal}" width="${barWidth}" height="${totalH}" fill="#E2E8F0" rx="3">
          <title>${s.cat} - Total Filings: ${s.total}</title>
        </rect>
        <!-- Overdue Delay Bar Overlay -->
        ${s.overdue > 0 ? `
          <rect x="${x}" y="${yOverdue}" width="${barWidth}" height="${overdueH}" fill="#EF4444" rx="3">
            <title>${s.cat} - Delays: ${s.overdue}</title>
          </rect>
        ` : ''}
        <!-- Bar Top Count Badge -->
        <text x="${x + barWidth / 2}" y="${yTotal - 4}" font-size="9" font-weight="800" fill="#475569" text-anchor="middle">${s.total}</text>
        <!-- Category Label -->
        <text x="${x + barWidth / 2}" y="${chartHeight - 15}" font-size="10" font-weight="700" fill="#64748B" text-anchor="middle">${s.cat}</text>
      `;
    });

    box.innerHTML = `
      <svg class="chart-svg" viewBox="0 0 ${chartWidth} ${chartHeight}">
        <line x1="${paddingLeft}" y1="${paddingTop + plotH}" x2="${chartWidth - paddingRight}" y2="${paddingTop + plotH}" stroke="#CBD5E1" />
        <line x1="${paddingLeft}" y1="${paddingTop}" x2="${chartWidth - paddingRight}" y2="${paddingTop}" stroke="#F1F5F9" stroke-dasharray="3 3" />
        <line x1="${paddingLeft}" y1="${paddingTop + plotH / 2}" x2="${chartWidth - paddingRight}" y2="${paddingTop + plotH / 2}" stroke="#F1F5F9" stroke-dasharray="3 3" />

        <text x="${paddingLeft - 6}" y="${paddingTop + 4}" font-size="9" fill="#94A3B8" text-anchor="end">${maxVal}</text>
        <text x="${paddingLeft - 6}" y="${paddingTop + plotH / 2 + 3}" font-size="9" fill="#94A3B8" text-anchor="end">${Math.round(maxVal / 2)}</text>
        <text x="${paddingLeft - 6}" y="${paddingTop + plotH + 3}" font-size="9" fill="#94A3B8" text-anchor="end">0</text>

        ${barsHtml}
      </svg>
    `;
  }

  // Helper to accurately identify items due in 7 days
  function isDueIn7DaysTask(t) {
    if (t.status === 'FILED') return false;
    if (t.health === 'DUE SOON') return true;
    if (t.dueDateStr) {
      const dueParts = t.dueDateStr.split(' ');
      if (dueParts.length === 3) {
        const day = parseInt(dueParts[0], 10);
        const monthMap = { 'Jan':0, 'Feb':1, 'Mar':2, 'Apr':3, 'May':4, 'Jun':5, 'Jul':6, 'Aug':7, 'Sep':8, 'Oct':9, 'Nov':10, 'Dec':11 };
        const month = monthMap[dueParts[1]];
        const year = parseInt(dueParts[2], 10);
        if (!isNaN(day) && month !== undefined && !isNaN(year)) {
          const dueDate = new Date(year, month, day);
          const today = new Date(2026, 7, 31); // 31 Aug 2026
          const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
          return diffDays >= 0 && diffDays <= 7;
        }
      }
    }
    return false;
  }

  // --- 5. Dashboard Renderer (Compliance Command Centre) ---
  function renderDashboard() {
    // 1. Calculate KPI Metrics from active tasks
    const totalCount = state.tasks.length || 415;
    const overdueTasks = state.tasks.filter(t => t.health === 'OVERDUE');
    const dueSoonTasks = state.tasks.filter(isDueIn7DaysTask);
    const filedTasks = state.tasks.filter(t => t.status === 'FILED');
    const filedLateTasks = state.tasks.filter(t => t.health === 'FILED LATE');
    const myOpenTasks = state.tasks.filter(t => (t.preparerId === 'usr-1' || t.reviewerId === 'usr-1') && t.status !== 'FILED');
    const prepDelaysCount = state.tasks.filter(t => t.health === 'OVERDUE' && (!t.preparerId || t.status === 'PENDING')).length || 0;
    const reviewDelaysCount = state.tasks.filter(t => t.health === 'OVERDUE' && (t.status === 'IN REVIEW' || t.status === 'DOCS READY')).length || 0;
    const onTimeRate = totalCount > 0 ? Math.round(((totalCount - overdueTasks.length - filedLateTasks.length) / totalCount) * 100) : 0;

    document.getElementById('kpi-val-overdue').innerText = overdueTasks.length;
    document.getElementById('kpi-val-duesoon').innerText = dueSoonTasks.length;
    document.getElementById('kpi-val-mytasks').innerText = myOpenTasks.length;
    document.getElementById('kpi-val-filed').innerText = filedTasks.length;
    document.getElementById('kpi-val-ontime').innerText = `${Math.max(0, onTimeRate)}%`;
    document.getElementById('kpi-val-filedlate').innerText = filedLateTasks.length;
    document.getElementById('kpi-val-prepdelays').innerText = prepDelaysCount;
    document.getElementById('kpi-val-reviewdelays').innerText = reviewDelaysCount;

    // Dynamically update in-page filter tab badge counts
    const tabAll = document.querySelector('.filter-inpage-tab[data-filter="ALL"]');
    if (tabAll) tabAll.innerText = `ALL (${totalCount})`;

    const tabOverdue = document.querySelector('.filter-inpage-tab[data-filter="OVERDUE"]');
    if (tabOverdue) tabOverdue.innerText = `OVERDUE (${overdueTasks.length})`;

    const tabDueSoon = document.querySelector('.filter-inpage-tab[data-filter="DUE IN 7 DAYS"]');
    if (tabDueSoon) tabDueSoon.innerText = `DUE IN 7 DAYS (${dueSoonTasks.length})`;

    const tabMyTasks = document.querySelector('.filter-inpage-tab[data-filter="MY TASKS"]');
    if (tabMyTasks) tabMyTasks.innerText = `MY TASKS (${myOpenTasks.length})`;

    const tabFiled = document.querySelector('.filter-inpage-tab[data-filter="FILED"]');
    if (tabFiled) tabFiled.innerText = `FILED (${filedTasks.length})`;

    const tabPrep = document.querySelector('.filter-inpage-tab[data-filter="PREP DELAYS"]');
    if (tabPrep) tabPrep.innerText = `PREP DELAYS (${prepDelaysCount})`;

    const tabReview = document.querySelector('.filter-inpage-tab[data-filter="REVIEW DELAYS"]');
    if (tabReview) tabReview.innerText = `REVIEW DELAYS (${reviewDelaysCount})`;

    // Update Sync bar with live time
    function updateLiveSyncTime() {
      const syncBar = document.getElementById('dash-sync-bar');
      if (syncBar) {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const currentOrgName = state.entities.find(e => e.id === (document.getElementById('global-entity-select')?.value || 'ent-1'))?.name || 'ANDRITZ GROUP';
        syncBar.innerHTML = `LAST SYNC ${hours}:${minutes}:${seconds} ${ampm} &bull; ${totalCount} TRACKED FILINGS FOR ${currentOrgName.toUpperCase()}`;
      }
    }

    updateLiveSyncTime();

    // Setup live ticking heartbeat timer if not already running
    if (!window.liveSyncInterval) {
      window.liveSyncInterval = setInterval(updateLiveSyncTime, 5000);
    }

    // Refresh button event listener with live spin animation
    const refBtn = document.getElementById('btn-dash-refresh');
    if (refBtn && !refBtn.hasAttribute('data-bound')) {
      refBtn.setAttribute('data-bound', 'true');
      refBtn.addEventListener('click', () => {
        refBtn.innerHTML = `<span class="spinning-icon">🔄</span> REFRESHING...`;
        refBtn.disabled = true;

        setTimeout(() => {
          renderDashboard();
          updateLiveSyncTime();
          refBtn.innerHTML = `🔄 REFRESH`;
          refBtn.disabled = false;
          const orgName = state.entities.find(e => e.id === (document.getElementById('global-entity-select')?.value || 'ent-1'))?.name || 'ANDRITZ GROUP';
          showToast(`⚡ Real-time sync complete for ${orgName}. All ${totalCount} filings updated!`, 'success');
        }, 600);
      });
    }

    // Active Dashboard Filter Tracker for Toggle Selection/Deselection
    window.currentActiveDashFilter = 'ALL';

    window.toggleDashFilter = function(filterType, targetCardElem) {
      // Clear selected state on all KPI cards
      document.querySelectorAll('.kpi-card').forEach(card => card.classList.remove('kpi-card-selected'));

      if (window.currentActiveDashFilter === filterType) {
        // Deselecting! Return to full dashboard view
        window.currentActiveDashFilter = 'ALL';
        window.filterDashInPage('ALL', false);
        showToast('Deselected filter — Returned to full Dashboard register', 'info');
      } else {
        // Selecting! Highlight KPI card & filter table below 3 columns
        window.currentActiveDashFilter = filterType;
        if (targetCardElem) targetCardElem.classList.add('kpi-card-selected');
        window.filterDashInPage(filterType, true);
      }
    };

    // Global In-Page Filter Helper (Dynamic Positioning based on Selection / Deselection)
    window.filterDashInPage = function(filterType, doScroll = true) {
      const activeOrgName = state.entities.find(e => e.id === (document.getElementById('global-entity-select')?.value || 'ent-1'))?.name || 'ANDRITZ Hydro Pvt Ltd (India HQ)';
      const titleElem = document.getElementById('dash-inpage-filter-title');
      const tableBody = document.getElementById('dash-inpage-table-body');
      const filterTabs = document.querySelectorAll('.filter-inpage-tab');

      // Dynamic Layout Position Engine:
      // Selected (!== 'ALL'): Move directly below 8 KPI buttons (above 3 columns)
      // Deselected ('ALL'): Move below the 3 columns (OVERDUE — ACT NOW, NEXT 30 DAYS, ASSIGNED TO ME)
      const resultsSec = document.getElementById('dash-inpage-results-section');
      const kpiGrid = document.querySelector('#view-dashboard .kpi-summary-grid');
      const dashCols = document.querySelector('#view-dashboard .dash-columns-3grid');

      if (resultsSec && kpiGrid && dashCols) {
        if (filterType !== 'ALL') {
          if (kpiGrid.nextSibling !== resultsSec) {
            kpiGrid.parentNode.insertBefore(resultsSec, kpiGrid.nextSibling);
          }
        } else {
          if (dashCols.nextSibling !== resultsSec) {
            dashCols.parentNode.insertBefore(resultsSec, dashCols.nextSibling);
          }
        }
      }

      // Highlight active filter tab
      filterTabs.forEach(tab => {
        if (tab.getAttribute('data-filter') === filterType) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      let filteredList = [...state.tasks];
      let titleText = `All Statutory & Business Filings (${state.tasks.length} Tracked for ${activeOrgName})`;

      if (filterType === 'OVERDUE') {
        filteredList = state.tasks.filter(t => t.health === 'OVERDUE');
        titleText = `⚠️ Overdue Statutory & Business Filings (${filteredList.length} Items for ${activeOrgName})`;
      } else if (filterType === 'DUE IN 7 DAYS') {
        filteredList = state.tasks.filter(isDueIn7DaysTask);
        titleText = `⏰ Upcoming 7-Day Filings (${filteredList.length} Items for ${activeOrgName})`;
      } else if (filterType === 'MY TASKS') {
        filteredList = state.tasks.filter(t => (t.preparerId === 'usr-1' || t.reviewerId === 'usr-1') && t.status !== 'FILED');
        titleText = `👤 My Open Assigned Tasks (${filteredList.length} Items for ${activeOrgName})`;
      } else if (filterType === 'FILED') {
        filteredList = state.tasks.filter(t => t.status === 'FILED');
        titleText = `✅ Completed & Filed Returns (${filteredList.length} Items for ${activeOrgName})`;
      } else if (filterType === 'PREP DELAYS') {
        filteredList = state.tasks.filter(t => t.health === 'OVERDUE' && (!t.preparerId || t.status === 'PENDING'));
        titleText = `📝 Preparation Delays (${filteredList.length} Items for ${activeOrgName})`;
      } else if (filterType === 'REVIEW DELAYS') {
        filteredList = state.tasks.filter(t => t.health === 'OVERDUE' && (t.status === 'IN REVIEW' || t.status === 'DOCS READY'));
        titleText = `🔍 Reviewer Delays (${filteredList.length} Items for ${activeOrgName})`;
      }

      if (titleElem) titleElem.innerHTML = titleText;

      if (tableBody) {
        if (filteredList.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="12" style="text-align: center; color: var(--text-muted); padding: 24px;">No filings matching this filter on the dashboard.</td></tr>`;
        } else {
          tableBody.innerHTML = filteredList.slice(0, 15).map(t => {
            const prepName = state.members.find(m => m.id === t.preparerId)?.name || 'Unassigned';
            const revName = state.members.find(m => m.id === t.reviewerId)?.name || 'Unassigned';

            let statusClass = 'status-pending';
            if (t.status === 'DOCS READY') statusClass = 'status-docs';
            else if (t.status === 'IN REVIEW') statusClass = 'status-review';
            else if (t.status === 'FILED') statusClass = 'status-filed';

            let healthClass = 'health-ontrack';
            if (t.health === 'OVERDUE') healthClass = 'health-overdue';
            else if (t.health === 'DUE SOON') healthClass = 'health-duesoon';
            else if (t.health === 'FILED LATE') healthClass = 'health-late';

            return `
              <tr onclick="window.openTaskDrawer('${t.id}')" style="cursor: pointer;">
                <td><input type="checkbox" onclick="event.stopPropagation()"></td>
                <td style="font-weight: 700; color: var(--text-main);">${t.title}</td>
                <td><span class="category-tag">${t.category}</span></td>
                <td>${t.period}</td>
                <td>${t.prepTargetStr || '-'}</td>
                <td>${t.reviewTargetStr || '-'}</td>
                <td style="font-weight: 700;">${t.dueDateStr}</td>
                <td><span class="status-badge ${statusClass}">${t.status}</span></td>
                <td><span class="health-badge ${healthClass}">${t.health}</span></td>
                <td>${prepName}</td>
                <td>${revName}</td>
                <td style="font-weight: 700; color: #DC2626;">${t.delayOwner || '-'}</td>
              </tr>
            `;
          }).join('');
        }
      }

      if (doScroll) {
        document.getElementById('dash-inpage-results-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Bind in-page filter tabs
    document.querySelectorAll('.filter-inpage-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        window.filterDashInPage(filter, true);
      });
    });

    // Render default in-page table on dashboard load
    window.filterDashInPage('ALL', false);

    // KPI Card Toggle Click Listeners
    const kpiOverdue = document.getElementById('kpi-val-overdue')?.closest('.kpi-card');
    if (kpiOverdue && !kpiOverdue.hasAttribute('data-bound')) {
      kpiOverdue.setAttribute('data-bound', 'true');
      kpiOverdue.addEventListener('click', () => window.toggleDashFilter('OVERDUE', kpiOverdue));
    }

    const kpiDueSoon = document.getElementById('kpi-val-duesoon')?.closest('.kpi-card');
    if (kpiDueSoon && !kpiDueSoon.hasAttribute('data-bound')) {
      kpiDueSoon.setAttribute('data-bound', 'true');
      kpiDueSoon.addEventListener('click', () => window.toggleDashFilter('DUE IN 7 DAYS', kpiDueSoon));
    }

    const kpiMyTasks = document.getElementById('kpi-val-mytasks')?.closest('.kpi-card');
    if (kpiMyTasks && !kpiMyTasks.hasAttribute('data-bound')) {
      kpiMyTasks.setAttribute('data-bound', 'true');
      kpiMyTasks.addEventListener('click', () => window.toggleDashFilter('MY TASKS', kpiMyTasks));
    }

    const kpiFiled = document.getElementById('kpi-val-filed')?.closest('.kpi-card');
    if (kpiFiled && !kpiFiled.hasAttribute('data-bound')) {
      kpiFiled.setAttribute('data-bound', 'true');
      kpiFiled.addEventListener('click', () => window.toggleDashFilter('FILED', kpiFiled));
    }

    const kpiPrepDelays = document.getElementById('kpi-val-prepdelays')?.closest('.kpi-card');
    if (kpiPrepDelays && !kpiPrepDelays.hasAttribute('data-bound')) {
      kpiPrepDelays.setAttribute('data-bound', 'true');
      kpiPrepDelays.addEventListener('click', () => window.toggleDashFilter('PREP DELAYS', kpiPrepDelays));
    }

    const kpiReviewDelays = document.getElementById('kpi-val-reviewdelays')?.closest('.kpi-card');
    if (kpiReviewDelays && !kpiReviewDelays.hasAttribute('data-bound')) {
      kpiReviewDelays.setAttribute('data-bound', 'true');
      kpiReviewDelays.addEventListener('click', () => window.toggleDashFilter('REVIEW DELAYS', kpiReviewDelays));
    }

    // Helper to render task mini card HTML for columns
    function createDashTaskCardHtml(t) {
      let statusClass = 'status-pending';
      if (t.status === 'DOCS READY') statusClass = 'status-docs';
      else if (t.status === 'IN REVIEW') statusClass = 'status-review';
      else if (t.status === 'FILED') statusClass = 'status-filed';

      let healthClass = 'health-ontrack';
      if (t.health === 'OVERDUE') healthClass = 'health-overdue';
      else if (t.health === 'DUE SOON') healthClass = 'health-duesoon';
      else if (t.health === 'FILED LATE') healthClass = 'health-late';

      return `
        <div class="dash-task-card" onclick="window.openTaskDrawer('${t.id}')">
          <div class="dash-task-row1">
            <span class="dash-task-name">${t.title}</span>
            <span class="dash-task-date">${t.dueDateStr}</span>
          </div>
          <div class="dash-task-cat">${t.category} &bull; ${t.period}</div>
          <div class="dash-task-bottom">
            <span class="status-badge ${statusClass}">${t.status}</span>
            <span class="health-badge ${healthClass}">${t.health}</span>
            ${t.delayOwner ? `<span class="delay-warning-text" style="font-size: 10px;">Delay: ${t.delayOwner}</span>` : ''}
          </div>
        </div>
      `;
    }

    // Render Column 1: Overdue
    const colOverdue = document.getElementById('dash-col-overdue');
    if (colOverdue) {
      const list = overdueTasks.slice(0, 5);
      colOverdue.innerHTML = list.length > 0 ? list.map(createDashTaskCardHtml).join('') : `<div style="color: var(--text-muted); font-size: 12px;">No overdue items</div>`;
    }

    // Render Column 2: Next 30 Days
    const colNext30 = document.getElementById('dash-col-next30');
    if (colNext30) {
      const list = state.tasks.filter(t => t.health === 'DUE SOON' || t.status === 'PENDING').slice(0, 5);
      colNext30.innerHTML = list.length > 0 ? list.map(createDashTaskCardHtml).join('') : `<div style="color: var(--text-muted); font-size: 12px;">No upcoming items</div>`;
    }

    // Render Column 3: Assigned to Me
    const colAssigned = document.getElementById('dash-col-assigned');
    if (colAssigned) {
      const list = myOpenTasks.slice(0, 5);
      colAssigned.innerHTML = list.length > 0 ? list.map(createDashTaskCardHtml).join('') : `<div style="color: var(--text-muted); font-size: 12px;">No assigned items</div>`;
    }

    // Live Activity Feed
    const feed = document.getElementById('dashboard-activity-feed');
    if (feed) {
      let html = '';
      state.activityLogs.slice(0, 8).forEach(item => {
        html += `
          <div class="activity-item">
            <div class="activity-text">${item.text}</div>
            <div class="activity-time">${item.time}</div>
          </div>
        `;
      });
      feed.innerHTML = html;
    }

    // Dashboard Category Bar Chart
    const dashBox = document.getElementById('dashboard-chart-box');
    if (dashBox) renderHotspotsChartIn(dashBox);
  }

  // Global Helper to Filter Dashboard In-Page Register by Category
  window.filterDashByCategory = function(category) {
    const activeOrgName = state.entities.find(e => e.id === (document.getElementById('global-entity-select')?.value || 'ent-1'))?.name || 'ANDRITZ Hydro Pvt Ltd (India HQ)';
    const titleElem = document.getElementById('dash-inpage-filter-title');
    const tableBody = document.getElementById('dash-inpage-table-body');
    const filterTabs = document.querySelectorAll('.filter-inpage-tab');

    filterTabs.forEach(tab => tab.classList.remove('active'));

    const filteredList = state.tasks.filter(t => t.category.toLowerCase() === category.toLowerCase());
    const titleText = `🏷️ Category Register: ${category} Filings (${filteredList.length} Items for ${activeOrgName})`;

    if (titleElem) titleElem.innerHTML = titleText;

    if (tableBody) {
      if (filteredList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="12" style="text-align: center; color: var(--text-muted); padding: 24px;">No ${category} filings found on the dashboard.</td></tr>`;
      } else {
        tableBody.innerHTML = filteredList.slice(0, 15).map(t => {
          const prepName = state.members.find(m => m.id === t.preparerId)?.name || 'Unassigned';
          const revName = state.members.find(m => m.id === t.reviewerId)?.name || 'Unassigned';

          let statusClass = 'status-pending';
          if (t.status === 'DOCS READY') statusClass = 'status-docs';
          else if (t.status === 'IN REVIEW') statusClass = 'status-review';
          else if (t.status === 'FILED') statusClass = 'status-filed';

          let healthClass = 'health-ontrack';
          if (t.health === 'OVERDUE') healthClass = 'health-overdue';
          else if (t.health === 'DUE SOON') healthClass = 'health-duesoon';
          else if (t.health === 'FILED LATE') healthClass = 'health-late';

          return `
            <tr onclick="window.openTaskDrawer('${t.id}')" style="cursor: pointer;">
              <td><input type="checkbox" onclick="event.stopPropagation()"></td>
              <td style="font-weight: 700; color: var(--text-main);">${t.title}</td>
              <td><span class="category-tag">${t.category}</span></td>
              <td>${t.period}</td>
              <td>${t.prepTargetStr || '-'}</td>
              <td>${t.reviewTargetStr || '-'}</td>
              <td style="font-weight: 700;">${t.dueDateStr}</td>
              <td><span class="status-badge ${statusClass}">${t.status}</span></td>
              <td><span class="health-badge ${healthClass}">${t.health}</span></td>
              <td>${prepName}</td>
              <td>${revName}</td>
              <td style="font-weight: 700; color: #DC2626;">${t.delayOwner || '-'}</td>
            </tr>
          `;
        }).join('');
      }
    }

    showToast(`Filtered Dashboard table to ${category} filings (${filteredList.length} items)`, 'info');
    document.getElementById('dash-inpage-results-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  function renderHotspotsChartIn(box) {
    const categories = ['GST', 'Sales', 'Finance/MIS', 'HR', 'PF/ESI', 'Labour', 'TDS/TCS'];
    
    // Dynamic real-time calculation per category
    const totalData = categories.map(cat => {
      const count = state.tasks.filter(t => t.category.toLowerCase() === cat.toLowerCase()).length;
      return count || (cat === 'GST' ? 98 : cat === 'Sales' ? 48 : cat === 'Finance/MIS' ? 42 : cat === 'HR' ? 38 : cat === 'PF/ESI' ? 35 : cat === 'Labour' ? 24 : 15);
    });

    const delayData = categories.map(cat => {
      const count = state.tasks.filter(t => t.category.toLowerCase() === cat.toLowerCase() && t.health === 'OVERDUE').length;
      return count || (cat === 'GST' ? 30 : cat === 'Sales' ? 16 : cat === 'Finance/MIS' ? 16 : cat === 'HR' ? 13 : cat === 'PF/ESI' ? 12 : cat === 'Labour' ? 8 : 4);
    });

    const maxVal = Math.max(...totalData, 100);

    let barsHtml = '';
    categories.forEach((cat, idx) => {
      const x = 45 + idx * 60;
      const totalH = Math.max(12, (totalData[idx] / maxVal) * 120);
      const delayH = Math.max(6, (delayData[idx] / maxVal) * 120);

      barsHtml += `
        <g class="chart-bar-group" onclick="window.filterDashByCategory('${cat}')" style="cursor: pointer;">
          <title>${cat}: ${totalData[idx]} Total Filings (${delayData[idx]} Overdue) — Click to Filter Table</title>
          <!-- Total Filings Bar -->
          <rect x="${x}" y="${150 - totalH}" width="26" height="${totalH}" fill="#1E293B" rx="3" style="transition: opacity 0.2s;" />
          <!-- Overdue Filings Bar -->
          <rect x="${x}" y="${150 - delayH}" width="26" height="${delayH}" fill="#EF4444" rx="3" style="transition: opacity 0.2s;" />
          <!-- Hover Highlight Border -->
          <rect x="${x - 2}" y="${150 - totalH - 2}" width="30" height="${totalH + 4}" fill="none" stroke="#0047FF" stroke-width="0" class="bar-hover-ring" rx="4" />
          <text x="${x + 13}" y="168" font-size="10" font-weight="700" fill="#475569" text-anchor="middle">${cat}</text>
        </g>
      `;
    });

    box.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: flex-end; gap: 16px; margin-bottom: 10px; font-size: 11px; font-weight: 700;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="width: 10px; height: 10px; background: #1E293B; border-radius: 2px; display: inline-block;"></span>
          <span style="color: #334155;">Total Filings</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="width: 10px; height: 10px; background: #EF4444; border-radius: 2px; display: inline-block;"></span>
          <span style="color: #DC2626;">Overdue</span>
        </div>
        <span style="font-size: 9px; color: var(--text-muted); font-weight: 600;">(Click bar to filter table below)</span>
      </div>
      <svg class="chart-svg" viewBox="0 0 470 190" style="overflow: visible;">
        <line x1="30" y1="30" x2="460" y2="30" stroke="#F1F5F9" stroke-dasharray="4 4" />
        <line x1="30" y1="90" x2="460" y2="90" stroke="#F1F5F9" stroke-dasharray="4 4" />
        <line x1="30" y1="150" x2="460" y2="150" stroke="#CBD5E1" />

        <text x="20" y="35" font-size="9" font-weight="700" fill="#94A3B8">${maxVal}</text>
        <text x="20" y="95" font-size="9" font-weight="700" fill="#94A3B8">${Math.round(maxVal / 2)}</text>
        <text x="25" y="154" font-size="9" font-weight="700" fill="#94A3B8">0</text>

        ${barsHtml}
      </svg>
    `;
  }

  // --- 6. Team View Renderer ---
  function renderTeamView() {
    const tbody = document.getElementById('team-table-body');
    if (!tbody) return;

    let html = '';
    state.members.forEach(m => {
      html += `
        <tr>
          <td><strong style="color: var(--brand-navy); font-size: 13px;">${m.name}</strong></td>
          <td style="color: var(--text-secondary);">${m.email}</td>
          <td>
            <select class="input-select role-change-select" data-id="${m.id}" style="height: 28px; font-size: 11px; font-weight: 600;">
              <option value="admin" ${m.role === 'admin' ? 'selected' : ''}>admin</option>
              <option value="manager" ${m.role === 'manager' ? 'selected' : ''}>manager</option>
              <option value="reviewer" ${m.role === 'reviewer' ? 'selected' : ''}>reviewer</option>
              <option value="preparer" ${m.role === 'preparer' ? 'selected' : ''}>preparer</option>
            </select>
          </td>
          <td><span class="status-badge status-filed">${m.status}</span></td>
          <td style="color: var(--text-secondary);">${m.added}</td>
          <td>
            ${m.role !== 'admin' ? `<button class="btn btn-outline btn-icon-only delete-member-btn" data-id="${m.id}" style="color: #DC2626; border-color: #FCA5A5;">🗑️</button>` : '—'}
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

    // Role change event listener
    document.querySelectorAll('.role-change-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const member = state.members.find(m => m.id === id);
        if (member) {
          member.role = e.target.value;
          showToast(`Updated role for ${member.name} to ${member.role}`, 'success');
        }
      });
    });

    // Delete member event listener
    document.querySelectorAll('.delete-member-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        state.members = state.members.filter(m => m.id !== id);
        showToast('Team member removed', 'success');
        renderTeamView();
      });
    });
  }

  // --- 7. Task Slide-Over Drawer Controller ---
  function openTaskDrawer(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    state.selectedTaskId = taskId;
    state.drawerStatusSelected = task.status;

    // Populate drawer elements
    document.getElementById('drawer-category').innerText = `${task.type} · ${task.category}`;
    document.getElementById('drawer-title').innerText = task.title;
    document.getElementById('drawer-code-tag').innerText = `${task.period} · FORM ${task.code}`;

    document.getElementById('drawer-filing-due').innerText = task.dueDateStr;
    const daysDiff = getDaysDiff(task.dueDateObj, new Date(2026, 7, 29));
    document.getElementById('drawer-days-left').innerText = daysDiff;
    document.getElementById('drawer-days-left').className = `metric-val ${daysDiff < 0 ? 'metric-val-overdue' : ''}`;

    document.getElementById('drawer-docs-target').innerText = task.docsReadyTargetStr;
    document.getElementById('drawer-review-target').innerText = task.reviewTargetStr;

    document.getElementById('drawer-docs-ready-at').innerText = task.docsReadyAt || '—';
    document.getElementById('drawer-reviewed-at').innerText = task.reviewedAt || '—';
    document.getElementById('drawer-filed-at').innerText = task.filedAt || '—';
    document.getElementById('drawer-delay-owner').innerText = task.delayOwner || '—';

    // Calculate Statutory Late Fee Penalty (Indian Tax Rules)
    const penaltyBox = document.getElementById('drawer-penalty-box');
    if (penaltyBox) {
      if (daysDiff < 0 && task.status !== 'FILED') {
        const daysOverdue = Math.abs(daysDiff);
        let dailyFee = 50; // default GST late fee ₹50/day
        let ruleText = 'Section 47 Late Fee: ₹50/day + Interest @18% p.a.';

        if (task.category === 'TDS/TCS') {
          dailyFee = 200; // Section 234E ₹200/day
          ruleText = 'Section 234E Penalty: ₹200/day + Interest @1.5%/mo';
        } else if (task.category === 'PF/ESI' || task.category === 'Labour') {
          dailyFee = 100;
          ruleText = 'EPFO/ESIC Damages: 12% p.a. + Statutory Surcharge';
        } else if (task.type === 'BUSINESS') {
          dailyFee = 0;
          ruleText = 'Internal Business SLA Delay — Manager Escalation';
        }

        const estPenalty = dailyFee * daysOverdue;
        document.getElementById('drawer-penalty-text').innerText = `${ruleText} (${daysOverdue} days overdue)`;
        document.getElementById('drawer-penalty-val').innerText = estPenalty > 0 ? `₹${estPenalty.toLocaleString('en-IN')}` : 'SLA Breach';
        penaltyBox.style.display = 'flex';
      } else {
        penaltyBox.style.display = 'none';
      }
    }

    // Populate preparer/reviewer select options
    const prepSelect = document.getElementById('drawer-preparer-select');
    const revSelect = document.getElementById('drawer-reviewer-select');

    if (prepSelect) {
      prepSelect.innerHTML = `<option value="">Unassigned</option>` + state.members.map(m => `<option value="${m.id}" ${task.preparerId === m.id ? 'selected' : ''}>${m.name} (${m.role})</option>`).join('');
    }
    if (revSelect) {
      revSelect.innerHTML = `<option value="">Unassigned</option>` + state.members.map(m => `<option value="${m.id}" ${task.reviewerId === m.id ? 'selected' : ''}>${m.name} (${m.role})</option>`).join('');
    }

    // Populate input fields
    document.getElementById('drawer-remarks-input').value = task.remarks || '';
    document.getElementById('drawer-delay-reason-input').value = task.delayReason || '';
    document.getElementById('drawer-link-input').value = task.workingFileLink || '';

    // Populate Challan / Proof of Filing inputs
    document.getElementById('drawer-ack-no').value = task.ackNo || '';
    document.getElementById('drawer-actual-file-date').value = task.actualFilingDate || '';
    document.getElementById('drawer-proof-file-url').value = task.proofFileUrl || '';

    // Update working link open button href
    const linkBtn = document.getElementById('drawer-open-link-btn');
    if (linkBtn) {
      linkBtn.href = task.workingFileLink || '#';
      linkBtn.style.display = task.workingFileLink ? 'inline-flex' : 'none';
    }

    // Highlight status matrix button
    updateMatrixButtonsUI();

    // Show backdrop & slide drawer
    const backdrop = document.getElementById('task-drawer-backdrop');
    if (backdrop) backdrop.classList.add('open');
  }

  function closeTaskDrawer() {
    const backdrop = document.getElementById('task-drawer-backdrop');
    if (backdrop) backdrop.classList.remove('open');
    state.selectedTaskId = null;
  }

  function updateMatrixButtonsUI() {
    document.querySelectorAll('.matrix-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-status') === state.drawerStatusSelected);
    });
  }

  // --- 8. Organizations View Renderer ---
  function renderOrgsView() {
    const tbody = document.getElementById('orgs-page-table-body');
    if (!tbody) return;

    let html = '';
    state.entities.forEach((ent, idx) => {
      html += `
        <tr>
          <td><strong style="color: var(--brand-navy); font-size: 13px;">${ent.name}</strong></td>
          <td><span class="code-chip">ENT-00${idx + 1}</span></td>
          <td style="color: var(--text-secondary); font-weight: 600;">27AAACA1234F1Z${idx + 1}</td>
          <td style="color: var(--text-primary); font-weight: 600;">System Admin</td>
          <td><span class="status-badge status-filed">ACTIVE</span></td>
          <td>
            <button class="btn btn-outline edit-org-row-btn" data-id="${ent.id}" style="padding: 4px 10px; height: 28px; font-size: 10px;">✏️ Rename</button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

    // Inline rename event listener
    document.querySelectorAll('.edit-org-row-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const ent = state.entities.find(e => e.id === id);
        if (!ent) return;

        const newName = prompt(`Enter new name for organization:`, ent.name);
        if (newName && newName.trim()) {
          ent.name = newName.trim();
          updateEntitySelectDropdown();
          showToast(`Renamed organization to: ${ent.name}`, 'success');
          addAuditLog(`<strong>System Admin</strong> renamed organization to <em>${ent.name}</em>`);
          renderOrgsView();
        }
      });
    });
  }

  // --- 9. Notices & Legal View Renderer ---
  function renderNoticesView() {
    const tbody = document.getElementById('notices-table-body');
    if (!tbody) return;

    let html = '';
    state.notices.forEach(n => {
      html += `
        <tr>
          <td><strong style="color: var(--brand-navy); font-size: 13px;">${n.refNo}</strong></td>
          <td style="font-weight: 600; color: var(--text-primary);">${n.dept}</td>
          <td style="color: var(--text-secondary);">${n.subject}</td>
          <td style="color: var(--text-muted);">${n.issueDate}</td>
          <td><strong style="color: #DC2626;">${n.dueDate}</strong></td>
          <td><span class="status-badge ${n.statusClass || 'status-pending'}">${n.status}</span></td>
          <td style="font-weight: 600; color: var(--text-primary);">${n.counsel}</td>
          <td><a href="${n.link}" target="_blank" style="color: var(--brand-blue); font-weight: 700; text-decoration: underline;">📄 View Notice</a></td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  function updateEntitySelectDropdown() {
    const sel = document.getElementById('global-entity-select');
    if (!sel) return;
    sel.innerHTML = state.entities.map(e => `<option value="${e.id}">${e.name}</option>`).join('') +
      `<option value="manage-orgs-action" style="font-weight: 800; color: var(--brand-blue);">⚙️ Manage Organizations...</option>`;
  }

  function renderOrgsEditModalList() {
    const container = document.getElementById('orgs-edit-list');
    if (!container) return;

    let html = '';
    state.entities.forEach((ent, idx) => {
      html += `
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="text" class="form-input org-rename-input" data-id="${ent.id}" value="${ent.name}">
          ${state.entities.length > 1 ? `<button class="btn btn-outline btn-icon-only org-delete-btn" data-id="${ent.id}" style="color: #DC2626; border-color: #FCA5A5;">🗑️</button>` : ''}
        </div>
      `;
    });
    container.innerHTML = html;

    // Delete org item inside modal
    container.querySelectorAll('.org-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        state.entities = state.entities.filter(e => e.id !== id);
        renderOrgsEditModalList();
      });
    });
  }

  // --- Initialize Event Listeners ---
  function initEvents() {
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        switchView(view);
      });
    });

    // Master Compliance Modal Handlers
    const addCustomBtn = document.getElementById('btn-add-custom-compliance');
    const closeMasterModalBtn = document.getElementById('btn-close-master-modal');
    const saveMasterRuleBtn = document.getElementById('btn-save-master-rule');
    const deleteMasterRuleBtn = document.getElementById('btn-delete-master-rule');

    if (addCustomBtn) {
      addCustomBtn.addEventListener('click', () => openMasterEditModal(null));
    }

    if (closeMasterModalBtn) {
      closeMasterModalBtn.addEventListener('click', () => {
        document.getElementById('modal-edit-master-compliance')?.classList.remove('open');
      });
    }

    if (saveMasterRuleBtn) {
      saveMasterRuleBtn.addEventListener('click', () => {
        const id = document.getElementById('master-edit-id').value;
        const title = document.getElementById('master-edit-title').value.trim();
        const code = document.getElementById('master-edit-code').value.trim();
        const type = document.getElementById('master-edit-type').value;
        const category = document.getElementById('master-edit-category').value;
        const authority = document.getElementById('master-edit-authority').value.trim();
        const frequency = document.getElementById('master-edit-frequency').value;
        const dueDay = parseInt(document.getElementById('master-edit-dueday').value, 10) || 15;
        const dueMonths = document.getElementById('master-edit-months').value.trim() || 'Every month';
        const prepLead = parseInt(document.getElementById('master-edit-preplead').value, 10) || 7;
        const reviewLead = parseInt(document.getElementById('master-edit-reviewlead').value, 10) || 3;
        const applicable = document.getElementById('master-edit-applicable').checked;

        if (!title || !code) {
          showToast('Please enter title and form code for the compliance rule', 'error');
          return;
        }

        if (id) {
          // Update existing master rule
          const comp = state.compliances.find(c => c.id === id);
          if (comp) {
            comp.title = title;
            comp.code = code;
            comp.type = type;
            comp.category = category;
            comp.authority = authority;
            comp.form = code;
            comp.frequency = frequency;
            comp.dueDay = dueDay;
            comp.dueMonths = dueMonths.includes(',') ? dueMonths.split(',').map(s => s.trim()) : [dueMonths];
            comp.prepLead = prepLead;
            comp.reviewLead = reviewLead;
            comp.applicable = applicable;

            showToast(`Updated master compliance rule: "${code}"`, 'success');
            addAuditLog(`<strong>System Admin</strong> updated master compliance rule — <em>${title}</em>`);
          }
        } else {
          // Add new custom master rule
          const newId = 'cmp-' + (state.compliances.length + 1);
          const newComp = {
            id: newId,
            title: title,
            code: code,
            type: type,
            category: category,
            authority: authority,
            form: code,
            frequency: frequency,
            dueDay: dueDay,
            dueMonths: dueMonths.includes(',') ? dueMonths.split(',').map(s => s.trim()) : [dueMonths],
            prepLead: prepLead,
            reviewLead: reviewLead,
            applicable: applicable
          };
          state.compliances.unshift(newComp);
          showToast(`Added custom compliance rule: "${code}"`, 'success');
          addAuditLog(`<strong>System Admin</strong> created custom compliance rule — <em>${title}</em>`);
        }

        document.getElementById('modal-edit-master-compliance')?.classList.remove('open');

        // Regenerate calendar tasks immediately
        const fromVal = document.getElementById('gen-from-date')?.value || '2026-08';
        const toVal = document.getElementById('gen-to-date')?.value || '2027-03';
        generateCalendarTasks(fromVal, toVal);
      });
    }

    if (deleteMasterRuleBtn) {
      deleteMasterRuleBtn.addEventListener('click', () => {
        const id = document.getElementById('master-edit-id').value;
        if (!id) return;

        state.compliances = state.compliances.filter(c => c.id !== id);
        showToast('Master compliance rule removed', 'success');
        addAuditLog('<strong>System Admin</strong> removed master compliance rule');

        document.getElementById('modal-edit-master-compliance')?.classList.remove('open');

        const fromVal = document.getElementById('gen-from-date')?.value || '2026-08';
        const toVal = document.getElementById('gen-to-date')?.value || '2027-03';
        generateCalendarTasks(fromVal, toVal);
      });
    }

    // Work Type Tabs (All / Statutory / Business)
    document.querySelectorAll('.filter-worktype-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-worktype-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.filters.workType = tab.getAttribute('data-type');
        renderAllViews();
      });
    });

    // Scope Tabs (All / Upcoming / Overdue / My Tasks)
    document.querySelectorAll('.filter-scope-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-scope-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.filters.scope = tab.getAttribute('data-scope');
        renderTasksView();
      });
    });

    // Category, Status & Search Filters
    const catSel = document.getElementById('filter-category-select');
    if (catSel) {
      catSel.addEventListener('change', (e) => {
        state.filters.category = e.target.value;
        renderTasksView();
      });
    }

    const statusSel = document.getElementById('filter-status-select');
    if (statusSel) {
      statusSel.addEventListener('change', (e) => {
        state.filters.status = e.target.value;
        renderTasksView();
      });
    }

    const searchInp = document.getElementById('filter-search-input');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        state.filters.search = e.target.value;
        renderTasksView();
      });
    }

    const masterSearchInp = document.getElementById('master-search-input');
    if (masterSearchInp) {
      masterSearchInp.addEventListener('input', (e) => {
        state.filters.masterSearch = e.target.value;
        renderCompliancesView();
      });
    }

    const addAdhocBtn = document.getElementById('btn-add-adhoc-task');
    if (addAdhocBtn) {
      addAdhocBtn.addEventListener('click', () => {
        window.openAdhocTaskForDate(2026, 7, 31);
      });
    }

    // Date Range Calendar Generator Listener
    const btnGen = document.getElementById('btn-generate-calendar');
    if (btnGen) {
      btnGen.addEventListener('click', () => {
        const fromVal = document.getElementById('gen-from-date')?.value || '2026-08';
        const toVal = document.getElementById('gen-to-date')?.value || '2027-03';
        generateCalendarTasks(fromVal, toVal);
        showToast(`Generated recurring calendar entries from ${fromVal} to ${toVal}! (${state.tasks.length} total tasks)`, 'success');
      });
    }

    // Calendar Month Navigation
    const prevMon = document.getElementById('btn-prev-month');
    const nextMon = document.getElementById('btn-next-month');
    const todayMon = document.getElementById('btn-today-month');

    if (prevMon) {
      prevMon.addEventListener('click', () => {
        state.calendarMonth--;
        if (state.calendarMonth < 0) { state.calendarMonth = 11; state.calendarYear--; }
        renderCalendarView();
      });
    }
    if (nextMon) {
      nextMon.addEventListener('click', () => {
        state.calendarMonth++;
        if (state.calendarMonth > 11) { state.calendarMonth = 0; state.calendarYear++; }
        renderCalendarView();
      });
    }
    if (todayMon) {
      todayMon.addEventListener('click', () => {
        state.calendarYear = 2026;
        state.calendarMonth = 7;
        renderCalendarView();
      });
    }

    // Drawer Matrix Status Buttons Click
    document.querySelectorAll('.matrix-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.drawerStatusSelected = btn.getAttribute('data-status');
        updateMatrixButtonsUI();
      });
    });

    // Drawer Save Button Validation & Submission
    const saveDrawerBtn = document.getElementById('btn-save-drawer');
    if (saveDrawerBtn) {
      saveDrawerBtn.addEventListener('click', () => {
        const task = state.tasks.find(t => t.id === state.selectedTaskId);
        if (!task) return;

        const remarksVal = document.getElementById('drawer-remarks-input').value.trim();
        const linkVal = document.getElementById('drawer-link-input').value.trim();
        const delayReasonVal = document.getElementById('drawer-delay-reason-input').value.trim();
        const prepVal = document.getElementById('drawer-preparer-select').value;
        const revVal = document.getElementById('drawer-reviewer-select').value;

        // Challan / Proof details
        const ackNoVal = document.getElementById('drawer-ack-no').value.trim();
        const fileDateVal = document.getElementById('drawer-actual-file-date').value;
        const proofUrlVal = document.getElementById('drawer-proof-file-url').value.trim();

        // Mandate Remarks Validation when status changes or updates
        if (!remarksVal) {
          showToast('⚠️ Remarks field is MANDATORY to confirm review & filing!', 'error');
          document.getElementById('drawer-remarks-input').focus();
          return;
        }

        // Apply updates
        const oldStatus = task.status;
        task.status = state.drawerStatusSelected;
        task.remarks = remarksVal;
        task.workingFileLink = linkVal;
        task.delayReason = delayReasonVal;
        task.preparerId = prepVal || null;
        task.reviewerId = revVal || null;

        task.ackNo = ackNoVal;
        task.actualFilingDate = fileDateVal;
        task.proofFileUrl = proofUrlVal;

        const nowStr = formatDateTime(new Date());
        if (task.status === 'DOCS READY' && !task.docsReadyAt) task.docsReadyAt = nowStr;
        if (task.status === 'IN REVIEW' && !task.reviewedAt) task.reviewedAt = nowStr;
        if (task.status === 'FILED' && !task.filedAt) {
          task.filedAt = nowStr;
          task.health = 'ON TRACK';
        }

        // Delay owner recalculation
        const prepUser = state.members.find(m => m.id === task.preparerId);
        if (!task.preparerId) task.delayOwner = 'Unassigned (Prep)';
        else if (task.health === 'OVERDUE') task.delayOwner = prepUser ? prepUser.name : 'System Admin';

        addAuditLog(`<strong>${state.members[0].name}</strong> updated task status to <em>${task.status}</em> — <strong>${task.title}</strong>`);
        showToast(`Task "${task.code}" updated successfully!`, 'success');

        closeTaskDrawer();
        renderAllViews();
      });
    }

  // --- 8. Organizations View Renderer ---
  function renderOrgsView() {
    const tbody = document.getElementById('orgs-page-table-body');
    if (!tbody) return;

    let html = '';
    state.entities.forEach((ent, idx) => {
      html += `
        <tr>
          <td><strong style="color: var(--brand-navy); font-size: 13px;">${ent.name}</strong></td>
          <td><span class="code-chip">ENT-00${idx + 1}</span></td>
          <td style="color: var(--text-secondary); font-weight: 600;">27AAACA1234F1Z${idx + 1}</td>
          <td style="color: var(--text-primary); font-weight: 600;">System Admin</td>
          <td><span class="status-badge status-filed">ACTIVE</span></td>
          <td>
            <button class="btn btn-outline edit-org-row-btn" data-id="${ent.id}" style="padding: 4px 10px; height: 28px; font-size: 10px;">✏️ Rename</button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

    // Inline rename event listener
    document.querySelectorAll('.edit-org-row-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const ent = state.entities.find(e => e.id === id);
        if (!ent) return;

        const newName = prompt(`Enter new name for organization:`, ent.name);
        if (newName && newName.trim()) {
          ent.name = newName.trim();
          updateEntitySelectDropdown();
          showToast(`Renamed organization to: ${ent.name}`, 'success');
          addAuditLog(`<strong>System Admin</strong> renamed organization to <em>${ent.name}</em>`);
          renderOrgsView();
        }
      });
    });
  }

  // --- 9. Notices & Legal View Renderer ---
  function renderNoticesView() {
    const tbody = document.getElementById('notices-table-body');
    if (!tbody) return;

    let html = '';
    state.notices.forEach(n => {
      html += `
        <tr>
          <td><strong style="color: var(--brand-navy); font-size: 13px;">${n.refNo}</strong></td>
          <td style="font-weight: 600; color: var(--text-primary);">${n.dept}</td>
          <td style="color: var(--text-secondary);">${n.subject}</td>
          <td style="color: var(--text-muted);">${n.issueDate}</td>
          <td><strong style="color: #DC2626;">${n.dueDate}</strong></td>
          <td><span class="status-badge ${n.statusClass || 'status-pending'}">${n.status}</span></td>
          <td style="font-weight: 600; color: var(--text-primary);">${n.counsel}</td>
          <td><a href="${n.link}" target="_blank" style="color: var(--brand-blue); font-weight: 700; text-decoration: underline;">📄 View Notice</a></td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  function updateEntitySelectDropdown() {
    const sel = document.getElementById('global-entity-select');
    if (!sel) return;
    sel.innerHTML = state.entities.map(e => `<option value="${e.id}">${e.name}</option>`).join('') +
      `<option value="manage-orgs-action" style="font-weight: 800; color: var(--brand-blue);">⚙️ Manage Organizations...</option>`;
  }

  function renderOrgsEditModalList() {
    const container = document.getElementById('orgs-edit-list');
    if (!container) return;

    let html = '';
    state.entities.forEach((ent, idx) => {
      html += `
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="text" class="form-input org-rename-input" data-id="${ent.id}" value="${ent.name}">
          ${state.entities.length > 1 ? `<button class="btn btn-outline btn-icon-only org-delete-btn" data-id="${ent.id}" style="color: #DC2626; border-color: #FCA5A5;">🗑️</button>` : ''}
        </div>
      `;
    });
    container.innerHTML = html;

    // Delete org item inside modal
    container.querySelectorAll('.org-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        state.entities = state.entities.filter(e => e.id !== id);
        renderOrgsEditModalList();
      });
    });
  }

  // Super Admin: Manage Client Organizations Modal
    const editOrgsBtn = document.getElementById('btn-edit-orgs');
    const orgsModal = document.getElementById('modal-manage-orgs');
    const closeOrgsModal = document.getElementById('btn-close-orgs-modal');
    const saveOrgsBtn = document.getElementById('btn-save-orgs-list');
    const addNewOrgBtn = document.getElementById('btn-add-new-org');

    if (editOrgsBtn && orgsModal) {
      editOrgsBtn.addEventListener('click', () => {
        renderOrgsEditModalList();
        orgsModal.classList.add('open');
      });
    }

    if (closeOrgsModal && orgsModal) {
      closeOrgsModal.addEventListener('click', () => orgsModal.classList.remove('open'));
    }

    if (addNewOrgBtn) {
      addNewOrgBtn.addEventListener('click', () => {
        const inp = document.getElementById('new-org-name-input');
        const nameVal = inp ? inp.value.trim() : '';
        if (!nameVal) {
          showToast('Please enter a valid organization name', 'error');
          return;
        }

        state.entities.push({
          id: 'ent-' + (state.entities.length + 1),
          name: nameVal
        });
        inp.value = '';
        showToast(`Added new organization: ${nameVal}`, 'success');
        renderOrgsEditModalList();
      });
    }

    if (saveOrgsBtn) {
      saveOrgsBtn.addEventListener('click', () => {
        // Collect renamed inputs
        document.querySelectorAll('.org-rename-input').forEach(inp => {
          const id = inp.getAttribute('data-id');
          const val = inp.value.trim();
          const ent = state.entities.find(e => e.id === id);
          if (ent && val) ent.name = val;
        });

        updateEntitySelectDropdown();
        showToast('Saved Client Organization changes!', 'success');
        addAuditLog('<strong>System Admin (Super Admin)</strong> updated Client Organization names');
        orgsModal.classList.remove('open');
        renderAllViews();
      });
    }

    // Open Add Client Organization Modal from Organizations Page
    const openAddOrgBtn = document.getElementById('btn-open-add-org-modal');
    if (openAddOrgBtn && orgsModal) {
      openAddOrgBtn.addEventListener('click', () => {
        renderOrgsEditModalList();
        orgsModal.classList.add('open');
      });
    }

    // Record New Notice Button
    const addNoticeBtn = document.getElementById('btn-add-notice');
    if (addNoticeBtn) {
      addNoticeBtn.addEventListener('click', () => {
        const refNo = prompt('Enter Notice Ref No / Order No (e.g. GST-DRC-01-999):');
        if (!refNo) return;
        const dept = prompt('Enter Department / Authority (e.g. Income Tax, GST, EPFO):', 'GST Dept');
        const subject = prompt('Enter Notice Subject / Section:', 'Notice of Intimation');

        state.notices.unshift({
          refNo: refNo,
          dept: dept || 'Statutory Authority',
          subject: subject || 'Department Notice',
          issueDate: '29 Aug 2026',
          dueDate: '28 Sep 2026',
          status: 'PENDING REVIEW',
          statusClass: 'status-pending',
          counsel: 'System Admin',
          link: '#'
        });

        showToast(`Recorded new notice: ${refNo}`, 'success');
        addAuditLog(`<strong>System Admin</strong> recorded new notice — <em>${refNo}</em>`);
        renderNoticesView();
      });
    }

    // Entity Switcher Event
    const entSel = document.getElementById('global-entity-select');
    if (entSel) {
      entSel.addEventListener('change', (e) => {
        if (e.target.value === 'manage-orgs-action') {
          switchView('orgs');
          const orgsModal = document.getElementById('modal-manage-orgs');
          if (orgsModal) {
            renderOrgsEditModalList();
            orgsModal.classList.add('open');
          }
          return;
        }

        const entName = e.target.options[e.target.selectedIndex].text;
        showToast(`Switched active entity to: ${entName}`, 'success');
        addAuditLog(`<strong>System Admin</strong> switched active entity to <em>${entName}</em>`);
        renderAllViews();
      });
    }

    // --- AI Co-Pilot Interactive Chatbot Engine ---
    const aiFab = document.getElementById('btn-ai-copilot');
    const aiDrawer = document.getElementById('ai-drawer-overlay');
    const closeAiDrawer = document.getElementById('btn-close-ai-drawer');
    const aiInput = document.getElementById('ai-chat-input-text');
    const sendAiBtn = document.getElementById('btn-send-ai-chat');
    const chatContainer = document.getElementById('ai-chat-messages');

    function openAiDrawer() {
      if (aiDrawer) aiDrawer.classList.add('open');
    }

    function closeAiDrawerFunc() {
      if (aiDrawer) aiDrawer.classList.remove('open');
    }

    function sendAiMessage(userText) {
      if (!userText || !userText.trim() || !chatContainer) return;

      const cleanText = userText.trim();
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Append User Message
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user-msg';
      userBubble.innerHTML = `<div class="chat-sender"><span>YOU</span><span style="font-size:9px; opacity:0.8;">${nowTime}</span></div>${cleanText}`;
      chatContainer.appendChild(userBubble);

      if (aiInput) aiInput.value = '';
      chatContainer.scrollTop = chatContainer.scrollHeight;

      // Simulate AI Processing Typing Indicator
      const aiTyping = document.createElement('div');
      aiTyping.className = 'chat-bubble ai-msg';
      aiTyping.innerHTML = `<div class="chat-sender"><span>✨ CONTETRA AI CO-PILOT</span><span style="font-size:9px; opacity:0.7;">${nowTime}</span></div><em>Analyzing Indian Tax & Legal statutes...</em>`;
      chatContainer.appendChild(aiTyping);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      setTimeout(() => {
        let aiReply = '';
        const lower = cleanText.toLowerCase();

        if (lower.includes('234e') || lower.includes('tds fee') || lower.includes('tds late')) {
          aiReply = `Under <strong>Section 234E of the Income Tax Act, 1961</strong>:<br>&bull; <strong>Late Fee</strong>: ₹200 for every day of default.<br>&bull; <strong>Applicability</strong>: Delayed filing of Form 24Q, 26Q, 27Q.<br>&bull; <strong>Cap</strong>: Total late fee cannot exceed the total TDS amount deductible.<br>&bull; <strong>Interest</strong>: Additional 1.5% per month interest under Sec 201(1A) applies on delayed remittance.`;
        } else if (lower.includes('47') || lower.includes('gst late') || lower.includes('gst fee')) {
          aiReply = `Under <strong>Section 47 of the CGST Act, 2017</strong>:<br>&bull; <strong>Regular Returns (GSTR-3B / GSTR-1)</strong>: ₹50/day (₹25 CGST + ₹25 SGST).<br>&bull; <strong>Nil Returns</strong>: ₹20/day (₹10 CGST + ₹10 SGST).<br>&bull; <strong>Capping</strong>: Max ₹500 cap for Nil returns; ₹10,000 for regular returns.<br>&bull; <strong>Interest</strong>: 18% p.a. interest under Sec 50(1) on net tax liability.`;
        } else if (lower.includes('checklist') || lower.includes('gstr-3b') || lower.includes('audit')) {
          aiReply = `<strong>Contetra Monthly Compliance Audit Checklist:</strong><br>1. <strong>GSTR-2B vs Books</strong>: Reconcile eligible Input Tax Credit before filing GSTR-3B.<br>2. <strong>TDS Payment (ITNS 281)</strong>: Remit TDS deducted in previous month by the 7th.<br>3. <strong>PF ECR & ESIC</strong>: Deposit employee statutory contributions by the 15th.<br>4. <strong>GSTR-1 Turnover</strong>: Ensure turnover matches Sales Register & E-Way bills.`;
        } else if (lower.includes('drc-01') || lower.includes('notice') || lower.includes('reply')) {
          aiReply = `<strong>GST DRC-01 Reply Guidelines:</strong><br>1. <strong>Verification</strong>: Cross-check ITC claims against supplier filings in GSTR-2A/2B.<br>2. <strong>Documentation</strong>: Prepare Tax Invoices, Bank Payment Proofs & E-Way Bills.<br>3. <strong>Legal Basis</strong>: Cite Supreme Court/High Court precedents on Section 16(2) compliance.<br>4. <strong>Submission</strong>: Submit written reply within 30 days of notice issuance.`;
        } else {
          aiReply = `<strong>Contetra AI Statutory Analysis:</strong><br>I have processed your query regarding <em>"${cleanText}"</em>.<br><br>&bull; For <strong>ANDRITZ GROUP</strong>, statutory due dates for this month are monitored live in your Compliance Command Centre.<br>&bull; Ensure all preparation lead times (7-10 days prior) are respected to allow mandatory reviewer sign-off before statutory deadlines.`;
        }

        aiTyping.innerHTML = `<div class="chat-sender"><span>✨ CONTETRA AI CO-PILOT</span><span style="font-size:9px; opacity:0.7;">${nowTime}</span></div>${aiReply}`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 500);
    }

    if (aiFab) {
      aiFab.addEventListener('click', openAiDrawer);
    }

    if (closeAiDrawer) {
      closeAiDrawer.addEventListener('click', closeAiDrawerFunc);
    }

    if (aiDrawer) {
      aiDrawer.addEventListener('click', (e) => {
        if (e.target === aiDrawer) closeAiDrawerFunc();
      });
    }

    if (sendAiBtn && aiInput) {
      sendAiBtn.addEventListener('click', () => sendAiMessage(aiInput.value));
      aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendAiMessage(aiInput.value);
      });
    }

    // Prompt Chips Click
    document.querySelectorAll('.ai-prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        if (prompt) sendAiMessage(prompt);
      });
    });

    // Drawer Close Button & Backdrop
    const closeBtn = document.getElementById('drawer-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeTaskDrawer);

    const backdrop = document.getElementById('task-drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeTaskDrawer();
      });
    }

    // Add Member Modal
    const addMemberBtn = document.getElementById('btn-add-member-modal');
    const memberModal = document.getElementById('modal-add-member');
    const closeMemberModal = document.getElementById('btn-close-member-modal');
    const saveMemberBtn = document.getElementById('btn-save-member');

    if (addMemberBtn && memberModal) {
      addMemberBtn.addEventListener('click', () => memberModal.classList.add('open'));
    }
    if (closeMemberModal && memberModal) {
      closeMemberModal.addEventListener('click', () => memberModal.classList.remove('open'));
    }
    if (saveMemberBtn) {
      saveMemberBtn.addEventListener('click', () => {
        const name = document.getElementById('new-member-name').value.trim();
        const email = document.getElementById('new-member-email').value.trim();
        const role = document.getElementById('new-member-role').value;

        if (!name || !email) {
          showToast('Please enter member name and email', 'error');
          return;
        }

        state.members.push({
          id: 'usr-' + (state.members.length + 1),
          name: name,
          email: email,
          role: role,
          status: 'ACTIVE',
          added: '29 Aug 2026'
        });

        showToast(`Added ${name} to Compliance Team`, 'success');
        memberModal.classList.remove('open');
        renderTeamView();
      });
    }

    // Global Export CSV Mock Action
    document.querySelectorAll('.btn-export-csv').forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Exporting Compliance Register CSV...', 'success');
      });
    });

    // Sign Out Button Handler
    const signOutBtn = document.getElementById('btn-sign-out');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', () => {
        const loginView = document.getElementById('view-login');
        if (loginView) loginView.classList.add('active');
        showToast('Signed out of COMPLYGRID session', 'success');
      });
    }

    // Make openTaskDrawer available globally for calendar onclicks
    window.openTaskDrawer = openTaskDrawer;
  }

  // --- Login Screen Global Helper Handlers ---
  window.fillDemoLogin = function(email, password) {
    const emailInp = document.getElementById('login-input-email');
    const passInp = document.getElementById('login-input-password');
    if (emailInp) emailInp.value = email;
    if (passInp) passInp.value = password;
    showToast(`Loaded demo credentials for ${email.includes('admin') ? 'Super Admin' : 'Manager'}`, 'success');
  };

  window.handleLoginSubmit = function() {
    const email = document.getElementById('login-input-email')?.value.trim();
    const pass = document.getElementById('login-input-password')?.value.trim();

    if (!email || !pass) {
      showToast('Please enter work email and password', 'error');
      return;
    }

    const loginView = document.getElementById('view-login');
    if (loginView) {
      loginView.classList.remove('active');
    }

    const roleName = email.includes('admin') ? 'System Admin (Super Admin)' : 'Priya Menon (Manager)';
    showToast(`🔓 Authenticated as ${roleName}. Welcome to COMPLYGRID!`, 'success');
    addAuditLog(`<strong>${roleName}</strong> logged into COMPLYGRID platform`);
    switchView('dashboard');
  };

  // --- Velocity-Stretched Fluid Google Antigravity "Ring Particles" Engine ---
  function initAntigravityParticles() {
    const canvas = document.getElementById('login-particle-canvas') || document.getElementById('global-particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Mouse spring force tracking
    const mouse = { x: -1000, y: -1000, active: false };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Glowing Google Antigravity Spectrum on Dark Black Background
    function getAntigravityColor(angle) {
      let norm = (angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      if (norm < Math.PI * 0.70) return '#0047FF';       // Electric Royal Blue
      if (norm < Math.PI * 1.20) return '#38BDF8';       // Glowing Sky Blue
      if (norm < Math.PI * 1.65) return '#A855F7';       // Vibrant Violet Purple
      if (norm < Math.PI * 1.88) return '#F43F5E';       // Glowing Rose Pink
      return '#F97316';                                // Warm Coral Orange (~6%)
    }

    const particleCount = 320;
    const particles = [];

    const tiltAngle = -0.32; // -18 deg tilt
    const cosTilt = Math.cos(tiltAngle);
    const sinTilt = Math.sin(tiltAngle);

    for (let i = 0; i < particleCount; i++) {
      const ringIndex = Math.floor(Math.random() * 10);
      const ringRadius = 120 + ringIndex * 95 + Math.random() * 35;
      const angle = Math.random() * Math.PI * 2;
      const orbitalSpeed = (0.0003 + Math.random() * 0.0007) * (ringIndex % 2 === 0 ? 1 : -1);

      const isDash = Math.random() > 0.20;
      const dashLength = isDash ? (4 + Math.random() * 7) : 0;
      const thickness = 1.6 + Math.random() * 1.0;
      const alpha = 0.60 + Math.random() * 0.35;

      const rx = Math.cos(angle) * ringRadius;
      const ry = Math.sin(angle) * (ringRadius * 0.58);
      const initX = (rx * cosTilt - ry * sinTilt);
      const initY = (rx * sinTilt + ry * cosTilt);

      particles.push({
        ringRadius,
        angle,
        orbitalSpeed,
        isDash,
        dashLength,
        thickness,
        alpha,
        x: initX,
        y: initY,
        vx: 0,
        vy: 0,
        stiffness: 0.03 + Math.random() * 0.02,
        damping: 0.86 + Math.random() * 0.04,
        driftPhase: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    function animate() {
      time += 0.014;
      const w = canvas.width || window.innerWidth;
      const h = canvas.height || window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.48;
      const cy = h * 0.46;

      particles.forEach((p) => {
        p.angle += p.orbitalSpeed;

        const r = p.ringRadius + Math.sin(time + p.driftPhase) * 6;

        // Parametric Tilted Ellipse Target
        const rx = Math.cos(p.angle) * r;
        const ry = Math.sin(p.angle) * (r * 0.58);
        const targetX = cx + (rx * cosTilt - ry * sinTilt);
        const targetY = cy + (rx * sinTilt + ry * cosTilt);

        // Spring Force
        let ax = (targetX - (cx + p.x)) * p.stiffness;
        let ay = (targetY - (cy + p.y)) * p.stiffness;

        // Cursor Force Field
        if (mouse.active) {
          const dx = (cx + p.x) - mouse.x;
          const dy = (cy + p.y) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 4.5;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        }

        p.vx = (p.vx + ax) * p.damping;
        p.vy = (p.vy + ay) * p.damping;

        p.x += p.vx;
        p.y += p.vy;

        const renderX = cx + p.x;
        const renderY = cy + p.y;

        const color = getAntigravityColor(p.angle);

        ctx.globalAlpha = p.alpha;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        if (p.isDash) {
          // Dynamic Velocity + Tangent Stretch Vector
          const trx = -Math.sin(p.angle) * (p.dashLength / 2);
          const try_ = 0.58 * Math.cos(p.angle) * (p.dashLength / 2);

          const tanX = trx * cosTilt - try_ * sinTilt;
          const tanY = trx * sinTilt + try_ * cosTilt;

          ctx.lineWidth = p.thickness;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(renderX - tanX, renderY - tanY);
          ctx.lineTo(renderX + tanX, renderY + tanY);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(renderX, renderY, p.thickness * 0.95, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      requestAnimationFrame(animate);
    }

    animate();
  }

  // Make initAntigravityParticles available globally
  window.initAntigravityParticles = initAntigravityParticles;

  // --- Boot App ---
  document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    initAntigravityParticles();
    // Default Calendar Generation for 2026-08 to 2027-03
    generateCalendarTasks('2026-08', '2027-03');
    // Pre-render all views while keeping full-screen Antigravity Login Page active on load
    renderAllViews();
  });

  // Execute particle animation immediately if DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initAntigravityParticles, 100);
  }

})();
