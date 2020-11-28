import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from "axios";
import { Link } from 'react-router-dom'

import CardPizza from "./pizzacard";


function PizzaCards({pizzas, addPizza, cart, addToCart}){

  const handleRemovePizza = () => {
    addToCart(cart.filter((pizza) => pizza.id === cart.id));
  }

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
      <Container direction="row" alignItems="center" alignContent="center" justify="center" >
        <Row>
          <Col xs={10}>
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
                <Button variant="contained" component={Link} to={{pathname: "/order", state: {cart: {cart} }}} >Finaliser la commande</Button>
              </Grid>
            </Grid>
          </Col>

          <Col xs={2}  style={{marginTop: "0.6vh"}}>
            <Card variant="outlined">
              <CardContent >
                <Typography align="center">
                  <h5>Commande :</h5>
                    {cart.map(c => (
                      <div>
                        <div style={{marginRight: "10px", marginBottom: "10px", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>{c.nom}</div>
                        <Button size="small" onClick={handleRemovePizza}>✖</Button>
                      </div>
                    ))}
                </Typography>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
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