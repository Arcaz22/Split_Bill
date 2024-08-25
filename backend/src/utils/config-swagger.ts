import path from 'path';
import { Application, Request, Response, NextFunction } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { env } from './env';

const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API SPLIT BILL',
      version: '1.0.0',
      description: 'Description of API Split Bill',
    },
    servers: [
      {
        url: env.BASE_URL,
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/swagger/*.ts')],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerSetup = (req: Request, res: Response, next: NextFunction) => {
  swaggerUi.setup(swaggerSpec)(req, res, next);
};

const swaggerDocs = (app: Application) => {
  app.use('/api', swaggerUi.serve, swaggerSetup);
};

export default swaggerDocs;
