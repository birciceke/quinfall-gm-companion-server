import { Schema, model } from "mongoose";
import Joi from "joi";

const serverSchema = new Schema({
  serverCommand: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  uniqueKey: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
    uniqueKey: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 512,
  },
  value: {
    type: String,
    required: true,
    maxlength: 256,
  },
});

const validateServer = (data) => {
  const schema = Joi.object({
    serverCommand: Joi.string().required().min(2).max(128).messages({
      "string.base": "Sunucu komutu bir metin olmalıdır!",
      "any.required": "Sunucu komutu zorunludur!",
      "string.min": "Sunucu komutu en az {#limit} harfli olmalıdır!",
      "string.max": "Sunucu komutu en fazla {#limit} harfli olabilir!",
      "string.empty": "Sunucu komutu boş bırakılamaz!",
    }),
    uniqueKey: Joi.string().required().min(2).max(128).messages({
      "string.base": "Benzersiz anahtar bir metin olmalıdır!",
      "any.required": "Benzersiz anahtar zorunludur!",
      "string.min": "Benzersiz anahtar en az {#limit} harfli olmalıdır!",
      "string.max": "Benzersiz anahtar en fazla {#limit} harfli olabilir!",
      "string.empty": "Benzersiz anahtar boş bırakılamaz!",
    }),
    description: Joi.string().required().min(2).max(512).messages({
      "string.base": "Açıklama bir metin olmalıdır!",
      "any.required": "Açıklama zorunludur!",
      "string.min": "Açıklama en az {#limit} harfli olmalıdır!",
      "string.max": "Açıklama en fazla {#limit} harfli olabilir!",
      "string.empty": "Açıklama boş bırakılamaz!",
    }),
    value: Joi.string().required().max(256).messages({
      "string.base": "Değer bir metin olmalıdır!",
      "any.required": "Değer zorunludur!",
      "string.max": "Değer en fazla {#limit} harfli olabilir!",
      "string.empty": "Değer boş bırakılamaz!",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const Server = model("Server", serverSchema);

export { Server, validateServer };
