import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchQuery.trim() === '') {
      alert('Enter text, please');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="name"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value.toLowerCase())}
        />
      </form>
    </header>
  );
}
