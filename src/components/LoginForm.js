import React, { Component } from "react"

export default class LoginForm extends Component {
	state = {
		account: { username: "", password: "" },
	}

	handleSubmit = (e) => {
		e.preventDefault()

		// Call the server
		console.log("Submitted")
	}

	handleChange = ({ currentTarget: input }) => {
		const account = { ...this.state.account }
		account[input.name] = input.value
		this.setState({ account })
	}
	render() {
		const { account } = this.state
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							value={account.username}
							onChange={this.handleChange}
							id="username"
							type="text"
							className="form-control"
							name="username"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							value={account.password}
							onChange={this.handleChange}
							id="password"
							type="text"
							className="form-control"
							name="password"
						/>
					</div>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		)
	}
}
