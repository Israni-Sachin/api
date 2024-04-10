import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/auth/register';
import MainPage from './components/hero-page';
import MainLayout from './components/main-layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
