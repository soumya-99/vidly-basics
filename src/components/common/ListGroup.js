import React from "react"

function ListGroup({ items, onItemSelect, textProperty, valueProperty }) {
	return (
		<ul className="list-group">
			{items.map((item) => (
				<li key={item[valueProperty]} className="list-group-item">
					{item[textProperty]}
				</li>
			))}
		</ul>
	)
}

export default ListGroup
