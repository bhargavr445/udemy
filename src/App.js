import { lazy } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './Components/Routing-Core/Root';
import RouteError from './Components/Routing-Core/Route-Error';
import UdemyChildRoutes from './Components/Udemy/Udemy-Child-Routes';
import University from './Components/University/University';
import VehicleOverview from './Components/Vehicle/Vehicle-Overview/Vehicle-Overview';
import { CartContextProvider } from './Context/Cart-Context/Cart-Context';
import SuspenseWrapper from './Routing-Config/Suspense-Wrapper';
import store from './store/Store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Components/login/Login';
import UniversityTanstrack from './Components/university-tanstrack/universityTanstrack';
import { UserProfileContextProvider } from './Context/userProfileContext';
import UserProfileCheck from './Commons/Components/UserProfileCheck';
const UdemyOverview = lazy(() => import('./Components/Udemy/Udemy.Overview'));
const GameOverview = lazy(() => import('./Components/Game/Game-Overview/Game-Overview'));


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <RouteError />, children: [
      { index: true, element: <Navigate to="login" /> },
      {
        path: 'login', element: <Login />
      },
      {
        path: '/movies', element: <SuspenseWrapper><GameOverview /> </SuspenseWrapper>
      },
      {
        path: '/udemy', element: <SuspenseWrapper> <UdemyOverview /> </SuspenseWrapper>, children: UdemyChildRoutes
      },
      {
        path: 'vehicle', element: <UserProfileCheck permission={'U_INSTRUCTOR'}> <VehicleOverview /></UserProfileCheck>
      },
      {
        path: 'university', element: <University />
      },
      {
        path: 'university-tanstrack', element: <UniversityTanstrack />
      }
    ]
  },
])
const query = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <UserProfileContextProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
        </UserProfileContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;
