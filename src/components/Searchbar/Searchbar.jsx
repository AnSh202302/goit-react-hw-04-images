import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

export default function Searchbar({ onSubmit }) {
  const [imgSearch, setImgSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (imgSearch.trim() === '') {
      return alert('Enter value!');
    }
    onSubmit(imgSearch);
    setImgSearch('');
  };
  const handleImgSearchChange = e => {
    setImgSearch(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className="searchbar">
      <form className="searchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <BsSearch size={20} />
        </button>

        <input
          value={imgSearch}
          className="SearchForm-input "
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleImgSearchChange}
        />
      </form>
    </header>
  );
}
