import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './Components/Routing-Core/Root';
import RouteError from './Components/Routing-Core/Route-Error';
import UdemyChildRoutes from './Components/Udemy/Udemy-Child-Routes';
import SuspenseWrapper from './Routing-Config/Suspense-Wrapper';
import { CartContextProvider } from './Context/Cart-Context/Cart-Context';
import VehicleOverview from './Components/Vehicle/Vehicle-Overview/Vehicle-Overview';
const UdemyOverview = lazy(() => import('./Components/Udemy/Udemy.Overview'));
const GameOverview = lazy(() => import('./Components/Game/Game-Overview/Game-Overview'));

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <RouteError />, children: [
      {
        path: '/movies', element: <SuspenseWrapper>
          <GameOverview />
        </SuspenseWrapper>
      },
      {
        path: '/udemy', element: <SuspenseWrapper>
          <UdemyOverview />
        </SuspenseWrapper>, children: UdemyChildRoutes
      },
      {
        path: 'vehicle', element: <VehicleOverview />
      }
    ]
  },
])

function App() {
  return (
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  );
}

export default App;
