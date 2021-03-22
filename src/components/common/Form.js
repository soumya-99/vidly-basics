import { Component } from "react"
import Joi from "joi-browser"
export default class Form extends Component {
	state = {
		data: {},
		errors: {},
	}

	validate = () => {
		const options = { abortEarly: false }
		const { error } = Joi.validate(this.state.data, this.schema, options)

		if (!error) return null

		const errors = {}
		for (let item of error.details) {
			errors[item.path[0]] = item.message
		}
		return errors
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

	handleSubmit = (e) => {
		e.preventDefault()

		const errors = this.validate()

		// if we do not do the errors: errors || {}, it will give "Cannot read property 'username' of null" error in runtime during submission of the form.
		this.setState({ errors: errors || {} })

		if (errors) return

		this.doSubmit()
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(input)
		if (errorMessage) errors[input.name] = errorMessage
		else delete errors[input.name]

		const data = { ...this.state.data }
		data[input.name] = input.value
		this.setState({ data, errors })
	}
}