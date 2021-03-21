import React, { Component } from "react"
import Joi from "joi-browser"
import Input from "./common/Input"

export default class LoginForm extends Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	}

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	}

	validate = () => {
		const options = { abortEarly: false }
		const { error } = Joi.validate(this.state.account, this.schema, options)

		if (!error) return null

		const errors = {}
		for (let item of error.details) {
			errors[item.path[0]] = item.message
		}
		return errors
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
		// we use square bracket notation in ES6 to implement dynamic properties... here we don't use 'username' property hardcoded 'cause we need password field also, that's why we use "[name]: value" this type of syntax.
		const obj = { [name]: value }
		const schema = { [name]: this.schema[name] }
		const { error } = Joi.validate(obj, schema)
		// if (error) return null
		// return error.details[0].messgae
		//same as before
		return error ? error.details[0].message : null
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
					<button
					disabled={this.validate()} className="btn btn-primary">Login</button>
				</form>
			</div>
		)
	}
}
