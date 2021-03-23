import { Redirect, Route, Switch } from "react-router-dom"
import "./App.css"
import Customers from "./components/Customers"
import LoginForm from "./components/LoginForm"
import MovieForm from "./components/MovieForm"
import RegisterForm from "./components/RegisterForm"
import Movies from "./components/Movies"
import NavBar from "./components/NavBar"
import NotFound from "./components/NotFound"
import Rentals from "./components/Rentals"

function App() {
	return (
		<>
			<NavBar />
			<div className="container">
				<Switch>
					<Route path="/register" component={RegisterForm} />
					<Route path="/login" component={LoginForm} />
					<Route path="/movies/:id" component={MovieForm} />
					<Route path="/movies" component={Movies}></Route>
					<Route path="/customers" component={Customers}></Route>
					<Route path="/rentals" component={Rentals}></Route>
					<Route path="/not-found" component={NotFound}></Route>
					<Redirect from="/" exact to="/movies" />
					<Redirect to="/not-found" />
				</Switch>
			</div>
		</>
	)
}

export default App
