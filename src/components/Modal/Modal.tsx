import React from 'react';
import ReactModal from 'react-modal';
import styles from 'src/components/Modal/Modal.module.scss';

ReactModal.setAppElement('#root')

type ModalProps = {
    visible: boolean
    title?: any
    onClose?: () => void
    onConfirm?: () => void
    shouldCloseOnOverlayClick?: boolean
}

const Modal: React.FC<ModalProps> = ({visible, onConfirm, onClose, title, shouldCloseOnOverlayClick = false, children}) => {
    return(
        <ReactModal
            isOpen={visible}
            contentLabel="GeoVis Modal"
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            className={styles.modal}
            // overlayClassName={styles.overlay}
        >

            <div className={styles.modalHeader}>
                {title && <h4 className={styles.modalTitle}>{title}</h4>}
                <div className={styles.closeView}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            </div>

            <div className={styles.modalBody}>
                {children}
            </div>

            {onConfirm && <div className={styles.modalFooter}>
                <button onClick={onConfirm}>
                    OK
                </button>
            </div>}
        </ReactModal>
    )
}

export default Modal
