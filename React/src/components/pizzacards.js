import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';



import CardPizza from "./pizzacard";

class PizzaCards extends Component {
  constructor(){
    super();

    this.state = {
      cart : [],
      pizzas : []
    }

    this.handleCartChange = this.handleCartChange.bind(this);
  }

  handleCartChange(pizza_id){
    const cart = this.state.cart;
    cart.push(pizza_id)
    this.setState({cart: cart});
  }

  componentDidMount(){

    fetch('http://localhost:3000/api/v1/readPizzas/')
    .then(res => (res.json()))
    .then(pizzas => this.setState({pizzas: pizzas}));
  }


  render() {
    return (
        <div>
          <Grid container direction="row" alignItems="center" alignContent="center" justify="center" style={{ minHeight: '50vh', minWidth: '100vh' }}>
              {this.state.pizzas.map((pizza) => (<Grid item xs={4} align="center"> <div key={pizza._id} style={{ margin:"5px", width:"300px"}}><CardPizza onCartChange={this.handleCartChange}  pizza={pizza}/></div></Grid>))}
          </Grid>
            {/* <ul style={{justifyContent: "center", display: "flex", listStyle: "none"}}>
            this.state.pizzas.map((pizza) => (<li key={pizza.id} style={{ margin:"5px"}}><CardPizza pizza={pizza}/></li>) )}
            </ul> */}
        </div>
    )
  }
}

export default PizzaCards