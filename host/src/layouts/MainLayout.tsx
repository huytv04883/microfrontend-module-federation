import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <main className="h-full flex flex-col">
        <Outlet />
      </main>
    </>
  );
}