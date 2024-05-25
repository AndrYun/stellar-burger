import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
const modalElement = document.getElementById('modal');

const ModalOverlay = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay} onClick={onClose}>
      {children}
    </div>,
    modalElement
  );
};

export default ModalOverlay;
