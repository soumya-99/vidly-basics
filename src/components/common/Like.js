import React from "react"

// Input: Liked: boolean
//Output: onClick

export default function Like({ onClick, liked }) {
	let classes = "fa fa-heart"
	if (!liked) classes += "-o"
	return (
		<i
			onClick={onClick}
			className={classes}
			aria-hidden="true"
			style={{ cursor: "pointer" }}
		/>
	)
}
