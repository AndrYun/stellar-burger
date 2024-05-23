import React from 'react';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import './App.css';

function App() {
  return (
    <>
      <AppHeader />
      <div
        style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
}

export default App;
