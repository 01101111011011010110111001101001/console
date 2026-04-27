const terminal = document.getElementById("terminal");
const commandForm = document.getElementById("command-form");
const commandInput = document.getElementById("command-input");
const suggestionsNode = document.getElementById("suggestions");
const locusNode = document.getElementById("session-locus");
const accountNode = document.getElementById("session-account");
const domainNode = document.getElementById("session-domain");
const inboxPreviewNode = document.getElementById("inbox-preview");
const commandLogicNode = document.getElementById("command-logic");
const greetingTitleNode = document.getElementById("greeting-title");
const greetingCopyNode = document.getElementById("greeting-copy");
const profileAvatarNode = document.getElementById("profile-avatar");
const profileSymbolNode = document.getElementById("profile-symbol");
const profileTitleNode = document.getElementById("profile-title");
const chatListNode = document.getElementById("chat-list");
const chatThreadNode = document.getElementById("chat-thread");
const inboxSummaryNode = document.getElementById("inbox-summary");
const calendarGridNode = document.getElementById("calendar-grid");
const calendarLabelNode = document.getElementById("calendar-label");
const calendarForm = document.getElementById("calendar-form");
const calendarDayInput = document.getElementById("calendar-day-input");
const calendarNoteInput = document.getElementById("calendar-note-input");
const calendarScopeInput = document.getElementById("calendar-scope-input");
const accentSwatchesNode = document.getElementById("accent-swatches");
const logoutButton = document.getElementById("logout-button");
const loginScreen = document.getElementById("login-screen");
const consoleApp = document.getElementById("console-app");
const loginForm = document.getElementById("login-form");
const loginUsername = document.getElementById("login-username");
const loginPasscode = document.getElementById("login-passcode");
const signupForm = document.getElementById("signup-form");
const signupName = document.getElementById("signup-name");
const signupPasscode = document.getElementById("signup-passcode");
const signupRole = document.getElementById("signup-role");
const loginFeedback = document.getElementById("login-feedback");
const commandSubmitButton = commandForm.querySelector('button[type="submit"]');
const accountPickerNode = document.getElementById("account-picker");
const railButtons = Array.from(document.querySelectorAll(".rail-button"));
const panelViews = Array.from(document.querySelectorAll(".panel-view"));
const fileSearchInput = document.getElementById("file-search-input");
const fileListNode = document.getElementById("file-list");
const fileDetailNode = document.getElementById("file-detail");
const filesSummaryNode = document.getElementById("files-summary");
const typingSpeedInput = document.getElementById("typing-speed-input");
const scanlineInput = document.getElementById("scanline-input");
const densityInput = document.getElementById("density-input");
const symbolHelperInput = document.getElementById("symbol-helper-input");
const approvalGroupNode = document.getElementById("approval-group");
const approvalListNode = document.getElementById("approval-list");

const GROUP_CHAT_ID = "__omni_group__";

const SYMBOLS = {
  MEMORY: "\u21CB",
  CURIOSITY: "\u03DE",
  SLEEP: "\u2327",
  HUNGER: "\u236F",
  OVERSEER: "\u2E2E"
};

const ACCOUNT_ORDER = [
  SYMBOLS.MEMORY,
  SYMBOLS.CURIOSITY,
  SYMBOLS.SLEEP,
  SYMBOLS.HUNGER,
  SYMBOLS.OVERSEER
];

const ROLE_SCOPES = {
  [SYMBOLS.MEMORY]: "memory",
  [SYMBOLS.CURIOSITY]: "curiosity",
  [SYMBOLS.SLEEP]: "sleep",
  [SYMBOLS.HUNGER]: "hunger",
  [SYMBOLS.OVERSEER]: "silence"
};

const ACCOUNTS = {
  [SYMBOLS.MEMORY]: {
    codename: "memory",
    title: "Archivist and Memory Wiper",
    password: "wsD1kOp",
    greeting: "Archive surfaces are quiet. Your player files are waiting.",
    canUse: ["access_player", "access_all_player_archives", "review_high_risk_player_archives", "view_inbox", "direct_message", "flag_corruption_index", "files_panel", "calendar_panel"],
    suggestions: [
      "access_player#1453_data",
      "review_high_risk_player_archives",
      `direct_message(@user:${SYMBOLS.OVERSEER}): archive review ready`,
      `reply(@${SYMBOLS.OVERSEER})=flag queued for review`,
      `Flag_corruption_index(@user:${SYMBOLS.OVERSEER})`
    ],
    commandLogic: "Reviews player files, dream remnants, and archive risk. Can flag files upward and message the rest of the admin chain."
  },
  [SYMBOLS.CURIOSITY]: {
    codename: "curiosity",
    title: "Field Operative",
    password: "SMOpKl1A2",
    greeting: "This station is limited to direct channels. Watch, relay, and wait.",
    canUse: ["view_inbox", "direct_message", "calendar_panel"],
    suggestions: [
      "view_inbox",
      `direct_message(@user:${SYMBOLS.HUNGER}): need perimeter eyes on F1`,
      `reply(@${SYMBOLS.HUNGER})=copy that. holding position`,
      `direct_message(@user:${SYMBOLS.OVERSEER}): contact at gate still unresolved`
    ],
    commandLogic: "Direct-message-only interface. No archive, camera, or player commands are available from this station."
  },
  [SYMBOLS.SLEEP]: {
    codename: "sleep",
    title: "Dream Stalker",
    password: "1WqO9ib",
    greeting: "Dream telemetry is live. REM residue is already accumulating.",
    canUse: ["access_dreams", "review_dream-telemetry", "access_player", "view_inbox", "direct_message", "flag_corruption_index", "files_panel", "calendar_panel"],
    suggestions: [
      "access_dreams",
      "review_dream-telemetry",
      `direct_message(@user:${SYMBOLS.MEMORY},${SYMBOLS.OVERSEER}): dream loop persisted through wake threshold`,
      `reply(@${SYMBOLS.OVERSEER})=telemetry uploaded. awaiting review`,
      `Flag_corruption_index(@user:${SYMBOLS.OVERSEER})`
    ],
    commandLogic: "Inputs dream telemetries, monitors player sleep-state anomalies, and reviews feedback from the archive chain."
  },
  [SYMBOLS.HUNGER]: {
    codename: "hunger",
    title: "Navigator and Field Operative",
    password: "QmO1lp",
    greeting: "Gate lines, camera halls, and world maps are under your care.",
    canUse: ["access_control_room", "view_camera", "scan_individual", "lockdown", "force_id_capture", "decipher_motive", "proceed", "view_inbox", "direct_message", "files_panel", "calendar_panel"],
    suggestions: [
      "access_control_room",
      "view_camera_F1_entry",
      "lockdown_F1_choke_entry",
      `reply(@${SYMBOLS.CURIOSITY})=entry sealed. no breach yet`,
      `direct_message(@user:${SYMBOLS.CURIOSITY},${SYMBOLS.OVERSEER}): gate corridor sealed`
    ],
    commandLogic: "Handles gates, facilities cameras, and world navigation routes. Best suited for live perimeter response."
  },
  [SYMBOLS.OVERSEER]: {
    codename: "silence",
    title: "Overseer",
    password: "APL015lqA",
    greeting: "Every subsystem answers here. The quiet is yours to shape.",
    canUse: ["*"],
    suggestions: [
      "view_Commands_history",
      "view_inbox",
      "access_player#1453_data",
      `reply(@${SYMBOLS.MEMORY})=erusaem noitpyrroc delbane`,
      `direct_message(@user:${SYMBOLS.MEMORY},${SYMBOLS.SLEEP}): review corruption pulse immediately`
    ],
    commandLogic: "Full-system access. Outgoing prose from this account is mirrored word-by-word in reverse."
  }
};

