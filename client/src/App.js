import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout';
import Account from './pages/Account';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
axios.defaults.withCredentials = true;

function App() {
  return (
   
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<Account/>} />
          <Route path="/account/:subpage/:action" element={<Account/>}/>
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
