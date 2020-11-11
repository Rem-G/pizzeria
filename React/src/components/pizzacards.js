import React, { Component } from 'react';

import CardPizza from "./pizzacard";

class PizzaCards extends Component {
  constructor(){
    super();
    this.state = {
      pizzas : []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/readPizzas/')
    .then(res => (res.json()))
    .then(pizzas => this.setState({pizzas}));
  }


  render() {
    return (
        <div>
            <ul style={{justifyContent: "center", display: "flex", listStyle: "none"}}>
            {this.state.pizzas.map((pizza) => (<li key={pizza.id} style={{ margin:"5px"}}><CardPizza pizza={pizza}/></li>) )}
            </ul>
        </div>
    )
  }
}

export default PizzaCards