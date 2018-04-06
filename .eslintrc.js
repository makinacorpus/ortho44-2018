module.exports = {
  extends: 'makina',
  globals: {
    graphql: true,
  },
  rules: {
    'import/no-extraneous-dependencies': ['off'],
    'react/forbid-prop-types':           ['off'],
    'react/no-danger':                   ['off'],
    'react/require-default-props':       ['off'],
  },
};
