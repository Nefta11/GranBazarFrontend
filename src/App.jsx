import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/MyProfile';

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Home"
            element={token ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/Profile"
            element={token ? <Profile /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;