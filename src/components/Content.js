import React from 'react';
import PropTypes from 'prop-types';

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

HTMLContent.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export default Content;
