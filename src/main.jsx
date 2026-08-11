import React from "react";
import ReactDOM from "react-dom/client";
import EventPage from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { ContactPage } from "./pages/ContactPage";
import { Provider } from "./components/ui/provider";
import { EventProvider } from "./components/EventContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <EventsPage />,
      },
      {
        path: "event/:eventId",
        element: <EventPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <EventProvider>
        <RouterProvider router={router} />
        <Toaster />
      </EventProvider>
    </Provider>
  </React.StrictMode>,
);
