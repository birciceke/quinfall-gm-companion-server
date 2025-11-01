import express from "express";

import {
  createNewCostume,
  deleteCostume,
  getAllCostumes,
  updateCostume,
} from "../controllers/costume.js";

const router = express.Router();

router.get("/costumes", getAllCostumes);
router.post("/costumes", createNewCostume);
router.delete("/costumes/:id", deleteCostume);
router.put("/costumes/:id", updateCostume);

export default router;
