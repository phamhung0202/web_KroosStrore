import React from 'react';
import Button from '../Button/Button';
import styles from './Modal.module.css';

const Modal = ({ isOpen, title, message, type = 'alert', onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.message}>{message}</div>
        <div className={styles.actions}>
          {type === 'confirm' && (
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          )}
          <Button 
            variant={type === 'confirm' ? 'danger' : 'primary'} 
            onClick={onConfirm}
          >
            {type === 'confirm' ? 'Delete' : 'OK'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
