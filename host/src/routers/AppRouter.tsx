import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './Routes';

function RouterContent() {
  return useRoutes(routes);
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
}
