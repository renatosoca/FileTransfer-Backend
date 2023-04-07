import { Router } from 'express';
import { uploadFile, uploadFileNow } from '../controllers';
import { checkSesion, multerMiddleware } from '../middlewares';

const router = Router();

router.use( checkSesion );

router.post('/upload-file', uploadFile );

router.post('/upload-file-now', multerMiddleware, uploadFileNow );

export default router;