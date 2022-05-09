const mongoose = require("mongoose");

const env = process.env.ENVIRONMENT || "development";

const options = {
  useNewUrlParser: true
};

module.exports = callback => {
  mongoose.Promise = global.Promise;

  if (env === "development") mongoose.set("debug", true);

 

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on("connected", function() {
    console.log("Mongoose default connection open to " + process.env.HOST);
  });

  // If the connection throws an error
  mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
  });

  mongoose
    .connect(process.env.HOST, options)
    .then(() => {
      callback(mongoose);
    })
    .catch(err => console.error(err.toString()));
};

