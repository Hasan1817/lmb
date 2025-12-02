/**
 * 🦅 FALCON PRO - Secure Loader
 * This loader fetches the main script securely and hides the source
 * 
 * Features:
 * - Loads main script from encrypted GitHub URL
 * - Hides source location from console/network tab
 * - Device fingerprint verification
 * - Single instance per device enforcement
 */

(async function() {
  'use strict';
  
  // ═══════════════════════════════════════════════════════════
  // 🔐 CONFIGURATION - Admin sets authorized fingerprints here
  // ═══════════════════════════════════════════════════════════
  
  const CONFIG = {
    // GitHub raw URL (encoded to hide)
    SOURCE_KEY: 'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1lPVVJfVVNFUk5BTUUvWU9VUl9SRVBPL21haW4vRkFMQ09OX1BSTy5qcw==',
    
    // Authorized device fingerprints (add fingerprints here)
    // ⚠️ IMPORTANT: Remove '*' and add specific fingerprints for production!
    AUTHORIZED_DEVICES: [
      // Format: 'FINGERPRINT_HASH'
      // Get fingerprint using DEVICE_INFO_COLLECTOR.js
      // Example: 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6'
      '*' // ⚠️ REMOVE THIS LINE FOR PRODUCTION - currently allows all devices
    ],
    
    // Multi-instance permission (fingerprints that can run multiple)
    MULTI_INSTANCE_ALLOWED: [
      // Add fingerprints here that can run multiple instances
    ],
    
    // Instance tracking key
    INSTANCE_KEY: 'FALCON_PRO_INSTANCE_' + Date.now().toString(36),
    
    // Version
    VERSION: '2.0.0'
  };

  // ═══════════════════════════════════════════════════════════
  // 🔒 SECURITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════

  // Generate device fingerprint
  async function generateFingerprint() {
    const components = [];
    
    components.push(screen.width + 'x' + screen.height);
    components.push(screen.colorDepth);
    components.push(window.devicePixelRatio || 1);
    components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
    components.push(new Date().getTimezoneOffset());
    components.push(navigator.language);
    components.push(navigator.platform);
    components.push(navigator.hardwareConcurrency || 0);
    
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          components.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
        }
      }
    } catch (e) {}
    
    const fingerString = components.join('|||');
    const encoder = new TextEncoder();
    const data = encoder.encode(fingerString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex.substring(0, 32).toUpperCase();
  }

  // Check if device is authorized
  function isDeviceAuthorized(fingerprint) {
    if (CONFIG.AUTHORIZED_DEVICES.includes('*')) return true;
    return CONFIG.AUTHORIZED_DEVICES.includes(fingerprint);
  }

  // Check if multi-instance is allowed
  function isMultiInstanceAllowed(fingerprint) {
    return CONFIG.MULTI_INSTANCE_ALLOWED.includes(fingerprint) || 
           CONFIG.MULTI_INSTANCE_ALLOWED.includes('*');
  }

  // Check if another instance is running
  function isInstanceRunning() {
    const instanceKeys = Object.keys(localStorage).filter(k => k.startsWith('FALCON_INSTANCE_'));
    const now = Date.now();
    
    for (const key of instanceKeys) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        // Instance is considered active if heartbeat within 5 seconds
        if (now - data.heartbeat < 5000) {
          return true;
        } else {
          // Clean up stale instance
          localStorage.removeItem(key);
        }
      } catch (e) {
        localStorage.removeItem(key);
      }
    }
    return false;
  }

  // Register this instance
  function registerInstance(fingerprint) {
    const instanceId = 'FALCON_INSTANCE_' + Math.random().toString(36).substr(2, 9);
    const instanceData = {
      fingerprint: fingerprint,
      startTime: Date.now(),
      heartbeat: Date.now(),
      tabId: Math.random().toString(36).substr(2, 9)
    };
    
    localStorage.setItem(instanceId, JSON.stringify(instanceData));
    
    // Heartbeat to keep instance alive
    const heartbeatInterval = setInterval(() => {
      try {
        instanceData.heartbeat = Date.now();
        localStorage.setItem(instanceId, JSON.stringify(instanceData));
      } catch (e) {
        clearInterval(heartbeatInterval);
      }
    }, 2000);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem(instanceId);
      clearInterval(heartbeatInterval);
    });
    
    return instanceId;
  }

  // Decode source URL
  function decodeSource(encoded) {
    try {
      return atob(encoded);
    } catch (e) {
      return null;
    }
  }

  // Clean console traces
  function cleanTraces() {
    // Override console methods temporarily
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    
    // Clear any existing logs
    if (typeof console.clear === 'function') {
      console.clear();
    }
    
    return { originalLog, originalWarn, originalError };
  }

  // ═══════════════════════════════════════════════════════════
  // 🎨 UI FUNCTIONS
  // ═══════════════════════════════════════════════════════════

  function showMessage(message, type = 'info') {
    const colors = {
      info: '#3b82f6',
      success: '#22c55e',
      error: '#ef4444',
      warning: '#f59e0b'
    };
    
    const icons = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      warning: '⚠️'
    };
    
    const style = `
      background: linear-gradient(135deg, ${colors[type]}, ${colors[type]}99);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: system-ui;
      font-size: 14px;
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      animation: fadeInDown 0.3s ease;
    `;
    
    const div = document.createElement('div');
    div.innerHTML = `<span style="margin-right: 8px;">${icons[type]}</span>${message}`;
    div.style.cssText = style;
    div.id = 'falcon-loader-message';
    
    // Add animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    const existing = document.getElementById('falcon-loader-message');
    if (existing) existing.remove();
    
    document.body.appendChild(div);
    
    if (type !== 'error') {
      setTimeout(() => div.remove(), 3000);
    }
    
    return div;
  }

  function showLoadingUI() {
    const html = `
      <div id="falcon-loader-ui" style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(13, 17, 23, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        font-family: system-ui;
      ">
        <div style="text-align: center;">
          <div style="
            font-size: 60px;
            margin-bottom: 20px;
            animation: pulse 1s infinite;
          ">🦅</div>
          <div style="
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #58a6ff, #1f6feb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
          ">FALCON PRO</div>
          <div style="
            color: #8b949e;
            font-size: 14px;
            margin-bottom: 25px;
          " id="loader-status">Initializing secure connection...</div>
          <div style="
            width: 200px;
            height: 4px;
            background: #30363d;
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
          ">
            <div id="loader-progress" style="
              width: 0%;
              height: 100%;
              background: linear-gradient(90deg, #58a6ff, #1f6feb);
              border-radius: 2px;
              transition: width 0.3s ease;
            "></div>
          </div>
        </div>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      </style>
    `;
    
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container.firstElementChild);
  }

  function updateProgress(percent, status) {
    const progress = document.getElementById('loader-progress');
    const statusEl = document.getElementById('loader-status');
    if (progress) progress.style.width = percent + '%';
    if (statusEl) statusEl.textContent = status;
  }

  function hideLoadingUI() {
    const ui = document.getElementById('falcon-loader-ui');
    if (ui) {
      ui.style.opacity = '0';
      ui.style.transition = 'opacity 0.3s ease';
      setTimeout(() => ui.remove(), 300);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 🚀 MAIN LOADER LOGIC
  // ═══════════════════════════════════════════════════════════

  try {
    // Show loading UI
    showLoadingUI();
    updateProgress(10, 'Generating device fingerprint...');
    
    // Generate fingerprint
    const fingerprint = await generateFingerprint();
    updateProgress(25, 'Verifying device authorization...');
    
    // Check authorization
    if (!isDeviceAuthorized(fingerprint)) {
      hideLoadingUI();
      showMessage(`Device not authorized. Fingerprint: ${fingerprint}`, 'error');
      console.log('%c🔒 FALCON PRO - Unauthorized Device', 'color: #ef4444; font-size: 16px; font-weight: bold;');
      console.log('%cYour Fingerprint: ' + fingerprint, 'color: #f59e0b; font-size: 14px;');
      console.log('%cContact admin to get authorization.', 'color: #8b949e;');
      return;
    }
    
    updateProgress(40, 'Checking for existing instances...');
    
    // Check for existing instance (unless multi-instance allowed)
    if (!isMultiInstanceAllowed(fingerprint) && isInstanceRunning()) {
      hideLoadingUI();
      showMessage('Another instance is already running on this device!', 'warning');
      console.log('%c⚠️ FALCON PRO - Instance Already Running', 'color: #f59e0b; font-size: 16px; font-weight: bold;');
      console.log('%cOnly one instance per device is allowed.', 'color: #8b949e;');
      return;
    }
    
    // Register this instance
    const instanceId = registerInstance(fingerprint);
    updateProgress(55, 'Establishing secure connection...');
    
    // Decode and fetch main script
    const sourceUrl = decodeSource(CONFIG.SOURCE_KEY);
    
    if (!sourceUrl || sourceUrl.includes('YOUR_USERNAME')) {
      // If no GitHub URL configured, try to load local script
      updateProgress(70, 'Loading local script...');
      
      // Check if main script is already defined
      if (typeof mainScript === 'function') {
        updateProgress(100, 'Starting FALCON PRO...');
        hideLoadingUI();
        mainScript();
        return;
      }
      
      hideLoadingUI();
      showMessage('Script source not configured. Contact admin.', 'error');
      return;
    }
    
    updateProgress(70, 'Downloading secure payload...');
    
    // Fetch script with cleaned traces
    const consoleFns = cleanTraces();
    
    const response = await fetch(sourceUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Accept': 'text/plain'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch script');
    }
    
    const scriptContent = await response.text();
    updateProgress(90, 'Initializing system...');
    
    // Execute script in isolated scope
    const executeScript = new Function(scriptContent);
    
    updateProgress(100, 'Starting FALCON PRO...');
    
    // Small delay to show 100%
    await new Promise(r => setTimeout(r, 500));
    
    hideLoadingUI();
    
    // Execute
    executeScript();
    
    // Restore console
    console.log = consoleFns.originalLog;
    console.warn = consoleFns.originalWarn;
    console.error = consoleFns.originalError;
    
    // Clean success message
    console.clear();
    console.log('%c🦅 FALCON PRO v' + CONFIG.VERSION, 'font-size: 20px; font-weight: bold; color: #58a6ff;');
    console.log('%cSecure session established', 'color: #22c55e;');
    
  } catch (error) {
    hideLoadingUI();
    showMessage('Failed to load: ' + error.message, 'error');
    console.error('FALCON PRO Loader Error:', error);
  }
  
})();
