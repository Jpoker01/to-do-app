import './App.css';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { Route, Routes } from "react-router-dom";


function App() {

  return (
      <div className="App">
        <header>
        <h1>To-do App</h1>
      </header>
      <main>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
      </div>
  );
}

export default App;

