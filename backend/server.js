const app = require("./app");
const connectDatabase = require("./config/database");

process.on("uncaughtException", (err) => {
  console.error(`Error : ${err.message}`);
  console.log(`shutting down the server`);
  process.exit(1);
});

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Error : ${err.message}`);
  console.log(`shutting down the server`);
  server.close(() => {
    process.exit(1);
  });
});
