import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import Login from './pages/Auth/Login';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Login' element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;