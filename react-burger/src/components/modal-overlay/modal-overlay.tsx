import { ReactNode, FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
  'data-testid'?: string;
}

const ModalOverlay: FC<IModalOverlayProps> = ({
  onClose,
  children,
  'data-testid': testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={styles.modal_overlay}
      onClick={onClose}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
