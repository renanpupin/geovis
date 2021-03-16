import React from 'react';
import ReactModal from 'react-modal';
import styles from 'src/components/Modal/Modal.module.scss';

ReactModal.setAppElement('#root')

type ModalProps = {
    visible: boolean
    title?: any
    onClose: () => void
    onConfirm: () => void
}

const Modal: React.FC<ModalProps> = ({visible, onConfirm, onClose, title, children}) => {
    return(
        <ReactModal
            isOpen={visible}
            contentLabel="GeoVis Modal"
            onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}
            className={styles.modal}
            // overlayClassName={styles.overlay}
        >
            <div className={styles.modalHeader}>
                {title && <h2 className={styles.modalTitle}>{title}</h2>}
            </div>

            <div className={styles.modalBody}>
                {children}
            </div>

            <div className={styles.modalFooter}>
                <button onClick={onConfirm}>
                    OK
                </button>
            </div>
        </ReactModal>
    )
}

export default Modal
