import React, { Component } from "react"
import _ from "lodash"

import { getMovies } from "../services/fakeMovieService"
import Pagination from "./common/Pagination"
import { paginate } from "../utils/paginate"
import ListGroup from "./common/ListGroup"
import { getGenres } from "../services/fakeGenreService"
import MoviesTable from "./MoviesTable"
import { Link } from "react-router-dom"
import SearchBox from "./common/SearchBox"

export default class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: "title", order: "asc" },
		searchQuery: "",
		selectedGenre: null,
	}

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]
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
		// we can't use null or undefined while using Controled Components... That's why we use searchQuery: "" as an empty string.
		this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 })
	}

	handleSort = (sortColumn) => {
		this.setState({ sortColumn })
	}

	handleSearch = (query) => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
	}

	getPageData = () => {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre,
			sortColumn,
			searchQuery,
		} = this.state

		// const filtered =
		// 	selectedGenre && selectedGenre._id
		// 		? allMovies.filter((m) => m.genre._id === selectedGenre._id)
		// 		: allMovies

		let filtered = allMovies
		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			)
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id)

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

		const movies = paginate(sorted, currentPage, pageSize)

		return { totalCount: filtered.length, data: movies }
	}

	render() {
		const { length: count } = this.state.movies
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state

		if (count === 0) return <h4>There are no movies in the Database</h4>

		const { totalCount, data: movies } = this.getPageData()

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
					<Link
						to="/movies/new"
						className="btn btn-primary"
						style={{ marginBottom: 20 }}
					>
						New Movie
					</Link>
					<p>Showing {totalCount} movies in the Database</p>

					<SearchBox value={searchQuery} onChange={this.handleSearch} />

					<MoviesTable
						movies={movies}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
						sortColumn={sortColumn}
					/>

					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		)
	}
}
