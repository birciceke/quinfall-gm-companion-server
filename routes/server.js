import express from "express";
import {
  createNewServerCommand,
  deleteServerCommand,
  getAllServerCommands,
  updateServerCommand,
} from "../controllers/server.js";

const router = express.Router();

router.get("/server-commands", getAllServerCommands);
router.post("/server-commands", createNewServerCommand);
router.delete("/server-commands/:id", deleteServerCommand);
router.put("/server-commands/:id", updateServerCommand);

export default router;
