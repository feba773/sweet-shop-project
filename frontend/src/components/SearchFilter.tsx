// src/components/SearchFilter.tsx
import { useState } from 'react';

interface SearchFilterProps {
  onSearch: (params: { name?: string; category?: string }) => void;
}

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onSearch({ name, category });
  };

  return (
    <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
      <h3>Search Sweets</h3>
      <input
        type="text"
        placeholder="Search by name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Search by category..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;