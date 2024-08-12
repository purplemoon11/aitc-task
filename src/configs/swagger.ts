import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User & Cards Details API",
      description:
        "This API is for users and cards to perform CRUD operations and more.",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.DEV_SWAGGER_URI,
        description: "Test",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);
function setupSwagger(app: any) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
export default setupSwagger;
