const React = require('react');

/**
 * pmtiles is loaded as a static script, not through webpack:
 * Gatsby 1 (webpack 1 + UglifyJS 2) cannot build its ES2015+ code.
 * The file is copied from node_modules by `npm run copy-vendor`.
 */
exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script key="pmtiles" src="/vendor/pmtiles.js" />,
  ]);
};
