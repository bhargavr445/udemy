import { lazy } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './Components/Routing-Core/Root';
import RouteError from './Components/Routing-Core/Route-Error';
import UdemyChildRoutes from './Components/Udemy/Udemy-Child-Routes';
import University from './Components/University/University';
import VehicleOverview from './Components/Vehicle/Vehicle-Overview/Vehicle-Overview';
import { CartContextProvider } from './Context/Cart-Context/Cart-Context';
import SuspenseWrapper from './Routing-Config/Suspense-Wrapper';
import store from './store/Store';
const UdemyOverview = lazy(() => import('./Components/Udemy/Udemy.Overview'));
const GameOverview = lazy(() => import('./Components/Game/Game-Overview/Game-Overview'));


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <RouteError />, children: [
      {
        path: '/movies', element: <SuspenseWrapper><GameOverview /> </SuspenseWrapper>
      },
      {
        path: '/udemy', element: <SuspenseWrapper> <UdemyOverview /> </SuspenseWrapper>, children: UdemyChildRoutes
      },
      {
        path: 'vehicle', element: <VehicleOverview />
      },
      {
        path: 'university', element: <University />
      }
    ]
  },
])

function App() {
  
  return (
    <CartContextProvider>
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    </CartContextProvider>
  );
}

export default App;
