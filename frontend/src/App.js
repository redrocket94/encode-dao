import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch,
} from "react-router-dom";

import Issues from "./components/Issues";
import Payments from "./components/Payments";
import ConnectButton from "./components/ConnectButton";

function App() {
    return (
        <div className="App">
            <Router>
                <header>
                    <ConnectButton />
                </header>
                <nav>
                    <NavLink exact to="/">
                        Issues
                    </NavLink>
                    <NavLink to="/payments">Monthly payments</NavLink>
                    <NavLink to="/apartments">Your apartments</NavLink>
                </nav>
                <main>
                    <Switch>
                        <Route exact path="/" component={Issues} />
                        <Route path="/payments" component={Payments} />
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default App;
