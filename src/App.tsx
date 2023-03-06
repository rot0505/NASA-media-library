import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";
import ShowPage from "./components/ShowPage";
import "./App.scss";
import { SearchContextProvider } from "./contexts/SearchContext";

const App: React.FC = () => {
  return (
    <SearchContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/show/:nasa_id" element={<ShowPage />} />
        </Routes>
        <Footer />
      </Router>
    </SearchContextProvider>
  );
};

export default App;
