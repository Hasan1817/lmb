/**
 * 🦅 FALCON PRO - Admin Permission Manager
 * Use this to manage device authorizations
 * 
 * How to use:
 * 1. Run DEVICE_INFO_COLLECTOR.js on user's device to get their fingerprint
 * 2. Add fingerprint to AUTHORIZED_DEVICES in FALCON_LOADER.js
 * 3. For multi-instance access, add to MULTI_INSTANCE_ALLOWED
 */

const FalconAdmin = {
  // Current version
  VERSION: '2.0.0',
  
  // Storage for authorized devices (in production, use server-side database)
  authorizedDevices: new Map(),
  multiInstanceDevices: new Set(),
  
  /**
   * Add a device to authorized list
   * @param {string} fingerprint - Device fingerprint from collector
   * @param {string} name - User/device name for reference
   * @param {boolean} multiInstance - Allow multiple instances
   */
  authorizeDevice(fingerprint, name = 'Unknown', multiInstance = false) {
    const deviceData = {
      fingerprint: fingerprint.toUpperCase(),
      name: name,
      authorizedAt: new Date().toISOString(),
      multiInstance: multiInstance,
      active: true
    };
    
    this.authorizedDevices.set(fingerprint.toUpperCase(), deviceData);
    
    if (multiInstance) {
      this.multiInstanceDevices.add(fingerprint.toUpperCase());
    }
    
    console.log(`%c✓ Device Authorized: ${name}`, 'color: #00ff9d; font-size: 14px;');
    console.log(`  Fingerprint: ${fingerprint}`);
    console.log(`  Multi-Instance: ${multiInstance ? 'Yes' : 'No'}`);
    
    return deviceData;
  },
  
  /**
   * Remove device authorization
   * @param {string} fingerprint - Device fingerprint
   */
  revokeDevice(fingerprint) {
    const fp = fingerprint.toUpperCase();
    if (this.authorizedDevices.has(fp)) {
      const device = this.authorizedDevices.get(fp);
      this.authorizedDevices.delete(fp);
      this.multiInstanceDevices.delete(fp);
      console.log(`%c✗ Device Revoked: ${device.name}`, 'color: #ff3b5c; font-size: 14px;');
      return true;
    }
    console.log(`%c⚠ Device not found`, 'color: #ffb800;');
    return false;
  },
  
  /**
   * Enable/disable multi-instance for a device
   * @param {string} fingerprint - Device fingerprint
   * @param {boolean} enable - Enable or disable
   */
  setMultiInstance(fingerprint, enable) {
    const fp = fingerprint.toUpperCase();
    if (this.authorizedDevices.has(fp)) {
      const device = this.authorizedDevices.get(fp);
      device.multiInstance = enable;
      
      if (enable) {
        this.multiInstanceDevices.add(fp);
        console.log(`%c✓ Multi-Instance Enabled for: ${device.name}`, 'color: #00ff9d;');
      } else {
        this.multiInstanceDevices.delete(fp);
        console.log(`%c✗ Multi-Instance Disabled for: ${device.name}`, 'color: #ff3b5c;');
      }
      return true;
    }
    return false;
  },
  
  /**
   * List all authorized devices
   */
  listDevices() {
    console.log('%c\n🦅 FALCON PRO - Authorized Devices\n', 'font-size: 16px; font-weight: bold; color: #00d4ff;');
    console.log('─'.repeat(60));
    
    if (this.authorizedDevices.size === 0) {
      console.log('%cNo devices authorized', 'color: #7d8590;');
      return [];
    }
    
    const devices = [];
    this.authorizedDevices.forEach((device, fp) => {
      devices.push(device);
      console.log(`%c${device.name}`, 'color: #e6edf3; font-weight: bold;');
      console.log(`  Fingerprint: %c${fp}`, 'color: #00d4ff;');
      console.log(`  Authorized: ${device.authorizedAt}`);
      console.log(`  Multi-Instance: ${device.multiInstance ? '%c✓ Yes' : '%c✗ No'}`, device.multiInstance ? 'color: #00ff9d;' : 'color: #ff3b5c;');
      console.log('─'.repeat(60));
    });
    
    return devices;
  },
  
  /**
   * Generate loader config for export
   */
  generateLoaderConfig() {
    const authorizedList = Array.from(this.authorizedDevices.keys());
    const multiInstanceList = Array.from(this.multiInstanceDevices);
    
    const config = `
// ═══════════════════════════════════════════════════════════
// 🔐 FALCON PRO - LOADER CONFIGURATION
// Generated: ${new Date().toISOString()}
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  // GitHub raw URL (base64 encoded)
  SOURCE_KEY: 'YOUR_GITHUB_RAW_URL_BASE64',
  
  // Authorized device fingerprints
  AUTHORIZED_DEVICES: [
${authorizedList.map(fp => `    '${fp}'`).join(',\n') || "    // Add fingerprints here"}
  ],
  
  // Multi-instance permission (can run multiple tabs)
  MULTI_INSTANCE_ALLOWED: [
${multiInstanceList.map(fp => `    '${fp}'`).join(',\n') || "    // Add fingerprints here"}
  ],
  
  VERSION: '${this.VERSION}'
};
`;
    
    console.log('%c📋 Loader Config Generated:', 'color: #00d4ff; font-size: 14px;');
    console.log(config);
    
    // Copy to clipboard
    navigator.clipboard.writeText(config).then(() => {
      console.log('%c✓ Config copied to clipboard!', 'color: #00ff9d;');
    }).catch(() => {
      console.log('%c⚠ Could not copy to clipboard', 'color: #ffb800;');
    });
    
    return config;
  },
  
  /**
   * Generate base64 encoded GitHub URL
   * @param {string} rawUrl - GitHub raw URL
   */
  encodeGitHubUrl(rawUrl) {
    const encoded = btoa(rawUrl);
    console.log('%c🔐 Encoded GitHub URL:', 'color: #00d4ff; font-size: 14px;');
    console.log(`%c${encoded}`, 'color: #00ff9d; font-family: monospace;');
    
    navigator.clipboard.writeText(encoded).then(() => {
      console.log('%c✓ Copied to clipboard!', 'color: #00ff9d;');
    });
    
    return encoded;
  },
  
  /**
   * Show help
   */
  help() {
    console.log(`
%c🦅 FALCON PRO - Admin Commands

%cDevice Management:
  FalconAdmin.authorizeDevice(fingerprint, name, multiInstance)
  FalconAdmin.revokeDevice(fingerprint)
  FalconAdmin.setMultiInstance(fingerprint, true/false)
  FalconAdmin.listDevices()

%cConfiguration:
  FalconAdmin.generateLoaderConfig()
  FalconAdmin.encodeGitHubUrl('https://raw.githubusercontent.com/...')

%cExample:
  FalconAdmin.authorizeDevice('A1B2C3D4E5F6G7H8', 'John PC', false)
  FalconAdmin.setMultiInstance('A1B2C3D4E5F6G7H8', true)
  FalconAdmin.listDevices()
  FalconAdmin.generateLoaderConfig()
`,
      'font-size: 18px; font-weight: bold; color: #00d4ff;',
      'color: #00ff9d; font-weight: bold;',
      'color: #ffb800; font-weight: bold;',
      'color: #8b5cf6; font-weight: bold;'
    );
  }
};

// Auto-show help on load
console.clear();
console.log('%c🦅 FALCON PRO Admin Panel Loaded', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%cType FalconAdmin.help() for commands', 'color: #7d8590;');

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FalconAdmin;
}
