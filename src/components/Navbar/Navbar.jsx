import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Badge } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/pngegg.png";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="Comerce.js" height="30px" className={classes.img} />
            <div className={classes.nameOfShop}>Můj vymazlenej šopík</div>
          </Typography>
          <div className={classes.grow}></div>
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton component={Link} to="/Cart" aria-label="Show Cart items" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
