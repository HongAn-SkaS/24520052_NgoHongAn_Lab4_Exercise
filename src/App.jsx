import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react'; 

import PeopleLayout from './components/PeopleLayout';
import Skeleton from './components/Skeleton';
import './App.css'; 

// 1. Code Splitting: Dynamic import PersonDetail
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
        // 2. Bọc trong Suspense để hiển thị Skeleton khi đang tải JS
        element: (
          <Suspense fallback={<Skeleton />}>
            <PersonDetail />
          </Suspense>
        )
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}