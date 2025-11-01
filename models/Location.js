import { model, Schema } from "mongoose";
import Joi from "joi";

const locationSchema = new Schema(
  {
    locationName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 128,
    },
    teleportCommand: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
  },
  { timestamps: true }
);

const validateLocation = (data) => {
  const schema = Joi.object({
    locationName: Joi.string().required().min(3).max(128).messages({
      "string.base": "Konum adı bir metin olmalıdır!",
      "any.required": "Konum adı zorunludur!",
      "string.min": "Konum adı en az {#limit} harfli olmalıdır!",
      "string.max": "Konum adı en fazla {#limit} harfli olabilir!",
      "string.empty": "Konum adı boş bırakılamaz!",
    }),
    teleportCommand: Joi.string().required().min(2).max(256).messages({
      "string.base": "Işınlanma komutu bir metin olmalıdır!",
      "any.required": "Işınlanma komutu zorunludur!",
      "string.min": "Işınlanma komutu en az {#limit} harfli olmalıdır!",
      "string.max": "Işınlanma komutu en fazla {#limit} harfli olabilir!",
      "string.empty": "Işınlanma komutu boş bırakılamaz!",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

const Location = model("Location", locationSchema);

export { Location, validateLocation };
