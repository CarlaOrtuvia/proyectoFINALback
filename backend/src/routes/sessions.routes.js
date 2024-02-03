import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import { sessionController } from "../controllers/sessions.controller.js";

const sessionRouter = Router();

sessionRouter.get("/current", passportError("jwt"), authorization('admin'), sessionController.currentSession);

sessionRouter.post("/register", passport.authenticate("register"), sessionController.registerUsers);

sessionRouter.post("/login", passport.authenticate("login"), sessionController.loginUsers);



sessionRouter.get("/github", passport.authenticate("github", { scope: ["user: email"] }), sessionController.getGithub);

sessionRouter.get("/githubCallback", passport.authenticate("github"), sessionController.getGithubCallback);

sessionRouter.get("/logout", sessionController.getLogout);

export default sessionRouter;