import { useEffect, useRef, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { getImg } from 'services/pixabay-api';

export default function App() {
  const [queryImg, setQueryImg] = useState('');
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (!queryImg) return;
    if (!gallery) setStatus('pending');

    getImg(queryImg, page)
      .then(res => res.json())
      .then(img => {
        setGallery(prev => [...prev, ...img.hits]);
        setStatus('resolved');
        setTotalPage(img.totalHits / 12);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, queryImg]);

  const handleFormSubmit = imgValue => {
    setQueryImg(imgValue);
    setGallery([]);
    setPage(1);
  };
  const handleButtonClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'rejected' && <p> {error.message}</p>}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <ImageGallery img={gallery} />}
      {gallery.length !== 0 && page < totalPage && (
        <Button type="button" className="Button" onClick={handleButtonClick}>
          Load more
        </Button>
      )}
    </div>
  );
}
