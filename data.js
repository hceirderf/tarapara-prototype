/*
 * TaraPara! prototype data. ALL DATA IS ILLUSTRATIVE.
 * Coordinates are schematic "world units" for the SVG map (not lat/lng).
 * Loaded with a classic <script> tag so the prototype works from file://.
 */
window.TP_DATA = {
  modes: {
    jeep:  { label: 'Jeep',  long: 'Jeepney',      color: '#12806F' },
    bus:   { label: 'Bus',   long: 'Bus',          color: '#D1495B' },
    rail:  { label: 'Rail',  long: 'Rail',         color: '#0E1A2B' },
    uv:    { label: 'UV',    long: 'UV Express',   color: '#64748B' },
    trike: { label: 'Trike', long: 'Tricycle',     color: '#FFB703' },
    p2p:   { label: 'P2P',   long: 'P2P partner',  color: '#6C4AB6' }
  },
  modeOrder: ['jeep', 'bus', 'rail', 'uv', 'trike', 'p2p'],

  /* ---------- Map geometry ---------- */
  nodes: {
    // 12 hubs. lab = label side (l, r, t, b, tl, tr, bl, br)
    pitx:       { x: 75,  y: 700, name: 'PITX',            hub: 1, city: 'Parañaque', lab: 'l' },
    baclaran:   { x: 100, y: 555, name: 'Baclaran',        hub: 1, city: 'Parañaque', lab: 'r' },
    moa:        { x: 46,  y: 440, name: 'MOA',             hub: 1, city: 'Pasay',     lab: 't' },
    edsataft:   { x: 150, y: 440, name: 'EDSA–Taft',       hub: 1, city: 'Pasay',     lab: 'tr' },
    naiat3:     { x: 215, y: 612, name: 'NAIA T3',         hub: 1, city: 'Pasay',     lab: 'br' },
    magallanes: { x: 245, y: 470, name: 'Magallanes',      hub: 1, city: 'Makati',    lab: 'r' },
    ayala:      { x: 290, y: 370, name: 'Ayala',           hub: 1, city: 'Makati',    lab: 'r' },
    guadalupe:  { x: 335, y: 245, name: 'Guadalupe',       hub: 1, city: 'Makati',    lab: 'l' },
    bgc:        { x: 458, y: 360, name: 'Market! Market!', sub: 'BGC', mapName: 'BGC', mapSub: 'Market! Market!', hub: 1, city: 'Taguig', lab: 'r' },
    fti:        { x: 345, y: 690, name: 'FTI',             hub: 1, city: 'Taguig',    lab: 'r' },
    ortigas:    { x: 360, y: 110, name: 'Ortigas',         hub: 1, city: 'Pasig',     lab: 'l' },
    rotonda:    { x: 505, y: 205, name: 'Pasig Rotonda',   hub: 1, city: 'Pasig',     lab: 'b' },

    // Junctions (j: 1 splits roads into inspectable segments) and bends
    roxas_n:        { x: 88,  y: -10, name: 'Manila' },
    roxas_buendia:  { x: 88,  y: 300, name: 'Roxas–Buendia', j: 1 },
    roxas_edsa:     { x: 88,  y: 440, name: 'Roxas–EDSA', j: 1 },
    roxas_s:        { x: 93,  y: 510 },
    taft_n:         { x: 150, y: -10, name: 'Manila' },
    taft_buendia:   { x: 150, y: 302, name: 'Taft–Buendia', j: 1 },
    taft_s:         { x: 128, y: 505 },
    buendia_ayala:  { x: 220, y: 310, name: 'Buendia–Ayala Ave', j: 1 },
    ayala_mid:      { x: 255, y: 340, name: 'Paseo de Roxas' },
    edsa_andrews:   { x: 200, y: 453, name: 'Andrews Ave' },
    edsa_mag_ayala: { x: 268, y: 420, name: 'Pasay Rd' },
    edsa_buendia:   { x: 305, y: 325, name: 'EDSA–Buendia', j: 1 },
    edsa_g1:        { x: 322, y: 282 },
    edsa_g2:        { x: 345, y: 195, name: 'Boni' },
    edsa_g3:        { x: 354, y: 150, name: 'Shaw' },
    edsa_n:         { x: 364, y: -10, name: 'Cubao' },
    kal_mid:        { x: 380, y: 315 },
    c5_n:           { x: 458, y: -10, name: 'Libis' },
    c5_ortigas:     { x: 458, y: 112, name: 'C-5–Ortigas', j: 1 },
    c5_pasig:       { x: 458, y: 200, name: 'Bagong Ilog', j: 1 },
    c5_kal:         { x: 458, y: 300, name: 'C-5–Kalayaan', j: 1 },
    c5_s1:          { x: 458, y: 450 },
    c5_s2:          { x: 420, y: 590 },
    ortigas_e:      { x: 560, y: 100, name: 'Cainta' },
    pasigblvd_e:    { x: 560, y: 214, name: 'Pasig City' },
    mck_1:          { x: 340, y: 392, name: 'McKinley Rd' },
    bgc_center:     { x: 405, y: 398, name: 'BGC High Street', j: 1 },
    coastal_mid:    { x: 88,  y: 625, name: 'Coastal–NAIA Rd', j: 1 },
    coastal_s:      { x: 62,  y: 890, name: 'Cavite' },
    mac_1:          { x: 45,  y: 560 },
    mac_2:          { x: 55,  y: 640 },
    naia_mid:       { x: 150, y: 620 },
    andrews_mid:    { x: 205, y: 540 },
    lawton_1:       { x: 285, y: 560 },
    lawton_2:       { x: 360, y: 455 },
    slex_1:         { x: 295, y: 580 },
    slex_s:         { x: 372, y: 890, name: 'Alabang' },
    lrt_red:        { x: 106, y: 592, name: 'Redemptorist' },
    lrt_mia:        { x: 100, y: 648, name: 'MIA' },
    lrt_s:          { x: 72,  y: 890, name: 'Dr. Santos' },

    // Tricycle (TODA) loading points and the demo destination
    tb_ayala:  { x: 272, y: 382, name: 'TODA line · Ayala side' },
    tb_pasay:  { x: 258, y: 424, name: 'TODA line · Pasay Rd' },
    tb_mag:    { x: 242, y: 452, name: 'TODA line · Magallanes' },
    office:    { x: 254, y: 398, name: 'Destination' },
    tt_term:   { x: 100, y: 688, name: 'Tambo TODA terminal' },
    tbi_term:  { x: 446, y: 198, name: 'Bagong Ilog TODA terminal' }
  },

  roads: [
    { id: 'edsa', name: 'EDSA', cls: 'major', national: 1,
      nodes: ['moa', 'roxas_edsa', 'edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala', 'edsa_buendia', 'edsa_g1', 'guadalupe', 'edsa_g2', 'edsa_g3', 'ortigas', 'edsa_n'],
      shields: [[257, 446], [349, 172]] },
    { id: 'c5', name: 'C-5', cls: 'major', national: 1,
      nodes: ['c5_n', 'c5_ortigas', 'c5_pasig', 'c5_kal', 'bgc', 'c5_s1', 'c5_s2', 'fti'],
      shields: [[439, 520]] },
    { id: 'roxas', name: 'Roxas Blvd', cls: 'major', national: 1,
      nodes: ['roxas_n', 'roxas_buendia', 'roxas_edsa', 'roxas_s', 'baclaran'],
      shields: [[88, 205]] },
    { id: 'ayalaave', name: 'Ayala Ave', cls: 'major',
      nodes: ['buendia_ayala', 'ayala_mid', 'ayala'],
      shields: [[236, 324]] },
    { id: 'buendia', name: 'Buendia', cls: 'major',
      nodes: ['roxas_buendia', 'taft_buendia', 'buendia_ayala', 'edsa_buendia'],
      shields: [[119, 301]] },
    { id: 'ortigasave', name: 'Ortigas Ave', cls: 'major', national: 1,
      nodes: ['ortigas', 'c5_ortigas', 'ortigas_e'],
      shields: [[508, 106]] },
    { id: 'taft', name: 'Taft Ave', cls: 'minor', national: 1,
      nodes: ['taft_n', 'taft_buendia', 'edsataft', 'taft_s', 'baclaran'], label: [150, 150, -90] },
    { id: 'coastal', name: 'Coastal Rd', cls: 'minor', national: 1,
      nodes: ['baclaran', 'coastal_mid', 'pitx', 'coastal_s'], label: [81, 775, -82] },
    { id: 'macapagal', name: 'Macapagal Blvd', cls: 'minor',
      nodes: ['moa', 'mac_1', 'mac_2', 'pitx'], label: [36, 520, -88] },
    { id: 'naiard', name: 'NAIA Rd', cls: 'minor',
      nodes: ['coastal_mid', 'naia_mid', 'naiat3'], label: [165, 609, 0] },
    { id: 'andrews', name: 'Andrews Ave', cls: 'minor',
      nodes: ['edsa_andrews', 'andrews_mid', 'naiat3'], label: [216, 520, -86] },
    { id: 'slex', name: 'SLEX', cls: 'minor', national: 1,
      nodes: ['magallanes', 'slex_1', 'fti', 'slex_s'], label: [327, 628, 66] },
    { id: 'kalayaan', name: 'Kalayaan Ave', cls: 'minor',
      nodes: ['edsa_buendia', 'kal_mid', 'c5_kal'], label: [418, 298, -6] },
    { id: 'mckinley', name: 'McKinley Rd', cls: 'minor',
      nodes: ['ayala', 'mck_1', 'bgc_center', 'bgc'], label: [372, 410, 4] },
    { id: 'lawton', name: 'Lawton Ave', cls: 'minor',
      nodes: ['naiat3', 'lawton_1', 'lawton_2', 'bgc_center'], label: [333, 500, -54] },
    { id: 'pasigblvd', name: 'Pasig Blvd', cls: 'minor',
      nodes: ['c5_pasig', 'rotonda', 'pasigblvd_e'], label: [540, 226, 0] }
  ],

  water: [[72, -600], [72, 120], [66, 300], [60, 370], [26, 395], [22, 480], [30, 520], [30, 600], [40, 650], [48, 720], [42, 800], [36, 1400], [-700, 1400], [-700, -600]],
  river: [[700, 262], [560, 255], [520, 248], [458, 252], [410, 238], [370, 236], [335, 245], [300, 228], [260, 212], [215, 198], [170, 180], [120, 150], [90, 128], [60, 118]],

  cities: [
    { name: 'PASAY',     at: [163, 578], tint: '#F7EFE0',
      poly: [[60, 330], [160, 330], [200, 395], [240, 480], [262, 560], [262, 650], [188, 665], [160, 575], [125, 530], [28, 530], [22, 480], [26, 395], [60, 370]] },
    { name: 'MAKATI',    at: [205, 282], tint: '#EAEEF8',
      poly: [[150, 200], [300, 205], [345, 232], [352, 300], [330, 350], [300, 420], [280, 480], [240, 480], [200, 395], [160, 330]] },
    { name: 'TAGUIG',    at: [372, 575], tint: '#E7F3EC',
      poly: [[352, 300], [480, 292], [495, 470], [440, 620], [410, 890], [330, 890], [300, 720], [262, 650], [262, 560], [240, 480], [280, 480], [300, 420], [330, 350]] },
    { name: 'PASIG',     at: [505, 150], tint: '#F2ECF6',
      poly: [[330, 30], [700, 30], [700, 262], [560, 255], [458, 252], [410, 238], [345, 232], [338, 150]] },
    { name: 'PARAÑAQUE', at: [180, 770], tint: '#EAF1F6',
      poly: [[28, 530], [125, 530], [160, 575], [188, 665], [262, 650], [300, 720], [330, 890], [36, 890], [42, 800], [48, 720], [40, 650], [30, 600]] }
  ],

  /* ---------- Routes (about 15 + 3 TODA zones) ----------
   * path: node ids the line follows (used for drawing and the Road Inspector)
   * stops: named stops along the path; tag marks loading point / drop-off
   */
  routes: [
    { id: 'mrt3', mode: 'rail', kind: 'Rail', name: 'MRT-3', sub: 'Taft Ave – North Ave',
      sign: 'MRT-3 NORTHBOUND', signVia: 'to North Ave',
      path: ['edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala', 'edsa_buendia', 'edsa_g1', 'guadalupe', 'edsa_g2', 'edsa_g3', 'ortigas', 'edsa_n'],
      fare: [16, 31], fareNote: 'By number of stations', basis: 'MRT-3 fare matrix (DOTr), 2026',
      freq: 'Every 4–6 min', hours: '4:40 AM – 10:10 PM', verified: 'Sep 2026', confirms: 41,
      operator: 'MRT-3 (DOTr)',
      stops: [
        { node: 'edsataft', name: 'Taft Ave', tag: 'Loading point', note: 'Linked to LRT-1 EDSA by footbridge' },
        { node: 'magallanes', name: 'Magallanes' },
        { node: 'ayala', name: 'Ayala' },
        { node: 'edsa_buendia', name: 'Buendia' },
        { node: 'guadalupe', name: 'Guadalupe' },
        { node: 'edsa_g2', name: 'Boni' },
        { node: 'edsa_g3', name: 'Shaw Blvd' },
        { node: 'ortigas', name: 'Ortigas', tag: 'Drop-off' }
      ] },

    { id: 'lrt1', mode: 'rail', kind: 'Rail', name: 'LRT-1', sub: 'Dr. Santos – Fernando Poe Jr.',
      sign: 'LRT-1 NORTHBOUND', signVia: 'to Fernando Poe Jr.',
      path: ['lrt_s', 'pitx', 'lrt_mia', 'lrt_red', 'baclaran', 'taft_s', 'edsataft', 'taft_buendia', 'taft_n'],
      fare: [16, 55], fareNote: 'By distance; beep card or QR ticket', basis: 'LRT-1 fare matrix (LRMC), 2026',
      freq: 'Every 4–5 min', hours: '4:30 AM – 10:30 PM', verified: 'Sep 2026', confirms: 38,
      operator: 'Light Rail Manila Corp.',
      stops: [
        { node: 'lrt_s', name: 'Dr. Santos' },
        { node: 'pitx', name: 'Asia World (PITX)', tag: 'Loading point', note: 'Footbridge from PITX, 2nd level' },
        { node: 'lrt_mia', name: 'MIA' },
        { node: 'lrt_red', name: 'Redemptorist' },
        { node: 'baclaran', name: 'Baclaran' },
        { node: 'edsataft', name: 'EDSA', tag: 'Drop-off', note: 'Transfer to MRT-3 Taft Ave' },
        { node: 'taft_buendia', name: 'Gil Puyat (Buendia)' }
      ] },

    { id: 'bus-carousel', mode: 'bus', kind: 'Bus', name: 'EDSA Carousel', sub: 'PITX – Monumento',
      sign: 'EDSA CAROUSEL', signVia: 'PITX – Monumento',
      path: ['pitx', 'mac_2', 'mac_1', 'moa', 'roxas_edsa', 'edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala', 'edsa_buendia', 'edsa_g1', 'guadalupe', 'edsa_g2', 'edsa_g3', 'ortigas', 'edsa_n'],
      fare: [15, 76], fareNote: '₱15 first 5 km, then by distance', basis: 'LTFRB order, Mar. 2026',
      freq: 'Every 3–5 min', hours: '24 hours (fewer trips 11 PM – 4 AM)', verified: 'Sep 2026', confirms: 57,
      operator: 'EDSA Busway consortium',
      stops: [
        { node: 'pitx', name: 'PITX', tag: 'Loading point', note: 'Bays 1–4, departure level' },
        { node: 'moa', name: 'MOA' },
        { node: 'roxas_edsa', name: 'Roxas Blvd' },
        { node: 'edsataft', name: 'Taft Ave' },
        { node: 'magallanes', name: 'Magallanes' },
        { node: 'ayala', name: 'Ayala' },
        { node: 'edsa_buendia', name: 'Buendia' },
        { node: 'guadalupe', name: 'Guadalupe' },
        { node: 'ortigas', name: 'Ortigas' }
      ] },

    { id: 'p2p-naia-ortigas', mode: 'p2p', kind: 'P2P bus', name: 'Sinag P2P', sub: 'NAIA T3 – Ortigas', partner: 1,
      sign: 'SINAG P2P', signVia: 'NAIA T3 ⇄ Ortigas',
      path: ['naiat3', 'andrews_mid', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala', 'edsa_buendia', 'edsa_g1', 'guadalupe', 'edsa_g2', 'edsa_g3', 'ortigas'],
      fare: [75, 150], fareNote: 'Reserved seat, aircon', basis: 'Partner-posted fare (LTFRB-approved)',
      freq: 'Every 30 min', hours: '5:30 AM – 10:00 PM', verified: 'Sep 2026', confirms: 19,
      operator: 'Sinag P2P (fictional partner)',
      stops: [
        { node: 'naiat3', name: 'NAIA T3', tag: 'Loading point', note: 'Arrival level, Bay 7' },
        { node: 'magallanes', name: 'Magallanes', note: 'EDSA northbound pick-up' },
        { node: 'ortigas', name: 'Ortigas Center', tag: 'Drop-off', note: 'Terminal beside the mall' }
      ] },

    { id: 'uv-pitx-ayala', mode: 'uv', kind: 'UV Express', name: 'PITX – Ayala', sub: 'via Macapagal · EDSA',
      sign: 'PITX – AYALA', signVia: 'UV Express · via EDSA',
      path: ['pitx', 'mac_2', 'mac_1', 'moa', 'roxas_edsa', 'edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala'],
      fare: [55, 55], fareNote: 'Fixed fare per route', basis: 'LTFRB UV Express fare, Mar. 2026',
      freq: 'Leaves when full (about every 10 min)', hours: '5:00 AM – 9:00 PM', verified: 'Aug 2026', confirms: 15,
      operator: 'Bayside UV Transport Coop',
      stops: [
        { node: 'pitx', name: 'PITX Bay 14', tag: 'Loading point', note: 'UV Express terminal, departure level' },
        { node: 'moa', name: 'MOA' },
        { node: 'magallanes', name: 'Magallanes' },
        { node: 'edsa_mag_ayala', name: 'EDSA cor. Pasay Rd' },
        { node: 'ayala', name: 'Ayala Center', tag: 'Drop-off' }
      ] },

    { id: 'uv-pasay-bgc', mode: 'uv', kind: 'UV Express', name: 'Pasay Rotonda – BGC', sub: 'via EDSA · McKinley',
      sign: 'PASAY ROTONDA – BGC', signVia: 'UV Express',
      path: ['edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala', 'mck_1', 'bgc_center', 'bgc'],
      fare: [45, 45], fareNote: 'Fixed fare per route', basis: 'LTFRB UV Express fare, Mar. 2026',
      freq: 'Leaves when full (about every 12 min)', hours: '5:30 AM – 9:00 PM', verified: 'Aug 2026', confirms: 11,
      operator: 'Rotonda UV Operators Assn.',
      stops: [
        { node: 'edsataft', name: 'Pasay Rotonda', tag: 'Loading point', note: 'UV bay under the LRT' },
        { node: 'magallanes', name: 'Magallanes' },
        { node: 'ayala', name: 'Ayala' },
        { node: 'bgc_center', name: 'BGC High Street' },
        { node: 'bgc', name: 'Market! Market!', tag: 'Drop-off' }
      ] },

    { id: 'j-baclaran-ayala', mode: 'jeep', kind: 'Jeep', name: 'Baclaran – Ayala', sub: 'via Taft · EDSA',
      sign: 'BACLARAN – AYALA', signVia: 'via Taft · EDSA',
      path: ['baclaran', 'taft_s', 'edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala'],
      fare: [14, 24], fareNote: '₱14 first 4 km, +₱1.90 per km after', basis: 'LTFRB order, Mar. 2026',
      freq: 'Every 5–8 min', hours: '4:00 AM – 11:00 PM', verified: 'Aug 2026', confirms: 22,
      operator: 'Baclaran–Ayala Jeepney Operators & Drivers Assn.',
      stops: [
        { node: 'baclaran', name: 'Baclaran', tag: 'Loading point', note: 'Beside the Redemptorist church' },
        { node: 'edsataft', name: 'EDSA–Taft' },
        { node: 'magallanes', name: 'Magallanes' },
        { node: 'ayala', name: 'Ayala', tag: 'Drop-off' }
      ] },

    { id: 'j-taft-naia', mode: 'jeep', kind: 'Jeep', name: 'EDSA Taft – NAIA T3', sub: 'via Andrews Ave',
      sign: 'NAIA T3 – EDSA/TAFT', signVia: 'via Andrews Ave',
      path: ['edsataft', 'edsa_andrews', 'andrews_mid', 'naiat3'],
      fare: [14, 18], fareNote: '₱14 first 4 km', basis: 'LTFRB order, Mar. 2026',
      freq: 'Every 6–10 min', hours: '4:30 AM – 10:00 PM', verified: 'Sep 2026', confirms: 9,
      operator: 'Pasay–NAIA Jeepney Coop',
      stops: [
        { node: 'edsataft', name: 'Pasay Rotonda', tag: 'Loading point' },
        { node: 'edsa_andrews', name: 'Andrews Ave' },
        { node: 'naiat3', name: 'NAIA T3', tag: 'Drop-off', note: 'Departure curb, south end' }
      ] },

    { id: 'mj-pitx-ayala', mode: 'jeep', kind: 'Modern jeep', name: 'PITX – Ayala', sub: 'via Coastal Rd · Buendia',
      sign: 'PITX ⇄ AYALA', signVia: 'via Coastal Rd · Buendia',
      path: ['pitx', 'coastal_mid', 'baclaran', 'roxas_s', 'roxas_edsa', 'roxas_buendia', 'taft_buendia', 'buendia_ayala', 'ayala_mid', 'ayala'],
      fare: [17, 38], fareNote: '₱17 first 4 km, +₱2.20 per km after', basis: 'LTFRB order, Mar. 2026',
      freq: 'Every 8–12 min', hours: '4:30 AM – 11:00 PM', verified: 'Sep 2026', confirms: 12,
      operator: 'PITX–Makati Transport Service Cooperative',
      stops: [
        { node: 'pitx', name: 'PITX Bay 5', tag: 'Loading point', note: 'Departure level, beside the yellow pillar', photo: 'bay' },
        { node: 'coastal_mid', name: 'Coastal Road', note: 'Near Redemptorist' },
        { node: 'taft_buendia', name: 'Buendia', note: 'Cor. Taft Ave, near LRT-1 Gil Puyat' },
        { node: 'ayala', name: 'Ayala', tag: 'Drop-off', note: 'Pharmacy on the corner, Ayala Ave' }
      ] },

    { id: 'j-guad-fti', mode: 'jeep', kind: 'Jeep', name: 'Guadalupe – FTI', sub: 'via Kalayaan · C-5',
      sign: 'GUADALUPE – FTI', signVia: 'via Kalayaan · C-5',
      path: ['guadalupe', 'edsa_g1', 'edsa_buendia', 'kal_mid', 'c5_kal', 'bgc', 'c5_s1', 'c5_s2', 'fti'],
      fare: [14, 30], fareNote: '₱14 first 4 km, +₱1.90 per km after', basis: 'LTFRB order, Mar. 2026',
      freq: 'Every 6–10 min', hours: '4:30 AM – 10:30 PM', verified: 'Aug 2026', confirms: 14,
      operator: 'Guadalupe–FTI Jeepney Assn.',
      stops: [
        { node: 'guadalupe', name: 'Guadalupe', tag: 'Loading point', note: 'Terminal under the bridge' },
        { node: 'edsa_buendia', name: 'EDSA–Buendia' },
        { node: 'bgc', name: 'Market! Market!' },
        { node: 'fti', name: 'FTI', tag: 'Drop-off' }
      ] },

    { id: 'j-ortigas-rotonda', mode: 'jeep', kind: 'Jeep', name: 'Ortigas – Pasig Rotonda', sub: 'via Ortigas Ave · C-5',
      sign: 'ORTIGAS – PASIG', signVia: 'via C-5 · Pasig Blvd',
      path: ['ortigas', 'c5_ortigas', 'c5_pasig', 'rotonda'],
      fare: [14, 20], fareNote: '₱14 first 4 km', basis: 'LTFRB order, Mar. 2026',
      freq: 'Every 5–8 min', hours: '4:30 AM – 11:00 PM', verified: 'Sep 2026', confirms: 10,
      operator: 'Pasig–Ortigas Jeepney Coop',
      stops: [
        { node: 'ortigas', name: 'Ortigas Center', tag: 'Loading point' },
        { node: 'c5_ortigas', name: 'C-5–Ortigas' },
        { node: 'c5_pasig', name: 'Bagong Ilog' },
        { node: 'rotonda', name: 'Pasig Rotonda', tag: 'Drop-off' }
      ] },

    { id: 'bus-bgc', mode: 'bus', kind: 'Bus', name: 'BGC Bus · EDSA Ayala', sub: 'Ayala – Market! Market!',
      sign: 'BGC BUS', signVia: 'EDSA Ayala route',
      path: ['ayala', 'mck_1', 'bgc_center', 'bgc'],
      fare: [15, 25], fareNote: 'Card or cash', basis: 'Operator fare matrix filed with LTFRB, 2026',
      freq: 'Every 10–15 min', hours: '6:00 AM – 10:00 PM', verified: 'Sep 2026', confirms: 26,
      operator: 'BGC Bus',
      stops: [
        { node: 'ayala', name: 'One Ayala terminal', tag: 'Loading point', note: 'South side, BGC Bus bay' },
        { node: 'mck_1', name: 'McKinley Rd' },
        { node: 'bgc_center', name: 'BGC High Street' },
        { node: 'bgc', name: 'Market! Market!', tag: 'Drop-off' }
      ] },

    { id: 'bus-c5', mode: 'bus', kind: 'Bus', name: 'Pasig – FTI', sub: 'via C-5',
      sign: 'PASIG – FTI', signVia: 'via C-5',
      path: ['rotonda', 'c5_pasig', 'c5_kal', 'bgc', 'c5_s1', 'c5_s2', 'fti'],
      fare: [15, 38], fareNote: '₱15 first 5 km, then by distance', basis: 'LTFRB order, Mar. 2026',
      freq: 'Every 10–15 min', hours: '5:00 AM – 10:00 PM', verified: 'Aug 2026', confirms: 8,
      operator: 'C-5 City Bus Consortium',
      stops: [
        { node: 'rotonda', name: 'Pasig Rotonda', tag: 'Loading point' },
        { node: 'c5_pasig', name: 'Bagong Ilog' },
        { node: 'c5_kal', name: 'C-5–Kalayaan' },
        { node: 'bgc', name: 'Market! Market!' },
        { node: 'fti', name: 'FTI', tag: 'Drop-off' }
      ] },

    { id: 'p2p-pitx-bgc', mode: 'p2p', kind: 'P2P bus', name: 'Sinag P2P', sub: 'PITX – BGC', partner: 1,
      sign: 'SINAG P2P', signVia: 'PITX ⇄ BGC',
      path: ['pitx', 'coastal_mid', 'naia_mid', 'naiat3', 'lawton_1', 'lawton_2', 'bgc_center', 'bgc'],
      fare: [90, 90], fareNote: 'Reserved seat, aircon', basis: 'Partner-posted fare (LTFRB-approved)',
      freq: 'Every 45 min', hours: '6:00 AM – 9:00 PM', verified: 'Sep 2026', confirms: 13,
      operator: 'Sinag P2P (fictional partner)',
      stops: [
        { node: 'pitx', name: 'PITX Bay 22', tag: 'Loading point', note: 'P2P bays, departure level' },
        { node: 'naiat3', name: 'NAIA T3' },
        { node: 'bgc_center', name: 'BGC High Street' },
        { node: 'bgc', name: 'Market! Market!', tag: 'Drop-off' }
      ] },

    // Tricycles: zones, not lines. Tricycles may not use national roads.
    { id: 'toda-bangkal', mode: 'trike', kind: 'Tricycle', name: 'Bangkal TODA', sub: 'Makati · beside Ayala & Magallanes',
      sign: 'BANGKAL TODA', signVia: 'Makati',
      zone: [[222, 378], [282, 375], [266, 428], [244, 458], [216, 420]], label: [184, 402],
      near: ['ayala', 'magallanes'],
      fare: [13, 25], fareNote: 'Per passenger, regular trip; special trip ₱60+', basis: 'Makati City tricycle fare ordinance',
      freq: 'TODA line, always a queue', hours: '5:00 AM – 11:00 PM', verified: 'Sep 2026', confirms: 18,
      operator: 'Bangkal Tricycle Operators & Drivers Assn.',
      stops: [
        { node: 'tb_ayala', name: 'Ayala side', tag: 'Loading point', note: 'Beside the convenience store' },
        { node: 'tb_pasay', name: 'Pasay Rd side', tag: 'Loading point', note: 'Beside the gas station' },
        { node: 'tb_mag', name: 'Magallanes side', tag: 'Loading point', note: 'Under the interchange, beside the bakery' }
      ] },

    { id: 'toda-tambo', mode: 'trike', kind: 'Tricycle', name: 'Tambo TODA', sub: 'Parañaque · beside PITX',
      sign: 'TAMBO TODA', signVia: 'Parañaque',
      zone: [[92, 655], [152, 650], [162, 716], [118, 748], [90, 722]], label: [150, 762],
      near: ['pitx', 'baclaran'],
      fare: [15, 30], fareNote: 'Per passenger, regular trip; special trip ₱70+', basis: 'Parañaque City tricycle fare ordinance',
      freq: 'TODA line, always a queue', hours: '24 hours', verified: 'Sep 2026', confirms: 7,
      operator: 'Tambo TODA',
      stops: [
        { node: 'tt_term', name: 'PITX east gate', tag: 'Loading point', note: 'Across the footbridge, beside the carinderia' }
      ] },

    { id: 'toda-bagongilog', mode: 'trike', kind: 'Tricycle', name: 'Bagong Ilog TODA', sub: 'Pasig · beside C-5',
      sign: 'BAGONG ILOG TODA', signVia: 'Pasig',
      zone: [[404, 162], [450, 165], [450, 232], [414, 236], [398, 200]], label: [420, 150],
      near: ['ortigas', 'rotonda'],
      fare: [15, 30], fareNote: 'Per passenger, regular trip; special trip ₱60+', basis: 'Pasig City tricycle fare ordinance',
      freq: 'TODA line, always a queue', hours: '5:00 AM – 10:00 PM', verified: 'Aug 2026', confirms: 5,
      operator: 'Bagong Ilog TODA',
      stops: [
        { node: 'tbi_term', name: 'C-5 service road', tag: 'Loading point', note: 'Beside the barangay hall' }
      ] }
  ],

  /* ---------- Planned trips (3 demo pairs) ----------
   * leg t: walk | ride | trike. mins excludes wait; wait = minutes at the loading point.
   */
  trips: {
    'pitx>ayala': {
      from: 'pitx', to: 'ayala', end: 'office', endName: 'Ayala (Bangkal side)',
      options: [
        { id: 'fastest', label: 'Fastest', tone: 'teal', mins: 48, fare: 62, transfers: 2, legs: [
          { t: 'walk', mins: 5, text: 'Lakad papunta sa LRT-1 Asia World station via the PITX footbridge' },
          { t: 'ride', route: 'lrt1', mins: 14, wait: 3, fare: 25,
            path: ['pitx', 'lrt_mia', 'lrt_red', 'baclaran', 'taft_s', 'edsataft'],
            sakay: { place: 'LRT-1 Asia World (PITX) station', detail: 'Northbound platform, 2nd level. Tap your beep card or buy a single-journey ticket.', photo: 'station', photoLabel: 'ASIA WORLD · LRT-1' },
            baba: { place: 'EDSA station', landmark: 'Exit left, toward the covered footbridge to MRT-3', before: 'Baclaran' } },
          { t: 'walk', mins: 7, text: 'Transfer: LRT-1 EDSA → MRT-3 Taft Ave via the covered footbridge' },
          { t: 'ride', route: 'mrt3', mins: 5, wait: 3, fare: 16,
            path: ['edsataft', 'edsa_andrews', 'magallanes'],
            sakay: { place: 'MRT-3 Taft Ave station', detail: 'Northbound platform. Ride 1 station only.', photo: 'station', photoLabel: 'TAFT AVE · MRT-3' },
            baba: { place: 'Magallanes station', landmark: 'Take the stairs down to the TODA line under the interchange', before: 'Taft Ave' } },
          { t: 'walk', mins: 3, text: 'Lakad pababa sa TODA line sa ilalim ng interchange', path: ['magallanes', 'tb_mag'] },
          { t: 'trike', route: 'toda-bangkal', mins: 8, wait: 0, fare: 21, path: ['tb_mag', 'office'],
            from: 'Magallanes loading point · under the interchange, beside the bakery', photoLabel: 'BANGKAL TODA' }
        ] },
        { id: 'fewest', label: 'Fewest transfers', tone: 'ink', mins: 57, fare: 70, transfers: 1, legs: [
          { t: 'walk', mins: 4, text: 'Lakad papunta sa PITX Bay 14 (UV Express, departure level)' },
          { t: 'ride', route: 'uv-pitx-ayala', mins: 36, wait: 6, fare: 55,
            path: ['pitx', 'mac_2', 'mac_1', 'moa', 'roxas_edsa', 'edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala'],
            sakay: { place: 'PITX Bay 14', detail: 'UV Express terminal, departure level. The van leaves when full.', photo: 'uv', photoLabel: 'BAY 14 · UV EXPRESS' },
            baba: { place: 'EDSA cor. Pasay Rd', landmark: 'Footbridge beside the gas station', before: 'Magallanes' } },
          { t: 'walk', mins: 2, text: 'Lakad sa gilid ng gas station papunta sa TODA line', path: ['edsa_mag_ayala', 'tb_pasay'] },
          { t: 'trike', route: 'toda-bangkal', mins: 6, wait: 3, fare: 15, path: ['tb_pasay', 'office'],
            from: 'Pasay Rd loading point · beside the gas station', photoLabel: 'BANGKAL TODA' }
        ] },
        { id: 'cheapest', label: 'Cheapest', tone: 'yellow', mins: 66, fare: 41, transfers: 1, legs: [
          { t: 'walk', mins: 3, text: 'Lakad papunta sa PITX Bay 5 (departure level)' },
          { t: 'ride', route: 'mj-pitx-ayala', mins: 45, wait: 7, fare: 28,
            path: ['pitx', 'coastal_mid', 'baclaran', 'roxas_s', 'roxas_edsa', 'roxas_buendia', 'taft_buendia', 'buendia_ayala', 'ayala_mid', 'ayala'],
            sakay: { place: 'PITX Bay 5', detail: 'Departure level, beside the yellow pillar. Look for the “PITX ⇄ AYALA” signboard.', photo: 'bay', photoLabel: 'BAY 5' },
            baba: { place: 'Ayala drop-off', landmark: 'Pharmacy on the corner of Ayala Ave', before: 'Paseo de Roxas' } },
          { t: 'walk', mins: 2, text: 'Lakad sa tabi ng pharmacy papunta sa TODA line', path: ['ayala', 'tb_ayala'] },
          { t: 'trike', route: 'toda-bangkal', mins: 6, wait: 3, fare: 13, path: ['tb_ayala', 'office'],
            from: 'Ayala loading point · beside the convenience store', photoLabel: 'BANGKAL TODA' }
        ] }
      ]
    },

    'edsataft>bgc': {
      from: 'edsataft', to: 'bgc', end: 'bgc', endName: 'Market! Market! (BGC)',
      options: [
        { id: 'fastest', label: 'Fastest', tone: 'teal', mins: 36, fare: 31, transfers: 1, legs: [
          { t: 'walk', mins: 3, text: 'Akyat sa MRT-3 Taft Ave station' },
          { t: 'ride', route: 'mrt3', mins: 8, wait: 2, fare: 16,
            path: ['edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala'],
            sakay: { place: 'MRT-3 Taft Ave station', detail: 'Northbound platform. Ride 2 stations.', photo: 'station', photoLabel: 'TAFT AVE · MRT-3' },
            baba: { place: 'Ayala station', landmark: 'Exit to the One Ayala terminal (south side)', before: 'Magallanes' } },
          { t: 'walk', mins: 6, text: 'Lakad sa One Ayala terminal, BGC Bus bay' },
          { t: 'ride', route: 'bus-bgc', mins: 14, wait: 3, fare: 15,
            path: ['ayala', 'mck_1', 'bgc_center', 'bgc'],
            sakay: { place: 'One Ayala terminal · BGC Bus bay', detail: 'Ground level, south side. Tap your card when you board.', photo: 'bus', photoLabel: 'BGC BUS · EDSA AYALA' },
            baba: { place: 'Market! Market!', landmark: 'Last stop, the bus terminal beside the mall', before: 'BGC High Street' } }
        ] },
        { id: 'fewest', label: 'Fewest transfers', tone: 'ink', mins: 44, fare: 45, transfers: 0, legs: [
          { t: 'walk', mins: 4, text: 'Lakad papunta sa UV bay sa ilalim ng LRT (Pasay Rotonda)' },
          { t: 'ride', route: 'uv-pasay-bgc', mins: 34, wait: 6, fare: 45,
            path: ['edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala', 'mck_1', 'bgc_center', 'bgc'],
            sakay: { place: 'Pasay Rotonda UV bay', detail: 'Under the LRT-1 line, beside the bakery. The van leaves when full.', photo: 'uv', photoLabel: 'UV · PASAY ROTONDA' },
            baba: { place: 'Market! Market!', landmark: 'UV bay behind the mall', before: 'BGC High Street' } }
        ] },
        { id: 'cheapest', label: 'Cheapest', tone: 'yellow', mins: 55, fare: 29, transfers: 1, legs: [
          { t: 'walk', mins: 2, text: 'Lakad sa jeepney stop, EDSA cor. Taft (under the LRT)' },
          { t: 'ride', route: 'j-baclaran-ayala', mins: 22, wait: 5, fare: 14,
            path: ['edsataft', 'edsa_andrews', 'magallanes', 'edsa_mag_ayala', 'ayala'],
            sakay: { place: 'EDSA cor. Taft Ave jeep stop', detail: 'Eastbound side, under the LRT. Look for the “BACLARAN – AYALA” signboard.', photo: 'curb', photoLabel: 'EDSA–TAFT' },
            baba: { place: 'Ayala', landmark: 'Get off at the mall entrance, before the MRT stairs', before: 'Magallanes' } },
          { t: 'walk', mins: 6, text: 'Lakad sa One Ayala terminal, BGC Bus bay' },
          { t: 'ride', route: 'bus-bgc', mins: 14, wait: 6, fare: 15,
            path: ['ayala', 'mck_1', 'bgc_center', 'bgc'],
            sakay: { place: 'One Ayala terminal · BGC Bus bay', detail: 'Ground level, south side. Tap your card when you board.', photo: 'bus', photoLabel: 'BGC BUS · EDSA AYALA' },
            baba: { place: 'Market! Market!', landmark: 'Last stop, the bus terminal beside the mall', before: 'BGC High Street' } }
        ] }
      ]
    },

    'magallanes>ortigas': {
      from: 'magallanes', to: 'ortigas', end: 'ortigas', endName: 'Ortigas Center',
      options: [
        { id: 'fastest', label: 'Fastest', tone: 'teal', mins: 27, fare: 23, transfers: 0, legs: [
          { t: 'walk', mins: 4, text: 'Akyat sa MRT-3 Magallanes station (northbound)' },
          { t: 'ride', route: 'mrt3', mins: 17, wait: 4, fare: 23,
            path: ['magallanes', 'edsa_mag_ayala', 'ayala', 'edsa_buendia', 'edsa_g1', 'guadalupe', 'edsa_g2', 'edsa_g3', 'ortigas'],
            sakay: { place: 'MRT-3 Magallanes station', detail: 'Northbound platform. Ride 6 stations.', photo: 'station', photoLabel: 'MAGALLANES · MRT-3' },
            baba: { place: 'Ortigas station', landmark: 'Exit toward Ortigas Ave; the mall is on your right', before: 'Shaw Blvd' } },
          { t: 'walk', mins: 2, text: 'Lakad palabas sa Ortigas Ave' }
        ] },
        { id: 'comfort', label: 'Most comfortable', tone: 'purple', mins: 36, fare: 75, transfers: 0, legs: [
          { t: 'walk', mins: 3, text: 'Lakad sa P2P pick-up, EDSA northbound (Magallanes)' },
          { t: 'ride', route: 'p2p-naia-ortigas', mins: 26, wait: 5, fare: 75,
            path: ['magallanes', 'edsa_mag_ayala', 'ayala', 'edsa_buendia', 'edsa_g1', 'guadalupe', 'edsa_g2', 'edsa_g3', 'ortigas'],
            sakay: { place: 'Sinag P2P pick-up · Magallanes', detail: 'EDSA northbound, beside the footbridge. Reserved seat and aircon; pay by card or e-wallet.', photo: 'p2p', photoLabel: 'SINAG P2P' },
            baba: { place: 'Ortigas Center terminal', landmark: 'Last stop, beside the mall', before: 'Shaw Blvd' } },
          { t: 'walk', mins: 2, text: 'Lakad palabas ng terminal' }
        ] },
        { id: 'cheapest', label: 'Cheapest', tone: 'yellow', mins: 44, fare: 21, transfers: 0, legs: [
          { t: 'walk', mins: 5, text: 'Lakad sa EDSA Carousel stop (center lane, via footbridge)' },
          { t: 'ride', route: 'bus-carousel', mins: 32, wait: 5, fare: 21,
            path: ['magallanes', 'edsa_mag_ayala', 'ayala', 'edsa_buendia', 'edsa_g1', 'guadalupe', 'edsa_g2', 'edsa_g3', 'ortigas'],
            sakay: { place: 'EDSA Carousel · Magallanes stop', detail: 'Center island, northbound. Tap your card at the gate.', photo: 'bus', photoLabel: 'EDSA CAROUSEL' },
            baba: { place: 'Ortigas stop', landmark: 'Center island; take the footbridge to Ortigas Ave', before: 'Shaw Blvd' } },
          { t: 'walk', mins: 2, text: 'Lakad pababa ng footbridge papunta sa Ortigas Ave' }
        ] }
      ]
    }
  },

  demoTrips: ['pitx>ayala', 'edsataft>bgc', 'magallanes>ortigas'],

  /* ---------- Comments (preview only) ---------- */
  comments: {
    'mj-pitx-ayala': [
      { who: 'Mika R.', when: '2 days ago', text: 'Nasa departure level ang Bay 5, hindi sa arrival. Hanapin ang yellow pillar.', up: 24 },
      { who: 'Jomar T.', when: '1 week ago', text: 'Traffic sa Coastal Road pag 7–9 AM. Add 20 minutes kung may pasok ka.', up: 17 },
      { who: 'Ate Lorna', when: '3 weeks ago', text: '₱28 ang binayad ko hanggang Ayala. Tama ang fare dito. Salamat!', up: 9 }
    ],
    _default: [
      { who: 'Paolo D.', when: '4 days ago', text: 'Tama ang loading point. Mas mabilis pag umaga, bago mag-7 AM.', up: 11 },
      { who: 'Carla M.', when: '2 weeks ago', text: 'Sana may schedule din tuwing Sunday. Mas konti ang byahe.', up: 6 },
      { who: 'Ramon S.', when: '1 month ago', text: 'Salamat sa fare info. Hindi na ako na-overcharge.', up: 14 }
    ]
  },

  /* ---------- For Operators (fictional partner) ---------- */
  operator: {
    name: 'Sinag P2P',
    since: 'Founding partner since Jun 2026',
    schedule: [
      { route: 'p2p-naia-ortigas', label: 'NAIA T3 – Ortigas', first: '5:30 AM', last: '10:00 PM', every: '30 min', fare: '₱75–₱150' },
      { route: 'p2p-pitx-bgc', label: 'PITX – BGC', first: '6:00 AM', last: '9:00 PM', every: '45 min', fare: '₱90' }
    ],
    demand: {
      month: 'September 2026', total: 1240, missed: 310,
      bins: [
        { label: '5–7a',  full: '5–7 AM',     total: 180, missed: 30 },
        { label: '7–9a',  full: '7–9 AM',     total: 320, missed: 60 },
        { label: '9a–4p', full: '9 AM–4 PM',  total: 210, missed: 35 },
        { label: '4–6p',  full: '4–6 PM',     total: 230, missed: 55 },
        { label: '6–8p',  full: '6–8 PM',     total: 210, missed: 95 },
        { label: '8–10p', full: '8–10 PM',    total: 90,  missed: 35 }
      ],
      insight: '6–8 PM had the most missed searches (95). A 7:00 PM trip from Magallanes to Ortigas could serve them.'
    },
    advisoryDraft: 'Holiday schedule: Nov 1–2, trips every 60 min. Last trip 8:00 PM.',
    pricing: {
      intro: '₱399 / month',
      then: 'for the first 6 months, then ₱699 / month',
      founding: 'Founding partners: ₱699 for the first 6 months'
    }
  },

  ad: { brand: 'Kape Kanto', line: 'Buy 1 Take 1 iced kape near PITX Bay 5', cta: 'Tingnan' }
};
