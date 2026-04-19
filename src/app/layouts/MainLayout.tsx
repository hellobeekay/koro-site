import { Outlet } from 'react-router';
import { Navigation } from '../components/Navigation';

export function MainLayout() {
  return (
    <div className="relative bg-black min-h-screen">
      <Navigation />
      <Outlet />
    </div>
  );
}
