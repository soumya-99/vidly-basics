import Joi from "joi-browser"
import Form from "./common/Form"

export default class LoginForm extends Form {
	state = {
		data: { username: "", password: "" },
		errors: {},
	}

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	}

	doSubmit = () => {
		// Call The Server
		console.log("submitted")
	}

	render() {
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}

					{this.renderButton("Login")}
				</form>
			</div>
		)
	}
}
