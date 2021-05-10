import React from 'react';
import Link from 'gatsby-link';

import classes from './Header.module.scss';

const Header = () => (
  <header role="banner" className={classes.header}>
    <div className={classes.headerInner}>
      <Link to="/">
        <img src="/img/logo-cd44.svg" alt="La Loire-atlantique vue du ciel" className={classes.logo} />
      </Link>
    </div>
  </header>
);

export default Header;
