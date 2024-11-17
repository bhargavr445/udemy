import { Suspense } from "react";

const SuspenseWrapper = ({fallback=<div>Loading...</div>, children}) => {

   return <Suspense fallback={fallback}>{children}</Suspense>

}

export default SuspenseWrapper;