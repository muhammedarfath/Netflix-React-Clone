import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import Account from './Components/Account/Account';
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/account' element={<Account/>} />
          
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
