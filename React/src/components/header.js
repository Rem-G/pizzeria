import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

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
            <div style={{marginRight:"10vh"}}>
              <Button color="inherit">Menu</Button>
              <Button color="inherit">Commander</Button>
            </div>

            <Button variant="outlined" color="inherit">Se connecter</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  
}


// function Header() {
//   return (
//     <div className="Header">
//       <h1> My list of Todo</h1>
//     </div>
//   );
// }

export default Header;
