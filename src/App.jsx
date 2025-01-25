import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Cookies from "js-cookie";
import Home from './pages/root/home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/signup'
import LoanCalculator from './components/LoanCalculator'
import Dashboard from './pages/adminDashboard/Dashboard'

function App() {
  const getUser = () => {
    const token = Cookies.get("token");
    const decodedToken = jwt_decode(token);

    console.log("Token:", decodedToken);
  }
  getUser();
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

      {/* Dashboard Routes */}
      <Route path='/dashboard' element={<Dashboard />}>
        <Route index path="profile" element={<Home />} />
        <Route path="settings" element={<Home />} />
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
