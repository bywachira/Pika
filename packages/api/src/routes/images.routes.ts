import express from 'express';
import * as ImageMiddleware from '../middlewares/images.middleware';

import { expressClient as client} from '../redis';

const router = express.Router();

router.get(`/images`, ImageMiddleware.getImages);

router.get(`/image/:image_id`, ImageMiddleware.getImage);

router.delete(`/image/:image_id`, ImageMiddleware.deleteImage);

export default router;