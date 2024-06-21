import express  from 'express'
import { GoToDashboard, LoginUser, RegisterUser } from '../controllers/UserController';
import { UserValidator, validate } from '../middlewares/ExpressValidator';
import { validateToken } from '../middlewares/JWTValidate';
const userRouter = express.Router();



userRouter.post('/register', UserValidator(), validate, RegisterUser);
userRouter.post('/login', LoginUser)
userRouter.get('/dashboard', validateToken,  GoToDashboard)


export default userRouter;



