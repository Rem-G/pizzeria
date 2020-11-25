import React, { Component } from 'react';
import PizzaCards from '../components/pizzacards'

function Menu({pizzas, addPizza, cart, addToCart}){
    return (
        <PizzaCards pizzas={pizzas} addPizza={addPizza} cart={cart} addToCart={addToCart}/>
    )
}

export default Menu;