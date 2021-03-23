import React from "react"
import Joi from "joi-browser"
import Form from "./common/Form"
import { getGenres } from "../services/fakeGenreService"
import { getMovie, saveMovie } from "../services/fakeMovieService"

export default class MovieForm extends Form {
	state = {
		data: {
			title: "",
			genreId: "",
			numberInStock: "",
			dailyRentalRate: "",
		},
		genres: [],
		errors: {},
	}

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genreId: Joi.string().required().label("Genre"),
		numberInStock: Joi.number()
			.required()
			.min(10)
			.max(100)
			.label("Number in Stock"),
		dailyRentalRate: Joi.number()
			.required()
			.min(0)
			.max(10)
			.label("Daily Rental Rate"),
	}

	componentDidMount() {
		// getting genres from fakeGenreService.js
		const genres = getGenres()
		// here we update the state
		this.setState({ genres })

		// we have to read 'id' parameter in the Route and store it in movieId
		const movieId = this.props.match.params.id

		// because we don't need to populate the form with an existing movie object
		if (movieId === "new") return

		const movie = getMovie(movieId)

		// if the movieId doesn't exist, we'll redirect the user to the not-found page.

		// we don't use history.push() because when the user clicks the back button, it again go back to the invalid Id page, and again redirect to the not-found page. So, this is like an infinity loop. They can't go back to the previous page.

		// To solve the problem, we use history.replace()
		if (!movie) return this.props.history.replace("/not-found")

		// what we want ro display on our page is little bit different from the structure of the server data. So, that's why, I've defined this method mapToViewModel(). This method gets a movie object that we'll get from the server and maps it to a different kind of movie object that we can use on this form.
		this.setState({ data: this.mapToViewModel(movie) })
	}

	mapToViewModel = (movie) => {
		// Server data is hierachial. We don't need everything. What we need, we only get that properties from the server and store it in our required variable.
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		}
	}

	doSubmit = () => {
		// we call the saveMovie from the fakeMovieService.js (imaginary backend server)
		saveMovie(this.state.data)

		// Redirect the user to the movies but in stack way. If the user taps the back button, it again open the previously visited page.
		this.props.history.push("/movies")
	}

	render() {
		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelect("genreId", "Genre", this.state.genres)}
					{this.renderInput("numberInStock", "Number in Stock", "number")}
					{this.renderInput("dailyRentalRate", "Rate")}
					{this.renderButton("Save")}
				</form>
			</div>
		)
	}
}
