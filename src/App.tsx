import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GithubActionsPage from "./catalog/github-actions/GithubActionsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/github-actions",
    element: <GithubActionsPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
