import { useState } from 'react';
import Searchbar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

export default function App() {

  // state = {
  //   galleryName: '',
  //   page: 1,
  //   totalHits: 0,
  //   gallery: []
  // };

  const [galleryName, setGalleryName] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [gallery, setGallery] = useState([]);

  const handleFormSubmit = galleryName => {
    // this.setState({ galleryName, page: 1, totalHits: 0 });
    setGalleryName(galleryName)
    setPage(1)
    setTotalHits(0)
  };

  const handleButtonMore = () => {
    setPage(prevPage => prevPage.page + 1)
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  const handleGalleryData = (hits, totalHits) => {
    setGallery(prevGallery => [...prevGallery, ...hits])
    setTotalHits(totalHits)
    // this.setState(prevState => ({
    //   gallery: [...prevState.gallery, ...hits],
    //   totalHits
    // }));
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