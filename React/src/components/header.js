import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import CustomMenu from './menu';

import '../style/header.css';

function Header() {
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
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <CustomMenu />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
            The Octopizza - Feeling Saucy Pizzeria
            </Typography>
              <Router>
                <div style={{marginRight:"10vh"}}>
                    <Button color="inherit" component={RouterLink} to="/menu">Menu</Button>
                    <Button color="inherit" component={RouterLink} to="/order">Commander</Button>
                </div>
                  <Button variant="outlined" color="inherit" component={RouterLink} to="/login">Se connecter</Button>
              </Router>
          </Toolbar>
        </AppBar>
      </div>
    );
  
}

export default Header;
