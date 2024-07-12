const {configBuild} = require("@testing/wdio-config");
const {config} = require("./base.conf");

const device = {
  platformName: "iOS",
  platformVersion: "13.2",
  'appium:deviceName': "iPhone XS Simulator",
  'appium:appiumVersion': "1.16.0",
  'appium:orientation': 'PORTRAIT',
};

exports.web = {
  ...device,
  browserName: "Safari",
};

exports.config = configBuild(config, {
  baseUrl: 'http://localhost:8001/index.html',
  capabilities: [exports.web]
}, process.env.GRID_USER ? {} : {
  port: 4723,
  services: ['appium']
});
