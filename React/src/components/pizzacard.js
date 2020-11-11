import React, { Component } from 'react';

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

  
  class PizzaCard extends Component {

  
    render() {
      const onclick = () => {;}

      const organize_ingredients = (ingredients) => {
        let str_ingredients = "";
        ingredients.map((ingredient => (str_ingredients += " - "+ingredient.nom)))
        return str_ingredients;
      }

      return(

        <Card style={styles.root} variant="outlined">
        <CardContent style={styles.card_content}>
          <h3>{this.props.pizza.nom}</h3>
          <h4>{this.props.pizza.prix}€</h4>
          <Typography>
            Ingredients : 
            <p>{organize_ingredients(this.props.pizza.ingredients)}</p>
          </Typography>
        </CardContent>
        <CardActions style={styles.order}>
          <Button size="small" variant="contained" color="secondary" onClick={onclick()}>Commander</Button>
        </CardActions>
        </Card>
        
    );
    }
  }
  
  export default PizzaCard
