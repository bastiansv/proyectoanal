import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./views/auth/Login";
import MenuPrincipal from "./views/users/menu_principal";

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
        </Switch>
      </div>
    </Router>
  );
}
