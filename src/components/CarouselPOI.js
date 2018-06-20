import React from 'react';
import Carousel from 'nuka-carousel';
import {
  CustomCarouselPrev,
  CustomCarouselNext,
  CustomCarouselItemList,
  CustomCarouselSlide,
} from './CarouselPOIElements';

import './CarouselPOI.scss';

const CarouselPOI = props => {
  const { className, posts, headerContent } = props;
  const filteredPosts = posts
    .filter(post => post.node.frontmatter.templateKey === 'poi')
    .filter(post => post.node.frontmatter.promote);

  return (
    <div className={className}>
      <div className="t-md" dangerouslySetInnerHTML={headerContent} />

      <div className={`${className}__for-print`} aria-hidden="true">
        {filteredPosts
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
        {filteredPosts
          .map(({ node }) => (
            <CustomCarouselSlide
              key={node.id}
              node={node}
              classNamePrefix={className}
            />
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselPOI;
