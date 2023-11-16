import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./views/auth/Login";
import MenuPrincipal from "./views/users/menu_principal";
import NuevaFicha from "./views/simulaciones/nueva-ficha";
import Simulaciones from "./views/simulaciones/simulaciones";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          {/* ... Otras rutas existentes ... */}
          <Route exact path="/">
            <Login />
          </Route>
		      <Route path="/menu-principal">
			      <MenuPrincipal />
		      </Route>
          <Route path="/nueva-ficha">
			      <NuevaFicha />
		      </Route>
          <Route path="/simulaciones">
			      <Simulaciones />
		      </Route>
          
        </Switch>
      </div>
    </Router>
  );
}
