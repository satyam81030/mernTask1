
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgetPassword' element={<ForgetPassword/>} />
        <Route path='/resetPassword/:token' element={<ResetPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
