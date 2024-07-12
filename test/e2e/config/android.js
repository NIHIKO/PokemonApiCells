const {configBuild} = require("@testing/wdio-config");
const {config} = require("./base.conf");

const device = {
  platformName: "Android",
  platformVersion: "10.0",
  'appium:deviceName': "Google Pixel 3 GoogleAPI Emulator",
  'appium:automationName': "UiAutomator2",
  'sauce:options': { "appiumVersion": "1.16.0" }
}

exports.web = {
  ...device,
  browserName: "chrome",
};

exports.config = configBuild(config, {  
  baseUrl: 'http://localhost:8001/index.html',
  capabilities: [exports.web],
}, process.env.GRID_USER ? {} : {
  port: 4723,
  services: ['appium']
});