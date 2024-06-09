import { PostProducts, GetProducts, DeleteProducts, UpdateProducts} from "../controllers/ProductController";
import express from 'express'
import { ProductValidator, validate } from "../middlewares/ExpressValidator";
import upload from "../middlewares/MulterMiddleware";

const productRouter = express.Router();


productRouter.post('/', upload.single('imageUrl'), ProductValidator(), validate,   PostProducts)
productRouter.get('/', GetProducts);
productRouter.get('/search');
productRouter.delete('/:id', DeleteProducts)
productRouter.patch('/:id', UpdateProducts)



export default productRouter;