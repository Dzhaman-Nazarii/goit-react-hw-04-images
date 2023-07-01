import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImageURL, tags, closeModal }) {

    const handleKeyDown = (event) => {
        if (event.code === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, [])

    const handleBackdropClick = (event) => {
        if (event.target !== event.currentTarget) {
            closeModal();
        }
    };

    useEffect(() => {
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

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
