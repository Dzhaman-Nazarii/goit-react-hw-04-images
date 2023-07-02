import { useState } from 'react';
import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export default function App() {

  const [galleryName, setGalleryName] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [gallery, setGallery] = useState([]);

  const handleFormSubmit = galleryName => {
    setGalleryName(galleryName)
    setPage(1)
    setTotalHits(0)
  };

  const handleButtonMore = () => {
    setPage(prevPage => prevPage + 1)
  };

  const handleGalleryData = (hits, totalHits) => {
    setGallery(prevGallery => [...prevGallery, ...hits])
    setTotalHits(totalHits)
  };

    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          galleryName={galleryName}
          page={page}
          onGalleryData={handleGalleryData}
        />
        { gallery.length < totalHits && gallery.length > 0 && <Button handleButtonMore={handleButtonMore} />}
      </div>
    );
}