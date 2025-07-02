import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./root";
import NewTransaction from "@/components/transactions/new";
import ShowTransaction from "@/components/transactions/show";
import Home from "@/components/home";
import Help from "@/components/help";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new",
        element: <NewTransaction />,
      },
      {
        path: "/txn/:id",
        element: <ShowTransaction />,
      },
      {
        path: "/help",
        element: <Help />,
      }
    ]
  },
], { basename: '/' });

export default <RouterProvider router={router} />;
