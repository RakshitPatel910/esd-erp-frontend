import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navabr';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState( false );

  useEffect(() => {
    const validateToken = async (token) => {
      try{
        const res = await axios.post('http://localhost:8080/auth/validateToken', {}, {
          headers:{
            'Authorization':token
          }
        })

        if( res ) setIsAuthenticated( true );
        else{
          localStorage.removeItem('authToken');
        }
      }
      catch(err){
        console.log(err);
      }
    }


    const authToken = localStorage.getItem('authToken');

    if( authToken != null ){
      console.log(authToken);

      validateToken( authToken );
    }
  }, []);

  const handleOnLogin = () => {
    console.log("handleOnLogin triggered");
    setIsAuthenticated( true );

    console.log(isAuthenticated);
  }

  return(
    <BrowserRouter>
      {/* <Navbar/> */}
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
