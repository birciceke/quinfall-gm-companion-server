import express from "express";

import {
  createNewItem,
  deleteItem,
  updateItem,
  getAllItems,
} from "../controllers/item.js";

const router = express.Router();

router.get("/items", getAllItems);
router.post("/items", createNewItem);
router.delete("/items/:id", deleteItem);
router.put("/items/:id", updateItem);

export default router;
