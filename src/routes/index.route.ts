import express from 'express';
import movieRoutes from './move.route';

const router = express.Router();


router.use('/movies', movieRoutes);






export default router;