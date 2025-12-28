// Import dependencies
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import navication and style
import Navigation from './components/Navigation';
import './App.css';


// Import pages:
import HomePage from './pages/HomePage.js'
import HelpPage from './pages/HelpPage.js'
import CarPage from './pages/CarPage.js'
import DetailedCarPage from './pages/DetailedCarPage.js';
import AddCarPageForm from './pages/AddCarPageForm.js';
import AddIssuePage from './pages/AddIssuePage.js';


function App() {
  
  return (
    <>
      <BrowserRouter>
        <header>
           <h1>Car Manager</h1>
          </header>

           <Navigation />

        <main>
              <section>
                  <Routes>
                      <Route path="/HomePage" element ={<HomePage />} />
                      <Route path="/HelpPage" element ={<HelpPage />} />
                      <Route path="/CarPage" element ={<CarPage />} />
                      <Route path="/cars/:id" element={<DetailedCarPage />} />
                      <Route path="/create" element={<AddCarPageForm />} />
                       <Route path="/issue" element={<AddIssuePage />} />
                  </Routes>
                </section>
            </main>

            <footer>
              <p>&copy; 2025 Garage Management</p>
            </footer>
      </BrowserRouter>
    
    
    </>
  );
}

export default App;