import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import axios from "axios";
import { Link } from 'react-router-dom'

import CardPizza from "./pizzacard";


function PizzaCards({pizzas, addPizza, cart, addToCart}){

  const fetchingData = () => {
    axios
      .get("http://localhost:3000/api/v1/readPizzas/")
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
    <div>
      <Grid container direction="row" alignItems="center" alignContent="center" justify="center" style={{ minHeight: '50vh', minWidth: '100vh' }}>
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
        <Grid item xs={12} align="center" style={{marginTop: '10vh'}}>
          <Button variant="contained" component={Link} to={{pathname: "/order", state: {cart: {cart} }}} >Finaliser la commande</Button>
        </Grid>
      </Grid>
    </div>
  )
}

// class PizzaCards extends Component {
//   constructor(){
//     super();

//     this.state = {
//       cart : [],
//       pizzas : []
//     }

//     this.handleCartChange = this.handleCartChange.bind(this);
//     this.handleChange = this.handleChange.bind(this);

//   }

//   handleCartChange(pizza_id){
//     const cart = this.state.cart;
//     cart.push(pizza_id)
//     this.setState({cart: cart});
//   }

//   handleChange = (e) => {
//     this.props.onCartChange(this.props.pizza._id);
//   }

//   componentDidMount(){

//     fetch('http://localhost:3000/api/v1/readPizzas/')
//     .then(res => (res.json()))
//     .then(pizzas => this.setState({pizzas: pizzas}));
//   }


//   render() {
//     return (
//         <div>
//           <Header onChange={this.handleChange} />
//           <Grid container direction="row" alignItems="center" alignContent="center" justify="center" style={{ minHeight: '50vh', minWidth: '100vh' }}>
//               {this.state.pizzas.map((pizza) =>
//                 (<Grid item
//                       xs={4}
//                       align="center">

//                   <div key={pizza._id}
//                       style={{ margin:"5px", width:"300px"}}>

//                     <CardPizza
//                         onCartChange={this.handleCartChange} 
//                         pizza={pizza}/>
//                   </div>
//                 </Grid>
//                 ))}
//           </Grid>
//         </div>
//     )
//   }
// }

export default PizzaCards