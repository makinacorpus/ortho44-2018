import React from 'react';
import classnames from 'classnames';
import GatsbyLink from 'gatsby-link';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';

import classes from './CustomCarousel.module.scss';
import { Button, ButtonContextual, Icon } from './cd44';

const renderIndicator = (handleClick, isSelected, index) => (
  <Button
    iconAfter={false}
    className={classnames(
      classes.indicator,
      { [classes.currentIndicator]: isSelected },
    )}
    onClick={handleClick}
  >
    {index + 1}
  </Button>
);

const renderArrowNext = (handleClick, hasNext) => hasNext && (
  <div
    role="button"
    tabIndex={0}
    onClick={handleClick}
    onKeyDown={handleClick}
    className={classnames(classes.arrow, classes.arrowNext)}
  >
    <Icon type="right" />
  </div>
);

const renderArrowPrev = (handleClick, hasPrev) => hasPrev && (
  <div
    role="button"
    tabIndex={0}
    onClick={handleClick}
    onKeyDown={handleClick}
    className={classnames(classes.arrow, classes.arrowPrev)}
  >
    <Icon type="left" />
  </div>
);

const CustomCarousel = ({ className, items = [], ...props }) => (
  <div className={classnames(className, classes.carousel)} {...props}>
    <Carousel
      showThumbs={false}
      dynamicHeight
      showStatus={false}
      renderIndicator={renderIndicator}
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
    >
      {items.map(item => (
        <div className={classes.slide} key={item.frontmatter.title}>
          <img className="" src={item.frontmatter.picture} alt="" />

          <div className={classes.slideAction}>
            <div className={classes.title}>
              {item.frontmatter.title}
            </div>

            <ButtonContextual component={GatsbyLink} to={item.fields.slug}>
              Découvrir
            </ButtonContextual>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default CustomCarousel;
