import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Navigation } from './components/Navigation/Navigation.jsx';
import { Loader } from './components/Loader/Loader.jsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx';
const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const CarsPage = lazy(() => import('./pages/CarsPage/CarsPage.jsx'));
const CarDetailsPage = lazy(() =>
  import('./pages/CarDetailsPage/CarDetailsPage.jsx')
);

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CarsPage />} />
          <Route path="/catalog/:id" element={<CarDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
