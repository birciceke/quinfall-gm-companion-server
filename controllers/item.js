import mongoose from "mongoose";

import { Item, validateItem } from "../models/Item.js";
import { updateCostume } from "./costume.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    if (items.length === 0)
      return res
        .status(204)
        .json({ message: "Kayıtlı herhangi bir eşya bulunamadı!" });

    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const createNewItem = async (req, res) => {
  const { error, value } = validateItem(req.body);

  if (error)
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });

  try {
    const newItem = await Item.create(value);
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem)
      return res
        .status(400)
        .json({ message: "Bu kimliğe kayıtlı bir eşya bulunamadı!" });

    res.status(200).json({ message: "Bir eşyayı başarıyla sildiniz!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Geçersiz ID formatı!" });

  const { error, value } = validateItem(req.body);

  if (error)
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        itemName: value.itemName,
        itemId: value.itemId,
        localeId: value.localeId,
        spawnCommand: value.spawnCommand,
        imageUrl: value.imageUrl,
      },
      { new: true }
    );

    if (!updatedItem)
      return res
        .status(400)
        .json({ message: "Bu kimliğe kayıtlı bir eşya bulunamadı!" });

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};
