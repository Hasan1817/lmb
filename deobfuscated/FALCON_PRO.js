// Configuration (updated with user data)
let highcom = "1";
let ivac_id = "17";
let visa_type = "13";
let visit_purpose = "For Medical Treatment.";
let webfile_id = "BGDDVA1DA225";
let family_count = "3";
let familyData = [{
  name: "KALA CHAD",
  webfile_no: "BGDDVA1DE225"
}, {
  name: "MORJINA",
  webfile_no: "BGDDVA1DC825"
}, {
  name: "JORINA",
  webfile_no: "BGDDVADC8825"
}];
// Load user configuration from localStorage if available
const savedConfig = localStorage.getItem("ivac_user_config");
if (savedConfig) {
  try {
    const config = JSON.parse(savedConfig);
    highcom = config.highcom || highcom;
    ivac_id = config.ivac_id || ivac_id;
    visa_type = config.visa_type || visa_type;
    visit_purpose = config.visit_purpose || visit_purpose;
    webfile_id = config.webfile_id || webfile_id;
    family_count = config.family_count || family_count;
    familyData = config.familyData || familyData;
    console.log("Loaded saved configuration from localStorage");
  } catch (e) {
    console.error("Error loading saved configuration:", e);
  }
}
// Site Keys Configuration
// Editable Endpoints Configuration
const endpoints = {
  login: {
    mobileVerify: "https://payment.ivacbd.com/",
    login: "https://payment.ivacbd.com/",
    loginOtp: "https://payment.ivacbd.com/"
  },
  payment: {
    applicationInfoSubmit: "https://payment.ivacbd.com/application",
    personalInfoSubmit: "https://payment.ivacbd.com/application",
    overviewSubmit: "https://payment.ivacbd.com/application",
    payOtpSent: "https://payment.ivacbd.com/application",
    payOtpVerify: "https://payment.ivacbd.com/application",
    paySlotTime: "https://payment.ivacbd.com/application",
    payNow: "https://payment.ivacbd.com/application",
    captchaGenerate: "captcha/generate-pay",
    captchaVerify: "https://payment.ivacbd.com/application"
  }
};
const nextActionConfig = {
  mobileVerify: {
    nextAction: "602c60c9e18b0a3dbbcd0ee55f01c385f88d0638e0",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  authenticate: {
    nextAction: "6078c159defd71512496e894c041ec76dc18fe309b",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  submitOtp: {
    nextAction: "60a5f5e96fb267f718c17e98ee821eae0c3381977e",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  applicationInfo: {
    nextAction: "70377b6e06ac0b9b4ffe55dbae6a64786750c62482",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22application%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  personalInfo: {
    nextAction: "706597cd5e9803020d2c67c2d54323975b19fff992",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22application%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  overviewInfo: {
    nextAction: "609be894c11698a9fdc88b9c6f9fa821916c7fb66d",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22application%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  sendOtpInfo: {
    nextAction: "60f17fb803892fb0b32edd6a8970820aaeccaea2a1",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22application%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  verifyOtpInfo: {
    nextAction: "607dd046ce4104a30dbcdae5ed02bdae7160e39745",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22application%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  getSlotInfo: {
    nextAction: "60fd1e878d947ecff768e3fa5d1049d5bf42b6f548",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22application%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  captchaVerifyInfo: {
    nextAction: "70648dcd61dd835363065814f031d26034cc029dfa",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22application%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  },
  payNowInfo: {
    nextAction: "60e3bf50cd36841322301d5ae4f1f1df55d0e26cd2",
    routerStateTree: "%5B%22%22%2C%7B%22children%22%3A%5B%22(root)%22%2C%7B%22children%22%3A%5B%22application%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
    xActionRevalidated: "[[],0,0]"
  }
};
// Captcha Token Names Configuration (Editable Daily)
const captchaTokenNames = {
  app: "y6e7uk_token_t6d8n3",
  personal: "captcha_token_personal",
  send: "captcha_token_send",
  verify: "captcha_token_verify",
  getSlot: "captcha_token_getslot",
  payNow: "k5t0g8_token_y4v9f6"
};
// Login Tab Captcha Token Names Configuration (Editable Daily)

// Daily Editable Payload Data - Simplified for 4 Members
let payloadData = {
  app: {
    highcom: highcom,
    ivac_id: ivac_id,
    visa_type: visa_type,
    asweoi_erilfs: visit_purpose,
    webfile_id: webfile_id,
    family_count: family_count,
    webfile_id_repeat: webfile_id
  },
  personal: {
    email_name: "",
    // Will be filled from localStorage
    full_name: "",
    // Will be filled from localStorage
    phone: "",
    // Will be filled from localStorage
    webfile_id: webfile_id,
    family: [{
      name: "",
      webfile_no: "",
      again_webfile_no: ""
    }, {
      name: "",
      webfile_no: "",
      again_webfile_no: ""
    }, {
      name: "",
      webfile_no: "",
      again_webfile_no: ""
    }, {
      name: "",
      webfile_no: "",
      again_webfile_no: ""
    }]
  },
  send: {
    resend: "0"
  },
  verify: {
    otp: "" // Will be filled from input
  },
  getSlot: {
    appointment_date: "" // Will be filled from input
  },
  payNow: {
    appointment_date: "",
    // Will be filled from input
    appointment_time: "",
    // Will be filled from input
    selected_payment: {
      name: "VISA",
      slug: "visacard",
      link: "https://securepay.sslcommerz.com/gwprocess/v4/image/gw1/visa.png"
    }
  }
};
// Update family data in payloadData based on loaded configuration
const newFamily = [];
for (let i = 0; i < family_count; i++) {
  if (i < familyData.length) {
    newFamily.push({
      name: familyData[i].name,
      webfile_no: familyData[i].webfile_no,
      again_webfile_no: familyData[i].webfile_no
    });
  } else {
    newFamily.push({
      name: "",
      webfile_no: "",
      again_webfile_no: ""
    });
  }
}
payloadData.personal.family = newFamily;
// Auto R and Auto C buttons are kept but functionality is removed
// MAIN SCRIPT - DO NOT EDIT BELOW THIS LINE
// MAIN SCRIPT - Authorization removed, runs directly
(function () {
  "use strict";
  const mainScript = () => {
    const capsolverApiKey = "CAP-655A65B5F73C937E00F24FF479E9B74145B0753D538F9535A469B0DBD6F62B98";
    (function () {
      if (window.__MT_DEFAULT_HEADERS_PATCHED__) {
        return;
      }
      window.__MT_DEFAULT_HEADERS_PATCHED__ = true;
      const temp_2 = window.fetch ? window.fetch.bind(window) : null;
      if (!temp_2) {
        return;
      }
      function cloneHeaders(instance_5) {
        if (instance_5 instanceof Headers) {
          return new Headers(instance_5);
        }
        const headers_1 = new Headers();
        if (instance_5 && typeof instance_5 === "object") {
          try {
            Object.keys(instance_5).forEach(item_1 => headers_1.set(item_1, instance_5[item_1]));
          } catch (var_6) {}
        }
        return headers_1;
      }
      function patchFetchRequest(instance_7, var_8) {
        let url_2 = instance_7;
        let headers_2 = var_8 ? Object.assign({}, var_8) : {};
        let headers_3;
        if (instance_7 instanceof Request) {
          url_2 = instance_7.url;
          headers_3 = new Headers(instance_7.headers);
          const headers_4 = cloneHeaders(headers_2.headers);
          headers_4.forEach((item_2, arrayItem_9) => headers_3.set(arrayItem_9, item_2));
        } else {
          headers_3 = cloneHeaders(headers_2.headers);
        }
        let url_3;
        try {
          url_3 = new URL(url_2, location.href);
        } catch (var_10) {
          url_3 = null;
        }
        const temp_3 = url_3 ? url_3.origin === location.origin : true;
        const temp_4 = url_3 ? /(^|\.)capsolver\.com$/i.test(url_3.hostname) : false;
        if (temp_4) {
          if (headers_3.has("language")) {
            headers_3.delete("language");
          }
        } else if (temp_3) {
          headers_3.set("language", "en");
        }
        if (!headers_3.has("accept")) {
          headers_3.set("accept", "application/json");
        }
        const temp_5 = (headers_2.method || (instance_7 instanceof Request ? instance_7.method : "GET")).toUpperCase();
        const text_6 = headers_2.body != null || instance_7 instanceof Request && instance_7.body != null;
        let text_7 = false;
        try {
          text_7 = text_6 && typeof headers_2.body === "string" && /^[\s]*[{[]/.test(headers_2.body);
        } catch (var_11) {}
        if (!headers_3.has("content-type") && (text_7 || ["POST", "PUT", "PATCH", "DELETE"].includes(temp_5))) {
          headers_3.set("content-type", "application/json");
        }
        if (temp_4 && headers_3.has("authorization")) {
          headers_3.delete("authorization");
        }
        if (temp_3 && !temp_4 && !headers_3.has("authorization")) {
          try {
            const token_1 = localStorage.getItem("access_token");
            if (token_1) {
              headers_3.set("authorization", "Bearer " + token_1);
            }
          } catch (var_12) {}
        }
        if (temp_3 && !temp_4 && url_3 && url_3.pathname.includes("/application")) {
          headers_3.set("referer", "https://payment.ivacbd.com/application");
        }
        headers_2.headers = headers_3;
        return [url_2, headers_2];
      }
      window.fetch = function (param_5, param_6) {
        try {
          const temp_6 = patchFetchRequest(param_5, param_6);
          return temp_2(temp_6[0], temp_6[1]);
        } catch (var_13) {
          return temp_2(param_5, param_6);
        }
      };
    })();
    if (document.getElementById("multi-tools-container")) {
      console.log("Widget already exists, skipping initialization.");
      return;
    }
    const initializeWidget = () => {
      "use strict";

      if (document.getElementById("multi-tools-container")) {
        return;
      }
      let editedData = {
        app: null,
        personal: null,
        overview: null,
        send: null,
        verify: null,
        mobile: null,
        password: null,
        otp: null,
        paynow: null,
        paynowbutton: null
      };
      let editedEndpoints = {};
      let editedCaptchaTokenNames = {};
      function loadEditedDataFromStorage() {
        try {
          const data_2 = localStorage.getItem("ivac_edited_data");
          if (data_2) {
            editedData = JSON.parse(data_2);
            console.log("Loaded edited data from localStorage:", editedData);
          }
        } catch (var_14) {
          console.error("Error loading edited data from localStorage:", var_14);
        }
      }
      function loadEditedEndpointsFromStorage() {
        try {
          const temp_7 = localStorage.getItem("ivac_edited_endpoints");
          if (temp_7) {
            editedEndpoints = JSON.parse(temp_7);
            console.log("Loaded edited endpoints from localStorage:", editedEndpoints);
          }
        } catch (var_15) {
          console.error("Error loading edited endpoints from localStorage:", var_15);
        }
      }
      function loadEditedCaptchaTokensFromStorage() {
        try {
          const token_2 = localStorage.getItem("ivac_edited_captcha_token_names");
          if (token_2) {
            editedCaptchaTokenNames = JSON.parse(token_2);
            console.log("Loaded edited captcha token names from localStorage:", editedCaptchaTokenNames);
          }
        } catch (var_16) {
          console.error("Error loading edited captcha token names from localStorage:", var_16);
        }
      }
      loadEditedDataFromStorage();
      loadEditedEndpointsFromStorage();
      loadEditedCaptchaTokensFromStorage();
      function restoreApplicationState() {
        const token_3 = localStorage.getItem("access_token");
        const step_1 = localStorage.getItem("authStep");
        const step_2 = localStorage.getItem("activeStep");
        if (token_3 && step_1 === "100") {
          console.log("Restoring application state - User is authenticated");
          if (step_2 === "1") {
            console.log("Current step: Application Info");
          } else if (step_2 === "2") {
            console.log("Current step: Personal Info");
          } else if (step_2 === "3") {
            console.log("Current step: Overview");
          } else if (step_2 === "4") {
            console.log("Current step: Payment");
          }
        }
      }
      restoreApplicationState();
      let apiBaseUrl = "https://payment.ivacbd.com/api/v2/";
      const loginSiteKey = "0x4AAAAAABpNUpzYeppBoYpe";
      const applicationSiteKey = "0x4AAAAAABvQ3Mi6RktCuZ7P";
      function getSiteKey(objKey_17) {
        if (objKey_17 === "login") {
          return loginSiteKey;
        } else {
          return applicationSiteKey;
        }
      }
      let currentApiKey = null;
      let captchaState = {
        solved: false,
        token: "",
        widget: null,
        visible: false,
        autoCheckInterval: null,
        hideTimeout: null,
        isPageCaptcha: false,
        monitorInterval: null,
        solving: false,
        solution: null,
        cfToken: "",
        cfpToken: "",
        imageData: ""
      };
      let pendingOperations = [];
      let loginCaptchaWidget = null;
      let bgdCaptchaWidget = null;
      let payCaptchaWidget = null;
      let mathCaptchaWidget = null;
      let textCaptchaWidget = null;
      let isInitialized = false;
      let currentCaptchaType = null;
      let isCaptchaSolving = false;
      let captchaTaskState = {
        stopRequested: false,
        popupClosed: false,
        currentTaskId: null
      };
      let refreshTimers = {
        refreshInterval: null,
        continueTimeout: null
      };
      let currentCaptchaContainer = null;
      let captchaSolutionCallback = null;
      let retryCount = 0;
      let lastRequestTime = null;
      let captchaProviderConfig = {
        login: {
          enabled: false,
          token: ""
        },
        bgd: {
          enabled: false,
          token: ""
        },
        pay: {
          enabled: false,
          token: ""
        }
      };
      let currentTab = "login";
      const loginBgdRetryConfig = {
        statuses: [500, 502, 504],
        minSeconds: 10,
        maxSeconds: 13,
        reason: param_7 => "HTTP " + param_7 + " (Login/BGD)"
      };
      const sendVerifyRetryConfig = {
        statuses: [500, 502, 504],
        minSeconds: 8,
        maxSeconds: 12,
        reason: param_8 => "HTTP " + param_8 + " (Send/Verify)"
      };
      const getSlotRetryConfig = {
        statuses: [500, 502, 504],
        minSeconds: 7,
        maxSeconds: 10,
        reason: param_9 => "HTTP " + param_9 + " (Get Slot)"
      };
      const payNowRetryConfig = {
        statuses: [500, 502, 504],
        minSeconds: 10,
        maxSeconds: 14,
        reason: param_10 => "HTTP " + param_10 + " (Pay Now)"
      };
      const operationRetryRules = [{
        name: "loginBgd",
        operations: new Set(["login-mobile", "login-authenticate", "login-submit-otp", "bgd-app", "bgd-personal", "bgd-overview"]),
        rules: [loginBgdRetryConfig]
      }, {
        name: "sendVerification",
        operations: new Set(["pay-send", "pay-resend", "pay-verify", "pay-captcha-verify"]),
        rules: [sendVerifyRetryConfig]
      }, {
        name: "payGetSlot",
        operations: new Set(["pay-get-slot"]),
        rules: [getSlotRetryConfig]
      }, {
        name: "payNow",
        operations: new Set(["pay-now"]),
        rules: [payNowRetryConfig]
      }];
      let autoRetryState = {
        enabled: false,
        timers: new Map(),
        countdownIntervals: new Map()
      };
      function clearAllAutoRetryTimers() {
        autoRetryState.timers.forEach(item_3 => clearTimeout(item_3));
        autoRetryState.timers.clear();
        autoRetryState.countdownIntervals.forEach(item_4 => clearInterval(item_4));
        autoRetryState.countdownIntervals.clear();
      }
      function setAutoRetryEnabled(message_18, message_19 = "") {
        if (autoRetryState.enabled === message_18) {
          if (message_19) {
            showStatusMessage(message_19, message_18 ? "#00FF00" : "#ff9800");
          }
          return;
        }
        autoRetryState.enabled = message_18;
        const element_4 = document.getElementById("global-auto-r-btn");
        if (element_4) {
          element_4.textContent = message_18 ? "Auto (ON)" : "Auto";
          element_4.style.boxShadow = message_18 ? "0 0 10px rgba(76, 175, 80, 0.6)" : "";
          element_4.style.opacity = message_18 ? "1" : "0.85";
        }
        if (!message_18) {
          clearAllAutoRetryTimers();
        }
        if (message_19) {
          showStatusMessage(message_19, message_18 ? "#00FF00" : "#ff9800");
        } else {
          showStatusMessage(message_18 ? "Auto retry enabled" : "Auto retry disabled", message_18 ? "#00FF00" : "#ff9800");
        }
      }
      function getRandomDelayMs(mathResult_20, mathResult_21) {
        const temp_8 = Math.ceil(mathResult_20);
        const temp_9 = Math.floor(mathResult_21);
        const temp_10 = Math.floor(Math.random() * (temp_9 - temp_8 + 1)) + temp_8;
        return temp_10 * 1000;
      }
      function scheduleAutoRetry(datetime_22, mathResult_23, var_24, var_25) {
        if (typeof var_24 !== "function") {
          return;
        }
        if (autoRetryState.timers.has(datetime_22)) {
          clearTimeout(autoRetryState.timers.get(datetime_22));
        }
        if (autoRetryState.countdownIntervals.has(datetime_22)) {
          clearInterval(autoRetryState.countdownIntervals.get(datetime_22));
        }
        const temp_11 = Math.round(mathResult_23 / 1000);
        let temp_12 = temp_11;
        showStatusMessage("Retrying in " + temp_12 + " Sec", "#FFD700");
        const timer_1 = setInterval(() => {
          temp_12--;
          if (temp_12 > 0) {
            showStatusMessage("Retrying in " + temp_12 + " Sec", "#FFD700");
          } else {
            clearInterval(timer_1);
            autoRetryState.countdownIntervals.delete(datetime_22);
          }
        }, 1000);
        autoRetryState.countdownIntervals.set(datetime_22, timer_1);
        const timer_2 = setTimeout(() => {
          autoRetryState.timers.delete(datetime_22);
          if (autoRetryState.countdownIntervals.has(datetime_22)) {
            clearInterval(autoRetryState.countdownIntervals.get(datetime_22));
            autoRetryState.countdownIntervals.delete(datetime_22);
          }
          var_24();
        }, mathResult_23);
        autoRetryState.timers.set(datetime_22, timer_2);
      }
      function getRetryRulesForOperation(var_26, var_27, var_28) {
        if (var_27 === 403) {
          return {
            disableAuto: true,
            reason: "Auto retry disabled after HTTP 403"
          };
        }
        if (var_27 === 429) {
          return {
            minSeconds: 30,
            maxSeconds: 30,
            reason: "HTTP 429"
          };
        }
        if (var_28) {
          return {
            minSeconds: 3,
            maxSeconds: 6,
            reason: "Network failure"
          };
        }
        if (typeof var_27 !== "number") {
          return null;
        }
        for (const temp_13 of operationRetryRules) {
          if (!temp_13.operations.has(var_26)) {
            continue;
          }
          const temp_14 = temp_13.rules.find(status_1 => status_1.statuses.includes(var_27));
          if (temp_14) {
            const temp_15 = typeof temp_14.reason === "function" ? temp_14.reason(var_27) : temp_14.reason || "HTTP " + var_27;
            const temp_16 = {
              minSeconds: temp_14.minSeconds,
              maxSeconds: temp_14.maxSeconds,
              reason: temp_15
            };
            return temp_16;
          }
        }
        return null;
      }
      function getFallbackRetryDelay(asyncResult_29) {
        if (["bgd-app", "bgd-personal", "bgd-overview", "login-mobile", "login-authenticate", "login-submit-otp"].includes(asyncResult_29)) {
          return {
            minSeconds: 10,
            maxSeconds: 13,
            reason: "Success message not matched"
          };
        } else if (["pay-send", "pay-resend", "pay-verify", "pay-captcha-verify"].includes(asyncResult_29)) {
          return {
            minSeconds: 8,
            maxSeconds: 12,
            reason: "Success message not matched"
          };
        } else if (asyncResult_29 === "pay-get-slot") {
          return {
            minSeconds: 7,
            maxSeconds: 10,
            reason: "Success message not matched"
          };
        } else if (asyncResult_29 === "pay-now") {
          return {
            minSeconds: 10,
            maxSeconds: 14,
            reason: "Success message not matched"
          };
        }
        return {
          minSeconds: 10,
          maxSeconds: 13,
          reason: "Success message not matched"
        };
      }
      function handleAutoRetry(loopVar_30, var_31, var_32, var_33 = {}) {
        if (var_31 === 403) {
          stopAllOperations();
          showStatusMessage("403 Forbidden Error detected", "#ff4444");
        }
        if (!autoRetryState.enabled) {
          return;
        }
        let error_4 = getRetryRulesForOperation(loopVar_30, var_31, var_33.isNetworkError);
        if (!error_4) {
          console.log("No retry rule found for " + loopVar_30 + " (status: " + var_31 + ") - using fallback delay");
          error_4 = getFallbackRetryDelay(loopVar_30);
        }
        if (error_4.disableAuto) {
          if (var_31 === 403) {
            showStatusMessage("403 Forbidden Error detected - Auto button turning off", "#ff4444");
          }
          setAutoRetryEnabled(false, error_4.reason);
          return;
        }
        const delay_1 = getRandomDelayMs(error_4.minSeconds, error_4.maxSeconds);
        scheduleAutoRetry(loopVar_30, delay_1, var_32, error_4.reason);
      }
      function handleOperationFailure(outcome_34, outcome_35, outcome_36, datetime_37, datetime_38, timerCallback_39, datetime_40) {
        if (outcome_34 === "bgd-app") {
          autoSequenceState.appSuccess = false;
        }
        if (outcome_34 === "bgd-personal") {
          autoSequenceState.personalSuccess = false;
        }
        if (outcome_35 === 403) {
          console.log("❌ " + datetime_40 + ": 403 Forbidden Error - stopping Auto Sequence immediately");
          stopAllOperations();
          if (autoRetryState.enabled) {
            setAutoRetryEnabled(false, "403 Forbidden Error - Auto turned off");
          }
          if (autoSequenceState.enabled) {
            setAutoSequenceEnabled(false);
            resetAutoSequenceState();
          }
          showStatusMessage("403 Forbidden Error - Auto Sequence stopped", "#ff4444");
        }
        hideLoadingIndicator();
        updateButtonStatus(datetime_37, datetime_40, datetime_38, datetime_40 + " Success", datetime_40 + " Failed");
        updateButtonLoading(timerCallback_39);
        setTimeout(() => resetButtonState(timerCallback_39), 3000);
        if (autoRetryState.enabled && outcome_35 !== 403) {
          console.log("🔄 Auto retry triggered for " + datetime_40 + " - success message not matched (status: " + (outcome_35 || "N/A") + ")");
          handleAutoRetry(outcome_34, outcome_35, outcome_36, {
            isNetworkError: outcome_35 === null || outcome_35 === undefined
          });
        } else if (outcome_35 !== 403) {
          console.log("Auto retry disabled for " + datetime_40 + " - Auto ON is off");
        }
      }
      let autoSequenceState = {
        enabled: false,
        currentStep: null,
        timers: new Map(),
        otpObserver: null,
        dateObserver: null,
        authenticateStartTime: null,
        otpEnteredTime: null,
        submitOtpTimer: null,
        submitOtpStatus200: false,
        bgdCfTimer: null,
        bgdCfStartTime: null,
        payNowTimer: null,
        waitingForPersonal: false,
        personalDelayStartTime: null,
        personalDelayDuration: null,
        overviewSuccess: false,
        appSuccess: false,
        personalSuccess: false,
        manualBgdCfStartTime: null,
        manualBgdCfTimer: null,
        manualPersonalStartTime: null,
        manualPersonalTimer: null,
        manualPersonalDelayDuration: null
      };
      const AUTO_SEQUENCE_STEPS = {
        IDLE: "idle",
        LOGIN_CF: "login_cf",
        LOGIN_MOBILE_VERIFY: "login_mobile_verify",
        LOGIN_AUTHENTICATE: "login_authenticate",
        LOGIN_WAIT_OTP: "login_wait_otp",
        LOGIN_SUBMIT_OTP: "login_submit_otp",
        BGD_CF: "bgd_cf",
        BGD_APP: "bgd_app",
        BGD_PERSONAL: "bgd_personal",
        BGD_OVERVIEW: "bgd_overview",
        BGD_SEND: "bgd_send",
        BGD_WAIT_VERIFY: "bgd_wait_verify",
        PAY_GET_SLOT: "pay_get_slot",
        PAY_SET_TIME: "pay_set_time",
        PAY_CAPTCHA: "pay_captcha",
        PAY_WAIT_PAY_NOW: "pay_wait_pay_now",
        PAY_NOW: "pay_now"
      };
      function isWithinWorkingHours() {
        const temp_17 = new Date();
        const temp_18 = temp_17.getHours();
        const temp_19 = temp_17.getMinutes();
        const temp_20 = temp_17.getSeconds();
        const temp_21 = temp_18 * 3600 + temp_19 * 60 + temp_20;
        const temp_22 = 64802;
        const temp_23 = 14400;
        if (temp_22 <= temp_23) {
          return temp_21 >= temp_22 && temp_21 <= temp_23;
        } else {
          return temp_21 >= temp_22 || temp_21 <= temp_23;
        }
      }
      function setAutoSequenceEnabled(stateFlag_41) {
        if (autoSequenceState.enabled === stateFlag_41) {
          return;
        }
        autoSequenceState.enabled = stateFlag_41;
        const element_5 = document.getElementById("global-auto-c-btn");
        if (element_5) {
          element_5.textContent = stateFlag_41 ? "AS (ON)" : "AS";
          element_5.style.boxShadow = stateFlag_41 ? "0 0 10px rgba(255, 152, 0, 0.6)" : "";
          element_5.style.opacity = stateFlag_41 ? "1" : "0.85";
        }
        if (!stateFlag_41) {
          resetAutoSequenceState();
        } else {
          if (!autoRetryState.enabled) {
            showStatusMessage("Auto Sequence: Auto ON required to enable AS", "#ff4444");
            autoSequenceState.enabled = false;
            if (element_5) {
              element_5.textContent = "AS";
              element_5.style.boxShadow = "";
              element_5.style.opacity = "0.85";
            }
            return;
          }
          autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.IDLE;
          if (isWithinWorkingHours()) {
            showStatusMessage("Auto Sequence enabled - Waiting for manual CF click on Login Tab", "#FFD700");
          } else {
            showStatusMessage("Auto Sequence enabled - Will auto-trigger when working hours start (06:00:02 PM - 04:00:00 AM)", "#FFD700");
          }
        }
      }
      function resetAutoSequenceState() {
        autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.IDLE;
        autoSequenceState.timers.forEach(item_5 => clearTimeout(item_5));
        autoSequenceState.timers.clear();
        if (autoSequenceState.submitOtpTimer) {
          clearTimeout(autoSequenceState.submitOtpTimer);
          autoSequenceState.submitOtpTimer = null;
        }
        if (autoSequenceState.bgdCfTimer) {
          clearInterval(autoSequenceState.bgdCfTimer);
          autoSequenceState.bgdCfTimer = null;
        }
        if (autoSequenceState.payNowTimer) {
          clearTimeout(autoSequenceState.payNowTimer);
          autoSequenceState.payNowTimer = null;
        }
        autoSequenceState.authenticateStartTime = null;
        autoSequenceState.otpEnteredTime = null;
        autoSequenceState.submitOtpStatus200 = false;
        autoSequenceState.bgdCfStartTime = null;
        autoSequenceState.waitingForPersonal = false;
        autoSequenceState.personalDelayStartTime = null;
        autoSequenceState.personalDelayDuration = null;
        autoSequenceState.overviewSuccess = false;
        autoSequenceState.appSuccess = false;
        autoSequenceState.personalSuccess = false;
        if (autoSequenceState.manualBgdCfTimer) {
          clearInterval(autoSequenceState.manualBgdCfTimer);
          autoSequenceState.manualBgdCfTimer = null;
        }
        if (autoSequenceState.manualPersonalTimer) {
          clearInterval(autoSequenceState.manualPersonalTimer);
          autoSequenceState.manualPersonalTimer = null;
        }
        autoSequenceState.manualBgdCfStartTime = null;
        autoSequenceState.manualPersonalStartTime = null;
        autoSequenceState.manualPersonalDelayDuration = null;
        if (autoSequenceState.otpObserver) {
          autoSequenceState.otpObserver.disconnect();
          autoSequenceState.otpObserver = null;
        }
        if (autoSequenceState.dateObserver) {
          autoSequenceState.dateObserver.disconnect();
          autoSequenceState.dateObserver = null;
        }
      }
      function canAutoSequenceProceed() {
        return autoRetryState.enabled && autoSequenceState.enabled && isWithinWorkingHours();
      }
      function handleAutoSequenceError(var_42) {
        if (var_42 === null || var_42 === undefined) {
          return;
        }
        if (var_42 === 403) {
          stopAllOperations();
          if (autoRetryState.enabled) {
            setAutoRetryEnabled(false, "403 Forbidden Error - Auto turned off");
          }
          if (autoSequenceState.enabled) {
            setAutoSequenceEnabled(false);
            resetAutoSequenceState();
          }
          showStatusMessage("403 Forbidden Error detected - Auto Sequence stopped", "#ff4444");
          return;
        }
        const temp_24 = [500, 502, 504, 429];
        if (!temp_24.includes(var_42)) {
          if (autoRetryState.enabled) {
            setAutoRetryEnabled(false, "Auto disabled due to error " + var_42);
          }
          if (autoSequenceState.enabled) {
            setAutoSequenceEnabled(false);
          }
          showStatusMessage("Error " + var_42 + " detected - Auto and AS turned off", "#ff4444");
        }
      }
      function detectManualButtonSuccess(outcome_43) {
        if (!autoRetryState.enabled || !autoSequenceState.enabled) {
          return;
        }
        const step_3 = autoSequenceState.currentStep;
        if (step_3 && step_3 !== AUTO_SEQUENCE_STEPS.IDLE) {
          const temp_25 = {
            [AUTO_SEQUENCE_STEPS.IDLE]: 0,
            [AUTO_SEQUENCE_STEPS.LOGIN_CF]: 1,
            [AUTO_SEQUENCE_STEPS.LOGIN_MOBILE_VERIFY]: 2,
            [AUTO_SEQUENCE_STEPS.LOGIN_AUTHENTICATE]: 3,
            [AUTO_SEQUENCE_STEPS.LOGIN_WAIT_OTP]: 4,
            [AUTO_SEQUENCE_STEPS.LOGIN_SUBMIT_OTP]: 5,
            [AUTO_SEQUENCE_STEPS.BGD_CF]: 6,
            [AUTO_SEQUENCE_STEPS.BGD_APP]: 7,
            [AUTO_SEQUENCE_STEPS.BGD_PERSONAL]: 8,
            [AUTO_SEQUENCE_STEPS.BGD_OVERVIEW]: 9,
            [AUTO_SEQUENCE_STEPS.BGD_SEND]: 10,
            [AUTO_SEQUENCE_STEPS.BGD_WAIT_VERIFY]: 11,
            [AUTO_SEQUENCE_STEPS.PAY_GET_SLOT]: 12,
            [AUTO_SEQUENCE_STEPS.PAY_SET_TIME]: 13,
            [AUTO_SEQUENCE_STEPS.PAY_CAPTCHA]: 14,
            [AUTO_SEQUENCE_STEPS.PAY_WAIT_PAY_NOW]: 15,
            [AUTO_SEQUENCE_STEPS.PAY_NOW]: 16
          };
          const step_4 = temp_25;
          let step_5 = null;
          let step_6 = 0;
          if (outcome_43 === "cf-btn-bgd" || outcome_43 === "cf-btn-login" && isCurrentTabActive("login")) {
            if (outcome_43 === "cf-btn-bgd") {
              step_5 = AUTO_SEQUENCE_STEPS.BGD_CF;
              step_6 = step_4[AUTO_SEQUENCE_STEPS.BGD_CF];
            } else {
              step_5 = AUTO_SEQUENCE_STEPS.LOGIN_CF;
              step_6 = step_4[AUTO_SEQUENCE_STEPS.LOGIN_CF];
            }
          } else if (outcome_43 === "application-info-btn") {
            step_5 = AUTO_SEQUENCE_STEPS.BGD_APP;
            step_6 = step_4[AUTO_SEQUENCE_STEPS.BGD_APP];
          } else if (outcome_43 === "personal-info-btn") {
            step_5 = AUTO_SEQUENCE_STEPS.BGD_PERSONAL;
            step_6 = step_4[AUTO_SEQUENCE_STEPS.BGD_PERSONAL];
          } else if (outcome_43 === "overview-btn") {
            step_5 = AUTO_SEQUENCE_STEPS.BGD_OVERVIEW;
            step_6 = step_4[AUTO_SEQUENCE_STEPS.BGD_OVERVIEW];
          } else if (outcome_43 === "pay-otp-btn") {
            step_5 = AUTO_SEQUENCE_STEPS.BGD_SEND;
            step_6 = step_4[AUTO_SEQUENCE_STEPS.BGD_SEND];
          } else if (outcome_43 === "pay-verify-btn") {
            step_5 = AUTO_SEQUENCE_STEPS.BGD_WAIT_VERIFY;
            step_6 = step_4[AUTO_SEQUENCE_STEPS.BGD_WAIT_VERIFY];
          } else if (outcome_43 === "get-time-slot-btn") {
            step_5 = AUTO_SEQUENCE_STEPS.PAY_GET_SLOT;
            step_6 = step_4[AUTO_SEQUENCE_STEPS.PAY_GET_SLOT];
          }
          if (step_5) {
            const temp_26 = step_4[step_3] || 0;
            if (step_6 > temp_26) {
              autoSequenceState.currentStep = step_5;
              showStatusMessage("Auto Sequence: Detected manual " + outcome_43 + " success, continuing from step " + step_5, "#00FF00");
              setTimeout(() => {
                continueAutoSequence();
              }, 500);
            }
          }
        } else {
          let step_7 = null;
          if (outcome_43 === "cf-btn-bgd") {
            step_7 = AUTO_SEQUENCE_STEPS.BGD_CF;
          } else if (outcome_43 === "application-info-btn") {
            step_7 = AUTO_SEQUENCE_STEPS.BGD_APP;
          } else if (outcome_43 === "personal-info-btn") {
            step_7 = AUTO_SEQUENCE_STEPS.BGD_PERSONAL;
          } else if (outcome_43 === "overview-btn") {
            step_7 = AUTO_SEQUENCE_STEPS.BGD_OVERVIEW;
          } else if (outcome_43 === "pay-otp-btn") {
            step_7 = AUTO_SEQUENCE_STEPS.BGD_SEND;
          } else if (outcome_43 === "pay-verify-btn") {
            step_7 = AUTO_SEQUENCE_STEPS.BGD_WAIT_VERIFY;
          } else if (outcome_43 === "get-time-slot-btn") {
            step_7 = AUTO_SEQUENCE_STEPS.PAY_GET_SLOT;
          }
          if (step_7) {
            autoSequenceState.currentStep = step_7;
            showStatusMessage("Auto Sequence: Detected manual " + outcome_43 + " success, starting from step " + step_7, "#00FF00");
            setTimeout(() => {
              continueAutoSequence();
            }, 500);
          }
        }
      }
      function observeOtpInput(var_44, timerCallback_45, var_46 = 300000) {
        const element_6 = document.getElementById(var_44);
        if (!element_6) {
          setTimeout(() => timerCallback_45(), 1000);
          return;
        }
        const input_1 = () => {
          const count_3 = element_6.value.trim();
          if (count_3.length >= 4) {
            if (autoSequenceState.otpObserver) {
              autoSequenceState.otpObserver.disconnect();
              autoSequenceState.otpObserver = null;
            }
            timerCallback_45();
          }
        };
        if (element_6.value.trim().length >= 4) {
          timerCallback_45();
          return;
        }
        if (autoSequenceState.otpObserver) {
          autoSequenceState.otpObserver.disconnect();
        }
        autoSequenceState.otpObserver = new MutationObserver(input_1);
        autoSequenceState.otpObserver.observe(element_6, {
          attributes: true,
          childList: true,
          subtree: true
        });
        element_6.addEventListener("input", input_1);
        element_6.addEventListener("change", input_1);
        if (var_46 > 0) {
          setTimeout(() => {
            if (autoSequenceState.otpObserver) {
              autoSequenceState.otpObserver.disconnect();
              autoSequenceState.otpObserver = null;
            }
            element_6.removeEventListener("input", input_1);
            element_6.removeEventListener("change", input_1);
          }, var_46);
        }
      }
      function observeDateInput(datetime_47, timerCallback_48) {
        const element_7 = document.getElementById(datetime_47);
        if (!element_7) {
          setTimeout(() => timerCallback_48(), 1000);
          return;
        }
        const input_2 = () => {
          const temp_27 = element_7.value.trim();
          if (/^\d{4}-\d{2}-\d{2}$/.test(temp_27)) {
            if (autoSequenceState.dateObserver) {
              autoSequenceState.dateObserver.disconnect();
              autoSequenceState.dateObserver = null;
            }
            timerCallback_48();
          }
        };
        if (/^\d{4}-\d{2}-\d{2}$/.test(element_7.value.trim())) {
          timerCallback_48();
          return;
        }
        if (autoSequenceState.dateObserver) {
          autoSequenceState.dateObserver.disconnect();
        }
        autoSequenceState.dateObserver = new MutationObserver(input_2);
        autoSequenceState.dateObserver.observe(element_7, {
          attributes: true,
          childList: true,
          subtree: true
        });
        element_7.addEventListener("input", input_2);
        element_7.addEventListener("change", input_2);
      }
      function checkButtonTextContains(var_49, htmlContent_50) {
        const element_8 = document.getElementById(var_49);
        if (!element_8) {
          return false;
        }
        return element_8.textContent.includes("✓") || element_8.textContent.includes(htmlContent_50);
      }
      function isButtonEnabled(stateFlag_51) {
        const element_9 = document.getElementById(stateFlag_51);
        if (element_9 && !element_9.disabled) {
          element_9.click();
          return true;
        }
        return false;
      }
      function clickButton(eventHandler_52) {
        const element_10 = document.querySelector("[data-tab=\"" + eventHandler_52 + "\"]");
        if (element_10) {
          element_10.click();
          return true;
        }
        return false;
      }
      function isCurrentTabActive(stateFlag_53) {
        if (captchaProviderConfig[stateFlag_53] && captchaProviderConfig[stateFlag_53].enabled && captchaProviderConfig[stateFlag_53].token) {
          return true;
        }
        const element_11 = document.getElementById("cf-btn-" + stateFlag_53);
        if (element_11) {
          return element_11.textContent.includes("✓") || element_11.textContent.includes("Loaded");
        }
        return false;
      }
      function switchToTab(stateFlag_54) {
        const element_12 = document.getElementById("cf-btn-" + stateFlag_54);
        if (element_12 && captchaProviderConfig[stateFlag_54] && captchaProviderConfig[stateFlag_54].enabled) {
          captchaProviderConfig[stateFlag_54].enabled = false;
          captchaProviderConfig[stateFlag_54].token = "";
          var_55(stateFlag_54);
        } else if (element_12) {
          var_55(stateFlag_54);
        }
      }
      function handleLoginCFStep() {
        const temp_28 = !autoSequenceState.bgdCfStartTime;
        if (temp_28) {
          autoSequenceState.bgdCfStartTime = Date.now();
          showStatusMessage("Auto Sequence: BGD CF timer started (54s)", "#00FF00");
        } else {
          const temp_29 = (Date.now() - autoSequenceState.bgdCfStartTime) / 1000;
          const timer_3 = Math.max(0, 54 - temp_29);
          if (timer_3 > 0) {
            showStatusMessage("Auto Sequence: BGD CF timer continuing from first click (" + Math.round(timer_3) + "s remaining)", "#FFD700");
          }
        }
        if (autoSequenceState.bgdCfStartTime) {
          const temp_30 = (Date.now() - autoSequenceState.bgdCfStartTime) / 1000;
          if (temp_30 >= 54) {
            showStatusMessage("Auto Sequence: 54s elapsed from first CF click, checking CF status", "#FFD700");
            executeAppInfoStep();
            return;
          }
        }
        if (!autoSequenceState.bgdCfTimer) {
          const element_13 = document.getElementById("title-timer-display");
          if (element_13 && autoSequenceState.bgdCfStartTime) {
            const temp_31 = (Date.now() - autoSequenceState.bgdCfStartTime) / 1000;
            let text_8 = Math.floor(temp_31);
            const timer_4 = setInterval(() => {
              text_8++;
              element_13.textContent = text_8 + "s";
              const temp_32 = (Date.now() - autoSequenceState.bgdCfStartTime) / 1000;
              if (temp_32 >= 54) {
                clearInterval(timer_4);
                autoSequenceState.bgdCfTimer = null;
                if (canAutoSequenceProceed() && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.BGD_CF) {
                  executeAppInfoStep();
                }
              }
            }, 1000);
            autoSequenceState.bgdCfTimer = timer_4;
          }
        } else {
          const element_14 = document.getElementById("title-timer-display");
          if (element_14 && autoSequenceState.bgdCfStartTime) {
            const text_9 = (Date.now() - autoSequenceState.bgdCfStartTime) / 1000;
            element_14.textContent = Math.floor(text_9) + "s";
          }
        }
      }
      function handleBgdCFAfterAuth() {
        const temp_33 = !autoSequenceState.manualBgdCfStartTime;
        if (temp_33) {
          autoSequenceState.manualBgdCfStartTime = Date.now();
          showStatusMessage("Manual: You Can Hit on App after 54 sec", "#FFD700");
          hideLoadingIndicator();
          var_56();
        } else {
          const temp_34 = (Date.now() - autoSequenceState.manualBgdCfStartTime) / 1000;
          const temp_35 = Math.max(0, 54 - temp_34);
          if (temp_35 > 0) {
            showStatusMessage("Manual: You Can Hit on App after " + Math.round(temp_35) + " sec", "#FFD700");
          }
        }
        if (autoSequenceState.manualBgdCfStartTime) {
          const temp_36 = (Date.now() - autoSequenceState.manualBgdCfStartTime) / 1000;
          if (temp_36 >= 54) {
            stopAllOperations();
            showStatusMessage("Now you can Hit on App Info...", "#FFD700");
            return;
          }
        }
        if (!autoSequenceState.manualBgdCfTimer) {
          const element_15 = document.getElementById("title-timer-display");
          if (element_15 && autoSequenceState.manualBgdCfStartTime) {
            const temp_37 = (Date.now() - autoSequenceState.manualBgdCfStartTime) / 1000;
            let text_10 = Math.floor(temp_37);
            autoSequenceState.manualBgdCfTimer = setInterval(() => {
              text_10++;
              element_15.textContent = text_10 + "s";
              const temp_38 = (Date.now() - autoSequenceState.manualBgdCfStartTime) / 1000;
              const temp_39 = Math.max(0, 54 - temp_38);
              if (temp_39 > 0) {
                showStatusMessage("Manual: You Can Hit on App after " + Math.round(temp_39) + " sec", "#FFD700");
              }
              if (temp_38 >= 54) {
                clearInterval(autoSequenceState.manualBgdCfTimer);
                autoSequenceState.manualBgdCfTimer = null;
                stopAllOperations();
                showStatusMessage("Now you can Hit on App Info...", "#FFD700");
              }
            }, 1000);
          }
        } else {
          const element_16 = document.getElementById("title-timer-display");
          if (element_16 && autoSequenceState.manualBgdCfStartTime) {
            const text_11 = (Date.now() - autoSequenceState.manualBgdCfStartTime) / 1000;
            element_16.textContent = Math.floor(text_11) + "s";
          }
        }
      }
      function handleBgdPersonalDelay() {
        const delay_2 = executePersonalInfoStep();
        const count_4 = Math.round(delay_2 / 1000);
        const count_5 = parseInt(family_count) || 0;
        const temp_40 = !autoSequenceState.manualPersonalStartTime;
        if (temp_40) {
          autoSequenceState.manualPersonalStartTime = Date.now();
          autoSequenceState.manualPersonalDelayDuration = delay_2;
          showStatusMessage("Manual: You can Hit on Personal info after " + count_4 + " sec (Family Count: " + count_5 + ")", "#FFD700");
        } else {
          const temp_41 = (Date.now() - autoSequenceState.manualPersonalStartTime) / 1000;
          const count_6 = Math.max(0, delay_2 - temp_41 * 1000) / 1000;
          if (count_6 > 0) {
            showStatusMessage("Manual: You can Hit on Personal info after " + Math.round(count_6) + " sec (Family Count: " + count_5 + ")", "#FFD700");
          }
        }
        if (autoSequenceState.manualPersonalStartTime) {
          const delay_3 = Date.now() - autoSequenceState.manualPersonalStartTime;
          if (delay_3 >= autoSequenceState.manualPersonalDelayDuration) {
            stopAllOperations();
            showStatusMessage("Now You Can Hit on Personal Info...", "#FFD700");
            return;
          }
        }
        if (!autoSequenceState.manualPersonalTimer) {
          autoSequenceState.manualPersonalTimer = setInterval(() => {
            if (autoSequenceState.manualPersonalStartTime && autoSequenceState.manualPersonalDelayDuration) {
              const delay_4 = Date.now() - autoSequenceState.manualPersonalStartTime;
              const delay_5 = Math.max(0, autoSequenceState.manualPersonalDelayDuration - delay_4);
              const count_7 = Math.round(delay_5 / 1000);
              if (count_7 > 0) {
                showStatusMessage("Manual: You can Hit on Personal info after " + count_7 + " sec (Family Count: " + count_5 + ")", "#FFD700");
              }
              if (delay_4 >= autoSequenceState.manualPersonalDelayDuration) {
                clearInterval(autoSequenceState.manualPersonalTimer);
                autoSequenceState.manualPersonalTimer = null;
                stopAllOperations();
                showStatusMessage("Now You Can Hit on Personal Info...", "#FFD700");
              }
            }
          }, 1000);
        }
      }
      function executeAppInfoStep() {
        if (autoSequenceState.currentStep !== AUTO_SEQUENCE_STEPS.BGD_CF) {
          return;
        }
        if (!isCurrentTabActive("bgd")) {
          if (autoSequenceState.bgdCfStartTime) {
            const temp_42 = (Date.now() - autoSequenceState.bgdCfStartTime) / 1000;
            if (temp_42 >= 54) {
              showStatusMessage("Auto Sequence: 54s elapsed, CF not successful - waiting for manual CF click", "#FFD700");
              return;
            }
          }
          return;
        }
        if (!autoSequenceState.bgdCfStartTime) {
          handleLoginCFStep();
          return;
        }
        const timer_5 = (Date.now() - autoSequenceState.bgdCfStartTime) / 1000;
        if (timer_5 >= 54) {
          if (autoSequenceState.bgdCfTimer) {
            clearInterval(autoSequenceState.bgdCfTimer);
            autoSequenceState.bgdCfTimer = null;
          }
          autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.BGD_APP;
          const temp_43 = "application-info-btn";
          const temp_44 = editedEndpoints[temp_43];
          if (temp_44) {
            submitApplicationInfo(temp_44).then(() => {
              showStatusMessage("Auto Sequence: App request sent (54s elapsed + CF success)", "#00FF00");
            }).catch(error_5 => {
              console.error("Error in App button click:", error_5);
              showStatusMessage("Auto Sequence: App request failed", "#ff4444");
            });
          } else {
            submitApplicationInfo().then(() => {
              showStatusMessage("Auto Sequence: App request sent (54s elapsed + CF success)", "#00FF00");
            }).catch(error_6 => {
              console.error("Error in App button click:", error_6);
              showStatusMessage("Auto Sequence: App request failed", "#ff4444");
            });
          }
        } else {
          showStatusMessage("Auto Sequence: BGD CF success, waiting " + Math.round(54 - timer_5) + "s for timer", "#FFD700");
        }
      }
      function executePersonalInfoStep() {
        const delay_6 = parseInt(family_count) || 0;
        const temp_45 = {
          "0": {
            min: 12000,
            max: 15000
          },
          "1": {
            min: 47000,
            max: 49000
          },
          "2": {
            min: 82000,
            max: 85000
          },
          "3": {
            min: 117000,
            max: 120000
          }
        };
        const temp_46 = temp_45[delay_6];
        if (temp_46) {
          const temp_47 = Math.floor(Math.random() * (temp_46.max - temp_46.min + 1)) + temp_46.min;
          return temp_47;
        }
        console.warn("Family count " + delay_6 + " not in delay mapping, using default 140s delay");
        return 140000;
      }
      function continueAutoSequence() {
        if (!autoRetryState.enabled || !autoSequenceState.enabled) {
          resetAutoSequenceState();
          return;
        }
        switch (autoSequenceState.currentStep) {
          case AUTO_SEQUENCE_STEPS.IDLE:
          case AUTO_SEQUENCE_STEPS.LOGIN_CF:
            if (isWithinWorkingHours()) {
              if (isCurrentTabActive("login")) {
                autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.LOGIN_MOBILE_VERIFY;
                setTimeout(() => {
                  if (isButtonEnabled("mobile-verify-btn")) {
                    showStatusMessage("Auto Sequence: Mobile Verify clicked", "#00FF00");
                  }
                }, 1000);
              }
            } else {}
            break;
          case AUTO_SEQUENCE_STEPS.LOGIN_MOBILE_VERIFY:
            if (checkButtonTextContains("mobile-verify-btn", "Registered")) {
              autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.LOGIN_AUTHENTICATE;
              setTimeout(() => {
                if (isButtonEnabled("authenticate-btn")) {
                  showStatusMessage("Auto Sequence: Authenticate clicked", "#00FF00");
                }
              }, 1000);
            }
            break;
          case AUTO_SEQUENCE_STEPS.LOGIN_AUTHENTICATE:
            if (checkButtonTextContains("authenticate-btn", "Authenticated")) {
              autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.LOGIN_WAIT_OTP;
              autoSequenceState.authenticateStartTime = Date.now();
              autoSequenceState.otpEnteredTime = null;
              const element_17 = document.getElementById("mt-otp");
              if (element_17) {
                let temp_48 = false;
                observeOtpInput("mt-otp", () => {
                  if (temp_48) {
                    console.log("Auto Sequence: OTP callback already executed, ignoring duplicate call");
                    return;
                  }
                  if (canAutoSequenceProceed() && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.LOGIN_WAIT_OTP) {
                    temp_48 = true;
                    autoSequenceState.otpEnteredTime = Date.now();
                    const temp_49 = (autoSequenceState.otpEnteredTime - autoSequenceState.authenticateStartTime) / 1000;
                    if (autoSequenceState.submitOtpTimer) {
                      clearTimeout(autoSequenceState.submitOtpTimer);
                      autoSequenceState.submitOtpTimer = null;
                    }
                    if (temp_49 < 17) {
                      const delay_7 = (17 - temp_49) * 1000;
                      showStatusMessage("Auto Sequence: OTP entered, waiting " + Math.round(delay_7 / 1000) + "s to reach 17s", "#FFD700");
                      autoSequenceState.submitOtpTimer = setTimeout(() => {
                        if (canAutoSequenceProceed() && (autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.LOGIN_SUBMIT_OTP || autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.LOGIN_WAIT_OTP) && !delay_8) {
                          autoSequenceState.submitOtpTimer = null;
                          autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.LOGIN_SUBMIT_OTP;
                          autoSequenceState.submitOtpStatus200 = false;
                          const temp_50 = "submit-otp-btn";
                          const temp_51 = editedEndpoints[temp_50];
                          if (temp_51) {
                            submitLoginOtp(temp_51).then(() => {
                              showStatusMessage("Auto Sequence: Submit OTP request sent (after 17s wait)", "#00FF00");
                            }).catch(error_7 => {
                              console.error("Error in Submit OTP click:", error_7);
                              showStatusMessage("Auto Sequence: Submit OTP request failed", "#ff4444");
                            });
                          } else {
                            submitLoginOtp().then(() => {
                              showStatusMessage("Auto Sequence: Submit OTP request sent (after 17s wait)", "#00FF00");
                            }).catch(error_8 => {
                              console.error("Error in Submit OTP click:", error_8);
                              showStatusMessage("Auto Sequence: Submit OTP request failed", "#ff4444");
                            });
                          }
                        }
                      }, delay_7);
                    } else if (!delay_8) {
                      autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.LOGIN_SUBMIT_OTP;
                      autoSequenceState.submitOtpStatus200 = false;
                      const temp_52 = "submit-otp-btn";
                      const temp_53 = editedEndpoints[temp_52];
                      if (temp_53) {
                        submitLoginOtp(temp_53).then(() => {
                          showStatusMessage("Auto Sequence: Submit OTP request sent (17s elapsed)", "#00FF00");
                        }).catch(error_9 => {
                          console.error("Error in Submit OTP click:", error_9);
                          showStatusMessage("Auto Sequence: Submit OTP request failed", "#ff4444");
                        });
                      } else {
                        submitLoginOtp().then(() => {
                          showStatusMessage("Auto Sequence: Submit OTP request sent (17s elapsed)", "#00FF00");
                        }).catch(error_10 => {
                          console.error("Error in Submit OTP click:", error_10);
                          showStatusMessage("Auto Sequence: Submit OTP request failed", "#ff4444");
                        });
                      }
                    }
                  }
                });
              }
            }
            break;
          case AUTO_SEQUENCE_STEPS.LOGIN_SUBMIT_OTP:
            if (autoSequenceState.submitOtpStatus200) {
              autoSequenceState.submitOtpStatus200 = false;
              autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.BGD_CF;
              autoSequenceState.bgdCfStartTime = null;
              showStatusMessage("Auto Sequence: Submit OTP success, moving to BGD Tab immediately", "#00FF00");
              clickButton("bgd");
              setTimeout(() => {
                showStatusMessage("Auto Sequence: Enabling BGD CF button", "#00FF00");
                if (!captchaProviderConfig.bgd.enabled) {
                  captchaProviderConfig.bgd.enabled = true;
                  var_55("bgd");
                  hideLoadingIndicator();
                  var_56();
                  handleLoginCFStep();
                  asyncResult_57("bgd");
                  showStatusMessage("Auto Sequence: BGD CF button enabled, timer started", "#00FF00");
                } else {
                  handleLoginCFStep();
                }
              }, 2000);
            }
            break;
          case AUTO_SEQUENCE_STEPS.BGD_CF:
            executeAppInfoStep();
            break;
          case AUTO_SEQUENCE_STEPS.BGD_APP:
            if (autoSequenceState.waitingForPersonal && autoSequenceState.personalDelayStartTime) {
              const delay_9 = Date.now() - autoSequenceState.personalDelayStartTime;
              const delay_10 = autoSequenceState.personalDelayDuration || 2000;
              if (delay_9 >= delay_10) {
                autoSequenceState.waitingForPersonal = false;
                autoSequenceState.personalDelayStartTime = null;
                autoSequenceState.personalDelayDuration = null;
                autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.BGD_PERSONAL;
                if (canAutoSequenceProceed()) {
                  asyncResult_58().then(() => {
                    showStatusMessage("Auto Sequence: Personal request sent", "#00FF00");
                  }).catch(error_11 => {
                    console.error("Error in Personal Info click:", error_11);
                    showStatusMessage("Auto Sequence: Personal request failed", "#ff4444");
                  });
                }
              } else {
                const delay_11 = Math.round((delay_10 - delay_9) / 1000);
                showStatusMessage("Auto Sequence: App success, waiting " + delay_11 + "s before Personal submit (Family Count: " + family_count + ")", "#FFD700");
              }
              return;
            }
            if (autoSequenceState.appSuccess && !autoSequenceState.waitingForPersonal) {
              autoSequenceState.appSuccess = false;
              const delay_12 = executePersonalInfoStep();
              const delay_13 = Math.round(delay_12 / 1000);
              showStatusMessage("Auto Sequence: App success, waiting " + delay_13 + "s before Personal submit (Family Count: " + family_count + ")", "#FFD700");
              autoSequenceState.waitingForPersonal = true;
              autoSequenceState.personalDelayStartTime = Date.now();
              autoSequenceState.personalDelayDuration = delay_12;
            }
            break;
          case AUTO_SEQUENCE_STEPS.BGD_PERSONAL:
            if (autoSequenceState.personalSuccess) {
              autoSequenceState.personalSuccess = false;
              autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.BGD_OVERVIEW;
              const temp_54 = 10000;
              showStatusMessage("Auto Sequence: Personal success, waiting 10s before Overview click", "#FFD700");
              setTimeout(() => {
                if (canAutoSequenceProceed() && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.BGD_OVERVIEW) {
                  if (isButtonEnabled("overview-btn")) {
                    showStatusMessage("Auto Sequence: Overview clicked", "#00FF00");
                  }
                }
              }, temp_54);
            }
            break;
          case AUTO_SEQUENCE_STEPS.BGD_OVERVIEW:
            if (autoSequenceState.overviewSuccess) {
              autoSequenceState.overviewSuccess = false;
              autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.BGD_SEND;
              const temp_55 = Math.floor(Math.random() * 1000) + 2000;
              const delay_14 = (temp_55 / 1000).toFixed(1);
              showStatusMessage("Auto Sequence: Overview success (Booking session updated successfully), waiting " + delay_14 + "s before Send OTP click", "#FFD700");
              setTimeout(() => {
                if (isButtonEnabled("pay-otp-btn")) {
                  showStatusMessage("Auto Sequence: Send OTP clicked", "#00FF00");
                }
              }, temp_55);
            } else {
              const element_18 = document.getElementById("overview-btn");
              const button_1 = element_18 && (element_18.disabled || element_18.textContent.includes("Submitting") || element_18.textContent.includes("Loading") || !checkButtonTextContains("overview-btn", "Overview"));
              if (button_1) {
                showStatusMessage("Auto Sequence: Overview request pending, waiting for success...", "#FFD700");
              } else if (checkButtonTextContains("overview-btn", "Overview")) {
                showStatusMessage("Auto Sequence: Waiting for Overview response confirmation...", "#FFD700");
              }
            }
            break;
          case AUTO_SEQUENCE_STEPS.BGD_SEND:
            if (checkButtonTextContains("pay-otp-btn", "Sent")) {
              autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.BGD_WAIT_VERIFY;
              showStatusMessage("Auto Sequence: Send OTP success, waiting for manual OTP entry and Verify click", "#FFD700");
            }
            break;
          case AUTO_SEQUENCE_STEPS.BGD_WAIT_VERIFY:
            const element_19 = document.getElementById("pay-verify-btn");
            if (element_19 && (element_19.textContent.includes("✓") || element_19.textContent.includes("Verified"))) {
              autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_GET_SLOT;
              showStatusMessage("Auto Sequence: Verify success, switching to Pay Tab", "#00FF00");
              setTimeout(() => {
                clickButton("pay");
                setTimeout(() => {
                  const element_20 = document.getElementById("appointment_date");
                  const temp_56 = element_20 && element_20.value && /^\d{4}-\d{2}-\d{2}$/.test(element_20.value.trim());
                  if (temp_56) {
                    if (isButtonEnabled("get-time-slot-btn")) {
                      showStatusMessage("Auto Sequence: Get Slot clicked (date available)", "#00FF00");
                    }
                  } else {
                    showStatusMessage("Auto Sequence: Please enter date (YYYY-MM-DD)", "#FFD700");
                    observeDateInput("appointment_date", () => {
                      if (canAutoSequenceProceed()) {
                        setTimeout(() => {
                          if (isButtonEnabled("get-time-slot-btn")) {
                            showStatusMessage("Auto Sequence: Get Slot clicked (date entered)", "#00FF00");
                          }
                        }, 1000);
                      }
                    });
                  }
                }, 2000);
              }, 1000);
            }
            break;
          case AUTO_SEQUENCE_STEPS.PAY_GET_SLOT:
            const element_21 = document.getElementById("get-time-slot-btn");
            if (element_21 && (element_21.textContent.includes("✓") || element_21.textContent.includes("Slot Found"))) {
              const element_22 = document.getElementById("appointment_time");
              const temp_57 = element_22 && element_22.value && element_22.value !== "";
              if (temp_57) {
                autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_CAPTCHA;
                const element_23 = document.getElementById("pay-captcha-modal");
                if (element_23) {
                  element_23.style.display = "flex";
                }
                showStatusMessage("Auto Sequence: Get Slot success with time, captcha popup opened, waiting for manual solve", "#FFD700");
              } else {
                autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_SET_TIME;
                if (isButtonEnabled("set-time-btn")) {
                  showStatusMessage("Auto Sequence: Set Time clicked (no time slot)", "#00FF00");
                }
              }
            }
            break;
          case AUTO_SEQUENCE_STEPS.PAY_SET_TIME:
            const element_24 = document.getElementById("set-time-btn");
            if (element_24 && (element_24.textContent.includes("✓") || element_24.textContent.includes("Set Done") || element_24.textContent.includes("Set ✓"))) {
              const element_25 = document.getElementById("appointment_time");
              const temp_58 = element_25 && element_25.value && element_25.value !== "";
              if (temp_58) {
                autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_CAPTCHA;
                const element_26 = document.getElementById("pay-captcha-modal");
                if (element_26) {
                  element_26.style.display = "flex";
                }
                showStatusMessage("Auto Sequence: Set Time success, captcha popup opened, waiting for manual solve", "#FFD700");
              }
            }
            break;
          case AUTO_SEQUENCE_STEPS.PAY_CAPTCHA:
            const element_27 = document.getElementById("pay-captcha-verify-btn");
            if (element_27 && (element_27.textContent.includes("✓") || element_27.textContent.includes("Verified"))) {
              autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_WAIT_PAY_NOW;
              const temp_59 = Math.floor(Math.random() * 1000) + 2000;
              const delay_15 = (temp_59 / 1000).toFixed(1);
              showStatusMessage("Auto Sequence: Captcha verified successfully, waiting " + delay_15 + "s before Pay Now", "#00FF00");
              autoSequenceState.payNowTimer = setTimeout(() => {
                if (canAutoSequenceProceed() && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.PAY_WAIT_PAY_NOW) {
                  autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_NOW;
                  if (autoSequenceState.enabled) {
                    setAutoSequenceEnabled(false);
                    showStatusMessage("Auto Sequence: Pay Now triggered - AS button turned off", "#00FF00");
                  }
                  if (isButtonEnabled("pay-now")) {
                    showStatusMessage("Auto Sequence: Pay Now clicked", "#00FF00");
                  }
                }
              }, temp_59);
            }
            break;
          case AUTO_SEQUENCE_STEPS.PAY_NOW:
            if (checkButtonTextContains("pay-now", "Paid")) {
              showStatusMessage("Auto Sequence: Pay Now success - Auto button turning off", "#00FF00");
              if (autoRetryState.enabled) {
                setAutoRetryEnabled(false, "Pay Now success - Auto turned off");
              }
              resetAutoSequenceState();
            }
            break;
        }
      }
      function timerCallback_59() {
        if (!autoRetryState.enabled || !autoSequenceState.enabled) {
          if (autoSequenceState.currentStep !== AUTO_SEQUENCE_STEPS.IDLE) {
            resetAutoSequenceState();
          }
          return;
        }
        if (!isWithinWorkingHours()) {
          return;
        }
        if (autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.IDLE) {
          if (isCurrentTabActive("login")) {
            autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.LOGIN_CF;
            continueAutoSequence();
          }
        } else {
          continueAutoSequence();
        }
      }
      let timer_6 = null;
      function var_60() {
        if (timer_6) {
          clearInterval(timer_6);
        }
        timer_6 = setInterval(timerCallback_59, 1000);
      }
      function var_61() {
        if (timer_6) {
          clearInterval(timer_6);
          timer_6 = null;
        }
      }
      function var_62(htmlContent_63) {
        const element_28 = htmlContent_63 === "mobile" ? "mobile-verify-btn" : htmlContent_63 === "password" ? "authenticate-btn" : htmlContent_63 === "otp" ? "submit-otp-btn" : htmlContent_63 === "paynow" ? "get-time-slot-btn" : htmlContent_63 === "bgd" ? "application-info-btn" : htmlContent_63 === "personal" ? "personal-info-btn" : htmlContent_63 === "overview" ? "overview-btn" : htmlContent_63 === "send" ? "pay-otp-btn" : htmlContent_63 === "verify" ? "pay-verify-btn" : htmlContent_63 === "resend" ? "resend-pay-otp-btn" : htmlContent_63 === "settime" ? "set-time-btn" : htmlContent_63 === "load" ? "cf-btn-paynow-row" : htmlContent_63 === "paynowbutton" ? "pay-now" : "";
        const element_29 = document.getElementById(element_28);
        if (element_29) {
          element_29.style.background = "#39FF14";
          element_29.style.color = "#000000";
          element_29.style.boxShadow = "0 0 10px #39FF14";
          element_29.textContent = htmlContent_63 === "mobile" ? "Registered ✓" : htmlContent_63 === "password" ? "Authenticated ✓" : htmlContent_63 === "otp" ? "OTP Verified ✓" : htmlContent_63 === "paynow" ? "Slot Found ✓" : htmlContent_63 === "bgd" ? "App ✓" : htmlContent_63 === "personal" ? "Personal ✓" : htmlContent_63 === "overview" ? "Overview ✓" : htmlContent_63 === "send" ? "Sent ✓" : htmlContent_63 === "verify" ? "Verified ✓" : htmlContent_63 === "resend" ? "Resent ✓" : htmlContent_63 === "settime" ? "Set ✓" : htmlContent_63 === "load" ? "Loaded ✓" : htmlContent_63 === "paynowbutton" ? "Paid ✓" : "Success ✓";
        }
      }
      function eventHandler_64() {
        setAutoRetryEnabled(!autoRetryState.enabled);
      }
      function var_65(var_66) {
        const text_12 = var_66 + "=";
        const count_8 = document.cookie.split(";");
        for (let count_9 = 0; count_9 < count_8.length; count_9++) {
          let text_13 = count_8[count_9];
          while (text_13.charAt(0) === " ") {
            text_13 = text_13.substring(1, text_13.length);
          }
          if (text_13.indexOf(text_12) === 0) {
            return decodeURIComponent(text_13.substring(text_12.length, text_13.length));
          }
        }
        return null;
      }
      function var_67() {
        const temp_60 = {};
        if (document.cookie && document.cookie !== "") {
          const count_10 = document.cookie.split(";");
          for (let count_11 = 0; count_11 < count_10.length; count_11++) {
            const temp_61 = count_10[count_11].split("=");
            const temp_62 = temp_61[0].trim();
            const temp_63 = temp_61.slice(1).join("=");
            temp_60[temp_62] = decodeURIComponent(temp_63);
          }
        }
        return temp_60;
      }
      function var_68(var_69) {
        return var_65(var_69) !== null;
      }
      function var_70(var_71, var_72 = null) {
        if (var_71?.data) {
          const data_3 = var_71.data.access_token || var_71.data.token || var_71.data.auth_token || var_71.access_token || var_71.token;
          if (data_3) {
            localStorage.setItem("access_token", data_3);
            console.log("🔑 Access token collected from response and stored");
            var_73();
          }
          if (var_71.data.email) {
            localStorage.setItem("auth_email", var_71.data.email);
          }
          if (var_71.data.name) {
            localStorage.setItem("auth_name", var_71.data.name);
          }
          if (var_71.data.phone || var_71.data.mobile_no) {
            localStorage.setItem("auth_phone", var_71.data.phone || var_71.data.mobile_no);
          }
        }
        if (var_72 && var_72.headers) {
          const headers_5 = var_72.headers.get("Authorization") || var_72.headers.get("authorization");
          if (headers_5) {
            const temp_64 = headers_5.match(/Bearer\s+(.+)/i);
            if (temp_64 && temp_64[1]) {
              const token_4 = temp_64[1].trim();
              localStorage.setItem("access_token", token_4);
              console.log("🔑 Access token collected from Authorization header and stored");
              var_73();
            }
          }
        }
        const token_5 = var_67();
        console.log("📋 Found " + Object.keys(token_5).length + " cookies");
        const text_14 = token_5.access_token || token_5.token || token_5.auth_token || token_5["auth-token"] || token_5["access-token"] || token_5.session_token || token_5["session-token"];
        if (text_14) {
          localStorage.setItem("access_token_cookie", text_14);
          if (!localStorage.getItem("access_token")) {
            localStorage.setItem("access_token", text_14);
            console.log("✅ Access token found in cookies and stored");
          } else {
            console.log("✅ Access token found in cookies: " + text_14.substring(0, 20) + "...");
          }
        } else {
          const count_12 = Object.keys(token_5);
          if (count_12.length > 0) {
            console.log("🔍 Available cookies: " + count_12.join(", "));
          }
        }
        const token_6 = localStorage.getItem("access_token");
        if (token_6) {
          var_73();
          console.log("✅ Token collection complete - Panel title text color updated to Neon Green (#39FF14)");
        }
      }
      function var_73() {
        const token_7 = !!localStorage.getItem("access_token");
        const element_30 = document.getElementById("mt-title-text");
        if (element_30) {
          if (token_7) {
            element_30.style.color = "#39FF14";
            element_30.style.textShadow = "0 0 8px rgba(57, 255, 20, 0.9)";
          } else {
            element_30.style.color = "#ffffff";
            element_30.style.textShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
          }
        }
      }
      function var_74() {
        if (!currentApiKey) {
          currentApiKey = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (currentApiKey.state === "suspended") {
          currentApiKey.resume().then(() => {
            console.log("Audio context resumed");
          }).catch(error_12 => {
            console.error("Failed to resume audio context:", error_12);
          });
        }
      }
      function var_75() {
        try {
          if (!currentApiKey) {
            var_74();
          }
          const temp_65 = currentApiKey.createOscillator();
          const temp_66 = currentApiKey.createGain();
          temp_65.connect(temp_66);
          temp_66.connect(currentApiKey.destination);
          temp_65.type = "sine";
          temp_65.frequency.setValueAtTime(1000, currentApiKey.currentTime);
          temp_66.gain.setValueAtTime(0.3, currentApiKey.currentTime);
          temp_65.start();
          temp_65.stop(currentApiKey.currentTime + 1);
          console.log("Playing success sound for 1 second");
        } catch (var_76) {
          console.error("Error playing sound:", var_76);
        }
      }
      function timerCallback_77(timerCallback_78 = 1) {
        try {
          const ctx_3 = new (window.AudioContext || window.webkitAudioContext)();
          const temp_67 = ctx_3.currentTime;
          const temp_68 = ctx_3.createOscillator();
          const temp_69 = ctx_3.createOscillator();
          const temp_70 = ctx_3.createGain();
          temp_68.type = "sine";
          temp_69.type = "sine";
          temp_68.frequency.setValueAtTime(880, temp_67);
          temp_69.frequency.setValueAtTime(1320, temp_67);
          temp_70.gain.setValueAtTime(0, temp_67);
          temp_70.gain.linearRampToValueAtTime(0.5, temp_67 + 0.05);
          temp_70.gain.exponentialRampToValueAtTime(0.001, temp_67 + 0.8);
          temp_68.connect(temp_70);
          temp_69.connect(temp_70);
          temp_70.connect(ctx_3.destination);
          temp_68.start(temp_67);
          temp_69.start(temp_67);
          temp_68.stop(temp_67 + 0.8);
          temp_69.stop(temp_67 + 0.8);
          if (timerCallback_78 > 1) {
            setTimeout(() => timerCallback_77(timerCallback_78 - 1), 300);
          }
        } catch (var_79) {
          console.error("Error with Web Audio API:", var_79);
        }
      }
      function var_80() {
        try {
          const ctx_4 = new (window.AudioContext || window.webkitAudioContext)();
          const temp_71 = ctx_4.createOscillator();
          const temp_72 = ctx_4.createOscillator();
          const temp_73 = ctx_4.createGain();
          temp_71.type = "sine";
          temp_72.type = "square";
          temp_71.frequency.setValueAtTime(1000, ctx_4.currentTime);
          temp_72.frequency.setValueAtTime(800, ctx_4.currentTime);
          temp_71.frequency.exponentialRampToValueAtTime(400, ctx_4.currentTime + 0.8);
          temp_72.frequency.exponentialRampToValueAtTime(300, ctx_4.currentTime + 0.8);
          temp_73.gain.setValueAtTime(0.8, ctx_4.currentTime);
          temp_73.gain.exponentialRampToValueAtTime(0.01, ctx_4.currentTime + 0.8);
          temp_71.connect(temp_73);
          temp_72.connect(temp_73);
          temp_73.connect(ctx_4.destination);
          temp_71.start();
          temp_72.start();
          temp_71.stop(ctx_4.currentTime + 0.8);
          temp_72.stop(ctx_4.currentTime + 0.8);
        } catch (var_81) {
          console.log("Couldn't play sound:", var_81);
        }
      }
      function var_82() {
        try {
          const ctx_5 = new (window.AudioContext || window.webkitAudioContext)();
          const temp_74 = ctx_5.createOscillator();
          const temp_75 = ctx_5.createGain();
          temp_74.type = "square";
          temp_74.frequency.setValueAtTime(523.25, ctx_5.currentTime);
          temp_74.frequency.setValueAtTime(659.25, ctx_5.currentTime + 0.1);
          temp_74.frequency.setValueAtTime(783.99, ctx_5.currentTime + 0.2);
          temp_75.gain.setValueAtTime(0.5, ctx_5.currentTime);
          temp_75.gain.exponentialRampToValueAtTime(0.01, ctx_5.currentTime + 0.3);
          temp_74.connect(temp_75);
          temp_75.connect(ctx_5.destination);
          temp_74.start();
          temp_74.stop(ctx_5.currentTime + 0.3);
        } catch (var_83) {
          console.log("Couldn't play sound:", var_83);
        }
      }
      function var_84(arrayItem_85, datetime_86) {
        try {
          const ctx_6 = new (window.AudioContext || window.webkitAudioContext)();
          const temp_76 = ctx_6.createOscillator();
          const temp_77 = ctx_6.createGain();
          temp_76.type = "sine";
          let temp_78 = ctx_6.currentTime;
          arrayItem_85.forEach(item_6 => {
            temp_76.frequency.setValueAtTime(item_6, temp_78);
            temp_78 += 0.1;
          });
          temp_77.gain.setValueAtTime(1, ctx_6.currentTime);
          temp_77.gain.exponentialRampToValueAtTime(0.01, ctx_6.currentTime + datetime_86);
          temp_76.connect(temp_77);
          temp_77.connect(ctx_6.destination);
          temp_76.start();
          temp_76.stop(ctx_6.currentTime + datetime_86);
        } catch (var_87) {
          console.log("Couldn't play sound:", var_87);
        }
      }
      function stopAllOperations() {
        try {
          var_84([800, 400, 900, 450, 1000, 500], 0.6);
          console.log("🔊 Short ambulance sound alert played");
        } catch (var_88) {
          console.log("Couldn't play warning sound:", var_88);
        }
      }
      function var_89(var_90) {
        if (var_90) {
          const temp_79 = var_90.closest("#bgd-content");
          if (temp_79) {
            var_90.style.background = "linear-gradient(135deg, #4CAF50, #8BC34A)";
            var_90.style.boxShadow = "\n                        0 0 15px #4CAF50,\n                        0 0 25px #4CAF50,\n                        0 4px 8px rgba(0,0,0,0.3)\n                    ";
          } else {
            var_90.style.background = "linear-gradient(135deg, #FF4081, #F50057)";
            var_90.style.boxShadow = "\n                        0 0 15px #FF4081,\n                        0 0 25px #FF4081,\n                        0 4px 8px rgba(0,0,0,0.3)\n                    ";
          }
        }
      }
      function updateButtonLoading(datetime_91) {
        if (datetime_91) {
          datetime_91.style.background = "linear-gradient(135deg, #2196F3, #03A9F4)";
          datetime_91.style.boxShadow = "\n                    0 0 15px #2196F3,\n                    0 0 25px #2196F3,\n                    0 4px 8px rgba(0,0,0,0.3)\n                ";
        }
      }
      function resetButtonState(asyncResult_92) {
        if (asyncResult_92) {
          if (asyncResult_92.id === "mobile-verify-btn" || asyncResult_92.id === "authenticate-btn" || asyncResult_92.id === "submit-otp-btn") {
            asyncResult_92.style.background = "linear-gradient(135deg, #2196F3, #03A9F4)";
          }
          asyncResult_92.style.boxShadow = "";
        }
      }
      function asyncResult_93(colorValue_94) {
        if (colorValue_94) {
          colorValue_94.style.background = "linear-gradient(135deg, #00FF00, #00CC00)";
          colorValue_94.style.boxShadow = "\n                    0 0 15px #00FF00,\n                    0 0 25px #00FF00,\n                    0 4px 8px rgba(0,0,0,0.3)\n                ";
          colorValue_94.style.color = "#000000";
          var_75();
        }
      }
      const element_31 = document.createElement("div");
      element_31.id = "multi-tools-container";
      element_31.className = "mt-container";
      const element_32 = document.createElement("div");
      element_32.className = "mt-title-bar";
      const element_33 = document.createElement("div");
      element_33.id = "mt-title-text";
      element_33.className = "mt-title";
      element_33.innerHTML = "🦅 FALCON PRO";
      const element_34 = document.createElement("div");
      element_34.id = "title-timer-display";
      element_34.className = "mt-title-timer";
      element_34.textContent = "0s";
      const element_35 = document.createElement("div");
      element_35.className = "mt-controls";
      const element_36 = document.createElement("button");
      element_36.className = "mt-btn-minimize";
      element_36.innerHTML = "−";
      const element_37 = document.createElement("button");
      element_37.className = "mt-btn-close";
      element_37.innerHTML = "×";
      element_35.appendChild(element_36);
      element_35.appendChild(element_37);
      element_32.appendChild(element_33);
      element_32.appendChild(element_34);
      element_32.appendChild(element_35);
      const element_38 = document.createElement("div");
      element_38.className = "mt-tabs-container";
      const temp_80 = (param_11, var_95 = false) => {
        const element_39 = document.createElement("button");
        element_39.classList.add("tab", "neon-tab", "inactive-tab");
        element_39.innerHTML = "<span class=\"tab-label\">" + param_11 + "</span>";
        if (var_95) {
          element_39.classList.add("active", "active-tab");
          element_39.classList.remove("inactive-tab");
        }
        element_39.addEventListener("click", () => {
          const config_1 = currentTab;
          if (config_1 && config_1 !== element_39.getAttribute("data-tab")) {
            captchaProviderConfig[config_1].enabled = false;
            captchaProviderConfig[config_1].token = "";
            var_55(config_1);
          }
          document.querySelectorAll("#multi-tools-container .tab").forEach(item_7 => {
            item_7.classList.remove("active", "active-tab");
            item_7.classList.add("inactive-tab");
          });
          element_39.classList.add("active", "active-tab");
          element_39.classList.remove("inactive-tab");
          document.querySelectorAll("#multi-tools-container .tab-content").forEach(item_8 => {
            item_8.style.display = "none";
            item_8.classList.remove("active");
          });
          const element_40 = element_39.getAttribute("data-content");
          const element_41 = document.getElementById(element_40);
          if (element_41) {
            element_41.style.display = "block";
            element_41.classList.add("active");
          }
          currentTab = element_39.getAttribute("data-tab");
          var_55(currentTab);
        });
        return element_39;
      };
      const data_4 = temp_80("Login", true);
      const data_5 = temp_80("BGD");
      const data_6 = temp_80("Pay");
      data_4.setAttribute("data-content", "login-content");
      data_4.setAttribute("data-tab", "login");
      data_5.setAttribute("data-content", "bgd-content");
      data_5.setAttribute("data-tab", "bgd");
      data_6.setAttribute("data-content", "paynow-content");
      data_6.setAttribute("data-tab", "pay");
      element_38.appendChild(data_4);
      element_38.appendChild(data_5);
      element_38.appendChild(data_6);
      const element_42 = document.createElement("div");
      element_42.id = "status-panel";
      element_42.className = "mt-status-panel";
      element_42.textContent = "Ready !";
      const element_43 = document.createElement("div");
      element_43.className = "mt-content";
      function var_96(eventHandler_97 = "") {
        const element_44 = document.createElement("div");
        element_44.className = "flex mb-md";
        const element_45 = document.createElement("button");
        element_45.id = "cf-btn" + (eventHandler_97 ? "-" + eventHandler_97 : "");
        element_45.className = "cf-at-btn global-cf-btn btn-info";
        element_45.textContent = "CF";
        element_45.addEventListener("click", () => eventHandler_98(eventHandler_97));
        element_44.appendChild(element_45);
        if (eventHandler_97 === "login") {
          const element_46 = document.createElement("div");
          element_46.style.display = "flex";
          element_46.style.alignItems = "center";
          element_46.style.gap = "6px";
          element_46.style.flex = "1";
          element_46.style.marginLeft = "8px";
          const element_47 = document.createElement("input");
          element_47.type = "checkbox";
          element_47.id = "captcha-enable-checkbox";
          element_47.style.cursor = "pointer";
          const element_48 = document.createElement("input");
          element_48.id = "math-captcha-input";
          element_48.type = "text";
          element_48.className = "tool-input-row";
          element_48.placeholder = "Enter Captcha Answer";
          element_48.style.flex = "1";
          element_48.style.height = "24px";
          element_48.style.padding = "4px 8px";
          element_48.style.fontSize = "10px";
          element_48.addEventListener("input", event_1 => {
            event_1.target.value = event_1.target.value.replace(/[^0-9]/g, "");
          });
          element_48.disabled = !element_47.checked;
          element_47.addEventListener("change", event_2 => {
            element_48.disabled = !event_2.target.checked;
            if (!event_2.target.checked) {
              element_48.value = "";
            }
          });
          element_46.appendChild(element_47);
          element_46.appendChild(element_48);
          element_44.appendChild(element_46);
        }
        return element_44;
      }
      const style_1 = {
        primary: "background: linear-gradient(135deg, #6366f1, #8b5cf6);",
        warning: "background: linear-gradient(135deg, #f59e0b, #fbbf24);",
        danger: "background: linear-gradient(135deg, #ef4444, #f87171);",
        success: "background: linear-gradient(135deg, #22c55e, #4ade80);",
        secondary: "background: linear-gradient(135deg, #ec4899, #f472b6);",
        gray: "background: linear-gradient(135deg, #6366f1, #8b5cf6);",
        slate: "background: linear-gradient(135deg, #ec4899, #f472b6);",
        gold: "background: linear-gradient(135deg, #f59e0b, #fbbf24);",
        teal: "background: linear-gradient(135deg, #3b82f6, #60a5fa);",
        violet: "background: linear-gradient(135deg, #6366f1, #8b5cf6);",
        purple: "background: linear-gradient(135deg, #ec4899, #f472b6);"
      };
      const style_2 = {
        primary: "btn-primary",
        warning: "btn-warning",
        danger: "btn-danger",
        success: "btn-success",
        info: "btn-info",
        secondary: "btn-secondary"
      };
      function childElement_99({
        id = "",
        className = "tool-btn-row",
        text = "",
        style = "",
        styleClass = "",
        html = ""
      } = {}) {
        const element_49 = document.createElement("button");
        if (id) {
          element_49.id = id;
        }
        const style_3 = styleClass ? className + " " + styleClass : className;
        element_49.className = style_3;
        if (text) {
          element_49.textContent = text;
        }
        if (html) {
          element_49.innerHTML = html;
        }
        if (style) {
          element_49.style.cssText = style;
        }
        return element_49;
      }
      function childElement_100({
        id = "",
        className = "tool-input-row",
        placeholder = "",
        type = "text",
        value = "",
        extraStyles = ""
      } = {}) {
        const element_50 = document.createElement("input");
        if (id) {
          element_50.id = id;
        }
        element_50.className = className;
        element_50.type = type;
        element_50.placeholder = placeholder;
        if (value) {
          element_50.value = value;
        }
        if (extraStyles) {
          element_50.style.cssText = extraStyles;
        }
        return element_50;
      }
      function var_101() {
        const element_51 = document.createElement("div");
        element_51.className = "flex mb-md";
        const element_52 = document.createElement("button");
        element_52.id = "cfp-btn-paynow-row";
        element_52.className = "cf-at-btn global-cfp-btn btn-info";
        element_52.textContent = "CF";
        element_52.addEventListener("click", () => eventHandler_98("pay"));
        element_51.appendChild(element_52);
        return element_51;
      }
      async function asyncResult_57(asyncResult_102) {
        captchaState.solving = true;
        showStatusMessage("Solving CAPTCHA...", "#00BCD4");
        var_55(asyncResult_102);
        try {
          console.log("Creating CAPTCHA task...");
          const data_7 = {
            clientKey: capsolverApiKey,
            task: {
              type: "AntiTurnstileTaskProxyless",
              websiteURL: window.location.href,
              websiteKey: getSiteKey(asyncResult_102)
            }
          };
          console.log("Task data:", JSON.stringify(data_7));
          const result_1 = await fetch("https://api.capsolver.com/createTask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data_7)
          });
          console.log("Create task response status:", result_1.status);
          const result_2 = await result_1.json();
          console.log("Create task result:", result_2);
          if (result_2.errorId !== 0) {
            console.error("Create task error:", result_2.errorDescription);
            throw new Error(result_2.errorDescription);
          }
          const temp_81 = result_2.taskId;
          showStatusMessage("CAPTCHA task created", "#00BCD4");
          const temp_82 = 60;
          let temp_83 = 0;
          let token_8 = null;
          console.log("Starting to poll for solution...");
          while (temp_83 < temp_82 && !token_8) {
            temp_83++;
            console.log("Polling attempt " + temp_83 + "/" + temp_82);
            await new Promise(param_12 => {
              setTimeout(param_12, 5000);
            });
            const temp_84 = {
              clientKey: capsolverApiKey,
              taskId: temp_81
            };
            const text_15 = temp_84;
            console.log("Getting task result...");
            const result_3 = await fetch("https://api.capsolver.com/getTaskResult", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(text_15)
            });
            console.log("Get result response status:", result_3.status);
            const result_4 = await result_3.json();
            console.log("Get result:", result_4);
            if (result_4.errorId !== 0) {
              console.error("Get result error:", result_4.errorDescription);
              throw new Error(result_4.errorDescription);
            }
            if (result_4.status === "ready") {
              console.log("Solution found:", result_4.solution);
              token_8 = result_4.solution;
              break;
            } else if (result_4.status === "processing") {
              console.log("Task still processing...");
            } else {
              console.error("Unexpected status:", result_4.status);
              throw new Error("Unexpected status: " + result_4.status);
            }
          }
          if (!token_8) {
            console.error("CAPTCHA solving timeout");
            throw new Error("CAPTCHA solving timeout");
          }
          captchaState.token = token_8.token;
          captchaState.cfToken = token_8.token;
          captchaState.solution = token_8;
          captchaState.solved = true;
          captchaState.solving = false;
          captchaProviderConfig[asyncResult_102].token = token_8.token;
          var_103(token_8.token);
          var_55(asyncResult_102);
          showStatusMessage("CAPTCHA Solved", "#00FF00");
          var_75();
          if (autoSequenceState.enabled && asyncResult_102 === "login" && (autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.IDLE || autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.LOGIN_CF) && isCurrentTabActive("login")) {
            autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.LOGIN_CF;
            setTimeout(() => {
              continueAutoSequence();
            }, 100);
          }
          if (autoSequenceState.enabled && autoRetryState.enabled && asyncResult_102 === "bgd") {
            if (autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.BGD_CF) {
              if (autoSequenceState.bgdCfStartTime && !autoSequenceState.bgdCfTimer) {
                handleLoginCFStep();
              }
              executeAppInfoStep();
            } else {
              detectManualButtonSuccess("cf-btn-bgd");
            }
          } else if ((!autoSequenceState.enabled || !autoRetryState.enabled) && asyncResult_102 === "bgd" && autoSequenceState.manualBgdCfStartTime && !autoSequenceState.manualBgdCfTimer) {
            handleBgdCFAfterAuth();
          }
        } catch (message_104) {
          console.error("CAPTCHA solving error:", message_104);
          captchaState.solving = false;
          showStatusMessage("CAPTCHA Solve Failed: " + message_104.message, "#ff4444");
          var_55(asyncResult_102);
        }
      }
      function eventHandler_98(stateFlag_105) {
        captchaProviderConfig[stateFlag_105].enabled = !captchaProviderConfig[stateFlag_105].enabled;
        if (captchaProviderConfig[stateFlag_105].enabled) {
          console.log("CF turned ON for " + stateFlag_105 + " tab - Starting auto-solving CAPTCHA");
          if (stateFlag_105 === "bgd") {
            if (autoSequenceState.enabled && autoRetryState.enabled) {
              if (!autoSequenceState.bgdCfStartTime) {
                hideLoadingIndicator();
                var_56();
              }
              if (autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.IDLE || autoSequenceState.currentStep !== AUTO_SEQUENCE_STEPS.BGD_CF && autoSequenceState.currentStep !== AUTO_SEQUENCE_STEPS.BGD_APP && autoSequenceState.currentStep !== AUTO_SEQUENCE_STEPS.BGD_PERSONAL && autoSequenceState.currentStep !== AUTO_SEQUENCE_STEPS.BGD_OVERVIEW && autoSequenceState.currentStep !== AUTO_SEQUENCE_STEPS.BGD_SEND && autoSequenceState.currentStep !== AUTO_SEQUENCE_STEPS.BGD_WAIT_VERIFY) {
                autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.BGD_CF;
                handleLoginCFStep();
              } else if (autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.BGD_CF) {
                handleLoginCFStep();
                setTimeout(() => {
                  if (autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.BGD_CF) {
                    executeAppInfoStep();
                  }
                }, 500);
              }
            } else {
              handleBgdCFAfterAuth();
            }
          }
          asyncResult_57(stateFlag_105);
        } else {
          console.log("CF turned OFF for " + stateFlag_105 + " tab - Stopping auto-solving CAPTCHA");
          captchaProviderConfig[stateFlag_105].token = "";
          var_55(stateFlag_105);
        }
      }
      function var_55(var_106) {
        let element_53;
        if (var_106 === "pay") {
          element_53 = document.getElementById("cfp-btn-paynow-row");
        } else {
          element_53 = document.getElementById("cf-btn-" + var_106);
        }
        if (element_53) {
          if (captchaProviderConfig[var_106].enabled && captchaProviderConfig[var_106].token) {
            element_53.style.background = "linear-gradient(135deg, #FF9800, #FF5722)";
            element_53.style.border = "2px solid #39FF14";
            element_53.style.boxShadow = "\n                        0 0 10px #39FF14,\n                        0 0 20px #39FF14,\n                        0 0 30px #39FF14,\n                        0 0 40px #39FF14,\n                        inset 0 0 10px rgba(57, 255, 20, 0.5)\n                    ";
          } else if (captchaProviderConfig[var_106].enabled) {
            element_53.style.background = "linear-gradient(135deg, #FF9800, #FF5722)";
            element_53.style.border = "2px solid #FF9800";
            element_53.style.boxShadow = "0 0 15px #FF9800, 0 0 25px #FF9800";
          } else {
            element_53.style.background = "linear-gradient(135deg, #2196F3, #03A9F4)";
            element_53.style.border = "none";
            element_53.style.boxShadow = "";
          }
        }
      }
      function var_103(value_107) {
        let element_54 = document.getElementById("mt-captcha-token-input");
        if (!element_54) {
          element_54 = document.createElement("input");
          element_54.id = "mt-captcha-token-input";
          element_54.type = "hidden";
          element_54.name = "cf-turnstile-response";
          document.body.appendChild(element_54);
        }
        element_54.value = value_107;
        console.log("Stored CAPTCHA token in hidden input:", value_107);
      }
      function datetime_108(datetime_109, var_110) {
        const timer_7 = window["timerInterval_" + datetime_109];
        if (timer_7) {
          clearInterval(timer_7);
        }
        let temp_85 = var_110 * 60;
        const element_55 = document.getElementById(datetime_109);
        if (!element_55) {
          console.error("Timer element with id " + datetime_109 + " not found");
          return;
        }
        element_55.style.display = "block";
        element_55.style.color = "#ffffff";
        window["timerInterval_" + datetime_109] = setInterval(() => {
          temp_85--;
          const text_16 = Math.floor(temp_85 / 60);
          const text_17 = temp_85 % 60;
          if (element_55) {
            element_55.textContent = text_16.toString().padStart(2, "0") + ":" + text_17.toString().padStart(2, "0");
          }
          if (temp_85 <= 0) {
            clearInterval(window["timerInterval_" + datetime_109]);
            if (element_55) {
              element_55.textContent = "Expired";
              element_55.style.color = "#ff4444";
            }
          }
        }, 1000);
      }
      function datetime_111(datetime_112) {
        const timer_8 = window["timerInterval_" + datetime_112];
        if (timer_8) {
          clearInterval(timer_8);
          console.log("Timer " + datetime_112 + " paused");
        }
      }
      function var_113() {
        datetime_108("captcha-verify-timer", 2);
      }
      function hideLoadingIndicator() {
        retryCount = 0;
        if (lastRequestTime) {
          clearInterval(lastRequestTime);
          lastRequestTime = null;
        }
        const element_56 = document.getElementById("title-timer-display");
        if (element_56) {
          element_56.textContent = "0s";
        }
      }
      function var_56() {
        if (lastRequestTime) {
          clearInterval(lastRequestTime);
        }
        retryCount = 0;
        lastRequestTime = setInterval(() => {
          retryCount++;
          const text_18 = Math.floor(retryCount / 60);
          const text_19 = retryCount % 60;
          const element_57 = document.getElementById("title-timer-display");
          if (element_57) {
            element_57.textContent = text_18.toString().padStart(2, "0") + ":" + text_19.toString().padStart(2, "0");
          }
        }, 1000);
      }
      const element_58 = document.createElement("div");
      element_58.id = "login-content";
      element_58.className = "tab-content login-tab active";
      element_58.style.display = "block";
      const temp_86 = var_96("login");
      element_58.appendChild(temp_86);
      const button_2 = {
        id: "mobile-verify-btn",
        className: "tool-btn login-btn",
        text: "Mobile Verify",
        styleClass: style_2.primary
      };
      const temp_87 = {
        input: {
          id: "mt-mobile-number",
          className: "tool-input login-input",
          placeholder: "Mobile Number"
        },
        button: button_2
      };
      const button_3 = {
        id: "authenticate-btn",
        className: "tool-btn login-btn",
        text: "Authenticate",
        styleClass: style_2.primary
      };
      const temp_88 = {
        input: {
          id: "mt-password",
          className: "tool-input login-input",
          placeholder: "Password",
          type: "password"
        },
        button: button_3
      };
      const button_4 = {
        id: "submit-otp-btn",
        className: "tool-btn login-btn",
        text: "Submit OTP",
        styleClass: style_2.primary
      };
      const temp_89 = {
        input: {
          id: "mt-otp",
          className: "tool-input login-input",
          placeholder: "Login OTP"
        },
        button: button_4
      };
      const temp_90 = [temp_87, temp_88, temp_89];
      temp_90.forEach(({
        input: childElement_114,
        button: childElement_115
      }) => {
        const element_59 = document.createElement("div");
        element_59.className = "mb-sm";
        element_59.appendChild(childElement_100(childElement_114));
        element_59.appendChild(childElement_99(childElement_115));
        element_58.appendChild(element_59);
      });
      const element_60 = document.createElement("div");
      element_60.id = "login-otp-timer-display";
      element_60.className = "timer-box";
      element_60.style.display = "none";
      element_60.textContent = "OTP: 00:00";
      element_58.appendChild(element_60);
      const element_61 = document.createElement("div");
      element_61.id = "bgd-content";
      element_61.className = "tab-content";
      element_61.style.display = "none";
      const element_62 = document.createElement("div");
      element_62.className = "flex gap-sm mb-md";
      element_62.style.alignItems = "center";
      const element_63 = document.createElement("button");
      element_63.id = "cf-btn-bgd";
      element_63.className = "cf-at-btn global-cf-btn btn-info";
      element_63.textContent = "CF";
      element_63.addEventListener("click", () => eventHandler_98("bgd"));
      const element_64 = document.createElement("div");
      element_64.id = "bgd-otp-timer-display";
      element_64.className = "timer-box flex-1";
      element_64.style.margin = "0";
      element_64.style.padding = "4px";
      element_64.textContent = "OTP: 00:00";
      element_62.appendChild(element_63);
      element_62.appendChild(element_64);
      element_61.appendChild(element_62);
      const element_65 = document.createElement("div");
      element_65.className = "bgd-grid";
      const temp_91 = {
        id: "application-info-btn",
        text: "App",
        style: style_1.primary
      };
      const temp_92 = {
        id: "personal-info-btn",
        text: "Personal",
        style: style_1.primary
      };
      const temp_93 = {
        id: "overview-btn",
        text: "Overview",
        style: style_1.primary
      };
      const temp_94 = {
        id: "pay-otp-btn",
        text: "Send",
        style: style_1.primary
      };
      const temp_95 = {
        id: "pay-verify-btn",
        text: "Verify",
        style: style_1.primary
      };
      const temp_96 = {
        id: "resend-pay-otp-btn",
        text: "Resend",
        style: style_1.secondary
      };
      const temp_97 = {
        id: "import-config-btn",
        text: "Import",
        style: style_1.warning,
        onClick: eventHandler_116
      };
      const temp_98 = {
        id: "export-config-btn",
        text: "Export",
        style: style_1.success,
        onClick: eventHandler_117
      };
      const temp_99 = [temp_91, temp_92, temp_93, temp_94, temp_95, temp_96, temp_97, temp_98];
      temp_99.forEach(({
        onClick: eventHandler_118,
        ...var_119
      }) => {
        const row_1 = {
          ...var_119
        };
        row_1.className = "tool-btn-row";
        const temp_100 = childElement_99(row_1);
        if (eventHandler_118) {
          temp_100.addEventListener("click", eventHandler_118);
        }
        element_65.appendChild(temp_100);
      });
      const temp_101 = childElement_100({
        id: "payment-otp",
        placeholder: "OTP"
      });
      const temp_102 = temp_99.findIndex(index_1 => index_1.id === "pay-verify-btn");
      if (temp_102 >= 0) {
        element_65.insertBefore(temp_101, element_65.children[temp_102]);
      } else {
        element_65.appendChild(temp_101);
      }
      element_61.appendChild(element_65);
      const element_66 = document.createElement("div");
      element_66.id = "paynow-content";
      element_66.className = "tab-content";
      element_66.style.display = "none";
      const temp_103 = var_101();
      element_66.appendChild(temp_103);
      const element_67 = document.createElement("div");
      element_67.id = "pay-timer-display";
      element_67.className = "timer-box flex-1";
      element_67.style.display = "none";
      element_67.style.margin = "0 6px";
      element_67.style.padding = "4px";
      element_67.textContent = "10:00";
      temp_103.insertBefore(element_67, temp_103.children[1]);
      const element_68 = document.createElement("div");
      element_68.className = "flex gap-sm mb-md";
      const element_69 = document.createElement("div");
      element_69.className = "flex flex-col gap-sm flex-1";
      const element_70 = document.createElement("input");
      element_70.type = "text";
      element_70.id = "appointment_date";
      element_70.className = "tool-input-row";
      element_70.placeholder = "YYYY-MM-DD";
      element_70.style.width = "100%";
      const element_71 = document.createElement("button");
      element_71.id = "get-time-slot-btn";
      element_71.className = "tool-btn-row btn-primary w-full";
      element_71.textContent = "Get Slot";
      element_69.appendChild(element_70);
      element_69.appendChild(element_71);
      const element_72 = document.createElement("div");
      element_72.className = "flex flex-col gap-sm flex-1";
      const element_73 = document.createElement("select");
      element_73.id = "appointment_time";
      element_73.className = "tool-input-row";
      element_73.style.width = "100%";
      const element_74 = document.createElement("option");
      element_74.value = "";
      element_74.textContent = "Time";
      element_73.appendChild(element_74);
      const element_75 = document.createElement("button");
      element_75.id = "set-time-btn";
      element_75.className = "tool-btn-row btn-primary w-full";
      element_75.textContent = "Set Time";
      element_72.appendChild(element_73);
      element_72.appendChild(element_75);
      element_68.appendChild(element_69);
      element_68.appendChild(element_72);
      element_66.appendChild(element_68);
      const element_76 = document.createElement("div");
      element_76.className = "flex gap-sm mb-md w-full";
      element_76.style.alignItems = "flex-start";
      element_76.style.boxSizing = "border-box";
      const element_77 = document.createElement("div");
      element_77.className = "flex flex-col gap-sm flex-1";
      const element_78 = document.createElement("button");
      element_78.id = "cf-btn-paynow-row";
      element_78.className = "tool-btn-row btn-warning";
      element_78.style.color = "#1f2937";
      element_78.style.fontWeight = "600";
      element_78.textContent = "Load";
      element_77.appendChild(element_78);
      const element_79 = document.createElement("div");
      element_79.className = "flex flex-col gap-sm flex-1";
      element_79.style.paddingRight = "6px";
      element_79.style.boxSizing = "border-box";
      const element_80 = document.createElement("div");
      element_80.id = "slot-count-display";
      element_80.className = "timer-box text-center w-full";
      element_80.style.margin = "0";
      element_80.style.color = "var(--color-secondary)";
      element_80.textContent = "Slots: 0";
      element_79.appendChild(element_80);
      element_76.appendChild(element_77);
      element_76.appendChild(element_79);
      element_66.appendChild(element_76);
      const element_81 = document.createElement("div");
      element_81.id = "pay-captcha-modal";
      element_81.className = "mt-pay-modal";
      const element_82 = document.createElement("div");
      element_82.className = "mt-pay-card";
      const element_83 = document.createElement("div");
      element_83.className = "mt-pay-header";
      const element_84 = document.createElement("div");
      element_84.textContent = "Payment Captcha";
      element_84.className = "mt-pay-title";
      const element_85 = document.createElement("button");
      element_85.id = "pay-captcha-close-btn";
      element_85.textContent = "×";
      element_85.className = "mt-pay-close";
      element_83.appendChild(element_84);
      element_83.appendChild(element_85);
      element_82.appendChild(element_83);
      const element_86 = document.createElement("div");
      element_86.id = "pay-captcha-hint";
      element_86.textContent = "Solve the CAPTCHA below, then click Verify.";
      element_86.className = "mt-pay-hint";
      element_82.appendChild(element_86);
      const element_87 = document.createElement("div");
      element_87.className = "mt-flex-col";
      element_87.style.width = "100%";
      const element_88 = document.createElement("div");
      element_88.className = "mt-flex-center";
      const element_89 = document.createElement("button");
      element_89.id = "pay-captcha-refresh-btn";
      element_89.className = "tool-btn-row";
      element_89.style.background = "linear-gradient(135deg, #6366F1, #8B5CF6)";
      element_89.style.height = "28px";
      element_89.style.width = "80px";
      element_89.style.borderRadius = "14px";
      element_89.style.fontSize = "14px";
      element_89.style.fontWeight = "600";
      element_89.textContent = "Refresh";
      element_88.appendChild(element_89);
      const element_90 = document.createElement("div");
      element_90.id = "cf-captcha-container";
      element_90.className = "mt-captcha-container";
      element_90.textContent = "Captcha will appear here";
      element_87.appendChild(element_88);
      element_87.appendChild(element_90);
      element_82.appendChild(element_87);
      const element_91 = document.createElement("input");
      element_91.id = "pay-captcha-input";
      element_91.className = "tool-input-row mt-input-enhanced";
      element_91.placeholder = "Enter captcha value";
      element_91.style.width = "100%";
      element_91.style.fontSize = "18px";
      element_91.style.textAlign = "center";
      element_91.style.fontWeight = "600";
      element_91.dataset.originalValue = "";
      element_91.addEventListener("input", function (event_3) {
        const data_8 = event_3.target;
        const count_13 = data_8.value;
        const count_14 = data_8.selectionStart;
        let count_15 = 0;
        for (let count_16 = 0; count_16 < count_14 && count_16 < count_13.length; count_16++) {
          if (count_13[count_16] !== " ") {
            count_15++;
          }
        }
        let data_9 = count_13.replace(/\s/g, "");
        data_8.dataset.originalValue = data_9;
        data_8.value = data_9;
        const count_17 = Math.min(count_15, data_9.length);
        setTimeout(() => {
          data_8.setSelectionRange(count_17, count_17);
        }, 0);
      });
      element_91.addEventListener("paste", function (data_10) {
        data_10.preventDefault();
        const data_11 = (data_10.clipboardData || window.clipboardData).getData("text").replace(/\s/g, "");
        this.dataset.originalValue = data_11;
        this.value = data_11;
        this.dispatchEvent(new Event("input"));
      });
      element_82.appendChild(element_91);
      const element_92 = document.createElement("button");
      element_92.id = "pay-captcha-verify-btn";
      element_92.className = "tool-btn-row";
      element_92.style.background = "linear-gradient(135deg, #6366F1, #8B5CF6)";
      element_92.style.height = "30px";
      element_92.style.padding = "6px";
      element_92.textContent = "Verify";
      element_82.appendChild(element_92);
      const element_93 = document.createElement("div");
      element_93.className = "mt-flex-row";
      element_93.style.marginTop = "4px";
      const element_94 = document.createElement("button");
      element_94.id = "pay-captcha-cs-btn";
      element_94.className = "tool-btn-row";
      element_94.style.background = "linear-gradient(135deg, #6366F1, #8B5CF6)";
      element_94.style.height = "30px";
      element_94.style.padding = "6px";
      element_94.style.flex = "1";
      element_94.textContent = "Auto";
      element_93.appendChild(element_94);
      const element_95 = document.createElement("button");
      element_95.id = "pay-captcha-stop-btn";
      element_95.className = "tool-btn-row";
      element_95.style.background = "linear-gradient(135deg, #F44336, #E91E63)";
      element_95.style.height = "30px";
      element_95.style.padding = "6px";
      element_95.style.flex = "1";
      element_95.textContent = "Stop";
      element_95.addEventListener("click", event_4 => {
        event_4.preventDefault();
        captchaTaskState.stopRequested = true;
        showStatusMessage("Auto-solving stopped - popup remains open", "#ff9800");
        const element_96 = document.getElementById("pay-captcha-cs-btn");
        if (element_96) {
          element_96.disabled = false;
          element_96.textContent = element_96.dataset.originalText || "Auto";
        }
      });
      element_93.appendChild(element_95);
      element_82.appendChild(element_93);
      element_81.appendChild(element_82);
      element_85.addEventListener("click", () => eventHandler_120());
      element_81.addEventListener("click", event_5 => {
        if (event_5.target === element_81) {
          eventHandler_120();
        }
      });
      element_89.addEventListener("click", async event_6 => {
        event_6.preventDefault();
        await asyncResult_121();
      });
      element_31.appendChild(element_81);
      const element_97 = document.createElement("div");
      element_97.className = "flex gap-sm mb-md";
      const element_98 = document.createElement("button");
      element_98.id = "pay-now";
      element_98.className = "tool-btn-row btn-secondary flex-1";
      element_98.textContent = "Pay Now (VISA)";
      element_98.addEventListener("click", eventHandler_122);
      element_97.appendChild(element_98);
      element_66.appendChild(element_97);
      const element_99 = document.createElement("div");
      element_99.id = "captcha-verify-timer";
      element_99.className = "timer-box text-center";
      element_99.style.display = "none";
      element_99.style.color = "var(--color-success)";
      element_99.style.borderColor = "var(--color-success)";
      element_99.style.background = "rgba(34, 197, 94, 0.2)";
      element_99.style.textShadow = "0 0 10px var(--color-success)";
      element_99.style.boxShadow = "0 0 10px rgba(34, 197, 94, 0.3)";
      element_99.style.height = "24px";
      element_99.style.lineHeight = "24px";
      element_99.textContent = "02:00";
      element_66.appendChild(element_99);
      const element_100 = document.createElement("div");
      element_100.className = "flex gap-sm mb-md";
      const element_101 = document.createElement("button");
      element_101.id = "make-payment-btn";
      element_101.className = "tool-btn btn-info flex-1";
      element_101.style.display = "none";
      element_101.style.minWidth = "0";
      element_101.textContent = "Make Payment";
      element_100.appendChild(element_101);
      const element_102 = document.createElement("button");
      element_102.id = "copy-payment-link-btn";
      element_102.className = "tool-btn btn-secondary flex-1";
      element_102.style.display = "none";
      element_102.style.minWidth = "0";
      element_102.textContent = "Copy Link";
      element_100.appendChild(element_102);
      element_66.appendChild(element_100);
      const element_103 = document.createElement("style");
      element_103.textContent = ":root{--fp-bg-primary:#0a0e14;--fp-bg-secondary:#0f1419;--fp-bg-tertiary:#151b23;--fp-border:#1e2633;--fp-accent:#00d4ff;--fp-accent-glow:rgba(0,212,255,0.3);--fp-success:#00ff9d;--fp-warning:#ffb800;--fp-danger:#ff3b5c;--fp-text:#e6edf3;--fp-text-dim:#7d8590}.mt-container{position:fixed;top:20px;right:20px;width:300px;background:var(--fp-bg-primary);border-radius:12px;border:1px solid var(--fp-border);box-shadow:0 0 40px rgba(0,0,0,0.5),0 0 20px var(--fp-accent-glow),inset 0 1px 0 rgba(255,255,255,0.03);z-index:9999;font-family:'JetBrains Mono','SF Mono','Fira Code',monospace;color:var(--fp-text);overflow:hidden}.mt-container::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--fp-accent),transparent);animation:scanline 3s linear infinite}@keyframes scanline{0%{opacity:0.3}50%{opacity:1}100%{opacity:0.3}}.mt-title-bar{background:linear-gradient(180deg,var(--fp-bg-secondary),var(--fp-bg-primary));padding:14px 16px;display:flex;justify-content:space-between;align-items:center;cursor:move;user-select:none;border-bottom:1px solid var(--fp-border);position:relative}.mt-title{font-size:14px;font-weight:700;display:flex;align-items:center;gap:10px;color:var(--fp-accent);text-transform:uppercase;letter-spacing:2px;text-shadow:0 0 10px var(--fp-accent-glow)}.mt-title::before{content:'[';color:var(--fp-text-dim)}.mt-title::after{content:']';color:var(--fp-text-dim)}.mt-title-timer{font-size:11px;color:var(--fp-accent);text-align:center;flex:1;font-weight:600;opacity:0.8}.mt-controls{display:flex;gap:6px}.mt-btn-minimize,.mt-btn-close{width:24px;height:24px;border-radius:4px;border:1px solid var(--fp-border);background:var(--fp-bg-tertiary);cursor:pointer;font-size:12px;color:var(--fp-text-dim);display:flex;align-items:center;justify-content:center;transition:all 0.2s ease}.mt-btn-minimize:hover{background:var(--fp-accent);color:var(--fp-bg-primary);border-color:var(--fp-accent);box-shadow:0 0 15px var(--fp-accent-glow)}.mt-btn-close:hover{background:var(--fp-danger);color:#fff;border-color:var(--fp-danger);box-shadow:0 0 15px rgba(255,59,92,0.4)}.mt-tabs-container{display:flex;background:var(--fp-bg-secondary);border-bottom:1px solid var(--fp-border);padding:0}.mt-status-panel{padding:10px 16px;background:var(--fp-bg-secondary);border-top:1px solid var(--fp-border);font-size:10px;color:var(--fp-accent);text-align:center;min-height:36px;display:flex;align-items:center;justify-content:center;font-weight:500;letter-spacing:1px;text-transform:uppercase}.mt-content{padding:14px;overflow-y:auto;max-height:calc(100vh - 200px);background:var(--fp-bg-primary)}.mt-flex-row{display:flex;gap:8px}.mt-flex-between{display:flex;justify-content:space-between;align-items:center;gap:8px}.mt-flex-center{display:flex;justify-content:center;align-items:center}.mt-flex-col{display:flex;flex-direction:column;gap:8px}.mt-mb-6{margin-bottom:8px}.mt-section{margin-bottom:8px}.mt-timer-display{padding:10px;margin:10px 0;background:var(--fp-bg-secondary);border:1px solid var(--fp-border);border-radius:6px;font-size:12px;color:var(--fp-accent);text-align:center;display:none;position:relative}.mt-timer-display::before{content:'TIMER';position:absolute;top:-8px;left:10px;font-size:9px;background:var(--fp-bg-primary);padding:0 6px;color:var(--fp-text-dim);letter-spacing:1px}.mt-grid{display:grid;grid-template-columns:75px 75px 75px;grid-template-rows:auto auto auto;gap:6px;margin-bottom:8px}.mt-pay-modal{display:none;position:fixed;inset:0;background:rgba(10,14,20,0.95);z-index:999999;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(10px)}.mt-pay-card{width:100%;max-width:960px;background:var(--fp-bg-primary);border:1px solid var(--fp-border);border-radius:12px;padding:24px;box-shadow:0 0 60px rgba(0,0,0,0.8),0 0 30px var(--fp-accent-glow);display:flex;flex-direction:column;gap:16px}.mt-pay-header{display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:1px solid var(--fp-border)}.mt-pay-title{font-size:16px;font-weight:700;color:var(--fp-accent);text-transform:uppercase;letter-spacing:2px}.mt-pay-close{background:transparent;border:1px solid var(--fp-border);border-radius:4px;color:var(--fp-text-dim);font-size:16px;cursor:pointer;padding:6px 10px;transition:all 0.2s}.mt-pay-close:hover{background:var(--fp-danger);color:#fff;border-color:var(--fp-danger)}.mt-pay-hint{font-size:11px;color:var(--fp-text-dim);text-align:center;letter-spacing:0.5px}.mt-captcha-container{width:100%;height:80px;border-radius:8px;background:var(--fp-bg-secondary);border:1px solid var(--fp-border);color:var(--fp-accent);font-size:13px;display:flex;align-items:center;justify-content:center;text-align:center}.mt-input-enhanced{font-size:16px!important;color:var(--fp-text)!important;text-align:center!important;line-height:1.2!important;font-weight:500!important}.tool-btn{display:block;width:100%;padding:10px;margin:6px 0;color:#fff;border:1px solid transparent;border-radius:6px;cursor:pointer;font-size:11px;font-weight:600;height:36px;box-sizing:border-box;transition:all 0.2s ease;text-transform:uppercase;letter-spacing:1px}.tool-btn:hover{transform:translateY(-1px);box-shadow:0 4px 15px rgba(0,0,0,0.3)}.tool-btn:active{transform:translateY(0)}.tool-btn-row{padding:8px;color:#fff;border:1px solid transparent;border-radius:6px;cursor:pointer;font-size:10px;font-weight:600;height:36px;box-sizing:border-box;transition:all 0.2s ease;text-transform:uppercase;letter-spacing:0.5px}.tool-btn-row:hover{transform:translateY(-1px);box-shadow:0 4px 15px rgba(0,0,0,0.3)}.tool-btn-row:disabled{opacity:0.3;cursor:not-allowed;transform:none}.tool-input{display:block;width:100%;padding:10px 12px;margin:6px 0;background:var(--fp-bg-secondary);color:var(--fp-text);border:1px solid var(--fp-border);border-radius:6px;font-size:12px;height:38px;box-sizing:border-box;transition:all 0.2s ease;font-family:inherit}.tool-input:focus{outline:none;border-color:var(--fp-accent);box-shadow:0 0 0 3px var(--fp-accent-glow)}.tool-input-row{padding:8px 10px;background:var(--fp-bg-secondary);color:var(--fp-text);border:1px solid var(--fp-border);border-radius:6px;font-size:11px;height:36px;box-sizing:border-box;transition:all 0.2s ease;font-family:inherit}.tool-input-row:focus{outline:none;border-color:var(--fp-accent);box-shadow:0 0 0 3px var(--fp-accent-glow)}.cf-at-btn{width:26px;height:26px;border-radius:4px;border:1px solid var(--fp-border);color:#fff;font-weight:700;cursor:pointer;font-size:10px;transition:all 0.2s ease;background:linear-gradient(135deg,#00c853,#00e676)}.cf-at-btn:hover{transform:scale(1.1);box-shadow:0 0 15px rgba(0,200,83,0.4)}.bgd-grid{display:grid;grid-template-columns:75px 75px 75px;grid-template-rows:auto auto auto;gap:6px;margin:0 auto 8px auto;justify-content:center}.empty-cell{width:75px;height:36px}.global-auto-buttons{display:flex;gap:8px;margin-top:10px;padding:0 14px 14px}.global-auto-buttons .tool-btn-row{height:32px;padding:6px;font-size:9px}.login-tab .login-input,.login-tab .login-btn{height:28px;padding:6px;font-size:10px;margin:4px 0}#login-content{max-height:83%;height:83%}#paynow-content{max-height:90%;height:90%}#paynow-content .tool-btn-row{height:30px;padding:5px;font-size:9px}#paynow-content .tool-btn{height:30px;padding:5px;font-size:10px}#multi-tools-container .tab-content{display:none}#multi-tools-container .tab-content.active{display:block}.flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1}.gap-sm{gap:6px}.gap-md{gap:8px}.mb-sm{margin-bottom:6px}.mb-md{margin-bottom:8px}.w-full{width:100%}.timer-box{padding:10px;margin:8px 0;background:var(--fp-bg-secondary);border:1px solid var(--fp-border);border-left:3px solid var(--fp-accent);border-radius:0 6px 6px 0;font-size:11px;color:var(--fp-accent);text-align:center}.btn-primary{background:linear-gradient(135deg,var(--fp-accent),#0099cc);border-color:var(--fp-accent);box-shadow:0 0 20px var(--fp-accent-glow)}.btn-secondary{background:linear-gradient(135deg,#8b5cf6,#a78bfa);border-color:#8b5cf6}.btn-success{background:linear-gradient(135deg,#00c853,#00e676);border-color:#00c853;box-shadow:0 0 15px rgba(0,200,83,0.3)}.btn-warning{background:linear-gradient(135deg,#ff9800,#ffb300);border-color:#ff9800;box-shadow:0 0 15px rgba(255,152,0,0.3)}.btn-danger{background:linear-gradient(135deg,#f44336,#ff5252);border-color:#f44336;box-shadow:0 0 15px rgba(244,67,54,0.3)}.btn-info{background:linear-gradient(135deg,#2196f3,#64b5f6);border-color:#2196f3;box-shadow:0 0 15px rgba(33,150,243,0.3)}@keyframes multiColorBlink{0%,100%{color:var(--fp-danger);text-shadow:0 0 10px var(--fp-danger)}33%{color:var(--fp-warning);text-shadow:0 0 10px var(--fp-warning)}66%{color:var(--fp-success);text-shadow:0 0 10px var(--fp-success)}}.blinking-option{animation:multiColorBlink 1.5s infinite;font-weight:700}@keyframes pulse-glow{0%,100%{box-shadow:0 0 5px var(--fp-accent-glow)}50%{box-shadow:0 0 20px var(--fp-accent-glow),0 0 30px var(--fp-accent-glow)}}";
      document.head.appendChild(element_103);
      if (!document.getElementById("mt-tab-style")) {
        const element_104 = document.createElement("style");
        element_104.id = "mt-tab-style";
        element_104.textContent = "\n                #multi-tools-container .neon-tab {\n                flex: 1;\n                    padding: 12px 8px;\n                background: transparent;\n                border: none;\n                    border-bottom: 2px solid transparent;\n                    color: var(--fp-text-dim, #7d8590);\n                    font-size: 11px;\n                font-weight: 600;\n                cursor: pointer;\n                    transition: all 0.2s ease;\n                position: relative;\n                white-space: nowrap;\n                    overflow: visible;\n                text-overflow: ellipsis;\n                    letter-spacing: 1px;\n                    text-transform: uppercase;\n                }\n\n                #multi-tools-container .neon-tab .tab-label {\n                    position: relative;\n                    z-index: 2;\n                    display: inline-block;\n                    transition: all 0.2s ease;\n                    color: var(--fp-text-dim, #7d8590);\n                }\n\n                #multi-tools-container .neon-tab.inactive-tab:hover {\n                    color: var(--fp-text, #e6edf3);\n                    background: rgba(0,212,255,0.05);\n                    border-bottom-color: rgba(0,212,255,0.3);\n                }\n\n                #multi-tools-container .neon-tab.active-tab {\n                    color: var(--fp-accent, #00d4ff);\n                    border-bottom-color: var(--fp-accent, #00d4ff);\n                    background: rgba(0,212,255,0.1);\n                    text-shadow: 0 0 10px rgba(0,212,255,0.5);\n                }\n\n                #multi-tools-container .neon-tab.active-tab .tab-label {\n                    color: var(--fp-accent, #00d4ff);\n                }\n            ";
        (document.head || document.documentElement).appendChild(element_104);
      }
      element_43.appendChild(element_58);
      element_43.appendChild(element_61);
      element_43.appendChild(element_66);
      element_31.appendChild(element_32);
      element_31.appendChild(element_38);
      element_31.appendChild(element_42);
      element_31.appendChild(element_43);
      const element_105 = document.createElement("div");
      element_105.className = "global-auto-buttons";
      element_105.innerHTML = "\n            <button id=\"global-auto-r-btn\" class=\"tool-btn-row btn-success flex-1\">Auto</button>\n            <button id=\"global-stop-btn\" class=\"tool-btn-row btn-danger flex-1\">Stop</button>\n            <button id=\"global-auto-c-btn\" class=\"tool-btn-row btn-warning flex-1\">AS</button>\n        ";
      element_31.appendChild(element_105);
      document.body.appendChild(element_31);
      function var_123() {
        const element_106 = document.getElementById("pay-captcha-modal");
        if (element_106) {
          element_106.style.display = "flex";
          captchaTaskState.popupClosed = false;
        }
        const element_107 = document.getElementById("pay-captcha-input");
        if (element_107) {
          element_107.value = "";
          element_107.dataset.originalValue = "";
          element_107.focus();
        }
      }
      function eventHandler_120() {
        const element_108 = document.getElementById("pay-captcha-modal");
        if (element_108) {
          element_108.style.display = "none";
        }
        captchaTaskState.popupClosed = true;
        captchaTaskState.stopRequested = true;
      }
      function var_124(htmlContent_125) {
        const element_109 = document.getElementById("cf-captcha-container");
        if (element_109) {
          element_109.style.display = "flex";
          element_109.innerHTML = "<div class=\"w-full flex\" style=\"height:80px;align-items:center;justify-content:center;font-size:var(--text-md);color:#1976D2;text-align:center;\">" + htmlContent_125 + "</div>";
        }
      }
      function var_126(var_127) {
        const element_110 = document.getElementById("cf-captcha-container");
        if (!element_110) {
          console.error("Captcha container not found");
          return;
        }
        if (!var_127) {
          console.error("No image source provided");
          return;
        }
        element_110.style.display = "flex";
        element_110.innerHTML = "";
        const element_111 = document.createElement("img");
        if (var_127.startsWith("data:image")) {
          element_111.src = var_127;
        } else if (var_127.startsWith("http://") || var_127.startsWith("https://")) {
          element_111.src = var_127;
        } else {
          element_111.src = "data:image/png;base64," + var_127;
        }
        element_111.onerror = function () {
          console.error("Failed to load captcha image");
          element_110.innerHTML = "<p style=\"color: red;\">Failed to load captcha image</p>";
        };
        element_111.onload = function () {
          console.log("Captcha image loaded successfully");
        };
        element_111.alt = "Captcha";
        element_111.className = "w-full";
        element_111.style.height = "100%";
        element_111.style.objectFit = "contain";
        element_111.style.borderRadius = "var(--radius-sm)";
        element_110.appendChild(element_111);
      }
      async function asyncResult_121() {
        var_128();
        showStatusMessage("Reloading Payment Captcha...", "#FFD700");
        const element_112 = document.getElementById("appointment_date");
        if (!element_112 || !element_112.value.trim()) {
          showStatusMessage("Appointment date is required to reload captcha", "#ff4444");
          return;
        }
        captchaProviderConfig.pay.enabled = false;
        captchaProviderConfig.pay.token = "";
        textCaptchaWidget = null;
        isInitialized = false;
        mathCaptchaWidget = null;
        var_55("pay");
        try {
          const temp_104 = element_112.value.trim();
          const delay_16 = await asyncResult_129();
          const text_20 = [temp_104, delay_16];
          const text_21 = JSON.stringify(text_20);
          const delay_17 = datetime_130("paySlotTime");
          const text_22 = await fetch(delay_17, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.getSlotInfo)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/application",
            referrerPolicy: "same-origin",
            body: text_21
          });
          if (!text_22.ok) {
            showStatusMessage("Failed to reload captcha (" + text_22.status + ")", "#ff4444");
            return;
          }
          const text_23 = await text_22.text();
          const count_18 = text_23.split(/\r?\n/);
          let data_12 = null;
          for (let count_19 = 0; count_19 < count_18.length; count_19++) {
            const text_24 = count_18[count_19].trim();
            if (text_24.startsWith("2:")) {
              const data_13 = text_24.substring(2).trim();
              const text_25 = data_13.indexOf(",");
              if (text_25 > -1) {
                const text_26 = data_13.substring(0, text_25).trim();
                if (text_26.includes("-") && text_26.length === 36) {
                  mathCaptchaWidget = text_26;
                  localStorage.setItem("captcha_id", text_26);
                }
              }
              if (data_13.includes("data:image/png;base64,")) {
                const data_14 = data_13.indexOf("data:image/png;base64,");
                let text_27 = data_13.substring(data_14);
                const text_28 = text_27.indexOf("1:{");
                if (text_28 > -1) {
                  text_27 = text_27.substring(0, text_28);
                }
                const text_29 = text_27.indexOf("base64,") + 7;
                if (text_29 > 6) {
                  let text_30 = text_27.substring(text_29).replace(/\s/g, "");
                  let data_15 = "";
                  for (let count_20 = 0; count_20 < text_30.length; count_20++) {
                    if (/[A-Za-z0-9+\/=]/.test(text_30[count_20])) {
                      data_15 += text_30[count_20];
                    } else {
                      break;
                    }
                  }
                  if (data_15.length > 100) {
                    data_12 = "data:image/png;base64," + data_15;
                  }
                }
              }
              break;
            }
          }
          if (data_12) {
            captchaState.imageData = data_12;
            var_126(data_12);
            showStatusMessage("Captcha reloaded successfully", "#00FF00");
            var_84([523, 659, 784, 1047], 0.6);
            console.log("🔊 Captcha loaded sound alert played");
          } else {
            showStatusMessage("No captcha image in response", "#ff4444");
          }
        } catch (var_131) {
          console.error("Error reloading captcha:", var_131);
          showStatusMessage("Failed to reload captcha", "#ff4444");
        }
      }
      function eventHandler_132(eventHandler_133) {
        if (eventHandler_133) {
          eventHandler_133.preventDefault();
        }
        captchaTaskState.stopRequested = false;
        captchaTaskState.popupClosed = false;
        var_123();
        asyncResult_121();
      }
      async function asyncResult_134(asyncResult_135, asyncResult_136 = "manual") {
        const element_113 = document.getElementById("pay-captcha-input");
        const element_114 = document.getElementById("pay-captcha-modal");
        let data_16 = "";
        if (element_113 && element_113.dataset.originalValue) {
          data_16 = element_113.dataset.originalValue.trim();
        } else if (asyncResult_135) {
          data_16 = asyncResult_135.replace(/\s/g, "").trim();
        } else if (element_113) {
          data_16 = element_113.value.replace(/\s/g, "").trim();
        }
        if (!data_16) {
          if (asyncResult_136 === "manual") {
            showStatusMessage("Enter the captcha value before verifying.", "#ff9800");
            if (element_113) {
              element_113.focus();
            }
          } else {
            showStatusMessage("Captcha solution missing for Auto Solve.", "#ff4444");
          }
          return false;
        }
        if (!mathCaptchaWidget) {
          const temp_105 = localStorage.getItem("captcha_id");
          if (temp_105) {
            mathCaptchaWidget = temp_105;
            console.log("Loaded captcha ID from localStorage:", mathCaptchaWidget);
          }
        }
        if (!mathCaptchaWidget) {
          showStatusMessage("Load the captcha before verifying.", "#ff9800");
          return false;
        }
        showStatusMessage("Verifying captcha...", "#FFA500");
        const temp_106 = () => asyncResult_134(data_16, asyncResult_136);
        const temp_107 = () => {
          const element_115 = document.getElementById("cf-btn-paynow-row");
          if (element_115) {
            element_115.textContent = "Load";
            element_115.style.background = "linear-gradient(135deg, #FFEB3B, #FFC107)";
            element_115.style.color = "#333333";
          }
        };
        try {
          var_128();
          const delay_18 = await asyncResult_129();
          const text_31 = [mathCaptchaWidget, data_16, delay_18];
          const text_32 = JSON.stringify(text_31);
          console.log("Captcha Verify payload prepared:", text_32);
          const delay_19 = datetime_130("captchaVerify");
          const error_13 = await fetch(delay_19, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.captchaVerifyInfo)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/application",
            referrerPolicy: "same-origin",
            body: text_32
          });
          if (!error_13.ok) {
            console.log("Request failed with status " + error_13.status);
            handleAutoSequenceError(error_13.status);
            if (error_13.status === 500 || error_13.status === 502 || error_13.status === 504) {
              hideLoadingIndicator();
            }
            temp_107();
            if (error_13.status === 422) {
              showStatusMessage("Captcha incorrect. Please try again.", "#ff9800");
              const element_116 = document.getElementById("pay-captcha-verify-btn");
              if (element_116) {
                element_116.dataset.lastError = "422";
              }
              handleAutoRetry("pay-captcha-verify", 422, temp_106);
            } else {
              handleAutoRetry("pay-captcha-verify", error_13.status, temp_106);
            }
            return false;
          }
          const result_5 = await error_13.text();
          console.log("Captcha Verify raw response:", result_5);
          const count_21 = result_5.split(/\r?\n/);
          let temp_108 = null;
          if (count_21.length >= 2) {
            const temp_109 = count_21[1].trim();
            console.log("Captcha Verify line 1:", temp_109);
            try {
              let temp_110 = temp_109;
              const temp_111 = temp_109.indexOf(":");
              if (temp_111 > -1) {
                temp_110 = temp_109.slice(temp_111 + 1).trim();
              }
              temp_108 = JSON.parse(temp_110);
              console.log("Captcha Verify parsed line 1:", temp_108);
            } catch (jsonData_137) {
              console.log("Failed to parse line 1:", jsonData_137);
              temp_108 = var_138(result_5, {
                preferStatusObject: true,
                label: "Captcha Verify"
              });
            }
          } else {
            temp_108 = var_138(result_5, {
              preferStatusObject: true,
              label: "Captcha Verify"
            });
          }
          console.log("Captcha Verify final parsed payload:", temp_108);
          if (!temp_108) {
            console.log("Unable to parse captcha verify response payload");
            temp_107();
            handleAutoRetry("pay-captcha-verify", null, temp_106);
            return false;
          }
          const temp_112 = outcome_139(temp_108, result_5 || "", "CAPTCHA verified successfully");
          if (!temp_112) {
            const temp_113 = temp_108?.message || "Captcha verification failed";
            showStatusMessage(temp_113, "#ff9800");
            const element_117 = document.getElementById("pay-captcha-verify-btn");
            if (element_117) {
              element_117.dataset.lastError = "422";
            }
            temp_107();
            if (autoRetryState.enabled) {
              handleAutoRetry("pay-captcha-verify", 422, temp_106);
            }
            return false;
          }
          updateButtonStatus(temp_108, "CAPTCHA", result_5 || "", "CAPTCHA verified successfully.", "CAPTCHA verification failed");
          const config_2 = mathCaptchaWidget || data_16;
          if (!mathCaptchaWidget) {
            console.warn("Captcha ID not available, using captcha code as token");
          } else {
            console.log("Using captcha ID as token:", mathCaptchaWidget);
          }
          captchaProviderConfig.pay.token = config_2;
          captchaState.token = config_2;
          captchaState.cfToken = config_2;
          captchaState.solved = true;
          textCaptchaWidget = mathCaptchaWidget;
          isInitialized = true;
          var_103(config_2);
          var_140();
          var_141();
          const element_118 = document.getElementById("cf-btn-paynow-row");
          if (element_118) {
            element_118.textContent = "Solved";
            element_118.style.background = "linear-gradient(135deg, #4CAF50, #8BC34A)";
            element_118.style.color = "#ffffff";
          }
          if (element_113) {
            element_113.value = "";
            element_113.dataset.originalValue = "";
          }
          var_75();
          var_113();
          const element_119 = document.getElementById("pay-captcha-verify-btn");
          if (element_119) {
            element_119.dataset.lastError = "";
          }
          setTimeout(() => eventHandler_120(), 150);
          if (autoRetryState.enabled && autoSequenceState.enabled && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.PAY_CAPTCHA) {
            autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_WAIT_PAY_NOW;
            const temp_114 = Math.floor(Math.random() * 1000) + 2000;
            const delay_20 = (temp_114 / 1000).toFixed(1);
            showStatusMessage("Auto Sequence: Captcha verified successfully, waiting " + delay_20 + "s before Pay Now", "#00FF00");
            autoSequenceState.payNowTimer = setTimeout(() => {
              if (canAutoSequenceProceed() && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.PAY_WAIT_PAY_NOW) {
                autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_NOW;
                if (autoSequenceState.enabled) {
                  setAutoSequenceEnabled(false);
                  showStatusMessage("Auto Sequence: Pay Now triggered - AS button turned off", "#00FF00");
                }
                if (isButtonEnabled("pay-now")) {
                  showStatusMessage("Auto Sequence: Pay Now clicked", "#00FF00");
                }
              }
            }, temp_114);
          }
          return true;
        } catch (var_142) {
          console.error("Captcha verification error:", var_142);
          showStatusMessage("Captcha verification failed", "#ff4444");
          if (asyncResult_136 === "manual" && element_113) {
            element_113.focus();
          }
          if (element_114) {
            element_114.style.display = "flex";
          }
          temp_107();
          handleAutoRetry("pay-captcha-verify", null, temp_106, {
            isNetworkError: true
          });
          return false;
        }
      }
      async function asyncResult_143(asyncResult_144) {
        if (asyncResult_144) {
          asyncResult_144.preventDefault();
        }
        const element_120 = document.getElementById("pay-captcha-input");
        const delay_21 = element_120 ? element_120.value : "";
        await asyncResult_134(delay_21, "manual");
      }
      async function asyncResult_145(asyncResult_146) {
        if (asyncResult_146) {
          asyncResult_146.preventDefault();
        }
        if (!captchaState.imageData) {
          showStatusMessage("Load the captcha before using Auto Solve.", "#ff9800");
          return;
        }
        if (!mathCaptchaWidget) {
          showStatusMessage("Load the captcha before using Auto Solve.", "#ff9800");
          return;
        }
        const data_17 = asyncResult_146?.currentTarget;
        if (data_17) {
          data_17.disabled = true;
          data_17.dataset.originalText = data_17.textContent;
          data_17.textContent = "...";
        }
        captchaTaskState.stopRequested = false;
        captchaTaskState.popupClosed = false;
        try {
          showStatusMessage("Solving captcha via 2Captcha...", "#FFA500");
          const delay_22 = async () => {
            if (captchaState.imageData.startsWith("http://") || captchaState.imageData.startsWith("https://")) {
              try {
                let error_14;
                try {
                  error_14 = await fetch(captchaState.imageData, {
                    mode: "cors",
                    credentials: "omit"
                  });
                } catch (var_147) {
                  const data_18 = "https://corsproxy.io/?" + encodeURIComponent(captchaState.imageData);
                  error_14 = await fetch(data_18);
                }
                if (!error_14 || !error_14.ok) {
                  throw new Error("Failed to fetch image: " + (error_14?.status || "Unknown error"));
                }
                const url_4 = await error_14.blob();
                const url_5 = new FileReader();
                const delay_23 = new Promise((param_13, asyncResult_148) => {
                  url_5.onloadend = () => {
                    const result_6 = url_5.result;
                    const temp_115 = result_6.includes(",") ? result_6.split(",")[1] : result_6;
                    param_13(temp_115);
                  };
                  url_5.onerror = asyncResult_148;
                  url_5.readAsDataURL(url_4);
                });
                return await delay_23;
              } catch (message_149) {
                throw new Error("Failed to convert image URL to base64: " + message_149.message);
              }
            }
            if (captchaState.imageData.includes(",")) {
              return captchaState.imageData.split(",")[1];
            }
            return captchaState.imageData;
          };
          const delay_24 = await delay_22();
          if (!delay_24) {
            throw new Error("Captcha image data is empty");
          }
          const temp_116 = "72999d993e7ca3bec79630f36db63109";
          const fetchWithCors = async (url_6, asyncResult_150) => {
            try {
              const delay_25 = await fetch(url_6, {
                ...asyncResult_150,
                mode: "cors",
                credentials: "omit"
              });
              if (delay_25.ok) {
                return delay_25;
              }
            } catch (outcome_151) {
              console.warn("Direct fetch failed, trying CORS proxy...", outcome_151);
            }
            try {
              const delay_26 = "https://corsproxy.io/?" + encodeURIComponent(url_6);
              const delay_27 = await fetch(delay_26, {
                method: asyncResult_150.method || "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: asyncResult_150.body
              });
              if (delay_27.ok) {
                return delay_27;
              }
            } catch (outcome_152) {
              console.warn("corsproxy.io failed, trying alternative...", outcome_152);
            }
            try {
              const url_7 = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url_6);
              const headers_6 = {
                method: "POST",
                headers: {},
                body: asyncResult_150.body
              };
              headers_6.headers["Content-Type"] = "application/json";
              const delay_28 = await fetch(url_7, headers_6);
              if (delay_28.ok) {
                return delay_28;
              }
            } catch (outcome_153) {
              console.warn("allorigins.win failed", outcome_153);
            }
            try {
              const delay_29 = "https://cors-anywhere.herokuapp.com/" + url_6;
              const delay_30 = await fetch(delay_29, {
                method: asyncResult_150.method || "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest"
                },
                body: asyncResult_150.body
              });
              if (delay_30.ok) {
                return delay_30;
              }
            } catch (outcome_154) {
              console.warn("cors-anywhere failed", outcome_154);
            }
            throw new Error("All CORS proxy methods failed. Please check your network connection.");
          };
          const temp_117 = {
            type: "ImageToTextTask",
            body: delay_24,
            phrase: false,
            case: true,
            numeric: 0
          };
          const temp_118 = {
            clientKey: temp_116,
            task: temp_117
          };
          const text_33 = temp_118;
          const delay_31 = await fetchWithCors("https://api.2captcha.com/createTask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(text_33)
          });
          const error_15 = await delay_31.json();
          if (error_15.errorId !== 0) {
            throw new Error(error_15.errorDescription || "Failed to create task");
          }
          captchaTaskState.currentTaskId = error_15.taskId;
          showStatusMessage("Waiting for solution...", "#FFA500");
          const delay_32 = () => {
            return new Promise((param_14, asyncResult_155) => {
              let timer_9;
              const timer_10 = async () => {
                try {
                  if (captchaTaskState.stopRequested) {
                    clearTimeout(timer_9);
                    asyncResult_155(new Error("Auto solve stopped by user"));
                    return;
                  }
                  if (captchaTaskState.popupClosed) {
                    clearTimeout(timer_9);
                    asyncResult_155(new Error("Popup closed - Auto Solve cancelled"));
                    return;
                  }
                  const text_34 = {
                    clientKey: temp_116,
                    taskId: error_15.taskId
                  };
                  const result_7 = await fetchWithCors("https://api.2captcha.com/getTaskResult", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(text_34)
                  });
                  const error_16 = await result_7.json();
                  if (error_16.errorId !== 0) {
                    clearTimeout(timer_9);
                    asyncResult_155(new Error(error_16.errorDescription || "Unknown error"));
                    return;
                  }
                  if (error_16.status === "ready") {
                    clearTimeout(timer_9);
                    param_14(error_16.solution.text);
                  } else {
                    setTimeout(timer_10, 5000);
                  }
                } catch (var_156) {
                  clearTimeout(timer_9);
                  asyncResult_155(var_156);
                }
              };
              timer_10();
              timer_9 = setTimeout(() => {
                asyncResult_155(new Error("2Captcha solve timed out."));
              }, 200000);
            });
          };
          const delay_33 = await delay_32();
          const element_121 = document.getElementById("pay-captcha-input");
          if (element_121 && delay_33) {
            const data_19 = delay_33.replace(/\s/g, "");
            element_121.dataset.originalValue = data_19;
            element_121.value = data_19;
          }
          await asyncResult_134(delay_33, "cs");
        } catch (position_157) {
          console.error("Auto solve error:", position_157);
          if (position_157.message && position_157.message.toLowerCase().includes("stop")) {
            showStatusMessage("Auto-solving stopped", "#ff9800");
          } else {
            showStatusMessage("Failed: " + position_157.message, "#ff4444");
          }
        } finally {
          if (data_17) {
            data_17.disabled = false;
            data_17.textContent = data_17.dataset.originalText || "Auto";
          }
          captchaTaskState.currentTaskId = null;
        }
      }
      function var_158() {
        const element_122 = document.querySelectorAll("iframe[src*=\"challenges.cloudflare.com\"]");
        for (const temp_119 of element_122) {
          const temp_120 = temp_119.getBoundingClientRect();
          if (temp_120.width > 0 && temp_120.height > 0) {
            return true;
          }
        }
        const element_123 = document.querySelectorAll(".cf-turnstile");
        for (const container_1 of element_123) {
          if (container_1.id === "cf-captcha-container") {
            continue;
          }
          const temp_121 = container_1.getBoundingClientRect();
          if (temp_121.width > 0 && temp_121.height > 0) {
            return true;
          }
        }
        return false;
      }
      function var_159() {
        const element_124 = document.getElementById("mt-captcha-token-input");
        if (element_124 && element_124.value) {
          return element_124.value;
        }
        const element_125 = document.querySelector("#cf-captcha-container input[name=\"cf-turnstile-response\"]");
        if (element_125 && element_125.value) {
          return element_125.value;
        }
        if (captchaState.token) {
          return captchaState.token;
        }
        const element_126 = document.querySelector("input[name=\"cf-turnstile-response\"]:not(#mt-captcha-token-input)");
        if (element_126 && element_126.value) {
          return element_126.value;
        }
        return null;
      }
      function timerCallback_160() {
        if (!var_158()) {
          if (captchaState.monitorInterval) {
            clearInterval(captchaState.monitorInterval);
            captchaState.monitorInterval = null;
          }
          return;
        }
        const token_9 = var_159();
        if (token_9 && token_9 !== captchaState.token) {
          captchaState.token = token_9;
          captchaState.solved = true;
          captchaState.isPageCaptcha = true;
          var_140();
          var_141();
          showStatusMessage("Page CAPTCHA Solved", "#00FF00");
          var_75();
        }
      }
      function timerCallback_161() {
        const temp_122 = var_158();
        if (temp_122) {
          if (!captchaState.monitorInterval) {
            captchaState.monitorInterval = setInterval(timerCallback_160, 500);
            console.log("Started monitoring page CAPTCHA");
          }
        } else if (captchaState.monitorInterval) {
          clearInterval(captchaState.monitorInterval);
          captchaState.monitorInterval = null;
          console.log("Stopped monitoring page CAPTCHA");
        }
      }
      function var_162() {
        console.log("Reloading CAPTCHA");
        var_163();
        if (captchaState.hideTimeout) {
          clearTimeout(captchaState.hideTimeout);
          captchaState.hideTimeout = null;
        }
        if (var_158()) {
          console.log("Page has its own CAPTCHA, trying to reset it");
          captchaState.isPageCaptcha = true;
          try {
            if (window.turnstile && typeof window.turnstile.render === "function") {
              const count_22 = window.turnstile.getWidgets();
              if (count_22 && count_22.length > 0) {
                window.turnstile.reset(count_22[0]);
                showStatusMessage("Page CAPTCHA Reloaded", "#00C851");
                return;
              }
            }
          } catch (var_164) {
            console.error("Error resetting page CAPTCHA:", var_164);
          }
          showStatusMessage("Please reload the page to reset CAPTCHA", "#ff9800");
          return;
        }
        console.log("Page doesn't have CAPTCHA, creating our own");
        captchaState.isPageCaptcha = false;
        const element_127 = document.getElementById("cf-captcha-container");
        if (!element_127) {
          console.error("CAPTCHA container not found");
          return;
        }
        element_127.style.display = "block";
        captchaState.visible = true;
        if (window.turnstile && captchaState.widget) {
          turnstile.reset(captchaState.widget);
          console.log("CAPTCHA widget reset");
          showStatusMessage("CAPTCHA Reloaded", "#00C851");
        } else {
          if (captchaState.widget) {
            turnstile.remove(captchaState.widget);
            captchaState.widget = null;
          }
          element_127.innerHTML = "";
          var_165();
        }
      }
      function var_165() {
        console.log("Rendering CAPTCHA widget");
        const element_128 = document.getElementById("cf-captcha-container");
        if (!element_128) {
          return;
        }
        const tab_1 = getSiteKey(currentTab);
        captchaState.widget = turnstile.render(element_128, {
          sitekey: tab_1,
          callback: function (callback_1) {
            console.log("Captcha callback received token");
            captchaState.token = callback_1;
            captchaState.cfToken = callback_1;
            captchaState.solved = true;
            var_140();
            var_75();
            var_141();
            showStatusMessage("Cloudflare Verified", "#00FF00");
            captchaState.hideTimeout = setTimeout(() => {
              if (element_128) {
                element_128.style.display = "none";
              }
              captchaState.visible = false;
            }, 1000);
          },
          "expired-callback": function () {
            console.log("Captcha expired");
            var_163();
          },
          "error-callback": function () {
            console.log("Captcha error");
            var_163();
          }
        });
        var_166();
      }
      function var_163() {
        console.log("Resetting CAPTCHA state");
        captchaState.token = "";
        captchaState.cfToken = "";
        captchaState.cfpToken = "";
        captchaState.solved = false;
        const element_129 = document.getElementById("mt-captcha-token-input");
        if (element_129) {
          element_129.value = "";
        }
        var_140();
        var_167();
        var_141();
      }
      function var_166() {
        console.log("Setting up CAPTCHA checkbox ticking");
        if (captchaState.autoCheckInterval) {
          clearInterval(captchaState.autoCheckInterval);
          captchaState.autoCheckInterval = null;
        }
        if (captchaState.isPageCaptcha) {
          console.log("Using page's CAPTCHA, not setting up automatic ticking");
          return;
        }
        captchaState.autoCheckInterval = setInterval(() => {
          const element_130 = document.getElementById("cf-captcha-container");
          if (element_130) {
            const element_131 = element_130.querySelectorAll("input[type=\"checkbox\"]");
            element_131.forEach(item_9 => {
              if (!item_9.checked) {
                console.log("Found checkbox in our captcha container, attempting to tick it automatically");
                var_168(item_9);
              }
            });
          }
        }, 500);
      }
      function var_168(eventHandler_169) {
        if (!eventHandler_169.checked) {
          try {
            console.log("Ticking checkbox");
            const temp_123 = {
              bubbles: true,
              cancelable: true,
              view: window
            };
            const temp_124 = new MouseEvent("mousedown", temp_123);
            const temp_125 = {
              bubbles: true,
              cancelable: true,
              view: window
            };
            const temp_126 = new MouseEvent("mouseup", temp_125);
            const temp_127 = {
              bubbles: true,
              cancelable: true,
              view: window
            };
            const temp_128 = new MouseEvent("click", temp_127);
            const temp_129 = new Event("change", {
              bubbles: true,
              cancelable: true
            });
            eventHandler_169.dispatchEvent(temp_124);
            eventHandler_169.dispatchEvent(mouseup);
            eventHandler_169.dispatchEvent(temp_128);
            eventHandler_169.checked = true;
            eventHandler_169.dispatchEvent(temp_129);
            console.log("Successfully ticked checkbox");
          } catch (var_170) {
            console.error("Error ticking checkbox:", var_170);
          }
        }
      }
      let temp_130 = false;
      let formData_1;
      let formData_2;
      let temp_131;
      let temp_132;
      let temp_133 = 0;
      let temp_134 = 0;
      element_32.addEventListener("mousedown", eventHandler_171);
      document.addEventListener("mousemove", eventHandler_172);
      document.addEventListener("mouseup", eventHandler_173);
      function eventHandler_171(var_174) {
        temp_131 = var_174.clientX - temp_133;
        temp_132 = var_174.clientY - temp_134;
        if (var_174.target === element_32 || var_174.target.parentNode === element_32) {
          temp_130 = true;
        }
      }
      function eventHandler_172(eventHandler_175) {
        if (temp_130) {
          eventHandler_175.preventDefault();
          formData_1 = eventHandler_175.clientX - temp_131;
          formData_2 = eventHandler_175.clientY - temp_132;
          temp_133 = formData_1;
          temp_134 = formData_2;
          element_31.style.transform = "translate(" + formData_1 + "px, " + formData_2 + "px)";
        }
      }
      function eventHandler_173(var_176) {
        temp_131 = formData_1;
        temp_132 = formData_2;
        temp_130 = false;
      }
      element_36.addEventListener("click", () => {
        element_31.style.display = "none";
        const element_132 = document.createElement("button");
        element_132.id = "mt-restore-btn";
        element_132.textContent = "MT";
        element_132.style.cssText = "\n                position: fixed;\n                bottom: 20px;\n                right: 20px;\n                width: 40px;\n                height: 40px;\n                border-radius: 50%;\n                background: linear-gradient(135deg, #FF4081, #2196F3);\n                border: none;\n                color: white;\n                font-size: 18px;\n                cursor: pointer;\n                z-index: 9999;\n                transition: all 0.3s ease;\n            ";
        element_132.addEventListener("mouseenter", () => {
          element_132.style.transform = "scale(1.1)";
        });
        element_132.addEventListener("mouseleave", () => {
          element_132.style.transform = "scale(1)";
        });
        element_132.addEventListener("click", () => {
          element_31.style.display = "block";
          element_132.remove();
        });
        document.body.appendChild(element_132);
      });
      let timer_11 = null;
      element_37.addEventListener("click", () => {
        if (captchaState.autoCheckInterval) {
          clearInterval(captchaState.autoCheckInterval);
          captchaState.autoCheckInterval = null;
        }
        if (captchaState.monitorInterval) {
          clearInterval(captchaState.monitorInterval);
          captchaState.monitorInterval = null;
        }
        if (timer_11) {
          clearInterval(timer_11);
          timer_11 = null;
        }
        if (lastRequestTime) {
          clearInterval(lastRequestTime);
          lastRequestTime = null;
        }
        var_177();
        if (refreshTimers.continueTimeout) {
          clearTimeout(refreshTimers.continueTimeout);
          refreshTimers.continueTimeout = null;
        }
        if (refreshTimers.refreshInterval) {
          clearInterval(refreshTimers.refreshInterval);
          refreshTimers.refreshInterval = null;
        }
        const timer_12 = ["login-otp-timer-display", "bgd-otp-timer-display", "pay-timer-display"];
        timer_12.forEach(item_10 => {
          const timer_13 = window["timerInterval_" + item_10];
          if (timer_13) {
            clearInterval(timer_13);
          }
        });
        document.removeEventListener("mousedown", eventHandler_171);
        document.removeEventListener("mousemove", eventHandler_172);
        document.removeEventListener("mouseup", eventHandler_173);
        const element_133 = document.getElementById("pay-captcha-modal");
        if (element_133) {
          element_133.style.display = "none";
        }
        if (element_31 && element_31.parentNode) {
          element_31.parentNode.removeChild(element_31);
        }
        const element_134 = document.getElementById("mt-restore-btn");
        if (element_134) {
          element_134.remove();
        }
        const element_135 = document.getElementById("token-options-container");
        if (element_135) {
          element_135.remove();
        }
        if (element_103 && element_103.parentNode) {
          element_103.parentNode.removeChild(element_103);
        }
        console.log("Widget completely removed");
      });
      function eventHandler_178(eventHandler_179, eventHandler_180, eventHandler_181) {
        const element_136 = document.getElementById(eventHandler_179);
        if (element_136) {
          console.log("Attaching event listener to element with id '" + eventHandler_179 + "'");
          element_136.addEventListener(eventHandler_180, eventHandler_181);
        } else {
          console.error("Element with id '" + eventHandler_179 + "' not found");
        }
      }
      eventHandler_178("global-auto-r-btn", "click", eventHandler_64);
      eventHandler_178("global-auto-c-btn", "click", () => {
        setAutoSequenceEnabled(!autoSequenceState.enabled);
        if (autoSequenceState.enabled) {
          var_60();
        } else {
          var_61();
        }
      });
      eventHandler_178("global-stop-btn", "click", () => {
        console.log("Stop button clicked - clearing all processes");
        var_177();
        clearAllAutoRetryTimers();
        resetAutoSequenceState();
        var_61();
        if (refreshTimers.continueTimeout) {
          clearTimeout(refreshTimers.continueTimeout);
          refreshTimers.continueTimeout = null;
        }
        if (refreshTimers.refreshInterval) {
          clearInterval(refreshTimers.refreshInterval);
          refreshTimers.refreshInterval = null;
        }
        if (lastRequestTime) {
          clearInterval(lastRequestTime);
          lastRequestTime = null;
        }
        if (captchaState.autoCheckInterval) {
          clearInterval(captchaState.autoCheckInterval);
          captchaState.autoCheckInterval = null;
        }
        if (captchaState.monitorInterval) {
          clearInterval(captchaState.monitorInterval);
          captchaState.monitorInterval = null;
        }
        if (timer_11) {
          clearInterval(timer_11);
          timer_11 = null;
        }
        showStatusMessage("All processes stopped", "#ff4444");
      });
      function var_182(regexMatch_183) {
        if (!regexMatch_183) {
          return null;
        }
        if (/^https?:\/\//i.test(regexMatch_183)) {
          return regexMatch_183;
        }
        return apiBaseUrl + regexMatch_183;
      }
      function datetime_130(var_184) {
        if (endpoints.login[var_184]) {
          return var_182(endpoints.login[var_184]);
        }
        if (endpoints.payment[var_184]) {
          return var_182(endpoints.payment[var_184]);
        }
        return var_182(var_184) || apiBaseUrl + var_184;
      }
      function var_185() {
        try {
          localStorage.setItem("ivac_edited_data", JSON.stringify(editedData));
          console.log("Saved edited data to localStorage:", editedData);
        } catch (var_186) {
          console.error("Error saving edited data to localStorage:", var_186);
        }
      }
      function var_187() {
        try {
          localStorage.setItem("ivac_edited_endpoints", JSON.stringify(endpoints));
          console.log("Saved edited endpoints to localStorage:", endpoints);
        } catch (var_188) {
          console.error("Error saving edited endpoints to localStorage:", var_188);
        }
      }
      function var_189() {
        try {
          localStorage.setItem("ivac_edited_captcha_token_names", JSON.stringify(captchaTokenNames));
          console.log("Saved edited captcha token names to localStorage:", captchaTokenNames);
        } catch (var_190) {
          console.error("Error saving edited captcha token names to localStorage:", var_190);
        }
      }
      function var_191() {
        console.log("Reset button clicked - resetting all edited data");
        editedData = {
          app: null,
          personal: null,
          overview: null,
          send: null,
          verify: null,
          mobile: null,
          password: null,
          otp: null,
          paynow: null,
          paynowbutton: null
        };
        Object.keys(endpoints.login).forEach(element_137 => {
          const element_138 = document.getElementById("endpoint-login-" + element_137);
          if (element_138) {
            element_138.value = endpoints.login[element_137];
          }
        });
        Object.keys(endpoints.payment).forEach(element_139 => {
          const element_140 = document.getElementById("endpoint-payment-" + element_139);
          if (element_140) {
            element_140.value = endpoints.payment[element_139];
          }
        });
        Object.keys(captchaTokenNames).forEach(element_141 => {
          const element_142 = document.getElementById("captcha-token-" + element_141);
          if (element_142) {
            element_142.value = captchaTokenNames[element_141];
          }
        });
        localStorage.removeItem("ivac_edited_data");
        localStorage.removeItem("ivac_edited_endpoints");
        localStorage.removeItem("ivac_edited_captcha_token_names");
        showStatusMessage("All edited data reset", "#00C851");
      }
      function var_192(loopVar_193, var_194, var_195) {
        let temp_135 = false;
        for (const token_10 in loopVar_193) {
          if (token_10.toLowerCase().includes("captcha") && loopVar_193[token_10] === "") {
            loopVar_193[token_10] = var_194;
            temp_135 = true;
            console.log("Set token field '" + token_10 + "' to fresh token");
            break;
          }
        }
        if (!temp_135) {
          console.log("No empty captcha field found in request body - adding default token field");
          loopVar_193[var_195] = var_194;
        }
      }
      function var_128() {
        var_74();
        var_56();
      }
      function var_196(loopVar_197) {
        for (const [loopVar_198, loopVar_199] of Object.entries(loopVar_197)) {
          if (!loopVar_199) {
            console.log(loopVar_198 + " is required");
            return false;
          }
        }
        return true;
      }
      let temp_136 = localStorage.getItem("ivac_client_ip") || "";
      async function asyncResult_129() {
        if (temp_136) {
          return temp_136;
        }
        try {
          const formData_3 = await fetch("https://api.ipify.org?format=json");
          if (formData_3.ok) {
            const delay_34 = await formData_3.json();
            if (delay_34?.ip) {
              temp_136 = delay_34.ip;
              localStorage.setItem("ivac_client_ip", temp_136);
              return temp_136;
            }
          }
        } catch (var_200) {
          console.log("Unable to fetch client IP:", var_200);
        }
        return "";
      }
      function var_201(var_202, var_203 = "") {
        const text_35 = [var_202, var_203 || ""];
        return JSON.stringify(text_35);
      }
      function createNextActionHeaders(var_204 = {}) {
        const temp_137 = {
          accept: "text/x-component",
          "content-type": "text/plain;charset=UTF-8"
        };
        if (var_204.nextAction) {
          temp_137["next-action"] = var_204.nextAction;
        }
        if (var_204.routerStateTree) {
          temp_137["next-router-state-tree"] = var_204.routerStateTree;
        }
        if (var_204.xActionRevalidated) {
          temp_137["x-action-revalidated"] = var_204.xActionRevalidated;
        }
        return temp_137;
      }
      function var_205(var_206) {
        if (!var_206 || typeof var_206 !== "object") {
          return false;
        }
        if (typeof var_206.status !== "undefined") {
          return true;
        }
        if (typeof var_206.status_code !== "undefined") {
          return true;
        }
        if (var_206.registered === true) {
          return true;
        }
        if (var_206.success === true) {
          return true;
        }
        if (var_206.data && typeof var_206.data === "object") {
          return var_205(var_206.data);
        }
        return false;
      }
      function var_138(var_207, {
        preferStatusObject = false,
        label = "response"
      } = {}) {
        if (!var_207) {
          return null;
        }
        const temp_138 = var_207.trim();
        if (!temp_138) {
          return null;
        }
        try {
          const count_23 = JSON.parse(temp_138);
          if (preferStatusObject && Array.isArray(count_23)) {
            return count_23.find(var_205) || count_23[count_23.length - 1] || null;
          }
          return count_23;
        } catch (var_208) {
          const count_24 = [];
          const temp_139 = temp_138.replace(/}\s*(?=\d+:)/g, "}\n").split(/\r?\n/).map(param_15 => param_15.trim()).filter(Boolean);
          for (const temp_140 of temp_139) {
            try {
              const temp_141 = temp_140.indexOf(":");
              const temp_142 = temp_141 > -1 ? temp_140.slice(temp_141 + 1) : temp_140;
              count_24.push(JSON.parse(temp_142));
            } catch (jsonData_209) {
              console.log("Failed to parse " + label + " fragment:", temp_140, jsonData_209);
            }
          }
          if (!count_24.length) {
            return null;
          }
          if (preferStatusObject) {
            return count_24.find(var_205) || count_24[count_24.length - 1] || null;
          }
          if (count_24.length === 1) {
            return count_24[0];
          } else {
            return count_24;
          }
        }
      }
      function var_210(arrayItem_211) {
        if (!arrayItem_211) {
          return false;
        }
        if (Array.isArray(arrayItem_211)) {
          return arrayItem_211.some(param_16 => var_210(param_16));
        }
        if (arrayItem_211.success === true) {
          return true;
        }
        if (typeof arrayItem_211.status === "string") {
          return arrayItem_211.status.toLowerCase() === "success";
        }
        if (arrayItem_211.status === true) {
          return true;
        }
        if (typeof arrayItem_211.status_code !== "undefined") {
          const temp_143 = Number(arrayItem_211.status_code);
          if (!Number.isNaN(temp_143) && temp_143 >= 200 && temp_143 < 300) {
            return true;
          }
        }
        if (arrayItem_211.registered === true) {
          return true;
        }
        if (arrayItem_211.data && typeof arrayItem_211.data === "object") {
          if (var_210(arrayItem_211.data)) {
            return true;
          }
        }
        if (arrayItem_211.message && typeof arrayItem_211.message === "string") {
          const temp_144 = arrayItem_211.message.toLowerCase();
          if (temp_144.includes("success") || temp_144.includes("registered")) {
            return true;
          }
        }
        return false;
      }
      function outcome_139(message_212, var_213 = "", var_214 = "") {
        if (!var_214) {
          return false;
        }
        const temp_145 = var_214.toLowerCase().trim();
        const temp_146 = /slot\s+date\s+found/i.test(temp_145);
        if (message_212?.message && typeof message_212.message === "string") {
          const temp_147 = message_212.message.toLowerCase().trim();
          if (temp_146) {
            if (/slot\s+date\s+found/i.test(temp_147)) {
              return true;
            }
          } else if (temp_147 === temp_145) {
            return true;
          }
        }
        if (message_212?.data?.message && typeof message_212.data.message === "string") {
          const data_20 = message_212.data.message.toLowerCase().trim();
          if (temp_146) {
            if (/slot\s+date\s+found/i.test(data_20)) {
              return true;
            }
          } else if (data_20 === temp_145) {
            return true;
          }
        }
        if (var_213) {
          const temp_148 = var_213.toLowerCase();
          if (temp_146) {
            if (/slot\s+date\s+found/i.test(temp_148)) {
              return true;
            }
          } else {
            const temp_149 = temp_145.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const temp_150 = new RegExp("\"message\"\\s*:\\s*\"" + temp_149.replace(/"/g, "\\\"") + "\"", "i");
            if (temp_150.test(var_213)) {
              return true;
            }
            if (temp_148.includes(temp_145)) {
              return true;
            }
          }
        }
        return false;
      }
      function outcome_215(var_216, var_217 = "", arrayItem_218 = "") {
        if (arrayItem_218) {
          const temp_151 = [];
          const temp_152 = arrayItem_218.split(/\r?\n/).map(param_17 => param_17.trim()).filter(Boolean);
          for (const temp_153 of temp_152) {
            let temp_154 = temp_153;
            const temp_155 = temp_153.indexOf(":");
            if (temp_155 > -1 && temp_153[temp_155 + 1] === "{") {
              temp_154 = temp_153.slice(temp_155 + 1).trim();
            }
            try {
              const temp_156 = JSON.parse(temp_154);
              if (typeof temp_156 === "object" && temp_156 !== null) {
                temp_151.push(temp_156);
              }
            } catch (var_219) {
              const temp_157 = temp_154.match(/"message"\s*:\s*"([^"]+)"/i);
              if (temp_157 && temp_157[1]) {
                return temp_157[1].trim();
              }
            }
          }
          for (const data_21 of temp_151) {
            if (typeof data_21.message === "string" && data_21.message.trim()) {
              return data_21.message.trim();
            }
            if (data_21.data && typeof data_21.data === "object" && typeof data_21.data.message === "string" && data_21.data.message.trim()) {
              return data_21.data.message.trim();
            }
          }
          const temp_158 = arrayItem_218.match(/"message"\s*:\s*"([^"]+)"/i) || arrayItem_218.match(/message[:\s=]+([^\s,}]+)/i);
          if (temp_158 && temp_158[1]) {
            return temp_158[1].trim();
          }
        }
        if (!var_216) {
          return var_217;
        }
        if (typeof var_216 !== "object") {
          return var_217;
        }
        if (typeof var_216.message === "string" && var_216.message.trim()) {
          return var_216.message.trim();
        }
        if (typeof var_216.error === "string" && var_216.error.trim()) {
          return var_216.error.trim();
        }
        if (var_216.data && typeof var_216.data === "object") {
          if (typeof var_216.data.message === "string" && var_216.data.message.trim()) {
            return var_216.data.message.trim();
          }
          if (typeof var_216.data.error === "string" && var_216.data.error.trim()) {
            return var_216.data.error.trim();
          }
        }
        if (var_216.error && typeof var_216.error === "object") {
          if (typeof var_216.error.message === "string" && var_216.error.message.trim()) {
            return var_216.error.message.trim();
          }
        }
        return var_217;
      }
      function updateButtonStatus(datetime_220, datetime_221, datetime_222 = "", datetime_223 = "", datetime_224 = "") {
        const temp_159 = var_210(datetime_220);
        if (temp_159) {
          const temp_160 = outcome_215(datetime_220, datetime_223 || datetime_221 + " Success", datetime_222);
          showStatusMessage("Success: " + temp_160, "#00FF00");
          const temp_161 = {
            success: true,
            message: temp_160
          };
          return temp_161;
        } else {
          const temp_162 = outcome_215(datetime_220, datetime_224 || datetime_221 + " Failed", datetime_222);
          showStatusMessage("Failed: " + temp_162, "#ff4444");
          const temp_163 = {
            success: false,
            message: temp_162
          };
          return temp_163;
        }
      }
      function var_225(var_226, var_227) {
        return outcome_215(var_226, var_227);
      }
      function var_228(timerCallback_229, var_230 = var_75) {
        var_89(timerCallback_229);
        var_230();
        setTimeout(() => resetButtonState(timerCallback_229), 3000);
      }
      function var_231(var_232) {}
      eventHandler_178("mobile-verify-btn", "click", async function (param_18) {
        const temp_164 = "mobile";
        var_231(temp_164);
        const temp_165 = this.id;
        var_56();
        const temp_166 = editedEndpoints[temp_165];
        if (temp_166) {
          asyncResult_233(temp_166);
        } else {
          asyncResult_233();
        }
      });
      async function asyncResult_233(asyncResult_234 = null) {
        var_128();
        showStatusMessage("Try To Verify Mobile Number", "#FFD700");
        const element_143 = document.getElementById("mt-mobile-number");
        if (!element_143) {
          console.log("Mobile number input not found");
          return;
        }
        const temp_167 = element_143.value.trim();
        if (!temp_167) {
          console.log("Mobile number is required");
          return;
        }
        if (!captchaProviderConfig.login.enabled || !captchaProviderConfig.login.token) {
          console.log("CF not enabled or token not available for Login tab");
          showStatusMessage("Enable CF in Login tab", "#ff9800");
          return;
        }
        const temp_168 = () => asyncResult_233(asyncResult_234);
        try {
          let input_3;
          if (editedData.mobile) {
            const temp_169 = {
              ...editedData.mobile
            };
            input_3 = temp_169;
          } else {
            const temp_170 = {
              mobile_no: temp_167
            };
            input_3 = temp_170;
          }
          const element_144 = document.getElementById("captcha-enable-checkbox");
          const element_145 = document.getElementById("math-captcha-input");
          if (element_144 && element_144.checked && element_145) {
            const input_4 = element_145.value.trim();
            if (input_4) {
              input_3.answer = parseInt(input_4);
              input_3.user_input = input_4;
            }
          }
          var_192(input_3, captchaProviderConfig.login.token, "captcha_token");
          const delay_35 = await asyncResult_129();
          const temp_171 = var_201(input_3, delay_35);
          console.log("Mobile verify payload prepared:", temp_171);
          const delay_36 = asyncResult_234 || datetime_130("mobileVerify");
          const error_17 = await fetch(delay_36, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.mobileVerify)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/",
            referrerPolicy: "same-origin",
            body: temp_171
          });
          if (!error_17.ok) {
            console.log("Request failed with status " + error_17.status);
            handleAutoSequenceError(error_17.status);
            if (error_17.status === 500 || error_17.status === 502 || error_17.status === 504) {
              hideLoadingIndicator();
            }
            const button_5 = await error_17.text();
            const button_6 = var_138(button_5, {
              preferStatusObject: true,
              label: "Mobile Verify"
            }) || {};
            updateButtonStatus(button_6, "Mobile Verify", button_5, "Mobile Verify Success", "Mobile Verify Failed");
            var_235("mobile-verify-btn", "Mobile Verify");
            handleAutoRetry("login-mobile", error_17.status, temp_168);
            return;
          }
          const button_7 = await error_17.text();
          const data_22 = var_138(button_7, {
            preferStatusObject: true,
            label: "Mobile Verify"
          });
          console.log("Mobile verification raw response:", button_7);
          console.log("Mobile verification parsed payload:", data_22);
          if (!data_22) {
            console.log("Unable to parse mobile verify response payload");
            hideLoadingIndicator();
            updateButtonStatus(null, "Mobile Verify", button_7, "Mobile Verify Success", "Mobile Verify Failed");
            var_235("mobile-verify-btn", "Mobile Verify");
            handleAutoRetry("login-mobile", null, temp_168);
            return;
          }
          if (var_210(data_22)) {
            if (data_22?.data && data_22.data?.registered) {
              localStorage.setItem("user_phone", data_22.data.mobile_no);
              localStorage.setItem("authStep", "3");
              console.log("Mobile Verify Successfully");
              updateButtonStatus(data_22, "Mobile Verify", button_7, "Mobile Verify Success", "Mobile Verify Failed");
              asyncResult_93(document.getElementById("mobile-verify-btn"));
              setTimeout(() => resetButtonState(document.getElementById("mobile-verify-btn")), 3000);
              captchaProviderConfig.login.enabled = false;
              captchaProviderConfig.login.token = "";
              var_55("login");
              console.log("CF Button turned off after Mobile Verify success");
              const element_146 = document.getElementById("captcha-enable-checkbox");
              const element_147 = document.getElementById("math-captcha-input");
              if (element_146 && element_146.checked) {
                element_146.checked = false;
                if (element_147) {
                  element_147.value = "";
                  element_147.disabled = true;
                }
                console.log("Captcha checkbox unchecked after Mobile Verify success");
              }
              var_62("mobile");
            } else {
              localStorage.setItem("authStep", "1");
              console.log("Mobile number not registered");
              showStatusMessage("Mobile Not Registered", "#ff4444");
              var_235("mobile-verify-btn", "Mobile Verify");
            }
          } else {
            localStorage.setItem("authStep", "1");
            console.log("Mobile Verify failed");
            hideLoadingIndicator();
            updateButtonStatus(data_22, "Mobile Verify", button_7, "Mobile Verify Success", "Mobile Verify Failed");
            var_235("mobile-verify-btn", "Mobile Verify");
            handleAutoRetry("login-mobile", null, temp_168);
          }
        } catch (message_236) {
          console.log("Error verifying mobile number:", message_236);
          hideLoadingIndicator();
          const button_8 = {
            error: message_236.message
          };
          updateButtonStatus(button_8, "Mobile Verify", "", "Mobile Verify Success", "Mobile Verify Failed");
          var_235("mobile-verify-btn", "Mobile Verify");
          handleAutoRetry("login-mobile", null, temp_168, {
            isNetworkError: true
          });
        }
      }
      eventHandler_178("authenticate-btn", "click", async function (param_19) {
        const temp_172 = "password";
        var_231(temp_172);
        const temp_173 = this.id;
        var_56();
        const temp_174 = editedEndpoints[temp_173];
        if (temp_174) {
          asyncResult_237(temp_174);
        } else {
          asyncResult_237();
        }
      });
      async function asyncResult_237(asyncResult_238 = null) {
        var_128();
        showStatusMessage("Try To Authenticate", "#FFD700");
        const element_148 = document.getElementById("mt-mobile-number");
        const element_149 = document.getElementById("mt-password");
        if (!element_148) {
          console.log("Mobile number input not found");
          return;
        }
        if (!element_149) {
          console.log("Password input not found");
          return;
        }
        const temp_175 = element_148.value.trim();
        const temp_176 = element_149.value;
        if (!temp_175) {
          console.log("Mobile number is required");
          return;
        }
        if (!temp_176) {
          console.log("Password is required");
          return;
        }
        const temp_177 = () => asyncResult_237(asyncResult_238);
        try {
          let input_5;
          if (editedData.password) {
            const temp_178 = {
              ...editedData.password
            };
            input_5 = temp_178;
          } else {
            const temp_179 = {
              mobile_no: temp_175,
              password: temp_176
            };
            input_5 = temp_179;
          }
          const element_150 = document.getElementById("captcha-enable-checkbox");
          const element_151 = document.getElementById("math-captcha-input");
          if (element_150 && element_150.checked && element_151) {
            const input_6 = element_151.value.trim();
            if (input_6) {
              input_5.answer = parseInt(input_6);
              input_5.user_input = input_6;
            }
          }
          const delay_37 = await asyncResult_129();
          const temp_180 = var_201(input_5, delay_37);
          console.log("Authenticate payload prepared:", temp_180);
          const delay_38 = asyncResult_238 || datetime_130("login");
          const error_18 = await fetch(delay_38, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.authenticate)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/",
            referrerPolicy: "same-origin",
            body: temp_180
          });
          if (!error_18.ok) {
            console.log("Request failed with status " + error_18.status);
            handleAutoSequenceError(error_18.status);
            if (error_18.status === 500 || error_18.status === 502 || error_18.status === 504) {
              hideLoadingIndicator();
            }
            const button_9 = await error_18.text();
            const button_10 = var_138(button_9, {
              preferStatusObject: true,
              label: "Authenticate"
            }) || {};
            updateButtonStatus(button_10, "Authenticate", button_9, "Authenticate Success", "Authenticate Failed");
            var_235("authenticate-btn", "Authenticate");
            handleAutoRetry("login-authenticate", error_18.status, temp_177);
            return;
          }
          const button_11 = await error_18.text();
          const data_23 = var_138(button_11, {
            preferStatusObject: true,
            label: "Authenticate"
          });
          console.log("Authenticate raw response:", button_11);
          console.log("Authenticate parsed payload:", data_23);
          if (!data_23) {
            console.log("Unable to parse authenticate response payload");
            hideLoadingIndicator();
            updateButtonStatus(null, "Authenticate", button_11, "Authenticate Success", "Authenticate Failed");
            var_235("authenticate-btn", "Authenticate");
            handleAutoRetry("login-authenticate", null, temp_177);
            return;
          }
          if (var_210(data_23)) {
            if (data_23?.data && data_23.data?.email_confirmed) {
              localStorage.setItem("user_email", data_23.data.email);
              localStorage.setItem("user_pwd", temp_176);
              localStorage.setItem("authStep", "100");
              console.log("Authenticate Successfully");
              updateButtonStatus(data_23, "Authenticate", button_11, "Authenticate Success", "Authenticate Failed");
              asyncResult_93(document.getElementById("authenticate-btn"));
              setTimeout(() => resetButtonState(document.getElementById("authenticate-btn")), 3000);
              datetime_108("login-otp-timer-display", 5);
              var_62("password");
            } else {
              localStorage.setItem("authStep", "3");
              console.log("Failed to authenticate");
              updateButtonStatus(data_23, "Authenticate", button_11, "Authenticate Success", "Failed to Authenticate");
              var_235("authenticate-btn", "Authenticate");
            }
          } else {
            localStorage.setItem("authStep", "3");
            console.log("Authenticate failed");
            hideLoadingIndicator();
            updateButtonStatus(data_23, "Authenticate", button_11, "Authenticate Success", "Authenticate Failed");
            var_235("authenticate-btn", "Authenticate");
            handleAutoRetry("login-authenticate", null, temp_177);
          }
        } catch (asyncResult_239) {
          console.log("Error authenticating:", asyncResult_239);
          hideLoadingIndicator();
          const button_12 = {
            error: asyncResult_239.message
          };
          updateButtonStatus(button_12, "Authenticate", "", "Authenticate Success", "Authenticate Failed");
          var_235("authenticate-btn", "Authenticate");
          handleAutoRetry("login-authenticate", null, temp_177, {
            isNetworkError: true
          });
        }
      }
      eventHandler_178("submit-otp-btn", "click", async function (event_7) {
        if (event_7) {
          event_7.preventDefault();
          event_7.stopPropagation();
        }
        const temp_181 = "otp";
        var_231(temp_181);
        const temp_182 = this.id;
        var_56();
        const temp_183 = editedEndpoints[temp_182];
        if (temp_183) {
          submitLoginOtp(temp_183);
        } else {
          submitLoginOtp();
        }
      });
      let delay_8 = false;
      async function submitLoginOtp(asyncResult_240 = null) {
        if (delay_8) {
          console.log("Submit OTP already processing, ignoring duplicate call");
          return;
        }
        delay_8 = true;
        try {
          var_128();
          showStatusMessage("Try Successfully Login", "#FFD700");
          const element_152 = document.getElementById("submit-otp-btn");
          const element_153 = document.getElementById("mt-mobile-number");
          const element_154 = document.getElementById("mt-password");
          const element_155 = document.getElementById("mt-otp");
          if (!var_196({
            "Mobile number": element_153?.value.trim(),
            Password: element_154?.value,
            OTP: element_155?.value.trim()
          })) {
            delay_8 = false;
            return;
          }
          const temp_184 = element_153.value.trim();
          const temp_185 = element_154.value;
          const count_25 = element_155.value.trim();
          if (count_25.length !== 6) {
            console.log("Invalid OTP length! Expected 6 characters");
            delay_8 = false;
            return;
          }
          const temp_186 = () => submitLoginOtp(asyncResult_240);
          let temp_187;
          if (editedData.otp) {
            const temp_188 = {
              ...editedData.otp
            };
            temp_187 = temp_188;
          } else {
            const temp_189 = {
              mobile_no: temp_184,
              password: temp_185,
              otp: count_25
            };
            temp_187 = temp_189;
          }
          const delay_39 = await asyncResult_129();
          const temp_190 = var_201(temp_187, delay_39);
          console.log("Submit OTP payload prepared:", temp_190);
          const delay_40 = asyncResult_240 || datetime_130("loginOtp");
          const headers_7 = await fetch(delay_40, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.submitOtp)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/",
            referrerPolicy: "same-origin",
            redirect: "manual",
            body: temp_190
          });
          if (headers_7.status === 307 || headers_7.status === 308) {
            console.log("Submit OTP redirect response (" + headers_7.status + ") - will parse response body to check for \"Login Successful\" message");
            const headers_8 = headers_7.headers.get("Location");
            if (headers_8) {
              console.log("Redirect location: " + headers_8 + " (not following to prevent duplicate request)");
            }
          }
          if (!headers_7 || headers_7.status === 0 || headers_7.status === null) {
            console.log("Request failed - network error or invalid response");
            delay_8 = false;
            hideLoadingIndicator();
            updateButtonStatus({
              error: "Network error or invalid response"
            }, "Submit OTP", "", "Submit OTP Success", "Submit OTP Failed");
            resetButtonState(element_152);
            handleAutoRetry("login-submit-otp", null, temp_186, {
              isNetworkError: true
            });
            return;
          }
          if (headers_7.status !== 200 && headers_7.status !== 307 && headers_7.status !== 308) {
            handleAutoSequenceError(headers_7.status);
            if (headers_7.status === 500 || headers_7.status === 502 || headers_7.status === 504) {
              hideLoadingIndicator();
            }
          }
          const result_8 = await headers_7.text();
          console.log("Submit OTP raw response:", result_8);
          let result_9 = null;
          let temp_191 = {};
          if (result_8.includes("d:") && result_8.includes("data:image")) {
            console.log("Detected special response format with image data");
            const temp_192 = result_8.match(/\{[\s\S]*?\}/);
            if (temp_192) {
              try {
                const temp_193 = JSON.parse(temp_192[0]);
                result_9 = temp_193;
                console.log("Extracted JSON from response with image:", result_9);
              } catch (jsonData_241) {
                console.log("Failed to parse JSON from image response:", jsonData_241);
              }
            }
            const temp_194 = result_8.match(/^d:([^,]+)/);
            if (temp_194) {
              temp_191.prefix = temp_194[1];
              console.log("Extracted prefix:", temp_191.prefix);
            }
          }
          if (!result_9) {
            const count_26 = result_8.split(/\r?\n/).map(param_20 => param_20.trim()).filter(Boolean);
            if (count_26.length >= 1) {
              const temp_195 = count_26[0].trim();
              console.log("Submit OTP line 1:", temp_195);
              try {
                let temp_196 = temp_195;
                const temp_197 = temp_195.match(/^\d+\s*:\s*(.+)/);
                if (temp_197 && temp_197[1]) {
                  temp_196 = temp_197[1].trim();
                } else {
                  const temp_198 = temp_195.indexOf(":");
                  if (temp_198 > -1 && temp_195[temp_198 + 1] === "{") {
                    temp_196 = temp_195.slice(temp_198 + 1).trim();
                  }
                }
                const temp_199 = JSON.parse(temp_196);
                if (typeof temp_199 === "object" && temp_199 !== null) {
                  if (temp_199.message || temp_199.status || temp_199.status_code) {
                    result_9 = temp_199;
                    console.log("Submit OTP parsed line 1:", result_9);
                    if (temp_199.message === "Login Successful") {
                      console.log("✅ \"Login Successful\" message found in line 1");
                    }
                  }
                }
              } catch (jsonData_242) {
                console.log("Failed to parse line 1:", jsonData_242);
              }
            }
            if (!result_9 && count_26.length >= 13) {
              const temp_200 = count_26[12].trim();
              console.log("Submit OTP line 13:", temp_200);
              try {
                let temp_201 = temp_200;
                const temp_202 = temp_200.match(/^\d+\s*:\s*(.+)/);
                if (temp_202 && temp_202[1]) {
                  temp_201 = temp_202[1].trim();
                } else {
                  const temp_203 = temp_200.indexOf(":");
                  if (temp_203 > -1 && temp_200[temp_203 + 1] === "{") {
                    temp_201 = temp_200.slice(temp_203 + 1).trim();
                  }
                }
                result_9 = JSON.parse(temp_201);
                console.log("Submit OTP parsed line 13:", result_9);
                if (result_9 && result_9.message === "Login Successful") {
                  console.log("✅ \"Login Successful\" message found in line 13");
                }
              } catch (jsonData_243) {
                console.log("Failed to parse line 13:", jsonData_243);
              }
            }
            if (!result_9 && count_26.length >= 12) {
              const temp_204 = count_26[11].trim();
              console.log("Submit OTP line 12:", temp_204);
              try {
                let temp_205 = temp_204;
                const temp_206 = temp_204.match(/^\d+\s*:\s*(.+)/);
                if (temp_206 && temp_206[1]) {
                  temp_205 = temp_206[1].trim();
                } else {
                  const temp_207 = temp_204.indexOf(":");
                  if (temp_207 > -1 && temp_204[temp_207 + 1] === "{") {
                    temp_205 = temp_204.slice(temp_207 + 1).trim();
                  }
                }
                const temp_208 = JSON.parse(temp_205);
                if (typeof temp_208 === "object" && temp_208 !== null) {
                  if (temp_208.message || temp_208.status || temp_208.status_code) {
                    result_9 = temp_208;
                    console.log("Submit OTP parsed line 12:", result_9);
                    if (temp_208.message === "Login Successful") {
                      console.log("✅ \"Login Successful\" message found in line 12");
                    }
                  }
                }
              } catch (jsonData_244) {
                console.log("Failed to parse line 12:", jsonData_244);
              }
            }
            if (!result_9) {
              for (let count_27 = 0; count_27 < count_26.length; count_27++) {
                const temp_209 = count_26[count_27];
                try {
                  let temp_210 = temp_209;
                  const temp_211 = temp_209.indexOf(":");
                  if (temp_211 > -1 && temp_209[temp_211 + 1] === "{") {
                    temp_210 = temp_209.slice(temp_211 + 1).trim();
                  }
                  const temp_212 = JSON.parse(temp_210);
                  if (typeof temp_212 === "object" && temp_212 !== null) {
                    if (temp_212.message || temp_212.status || temp_212.status_code) {
                      result_9 = temp_212;
                      console.log("Submit OTP parsed line " + count_27 + ":", result_9);
                      break;
                    }
                    if (!result_9) {
                      result_9 = temp_212;
                    }
                  }
                } catch (var_245) {
                  continue;
                }
              }
            }
            if (!result_9) {
              result_9 = var_138(result_8, {
                preferStatusObject: true,
                label: "Submit OTP"
              });
            }
          }
          console.log("Submit OTP final parsed payload:", result_9);
          const temp_213 = param_21 => {
            const data_24 = {
              email: null,
              mobile_no: null
            };
            if (!param_21) {
              return data_24;
            }
            if (param_21.email) {
              data_24.email = param_21.email;
            }
            if (param_21.mobile_no) {
              data_24.mobile_no = param_21.mobile_no;
            }
            if (param_21.data) {
              if (param_21.data.email) {
                data_24.email = param_21.data.email;
              }
              if (param_21.data.mobile_no) {
                data_24.mobile_no = param_21.data.mobile_no;
              }
            }
            if (!data_24.email || !data_24.mobile_no) {
              const temp_214 = result_8.match(/"email"\s*:\s*"([^"]+)"/i) || result_8.match(/email[:\s=]+([^\s,}]+)/i);
              const temp_215 = result_8.match(/"mobile_no"\s*:\s*"([^"]+)"/i) || result_8.match(/mobile_no[:\s=]+([^\s,}]+)/i) || result_8.match(/mobile[:\s=]+([^\s,}]+)/i);
              if (temp_214 && !data_24.email) {
                data_24.email = temp_214[1];
              }
              if (temp_215 && !data_24.mobile_no) {
                data_24.mobile_no = temp_215[1];
              }
            }
            return data_24;
          };
          const temp_216 = data_25 => {
            if (!data_25) {
              return false;
            }
            const data_26 = data_25.message || data_25.data && data_25.data.message;
            if (data_26 && typeof data_26 === "string") {
              const temp_217 = data_26.trim();
              if (temp_217 === "Login Successful") {
                console.log("✅ \"Login Successful\" message detected in parsed data");
                return true;
              }
            }
            return false;
          };
          const temp_218 = param_22 => {
            const temp_219 = /"message"\s*:\s*"Login Successful"/i;
            const temp_220 = param_22.match(temp_219);
            if (temp_220) {
              console.log("✅ \"Login Successful\" message found in raw response");
              return true;
            }
            return false;
          };
          if (!result_9) {
            console.log("Unable to parse submit OTP response payload");
            hideLoadingIndicator();
            updateButtonStatus(null, "Submit OTP", result_8, "Submit OTP Success", "Submit OTP Failed");
            resetButtonState(element_152);
            handleAutoRetry("login-submit-otp", null, temp_186);
            return;
          }
          let step_8 = temp_216(result_9);
          if (!step_8) {
            step_8 = temp_218(result_8);
          }
          const data_27 = result_9?.data && result_9.data.token_type === "Bearer";
          if (step_8 || data_27 || var_210(result_9)) {
            const temp_221 = temp_213(result_9);
            var_70(result_9, headers_7);
            localStorage.setItem("activeStep", "1");
            localStorage.setItem("authStep", "100");
            if (result_9.data && result_9.data.profile_image) {
              localStorage.setItem("auth_photo", result_9.data.profile_image);
            }
            console.log("✅ Login OTP code verify successfully - Message: Login Successful");
            if (step_8 && autoSequenceState.enabled && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.LOGIN_SUBMIT_OTP) {
              autoSequenceState.submitOtpStatus200 = true;
              console.log("Auto Sequence: \"Login Successful\" message detected - proceeding to next step");
            }
            const button_13 = updateButtonStatus(result_9, "Submit OTP", result_8, "Submit OTP Success", "Submit OTP Failed");
            let temp_222 = button_13.message;
            const count_28 = [temp_222];
            if (temp_221.email) {
              count_28.push("Email: " + temp_221.email);
            }
            if (temp_221.mobile_no) {
              count_28.push("Mobile: " + temp_221.mobile_no);
            }
            if (count_28.length > 1) {
              const temp_223 = count_28.join(" | ");
              showStatusMessage("Success: " + temp_223, "#00FF00");
            }
            asyncResult_93(element_152);
            setTimeout(() => resetButtonState(element_152), 3000);
            const element_156 = document.getElementById("login-otp-timer-display");
            if (element_156) {
              element_156.style.display = "none";
            }
            var_62("otp");
            delay_8 = false;
          } else {
            localStorage.setItem("authStep", "3");
            console.log("Submit OTP failed");
            hideLoadingIndicator();
            updateButtonStatus(result_9, "Submit OTP", result_8, "Submit OTP Success", "Submit OTP Failed");
            resetButtonState(element_152);
            delay_8 = false;
            handleAutoRetry("login-submit-otp", null, temp_186);
          }
        } catch (message_246) {
          console.log("Error login otp verify:", message_246);
          delay_8 = false;
          hideLoadingIndicator();
          const button_14 = {
            error: message_246.message
          };
          updateButtonStatus(button_14, "Submit OTP", "", "Submit OTP Success", "Submit OTP Failed");
          resetButtonState(buttonElement);
          handleAutoRetry("login-submit-otp", null, retryOperation, {
            isNetworkError: true
          });
        }
      }
      eventHandler_178("application-info-btn", "click", async function (param_23) {
        const temp_224 = "bgd";
        var_231(temp_224);
        const temp_225 = this.id;
        var_56();
        const temp_226 = editedEndpoints[temp_225];
        if (temp_226) {
          submitApplicationInfo(temp_226);
        } else {
          submitApplicationInfo();
        }
      });
      async function submitApplicationInfo(asyncResult_247 = null) {
        var_128();
        showStatusMessage("Try To Submit Application Info", "#FFD700");
        const element_157 = document.getElementById("application-info-btn");
        const temp_227 = () => submitApplicationInfo(asyncResult_247);
        try {
          const temp_228 = {
            ...payloadData.app
          };
          let config_3 = temp_228;
          if (captchaProviderConfig.bgd.enabled && captchaProviderConfig.bgd.token) {
            var_192(config_3, captchaProviderConfig.bgd.token, captchaTokenNames.app);
          }
          const delay_41 = await asyncResult_129();
          const text_36 = [config_3, false, delay_41];
          const text_37 = JSON.stringify(text_36);
          console.log("Application Info payload prepared:", text_37);
          const delay_42 = asyncResult_247 || datetime_130("applicationInfoSubmit");
          const result_10 = await fetch(delay_42, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.applicationInfo)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/application",
            referrerPolicy: "same-origin",
            body: text_37
          });
          const result_11 = await result_10.text();
          console.log("Application info HTTP status:", result_10.status, "(200 = connected, not success)");
          console.log("Application info raw response:", result_11.substring(0, 500));
          if (!result_10.ok && result_10.status !== 200) {
            console.log("HTTP status " + result_10.status + " returned - will check response message for actual success/failure");
            handleAutoSequenceError(result_10.status);
            if (result_10.status === 500 || result_10.status === 502 || result_10.status === 504) {
              hideLoadingIndicator();
            }
          }
          const count_29 = result_11.split(/\r?\n/);
          let temp_229 = null;
          if (count_29.length >= 2) {
            const temp_230 = count_29[1].trim();
            console.log("Application info line 1:", temp_230);
            try {
              let temp_231 = temp_230;
              const temp_232 = temp_230.indexOf(":");
              if (temp_232 > -1) {
                temp_231 = temp_230.slice(temp_232 + 1).trim();
              }
              temp_229 = JSON.parse(temp_231);
              console.log("Application info parsed line 1:", temp_229);
            } catch (jsonData_248) {
              console.log("Failed to parse line 1:", jsonData_248);
              temp_229 = var_138(result_11, {
                preferStatusObject: true,
                label: "Application Info"
              });
            }
          } else {
            temp_229 = var_138(result_11, {
              preferStatusObject: true,
              label: "Application Info"
            });
          }
          console.log("Application info final parsed payload:", temp_229);
          if (!temp_229) {
            try {
              temp_229 = var_138(result_11, {
                preferStatusObject: true,
                label: "Application Info"
              });
            } catch (jsonData_249) {
              console.log("Failed to parse response:", jsonData_249);
            }
          }
          const formData_4 = outcome_139(temp_229, result_11, "Application information submitted successfully");
          console.log("🔍 Application Info success detection:", formData_4 ? "✅ SUCCESS" : "❌ FAILURE");
          console.log("Response message:", temp_229?.message || temp_229?.data?.message || "Not found");
          console.log("HTTP Status:", result_10.status, "(200 = connected, not success)");
          if (formData_4 && temp_229?.data) {
            if (localStorage.getItem("applicant") !== null) {
              localStorage.removeItem("applicant");
            }
            const text_38 = {
              high_com: highcom,
              ivac_id: ivac_id,
              visa_type: visa_type,
              visit_purpose: visit_purpose,
              webfile_id: webfile_id,
              family_count: family_count,
              webfile_id_repeat: webfile_id
            };
            localStorage.setItem("applicant", JSON.stringify(text_38));
            localStorage.setItem("activeStep", "2");
            localStorage.setItem("authStep", "100");
            console.log("✅ Application Info store Successfully - specific success message detected");
            updateButtonStatus(temp_229, "Application Info", result_11, "Application Info store Successfully", "Application Info Failed");
            var_89(element_157);
            timerCallback_77(1);
            setTimeout(() => resetButtonState(element_157), 3000);
            var_62("bgd");
            autoSequenceState.appSuccess = true;
            if (captchaProviderConfig.bgd.enabled) {
              captchaProviderConfig.bgd.enabled = false;
              captchaProviderConfig.bgd.token = "";
              var_55("bgd");
              console.log("BGD Tab CF Button turned off automatically after App Button success");
            }
            if (autoSequenceState.enabled && autoRetryState.enabled) {
              detectManualButtonSuccess("application-info-btn");
            } else {
              handleBgdPersonalDelay();
            }
          } else {
            console.log("❌ Application Info: FAILURE - specific success message \"Application information submitted successfully\" NOT detected");
            console.log("HTTP Status:", result_10.status, "(200 = connected to server, not success)");
            console.log("Response message found:", temp_229?.message || temp_229?.data?.message || "No message found");
            console.log("Raw response preview:", result_11.substring(0, 500));
            handleOperationFailure("bgd-app", result_10.status, temp_227, temp_229, result_11, element_157, "Application Info");
          }
        } catch (var_250) {
          console.log("Error Application Info store:", var_250);
          handleOperationFailure("bgd-app", null, temp_227, null, "", element_157, "Application Info");
        }
      }
      eventHandler_178("personal-info-btn", "click", async function (param_24) {
        const temp_233 = "personal";
        var_231(temp_233);
        const temp_234 = this.id;
        var_56();
        const temp_235 = editedEndpoints[temp_234];
        if (temp_235) {
          asyncResult_58(temp_235);
        } else {
          asyncResult_58();
        }
      });
      async function asyncResult_58(asyncResult_251 = null) {
        var_128();
        showStatusMessage("Try To Submit Personal Info", "#FFD700");
        const element_158 = document.getElementById("personal-info-btn");
        const temp_236 = () => asyncResult_58(asyncResult_251);
        try {
          const count_30 = parseInt(family_count) || 0;
          const temp_237 = {};
          for (let data_28 = 0; data_28 < count_30; data_28++) {
            if (data_28 < familyData.length && familyData[data_28]) {
              temp_237[data_28] = {
                name: familyData[data_28].name || "",
                webfile_no: familyData[data_28].webfile_no || "",
                again_webfile_no: familyData[data_28].webfile_no || ""
              };
            } else {
              temp_237[data_28] = {
                name: "",
                webfile_no: "",
                again_webfile_no: ""
              };
            }
          }
          let config_4 = {
            full_name: payloadData.personal.full_name || localStorage.getItem("auth_name") || "",
            email_name: payloadData.personal.email_name || localStorage.getItem("auth_email") || "",
            phone: payloadData.personal.phone || localStorage.getItem("auth_phone") || "",
            webfile_id: payloadData.personal.webfile_id || webfile_id,
            family: temp_237
          };
          if (captchaProviderConfig.bgd.enabled && captchaProviderConfig.bgd.token) {
            var_192(config_4, captchaProviderConfig.bgd.token, captchaTokenNames.personal);
          }
          const delay_43 = await asyncResult_129();
          const text_39 = [config_4, false, delay_43];
          const text_40 = JSON.stringify(text_39);
          console.log("Personal Info payload prepared:", text_40);
          const delay_44 = asyncResult_251 || datetime_130("personalInfoSubmit");
          const result_12 = await fetch(delay_44, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.personalInfo)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/application",
            referrerPolicy: "same-origin",
            body: text_40
          });
          const result_13 = await result_12.text();
          console.log("Personal info HTTP status:", result_12.status, "(200 = connected, not success)");
          console.log("Personal info raw response:", result_13.substring(0, 500));
          if (!result_12.ok && result_12.status !== 200) {
            console.log("HTTP status " + result_12.status + " returned - will check response message for actual success/failure");
            if (result_12.status === 403) {} else {
              handleAutoSequenceError(result_12.status);
            }
            if (result_12.status === 500 || result_12.status === 502 || result_12.status === 504) {
              hideLoadingIndicator();
            }
          }
          console.log("Personal info raw response:", result_13);
          const count_31 = result_13.split(/\r?\n/);
          let temp_238 = null;
          if (count_31.length >= 2) {
            const temp_239 = count_31[1].trim();
            console.log("Personal info line 1:", temp_239);
            try {
              let temp_240 = temp_239;
              const temp_241 = temp_239.indexOf(":");
              if (temp_241 > -1) {
                temp_240 = temp_239.slice(temp_241 + 1).trim();
              }
              temp_238 = JSON.parse(temp_240);
              console.log("Personal info parsed line 1:", temp_238);
            } catch (jsonData_252) {
              console.log("Failed to parse line 1:", jsonData_252);
              temp_238 = var_138(result_13, {
                preferStatusObject: true,
                label: "Personal Info"
              });
            }
          } else {
            temp_238 = var_138(result_13, {
              preferStatusObject: true,
              label: "Personal Info"
            });
          }
          console.log("Personal info final parsed payload:", temp_238);
          if (!temp_238) {
            console.log("Unable to parse personal info response payload");
            handleOperationFailure("bgd-personal", result_12.status, temp_236, null, result_13, element_158, "Personal Info");
            return;
          }
          const formData_5 = outcome_139(temp_238, result_13, "Personal information saved successfully");
          if (formData_5 && temp_238?.data) {
            if (localStorage.getItem("personal_info") !== null) {
              localStorage.removeItem("personal_info");
            }
            const text_41 = {
              email_name: config_4.email_name,
              full_name: config_4.full_name,
              phone: config_4.phone,
              webfile_id: config_4.webfile_id,
              family: config_4.family
            };
            localStorage.setItem("personal_info", JSON.stringify(text_41));
            localStorage.setItem("activeStep", "3");
            localStorage.setItem("authStep", "100");
            console.log("✅ Personal Info store Successfully - specific success message detected");
            updateButtonStatus(temp_238, "Personal Info", result_13, "Personal Info store Successfully", "Personal Info Failed");
            var_89(element_158);
            timerCallback_77(2);
            setTimeout(() => resetButtonState(element_158), 3000);
            var_62("personal");
            autoSequenceState.personalSuccess = true;
            detectManualButtonSuccess("personal-info-btn");
          } else {
            console.log("❌ Personal Info: FAILURE - specific success message \"Personal information saved successfully\" NOT detected");
            handleOperationFailure("bgd-personal", result_12.status, temp_236, temp_238, result_13, element_158, "Personal Info");
          }
        } catch (var_253) {
          console.log("Error Personal Info store:", var_253);
          handleOperationFailure("bgd-personal", null, temp_236, null, "", element_158, "Personal Info");
        }
      }
      eventHandler_178("overview-btn", "click", async function (param_25) {
        const temp_242 = "overview";
        var_231(temp_242);
        const temp_243 = this.id;
        var_56();
        const temp_244 = editedEndpoints[temp_243];
        if (temp_244) {
          asyncResult_254(temp_244);
        } else {
          asyncResult_254();
        }
      });
      async function asyncResult_254(asyncResult_255 = null) {
        var_128();
        showStatusMessage("Try To Submit Overview", "#FFD700");
        const element_159 = document.getElementById("overview-btn");
        const temp_245 = () => asyncResult_254(asyncResult_255);
        try {
          const delay_45 = await asyncResult_129();
          const text_42 = ["en", delay_45];
          const text_43 = JSON.stringify(text_42);
          console.log("Overview payload prepared:", text_43);
          const delay_46 = asyncResult_255 || datetime_130("overviewSubmit");
          const error_19 = await fetch(delay_46, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.overviewInfo)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/application",
            referrerPolicy: "same-origin",
            body: text_43
          });
          if (!error_19.ok) {
            console.log("Request failed with status " + error_19.status);
            handleAutoSequenceError(error_19.status);
            if (error_19.status === 500 || error_19.status === 502 || error_19.status === 504) {
              hideLoadingIndicator();
            }
            updateButtonLoading(element_159);
            setTimeout(() => resetButtonState(element_159), 3000);
            handleAutoRetry("bgd-overview", error_19.status, temp_245);
            return;
          }
          const result_14 = await error_19.text();
          console.log("Overview raw response:", result_14);
          const count_32 = result_14.split(/\r?\n/);
          let temp_246 = null;
          if (count_32.length >= 2) {
            const temp_247 = count_32[1].trim();
            console.log("Overview line 1:", temp_247);
            try {
              let temp_248 = temp_247;
              const temp_249 = temp_247.indexOf(":");
              if (temp_249 > -1) {
                temp_248 = temp_247.slice(temp_249 + 1).trim();
              }
              temp_246 = JSON.parse(temp_248);
              console.log("Overview parsed line 1:", temp_246);
            } catch (jsonData_256) {
              console.log("Failed to parse line 1:", jsonData_256);
              temp_246 = var_138(result_14, {
                preferStatusObject: true,
                label: "Overview"
              });
            }
          } else {
            temp_246 = var_138(result_14, {
              preferStatusObject: true,
              label: "Overview"
            });
          }
          console.log("Overview final parsed payload:", temp_246);
          if (!temp_246) {
            console.log("Unable to parse overview response payload");
            handleOperationFailure("bgd-overview", error_19.status, temp_245, null, result_14, element_159, "Overview");
            return;
          }
          const temp_250 = outcome_139(temp_246, result_14, "Booking session updated successfully");
          if (temp_250) {
            localStorage.setItem("activeStep", "4");
            console.log("Overview session created Successfully");
            updateButtonStatus(temp_246, "Overview", result_14, "Overview session created Successfully", "Overview Failed");
            var_89(element_159);
            timerCallback_77(3);
            setTimeout(() => resetButtonState(element_159), 3000);
            var_62("overview");
            if (autoSequenceState.enabled && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.BGD_OVERVIEW) {
              autoSequenceState.overviewSuccess = true;
              console.log("Auto Sequence: Overview success response detected");
            }
            detectManualButtonSuccess("overview-btn");
          } else {
            console.log("❌ Overview: FAILURE - specific success message \"Booking session updated successfully\" NOT detected");
            handleOperationFailure("bgd-overview", error_19.status, temp_245, temp_246, result_14, element_159, "Overview");
          }
        } catch (var_257) {
          console.log("Error Overview session create:", var_257);
          hideLoadingIndicator();
          updateButtonLoading(element_159);
          setTimeout(() => resetButtonState(element_159), 3000);
          handleAutoRetry("bgd-overview", null, temp_245, {
            isNetworkError: true
          });
        }
      }
      eventHandler_178("pay-otp-btn", "click", async function (param_26) {
        const temp_251 = "send";
        var_231(temp_251);
        const temp_252 = this.id;
        var_56();
        const temp_253 = editedEndpoints[temp_252];
        if (temp_253) {
          asyncResult_258(temp_253);
        } else {
          asyncResult_258();
        }
      });
      async function asyncResult_258(asyncResult_259 = null) {
        var_128();
        showStatusMessage("Try Get OTP From Server", "#FFD700");
        const element_160 = document.getElementById("pay-otp-btn");
        const temp_254 = () => asyncResult_258(asyncResult_259);
        try {
          const delay_47 = await asyncResult_129();
          const text_44 = [0, delay_47];
          const text_45 = JSON.stringify(text_44);
          console.log("Send OTP payload prepared:", text_45);
          const delay_48 = asyncResult_259 || datetime_130("payOtpSent");
          const error_20 = await fetch(delay_48, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.sendOtpInfo)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/application",
            referrerPolicy: "same-origin",
            body: text_45
          });
          if (!error_20.ok) {
            console.log("Request failed with status " + error_20.status);
            handleAutoSequenceError(error_20.status);
            if (error_20.status === 500 || error_20.status === 502 || error_20.status === 504) {
              hideLoadingIndicator();
            }
            updateButtonLoading(element_160);
            setTimeout(() => resetButtonState(element_160), 3000);
            handleAutoRetry("pay-send", error_20.status, temp_254);
            return;
          }
          const result_15 = await error_20.text();
          console.log("Send OTP raw response:", result_15);
          const count_33 = result_15.split(/\r?\n/).map(param_27 => param_27.trim()).filter(Boolean);
          let temp_255 = null;
          for (let count_34 = 0; count_34 < count_33.length; count_34++) {
            const temp_256 = count_33[count_34];
            try {
              let temp_257 = temp_256;
              const temp_258 = temp_256.indexOf(":");
              if (temp_258 > -1 && temp_256[temp_258 + 1] === "{") {
                temp_257 = temp_256.slice(temp_258 + 1).trim();
              }
              const temp_259 = JSON.parse(temp_257);
              if (typeof temp_259 === "object" && temp_259 !== null) {
                if (temp_259.message || temp_259.status || temp_259.status_code) {
                  temp_255 = temp_259;
                  console.log("Send OTP parsed line " + count_34 + ":", temp_255);
                  break;
                }
                if (!temp_255) {
                  temp_255 = temp_259;
                }
              }
            } catch (var_260) {
              continue;
            }
          }
          if (!temp_255) {
            temp_255 = var_138(result_15, {
              preferStatusObject: true,
              label: "Send OTP"
            });
          }
          console.log("Send OTP final parsed payload:", temp_255);
          if (!temp_255) {
            console.log("Unable to parse send OTP response payload");
            handleOperationFailure("pay-send", error_20.status, temp_254, null, result_15, element_160, "Payment OTP");
            return;
          }
          const temp_260 = outcome_139(temp_255, result_15, "Sms send successfully");
          if (temp_260) {
            console.log("Payment otp send Successfully");
            updateButtonStatus(temp_255, "Payment OTP", result_15, "Payment otp send Successfully", "Payment OTP Failed");
            var_89(element_160);
            var_80();
            setTimeout(() => resetButtonState(element_160), 3000);
            datetime_108("bgd-otp-timer-display", 3);
            const element_161 = document.getElementById("resend-pay-otp-btn");
            if (element_161) {
              element_161.disabled = true;
              setTimeout(() => {
                element_161.disabled = false;
                showStatusMessage("Resend button enabled", "#4CAF50");
              }, 30000);
            }
            detectManualButtonSuccess("pay-otp-btn");
            var_62("send");
          } else {
            console.log("❌ Send OTP: FAILURE - specific success message \"Sms send successfully\" NOT detected");
            handleOperationFailure("pay-send", error_20.status, temp_254, temp_255, result_15, element_160, "Payment OTP");
          }
        } catch (var_261) {
          console.log("Error payment otp send:", var_261);
          hideLoadingIndicator();
          updateButtonLoading(element_160);
          setTimeout(() => resetButtonState(element_160), 3000);
          handleAutoRetry("pay-send", null, temp_254, {
            isNetworkError: true
          });
        }
      }
      eventHandler_178("resend-pay-otp-btn", "click", async function (param_28) {
        const temp_261 = "resend";
        var_231(temp_261);
        var_56();
        const temp_262 = this.id;
        const temp_263 = editedEndpoints[temp_262];
        if (temp_263) {
          asyncResult_262(temp_263);
        } else {
          asyncResult_262();
        }
      });
      async function asyncResult_262(asyncResult_263 = null) {
        showStatusMessage("Try To Get 2nd OTP From Server", "#FFD700");
        const element_162 = document.getElementById("resend-pay-otp-btn");
        const temp_264 = () => asyncResult_262(asyncResult_263);
        try {
          const temp_265 = new AbortController();
          pendingOperations.push(temp_265);
          const config_5 = {
            resend: "1"
          };
          if (captchaProviderConfig.bgd.enabled && captchaProviderConfig.bgd.token) {
            var_192(config_5, captchaProviderConfig.bgd.token, captchaTokenNames.send);
          }
          const delay_49 = asyncResult_263 || datetime_130("payOtpSent");
          const error_21 = await fetch(delay_49, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access_token")
            },
            referrer: "/application",
            credentials: "include",
            body: JSON.stringify(config_5),
            signal: temp_265.signal
          });
          pendingOperations = pendingOperations.filter(param_29 => param_29 !== temp_265);
          if (!error_21.ok) {
            console.log("Request failed with status " + error_21.status);
            handleAutoSequenceError(error_21.status);
            if (error_21.status === 500 || error_21.status === 502 || error_21.status === 504) {
              hideLoadingIndicator();
            }
            updateButtonLoading(element_162);
            setTimeout(() => resetButtonState(element_162), 3000);
            handleAutoRetry("pay-resend", error_21.status, temp_264);
            return;
          }
          const button_15 = await error_21.json();
          const button_16 = JSON.stringify(button_15);
          const data_29 = outcome_139(button_15, button_16, "Sms send successfully");
          if (data_29 && button_15?.data) {
            console.log("Resend Payment otp send Successfully");
            updateButtonStatus(button_15, "Resend Payment OTP", button_16, "Resend Payment otp send Successfully", "Resend Payment OTP Failed");
            var_89(element_162);
            var_80();
            setTimeout(() => resetButtonState(element_162), 3000);
            datetime_108("bgd-otp-timer-display", 3);
            var_62("resend");
          } else {
            console.log("Resend OTP: Failure detected - retrying");
            hideLoadingIndicator();
            updateButtonStatus(button_15, "Resend Payment OTP", button_16, "Resend Payment otp send Successfully", "Resend Payment OTP Failed");
            updateButtonLoading(element_162);
            setTimeout(() => resetButtonState(element_162), 3000);
            if (autoRetryState.enabled) {
              handleAutoRetry("pay-resend", null, temp_264);
            }
          }
        } catch (var_264) {
          if (var_264.name === "AbortError") {
            console.log("Request aborted");
          } else {
            console.log("Error payment otp resend");
            hideLoadingIndicator();
            updateButtonLoading(element_162);
            setTimeout(() => resetButtonState(element_162), 3000);
            handleAutoRetry("pay-resend", null, temp_264, {
              isNetworkError: true
            });
          }
        }
      }
      eventHandler_178("pay-verify-btn", "click", async function (param_30) {
        const temp_266 = "verify";
        var_231(temp_266);
        const temp_267 = this.id;
        var_56();
        const temp_268 = editedEndpoints[temp_267];
        if (temp_268) {
          asyncResult_265(temp_268);
        } else {
          asyncResult_265();
        }
      });
      eventHandler_178("cf-btn-paynow-row", "click", eventHandler_132);
      eventHandler_178("pay-captcha-verify-btn", "click", asyncResult_143);
      eventHandler_178("pay-captcha-cs-btn", "click", asyncResult_145);
      async function asyncResult_265(asyncResult_266 = null) {
        var_128();
        showStatusMessage("Try To Submit Payment OTP", "#FFD700");
        const element_163 = document.getElementById("pay-verify-btn");
        const element_164 = document.getElementById("payment-otp");
        if (!element_164) {
          console.log("Payment OTP input not found");
          return;
        }
        const temp_269 = element_164.value.trim();
        if (!temp_269) {
          console.log("Otp code is required");
          showStatusMessage("OTP code is required", "#ff4444");
          return;
        }
        const temp_270 = () => asyncResult_265(asyncResult_266);
        try {
          const delay_50 = await asyncResult_129();
          const text_46 = [temp_269, delay_50];
          const text_47 = JSON.stringify(text_46);
          console.log("Verify OTP payload prepared:", text_47);
          const delay_51 = asyncResult_266 || datetime_130("payOtpVerify");
          const error_22 = await fetch(delay_51, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.verifyOtpInfo)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/application",
            referrerPolicy: "same-origin",
            body: text_47
          });
          if (!error_22.ok) {
            console.log("Request failed with status " + error_22.status);
            handleAutoSequenceError(error_22.status);
            if (error_22.status === 500 || error_22.status === 502 || error_22.status === 504) {
              hideLoadingIndicator();
            }
            updateButtonLoading(element_163);
            setTimeout(() => resetButtonState(element_163), 3000);
            handleAutoRetry("pay-verify", error_22.status, temp_270);
            return;
          }
          const result_16 = await error_22.text();
          console.log("Verify OTP raw response:", result_16);
          const count_35 = result_16.split(/\r?\n/);
          let temp_271 = null;
          if (count_35.length >= 2) {
            const temp_272 = count_35[1].trim();
            console.log("Verify OTP line 1:", temp_272);
            try {
              let temp_273 = temp_272;
              const temp_274 = temp_272.indexOf(":");
              if (temp_274 > -1) {
                temp_273 = temp_272.slice(temp_274 + 1).trim();
              }
              temp_271 = JSON.parse(temp_273);
              console.log("Verify OTP parsed line 1:", temp_271);
            } catch (jsonData_267) {
              console.log("Failed to parse line 1:", jsonData_267);
              temp_271 = var_138(result_16, {
                preferStatusObject: true,
                label: "Verify OTP"
              });
            }
          } else {
            temp_271 = var_138(result_16, {
              preferStatusObject: true,
              label: "Verify OTP"
            });
          }
          console.log("Verify OTP final parsed payload:", temp_271);
          if (!temp_271) {
            console.log("Unable to parse verify OTP response payload");
            hideLoadingIndicator();
            updateButtonStatus(null, "Verify OTP", result_16, "Verify OTP Success", "Verify OTP Failed");
            updateButtonLoading(element_163);
            setTimeout(() => resetButtonState(element_163), 3000);
            handleAutoRetry("pay-verify", null, temp_270);
            return;
          }
          const data_30 = temp_271?.data && Array.isArray(temp_271.data?.slot_dates) && temp_271.data.slot_dates.length > 0;
          const data_31 = data_30 && temp_271.data.slot_dates[0] === "";
          const temp_275 = outcome_139(temp_271, result_16, "Slot Date Found YYYY-MM-DD");
          const temp_276 = data_30 || temp_275;
          if (temp_276) {
            const data_32 = data_30 ? temp_271.data.slot_dates[0] : null;
            if (data_32 && data_32 !== "") {
              localStorage.setItem("payment_date", data_32);
              const element_165 = document.getElementById("appointment_date");
              if (element_165) {
                element_165.value = data_32;
                var_141();
              }
              console.log("✅ Verify OTP Success - Date Found: " + data_32);
              updateButtonStatus(temp_271, "Verify OTP", result_16, "Date Found " + data_32, "Verify OTP Failed");
            } else if (data_31) {
              console.log("✅ Verify OTP Success - OTP Verified (slot_dates with empty date - treated as success)");
              updateButtonStatus(temp_271, "Verify OTP", result_16, "OTP Verified Successfully", "Verify OTP Failed");
            } else {
              console.log("✅ Verify OTP Success - OTP Verified (slot_dates exists)");
              updateButtonStatus(temp_271, "Verify OTP", result_16, "OTP Verified Successfully", "Verify OTP Failed");
            }
            var_89(element_163);
            var_82();
            setTimeout(() => resetButtonState(element_163), 3000);
            datetime_108("pay-timer-display", 10);
            var_62("verify");
            if (autoRetryState.enabled && autoSequenceState.enabled) {
              console.log("✅ Auto ON and AS ON enabled - Auto switching to Pay Tab");
              showStatusMessage("Auto Sequence: Verify OTP success, auto switching to Pay Tab", "#00FF00");
              setTimeout(() => {
                clickButton("pay");
              }, 1000);
            }
            detectManualButtonSuccess("pay-verify-btn");
          } else {
            console.log("❌ Verify OTP: FAILURE - slot_dates array not found or empty, and message pattern not detected");
            handleOperationFailure("pay-verify", error_22.status, temp_270, temp_271, result_16, element_163, "Verify OTP");
          }
        } catch (datetime_268) {
          console.log("Error Date not found:", datetime_268);
          handleOperationFailure("pay-verify", null, temp_270, null, "", element_163, "Verify OTP");
          handleAutoRetry("pay-verify", null, temp_270, {
            isNetworkError: true
          });
        }
      }
      eventHandler_178("get-time-slot-btn", "click", async function (param_31) {
        const temp_277 = "paynow";
        var_231(temp_277);
        const temp_278 = this.id;
        var_56();
        const temp_279 = editedEndpoints[temp_278];
        if (temp_279) {
          asyncResult_269(temp_279);
        } else {
          asyncResult_269();
        }
      });
      async function asyncResult_269(asyncResult_270 = null) {
        var_128();
        showStatusMessage("Try To Retrive Time Slot", "#FFD700");
        const element_166 = document.getElementById("appointment_date");
        if (!element_166) {
          console.log("Appointment date input not found");
          return;
        }
        const temp_280 = element_166.value.trim();
        if (!temp_280) {
          console.log("Appointment date is required");
          showStatusMessage("Appointment date is required", "#ff4444");
          return;
        }
        loginCaptchaWidget = temp_280;
        const temp_281 = () => asyncResult_269(asyncResult_270);
        try {
          const delay_52 = await asyncResult_129();
          const text_48 = [temp_280, delay_52];
          const text_49 = JSON.stringify(text_48);
          console.log("Get Slot payload prepared:", text_49);
          const delay_53 = asyncResult_270 || datetime_130("paySlotTime");
          const error_23 = await fetch(delay_53, {
            method: "POST",
            headers: {
              ...createNextActionHeaders(nextActionConfig.getSlotInfo)
            },
            credentials: "include",
            referrer: "https://payment.ivacbd.com/application",
            referrerPolicy: "same-origin",
            body: text_49
          });
          if (!error_23.ok) {
            console.log("Request failed with status " + error_23.status);
            handleAutoSequenceError(error_23.status);
            if (error_23.status === 500 || error_23.status === 502 || error_23.status === 504) {
              hideLoadingIndicator();
            }
            handleAutoRetry("pay-get-slot", error_23.status, temp_281);
            return;
          }
          const result_17 = await error_23.text();
          console.log("Get Slot raw response:", result_17);
          const result_18 = result_17.split(/\r?\n/);
          let temp_282 = null;
          let data_33 = null;
          console.log("Total response lines:", result_18.length);
          let temp_283 = -1;
          let temp_284 = -1;
          let temp_285 = -1;
          for (let count_36 = 0; count_36 < result_18.length; count_36++) {
            const temp_286 = result_18[count_36].trim();
            if (!temp_286) {
              continue;
            }
            if (temp_286.startsWith("0:")) {
              temp_283 = count_36;
            } else if (temp_286.startsWith("1:")) {
              temp_284 = count_36;
            } else if (temp_286.startsWith("2:")) {
              temp_285 = count_36;
            }
          }
          console.log("Line indices - 0:", temp_283, "1:", temp_284, "2:", temp_285);
          if (temp_285 >= 0) {
            const text_50 = result_18[temp_285].trim();
            console.log("Get Slot line 2 found at index", temp_285);
            const data_34 = text_50.substring(2).trim();
            const data_35 = data_34.indexOf(",");
            if (data_35 > -1) {
              const text_51 = data_34.substring(0, data_35).trim();
              if (text_51.includes("-") && text_51.length === 36) {
                mathCaptchaWidget = text_51;
                localStorage.setItem("captcha_id", text_51);
                console.log("Captcha ID extracted from line 2:", text_51);
              }
            }
            if (data_35 > -1 && data_34.includes("data:image/png;base64,")) {
              const data_36 = data_34.indexOf("data:image/png;base64,");
              if (data_36 > -1) {
                let text_52 = data_34.substring(data_36);
                const text_53 = text_52.indexOf("1:{");
                if (text_53 > -1) {
                  text_52 = text_52.substring(0, text_53);
                }
                const text_54 = text_52.indexOf("base64,") + 7;
                if (text_54 > 6) {
                  let text_55 = text_52.substring(text_54);
                  text_55 = text_55.replace(/\s/g, "");
                  let data_37 = "";
                  for (let count_37 = 0; count_37 < text_55.length; count_37++) {
                    const temp_287 = text_55[count_37];
                    if (/[A-Za-z0-9+\/=]/.test(temp_287)) {
                      data_37 += temp_287;
                    } else {
                      break;
                    }
                  }
                  if (data_37.length > 100) {
                    data_33 = "data:image/png;base64," + data_37;
                    console.log("Captcha image extracted from line 2, base64 length:", data_37.length);
                    console.log("Image data preview:", data_33.substring(0, 80) + "...");
                  } else {
                    console.error("Extracted base64 is too short, length:", data_37.length);
                  }
                }
              }
            }
          }
          if (temp_284 >= 0) {
            const text_56 = result_18[temp_284].trim();
            console.log("Get Slot line 1 found at index", temp_284);
            try {
              let text_57 = text_56.substring(2).trim();
              if (temp_284 < result_18.length - 1) {
                let count_38 = (text_57.match(/\{/g) || []).length - (text_57.match(/\}/g) || []).length;
                let count_39 = temp_284 + 1;
                while (count_38 > 0 && count_39 < result_18.length) {
                  const temp_288 = result_18[count_39].trim();
                  if (temp_288) {
                    text_57 += temp_288;
                    count_38 = (text_57.match(/\{/g) || []).length - (text_57.match(/\}/g) || []).length;
                  }
                  count_39++;
                }
              }
              temp_282 = JSON.parse(text_57);
              console.log("Get Slot parsed line 1:", temp_282);
            } catch (jsonData_271) {
              console.log("Failed to parse line 1:", jsonData_271);
              console.log("JSON string length:", jsonString ? jsonString.length : 0);
            }
          }
          if (!temp_282) {
            console.log("JSON not found in line 1, searching in raw response");
            let temp_289 = result_17.match(/1:\s*(\{[^]*\})/s);
            if (!temp_289) {
              temp_289 = result_17.match(/(\{[^]*"status"[^]*"success"[^]*\})/s);
            }
            if (!temp_289) {
              temp_289 = result_17.match(/(\{[^]*"slot_times"[^]*\})/s);
            }
            if (temp_289 && temp_289[1]) {
              try {
                let count_40 = temp_289[1].trim();
                const count_41 = (count_40.match(/\{/g) || []).length;
                const count_42 = (count_40.match(/\}/g) || []).length;
                if (count_41 > count_42) {
                  count_40 += "}".repeat(count_41 - count_42);
                }
                temp_282 = JSON.parse(count_40);
                console.log("Get Slot parsed from regex match:", temp_282);
              } catch (jsonData_272) {
                console.log("Failed to parse from regex match:", jsonData_272);
                console.log("Attempted JSON string:", temp_289[1].substring(0, 500));
                temp_282 = var_138(result_17, {
                  preferStatusObject: true,
                  label: "Get Slot"
                });
              }
            } else {
              console.log("No JSON pattern found in raw response");
              temp_282 = var_138(result_17, {
                preferStatusObject: true,
                label: "Get Slot"
              });
            }
          }
          console.log("Get Slot final parsed payload:", temp_282);
          if (!temp_282) {
            console.log("Unable to parse get slot response payload");
            hideLoadingIndicator();
            handleAutoRetry("pay-get-slot", null, temp_281);
            return;
          }
          const data_38 = temp_282?.data?.slot_times && Array.isArray(temp_282.data.slot_times) && temp_282.data.slot_times.length > 0;
          const data_39 = temp_282?.data && Array.isArray(temp_282.data?.slot_dates) && temp_282.data.slot_dates.length > 0;
          const temp_290 = data_38 || data_39;
          if (temp_290) {
            autoSequenceState.getSlotCaptchaImage = null;
            let temp_291 = null;
            let data_40 = null;
            if (temp_282?.data?.captcha?.captcha_id) {
              data_40 = temp_282.data.captcha.captcha_id;
              mathCaptchaWidget = data_40;
              localStorage.setItem("captcha_id", data_40);
              console.log("Captcha ID extracted:", data_40);
            }
            if (data_33) {
              temp_291 = data_33;
              console.log("Using captcha image from line 2");
            } else {
              const data_41 = temp_282?.data?.captcha;
              if (data_41 && data_41.captcha_image && data_41.captcha_image !== "$2") {
                temp_291 = data_41.captcha_image || "";
              }
            }
            if (temp_291) {
              let data_42 = temp_291;
              if (temp_291.startsWith("http://") || temp_291.startsWith("https://")) {
                data_42 = temp_291;
              } else if (temp_291.startsWith("data:image/png;base64,")) {
                const data_43 = temp_291.replace("data:image/png;base64,", "");
                const data_44 = data_43.replace(/[^A-Za-z0-9+\/=]/g, "");
                data_42 = "data:image/png;base64," + data_44;
              } else if (temp_291.startsWith("data:image")) {
                data_42 = temp_291;
              } else {
                const data_45 = temp_291.replace(/[^A-Za-z0-9+\/=]/g, "");
                data_42 = "data:image/png;base64," + data_45;
              }
              if (!data_42.match(/^data:image\/[^;]+;base64,[A-Za-z0-9+\/]+=*$/)) {
                console.error("Invalid data URI format, attempting to fix...");
                const data_46 = data_42.match(/base64,([A-Za-z0-9+\/]+=*)/);
                if (data_46 && data_46[1]) {
                  data_42 = "data:image/png;base64," + data_46[1];
                } else {
                  console.error("Could not extract valid base64 from image data");
                  showStatusMessage("Failed to parse captcha image data", "#ff4444");
                  return;
                }
              }
              console.log("Normalized image length:", data_42.length);
              console.log("Normalized image preview:", data_42.substring(0, 100) + "...");
              captchaState.imageData = data_42;
              autoSequenceState.getSlotCaptchaImage = data_42;
              captchaProviderConfig.pay.token = "";
              captchaProviderConfig.pay.enabled = false;
              textCaptchaWidget = null;
              isInitialized = false;
              var_55("pay");
              const element_167 = document.getElementById("cf-btn-paynow-row");
              if (element_167) {
                element_167.textContent = "Load";
                element_167.style.background = "linear-gradient(135deg, #FFEB3B, #FFC107)";
                element_167.style.color = "#333333";
              }
              try {
                var_126(data_42);
                var_123();
                showStatusMessage("Captcha loaded automatically from Get Slot response", "#00FF00");
                if (autoSequenceState.enabled && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.PAY_GET_SLOT) {
                  const element_168 = document.getElementById("appointment_time");
                  const temp_292 = element_168 && element_168.value && element_168.value !== "";
                  if (!temp_292) {
                    const element_169 = document.getElementById("pay-captcha-modal");
                    if (element_169) {
                      element_169.style.display = "flex";
                    }
                  }
                }
              } catch (var_273) {
                console.error("Error displaying captcha image:", var_273);
                showStatusMessage("Failed to display captcha image", "#ff4444");
              }
            }
            if (temp_282?.data && temp_282.data?.slot_times && Array.isArray(temp_282.data.slot_times) && temp_282.data.slot_times.length > 0) {
              const element_170 = document.getElementById("appointment_time");
              if (element_170) {
                element_170.innerHTML = "<option value=\"\">Time</option>";
                let text_58 = 0;
                let temp_293 = null;
                temp_282.data.slot_times.forEach(data_47 => {
                  if (data_47.date === temp_280) {
                    const element_171 = document.createElement("option");
                    element_171.value = data_47.hour;
                    element_171.textContent = data_47.time_display;
                    element_171.dataset.available = data_47.availableSlot;
                    element_170.appendChild(element_171);
                    text_58 += data_47.availableSlot;
                    if (!temp_293 && data_47.availableSlot > 0) {
                      temp_293 = element_171;
                    }
                  }
                });
                const element_172 = document.getElementById("slot-count-display");
                if (element_172) {
                  if (text_58 > 0) {
                    element_172.textContent = "Slots: " + text_58;
                    element_172.style.color = "#00FF00";
                  } else {
                    element_172.textContent = "Slots: 0";
                    element_172.style.color = "#FF0000";
                  }
                }
                if (temp_293) {
                  temp_293.selected = true;
                  temp_293.classList.add("blinking-option");
                  bgdCaptchaWidget = temp_293.value;
                  if (temp_293.value === "09") {
                    payCaptchaWidget = "09:00 - 09:59";
                  } else if (temp_293.value === "10") {
                    payCaptchaWidget = "10:00 - 10:59";
                  } else if (temp_293.value === "11") {
                    payCaptchaWidget = "11:00 - 11:59";
                  } else {
                    payCaptchaWidget = "09:00 - 09:59";
                  }
                  element_170.dispatchEvent(new Event("change"));
                  console.log("Automatically selected first available time slot:", temp_293.textContent);
                  if (typeof var_141 === "function") {
                    var_141();
                  }
                }
                var_84([880, 1760, 880, 1760, 880, 1760], 0.6);
                console.log("Time Slot Found Successfully");
                console.log("Available Slot " + text_58);
                updateButtonStatus(temp_282, "Get Slot", result_17, "Time Slot Found Successfully - Available Slot " + text_58, "Get Slot Failed");
                var_62("paynow");
              } else {
                console.log("No Time Slot Found");
                const element_173 = document.getElementById("slot-count-display");
                if (element_173) {
                  element_173.textContent = "Slots: 0";
                  element_173.style.color = "#FF0000";
                }
                if (autoSequenceState.enabled && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.PAY_GET_SLOT) {
                  if (captchaState.imageData) {
                    const element_174 = document.getElementById("pay-captcha-modal");
                    if (element_174) {
                      element_174.style.display = "flex";
                    }
                  }
                }
              }
            } else {
              console.log("No Time Slot Found");
              const element_175 = document.getElementById("slot-count-display");
              if (element_175) {
                element_175.textContent = "Slots: 0";
                element_175.style.color = "#FF0000";
              }
            }
            if (!data_38 && data_39) {
              console.log("✅ Get Slot Success - Slots found but no time slots available");
              updateButtonStatus(temp_282, "Get Slot", result_17, "Slots Found (No Time Slots Available)", "Get Slot Failed");
              var_89(document.getElementById("get-time-slot-btn"));
              var_82();
              setTimeout(() => resetButtonState(document.getElementById("get-time-slot-btn")), 3000);
              var_62("paynow");
              if (autoRetryState.enabled && autoSequenceState.enabled && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.PAY_GET_SLOT) {
                console.log("✅ Auto ON and AS ON enabled - Auto clicking Set Time button");
                showStatusMessage("Auto Sequence: Slots found without time slots, auto clicking Set Time", "#00FF00");
                autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_SET_TIME;
                setTimeout(() => {
                  if (isButtonEnabled("set-time-btn")) {
                    console.log("✅ Set Time button clicked automatically");
                    showStatusMessage("Auto Sequence: Set Time clicked, opening captcha popup", "#00FF00");
                    setTimeout(() => {
                      const element_176 = document.getElementById("pay-captcha-modal");
                      if (element_176) {
                        element_176.style.display = "flex";
                        showStatusMessage("Auto Sequence: Set Time success, captcha popup opened, waiting for manual solve", "#FFD700");
                        autoSequenceState.currentStep = AUTO_SEQUENCE_STEPS.PAY_CAPTCHA;
                      }
                    }, 1000);
                  }
                }, 1000);
              } else if (autoSequenceState.enabled && autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.PAY_GET_SLOT) {
                if (captchaState.imageData) {
                  const element_177 = document.getElementById("pay-captcha-modal");
                  if (element_177) {
                    element_177.style.display = "flex";
                    showStatusMessage("Auto Sequence: Slots found without time slots, captcha popup opened", "#FFD700");
                  }
                }
              }
            }
          } else {
            console.log("❌ Get Slot: FAILURE - slot_times array not found or empty, and slot_dates not found");
            const element_178 = document.getElementById("get-time-slot-btn");
            handleOperationFailure("pay-get-slot", error_23.status, temp_281, temp_282, result_17, element_178, "Get Slot");
          }
        } catch (datetime_274) {
          console.log("Error Time Slot not found:", datetime_274);
          const element_179 = document.getElementById("get-time-slot-btn");
          handleOperationFailure("pay-get-slot", null, temp_281, null, "", element_179, "Get Slot");
          handleAutoRetry("pay-get-slot", null, temp_281, {
            isNetworkError: true
          });
        }
      }
      eventHandler_178("set-time-btn", "click", () => {
        const temp_294 = "settime";
        var_231(temp_294);
        var_56();
        const element_180 = document.getElementById("appointment_time");
        element_180.innerHTML = "<option value=\"\">Time</option>";
        const temp_295 = [{
          value: "09",
          text: "09:00-09:59",
          formatted: "09:00 - 09:59"
        }, {
          value: "10",
          text: "10:00-10:59",
          formatted: "10:00 - 10:59"
        }, {
          value: "11",
          text: "11:00-11:59",
          formatted: "11:00 - 11:59"
        }];
        temp_295.forEach(data_48 => {
          const element_181 = document.createElement("option");
          element_181.value = data_48.value;
          element_181.textContent = data_48.text;
          element_181.dataset.formatted = data_48.formatted;
          element_180.appendChild(element_181);
        });
        if (element_180.options.length > 1) {
          element_180.selectedIndex = 1;
          bgdCaptchaWidget = element_180.options[1].value;
          payCaptchaWidget = element_180.options[1].dataset.formatted;
          element_180.dispatchEvent(new Event("change"));
          console.log("Time set to: " + element_180.options[1].textContent);
          var_141();
          var_62("settime");
        }
      });
      eventHandler_178("appointment_date", "input", var_141);
      eventHandler_178("appointment_time", "change", function () {
        const element_182 = document.getElementById("appointment_time");
        if (element_182 && element_182.value) {
          bgdCaptchaWidget = element_182.value;
          payCaptchaWidget = element_182.options[element_182.selectedIndex].dataset.formatted;
          console.log("Time changed to: " + payCaptchaWidget);
        }
        var_141();
      });
      eventHandler_178("pay-now", "click", async function (param_32) {
        const button_17 = "paynowbutton";
        var_231(button_17);
        const temp_296 = this.id;
        var_56();
        const temp_297 = editedEndpoints[temp_296];
        if (temp_297) {
          eventHandler_122(temp_297);
        } else {
          eventHandler_122();
        }
      });
      async function eventHandler_122(asyncResult_275 = null) {
        showStatusMessage("Try To Generate Payment Link", "#FFD700");
        var_56();
        const element_183 = document.getElementById("appointment_date");
        const element_184 = document.getElementById("appointment_time");
        const element_185 = document.getElementById("make-payment-btn");
        const element_186 = document.getElementById("copy-payment-link-btn");
        currentCaptchaType = null;
        if (element_185) {
          element_185.style.display = "none";
        }
        if (element_186) {
          element_186.style.display = "none";
          element_186.disabled = true;
          element_186.textContent = "Copy Link";
          element_186.dataset.copied = "false";
        }
        if (!element_183 || !element_184) {
          console.log("Date or time input not found");
          return;
        }
        const temp_298 = element_183.value;
        const temp_299 = element_184.value;
        if (!temp_298 || !temp_299) {
          console.log("Appointment date or time slot is required");
          return;
        }
        const temp_300 = payCaptchaWidget || "09:00 - 09:59";
        showStatusMessage("Trying... To Generate SSL Link", "#FFA500");
        const temp_301 = () => eventHandler_122(asyncResult_275);
        try {
          var_128();
          const delay_54 = await asyncResult_129();
          const url_8 = new URLSearchParams();
          url_8.append("1_appointment_date", temp_298);
          url_8.append("1_appointment_time", temp_300);
          if (captchaProviderConfig.pay.token) {
            url_8.append("1_k5t0g8_token_y4v9f6", captchaProviderConfig.pay.token);
          }
          url_8.append("1_selected_payment[name]", "VISA");
          url_8.append("1_selected_payment[slug]", "visacard");
          url_8.append("1_selected_payment[link]", "https://securepay.sslcommerz.com/gwprocess/v4/image/gw1/visa.png");
          const text_59 = ["$K1", delay_54];
          url_8.append("0", JSON.stringify(text_59));
          console.log("Pay Now payload prepared");
          console.log("Appointment Date:", temp_298);
          console.log("Appointment Time:", temp_300);
          console.log("Captcha Token:", captchaProviderConfig.pay.token);
          console.log("Array Payload:", text_59);
          console.log("URLSearchParams:", url_8.toString());
          const delay_55 = asyncResult_275 || datetime_130("payNow");
          const headers_9 = {
            ...createNextActionHeaders(nextActionConfig.payNowInfo),
            "content-type": "application/x-www-form-urlencoded"
          };
          const error_24 = await fetch(delay_55, {
            method: "POST",
            headers: headers_9,
            credentials: "include",
            referrer: "https://payment.ivacbd.com/application",
            referrerPolicy: "same-origin",
            body: url_8.toString()
          });
          if (!error_24.ok) {
            console.log("Request failed with status " + error_24.status);
            handleAutoSequenceError(error_24.status);
            if (error_24.status === 500 || error_24.status === 502 || error_24.status === 504) {
              hideLoadingIndicator();
            }
            if (element_185) {
              element_185.style.display = "none";
            }
            if (element_186) {
              element_186.style.display = "none";
              element_186.disabled = true;
              element_186.textContent = "Copy Link";
            }
            handleAutoRetry("pay-now", error_24.status, temp_301);
            return;
          }
          const result_19 = await error_24.text();
          console.log("Pay Now raw response:", result_19);
          const count_43 = result_19.split(/\r?\n/);
          let temp_302 = null;
          if (count_43.length >= 2) {
            const temp_303 = count_43[1].trim();
            console.log("Pay Now line 1:", temp_303);
            try {
              let temp_304 = temp_303;
              const temp_305 = temp_303.indexOf(":");
              if (temp_305 > -1) {
                temp_304 = temp_303.slice(temp_305 + 1).trim();
              }
              temp_302 = JSON.parse(temp_304);
              console.log("Pay Now parsed line 1:", temp_302);
            } catch (jsonData_276) {
              console.log("Failed to parse line 1:", jsonData_276);
              temp_302 = var_138(result_19, {
                preferStatusObject: true,
                label: "Pay Now"
              });
            }
          } else {
            temp_302 = var_138(result_19, {
              preferStatusObject: true,
              label: "Pay Now"
            });
          }
          console.log("Pay Now final parsed payload:", temp_302);
          if (!temp_302) {
            console.log("Unable to parse pay now response payload");
            hideLoadingIndicator();
            if (element_185) {
              element_185.style.display = "none";
            }
            if (element_186) {
              element_186.style.display = "none";
              element_186.disabled = true;
              element_186.textContent = "Copy Link";
            }
            handleAutoRetry("pay-now", null, temp_301);
            return;
          }
          const temp_306 = outcome_139(temp_302, result_19, "Slot booking initiated successfully");
          if (temp_306) {
            currentCaptchaType = temp_302?.data?.url || temp_302?.data?.payment_url || temp_302?.url || temp_302?.payment_url || null;
            if (!currentCaptchaType && result_19) {
              const url_9 = result_19.match(/"url"\s*:\s*"([^"]+)"/i) || result_19.match(/url[:\s=]+([^\s,}]+)/i) || result_19.match(/payment[_\s-]?url[:\s=]+([^\s,}]+)/i);
              if (url_9 && url_9[1]) {
                currentCaptchaType = url_9[1].trim();
                console.log("Payment URL extracted from raw response:", currentCaptchaType);
              }
            }
            console.log("Pay Now success - Payment URL:", currentCaptchaType);
            updateButtonStatus(temp_302, "Pay Now", result_19, "Slot booking initiated successfully.", "Pay Now Failed");
            const element_187 = document.getElementById("pay-now");
            if (element_187) {
              element_187.style.display = "none";
            }
            if (element_185) {
              element_185.style.display = "block";
              element_185.style.border = "2px solid #39FF14";
              element_185.style.boxShadow = "\n                            0 0 15px #39FF14,\n                            0 0 25px #39FF14,\n                            0 0 35px #39FF14,\n                            inset 0 0 10px rgba(57, 255, 20, 0.5)\n                        ";
              console.log("✅ Make Payment button displayed");
            } else {
              console.warn("❌ Make Payment button not found");
            }
            if (element_186) {
              element_186.style.display = "block";
              element_186.disabled = false;
              element_186.textContent = "Copy Link";
              element_186.dataset.copied = "false";
              console.log("✅ Copy Link button displayed");
            } else {
              console.warn("❌ Copy Link button not found");
            }
            console.log("Payment Process Started Successfully");
            if (currentCaptchaType) {
              var_84([440, 880, 1760, 3520], 0.5);
              window.open(currentCaptchaType, "_blank");
            } else {
              console.warn("⚠️ Payment URL not found in response - buttons shown but URL missing");
              var_84([440, 880, 1760, 3520], 0.5);
            }
            datetime_111("pay-timer-display");
            var_62("paynowbutton");
            if (autoSequenceState.currentStep === AUTO_SEQUENCE_STEPS.PAY_NOW || checkButtonTextContains("pay-now", "Paid")) {
              if (autoRetryState.enabled) {
                setAutoRetryEnabled(false, "Pay Now success - Auto turned off");
                showStatusMessage("Auto Sequence: Pay Now success - Auto button turned off", "#00FF00");
              }
              resetAutoSequenceState();
            }
          } else {
            console.log("❌ Pay Now: FAILURE - specific success message \"Slot booking initiated successfully\" NOT detected");
            const element_188 = document.getElementById("pay-now");
            if (element_185) {
              element_185.style.display = "none";
            }
            if (element_186) {
              element_186.style.display = "none";
              element_186.disabled = true;
              element_186.textContent = "Copy Link";
            }
            handleOperationFailure("pay-now", error_24.status, temp_301, temp_302, result_19, element_188, "Pay Now");
          }
        } catch (var_277) {
          console.log("Error Payment Process:", var_277);
          const element_189 = document.getElementById("pay-now");
          if (element_185) {
            element_185.style.display = "none";
          }
          if (element_186) {
            element_186.style.display = "none";
            element_186.disabled = true;
            element_186.textContent = "Copy Link";
          }
          handleOperationFailure("pay-now", null, temp_301, null, "", element_189, "Pay Now");
          handleAutoRetry("pay-now", null, temp_301, {
            isNetworkError: true
          });
        }
      }
      eventHandler_178("make-payment-btn", "click", () => {
        if (currentCaptchaType) {
          const element_190 = document.createElement("a");
          element_190.href = currentCaptchaType;
          element_190.target = "_blank";
          element_190.rel = "noopener noreferrer";
          document.body.appendChild(element_190);
          element_190.click();
          document.body.removeChild(element_190);
          console.log("Opening payment URL in new tab...");
        } else {
          console.log("No payment URL available");
          showStatusMessage("No payment URL available", "#ff4444");
        }
      });
      eventHandler_178("copy-payment-link-btn", "click", async () => {
        if (!currentCaptchaType) {
          console.log("No payment URL available to copy");
          showStatusMessage("No payment URL available to copy", "#ff9800");
          return;
        }
        const element_191 = document.getElementById("copy-payment-link-btn");
        const text_60 = element_191 ? element_191.textContent : "Copy Link";
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(currentCaptchaType);
          } else {
            const element_192 = document.createElement("textarea");
            element_192.value = currentCaptchaType;
            element_192.style.position = "fixed";
            element_192.style.opacity = "0";
            document.body.appendChild(element_192);
            element_192.focus();
            element_192.select();
            document.execCommand("copy");
            document.body.removeChild(element_192);
          }
          if (element_191) {
            element_191.textContent = "Copied!";
            element_191.dataset.copied = "true";
            setTimeout(() => {
              if (element_191.dataset.copied === "true") {
                element_191.textContent = text_60;
                element_191.dataset.copied = "false";
              }
            }, 2000);
          }
          showStatusMessage("Payment link copied to clipboard", "#00FF00");
          console.log("Payment link copied to clipboard");
        } catch (outcome_278) {
          console.error("Failed to copy payment link", outcome_278);
          if (element_191) {
            element_191.textContent = text_60;
            element_191.dataset.copied = "false";
          }
          showStatusMessage("Failed to copy link. Please copy manually.", "#ff9800");
        }
      });
      function var_141() {
        const element_193 = document.getElementById("pay-now");
        const element_194 = document.getElementById("appointment_date");
        const element_195 = document.getElementById("appointment_time");
        const element_196 = document.getElementById("make-payment-btn");
        const element_197 = document.getElementById("copy-payment-link-btn");
        const temp_307 = element_194 && element_194.value.trim() !== "";
        const temp_308 = element_195 && element_195.value !== "";
        const temp_309 = !!currentCaptchaType;
        if (temp_309) {
          if (element_193) {
            element_193.style.display = "none";
          }
          return;
        }
        if (element_193) {
          element_193.style.display = "block";
          if (temp_307 && temp_308) {
            element_193.style.background = "linear-gradient(135deg, #FF1493, #FF69B4)";
            element_193.textContent = "Pay Now (VISA)";
            element_193.disabled = false;
          } else {
            element_193.style.background = "linear-gradient(135deg, #808080, #A9A9A9)";
            element_193.textContent = "Pay Now (VISA)";
            element_193.disabled = true;
          }
        }
        if (element_196) {
          element_196.style.display = "none";
        }
        if (element_197) {
          element_197.style.display = "none";
          element_197.disabled = true;
          element_197.textContent = "Copy Link";
          element_197.dataset.copied = "false";
        }
        currentCaptchaType = null;
      }
      function var_279(var_280, htmlContent_281) {
        const element_198 = document.getElementById(var_280);
        if (element_198) {
          element_198.style.background = "linear-gradient(135deg, #FF4081, #F50057)";
          element_198.style.color = "#000000";
          element_198.style.boxShadow = "0 0 10px #FF4081";
          element_198.textContent = htmlContent_281;
        }
      }
      function var_235(var_282, htmlContent_283, colorValue_284 = "linear-gradient(135deg, #2196F3, #03A9F4)") {
        const element_199 = document.getElementById(var_282);
        if (element_199) {
          element_199.style.background = colorValue_284;
          element_199.style.color = "#ffffff";
          element_199.style.boxShadow = "";
          element_199.textContent = htmlContent_283;
        }
      }
      function var_177() {
        console.log("Aborting all pending requests...");
        pendingOperations.forEach(item_11 => {
          try {
            item_11.abort();
            console.log("Aborted pending request");
          } catch (var_285) {
            console.error("Error aborting request:", var_285);
          }
        });
        pendingOperations = [];
        console.log("All pending requests aborted");
      }
      function var_286() {
        var_177();
        clearAllAutoRetryTimers();
        if (refreshTimers.continueTimeout) {
          clearTimeout(refreshTimers.continueTimeout);
          refreshTimers.continueTimeout = null;
        }
        if (refreshTimers.refreshInterval) {
          clearInterval(refreshTimers.refreshInterval);
          refreshTimers.refreshInterval = null;
        }
      }
      function showStatusMessage(htmlContent_287, colorValue_288 = "#ffffff") {
        const element_200 = document.getElementById("status-panel");
        if (element_200) {
          element_200.textContent = htmlContent_287;
          element_200.style.color = colorValue_288;
          element_200.style.fontSize = "12px";
          element_200.style.fontWeight = "bold";
          element_200.style.textShadow = "0 0 5px rgba(0,0,0,0.5)";
        }
      }
      function var_140() {
        ["login", "bgd", "pay"].forEach(item_12 => {
          var_55(item_12);
        });
      }
      function var_167() {
        const element_201 = document.getElementById("cfp-btn-paynow-row");
        if (element_201) {
          if (captchaProviderConfig.pay.enabled && captchaProviderConfig.pay.token) {
            element_201.style.background = "linear-gradient(135deg, #FF9800, #FF5722)";
            element_201.style.border = "2px solid #39FF14";
            element_201.style.boxShadow = "\n                        0 0 10px #39FF14,\n                        0 0 20px #39FF14,\n                        0 0 30px #39FF14,\n                        0 0 40px #39FF14,\n                        inset 0 0 10px rgba(57, 255, 20, 0.5)\n                    ";
          } else if (captchaProviderConfig.pay.enabled) {
            element_201.style.background = "linear-gradient(135deg, #FF9800, #FF5722)";
            element_201.style.border = "2px solid #FF9800";
            element_201.style.boxShadow = "0 0 15px #FF9800, 0 0 25px #FF9800";
          } else {
            element_201.style.background = "linear-gradient(135deg, #2196F3, #03A9F4)";
            element_201.style.border = "none";
            element_201.style.boxShadow = "";
          }
        }
      }
      function eventHandler_117() {
        const temp_310 = {
          highcom: highcom,
          ivac_id: ivac_id,
          visa_type: visa_type,
          visit_purpose: visit_purpose,
          webfile_id: webfile_id,
          family_count: family_count,
          familyData: familyData
        };
        const text_61 = temp_310;
        const data_49 = JSON.stringify(text_61, null, 2);
        const data_50 = "data:application/json;charset=utf-8," + encodeURIComponent(data_49);
        const config_6 = "ivac_config.json";
        const element_202 = document.createElement("a");
        element_202.setAttribute("href", data_50);
        element_202.setAttribute("download", config_6);
        element_202.click();
        showStatusMessage("Configuration exported successfully", "#00FF00");
      }
      function eventHandler_116() {
        const element_203 = document.createElement("input");
        element_203.type = "file";
        element_203.accept = ".json";
        element_203.onchange = element_204 => {
          const text_62 = element_204.target.files[0];
          const text_63 = new FileReader();
          text_63.readAsText(text_62, "UTF-8");
          text_63.onload = response_1 => {
            try {
              const result_20 = response_1.target.result;
              const temp_311 = JSON.parse(result_20);
              highcom = temp_311.highcom || highcom;
              ivac_id = temp_311.ivac_id || ivac_id;
              visa_type = temp_311.visa_type || visa_type;
              visit_purpose = temp_311.visit_purpose || visit_purpose;
              webfile_id = temp_311.webfile_id || webfile_id;
              family_count = temp_311.family_count || family_count;
              familyData = temp_311.familyData || familyData;
              payloadData.app.highcom = highcom;
              payloadData.app.ivac_id = ivac_id;
              payloadData.app.visa_type = visa_type;
              payloadData.app.visit_purpose = visit_purpose;
              payloadData.app.webfile_id = webfile_id;
              payloadData.app.family_count = family_count;
              payloadData.app.webfile_id_repeat = webfile_id;
              const data_51 = [];
              for (let data_52 = 0; data_52 < family_count; data_52++) {
                if (data_52 < familyData.length) {
                  const temp_312 = {
                    name: familyData[data_52].name,
                    webfile_no: familyData[data_52].webfile_no,
                    again_webfile_no: familyData[data_52].webfile_no
                  };
                  data_51.push(temp_312);
                } else {
                  data_51.push({
                    name: "",
                    webfile_no: "",
                    again_webfile_no: ""
                  });
                }
              }
              payloadData.personal.family = data_51;
              const config_7 = {
                highcom: highcom,
                ivac_id: ivac_id,
                visa_type: visa_type,
                visit_purpose: visit_purpose,
                webfile_id: webfile_id,
                family_count: family_count,
                familyData: familyData
              };
              localStorage.setItem("ivac_user_config", JSON.stringify(config_7));
              showStatusMessage("Configuration imported successfully", "#00FF00");
            } catch (message_289) {
              showStatusMessage("Error importing configuration: " + message_289.message, "#ff4444");
            }
          };
        };
        element_203.click();
      }
      var_73();
      timer_11 = setInterval(timerCallback_161, 2000);
      console.log("Widget initialized. CAPTCHA verification will start when needed.");
    };
    initializeWidget();
  };
  // Direct execution without authorization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      mainScript();
    });
  } else {
    mainScript();
  }
})();