const ACCENT_PRESETS = [
  { name: "Neon Green", value: "#40ff6a" },
  { name: "Toxic Lime", value: "#7fff2a" },
  { name: "Signal Cyan", value: "#29f7ff" },
  { name: "Hot Magenta", value: "#ff4de1" },
  { name: "Amber Alert", value: "#ffc84a" }
];

const ROLE_TEMPLATES = {
  memory: {
    title: "Archivist and Memory Wiper",
    greeting: "Archive surfaces are quiet. Your player files are waiting.",
    canUse: ["access_player", "access_all_player_archives", "review_high_risk_player_archives", "view_inbox", "direct_message", "flag_corruption_index", "files_panel", "calendar_panel"],
    suggestions: [
      "access_player#1453_data",
      "review_high_risk_player_archives",
      `direct_message(@user:${SYMBOLS.OVERSEER}): archive review ready`,
      `reply(@${SYMBOLS.OVERSEER})=flag queued for review`,
      `Flag_corruption_index(@user:${SYMBOLS.OVERSEER})`
    ],
    commandLogic: "Reviews player files, dream remnants, and archive risk. Can flag files upward and message the rest of the admin chain."
  },
  curiosity: {
    title: "Field Operative",
    greeting: "This station is limited to direct channels. Watch, relay, and wait.",
    canUse: ["view_inbox", "direct_message", "calendar_panel"],
    suggestions: [
      "view_inbox",
      `direct_message(@user:${SYMBOLS.HUNGER}): need perimeter eyes on F1`,
      `reply(@${SYMBOLS.HUNGER})=copy that. holding position`,
      `direct_message(@user:${SYMBOLS.OVERSEER}): contact at gate still unresolved`
    ],
    commandLogic: "Direct-message-only interface. No archive, camera, or player commands are available from this station."
  },
  sleep: {
    title: "Dream Stalker",
    greeting: "Dream telemetry is live. REM residue is already accumulating.",
    canUse: ["access_dreams", "review_dream-telemetry", "access_player", "view_inbox", "direct_message", "flag_corruption_index", "files_panel", "calendar_panel"],
    suggestions: [
      "access_dreams",
      "review_dream-telemetry",
      `direct_message(@user:${SYMBOLS.MEMORY},${SYMBOLS.OVERSEER}): dream loop persisted through wake threshold`,
      `reply(@${SYMBOLS.OVERSEER})=telemetry uploaded. awaiting review`,
      `Flag_corruption_index(@user:${SYMBOLS.OVERSEER})`
    ],
    commandLogic: "Inputs dream telemetries, monitors player sleep-state anomalies, and reviews feedback from the archive chain."
  },
  hunger: {
    title: "Navigator and Field Operative",
    greeting: "Gate lines, camera halls, and world maps are under your care.",
    canUse: ["access_control_room", "view_camera", "scan_individual", "lockdown", "force_id_capture", "decipher_motive", "proceed", "view_inbox", "direct_message", "files_panel", "calendar_panel"],
    suggestions: [
      "access_control_room",
      "view_camera_F1_entry",
      "lockdown_F1_choke_entry",
      `reply(@${SYMBOLS.CURIOSITY})=entry sealed. no breach yet`,
      `direct_message(@user:${SYMBOLS.CURIOSITY},${SYMBOLS.OVERSEER}): gate corridor sealed`
    ],
    commandLogic: "Handles gates, facilities cameras, and world navigation routes. Best suited for live perimeter response."
  },
  silence: {
    title: "Overseer",
    greeting: "Every subsystem answers here. The quiet is yours to shape.",
    canUse: ["*"],
    suggestions: [
      "view_Commands_history",
      "view_inbox",
      "access_player#1453_data",
      `reply(@${SYMBOLS.MEMORY})=erusaem noitpyrroc delbane`,
      `direct_message(@user:${SYMBOLS.MEMORY},${SYMBOLS.SLEEP}): review corruption pulse immediately`
    ],
    commandLogic: "Full-system access. Outgoing prose from this account is mirrored word-by-word in reverse."
  }
};

const SIGNUP_SYMBOL_POOL = ["\u2690", "\u2691", "\u2698", "\u2625", "\u2629", "\u2609", "\u26A1", "\u26C9", "\u2726", "\u2736", "\u2737", "\u2739"];
const CUSTOM_ADMINS_STORAGE_KEY = "omni-custom-admins-v1";
const PENDING_ADMINS_STORAGE_KEY = "omni-pending-admins-v1";

const STATIC_CALENDAR_EVENTS = [
  { day: 3, note: "archive sweep", scope: "all" },
  { day: 7, note: "dream review", scope: "sleep" },
  { day: 11, note: "perimeter watch", scope: "curiosity" },
  { day: 15, note: "memory audit", scope: "memory" },
  { day: 19, note: "gate lock drill", scope: "hunger" },
  { day: 26, note: "current cycle", scope: "all" }
];

const initialCommandHistory = [
  "console://input_passcode: wsD1kOp",
  "console://l0g_dr43m_4rch1v3s",
  "console://4cc3ss_g4t3_#A-13",
  "console://proceed",
  "console://access_dreams",
  "console://access_player#13_11:16 PM",
  "console://logout",
  "console://login({user:?})",
  "console://input_passcode: 1WqO9ib",
  "console://access_player#1453_data",
  "console://query_dispatch(player#1453)",
  "console://pulling_archival_snapshot",
  "console://de-siloing_sensitive_fields",
  "console://redacting_memory-risk_segments_per_OMNI_baseline",
  "console://data_stream_end",
  "console://review_dream-telemetry",
  "console://initiating_dream-telemetry_review",
  "console://cross-referencing_night-cycle_logs",
  "console://decrypting_noise-layer(?)",
  "console://render_payload",
  "console://telemetry_stream_complete",
  "console://awaiting_next_command",
  "console://access_all_player_archives_#52-#120",
  "console://batch_request_acknowledged",
  "console://range: player_archives_#52 ? #120",
  "console://loading_in_segmented_blocks",
  "console://compiling_cross-index_report",
  "console://review_high_risk_player_archives",
  "console://report_flagged_archives_to_user:?",
  "console://logout",
  "console://login({user:?})",
  "console://input_passcode:QmO1lP",
  "console://access_control_room",
  "console://view_camera_F1_#9",
  "console://view_camera_F1_entry",
  "console://scan_individual",
  "console://report_to_user: ?",
  "console://lockdown_F1_choke_entry",
  "console://force_ID_capture_@F1_entry_choke",
  "console://Quarantine_control_room_outbounds_interface",
  "console://decipher_motive_@FI_entry_choke",
  "console://submit_to_@?",
  "console://view_camera_F1_entry",
  "console://view-camera_F1_gate_hall",
  "console://view_camera_BASE_archives",
  "console://flag_anomaly({reason: where's ??})",
  "console://view_camera_BASE_dormitories",
  "console://view_camera_F1_entry",
  "console://logout"
];

