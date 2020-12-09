import React, { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import axios from "axios";
import { Link } from 'react-router-dom'

import CardPizza from "./pizzacard";

function PizzaCards({pizzas, addPizza, cart, addToCart}){

  const fetchingData = () => {
    axios
      .get("https://young-tundra-83368.herokuapp.com/api/v1/readPizzas/")
      .then(response => {
         addPizza(response.data);
       }) // you have array in your response.data so add your data here
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchingData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
      <Grid container direction="row" alignItems="center" alignContent="center" justify="center" >
          {pizzas.map((pizza) =>
            (<Grid item
                  xs={4}
                  align="center">

              <div key={pizza._id}
                  style={{ margin:"5px", width:"300px"}}>

                <CardPizza
                    pizza={pizza}
                    cart={cart}
                    addToCart={addToCart}
              />
              </div>
            </Grid>
            ))}
      <Grid item xs={12} align="center" style={{marginTop: "5vh"}}>
        <Button variant="outlined" color="secondary" component={Link} onClick={() => addToCart([])} to={{pathname: "/order", state: {cart: {cart} }}} >Finaliser la commande</Button>
      </Grid>
    </Grid>
  )
}

export default PizzaCards