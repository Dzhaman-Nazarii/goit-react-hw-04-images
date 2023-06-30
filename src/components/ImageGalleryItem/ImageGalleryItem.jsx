import { useState } from "react";
import PropTypes from 'prop-types';
import Modal from "components/Modal/Modal";
import css from './ImageGalleryItems.module.css'

export default function ImageGalleryItem({ id, src, alt, largeImageURL }) {

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(!showModal)
    };

        return (
            <li key={id} className={css.ImageGalleryItem} onClick={toggleModal}>
                <img className={css.ImageGalleryItemImage} src={src} alt={alt} loading="lazy" />
                {showModal && (
                    <Modal
                        largeImageURL={largeImageURL}
                        tags={alt}
                        closeModal={toggleModal}
                    />
                )}
            </li>
        );
}

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};