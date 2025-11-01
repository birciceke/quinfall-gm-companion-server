import express from "express";

import {
  createNewLocation,
  deleteLocation,
  getAllLocations,
  updateLocation,
} from "../controllers/location.js";

const router = express.Router();

router.get("/locations", getAllLocations);
router.post("/locations", createNewLocation);
router.delete("/locations/:id", deleteLocation);
router.put("/locations/:id", updateLocation);

export default router;
