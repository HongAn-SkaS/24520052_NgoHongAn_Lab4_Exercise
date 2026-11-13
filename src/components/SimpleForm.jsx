import { useState } from 'react';
import { FormContext } from '../context/FormContext';
import InputField from './InputField';

// 3. Hàm validate chạy ĐỒNG BỘ (Synchronous) - Không cần useEffect
function validateForm(values) {
  const errors = {};
  if (!values.email) errors.email = 'Email không được để trống';
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email không hợp lệ';
  
  if (!values.password) errors.password = 'Mật khẩu không được để trống';
  else if (values.password.length < 6) errors.password = 'Mật khẩu phải từ 6 ký tự';
  
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }
  return errors;
}

export default function SimpleForm() {
  const [values, setValues] = useState({ email: '', password: '', confirmPassword: '' });
  
  // DERIVED STATE: Tính toán lỗi ngay trong lúc render
  const errors = validateForm(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      alert(JSON.stringify(values, null, 2));
    }
  };

  return (
    <FormContext.Provider value={{ values, errors, handleChange }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '20px auto' }}>
        <h2>Đăng Ký</h2>
        <InputField name="email" label="Email" type="email" />
        <InputField name="password" label="Mật khẩu" type="password" />
        <InputField name="confirmPassword" label="Xác nhận mật khẩu" type="password" />
        
        <button type="submit" disabled={!isValid} style={{ marginTop: '10px' }}>
          Gửi
        </button>
      </form>
    </FormContext.Provider>
  );
}