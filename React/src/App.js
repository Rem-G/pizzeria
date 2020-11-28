import React from 'react';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


import { BrowserRouter, Route } from "react-router-dom";

import Order from "./pages/Order"
//import PersoPizza from "./pages/PersoPizza"
//import Register from "./pages/Register"
import Login from "./pages/Login"
// import Account from "./pages/Account"
import Home from "./pages/Home"
import Menu from "./pages/Menu"

import { useState } from 'react';

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
            <Order />
          </Route>

          <Route path="/login">
            <Login user_token={user_token} setUserToken={setUserToken}/>
          </Route>
        </BrowserRouter>
    </div>
  );

}

// class App extends React.Component {

//   render() {


//     // const requestOptions = {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify({ nom: 'tempUser' })
//     // };

//     return (
//       <div className="App">
//           <BrowserRouter>
//             <Switch>
//             <div style={{marginRight:"10vh"}}>
//                 <Route exact path="/">
//                   <Home />
//                 </Route>

//                 <Route exact path="/menu">
//                   <Menu />
//                 </Route>

//                 <Route exact path="/order">
//                   <Order />
//                 </Route>
//               </div>
//               <Route exact path="/login">
//                 <Login />
//               </Route>
//             </Switch>
//           </BrowserRouter>
//       </div>
//     );
//   }
// }


// function App() {

//   //const [formData, updateFormData] = useState(initialFormData);

//   const [pizzas, addPizzas] = useState([]);


// }

export default App;
