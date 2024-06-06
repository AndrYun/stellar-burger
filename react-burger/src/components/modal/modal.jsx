import { useEffect, useState } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modalElement = document.getElementById('modal');

const Modal = ({ onClose, children, size }) => {
  const [isHoveredModalCross, setIsHoveredMadalCross] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <section
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onMouseEnter={() => setIsHoveredMadalCross(true)}
          onMouseLeave={() => setIsHoveredMadalCross(false)}
          className={styles.modal_close}
          onClick={onClose}
        >
          <CloseIcon type={isHoveredModalCross ? 'primary' : 'secondary'} />
        </button>
        {children}
      </section>
    </ModalOverlay>,
    modalElement
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['ingredient', 'order']).isRequired,
};

export default Modal;
