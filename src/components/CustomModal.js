import React from 'react';
import Modal from 'react-modal';
import { Icon } from './cd44';

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
      onClick={handleClose}
      className={styles.closeButton}
    >
      <Icon type="cross" /><br />
      fermer
    </button>

    <div className={styles.inner}>
      {children}
    </div>

  </Modal>
);

export default CustomModal;
