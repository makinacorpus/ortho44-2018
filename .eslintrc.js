module.exports = {
  parser: 'babel-eslint',
  extends: 'makina',
  globals: {
    graphql: true,
  },
  rules: {
    'import/no-extraneous-dependencies': ['off'],
    'react/forbid-prop-types':           ['off'],
    'react/no-danger':                   ['off'],
    'react/require-default-props':       ['off'],
    'react/destructuring-assignment': ['warn'],
    'react/jsx-fragments': ['off'],
    'jsx-a11y/label-has-associated-control': ['warn', { assert: 'either' }],
  },
};