const knownCommands = {
  access_dreams: { domain: "dream archives", generator: accessDreamsReport },
  "review_dream-telemetry": { domain: "dream archives", generator: dreamTelemetryReport },
  access_player: { domain: "player archives", generator: playerArchiveReport },
  access_all_player_archives: { domain: "player archives", generator: archiveRangeSummary },
  review_high_risk_player_archives: { domain: "risk review", generator: riskArchiveReport },
  access_control_room: {
    domain: "control room",
    reply: ["Control Room access granted.", "Camera feeds, gate statuses, and sector controls are now live."]
  },
  view_camera: { domain: "camera feed", generator: cameraFeedReport },
  scan_individual: { domain: "threat scan", generator: individualScanReport },
  lockdown: { domain: "containment", generator: lockdownReport },
  force_id_capture: { domain: "containment", generator: captureReport },
  decipher_motive: { domain: "analysis", generator: motiveReport },
  proceed: { domain: "gate control", generator: proceedReport }
};

const session = {
  loggedIn: false,
  currentUser: null,
  domain: "authentication",
  locus: randomChoice([
    "342168-59402-36695-120",
    "01767-23797-45896-120",
    "23450-45596-23446-120",
    "61882-17449-52003-120"
  ]),
  commandHistory: [...initialCommandHistory],
  lastPlayerContext: null,
  inboxes: seedInboxes(),
  selectedPanel: "inbox-panel",
  accent: ACCENT_PRESETS[0].value,
  selectedChat: null,
  selectedFile: null,
  groupMessages: seedGroupMessages(),
  settings: {
    typingDelay: 0,
    scanline: "0.05",
    density: "comfortable",
    symbolHelper: true
  },
  customDates: [],
  pendingAdmins: [],
  playerFiles: generatePlayerFiles(17650)
};

hydrateCustomAdmins();
hydratePendingAdmins();
bootSequence();
bindEvents();

function bindEvents() {
  commandForm.addEventListener("submit", onCommandSubmit);
  loginForm.addEventListener("submit", onLoginSubmit);
  signupForm.addEventListener("submit", onSignupSubmit);
  logoutButton.addEventListener("click", logoutCurrentUser);
  railButtons.forEach((button) => {
    button.addEventListener("click", () => setActivePanel(button.dataset.panel));
  });
  calendarForm.addEventListener("submit", onCalendarSubmit);
  fileSearchInput.addEventListener("input", renderFiles);
  typingSpeedInput.addEventListener("change", () => {
    session.settings.typingDelay = Number(typingSpeedInput.value);
  });
  scanlineInput.addEventListener("change", () => {
    session.settings.scanline = scanlineInput.value;
    document.documentElement.style.setProperty("--scanline-opacity", session.settings.scanline);
  });
  densityInput.addEventListener("change", () => {
    session.settings.density = densityInput.value;
    document.body.classList.toggle("compact-density", session.settings.density === "compact");
  });
  symbolHelperInput.addEventListener("change", () => {
    session.settings.symbolHelper = symbolHelperInput.checked;
    document.body.classList.toggle("hide-symbol-helper", !session.settings.symbolHelper);
  });
}

function bootSequence() {
  applyAccent(session.accent);
  document.documentElement.style.setProperty("--scanline-opacity", session.settings.scanline);
  locusNode.textContent = `LOCUS ${session.locus}`;
  domainNode.textContent = session.domain;
  loginFeedback.textContent = formatRegisteredAccounts();
  renderAccountPicker();
  renderAccentSwatches();
  renderSuggestions([]);
  renderPendingApprovals();
  renderInbox();
  renderChats();
  renderCalendar();
  renderFiles();
}

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginUsername.value.trim();
  const passcode = loginPasscode.value;
  const resolvedUser = resolveAccountIdentifier(username);
  const account = resolvedUser ? ACCOUNTS[resolvedUser] : null;

  if (!account) {
    loginFeedback.textContent = `Account ${username || "?"} not found in static authentication tables.`;
    return;
  }

  if (passcode !== account.password) {
    loginFeedback.textContent = `Authentication failed for ${username}. Static passcode mismatch.`;
    return;
  }

  session.loggedIn = true;
  session.currentUser = resolvedUser;
  session.domain = "operations";
  session.selectedChat = ACCOUNT_ORDER.find((symbol) => symbol !== session.currentUser) || null;
  session.selectedFile = session.playerFiles[0]?.id || null;
  loginScreen.classList.add("hidden");
  consoleApp.classList.remove("hidden");
  consoleApp.hidden = false;
  consoleApp.setAttribute("aria-hidden", "false");
  commandInput.disabled = false;
  commandSubmitButton.disabled = false;
  updateForCurrentUser();
  writeEntry("meta", `DATE: 12/6/11\nLOCUS: ${session.locus}\nDOMAIN 1: operations`);
  writeEntry("system", `Authentication successful. ${session.currentUser} account session active.`);
  writeEntry("system", `${account.title} privileges enabled. Awaiting next command.`);
}

function onSignupSubmit(event) {
  event.preventDefault();
  const rawName = signupName.value.trim();
  const passcode = signupPasscode.value.trim();
  const role = signupRole.value;

  if (!rawName || !passcode) {
    loginFeedback.textContent = "New admin sign up needs a name and passcode.";
    return;
  }

  if (findAccountByName(rawName)) {
    loginFeedback.textContent = `An admin named ${rawName} already exists.`;
    return;
  }

  if (session.pendingAdmins.some((entry) => entry.displayName.toLowerCase() === rawName.toLowerCase())) {
    loginFeedback.textContent = `A request for ${rawName} is already awaiting oversight.`;
    return;
  }

  session.pendingAdmins.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    displayName: rawName,
    codename: slugifyName(rawName),
    password: passcode,
    role
  });
  savePendingAdmins();
  renderPendingApprovals();
  loginFeedback.textContent = `${rawName} submitted for oversight verification. Awaiting symbol assignment.`;
  signupName.value = "";
  signupPasscode.value = "";
  signupRole.value = "memory";
}

function updateForCurrentUser() {
  const account = ACCOUNTS[session.currentUser];
  accountNode.textContent = `${session.currentUser} | ${account.displayName || account.codename} | ${account.title}`;
  domainNode.textContent = session.domain;
  profileAvatarNode.textContent = session.currentUser;
  profileSymbolNode.textContent = session.currentUser;
  profileTitleNode.textContent = `${account.displayName || account.codename} | ${account.title}`;
  greetingTitleNode.textContent = `Welcome back, ${account.displayName || account.codename}.`;
  greetingCopyNode.textContent = account.greeting;
  commandLogicNode.textContent = account.commandLogic;
  document.body.classList.toggle("messaging-mode", session.currentUser === SYMBOLS.CURIOSITY);
  document.body.classList.toggle("hide-symbol-helper", !session.settings.symbolHelper);
  document.body.classList.toggle("compact-density", session.settings.density === "compact");
  renderSuggestions(account.suggestions);
  updatePanelVisibility();
  renderPendingApprovals();
  renderInbox();
  renderChats();
  renderCalendar();
  renderFiles();
  setActivePanel("inbox-panel");
  commandInput.focus();
}

function onCommandSubmit(event) {
  event.preventDefault();
  const raw = commandInput.value.trim();
  if (!raw || !session.loggedIn) {
    return;
  }

  commandInput.value = "";
  const consoleLine = `console://${raw}`;
  session.commandHistory.push(consoleLine);
  writeEntry("command", consoleLine);
  processCommand(raw);
}

