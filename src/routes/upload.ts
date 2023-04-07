import { Router } from 'express';
import { uploadFile } from '../controllers';
import { checkSesion, uploadMulter } from '../middlewares';

const router = Router();

router.use( checkSesion );

router.post('/upload-file', uploadMulter, uploadFile );

/* router.post('/delete-file', uploadMulter, uploadFileNow ); */

export default router;