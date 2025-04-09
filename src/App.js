import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import Watchlist from './Pages/Watchlist';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Alert from './components/Alert';
import Portfolio from './components/Portfolio';
import Converter from './components/Converter';
import CoinPage from './Pages/CoinPage';

const useStyle = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "#04b5e5",
    minHeight: '100vh',
  }
}));

function App() {
  const classes = useStyle();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/coins/:id' component={CoinPage} exact />
          <Route path='/portfolio' component={Portfolio} exact />
          <Route path='/converter' component={Converter} exact />
          <Route path="/watchlist" component={Watchlist} exact/>

        </Switch>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
