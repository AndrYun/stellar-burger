import {
  FC,
  MouseEvent,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalElement = document.getElementById('modal') as HTMLElement;

interface IModal {
  onClose: () => void;
  size: any;
  children: ReactNode;
}

const Modal: FC<IModal> = ({ onClose, children, size }): ReactPortal => {
  const [isHoveredModalCross, setIsHoveredMadalCross] =
    useState<boolean>(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
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
    <ModalOverlay data-testid="modal-overlay" onClose={onClose}>
      <section
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}
      >
        <button
          onMouseEnter={(): void => setIsHoveredMadalCross(true)}
          onMouseLeave={(): void => setIsHoveredMadalCross(false)}
          className={styles.modal_close}
          onClick={onClose}
          data-testid="modal-close"
        >
          <CloseIcon type={isHoveredModalCross ? 'primary' : 'secondary'} />
        </button>
        {children}
      </section>
    </ModalOverlay>,
    modalElement
  );
};

export default Modal;
