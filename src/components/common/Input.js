import React from "react"

function Input({ name, label, value, onChange, error }) {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				value={value}
				onChange={onChange}
				id={name}
				type="text"
				className="form-control"
				name={name}
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	)
}

export default Input
