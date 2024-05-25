import styles from './modal.module.css';

const Modal = ({ onClose, children }) => {
  return (
    <section
      className={styles.modal_content}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Детали ингредиента</h2>
      <button className={styles.modal_close} onClick={onClose}>
        &times;
      </button>
      {children}
    </section>
  );
};

export default Modal;
