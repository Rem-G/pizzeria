import React from 'react';

import Button from 'react-bootstrap/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PizzaCards from '../components/pizzacards'


function Menu({pizzas, addPizza, cart, addToCart}){

    const handleRemovePizza = pizza => {
        const index = cart.indexOf(pizza);
        const newCart = [...cart];
        newCart.splice(index, 1);
        addToCart(newCart);
      }

    return (
        <div>
            <Container direction="row" alignItems="center" alignContent="center" justify="center" >
            <Row>
                <Col xs={10}>
                    <PizzaCards pizzas={pizzas} addPizza={addPizza} cart={cart} addToCart={addToCart}/>
                </Col>
    
                <Col xs={2}  style={{marginTop: "0.6vh"}}>
                <Card variant="outlined">
                    <CardContent >
                    <Typography align="center">
                        <h5>Commande :</h5>
                        {cart.map(c => (
                            <div style={{marginRight: "10px", marginBottom: "10px", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                                <p style={{ marginTop: "15px"}} >{c.nom}</p>
                                <Button variant="outline-danger" size="sm" onClick={() => handleRemovePizza(c)}>x</Button>
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

export default Menu;