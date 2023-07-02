import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ largeImageURL, tags, closeModal }) {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);

    const handleBackdropClick = (event) => {
        if (event.target !== event.currentTarget) {
            closeModal();
        }
    };

    return createPortal(
        <div className={css.Overlay} onClick={handleBackdropClick}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={tags} />
            </div>
        </div>,
        modalRoot
    );
}

Modal.propTypes = {
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};