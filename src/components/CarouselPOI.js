import React, { Component } from 'react';
import Link from 'gatsby-link';
import Carousel from 'nuka-carousel';

import Icon from './Icon';

import './CarouselPOI.scss';

const iArray = count => Array.from(Array(count).keys());

const CustomCarouselButton = ({ onClick, className, text }) => (
  <button className={className} onClick={onClick}>
    <Icon name="arrow-top" />
    <span className="u-visually-hidden">{text}</span>
  </button>
);

const CustomCarouselPrev = ({ onClick, classNamePrefix }) => (
  <CustomCarouselButton
    onClick={onClick}
    className={`${classNamePrefix}__prev`}
    text="Précédent"
  />
);

const CustomCarouselNext = ({ onClick, classNamePrefix }) => (
  <CustomCarouselButton
    onClick={onClick}
    className={`${classNamePrefix}__next`}
    text="Suivant"
  />
);

const CustomCarouselItemList = ({ classNamePrefix, slideCount, currentSlide, goToSlide }) => (
  <div className={`${classNamePrefix}__control-list`}>
    {iArray(slideCount).map(slide => (
      <button
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

const CarouselPOI = props => {
  const { className, posts } = props;

  return (
    <div className={className}>
      <h1 className={`${className}__title`}>Les sites remarquables de Loire-Atlantique</h1>

      <div className={`${className}__for-print`} aria-hidden="true">
        {posts
          .filter(post => post.node.frontmatter.templateKey === 'poi')
          .map(({ node: post }) => (
            <div className={`${className}__for-print-item`} key={post.id}>
              <img className={`${className}__for-print-img`} src={post.frontmatter.picture} alt="" />
              <div className={`${className}__for-print-content`}>
                <h2 className={`${className}__for-print-title`}>{post.frontmatter.title}</h2>
                <p className={`${className}__for-print-desc`}>{post.excerpt}</p>
              </div>
            </div>
          ))}
      </div>

      <Carousel
        className={`${className}__list`}
        renderCenterLeftControls={({ previousSlide }) =>
          <CustomCarouselPrev onClick={previousSlide} classNamePrefix={className} />}
        renderCenterRightControls={({ nextSlide }) =>
          <CustomCarouselNext onClick={nextSlide} classNamePrefix={className} />}
        renderBottomCenterControls={() => {}}
        renderBottomLeftControls={params =>
          <CustomCarouselItemList {...params} classNamePrefix={className} />}
      >
        {posts
          .filter(post => post.node.frontmatter.templateKey === 'poi')
          .map(({ node: post }) => (
            <div className={`${className}__item`} key={post.id}>
              <img className={`${className}__img`} src={post.frontmatter.picture} alt="" />
              <div className={`${className}__content`}>
                <h2 className={`${className}__item-title`}>{post.frontmatter.title}</h2>
                <Link className={`${className}__button`} to={post.fields.slug}>
                  Découvrir
                </Link>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselPOI;
