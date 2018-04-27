import React from 'react';
import Link from 'gatsby-link';

import github from '../img/github-icon.svg';
import logo from '../img/logo.svg';

const Navbar = () => (
  <nav>
    <div>
      <Link to="/">
        <figure>
          <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
        </figure>
      </Link>
    </div>
    <div>
      <Link to="/about">
        About
      </Link>
      <Link to="/products">
        Products
      </Link>
    </div>
    <div>
      <a
        href="https://github.com/AustinGreen/gatsby-netlify-cms-boilerplate"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <img src={github} alt="Github" />
        </span>
      </a>
    </div>
  </nav>
);

export default Navbar;
