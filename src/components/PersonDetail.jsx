import { useParams } from 'react-router-dom';
import { SMART_PEOPLE } from '../data'; // 2 dấu chấm
import '../App.css'; // 2 dấu chấm

export default function PersonDetail() {
  const { id } = useParams();
  const person = SMART_PEOPLE.find((p) => p.id === id);

  if (!person) {
    return (
      <div role="alert" style={{ color: 'red' }}>
        <h2>404: Not Found</h2>
        <p>Người này không tồn tại!</p>
      </div>
    );
  }

  return (
    <article className="person-card">
      <h2>{person.name}</h2>
      <dl className="person-card__details">
        <dt>Age</dt>
        <dd>{person.age}</dd>
        <dt>IQ</dt>
        <dd>{person.iq}</dd>
      </dl>
    </article>
  );
}