import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router'
import Cookies from "js-cookie";
import Home from './pages/root/home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/signup'
import LoanCalculator from './components/LoanCalculator'
import Dashboard from './pages/adminDashboard/Dashboard'
import { useContext } from 'react';
import { AuthContext } from './context/UserContext';
import UserDashboard from './pages/userDashboard/Dashboard';

function App() {
  
  const {user} = useContext(AuthContext)
  // console.log("User=>", user);
  
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/loan-calculator' element={<LoanCalculator />} />

      {/* Auth Routes */}
      <Route path='/auth'>
        <Route index path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path='/admin-dashboard' element={user?.role == "admin" ? <Dashboard /> : ""}>
        <Route index path="profile" element={<Home />} />
        <Route path="settings" element={<Home />} />
      </Route>

      {/* User Dashboard Routes */}
      <Route path='/user-dashboard' element={user?.role == "user" ? <UserDashboard /> : ""}>
        <Route index path="profile" element={<Home />} />
        <Route path="settings" element={<Home />} />
      </Route>

    </Routes>
   </BrowserRouter>
  )
}

export default App
