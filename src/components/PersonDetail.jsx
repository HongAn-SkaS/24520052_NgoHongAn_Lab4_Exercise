import { useParams } from 'react-router-dom';
import { SMART_PEOPLE } from '../data'; 

export default function PersonDetail() {
  const { id } = useParams();
  const person = SMART_PEOPLE.find((p) => p.id === id);

  if (!person) {
    return (
      <div className="not-found-state" role="alert" style={{ color: 'red' }}>
        <h2>404: Person Not Found</h2>
        <p>Người bạn tìm kiếm không tồn tại trong danh bạ.</p>
      </div>
    );
  }

  return (
    <article className="person-details">
      <h2>Chi tiết: {person.name}</h2>
      <dl>
        <dt>Họ và Tên</dt>
        <dd>{person.name}</dd>
        
        <dt>Tuổi</dt>
        <dd>{person.age}</dd>
        
        <dt>Chỉ số IQ</dt>
        <dd>{person.iq}</dd>
      </dl>
    </article>
  );
}