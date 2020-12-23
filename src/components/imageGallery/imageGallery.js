import { useState, useEffect } from 'react';
import imageFinderApi from '../imagefinderApi';
import ImageGalleryItem from './imageGalleryItem';
import BtnLoadMore from '../button/button';
import Spiner from '../spiner/spiner';
import Modal from '../modal/modal';

export default function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setPageNumber(1);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    if (searchQuery !== '' && pageNumber === 1) {
      setStatus('pending');

      imageFinderApi(searchQuery, pageNumber).then(imagesOfAPI => {
        setImages(imagesOfAPI);
        setStatus('resolved');
      });
    }

    if (searchQuery !== '' && pageNumber !== 1) {
      setStatus('pending');

      imageFinderApi(searchQuery, pageNumber)
        .then(imagesOfAPI => {
          setImages(prevState => [...prevState, ...imagesOfAPI]);

          setStatus('resolved');
        })
        .finally(() =>
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          }),
        );
    }
  }, [pageNumber, searchQuery]);

  if (status === 'idle') {
    return <div></div>;
  }

  if (status === 'pending') {
    return (
      <div>
        <ul className="ImageGallery">
          {images && <ImageGalleryItem images={images} />}
        </ul>
        <Spiner />;
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div>
        <ul className="ImageGallery">
          <ImageGalleryItem
            images={images}
            getLargeImageURL={largeImageURL => {
              setShowModal(!showModal);
              setLargeImageURL(largeImageURL);
            }}
          />
        </ul>
        <BtnLoadMore onClick={() => setPageNumber(pageNumber + 1)} />
        {showModal && (
          <Modal
            onClose={() => setShowModal(!showModal)}
            largeImageURL={largeImageURL}
          />
        )}
      </div>
    );
  }
}
