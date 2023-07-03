import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export default function App() {

  const [galleryName, setGalleryName] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');

    useEffect(() => {
    if (galleryName === '') {
      return;
    }

    const fetchData = async () => {
      try {
        setStatus('pending');

        const response = await fetch(
          `https://pixabay.com/api/?q=${galleryName}&page=${page}&key=37532394-4be77775868909c78ad8f61fa&image_type=photo&orientation=horizontal&per_page=12`
        );
        const galleryData = await response.json();
        const { hits, totalHits } = galleryData;

        setGallery([...gallery, ...hits]);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
    };

    fetchData();
  }, [galleryName, page,gallery]);

  const handleFormSubmit = galleryName => {
    setGalleryName(galleryName)
    setPage(1)
    setTotalHits(0)
  };

  const handleButtonMore = () => {
    setPage(prevPage => prevPage + 1)
  };

  // const handleGalleryData = (hits, totalHits) => {
  //   setGallery(prevGallery => [...prevGallery, ...hits])
  //   setTotalHits(totalHits)
  // };

    return (
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          galleryName={galleryName}
          page={page}
          onGalleryData
            status = { status }
            gallery={ gallery }
        />
        { gallery.length < totalHits && gallery.length > 0 && <Button handleButtonMore={handleButtonMore} />}
      </div>
    );
}