function processCommand(raw) {
  if (isExactCommand(raw, "logout")) {
    logoutCurrentUser();
    return;
  }
  if (isExactCommand(raw, "view_inbox")) {
    handleViewInbox();
    return;
  }
  if (isExactCommand(raw, "view_Commands_history")) {
    handleViewCommandHistory();
    return;
  }
  if (isDirectMessageCommand(raw)) {
    handleDirectMessage(raw);
    return;
  }
  if (isReplyCommand(raw)) {
    handleReplyCommand(raw);
    return;
  }
  if (isFlagCommand(raw)) {
    handleFlagCommand(raw);
    return;
  }

  const normalized = normalizeCommand(raw);
  const commandKey = findCommandKey(normalized);
  if (!commandKey) {
    writeLines(generateHeuristicResponse(raw), "system");
    return;
  }
  if (!canCurrentUserUse(commandKey)) {
    writeEntry("error", `${session.currentUser} does not have clearance for ${commandKey}.`);
    return;
  }

  const definition = knownCommands[commandKey];
  session.domain = definition.domain;
  domainNode.textContent = session.domain;
  writeLines(resolveReply(definition, raw), "system");
}

function handleViewInbox() {
  if (!canCurrentUserUse("view_inbox")) {
    writeEntry("error", `${session.currentUser} does not have clearance for inbox access.`);
    return;
  }
  session.domain = "inbox";
  domainNode.textContent = session.domain;
  setActivePanel("inbox-panel");
  getInbox(session.currentUser).forEach((message) => {
    message.read = true;
    writeEntry(message.type === "flag" ? "alert" : "system", formatInboxMessage(message));
  });
  renderInbox();
}

function handleViewCommandHistory() {
  session.domain = "command history";
  domainNode.textContent = session.domain;
  if (session.currentUser !== SYMBOLS.OVERSEER) {
    writeEntry("error", `Access denied. view_Commands_history is restricted to account ${SYMBOLS.OVERSEER}.`);
    return;
  }
  writeEntry("system", "Historical command registry opened.");
  writeEntry("system", session.commandHistory.join("\n"));
}

function isDirectMessageCommand(raw) {
  return /^direct_message\(@user:\s*.+?\):\s*.+$/iu.test(raw);
}

function handleDirectMessage(raw) {
  if (!canCurrentUserUse("direct_message")) {
    writeEntry("error", `${session.currentUser} does not have clearance for direct messaging.`);
    return;
  }
  const match = raw.match(/^direct_message\(@user:\s*(.+?)\):\s*(.+)$/iu);
  const recipients = parseRecipientList(match[1]);
  const body = transformOutgoingMessage(match[2]);
  if (!isValidRecipientList(recipients)) {
    writeEntry("error", "One or more direct message recipients are invalid.");
    return;
  }
  recipients.forEach((recipient) => {
    deliverMessage(recipient, { from: session.currentUser, type: "direct-message", body });
  });
  writeEntry("system", `Direct message delivered to ${recipients.join(", ")}.`);
  writeEntry("meta", `Payload: ${body}`);
  setActivePanel("chats-panel");
  renderInbox();
  renderChats();
}

function isReplyCommand(raw) {
  return /^reply\(@.+?\)=\s*.+$/iu.test(raw);
}

function handleReplyCommand(raw) {
  if (!canCurrentUserUse("direct_message")) {
    writeEntry("error", `${session.currentUser} does not have clearance for replies.`);
    return;
  }
  const match = raw.match(/^reply\(@(.+?)\)=\s*(.+)$/iu);
  const recipients = parseRecipientList(match[1]);
  const body = transformOutgoingMessage(match[2]);
  if (!isValidRecipientList(recipients)) {
    writeEntry("error", "One or more reply recipients are invalid.");
    return;
  }
  recipients.forEach((recipient) => {
    deliverMessage(recipient, { from: session.currentUser, type: "direct-message", body });
  });
  deliverMessage(session.currentUser, {
    from: session.currentUser,
    type: "reply-sent",
    body,
    details: `sent to ${recipients.join(", ")}`
  });
  writeEntry("system", `Reply delivered to ${recipients.join(", ")}.`);
  writeEntry("meta", `Payload: ${body}`);
  setActivePanel("chats-panel");
  renderInbox();
  renderChats();
}

function isFlagCommand(raw) {
  return /^flag_corruption_index\(@user:\s*.+\s*\)$/iu.test(raw);
}

function handleFlagCommand(raw) {
  if (!canCurrentUserUse("flag_corruption_index")) {
    writeEntry("error", `${session.currentUser} does not have clearance to flag player files.`);
    return;
  }
  const match = raw.match(/^flag_corruption_index\(@user:\s*(.+?)\s*\)$/iu);
  const recipients = parseRecipientList(match[1]);
  if (!isValidRecipientList(recipients)) {
    writeEntry("error", "Flag relay rejected. The recipient list contains an unregistered account.");
    return;
  }
  if (!session.lastPlayerContext) {
    writeEntry("alert", "No active player file selected. Open a player archive before flagging corruption.");
    return;
  }
  const { playerId, corruptionBand } = session.lastPlayerContext;
  if (corruptionBand === "green-band") {
    writeEntry("meta", `Player ${playerId} currently reads ${corruptionBand}. No escalation packet created.`);
    return;
  }
  recipients.forEach((recipient) => {
    deliverMessage(recipient, {
      from: session.currentUser,
      type: "flag",
      body: `player ${playerId} flagged for ${corruptionBand}`,
      details: `Most recent profile shows corruption-index ${corruptionBand}. Review requested.`
    });
  });
  writeEntry("system", `Flag packet created for player ${playerId}.`);
  writeEntry("system", `corruption-index: ${corruptionBand}`);
  writeEntry("system", `Transmission routed to ${recipients.join(", ")}.`);
  renderInbox();
  renderChats();
}

function onCalendarSubmit(event) {
  event.preventDefault();
  if (!session.loggedIn) {
    return;
  }
  const day = Number(calendarDayInput.value);
  const note = calendarNoteInput.value.trim();
  if (!day || day < 1 || day > 30 || !note) {
    return;
  }
  session.customDates.push({
    day,
    note,
    scope: calendarScopeInput.value === "role" ? ROLE_SCOPES[session.currentUser] : "all"
  });
  calendarNoteInput.value = "";
  renderCalendar();
}

function logoutCurrentUser() {
  if (!session.loggedIn) {
    return;
  }
  writeEntry("system", `${session.currentUser} account session terminated. All active processes secured and archived.`);
  session.loggedIn = false;
  session.currentUser = null;
  session.domain = "authentication";
  session.selectedChat = null;
  session.selectedFile = null;
  terminal.innerHTML = "";
  consoleApp.classList.add("hidden");
  consoleApp.hidden = true;
  consoleApp.setAttribute("aria-hidden", "true");
  commandInput.disabled = true;
  commandSubmitButton.disabled = true;
  loginScreen.classList.remove("hidden");
  loginUsername.value = "";
  loginPasscode.value = "";
  loginFeedback.textContent = formatRegisteredAccounts();
  loginUsername.focus();
}

function renderAccountPicker() {
  accountPickerNode.innerHTML = "";
  ACCOUNT_ORDER.forEach((symbol) => {
    const account = ACCOUNTS[symbol];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "account-chip";
    button.innerHTML = `<span class="account-chip-symbol">${symbol}</span><span class="account-chip-label">${account.displayName || account.codename}</span>`;
    button.addEventListener("click", () => {
      loginUsername.value = account.displayName || symbol;
      loginPasscode.value = account.password;
      loginFeedback.textContent = `${symbol} selected for ${(account.displayName || account.codename)}. Passcode loaded for quick access.`;
      loginPasscode.focus();
      loginPasscode.select();
    });
    accountPickerNode.appendChild(button);
  });
}

