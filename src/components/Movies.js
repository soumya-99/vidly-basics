import React, { Component } from "react"

import Like from "./common/Like"
import { getMovies } from "../services/fakeMovieService"
import Pagination from "./common/Pagination"
import { paginate } from "../utils/paginate"
import ListGroup from "./common/ListGroup"
import { getGenres } from "../services/fakeGenreService"

export default class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
	}

	componentDidMount() {
		const genres = [{ name: "All Genres" }, ...getGenres()]
		this.setState({ movies: getMovies(), genres })
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id)
		this.setState({ movies })
	}

	handleLike = (movie) => {
		const movies = [...this.state.movies]
		const index = movies.indexOf(movie)
		movies[index] = { ...movies[index] }
		movies[index].liked = !movies[index].liked
		this.setState({ movies })
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page })
	}

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 })
	}

	render() {
		const { length: count } = this.state.movies
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre,
		} = this.state

		if (count === 0) return <h4>There are no movies in the Database</h4>

		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter((m) => m.genre._id === selectedGenre._id)
				: allMovies

		const movies = paginate(filtered, currentPage, pageSize)

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>

				<div className="col">
					<p>Showing {filtered.length} movies in the Database</p>
					<table className="table">
						<thead>
							<tr>
								<th>Title</th>
								<th>Genre</th>
								<th>Stock</th>
								<th>Rate</th>
								<th>Like</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							{movies.map((movie) => (
								<tr key={movie._id}>
									<td>{movie.title}</td>
									<td>{movie.genre.name}</td>
									<td>{movie.numberInStock}</td>
									<td>{movie.dailyRentalRate}</td>
									<td>
										<Like
											liked={movie.liked}
											onClick={() => this.handleLike(movie)}
										/>
									</td>
									<td>
										<button
											onClick={() => this.handleDelete(movie)}
											className="btn btn-danger btn-sm"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Pagination
						itemsCount={filtered.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		)
	}
}
