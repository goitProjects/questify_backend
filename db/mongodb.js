const connectDB = (mongoose, config) =>
  mongoose
    .connect(config.dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
      console.log(err)
      process.exit(0)
    });

module.exports = connectDB;
