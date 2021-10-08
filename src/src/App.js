import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Issues from "./components/Issues";
import Payments from "./components/Payments";

function App() {
    return (
        <div className="App">
            <Router>
                <header className="App-header"></header>
                <nav>
                    <Link to="/">issues</Link>
                    <Link to="/payments">monthly payments</Link>
                    <Link to="/apartments">list apartments</Link>
                </nav>
                <main>
                    <Route exact path="/" component={Issues} />
                    <Route path="/payments" component={Payments} />
                </main>
            </Router>
        </div>
    );
}

export default App;
