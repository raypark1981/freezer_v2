import React from 'react';

import Header from './components/header/header';

const App = () => {
  return (
    <div className="App">
      
      <main>
          <section className='freezer__item'>
          <div className='drawer'><i></i></div>
          <div>신선칸</div>
          <div className='add__food'>
            <i className='plus'></i>
          </div>
          </section>
        
      </main>
    </div>
  );
}

export default App;
