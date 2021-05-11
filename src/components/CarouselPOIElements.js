import React from 'react';
import Link from 'gatsby-link';

import Icon from './Icon';
import mediaTypes from '../helpers/mediaTypes';

const iArray = count => Array.from(Array(count).keys());

export const CustomCarouselButton = ({ onClick, className, text }) => (
  <button type="button" className={className} onClick={onClick}>
    <Icon name="arrow-top" />
    <span className="u-visually-hidden">{text}</span>
  </button>
);

export const CustomCarouselPrev = ({ onClick, classNamePrefix }) => (
  <CustomCarouselButton
    onClick={onClick}
    className={`${classNamePrefix}__prev`}
    text="Précédent"
  />
);

export const CustomCarouselNext = ({ onClick, classNamePrefix }) => (
  <CustomCarouselButton
    onClick={onClick}
    className={`${classNamePrefix}__next`}
    text="Suivant"
  />
);

export const CustomCarouselItemList = ({
  classNamePrefix,
  slideCount,
  currentSlide,
  goToSlide,
}) => (
  <div className={`${classNamePrefix}__control-list`}>
    {iArray(slideCount).map(slide => (
      <button
        type="button"
        className={`${classNamePrefix}__control`}
        key={slide}
        onClick={() => goToSlide(slide)}
        data-active={currentSlide === slide}
      >
        {slide + 1}
      </button>
    ))}
  </div>
);

export const CustomCarouselSlide = ({ node, classNamePrefix }) => (
  <div className={`${classNamePrefix}__item`}>
    <img className={`${classNamePrefix}__img`} src={node.frontmatter.picture} alt="" />
    <img className={`${classNamePrefix}__type-img`} src={mediaTypes[node.frontmatter.media_type]} alt={node.frontmatter.media_type} />
    <div className={`${classNamePrefix}__content`}>
      <h2 className={`${classNamePrefix}__item-title`}>{node.frontmatter.title}</h2>
      <Link className={`${classNamePrefix}__button`} to={node.fields.slug}>
        Découvrir
      </Link>
    </div>
  </div>
);
