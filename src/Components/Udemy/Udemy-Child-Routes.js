import { lazy } from "react";
import { Navigate } from "react-router-dom";
import SuspenseWrapper from "../../Routing-Config/Suspense-Wrapper.js";
const Purchase = lazy(() => import('./Sections/Purchase/Purchase.js'));
const Create  = lazy(() => import("./Sections/Create/Create.js"));

const UdemyChildRoutes = [
  { index: true, element: <Navigate to="purchase" /> },
  {
    path: 'purchase', element: <SuspenseWrapper fallback={<div>Loading....</div>}>
      <Purchase />
    </SuspenseWrapper>
  },
  { path: 'create', element: <SuspenseWrapper fallback={<div>Loading....</div>}>
  <Create />
</SuspenseWrapper> }
];

export default UdemyChildRoutes;