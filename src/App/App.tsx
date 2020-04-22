import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Sidenav, TopAppBar } from '../components';
import { APP_DRAWER_WIDTH } from './App.constants';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '../Router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = (props: any) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <TopAppBar
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={APP_DRAWER_WIDTH}
        />
        <Sidenav
          drawerWidth={APP_DRAWER_WIDTH}
          handleDrawerToggle={handleDrawerToggle}
          isOpen={mobileOpen}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
            <AppRouter />
          </Typography>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
