import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Header from '../src/components/header/header';
import Routes from '../src/routes';
import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Header /> */}
      <Routes />
    </div>
  );
}

export default App;
