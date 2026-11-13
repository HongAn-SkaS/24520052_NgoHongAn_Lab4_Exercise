import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import PeopleLayout from './components/PeopleLayout';
import PersonDetail from './components/PersonDetail';
import './App.css'; // 1 dấu chấm vì App.jsx nằm cùng thư mục src với App.css

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
        element: <PersonDetail />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}