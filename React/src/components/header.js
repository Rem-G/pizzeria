import React from 'react';
import {Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                The Octopizza - Feeling Saucy Pizzeria
              </Link>
            </Typography>
              <div style={{marginRight:"10vh"}}>
                  <Button variant="outline-light" href="/menu" style={{marginRight: "5px"}}>Menu</Button>
                  <Button variant="outline-light" href="/order">Ma commande</Button>
              </div>
                <Button variant="outline-light" href="/login">Se connecter</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  
}

export default Header;
