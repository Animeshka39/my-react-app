import React, { 
  useState, 
  useEffect, 
  useMemo, 
  useCallback, 
  useReducer, 
  useRef, 
  useContext, 
  createContext 
} from 'react';


const ThemeContext = createContext('light');


function reducer(state, action) {
  if (action.type === 'LOADED') {
    return { items: action.payload, loading: false };
  }
  return state;
}

export default function ProductApp() {
  
  const theme = useContext(ThemeContext);

  
  const [data, dispatch] = useReducer(reducer, { items: [], loading: true });

  
  const [search, setSearch] = useState('');

 
  const inputRef = useRef(null);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'LOADED',
        payload: [
          { id: 1, name: 'MacBook Pro' },
          { id: 2, name: 'iPhone 16' },
          { id: 3, name: 'AirPods' }
        ]
      });
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

 
  const clearSearch = useCallback(() => {
    setSearch('');
    inputRef.current.focus(); 
  }, []);

 
  const filtered = useMemo(() => {
    return data.items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data.items, search]);

  if (data.loading) return <p>Завантаження...</p>;

  return (
    <div style={{ padding: '20px', background: theme === 'dark' ? '#333' : '#fff' }}>
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