function resolveAccountIdentifier(identifier) {
  if (ACCOUNTS[identifier]) {
    return identifier;
  }

  const normalized = identifier.trim().toLowerCase();
  return ACCOUNT_ORDER.find((symbol) => {
    const account = ACCOUNTS[symbol];
    return account.codename.toLowerCase() === normalized || (account.displayName && account.displayName.toLowerCase() === normalized);
  }) || null;
}

function findAccountByName(name) {
  const normalized = name.trim().toLowerCase();
  return ACCOUNT_ORDER.find((symbol) => {
    const account = ACCOUNTS[symbol];
    return (account.displayName && account.displayName.toLowerCase() === normalized) || account.codename.toLowerCase() === normalized;
  }) || null;
}

function getNextSignupSymbol() {
  return SIGNUP_SYMBOL_POOL.find((symbol) => !ACCOUNTS[symbol]) || null;
}

function createRoleAccount(role, name, passcode) {
  const template = ROLE_TEMPLATES[role];
  return {
    codename: slugifyName(name),
    displayName: name,
    title: template.title,
    password: passcode,
    greeting: `${name} registered. ${template.greeting}`,
    canUse: [...template.canUse],
    suggestions: [...template.suggestions],
    commandLogic: template.commandLogic,
    role
  };
}

function registerAccount(symbol, account, persist) {
  ACCOUNTS[symbol] = account;
  if (!ACCOUNT_ORDER.includes(symbol)) {
    ACCOUNT_ORDER.push(symbol);
  }
  if (persist) {
    saveCustomAdmins();
  }
}

function hydrateCustomAdmins() {
  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem(CUSTOM_ADMINS_STORAGE_KEY) || "[]");
  } catch {
    stored = [];
  }
  stored.forEach((entry) => {
    const template = ROLE_TEMPLATES[entry.role] || ROLE_TEMPLATES.memory;
    registerAccount(entry.symbol, {
      codename: entry.codename,
      displayName: entry.displayName,
      title: template.title,
      password: entry.password,
      greeting: `${entry.displayName} registered. ${template.greeting}`,
      canUse: [...template.canUse],
      suggestions: [...template.suggestions],
      commandLogic: template.commandLogic,
      role: entry.role
    }, false);
  });
}

function saveCustomAdmins() {
  const customAdmins = ACCOUNT_ORDER
    .filter((symbol) => SIGNUP_SYMBOL_POOL.includes(symbol))
    .map((symbol) => {
      const account = ACCOUNTS[symbol];
      return {
        symbol,
        codename: account.codename,
        displayName: account.displayName || account.codename,
        password: account.password,
        role: account.role || "memory"
      };
    });
  localStorage.setItem(CUSTOM_ADMINS_STORAGE_KEY, JSON.stringify(customAdmins));
}

function slugifyName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "admin";
}

function formatRegisteredAccounts() {
  return `Registered accounts: ${ACCOUNT_ORDER.map((symbol) => `${symbol}${ACCOUNTS[symbol].displayName ? ` (${ACCOUNTS[symbol].displayName})` : ""}`).join(" ")}`;
}

function seedGroupMessages() {
  return [
    { from: SYMBOLS.OVERSEER, body: "group relay online. maintain discipline." },
    { from: SYMBOLS.HUNGER, body: "perimeter stable. no breach." }
  ];
}

function hydratePendingAdmins() {
  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem(PENDING_ADMINS_STORAGE_KEY) || "[]");
  } catch {
    stored = [];
  }
  session.pendingAdmins = Array.isArray(stored) ? stored : [];
}

function savePendingAdmins() {
  localStorage.setItem(PENDING_ADMINS_STORAGE_KEY, JSON.stringify(session.pendingAdmins));
}

function renderPendingApprovals() {
  if (!approvalGroupNode || !approvalListNode) {
    return;
  }

  const isOverseer = session.currentUser === SYMBOLS.OVERSEER;
  approvalGroupNode.style.display = isOverseer ? "grid" : "none";
  approvalListNode.innerHTML = "";

  if (!isOverseer) {
    return;
  }

  if (!session.pendingAdmins.length) {
    approvalListNode.innerHTML = `<p class="panel-small">No pending admin requests.</p>`;
    return;
  }

  session.pendingAdmins.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "approval-item";
    row.innerHTML = `
      <div>
        <p class="panel-value">${entry.displayName}</p>
        <p class="panel-small">${entry.role}</p>
      </div>
      <button type="button" class="settings-button">Approve</button>
    `;
    row.querySelector("button").addEventListener("click", () => approvePendingAdmin(entry.id));
    approvalListNode.appendChild(row);
  });
}

function approvePendingAdmin(requestId) {
  const entry = session.pendingAdmins.find((item) => item.id === requestId);
  if (!entry) {
    return;
  }

  const symbol = getNextSignupSymbol();
  if (!symbol) {
    loginFeedback.textContent = "No signup symbols remain. Let me know when more admins surface.";
    return;
  }

  const account = createRoleAccount(entry.role, entry.displayName, entry.password);
  registerAccount(symbol, account, true);
  session.pendingAdmins = session.pendingAdmins.filter((item) => item.id !== requestId);
  savePendingAdmins();
  renderAccountPicker();
  renderPendingApprovals();
  loginFeedback.textContent = `Admin approved: ${entry.displayName} assigned symbol ${symbol}.`;
}

function renderSuggestions(items) {
  suggestionsNode.innerHTML = "";
  items.forEach((suggestion) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion";
    button.textContent = suggestion;
    button.addEventListener("click", () => {
      commandInput.value = suggestion;
      commandInput.focus();
    });
    suggestionsNode.appendChild(button);
  });
}

function renderInbox() {
  inboxPreviewNode.innerHTML = "";
  if (!session.currentUser) {
    inboxSummaryNode.textContent = "No incoming items.";
    return;
  }
  const inbox = getInbox(session.currentUser);
  const unreadCount = inbox.filter((message) => !message.read).length;
  inboxSummaryNode.textContent = unreadCount ? `${unreadCount} unread item${unreadCount === 1 ? "" : "s"}` : "All clear";
  if (!inbox.length) {
    inboxPreviewNode.innerHTML = `<p class="panel-small">No incoming items.</p>`;
    return;
  }
  [...inbox].reverse().forEach((message) => {
    inboxPreviewNode.appendChild(buildThreadCard(message.from, message.body, message.details, message.read, false, false));
  });
}

function renderChats() {
  chatListNode.innerHTML = "";
  chatThreadNode.innerHTML = "";
  if (!session.currentUser) {
    return;
  }
  const availableChats = ACCOUNT_ORDER.filter((symbol) => symbol !== session.currentUser);
  if (!availableChats.includes(session.selectedChat)) {
    session.selectedChat = availableChats[0] || null;
  }
  availableChats.forEach((symbol) => {
    const threadMessages = getThreadWith(symbol);
    const latest = threadMessages[threadMessages.length - 1];
    const preview = latest ? latest.body : "No messages yet.";
    chatListNode.appendChild(buildThreadCard(symbol, preview, ACCOUNTS[symbol].title, true, symbol === session.selectedChat, true));
  });
  renderSelectedChatThread();
}

