import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Media Platform for Events",
      description: "This API is for Social Media Platform for Events.",
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
