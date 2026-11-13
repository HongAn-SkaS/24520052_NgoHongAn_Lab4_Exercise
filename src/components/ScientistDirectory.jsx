// src/components/ScientistDirectory.jsx
import { useId, useState } from 'react';
import { SMART_PEOPLE } from '../data/data';

export function ScientistDirectory() {
  const qId = useId();
  const iqId = useId();

  // 1. Single source of truth
  const [people, setPeople] = useState(SMART_PEOPLE);
  const [query, setQuery] = useState('');
  const [minIq, setMinIq] = useState(160);
  const [sortBy, setSortBy] = useState('iq-desc');

  // 2. Derived State (Tính toán trực tiếp khi render - Không dùng useEffect)
  const visible = people
    .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()) && p.iq >= minIq)
    .toSorted((a, b) => (sortBy === 'iq-desc' ? b.iq - a.iq : a.age - b.age));

  return (
    <section aria-label='Pioneer Directory'>
      <form role='search' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={qId}>Name</label>
        <input 
          id={qId} 
          type='search' 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        
        <label htmlFor={iqId}>Min IQ</label>
        <input 
          id={iqId} 
          type='number' 
          value={minIq} 
          onChange={(e) => setMinIq(Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)} 
        />
      </form>

      <output role='status' aria-live='polite'>Found {visible.length} pioneers</output>
      
      <ul>
        {visible.map((p) => (
          <li key={p.id}>
            {p.name} — IQ {p.iq} — Age {p.age}
          </li>
        ))}
      </ul>
    </section>
  );
}