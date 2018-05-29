import React, { Component } from 'react';
import Link from 'gatsby-link';
import Carousel from 'nuka-carousel';

import Icon from './Icon';

import './CarouselPOI.scss';

const CarouselPOI = props => {
  const { className, posts } = props;

  return (
    <div className={className}>
      <h1 className={`${className}__title`}>Les sites remarquables de Loire-Atlantique</h1>
      <Carousel
        className={`${className}__list`}
        renderCenterLeftControls={({ previousSlide }) => (
          <button className={`${className}__prev`} onClick={previousSlide}>
            <Icon name="arrow-top" />
            <span className="u-visually-hidden">Précédent</span>
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button className={`${className}__next`} onClick={nextSlide}>
            <Icon name="arrow-top" />
            <span className="u-visually-hidden">Suivant</span>
          </button>
        )}
        renderBottomCenterControls={() => {}}
        renderBottomLeftControls={({
          slideCount,
          currentSlide,
          goToSlide,
        }) => (
          <div className={`${className}__control-list`}>
            {Array.apply(0, Array(slideCount)).map((slide, index) => (
              <button
                className={`${className}__control`}
                key={index} // eslint-disable-line react/no-array-index-key
                onClick={() => goToSlide(index)}
                data-active={currentSlide === index}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
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
