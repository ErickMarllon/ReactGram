const mongoose = require("mongoose");

// get the db user and password from the environment variables
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// create an async function to connect to the db
const conn = async () => {
  // set strictQuery to false
  mongoose.set("strictQuery", false);

  // try to connect to the db
  try {
    // assign the db connection to a variable
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.l99cjc2.mongodb.net/?retryWrites=true&w=majority`
    );
    // log success message
    console.log("Conectou com sucesso ao bando de dados!");
    // return the db connection
    return dbConn;
  } catch (error) {
    // catch any errors
    // log the error message
    console.log("Erro ao conectar ao bando de dados!", error);
  }
};

// call the connection function
conn();

module.exports = conn;
