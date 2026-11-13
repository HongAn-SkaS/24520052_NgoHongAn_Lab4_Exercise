import { createContext, useContext } from 'react';

export const FormContext = createContext(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext phải được dùng bên trong FormProvider');
  }
  return context;
}