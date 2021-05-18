const Orejime = require('orejime');
require('orejime/dist/orejime.css');
const { orejimeConfig } = require('./orejime-config');

exports.onRouteUpdate = () => {
  const orejimeInstance = Orejime.init(orejimeConfig);
  window.orejimeInstance = orejimeInstance;
  window.orejimeConfig = orejimeConfig;
};
