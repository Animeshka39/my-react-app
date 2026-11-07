import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useStore } from './useStore';

export default function ProductApp() {
  const theme = useStore((state) => state.theme);
  const items = useStore((state) => state.items);
  const loading = useStore((state) => state.loading);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const fetchProducts = useStore((state) => state.fetchProducts);

  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const clearSearch = useCallback(() => {
    setSearch('');
    inputRef.current.focus();
  }, []);

  const filtered = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  if (loading) return <p>Завантаження...</p>;

  return (
    <div style={{ padding: '20px', background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
      <button onClick={toggleTheme} style={{ marginBottom: '10px' }}>
        Тема: {theme}
      </button>
      <br />

      <input 
        ref={inputRef}
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Пошук..." 
      />
      <button onClick={clearSearch}>Очистити</button>

      <ul>
        {filtered.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}