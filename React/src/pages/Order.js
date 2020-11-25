import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useLocation} from 'react-router-dom';


function Order(){
    const styles = {
        root: {
            width: "30%",
            marginLeft: "35%"
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

    const pizzas = useLocation().state.cart.cart;

    const prixPizzas = () => {let prix=0; pizzas.forEach(pizza => {prix += pizza.prix;}); return prix;}

    return (
        <div >
            <h1 style={{background: "transparent"}}>Finalisation de votre commande</h1>
            <Card style={styles.root} variant="outlined">
                <CardContent style={styles.card_content}>
                    <h3>Votre commande :</h3>
                    <h4>{pizzas.length} pizza(s)</h4>
                    <ul>
                        {pizzas.map((pizza) => 
                            <li>{pizza.nom}</li>
                        )}
                    </ul>
                    <Typography>
                        Prix : {prixPizzas()} €
                    </Typography>
                </CardContent>
            <CardActions style={styles.order}>
                <Button size="small" variant="contained" color="secondary" >Valider</Button>
            </CardActions>
            </Card>
        </div>
    )
}

export default Order;