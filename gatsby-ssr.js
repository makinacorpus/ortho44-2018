const React = require('react');

/**
 * pmtiles is loaded as a static script, not through webpack:
 * Gatsby 1 (webpack 1 + UglifyJS 2) cannot build its ES2015+ code.
 */
exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script key="pmtiles" src="/vendor/pmtiles-4.5.0.js" />,
  ]);
};
