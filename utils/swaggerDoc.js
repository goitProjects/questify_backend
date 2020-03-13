const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Questify API",
      version: "1.0.0",
      description: "Express API for Questify, view what routes pass"
    },
    basePath: "/api"
  },
  apis: ["routes/routes.js"]
};

const specs = swaggerJsDoc(options);
const swaggerBaseOptions = {
  customSiteTitle: "Questify API Documentation",
  customfavIcon: 'https://questify.goit.co.ua/fav.png'
};

module.exports = app => {
  app.use("/doc", swaggerUI.serve, swaggerUI.setup(specs, swaggerBaseOptions));
};
