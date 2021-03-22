import React from "react"

function Input({ name, label, error, ...otherProps }) {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input {...otherProps} name={name} id={name} className="form-control" />
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	)
}

export default Input
