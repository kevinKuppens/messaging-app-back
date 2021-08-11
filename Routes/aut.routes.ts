import { Router } from "express";
import AuthentificationController from "../controllers/auth.controller";

const router = Router();

router.post('/api/v1/login', AuthentificationController.login);

export { router as AuthRouter };