import mongoose from "mongoose";

import { Location, validateLocation } from "../models/Location.js";

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();

    if (locations.length === 0)
      return res
        .status(204)
        .json({ message: "Kayıtlı herhangi bir konum bulunamadı!" });

    res.status(200).json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const createNewLocation = async (req, res) => {
  const { error, value } = validateLocation(req.body);

  if (error)
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });

  try {
    const newLocation = await Location.create(value);
    res.status(201).json(newLocation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const deleteLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Geçersiz obje kimliği!" });

  try {
    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation)
      return res
        .status(400)
        .json({ message: "Bu kimliğe kayıtlı bir konum bulunamadı!" });

    res.status(200).json({ message: "Bir konumu başarıyla sildiniz!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const updateLocation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Geçersiz obje kimliği!" });

  const { error, value } = validateLocation(req.body);

  if (error)
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      {
        locationName: value.locationName,
        teleportCommand: value.teleportCommand,
      },
      { new: true }
    );

    if (!updatedLocation)
      return res
        .status(400)
        .json({ message: "Bu kimliğe kayıtlı bir konum bulunamadı!" });

    res.status(200).json(updatedLocation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};