function buildThreadCard(symbol, preview, detail, read, selected = false, clickable = false) {
  const card = document.createElement(clickable ? "button" : "div");
  if (clickable) {
    card.type = "button";
  }
  card.className = `thread-card ${read ? "" : "unread"} ${selected ? "selected" : ""}`.trim();
  card.innerHTML = `
    <div class="thread-avatar">${symbol}</div>
    <div class="thread-body">
      <div class="thread-header">
        <span>${symbol}</span>
        <span>${detail || ""}</span>
      </div>
      <p class="thread-preview">${preview}</p>
    </div>
  `;
  if (clickable) {
    card.addEventListener("click", () => {
      session.selectedChat = symbol;
      renderChats();
    });
  }
  return card;
}

function renderSelectedChatThread() {
  if (!session.currentUser || !session.selectedChat) {
    chatThreadNode.innerHTML = `<p class="panel-small">Select an operator to open the thread.</p>`;
    return;
  }
  const selectedAccount = ACCOUNTS[session.selectedChat];
  const messages = getThreadWith(session.selectedChat);
  if (!messages.length) {
    chatThreadNode.innerHTML = `
      <div class="chat-thread-header">
        <div class="thread-avatar">${session.selectedChat}</div>
        <div>
          <p class="panel-value">${session.selectedChat}</p>
          <p class="panel-small">${selectedAccount.title}</p>
        </div>
      </div>
      <p class="panel-small">No messages yet.</p>
    `;
    return;
  }
  const bubbles = messages.map((message) => {
    const outbound = message.from === session.currentUser;
    const label = outbound ? "You" : message.from;
    return `
      <div class="chat-bubble ${outbound ? "outbound" : "inbound"}">
        <div class="chat-bubble-label">${label}</div>
        <div>${message.body}</div>
        ${message.details ? `<div class="chat-bubble-detail">${message.details}</div>` : ""}
      </div>
    `;
  }).join("");
  chatThreadNode.innerHTML = `
    <div class="chat-thread-header">
      <div class="thread-avatar">${session.selectedChat}</div>
      <div>
        <p class="panel-value">${session.selectedChat}</p>
        <p class="panel-small">${selectedAccount.title}</p>
      </div>
    </div>
    <div class="chat-bubbles">${bubbles}</div>
  `;
}

function renderCalendar() {
  calendarGridNode.innerHTML = "";
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  labels.forEach((label) => {
    const head = document.createElement("div");
    head.className = "calendar-head";
    head.textContent = label;
    calendarGridNode.appendChild(head);
  });
  const startDay = new Date("2026-04-01T12:00:00").getDay();
  const daysInMonth = 30;
  calendarLabelNode.textContent = "April 2026";
  const visibleEvents = getVisibleCalendarEvents();
  for (let i = 0; i < startDay; i += 1) {
    const spacer = document.createElement("div");
    spacer.className = "calendar-day";
    calendarGridNode.appendChild(spacer);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const notes = visibleEvents.filter((event) => event.day === day).slice(0, 3);
    const cell = document.createElement("div");
    cell.className = `calendar-day ${day === 26 ? "today" : ""}`.trim();
    cell.innerHTML = `
      <div class="day-number">${day}</div>
      <div class="day-note">${notes.map((event) => event.note).join("<br>")}</div>
    `;
    calendarGridNode.appendChild(cell);
  }
}

function renderFiles() {
  fileListNode.innerHTML = "";
  fileDetailNode.innerHTML = "";
  filesSummaryNode.textContent = `${session.playerFiles.length.toLocaleString()} surfaced records`;
  if (!session.currentUser) {
    return;
  }
  const canViewFiles = canCurrentUserUse("files_panel");
  if (!canViewFiles) {
    fileDetailNode.innerHTML = `<p class="panel-small">This account does not have player-file clearance.</p>`;
    return;
  }
  const query = fileSearchInput.value.trim().toLowerCase();
  const matches = session.playerFiles
    .filter((file) => !query || file.id.toLowerCase().includes(query) || file.anomaly.toLowerCase().includes(query) || file.corruption.toLowerCase().includes(query))
    .slice(0, 120);
  if (!matches.length) {
    fileDetailNode.innerHTML = `<p class="panel-small">No matching player files.</p>`;
    return;
  }
  if (!matches.some((file) => file.id === session.selectedFile)) {
    session.selectedFile = matches[0].id;
  }
  matches.forEach((file) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `file-row ${file.id === session.selectedFile ? "selected" : ""}`.trim();
    button.innerHTML = `<span>${file.id}</span><span>${file.corruption}</span>`;
    button.addEventListener("click", () => {
      session.selectedFile = file.id;
      session.lastPlayerContext = { playerId: file.id.replace("player ", ""), corruptionBand: file.corruption };
      renderFiles();
    });
    fileListNode.appendChild(button);
  });
  const selected = matches.find((file) => file.id === session.selectedFile) || matches[0];
  session.lastPlayerContext = { playerId: selected.id.replace("player ", ""), corruptionBand: selected.corruption };
  fileDetailNode.innerHTML = `
    <h3>${selected.id.toUpperCase()}</h3>
    <p class="panel-small">${selected.status} | world-integrity ${selected.integrity}%</p>
    <div class="file-detail-grid">
      <div><span class="panel-label">Corruption</span><p class="panel-value">${selected.corruption}</p></div>
      <div><span class="panel-label">Curiosity</span><p class="panel-value">${selected.curiosity}</p></div>
      <div><span class="panel-label">Anomaly</span><p class="panel-value">${selected.anomaly}</p></div>
      <div><span class="panel-label">Dream Telemetry</span><p class="panel-value">${selected.telemetry}</p></div>
      <div><span class="panel-label">Last Action</span><p class="panel-value">${selected.lastAction}</p></div>
      <div><span class="panel-label">Admin Note</span><p class="panel-value">${selected.note}</p></div>
    </div>
  `;
}

function renderAccentSwatches() {
  accentSwatchesNode.innerHTML = "";
  ACCENT_PRESETS.forEach((preset) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `swatch ${preset.value === session.accent ? "active" : ""}`.trim();
    button.style.background = preset.value;
    button.style.color = preset.value;
    button.title = preset.name;
    button.addEventListener("click", () => {
      session.accent = preset.value;
      applyAccent(preset.value);
      renderAccentSwatches();
    });
    accentSwatchesNode.appendChild(button);
  });
  typingSpeedInput.value = String(session.settings.typingDelay);
  scanlineInput.value = session.settings.scanline;
  densityInput.value = session.settings.density;
  symbolHelperInput.checked = session.settings.symbolHelper;
}

function setActivePanel(panelId) {
  if (panelId === "files-panel" && !canCurrentUserUse("files_panel")) {
    return;
  }
  if (panelId === "calendar-panel" && !canCurrentUserUse("calendar_panel")) {
    return;
  }
  session.selectedPanel = panelId;
  railButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === panelId);
  });
  panelViews.forEach((panel) => {
    panel.classList.toggle("active", panel.id === panelId);
  });
}

function updatePanelVisibility() {
  railButtons.forEach((button) => {
    const panelId = button.dataset.panel;
    const disabled =
      (panelId === "files-panel" && !canCurrentUserUse("files_panel")) ||
      (panelId === "calendar-panel" && !canCurrentUserUse("calendar_panel"));
    button.disabled = disabled;
    button.classList.toggle("disabled", disabled);
  });
}

function applyAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  document.documentElement.style.setProperty("--line-bright", `${color}aa`);
  document.documentElement.style.setProperty("--line", `${color}33`);
}

function transformOutgoingMessage(text) {
  const account = ACCOUNTS[session.currentUser];
  return account && account.role === "silence" ? reverseWords(text) : text;
}

