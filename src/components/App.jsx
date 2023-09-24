import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { getImg, PER_PAGE } from 'services/pixabay-api';

export default function App() {
  const [queryImg, setQueryImg] = useState('');
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (!queryImg) return;
    if (page === 1) setStatus('pending');

    const fenchImg = async () => {
      try {
        const images = await getImg(queryImg, page);

        setGallery(prev => [...prev, ...images.hits]);
        setStatus('resolved');
        setTotalPage(images.totalHits / PER_PAGE);
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    };

    fenchImg();
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
