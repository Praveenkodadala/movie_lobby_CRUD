import express, { NextFunction, Request, Response } from "express";
import { HttpException } from "../middlewares/error.middleware";
import { genreModel } from "../models/genre.model";
import { movieModel } from "../models/movie.model";
import { Validator } from "node-input-validator";

const addMovie = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.body || Object.keys(req.body).length === 0) {
			return res.status(400).json({ status: false, message: "data cannot be empty" });
		}
		const v = new Validator(req.body, {
			title: "required",
			genres: "required|array",
			rating: "required",
			streamingLink: "required",
		});

		let matched = await v.check();
		if (!matched) {
			const errorData: any = Object.values(v.errors).map((val: any) => val.message);
			const errorMessage = errorData.join(", ");
			throw new HttpException(400, errorMessage);
		}
		const existingMovie = await movieModel.findOne({
			title: req.body.title.toLowerCase(),
		});
		if (existingMovie) {
			throw new HttpException(400, "A movie with the same title already exists");
		}
		let movieObj = { ...req.body };
		let addMovie = await movieModel.create({ ...movieObj });
		res.status(200).json({ status: true, message: "movie is added successfully" });
	} catch (error) {
		next(error);
	}
};

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const query = [
			{
				$lookup: {
					from: "genres",
					localField: "genres",
					foreignField: "_id",
					as: "genres",
				},
			},
		];
		const movies = await movieModel.aggregate(query);
		res.status(200).json({ status: true, data: movies });
	} catch (error) {
		next(error);
	}
};

const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const movieId = req.params.id;
		if (!movieId) {
			return res.status(400).json({ status: false, message: "Movie ID is required" });
		}

		if (!req.body || Object.keys(req.body).length === 0) {
			return res.status(400).json({ status: false, message: "data cannot be empty" });
		}
		const v = new Validator(req.body, {
			title: "required",
			genres: "required|array",
			rating: "required",
			streamingLink: "required",
		});

		let matched = await v.check();
		if (!matched) {
			const errorData: any = Object.values(v.errors).map((val: any) => val.message);
			const errorMessage = errorData.join(", ");
			throw new HttpException(400, errorMessage);
		}

		const { title, rating } = req.body;

		if (title) {
			const existingMovie = await movieModel.findOne({ title });
			if (existingMovie && existingMovie._id.toString() !== movieId) {
				return res.status(400).json({ status: false, message: "Title already exists" });
			}
		}

		if (rating && (rating < 1 || rating > 10)) {
			return res.status(400).json({
				status: false,
				message: "Rating must be between 1 and 10",
			});
		}

		const updatedMovie = await movieModel.findOneAndUpdate({ _id: movieId }, req.body, { new: true });

		if (!updatedMovie) {
			return res.status(404).json({ status: false, message: "Movie not found" });
		}

		res.status(200).json({ status: true, message: "Movie updated successfully" });
	} catch (error) {
		next(error);
	}
};

const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const movieId = req.params.id;
		if (!movieId) {
			return res.status(400).json({ status: false, message: "Movie ID is required" });
		}
		let deletedMovie = await movieModel.findByIdAndDelete(movieId);

		if (!deletedMovie) {
			return res.status(404).json({ status: false, message: "Movie not found" });
		}
		res.status(200).json({ status: true, message: "Movie deleted successfully" });
	} catch (error) {
		next(error);
	}
};

const addGenres = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const genres = [
			{ name: "Action" },
			{ name: "Adventure" },
			{ name: "Animation" },
			{ name: "Comedy" },
			{ name: "Crime" },
			{ name: "Drama" },
			{ name: "Fantasy" },
			{ name: "Horror" },
			{ name: "Mystery" },
			{ name: "Romance" },
			{ name: "Science Fiction" },
			{ name: "Thriller" },
			{ name: "Documentary" },
			{ name: "Biography" },
			{ name: "Family" },
			{ name: "Musical" },
			{ name: "War" },
			{ name: "Western" },
		];
		for (const genreData of genres) {
			await genreModel.create(genreData);
		}

		res.status(200).json({
			status: true,
			message: "Genres added successfully.",
		});
	} catch (error) {
		next(error);
	}
};

const getGenres = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let genres = await genreModel.find();
		res.status(200).json({ status: true, data: genres });
	} catch (error) {
		next(error);
	}
};

const searchMovies = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const query = req.query.q as string;
		const regex = new RegExp(query, "i");

		const movies = await movieModel.aggregate([
			{
				$lookup: {
					from: "genres",
					localField: "genres",
					foreignField: "_id",
					as: "genreDetails",
				},
			},
			{
				$match: {
					$or: [{ title: { $regex: regex } }, { "genreDetails.name": { $regex: regex } }],
				},
			},
		]);

		res.status(200).json({ status: true, data: movies });
	} catch (error) {
		next(error);
	}
};

export const movieController = {
	addMovie: addMovie,
	getMovies: getMovies,
	addGenres: addGenres,
	getGenres: getGenres,
	updateMovie: updateMovie,
	deleteMovie: deleteMovie,
	searchMovies: searchMovies,
};
