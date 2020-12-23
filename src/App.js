import { useState } from 'react';
import Searchbar from './components/searchbar/searchbar';
import ImageGallery from './components/imageGallery/imageGallery';
import './App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Searchbar onSubmit={query => setSearchQuery(query)} />
      <ImageGallery searchQuery={searchQuery} />
    </div>
  );
}
