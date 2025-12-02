/**
 * 🔍 FALCON PRO - Device Info Collector
 * Collects browser and device information for authorization
 * Run this in browser console to get device fingerprint
 */

(async function() {
  'use strict';
  
  const styles = {
    container: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; font-family: system-ui; max-width: 600px; margin: 20px auto;',
    header: 'font-size: 24px; font-weight: bold; margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
    section: 'background: rgba(255,255,255,0.15); padding: 12px; border-radius: 8px; margin: 10px 0;',
    label: 'color: #ffd700; font-weight: bold; display: block; margin-bottom: 5px;',
    value: 'color: #fff; font-family: monospace; word-break: break-all;',
    fingerprint: 'background: #1a1a2e; color: #00ff88; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 14px; text-align: center; letter-spacing: 1px;',
    button: 'background: linear-gradient(135deg, #00c853, #69f0ae); color: #000; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; margin: 5px; font-size: 14px;',
    copySuccess: 'background: #4caf50; color: white; padding: 8px 16px; border-radius: 4px; margin-top: 10px;'
  };

  // Generate unique fingerprint
  async function generateFingerprint() {
    const components = [];
    
    // Screen info
    components.push(screen.width + 'x' + screen.height);
    components.push(screen.colorDepth);
    components.push(screen.pixelDepth);
    components.push(window.devicePixelRatio || 1);
    
    // Timezone
    components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
    components.push(new Date().getTimezoneOffset());
    
    // Language
    components.push(navigator.language);
    components.push((navigator.languages || []).join(','));
    
    // Platform
    components.push(navigator.platform);
    components.push(navigator.hardwareConcurrency || 0);
    components.push(navigator.maxTouchPoints || 0);
    
    // WebGL Renderer
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          components.push(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
          components.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
        }
      }
    } catch (e) {
      components.push('webgl-unavailable');
    }
    
    // Canvas fingerprint
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('FALCON-PRO-FP', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('FALCON-PRO-FP', 4, 17);
      components.push(canvas.toDataURL().slice(-50));
    } catch (e) {
      components.push('canvas-unavailable');
    }
    
    // Audio fingerprint seed
    components.push(typeof AudioContext !== 'undefined' ? 'audio-yes' : 'audio-no');
    
    // Generate hash
    const fingerString = components.join('|||');
    const encoder = new TextEncoder();
    const data = encoder.encode(fingerString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex.substring(0, 32).toUpperCase();
  }

  // Get detailed device info
  function getDeviceInfo() {
    const info = {
      // Browser Info
      userAgent: navigator.userAgent,
      browser: getBrowserName(),
      browserVersion: getBrowserVersion(),
      
      // OS Info
      platform: navigator.platform,
      os: getOSName(),
      
      // Screen Info
      screenResolution: screen.width + ' x ' + screen.height,
      availableScreen: screen.availWidth + ' x ' + screen.availHeight,
      colorDepth: screen.colorDepth + ' bit',
      pixelRatio: window.devicePixelRatio,
      
      // Hardware
      cpuCores: navigator.hardwareConcurrency || 'Unknown',
      deviceMemory: (navigator.deviceMemory || 'Unknown') + ' GB',
      touchPoints: navigator.maxTouchPoints || 0,
      
      // Locale
      language: navigator.language,
      languages: (navigator.languages || []).join(', '),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: 'UTC' + (new Date().getTimezoneOffset() > 0 ? '-' : '+') + Math.abs(new Date().getTimezoneOffset() / 60),
      
      // Connection
      onLine: navigator.onLine,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      
      // Date
      collectedAt: new Date().toISOString()
    };
    
    return info;
  }

  function getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    return 'Unknown';
  }

  function getBrowserVersion() {
    const ua = navigator.userAgent;
    let match;
    if (ua.includes('Firefox')) match = ua.match(/Firefox\/(\d+)/);
    else if (ua.includes('Edg')) match = ua.match(/Edg\/(\d+)/);
    else if (ua.includes('Chrome')) match = ua.match(/Chrome\/(\d+)/);
    else if (ua.includes('Safari')) match = ua.match(/Version\/(\d+)/);
    return match ? match[1] : 'Unknown';
  }

  function getOSName() {
    const ua = navigator.userAgent;
    if (ua.includes('Windows NT 10')) return 'Windows 10/11';
    if (ua.includes('Windows NT 6.3')) return 'Windows 8.1';
    if (ua.includes('Windows NT 6.2')) return 'Windows 8';
    if (ua.includes('Windows NT 6.1')) return 'Windows 7';
    if (ua.includes('Mac OS X')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  // Generate fingerprint
  const fingerprint = await generateFingerprint();
  const deviceInfo = getDeviceInfo();

  // Create UI
  const container = document.createElement('div');
  container.id = 'falcon-device-collector';
  container.innerHTML = `
    <div style="${styles.container}">
      <div style="${styles.header}">🦅 FALCON PRO - Device Collector</div>
      
      <div style="${styles.section}">
        <span style="${styles.label}">📱 Device Fingerprint (Authorization Key)</span>
        <div style="${styles.fingerprint}" id="fp-display">${fingerprint}</div>
      </div>
      
      <div style="${styles.section}">
        <span style="${styles.label}">🖥️ Device Information</span>
        <div style="${styles.value}">
          <strong>Browser:</strong> ${deviceInfo.browser} ${deviceInfo.browserVersion}<br>
          <strong>OS:</strong> ${deviceInfo.os}<br>
          <strong>Platform:</strong> ${deviceInfo.platform}<br>
          <strong>Screen:</strong> ${deviceInfo.screenResolution} @ ${deviceInfo.pixelRatio}x<br>
          <strong>CPU Cores:</strong> ${deviceInfo.cpuCores}<br>
          <strong>Memory:</strong> ${deviceInfo.deviceMemory}<br>
          <strong>Timezone:</strong> ${deviceInfo.timezone} (${deviceInfo.timezoneOffset})<br>
          <strong>Language:</strong> ${deviceInfo.language}
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 15px;">
        <button style="${styles.button}" onclick="copyFingerprint()">📋 Copy Fingerprint</button>
        <button style="${styles.button}" onclick="copyFullInfo()">📄 Copy Full Info</button>
        <button style="${styles.button}; background: linear-gradient(135deg, #ff5722, #ff9800);" onclick="closeCollector()">✖ Close</button>
      </div>
      
      <div id="copy-status" style="text-align: center;"></div>
    </div>
  `;

  // Add to page
  const existing = document.getElementById('falcon-device-collector');
  if (existing) existing.remove();
  document.body.appendChild(container);

  // Global functions
  window.copyFingerprint = function() {
    navigator.clipboard.writeText(fingerprint).then(() => {
      document.getElementById('copy-status').innerHTML = `<div style="${styles.copySuccess}">✓ Fingerprint copied!</div>`;
      setTimeout(() => document.getElementById('copy-status').innerHTML = '', 2000);
    });
  };

  window.copyFullInfo = function() {
    const fullInfo = {
      fingerprint: fingerprint,
      ...deviceInfo
    };
    navigator.clipboard.writeText(JSON.stringify(fullInfo, null, 2)).then(() => {
      document.getElementById('copy-status').innerHTML = `<div style="${styles.copySuccess}">✓ Full info copied!</div>`;
      setTimeout(() => document.getElementById('copy-status').innerHTML = '', 2000);
    });
  };

  window.closeCollector = function() {
    document.getElementById('falcon-device-collector').remove();
  };

  // Also log to console
  console.clear();
  console.log('%c🦅 FALCON PRO - Device Info Collected', 'font-size: 20px; font-weight: bold; color: #667eea;');
  console.log('%cFingerprint: ' + fingerprint, 'font-size: 16px; color: #00ff88; background: #1a1a2e; padding: 10px; border-radius: 5px;');
  
  // Return fingerprint
  return { fingerprint, deviceInfo };
})();
