import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';

export default function ImageGallery({ galleryName, page, onGalleryData }) {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (galleryName === '') {
      return
    }

    const fetchData = async () => {
      try {
        setStatus('pending');

        const response = await fetch(
          `https://pixabay.com/api/?q=${galleryName}&page=${page}&key=37532394-4be77775868909c78ad8f61fa&image_type=photo&orientation=horizontal&per_page=12`
        );
        const galleryData = await response.json();
        const { hits, totalHits } = galleryData;

        setGallery(prevGallery => [...prevGallery, ...hits]);
        setStatus('resolved');

        onGalleryData(hits, totalHits);
      } catch (error) {
        setStatus('rejected');
      }
    };

    if (galleryName && (galleryName !== '' || page !== 1)) {
      fetchData();
    }
  }, [galleryName, page, onGalleryData]);

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
  galleryName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onGalleryData: PropTypes.func.isRequired
};
