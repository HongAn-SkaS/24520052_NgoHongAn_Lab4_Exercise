import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react'; 

import PeopleLayout from './components/PeopleLayout';
import Skeleton from './components/Skeleton';
import SimpleForm from './components/SimpleForm'; // Thêm import này
import './App.css'; 

const PersonDetail = lazy(() => import('./components/PersonDetail'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/people" replace /> 
  },
  {
    path: '/people',
    element: <PeopleLayout />,
    children: [
      {
        path: ':id',
        element: (
          <Suspense fallback={<Skeleton />}>
            <PersonDetail />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/register', // Thêm Route mới cho Form
    element: <SimpleForm />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}