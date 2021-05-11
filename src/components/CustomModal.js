import React from 'react';
import Modal from 'react-modal';
import Icon from './Icon';

import styles from './CustomModal.module.scss';

Modal && Modal.setAppElement && Modal.setAppElement('#___gatsby');

const CustomModal = ({ isOpen, handleClose, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    contentLabel="Modal"
    className={styles.content}
    overlayClassName={styles.overlay}
  >

    <button
      type="button"
      data-testid="modal-close"
      onClick={handleClose}
      className={styles.closeButton}
    >
      <Icon name="cross" />
      <span className="u-visually-hidden">Fermer</span>
    </button>

    <div className={styles.inner}>
      {children}
    </div>

  </Modal>
);

export default CustomModal;
