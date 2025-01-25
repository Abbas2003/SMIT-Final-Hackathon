import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/root/home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/signup'
import LoanCalculator from './components/LoanCalculator'

function App() {

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
      <Route path='/dashboard'>
        <Route index path="profile" element={<Home />} />
        <Route path="settings" element={<Home />} />
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
