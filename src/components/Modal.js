import React, { Component } from "react";
import Link from "gatsby-link";
import { ModalContainer, ModalRoute } from "react-router-modal";
import { BrowserRouter } from "react-router-dom";
import Icon from './Icon';

import "react-router-modal/css/react-router-modal.css";
import "./Modal.scss";

class Modal extends Component {
  constructor() {
    super();

    this.state = {
      display: false
    };
  }

  openModal = () => {
    this.setState({
      display: true
    });
  };

  closeModal = () => {
    this.setState({
      display: false
    });
  };

  Modal = item => {
    const itemSearched = this.props.query.allMarkdownRemark.edges.filter(
      content => content.node.fields.slug === `${item.match.path}/`
    );
    return (
      <div className="c-modal">
         <button className="c-modal__close" onClick={this.closeModal}>
          <Icon name="cross" />
          <span className="u-visually-hidden">Fermer</span>
         </button>
         <div className="c-modal__container">
          <div className="c-modal__content">
            <h1 className="c-modal__title u-site__title">{itemSearched[0].node.frontmatter.title}</h1>
            <div className="t-md" dangerouslySetInnerHTML={{__html: itemSearched[0].node.html}} />
          </div>
         </div>
      </div>
    )
  };

  render() {
    const { to, link } = this.props;
    return (
      <BrowserRouter>
        <div>
          <Link
            to={to}
            onClick={this.openModal}
            className={link.className}
          >
            {link.label}
          </Link>
          {this.state.display && (
            <ModalRoute
              component={this.Modal}
              path={to}
              parentPath="/"
            />
          )}
          <ModalContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Modal;
