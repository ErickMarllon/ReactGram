const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");
const { Schema } = Mongoose;
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    // Configurações do model
    // timestamps cria dois models create date (marca a data que o usuário foi cdriado )e update date( marca a data que teve atualização)
    timestamps: true,
  }
);
// definindo um model com o nome user + o schema(as propriedades de cada user)
const user = mongoose.model("user", userSchema);

module.exports = user;
