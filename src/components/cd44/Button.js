import React from 'react';
import classnames from 'classnames';

export const Button = React.forwardRef(({
  className,
  children,
  iconBefore = null,
  iconAfter = (<i className="icon icon-long-arrow-right" aria-hidden="true" />),
  ...props
}, ref) => (
  <button
    ref={ref}
    type="button"
    className={classnames('ds44-btnStd', className)}
    {...props}
  >
    {iconBefore}
    <span className="ds44-btnInnerText">{children}</span>
    {iconAfter}
  </button>
));

export const ButtonInverted = React.forwardRef(({ className, ...props }, ref) => (
  <Button ref={ref} className={classnames(className, 'ds44-btn--invert')} {...props} />
));

export const ButtonContextual = React.forwardRef(({ className, ...props }, ref) => (
  <Button ref={ref} className={classnames(className, 'ds44-btn--contextual')} {...props} />
));

export const IconButton = React.forwardRef(({ label, type, icon, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className="ds44-btnIco ds44-btnIco--carre ds44-bgDark"
    {...props}
  >
    {Boolean(icon) && icon}
    {Boolean(type) && <i className={`icon icon-${type}`} aria-hidden="true" />}
    {Boolean(label) && <span className="visually-hidden">{label}</span>}
  </button>
));
