/*
 * TaraPara! clickable prototype. Plain JavaScript (no modules, no fetch)
 * so it runs from file:// and GitHub Pages alike. Data lives in data.js.
 */
(function () {
  'use strict';

  var D = window.TP_DATA;
  if (!D) {
    document.body.insertAdjacentHTML('beforeend', '<p class="noscript">data.js did not load. Keep index.html, data.js, app.js and styles.css in the same folder.</p>');
    return;
  }

  /* =========================================================
   * Helpers
   * ======================================================= */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const r2 = v => Math.round(v * 100) / 100;
  const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  const peso = n => '₱' + (Math.round(n * 100) % 100 ? n.toFixed(2) : String(Math.round(n)));
  const fareText = (f, disc, sep) => {
    const m = disc ? 0.8 : 1, a = f[0] * m, b = f[1] * m;
    return a === b ? peso(a) : peso(a) + (sep || '–') + peso(b);
  };
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transfersText = n => n === 0 ? 'No transfers' : n + (n === 1 ? ' transfer' : ' transfers');

  /* =========================================================
   * Icons (inline SVG, 24×24, stroke = currentColor)
   * ======================================================= */
  const ICONS = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    back: '<path d="M15 18l-6-6 6-6"/>',
    chev: '<path d="M9 18l6-6-6-6"/>',
    swap: '<path d="M8 4v16M8 4L5 7M8 4l3 3M16 20V4M16 20l-3-3M16 20l3-3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    fit: '<path d="M4 9V5a1 1 0 011-1h4M15 4h4a1 1 0 011 1v4M20 15v4a1 1 0 01-1 1h-4M9 20H5a1 1 0 01-1-1v-4"/><circle cx="12" cy="12" r="2.5"/>',
    shield: '<path d="M12 3l7 3v5.5c0 4.6-3 8-7 9.5-4-1.5-7-4.9-7-9.5V6z"/><path d="M9 12l2 2 4-4.5"/>',
    flag: '<path d="M5 21V4M5 4h11.5l-2 4 2 4H5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    checkc: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.2 9.5"/>',
    bell: '<path d="M6 9a6 6 0 1112 0c0 6.5 2.5 8 2.5 8h-17S6 15.5 6 9z"/><path d="M10 20.5a2.2 2.2 0 004 0"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 018 0V11"/>',
    star: '<path class="f" d="M12 2.8l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L3 9.4l6.2-.9z"/>',
    bookmark: '<path d="M6.5 3.5h11v17l-5.5-3.8-5.5 3.8z"/>',
    bookmarkf: '<path class="f" d="M6.5 3.5h11v17l-5.5-3.8-5.5 3.8z"/>',
    wifioff: '<path d="M3 3l18 18M8.5 16.4a5 5 0 016.2-.6M5 12.6a10 10 0 014.6-2.5M19 12.6a10 10 0 00-2.2-1.5M2 8.9a15 15 0 014.5-2.8M22 8.9A15 15 0 0011.2 5"/><circle class="f" cx="12" cy="19.5" r="1.3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    pin: '<path d="M12 21.5s7-6.2 7-11.8a7 7 0 10-14 0c0 5.6 7 11.8 7 11.8z"/><circle cx="12" cy="9.7" r="2.5"/>',
    road: '<path d="M8 3L5 21M16 3l3 18M12 4v3M12 10.5v3M12 17v3"/>',
    chart: '<path d="M4 20V11M10 20V5M16 20v-6M3 20h18"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    mega: '<path d="M3 10.5v3a1 1 0 001 1h2.5L12 19V5L6.5 9.5H4a1 1 0 00-1 1z"/><path d="M15.5 9a4 4 0 010 6M18.5 6a8 8 0 010 12"/>',
    map: '<path d="M9 4L3 6.2v13.8l6-2.2 6 2.2 6-2.2V4l-6 2.2z"/><path d="M9 4v13.8M15 6.2V20"/>',
    route: '<circle cx="6" cy="18.5" r="2.2"/><circle cx="18" cy="5.5" r="2.2"/><path d="M8.2 18.5H16a3.2 3.2 0 000-6.4H8a3.2 3.2 0 010-6.4h7.8"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.1"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5.2A1.2 1.2 0 0110.2 4h3.6A1.2 1.2 0 0115 5.2V7M3 13h18"/>',
    msg: '<path d="M20.5 12a8.5 8.5 0 01-12.4 7.5L3.5 20.5l1.1-4.3A8.5 8.5 0 1120.5 12z"/>',
    thumb: '<path d="M7 11v9H4v-9zM7 11l4-7.5a2 2 0 012.5 2.3L12.7 10H19a2 2 0 012 2.3l-1.2 6A2 2 0 0117.8 20H7"/>',
    reset: '<path d="M4 4v6h6"/><path d="M4.6 15a8 8 0 101.9-8.3L4 10"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
    noads: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 3l18 18"/>',
    download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 20h14"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
    wallet: '<path d="M4 7.5A2.5 2.5 0 016.5 5H18v3"/><rect x="4" y="8" width="16" height="11" rx="2"/><circle class="f" cx="16" cy="13.5" r="1.3"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    flagdone: '<path d="M5 21V4M5 4h13l-2.5 4L18 12H5"/>',
    walk: '<circle cx="13" cy="4.3" r="1.9"/><path d="M9.5 21l2.3-6.2 2.7 2.7V21M7.5 12.2l2.7-3.7 3.8.8 2.5 3.7M11.2 8.9l-1.2 5.9"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/>',
    jeep: '<path d="M2.5 16V9.3A1.8 1.8 0 014.3 7.5h11.6l3.2 3.4h1.2a1.2 1.2 0 011.2 1.2V16z"/><path d="M2.5 12h18.7M6.5 7.5V12M10.5 7.5V12M14.5 7.5V12M4.5 5.2h9"/><circle class="f" cx="6.5" cy="16.6" r="1.9"/><circle class="f" cx="16.5" cy="16.6" r="1.9"/>',
    bus: '<rect x="4.5" y="3" width="15" height="15" rx="2.5"/><path d="M4.5 11h15M4.5 7h15M8 18v2.5M16 18v2.5"/><circle class="f" cx="8" cy="14.5" r="1.1"/><circle class="f" cx="16" cy="14.5" r="1.1"/>',
    rail: '<rect x="5.5" y="3" width="13" height="13.5" rx="3"/><path d="M5.5 10h13M9 20.5l1.8-4M15 20.5l-1.8-4M7.5 20.5h9"/><circle class="f" cx="9" cy="13.2" r="1"/><circle class="f" cx="15" cy="13.2" r="1"/>',
    uv: '<path d="M2.5 16v-6l3.3-4h10.4l3.6 4.3h.9a1 1 0 011 1V16z"/><path d="M2.5 11h19M8.2 6v5M13.5 6v5"/><circle class="f" cx="7" cy="16.6" r="1.9"/><circle class="f" cx="17" cy="16.6" r="1.9"/>',
    trike: '<path d="M3 16.5V10h8.5v6.5M3 10l1.4-3.8h6.2l.9 3.8"/><path d="M11.5 13h4.2l2.8 3.5M15 8.2h3l-2 4.8"/><circle class="f" cx="6.5" cy="17.3" r="2"/><circle class="f" cx="18.5" cy="17.3" r="2"/>',
    p2p: '<path d="M3 16.5V7a3 3 0 013-3h10.5a3 3 0 013 3v9.5z"/><path d="M3 11h16.5M15.5 4v7"/><path class="f" d="M9 5.4l.8 1.6 1.8.3-1.3 1.2.3 1.8L9 9.4l-1.6.9.3-1.8-1.3-1.2 1.8-.3z"/><circle class="f" cx="7" cy="17.3" r="1.9"/><circle class="f" cx="16" cy="17.3" r="1.9"/>'
  };
  const icon = (n, cls) => '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || '') + '</svg>';
  const modeBadge = (m, cls) => '<span class="mb mb-' + m + ' ' + (cls || '') + '">' + icon(m) + '</span>';

  /* =========================================================
   * Data preparation
   * ======================================================= */
  const N = D.nodes;
  const R = {};
  D.routes.forEach((r, i) => { r.idx = i; r.color = D.modes[r.mode].color; R[r.id] = r; });
  const HUBS = Object.keys(N).filter(k => N[k].hub);
  const LINE_ROUTES = D.routes.filter(r => r.path && !r.zone);
  const ZONES = D.routes.filter(r => r.zone);
  const ek = (a, b) => (a < b ? a + '|' + b : b + '|' + a);

  const EDGE_ROUTES = {};
  LINE_ROUTES.forEach(r => {
    r.edges = [];
    for (let i = 0; i < r.path.length - 1; i++) {
      const k = ek(r.path[i], r.path[i + 1]);
      r.edges.push(k);
      (EDGE_ROUTES[k] = EDGE_ROUTES[k] || []).push(r.id);
    }
  });

  // Roads are split into inspectable segments at hubs and major junctions.
  const ROAD = {};
  const SEGS = [];
  D.roads.forEach(rd => {
    ROAD[rd.id] = rd;
    let cur = [rd.nodes[0]];
    for (let i = 1; i < rd.nodes.length; i++) {
      const n = rd.nodes[i];
      cur.push(n);
      if ((N[n].hub || N[n].j) && i < rd.nodes.length - 1) { addSeg(rd, cur); cur = [n]; }
    }
    if (cur.length > 1) addSeg(rd, cur);
  });
  function addSeg(rd, nodes) {
    const edges = [];
    for (let i = 0; i < nodes.length - 1; i++) edges.push(ek(nodes[i], nodes[i + 1]));
    SEGS.push({ id: 's' + SEGS.length, road: rd.id, nodes: nodes.slice(), edges });
  }
  const SEG = {};
  SEGS.forEach(s => { SEG[s.id] = s; });
  const DEMO_SEG = (SEGS.find(s => s.road === 'edsa' && s.nodes[0] === 'edsataft') || SEGS[0]).id;

  const modeRank = m => D.modeOrder.indexOf(m);
  const sortRoutes = ids => ids.slice().sort((a, b) => (modeRank(R[a].mode) - modeRank(R[b].mode)) || (R[a].idx - R[b].idx));
  function segRoutes(sg) {
    const set = {};
    sg.edges.forEach(k => (EDGE_ROUTES[k] || []).forEach(id => { set[id] = 1; }));
    return sortRoutes(Object.keys(set));
  }
  function hubRoutes(h) {
    return sortRoutes(D.routes.filter(r => (r.stops || []).some(s => s.node === h) || (r.near && r.near.indexOf(h) >= 0)).map(r => r.id));
  }
  const segName = sg => (N[sg.nodes[0]].name || '') + ' ↔ ' + (N[sg.nodes[sg.nodes.length - 1]].name || '');

  const pts = ids => ids.map(id => N[id]);
  const dOf = P => P.map((p, i) => (i ? 'L' : 'M') + r2(p.x) + ' ' + r2(p.y)).join('');
  const lineD = arr => arr.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join('');
  const polyD = arr => lineD(arr) + 'Z';

  /* =========================================================
   * State
   * ======================================================= */
  function initialState() {
    return {
      welcome: true,
      page: null,               // 'premium' | 'operators'
      menu: false,
      modal: null,              // {kind:'report'|'checkout', ...}
      view: 'browse',           // 'browse' | 'plan'
      sheet: null,              // {kind, ...}
      sheetBig: false,
      filters: { jeep: true, bus: true, rail: true, uv: true, trike: true, p2p: true },
      plan: { from: null, to: null, active: null, q: '', key: null, opt: null },
      premium: false,
      offline: false,
      saved: [],
      discount: false,
      para: {},
      confirmed: {},
      reports: {},
      advisories: [],
      advDraft: null,
      advRoute: 'p2p-naia-ortigas',
      advPosting: false,
      opEditing: null,
      opEdits: {},
      pulseSave: false
    };
  }
  let S = initialState();
  const timers = { toast: 0, notif: 0, para: 0, pay: 0, adv: 0, fit: 0, tip: 0 };
  const clearTimers = () => Object.keys(timers).forEach(k => { clearTimeout(timers[k]); timers[k] = 0; });

  const curTrip = () => (S.plan.key ? D.trips[S.plan.key] : null);
  const curOpt = () => { const t = curTrip(); return t && S.plan.opt != null ? t.options[S.plan.opt] : null; };
  const isSaved = (key, opt) => S.saved.some(s => s.key === key && s.opt === opt);

  /* =========================================================
   * Elements
   * ======================================================= */
  const app = $('#app');
  const phone = $('#phone');
  const svg = $('#map');
  const mapScreen = $('#map-screen');
  const EL = {
    topui: $('#topui'), suggest: $('#suggest'), ctrls: $('#map-ctrls'), note: $('#map-note'),
    ad: $('#ad'), sheet: $('#sheet'), banner: $('#offline-banner'), menu: $('#menu'),
    menuScrim: $('#menu-scrim'), modal: $('#modal'), modalScrim: $('#modal-scrim'),
    premium: $('#premium'), operators: $('#operators'), welcome: $('#welcome'),
    toast: $('#toast'), notif: $('#notif'), sbIcons: $('#sb-icons'),
    panel: $('#demo-panel'), demoBtn: $('#demo-btn')
  };

  /* =========================================================
   * Map: static build
   * ======================================================= */
  const MAP = { view: { x: 0, y: 0, k: 0.6 }, lastK: null, fitK: 0.6, kMin: 0.2, kMax: 5, anim: 0, cs: [], routeEls: {}, filterSig: '', fitSig: '' };
  const ALL_BOUNDS = { x: 4, y: 86, w: 574, h: 646 };
  const LANE_PX = 3.4;
  const LABEL_POS = {
    r: { dx: 11, dy: 4, a: 'start' }, l: { dx: -11, dy: 4, a: 'end' },
    t: { dx: 0, dy: -12, a: 'middle' }, b: { dx: 0, dy: 21, a: 'middle' },
    tr: { dx: 8, dy: -10, a: 'start' }, tl: { dx: -8, dy: -10, a: 'end' },
    br: { dx: 8, dy: 18, a: 'start' }, bl: { dx: -8, dy: 18, a: 'end' }
  };

  const cs = (x, y, rot, inner, cls, attrs) =>
    '<g class="cs ' + (cls || '') + '" data-x="' + x + '" data-y="' + y + '" data-r="' + (rot || 0) + '" ' + (attrs || '') + '>' + inner + '</g>';

  function shieldSvg(x, y, rd) {
    const w = Math.round(rd.name.length * 6.1 + 12);
    return cs(x, y, 0, '<rect x="' + (-w / 2) + '" y="-8.5" width="' + w + '" height="17" rx="4.5"/><text text-anchor="middle" y="3.4">' + esc(rd.name) + '</text>', 'shield' + (rd.id === 'edsa' ? ' edsa' : ''));
  }

  function hubSvg(id) {
    const n = N[id], lp = LABEL_POS[n.lab] || LABEL_POS.r;
    const name = n.mapName || n.name, sub = n.mapName ? n.mapSub : n.sub;
    const up = sub && (n.lab === 't' || n.lab === 'tl' || n.lab === 'tr');
    let t = '<text class="hub-name" x="' + lp.dx + '" y="' + (up ? lp.dy - 11 : lp.dy) + '" text-anchor="' + lp.a + '">' + esc(name) + '</text>';
    if (sub) t += '<text class="hub-sub" x="' + lp.dx + '" y="' + (up ? lp.dy : lp.dy + 12) + '" text-anchor="' + lp.a + '">' + esc(sub) + '</text>';
    return cs(n.x, n.y, 0,
      '<circle class="hit-c" r="16"/><circle class="ring" r="11.5"/><circle class="dot" r="6.5"/><g class="lbl">' + t + '</g>',
      'hub', 'data-hub="' + id + '" tabindex="0" role="button" aria-label="' + esc(n.name + ', ' + n.city + '. Show routes') + '"');
  }

  function buildMap() {
    let s = '<defs><pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
      '<rect width="7" height="7" fill="rgba(255,183,3,.20)"/><rect width="2.2" height="7" fill="rgba(224,161,0,.32)"/></pattern></defs>';
    s += '<rect class="land" x="-900" y="-900" width="2400" height="2800"/>';
    s += '<g class="cities">' + D.cities.map(c => '<path class="city" d="' + polyD(c.poly) + '" fill="' + c.tint + '"/>').join('') + '</g>';
    s += '<path class="water" d="' + polyD(D.water) + '"/>';
    s += '<path class="river" d="' + lineD(D.river) + '"/>';
    s += '<g id="g-zones">' + ZONES.map(r => '<path class="zone" data-zone="' + r.id + '" d="' + polyD(r.zone) + '"><title>' + esc(r.name) + '</title></path>').join('') + '</g>';
    s += '<g id="g-roads">' +
      D.roads.map(rd => '<path class="road-case ' + rd.cls + '" d="' + dOf(pts(rd.nodes)) + '"/>').join('') +
      D.roads.map(rd => '<path class="road-fill ' + rd.cls + '" d="' + dOf(pts(rd.nodes)) + '"/>').join('') + '</g>';
    s += '<g id="g-hl"></g><g id="g-routes"></g><g id="g-trip"></g>';
    s += '<g id="g-hits">' + SEGS.map(sg => '<path class="hit" data-seg="' + sg.id + '" d="' + dOf(pts(sg.nodes)) + '"><title>' + esc(ROAD[sg.road].name) + '</title></path>').join('') + '</g>';

    let L = '';
    D.cities.forEach(c => { L += cs(c.at[0], c.at[1], 0, '<text class="city-name" text-anchor="middle" y="4">' + esc(c.name) + '</text>'); });
    L += cs(28, 250, -90, '<text class="water-name" text-anchor="middle">MANILA BAY</text>');
    L += cs(262, 200, 18, '<text class="road-minor" text-anchor="middle">Pasig River</text>');
    D.roads.forEach(rd => {
      if (rd.label) L += cs(rd.label[0], rd.label[1], rd.label[2], '<text class="road-minor" text-anchor="middle" y="3">' + esc(rd.name) + '</text>');
    });
    ZONES.forEach(r => { L += cs(r.label[0], r.label[1], 0, '<text class="zone-name" data-zl="' + r.id + '" text-anchor="middle">' + esc(r.name) + '</text>'); });
    D.roads.forEach(rd => { (rd.shields || []).forEach(p => { L += shieldSvg(p[0], p[1], rd); }); });
    s += '<g id="g-labels" class="lbl">' + L + '</g>';

    let H = '';
    ZONES.forEach(r => {
      const n = N[r.stops[0].node];
      H += cs(n.x, n.y, 0, '<circle class="mk-toda" r="9.5"/><g class="ic" transform="translate(-6.6 -6.8) scale(.55)" style="color:#0E1A2B;stroke-width:2.4">' + ICONS.trike + '</g><circle r="16" fill="transparent"/>',
        'todamk', 'data-zone="' + r.id + '" role="button" tabindex="0" aria-label="' + esc(r.name + ' tricycle zone') + '"');
    });
    H += HUBS.map(hubSvg).join('');
    s += '<g id="g-hubs">' + H + '</g>';
    s += '<g id="g-marks" class="lbl"></g>';
    svg.innerHTML = s;

    const g = $('#g-routes', svg);
    g.innerHTML = LINE_ROUTES.map(r => '<g class="rt" data-route="' + r.id + '"><path class="base" stroke="' + r.color + '"/>' + (r.mode === 'rail' ? '<path class="rail-dash"/>' : '') + '</g>').join('');
    LINE_ROUTES.forEach(r => {
      const el = g.querySelector('[data-route="' + r.id + '"]');
      MAP.routeEls[r.id] = { g: el, paths: $$('path', el) };
    });
    MAP.cs = $$('.cs', svg);
  }

  /* ---------- Route lanes: parallel routes are offset like a transit diagram ---------- */
  function intersect(p1, p2, p3, p4) {
    const d = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
    if (Math.abs(d) < 1e-6) return null;
    const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / d;
    return { x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y) };
  }
  function offsetPath(r, edgeVis, lane) {
    const segs = [];
    for (let i = 0; i < r.path.length - 1; i++) {
      const a = N[r.path[i]], b = N[r.path[i + 1]];
      const list = edgeVis[r.edges[i]] || [r.id];
      let off = (list.indexOf(r.id) - (list.length - 1) / 2) * lane;
      if (r.path[i] > r.path[i + 1]) off = -off;
      const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len;
      segs.push([{ x: a.x + nx * off, y: a.y + ny * off }, { x: b.x + nx * off, y: b.y + ny * off }]);
    }
    const out = [segs[0][0]];
    for (let i = 0; i < segs.length - 1; i++) {
      const s1 = segs[i], s2 = segs[i + 1];
      const X = intersect(s1[0], s1[1], s2[0], s2[1]);
      if (X && Math.hypot(X.x - s1[1].x, X.y - s1[1].y) < lane * 8) out.push(X);
      else out.push(s1[1], s2[0]);
    }
    out.push(segs[segs.length - 1][1]);
    return out;
  }
  function drawRoutes() {
    const lane = LANE_PX / MAP.view.k;
    const edgeVis = {};
    LINE_ROUTES.forEach(r => {
      if (!S.filters[r.mode]) return;
      r.edges.forEach(k => { (edgeVis[k] = edgeVis[k] || []).push(r.id); });
    });
    LINE_ROUTES.forEach(r => {
      const el = MAP.routeEls[r.id];
      if (!S.filters[r.mode]) { el.g.classList.add('off'); return; }
      el.g.classList.remove('off');
      const d = dOf(offsetPath(r, edgeVis, lane));
      el.paths.forEach(p => p.setAttribute('d', d));
    });
  }

  /* ---------- View (pan / zoom) ---------- */
  function mapSize() { return { w: mapScreen.clientWidth || 390, h: mapScreen.clientHeight || 800 }; }
  function updateCS() {
    const s = r2(1 / MAP.view.k * 1000) / 1000;
    MAP.cs.forEach(g => {
      const rot = +g.getAttribute('data-r');
      g.setAttribute('transform', 'translate(' + g.getAttribute('data-x') + ' ' + g.getAttribute('data-y') + ')' + (rot ? ' rotate(' + rot + ')' : '') + ' scale(' + s + ')');
    });
  }
  function applyView() {
    const sz = mapSize(), v = MAP.view;
    svg.setAttribute('viewBox', r2(v.x) + ' ' + r2(v.y) + ' ' + r2(sz.w / v.k) + ' ' + r2(sz.h / v.k));
    if (v.k !== MAP.lastK) {
      MAP.lastK = v.k;
      svg.style.setProperty('--k', v.k);
      updateCS();
      drawRoutes();
      svg.classList.toggle('zoomed', v.k > MAP.fitK * 1.45);
    }
  }
  function clampView(v) {
    const sz = mapSize();
    const cx = clamp(v.x + sz.w / 2 / v.k, -80, 660), cy = clamp(v.y + sz.h / 2 / v.k, -80, 940);
    return { k: v.k, x: cx - sz.w / 2 / v.k, y: cy - sz.h / 2 / v.k };
  }
  function go(t, animate) {
    cancelAnimationFrame(MAP.anim);
    if (!animate || reduceMotion()) { MAP.view = t; applyView(); return; }
    const sz = mapSize(), f = Object.assign({}, MAP.view);
    const fc = { x: f.x + sz.w / 2 / f.k, y: f.y + sz.h / 2 / f.k };
    const tc = { x: t.x + sz.w / 2 / t.k, y: t.y + sz.h / 2 / t.k };
    const t0 = performance.now(), dur = 460;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const k = f.k * Math.pow(t.k / f.k, e);
      const cx = fc.x + (tc.x - fc.x) * e, cy = fc.y + (tc.y - fc.y) * e;
      MAP.view = p >= 1 ? t : { k, x: cx - sz.w / 2 / k, y: cy - sz.h / 2 / k };
      applyView();
      if (p < 1) MAP.anim = requestAnimationFrame(step);
    };
    MAP.anim = requestAnimationFrame(step);
  }
  function insets() {
    let t = 16, b = 36;
    if (!EL.topui.classList.contains('hide')) t = EL.topui.offsetTop + EL.topui.offsetHeight + 14;
    else if (S.offline) t = 56;
    if (EL.sheet.classList.contains('open')) b = EL.sheet.offsetHeight + 16;
    else if (!EL.ad.hidden) b = EL.ad.offsetHeight + 34;
    return { t, b, l: 18, r: 18 };
  }
  function bbox(P, pad, min) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    P.forEach(p => { x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); });
    let w = x1 - x0, h = y1 - y0;
    if (w < min) { x0 -= (min - w) / 2; w = min; }
    if (h < min) { y0 -= (min - h) / 2; h = min; }
    return { x: x0 - pad, y: y0 - pad, w: w + pad * 2, h: h + pad * 2 };
  }
  function fitTo(b, animate) {
    const sz = mapSize(), ins = insets();
    const aw = Math.max(80, sz.w - ins.l - ins.r), ah = Math.max(70, sz.h - ins.t - ins.b);
    const k = clamp(Math.min(aw / b.w, ah / b.h), MAP.kMin, MAP.kMax);
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    go({ k, x: cx - (ins.l + aw / 2) / k, y: cy - (ins.t + ah / 2) / k }, animate);
  }
  function zoomBy(f) {
    const sz = mapSize(), ins = insets();
    const sx = sz.w / 2, sy = (ins.t + (sz.h - ins.b)) / 2;
    const v = MAP.view, k = clamp(v.k * f, MAP.kMin, MAP.kMax);
    const wx = v.x + sx / v.k, wy = v.y + sy / v.k;
    go(clampView({ k, x: wx - sx / k, y: wy - sy / k }), true);
  }
  function tripPoints(opt) {
    const P = [];
    opt.legs.forEach(l => { if (l.path) l.path.forEach(id => P.push(N[id])); });
    return P;
  }
  function contextBounds() {
    const sh = S.sheet;
    if (!sh || sh.kind === 'saved' || sh.kind === 'about' || sh.kind === 'nodata') return ALL_BOUNDS;
    if (sh.kind === 'road') return bbox(pts(SEG[sh.seg].nodes), 36, 150);
    if (sh.kind === 'hub') return bbox([N[sh.hub]], 0, 250);
    if (sh.kind === 'options') {
      const t = curTrip(); let P = [];
      t.options.forEach(o => { P = P.concat(tripPoints(o)); });
      return bbox(P, 26, 150);
    }
    if (sh.kind === 'steps') { const o = curOpt(); return o ? bbox(tripPoints(o), 26, 140) : ALL_BOUNDS; }
    if (sh.kind === 'detail') {
      const r = R[sh.route];
      return r.zone ? bbox(r.zone.map(p => ({ x: p[0], y: p[1] })), 24, 150) : bbox(pts(r.path), 24, 140);
    }
    return ALL_BOUNDS;
  }
  function fitContext(animate) { fitTo(contextBounds(), animate); }

  /* ---------- Map input ---------- */
  function initMapInput() {
    const P = new Map();
    let st = null;
    const scaleOf = () => { const r = mapScreen.getBoundingClientRect(); return { r, s: (r.width / (mapScreen.clientWidth || 1)) || 1 }; };
    const toLocal = (cx, cy) => { const o = scaleOf(); return { x: (cx - o.r.left) / o.s, y: (cy - o.r.top) / o.s }; };

    svg.addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      P.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { svg.setPointerCapture(e.pointerId); } catch (err) { /* pointer already released */ }
      cancelAnimationFrame(MAP.anim);
      if (P.size === 1) {
        st = { mode: 'pan', x: e.clientX, y: e.clientY, v: Object.assign({}, MAP.view), target: e.target, moved: false };
      } else if (P.size === 2) {
        const a = Array.from(P.values());
        st = { mode: 'pinch', d: Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y) || 1, c: toLocal((a[0].x + a[1].x) / 2, (a[0].y + a[1].y) / 2), v: Object.assign({}, MAP.view), moved: true };
      }
    });
    svg.addEventListener('pointermove', e => {
      if (!P.has(e.pointerId) || !st) return;
      P.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (st.mode === 'pan' && P.size === 1) {
        const s = scaleOf().s;
        const dx = (e.clientX - st.x) / s, dy = (e.clientY - st.y) / s;
        if (!st.moved && Math.hypot(dx, dy) < 6) return;
        st.moved = true;
        svg.classList.add('dragging');
        MAP.view = clampView({ k: st.v.k, x: st.v.x - dx / st.v.k, y: st.v.y - dy / st.v.k });
        applyView();
      } else if (st.mode === 'pinch' && P.size >= 2) {
        const a = Array.from(P.values());
        const d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
        const k = clamp(st.v.k * d / st.d, MAP.kMin, MAP.kMax);
        const c = toLocal((a[0].x + a[1].x) / 2, (a[0].y + a[1].y) / 2);
        const wx = st.v.x + st.c.x / st.v.k, wy = st.v.y + st.c.y / st.v.k;
        MAP.view = clampView({ k, x: wx - c.x / k, y: wy - c.y / k });
        applyView();
      }
    });
    const end = e => {
      if (!P.has(e.pointerId)) return;
      P.delete(e.pointerId);
      if (P.size === 0) {
        svg.classList.remove('dragging');
        if (st && st.mode === 'pan' && !st.moved && e.type === 'pointerup') onMapTap(st.target);
        st = null;
      } else if (P.size === 1) {
        const p = Array.from(P.values())[0];
        st = { mode: 'pan', x: p.x, y: p.y, v: Object.assign({}, MAP.view), moved: true };
      }
    };
    svg.addEventListener('pointerup', end);
    svg.addEventListener('pointercancel', end);
    svg.addEventListener('wheel', e => {
      e.preventDefault();
      cancelAnimationFrame(MAP.anim);
      const c = toLocal(e.clientX, e.clientY);
      const f = Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0016));
      const v = MAP.view, k = clamp(v.k * f, MAP.kMin, MAP.kMax);
      const wx = v.x + c.x / v.k, wy = v.y + c.y / v.k;
      MAP.view = clampView({ k, x: wx - c.x / k, y: wy - c.y / k });
      applyView();
    }, { passive: false });
    svg.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('[data-hub],[data-zone]')) {
        e.preventDefault();
        onMapTap(e.target);
      }
    });
  }

  function onMapTap(t) {
    if (!t || !t.closest) return;
    if (S.view === 'plan' || (S.sheet && S.sheet.kind === 'detail')) return;
    const hub = t.closest('[data-hub]'), seg = t.closest('[data-seg]'), zone = t.closest('[data-zone]');
    if (hub) return openHub(hub.getAttribute('data-hub'));
    if (seg) return openRoad(seg.getAttribute('data-seg'));
    if (zone) return openDetail(zone.getAttribute('data-zone'), S.sheet);
    if (S.sheet && (S.sheet.kind === 'road' || S.sheet.kind === 'hub' || S.sheet.kind === 'about')) closeSheet();
  }

  /* ---------- Map state (highlights, trip overlay, markers) ---------- */
  function markerOrigin(n) { return cs(n.x, n.y, 0, '<circle class="mk-origin" r="8.5"/><circle class="mk-origin-in" r="3"/>'); }
  function markerDest(n, label) {
    return cs(n.x, n.y, 0, '<path class="mk-dest" d="M0 0c-5-6-9.5-10.5-9.5-16a9.5 9.5 0 0119 0c0 5.5-4.5 10-9.5 16z"/><circle r="3.6" cy="-16" fill="#fff"/>' +
      (label ? '<text class="mk-label" x="12" y="-12">' + esc(label) + '</text>' : ''));
  }
  function renderMapState() {
    const sh = S.sheet;
    const kind = sh ? sh.kind : null;
    svg.classList.toggle('no-tap', S.view === 'plan' || kind === 'detail');
    svg.classList.toggle('ctx', kind === 'options' || kind === 'steps' || kind === 'detail');

    const fsig = JSON.stringify(S.filters);
    if (fsig !== MAP.filterSig) { MAP.filterSig = fsig; drawRoutes(); }

    let keep = null, focus = null, dimAll = false, faintAll = false, zoneHl = null;
    if (kind === 'road') keep = segRoutes(SEG[sh.seg]);
    else if (kind === 'hub') keep = hubRoutes(sh.hub);
    else if (kind === 'detail') { keep = [sh.route]; focus = sh.route; if (R[sh.route].zone) zoneHl = sh.route; }
    else if (kind === 'steps') { dimAll = true; const o = curOpt(); if (o) o.legs.forEach(l => { if (l.t === 'trike') zoneHl = l.route; }); }
    else if (kind === 'options') faintAll = true;
    else if (S.offline) dimAll = true;

    LINE_ROUTES.forEach(r => {
      const g = MAP.routeEls[r.id].g;
      g.classList.toggle('dim', dimAll || (keep ? keep.indexOf(r.id) < 0 : false));
      g.classList.toggle('faint', faintAll);
      g.classList.toggle('focus', focus === r.id);
    });
    $$('.zone', svg).forEach(z => {
      const id = z.getAttribute('data-zone');
      z.classList.toggle('off', !S.filters.trike);
      z.classList.toggle('hl', zoneHl === id);
      z.classList.toggle('dim', !!(dimAll || faintAll || keep) && zoneHl !== id && !(keep && keep.indexOf(id) >= 0));
    });
    $$('.todamk', svg).forEach(m => { m.style.display = S.filters.trike ? '' : 'none'; });
    $$('[data-zl]', svg).forEach(t => t.classList.toggle('show', kind === 'detail' && t.getAttribute('data-zl') === zoneHl));
    $$('.hub', svg).forEach(h => h.classList.toggle('sel', kind === 'hub' && h.getAttribute('data-hub') === sh.hub));

    // Road highlight
    const hl = $('#g-hl', svg);
    if (kind === 'road') {
      const sg = SEG[sh.seg];
      hl.innerHTML = '<path class="hl-road" d="' + dOf(pts(ROAD[sg.road].nodes)) + '"/><path class="hl-seg" d="' + dOf(pts(sg.nodes)) + '"/>';
    } else hl.innerHTML = '';

    // Trip overlay + markers
    const trip = $('#g-trip', svg), marks = $('#g-marks', svg);
    let th = '', mh = '';
    if (kind === 'steps' && curOpt()) {
      const t = curTrip(), o = curOpt();
      o.legs.forEach(l => {
        if (!l.path || l.path.length < 2) return;
        th += l.t === 'walk' ? '<path class="trip-walk" d="' + dOf(pts(l.path)) + '"/>' : '<path class="trip-case" d="' + dOf(pts(l.path)) + '"/>';
      });
      let first = true;
      o.legs.forEach(l => {
        if (l.t === 'walk' || !l.path) return;
        const r = R[l.route], d = dOf(pts(l.path));
        th += '<path class="trip-leg" stroke="' + r.color + '" d="' + d + '"/>';
        if (r.mode === 'rail') th += '<path class="trip-rail-dash" d="' + d + '"/>';
        if (!first) { const n = N[l.path[0]]; mh += cs(n.x, n.y, 0, '<circle class="mk-xfer" r="5.5"/>'); }
        first = false;
      });
      mh += markerOrigin(N[t.from]) + markerDest(N[t.end]);
    } else if (kind === 'options' && curTrip()) {
      const t = curTrip();
      mh += markerOrigin(N[t.from]) + markerDest(N[t.end]);
    } else if (kind === 'detail') {
      const r = R[sh.route];
      (r.stops || []).forEach(sp => {
        const n = N[sp.node];
        const label = sp.tag === 'Loading point' ? 'Sakay dito' : sp.tag === 'Drop-off' ? 'Baba' : '';
        mh += cs(n.x, n.y, 0, '<circle class="mk-stop" r="5" stroke="' + r.color + '"/>' + (label && !r.zone ? '<text class="mk-label" x="9" y="-7">' + label + '</text>' : ''));
      });
    }
    trip.innerHTML = th;
    marks.innerHTML = mh;
    MAP.cs = $$('.cs', svg);
    updateCS();
  }

  /* =========================================================
   * Illustrations (loading-point "photos", ad, art)
   * ======================================================= */
  function people(x, y, n, c) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const px = x + i * 15, py = y + (i % 2) * 2;
      s += '<circle cx="' + px + '" cy="' + py + '" r="5.2" fill="' + (c || '#5A6475') + '"/><rect x="' + (px - 6) + '" y="' + (py + 7) + '" width="12" height="24" rx="6" fill="' + (c || '#5A6475') + '"/>';
    }
    return s;
  }
  function vehicle(type, x, y, color) {
    const wheel = (cx, cy, r) => '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#0E1A2B"/><circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.4) + '" fill="#9AA5B4"/>';
    let s = '', win = '';
    if (type === 'trike') {
      return '<rect x="' + x + '" y="' + (y + 8) + '" width="44" height="30" rx="6" fill="' + color + '"/><rect x="' + (x + 5) + '" y="' + (y + 13) + '" width="16" height="11" rx="2" fill="#FFF6DB"/>' +
        '<rect x="' + (x - 2) + '" y="' + (y + 3) + '" width="48" height="7" rx="3" fill="#0E1A2B"/><path d="M' + (x + 44) + ' ' + (y + 24) + 'h18l6 12" stroke="#0E1A2B" stroke-width="4" fill="none"/>' +
        wheel(x + 10, y + 40, 7) + wheel(x + 64, y + 40, 7);
    }
    const w = type === 'bus' || type === 'p2p' ? 160 : type === 'uv' ? 112 : 150;
    const h = type === 'bus' || type === 'p2p' ? 64 : type === 'uv' ? 46 : 52;
    const n = type === 'uv' ? 3 : 5;
    for (let i = 0; i < n; i++) win += '<rect x="' + (x + 10 + i * ((w - 36) / n)) + '" y="' + (y + 9) + '" width="' + ((w - 36) / n - 5) + '" height="' + (h * 0.34) + '" rx="3" fill="#E7F3F6"/>';
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (type === 'uv' ? 12 : 8) + '" fill="' + color + '"/>';
    if (type === 'bay') s += '<rect x="' + (x + 8) + '" y="' + (y - 9) + '" width="' + (w - 16) + '" height="11" rx="3" fill="#0E1A2B"/><text x="' + (x + w / 2) + '" y="' + (y - 1) + '" text-anchor="middle" font-size="8" font-weight="900" fill="#FFB703" font-family="Segoe UI, Arial">PITX ⇄ AYALA</text>';
    if (type === 'p2p') s += '<rect x="' + x + '" y="' + (y + h - 22) + '" width="' + w + '" height="6" fill="#FFB703"/>';
    s += win + '<rect x="' + (x + w - 20) + '" y="' + (y + 8) + '" width="14" height="' + (h - 22) + '" rx="3" fill="#E7F3F6" opacity=".9"/>';
    s += wheel(x + 26, y + h, 10) + wheel(x + w - 30, y + h, 10);
    return s;
  }
  function photoSVG(type, label, r) {
    const L = esc(label || '');
    const color = r ? r.color : '#12806F';
    const T = (x, y, size, fill, txt, anchor) => '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" font-size="' + size + '" font-weight="900" fill="' + fill + '" font-family="Segoe UI, Arial, sans-serif" letter-spacing=".04em">' + txt + '</text>';
    let s = '<svg viewBox="0 0 320 160" role="img" aria-label="Illustration of the loading point: ' + L + '">';
    if (type === 'station') {
      s += '<rect width="320" height="160" fill="#DCE8F1"/><rect y="132" width="320" height="28" fill="#B8C3CF"/>';
      s += '<rect x="24" y="18" width="272" height="28" rx="7" fill="#0E1A2B"/>';
      for (let i = 0; i < 12; i++) s += '<rect x="' + (34 + i * 21.5) + '" y="24" width="15" height="10" rx="2" fill="#CFE6F2"/>';
      s += '<rect x="24" y="38" width="272" height="3" fill="#FFB703"/><rect y="46" width="320" height="16" fill="#2A3A52"/>';
      s += '<rect x="52" y="62" width="14" height="70" fill="#3B4B63"/><rect x="262" y="62" width="14" height="70" fill="#3B4B63"/>';
      s += '<polygon points="96,132 150,62 172,62 118,132" fill="#8FA0B4"/>';
      for (let i = 1; i < 8; i++) s += '<line x1="' + (96 + i * 6.75) + '" y1="' + (132 - i * 8.75) + '" x2="' + (118 + i * 6.75) + '" y2="' + (132 - i * 8.75) + '" stroke="#6F8297" stroke-width="1.5"/>';
      s += '<rect x="186" y="72" width="124" height="30" rx="5" fill="#0E1A2B"/>' + T(248, 92, 11, '#fff', L);
      s += people(196, 104, 4, '#44526A');
    } else if (type === 'curb') {
      s += '<rect width="320" height="160" fill="#E4E9EF"/>';
      s += '<rect x="8" y="22" width="140" height="98" fill="#F6F1E6"/><rect x="8" y="22" width="140" height="16" fill="#12806F"/>' + T(78, 34, 10, '#fff', 'PHARMACY');
      s += '<rect x="20" y="52" width="50" height="60" fill="#CFE0E8"/><rect x="84" y="52" width="52" height="60" fill="#CFE0E8"/>';
      s += '<rect x="154" y="34" width="120" height="86" fill="#EDE3D2"/><rect x="154" y="34" width="120" height="14" fill="#D1495B"/>' + T(214, 45, 9, '#fff', 'BAKERY');
      s += '<rect y="118" width="320" height="12" fill="#C9D1DB"/><rect y="130" width="320" height="30" fill="#5F6B7A"/>';
      for (let i = 0; i < 8; i++) s += '<rect x="' + (i * 44 + 6) + '" y="144" width="24" height="3" fill="#E7EBF0"/>';
      s += '<rect x="286" y="52" width="4" height="68" fill="#5A6475"/><rect x="238" y="56" width="78" height="20" rx="4" fill="#12806F"/>' + T(277, 70, 9.5, '#fff', L);
      s += people(170, 88, 3, '#44526A');
    } else if (type === 'toda') {
      s += '<rect width="320" height="160" fill="#EFE9DC"/>';
      s += '<rect x="10" y="30" width="96" height="88" fill="#F8F4EC"/><rect x="10" y="30" width="96" height="14" fill="#0E7C68"/>' + T(58, 41, 8.5, '#fff', 'CONVENIENCE STORE');
      s += '<rect x="22" y="56" width="72" height="50" fill="#D7E6EA"/>';
      s += '<rect x="128" y="20" width="4" height="100" fill="#5A6475"/><rect x="112" y="16" width="120" height="26" rx="5" fill="#FFB703"/>' + T(172, 34, 11, '#0E1A2B', L);
      s += '<rect y="118" width="320" height="42" fill="#A9B3BF"/>';
      s += vehicle('trike', 144, 76, '#FFB703') + vehicle('trike', 230, 80, '#12806F');
      s += people(116, 86, 2, '#44526A');
    } else {
      // Terminal bay (jeep / UV / bus / P2P)
      const vt = type === 'uv' ? 'uv' : type === 'bus' ? 'bus' : type === 'p2p' ? 'p2p' : 'bay';
      s += '<rect width="320" height="160" fill="#E9EDF2"/><rect width="320" height="18" fill="#CDD5DF"/>';
      for (let i = 0; i < 6; i++) s += '<rect x="' + (18 + i * 54) + '" y="7" width="30" height="4" rx="2" fill="#FFFFFF"/>';
      s += '<polygon points="0,122 320,122 320,160 0,160" fill="#C3CCD7"/><rect y="120" width="320" height="4" fill="#FFB703"/>';
      s += '<rect x="30" y="18" width="20" height="104" fill="' + (vt === 'bay' ? '#FFB703' : '#B3BECB') + '"/>';
      s += '<rect x="78" y="24" width="150" height="28" rx="5" fill="#0E1A2B"/>' + T(153, 43, 13, '#FFB703', L);
      s += vehicle(vt, vt === 'uv' ? 196 : 150, vt === 'bus' || vt === 'p2p' ? 58 : 70, color);
      s += people(66, 88, 4, '#44526A');
    }
    return s + '</svg>';
  }
  const adArt = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" fill="#FFF4D6"/><path d="M14 16h20l-2.5 22a3 3 0 01-3 2.6h-9a3 3 0 01-3-2.6z" fill="#8A5A2B"/><rect x="12" y="12" width="24" height="5" rx="2" fill="#0E1A2B"/><path d="M24 12V5" stroke="#12806F" stroke-width="2.5" stroke-linecap="round"/><path d="M16.5 24h15" stroke="#FFF4D6" stroke-width="2"/></svg>';

  /* =========================================================
   * Rendering: small pieces
   * ======================================================= */
  const kindPrefix = r => (r.mode === 'p2p' ? '' : r.kind + ' · ');
  const rowTitle = r => r.mode === 'p2p' ? r.name + ' · ' + r.sub : r.name;
  const stepTitle = r => r.mode === 'rail' ? r.name + ' · ' + r.signVia : r.mode === 'bus' ? r.name : r.mode === 'p2p' ? r.name + ' · ' + r.sub : r.kind + ' · ' + r.name;
  const chipLabel = r => ({ rail: r.name, bus: r.id === 'bus-carousel' ? 'Carousel' : r.id === 'bus-bgc' ? 'BGC Bus' : 'Bus', jeep: r.kind === 'Modern jeep' ? 'Modern jeep' : 'Jeep', uv: 'UV', trike: 'Trike', p2p: 'P2P' })[r.mode];
  const signboard = r => '<span class="signboard ' + (r.mode === 'rail' ? 'rail' : r.mode === 'p2p' ? 'p2p' : '') + '">' + esc(r.sign) + '<small>' + esc(r.signVia) + '</small></span>';

  function routeRow(id) {
    const r = R[id];
    return '<li><button class="row" data-act="open-detail" data-route="' + id + '">' + modeBadge(r.mode) +
      '<span class="grow"><span class="t">' + esc(kindPrefix(r) + rowTitle(r)) + (r.partner ? ' <span class="badge badge-partner">' + icon('shield') + 'Partner</span>' : '') + '</span>' +
      '<span class="s">Verified ' + esc(r.verified) + ' · ' + esc(r.zone ? r.sub : 'Signboard: ' + r.sign) + '</span></span>' +
      '<span class="fare">' + fareText(r.fare) + '</span>' + icon('chev', 'chev') + '</button></li>';
  }

  function legChips(o) {
    const out = [];
    o.legs.forEach(l => {
      if (l.t === 'walk') out.push('<span class="leg-chip walk">' + icon('walk') + l.mins + '</span>');
      else { const r = R[l.route]; out.push('<span class="leg-chip m-' + r.mode + '">' + icon(r.mode) + esc(chipLabel(r)) + '</span>'); }
    });
    return out.join('<span class="leg-sep" aria-hidden="true">›</span>');
  }

  /* ---------- Status bar ---------- */
  function renderStatus() {
    app.classList.toggle('dark-status', S.welcome || S.page === 'premium');
    const sig = S.offline ? 'off' : 'on';
    if (EL.sbIcons.getAttribute('data-sig') === sig) return;
    EL.sbIcons.setAttribute('data-sig', sig);
    const signal = '<svg viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>';
    const wifi = S.offline
      ? '<svg viewBox="0 0 24 24" aria-label="Offline" style="fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round">' + ICONS.wifioff + '</svg>'
      : '<svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 12l2.6-3.2a4.2 4.2 0 00-5.2 0zM8 0C5 0 2.3 1.1.2 3l1.9 2.3A9.2 9.2 0 018 3.1c2.2 0 4.2.8 5.9 2.2L15.8 3A12 12 0 008 0zm0 4.6c-1.9 0-3.6.6-5 1.7l1.8 2.3A5.6 5.6 0 018 7.6c1.2 0 2.3.4 3.2 1l1.8-2.3a8.4 8.4 0 00-5-1.7z"/></svg>';
    const batt = '<svg viewBox="0 0 27 12" aria-hidden="true"><rect x=".5" y=".5" width="23" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="17" height="8" rx="1.6"/><rect x="24.6" y="4" width="1.6" height="4" rx=".8" opacity=".5"/></svg>';
    EL.sbIcons.innerHTML = signal + wifi + batt;
  }

  /* ---------- Welcome ---------- */
  function buildWelcome() {
    EL.welcome.innerHTML =
      '<svg class="wel-art" viewBox="0 0 390 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<g fill="none" stroke-width="7" stroke-linecap="round" opacity=".55">' +
      '<path d="M-30 405 C 70 385 130 345 210 348 S 350 335 430 300" stroke="#12806F"/>' +
      '<path d="M-30 470 C 90 466 150 425 240 420 S 370 405 430 392" stroke="#D1495B"/>' +
      '<path d="M-30 360 C 60 380 140 440 190 455 S 320 472 430 498" stroke="#FFB703"/>' +
      '<path d="M-30 520 C 110 515 190 482 290 472 S 400 458 430 458" stroke="#6C4AB6"/>' +
      '<path d="M-30 552 C 130 546 250 522 430 526" stroke="#64748B"/>' +
      '</g><g fill="#0E1A2B" stroke="#fff" stroke-width="3"><circle cx="210" cy="348" r="8"/><circle cx="240" cy="420" r="8"/><circle cx="190" cy="455" r="8"/><circle cx="290" cy="472" r="8"/></g>' +
      '<rect y="500" width="390" height="300" fill="url(#welfade)"/><defs><linearGradient id="welfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1A2B" stop-opacity="0"/><stop offset=".2" stop-color="#0E1A2B"/></linearGradient></defs></svg>' +
      '<div class="wel-body">' +
      '<span class="logo-mark lg" role="img" aria-label="TaraPara! logo"></span>' +
      '<span class="wordmark">Tara<span>Para</span><em>!</em></span>' +
      '<p class="wel-tag">Alam mo kung saan <span>sasakay</span>.<br>Alam mo kung saan <span>bababa</span>.</p>' +
      '<p class="wel-cities">Pasay · Makati · Taguig · Pasig · Parañaque</p>' +
      '<div class="wel-spacer"></div>' +
      '<ul class="wel-points">' +
      '<li><span class="wi">' + icon('pin') + '</span>Exact loading points, with photos</li>' +
      '<li><span class="wi">' + icon('bell') + '</span>Para alert one stop before you get off</li>' +
      '<li><span class="wi">' + icon('shield') + '</span>Fares with their legal basis, last verified</li>' +
      '</ul>' +
      '<button class="btn btn-primary btn-block wel-cta" type="button" data-act="start">Magsimula</button>' +
      '<p class="wel-fine">Prototype for the pitch. Routes, fares and times are illustrative.</p>' +
      '</div>';
  }
  function renderWelcome() {
    EL.welcome.classList.toggle('hide', !S.welcome);
    EL.welcome.inert = !S.welcome;
  }

  /* ---------- Top UI (search + chips / planner) ---------- */
  let topSig = '';
  function renderTop() {
    const hide = !!(S.sheet && S.sheet.kind === 'detail');
    EL.topui.classList.toggle('hide', hide);
    EL.topui.inert = hide;
    mapScreen.classList.toggle('is-offline', S.offline);
    const sig = [S.view, S.premium, JSON.stringify(S.filters), S.plan.from, S.plan.to].join('|');
    if (sig === topSig) { markActiveField(); return; }
    topSig = sig;
    if (S.view === 'plan') {
      const f = S.plan.from ? N[S.plan.from].name : '', t = S.plan.to ? N[S.plan.to].name : '';
      EL.topui.innerHTML =
        '<div class="planner" role="search">' +
        '<button class="icon-btn" type="button" data-act="plan-close" aria-label="Back to map">' + icon('back') + '</button>' +
        '<div class="fields">' +
        '<div class="field" data-f="from"><span class="pin-o" aria-hidden="true"></span><input id="in-from" data-field="from" type="text" autocomplete="off" spellcheck="false" placeholder="Mula saan?" aria-label="Origin" value="' + esc(f) + '">' +
        (f ? '<button class="clear" type="button" data-act="field-clear" data-field="from" aria-label="Clear origin">' + icon('close', 'ic-sm') + '</button>' : '') + '</div>' +
        '<div class="field" data-f="to"><span class="pin-d" aria-hidden="true"></span><input id="in-to" data-field="to" type="text" autocomplete="off" spellcheck="false" placeholder="Saan ka pupunta?" aria-label="Destination" value="' + esc(t) + '">' +
        (t ? '<button class="clear" type="button" data-act="field-clear" data-field="to" aria-label="Clear destination">' + icon('close', 'ic-sm') + '</button>' : '') + '</div>' +
        '</div>' +
        '<button class="icon-btn" type="button" data-act="plan-swap" aria-label="Swap origin and destination">' + icon('swap') + '</button>' +
        '</div>';
    } else {
      EL.topui.innerHTML =
        '<div class="searchbar">' +
        '<button class="icon-btn" type="button" data-act="menu-open" aria-label="Open menu">' + icon('menu') + '</button>' +
        '<button class="search-btn" type="button" data-act="plan-open">' + icon('search') + '<span>Saan ka pupunta?</span></button>' +
        '<button class="icon-btn" type="button" data-act="' + (S.premium ? 'menu-open' : 'premium-open') + '" aria-label="' + (S.premium ? 'Account (Premium)' : 'Go Premium') + '"><span class="avatar">J' + (S.premium ? '<span class="crown">' + icon('star') + '</span>' : '') + '</span></button>' +
        '</div>' +
        '<div class="chips" role="group" aria-label="Show routes by mode">' +
        D.modeOrder.map(m => '<button class="chip" type="button" data-act="filter" data-mode="' + m + '" aria-pressed="' + S.filters[m] + '">' + modeBadge(m, 'mb-sm') + esc(D.modes[m].label) + '</button>').join('') +
        '</div>';
    }
    markActiveField();
  }
  function markActiveField() {
    $$('.field', EL.topui).forEach(f => f.classList.toggle('active', f.getAttribute('data-f') === S.plan.active));
  }
  function focusField(f) {
    const el = $('#in-' + f);
    if (el) { el.focus(); try { el.select(); } catch (e) { /* not selectable */ } }
  }

  function renderSuggest() {
    const show = S.view === 'plan' && !!S.plan.active && !S.welcome;
    EL.suggest.hidden = !show;
    if (!show) return;
    EL.suggest.style.top = (EL.topui.offsetTop + EL.topui.offsetHeight + 8) + 'px';
    const q = norm(S.plan.q || '');
    const other = S.plan.active === 'from' ? S.plan.to : S.plan.from;
    let h = '';
    if (!q) {
      h += '<p class="sug-head kicker">Demo trips</p>' + D.demoTrips.map(k => {
        const t = D.trips[k];
        return '<button class="sug-item" type="button" data-act="pick-pair" data-pair="' + k + '"><span class="sug-ico demo">' + icon('route') + '</span><span><span class="t">' + esc(N[t.from].name + ' → ' + N[t.to].name) + '</span><span class="s">3 options · illustrative times and fares</span></span></button>';
      }).join('');
      h += '<p class="sug-head kicker">Hubs</p>';
    }
    const hubs = HUBS.filter(id => id !== other && (!q || norm(N[id].name + ' ' + (N[id].sub || '') + ' ' + N[id].city).indexOf(q) >= 0));
    h += hubs.map(id => '<button class="sug-item" type="button" data-act="pick-hub" data-hub="' + id + '"><span class="sug-ico">' + icon('pin') + '</span><span><span class="t">' + esc(N[id].name) + '</span><span class="s">' + esc((N[id].sub ? N[id].sub + ' · ' : '') + N[id].city) + '</span></span></button>').join('');
    if (q && !hubs.length) h += '<p class="sug-empty">Walang nahanap. Try “PITX”, “Ayala” or “BGC”.</p>';
    EL.suggest.innerHTML = h;
  }

  /* ---------- Map chrome: controls, note, ad, banner ---------- */
  function renderChrome() {
    const adOn = S.view === 'browse' && !S.sheet && !S.premium && !S.offline;
    EL.ad.hidden = !adOn;
    if (adOn && !EL.ad.innerHTML) {
      EL.ad.innerHTML = '<span class="ad-art">' + adArt + '</span><span class="ad-copy"><b><span class="ad-label">AD</span>' + esc(D.ad.brand) + '</b><span>' + esc(D.ad.line) + '</span></span>' +
        '<button class="ad-remove" type="button" data-act="premium-open">Remove ads</button>';
    }
    const ctrlOn = !S.sheet;
    EL.ctrls.classList.toggle('hide', !ctrlOn);
    EL.ctrls.style.bottom = (adOn ? 88 : 16) + 'px';
    if (!EL.ctrls.innerHTML) {
      EL.ctrls.innerHTML = '<button class="ctrl" type="button" data-act="zoom-in" aria-label="Zoom in">' + icon('plus') + '</button>' +
        '<button class="ctrl" type="button" data-act="zoom-out" aria-label="Zoom out">' + icon('minus') + '</button>' +
        '<button class="ctrl" type="button" data-act="zoom-fit" aria-label="Fit map">' + icon('fit') + '</button>';
    }
    EL.note.classList.toggle('low', !adOn);
    EL.note.classList.toggle('hide', !!S.sheet);
    EL.banner.hidden = !S.offline;
    if (S.offline && !EL.banner.innerHTML) {
      EL.banner.innerHTML = icon('wifioff') + '<span>Offline — showing saved routes</span><button type="button" data-act="offline-off">Go online</button>';
    }
  }

  /* =========================================================
   * Bottom sheet
   * ======================================================= */
  let sheetSig = '', sheetKey = '';
  function sheetSize(sh) {
    if (!sh) return 'auto';
    const def = { steps: 'mid', detail: 'full' }[sh.kind] || 'auto';
    if (!S.sheetBig) return def;
    return def === 'full' ? 'full' : def === 'mid' ? 'full' : 'tall';
  }
  function renderSheet() {
    const sh = S.sheet;
    const key = sh ? sh.kind + ':' + (sh.seg || sh.hub || sh.route || S.plan.key + '/' + S.plan.opt) : '';
    const sig = key + '|' + JSON.stringify([sh && sh.tab, S.sheetBig, S.premium, S.saved, S.para, S.discount, S.confirmed, S.reports, S.advisories, S.offline, S.pulseSave]);
    if (sig === sheetSig) return;
    sheetSig = sig;
    if (!sh) { EL.sheet.classList.remove('open'); EL.sheet.inert = true; sheetKey = ''; return; }
    const oldBody = $('.sheet-body', EL.sheet);
    const keepScroll = key === sheetKey && oldBody ? oldBody.scrollTop : 0;
    sheetKey = key;
    EL.sheet.setAttribute('data-size', sheetSize(sh));
    EL.sheet.innerHTML = '<div class="sheet-handle" data-handle="1" role="button" tabindex="0" aria-label="Resize sheet"></div>' + (SHEETS[sh.kind] || (() => ''))(sh);
    EL.sheet.inert = false;
    EL.sheet.classList.add('open');
    const nb = $('.sheet-body', EL.sheet);
    if (nb && keepScroll) nb.scrollTop = keepScroll;
  }

  const closeBtn = act => '<button class="icon-btn" type="button" data-act="' + (act || 'sheet-close') + '" aria-label="Close">' + icon('close') + '</button>';

  const SHEETS = {
    road(sh) {
      const sg = SEG[sh.seg], rd = ROAD[sg.road], list = segRoutes(sg);
      return '<div class="sheet-head"><span class="mb mb-lg" style="background:var(--yellow);color:var(--ink)">' + icon('road') + '</span>' +
        '<div class="grow"><p class="kicker">Road Inspector · ' + esc(rd.name) + '</p><h2 class="sheet-title">This road · ' + list.length + ' route' + (list.length === 1 ? '' : 's') + '</h2>' +
        '<p class="sheet-sub">' + esc(rd.name + ' · ' + segName(sg)) + '</p></div>' + closeBtn() + '</div>' +
        '<div class="sheet-body">' +
        (rd.national ? '<div class="note">' + icon('ban') + '<span><b>Bawal ang trike sa ' + esc(rd.name) + '.</b> Tricycles can’t use national roads; look for TODA zones on side streets.</span></div>' : '') +
        (list.length ? '<ul class="rows">' + list.map(routeRow).join('') + '</ul>' : '<p class="muted">Walang public route dito sa demo data.</p>') +
        '</div>';
    },
    hub(sh) {
      const n = N[sh.hub], list = hubRoutes(sh.hub);
      return '<div class="sheet-head"><span class="mb mb-lg" style="background:var(--ink)">' + icon('pin') + '</span>' +
        '<div class="grow"><p class="kicker">Hub · ' + esc(n.city) + '</p><h2 class="sheet-title">' + esc(n.name) + (n.sub ? ' <span class="muted" style="font-weight:700">' + esc(n.sub) + '</span>' : '') + '</h2>' +
        '<p class="sheet-sub">' + list.length + ' routes stop here</p></div>' + closeBtn() + '</div>' +
        '<div class="sheet-body"><div class="hub-actions">' +
        '<button class="btn btn-ghost" type="button" data-act="hub-from" data-hub="' + sh.hub + '">' + icon('route') + 'Mula dito</button>' +
        '<button class="btn btn-primary" type="button" data-act="hub-to" data-hub="' + sh.hub + '">' + icon('pin') + 'Papunta dito</button></div>' +
        '<ul class="rows">' + list.map(routeRow).join('') + '</ul></div>';
    },
    options() {
      const t = curTrip();
      return '<div class="sheet-head"><div class="grow"><p class="kicker">Route Planner</p><h2 class="sheet-title">' + esc(N[t.from].name + ' → ' + N[t.to].name) + '</h2>' +
        '<p class="sheet-sub">' + t.options.length + ' options · tap one to see Sakay / Baba steps</p></div></div>' +
        '<div class="sheet-body">' + t.options.map((o, i) =>
          '<button class="opt" type="button" data-act="opt" data-i="' + i + '" aria-label="' + esc(o.label + ', ' + o.mins + ' minutes, ' + o.fare + ' pesos, ' + transfersText(o.transfers)) + '">' +
          '<span class="opt-top"><span class="opt-tag tone-' + o.tone + '">' + esc(o.label) + '</span><span class="opt-mins">' + o.mins + '<small>min</small></span></span>' +
          '<span class="opt-meta"><b>' + peso(o.fare) + '</b> · ' + transfersText(o.transfers) + '</span>' +
          '<span class="legs">' + legChips(o) + '</span></button>').join('') +
        '<p class="opt-foot">' + icon('shield') + 'Every leg verified in the last 60 days · times assume a weekday, 9 AM</p></div>';
    },
    nodata() {
      return '<div class="sheet-head"><div class="grow"><p class="kicker">Route Planner</p><h2 class="sheet-title">Wala pang demo data dito</h2>' +
        '<p class="sheet-sub">This prototype covers three sample trips.</p></div></div>' +
        '<div class="sheet-body"><div class="demo-pairs">' + D.demoTrips.map(k => { const t = D.trips[k]; return '<button class="btn btn-ghost" type="button" data-act="pick-pair" data-pair="' + k + '">' + esc(N[t.from].name + ' → ' + N[t.to].name) + '</button>'; }).join('') + '</div></div>';
    },
    steps() {
      const t = curTrip(), o = curOpt();
      if (!o) return '';
      const saved = isSaved(S.plan.key, S.plan.opt);
      const save = S.premium
        ? '<button class="btn btn-sm btn-ghost save-btn' + (S.pulseSave ? ' pulse' : '') + '" type="button" data-act="save-trip" aria-pressed="' + saved + '">' + icon(saved ? 'bookmarkf' : 'bookmark', 'ic-sm') + (saved ? 'Saved' : 'Save') + '</button>'
        : '';
      let h = '<div class="sheet-head"><button class="icon-btn" type="button" data-act="steps-back" aria-label="Back to options">' + icon('back') + '</button>' +
        '<div class="grow"><p class="kicker"><span class="opt-tag tone-' + o.tone + '">' + esc(o.label) + '</span></p><h2 class="sheet-title" style="margin-top:4px">' + esc(N[t.from].name + ' → ' + N[t.to].name) + '</h2>' +
        '<p class="sheet-sub">' + o.mins + ' min · ' + peso(o.fare) + ' · ' + transfersText(o.transfers) + '</p></div>' + save + '</div>';
      h += '<div class="sheet-body">';
      if (!S.premium) h += '<button class="save-lock" type="button" data-act="premium-open">' + icon('lock', 'ic-sm') + 'Save this trip and use it offline · Premium</button>';
      if (S.offline) h += '<div class="note slate">' + icon('wifioff') + '<span>Offline. This saved trip works without data.</span></div>';
      h += '<div class="steps">';
      o.legs.forEach((l, i) => {
        if (l.t === 'walk') h += '<div class="walk-row">' + modeBadge('walk') + '<span>' + esc('Lakad ' + l.mins + ' min · ' + l.text) + '</span></div>';
        else if (l.t === 'ride') h += sakayCard(l) + babaCard(l, S.plan.key + '/' + S.plan.opt + '/' + i);
        else if (l.t === 'trike') h += trikeCard(l);
      });
      h += '<div class="arrive"><span class="mb">' + icon('flagdone') + '</span><span>Dating ka na! · ' + esc(t.endName) + '<br><span class="small" style="font-weight:700">Total ' + o.mins + ' min · ' + peso(o.fare) + '</span></span></div>';
      h += '</div></div>';
      return h;
    },
    detail: detailSheet,
    saved() {
      return '<div class="sheet-head"><span class="mb mb-lg" style="background:var(--teal)">' + icon('bookmarkf') + '</span><div class="grow"><p class="kicker">Premium</p><h2 class="sheet-title">Saved routes</h2>' +
        '<p class="sheet-sub">' + (S.offline ? 'Offline — these still open with no data' : 'Available offline') + '</p></div>' + (S.offline ? '' : closeBtn()) + '</div>' +
        '<div class="sheet-body">' + savedList() + '</div>';
    },
    about() {
      return '<div class="sheet-head"><span class="mb mb-lg" style="background:var(--ink)">' + icon('info') + '</span><div class="grow"><p class="kicker">About</p><h2 class="sheet-title">This is a prototype</h2></div>' + closeBtn() + '</div>' +
        '<div class="sheet-body"><p style="margin-top:0;line-height:1.5">TaraPara! shows where to ride, where to get off, and what to pay, in Pasay, Makati, Taguig, Pasig and Parañaque.</p>' +
        '<div class="note">' + icon('info') + '<span><b>Prototype · illustrative data.</b> Routes, fares, times, operators and comments are examples for the pitch. Nothing here is real-time.</span></div>' +
        '<p class="muted small" style="line-height:1.5">The map is a schematic diagram, not to scale. Sinag P2P is a fictional partner.</p></div>';
    }
  };

  function savedList() {
    if (!S.saved.length) {
      return '<div class="note slate">' + icon('bookmark') + '<span>Wala ka pang saved routes. Plan a trip, then tap <b>Save</b>.</span></div>' +
        (S.offline ? '' : '<button class="btn btn-ghost btn-block" type="button" data-act="plan-open">Plan a trip</button>');
    }
    return '<ul class="rows">' + S.saved.map(s => {
      const t = D.trips[s.key], o = t.options[s.opt];
      return '<li><button class="row" type="button" data-act="open-saved" data-key="' + s.key + '" data-opt="' + s.opt + '">' +
        '<span class="mb" style="background:var(--teal)">' + icon('bookmarkf') + '</span><span class="grow"><span class="t">' + esc(N[t.from].name + ' → ' + N[t.to].name) + '</span>' +
        '<span class="s">' + esc(o.label + ' · ' + o.mins + ' min · ' + peso(o.fare)) + '</span><span class="legs" style="margin-top:6px">' + legChips(o) + '</span></span>' + icon('chev', 'chev') + '</button></li>';
    }).join('') + '</ul>';
  }

  function sakayCard(l) {
    const r = R[l.route], sk = l.sakay;
    return '<article class="step"><div class="step-top">' + modeBadge(r.mode) + '<div class="grow"><span class="step-tag sakay">SAKAY</span><p class="step-title">' + esc(stepTitle(r)) + '</p></div><span class="step-fare">' + peso(l.fare) + '</span></div>' +
      '<div class="photo">' + photoSVG(sk.photo, sk.photoLabel, r) + '<span class="cap">Loading point · ' + esc(sk.place) + '</span><span class="ph-tag">Illustration</span></div>' +
      '<dl class="kv"><dt>Sakay dito</dt><dd>' + esc(sk.place + '. ' + sk.detail) + '</dd>' +
      '<dt>Signboard</dt><dd>' + signboard(r) + '</dd>' +
      '<dt>Fare</dt><dd>' + peso(l.fare) + ' regular · ' + peso(l.fare * 0.8) + ' student/senior/PWD<br><span class="muted small">Fare basis: ' + esc(r.basis) + '</span></dd>' +
      '<dt>Ride</dt><dd>' + l.mins + ' min · ' + esc(r.freq) + '</dd></dl>' +
      '<div class="row-actions"><button class="link-btn" type="button" data-act="open-detail" data-route="' + r.id + '">Tingnan ang detalye' + icon('chev', 'ic-sm') + '</button>' +
      '<span class="badge ' + (r.partner ? 'badge-partner' : 'badge-verified') + '">' + icon('shield') + (r.partner ? 'Verified Partner' : 'Verified ' + esc(r.verified)) + '</span></div></article>';
  }
  function babaCard(l, key) {
    const bb = l.baba, on = !!S.para[key];
    return '<article class="step"><div class="step-top"><span class="mb" style="background:var(--red)">' + icon('pin') + '</span><div class="grow"><span class="step-tag baba">BABA</span><p class="step-title">Baba sa ' + esc(bb.place) + '</p></div></div>' +
      '<p><b>Landmark:</b> ' + esc(bb.landmark) + '. Sabihin: “Para po!”</p>' +
      '<div class="para-row">' + icon('bell') + '<div class="grow"><b>Para alert: 1 stop before</b>We’ll buzz you after ' + esc(bb.before) + '.</div>' +
      '<button class="switch" type="button" role="switch" aria-checked="' + on + '" aria-label="Para alert for ' + esc(bb.place) + '" data-act="para" data-k="' + key + '" data-place="' + esc(bb.place) + '" data-before="' + esc(bb.before) + '"></button></div></article>';
  }
  function trikeCard(l) {
    const r = R[l.route];
    return '<article class="step"><div class="step-top">' + modeBadge('trike') + '<div class="grow"><span class="step-tag trike">TRIKE · LAST LEG</span><p class="step-title">' + esc(r.name + ' · ' + r.signVia) + '</p></div><span class="step-fare">' + peso(l.fare) + '</span></div>' +
      '<div class="photo">' + photoSVG('toda', l.photoLabel || r.sign, r) + '<span class="cap">TODA line · ' + esc(l.from.split(' · ')[0]) + '</span><span class="ph-tag">Illustration</span></div>' +
      '<dl class="kv"><dt>Sakay dito</dt><dd>' + esc(l.from) + '</dd>' +
      '<dt>TODA zone</dt><dd>' + esc(r.name) + ', ' + esc(r.signVia) + ' · shaded yellow on the map</dd>' +
      '<dt>Fare</dt><dd>' + peso(l.fare) + ' per passenger · fare per city ordinance<br><span class="muted small">' + esc(r.basis) + '</span></dd>' +
      '<dt>Ride</dt><dd>' + l.mins + ' min · Sabihin ang address; ibababa ka sa tapat mismo.</dd></dl>' +
      '<div class="row-actions"><button class="link-btn" type="button" data-act="open-detail" data-route="' + r.id + '">Tingnan ang TODA zone' + icon('chev', 'ic-sm') + '</button>' +
      '<span class="badge badge-verified">' + icon('shield') + 'Verified ' + esc(r.verified) + '</span></div></article>';
  }

  function detailSheet(sh) {
    const r = R[sh.route], tab = sh.tab || 'details';
    const confirmed = !!S.confirmed[r.id], reported = S.reports[r.id];
    const kindLabel = r.mode === 'p2p' ? r.name + ' · P2P bus' : r.kind;
    const title = r.mode === 'p2p' ? r.sub : r.name;
    const comments = D.comments[r.id] || D.comments._default;
    const advs = S.advisories.filter(a => a.route === r.id);
    let h = '<div class="sheet-head"><button class="icon-btn" type="button" data-act="detail-back" aria-label="Back">' + icon('back') + '</button>' +
      '<div class="grow detail-top">' + modeBadge(r.mode, 'mb-lg') + '<div style="min-width:0"><div class="detail-kind">' + esc(kindLabel) + '</div><h2 class="sheet-title">' + esc(title) + '</h2>' +
      (r.mode !== 'p2p' ? '<p class="sheet-sub" style="margin-top:1px">' + esc(r.sub) + '</p>' : '') + '</div></div></div>';
    h += '<div class="sheet-body">';
    h += '<div class="badges" style="margin-top:0"><span class="badge badge-verified">' + icon('shield') + 'Verified ' + esc(r.verified) + '</span>' +
      (r.partner ? '<span class="badge badge-partner">' + icon('shield') + 'Verified Partner</span>' : '') +
      '<span class="badge badge-muted">' + icon('checkc') + (r.confirms + (confirmed ? 1 : 0)) + ' confirmations this month</span>' +
      (reported ? '<span class="badge badge-warn">' + icon('flag') + 'You reported: ' + esc(reported) + '</span>' : '') + '</div>';
    advs.forEach(a => { h += '<div class="adv-item" style="margin-top:12px">' + icon('mega') + '<span><b>Advisory from ' + esc(D.operator.name) + ' · ' + esc(a.when) + '</b><br>' + esc(a.text) + '</span></div>'; });
    h += '<div class="tabs" role="tablist">' +
      '<button class="tab" type="button" role="tab" aria-selected="' + (tab === 'details') + '" data-act="tab" data-tab="details">Details</button>' +
      '<button class="tab" type="button" role="tab" aria-selected="' + (tab === 'comments') + '" data-act="tab" data-tab="comments">Comments (' + comments.length + ')</button></div>';
    if (tab === 'details') {
      h += '<div style="margin-bottom:12px">' + signboard(r) + '</div>';
      h += '<div class="fare-card"><p class="kicker">Fare' + (S.discount ? ' · 20% discount' : '') + '</p><div class="fare-big">' + fareText(r.fare, S.discount, ' – ') + '</div>' +
        '<div class="fare-basis">Fare basis: <b>' + esc(r.basis) + '</b></div><div class="fare-basis">' + esc(r.fareNote) + '</div>' +
        '<div class="disc-row"><div class="grow">Student / Senior / PWD<span>20% discount, show a valid ID</span></div>' +
        '<button class="switch" type="button" role="switch" aria-checked="' + S.discount + '" aria-label="Apply 20% student, senior or PWD discount" data-act="discount"></button></div></div>';
      h += '<div class="facts"><div class="fact"><span>' + (r.zone ? 'Service' : 'Every') + '</span><b>' + esc(r.freq) + '</b></div><div class="fact"><span>Hours</span><b>' + esc(r.hours) + '</b></div>' +
        '<div class="fact" style="grid-column:1/-1"><span>Operator</span><b>' + esc(r.operator) + '</b></div></div>';
      h += '<p class="sec-title">' + (r.zone ? 'Loading points' : 'Stops') + '</p><ul class="stops" style="--rc:' + (r.mode === 'trike' ? '#E0A100' : r.color) + '">';
      (r.stops || []).forEach(sp => {
        const tag = sp.tag ? '<span class="stop-tag' + (sp.tag === 'Drop-off' ? ' off' : '') + '">' + esc(sp.tag) + '</span>' : '';
        h += '<li class="' + (sp.tag ? 'key' : '') + '"><div class="n">' + esc(sp.name) + tag + '</div>' + (sp.note ? '<div class="d">' + esc(sp.note) + '</div>' : '') +
          (sp.photo ? '<div class="thumb">' + photoSVG(sp.photo, 'BAY 5', r) + '</div>' : '') + '</li>';
      });
      h += '</ul>';
      h += '<div class="trust">' + icon('shield') + '<span><b>Last verified ' + esc(r.verified) + '</b> by a route steward ride-check. Routes stay Verified with a steward check within 30 days or 3 rider confirmations.</span></div>';
    } else {
      const colors = ['#12806F', '#6C4AB6', '#D1495B'];
      comments.forEach((c, i) => {
        h += '<div class="cmt"><span class="av" style="background:' + colors[i % 3] + '">' + esc(c.who.charAt(0)) + '</span><div><div><span class="who">' + esc(c.who) + '</span><span class="when">' + esc(c.when) + '</span></div>' +
          '<p>' + esc(c.text) + '</p><span class="up">' + icon('thumb') + c.up + ' found this helpful</span></div></div>';
      });
      h += '<div class="cmt-input"><label for="cmt-box">' + icon('msg', 'ic-sm') + 'Write a comment <span class="badge badge-soon">Coming soon</span></label>' +
        '<div class="box"><input id="cmt-box" type="text" disabled placeholder="Coming soon: Comments & Forums launch in Year 2"><button class="btn btn-ghost" type="button" disabled>Post</button></div>' +
        '<p class="fine" style="text-align:left">Preview only. Comments open after moderation is in place.</p></div>';
    }
    h += '</div>';
    h += '<div class="sheet-foot">' +
      '<button class="btn ' + (confirmed ? 'btn-teal' : 'btn-ink') + '" style="flex:1" type="button" data-act="confirm" ' + (confirmed ? 'disabled' : '') + '>' + icon(confirmed ? 'check' : 'thumb') + (confirmed ? 'Confirmed' : 'Confirm') + '</button>' +
      '<button class="btn btn-line" style="flex:1" type="button" data-act="report">' + icon('flag') + 'Report</button></div>';
    return h;
  }

  /* =========================================================
   * Menu, pages, modal
   * ======================================================= */
  let menuSig = '';
  function renderMenu() {
    EL.menu.hidden = false;
    EL.menu.classList.toggle('open', S.menu);
    EL.menuScrim.classList.toggle('show', S.menu);
    EL.menu.inert = !S.menu;
    const sig = JSON.stringify([S.premium, S.offline, S.saved]);
    if (sig === menuSig) return;
    menuSig = sig;
    let h = '<div class="menu-head"><span class="avatar">J</span><div style="flex:1"><div class="name">Janna</div><div class="plan">' +
      (S.premium ? '<span class="badge badge-premium">' + icon('star') + 'Premium</span>' : 'Free plan') + '</div></div>' +
      '<button class="icon-btn" type="button" data-act="menu-close" aria-label="Close menu" style="color:#fff">' + icon('close') + '</button></div>';
    h += '<div class="menu-body">';
    h += '<button class="menu-item" type="button" data-act="go-home">' + icon('map') + '<span class="grow">Map</span></button>';
    h += '<button class="menu-item" type="button" data-act="plan-open">' + icon('route') + '<span class="grow">Plan a trip</span></button>';
    if (S.premium) {
      h += '<button class="menu-item" type="button" data-act="saved-open">' + icon('bookmark') + '<span class="grow">Saved routes<span class="s">' + S.saved.length + ' saved · works offline</span></span></button>';
      h += '<div class="menu-saved">' + (S.saved.length ? S.saved.map(s => {
        const t = D.trips[s.key], o = t.options[s.opt];
        return '<button class="saved-item" type="button" data-act="open-saved" data-key="' + s.key + '" data-opt="' + s.opt + '">' + icon('bookmarkf', 'ic-sm') + esc(N[t.from].name + ' → ' + N[t.to].name + ' · ' + o.label) + '</button>';
      }).join('') : '<p class="empty">Plan a trip and tap Save.</p>') + '</div>';
      h += '<div class="menu-item" id="offline-row">' + icon('wifioff') + '<span class="grow">Offline Mode<span class="s">Show saved routes without data</span></span>' +
        '<button class="switch" type="button" role="switch" aria-checked="' + S.offline + '" aria-label="Offline Mode" data-act="offline-toggle"></button></div>';
    } else {
      h += '<button class="menu-item" type="button" data-act="premium-open">' + icon('bookmark') + '<span class="grow">Saved routes<span class="s">Premium</span></span>' + icon('lock', 'ic-sm') + '</button>';
      h += '<button class="menu-item" type="button" data-act="premium-open">' + icon('wifioff') + '<span class="grow">Offline Mode<span class="s">Premium</span></span>' + icon('lock', 'ic-sm') + '</button>';
    }
    h += '<div class="menu-sep"></div>';
    h += '<button class="menu-item" type="button" data-act="premium-open"><span style="color:#E0A100;display:inline-flex">' + icon('star') + '</span><span class="grow">TaraPara! Premium<span class="s">' + (S.premium ? 'Active · no ads, Offline Mode, saved routes' : '₱99 / 3 months · no ads, offline') + '</span></span></button>';
    h += '<button class="menu-item" type="button" data-act="operators-open">' + icon('brief') + '<span class="grow">For Operators<span class="s">Partner portal · business demo</span></span></button>';
    h += '<button class="menu-item" type="button" data-act="about-open">' + icon('info') + '<span class="grow">About this prototype</span></button>';
    h += '<div class="menu-sep"></div>';
    h += '<button class="menu-item" type="button" data-act="reset">' + icon('reset') + '<span class="grow">Reset demo</span></button>';
    h += '</div>';
    EL.menu.innerHTML = h;
  }

  let premSig = '', opSig = '';
  function renderPages() {
    const p = S.page;
    [['premium', EL.premium], ['operators', EL.operators]].forEach(pair => {
      const on = p === pair[0];
      pair[1].hidden = false;
      pair[1].classList.toggle('open', on);
      pair[1].inert = !on;
    });
    const ps = String(S.premium);
    if (ps !== premSig) { premSig = ps; EL.premium.innerHTML = premiumHTML(); }
    const os = JSON.stringify([S.opEditing, S.opEdits, S.advisories, S.advPosting, S.advRoute]);
    if (os !== opSig) {
      opSig = os;
      const ta = $('#adv-text');
      if (ta) S.advDraft = ta.value;
      EL.operators.innerHTML = operatorsHTML();
    }
  }

  function premiumHTML() {
    const art = '<svg class="prem-art" width="200" height="200" viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke-width="10" stroke-linecap="round" opacity=".9">' +
      '<path d="M10 150 C 60 140 90 90 140 80 S 200 60 220 40" stroke="#FFB703"/><path d="M40 210 C 70 150 110 130 160 120 S 220 110 230 100" stroke="#12806F"/><path d="M90 220 C 110 180 150 160 230 160" stroke="#6C4AB6"/></g>' +
      '<circle cx="140" cy="80" r="11" fill="#0E1A2B" stroke="#fff" stroke-width="4"/></svg>';
    let h = '<div class="prem-hero">' + art +
      '<button class="icon-btn close" type="button" data-act="premium-close" aria-label="Close">' + icon('close') + '</button>' +
      '<span class="logo-mark sm"></span><h1>TaraPara! <em>Premium</em></h1>';
    if (S.premium) {
      h += '<p class="prem-sub" style="font-size:15px;color:#fff;font-weight:700">Premium ka na! Active until Dec 30, 2026.</p></div>';
    } else {
      h += '<div class="prem-price"><b>₱99</b><span>/ 3 months</span></div><p class="prem-sub">About ₱1.10 a day. Cancel anytime.</p></div>';
    }
    h += '<div class="page-pad">' +
      '<div class="perk"><span class="pi">' + icon('noads') + '</span><span><b>No ads</b><span>Ads disappear everywhere. (We never show ads on trip steps anyway.)</span></span></div>' +
      '<div class="perk"><span class="pi">' + icon('wifioff') + '</span><span><b>Offline Mode</b><span>Saved trips, loading-point photos and Para alerts work with no data.</span></span></div>' +
      '<div class="perk"><span class="pi">' + icon('bookmark') + '</span><span><b>Saved routes on your phone</b><span>Save the trips you take every week, one tap to open.</span></span></div>' +
      '</div>';
    h += '<div class="prem-cta">' + (S.premium
      ? '<button class="btn btn-ink btn-block" type="button" data-act="premium-close">Balik sa trip</button><p class="fine">Tip: open the menu to use Saved routes and Offline Mode.</p>'
      : '<button class="btn btn-primary btn-block" type="button" data-act="subscribe" style="min-height:52px;font-size:17px">Subscribe · ₱99 / 3 months</button><p class="fine">Demo checkout. No real payment is made.</p>') + '</div>';
    return h;
  }

  function demandChart(dm) {
    const W = 330, H = 176, pl = 30, pr = 6, pt = 22, pb = 24, max = 400;
    const cw = W - pl - pr, ch = H - pt - pb, slot = cw / dm.bins.length, bw = Math.min(30, slot * 0.56);
    const y = v => pt + ch - v / max * ch;
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Searches on your corridor by departure time, split into searches that found an option and those that found no good option">';
    [0, 100, 200, 300, 400].forEach(v => {
      s += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="' + (v ? '#EEF1F5' : '#C9D1DB') + '" stroke-width="1"/>' +
        '<text x="' + (pl - 6) + '" y="' + (y(v) + 3.5) + '" text-anchor="end" font-size="9.5" fill="#5A6475" font-weight="600">' + v + '</text>';
    });
    const top = dm.bins.reduce((a, b) => (b.missed > a.missed ? b : a), dm.bins[0]);
    dm.bins.forEach((b, i) => {
      const x = pl + slot * i + (slot - bw) / 2, found = b.total - b.missed;
      const yF = y(found), yM = y(b.total) - 2;
      const hM = (y(found) - 2) - yM;
      const rr = 4;
      s += '<g class="bar-g" tabindex="0" data-tip="' + esc(b.full) + '|' + b.total + '|' + b.missed + '" data-x="' + ((x + bw / 2) / W * 100) + '" data-y="' + (yM / H * 100) + '" aria-label="' + esc(b.full + ': ' + b.total + ' searches, ' + b.missed + ' found no good option') + '">' +
        '<rect class="hitbar" x="' + (pl + slot * i + 2) + '" y="' + pt + '" width="' + (slot - 4) + '" height="' + ch + '" rx="6"/>' +
        '<rect x="' + x + '" y="' + yF + '" width="' + bw + '" height="' + (pt + ch - yF) + '" fill="#8FA3BA"/>' +
        '<path d="M' + x + ' ' + (yM + hM) + 'V' + (yM + rr) + 'q0 -' + rr + ' ' + rr + ' -' + rr + 'H' + (x + bw - rr) + 'q' + rr + ' 0 ' + rr + ' ' + rr + 'V' + (yM + hM) + 'z" fill="#D1495B"/>' +
        '<text x="' + (x + bw / 2) + '" y="' + (H - 7) + '" text-anchor="middle" font-size="9.5" fill="#5A6475" font-weight="700">' + esc(b.label) + '</text>' +
        (b === top ? '<text x="' + (x + bw / 2) + '" y="' + (yM - 6) + '" text-anchor="middle" font-size="10" fill="#0E1A2B" font-weight="800">' + b.missed + ' missed</text>' : '') +
        '</g>';
    });
    s += '</svg>';
    let table = '<table class="sr-only"><caption>Searches by departure time</caption><tr><th>Time</th><th>Searches</th><th>No good option</th></tr>' +
      dm.bins.map(b => '<tr><td>' + esc(b.full) + '</td><td>' + b.total + '</td><td>' + b.missed + '</td></tr>').join('') + '</table>';
    return '<div class="legend"><span><i style="background:#8FA3BA"></i>Found an option</span><span><i style="background:#D1495B"></i>No good option</span></div>' +
      '<div class="chart-wrap">' + s + '<div class="chart-tip" hidden></div></div>' + table;
  }

  function operatorsHTML() {
    const op = D.operator, dm = op.demand;
    let h = '<div class="page-bar"><button class="icon-btn" type="button" data-act="operators-close" aria-label="Back">' + icon('back') + '</button><h1>Partner Portal</h1><span class="badge badge-muted" style="margin-right:6px">For Operators</span></div>';
    h += '<div class="page-pad">';
    h += '<div class="op-card"><div class="op-head"><span class="op-logo">' + icon('sun', 'ic-lg') + '</span><div style="flex:1;min-width:0"><p class="op-name">' + esc(op.name) + '</p>' +
      '<p class="op-since" style="margin:2px 0 0">' + esc(op.since) + '</p></div></div>' +
      '<div class="badges"><span class="badge badge-verified">' + icon('shield') + 'Verified Partner</span><span class="badge badge-partner">' + icon('star') + 'Founding partner</span><span class="badge badge-muted">2 routes live</span></div></div>';

    h += '<div class="op-card"><p class="op-h">' + icon('chart', 'ic-sm') + '<span class="grow">Demand · ' + esc(dm.month) + '</span></p>' +
      '<div class="op-stat"><b>' + dm.total.toLocaleString('en-US') + '</b><span>searches on your corridor this month</span></div>' +
      '<div class="op-miss">' + dm.missed + ' found no good option</div>' + demandChart(dm) +
      '<div class="insight"><b>What to do:</b> ' + esc(dm.insight) + '</div></div>';

    h += '<div class="op-card"><p class="op-h">' + icon('clock', 'ic-sm') + '<span class="grow">Routes &amp; schedule</span></p><table class="sched"><thead><tr><th>Route</th><th>First–last</th><th>Every</th><th>Fare</th><th><span class="sr-only">Edit</span></th></tr></thead><tbody>';
    op.schedule.forEach((row, i) => {
      const e = S.opEdits[i] || row;
      h += '<tr><td><span class="rname">' + esc(row.label) + '</span>' + (S.opEdits[i] ? '<br><span class="badge badge-warn pend">' + icon('clock') + 'Pending check</span>' : '') + '</td>' +
        '<td>' + esc(e.first) + '–' + esc(e.last) + '</td><td>' + esc(e.every) + '</td><td>' + esc(e.fare) + '</td>' +
        '<td><button class="btn btn-sm btn-ghost" type="button" data-act="op-edit" data-i="' + i + '">' + icon('edit', 'ic-sm') + 'Edit</button></td></tr>';
      if (S.opEditing === i) {
        h += '<tr><td colspan="5"><div class="sched-edit">' +
          '<div><label for="op-first">First trip</label><input id="op-first" class="input" value="' + esc(e.first) + '"></div>' +
          '<div><label for="op-last">Last trip</label><input id="op-last" class="input" value="' + esc(e.last) + '"></div>' +
          '<div><label for="op-every">Every</label><input id="op-every" class="input" value="' + esc(e.every) + '"></div>' +
          '<div><label for="op-fare">Fare</label><input id="op-fare" class="input" value="' + esc(e.fare) + '"></div>' +
          '<div class="acts"><button class="btn btn-sm btn-ghost" type="button" data-act="op-cancel">Cancel</button><button class="btn btn-sm btn-ink" type="button" data-act="op-save" data-i="' + i + '">Submit for check</button></div>' +
          '</div></td></tr>';
      }
    });
    h += '</tbody></table><p class="fine" style="text-align:left;margin-top:10px">Changes go live after a quick TaraPara! check.</p></div>';

    const draft = S.advDraft == null ? op.advisoryDraft : S.advDraft;
    h += '<div class="op-card"><p class="op-h">' + icon('mega', 'ic-sm') + '<span class="grow">Post an advisory</span></p>' +
      '<label class="form-label" for="adv-route" style="margin-top:0">Route</label><select id="adv-route" class="input">' +
      op.schedule.map(row => '<option value="' + row.route + '"' + (row.route === S.advRoute ? ' selected' : '') + '>' + esc(row.label) + '</option>').join('') + '</select>' +
      '<label class="form-label" for="adv-text">Message</label><textarea id="adv-text" class="input" placeholder="Holiday schedule…">' + esc(draft) + '</textarea>' +
      '<button class="btn btn-ink btn-block" type="button" data-act="adv-post" style="margin-top:10px" ' + (S.advPosting ? 'disabled' : '') + '>' + (S.advPosting ? 'Checking…' : icon('mega') + 'Post advisory') + '</button>';
    S.advisories.slice().reverse().forEach(a => {
      h += '<div class="adv-item">' + icon('checkc') + '<span><b>Live · ' + esc(R[a.route].sub) + ' · ' + esc(a.when) + '</b><br>' + esc(a.text) + '</span></div>';
    });
    h += '</div>';

    h += '<div class="op-card price-card"><p class="op-h">' + icon('brief', 'ic-sm') + '<span class="grow">Partnership</span></p>' +
      '<div class="price-big">' + esc(op.pricing.intro) + '</div><div class="price-then">' + esc(op.pricing.then) + '</div>' +
      '<div class="price-found">' + icon('star') + esc(op.pricing.founding) + '</div>' +
      '<ul class="price-list"><li>' + icon('check') + 'Listed in trip plans with a Verified Partner badge</li><li>' + icon('check') + 'Post your own schedules, fares and advisories</li>' +
      '<li>' + icon('check') + 'Monthly demand report, including missed searches</li><li>' + icon('check') + 'QR posters for your terminals and buses</li></ul></div>';
    h += '<p class="fine">Sinag P2P is a fictional operator · illustrative data</p></div>';
    return h;
  }

  let modalSig = '';
  function renderModal() {
    const m = S.modal;
    EL.modalScrim.classList.toggle('show', !!m);
    const sig = JSON.stringify(m);
    if (sig === modalSig) return;
    modalSig = sig;
    if (!m) { EL.modal.classList.remove('open'); EL.modal.inert = true; return; }
    EL.modal.hidden = false;
    EL.modal.inert = false;
    let h = '<div class="sheet-handle" aria-hidden="true"></div>';
    if (m.kind === 'report') {
      const r = R[m.route];
      const opts = [['Wrong fare', 'The fare shown is not what I paid'], ['Route changed', 'The vehicle now takes a different road'], ['Loading point moved', 'It no longer loads where the photo shows']];
      h += '<h2 class="modal-title">Report a problem</h2><p class="muted" style="margin:0 0 6px;font-size:14px">' + esc(r.kind + ' · ' + (r.mode === 'p2p' ? r.sub : r.name)) + '</p>' +
        '<div role="radiogroup" aria-label="What is wrong?">' + opts.map(o => '<label class="choice' + (m.choice === o[0] ? ' sel' : '') + '"><input type="radio" name="rep" value="' + esc(o[0]) + '"' + (m.choice === o[0] ? ' checked' : '') + '><span><span class="t">' + esc(o[0]) + '</span><br><span class="s">' + esc(o[1]) + '</span></span></label>').join('') + '</div>' +
        '<label class="form-label" for="rep-note">Details (optional)</label><textarea id="rep-note" class="input" placeholder="e.g., ₱30 na ngayon hanggang Ayala">' + esc(m.note || '') + '</textarea>' +
        '<p class="fine" style="text-align:left">A route steward checks reports within 7 days. Two reports in 7 days show a warning to riders.</p>' +
        '<div class="modal-actions"><button class="btn btn-ghost" type="button" data-act="modal-close">Cancel</button><button class="btn btn-red" type="button" data-act="report-send" ' + (m.choice ? '' : 'disabled') + '>' + icon('flag') + 'Send report</button></div>';
    } else if (m.kind === 'checkout') {
      if (m.step === 'form') {
        const methods = [['ewallet', 'E-wallet', 'wallet'], ['card', 'Credit or debit card', 'card'], ['load', 'Prepaid load', 'phone']];
        h += '<h2 class="modal-title">Checkout</h2>' +
          '<div class="checkout-line"><span>TaraPara! Premium · 3 months</span><b>₱99.00</b></div>' +
          '<p class="form-label">Payment method</p>' +
          methods.map(o => '<label class="choice' + (m.method === o[0] ? ' sel' : '') + '"><input type="radio" name="pay" value="' + o[0] + '"' + (m.method === o[0] ? ' checked' : '') + '>' + icon(o[2]) + '<span class="t">' + esc(o[1]) + '</span></label>').join('') +
          '<div class="modal-actions"><button class="btn btn-ghost" type="button" data-act="modal-close">Cancel</button><button class="btn btn-primary" type="button" data-act="pay">Pay ₱99</button></div>' +
          '<p class="fine">Demo checkout. No money moves.</p>';
      } else if (m.step === 'processing') {
        h += '<div class="center" style="padding:10px 0 24px"><div class="spinner" role="status" aria-label="Processing"></div><p style="font-weight:800;margin:0">Processing payment…</p><p class="fine">Demo only</p></div>';
      } else {
        h += '<div class="center" style="padding:0 0 8px"><div class="success-check">' + icon('check') + '</div><h2 class="modal-title">Premium ka na!</h2>' +
          '<p class="muted" style="margin:0 0 4px">No ads · Offline Mode · Saved routes</p><p class="fine">Receipt #TP-2026-0930 · ₱99.00 (demo)</p></div>' +
          '<button class="btn btn-primary btn-block" type="button" data-act="checkout-done" style="margin-top:12px">Tara na!</button>';
      }
    }
    EL.modal.innerHTML = h;
    requestAnimationFrame(() => EL.modal.classList.add('open'));
  }

  /* =========================================================
   * Demo panel (desktop, outside the phone)
   * ======================================================= */
  const GUIDE = [
    { t: 'Home · Map Overlay', s: 'Every jeep, bus, rail, UV, trike and P2P route on one map.', run: () => goHome() },
    { t: 'Tap EDSA · Road Inspector', s: '“This road · 7 routes.” Tap any road on the map.', run: () => { goHome(); openRoad(DEMO_SEG); } },
    { t: 'Plan PITX → Ayala', s: 'Fastest, fewest transfers, cheapest.', run: () => planPair('pitx>ayala') },
    { t: 'Pick Cheapest', s: '66 min · ₱41. Sakay, Baba, Trike steps.', run: () => { planPair('pitx>ayala'); selectOpt(2); } },
    { t: 'Open the jeep’s Transport Detail', s: 'Verified Sep 2026, fare basis, 20% discount, Comments tab.', run: () => { planPair('pitx>ayala'); selectOpt(2); openDetail('mj-pitx-ayala', S.sheet); } },
    { t: 'Premium · ₱99 / 3 months', s: 'Subscribe → fake checkout. Ads disappear, Save appears.', run: () => openPremium() },
    { t: 'Offline toggle', s: '“Offline — showing saved routes.” Saved trips still open.', run: () => demoOffline() },
    { t: 'For Operators', s: 'Verified Partner, demand report, ₱1,399 for 6 months.', run: () => openOperators() }
  ];
  const SCREENS = [
    { t: 'Welcome', run: () => { baseline(); S.welcome = true; render(); } },
    { t: 'Home map', run: () => goHome() },
    { t: 'Road Inspector', run: () => { goHome(); openRoad(DEMO_SEG); } },
    { t: 'Route Planner', run: () => planPair('pitx>ayala') },
    { t: 'Transport Detail', run: () => { planPair('pitx>ayala'); selectOpt(2); openDetail('mj-pitx-ayala', S.sheet); } },
    { t: 'Premium', run: () => openPremium() },
    { t: 'Comments', run: () => { planPair('pitx>ayala'); selectOpt(2); openDetail('mj-pitx-ayala', S.sheet); S.sheet.tab = 'comments'; render(); } },
    { t: 'For Operators', run: () => openOperators() }
  ];
  function buildPanel() {
    $('#dp-guide').innerHTML = GUIDE.map((g, i) => '<li><button class="dp-step" type="button" data-act="guide" data-i="' + i + '"><span class="num">' + (i + 1) + '</span><span><span class="t">' + esc(g.t) + '</span><span class="s">' + esc(g.s) + '</span></span></button></li>').join('');
    $('#dp-screens').innerHTML = SCREENS.map((sc, i) => '<button class="dp-scr" type="button" data-act="screen" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd>' + esc(sc.t) + '</button>').join('');
  }
  function guideFromState() {
    if (S.welcome) return -1;
    if (S.page === 'operators') return 7;
    if (S.offline) return 6;
    if (S.page === 'premium' || (S.modal && S.modal.kind === 'checkout')) return 5;
    const sh = S.sheet;
    if (sh && sh.kind === 'detail' && sh.route === 'mj-pitx-ayala') return 4;
    if (sh && sh.kind === 'steps' && S.plan.key === 'pitx>ayala' && S.plan.opt === 2) return 3;
    if (sh && sh.kind === 'options' && S.plan.key === 'pitx>ayala') return 2;
    if (sh && sh.kind === 'road' && SEG[sh.seg].road === 'edsa') return 1;
    if (S.view === 'browse' && !sh && !S.page) return 0;
    return null;
  }
  let guideCur = -1;
  function renderPanel() {
    const g = guideFromState();
    if (g !== null) guideCur = g;
    $$('.dp-step', EL.panel).forEach((b, i) => {
      b.classList.toggle('cur', i === guideCur);
      b.classList.toggle('done', i < guideCur);
      if (i === guideCur) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
  }
  let panelOpen = false;
  function setPanel(open) {
    panelOpen = open;
    EL.panel.hidden = false;
    EL.panel.classList.toggle('open', open);
    EL.panel.inert = !open;
    EL.demoBtn.setAttribute('aria-expanded', String(open));
    try { localStorage.setItem('tp-demo-panel', open ? '1' : '0'); } catch (e) { /* storage unavailable */ }
    layout();
  }

  /* =========================================================
   * Render
   * ======================================================= */
  function render() {
    renderStatus();
    renderWelcome();
    renderTop();
    renderChrome();
    renderSheet();
    renderSuggest();
    renderMenu();
    renderPages();
    renderModal();
    renderMapState();
    renderPanel();
    maybeFit();
  }
  function maybeFit() {
    const sh = S.sheet;
    const sig = [sh ? sh.kind + ':' + (sh.seg || sh.hub || sh.route || S.plan.key + '/' + S.plan.opt) : 'none', S.view, sheetSize(sh), EL.ad.hidden, S.offline].join('|');
    if (sig === MAP.fitSig) return;
    const sizeOnly = MAP.fitSig && MAP.fitSig.split('|')[0] === sig.split('|')[0];
    MAP.fitSig = sig;
    if (S.view === 'plan' && !sh) return;
    clearTimeout(timers.fit);
    if (sizeOnly) timers.fit = setTimeout(() => fitContext(true), 300);
    else fitContext(!S.welcome);
  }

  /* =========================================================
   * Actions
   * ======================================================= */
  function baseline() {
    S.welcome = false; S.menu = false; S.modal = null; S.page = null;
    EL.notif.hidden = true;
    const a = document.activeElement;
    if (a && a.blur && a !== document.body) a.blur();
  }
  function goHome() {
    baseline();
    S.view = 'browse'; S.sheet = null; S.sheetBig = false; S.offline = false;
    S.plan = { from: null, to: null, active: null, q: '', key: null, opt: null };
    render();
  }
  function closeSheet() {
    if (S.offline && S.view === 'browse') { S.sheet = { kind: 'saved' }; render(); return; }
    S.sheet = null; S.sheetBig = false; render();
  }
  function openRoad(segId) { S.sheet = { kind: 'road', seg: segId }; S.sheetBig = false; render(); }
  function openHub(h) { S.sheet = { kind: 'hub', hub: h }; S.sheetBig = false; render(); }
  function openDetail(routeId, back) {
    S.sheet = { kind: 'detail', route: routeId, tab: 'details', back: back ? Object.assign({}, back) : null };
    S.sheetBig = false;
    S.plan.active = null;
    render();
  }
  function enterPlan(active) {
    if (S.offline) { S.menu = false; S.view = 'browse'; S.sheet = { kind: 'saved' }; render(); toast('Offline ka. Saved routes lang ang available.', 'wifioff'); return; }
    S.menu = false; S.page = null;
    S.view = 'plan';
    S.plan = { from: null, to: null, active: active || 'to', q: '', key: null, opt: null };
    S.sheet = null; S.sheetBig = false;
    render();
    focusField(S.plan.active);
  }
  function exitPlan() {
    S.view = 'browse';
    S.plan = { from: null, to: null, active: null, q: '', key: null, opt: null };
    S.sheet = S.offline ? { kind: 'saved' } : null;
    S.sheetBig = false;
    render();
  }
  function planPair(key) {
    baseline();
    const t = D.trips[key];
    S.offline = false;
    S.view = 'plan';
    S.plan = { from: t.from, to: t.to, active: null, q: '', key, opt: null };
    S.sheet = { kind: 'options' }; S.sheetBig = false;
    render();
  }
  function planCompute() {
    const p = S.plan;
    if (p.from && p.to) {
      const key = p.from + '>' + p.to;
      p.key = D.trips[key] ? key : null;
      p.opt = null;
      S.sheet = p.key ? { kind: 'options' } : { kind: 'nodata' };
    } else { p.key = null; S.sheet = null; }
    S.sheetBig = false;
  }
  function pickHub(h) {
    const f = S.plan.active || 'to';
    S.plan[f] = h;
    S.plan.q = '';
    const other = f === 'from' ? 'to' : 'from';
    if (!S.plan[other]) { S.plan.active = other; render(); focusField(other); return; }
    S.plan.active = null;
    const a = document.activeElement; if (a && a.blur) a.blur();
    planCompute();
    render();
  }
  function selectOpt(i) { S.plan.opt = i; S.sheet = { kind: 'steps' }; S.sheetBig = false; S.pulseSave = false; render(); }
  function openPremium() { baseline(); S.page = 'premium'; render(); }
  function openOperators() { baseline(); S.page = 'operators'; render(); }
  function demoOffline() {
    baseline();
    if (!S.premium) S.premium = true;
    if (!isSaved('pitx>ayala', 2)) S.saved.push({ key: 'pitx>ayala', opt: 2 });
    S.view = 'browse';
    S.plan = { from: null, to: null, active: null, q: '', key: null, opt: null };
    S.offline = true;
    S.sheet = { kind: 'saved' }; S.sheetBig = false;
    render();
  }
  function openSaved(key, opt) {
    const t = D.trips[key];
    S.menu = false; S.page = null;
    S.view = 'plan';
    S.plan = { from: t.from, to: t.to, active: null, q: '', key, opt };
    S.sheet = { kind: 'steps' }; S.sheetBig = false;
    render();
  }
  function resetDemo() {
    clearTimers();
    S = initialState();
    EL.notif.hidden = true;
    EL.toast.classList.remove('show');
    EL.ad.innerHTML = '';
    EL.banner.innerHTML = '';
    topSig = sheetSig = menuSig = premSig = opSig = modalSig = '';
    MAP.fitSig = '';
    render();
    fitTo(ALL_BOUNDS, false);
    toast('Demo reset', 'reset');
  }
  function guideNext() { GUIDE[clamp(guideCur + 1, 0, GUIDE.length - 1)].run(); }

  function toast(msg, ic) {
    EL.toast.innerHTML = (ic ? icon(ic) : '') + '<span>' + esc(msg) + '</span>';
    EL.toast.style.bottom = (EL.sheet.classList.contains('open') ? Math.min(EL.sheet.offsetHeight + 12, mapScreen.clientHeight - 80) : S.modal ? 300 : 96) + 'px';
    EL.toast.classList.add('show');
    clearTimeout(timers.toast);
    timers.toast = setTimeout(() => EL.toast.classList.remove('show'), 3200);
  }
  function notify(title, body) {
    EL.notif.innerHTML = '<span class="logo-mark"></span><span class="grow"><span class="app"><span>TaraPara! · Para alert</span><span>now</span></span><b>' + esc(title) + '</b>' + esc(body) + '</span>';
    EL.notif.hidden = false;
    app.classList.remove('buzz'); void app.offsetWidth; app.classList.add('buzz');
    clearTimeout(timers.notif);
    timers.notif = setTimeout(() => { EL.notif.hidden = true; }, 6500);
  }

  const ACT = {
    'start': () => {
      S.welcome = false; render();
      clearTimeout(timers.tip);
      timers.tip = setTimeout(() => { if (!S.sheet && S.view === 'browse' && !S.welcome) toast('Tip: i-tap ang kahit anong kalsada para makita ang routes.', 'road'); }, 500);
    },
    'menu-open': () => { S.menu = true; render(); },
    'menu-close': () => { S.menu = false; render(); },
    'go-home': () => goHome(),
    'plan-open': () => enterPlan('to'),
    'plan-close': () => exitPlan(),
    'plan-swap': () => {
      const p = S.plan; const f = p.from; p.from = p.to; p.to = f;
      p.active = null; planCompute(); render();
    },
    'field-clear': a => {
      const f = a.getAttribute('data-field');
      S.plan[f] = null; S.plan.key = null; S.plan.opt = null; S.sheet = null; S.plan.active = f; S.plan.q = '';
      render(); focusField(f);
    },
    'pick-hub': a => pickHub(a.getAttribute('data-hub')),
    'pick-pair': a => planPair(a.getAttribute('data-pair')),
    'filter': a => {
      const m = a.getAttribute('data-mode');
      S.filters[m] = !S.filters[m];
      render();
      toast((S.filters[m] ? 'Showing ' : 'Hiding ') + D.modes[m].long + ' routes', m);
    },
    'zoom-in': () => zoomBy(1.5),
    'zoom-out': () => zoomBy(1 / 1.5),
    'zoom-fit': () => fitContext(true),
    'sheet-close': () => closeSheet(),
    'hub-from': a => { const h = a.getAttribute('data-hub'); S.view = 'plan'; S.plan = { from: h, to: null, active: 'to', q: '', key: null, opt: null }; S.sheet = null; render(); focusField('to'); },
    'hub-to': a => { const h = a.getAttribute('data-hub'); S.view = 'plan'; S.plan = { from: null, to: h, active: 'from', q: '', key: null, opt: null }; S.sheet = null; render(); focusField('from'); },
    'open-detail': a => openDetail(a.getAttribute('data-route'), S.sheet),
    'detail-back': () => {
      const back = S.sheet && S.sheet.back;
      if (back) { S.sheet = back; S.sheetBig = false; render(); } else closeSheet();
    },
    'tab': a => { S.sheet.tab = a.getAttribute('data-tab'); render(); },
    'discount': () => { S.discount = !S.discount; render(); },
    'confirm': () => {
      const r = R[S.sheet.route];
      S.confirmed[r.id] = true; render();
      toast('Salamat! ' + (r.confirms + 1) + ' riders confirmed this route this month.', 'checkc');
    },
    'report': () => { S.modal = { kind: 'report', route: S.sheet.route, choice: null, note: '' }; render(); },
    'report-send': () => {
      const m = S.modal; if (!m || !m.choice) return;
      S.reports[m.route] = m.choice; S.modal = null; render();
      toast('Salamat! A route steward will check this within 7 days.', 'flag');
    },
    'modal-close': () => { if (S.modal && S.modal.step === 'processing') return; S.modal = null; render(); },
    'opt': a => selectOpt(+a.getAttribute('data-i')),
    'steps-back': () => {
      if (S.offline) { exitPlan(); return; }
      S.plan.opt = null; S.sheet = { kind: 'options' }; S.sheetBig = false; render();
    },
    'para': a => {
      const k = a.getAttribute('data-k');
      S.para[k] = !S.para[k];
      render();
      clearTimeout(timers.para);
      if (S.para[k]) {
        const place = a.getAttribute('data-place'), before = a.getAttribute('data-before');
        toast('Para alert on. We’ll buzz you after ' + before + '.', 'bell');
        timers.para = setTimeout(() => notify('Malapit na! Next stop: ' + place, 'Maghanda nang bumaba. Sabihin: “Para po!”'), 3800);
      }
    },
    'save-trip': () => {
      const k = S.plan.key, o = S.plan.opt;
      if (isSaved(k, o)) { S.saved = S.saved.filter(s => !(s.key === k && s.opt === o)); toast('Removed from saved routes', 'bookmark'); }
      else { S.saved.push({ key: k, opt: o }); toast('Saved · available offline', 'bookmarkf'); }
      S.pulseSave = false;
      render();
    },
    'premium-open': () => { S.menu = false; S.page = 'premium'; render(); },
    'premium-close': () => {
      S.page = null;
      if (S.premium && S.sheet && S.sheet.kind === 'steps' && !isSaved(S.plan.key, S.plan.opt)) S.pulseSave = true;
      render();
    },
    'subscribe': () => { S.modal = { kind: 'checkout', step: 'form', method: 'ewallet' }; render(); },
    'pay': () => {
      S.modal = Object.assign({}, S.modal, { step: 'processing' }); render();
      clearTimeout(timers.pay);
      timers.pay = setTimeout(() => {
        S.premium = true;
        EL.ad.hidden = true;
        S.modal = Object.assign({}, S.modal, { step: 'done' }); render();
      }, 1300);
    },
    'checkout-done': () => {
      S.modal = null; S.page = null;
      if (S.sheet && S.sheet.kind === 'steps' && !isSaved(S.plan.key, S.plan.opt)) S.pulseSave = true;
      render();
      toast(S.sheet && S.sheet.kind === 'steps' ? 'Premium on · tap Save to keep this trip offline.' : 'Premium on · no more ads.', 'star');
    },
    'offline-toggle': () => {
      S.offline = !S.offline;
      if (S.offline) {
        render();
        setTimeout(() => {
          S.menu = false; S.view = 'browse';
          S.plan = { from: null, to: null, active: null, q: '', key: null, opt: null };
          S.sheet = { kind: 'saved' }; S.sheetBig = false; render();
        }, 450);
      } else { if (S.sheet && S.sheet.kind === 'saved') S.sheet = null; render(); toast('Back online', 'checkc'); }
    },
    'offline-off': () => { S.offline = false; if (S.sheet && S.sheet.kind === 'saved') S.sheet = null; render(); toast('Back online', 'checkc'); },
    'saved-open': () => { S.menu = false; S.view = 'browse'; S.plan = { from: null, to: null, active: null, q: '', key: null, opt: null }; S.sheet = { kind: 'saved' }; render(); },
    'open-saved': a => openSaved(a.getAttribute('data-key'), +a.getAttribute('data-opt')),
    'operators-open': () => { S.menu = false; S.page = 'operators'; render(); },
    'operators-close': () => { S.page = null; render(); },
    'op-edit': a => { const i = +a.getAttribute('data-i'); S.opEditing = S.opEditing === i ? null : i; render(); const f = $('#op-first'); if (f) f.focus(); },
    'op-cancel': () => { S.opEditing = null; render(); },
    'op-save': a => {
      const i = +a.getAttribute('data-i');
      const val = id => { const el = $('#' + id); return el ? el.value.trim() : ''; };
      const row = D.operator.schedule[i];
      S.opEdits[i] = { first: val('op-first') || row.first, last: val('op-last') || row.last, every: val('op-every') || row.every, fare: val('op-fare') || row.fare };
      S.opEditing = null; render();
      toast('Submitted · goes live after a quick check', 'clock');
    },
    'adv-post': () => {
      const ta = $('#adv-text'), sel = $('#adv-route');
      const text = ta ? ta.value.trim() : '';
      if (!text) { toast('Isulat muna ang advisory.', 'mega'); if (ta) ta.focus(); return; }
      S.advDraft = text; S.advRoute = sel ? sel.value : S.advRoute; S.advPosting = true; render();
      clearTimeout(timers.adv);
      timers.adv = setTimeout(() => {
        S.advisories.push({ route: S.advRoute, text, when: 'Posted today' });
        S.advPosting = false; S.advDraft = ''; render();
        toast('Advisory live · riders see it on ' + R[S.advRoute].sub, 'mega');
      }, 900);
    },
    'about-open': () => { S.menu = false; S.view = 'browse'; S.sheet = { kind: 'about' }; render(); },
    'reset': () => resetDemo(),
    'demo-toggle': () => setPanel(!panelOpen),
    'guide': a => GUIDE[+a.getAttribute('data-i')].run(),
    'guide-next': () => guideNext(),
    'screen': a => SCREENS[+a.getAttribute('data-i')].run(),
    'notif-close': () => { EL.notif.hidden = true; }
  };

  /* =========================================================
   * Events
   * ======================================================= */
  function initEvents() {
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-act]');
      if (!a || a.disabled) return;
      const fn = ACT[a.getAttribute('data-act')];
      if (fn) { e.preventDefault(); fn(a, e); }
    });
    EL.demoBtn.addEventListener('click', () => setPanel(!panelOpen));
    EL.notif.addEventListener('click', () => { EL.notif.hidden = true; });

    // Keep planner input focus while tapping suggestions.
    EL.suggest.addEventListener('mousedown', e => e.preventDefault());

    document.addEventListener('focusin', e => {
      const f = e.target.getAttribute && e.target.getAttribute('data-field');
      if (f && S.view === 'plan') {
        S.plan.active = f; S.plan.q = '';
        markActiveField(); renderSuggest();
      }
    });
    document.addEventListener('focusout', e => {
      if (e.target.getAttribute && e.target.getAttribute('data-field')) {
        setTimeout(() => {
          const a = document.activeElement;
          if (!(a && a.getAttribute && a.getAttribute('data-field')) && S.plan.active) { S.plan.active = null; markActiveField(); renderSuggest(); }
        }, 150);
      }
    });
    document.addEventListener('input', e => {
      const t = e.target;
      if (t.getAttribute('data-field')) { S.plan.q = t.value; renderSuggest(); }
      else if (t.id === 'rep-note' && S.modal) S.modal.note = t.value;
      else if (t.id === 'adv-text') S.advDraft = t.value;
    });
    document.addEventListener('change', e => {
      const t = e.target;
      if (t.name === 'rep' && S.modal) { S.modal.choice = t.value; render(); }
      else if (t.name === 'pay' && S.modal) { S.modal.method = t.value; render(); }
      else if (t.id === 'adv-route') S.advRoute = t.value;
    });
    document.addEventListener('keydown', e => {
      const t = e.target;
      if (t.getAttribute && t.getAttribute('data-field')) {
        if (e.key === 'Enter') { const first = $('.sug-item[data-act="pick-hub"]', EL.suggest); if (first) pickHub(first.getAttribute('data-hub')); e.preventDefault(); }
        else if (e.key === 'Escape') { t.blur(); }
        return;
      }
      if (e.key === 'Escape') { handleEscape(); return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = t.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t.isContentEditable) return;
      if (/^[1-8]$/.test(e.key)) { e.preventDefault(); SCREENS[+e.key - 1].run(); }
      else if (e.key === 'r' || e.key === 'R') { e.preventDefault(); resetDemo(); }
      else if (e.key === 'h' || e.key === 'H') { e.preventDefault(); setPanel(!panelOpen); }
      else if (e.key === 'n' || e.key === 'N') { e.preventDefault(); guideNext(); }
      else if ((e.key === 'Enter' || e.key === ' ') && t.getAttribute && t.getAttribute('data-handle')) { e.preventDefault(); toggleSheetSize(); }
    });

    // Sheet handle: tap to expand/collapse, drag up/down.
    let hd = null;
    EL.sheet.addEventListener('pointerdown', e => {
      if (!e.target.getAttribute || !e.target.getAttribute('data-handle')) return;
      hd = { y: e.clientY };
      try { e.target.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    });
    EL.sheet.addEventListener('pointerup', e => {
      if (!hd) return;
      const dy = e.clientY - hd.y; hd = null;
      if (Math.abs(dy) < 8) toggleSheetSize();
      else if (dy < 0) { S.sheetBig = true; render(); }
      else if (S.sheetBig) { S.sheetBig = false; render(); }
      else if (S.sheet && ['road', 'hub', 'about', 'nodata'].indexOf(S.sheet.kind) >= 0) closeSheet();
      else if (S.sheet && S.sheet.kind === 'detail') ACT['detail-back']();
    });

    // Chart tooltip (operators page)
    const showTip = g => {
      const wrap = g.closest('.chart-wrap'), tip = $('.chart-tip', wrap);
      const p = g.getAttribute('data-tip').split('|');
      tip.innerHTML = '<b>' + esc(p[0]) + '</b><br>' + p[1] + ' searches · ' + p[2] + ' no good option';
      tip.style.left = g.getAttribute('data-x') + '%';
      tip.style.top = 'calc(' + g.getAttribute('data-y') + '% - 8px)';
      tip.hidden = false;
    };
    const hideTip = g => { const wrap = g.closest('.chart-wrap'); if (wrap) $('.chart-tip', wrap).hidden = true; };
    EL.operators.addEventListener('pointerover', e => { const g = e.target.closest && e.target.closest('.bar-g'); if (g) showTip(g); });
    EL.operators.addEventListener('pointerout', e => { const g = e.target.closest && e.target.closest('.bar-g'); if (g && !g.contains(e.relatedTarget)) hideTip(g); });
    EL.operators.addEventListener('focusin', e => { const g = e.target.closest && e.target.closest('.bar-g'); if (g) showTip(g); });
    EL.operators.addEventListener('focusout', e => { const g = e.target.closest && e.target.closest('.bar-g'); if (g) hideTip(g); });

    window.addEventListener('resize', () => { layout(); fitContext(false); });
    window.addEventListener('hashchange', runHash);
  }
  function toggleSheetSize() { if (!S.sheet) return; S.sheetBig = !S.sheetBig; render(); }
  function handleEscape() {
    if (S.modal) { ACT['modal-close'](); return; }
    if (S.menu) { S.menu = false; render(); return; }
    if (S.page) { S.page = null; render(); return; }
    if (S.sheet && S.sheet.kind === 'detail') { ACT['detail-back'](); return; }
    if (S.sheet && S.sheet.kind === 'steps') { ACT['steps-back'](); return; }
    if (S.view === 'plan') { exitPlan(); return; }
    if (S.sheet) closeSheet();
  }

  /* =========================================================
   * Layout: phone frame scaled to the window
   * ======================================================= */
  function layout() {
    const mobile = window.matchMedia('(max-width: 600px)').matches;
    if (!mobile) {
      const FW = 418, FH = 872;
      const s = clamp(Math.min((window.innerHeight - 36) / FH, (window.innerWidth - 36) / FW), 0.4, 1.3);
      phone.style.setProperty('--s', s);
      let cx = window.innerWidth / 2;
      const pw = 360, half = FW * s / 2;
      if (panelOpen && window.innerWidth >= 900 && cx + half + 24 > window.innerWidth - pw) cx = Math.max(half + 16, (window.innerWidth - pw) / 2);
      phone.style.setProperty('--cx', cx + 'px');
    }
  }

  /* ---------- URL hash shortcuts: #s=1..8 (screens) or #g=1..8 (guided steps) ---------- */
  function runHash() {
    const m = /^#([sg])=(\d)$/.exec(location.hash || '');
    if (!m) return;
    const list = m[1] === 's' ? SCREENS : GUIDE;
    const item = list[+m[2] - 1];
    if (item) item.run();
  }

  /* =========================================================
   * Init
   * ======================================================= */
  function init() {
    buildMap();
    buildWelcome();
    buildPanel();
    initMapInput();
    initEvents();
    let open = window.innerWidth >= 1280;
    try { const v = localStorage.getItem('tp-demo-panel'); if (v !== null) open = v === '1'; } catch (e) { /* storage unavailable */ }
    setPanel(open && window.innerWidth >= 900);
    layout();
    render();
    fitTo(ALL_BOUNDS, false);
    MAP.fitK = MAP.view.k;
    MAP.kMin = MAP.fitK * 0.6;
    MAP.kMax = MAP.fitK * 5;
    MAP.lastK = null; applyView();
    runHash();
    // Expose a tiny API for scripted checks and presenters.
    window.TaraPara = { state: () => S, guide: i => GUIDE[i].run(), screen: i => SCREENS[i].run(), reset: resetDemo, act: (name, attrs) => { const el = document.createElement('button'); Object.keys(attrs || {}).forEach(k => el.setAttribute(k, attrs[k])); ACT[name](el); } };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
