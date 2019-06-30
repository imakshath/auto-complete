import React from 'react';
import SearchField from './components/SearchField/SearchField';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header>
        <SearchField placeholder='Search User by ID, address, name' />
      </header>
    </div>
  );
}

export default App;
