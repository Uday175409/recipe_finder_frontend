import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeSearch from './pages/RecipeSearch';
import RecipeDetail from './pages/RecipeDetail';
import MealPlanner from './pages/MealPlanner';
import RandomRecipes from './pages/RandomRecipes';
import IngredientSearch from './pages/IngredientSearch';
import WinePairing from './pages/WinePairing';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-fluid px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<RecipeSearch />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/random" element={<RandomRecipes />} />
            <Route path="/ingredients" element={<IngredientSearch />} />
            <Route path="/wine-pairing" element={<WinePairing />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
