import { Schema, model } from "mongoose";
import Joi from "joi";

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemId: {
      type: Number,
      required: true,
    },
    localeId: {
      type: Number,
      required: true,
    },
    spawnCommand: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const validateItem = (data) => {
  const schema = Joi.object({
    itemName: Joi.string().required().messages({
      "string.base": "Eşya adı bir metin olmalıdır!",
      "any.required": "Eşya adı zorunludur!",
      "string.empty": "Eşya adı boş bırakılamaz!",
    }),
    itemId: Joi.number().positive().required().messages({
      "number.base": "Eşya kimliği geçerli bir sayı olmalıdır!",
      "number.positive": "Eşya kimliği pozitif bir sayı olmalıdır!",
      "any.required": "Eşya kimliği zorunludur!",
    }),
    localeId: Joi.number().positive().required().messages({
      "number.base": "Yerel kimlik geçerli bir sayı olmalıdır!",
      "number.positive": "Yerel kimlik pozitif bir sayı olmalıdır!",
      "any.required": "Yerel kimlik zorunludur!",
    }),
    spawnCommand: Joi.string().required().min(2).max(256).messages({
      "string.base": "Spawn komutu bir metin olmalıdır!",
      "any.required": "Spawn komutu zorunludur!",
      "string.min": "Spawn komutu en az {#limit} harfli olmalıdır!",
      "string.max": "Spawn komutu en fazla {#limit} harfli olabilir!",
      "string.empty": "Spawn komutu boş bırakılamaz!",
    }),
    imageUrl: Joi.string().uri().allow("").messages({
      "string.base": "Görsel bağlantısı bir metin olmalıdır!",
      "string.uri": "Görsel bağlantısı geçerli bir URL olmalıdır!",
      "string.empty": "Görsel bağlantısı boş bırakılamaz!",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const Item = model("Item", itemSchema);

export { Item, validateItem };
