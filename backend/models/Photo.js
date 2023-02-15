const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");
const { Schema } = Mongoose;
const photoSchema = new Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
  },
  {
    // Configurações do model
    // timestamps cria dois models create date (marca a data que o usuário foi cdriado )e update date( marca a data que teve atualização)
    timestamps: true,
  }
);
// definindo um model com o nome photo + o schema(as propriedades de cada user)
const photo = mongoose.model("photo", photoSchema);

module.exports = photo;
