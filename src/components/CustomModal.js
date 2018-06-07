import React from 'react';
import Modal from 'react-modal';
import Icon from './Icon';

const modalStyle = {
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
};

const modalInnerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#fff',
  margin: 'auto',
  maxHeight: 'calc(100vh - 6rem)',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
};

const modalCloseStyle = {
  cursor: 'pointer',
  color: '#fff',
  fontSize: '2rem',
  position: 'absolute',
  top: '1rem',
  right: '1rem',
};

Modal && Modal.setAppElement && Modal.setAppElement('#___gatsby');

const CustomModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.handleClose}
    style={modalStyle}
    contentLabel="Modal"
  >

    <div>
      <div style={modalInnerStyle}>
        {props.children}
        <button
          data-testid="modal-close"
          onClick={props.handleClose}
          style={modalCloseStyle}
        >
          <Icon name="cross" />
          <span className="u-visually-hidden">Fermer</span>
        </button>
      </div>
    </div>


  </Modal>
);

export default CustomModal;
