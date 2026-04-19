import { createBrowserRouter, RouterProvider } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ContactPage } from './pages/ContactPage';
import { GraveyardPage } from './pages/GraveyardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'work', element: <WorkPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
  {
    path: '/graveyard',
    element: <GraveyardPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
