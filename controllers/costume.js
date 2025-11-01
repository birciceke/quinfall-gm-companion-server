import mongoose from "mongoose";

import { Costume, validateCostume } from "../models/Costume.js";

export const getAllCostumes = async (req, res) => {
  try {
    const costumes = await Costume.find();

    if (costumes.length === 0)
      return res
        .status(204)
        .json({ message: "Kayıtlı herhangi bir kostüm bulunamadı!" });

    res.status(200).json(costumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const createNewCostume = async (req, res) => {
  const { error, value } = validateCostume(req.body);

  if (error)
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });

  try {
    const newCostume = await Costume.create(value);
    res.status(201).json(newCostume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const deleteCostume = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Geçersiz obje kimliği!" });

  try {
    const deletedItem = await Costume.findByIdAndDelete(id);

    if (!deletedItem)
      return res
        .status(400)
        .json({ message: "Bu kimliğe kayıtlı bir kostüm bulunamadı!" });

    res.status(200).json({ message: "Bir eşyayı başarıyla sildiniz!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const updateCostume = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Geçersiz obje kimliği!" });

  const { error, value } = validateCostume(req.body);

  if (error)
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });

  try {
    const updatedCostume = await Costume.findByIdAndUpdate(
      id,
      {
        costumeName: value.costumeName,
        category: value.category,
        spawnCommand: value.spawnCommand,
        imageUrl: value.imageUrl,
      },
      { new: true }
    );

    if (!updatedCostume)
      return res
        .status(400)
        .json({ message: "Bu kimliğe kayıtlı bir kostüm bulunamadı!" });

    res.status(200).json(updatedCostume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};
