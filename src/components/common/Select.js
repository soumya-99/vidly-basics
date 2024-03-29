import React from "react"

function Select({ name, label, options, error, ...otherProps }) {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<select name={name} id={name} {...otherProps} className="form-control">
				<option value="" />
				{options.map((option) => (
					<option key={option.id} value={option._id}>
						{option.name}
					</option>
				))}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	)
}

export default Select
