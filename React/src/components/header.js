import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../style/header.css';

function Header({cart}) {
  const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
  
      appBar: {
        background: "linear-gradient(110deg, rgb(0, 146, 70) 33%, rgba(0, 0, 0, 0) 33%), linear-gradient(110deg, white 66%, rgb(206, 44, 56) 66%)",
      }
  
    }));

    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
            The Octopizza - Feeling Saucy Pizzeria
            </Typography>
              <Router>
                <div style={{marginRight:"10vh"}}>
                    <Button color="inherit" component={Link} to="/menu" >Menu</Button>
                    <Button color="inherit" component={Link} to={{pathname: "/order", state: {cart: "test"}}} >Ma commande</Button>
                </div>
                  <Button variant="outlined" color="inherit" component={Link} to="/login">Se connecter</Button>
              </Router>
          </Toolbar>
        </AppBar>
      </div>
    );
  
}

export default Header;
