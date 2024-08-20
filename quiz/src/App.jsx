
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './first.jsx'
import './App.css'
import Signup from './signup.jsx'
import AuthPage from './Authpage.jsx'
import QuizPage from './QuizPage.jsx';
import ResultPage from './ResultPage.jsx';  
const router = createBrowserRouter([
  { path: "/", element: <Index /> }, // Route for login page
  { path: "/signup", element: <Signup /> }, // Route for signup page
  { path: "/auth", element: <AuthPage /> }, // Authenticated page or dashboard
  { path: "/quiz", element: <QuizPage /> },  // Route for quiz page
   { path: "/result", element: <ResultPage /> },  // Define route for ResultPage
  { path: "/login", element: <Index/> },
  
  
]);
function App() {
  return(
    <RouterProvider router={router} />
   
  )
}
export default App;
