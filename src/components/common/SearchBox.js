import React from "react"

function SearchBox({ value, onChange }) {
	return (
		<input
			type="text"
			className="form-control my-3"
			name="query"
			placeholder="Search..."
			value={value}
			onChange={(e) => onChange(e.currentTarget.value)}
		/>
	)
}

export default SearchBox
