import { model, Schema } from "mongoose";
import Joi from "joi";

const categories = [
  "Silahlar",
  "Kasklar",
  "Erkek Kostümleri",
  "Kadın Kostümleri",
  "Pet Kostümleri",
];

const costumeSchema = new Schema(
  {
    costumeName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 128,
    },
    category: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 128,
      enum: categories,
    },
    spawnCommand: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
    imageUrl: String,
  },
  { timestamps: true }
);

const validateCostume = (data) => {
  const schema = Joi.object({
    costumeName: Joi.string().required().min(3).max(128).messages({
      "string.base": "Kostüm adı bir metin olmalıdır!",
      "any.required": "Kostüm adı zorunludur!",
      "string.min": "Kostüm adı en az {#limit} harfli olmalıdır!",
      "string.max": "Kostüm adı en fazla {#limit} harfli olabilir!",
      "string.empty": "Kostüm adı boş bırakılamaz!",
    }),
    category: Joi.string()
      .required()
      .min(2)
      .max(128)
      .valid(...categories)
      .messages({
        "string.base": "Kategori bir metin olmalıdır!",
        "any.required": "Kategori zorunludur!",
        "string.min": "Kategori en az {#limit} harfli olmalıdır!",
        "string.max": "Kategori en fazla {#limit} harfli olabilir!",
        "string.empty": "Kategori boş bırakılamaz!",
        "any.only": `Kategori geçersiz! Sadece şunlardan biri olabilir: ${categories.join(
          ", "
        )}`,
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

const Costume = model("Costume", costumeSchema);

export { Costume, validateCostume };
