import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;