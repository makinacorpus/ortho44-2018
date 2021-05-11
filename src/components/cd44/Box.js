import React from 'react';
import classnames from 'classnames';

export const Box = ({ className, children, ...props }) => (
  <section
    className={classnames(className, 'ds44-box', 'ds44-theme', 'ds44-mb3')}
    {...props}
  >
    <div className="ds44-innerBoxContainer">
      {children}
    </div>
  </section>
);

export default Box;
