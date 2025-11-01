import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB bağlantısı başarıyla sağlandı!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connection;
