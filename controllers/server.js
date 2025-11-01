import mongoose from "mongoose";

import { Server, validateServer } from "../models/Server.js";

export const getAllServerCommands = async (req, res) => {
  try {
    const serverCommands = await Server.find();

    if (serverCommands.length === 0)
      return res
        .status(204)
        .json({ message: "Kayıtlı herhangi bir sunucu komutu bulunamadı!" });

    res.status(200).json(serverCommands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const createNewServerCommand = async (req, res) => {
  const { error, value } = validateServer(req.body);

  if (error)
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });

  try {
    const newServerCommand = await Server.create(value);
    res.status(201).json(newServerCommand);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const deleteServerCommand = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Geçersiz obje kimliği!" });

  try {
    const deletedServerCommand = await Server.findByIdAndDelete(id);

    if (!deletedServerCommand)
      return res
        .status(400)
        .json({ message: "Bu kimliğe kayıtlı bir sunucu komutu bulunamadı!" });

    res
      .status(200)
      .json({ message: "Bir sunucu komutunu başarıyla sildiniz!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};

export const updateServerCommand = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Geçersiz obje kimliği!" });

  const { error, value } = validateServer(req.body);

  if (error)
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });

  try {
    const updatedServerCommand = await Server.findByIdAndUpdate(
      id,
      {
        serverCommand: value.serverCommand,
        uniqueKey: value.uniqueKey,
        description: value.description,
        value: value.value,
      },
      { new: true }
    );

    if (!updatedServerCommand)
      return res
        .status(400)
        .json({ message: "Bu kimliğe kayıtlı bir sunucu komutu bulunamadı!" });

    res.status(200).json(updatedServerCommand);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası meydana geldi!" });
  }
};
