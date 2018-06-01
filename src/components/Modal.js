import React from 'react';
import Modal from 'react-modal';
import Icon from './Icon';
import { navigateTo } from 'gatsby-link';

const GatsbyGramModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={() => navigateTo('/')}
    style={{
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 5,
      },
      content: {
        position: 'absolute',
        border: 'none',
        background: 'none',
        padding: 0,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        overflow: 'auto',
      },
    }}
    contentLabel="Modal"
  >
    <div>
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          margin: 'auto',
          maxHeight: 'calc(100vh - 6rem)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {props.children({
          location: { pathname: props.location.pathname },
        })}
      </div>
    </div>
    <button
      data-testid="modal-close"
      onClick={() => navigateTo('/')}
      style={{
        cursor: 'pointer',
        color: '#fff',
        fontSize: '2rem',
        position: 'absolute',
        top: '1rem',
        right: '1rem',
      }}
    >
      <Icon name="cross" />
      <span className="u-visually-hidden">Fermer</span>
    </button>
  </Modal>
);

export default GatsbyGramModal;
