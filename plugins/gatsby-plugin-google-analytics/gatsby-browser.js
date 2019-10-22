"use strict";

exports.onRouteUpdate = function (_ref) {
  var location = _ref.location;

  // Don't track while developing.
  if (process.env.NODE_ENV === "production" && typeof ga === "function") {
    if (location && typeof window.excludeGAPaths !== "undefined" && window.excludeGAPaths.some(function (rx) {
      return rx.test(location.pathname);
    })) {
      return;
    }
    window.ga("set", "page", location ? location.pathname + location.search + location.hash : undefined);

    const path = location ? location.pathname + location.search : undefined;
    if (path !== window.prevPath) {
      window.ga("send", "pageview");
    }
    window.prevPath = path;
  }
};
