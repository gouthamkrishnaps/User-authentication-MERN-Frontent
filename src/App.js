import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Header from './components/Header';
import FormData from './components/FormData';



function App() {
  
  return (
    <div>

      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/form-data' element={<FormData/>}/>
      </Routes>
    </div>
  );
}

export default App;
