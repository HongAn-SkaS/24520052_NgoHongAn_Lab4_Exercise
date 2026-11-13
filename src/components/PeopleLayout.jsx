import { useId, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { SMART_PEOPLE } from '../data'; // Chú ý: 2 dấu chấm
import '../App.css'; // Chú ý: 2 dấu chấm

export default function PeopleLayout() {
  const searchInputId = useId();
  const minIqInputId = useId();
  const sortSelectId = useId();
  const navigate = useNavigate();

  const [people, setPeople] = useState(SMART_PEOPLE);
  const [searchTerm, setSearchTerm] = useState('');
  const [minIQ, setMinIQ] = useState(Number.NaN);
  const [sortBy, setSortBy] = useState('iq-desc');

  const deleteButtonRefs = useRef(new Map());
  const pendingFocusTarget = useRef({ type: 'none', id: null });
  const resetButtonRef = useRef(null);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredPeople = people.filter((person) => {
    const matchesName = person.name.toLowerCase().includes(normalizedSearchTerm);
    const matchesIQ = Number.isNaN(minIQ) || person.iq >= minIQ;
    return matchesName && matchesIQ;
  });

  const sortedPeople = filteredPeople.toSorted((personA, personB) => {
    switch (sortBy) {
      case 'iq-asc': return personA.iq - personB.iq;
      case 'iq-desc': return personB.iq - personA.iq;
      case 'age-asc': return personA.age - personB.age;
      case 'age-desc': return personB.age - personA.age;
      default: return 0;
    }
  });

  useLayoutEffect(() => {
    const pendingTarget = pendingFocusTarget.current;
    if (pendingTarget.type === 'none') return;

    if (pendingTarget.type === 'person') {
      const targetButton = deleteButtonRefs.current.get(pendingTarget.id);
      if (targetButton) targetButton.focus();
      else resetButtonRef.current?.focus();
    } else {
      resetButtonRef.current?.focus();
    }
    pendingFocusTarget.current = { type: 'none', id: null };
  }, [people]);

  function handleDelete(personId, e) {
    e.preventDefault(); 
    e.stopPropagation(); // Ngăn chặn sự kiện click lan sang thẻ khác

    if (window.location.pathname.includes(personId)) {
       navigate('/people'); 
    }

    const currentIndex = sortedPeople.findIndex((person) => person.id === personId);
    const nextPerson = sortedPeople[currentIndex + 1] ?? sortedPeople[currentIndex - 1];

    pendingFocusTarget.current = nextPerson
      ? { type: 'person', id: nextPerson.id }
      : { type: 'reset', id: null };

    setPeople((currentPeople) => currentPeople.filter((person) => person.id !== personId));
  }

  function handleReset() {
    setPeople(SMART_PEOPLE);
    setSearchTerm('');
    setMinIQ(Number.NaN);
    setSortBy('iq-desc');
  }

  return (
    // SỬ DỤNG CLASS CSS GRID MỚI
    <main className="master-detail-layout">
      
      {/* CỘT TRÁI: MASTER (Bộ lọc + Danh sách) */}
      <div className="master-panel">
        <header className="directory__header">
          <h1>Directory</h1>
        </header>

        <section className="directory__controls" aria-label="Directory filters">
          <div className="form-field">
            <label htmlFor={searchInputId}>Search</label>
            <input id={searchInputId} type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} />
          </div>
          <div className="form-field">
            <label htmlFor={minIqInputId}>Min IQ</label>
            <input id={minIqInputId} type="number" value={Number.isNaN(minIQ) ? '' : minIQ} onChange={(e) => setMinIQ(e.currentTarget.valueAsNumber)} />
          </div>
          <div className="form-field">
            <label htmlFor={sortSelectId}>Sort</label>
            <select id={sortSelectId} value={sortBy} onChange={(e) => setSortBy(e.currentTarget.value)}>
              <option value="iq-desc">IQ: High to Low</option>
              <option value="iq-asc">IQ: Low to High</option>
            </select>
          </div>
        </section>

        <section className="directory__results" aria-label="Directory results">
          <div className="directory__toolbar">
            <p role="status" aria-live="polite">{sortedPeople.length} found</p>
            <button ref={resetButtonRef} type="button" onClick={handleReset}>Reset</button>
          </div>

          <ul className="people-list">
            {sortedPeople.map((person) => (
              <li key={person.id}>
                <NavLink 
                  to={`/people/${person.id}`}
                  className={({ isActive }) => isActive ? 'active-link' : 'link'}
                >
                  {person.name}
                </NavLink>
                <button
                  ref={(el) => {
                    if (el) deleteButtonRefs.current.set(person.id, el);
                    else deleteButtonRefs.current.delete(person.id);
                  }}
                  type="button"
                  onClick={(e) => handleDelete(person.id, e)}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CỘT PHẢI: DETAIL (Nội dung thay đổi) */}
      <div className="detail-panel">
        <Outlet /> 
      </div>

    </main>
  );
}