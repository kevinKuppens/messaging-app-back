import { Router } from "express";
import AuthentificationController from "../controllers/auth.controller";
import AuthentificationValidator from "../validators/auth.validator";

const router = Router();

router.post('/api/v1/login', AuthentificationValidator.getLoginRules(), AuthentificationValidator.validate, AuthentificationController.login);

export { router as AuthRouter };