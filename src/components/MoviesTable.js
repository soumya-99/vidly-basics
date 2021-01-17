import React, { Component } from "react"
import Like from "./common/Like"
import TableHeader from "./common/TableHeader"

export default class MoviesTable extends Component {
	columns = [
		{ path: "title", label: "Title" },
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailtRentalRate", label: "Rate" },
		{ key: 'like', label: "Like" },
		{ key: 'delete', label: "Delete" },
	]

	render() {
		const { movies, onDelete, onLike, sortColumn, onSort } = this.props
		return (
			<table className="table">
				<TableHeader
					columns={this.columns}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie._id}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like liked={movie.liked} onClick={() => onLike(movie)} />
							</td>
							<td>
								<button
									onClick={() => onDelete(movie)}
									className="btn btn-danger btn-sm"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	}
}
