"use strict";

exports.onRouteUpdate = function (_ref) {
  var location = _ref.location;
  const isPush = _ref.action === 'PUSH';

  // Don't track while developing.
  if (isPush && process.env.NODE_ENV === "production" && typeof ga === "function") {
    if (location && typeof window.excludeGAPaths !== "undefined" && window.excludeGAPaths.some(function (rx) {
      return rx.test(location.pathname);
    })) {
      return;
    }
    window.ga("set", "page", location ? location.pathname + location.search + location.hash : undefined);
    window.ga("send", "pageview");
  }
};