import chalk from "chalk";
import mongoose from "mongoose";
import {dbUrl} from "./config.json";

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;
export default callback => {
  // connect to a database if needed, then pass it to `callback`:
  mongoose.connect(dbUrl);

  mongoose.connection.on("connected", function() {
    console.log(connected("Mongoose default connection is open to ", dbUrl));
  });
  mongoose.connection.on("error", function(err) {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    );
  });

  mongoose.connection.on("disconnected", function() {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });

  callback();
};
