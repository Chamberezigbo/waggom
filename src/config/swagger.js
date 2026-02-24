import swaggerJsdoc from "swagger-jsdoc"; // Change to import

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Church Project API",
      version: "1.0.0",
      description: "Church Project API Documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://api.waggom.org/",
      },
    ],
  },
  apis:  ["./src/**/*.ts", "./dist/**/*.js"], // Adjust the path as necessary
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec; // Ensure this is a default export