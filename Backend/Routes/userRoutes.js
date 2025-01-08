import express from 'express';
import { registerUser, loginUser, myProfile, userProfile, followAndUnfollowUser, logOutUser} from '../Controllers/userControllers.js';
import { isAuth } from '../Middlewares/isAuth.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logOutUser);
router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);
router.post("/follow/:id", isAuth, followAndUnfollowUser);

export default router;

