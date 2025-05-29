import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  swaggerDefinition: {
    info: {
      title: 'Book Managment APIs Documentation',
      version: '1.0.0',
      description: 'API documentation for smart Book mangement project API',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    }
  ],
  apis: ['./routes/*.js'], // Replace with the path to your route files
};

const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs