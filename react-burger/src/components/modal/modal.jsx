import PropTypes from 'prop-types';
import styles from './modal.module.css';

const Modal = ({ onClose, children }) => {
  return (
    <section
      className={styles.modal_content}
      onClick={(e) => e.stopPropagation()}
    >
      <button className={styles.modal_close} onClick={onClose}>
        &times;
      </button>
      {children}
    </section>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
