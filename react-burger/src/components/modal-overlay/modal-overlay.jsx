import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import { useEffect } from 'react';
const modalElement = document.getElementById('modal');

const ModalOverlay = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay} onClick={onClose}>
      {children}
    </div>,
    modalElement
  );
};

export default ModalOverlay;
