import { useId } from 'react';
import { useFormContext } from '../context/FormContext';

export default function InputField({ name, label, type = 'text' }) {
  // 1. Dùng useId để đảm bảo binding Accessibility
  const id = useId();
  const errorId = `${id}-error`;
  
  // 2. Lấy state và hàm thay đổi từ Context
  const { values, errors, handleChange } = useFormContext();
  const error = errors[name];

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={values[name] || ''}
        onChange={handleChange}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} role="alert" style={{ color: 'red', fontSize: '12px' }}>
          {error}
        </span>
      )}
    </div>
  );
}