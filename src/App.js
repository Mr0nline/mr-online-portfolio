import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
