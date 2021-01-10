import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './componentes/login/Login';
import Inicio from './componentes/inicio/Inicio';
import Reservaciones from './componentes/reservaciones/Reservaciones';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Inicio} />
            <Route path='/login' exact component={Login} />
            <Route path='/bookings' exact component={Reservaciones} />
            </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
