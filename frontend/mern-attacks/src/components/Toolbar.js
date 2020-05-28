import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import BackToTop from './attackPage/BackToTop';

const classes = '';

export default function MyToolbar() {
  return (
    <AppBar className={clsx()}>
      <Toolbar className={classes.toolbar}>
        <Grid
          justify="space-between" // Add it here :)
          container
          spacing={24}
        >
          <Typography
            component="h1"
            variant="h6"
            color="secondary"
            noWrap
            className={classes.title}
          >
            Attacks
          </Typography>

          <BackToTop></BackToTop>
          <Button
            onClick={() => {
              localStorage.removeItem('token');
              window.location = 'http://localhost:3000/login';
            }}
            variant="contained"
            color="secondary"
          >
            logout
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
