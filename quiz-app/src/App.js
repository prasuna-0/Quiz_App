import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from './Components/LogIn';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <>
          <Navbar/>
            <LogIn/>
          </>
        ),
      },
      {
        path: "/quiz",
        element: (
          <ProtectedRoute>
          <>
          <Navbar/>
            <Quiz/>
            
          </>
          </ProtectedRoute>
        ),
      },
  {
        path: "/result",
        element: (
          <ProtectedRoute>

          <>
          <Navbar/>
            <Result/>
            
          </>
          </ProtectedRoute>
        ),
      },

    ])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
