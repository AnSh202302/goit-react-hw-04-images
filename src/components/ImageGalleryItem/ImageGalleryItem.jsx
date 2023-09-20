import Modal from 'components/Modal/Modal';
import { useState } from 'react';

export default function ImageGalleryItem({
  img: { webformatURL, tags, largeImageURL },
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li className="ImageGalleryItem" onClick={() => setShowModal(true)}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
      </li>
      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}
