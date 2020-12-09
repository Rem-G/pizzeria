import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import "../App.css";
  
const styles = {
    root: {
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      alignItems: "center",
    },
    card_content: {
      display: "block",
      textAlign: "center"
    },

    order: {
      display: "block",
      textAlign: "center",
    }
  };

  function PizzaCard({pizza, cart, addToCart}){

    const organize_ingredients = (ingredients) => {
      let str_ingredients = "";
      ingredients.map((ingredient => (str_ingredients += " - "+ingredient.nom)))
      return str_ingredients;
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      addToCart([...cart, pizza]);
    }
    
    return(
      <Card style={styles.root} variant="outlined">
        <CardContent style={styles.card_content}>
          <h3>{pizza.nom}</h3>
          <h4>{pizza.prix}€</h4>
          <Typography>
            Ingredients : 
            {organize_ingredients(pizza.ingredients)}
          </Typography>
        </CardContent>
        <CardActions style={styles.order}>
          <Button size="small" variant="outlined" color="primary" onClick={handleSubmit}>Commander</Button>
        </CardActions>
      </Card>
    )
  }
  export default PizzaCard
