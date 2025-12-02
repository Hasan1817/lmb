/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🦅 FALCON PRO - ADMIN PANEL v2.1.0
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Device authorization & management system
 * Run this in browser console to manage devices
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔒 FINGERPRINT GENERATOR (Same as in loader)
  // ═══════════════════════════════════════════════════════════════════════════
  
  async function generateFingerprint() {
    const c = [];
    c.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);
    c.push(screen.pixelDepth || 0);
    c.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
    c.push(new Date().getTimezoneOffset());
    c.push(navigator.language);
    c.push((navigator.languages || []).join(','));
    c.push(navigator.hardwareConcurrency || 0);
    c.push(navigator.deviceMemory || 0);
    c.push(navigator.maxTouchPoints || 0);
    c.push(navigator.platform);
    c.push(navigator.userAgent);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('FP', 2, 2);
      c.push(canvas.toDataURL().slice(-50));
    } catch (e) { c.push('ce'); }
    
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl');
      if (gl) {
        const d = gl.getExtension('WEBGL_debug_renderer_info');
        if (d) {
          c.push(gl.getParameter(d.UNMASKED_VENDOR_WEBGL));
          c.push(gl.getParameter(d.UNMASKED_RENDERER_WEBGL));
        }
      }
    } catch (e) { c.push('we'); }
    
    const data = c.join('|||');
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32).toUpperCase();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 📦 DEVICE DATABASE (localStorage based)
  // ═══════════════════════════════════════════════════════════════════════════
  
  const DB_KEY = 'falcon_admin_devices';
  
  function loadDevices() {
    try {
      return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }
  
  function saveDevices(devices) {
    localStorage.setItem(DB_KEY, JSON.stringify(devices));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎮 ADMIN COMMANDS
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FalconAdmin = {
    VERSION: '2.1.0',
    
    // Get current device fingerprint
    async myFingerprint() {
      const fp = await generateFingerprint();
      console.log('%c🔑 Your Device Fingerprint:', 'color:#00d4ff;font-size:14px;font-weight:bold');
      console.log('%c' + fp, 'color:#00ff9d;font-size:16px;font-family:monospace;background:#1a1f2e;padding:10px;border-radius:4px');
      
      navigator.clipboard.writeText(fp).then(() => {
        console.log('%c✓ Copied to clipboard!', 'color:#00ff9d');
      });
      
      return fp;
    },
    
    // Add authorized device
    addDevice(fingerprint, name = 'Unknown', multiInstance = false) {
      if (!fingerprint || fingerprint.length !== 32) {
        console.log('%c❌ Invalid fingerprint! Must be 32 characters.', 'color:#ff3b5c');
        return false;
      }
      
      const devices = loadDevices();
      const fp = fingerprint.toUpperCase();
      
      devices[fp] = {
        name: name,
        fingerprint: fp,
        multiInstance: multiInstance,
        addedAt: new Date().toISOString(),
        active: true
      };
      
      saveDevices(devices);
      
      console.log('%c✓ Device Added Successfully', 'color:#00ff9d;font-size:14px');
      console.log(`  Name: ${name}`);
      console.log(`  Fingerprint: ${fp}`);
      console.log(`  Multi-Instance: ${multiInstance ? 'Yes' : 'No'}`);
      
      return true;
    },
    
    // Remove device
    removeDevice(fingerprint) {
      const devices = loadDevices();
      const fp = fingerprint.toUpperCase();
      
      if (devices[fp]) {
        const name = devices[fp].name;
        delete devices[fp];
        saveDevices(devices);
        console.log('%c✓ Device Removed: ' + name, 'color:#ff3b5c;font-size:14px');
        return true;
      }
      
      console.log('%c❌ Device not found', 'color:#ffb800');
      return false;
    },
    
    // Toggle multi-instance
    setMultiInstance(fingerprint, allow) {
      const devices = loadDevices();
      const fp = fingerprint.toUpperCase();
      
      if (devices[fp]) {
        devices[fp].multiInstance = allow;
        saveDevices(devices);
        console.log(`%c✓ Multi-Instance ${allow ? 'Enabled' : 'Disabled'} for: ${devices[fp].name}`, allow ? 'color:#00ff9d' : 'color:#ff3b5c');
        return true;
      }
      
      console.log('%c❌ Device not found', 'color:#ffb800');
      return false;
    },
    
    // List all devices
    listDevices() {
      const devices = loadDevices();
      const keys = Object.keys(devices);
      
      console.log('%c\n🦅 FALCON PRO - Authorized Devices\n', 'font-size:18px;font-weight:bold;color:#00d4ff');
      console.log('═'.repeat(60));
      
      if (keys.length === 0) {
        console.log('%c  No devices authorized yet', 'color:#7d8590');
        console.log('%c  Use: FalconAdmin.addDevice("FINGERPRINT", "Name")', 'color:#7d8590');
      } else {
        keys.forEach((fp, i) => {
          const d = devices[fp];
          console.log(`%c${i + 1}. ${d.name}`, 'color:#e6edf3;font-weight:bold');
          console.log(`   Fingerprint: %c${fp}`, 'color:#00d4ff');
          console.log(`   Multi-Instance: ${d.multiInstance ? '%c✓ Yes' : '%c✗ No'}`, d.multiInstance ? 'color:#00ff9d' : 'color:#ff3b5c');
          console.log(`   Added: ${d.addedAt}`);
          console.log('─'.repeat(60));
        });
      }
      
      console.log(`\n%cTotal: ${keys.length} device(s)`, 'color:#7d8590');
      
      return devices;
    },
    
    // Verify a fingerprint
    verifyDevice(fingerprint) {
      const devices = loadDevices();
      const fp = fingerprint.toUpperCase();
      
      console.log('%c🔍 Verifying Device...', 'color:#00d4ff;font-size:14px');
      console.log(`   Fingerprint: ${fp}`);
      
      if (devices[fp]) {
        const d = devices[fp];
        console.log('%c✓ AUTHORIZED', 'color:#00ff9d;font-size:16px;font-weight:bold');
        console.log(`   Name: ${d.name}`);
        console.log(`   Multi-Instance: ${d.multiInstance ? 'Yes' : 'No'}`);
        return { authorized: true, device: d };
      } else {
        console.log('%c✗ NOT AUTHORIZED', 'color:#ff3b5c;font-size:16px;font-weight:bold');
        return { authorized: false };
      }
    },
    
    // Generate config for FALCON_ALL_IN_ONE.js
    // expiryDate format: 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:MM:SS' or null for unlimited
    generateConfig(expiryDate = null) {
      const devices = loadDevices();
      const keys = Object.keys(devices);
      const multiKeys = keys.filter(k => devices[k].multiInstance);
      
      // Format expiry
      let expiryStr = 'null';
      if (expiryDate) {
        expiryStr = `'${expiryDate}'`;
      }
      
      const config = `
  // ═══════════════════════════════════════════════════════════════════════════
  // 🔐 AUTHORIZATION CONFIG - Generated ${new Date().toISOString()}
  // ═══════════════════════════════════════════════════════════════════════════
  
  const AUTH_CONFIG = {
    // Authorized device fingerprints
    AUTHORIZED_DEVICES: [
${keys.length > 0 ? keys.map(k => `      '${k}',  // ${devices[k].name}`).join('\n') : "      // Add fingerprints here"}
    ],
    
    // Multiple tab permission
    MULTI_INSTANCE_ALLOWED: [
${multiKeys.length > 0 ? multiKeys.map(k => `      '${k}',  // ${devices[k].name}`).join('\n') : "      // Add fingerprints here"}
    ],
    
    // ⏰ EXPIRY SETTINGS
    // Format: 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:MM:SS' or null for unlimited
    EXPIRY_DATE: ${expiryStr},
    
    // Tampering detection (minutes)
    TAMPERING_THRESHOLD: 5,
    
    VERSION: '2.2.0'
  };
`;
      
      console.log('%c📋 Config Generated - Copy this to FALCON_ALL_IN_ONE.js:', 'color:#00d4ff;font-size:14px');
      console.log(config);
      
      if (expiryDate) {
        const expDate = new Date(expiryDate);
        const daysLeft = Math.ceil((expDate - new Date()) / (1000 * 60 * 60 * 24));
        console.log(`%c⏰ Expiry: ${expDate.toLocaleDateString('en-GB')} (${daysLeft} days from now)`, 'color:#ffb800');
      } else {
        console.log('%c⏰ Expiry: Unlimited (no expiry date set)', 'color:#00ff9d');
      }
      
      navigator.clipboard.writeText(config).then(() => {
        console.log('%c✓ Copied to clipboard!', 'color:#00ff9d');
      });
      
      return config;
    },
    
    // Helper to create expiry date
    setExpiry(days) {
      const date = new Date();
      date.setDate(date.getDate() + days);
      const expiry = date.toISOString().split('T')[0] + 'T23:59:59';
      console.log(`%c⏰ Expiry date for ${days} days:`, 'color:#00d4ff;font-size:14px');
      console.log('%c' + expiry, 'color:#00ff9d;font-family:monospace');
      console.log('%cUse: FalconAdmin.generateConfig("' + expiry + '")', 'color:#7d8590');
      return expiry;
    },
    
    // Export devices as JSON
    exportDevices() {
      const devices = loadDevices();
      const json = JSON.stringify(devices, null, 2);
      
      console.log('%c📦 Devices Export:', 'color:#00d4ff;font-size:14px');
      console.log(json);
      
      navigator.clipboard.writeText(json).then(() => {
        console.log('%c✓ Copied to clipboard!', 'color:#00ff9d');
      });
      
      return json;
    },
    
    // Import devices from JSON
    importDevices(json) {
      try {
        const devices = typeof json === 'string' ? JSON.parse(json) : json;
        saveDevices(devices);
        console.log('%c✓ Devices imported successfully!', 'color:#00ff9d;font-size:14px');
        this.listDevices();
        return true;
      } catch (e) {
        console.log('%c❌ Invalid JSON format', 'color:#ff3b5c');
        return false;
      }
    },
    
    // Clear all devices
    clearAll() {
      if (confirm('Are you sure? This will remove ALL authorized devices.')) {
        saveDevices({});
        console.log('%c✓ All devices cleared', 'color:#ff3b5c;font-size:14px');
        return true;
      }
      return false;
    },
    
    // Show help
    help() {
      console.log(`
%c🦅 FALCON PRO ADMIN v${this.VERSION}

%c📱 Device Management:
%c  FalconAdmin.myFingerprint()                  - Get this device's fingerprint
  FalconAdmin.addDevice(fp, name, multi)       - Add authorized device
  FalconAdmin.removeDevice(fp)                 - Remove device
  FalconAdmin.setMultiInstance(fp, true/false) - Toggle multi-instance
  FalconAdmin.listDevices()                    - Show all devices
  FalconAdmin.verifyDevice(fp)                 - Check if device is authorized

%c⏰ Expiry & Time Limit:
%c  FalconAdmin.setExpiry(30)                    - Get expiry date for 30 days
  FalconAdmin.generateConfig('2025-06-30')     - Config with specific expiry
  FalconAdmin.generateConfig()                 - Config without expiry (unlimited)

%c⚙️ Configuration:
%c  FalconAdmin.generateConfig(expiry)          - Generate config for script
  FalconAdmin.exportDevices()                  - Export as JSON
  FalconAdmin.importDevices(json)              - Import from JSON
  FalconAdmin.clearAll()                       - Remove all devices

%c📋 Example Workflow:
%c  1. User runs DEVICE_INFO_COLLECTOR.js → gets fingerprint
  2. Admin runs: FalconAdmin.addDevice("ABC123...", "User Name")
  3. Admin runs: FalconAdmin.setExpiry(30)     → gets expiry for 30 days
  4. Admin runs: FalconAdmin.generateConfig("2025-06-30T23:59:59")
  5. Admin pastes config into FALCON_ALL_IN_ONE.js
  6. User gets the updated script
`,
        'font-size:20px;font-weight:bold;color:#00d4ff',
        'color:#00ff9d;font-weight:bold',
        'color:#e6edf3',
        'color:#ffb800;font-weight:bold',
        'color:#e6edf3',
        'color:#8b5cf6;font-weight:bold',
        'color:#e6edf3',
        'color:#ff3b5c;font-weight:bold',
        'color:#e6edf3'
      );
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 🚀 INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  console.clear();
  console.log('%c🦅 FALCON PRO ADMIN v' + window.FalconAdmin.VERSION, 'font-size:24px;font-weight:bold;color:#00d4ff');
  console.log('%c─'.repeat(40), 'color:#30363d');
  console.log('%cType %cFalconAdmin.help()%c for commands', 'color:#7d8590', 'color:#00d4ff;font-weight:bold', 'color:#7d8590');
  console.log('%c─'.repeat(40), 'color:#30363d');
  
  // Auto-show current device fingerprint
  generateFingerprint().then(fp => {
    console.log('%c\n🔑 This Device:', 'color:#ffb800;font-weight:bold');
    console.log('%c' + fp, 'color:#00ff9d;font-family:monospace');
    
    // Auto-verify
    const devices = loadDevices();
    if (devices[fp]) {
      console.log('%c✓ Status: Authorized (' + devices[fp].name + ')', 'color:#00ff9d');
    } else {
      console.log('%c✗ Status: Not in authorized list', 'color:#ff3b5c');
    }
  });

})();
