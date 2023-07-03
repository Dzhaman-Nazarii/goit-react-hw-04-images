import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';

export default function ImageGallery({status, gallery }) {

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <h1>Виникла помилка</h1>;
  }

  if (status === 'resolved') {
    return (
      <ul className={css.ImageGallery}>
        {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  gallery: PropTypes.array.isRequired
};
