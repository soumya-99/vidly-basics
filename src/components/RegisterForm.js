import Joi from "joi-browser"
import Form from "./common/Form"

export default class LoginForm extends Form {
	state = {
		data: { username: "", password: "", name: "" },
		errors: {},
	}

	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Password"),
		name: Joi.string().required().label("Name"),
	}

	doSubmit = () => {
		// Call The Server
		console.log("submitted")
	}

	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}

					{this.renderButton("Register")}
				</form>
			</div>
		)
	}
}
