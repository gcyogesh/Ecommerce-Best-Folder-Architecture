import express  from 'express'
import { LoginUser, RegisterUser } from '../controllers/UserController';
import { UserValidator, validate } from '../middlewares/ExpressValidator';
const userRouter = express.Router();



userRouter.post('/register', UserValidator(), validate, RegisterUser);
userRouter.post('/login', LoginUser)

export default userRouter;


