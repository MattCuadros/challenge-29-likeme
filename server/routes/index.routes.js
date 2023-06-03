import { Router } from "express";
import { indexController } from "../controllers/index.controller.js";

const router = Router();

router.get("/posts", indexController.getAllPosts);

router.post("/posts", indexController.makePost);

router.get("/posts/:id", indexController.getOnePost);

router.put("/posts/:id", indexController.modifyPost);

router.delete("/posts/:id", indexController.deletePost);

export default router;
