import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./root";
import ExchangeForm from "@/components/transactions/exchange_form";
import SuccessInfo from "@/components/common/success_info";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/new",
        element: <ExchangeForm />,
      },
      {
        path: "/success",
        element: <SuccessInfo />,
      }
    ]
  },
], { basename: '/' });

export default <RouterProvider router={router} />;
