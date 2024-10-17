import React from 'react';
import logo from './logo.svg';
import "../src/styles/App.css";
import FlyerBuilderPage from './pages/FlyerBuilderPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App:React.FC = () => {
  return (
   <Router>
      <Routes>
      <Route path="/" element={<FlyerBuilderPage />} />
      </Routes>
   </Router>
  );
}

export default App;
