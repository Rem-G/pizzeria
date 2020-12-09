import React, { useState} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import Header from './components/header';

import Order from "./pages/Order"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import Menu from "./pages/Menu"


function App() {

  const [pizzas, addPizza] = useState([]);
  const [cart, addToCart] = useState([]);
  const [user_token, setUserToken] = useState("");

  
  return (
    <div className="App">
        <BrowserRouter>
          <Header user_token={user_token} setUserToken={setUserToken} />
          <Route exact path="/" >
            <Home />
          </Route>

          <Route path="/menu">
            <Menu pizzas={pizzas} addPizza={addPizza} cart={cart} addToCart={addToCart} />
          </Route>

          <Route path="/order">
            <Order user_token={user_token}/>
          </Route>

          <Route path="/login">
            <Login user_token={user_token} setUserToken={setUserToken}/>
          </Route>

          <Route path="/profile">
            <Profile user_token={user_token} setUserToken={setUserToken}/>
          </Route>
        </BrowserRouter>
    </div>
  )
}

export default App;
