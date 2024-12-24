import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './store/store';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;