import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import Layout from './Layout';
import Account from './pages/Account';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage'
import PlaceForm from './pages/PlaceForm';
import PlacePage from './pages/PlacePage';
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
          <Route path="/account" element={<Account/>}/>
          <Route path="/account/places" element={<Account/>} />
          <Route path="/account/places/new" element={<PlaceForm/>} />
          <Route path='/place/:id' element={<PlacePage/>}/>
          <Route path="/account/places/:id" element={<PlaceForm/>} />
          <Route path="/account/bookings" element={<BookingsPage/>} />
          <Route path="/account/bookings/:id" element={<BookingPage/>} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
