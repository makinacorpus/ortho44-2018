import React from 'react';
import classnames from 'classnames';

export const Icon = React.forwardRef(({ className, type = 'info', ...props }, ref) => (
  <i
    ref={ref}
    className={classnames(className, 'icon', `icon-${type}`)}
    aria-hidden="true"
    {...props}
  />
));

export default Icon;
