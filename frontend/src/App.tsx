import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PriceList } from './pages/PriceList';
import { Terms } from './pages/Terms';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PriceList />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/pricelist" element={<PriceList />} />
    </Routes>
  );
};

export default App;