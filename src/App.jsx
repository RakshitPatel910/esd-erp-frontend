import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState( false );

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if( authToken != null ){
      console.log(authToken);
      setIsAuthenticated( true );
    }
  }, []);

  const handleOnLogin = () => {
    console.log("handleOnLogin triggered");
    setIsAuthenticated( true );

    console.log(isAuthenticated);
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={ isAuthenticated ? (
                      <Home/>
                    ) : (
                      // <Navigate to='/login' replace/>  
                      <Login onLogin={handleOnLogin} />
                    )
          }
        />
        {/* <Route path='/login' element={<Login onLogin={handleOnLogin} />}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