function isValidRecipientList(recipients) {
  return recipients.length && recipients.every((recipient) => ACCOUNTS[recipient]);
}

function canCurrentUserUse(commandKey) {
  const account = ACCOUNTS[session.currentUser];
  return Boolean(account) && (account.canUse.includes("*") || account.canUse.includes(commandKey));
}

function resolveReply(definition, raw) {
  if (definition.reply) {
    return definition.reply;
  }
  return definition.generator(raw);
}

function getInbox(user) {
  if (!session.inboxes[user]) {
    session.inboxes[user] = [];
  }
  return session.inboxes[user];
}

function deliverMessage(user, message) {
  getInbox(user).push({
    from: message.from,
    type: message.type,
    body: message.body,
    details: message.details || "",
    read: user === session.currentUser
  });
}

function getThreadWith(symbol) {
  const incoming = getInbox(session.currentUser).filter((message) => message.from === symbol);
  const outgoing = getInbox(symbol).filter((message) => message.from === session.currentUser);
  return [...incoming, ...outgoing];
}

function formatInboxMessage(message) {
  const detailLine = message.details ? `\n${message.details}` : "";
  const label = message.type === "reply-sent" ? "REPLY SENT" : message.type.toUpperCase();
  return `${label} | from ${message.from}\n${message.body}${detailLine}`;
}

function getVisibleCalendarEvents() {
  const account = ACCOUNTS[session.currentUser];
  const scope = account && account.role ? account.role : ROLE_SCOPES[session.currentUser];
  return [...STATIC_CALENDAR_EVENTS, ...session.customDates].filter((event) => event.scope === "all" || event.scope === scope);
}

function generatePlayerFiles(count) {
  const corruptionBands = ["green-band", "yellow-band", "yellow-band", "orange-band"];
  const anomalies = ["corridor-loop recursion", "non-existent door motif", "metal hum resonance", "shadow-lag residue", "memory shear", "gate-perimeter fixation"];
  const telemetryStates = ["partial interference flagged", "clean but unstable", "cross-signal contamination suspected", "observation stable"];
  const lastActions = ["unauthorized inspection of gate perimeter", "dark-zone sector mapping", "unlogged dream anchor contact", "passive archive adjacency drift"];
  const notes = ["monitor for escalation", "routine review pending", "forward if pulse amplitude rises", "field contact discouraged"];
  const files = [];
  for (let index = 1; index <= count; index += 1) {
    files.push({
      id: `player ${String(index).padStart(5, "0")}`,
      status: index % 17 === 0 ? "PARTIALLY REDACTED" : index % 5 === 0 ? "OBSERVED" : "ACTIVE",
      integrity: 66 + (index % 29),
      corruption: corruptionBands[index % corruptionBands.length],
      curiosity: ["stable", "elevated", "acute"][index % 3],
      anomaly: anomalies[index % anomalies.length],
      telemetry: telemetryStates[index % telemetryStates.length],
      lastAction: lastActions[index % lastActions.length],
      note: notes[index % notes.length]
    });
  }
  return files;
}

async function writeLines(lines, type) {
  for (const line of lines) {
    writeEntry(type, line);
    if (session.settings.typingDelay > 0) {
      // eslint-disable-next-line no-await-in-loop
      await delay(session.settings.typingDelay);
    }
  }
}

function writeEntry(type, text) {
  const node = document.createElement("div");
  node.className = `entry ${type}`;
  node.textContent = text;
  terminal.appendChild(node);
  terminal.scrollTop = terminal.scrollHeight;
}

function findCommandKey(normalized) {
  const exact = Object.keys(knownCommands).find((key) => normalized === key);
  return exact || Object.keys(knownCommands).find((key) => normalized.startsWith(key));
}

