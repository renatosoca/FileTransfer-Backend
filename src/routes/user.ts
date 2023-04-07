import { Router } from "express";
import { userAuth, userRegister } from "../controllers";

const router = Router();

router.post('/login', userAuth);
router.post('/register', userRegister);
//Actualizar...

export default router;