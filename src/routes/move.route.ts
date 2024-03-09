import express from "express";
const router = express.Router();
import { movieController } from "../controllers/movie.controller";
import isAdmin from "../middlewares/auth.middleware";



router.get("/", movieController.getMovies);
router.post("/", isAdmin, movieController.addMovie);
router.put("/:id", isAdmin, movieController.updateMovie);
router.delete("/:id", isAdmin, movieController.deleteMovie)
router.get("/search", movieController.searchMovies);


router.post("/addGenres", isAdmin, movieController.addGenres);
router.get('/getGenres', movieController.getGenres)


export default router;