function normalizeCommand(command) {
  return command
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[:.]+$/g, "")
    .replace(/[^a-z0-9_@#?(){}\-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/_@/g, "@")
    .replace(/^_+|_+$/g, "");
}

function isExactCommand(raw, expected) {
  return normalizeCommand(raw) === normalizeCommand(expected);
}

function parseRecipientList(rawList) {
  return rawList.split(",").map((part) => part.trim().replace(/^@/, "")).filter(Boolean);
}

function reverseWords(text) {
  return text.split(" ").map((word) => word.split("").reverse().join("")).join(" ");
}

function randomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function extractPlayerId(raw) {
  const match = raw.match(/#(\d{1,4})/);
  return match ? match[1] : `${randomInt(41, 1453)}`;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function accessDreamsReport() {
  return [
    "Dream archives access granted.",
    "REM telemetry channels, anomaly flags, and player sleep residues are live."
  ];
}

function playerArchiveReport(raw) {
  const playerId = extractPlayerId(raw).padStart(5, "0");
  const match = session.playerFiles.find((file) => file.id === `player ${playerId}`);
  if (match) {
    session.lastPlayerContext = { playerId, corruptionBand: match.corruption };
    session.selectedFile = match.id;
    renderFiles();
    return [
      `PLAYER PROFILE: ${playerId}`,
      `status: ${match.status}`,
      `world-integrity: ${match.integrity}%`,
      `corruption-index: ${match.corruption}`,
      `curiosity-vector: ${match.curiosity}`,
      `last observed action: ${match.lastAction}`,
      `dream-telemetry: ${match.telemetry}`,
      "Additional drill-downs available."
    ];
  }
  return ["Player archive lookup returned no result."];
}

function dreamTelemetryReport() {
  return [
    "initiating_dream-telemetry_review...",
    `cycle_window: ${randomInt(1, 4).toString().padStart(2, "0")}:${randomInt(0, 59).toString().padStart(2, "0")}-${randomInt(4, 6).toString().padStart(2, "0")}:${randomInt(0, 59).toString().padStart(2, "0")}`,
    `neural-drift: ${randomChoice(["within tolerance", "above baseline", "volatile but containable"])}`,
    `intrusion patterns: ${randomChoice(["intermittent, non-human signature", "door-adjacent artifacting", "corridor-loop recursion with unknown source"])}`,
    `anomaly vector: ${randomChoice(["repeating harmonic pulse every 19-23 seconds", "static scrape resonance clustered near REM onset", "non-existent architecture imprint detected"])}`,
    `resistance markers: ${randomChoice(["subconscious suppression attempted twice; both attempts failed", "player remained passive through contamination event", "short-lived rejection spike recorded at wake threshold"])}`,
    `recommended action: ${randomChoice(["observational containment", "shadow review only", `escalate to ${SYMBOLS.OVERSEER} for deep-dream extraction if pulse amplitude increases`])}`
  ];
}

function archiveRangeSummary() {
  return [
    "ARCHIVE RANGE SUMMARY",
    `total records: ${session.playerFiles.length}`,
    `active players: ${session.playerFiles.filter((file) => file.status === "ACTIVE").length}`,
    `observed players: ${session.playerFiles.filter((file) => file.status === "OBSERVED").length}`,
    `redacted files: ${session.playerFiles.filter((file) => file.status === "PARTIALLY REDACTED").length}`,
    `R-signature detections: ${session.playerFiles.filter((file) => file.corruption !== "green-band").length}`,
    "ready_for_drilldown or new command"
  ];
}

function riskArchiveReport() {
  return [
    "Access protocol acknowledged. Querying high-risk player archives...",
    `Archives flagged: ${randomChoice(["#52-#120", "#65-#118", "#77-#145"])}`,
    "Risk assessment: Elevated for memory corruption, anomalous world interactions, and R-influenced activity",
    `Dream telemetry: ${randomChoice(["Active logging indicates recurring intrusion attempts and inconsistent narrative loops", "Multiple non-linear dream structures detected with weak suppression markers", "Archive residue suggests observer contact beyond standard player schema"])}`,
    "Recommendation: Maintain strict containment and limit external communication with these players."
  ];
}

function cameraFeedReport(raw) {
  const sector = raw.replace(/^view_camera_?/i, "").replace(/_/g, " ").trim() || "F1 Entry";
  return [
    `Camera ${sector} feed is now active.`,
    `Lighting: ${randomChoice(["Standard overhead, no anomalies detected", "Dimmed by power-saving mode", "Stable with occasional pulse flicker"])}`,
    `Occupants: ${randomChoice(["None currently present", "One individual at perimeter range", "Area appears clear, motion ghosting unresolved"])}`,
    `Doors/Exits: ${randomChoice(["Locked and secure", "One access point partially open", "Sealed under local override"])}`,
    `Motion sensors: ${randomChoice(["Inactive", "Triggered, movement logged", "Active with low-confidence micro-movement traces"])}`,
    `Operational takeaway: ${randomChoice(["No unusual activity detected at this time", "Maintain observation; entry behavior remains inconclusive", "Pattern variance suggests the feed is being studied from the opposite side"])}`
  ];
}

function individualScanReport() {
  return [
    "Individual scan initiated.",
    `Identification: ${randomChoice(["Unknown-no match in Admin or Player databases", "Partial match suppressed by archive redaction", "Unresolved; profile shear detected during lookup"])}`,
    `Appearance: ${randomChoice(["Human-like, standard build, wearing non-uniform clothing", "Near-human silhouette with unstable edge fidelity", "Cohesive form, but thermal layering does not match baseline"])}`,
    `Anomalies: ${randomChoice(["Slight energy signature fluctuation detected", "Low-frequency Y-drift visible at the extremities", "No overt deformation, but telemetry trails persist after motion"])}`,
    `Threat Level: ${randomChoice(["Moderate", "Moderate", "Elevated"])}`,
    `Recommendation: ${randomChoice(["Continue monitoring; prepare containment if entry is attempted", "Advance to motive analysis before escalation", "Lock perimeter and avoid unsandboxed contact"])}`
  ];
}

function lockdownReport(raw) {
  const zone = raw.replace(/^lockdown_?/i, "").replace(/_/g, " ").trim() || "local choke point";
  return [
    `Lockdown protocol engaged: ${zone} is now sealed.`,
    `Entry doors: ${randomChoice(["Fully secured", "Secured with fallback relays armed", "Sealed and cycling integrity checks"])}`,
    "Motion sensors: Active and monitoring",
    `Containment status: ${randomChoice(["Boundary holding", "No breach vectors detected", "Adaptive learning risk present, but contained"])}`,
    "All systems are holding; breach risk minimized."
  ];
}

function captureReport() {
  return [
    "Force-ID capture executed.",
    "Biometric lock engaged. Retinal, gait, thermal, and energy-signature data extracted.",
    `Identity: ${randomChoice(["Unresolved", "Non-registered entity", "Suppressed by external masking layer"])}`,
    `Classification: ${randomChoice(["Pre-manifest Y-signature drift", "Boundary probe", "Archive-adjacent intrusion shell"])}`,
    `Operational insight: ${randomChoice(["This is not a full Y-entity, but a precursor", "Telemetry suggests a seeded probe testing perimeter response latency", "The subject appears optimized for reconnaissance, not direct conflict"])}`,
    "Recommend escalation to hard quarantine or controlled neutralization."
  ];
}

function motiveReport() {
  return [
    "Decipher-motive module engaged.",
    `Behavioral vectors: ${randomChoice(["Slow approach, non-linear pathing, periodic pauses", "Passive observation punctuated by short telemetry spikes", "Boundary fixation with recursive reorientation"])}`,
    `Intent probability model: ${randomChoice(["62% perimeter probing, 27% response-cycle testing", "54% intelligence acquisition, 29% corruption seeding", "68% lockdown pattern analysis, 22% route calibration"])}`,
    `Strategic assessment: ${randomChoice(["The entity is calibrating entry vectors for a future incursion", "Observed behavior suggests intelligence acquisition rather than immediate breach", "The current posture implies rehearsal, not commitment"])}`,
    `Recommendation: ${randomChoice(["Maintain choke-point lockdown and deploy signal jamming", "Advance to targeted destabilization of the Y-signature", "Keep the entity under observation and deny outbound learning"])}`
  ];
}

function proceedReport() {
  return [
    "Override sequence engaged.",
    `Gate status: ${randomChoice(["temporarily unlocked", "in supervised bypass mode", "cleared for a narrow access window"])}`,
    `Security monitoring active. Duration: ${randomChoice(["1.2 minutes", "90 seconds", "2.1 minutes"])}`,
    "All ingress and egress logged."
  ];
}

function generateHeuristicResponse(raw) {
  const normalized = normalizeCommand(raw);
  if (normalized.includes("gate")) {
    return [
      "Gate access request received.",
      `Status: ${randomChoice(["locked", "monitor-only", "responsive under partial override"])}`,
      `Recommendation: ${randomChoice(["verify Admin clearance", "check current gate activity", "initiate temporary unlock sequence only if containment remains stable"])}`
    ];
  }
  if (normalized.includes("dream")) {
    return [
      "Dream subsystem acknowledged.",
      `Telemetry status: ${randomChoice(["active with mild interference", "archived and ready for playback", "available, but noise layers remain unresolved"])}`,
      `Interpretation: ${randomChoice(["non-linear imagery suggests boundary pressure", "player subconscious is resisting a foreign imprint", "dream-root anchor not yet confirmed"])}`
    ];
  }
  if (normalized.includes("message")) {
    return [
      "Message channel recognized, but syntax is incomplete.",
      `Use: direct_message(@user:${SYMBOLS.OVERSEER}): your text here`,
      `Or: reply(@${SYMBOLS.OVERSEER})=your reply here`
    ];
  }
  return [
    "Command acknowledged, but no direct archive match was found.",
    `Interpretive engine response: ${randomChoice(["low-confidence command shape resembles an analysis request", "syntax suggests a custom subsystem call", "request structure is incomplete but semantically familiar"])}`,
    `Next step: ${randomChoice(["refine the command with a player, gate, or camera target", "append a clearer sector or archive identifier", "use one of the suggested commands as a template"])}`
  ];
}

function seedInboxes() {
  return {
    [SYMBOLS.MEMORY]: [
      { from: SYMBOLS.OVERSEER, type: "direct-message", body: "archive drift near player 77. confirm wipe threshold.", details: "", read: false }
    ],
    [SYMBOLS.CURIOSITY]: [
      { from: SYMBOLS.HUNGER, type: "direct-message", body: "gate hall clear for now. keep listening.", details: "", read: false }
    ],
    [SYMBOLS.SLEEP]: [
      { from: SYMBOLS.OVERSEER, type: "direct-message", body: "dream telemetry from 1453 remains unstable.", details: "", read: false }
    ],
    [SYMBOLS.HUNGER]: [
      { from: SYMBOLS.CURIOSITY, type: "direct-message", body: "perimeter contact paused at the choke.", details: "", read: false }
    ],
    [SYMBOLS.OVERSEER]: [
      { from: SYMBOLS.MEMORY, type: "flag", body: "player 103 flagged for yellow-band", details: "Archive note: non-existent door motif persisted through review.", read: false }
    ]
  };
}
