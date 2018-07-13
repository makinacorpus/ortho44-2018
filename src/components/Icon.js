import React from 'react';

const Icon = data => {
  const { name } = data;
  if (!name) {
    return null;
  }
  return (
    <svg className="u-icon" aria-hidden="true" focusable="false">
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
