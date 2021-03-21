import React, { Component } from "react"
import Joi from "joi-browser"
import Input from "./common/Input"

export default class LoginForm extends Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	}

	schema = {
		username: Joi.string().required(),
		password: Joi.string().required()
	}

	validate = () => {


		const result = Joi.validate(this.state.account, this.schema, {abortEarly: false})
		console.log(result);



		const errors = {}
		// const { errors } = this.state

		const { account } = this.state
		if (account.username.trim() === "") errors.username = "Username is required"
		if (account.password.trim() === "") errors.password = "Password is required"

		return Object.keys(errors).length === 0 ? null : errors
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const errors = this.validate()

		// if we do not do the errors: errors || {}, it will give "Cannot read property 'username' of null" error in runtime during submission of the form.
		this.setState({ errors: errors || {} })

		if (errors) return

		// Call The Server
		console.log("submitted")
	}

	validateProperty = ({ name, value }) => {
		if (name === "username") {
			if (value.trim() === "") return "Username is required"
			//...
		}
		if (name === "password") {
			if (value.trim() === "") return "Password is required"
			//...
		}
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(input)
		if (errorMessage) errors[input.name] = errorMessage
		else delete errors[input.name]

		const account = { ...this.state.account }
		account[input.name] = input.value
		this.setState({ account, errors })
	}
	render() {
		const { account, errors } = this.state
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="username"
						value={account.username}
						label="Username"
						onChange={this.handleChange}
						error={errors.username}
					/>
					<Input
						name="password"
						value={account.password}
						label="Password"
						onChange={this.handleChange}
						error={errors.password}
					/>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		)
	}
}
