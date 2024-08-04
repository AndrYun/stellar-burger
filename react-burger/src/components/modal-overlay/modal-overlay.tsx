import { ReactNode, FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose, children }) => {
  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
