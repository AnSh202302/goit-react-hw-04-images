import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ img }) {
  return (
    <ul className="ImageGallery">
      {img.map(el => (
        <ImageGalleryItem img={el} key={el.id} />
      ))}
    </ul>
  );
}
