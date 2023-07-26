import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API Documentation',
        version: '1.0.0',
        description: 'Documentation for my API',
      },
    },
    apis: ['./index.ts'], // This is the file where you wrote your API routes
  };

  const specs = swaggerJsdoc(options);