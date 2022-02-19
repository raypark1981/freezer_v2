import React from 'react';

import Header from './components/header/header';
import Freezer from './components/freezer/freezer';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
         <Freezer />
      </main>
    </div>
  );
}

export default App;
