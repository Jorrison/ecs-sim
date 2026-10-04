import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<RouterProvider router={router} />);
}
