import { PostProducts, GetProducts, DeleteProducts, UpdateProducts} from "../controllers/ProductController";
import express from 'express'
import { ProductValidator, validate } from "../utils/ExpressValidator";
import upload from "../middlewares/MulterMiddleware";

const router = express.Router();


router.post('/', upload.single('imageUrl'), ProductValidator(), validate,   PostProducts)
router.get('/', GetProducts);
router.delete('/:id', DeleteProducts)
router.patch('/:id', UpdateProducts)



export default router;