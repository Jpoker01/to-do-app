import './App.css';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from './PrivateRoute';


const isAuthenticated = localStorage.isAuthenticated;

function App() {

  return (
      <div className="App">
        <header>
        <h1>To-do App</h1>
      </header>
      <main>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute Component={Home} />} />

        </Routes>
      </main>
      </div>
  );
}

export default App;

