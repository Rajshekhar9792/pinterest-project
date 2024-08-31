import express from "express";
import { isAuth } from "../Middlewares/isAuth.js";
import uploadFile from "../Middlewares/multer.js";
import { createPin, getAllPins, getSinglePin, commentOnPin, deleteComment, deletePin, updatePin } from "../Controllers/pinControllers.js";
  

const router = express.Router();

router.post("/new", isAuth, uploadFile, createPin);
router.get("/allPin", isAuth, getAllPins);
router.get("/:id", isAuth, getSinglePin);
router.post("/comment/:id", isAuth, commentOnPin);
router.delete("/deleteComment/:id", isAuth, deleteComment);
router.put("/:id", isAuth, updatePin);
router.delete("/:id", isAuth, deletePin);

export default router;