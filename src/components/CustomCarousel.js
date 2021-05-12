import React from 'react';
import classnames from 'classnames';
import GatsbyLink from 'gatsby-link';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

import classes from './CustomCarousel.module.scss';
import { ButtonContextual } from './cd44';

const CustomCarousel = ({ className, items = [], ...props }) => (
  <div className={classnames(className, classes.root)} {...props}>
    <Carousel showThumbs={false} dynamicHeight showStatus={false}>
      {items.map(item => (
        <div className={classes.slide}>
          <img className="" src={item.frontmatter.picture} alt="" />
          <div className={classes.slideAction}>
            <div className={classes.title}>
              {item.frontmatter.title}
            </div>

            <ButtonContextual component={GatsbyLink}>Découvrir</ButtonContextual>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default CustomCarousel;
