import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login'

const App = () =>{
  return (
   <>
   <Routes>
    <Route path='/' element={<ProtectedRoutes><HomePage></HomePage></ProtectedRoutes>}/>
    <Route path='/register' element={<Register></Register>}/>
    <Route path='/login' element={<Login></Login>}/>
   </Routes>
   </>
  );
}

// If the user is not logged in and want to access home page, then login page will be shown else home page
export function ProtectedRoutes(props){
  if(localStorage.getItem("user"))
    return props.children;

  return <Navigate to="/login"/>
}

export default App;
