import React from 'react';
import Modal from 'react-modal';
import Icon from './Icon';

import styles from './CustomModal.module.scss';

Modal && Modal.setAppElement && Modal.setAppElement('#___gatsby');

const CustomModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.handleClose}
    contentLabel="Modal"
    className={styles.content}
    overlayClassName={styles.overlay}
  >

    <div>
      <div className={styles.modalInnerStyle}>
        {props.children}
        <button
          data-testid="modal-close"
          onClick={props.handleClose}
          className={styles.modalCloseStyle}
        >
          <Icon name="cross" />
          <span className="u-visually-hidden">Fermer</span>
        </button>
      </div>
    </div>


  </Modal>
);

export default CustomModal;
