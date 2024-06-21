import express from 'express'

import { googleAuthCallbackHandler, googleAuthHandler, logoutHandler, loginSucessHandler } from '../controllers/AuthController'

const AuthRouter = express.Router();


AuthRouter.get("/auth/google", googleAuthHandler)
AuthRouter.get("/auth/google/callback", googleAuthCallbackHandler)

AuthRouter.get("/login/sucess", loginSucessHandler)
AuthRouter.get("/logout", logoutHandler)

export default AuthRouter;